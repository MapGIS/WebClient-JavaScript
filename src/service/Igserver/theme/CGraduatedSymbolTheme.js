import {
    Zondy
} from '../../common/Base';
import {
    CTheme
} from "./CTheme";
import {
    CPntInfo
} from "./CPntInfo";

/**
 * 等级符号专题图
 * @class module:专题图服务.CGraduatedSymbolTheme
 * @classdesc 等级符号专题图
 * @description Zondy.Object.Theme.CGraduatedSymbolTheme
 * @extends CTheme
 * @param {Object} opt_options 属性键值对。
 * @param {Number} [opt_options.BaseValue = 0.000141] 一定大小的符号代表的属性值
 * @param {Boolean} [opt_options.DispMinus = false] 是否显示负值
 * @param {Boolean} [opt_options.DispZero = false] 是否显示零值
 * @param {String} [opt_options.Expression = null] 字段表达式
 * @param {Zondy.Object.Theme.CPntInfo} [opt_options.MinusPntInfo = null] 负值点图形信息 {@link Zondy.Object.Theme.CPntInfo}
 * @param {Zondy.Object.Theme.CPntInfo} [opt_options.PlusPntInfo = null] 正值点图形信息 {@link Zondy.Object.Theme.CPntInfo}
 * @param {Zondy.Object.Theme.CPntInfo} [opt_options.ZeroPntInfo = null] 零值点图形信息 {@link Zondy.Object.Theme.CPntInfo}
 */
class CGraduatedSymbolTheme extends CTheme {
    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);
        /**
         * @private
         * @member Zondy.Object.Theme.CGraduatedSymbolTheme.prototype.BaseValue
         * @type {Number}
         * @description 一定大小的符号代表的属性值
         * @default 0.000141
         */
        this.BaseValue = (options.BaseValue !== undefined) ? options.BaseValue : 0.000141;

        /**
         * @private
         * @member Zondy.Object.Theme.CGraduatedSymbolTheme.prototype.DispMinus
         * @type {Boolean}
         * @description 是否显示负值
         * @default false
         */
        this.DispMinus = (options.DispMinus !== undefined) ? options.DispMinus : false;

        /**
         * @private
         * @member Zondy.Object.Theme.CGraduatedSymbolTheme.prototype.DispZero
         * @type {Boolean}
         * @description 是否显示零值
         * @default false
         */
        this.DispZero = (options.DispZero !== undefined) ? options.DispZero : false;

        /**
         * @private
         * @member Zondy.Object.Theme.CGraduatedSymbolTheme.prototype.Expression
         * @type {String}
         * @description 字段表达式
         * @default null
         */
        this.Expression = (options.Expression !== undefined) ? options.Expression : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CGraduatedSymbolTheme.prototype.MinusPntInfo
         * @type {Zondy.Object.Theme.CPntInfo}
         * @description 负值点图形信息 {@link Zondy.Object.Theme.CPntInfo}
         * @default null
         */
        this.MinusPntInfo = (options.MinusPntInfo !== undefined) ? options.MinusPntInfo : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CGraduatedSymbolTheme.prototype.PlusPntInfo
         * @type {Zondy.Object.Theme.CPntInfo}
         * @description 正值点图形信息 {@link Zondy.Object.Theme.CPntInfo}
         * @default null
         */
        this.PlusPntInfo = (options.PlusPntInfo !== undefined) ? options.PlusPntInfo : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CGraduatedSymbolTheme.prototype.ZeroPntInfo
         * @type {Zondy.Object.Theme.CPntInfo}
         * @description 零值点图形信息 {@link Zondy.Object.Theme.CPntInfo}
         * @default null
         */
        this.ZeroPntInfo = (options.ZeroPntInfo !== undefined) ? options.ZeroPntInfo : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CGraduatedSymbolTheme.prototype.Type
         * @type {String}
         * @description 专题图类型,只读属性
         * @default "CGraduatedSymbolTheme"
         */
        this.Type = "CGraduatedSymbolTheme";
    }
}
export {
    CGraduatedSymbolTheme
};
Zondy.Object.Theme.CGraduatedSymbolTheme = CGraduatedSymbolTheme;