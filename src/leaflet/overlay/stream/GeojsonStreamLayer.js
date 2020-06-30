import L from "leaflet";

/**
 * @class GeojsonStreamLayer
 * @classdesc SocketLayer GeoJson渲染器。
 * @extends {L.GeoJSON}
 * @param {string} url - 数据流图层服务地址
 * @param {Object} options - 其他参数，先保留。
 *
 * @param {Object} options.style - 默认的geojson的style。
 * @param {Object} options.pointToLayer - geojson针对点图层的样式设置。
 * @param {Object} options.onEachFeature - geojson针对常见几何的样式设置。
 *
 * @param {Object} options.field - geojson的唯一标识字段，请确保该字段的唯一性。
 */
export var GeojsonStreamLayer = L.GeoJSON.extend({
  initialize: function(url, options) {
    options = options || {};
    if (options.style && !options.pointToLayer) {
      options.pointToLayer = function(feature, latlng) {
        return L.circleMarker(latlng, options.style());
      };
    }

    L.Util.setOptions(this, options);

    //与leaflet源代码一致，
    //var i = this.getLayerId(t);
    //return this._layers[i] = t
    this._layers = {};

    L.stamp(this);

    this.url = url;
    this.fieldHash = {};
  },

  onMessage: function(msg) {
    const feature = msg.feature;
    const field = msg.feature.properties[this.options.field];
    let layer = null;
    if (field !== undefined && this.fieldHash[field]) {
      layer = this.getLayer(this.fieldHash[field]);
      this.parasFeature(layer, feature);
    } else {
      layer = L.GeoJSON.geometryToLayer(feature, this.options);
      layer.feature = L.GeoJSON.asFeature(feature);
      this.addLayer(layer);
      if (field !== undefined) {
        this.fieldHash[field] = this.getLayerId(layer);
      }
    }
    if (this.options.onEachFeature) {
      this.options.onEachFeature(feature, layer);
    }
  },

  parasFeature: function(layer, feature) {
    if (feature.properties) {
      layer.feature.properties = feature.properties;
    }
    var coords = [];
    switch (feature.geometry.type) {
      case "Point":
        coords = L.GeoJSON.coordsToLatLng(feature.geometry.coordinates);
        layer.setLatLng(coords);
        break;
      case "LineString":
        coords = L.GeoJSON.coordsToLatLngs(feature.geometry.coordinates, 0);
        layer.setLatLngs(coords);
        break;
      case "MultiLineString":
      case "Polygon":
        coords = L.GeoJSON.coordsToLatLngs(feature.geometry.coordinates, 1);
        layer.setLatLngs(coords);
        break;
      case "MultiPolygon":
        coords = L.GeoJSON.coordsToLatLngs(feature.geometry.coordinates, 2);
        layer.setLatLngs(coords);
        break;
    }
  }
});
