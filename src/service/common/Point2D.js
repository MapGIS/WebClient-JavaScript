import {
    Tangram
} from "./Tangram";

/**
 * 点类型
 * @class Zondy.Object.Point2D
 * @classdesc 点类型
 * @extends Zondy.Object.Tangram
 * @param {Number} [x = null] 坐标x
 * @param {Number} [y = null] 坐标y
 * @param {Object} option 属性键值对
 * @param {Number} [option.nearDis = null] 容差半径,只在做点查询时需赋值
 */
class Point2D extends Tangram {
    constructor(x, y, option) {
        var options = option ? option : {};
        super(options);

        /**
         * @member Zondy.Object.Point2D.prototype.x
         * @type {Number}
         * @description 坐标x
         * @default null
         */
        this.x = x !== undefined ? x : null;

        /**
         * @member Zondy.Object.Point2D.prototype.y
         * @type {Number}
         * @description 坐标y
         * @default null
         */
        this.y = y !== undefined ? y : null;

        /**
         * @member Zondy.Object.Point2D.prototype.nearDis
         * @type {Number}
         * @description 容差半径,只在做点查询时需赋值
         * @default null
         */
        this.nearDis = options.nearDis !== undefined ? parseFloat(options.nearDis) : null;
        this.CLASS_NAME = "Zondy.Object.Point2D";
    }

    /**
     * @function Zondy.Object.Point2D.prototype.getGeometryType
     * @description 获取几何类型名称
     * @returns {String} point
     */
    getGeometryType() {
        return "point";
    }

    /**
     * @function Zondy.Object.Point2D.prototype.setByOL
     * @description 通过传入Openlayers的ol.geom.Point类型来设置参数
     * @param {ol.geom.Point} point Openlayers定义的点类型
     */
    setByOL(point) {
        if (point !== undefined) {
            var cordinate = point.getCoordinates();
            this.x = cordinate[0];
            this.y = cordinate[1];
        }
    }

    /**
     * @function Zondy.Object.Point2D.prototype.toString
     * @description 对象转化为字符串
     * @returns {String} 返回一个以字符串形式表示的点
     */
    toString() {
        /// <summary>返回一个以字符串形式表示的点</summary>
        if (this.x === null || this.y === null)
            return "";
        var str = this.x + ',' + this.y;
        if (this.nearDis !== undefined) {
            str += ";" + this.nearDis;
        }
        return str;
    }
}
export {
    Point2D
};
Zondy.Object.Point2D = Point2D;