import {
    Zondy
} from '../common/Base';
import {
    extend
} from "../common/Util";

/**
 * 注记图形参数信息
 * @class module:专题图服务.CAnnInfo
 * @classdesc Zondy.Object.Theme.CAnnInfo 注记图形参数信息
 * @param {Object} opt_options
 * @param {Number} [opt_options.LibID = 0] 库ID
 * @param {Boolean} [opt_options.Ovprnt = false] 覆盖方式
 * @param {Number} [opt_options.Angle = 0.00] 角度值
 * @param {Number} [opt_options.BackClr = 0] 背景颜色
 * @param {Number} [opt_options.BackExp = 0] 文本显示范围扩展
 * @param {Number} [opt_options.Chnt = 0] 西文字体
 * @param {Number} [opt_options.Color = 0] 颜色号
 * @param {Number} [opt_options.FontAngle = 0.00] 字符角度值
 * @param {Number} [opt_options.Height = 0.00] 高度
 * @param {Number} [opt_options.Ifnt = 0.00] 中文字体
 * @param {Number} [opt_options.Ifnx = 0] 字形
 * @param {Boolean} [opt_options.IsFilled = false] 是否自动压背景颜色
 * @param {Boolean} [opt_options.IsHzpl = true] 排列方式
 * @param {Number} [opt_options.OffsetX = 0.00] X方向的偏移
 * @param {Number} [opt_options.OffsetY = 0.00] Y方向的偏移
 * @param {Number} [opt_options.Space = 0.00] 间隔值
 * @param {Number} [opt_options.Width = 0.00] 宽度
 */
var CAnnInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    extend(this, options);

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.LibID
     * @type {Number}
     * @description 库ID
     * @default 0
     */
    this.LibID = (options.LibID !== undefined) ? options.LibID : 0;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.Ovprnt
     * @type {Boolean}
     * @description 覆盖方式,true/false 覆盖/透明
     * @default 0
     */
    this.Ovprnt = (options.Ovprnt !== undefined) ? options.Ovprnt : false;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.Angle
     * @type {Number}
     * @description 角度值
     * @default 0
     */
    this.Angle = (options.Ovprnt !== undefined) ? options.Ovprnt : 0;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.BackClr
     * @type {Number}
     * @description 背景颜色
     * @default 0
     */
    this.BackClr = (options.BackClr !== undefined) ? options.BackClr : 0;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.BackExp
     * @type {Number}
     * @description 文本显示范围扩展,返回扩展值
     * @default 0
     */
    this.BackExp = (options.BackExp !== undefined) ? options.BackExp : 0;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.Chnt
     * @type {Number}
     * @description 西文字体
     * @default 0
     */
    this.Chnt = (options.Chnt !== undefined) ? options.Chnt : 0;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.Color
     * @type {Number}
     * @description 颜色号
     * @default 0
     */
    this.Color = (options.Color !== undefined) ? options.Color : 0;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.FontAngle
     * @type {Number}
     * @description 字符角度值
     * @default 0
     */
    this.FontAngle = (options.FontAngle !== undefined) ? options.FontAngle : 0;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.Height
     * @type {Number}
     * @description 高度
     * @default 0
     */
    this.Height = (options.Height !== undefined) ? options.Height : 0;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.Ifnt
     * @type {Number}
     * @description 中文字体
     * @default 0
     */
    this.Ifnt = (options.Ifnt !== undefined) ? options.Ifnt : 0;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.Ifnx
     * @type {Number}
     * @description 字形
     * @default 0
     */
    this.Ifnx = (options.Ifnx !== undefined) ? options.Ifnx : 0;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.IsFilled
     * @type {Boolean}
     * @description 自动压背景颜色返回true，否则返回false
     * @default false
     */
    this.IsFilled = (options.IsFilled !== undefined) ? options.IsFilled : false;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.IsHzpl
     * @type {Boolean}
     * @description 排列方式,水平排列返回true，垂直排列返回false
     * @default true
     */
    this.IsHzpl = (options.IsHzpl !== undefined) ? options.IsHzpl : true;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.OffsetX
     * @type {Number}
     * @description X方向的偏移
     * @default 0
     */
    this.OffsetX = (options.OffsetX !== undefined) ? options.OffsetX : 0;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.OffsetY
     * @type {Number}
     * @description Y方向的偏移
     * @default 0
     */
    this.OffsetY = (options.OffsetY !== undefined) ? options.OffsetY : 0;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.Space
     * @type {Number}
     * @description 间隔值
     * @default 0
     */
    this.Space = (options.Space !== undefined) ? options.Space : 0;

    /**
     * @member Zondy.Object.Theme.CAnnInfo.prototype.Width
     * @type {Number}
     * @description 宽度
     * @default 0
     */
    this.Width = (options.Width !== undefined) ? options.Width : 0;
};
export {
    CAnnInfo
};
Zondy.Object.Theme.CAnnInfo = CAnnInfo;