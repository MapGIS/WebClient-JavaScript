import {
    Zondy
} from '../common/Base';
import {
    extend
} from "../common/Util";
/**
 * 分段专题图表达式信息对象构造函数
 * @class module:专题图服务.ExpInfo
 * @classdesc 分段专题图表达式信息对象构造函数
 * @description Zondy.Object.Theme.ExpInfo 
 * @param {String} [expression=] 分级字段表达式
 * @param {Array} [itemValueArr=null] 分段专题图分段值
 * @param {Object} opt_options 属性键值对
 */
var ExpInfo = function (expression, itemValueArr, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    extend(this, options);
    /**
     * @private
     * @member Zondy.Object.Theme.ExpInfo.prototype.Expression
     * @type {String}
     * @description 分级字段表达式
     * @default ""
     */
    this.Expression = (expression !== undefined) ? expression : "";

    /**
     * @private
     * @member Zondy.Object.Theme.ExpInfo.prototype.ItemValueArr
     * @type {Array}
     * @description 分段专题图分段值 Array<{@link Zondy.Object.Theme.ItemValue}>
     * @default null
     */
    this.ItemValueArr = (itemValueArr !== undefined) ? itemValueArr : null;
};
export {
    ExpInfo
};
Zondy.Object.Theme.ExpInfo = ExpInfo;