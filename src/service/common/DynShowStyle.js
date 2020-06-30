import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";
import {
    CDynNoteInfo
} from "./CDynNoteInfo";
import {
    ISShowArc
} from "./EnumComm";
import {
    CLineInfo
} from "./CLineInfo";
import {
    CPointInfo
} from "./CPointInfo";
import {
    CRegionInfo
} from "./CRegionInfo";

/**
 * 图层动态显示样式对象
 * @class Zondy.Object.DynShowStyle
 * @classdesc 地图文档显示样式对象构造函数
 * @param {Object} option 属性键值对
 * @param {Number} [option.Alpha = 0] 透明度
 * @param {Boolean} [option.BugSpare = false] 是否使用错误处理符号
 * @param {Boolean} [option.CustomRender = false] 是否自绘驱动
 * @param {String} [option.CustomRenderPath = false] 自绘驱动路径设置
 * @param {Number} [option.DirectionLineClr = false] 显示的线方向线符号(只适用于其颜色)
 * @param {Boolean} [option.DynNoteFlag = false] 是否动态注记
 * @param {Zondy.Object.CDynNoteInfo} [option.DynNoteInfo = null] 动态注记参数
 * @param {ISShowArc} [option.IsShowArc = 0] 是否显示填充区域的弧段 Zondy.Enum.ISShowArc
 *              枚举类型 取值范围： 1 {@link ISShowArc},2{@link ISShowArc},3{@link ISShowArc}
 * @param {Boolean} [option.ISShowLineDirection = false] 是否显示线方向
 * @param {Zondy.Object.CLineInfo} [option.LineInfo = null] 显示的弧段样式(只适用于其颜色)
 * @param {Number} [option.MaxScale = 1.00] 最大显示比率
 * @param {Number} [option.MinScale = 1.00] 最小显示比率
 * @param {Boolean} [option.ShowCoordPnt = false] 显示坐标点
 * @param {Zondy.Object.CLineInfo} [option.SpareLineInfo = null] 错误处理线符号
 * @param {Zondy.Object.CPointInfo} [option.SparePointInfo = null] 错误处理点符号
 * @param {Zondy.Object.CRegionInfo} [option.SpareRegInfo = null] 错误处理区符号
 * @param {Number} [option.SymbleScale = 0.00] 符号显示比例
 *
 * @see Zondy.Object.CDisplayStyle
 */
var DynShowStyle = function (option) {
    var options = (option !== undefined) ? option : {};
    extend(this, options);

    /**
     * @member Zondy.Object.DynShowStyle.prototype.Alpha
     * @type {Number}
     * @description 透明度
     * @default 0
     */
    this.Alpha = (options.Alpha !== undefined) ? options.Alpha : 0;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.BugSpare
     * @type {Boolean}
     * @description 是否使用错误处理符号
     * @default false
     */
    this.BugSpare = (options.BugSpare !== undefined) ? options.BugSpare : false;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.CustomRender
     * @type {Boolean}
     * @description 是否自绘驱动
     * @default false
     */
    this.CustomRender = (options.CustomRender !== undefined) ? options.CustomRender : false;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.CustomRenderPath
     * @type {String}
     * @description 自绘驱动路径设置
     * @default null
     */
    this.CustomRenderPath = (options.CustomRenderPath !== undefined) ? options.CustomRenderPath : null;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.DirectionLineClr
     * @type {Number}
     * @description 显示的线方向线符号(只适用于其颜色)
     * @default 0
     */
    this.DirectionLineClr = (options.DirectionLineClr !== undefined) ? options.DirectionLineClr : 0;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.DynNoteFlag
     * @type {String}
     * @description 是否动态注记
     * @default false
     */
    this.DynNoteFlag = (options.DynNoteFlag !== undefined) ? options.DynNoteFlag : false;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.DynNoteInfo
     * @type {Zondy.Object.CDynNoteInfo}
     * @description 动态注记参数
     * @default null
     */
    this.DynNoteInfo = (options.DynNoteInfo !== undefined) ? options.DynNoteInfo : null;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.IsShowArc
     * @type {ISShowArc}
     * @description 是否显示填充区域的弧段,Zondy.Enum.ISShowArc;枚举类型
     *  取值范围： 1（Zondy.Enum.ISShowArc.Reg）,2（Zondy.Enum.ISShowArc.Arc）,3（Zondy.Enum.ISShowArc.All）
     * @default 0
     */
    this.IsShowArc = (options.IsShowArc !== undefined) ? options.IsShowArc : 0;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.ISShowLineDirection
     * @type {Boolean}
     * @description 是否显示线方向
     * @default false
     */
    this.ISShowLineDirection = (options.ISShowLineDirection !== undefined) ? options.ISShowLineDirection : false;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.LineInfo
     * @type {Zondy.Object.CLineInfo}
     * @description 显示的弧段样式(只适用于其颜色)
     * @default null
     */
    this.LineInfo = (options.LineInfo !== undefined) ? options.LineInfo : null;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.MaxScale
     * @type {Number}
     * @description 最大显示比率
     * @default 0.00
     */
    this.MaxScale = (options.MaxScale !== undefined) ? options.MaxScale : 0.00;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.MinScale
     * @type {Number}
     * @description 最小显示比率
     * @default 0.00
     */
    this.MinScale = (options.MinScale !== undefined) ? options.MinScale : 0.00;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.ShowCoordPnt
     * @type {Boolean}
     * @description 显示坐标点
     * @default false
     */
    this.ShowCoordPnt = (options.ShowCoordPnt !== undefined) ? options.ShowCoordPnt : false;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.SpareLineInfo
     * @type {Zondy.Object.CLineInfo}
     * @description 错误处理线符号
     * @default null
     */
    this.SpareLineInfo = (options.SpareLineInfo !== undefined) ? options.SpareLineInfo : null;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.SparePointInfo
     * @type {Zondy.Object.CPointInfo}
     * @description 错误处理点符号
     * @default null
     */
    this.SparePointInfo = (options.SparePointInfo !== undefined) ? options.SparePointInfo : null;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.SpareRegInfo
     * @type {Zondy.Object.CRegionInfo}
     * @description 错误处理区符号
     * @default null
     */
    this.SpareRegInfo = (options.SpareRegInfo !== undefined) ? options.SpareRegInfo : null;

    /**
     * @member Zondy.Object.DynShowStyle.prototype.SymbleScale
     * @type {Number}
     * @description 符号显示比例
     * @default 0.00
     */
    this.SymbleScale = (options.SymbleScale !== undefined) ? options.SymbleScale : 0.00;
};
export {
    DynShowStyle
};
Zondy.Object.DynShowStyle = DynShowStyle;