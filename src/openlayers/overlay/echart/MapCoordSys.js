import echarts from 'echarts';
import L from 'leaflet';

export function MapCoordSys(LeafletMap, api) {
    this._LeafletMap = LeafletMap
    this.dimensions = ['lng', 'lat']
    this._mapOffset = [0, 0]

    this._api = api
}

MapCoordSys.prototype.dimensions = ['lng', 'lat']

MapCoordSys.prototype.setMapOffset = function (mapOffset) {
    this._mapOffset = mapOffset
}

MapCoordSys.prototype.getBMap = function () {
    return this._LeafletMap
}


MapCoordSys.prototype.dataToPoint = function (data) {
    if (data[1] === null) {
        data[1] = 89.99;
    }

    var point = new L.latLng(data[1], data[0]);
    var px = this._LeafletMap.latLngToLayerPoint(point);

    var mapOffset = this._mapOffset;

    return [px.x - mapOffset[0], px.y - mapOffset[1]];
}

MapCoordSys.prototype.pointToData = function (pt) {
    var mapOffset = this._mapOffset;
    var pt = this._LeafletMap.layerPointToLatLng(
        [pt[0] + mapOffset[0],
            pt[1] + mapOffset[1]
        ]
    );
    return [pt.lng, pt.lat];
}

MapCoordSys.prototype.getViewRect = function () {
    var api = this._api
    return new echarts.graphic.BoundingRect(0, 0, api.getWidth(), api.getHeight())
}

MapCoordSys.prototype.getRoamTransform = function () {
    return echarts.matrix.create();
}

//https://github.com/apache/incubator-echarts/issues/6953
//https://github.com/apache/incubator-echarts/issues/7789
MapCoordSys.prototype.prepareCustoms = function () {
    var zrUtil = echarts.util;

    var rect = this.getViewRect();
    return {
        coordSys: {
            // The name exposed to user is always 'cartesian2d' but not 'grid'.
            type: 'leaflet',
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
        },
        api: {
            coord: zrUtil.bind(this.dataToPoint, this),
            size: zrUtil.bind(dataToCoordSize, this)
        }
    };

    function dataToCoordSize(dataSize, dataItem) {
        dataItem = dataItem || [0, 0];
        return zrUtil.map([0, 1], function (dimIdx) {
            var val = dataItem[dimIdx];
            var halfSize = dataSize[dimIdx] / 2;
            var p1 = [];
            var p2 = [];
            p1[dimIdx] = val - halfSize;
            p2[dimIdx] = val + halfSize;
            p1[1 - dimIdx] = p2[1 - dimIdx] = dataItem[1 - dimIdx];
            return Math.abs(this.dataToPoint(p1)[dimIdx] - this.dataToPoint(p2)[dimIdx]);
        }, this);
    }
}

// For deciding which dimensions to use when creating list data
MapCoordSys.dimensions = MapCoordSys.prototype.dimensions

MapCoordSys.create = function (ecModel, api) {
    /* ecModel.eachComponent('LeafletMap', function (LeafletMapModel) {
        var leafletMap = echarts.leafletMap;
        coordSys = new MapCoordSys(leafletMap);
        coordSys.setMapOffset(LeafletMapModel.__mapOffset || [0, 0]);
        LeafletMapModel.coordinateSystem = coordSys;
    })
    ecModel.eachSeries(function (seriesModel) {
        if (seriesModel.get('coordinateSystem') === 'leaflet') {
            seriesModel.coordinateSystem = coordSys
        }
    }) */
    var coordSys;

    ecModel.eachComponent('leaflet', function (leafletMapModel) {
        var viewportRoot = api.getZr().painter.getViewportRoot();
        var leafletMap = echarts.leafletMap;
        if (!coordSys) {

            coordSys = new MapCoordSys(leafletMap, api);
        }

        coordSys.setMapOffset(leafletMapModel.__mapOffset || [0, 0]);
        leafletMapModel.coordinateSystem = coordSys;
    });

    ecModel.eachSeries(function (seriesModel) {
        if (!seriesModel.get('coordinateSystem') || seriesModel.get('coordinateSystem') === 'leaflet') {
            if (!coordSys) {
                var leafletMap = echarts.leafletMap;
                coordSys = new MapCoordSys(leafletMap, api);
            }
            seriesModel.coordinateSystem = coordSys;
            seriesModel.animation = seriesModel.animation === true;
        }
    })
}


export default MapCoordSys;