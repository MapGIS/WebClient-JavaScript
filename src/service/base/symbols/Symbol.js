import { mapgis } from '../common/base';

/**
 * 符号基类
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.Symbol
 * @classdesc 矢量样式基类
 * @param {Number} [opacity = 1] 透明度，0~1之间的值，默认为1，不透明
 * @param {String} [color = #FFFFFF] 颜色，十六进制或RGB，默认为#FFFFFF，白色
 */
export default class Symbol {
    constructor(option) {
        var options = option ? option : {};
        const { opacity = 1, color = '#FFFFFF' } = options;
        this.type = undefined;
        this.opacity = opacity;
        this.color = color;
    }

    /**
     * @description 将JSON格式的符号转换为JS对象
     * @param {Object} json 符号的实例化JSON
     */
    fromJSON(json) {
        json = json || {};
        const { type = 'unkown', opacity = 1, color = '#FFFFFF' } = json;
        this.type = type;
        this.color = color;
        this.opacity = opacity;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            color: this.color,
            opacity: this.opacity
        };
    }
}

export { Symbol };
mapgis.symbols.Symbol = Symbol;
