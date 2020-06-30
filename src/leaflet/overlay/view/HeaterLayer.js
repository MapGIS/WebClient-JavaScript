import L from "leaflet";
import '../../core/Base';
import { MapvLayer } from "../MapvLayer";
import { DataSet } from "mapv";

/**
 * leaflet的热力图的实现
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class L.zondy.HeaterLayer
 * @classdesc 基于leaflet的Layer对象进行的拓展
 * @param map - {Object} 传入的leaflet的地图对象
 * @param geojson - {Object} 热力图目前支持持`点数据`的 GeoJSON 格式
 * @param options - {Object} mapv.options
 * @param options.size - {Number} 单个聚类点的`半径`大小
 * @param options.max - {Number} 最大的`聚类程度`
 * @param options.field - {String} 选择对应的字段，该字段必须是`数字型`的字段，用来计算大小和颜色
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
 *   var heaterLayer = new L.zondy.HeaterLayer(map, geojson, options).addTo(map);
 */
export var HeaterLayer= L.Layer.extend({

    map: null, //传入的leaflet地图
    options: {},
    data: [],
    dataset: null,

    initialize: function (map, geojson, options) {
        this.map = map;
        let default_options = {
            size: 1,
            gradient:  {
                0.25: "rgb(0,0,255)",
                0.55: "rgb(0,255,0)",
                0.85: "yellow",
                1.0: "rgb(255,0,0)"
            },
            max: 1,
            draw: 'heatmap'
        };
        if (!options) return;

        let { size, gradient, max, field } = options;
        this.field = field;
        this.options = {
            size: size || 1,
            gradient: gradient || {
                0.25: "rgb(0,0,255)",
                0.55: "rgb(0,255,0)",
                0.85: "yellow",
                1.0: "rgb(255,0,0)"
            },
            max: max || 100,
            draw: 'heatmap'
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
     * @function L.zondy.HeaterLayer.prototype.show
     */
    show: function () {
        this.layer && this.layer.show();
    },

    /**
     * 隐藏图层
     * @function L.zondy.HeaterLayer.prototype.hide
     */
    hide: function () {
        this.layer && this.layer.hide();
    }
});

export var heaterLayer = function (map, geojson, options) {
    return new HeaterLayer(map, geojson, options);
};

L.zondy.HeaterLayer= heaterLayer;
