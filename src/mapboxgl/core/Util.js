 import mapboxgl from "@mapgis/mapbox-gl";
 import "../core/Base";
 
 /**
  * @class mapboxgl.zondy.Util
  * @category BaseTypes Util
  * @classdesc 工具类。
  */
 export class Util {


     /**
      * @function mapboxgl.zondy.Util.isArray
      * @description 判断是否为数组格式。
      * @param {Object} obj - 待判断对象。
      * @returns {boolean} 是否是数组。
      */
     static isArray(obj) {
         return Object.prototype.toString.call(obj) == "[object Array]";
     }
 
     /**
      * @function mapboxgl.zondy.Util.toProcessingParam
      * @description 将 Region 节点数组转为 Processing 服务需要的分析参数。
      * @param {Array} points - Region 各个节点数组。
      * @returns {Object} processing 服务裁剪、查询分析的分析参数。
      */
     static toProcessingParam(points) {
         var geometryParam = {};
         if (points.length < 1) {
             geometryParam = "";
         } else {
             var results = [];
             for (var i = 0; i < points.length; i++) {
                 var point = {};
                 point.x = points[i][0];
                 point.y = points[i][1];
                 results.push(point);
             }
             geometryParam.type = "REGION";
             geometryParam.points = results;
         }
         return geometryParam;
     }
 
     /**
      * @function mapboxgl.zondy.Util.extend
      * @description 对象拷贝赋值。
      * @param {Object} dest - 目标对象。
      * @param {Object} arguments - 待拷贝的对象。
      * @returns {Object} 赋值后的目标对象。
      */
     static extend(dest) {
         for (var index = 0; index < Object.getOwnPropertyNames(arguments).length; index++) {
             var arg = Object.getOwnPropertyNames(arguments)[index];
             if (arg == "caller" || arg == "callee" || arg == "length" || arg == "arguments") {
                 continue;
             }
             var obj = arguments[arg];
             if (obj) {
                 for (var j = 0; j < Object.getOwnPropertyNames(obj).length; j++) {
                     var key = Object.getOwnPropertyNames(obj)[j];
                     if (arg == "caller" || arg == "callee" || arg == "length" || arg == "arguments") {
                         continue;
                     }
                     dest[key] = obj[key];
                 }
             }
         }
         return dest;
     }
 
     /**
      * 检测数据是否为number
      * @param value 值，未知数据类型
      * @returns {boolean}
      */
     static isNumber(value) {
         if (value === "") {
             return false;
         }
         let mdata = Number(value);
         if (mdata === 0) {
             return true;
         }
         return !isNaN(mdata);
     }
 
     static isString(str) {
       return (typeof str === 'string') && str.constructor === String;
   }
     /**
      * 随机生成id
      * @param attr
      * @returns {string}
      */
     static newGuid(attr) {
         let len = attr || 32;
         let guid = "";
         for (let i = 1; i < len; i++) {
             let n = Math.floor(Math.random() * 16.0).toString(16);
             guid += n;
         }
         return guid;
     }
     /**
      * @description 十六进制转 RGBA 格式。
      * @param {Object} hex - 十六进制格式参数。
      * @param {number} opacity -Alpha 参数。
      * @returns {string} 生成的 RGBA 格式。
      */
     static hexToRgba(hex, opacity) {
         var color = [],
             rgba = [];
         hex = hex.replace(/#/, "");
         if (hex.length == 3) {
             var tmp = [];
             for (let i = 0; i < 3; i++) {
                 tmp.push(hex.charAt(i) + hex.charAt(i));
             }
             hex = tmp.join("");
         }
         for (let i = 0; i < 6; i += 2) {
             color[i] = "0x" + hex.substr(i, 2);
             rgba.push(parseInt(Number(color[i])));
         }
         rgba.push(opacity);
         return "rgba(" + rgba.join(",") + ")";
     }
 
     /**
      * @param {string} featureName 原始数据中的地名
      * @param {string} fieldName 需要匹配的地名
      * @returns {boolean} 是否匹配
      */
     static isMatchAdministrativeName(featureName, fieldName) {
       if (this.isString(fieldName)) {
           let shortName = featureName.substr(0, 2);
           // 张家口市和张家界市 特殊处理
           if (shortName === '张家') {
               shortName = featureName.substr(0, 3);
           }
           return !!fieldName.match(new RegExp(shortName));
       }
       return false;
   }
 }
 
 mapboxgl.zondy.Util = Util;