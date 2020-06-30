import {Zondy} from './Base';
import {extend}  from  "./Util";

/**
 * 区要素的符号参数信息对象
 * @class Zondy.Object.CRegionInfo
 * @classdesc 区要素的符号参数信息对象
 * @param {Object} option 属性键值对
 * @param {Number} [option.EndColor = 1] 结束填充色
 * @param {Number} [option.FillColor = 1] 填充颜色
 * @param {Number} [option.FillMode = 0] 填充模式
 * @param {Number} [option.OutPenWidth = 1] 填充图案笔宽
 * @param {Number} [option.PatAngle = 1] 填充图案角度
 * @param {Number} [option.PatColor = 1] 填充图案颜色
 * @param {Number} [option.PatHeight = 1] 填充图案高度
 * @param {Number} [option.PatID = 1] 填充图案ID
 * @param {Number} [option.PatWidth = 1] 填充图案宽度
 */
var CRegionInfo = function (option) {
    var options = (option !== undefined) ? option : {};
    extend(this, options);

    /**
     * @member Zondy.Object.CRegionInfo.prototype.EndColor
     * @type {Number}
     * @description 结束填充色
     * @default 1
     */
    this.EndColor = (options.EndColor !== undefined && options.EndColor !== null) ? options.EndColor : 1;

    /**
     * @member Zondy.Object.CRegionInfo.prototype.FillColor
     * @type {Number}
     * @description 填充颜色
     * @default 1
     */
    this.FillColor = (options.FillColor !== undefined && options.FillColor !== null) ? options.FillColor : 1;

    /**
     * @member Zondy.Object.CRegionInfo.prototype.FillMode
     * @type {Number}
     * @description 填充模式
     * @default 0
     */
    this.FillMode = (options.FillMode !== undefined && options.FillMode !== null) ? options.FillMode : 0;

    /**
     * @member Zondy.Object.CRegionInfo.prototype.OutPenWidth
     * @type {Number}
     * @description 填充图案笔宽
     * @default 1
     */
    this.OutPenWidth = (options.OutPenWidth !== undefined && options.OutPenWidth !== null) ? options.OutPenWidth : 1;

    /**
     * @member Zondy.Object.CRegionInfo.prototype.PatAngle
     * @type {Number}
     * @description 填充图案角度
     * @default 1
     */
    this.PatAngle = (options.PatAngle !== undefined && options.PatAngle !== null) ? options.PatAngle : 1;

    /**
     * @member Zondy.Object.CRegionInfo.prototype.PatColor
     * @type {Number}
     * @description 填充图案颜色
     * @default 1
     */
    this.PatColor = (options.PatColor !== undefined && options.PatColor !== null) ? options.PatColor : 1;

    /**
     * @member Zondy.Object.CRegionInfo.prototype.PatHeight
     * @type {Number}
     * @description 填充图案高度
     * @default 1
     */
    this.PatHeight = (options.PatHeight !== undefined && options.PatHeight !== null) ? options.PatHeight : 1;

    /**
     * @member Zondy.Object.CRegionInfo.prototype.PatID
     * @type {Number}
     * @description 填充图案ID
     * @default 1
     */
    this.PatID = (options.PatID !== undefined && options.PatID !== null) ? options.PatID : 1;

    /**
     * @member Zondy.Object.CRegionInfo.prototype.PatWidth
     * @type {Number}
     * @description 填充图案宽度
     * @default 1
     */
    this.PatWidth = (options.PatWidth !== undefined && options.PatWidth !== null) ? options.PatWidth : 1;

};

export {CRegionInfo};
Zondy.Object.CRegionInfo = CRegionInfo;