import { mapgis } from '../common/base';

import { HorizontalAlignment, VerticalAlignment } from './Enum';
import Symbol from './Symbol';
import Font from './Font';

/**
 * 文本符号
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.PointStyle
 * @classdesc 文本符号
 * @param {String} [type = 'text'] marker类型:只能是"text"
 * @param {Number} [angle = 0] 角度
 * @param {String} [backgroundColor] 背景颜色
 * @param {String} [borderLineColor] 边界颜色
 * @param {Number} [borderLineSize] 边界宽度
 * @param {String} [color='rgb(0,0,0)'] 颜色
 * @param {Font} [font] 字体
 * @param {String} [haloColor] 光晕颜色
 * @param {Number} [haloSize] 光晕大小
 * @param {HorizontalAlignment} [horizontalAlignment='center'] 水平方向，可选"left"|"right"|"center"
 * @param {Boolean} [kerning=true] 空格间距
 * @param {Number} [lineHeight=1.0] 行高
 * @param {Number} [lineWidth=192] 行宽
 * @param {Boolean} [rotated=false] 是否旋转
 * @param {String} [text] 显示内容
 * @param {VerticalAlignment} [verticalAlignment='baseline'] 垂直对齐,可选"baseline"|"top"|"middle"|"bottom"
 * @param {Number} [xoffset=0] x偏移
 * @param {Number} [yoffset=0] y偏移
 */
export default class TextSymbol extends Symbol {
    constructor(option) {
        super(option);
        var options = option ? option : {};
        const { angle = 0, backgroundColor, borderLineColor, borderLineSize } = options;
        const { color = 'rgb(0,0,0)', font, haloColor, haloSize } = options;
        const { horizontalAlignment = HorizontalAlignment.center, verticalAlignment = VerticalAlignment.baseline } = options;
        const { kerning = true, lineHeight = 1.0, lineWidth = 192, rotated = false } = options;
        const { text, xoffset = 0, yoffset = 0 } = options;

        this.type = 'text';
        this.angle = angle;
        this.backgroundColor = backgroundColor;
        this.borderLineColor = borderLineColor;
        this.borderLineSize = borderLineSize;
        this.color = color;
        this.font = font ? new Font(font) : undefined;
        this.haloColor = haloColor;
        this.haloSize = haloSize;
        this.horizontalAlignment = horizontalAlignment;
        this.kerning = kerning;
        this.lineHeight = lineHeight;
        this.lineWidth = lineWidth;
        this.rotated = rotated;
        this.text = text;
        this.verticalAlignment = verticalAlignment;
        this.xoffset = xoffset;
        this.yoffset = yoffset;
    }

    /**
     * @description 将JSON格式的符号转换为JS对象
     * @param {Object} json 符号的实例化JSON
     */
    fromJSON(json) {
        json = json || {};
        const { opacity = 1.0 } = json;
        const { type = 'text' } = json;
        const { angle = 0, backgroundColor, borderLineColor, borderLineSize } = json;
        const { color = 'rgb(0,0,0)', font, haloColor, haloSize } = json;
        const { horizontalAlignment = HorizontalAlignment.center, verticalAlignment = VerticalAlignment.baseline } = json;
        const { kerning = true, lineHeight = 1.0, lineWidth = 192, rotated = false } = json;
        const { text, xoffset = 0, yoffset = 0 } = json;

        // 父类属性Symbol.fromJSON
        this.opacity = opacity;

        // 自身属性
        this.type = type;
        this.angle = angle;
        this.backgroundColor = backgroundColor;
        this.borderLineColor = borderLineColor;
        this.borderLineSize = borderLineSize;
        this.color = color;
        this.font = font;
        this.haloColor = haloColor;
        this.haloSize = haloSize;
        this.horizontalAlignment = horizontalAlignment;
        this.kerning = kerning;
        this.lineHeight = lineHeight;
        this.lineWidth = lineWidth;
        this.rotated = rotated;
        this.text = text;
        this.verticalAlignment = verticalAlignment;
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
            type: this.type,
            angle: this.angle,
            backgroundColor: this.backgroundColor,
            borderLineColor: this.borderLineColor,
            borderLineSize: this.borderLineSize,
            color: this.color,
            font: this.font,
            haloColor: this.haloColor,
            haloSize: this.haloSize,
            horizontalAlignment: this.horizontalAlignment,
            kerning: this.kerning,
            lineHeight: this.lineHeight,
            lineWidth: this.lineWidth,
            rotated: this.rotated,
            text: this.text,
            verticalAlignment: this.verticalAlignment,
            xoffset: this.xoffset,
            yoffset: this.yoffset
        };
    }
}

export { TextSymbol };
mapgis.symbols.TextSymbol = TextSymbol;
