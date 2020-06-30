import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";

/**
 * 线要素的符号参数信息对象
 * @class Zondy.Object.CLineInfo
 * @classdesc 线要素的符号参数信息对象
 * @param {Object} option 属性键值对
 * @param {Number} [option.Color = 1] 线颜色
 * @param {Number} [option.LinStyleID = 1] 线型ID
 * @param {Number} [option.LinStyleID2 = 0] 辅助线型ID
 * @param {Number} [option.LinWidth = 1] 线宽度
 * @param {Number} [option.Xscale = 1] x比例系数
 * @param {Number} [option.Yscale = 1] y比例系数
 *
 */
var CLineInfo = function (option) {
    var options = (option !== undefined) ? option : {};
    extend(this, options);

    /**
     * @member Zondy.Object.CLineInfo.prototype.Color
     * @type {Number}
     * @description 线颜色
     * @default 1
     */
    this.Color = (options.Color !== undefined && options.Color !== null) ? options.Color : 1;

    /**
     * @member Zondy.Object.CLineInfo.prototype.LinStyleID
     * @type {Number}
     * @description 线颜色
     * @default 1
     */
    this.LinStyleID = (options.LinStyleID !== undefined && options.LinStyleID !== null) ? options.LinStyleID : 1;


    /**
     * @member Zondy.Object.CLineInfo.prototype.LinStyleID2
     * @type {Number}
     * @description 辅助线型ID
     * @default 0
     */
    this.LinStyleID2 = (options.LinStyleID2 !== undefined && options.LinStyleID2 !== null) ? options.LinStyleID2 : 0;

    /**
     * @member Zondy.Object.CLineInfo.prototype.LinWidth
     * @type {Number}
     * @description 线宽度
     * @default 1
     */
    this.LinWidth = (options.LinWidth !== undefined && options.LinWidth !== null) ? options.LinWidth : 1;

    /**
     * @member Zondy.Object.CLineInfo.prototype.Xscale
     * @type {Number}
     * @description 线宽度
     * @default 1
     */
    this.Xscale = (options.Xscale !== undefined && options.Xscale !== null) ? options.Xscale : 1;

    /**
     * @member Zondy.Object.CLineInfo.prototype.Yscale
     * @type {Number}
     * @description y比例系数
     * @default 1
     */
    this.Yscale = (options.Yscale !== undefined && options.Yscale !== null) ? options.Yscale : 1;
};
export {
    CLineInfo
};
Zondy.Object.CLineInfo = CLineInfo;