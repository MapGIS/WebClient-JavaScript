import {
    Zondy
} from '../common/Base';
import {
    CTheme
} from "./CTheme";
import {
    CAllOtherDataItemInfoSource
} from "./CAllOtherDataItemInfoSource";
import {
    CThemeInfo
} from "./CThemeInfo";
import {
    CRangeThemeInfo
} from "./CRangeThemeInfo";

/**
 * 分段专题图（单字段分段）
 * @class module:专题图服务.CRangeTheme
 * @classdesc Zondy.Object.Theme.CRangeTheme 分段专题图（单字段分段）
 * @extends CTheme
 * @param {Object} opt_options 属性键值对
 * @param {Number} [opt_options.AllOtherDataItemInfoSource = CAllOtherDataItemInfoSource.DefaultThemeInfo] 未参与分类数据图形参数 {@link Zondy.Object.Theme.CAllOtherDataItemInfoSource}
 * @param {String} [opt_options.Expression = ""] 唯一字段表达式
 * @param {Zondy.Object.Theme.CThemeInfo} [opt_options.DefaultInfo = null] 缺省专题绘制信息 {@link Zondy.Object.Theme.CThemeInfo}
 * @param {Array} [opt_options.RangeThemeInfoArr = null] 范围专题图项信息数组 Array<{@link Zondy.Object.Theme.CRangeThemeInfo}>
 * @param {String} [opt_options.GeoInfoType = null] 专题绘制的图形类型，Reg/Lin/Pnt
 * @param {String} [Type = "CRangeTheme"] 专题图类型,只读属性
 */
class CRangeTheme extends CTheme {
    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);
        /**
         * @private
         * @member Zondy.Object.Theme.CRangeTheme.prototype.AllOtherDataItemInfoSource
         * @type {Number}
         * @description 未参与分类数据图形参数 {@link Zondy.Object.Theme.CAllOtherDataItemInfoSource}
         * @default CAllOtherDataItemInfoSource.DefaultThemeInfo
         */
        this.AllOtherDataItemInfoSource = (options.AllOtherDataItemInfoSource !== undefined) ? options.AllOtherDataItemInfoSource : CAllOtherDataItemInfoSource.DefaultThemeInfo;

        /**
         * @private
         * @member Zondy.Object.Theme.CRangeTheme.prototype.Expression
         * @type {String}
         * @description 唯一字段表达式
         * @default ""
         */
        this.Expression = (options.Expression !== undefined) ? options.Expression : "";

        /**
         * @private
         * @member Zondy.Object.Theme.CRangeTheme.prototype.DefaultInfo
         * @type {Zondy.Object.Theme.CThemeInfo}
         * @description 缺省专题绘制信息 {@link Zondy.Object.Theme.CThemeInfo}
         * @default null
         */
        this.DefaultInfo = (options.DefaultInfo !== undefined) ? options.DefaultInfo : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CRangeTheme.prototype.RangeThemeInfoArr
         * @type {Array}
         * @description 范围专题图项信息数组 Array<{@link Zondy.Object.Theme.CRangeThemeInfo}>
         * @default null
         */
        this.RangeThemeInfoArr = (options.RangeThemeInfoArr !== undefined) ? options.RangeThemeInfoArr : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CRangeTheme.prototype.GeoInfoType
         * @type {String}
         * @description 专题绘制的图形类型，Reg/Lin/Pnt
         * @default null
         */
        this.GeoInfoType = (options.GeoInfoType !== undefined) ? options.GeoInfoType : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CRangeTheme.prototype.Type
         * @type {String}
         * @description 专题图类型,只读属性
         * @default "CRangeTheme"
         */
        this.Type = "CRangeTheme";
    }
}
export {
    CRangeTheme
};
Zondy.Object.Theme.CRangeTheme = CRangeTheme;