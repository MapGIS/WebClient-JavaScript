import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import Symbol3DLayer from './Symbol3DLayer';
import { Cap } from './Enum';

/**
 * 三维填充图层
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.FillSymbol3DLayer
 * @classdesc 三维填充图层
 * @param {String} [type] 类型,只能是'fill'
 * @param {Boolean} [castShadows = true] 阴影,默认激活
 * @param {Edges3D} [edges] 轮廓线
 * @param {Object} [material] 材质
 * @param {String} [material.color] 材质颜色
 * @param {String} [material.colorMixMode = 'multiply'] 材质颜色混合模式，可选"tint"|"replace"|"multiply"
 * @param {Object} [outline] 轮廓外包线
 * @param {String} [outline.color] 轮廓外包线-颜色
 * @param {Number} [outline.size] 轮廓外包线-大小
 * @param {LineStylePattern3D} [outline.pattern] 轮廓外包线-模式
 * @param {Cap} [outline.patternCap] 轮廓外包线-线头模式,可选"butt" 平头 |"round" 圆头 |"square" 方头
 * @param {StylePattern3D} [pattern]
 */
export default class FillSymbol3DLayer extends Symbol3DLayer {
    constructor(option) {
        super(option);
        var option = option ? option : {};
        const { castShadows = undefined, edges = undefined } = option;
        const { material = undefined, outline = undefined, pattern = undefined } = option;

        this.type = 'fill';

        this.castShadows = castShadows;
        this.edges = edges;
        this.material = material;
        this.outline = outline;
        this.pattern = pattern;
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
        const { type = 'fill' } = json;
        const { castShadows = undefined, edges = undefined } = json;
        const { material = undefined, outline = undefined, pattern = undefined } = json;

        this.type = type;

        this.castShadows = castShadows;
        this.edges = edges;
        this.material = material;
        this.outline = outline;
        this.pattern = pattern;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            castShadows: this.castShadows,
            edges: this.edges,
            material: this.material,
            outline: this.outline,
            pattern: this.pattern
        };
    }
}

export { FillSymbol3DLayer };
mapgis.symbols.FillSymbol3DLayer = FillSymbol3DLayer;
