import { Zondy } from '../../common/Base';
import { extend } from '../../common/Util';
import { toJSON } from '../../common/Util';
/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:要素服务.QueryFeatureStruct
 * @classdesc 要素结构查询类构造函数
 * @description Zondy.Service.QueryFeatureStruct 
 * @param option - {Object} 属性键值对。<br>
 * @param {Boolean} [option.IncludeAttribute=true] 是否包含属性值
 * @param {Boolean} [option.IncludeGeometry=false] 是否包含几何图形信息
 * @param {Boolean} [option.IncludeWebGraphic=false] 是否包含图形参数
 * @example
 var queryStruct = new Zondy.Service.QueryFeatureStruct();
 queryStruct.IncludeGeometry = true;
 */
var QueryFeatureStruct = function (option) {
    var options = option ? option : {};
    extend(this, options);
    /**
     * @private
     * @member Zondy.Service.QueryFeatureStruct.prototype.IncludeAttribute
     * @type {Boolean}
     * @description 是否包含属性值
     * @default true
     */
    this.IncludeAttribute = options.IncludeAttribute !== undefined && typeof options.IncludeAttribute === 'boolean' ? options.IncludeAttribute : true;

    /**
     * @private
     * @member Zondy.Service.QueryFeatureStruct.prototype.IncludeGeometry
     * @type {Boolean}
     * @description 是否包含几何图形信息
     * @default false
     */
    this.IncludeGeometry = options.IncludeGeometry !== undefined && typeof options.IncludeGeometry === 'boolean' ? options.IncludeGeometry : false;

    /**
     * @private
     * @member Zondy.Service.QueryFeatureStruct.prototype.IncludeGeometry
     * @type {Boolean}
     * @description 是否包含图形参数
     * @default false
     */
    this.IncludeWebGraphic =
        options.IncludeWebGraphic !== undefined && typeof options.IncludeWebGraphic === 'boolean' ? options.IncludeWebGraphic : false;
};
/**
 * @description 获取此类的json形式的字符串
 * @function Zondy.Service.QueryFeatureStruct.prototype.toJSON
 * @returns json形式的字符串
 */
QueryFeatureStruct.prototype.toJSON = function () {
    return toJSON(this);
};
export { QueryFeatureStruct };
Zondy.Service.QueryFeatureStruct = QueryFeatureStruct;
