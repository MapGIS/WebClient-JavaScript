import { mapgis } from '../common/base';

/**
 * 字体
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.Font
 * @classdesc 字体
 * @param {String} [decoration = 'none'] 字体装饰，可选"underline"|"line-through"|"none"
 * @param {String} [family = '宋体'] 字号
 * @param {Number} [size = 9] 字体大小
 * @param {Number} [style = 'normal'] 字体样式, 可选"normal"|"italic"|"oblique"
 * @param {Number} [weight = 'normal'] 字体粗细, 可选"normal"|"bold"|"bolder"|"lighter"
 */
export default class Font {
    constructor(option) {
        var options = option ? option : {};
        const { decoration = 'none', family = '宋体' } = options;
        const { size = 9, style = 'normal', weight = 'normal' } = options;

        this.decoration = decoration;
        this.family = family;
        this.size = size;
        this.style = style;
        this.weight = weight;
    }

    /**
     * @description 克隆函数
     */
    clone() {
        return cloneDeep(this);
    }

    /**
     * @description 将JSON格式的符号转换为JS对象
     * @param {Object} json 符号的实例化JSON
     */
    fromJSON(json) {
        json = json || {};
        const { decoration = 'none', family = '宋体' } = json;
        const { size = 9, style = 'normal', weight = 'normal' } = json;

        this.decoration = decoration;
        this.family = family;
        this.size = size;
        this.style = style;
        this.weight = weight;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            decoration: this.decoration,
            family: this.family,
            size: this.size,
            style: this.style,
            weight: this.weight
        };
    }
}

export { Font };
mapgis.symbols.Font = Font;
