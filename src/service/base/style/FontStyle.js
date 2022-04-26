import { extend } from '../../common/Util';
import { mapgis } from '../common/base';

/**
 * 符号样式
 * @class mapgis.style.FontStyle
 * @classdesc 符号样式
 * @param {String} [family = 黑体] 字体类型
 * @param {Number} [size = 16] 字体大小
 * @param {String} [style = normal] 字体样式: "normal" 常规 | "italic" 斜体 | "oblique"
 * @param {String} [weight = normal] Y轴偏移
 */
export default class FontStyle {
    constructor(option) {
        var options = option ? option : {};
        const { family = '黑体', size = 12, style = 'normal', weight = 'normal' } = options;
        // this.decoration; 暂不支持
        this.family = family;
        this.size = size;
        this.style = style;
        this.weight = weight;
        extend(this, options);
    }
}

export { FontStyle };
mapgis.style.FontStyle = FontStyle;
