import L from "leaflet";
import '../../core/Base';
import { MapvLayer } from "../MapvLayer";
import { DataSet } from "mapv";

/**
 * leaflet的聚类图的实现
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class L.zondy.ClusterLayer
 * @classdesc 基于leaflet的Layer对象进行的拓展
 * @param map - {Object} 传入的leaflet的地图对象
 * @param geojson - {Object} 热力图目前支持持`点数据`的 GeoJSON 格式
 * @param options - {Object} mapv.options
 * @param options.size - {Number} 单个聚类点的`半径`大小
 * @param options.max - {Number} 最大的`聚类程度`
 * @param options.field - {String} 选择对应的字段，该字段必须是`数字型`的字段，用来计算大小和颜色
 * @param options.type - {String} 'grid' 或者 'honeycomb'
 * @param options.gradient - {Object} 不同比例程度对应的`颜色`，如25%对应蓝色，55%对应绿色，100%对应红色
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
 *   var heaterLayer = new L.zondy.ClusterLayer(map, geojson, options).addTo(map);
 */
export var ClusterLayer= L.Layer.extend({

    map: null, //传入的leaflet地图
    options: {},
    data: [],
    dataset: null,

    initialize: function (map, geojson, options) {
        this.map = map;
        let default_options = {
            size: 1,
            label: {
                sho1: true,
                fillStyle: 'white',
                shadowColor: 'yellow',
                font: '15px Arial',
                shadowBlur: 10
            },
            gradient:  {
                0.25: "rgb(0,0,255)",
                0.55: "rgb(0,255,0)",
                0.85: "yellow",
                1.0: "rgb(255,0,0)"
            },
            max: 1,
            draw: 'grid'
        };
        if (!options) return;

        let { size, gradient, max, field, type } = options;
        this.field = field;
        this.options = {
            size: size || 1,
            label: {
                sho1: true,
                fillStyle: 'white',
                shadowColor: 'yellow',
                font: '15px Arial',
                shadowBlur: 10
            },
            gradient: gradient || {
                0: "rgba(49, 54, 149, 0)",
                0.2: "rgba(69,117,180, 0.7)",
                0.3: "rgba(116,173,209, 0.7)",
                0.4: "rgba(171,217,233, 0.7)",
                0.5: "rgba(224,243,248, 0.7)",
                0.6: "rgba(254,224,144,0.7)",
                0.7: "rgba(253,174,97,0.7)",
                0.8: "rgba(244,109,67,0.8)",
                0.9: "rgba(215,48,39,0.8)",
                0.95: "rgba(165, 0, 38,0.8)"
            },
            shadowColor: 'rgba(255, 255, 50, 1)',
            shadowBlur: 5,
            max: max || 100,
            draw: type || 'grid'
        };
        // this.options = {default_options, ...options};

        this.data = this.convertData(geojson);

        this.layer = null;
    },

    convertData: function(geojson){
        let self = this;
        let data = [];
          if(!geojson) return data;
        let type = geojson.type;
        if(type === 'FeatureCollection') {
            let features = geojson.features;
              if(!features || features.length <= 0) return data;
            let key = this.findNumberFieldName(features[0].properties);
            data = geojson.features.map(i=>{
                i.count = i.properties[self.field || key];
                return i;
            });
        } else if(type === 'Ponit') {

        } else if(type === 'MultiPonit') {

        }

        return data;
    },

    findNumberFieldName: function(properties){
        let keys = Object.keys(properties);
        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            if(typeof keys[i] === 'number'){
                return key;
            }
        }
        return undefined;
    },

    onAdd: function (map) {
        this.map = map;
        this.dataset = new DataSet(this.data);
        this.layer = new MapvLayer(map, this.dataset, this.options).addTo(map);
    },

    onRemove: function (map) {
        this.layer.remove();
    },

    /**
     * 显示图层
     * @function L.zondy.ClusterLayer.prototype.show
     */
    show: function () {
        this.layer && this.layer.show();
    },

    /**
     * 隐藏图层
     * @function L.zondy.ClusterLayer.prototype.hide
     */
    hide: function () {
        this.layer && this.layer.hide();
    }
});

export var clusterLayer = function (map, geojson, options) {
    return new ClusterLayer(map, geojson, options);
};

L.zondy.ClusterLayer= clusterLayer;
