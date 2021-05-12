import {
    Zondy
} from '../../common/Base';
import {
    extend
} from "../../common/Util";
import {
    CLinAdjustType,
    CLinHeadType,
    CLinJointType,
    CLinStyleMakeType
} from "../../common/EnumComm";

/**
 * 线图形参数对象
 * @class module:专题图服务.CLinInfo
 * @classdesc 线图形参数对象
 * @description Zondy.Object.Theme.CLinInfo 
 * @param {Object} opt_options
 * @param {Number} [opt_options.LibID = 0] 库ID
 * @param {Boolean} [opt_options.Ovprnt = false] 覆盖方式
 * @param {Number} [opt_options.AdjustFlg = CLinAdjustType.Adjust] 线型调整方法 {@link Zondy.Enum.Theme.CLinAdjustType}
 * @param {Number} [opt_options.HeadType = CLinHeadType.Round] 线头类型 {@link Zondy.Enum.Theme.CLinHeadType}
 * @param {Number} [opt_options.JointType = CLinHeadType.Round] 拐角类型 {@link Zondy.Enum.Theme.CLinJointType}
 * @param {Number} [opt_options.LinStyID = 0] 线型号
 * @param {Number} [opt_options.MakeMethod = CLinStyleMakeType.Byrule] 线型生成方法 {@link Zondy.Enum.Theme.CLinStyleMakeType}
 * @param {Array} [opt_options.OutClr = [46, 4, 3]] 可变颜色 Array<Integer>(3)
 * @param {Number} [opt_options.XScale = 10] X系数
 * @param {Number} [opt_options.YScale = 10] Y系数
 * @param {Array} [opt_options.OutPenW = [0.05, 0.05, 0.05]] 外部笔宽 Array<Float>(3)
 */
var CLinInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    extend(this, options);
    /**
     * @private
     * @member Zondy.Object.Theme.CLinInfo.prototype.LibID
     * @type {Number}
     * @description 库ID
     * @default 0
     */
    this.LibID = (options.LibID !== undefined) ? options.LibID : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CLinInfo.prototype.Ovprnt
     * @type {Boolean}
     * @description 覆盖方式,true/false 覆盖/透明
     * @default false
     */
    this.Ovprnt = (options.Ovprnt !== undefined) ? options.Ovprnt : false;

    /**
     * @private
     * @member Zondy.Object.Theme.CLinInfo.prototype.AdjustFlg
     * @type {Number}
     * @description 线型调整方法 {@link Zondy.Enum.Theme.CLinAdjustType}
     * @default CLinAdjustType.Adjust
     */
    this.AdjustFlg = (options.AdjustFlg !== undefined) ? options.AdjustFlg : CLinAdjustType.Adjust;

    /**
     * @private
     * @member Zondy.Object.Theme.CLinInfo.prototype.HeadType
     * @type {Number}
     * @description 线头类型 {@link Zondy.Enum.Theme.CLinHeadType}
     * @default CLinHeadType.Round
     */
    this.HeadType = (options.HeadType !== undefined) ? options.HeadType : CLinHeadType.Round;

    /**
     * @private
     * @member Zondy.Object.Theme.CLinInfo.prototype.JointType
     * @type {Number}
     * @description 拐角类型 {@link Zondy.Enum.Theme.CLinJointType}
     * @default CLinJointType.Round
     */
    this.JointType = (options.JointType !== undefined) ? options.JointType : CLinJointType.Round;

    /**
     * @private
     * @member Zondy.Object.Theme.CLinInfo.prototype.LinStyID
     * @type {Number}
     * @description 线型号
     * @default 0
     */
    this.LinStyID = (options.LinStyID !== undefined) ? options.LinStyID : 0;

    /**
     * @private
     * @member Zondy.Object.Theme.CLinInfo.prototype.MakeMethod
     * @type {Number}
     * @description 线型生成方法 {@link Zondy.Enum.Theme.CLinStyleMakeType}
     * @default CLinStyleMakeType.Byrule
     */
    this.MakeMethod = (options.MakeMethod !== undefined) ? options.MakeMethod : CLinStyleMakeType.Byrule;

    /**
     * @private
     * @member Zondy.Object.Theme.CLinInfo.prototype.OutClr
     * @type {Array}
     * @description 可变颜色 Array<Integer>(3)
     * @default [46, 4, 3]
     */
    this.OutClr = (options.OutClr !== undefined) ? options.OutClr : [46, 4, 3];

    /**
     * @private
     * @member Zondy.Object.Theme.CLinInfo.prototype.XScale
     * @type {Number}
     * @description X系数
     * @default 10
     */
    this.XScale = (options.XScale !== undefined) ? options.XScale : 10;

    /**
     * @private
     * @member Zondy.Object.Theme.CLinInfo.prototype.YScale
     * @type {Number}
     * @description Y系数
     * @default 10
     */
    this.YScale = (options.YScale !== undefined) ? options.YScale : 10;

    /**
     * @private
     * @member Zondy.Object.Theme.CLinInfo.prototype.OutPenW
     * @type {Array}
     * @description 外部笔宽 Array<Float>(3)
     * @default [0.05, 0.05, 0.05]
     */
    this.OutPenW = (options.OutPenW !== undefined) ? options.OutPenW : [0.05, 0.05, 0.05];
};
export {
    CLinInfo
};
Zondy.Object.Theme.CLinInfo = CLinInfo;