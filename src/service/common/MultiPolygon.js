import {
    Tangram
} from "./Tangram";
import {
    Point2D
} from "./Point2D";
import {
    Polygon
} from "./Polygon";

/**
 * 多多边形几何对象
 * @class Zondy.Object.MultiPolygon
 * @classdesc 多多边形几何对象
 * @extends Zondy.Object.Tangram
 * @param {Array} polygonArr 一组线几何对象 Array<{@link Zondy.Object.Polygon}>
 * @param {Object} option 属性键值对,拓展属性
 */
class MultiPolygon extends Tangram {
    /// <summary>多多边形几何对象构造函数</summary>
    /// <param name="polygonArr" type="Zondy.Object.Polygon in an Array">
    /// 多边形数组
    /// </param>
    constructor(polygonArr, option) {
        var options = option ? option : {};
        super(options);

        /**
         * @member Zondy.Object.MultiPolygon.prototype.polygonArr
         * @type {Array}
         * @description  一组线几何对象 Array<{@link Zondy.Object.Polygon}>
         * @default false
         */
        this.polygonArr = ((polygonArr !== undefined && polygonArr !== null) && Array.isArray(polygonArr)) ? polygonArr : new Array();
    }

    /**
     * @function Zondy.Object.MultiPolygon.prototype.setByOL
     * @description 设通过传入Openlayers的ol.geom.Polygon类型来设置参数
     * @param {ol.geom.Polygon} openlayersPoly 由Openlayers定义的多边形
     */
    setByOL(openlayersPoly) {
        if (openlayersPoly !== undefined && openlayersPoly !== null) {
            this.polygonArr = [];

            var polygonLen = openlayersPoly.getLinearRingCount();
            var lineRingArr = openlayersPoly.getLinearRings();
            for (var i = 0; i < polygonLen; i++) {
                var pointArr = lineRingArr[i].getCoordinates();
                var len = pointArr.length;
                var polygonPoints = [];
                for (var j = 0; j < len; j++) {
                    polygonPoints[j] = new Point2D(pointArr[j][0], pointArr[j][1]);
                }
                this.polygonArr[i] = new Polygon(polygonPoints);
            }
        }
    }

    /**
     * @function Zondy.Object.MultiPolygon.prototype.toString
     * @description 返回一个字符串来表示该多边形
     */
    toString() {
        if (this.polygonArr === undefined || this.polygonArr === null || this.polygonArr.length === 0)
            return "";
        var str = "";
        for (var i = 0; i < this.polygonArr.length; i++) {
            str += this.polygonArr[i].toString() + ";";
        }
        return str.substring(0, str.length - 1);
    }

    /**
     * @function Zondy.Object.MultiPolygon.prototype.getGeometryType
     * @description 获取几何类型名称
     */
    getGeometryType() {
        return "multiPolygon";
    }
}

export {
    MultiPolygon
};
Zondy.Object.MultiPolygon = MultiPolygon;