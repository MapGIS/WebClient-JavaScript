import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";

/**
 * 属性字段行
 * @class Zondy.Object.CAttDataRow
 * @classdesc 属性字段行
 * @param {Array} values 属性字段名数组 Array,string in an Array
 * @param {Number} [fid = 0] id
 * @param {Object} option 属性键值对，拓展属性
 */
var CAttDataRow = function (values, fid, option) {
    var options = (option !== undefined) ? option : {};
    extend(this, options);

    /**
     * @private
     * @member Zondy.Object.CAttDataRow.prototype.FID
     * @type {Number}
     * @description id
     */
    this.FID = (fid !== undefined) ? fid : 0;

    /**
     * @private
     * @member Zondy.Object.CAttDataRow.prototype.Values
     * @type {Array}
     * @description 属性字段名数组 Array<String>
     */
    this.Values = (values !== undefined) ? values : null;
};
export {
    CAttDataRow
};
Zondy.Object.CAttDataRow = CAttDataRow;