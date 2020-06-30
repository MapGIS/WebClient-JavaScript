import {
    Zondy
} from './Base';
import {
    Tangram
} from "./Tangram";
import {
    Point2D
} from "./Point2D";

/**
 * 圆几何对象
 * @class Zondy.Object.Circle
 * @classdesc 圆几何对象
 * @extends Zondy.Object.Tangram
 * @param {Zondy.Object.Point2D} [point = null] 圆心点
 * @param {Number} [radious = null] 半径
 * @param {Object} option 属性键值对,用于拓展额外的属性字段
 */
class Circle extends Tangram {

    /**
     * @description 圆几何对象构造函数
     * @param {Zondy.Object.Point2D} [point = null] 圆心点
     * @param {Number} [radious = null] 半径
     * @param {Object} option 属性键值对,用于拓展额外的属性字段
     */
    constructor(point, radious, option) {
        var options = option ? option : {};
        super(options);

        /**
         * @private
         * @member Zondy.Object.Circle.prototype.point
         * @type {Zondy.Object.Point2D}
         * @description 圆心点
         * @default null
         */
        this.point = (point !== undefined && point !== null) ? point : null;

        /**
         * @private
         * @member Zondy.Object.Circle.prototype.radious
         * @type {Number}
         * @description 半径
         * @default null
         */
        this.radious = (radious !== undefined && radious !== null) ? radious : null;
    }

    /**
     * @function Zondy.Object.Circle.prototype.setByOL
     * @description 通过传入Openlayers的ol.geom.Circle类型来设置参数
     * @param {ol.geom.Circle} openlayersPoly 由Openlayers定义的多边形
     */
    setByOL(openlayersPoly) {
        if (openlayersPoly !== undefined && openlayersPoly !== null) {
            //圆心
            var centerPoint = openlayersPoly.getCenter();
            //圆半径
            var radious = openlayersPoly.getRadius();
            this.point = new Zondy.Object.Point2D(centerPoint[0], centerPoint[1]);
            this.radious = radious;
        }
    }

    /**
     * @function Zondy.Object.Circle.prototype.toString
     * @description 返回一个字符串来表示该多边形
     * @returns {String}
     */
    toString() {
        if (this.point === null || this.point.length === 0 || this.radious === null) {
            return "";
        }
        return this.point.x + "," + this.point.y + "," + this.radious;
    }

    /**
     * @function Zondy.Object.Circle.prototype.getGeometryType
     * @description 获取几何类型名称
     * @returns "Circle"
     */
    getGeometryType() {
        return "Circle";
    }
}

export {
    Circle
};
Zondy.Object.Circle = Circle;