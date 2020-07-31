import {
    Zondy
} from '../common/Base';
import {
    CTheme
} from "./CTheme";
import {
    CThemeInfo
} from "./CThemeInfo";
import {
    CUniqueThemeInfo
} from "./CUniqueThemeInfo";

/**
 * 单值专题图
 * @class module:专题图服务.CUniqueTheme
 * @classdesc 单值专题图
 * @description Zondy.Object.Theme.CUniqueTheme 
 * @extends CTheme
 * @param {Object} opt_options 属性键值对
 * @param {Zondy.Object.Theme.CThemeInfo} [opt_options.DefaultInfo = null] 缺省专题绘制信息 {@link Zondy.Object.Theme.CThemeInfo}
 * @param {String} [opt_options.Expression = ""] 唯一字段表达式类型
 * @param {Array} [opt_options.UniqueThemeInfoArr = null] 专题绘制信息（如果不设置则采用默认绘制信息） Array<{@link Zondy.Object.Theme.CUniqueThemeInfo}>
 * @param {String} [opt_options.GeoInfoType = null] 专题绘制的图形类型，Reg/Lin/Pnt
 * @param {String} [opt_options.Type = "CUniqueTheme"] 专题图类型,只读属性
 */
class CUniqueTheme extends CTheme {
    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);

        /**
         * @private
         * @member Zondy.Object.Theme.CUniqueTheme.prototype.DefaultInfo
         * @type {Zondy.Object.Theme.CThemeInfo}
         * @description 缺省专题绘制信息 {@link Zondy.Object.Theme.CThemeInfo}
         * @default null
         */
        this.DefaultInfo = (options.DefaultInfo !== undefined) ? options.DefaultInfo : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CUniqueTheme.prototype.Expression
         * @type {String}
         * @description 唯一字段表达式类型
         * @default ""
         */
        this.Expression = (options.Expression !== undefined) ? options.Expression : "";

        /**
         * @private
         * @member Zondy.Object.Theme.CUniqueTheme.prototype.UniqueThemeInfoArr
         * @type {Array}
         * @description 专题绘制信息（如果不设置则采用默认绘制信息） Array<{@link Zondy.Object.Theme.CUniqueThemeInfo}>
         * @default null
         */
        this.UniqueThemeInfoArr = (options.UniqueThemeInfoArr !== undefined) ? options.UniqueThemeInfoArr : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CUniqueTheme.prototype.GeoInfoType
         * @type {String}
         * @description 专题绘制的图形类型，Reg/Lin/Pnt
         * @default null
         */
        this.GeoInfoType = (options.GeoInfoType !== undefined) ? options.GeoInfoType : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CUniqueTheme.prototype.Type
         * @type {String}
         * @description 专题图类型,只读属性
         * @default "CUniqueTheme"
         */
        this.Type = "CUniqueTheme";
    }
}
export {
    CUniqueTheme
};
Zondy.Object.Theme.CUniqueTheme = CUniqueTheme;