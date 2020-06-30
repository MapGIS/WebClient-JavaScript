import {
    Zondy
} from '../common/Base';
import {
    extend
} from "../common/Util";
import {
    CAnnInfo
} from "./CAnnInfo";
import {
    CChartLabelFormat
} from "./CChartLabelFormat";

/**
 * @class module:专题图服务.CChartThemeRepresentInfo
 * @classdesc Zondy.Object.Theme.CChartThemeRepresentInfo 统计图符号参数信息
 * @param {Object} opt_options 属性键值对。
 * @param {Object} [opt_options.AnnInfoLabel = new CAnnInfo()] 统计值作为注记的表现信息 {@link Zondy.Object.Theme.CAnnInfo}
 * @param {Number} [opt_options.DigitLabel = 0] 统计值小数点位置
 * @param {Number} [opt_options.FormatLabel = CChartLabelFormat.Unknown] 统计值类型 {@link Zondy.Object.Theme.CChartLabelFormat}
 * @param {Boolean} [opt_options.IsDrawLabel = true] 是否显示统计值
 * @param {Number} [opt_options.LineColor = -1] 线颜色值
 * @param {Number} [opt_options.MaxLength = 30.00] 统计图标最大长度
 * @param {Number} [opt_options.MinRadius = 10.00] 统计图标最小半径
 * @param {Number} [opt_options.PieSizeFixFlag = 0] 统计图标大小是否固定
 * @param {Number} [opt_options.PieTiltedAngle = 30.00] 统计图标倾斜角度
 * @param {Number} [opt_options.PlotRadius = 1.00] 统计图标半径
 * @param {Number} [opt_options.ThickPersent = 10.00] 统计图标厚度
 * @param {Number} [opt_options.Width = 3.00] 统计图标宽度
 */
var CChartThemeRepresentInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    extend(this, options);
    /**
     * @member Zondy.Object.Theme.CChartThemeRepresentInfo.prototype.AnnInfoLabel
     * @type {Object}
     * @description 统计值作为注记的表现信息 {@link Zondy.Object.Theme.CAnnInfo}
     * @default new CAnnInfo()
     */
    this.AnnInfoLabel = (options.AnnInfoLabel !== undefined) ? options.AnnInfoLabel : new CAnnInfo();

    /**
     * @member Zondy.Object.Theme.CChartThemeRepresentInfo.prototype.DigitLabel
     * @type {Number}
     * @description 统计值小数点位置
     * @default 0
     */
    this.DigitLabel = (options.DigitLabel !== undefined) ? options.DigitLabel : 0;

    /**
     * @member Zondy.Object.Theme.CChartThemeRepresentInfo.prototype.FormatLabel
     * @type {Number}
     * @description 统计值类型 {@link Zondy.Object.Theme.CChartLabelFormat}
     * @default CChartLabelFormat.Unknown
     */
    this.FormatLabel = (options.FormatLabel !== undefined) ? options.FormatLabel : CChartLabelFormat.Unknown;

    /**
     * @member Zondy.Object.Theme.CChartThemeRepresentInfo.prototype.IsDrawLabel
     * @type {Boolean}
     * @description 是否显示统计值
     * @default true
     */
    this.IsDrawLabel = (options.IsDrawLabel !== undefined) ? options.IsDrawLabel : true;

    /**
     * @member Zondy.Object.Theme.CChartThemeRepresentInfo.prototype.LineColor
     * @type {Number}
     * @description 线颜色值
     * @default -1
     */
    this.LineColor = (options.LineColor !== undefined) ? options.LineColor : -1;

    /**
     * @member Zondy.Object.Theme.CChartThemeRepresentInfo.prototype.MaxLength
     * @type {Number}
     * @description 统计图标最大长度
     * @default 30
     */
    this.MaxLength = (options.MaxLength !== undefined) ? options.MaxLength : 30;

    /**
     * @member Zondy.Object.Theme.CChartThemeRepresentInfo.prototype.MinRadius
     * @type {Number}
     * @description 统计图标最小半径
     * @default 10
     */
    this.MinRadius = (options.MinRadius !== undefined) ? options.MinRadius : 10;

    /**
     * @member Zondy.Object.Theme.CChartThemeRepresentInfo.prototype.PieSizeFixFlag
     * @type {Number}
     * @description 统计图标大小是否固定
     * @default 0
     */
    this.PieSizeFixFlag = (options.PieSizeFixFlag !== undefined) ? options.PieSizeFixFlag : 0;

    /**
     * @member Zondy.Object.Theme.CChartThemeRepresentInfo.prototype.PieTiltedAngle
     * @type {Number}
     * @description 统计图标倾斜角度
     * @default 30
     */
    this.PieTiltedAngle = (options.PieTiltedAngle !== undefined) ? options.PieTiltedAngle : 30;

    /**
     * @member Zondy.Object.Theme.CChartThemeRepresentInfo.prototype.PlotRadius
     * @type {Number}
     * @description 统计图标半径
     * @default 1
     */
    this.PlotRadius = (options.PlotRadius !== undefined) ? options.PlotRadius : 1;

    /**
     * @member Zondy.Object.Theme.CChartThemeRepresentInfo.prototype.ThickPersent
     * @type {Number}
     * @description 统计图标厚度
     * @default 10
     */
    this.ThickPersent = (options.ThickPersent !== undefined) ? options.ThickPersent : 10;

    /**
     * @member Zondy.Object.Theme.CChartThemeRepresentInfo.prototype.Width
     * @type {Number}
     * @description 统计图标宽度
     * @default 3
     */
    this.Width = (options.Width !== undefined) ? options.Width : 3;
};
export {
    CChartThemeRepresentInfo
};
Zondy.Object.Theme.CChartThemeRepresentInfo = CChartThemeRepresentInfo;