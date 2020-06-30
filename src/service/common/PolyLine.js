import {
    Tangram
} from "./Tangram";
import {
    Point2D
} from "./Point2D";

/**
 * 线几何对象
 * @class Zondy.Object.PolyLine
 * @classdesc 线几何对象
 * @extends Zondy.Object.Tangram
 * @param {Array} [pointArr =  new Array()] 一组点几何对象 Array<{@link Zondy.Object.Point2D}>
 * @param {Object} option 属性键值对
 * @param {Number} [option.nearDis = null] 线搜素半径,只在做线查询时需赋值
 */
class PolyLine extends Tangram {
    /// <summary>线几何对象构造函数</summary>
    /// <param name="pointArr" type="Array,Zondy.Object.Point2D in an Array">
    /// 一组点几何对象
    /// </param>
    constructor(pointArr, option) {
        var options = option ? option : {};
        super(options);

        /**
         * @member Zondy.Object.PolyLine.prototype.nearDis
         * @type {Number}
         * @description 线搜素半径double,只在做线查询时需赋值
         * @default null
         */
        this.nearDis = (options.nearDis !== undefined && options.nearDis !== null) ? parseFloat(options.nearDis) : null;

        /**
         * @member Zondy.Object.PolyLine.prototype.pointArr
         * @type {Array}
         * @description 一组点几何对象 Array<{@link Zondy.Object.Point2D}>
         * @default new Array()
         */
        this.pointArr = ((pointArr !== undefined && pointArr !== null) && Array.isArray(pointArr)) ? pointArr : new Array();
    }

    /**
     * @function Zondy.Object.PolyLine.prototype.setByOL
     * @description 通过传入Openlayers的ol.geom.LineString类型来设置参数
     * @param {ol.geom.LineString} openlayersLine Openlayers定义的折线对象
     */
    setByOL(openlayersLine) {
        if (openlayersLine !== undefined && openlayersLine !== null) {
            var dotArr = openlayersLine.getCoordinates();
            var len = dotArr.length;
            for (var i = 0; i < len; i++) {
                this.pointArr[i] = new Point2D(dotArr[i][0], dotArr[i][1]);
            }
        }
    }

    /**
     * @function Zondy.Object.PolyLine.prototype.toString
     * @description 对象转化为字符串
     * @returns {String} 返回一个字符串来表示该折线
     */
    toString() {
        if (this.pointArr === null || this.pointArr.length === 0)
            return "";
        var str = this.pointArr[0].x + ',' + this.pointArr[0].y;
        for (var i = 1; i < this.pointArr.length; i++) {
            str += "," + this.pointArr[i].x + ',' + this.pointArr[i].y;
        }
        if (this.nearDis !== undefined && this.nearDis !== null) {

            str += ";" + this.nearDis;
        } else {
            str = str.substring(0, str.length - 1);
        }
        return this.Trim(str, "g");
    }

    /**
     * @function Zondy.Object.PolyLine.prototype.getGeometryType
     * @description 获取几何类型名称
     * @returns {String} line
     */
    getGeometryType() {
        return "line";
    }
}
export {
    PolyLine
};
Zondy.Object.PolyLine = PolyLine;