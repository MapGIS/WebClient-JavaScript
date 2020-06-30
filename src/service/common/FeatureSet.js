import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";
import {
    CAttStruct
} from "./CAttStruct";
import {
    Feature
} from "./Feature";

/**
 * 要素集合信息对象
 * @class Zondy.Object.FeatureSet
 * @classdesc 要素集合信息对象
 * @param {Object} option 属性键值对
 * @param {Array} [option.TotalCount = null] 要素总数
 * @param {Array} [option.AttStruct = null] 属性结构 Array<{@link Zondy.Object.CAttStruct}>
 * @param {Array} [option.SFEleArray = new Array()] 要素数组 Array<{@link Zondy.Object.Feature}>
 */
var FeatureSet = function (option) {
    var options = (option !== undefined) ? option : {};
    extend(this, options);

    /**
     * @property TotalCount
     * @description 一次查询的总要素个数，仅在做要素查询时有意义
     * @type {Number}
     * @readonly
     */
    this.TotalCount = (options.TotalCount !== undefined && options.TotalCount !== null) ? options.TotalCount : 0;

    /**
     * @member Zondy.Object.FeatureSet.prototype.AttStruct
     * @type {Array}
     * @description 属性结构 Array<{@link Zondy.Object.CAttStruct}>
     * @default null
     */
    this.AttStruct = (options.AttStruct !== undefined && options.AttStruct !== null) ? options.AttStruct : null;

    /**
     * @member Zondy.Object.FeatureSet.prototype.SFEleArray
     * @type {Array}
     * @description 要素数组 Array<{@link Zondy.Object.Feature }>
     * @default new Array()
     */
    this.SFEleArray = (options.SFEleArray !== undefined && options.SFEleArray !== null) ? options.SFEleArray : new Array();
};

/**
 * @function Zondy.Object.FeatureSet.prototype.clear
 * @description 清空要素集合
 */
FeatureSet.prototype.clear = function () {
    this.AttStruct = null;
    this.SFEleArray = new Array();
};

/**
 * @function Zondy.Object.FeatureSet.prototype.addFeature
 * @description 添加一组或者一个要素
 * @param {Array | Zondy.Object.Feature | Object} 一组要素，或者一个要素 Object代表Feature的属性键值对
 */
FeatureSet.prototype.addFeature = function (features) {
    if (features instanceof Array) {
        this.SFEleArray.concat(features);
    } else {
        this.SFEleArray.push(features);
    }
};

/**
 * @function Zondy.Object.FeatureSet.prototype.getFeaturesLength
 * @description 获取要素集要素的记录条数
 * @returns {Number} 要素集要素的记录条数
 */
FeatureSet.prototype.getFeaturesLength = function () {
    if (this.SFEleArray instanceof Array) {
        return this.SFEleArray.length;
    } else {
        return 0;
    }
};

/**
 * @function Zondy.Object.FeatureSet.prototype.getFeatureByIndex
 * @description 获取指定要素对象
 * @param {Number} i 对象索引下标
 * @returns {Zondy.Object.Feature} 要素对象
 */
FeatureSet.prototype.getFeatureByIndex = function (i) {
    if (i >= this.getFeaturesLength()) {
        return null;
    } else {
        var feature = this.SFEleArray[i];
        if (feature instanceof Feature) {
            return feature;
        } else {
            return new Feature(this.SFEleArray[i]);
        }
    }
};

/**
 * @function Zondy.Object.FeatureSet.prototype.getAttType
 * @description 获取某属性字段的类型
 * @param {String | Number} attKey 属性字段关键字，可以是{String}字段名，可以是序号{Interger}
 * @returns {String} 字段类型
 */
FeatureSet.prototype.getAttType = function (attKey) {
    var index;
    if (this.AttStruct == null) {
        return null;
    }
    if (typeof (attKey) == 'number') {
        index = attKey;
    } else {
        index = this.getAttIndexByAttName(attKey);
    }
    if (index == null) {
        return null;
    } else {
        return this.AttStruct.FldType[index];
    }
};

/**
 * @function Zondy.Object.FeatureSet.prototype.getAttIndexByAttName
 * @description 通过属性的名称获取属性的序号
 * @param {String} name 属性名
 * @returns {Number} 属性序号
 */
FeatureSet.prototype.getAttIndexByAttName = function (name) {
    if (this.AttStruct == null) {
        return null;
    }
    if (this.AttStruct.FldName == null) {
        return null;
    }
    var length = this.AttStruct.FldName.length;
    for (var i = 0; i < length; i++) {
        if (this.AttStruct.FldName[i] == name) {
            return i;
        }
    }
    return null;
};

/**
 * @function Zondy.Object.FeatureSet.prototype.getAttNameByIndex
 * @description 通过属性的序号获取属性名称
 * @param {Number} index 属性序号
 * @returns {String} 属性名称
 */
FeatureSet.prototype.getAttNameByIndex = function (index) {
    if (this.AttStruct == null) {
        return null;
    }
    if (this.AttStruct.FldName == null) {
        return null;
    }
    if (this.AttStruct.FldName.length <= index) {
        return null;
    }
    return this.AttStruct.FldName[index];
};
export {
    FeatureSet
};
Zondy.Object.FeatureSet = FeatureSet;
