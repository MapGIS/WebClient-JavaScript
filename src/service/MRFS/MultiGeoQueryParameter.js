import {Zondy} from '../common/Base';
import {extend}  from  "../common/Util";
/**
 * @author 基础平台/产品2部 龚跃健
 * @description 多几何参数查询类构造函数
 * @class module:要素服务.MultiGeoQueryParameter
 * @classdesc 多几何参数查询类构造函数
 * @description Zondy.Service.MultiGeoQueryParameter
 * @param option - {Object} 属性键值对。<br>
 * @param {Array} [option.geometry = null] 用于查询的多几何数组
 * @param {String} [option.geometryType = null] 几何类型，表示geometry中元素代表的几何类型，可取值为"point","line","polygon"
 * @param {String} [option.resultFormat = json] 回调结果的包装形式
 * @param {Number} [option.nearDis = 0.0001] 缓冲半径，仅在多点和多线查询时起效
 */
var MultiGeoQueryParameter = function (option) {
    var options = (option !== undefined) ? option : {};

    extend(this, options);
    /**
     * @private
     * @member Zondy.Service.MultiGeoQueryParameter.prototype.geometry
     * @type {String}
     * @description 用于查询的多几何数组，Zondy.Object.Point2D或Zondy.Object.PolyLine或Zondy.Object.Polygon对象构成的数组
     */
    this.geometry = options.geometry !== undefined ? options.geometry : null;

    /**
     * @private
     * @member Zondy.Service.MultiGeoQueryParameter.prototype.geometryType
     * @type {String}
     * @description 几何类型，表示geometry中元素代表的几何类型，可取值为"point","line","polygon"
     * @default null
     */
    this.geometryType = options.geometryType !== undefined ? options.geometryType : null;

    /**
     * @private
     * @member Zondy.Service.MultiGeoQueryParameter.prototype.geometryType
     * @type {String}
     * @description 回调结果的包装形式
     * @default json
     */
    this.resultFormat = options.resultFormat !== undefined ? options.resultFormat : "json";

    /**
     * @private
     * @member Zondy.Service.MultiGeoQueryParameter.prototype.geometryType
     * @type {Number}
     * @description 缓冲半径，仅在多点和多线查询时起效
     * @default 0.0001
     */
    this.nearDis = options.nearDis !== undefined ? options.nearDis : 0.0001;
};
/**
 * @description 获取相关参数的REST-URL表示形式
 * @function Zondy.Service.MultiGeoQueryParameter.prototype.getParameterURL
 */
MultiGeoQueryParameter.prototype.getParameterURL = function () {
    var paramUrl = "";
    paramUrl += "?f=" + this.resultFormat;
    paramUrl += "&geometryType=" + this.geometryType;
    paramUrl += "&nearDis=" + this.nearDis;
    return paramUrl;
};
export {MultiGeoQueryParameter};
Zondy.Service.MultiGeoQueryParameter = MultiGeoQueryParameter;