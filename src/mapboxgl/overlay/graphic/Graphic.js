 import mapboxgl from 'mapbox-gl';
 import '../../core/Base';
 import {Util} from "../../core/Util";
 
 
 /**
  * @class mapboxgl.zondy.Graphic
  * @classdesc 高效率点图层点要素类。
  * @category  Visualization Graphic
  * @param {(Object|Array.<number>)} lngLat - 坐标。格式：经纬度数组或包含{lng,lat}格式对象。
  * @param {Object} style - 图形参数。
  * @param {Array.<number>} [style.color] - 点颜色。目前只支持 rgba 数组。
  * @param {Object} [style.radius] - 点半径。
  * @param {Object} [attributes] - 属性信息。
  * @example
  * var graphic = new mapboxgl.zondy.Graphic(
  *    {
  *         lng:116,
  *         lat:39
  *    },{
  *         color:[255,0,0],
  *         radius:30
  *    }
  * });
  */
 export class Graphic {
     constructor(lngLat, style, attributes) {
 
         this.lngLat = Util.isArray(lngLat) ? {lng: lngLat[0], lat: lngLat[1]} : lngLat;
         this.style = Util.extend({}, style);
         this.attributes = attributes;
     }
     /**
      * @function mapboxgl.zondy.Graphic.prototype.getId
      * @description 获取当前 ID。
      * @returns {string} id
      */
     getId() {
         return this.id;
     }
 
     /**
      * @function mapboxgl.zondy.Graphic.prototype.setId
      * @description 设置当前要素 ID。
      * @param {string} id - 要素 ID。
      */
 
     setId(id) {
         this.id = id;
     }
 
     /**
      * @function mapboxgl.zondy.Graphic.prototype.getLngLat
      * @description 获取经纬度坐标。
      * @returns {Object} 经纬度坐标,数据格式{lng,lat}。
      */
     getLngLat() {
         return this.lngLat;
     }
 
     /**
      * @function mapboxgl.zondy.Graphic.prototype.setLngLat
      * @description 设置经纬度坐标。
      * @param {Object} lngLat - 经纬度坐标,数据格式{lng,lat}。
      */
     setLngLat(lngLat) {
         this.lngLat = Util.isArray(lngLat) ? {lng: lngLat[0], lat: lngLat[1]} : lngLat;
     }
 
     /**
      * @function mapboxgl.zondy.Graphic.prototype.setStyle
      * @description 设置点样式。
      * @param {Object} style -样式选项。
      * @param {Array} [style.color] - 颜色。
      * @param {number} [style.radius] - 半径。
      */
     setStyle(style) {
         this.style = Util.extend(this.style, style);
     }
 
     /**
      * @function mapboxgl.zondy.Graphic.prototype.getStyle
      * @description 获取样式。
      * @returns {Object} 点样式。
      */
     getStyle() {
         return this.style;
     }
 
     /**
      * @function mapboxgl.zondy.Graphic.prototype.setAttributes
      * @description 设置属性信息。
      * @param {Object} [attributes] - 属性信息。
      */
     setAttributes(attributes) {
         this.attributes = Util.extend({}, this.attributes, attributes);
     }
 
     /**
      * @function mapboxgl.zondy.Graphic.prototype.getAttributes
      * @description 获取属性信息。
      * @returns {Object} 属性信息。
      */
     getAttributes() {
         return this.attributes;
     }
 }
 
 mapboxgl.zondy.Graphic = Graphic;