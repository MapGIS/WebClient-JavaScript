import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";

/**
 * 弧段对象构造函数
 * @class Zondy.Object.Arc
 * @classdesc 弧段对象构造函数
 * @param {Array} dots  一组Zondy.Object.Point2D ，一组点用以构造弧段
 * @param {*} option 属性键值对,记录属性字段
 */
var Arc = function (dots, option) {
    /**
     * @member Zondy.Object.Arc.prototype.ArcID
     * @description 弧段ID
     */
    this.ArcID = 0;
    var options = (option !== undefined) ? option : {};
    extend(this, options);

    /**
     * @private
     * @member Zondy.Object.Arc.prototype.Dots {Array}
     * @type {Array}
     * @description 一组点用以构造弧段 Array<{@link Zondy.Object.Point2D}>
     */
    this.Dots = (dots !== undefined && dots !== null) ? dots : null;
};

export {
    Arc
};
Zondy.Object.Arc = Arc;