import { Common } from '@mapgis/webclient-es6-service';
import {ShapeParameters} from './ShapeParameters';

const { Zondy } = Common;

/**
 * @private
 * @class  Zondy.Feature.ShapeParameters.Line
 * @classdesc 线参数对象。
 * @extends {Zondy.Feature.ShapeParameters}
 *
 * @typedef {Object} Zondy.Feature.ShapeParameters.Line.style
 * @property {string} strokeColor - 十六进制线颜色。
 * @property {number}  strokeWidth - 线宽度，默认值 1。
 * @property {string} strokeLinecap - 线帽样式；strokeLinecap 有三种类型 ：“butt", "round", "square"; 默认为"butt"。
 * @property {string} strokeLineJoin - 线段连接样式；strokeLineJoin 有三种类型： “miter", "round", "bevel"; 默认为"miter"。
 * @property {string} strokeDashstyle - 虚线类型； strokeDashstyle 有八种类型 ：“dot",“dash",“dashdot",“longdash",“longdashdot",“solid", "dashed", "dotted"; 默认值 "solid"。solid 表示实线。
 * @property {number}  strokeOpacity - 线的不透明度。取值范围[0, 1]，默认值 1。
 * @property {number}  shadowBlur - 阴影模糊度，（大于 0 有效; 默认值 0）。
 * @property {string} shadowColor - 阴影颜色; 默认值 '#000000'。
 * @property {number}  shadowOffsetX - 阴影 X 方向偏移值; 默认值 0。
 * @property {number}  shadowOffsetY - 阴影 Y 方向偏移值; 默认值 0。
 */
class Line extends ShapeParameters {
    /**
     * @function Zondy.Feature.ShapeParameters.Line.prototype.constructor
     * @description 创建一个图形线参数对象。
     * @param {Array} pointList - 线要素节点数组，二维数组，必设参数。
     * @returns {Zondy.Feature.ShapeParameters.Line} 圆形参数对象。
     */
    constructor(pointList) {
        super(pointList);

        /**
         * @member {Array} Zondy.Feature.ShapeParameters.Line.prototype.pointList
         * @description 线要素节点数组，二维数组。
         * 数组形如：
         * (start code)
         *  [
         *  [10, 20],         //节点
         *  [30, 40],
         *  [25, 30]         //最后一个节点和第一个节点不必相同，绘制时自动封闭
         *   ]
         * (end)
         */
        this.pointList = pointList;

        this.CLASS_NAME = "Zondy.Feature.ShapeParameters.Line";

    }

    /**
     * @function Zondy.Feature.ShapeParameters.Line.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.pointList = null;
        super.destroy();
    }
}

export {Line};
Zondy.Feature.ShapeParameters.Line = Line;