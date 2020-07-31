import { Zondy } from '../common/Base';
import { extend } from '../common/Util';
import { toJSON } from '../common/Util';
/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:要素服务.QueryFeatureRule
 * @classdesc 要素规则查询类构造函数
 * @description Zondy.Service.QueryFeatureRule 
 * @param option - {Object} 属性键值对。<br>
 * @param {Boolean} [option.CompareRectOnly=false] 是否仅比较要素的外包矩形，来判定是否与几何约束图形有交集
 * @param {Boolean} [option.EnableDisplayCondition=false] 是否将要素的可见性计算在内
 * @param {Boolean} [option.MustInside=false] 是否完全包含
 * @param {Boolean} [option.Intersect=false]  是否相交
 * @example
 var rule = new Zondy.Service.QueryFeatureRule({
                    //是否将要素的可见性计算在内
                    EnableDisplayCondition: false,
                    //是否完全包含
                    MustInside: false,
                    //是否仅比较要素的外包矩形
                    CompareRectOnly: false,
                    //是否相交
                    Intersect: true
                });
 */
var QueryFeatureRule = function (option) {
    var options = option ? option : {};
    extend(this, options);
    /**
     * @private
     * @member Zondy.Service.QueryFeatureRule.prototype.CompareRectOnly
     * @type {Boolean}
     * @description 是否仅比较要素的外包矩形，来判定是否与几何约束图形有交集
     * @default false
     */
    this.CompareRectOnly = options.CompareRectOnly !== undefined && typeof options.CompareRectOnly === 'boolean' ? options.CompareRectOnly : false;

    /**
     * @private
     * @member Zondy.Service.QueryFeatureRule.prototype.EnableDisplayCondition
     * @type {Boolean}
     * @description  是否将要素的可见性计算在内
     * @default false
     */
    this.EnableDisplayCondition =
        options.EnableDisplayCondition !== undefined && typeof options.EnableDisplayCondition === 'boolean' ? options.EnableDisplayCondition : false;

    /**
     * @private
     * @member Zondy.Service.QueryFeatureRule.MustInside
     * @type {Boolean}
     * @description 是否完全包含
     * @default false
     */
    this.MustInside = options.MustInside !== undefined && typeof options.MustInside === 'boolean' ? options.MustInside : false;

    /**
     * @private
     * @member Zondy.Catalog.TileLayer.prototype.Intersect
     * @type {Boolean}
     * @description 是否相交
     * @default false
     */
    this.Intersect = options.Intersect !== undefined && typeof options.Intersect === 'boolean' ? options.Intersect : false;
};
/**
 * @description 获取此类的json形式的字符串
 * @function Zondy.Service.QueryFeatureRule.prototype.toJSON
 * @returns json形式字符串
 */
QueryFeatureRule.prototype.toJSON = function () {
    return toJSON(this);
};
export { QueryFeatureRule };
Zondy.Service.QueryFeatureRule = QueryFeatureRule;
