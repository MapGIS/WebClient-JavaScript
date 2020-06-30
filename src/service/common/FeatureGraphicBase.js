import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";

/**
 * 几何对象基类
 * @class Zondy.Object.FeatureGraphicBase
 * @classdesc 几何对象基类
 * @param {Object} option 属性键值对
 * @param {Number} [option.GID = 0] 要素几何图形ID号
 */
class FeatureGraphicBase {
    constructor(option) {
        var options = (option !== undefined) ? option : {};
        extend(this, options);

        /**
         * @member Zondy.Object.FeatureGraphicBase.prototype.GID
         * @type {Number}
         * @description GID
         * @default 0
         */
        this.GID = (options.GID !== undefined && options.GID !== null) ? options.GID : 0;
    }

    /**
     *@function Zondy.Object.FeatureGraphicBase.prototype.setGID
     * @description 设置要素几何图形ID
     * @param {Number} id 要素几何图形ID号
     */
    setGID(id) {
        if (id !== undefined && id !== null) {
            this.GID = id;
        }
    }
}
export {
    FeatureGraphicBase
};
Zondy.Object.FeatureGraphicBase = FeatureGraphicBase;