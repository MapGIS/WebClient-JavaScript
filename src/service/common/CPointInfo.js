import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";

/**
 * 点要素的符号参数信息对象
 * @class Zondy.Object.CPointInfo
 * @classdesc 点要素的符号参数信息对象
 * @param {Object} opt_options 属性键值对
 * @param {Number} [opt_options.Angle = 1] 子图角度
 * @param {Number} [opt_options.Color = 1] 子图颜色
 * @param {Number} [opt_options.SymHeight = 1] 子图高度
 * @param {Number} [opt_options.SymID = 1] 子图ID
 * @param {Number} [opt_options.SymWidth = 1] 子图宽度
 */
var CPointInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    extend(this, options);

    /**
     * @member Zondy.Object.CPointInfo.prototype.Angle
     * @type {Number}
     * @description 子图角度
     * @default 1
     */
    this.Angle = (options.Angle !== undefined && options.Angle !== null) ? options.Angle : 1;

    /**
     * @member Zondy.Object.CPointInfo.prototype.Color
     * @type {Number}
     * @description 子图颜色
     * @default 1
     */
    this.Color = (options.Color !== undefined && options.Color !== null) ? options.Color : 1;

    /**
     * @member Zondy.Object.CPointInfo.prototype.SymHeight
     * @type {Number}
     * @description 子图高度
     * @default 1
     */
    this.SymHeight = (options.SymHeight !== undefined && options.SymHeight !== null) ? options.SymHeight : 1;

    /**
     * @member Zondy.Object.CPointInfo.prototype.SymID
     * @type {Number}
     * @description 子图ID
     * @default 1
     */
    this.SymID = (options.SymID !== undefined && options.SymID !== null) ? options.SymID : 1;

    /**
     * @member Zondy.Object.CPointInfo.prototype.SymWidth
     * @type {Number}
     * @description 子图宽度
     * @default 1
     */
    this.SymWidth = (options.SymWidth !== undefined && options.SymWidth !== null) ? options.SymWidth : 1;
};

export {
    CPointInfo
};
Zondy.Object.CPointInfo = CPointInfo;