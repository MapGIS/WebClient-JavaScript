import {
    Zondy
} from "../common/Base";
import {
    extend
} from "../common/Util";
/**
 * 点图形参数对象
 * @class module:专题图服务.CPntInfo
 * @classdesc Zondy.Object.Theme.CPntInfo 点图形参数对象
 * @param {Object} opt_options
 * @param {Number} [opt_options.LibID = 0] 库ID
 * @param {Boolean} [opt_options.Ovprnt = false] 覆盖方式
 * @param {Number} [opt_options.Angle = 0] 角度
 * @param {Number} [opt_options.BackClr = 0] 背景颜色
 * @param {Number} [opt_options.BackExp = 0] 范围扩展
 * @param {Number} [opt_options.FillFlg = 0] 自动压背景颜色标志
 * @param {Number} [opt_options.Height = 0] 高度
 * @param {Number} [opt_options.Width = 0] 宽度
 * @param {Array} [opt_options.OutClr = [0, 0, 0]] 可变颜色 Array<Integer>(3)
 * @param {Number} [opt_options.SymID = 0] 符号编号
 * @param {Array} [opt_options.OutPenW = [0.05, 0.05, 0.05]] 外部笔宽 Array<Float>(3)
 */
var CPntInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    extend(this, options);
    /**
     * @private
     * @member Zondy.Object.Theme.CPntInfo.prototype.LibID
     * @type {Number}
     * @description 库ID
     * @default 0
     */
    this.LibID = (options.LibID !== undefined) ? options.LibID : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CPntInfo.prototype.Ovprnt
     * @type {Boolean}
     * @description 覆盖方式,true/false 覆盖/透明
     * @default false
     */
    this.Ovprnt = (options.Ovprnt !== undefined) ? options.Ovprnt : false;

    /**
     * @private
     * @member Zondy.Object.Theme.CPntInfo.prototype.Angle
     * @type {Number}
     * @description 角度
     * @default 0
     */
    this.Angle = (options.Angle !== undefined) ? options.Angle : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CPntInfo.prototype.BackClr
     * @type {Number}
     * @description 背景颜色
     * @default 0
     */
    this.BackClr = (options.BackClr !== undefined) ? options.BackClr : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CPntInfo.prototype.BackExp
     * @type {Number}
     * @description 范围扩展
     * @default 0
     */
    this.BackExp = (options.BackExp !== undefined) ? options.BackExp : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CPntInfo.prototype.FillFlg
     * @type {Number}
     * @description 自动压背景颜色标志
     * @default 0
     */
    this.FillFlg = (options.FillFlg !== undefined) ? options.FillFlg : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CPntInfo.prototype.Height
     * @type {Number}
     * @description 高度
     * @default 0
     */
    this.Height = (options.Height !== undefined) ? options.Height : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CPntInfo.prototype.Width
     * @type {Number}
     * @description 宽度
     * @default 0
     */
    this.Width = (options.Width !== undefined) ? options.Width : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CPntInfo.prototype.OutClr
     * @type {Array}
     * @description 可变颜色 Array<Integer>(3)
     * @default [0, 0, 0]
     */
    this.OutClr = (options.OutClr !== undefined) ? options.OutClr : [0, 0, 0];

    /**
     * @private
     * @member Zondy.Object.Theme.CPntInfo.prototype.SymID
     * @type {Number}
     * @description 符号编号
     * @default 0
     */
    this.SymID = (options.SymID !== undefined) ? options.SymID : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CPntInfo.prototype.OutPenW
     * @type {Array}
     * @description 外部笔宽 Array<Float>(3)
     * @default [0.05, 0.05, 0.05]
     */
    this.OutPenW = (options.OutPenW !== undefined) ? options.OutPenW : [0.05, 0.05, 0.05];
};
export {
    CPntInfo
};
Zondy.Object.Theme.CPntInfo = CPntInfo;