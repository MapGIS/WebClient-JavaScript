import L from "leaflet";
import '../../core/Base';

/**
 * leaflet的聚类图的实现
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class L.zondy.MarkerClusterLayer
 * @classdesc 基于leaflet的Layer对象进行的拓展
 * @param map - {Object} 传入的leaflet的地图对象
 * @param geojson - {Object} 热力图目前支持持`点数据`的 GeoJSON 格式
 * @param options - {Object} mapv.options
 * @param options.zoom - {Number} 最大的`聚类级别`
 * @param options.title - {Number} 单个聚类点的`标题` 内容
 * @param options.field - {String} 选择对应的字段，该字段必须是`数字型`的字段，用来计算大小和颜色
 *
 * @example
 *  $.get('./static/data/geojson/point.json', function (json) {
 *   geojson = json;
 *   var options = {
 *     size: 5,
 *     max: 2,
 *     field: 'mapgis_style',
 *     gradient: {
 *        0.25: "rgb(0,0,255)",
 *        0.55: "rgb(0,255,0)",
 *        0.85: "yellow",
 *        1.0: "rgb(255,0,0)"
 *     }
 *   }
 *   var heaterLayer = new L.zondy.MarkerClusterLayer(map, geojson, options).addTo(map);
 */
export var MarkerClusterLayer = L.Layer.extend({

    map: null, //传入的leaflet地图
    options: {},
    data: [],

    initialize: function (map, geojson, options) {
        this.map = map;

        let {field} = options;
        this.field = field;

        this.options = options;
        this.data = this.convertData(geojson);

        this.layer = null;
    },

    convertData: function (geojson) {
        let self = this;
        let data = [];
        if (!geojson) return data;
        let type = geojson.type;
        if (type === 'FeatureCollection') {
            let features = geojson.features;
            if (!features || features.length <= 0) return data;
            let key = this.findNumberFieldName(features[0].properties);
            data = geojson.features.map(i => {
                i.count = i.properties[self.field || key];
                return i;
            });
        } else if (type === 'Ponit') {
            //
        } else if (type === 'MultiPonit') {
            //
        }

        return data;
    },

    findNumberFieldName: function (properties) {
        let keys = Object.keys(properties);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (typeof keys[i] === 'number') {
                return key;
            }
        }
        return undefined;
    },

    onAdd: function (map) {
        this.map = map;
        let {extend, isCover, isZoom, zoom, title} = this.options;
        this.layer = L.markerClusterGroup({
            disableClusteringAtZoom: zoom || 20,
            spiderfyOnMaxZoom: extend || true,
            showCoverageOnHover: isCover || true,
            zoomToBoundsOnClick: isZoom || true
        });
        for (var i = 0; i < this.data.length; i++) {
            var point = this.data[i];
            var count = point.count;
            var label = point.properties[title];
            var marker = L.marker(
                L.latLng(point.geometry.coordinates[1], point.geometry.coordinates[0]),
                {title: label}
            );
            marker.bindPopup(String(count)).openPopup();
            this.layer.addLayer(marker);
        }
        map.addLayer(this.layer)
    },

    onRemove: function (map) {
        this.layer.remove();
    }
});

export var markerClusterLayer = function (map, geojson, options) {
    return new MarkerClusterLayer(map, geojson, options);
};

L.zondy.MarkerClusterLayer = markerClusterLayer;
