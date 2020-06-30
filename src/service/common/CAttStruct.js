import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";

/**
 * 属性结构
 * @class Zondy.Object.CAttStruct
 * @classdesc 属性结构
 * @param {Object} option 属性键值对
 * @param {Number} [option.FldNumber = 0] 属性个数
 * @param {Array} [option.FldName = null] 属性字段名数组,Array,string in an Array
 * @param {Array} [option.FldType = null] 属性字段类型数组,Array,string in an Array
 */
var CAttStruct = function (option) {
    var options = (option !== undefined) ? option : {};

    extend(this, options);

    /**
     * @private
     * @member Zondy.Object.CAttStruct.prototype.FldNumber
     * @type {Number}
     * @description 属性个数
     */
    this.FldNumber = (options.FldNumber !== undefined) ? options.FldNumber : 0;

    /**
     * @private
     * @member Zondy.Object.CAttStruct.prototype.FldName
     * @type {Array}
     * @description 属性字段名数组 Array<String>
     */
    this.FldName = (options.FldName !== undefined) ? options.FldName : null;

    /**
     * @private
     * @member Zondy.Object.CAttStruct.prototype.FldType
     * @type {Array}
     * @description 属性字段类型数组 Array<String>
     */
    this.FldType = (options.FldType !== undefined) ? options.FldType : null;
};
export {
    CAttStruct
};
Zondy.Object.CAttStruct = CAttStruct;