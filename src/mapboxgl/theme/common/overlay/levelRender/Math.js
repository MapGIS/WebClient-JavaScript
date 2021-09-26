import { Common } from '@mapgis/webclient-es6-service';
const { Zondy } = Common;

/**
 * @private
 * @class  Zondy.LevelRenderer.Tool.Math
 * @classdesc LevelRenderer 工具-数学辅助类
 */
class Math {

    /**
     * @function Zondy.LevelRenderer.Tool.Math.constructor
     * @description 构造函数。
     */
    constructor() {
        /**
         * @member {number} Zondy.LevelRenderer.Tool.Math._radians
         * @description 角度与弧度转化参数
         */
        this._radians = window.Math.PI / 180;

        this.CLASS_NAME = "Zondy.LevelRenderer.Tool.Math";
    }

    /**
     * @function Zondy.LevelRenderer.Tool.Math.prototype.sin
     * @description 正弦函数。
     * @param {number} angle - 弧度（角度）参数。
     * @param {boolean} [isDegrees=false] - angle参数是否为角度计算，angle为以弧度计量的角度。
     * @returns {number} sin 值。
     */
    sin(angle, isDegrees) {
        return window.Math.sin(isDegrees ? angle * this._radians : angle);
    }

    /**
     * @function Zondy.LevelRenderer.Tool.Math.prototype.cos
     * @description 余弦函数。
     * @param {number} angle - 弧度（角度）参数。
     * @param {boolean} [isDegrees=false] - angle参数是否为角度计算，angle为以弧度计量的角度。
     * @returns {number} cos 值。
     */
    cos(angle, isDegrees) {
        return window.Math.cos(isDegrees ? angle * this._radians : angle);
    }

    /**
     * @function Zondy.LevelRenderer.Tool.Math.prototype.degreeToRadian
     * @description 角度转弧度。
     * @param {number} angle - 弧度（角度）参数。
     * @param {boolean} [isDegrees=false] - angle参数是否为角度计算，angle为以弧度计量的角度。
     * @returns {number} 弧度值。
     */
    degreeToRadian(angle) {
        return angle * this._radians;
    }

    /**
     * @function Zondy.LevelRenderer.Tool.Math.prototype.radianToDegree
     * @description 弧度转角度。
     * @param {number} angle - 弧度（角度）参数。
     * @param {boolean} [isDegrees=false] - angle参数是否为角度计算，angle为以弧度计量的角度。
     * @returns {number} 角度。
     */
    radianToDegree(angle) {
        return angle / this._radians;
    }
}

export {Math};
Zondy.LevelRenderer.Tool.Math = Math;