import { mapgis } from '../common/base';

import { Symbol } from './Symbol';

/**
 * 标记符号
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.PointStyle
 * @classdesc 标记符号
 * @param {String} [type = 'simple-marker'] marker类型:可选"simple-marker"|"picture-marker"
 * @param {Number} [angle = 0] 标记角度，默认为0
 * @param {Number} [xoffset = 0] 标记x偏移，默认为0像素
 * @param {Number} [yoffset = 0] 标记y偏移，默认为0像素
 */
export default class MarkerSymbol extends Symbol {
    constructor(option) {
        super(option);
        var options = option ? option : {};
        const { angle = 0.0, xoffset = 0, yoffset = 0 } = options;
        this.type = 'simple-marker';
        this.angle = angle;
        this.xoffset = xoffset;
        this.yoffset = yoffset;
    }

    /**
     * @description 将JSON格式的符号转换为JS对象
     * @param {Object} json 符号的实例化JSON
     */
    fromJSON(json) {
        json = json || {};
        const { type = 'simple-marker', opacity = 1.0, color = '#FFFFFF' } = json;
        const { angle = 0.0, xoffset = 0, yoffset = 0 } = json;

        // 父类属性Symbol.fromJSON
        this.color = color;
        this.opacity = opacity;

        // 自身属性
        this.type = type;
        this.angle = angle;
        this.xoffset = xoffset;
        this.yoffset = yoffset;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            color: this.color,
            opacity: this.opacity,
            angle: this.angle,
            xoffset: this.xoffset,
            yoffset: this.yoffset
        };
    }
}

export { MarkerSymbol };
mapgis.symbols.MarkerSymbol = MarkerSymbol;
