import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";
import {
    Rectangle
} from "./Rectangle";
import {
    FeatureGeometry
} from "./FeatureGeometry";
import {
    FeatureType
} from "./EnumComm";
import {
    WebGraphicsInfo
} from "./WebGraphicsInfo";

/**
 * 要素信息对象
 * @class Zondy.Object.Feature
 * @classdesc 要素信息对象
 * @param {Object} option 属性键值对
 * @param {Array} [option.AttValue = null] 属性值 Array,String in an Array
 * @param {Number} [option.FID = 0] 要素id号
 * @param {Zondy.Object.Rectangle} [option.bound = null] 要素的外包矩形
 * @param {Zondy.Object.FeatureGeometry} [option.fGeom = null] 要素的几何图形描述
 * @param {FeatureType} [option.ftype = null] 要素几何类型 Zondy.Enum.FeatureType类型，只对简单要素类有效
 * @param {Zondy.Object.WebGraphicsInfo} [option.GraphicInfo = null] 几何图形参数
 */
var Feature = function (option) {
    var options = (option !== undefined) ? option : {};
    extend(this, options);

    /**
     * @member Zondy.Object.Feature.prototype.AttValue
     * @type {Array}
     * @description 属性值 Array<String>
     * @default null
     */
    this.AttValue = (options.AttValue !== undefined && options.AttValue !== null) ? options.AttValue : null;

    /**
     * @member Zondy.Object.Feature.prototype.FID
     * @type {Number}
     * @description 要素id号
     * @default 0
     */
    this.FID = (options.FID !== undefined && options.FID !== null) ? options.FID : 0;

    /**
     * @member Zondy.Object.Feature.prototype.bound
     * @type {Zondy.Object.Rectangle}
     * @description 要素的外包矩形
     * @default null
     */
    this.bound = (options.bound !== undefined && options.bound !== null) ? options.bound : null;

    /**
     * @member Zondy.Object.Feature.prototype.fGeom
     * @type {Zondy.Object.FeatureGeometry}
     * @description 要素的几何图形描述
     * @default null
     */
    this.fGeom = (options.fGeom !== undefined && options.fGeom !== null) ? options.fGeom : null;

    /**
     * @member Zondy.Object.Feature.prototype.ftype
     * @type {FeatureType}
     * @description 要素几何类型Zondy.Enum.FeatureType 类型，只对简单要素类有效
     * @default 0
     */
    this.ftype = (options.ftype !== undefined && options.ftype !== null) ? options.ftype : 0;

    /**
     * @member Zondy.Object.Feature.prototype.GraphicInfo
     * @type {Zondy.Object.WebGraphicsInfo}
     * @description 几何图形参数
     * @default null
     */
    this.GraphicInfo = (options.GraphicInfo !== undefined && options.GraphicInfo !== null) ? options.GraphicInfo : null;


};

/**
 * @function Zondy.Object.Feature.prototype.getAttValue
 * @description 获取当前要素的属性值
 * @param {Number} attKey 属性字段关键字或者属性序号
 * @returns {String} 获取当前要素的属性值
 */
Feature.prototype.getAttValue = function (attKey) {
    if (this.AttValue === null) {
        return null;
    }
    var attLength = this.AttValue.length;

    if (typeof (attKey) === 'number') {
        if (attKey >= attLength) {
            return null;
        }
        return this.AttValue[attKey];
    }
};

/**
 * @function Zondy.Object.Feature.prototype.getGraphicInfo
 * @description 获取当前要素的几何图形参数
 * @returns {Zondy.Object.WebGraphicsInfo} 当前要素的几何图形参数
 */
Feature.prototype.getGraphicInfo = function () {
    if (this.GraphicInfo === null) {
        return null;
    } else {
        return new WebGraphicsInfo(this.GraphicInfo);
    }
};

/**
 * @function Zondy.Object.Feature.prototype.getAttValueArray
 * @description 获取当前要素的所有字段属性值
 * @returns {Array} 字段属性值数组
 */
Feature.prototype.getAttValueArray = function () {
    return this.AttValue;
};

/**
 * @function Zondy.Object.Feature.prototype.getRectBound
 * @description 获取当前要素的外包矩形
 * @returns {Zondy.Object.Rectangle} 当前要素的外包矩形
 */
Feature.prototype.getRectBound = function () {
    var bound = this.bound;
    if (bound !== null) {
        return new Rectangle(bound);
    } else {
        return bound;
    }
};

/**
 * @function Zondy.Object.Feature.prototype.getGeometry
 * @description 获取当前要素的几何描述
 * @returns {String} 当前要素的几何描述
 */
Feature.prototype.getGeometry = function () {
    return this.fGeom;
};

/**
 * @function Zondy.Object.Feature.prototype.getFID
 * @description 获取当前要素的FID
 * @returns {Number} 当前要素的FID
 */
Feature.prototype.getFID = function () {
    return this.FID;
};

/**
 * 设置当前要素的所有属性值
 * @function Zondy.Object.Feature.prototype.setAttValues
 * @description 设置当前要素的所有属性值
 * @param {Array|Object} values 属性值数组 /或者属性键值对
 */
Feature.prototype.setAttValues = function (values) {
    this.AttValue = values;
};

/**
 * @function Zondy.Object.Feature.prototype.setBound
 * @description 设置当前要素的外包矩形
 * @param {String|Zondy.Object.Rectangle} bound 'xmin,ymin,xmax,ymax' | Rectangle
 * @returns {ol.extent} 外包矩形描述，可以是字符串，zondy矩形或者openlayers矩形
 */
Feature.prototype.setBound = function (bound) {
    var rect = null;
    if (typeof (bound) === "string") {
        rect = new Rectangle(bound);
    }
    if (bound instanceof String) {
        rect = new Rectangle(bound);
    }
    if (bound instanceof Rectangle) {
        rect = bound;
    }
    if (bound instanceof ol.extent) {
        rect = new Rectangle();
        rect.setByOL(bound);
    }
    this.bound = rect;
};

/**
 * @function Zondy.Object.Feature.prototype.setFID
 * @description 设置当前要素的FID
 * @param {Number} fid 要素id号
 */
Feature.prototype.setFID = function (fid) {
    this.FID = fid;
};

/**
 * @function Zondy.Object.Feature.prototype.setFType
 * @description 设置几何图形的类型
 * @param {FeatureType} fid 几何类型 Zondy.Enum.FeatureType
 */
Feature.prototype.setFType = function (type) {
    this.ftype = type;
};

/**
 * @function Zondy.Object.Feature.prototype.destroy
 * @description 销毁函数
 */
Feature.prototype.destroy = function () {
    this.AttValue = null;
    this.FID = null;
    this.bound = null;
    this.fGeom = null;
    this.ftype = null;
    this.GraphicInfo = null;
};
export {
    Feature
};
Zondy.Object.Feature = Feature;