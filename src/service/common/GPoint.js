import {
    Zondy
} from './Base';
import {
    FeatureGraphicBase
} from "./FeatureGraphicBase";
import {
    Point2D
} from "./Point2D";

/**
 * 点要素几何图形对象
 * @class Zondy.Object.GPoint
 * @classdesc 点要素几何图形对象
 * @extends Zondy.Object.FeatureGraphicBase
 * @param {Number} x x坐标
 * @param {Number} y y坐标
 * @param {Object} option 属性键值对,拓展属性
 */
class GPoint extends FeatureGraphicBase {
    /// <summary>点要素几何图形信息对象构造函数</summary>
    constructor(x, y, option) {
        var options = option ? option : {};
        super(options);
        if ((x !== undefined && x !== null) && (y !== undefined && y !== null)) {

            /**
             * @member Zondy.Object.GPoint.prototype.Dot
             * @type {Zondy.Object.Point2D}
             * @description 点几何对象
             * @default null
             */
            this.Dot = new Point2D(x, y);
        }
    }

    /**
     * @function Zondy.Object.GLine.prototype.setDot
     * @description 设置点要素几何信息
     * @param {Zondy.Object.Point2D} [pnt=null] 点几何对象
     */
    setDot(pnt) {
        this.Dot = (pnt !== undefined && pnt !== null) ? pnt : null;
    }
}
export {
    GPoint
};
Zondy.Object.GPoint = GPoint;