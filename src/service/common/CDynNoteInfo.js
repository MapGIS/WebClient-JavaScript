import {Zondy} from './Base';
import {extend}  from  "./Util";
import {FontShape}  from  "./EnumComm";
import {DynNoteLableType}  from  "./DynNoteLableType";


/**
 * 动态注记参数信息对象
 * @class Zondy.Object.CDynNoteInfo
 * @classdesc 动态注记参数信息对象
 * @param {Object} option 属性键值对
 * @param {Number} [option.Angle =  0.00] 动态注记字符串角度
 * @param {Number} [option.Backclr = 0] 背景颜色,取值请参照MapGIS颜色库中颜色编号
 * @param {Number} [option.Backexp = 0.00] 轮廓宽度
 * @param {Number} [option.Bold = 0] 加粗
 * @param {String} [option.FieldName = null] 注记字段名称
 * @param {Number} [option.FontAngle = 0.00] 字体角度
 * @param {Number} [option.FontColor = 0] 注记颜色
 * @param {Number} [option.FontSize = 0] 注记大小
 * @param {Number} [option.FontStyle = 0] 注记字体
 * @param {Number} [option.Ifnt = 0] 中文字体
 * @param {FontShape} [option.Ifnx = FontShape.Positive] 字形
 * @param {Boolean} [option.IsFilled = false] 是否填充背景
 * @param {Boolean} [option.IsHzpl = false] 是否水平显示
 * @param {Boolean} [option.IsOvprnt = false] 覆盖方式（表明透明还是覆盖）
 * @param {Number} [option.LabelLevel = 0] 注记级别
 * @param {Zondy.Object.DynNoteLableType} [option.LableType = 0] 动态注记方位属性
 * @param {Number} [option.Offsetx = 0.00] x方向的偏移
 * @param {Number} [option.Offsety = 0.00] y方向的偏移
 * @param {Number} [option.Space = 0.00] 字间距
 * @param {Number} [option.StrikeThrough = 0] 删除线
 * @param {Number} [option.UnderLine = 0] 下划线
 */
var CDynNoteInfo = function (option) {
    var options = (option !== undefined) ? option : {};
    extend(this, options);

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.Angle
     * @type {Number}
     * @description 动态注记字符串角度
     * @default 0
     */
    this.Angle = (options.Angle !== undefined) ? options.Angle : 0.00;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.Backclr
     * @type {Number}
     * @description 背景颜色,取值请参照MapGIS颜色库中颜色编号
     * @default 0
     */
    this.Backclr = (options.Backclr !== undefined) ? options.Backclr : 0;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.Backexp
     * @type {Number}
     * @description 轮廓宽度
     * @default 0.00
     */
    this.Backexp = (options.Backexp !== undefined) ? options.Backexp : 0.00;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.Bold
     * @type {Number}
     * @description 加粗
     * @default 0
     */
    this.Bold = (options.Bold !== undefined) ? options.Bold : 0;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.FieldName
     * @type {String}
     * @description 注记字段名称
     * @default 0
     */
    this.FieldName = (options.FieldName !== undefined) ? options.FieldName : null;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.FontAngle
     * @type {Number}
     * @description 字体角度
     * @default 0.00
     */
    this.FontAngle = (options.FontAngle !== undefined) ? options.FontAngle : 0.00;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.FontColor
     * @type {Number}
     * @description 注记颜色
     * @default 0
     */
    this.FontColor = (options.FontColor !== undefined) ? options.FontColor : 0;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.FontSize
     * @type {Number}
     * @description 注记大小
     * @default 0
     */
    this.FontSize = (options.FontSize !== undefined) ? options.FontSize : 0;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.FontStyle
     * @type {Number}
     * @description 注记字体
     * @default 0
     */
    this.FontStyle = (options.FontStyle !== undefined) ? options.FontStyle : 0;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.Ifnt
     * @type {Number}
     * @description 中文字体
     * @default 0
     */
    this.Ifnt = (options.Ifnt !== undefined) ? options.Ifnt : 0;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.Ifnx
     * @type {FontShape}
     * @description 字形
     * @default FontShape.Positive
     */
    this.Ifnx = (options.Ifnx !== undefined) ? options.Ifnx : FontShape.Positive;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.IsFilled
     * @type {Boolean}
     * @description 是否填充背景
     * @default false
     */
    this.IsFilled = (options.IsFilled !== undefined) ? options.IsFilled : false;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.IsHzpl
     * @type {Boolean}
     * @description 是否水平显示
     * @default false
     */
    this.IsHzpl = (options.IsHzpl !== undefined) ? options.IsHzpl : false;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.IsOvprnt
     * @type {Boolean}
     * @description 覆盖方式（表明透明还是覆盖）
     * @default false
     */
    this.IsOvprnt = (options.IsOvprnt !== undefined) ? options.IsOvprnt : false;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.LabelLevel
     * @type {Number}
     * @description 注记级别
     * @default 0
     */
    this.LabelLevel = (options.LabelLevel !== undefined) ? options.LabelLevel : 0;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.LabelLevel
     * @type {Zondy.Object.DynNoteLableType}
     * @description 动态注记方位属性
     * @default null
     */
    this.LableType = (options.LableType !== undefined) ? options.LableType : null;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.Offsetx
     * @type {Number}
     * @description x方向的偏移
     * @default 0.00
     */
    this.Offsetx = (options.Offsetx !== undefined) ? options.Offsetx : 0.00;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.Offsety
     * @type {Number}
     * @description y方向的偏移
     * @default 0.00
     */
    this.Offsety = (options.Offsety !== undefined) ? options.Offsety : 0.00;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.Space
     * @type {Number}
     * @description 字间距
     * @default 0.00
     */
    this.Space = (options.Space !== undefined) ? options.Space : 0.00;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.StrikeThrough
     * @type {Number}
     * @description 删除线
     * @default 0
     */
    this.StrikeThrough = (options.StrikeThrough !== undefined) ? options.StrikeThrough : 0;

    /**
     * @private
     * @member Zondy.Object.CDynNoteInfo.prototype.UnderLine
     * @type {Number}
     * @description 下划线
     * @default 0
     */
    this.UnderLine = (options.UnderLine !== undefined) ? options.UnderLine : 0;
};

export {CDynNoteInfo};
Zondy.Object.CDynNoteInfo = CDynNoteInfo;