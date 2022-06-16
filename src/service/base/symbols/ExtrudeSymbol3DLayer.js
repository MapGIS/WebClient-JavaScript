import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import Symbol3DLayer from './Symbol3DLayer';

/**
 * 三维线图层
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.ExtrudeSymbol3DLayer
 * @classdesc 三维区图层
 * @param {String} [type] 类型,只能是'extrude'
 * @param {Object} [castShadows=true] 阴影，默认激活
 * @param {Edges3D} [edges] 轮廓线
 * @param {Object} [material] 材质
 * @param {String} [material.color='rgb(255,255,255)'] 材质-颜色,默认白色
 * @param {Number} [size=1] 大小，当设置sizeField后size不起作用，通过sizeField和sizeRatio计算，若未设置sizeField则直接使用size值
 * @param {Number} [sizeField] 拉伸字段
 * @param {Number} [sizeRatio=1] 拉伸比例
 */
export default class ExtrudeSymbol3DLayer extends Symbol3DLayer {
    constructor(option) {
        super(option);
        var option = option ? option : {};
        const { castShadows = true, edges = undefined, sizeField = undefined } = option;
        const { material = { color: 'rgb(255,255,255)' } } = option;
        const { size = 1, sizeRatio = 1 } = option;

        this.type = 'extrude';
        this.castShadows = castShadows;
        this.edges = edges;
        this.material = material;
        this.size = size;
        this.sizeField = sizeField;
        this.sizeRatio = sizeRatio;
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
        const { type = 'extrude' } = json;
        const { castShadows = true, edges = undefined, sizeField = undefined } = json;
        const { material = { color: 'rgb(255,255,255)' } } = json;
        const { size = 1, sizeRatio = 1 } = json;
        this.type = type;

        this.castShadows = castShadows;
        this.edges = edges;
        this.material = material;
        this.size = size;
        this.sizeField = sizeField;
        this.sizeRatio = sizeRatio;
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
            size: this.size,
            sizeField: this.sizeField,
            sizeRatio: this.sizeRatio
        };
    }
}

export { ExtrudeSymbol3DLayer };
mapgis.symbols.ExtrudeSymbol3DLayer = ExtrudeSymbol3DLayer;
