import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import Symbol3DLayer from './Symbol3DLayer';
import { HorizontalAlignment, VerticalAlignment } from './Enum';

/**
 * 三维文本图层
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.TextSymbol3DLayer
 * @classdesc 三维文本图层
 * @param {String} [type] 类型,只能是'text'
 * @param {Object} [background] 背景
 * @param {String} [background.color] 背景-颜色
 * @param {Font} [font] 字体
 * @param {Object} [halo] 光晕
 * @param {Object} [halo.color = 'rgb(0,0,0)'] 光晕颜色,默认'rgb(0,0,0)'
 * @param {Object} [halo.size = 0] 光晕大小,默认0
 * @param {HorizontalAlignment} [horizontalAlignment='center'] 水平方向，可选"left"|"right"|"center"
 * @param {Number} [lineHeight=1.0] 行高
 * @param {Object} [material] 材质
 * @param {Object} [material.color='rgb(255,255,255)'] 材质-颜色,默认白色
 * @param {Number} [size = 9] 大小
 * @param {String} [text] 显示内容
 * @param {VerticalAlignment} [verticalAlignment='baseline'] 垂直对齐,可选"baseline"|"top"|"middle"|"bottom"
 */
export default class TextSymbol3DLayer extends Symbol3DLayer {
    constructor(option) {
        super(option);
        var option = option ? option : {};
        const { background = undefined, font, halo = { color: 'rgb(0,0,0)', size: 0 } } = option;
        const { horizontalAlignment = HorizontalAlignment.center, verticalAlignment = VerticalAlignment.baseline } = option;
        const { lineHeight = 1.0, material = { color: 'rgb(255,255,255)' }, size = 9 } = option;
        const { text } = option;

        this.type = 'text';

        this.background = background;
        this.font = font;
        this.halo = halo;
        this.horizontalAlignment = horizontalAlignment;
        this.lineHeight = lineHeight;
        this.material = material;
        this.size = size;
        this.text = text;
        this.verticalAlignment = verticalAlignment;
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
        const { type = 'text' } = json;
        const { background = undefined, font, halo = { color: 'rgb(0,0,0)', size: 0 } } = json;
        const { horizontalAlignment = HorizontalAlignment.center, verticalAlignment = VerticalAlignment.baseline } = json;
        const { lineHeight = 1.0, material = { color: 'rgb(255,255,255)' }, size = 9 } = json;
        const { text } = option;

        this.type = undefined;

        this.background = background;
        this.font = font;
        this.halo = halo;
        this.horizontalAlignment = horizontalAlignment;
        this.lineHeight = lineHeight;
        this.material = material;
        this.size = size;
        this.text = text;
        this.verticalAlignment = verticalAlignment;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            background: this.background,
            font: this.font,
            halo: this.halo,
            horizontalAlignment: this.horizontalAlignment,
            lineHeight: this.lineHeight,
            material: this.material,
            size: this.size,
            text: this.text,
            verticalAlignment: this.verticalAlignment
        };
    }
}

export { TextSymbol3DLayer };
mapgis.symbols.TextSymbol3DLayer = TextSymbol3DLayer;
