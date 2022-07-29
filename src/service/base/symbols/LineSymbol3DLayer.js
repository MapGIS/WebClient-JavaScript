import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import Symbol3DLayer from './Symbol3DLayer';
import { Cap, Join } from './Enum';

/**
 * 三维线图层
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.LineSymbol3DLayer
 * @classdesc 三维线图层
 * @param {String} [type] 类型,只能是'line'
 * @param {Cap} [cap = 'butt'] 线头类型，默认为平头butt, 可选"butt" 平头 |"round" 圆头 |"square" 方头
 * @param {Join} [join = 'miter'] 拐角类型,可选"miter" 尖角 |"round" 圆角 |"bevel" 平角
 * @param {LineStyleMarker3D} [marker] 标注类型
 * @param {Object} [material] 材质
 * @param {String} [material.color] 材质颜色
 * @param {LineStylePattern3D} [pattern] 模式
 * @param {Number} [size=1] 宽度，默认1像素
 */
export default class LineSymbol3DLayer extends Symbol3DLayer {
    constructor(option) {
        super(option);
        var option = option ? option : {};
        const { cap = Cap.butt, join = Join.miter } = option;
        const { marker = undefined, material = undefined, pattern = undefined } = option;
        const { size = 1 } = option;

        this.type = 'line';

        this.cap = cap;
        this.join = join;
        this.marker = marker;
        this.material = material;
        this.pattern = pattern;
        this.size = size;
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
        const { type = 'line' } = json;
        const { cap = Cap.butt, join = Join.miter } = option;
        const { marker = undefined, material = undefined, pattern = undefined } = option;
        const { size = 1 } = option;

        this.type = type;

        this.cap = cap;
        this.join = join;
        this.marker = marker;
        this.material = material;
        this.pattern = pattern;
        this.size = size;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            cap: this.cap,
            join: this.join,
            marker: this.marker,
            material: this.material,
            pattern: this.pattern,
            size: this.size
        };
    }
}

export { LineSymbol3DLayer };
mapgis.symbols.LineSymbol3DLayer = LineSymbol3DLayer;
