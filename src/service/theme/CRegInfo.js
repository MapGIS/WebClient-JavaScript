import {
    Zondy
} from '../common/Base';
import {
    extend
} from "../common/Util";
/**
 * 区图形参数对象
 * @class module:专题图服务.CRegInfo
 * @classdesc Zondy.Object.Theme.CRegInfo 区图形参数对象
 * @param {Object} opt_options
 * @param {Number} [opt_options.LibID = 0] 库ID
 * @param {Boolean} [opt_options.Ovprnt = false] 覆盖方式
 * @param {Number} [opt_options.Angle = 0.0] 图案角度
 * @param {Number} [opt_options.EndClr = 0] 结束填充色
 * @param {Number} [opt_options.FillClr = 46] 区域填充色
 * @param {Number} [opt_options.FillMode = 0] 填充模式
 * @param {Boolean} [opt_options.FullPatFlg = true] 是否需要完整图案填充
 * @param {Number} [opt_options.PatClr = 3] 图案颜色
 * @param {Number} [opt_options.PatHeight = 5] 图案高
 * @param {Number} [opt_options.PatID = 0] 图案编号
 * @param {Number} [opt_options.PatWidth = 5] 图案宽
 * @param {Number} [opt_options.OutPenW = 1.0] 图案笔宽
 */
var CRegInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    extend(this, options);
    /**
     * @private
     * @member Zondy.Object.Theme.CRegInfo.prototype.LibID
     * @type {Number}
     * @description 库ID
     * @default 0
     */
    this.LibID = (options.LibID !== undefined) ? options.LibID : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CRegInfo.prototype.Ovprnt
     * @type {Boolean}
     * @description 覆盖方式,true/false 覆盖/透明
     * @default false
     */
    this.Ovprnt = (options.Ovprnt !== undefined) ? options.Ovprnt : false;

    /**
     * @private
     * @member Zondy.Object.Theme.CRegInfo.prototype.Angle
     * @type {Number}
     * @description 图案角度
     * @default 0.0
     */
    this.Angle = (options.Angle !== undefined) ? options.Angle : 0.0;

    /**
     * @private
     * @member Zondy.Object.Theme.CRegInfo.prototype.EndClr
     * @type {Number}
     * @description 结束填充色
     * @default 0
     */
    this.EndClr = (options.EndClr !== undefined) ? options.EndClr : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CRegInfo.prototype.FillClr
     * @type {Number}
     * @description 区域填充色
     * @default 46
     */
    this.FillClr = (options.FillClr !== undefined) ? options.FillClr : 46;

    /**
     * @private
     * @member Zondy.Object.Theme.CRegInfo.prototype.FillMode
     * @type {Number}
     * @description 填充模式
     * @default 0
     */
    this.FillMode = (options.FillMode !== undefined) ? options.FillMode : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CRegInfo.prototype.FullPatFlg
     * @type {Boolean}
     * @description 是否需要完整图案填充
     * @default true
     */
    this.FullPatFlg = (options.FullPatFlg !== undefined) ? options.FullPatFlg : true;

    /**
     * @private
     * @member Zondy.Object.Theme.CRegInfo.prototype.PatClr
     * @type {Number}
     * @description 图案颜色
     * @default 3
     */
    this.PatClr = (options.PatClr !== undefined) ? options.PatClr : 3;

    /**
     * @private
     * @member Zondy.Object.Theme.CRegInfo.prototype.PatHeight
     * @type {Number}
     * @description 图案高
     * @default 5
     */
    this.PatHeight = (options.PatHeight !== undefined) ? options.PatHeight : 5;

    /**
     * @private
     * @member Zondy.Object.Theme.CRegInfo.prototype.PatID
     * @type {Number}
     * @description 图案编号
     * @default 0
     */
    this.PatID = (options.PatID !== undefined) ? options.PatID : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CRegInfo.prototype.PatWidth
     * @type {Number}
     * @description 图案宽
     * @default 5
     */
    this.PatWidth = (options.PatWidth !== undefined) ? options.PatWidth : 5;

    /**
     * @private
     * @member Zondy.Object.Theme.CRegInfo.prototype.OutPenW
     * @type {Number}
     * @description 图案笔宽
     * @default 1.0
     */
    this.OutPenW = (options.OutPenW !== undefined) ? options.OutPenW : 1.0;
};
export {
    CRegInfo
};
Zondy.Object.Theme.CRegInfo = CRegInfo;