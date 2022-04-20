import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import { LineSymbol } from './LineSymbol';
import { Cap, Join, LineStyle } from './Enum';

/**
 * 简单标记符号
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.PointStyle
 * @classdesc 简单线符号
 * @param {String} [type = 'simple-line'] 类型，只能是simple-line
 * @param {Cap} [cap = 'round'] 线头类型，默认为圆头round, 可选"butt" 平头 |"round" 圆头 |"square" 方头
 * @param {String} [color = 'rgb(0, 0, 0)'] 符号颜色，默认为'rgb(0, 0, 0)'
 * @param {Join} [join = 'bevel'] 拐角类型,可选"miter" 尖角 |"round" 圆角 |"bevel" 平角
 * @param {LineSymbolMarker} [marker] 标注类型
 * @param {Number} [miterLimit = 2] 最大挂角宽度，默认为2
 * @param {LineStyle} [style = 'solid'] 样式类型，可选"dash"|"dash-dot"|"dot"|"long-dash"|"long-dash-dot"|"long-dash-dot-dot"|"none"|"short-dash"|"short-dash-dot"|"short-dash-dot-dot"|"short-dot"|"solid"
 * @param {Number} [width = 0.75] 宽度，默认为0.75
 */
export default class SimpleLineSymbol extends LineSymbol {
    constructor(option) {
        super(option);
        var options = option ? option : {};
        const { cap = Cap.round, color = 'rgb(0, 0, 0)', join = Join.bevel } = options;
        const { marker = undefined, miterLimit = 2, style = LineStyle.solid } = options;
        const { width = 0.75 } = options;

        this.type = 'simple-line';

        this.cap = cap;
        this.color = color;
        this.join = join;
        this.marker = marker;
        this.miterLimit = miterLimit;
        this.style = style;
        this.width = width;
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
        const { type = 'simple-line' } = json;
        const { cap = Cap.round, color = 'rgb(0, 0, 0)', join = Join.bevel } = json;
        const { marker = undefined, miterLimit = 2, style = LineStyle.solid } = json;
        const { width = 0.75 } = json;

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

export { SimpleLineSymbol };
mapgis.symbols.SimpleLineSymbol = SimpleLineSymbol;
