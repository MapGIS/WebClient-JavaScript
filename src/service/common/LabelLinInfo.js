import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";
import {
    LineConstrain
} from "./EnumComm";
import {
    LabelLinType
} from "./EnumComm";
import {
    RepeatType
} from "./EnumComm";
import {
    LabelSpreadType
} from "./EnumComm";

/**
 * 线要素动态注记方位属性对象
 * @class Zondy.Object.LabelLinInfo
 * @classdesc 线要素动态注记方位属性对象
 * @param {Object} option 属性键值对
 * @param {Boolean} [option.ClientOutLabel = false] 不完全注记
 * @param {Number} [option.DistFromLine = 0.00] 偏离线约束 偏移线的距离
 * @param {LineConstrain} [option.FromLineConstrain = 0] Zondy.Enum.LineConstrain,枚举类型,偏离线约束
 * @param {Number} [option.Interval = 0.00] 线重复注记 每段的长度
 * @param {LabelLinType} [option.LinType = 0] Zondy.Enum.LabelLinType,枚举类型, 线方位
 * @param {RepeatType} [option.Repeat = 0] Zondy.Enum.RepeatType,枚举类型,线重复注记策略
 * @param {LabelSpreadType} [option.SpreadType = null] Zondy.Enum.LabelSpreadType,枚举类型,注记分布的策略
 *
 */
var LabelLinInfo = function (option) {
    var options = (option !== undefined) ? option : {};
    extend(this, options);

    /**
     * @member Zondy.Object.LabelLinInfo.prototype.ClientOutLabel
     * @type {Boolean}
     * @description 不完全注记
     * @default false
     */
    this.ClientOutLabel = (options.ClientOutLabel !== undefined && options.ClientOutLabel !== null) ? options.ClientOutLabel : false;

    /**
     * @member Zondy.Object.LabelLinInfo.prototype.DistFromLine
     * @type {Number}
     * @description 偏离线约束 偏移线的距离
     * @default 0.00
     */
    this.DistFromLine = (options.DistFromLine !== undefined && options.DistFromLine !== null) ? options.DistFromLine : 0.00;

    /**
     * @member Zondy.Object.LabelLinInfo.prototype.FromLineConstrain
     * @type {LineConstrain}
     * @description 枚举类型,偏离线约束 Zondy.Enum.LineConstrain
     * @default 0
     */
    this.FromLineConstrain = (options.FromLineConstrain !== undefined && options.FromLineConstrain !== null) ? options.FromLineConstrain : 0;

    /**
     * @member Zondy.Object.LabelLinInfo.prototype.Interval
     * @type {Number}
     * @description 线重复注记 每段的长度
     * @default 0.00
     */
    this.Interval = (options.Interval !== undefined && options.Interval !== null) ? options.Interval : 0.00;

    /**
     * @member Zondy.Object.LabelLinInfo.prototype.LinType
     * @type {LabelLinType}
     * @description Zondy.Enum.LabelLinType,枚举类型, 线方位
     * @default 0
     */
    this.LinType = (options.LinType !== undefined && options.LinType !== null) ? options.LinType : 0;

    /**
     * @member Zondy.Object.LabelLinInfo.prototype.Repeat
     * @type {RepeatType}
     * @description Zondy.Enum.RepeatType,枚举类型,线重复注记策略
     * @default 0
     */
    this.Repeat = (options.Repeat !== undefined && options.Repeat !== null) ? options.Repeat : 0;

    /**
     * @member Zondy.Object.LabelLinInfo.prototype.SpreadType
     * @type {LabelSpreadType}
     * @description Zondy.Enum.LabelSpreadType,枚举类型,注记分布的策略
     * @default null
     */
    this.SpreadType = (options.SpreadType !== undefined && options.SpreadType !== null) ? options.SpreadType : null;
};
export {
    LabelLinInfo
};
Zondy.Object.LabelLinInfo = LabelLinInfo;