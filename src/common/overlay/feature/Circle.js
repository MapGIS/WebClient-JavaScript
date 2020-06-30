import {Zondy} from '../../service/common/Base';
import {ShapeParameters} from './ShapeParameters';

/**
 * @private
 * @class  Zondy.Feature.ShapeParameters.Circle
 * @classdesc 圆形参数对象。
 * @extends {Zondy.Feature.ShapeParameters}
 *
 * @typedef {Object} Zondy.Feature.ShapeParameters.Circle.style
 * @property {string} brushType - 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
 * @property {string} color - 填充颜色,默认值"#000000"
 * @property {string} strokeColor - 描边颜色,默认值为'#000000'
 * @property {string} lineCape — 线帽样式，可以是 butt, round, square，默认是butt
 * @property {number} lineWidth - 描边宽度、默认是1
 * @property {number} opacity - 绘制透明度、默认是1，不透明
 * @property {number} shadowBlur - 阴影模糊度，大于0有效，默认是0
 * @property {number} shadowColor - 阴影颜色，默认是'#000000'
 * @property {number} shadowOffsetX - 阴影横向偏移，默认是0
 * @property {number} shadowOffsetY - 阴影纵向偏移，默认是0
 */
class Circle extends ShapeParameters {

    /**
     * @function Zondy.Feature.ShapeParameters.Circle.prototype.constructor
     * @description 创建一个圆形参数对象。
     * @param {number} x - 圆心 x 坐标，必设参数。
     * @param {number} y - 圆心 y 坐标，必设参数。
     * @param {number} r - 圆半径，必设参数。
     * @returns {Zondy.Feature.ShapeParameters.Circle} 圆形参数对象。
     */
    constructor(x, y, r) {
        super(x, y, r);

        /**
         * @member {number} Zondy.Feature.ShapeParameters.Circle.prototype.x
         * @description 圆心 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * @member {number} Zondy.Feature.ShapeParameters.Circle.prototype.y
         * @description 圆心 y 坐标。
         */
        this.y = !isNaN(y) ? y : 0;

        /**
         * @member {number} Zondy.Feature.ShapeParameters.Circle.prototype.r
         * @description 圆半径。
         */
        this.r = !isNaN(r) ? r : 0;

        this.CLASS_NAME = "Zondy.Feature.ShapeParameters.Circle";
    }

    /**
     * @function Zondy.Feature.ShapeParameters.Circle.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;
        super.destroy();
    }
}

export {Circle};
Zondy.Feature.ShapeParameters.Circle = Circle;
