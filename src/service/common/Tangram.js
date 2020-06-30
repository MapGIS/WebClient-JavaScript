import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";

/**
 * 几何对象基类
 * @class Zondy.Object.Tangram
 * @classdesc 几何对象基类
 * @param {Object} option 属性键值对,用于拓展额外的属性字段
 */
class Tangram {
    constructor(option) {
        var options = option ? option : {};
        extend(this, options);
    }

    /**
     * @function Zondy.Object.Tangram.prototype.setByOL
     * @description 实现将openlayers的geomerty转换为zondy的几何类型，此方法由子类实现
     */
    setByOL(openlayersObj) {
        return null;
    }

    /**
     * @function Zondy.Object.Tangram.prototype.toString
     * @description 对象转化为字符串
     */
    toString() {
        return "";
    }

    /**
     * @function Zondy.Object.Tangram.prototype.getGeometryType
     * @description 获取几何类型名称,由子类实现
     */
    getGeometryType() {
        return;
    }

    /**
     * @function Zondy.Object.Tangram.prototype.Trim
     * @description 1.去除字符串前后所有空格
     *              2.去除字符串中所有空格(包括中间空格,需要设置第2个参数为:g)
     *
     * @param {String} str
     * @param {String} [is_global = g] 值为 g 的时候去除字符串中所有空格
     */
    Trim(str, is_global) {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g, "");
        if (is_global.toLowerCase() === "g") {
            result = result.replace(/\s/g, "");
        }
        return result;
    }
}

export {
    Tangram
};
Zondy.Object.Tangram = Tangram;