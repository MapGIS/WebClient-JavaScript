import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import { FillSymbol } from './FillSymbol';
import SimpleLineSymbol from './SimpleLineSymbol';
import { FillStyle } from './Enum';

/**
 * 简单标记符号
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.PointStyle
 * @classdesc 简单填充符号
 * @param {String} [type = 'simple-fill'] 简单填充符号类型，只能是simple-line
 * @param {String} [color = 'rgba(0, 0, 0, 0.25)'] 简单填充符号颜色，默认为'rgba(0, 0, 0, 0.25)'
 * @param {SimpleLineSymbol} [outline] 简单填充符号轮廓
 * @param {FillStyle} [style = 'solid'] 简单填充符号样式类型，可选"backward-diagonal"|"cross"|"diagonal-cross"|"forward-diagonal"|"horizontal"|"none"|"solid"|"vertical"
 */
export default class SimpleFillSymbol extends FillSymbol {
    constructor(option) {
        super(option);
        var options = option ? option : {};
        const { color = 'rgba(0, 0, 0, 0.25)', outline = undefined, style = FillStyle.solid } = options;

        this.type = 'simple-fill';

        this.color = color;
        this.outline = this.outline;
        this.style = style;
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
        const { opacity = 1 } = json;
        const { color = 'rgba(0, 0, 0, 0.25)', outline = undefined, style = FillStyle.solid } = options;

        // 基类属性Symbol.fromJSON
        this.opacity = opacity;

        // 父类属性MarkerSymbol.fromJSON
        this.outline = outline;

        // 自身属性
        this.type = type;
        this.color = color;
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
            outline: this.outline,
            style: this.style
        };
    }
}

export { SimpleFillSymbol };
mapgis.symbols.SimpleFillSymbol = SimpleFillSymbol;
