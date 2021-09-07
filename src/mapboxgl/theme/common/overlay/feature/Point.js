import { Common } from '@mapgis/webclient-es6-service';

import {ShapeParameters} from './ShapeParameters';

const { Zondy } = Common;

/**
 * @private
 * @class  Zondy.Feature.ShapeParameters.Point
 * @classdesc 点参数对象。
 * @extends {Zondy.Feature.ShapeParameters}
 *
 * @typedef {Object} Zondy.Feature.ShapeParameters.Point.style
 * @property {number} pointRadius - 点的半径，默认值：6。
 * @property {boolean} fill - 是否填充，不需要填充则设置为false，默认值为 true。此属性与 stroke 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染。
 * @property {string} fillColor - 十六进制填充颜色。默认值为 "#000000"。
 * @property {number} fillOpacity - 填充不透明度。取值范围[0, 1]，默认值 1。
 * @property {boolean} stroke - 是否描边，不需要描边则设置为 false，默认值为 false。此属性与 fill 不能同时为 false，如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染。
 * @property {string} strokeColor - 十六进制描边颜色。
 * @property {number} strokeWidth - 描边宽度，默认值 1。
 * @property {number} strokeOpacity - 描边的不透明度。取值范围[0, 1]，默认值 1。
 * @property {number} shadowBlur - 阴影模糊度，（大于 0 有效; 默认值 0）。
 * @property {string} shadowColor - 阴影颜色; 默认值 '#000000'。
 * @property {number} shadowOffsetX - 阴影 X 方向偏移值; 默认值 0。
 * @property {number} shadowOffsetY - 阴影 Y 方向偏移值; 默认值 0。
 */
class Point extends ShapeParameters {

    /**
     * @function Zondy.Feature.ShapeParameters.Point.prototype.constructor
     * @description 创建一个图形点参数对象。
     * @param {number} x - 点 x 坐标，必设参数。
     * @param {number} y - 点 y 坐标，必设参数。
     * @returns {Zondy.Feature.ShapeParameters.Point} 标签参数对象。
     */
    constructor(x, y) {
        super(x, y);

        /**
         * @member {number}  Zondy.Feature.ShapeParameters.Point.prototype.x
         * @description 点 x 坐标。
         */
        this.x = !isNaN(x) ? x : 0;

        /**
         * @member {number}  Zondy.Feature.ShapeParameters.Point.prototype.y
         * @description 点 y 坐标。
         */
        this.y = !isNaN(y) ? y : 0;

        /**
         * @member {number}  Zondy.Feature.ShapeParameters.Point.prototype.r
         * @description 点的半径。
         */
        this.r = 6;
        
        this.CLASS_NAME = "Zondy.Feature.ShapeParameters.Point";
    }

    /**
     * @function Zondy.Feature.ShapeParameters.Point.prototype.destroy
     * @description 销毁对象。
     */
    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;

        super.destroy();
    }
}

export {Point};
Zondy.Feature.ShapeParameters.Point = Point;