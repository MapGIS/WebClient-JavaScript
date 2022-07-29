import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import MarkerSymbol from './MarkerSymbol';
import SimpleLineSymbol from './SimpleLineSymbol';
import { MarkStyle } from './Enum';

/**
 * 简单标记符号
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.PointStyle
 * @classdesc 简单标记符号
 * @param {String} [type = 'simple-marker'] marker类型，只能是simple-marker
 * @param {Number} [angle = 0] 标记角度，默认为0
 * @param {String} [color = 0] 简单标记颜色，默认为'rgba(255, 255, 255, 0.25)'
 * @param {SimpleLineSymbol} [outline] 简单标记轮廓线符号
 * @param {Number} [path] 简单标记SVG路径
 * @param {Number} [size = 12] 简单标记大小，默认为12像素
 * @param {MarkStyle} [style = 'circle'] 简单标记样式类型，可选"circle"|"square"|"cross"|"x"|"diamond"|"triangle"|"path"
 * @param {Number} [xoffset = 0] 简单标记x偏移，默认为0像素
 * @param {Number} [yoffset = 0] 简单标记y偏移，默认为0像素
 */
export default class SimpleMarkerSymbol extends MarkerSymbol {
    constructor(option) {
        super(option);
        var options = option ? option : {};
        const { angle = 0.0, color = 'rgba(255, 255, 255, 0.25)', outline = undefined } = options;
        const { path = undefined, size = 12, style = MarkStyle.circle } = options;
        const { xoffset = 0, yoffset = 0 } = options;
        this.type = 'simple-marker';

        this.angle = angle;
        this.color = color;
        this.outline = outline ? new SimpleLineSymbol(outline) : undefined;
        this.path = path;
        this.size = size;
        this.style = style;
        this.xoffset = xoffset;
        this.yoffset = yoffset;
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
        const { type = 'simple-marker' } = json;
        const { opacity = 1.0 } = json;
        const { angle = 0.0, color = 'rgba(255, 255, 255, 0.25)', outline = 0 } = json;
        const { path = undefined, size = 12, style = MarkStyle.circle } = json;
        const { xoffset = 0, yoffset = 0 } = json;

        // 基类属性Symbol.fromJSON
        this.opacity = opacity;

        // 父类属性MarkerSymbol.fromJSON
        this.angle = angle;
        this.xoffset = xoffset;
        this.yoffset = yoffset;

        // 自身属性
        this.type = type;
        this.color = color;
        this.outline = outline;
        this.path = path;
        this.size = size;
        this.style = style;
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

export { SimpleMarkerSymbol };
mapgis.symbols.SimpleMarkerSymbol = SimpleMarkerSymbol;
