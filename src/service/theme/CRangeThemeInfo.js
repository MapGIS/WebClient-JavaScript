import {
    Zondy
} from '../common/Base';
import {
    CThemeInfo
} from "./CThemeInfo";

/**
 * 分段专题图信息对象构造函数
 * @class module:专题图服务.CRangeThemeInfo
 * @classdesc 分段专题图信息对象构造函数
 * @description Zondy.Object.Theme.CRangeThemeInfo 
 * @extends CThemeInfo
 * @param {Object} opt_options 属性键值对
 * @param {String} [StartValue = ""] 开始值
 * @param {String} [EndValue = ""] 结束值
 */
class CRangeThemeInfo extends CThemeInfo {
    constructor(startValue, endValue, opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);
        /**
         * @private
         * @member Zondy.Object.Theme.CRangeThemeInfo.prototype.StartValue
         * @type {String}
         * @description 开始值
         * @default ""
         */
        this.StartValue = (startValue !== undefined) ? startValue : "";
        /**
         * @private
         * @member Zondy.Object.Theme.CRangeThemeInfo.prototype.EndValue
         * @type {String}
         * @description 结束值
         * @default ""
         */
        this.EndValue = (endValue !== undefined) ? endValue : "";
    }
}
export {
    CRangeThemeInfo
};
Zondy.Object.Theme.CRangeThemeInfo = CRangeThemeInfo;