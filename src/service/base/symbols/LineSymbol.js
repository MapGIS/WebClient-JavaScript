import { mapgis } from '../common/base';

import { Symbol } from './Symbol';

/**
 * 标记符号
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.PointStyle
 * @classdesc 线符号
 * @param {String} [type = 'simple-line'] marker类型:只能是'simple-line'
 * @param {String} [color = 0] 线符号颜色，默认为'rgb(0,0,0)'
 * @param {Number} [width = 0] 线符号宽度，默认为0.75像素
 */
export default class LineSymbol extends Symbol {
    constructor(option) {
        super(option);
        var options = option ? option : {};
        const { color = 'rgb(0,0,0)', width = 0.75 } = options;
        this.type = 'simple-line';
        this.color = color;
        this.width = width;
    }

    /**
     * @description 将JSON格式的符号转换为JS对象
     * @param {Object} json 符号的实例化JSON
     */
    fromJSON(json) {
        json = json || {};
        const { opacity = 1.0 } = json;
        const { type = 'simple-line', color = 'rgb(0,0,0)', width = 0.75 } = json;

        // 父类属性Symbol.fromJSON
        this.opacity = opacity;

        // 自身属性
        this.type = type;
        this.color = color;
        this.width = width;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            color: this.color,
            width: this.width
        };
    }
}

export { LineSymbol };
mapgis.symbols.LineSymbol = LineSymbol;
