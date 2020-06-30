import {
    Zondy
} from './Base';
import {
    FeatureGraphicBase
} from "./FeatureGraphicBase";
import {
    AnyLine
} from "./AnyLine";

/**
 * 区要素几何图形信息对象
 * @class Zondy.Object.GRegion
 * @classdesc 区要素几何图形信息对象
 * @extends Zondy.Object.FeatureGraphicBase
 * @param {Array} rings 一组线几何对象 Array<{@link Zondy.Object.AnyLine}>
 * @param {Object} option 属性键值对,拓展属性
 */
class GRegion extends FeatureGraphicBase {
    /// <summary>区要素几何图形信息对象构造函数</summary>
    /// <param name="rings" type="Array,Zondy.Object.AnyLine in an Array">一组线几何对象</param>
    constructor(rings, option) {
        var options = option ? option : {};
        super(options);

        /**
         * @member Zondy.Object.GRegion.prototype.Rings
         * @type {Array}
         * @description 一组线几何对象 Array<{@link Zondy.Object.AnyLine}>
         * @default null
         */
        this.Rings = ((rings !== undefined && rings !== null) && Array.isArray(rings)) ? rings : null;
    }

    /**
     * @function Zondy.Object.GRegion.prototype.setRings
     * @description 设置区要素几何信息
     * @param {Array} [rings=null] 一组线几何对象 Array<{@link Zondy.Object.AnyLine}>
     */
    setRings(rings) {
        this.Rings = (rings !== undefined && rings !== null) ? rings : null;
    }
}
export {
    GRegion
};
Zondy.Object.GRegion = GRegion;