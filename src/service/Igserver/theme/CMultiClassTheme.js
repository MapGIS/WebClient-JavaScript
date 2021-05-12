import {
    Zondy
} from '../../common/Base';
import {
    CTheme
} from "./CTheme";
import {
    CThemeInfo
} from "./CThemeInfo";
import {
    ExpInfo
} from "./ExpInfo";

/**
 * 分段专题图（多字段）
 * @class module:专题图服务.CMultiClassTheme
 * @classdesc 分段专题图（多字段）
 * @description Zondy.Object.Theme.CMultiClassTheme 
 * @extends CTheme
 * @param {Object} opt_options 属性键值对。
 * @param {Zondy.Object.Theme.CThemeInfo} [opt_options.DefaultInfo = null] 缺省专题绘制信息 {@link Zondy.Object.Theme.CThemeInfo}
 * @param {Array} [opt_options.ExpInfoArr = null] 分段信息 Array<{@link Zondy.Object.Theme.ExpInfo}>
 * @param {Array} [opt_options.MultiClassThemeInfoArr = null] （笛卡尔积之后）每段专题绘制信息（如果不设置则采用默认绘制信息） Array<{@link Zondy.Object.Theme.CThemeInfo}>
 * @param {String} [opt_options.GeoInfoType = null] 专题绘制的图形类型，Reg/Lin/Pnt
 */
class CMultiClassTheme extends CTheme {
    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);
        /**
         * @private
         * @member Zondy.Object.Theme.CMultiClassTheme.prototype.DefaultInfo
         * @type {Zondy.Object.Theme.CThemeInfo}
         * @description 缺省专题绘制信息 {@link Zondy.Object.Theme.CThemeInfo}
         * @default null
         */
        this.DefaultInfo = (options.DefaultInfo !== undefined) ? options.DefaultInfo : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CMultiClassTheme.prototype.ExpInfoArr
         * @type {Array}
         * @description 分段信息 Array<{@link Zondy.Object.Theme.ExpInfo}>
         * @default null
         */
        this.ExpInfoArr = (options.ExpInfoArr !== undefined) ? options.ExpInfoArr : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CMultiClassTheme.prototype.MultiClassThemeInfoArr
         * @type {Array}
         * @description （笛卡尔积之后）每段专题绘制信息（如果不设置则采用默认绘制信息） Array<{@link Zondy.Object.Theme.CThemeInfo}>
         * @default null
         */
        this.MultiClassThemeInfoArr = (options.MultiClassThemeInfoArr !== undefined) ? options.MultiClassThemeInfoArr : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CMultiClassTheme.prototype.GeoInfoType
         * @type {String}
         * @description 专题绘制的图形类型，Reg/Lin/Pnt
         * @default null
         */
        this.GeoInfoType = (options.GeoInfoType !== undefined) ? options.GeoInfoType : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CMultiClassTheme.prototype.Type
         * @type {String}
         * @description 专题图类型,只读属性
         * @default "CMultiClassTheme"
         */
        this.Type = "CMultiClassTheme";
    }
}
export {
    CMultiClassTheme
};
Zondy.Object.Theme.CMultiClassTheme = CMultiClassTheme;