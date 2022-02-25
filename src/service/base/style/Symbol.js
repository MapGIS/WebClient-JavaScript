import { extend } from '../../common/Util';
import { mapgis } from '../common/base';
import { Anchor } from './Enum';

/**
 * 符号样式
 * @class mapgis.style.SymbolStyle
 * @classdesc 符号样式
 * @param {String} [pattern = ""] 符号名称或url
 * @param {Number} [opacity = 1] 透明度，0~1之间的值，默认为1，不透明
 * @param {String} [color = #FFFFFF] 颜色，十六进制或RGB，默认为#FFFFFF，白色
 * @param {Number} [size = 1] 符号大小
 * @param {Number} [rotate = 0] 旋转角度，0~360度
 * @param {Number} [offsetX = 0] X轴偏移
 * @param {Number} [offsetY = 0] Y轴偏移
 * @param {String} [anchor = center] 锚点
 */
export default class Symbol {
    constructor(option) {
        var options = option ? option : {};
        const { pattern = undefined, opacity = 1.0, allowOverlap = false } = options;
        const { color = '#FFFFFF', size = 1, rotate = 0 } = options;
        const { xoffset = 0, yoffset = 0 } = options;

        this.allowOverlap = allowOverlap;
        this.pattern = pattern;
        this.opacity = opacity;
        this.color = color;
        this.size = size;
        this.rotate = rotate;
        this.xoffset = xoffset;
        this.yoffset = yoffset;
        this.anchor = Anchor.center;

        extend(this, options);
    }
}

export { Symbol };
mapgis.style.SymbolStyle = Symbol;
