import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";
import {
    EightDirType
} from "./EnumComm";
import {
    LabelPntType
} from "./EnumComm";

/**
 * 点要素动态注记方位属性对象
 * @class Zondy.Object.LablePntInfo
 * @classdesc 点要素动态注记方位属性对象
 * @param {Object} option 属性键值对
 * @param {Array} [option.Ang = false] 点任意方位的角度值，Array,Double in an Array
 * @param {Boolean} [option.ClientOutLabel = 0.00] 不完全注记
 * @param {Number} [option.Distance = 0] 偏移距离，单位为像素
 * @param {Array} [option.EightDirLableType = 0] 点八方位注记类型，Array,Zondy.Enum.EightDirType in an Array {@link EightDirType }
 * @param {LabelPntType} [option.PntType = 0] Zondy.Enum.LabelPntType 枚举类型, 点方位
 */
var LablePntInfo = function (option) {
    var options = (option !== undefined) ? option : {};
    extend(this, options);

    /**
     * @member Zondy.Object.LablePntInfo.prototype.Ang
     * @type {Array}
     * @description 点任意方位的角度值，Array<Double>
     * @default null
     */
    this.Ang = (options.Ang !== undefined && options.Ang !== null) ? options.Ang : null;

    /**
     * @member Zondy.Object.LablePntInfo.prototype.ClientOutLabel
     * @type {Boolean}
     * @description 不完全注记
     * @default false
     */
    this.ClientOutLabel = (options.ClientOutLabel !== undefined && options.ClientOutLabel !== null) ? options.ClientOutLabel : false;

    /**
     * @member Zondy.Object.LablePntInfo.prototype.Distance
     * @type {Number}
     * @description 偏移距离，单位为像素
     * @default 0.00
     */
    this.Distance = (options.Distance !== undefined && options.Distance !== null) ? options.Distance : 0.00;

    /**
     * @member Zondy.Object.LablePntInfo.prototype.EightDirLableType
     * @type {Array}
     * @description 点八方位注记类型 Array<{@link EightDirType}> Zondy.Enum.EightDirType
     * @default null
     */
    this.EightDirLableType = (options.EightDirLableType !== undefined && options.EightDirLableType !== null) ? options.EightDirLableType : null;

    /**
     * @member Zondy.Object.LablePntInfo.prototype.PntType
     * @type {LabelPntType}
     * @description Zondy.Enum.LabelPntType 枚举类型, 点方位
     * @default 0
     */
    this.PntType = (options.PntType !== undefined && options.PntType !== null) ? options.PntType : 0;
};
export {
    LablePntInfo
};
Zondy.Object.LablePntInfo = LablePntInfo;