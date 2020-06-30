import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";

/**
 * 线对象构造函数
 * @class Zondy.Object.AnyLine
 * @classdesc 线对象构造函数
 * @param {Array} [arcs = null] 一组Zondy.Object.Arc ，用以描述弧段
 * @param {*} option 属性键值对,记录属性字段
 */
var AnyLine = function (arcs, option) {

    var options = (option !== undefined) ? option : {};

    extend(this, options);

    /**
     * @private
     * @member Zondy.Object.AnyLine.prototype.Arcs
     * @type {Array}
     * @description 一组Zondy.Object.Arc，用以描述弧段 Array<{@link Zondy.Object.Arc}>
     */
    this.Arcs = (arcs !== undefined && arcs !== null) ? arcs : null;
};
export {
    AnyLine
};
Zondy.Object.AnyLine = AnyLine;