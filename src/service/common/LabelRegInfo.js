import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";
import {
    LabelRegType
} from "./EnumComm";

/**
 * 区要素动态注记方位属性对象
 * @class Zondy.Object.LabelRegInfo
 * @classdesc 区要素动态注记方位属性对象
 * @param {Object} opt_options 属性键值对
 * @param {Boolean} [opt_options.ClientOutLabel = false] 不完全注记
 * @param {Number} [opt_options.LabelMiniRegion = 0.00] 是否尝试水平注记微小区 short
 * @param {Number} [opt_options.MayPlaceOutside = 0] 自适应策略 区内不能注记时，是否可以注记在外部 short
 * @param {Number} [opt_options.MiniRegionArea = 0] 微小区最大面积 short
 * @param {Number} [opt_options.Offset = 0.00] 区域外注记时，注记偏移的距离
 * @param {LabelRegType} [opt_options.RegType = 0] 区方位，Zondy.Enum.LabelRegType,枚举类型
 */
var LabelRegInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    extend(this, options);

    /**
     * @member Zondy.Object.LabelRegInfo.prototype.ClientOutLabel
     * @type {Boolean}
     * @description 不完全注记
     * @default false
     */
    this.ClientOutLabel = (options.ClientOutLabel !== undefined && options.ClientOutLabel !== null) ? options.ClientOutLabel : false;

    /**
     * @member Zondy.Object.LabelRegInfo.prototype.LabelMiniRegion
     * @type {Number}
     * @description 是否尝试水平注记微小区
     * @default 0
     */
    this.LabelMiniRegion = (options.LabelMiniRegion !== undefined && options.LabelMiniRegion !== null) ? options.LabelMiniRegion : 0;

    /**
     * @member Zondy.Object.LabelRegInfo.prototype.MayPlaceOutside
     * @type {Number}
     * @description 自适应策略 区内不能注记时，是否可以注记在外部 short
     * @default 0
     */
    this.MayPlaceOutside = (options.MayPlaceOutside !== undefined && options.MayPlaceOutside !== null) ? options.MayPlaceOutside : 0;

    /**
     * @member Zondy.Object.LabelRegInfo.prototype.MiniRegionArea
     * @type {Number}
     * @description 微小区最大面积 short
     * @default 0
     */
    this.MiniRegionArea = (options.MiniRegionArea !== undefined && options.MiniRegionArea !== null) ? options.MiniRegionArea : 0;

    /**
     * @member Zondy.Object.LabelRegInfo.prototype.Offset
     * @type {Number}
     * @description 区域外注记时，注记偏移的距离
     * @default 0.00
     */
    this.Offset = (options.Offset !== undefined && options.Offset !== null) ? options.Offset : 0.00;

    /**
     * @member Zondy.Object.LabelRegInfo.prototype.RegType
     * @type {LabelRegType}
     * @description 区方位，Zondy.Enum.LabelRegType,枚举类型
     * @default 0
     */
    this.RegType = (options.RegType !== undefined && options.RegType !== null) ? options.RegType : 0;
};
export {
    LabelRegInfo
};
Zondy.Object.LabelRegInfo = LabelRegInfo;