import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import Symbol3D from './Symbol3D';

/**
 * 三维线符号
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.Symbol3D
 * @classdesc 三维线符号
 * @param {String} [type] 类型，只能是'line-3d'
 * @param {Object} [styleOrigin] 样式起源，{ name: '', [styleName|styleUrl] :'' }
 * @param {Object} [styleOrigin.name] 样式起源-名称，表示引用样式的名称
 * @param {Object} [styleOrigin.styleName] 样式起源-样式名称，表示默认的内置的MapGIS的样式
 * @param {Object} [styleOrigin.styleUrl] 样式起源-样式地址，表示样式Url路径
 * @param {Array<LineSymbol3DLayer|PathSymbol3DLayer>} [symbolLayers] 图层集合，用来可视化要素和制图综合
 */
export default class LineSymbol3D extends Symbol3D {
    constructor(option) {
        super(option);
        var options = option ? option : {};
        const { styleOrigin = { name: 'mapgis-style', styleName: 'styleName' } } = options;
        const { symbolLayers } = options;

        this.type = 'line-3d';

        this.styleOrigin = styleOrigin;
        this.symbolLayers = symbolLayers;
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
        const { type = 'line-3d' } = json;
        const { styleOrigin = { name: 'mapgis-style', styleName: 'styleName' } } = json;
        const { symbolLayers } = json;

        this.type = type;

        this.styleOrigin = styleOrigin;
        this.symbolLayers = symbolLayers;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            styleOrigin: this.styleOrigin,
            symbolLayers: this.symbolLayers,
        };
    }
}

export { LineSymbol3D };
mapgis.symbols.LineSymbol3D = LineSymbol3D;
