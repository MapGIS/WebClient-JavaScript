import {
    Tangram
} from "./Tangram";
import {
    Point2D
} from "./Point2D";

/**
 * 多边形几何对象
 * @class Zondy.Object.Polygon
 * @classdesc 多边形几何对象
 * @extends Zondy.Object.Tangram
 * @param {Array} [pointArr =  new Array()] 一组点类型 Array<{@link Zondy.Object.Point2D}>
 * @param {Object} option 属性键值对,拓展属性
 */
class Polygon extends Tangram {

    /// <summary>多边形几何对象构造函数</summary>
    /// <param name="pointArr" type="Array,Zondy.Object.Point2D in an Array">一组点类型</param>
    constructor(pointArr, option) {
        var options = option ? option : {};
        super(options);

        /**
         * @member Zondy.Object.Polygon.prototype.pointArr
         * @type {Array}
         * @description 一组点类型 Array<{@link Zondy.Object.Point2D}>
         * @default new Array()
         */
        this.pointArr = ((pointArr !== undefined && pointArr !== null) && Array.isArray(pointArr)) ? pointArr : new Array();
    }

    /**
     * @function Zondy.Object.Polygon.prototype.setByOL
     * @description 通过传入Openlayers的ol.geom.Polygon类型来设置参数
     * @param {ol.geom.Polygon} openlayersPoly Openlayers定义的多边形
     */
    setByOL(openlayersPoly) {
        if (openlayersPoly !== undefined && openlayersPoly !== null) {
            var linering = openlayersPoly.getLinearRing(0);
            var pointArr = linering.getCoordinates();
            var len = pointArr.length;
            for (var i = 0; i < len; i++) {
                this.pointArr[i] = new Point2D(pointArr[i][0], pointArr[i][1]);
            }
        }
    }

    /**
     * @function Zondy.Object.Polygon.prototype.toString
     * @description 对象转化为字符串
     * @returns {String} 返回一个字符串来表示该多边形
     */
    toString() {
        if (this.pointArr === null || this.pointArr.length === 0) {
            return "";
        }
        var str = "";
        for (var i = 0; i < this.pointArr.length; i++) {
            str += this.pointArr[i].x + ',' + this.pointArr[i].y + ',';
        }
        return str.substring(0, str.length - 1);
    }


    /**
     * @function Zondy.Object.Polygon.prototype.getGeometryType
     * @description 获取几何类型名称
     * @returns {String} polygon
     */
    getGeometryType() {
        return "polygon";
    }
}
export {
    Polygon
};
Zondy.Object.Polygon = Polygon;