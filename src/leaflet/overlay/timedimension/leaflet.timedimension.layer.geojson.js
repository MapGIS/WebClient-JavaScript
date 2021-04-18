import L from "leaflet";
import { TimeDimensionLayer } from './leaflet.timedimension.layer'
import { TimeDimensionUtil } from './leaflet.timedimension.util'

/*
 * TimeDimensionLayer.GeoJson:
 */

export var TimeDimensionLayerGeoJson = TimeDimensionLayer.extend({

    initialize: function(layer, options) {
        TimeDimensionLayer.prototype.initialize.call(this, layer, options);
        this._updateTimeDimension = this.options.updateTimeDimension || false;
        this._updateTimeDimensionMode = this.options.updateTimeDimensionMode || 'extremes'; // 'union', 'replace' or extremes
        this._duration = this.options.duration || null;
        this._addlastPoint = this.options.addlastPoint || false;
        this._waitForReady = this.options.waitForReady || false;
        this._updateCurrentTime = this.options.updateCurrentTime || this._updateTimeDimension;        
        this._availableTimes = [];
        this._loaded = false;
        if (this._baseLayer.getLayers().length == 0) {
            if (this._waitForReady){
                this._baseLayer.on("ready", this._onReadyBaseLayer, this);
            }else{
                this._loaded = true;
            }
        } else {
            this._loaded = true;
            this._setAvailableTimes();
        }
        // reload available times if data is added to the base layer
        this._baseLayer.on('layeradd', (function () {
            if (this._loaded) {
                this._setAvailableTimes();
            }
        }).bind(this));
    },

    onAdd: function(map) {
        TimeDimensionLayer.prototype.onAdd.call(this, map);
        if (this._loaded) {
            this._setAvailableTimes();
        }
    },

    eachLayer: function(method, context) {
        if (this._currentLayer) {
            method.call(context, this._currentLayer);
        }
        return TimeDimensionLayer.prototype.eachLayer.call(this, method, context);
    },

    isReady: function(time) {
        return this._loaded;
    },

    _update: function() {
        if (!this._map)
            return;
        if (!this._loaded) {
            return;
        }

        var time = this._timeDimension.getCurrentTime();

        var maxTime = this._timeDimension.getCurrentTime(),
            minTime = 0;
        if (this._duration) {
            var date = new Date(maxTime);
            TimeDimensionUtil.subtractTimeDuration(date, this._duration, true);
            minTime = date.getTime();
        }

        // new coordinates:
        var layer = L.geoJson(null, this._baseLayer.options);
        var layers = this._baseLayer.getLayers();
        for (var i = 0, l = layers.length; i < l; i++) {
            var feature = this._getFeatureBetweenDates(layers[i].feature, minTime, maxTime);
            if (feature) {
                layer.addData(feature);
                if (this._addlastPoint && feature.geometry.type == "LineString") {
                    if (feature.geometry.coordinates.length > 0) {
                        var properties = feature.properties;
                        properties.last = true;
                        layer.addData({
                            type: 'Feature',
                            properties: properties,
                            geometry: {
                                type: 'Point',
                                coordinates: feature.geometry.coordinates[feature.geometry.coordinates.length - 1]
                            }
                        });
                    }
                }
            }
        }

        if (this._currentLayer) {
            this._map.removeLayer(this._currentLayer);
        }
        if (layer.getLayers().length) {
            layer.addTo(this._map);
            this._currentLayer = layer;
        }
    },

    _setAvailableTimes: function() {
        var times = [];
        var layers = this._baseLayer.getLayers();
        for (var i = 0, l = layers.length; i < l; i++) {
            if (layers[i].feature) {
                var featureTimes = this._getFeatureTimes(layers[i].feature);
                for (var j = 0, m = featureTimes.length; j < m; j++) {
                    times.push(featureTimes[j]);
                }
            }
        }
        this._availableTimes = TimeDimensionUtil.sort_and_deduplicate(times);
        this._updateCurrentTime = this._updateCurrentTime || (this._timeDimension && this._timeDimension.getAvailableTimes().length == 0);
        if (this._timeDimension && (this._updateTimeDimension || this._timeDimension.getAvailableTimes().length == 0)) {
            this._timeDimension.setAvailableTimes(this._availableTimes, this._updateTimeDimensionMode);
        }
        if (this._updateCurrentTime && this._timeDimension && this._availableTimes.length) {
            this._timeDimension.setCurrentTime(this._availableTimes[0]);
        }
    },

    _getFeatureTimes: function(feature) {
        if (!feature.featureTimes) {
            if (!feature.properties) {
                feature.featureTimes = [];
            } else if (feature.properties.hasOwnProperty('coordTimes')) {
                feature.featureTimes = feature.properties.coordTimes;
            } else if (feature.properties.hasOwnProperty('times')) {
                feature.featureTimes = feature.properties.times;
            } else if (feature.properties.hasOwnProperty('linestringTimestamps')) {
                feature.featureTimes = feature.properties.linestringTimestamps;
            } else if (feature.properties.hasOwnProperty('time')) {
                feature.featureTimes = [feature.properties.time];
            } else {
                feature.featureTimes = [];
            }
            // String dates to ms
            for (var i = 0, l = feature.featureTimes.length; i < l; i++) {
                var time = feature.featureTimes[i];
                if (typeof time == 'string' || time instanceof String) {
                    time = Date.parse(time.trim());
                    feature.featureTimes[i] = time;
                }
            }
        }
        return feature.featureTimes;
    },

    _getFeatureBetweenDates: function(feature, minTime, maxTime) {
        var featureTimes = this._getFeatureTimes(feature);
        if (featureTimes.length == 0) {
            return feature;
        }

        var index_min = null,
            index_max = null,
            l = featureTimes.length;

        if (featureTimes[0] > maxTime || featureTimes[l - 1] < minTime) {
            return null;
        }

        if (featureTimes[l - 1] > minTime) {
            for (var i = 0; i < l; i++) {
                if (index_min === null && featureTimes[i] > minTime) {
                    // set index_min the first time that current time is greater the minTime
                    index_min = i;
                }
                if (featureTimes[i] > maxTime) {
                    index_max = i;
                    break;
                }
            }
        }
        if (index_min === null) {
            index_min = 0;
        }
        if (index_max === null) {
            index_max = l;
        }
        var new_coordinates = [];
        if (feature.geometry.coordinates[0].length) {
            new_coordinates = feature.geometry.coordinates.slice(index_min, index_max);
        } else {
            new_coordinates = feature.geometry.coordinates;
        }
        return {
            type: 'Feature',
            properties: feature.properties,
            geometry: {
                type: feature.geometry.type,
                coordinates: new_coordinates
            }
        };
    },

    _onReadyBaseLayer: function() {
        this._loaded = true;
        this._setAvailableTimes();
        this._update();
    },

});

let timeDimensionLayerGeoJson = function(layer, options) {
    return new TimeDimensionLayerGeoJson(layer, options);
};

L.zondy.TimeDimensionLayerGeoJson = timeDimensionLayerGeoJson;