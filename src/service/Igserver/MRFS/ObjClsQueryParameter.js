import {Zondy} from '../../common/Base';
import {extend}  from  "../../common/Util";
/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:要素服务.ObjClsQueryParameter
 * @classdesc 注记参数查询类构造函数
 * @description Zondy.Service.ObjClsQueryParameter
 * @param option - {Object} 属性键值对。<br>
 * @param {Object} [options.objectIds=null]  需要查询的要素OID号，多个间用‘，’分隔
 * @param {String} [options.where=null] 条件查询的SQL语句
 * @param {String} [options.resultFormat=json] 回调结果的包装形式
 */
var ObjClsQueryParameter = function (option) {
    var options = (option !== undefined) ? option : {};

    extend(this, options);
    /**
     * @private
     * @member Zondy.Service.ObjClsQueryParameter.prototype.objectIds
     * @type {Object}
     * @description  需要查询的要素OID号
     * @default null
     */
    this.objectIds = options.objectIds !== undefined ? options.objectIds : null;

    /**
     * @private
     * @member Zondy.Service.ObjClsQueryParameter.prototype.where
     * @type {String}
     * @description 条件查询的SQL语句
     * @default null
     */
    this.where = options.where !== undefined ? options.where : null;

    /**
     * @private
     * @member Zondy.Service.ObjClsQueryParameter.prototype.resultFormat
     * @type {String}
     * @description 回调结果的包装形式
     * @default json
     */
    this.resultFormat = options.resultFormat !== undefined ? options.resultFormat : "json";
};

/**
 * @description 获取相关参数的REST-URL表示形式
 * @function Zondy.Service.ObjClsQueryParameter.prototype.getParameterURL
 */
ObjClsQueryParameter.prototype.getParameterURL = function () {
    var paramUrl = "";
    paramUrl += "&f=" + this.resultFormat;
    if (this.objectIds !== null) {
        paramUrl += "&objectIds=" + this.objectIds;
    }
    else {
        if (this.where !== null) {
            paramUrl += "&where=" + this.where;
        }
    }

    return paramUrl;
};
export {ObjClsQueryParameter};
Zondy.Service.ObjClsQueryParameter = ObjClsQueryParameter;