import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";
import {
    VectClsType
} from "./EnumComm";
import {
    FeatureType
} from "./EnumComm";
import {
    CAttStruct
} from "./CAttStruct";

/**
 * 矢量类对象
 * @class Zondy.Object.VectCls
 * @classdesc 矢量类对象
 * @param {Object} option 属性键值对
 * @param {VectClsType} [option.clsType = VectClsType.SFCls] 图层类型 Zondy.Enum.VectClsType
 * @param {String} [option.clsName = null] 图层名称
 * @param {FeatureType} [option.geoType = 1] 要素几何类型 Zondy.Enum.FeatureType类型，只对简单要素类有效
 * @param {String} [option.srefName = ""] 空间参照系名称
 * @param {String} [option.dsName = ""] 要素数据集名称
 * @param {Zondy.Object.CAttStruct} [option.attStruct = null] 图层属性结构对象
 */
var VectCls = function (option) {
    var options = (option !== undefined) ? option : {};
    extend(this, options);

    /**
     * @member Zondy.Object.VectCls.prototype.clsType
     * @type {VectClsType}
     * @description 图层类型 Zondy.Enum.VectClsType
     * @default VectClsType.SFCls
     */
    this.clsType = (options.clsType !== undefined) ? options.clsType : VectClsType.SFCls;

    /**
     * @member Zondy.Object.VectCls.prototype.clsName
     * @type {String}
     * @description 图层名称
     * @default null
     */
    this.clsName = (options.clsName !== undefined) ? options.clsName : null;

    /**
     * @member Zondy.Object.VectCls.prototype.geoType
     * @type {FeatureType}
     * @description 要素几何类型 Zondy.Enum.FeatureType 类型，只对简单要素类有效
     * @default 1
     */
    this.geoType = (options.geoType !== undefined) ? options.geoType : 1;

    /**
     * @member Zondy.Object.VectCls.prototype.srefName
     * @type {String}
     * @description 空间参照系名称
     * @default ""
     */
    this.srefName = (options.srefName !== undefined) ? encodeURI(options.srefName) : "";

    /**
     * @member Zondy.Object.VectCls.prototype.dsName
     * @type {String}
     * @description 要素数据集名称
     * @default ""
     */
    this.dsName = (options.dsName !== undefined) ? encodeURI(options.dsName) : "";

    /**
     * @member Zondy.Object.VectCls.prototype.attStruct
     * @type {Zondy.Object.CAttStruct}
     * @description 图层属性结构对象
     * @default null
     */
    this.attStruct = (options.attStruct !== undefined) ? options.attStruct : null;

};
export {
    VectCls
};
Zondy.Object.VectCls = VectCls;