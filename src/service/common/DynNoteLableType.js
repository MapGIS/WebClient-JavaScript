import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";
import {
    LablePntInfo
} from "./LablePntInfo";
import {
    LabelLinInfo
} from "./LabelLinInfo";
import {
    LabelRegInfo
} from "./LabelRegInfo";

/**
 * 动态注记方位属性对象
 * @class Zondy.Object.DynNoteLableType
 * @classdesc 动态注记方位属性对象
 * @param {Object} opt_options 属性键值对
 * @param {Zondy.Object.LablePntInfo} [opt_options.PntInfo = null] 点方位属性
 * @param {Zondy.Object.LabelLinInfo} [opt_options.LinInfo = null] 线方位属性
 * @param {Zondy.Object.LabelRegInfo} [opt_options.RegInfo = null] 区方位属性
 *
 */
var DynNoteLableType = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    extend(this, options);

    /**
     * @member Zondy.Object.DynNoteLableType.prototype.PntInfo
     * @type {Zondy.Object.LablePntInfo}
     * @description 点方位属性
     * @default null
     */
    this.PntInfo = (options.PntInfo !== undefined && options.PntInfo !== null) ? options.PntInfo : null;

    /**
     * @member Zondy.Object.DynNoteLableType.prototype.LinInfo
     * @type {Zondy.Object.LabelLinInfo}
     * @description 线方位属性
     * @default null
     */
    this.LinInfo = (options.LinInfo !== undefined && options.LinInfo !== null) ? options.LinInfo : null;

    /**
     * @member Zondy.Object.DynNoteLableType.prototype.RegInfo
     * @type {Zondy.Object.LabelRegInfo}
     * @description 区方位属性
     * @default null
     */
    this.RegInfo = (options.RegInfo !== undefined && options.RegInfo !== null) ? options.RegInfo : null;
};
export {
    DynNoteLableType
};
Zondy.Object.DynNoteLableType = DynNoteLableType;