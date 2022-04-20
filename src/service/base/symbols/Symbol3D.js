import { mapgis } from '../common/base';

import Symbol from './Symbol';

/**
 * 三维符号基类
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.Symbol3D
 * @classdesc 三维符号基类
 * @param {String} [type] 简单填充符号类型，可选 point-3d"|"line-3d"|"polygon-3d"|"mesh-3d"|"label-3d"
 * @param {Object} [styleOrigin] 三维符号样式起源，{ name: '', [styleName|styleUrl] :'' }
 * @param {Object} [styleOrigin.name] 三维符号样式起源-名称，表示引用样式的名称
 * @param {Object} [styleOrigin.styleName] 三维符号样式起源-样式名称，表示默认的内置的MapGIS的样式
 * @param {Object} [styleOrigin.styleUrl] 三维符号样式起源-样式地址，表示样式Url路径
 * @param {Array<>} [symbolLayers] 三维符号图层集合，用来可视化要素和制图综合
 */
export default class Symbol3D extends Symbol {
    constructor(option) {
        super(option);
        var options = option ? option : {};
        const { styleOrigin = { name: 'mapgis-style', styleName: 'styleName' } } = options;
        const { symbolLayers } = options;
        this.type = undefined;
        this.styleOrigin = styleOrigin;
        this.symbolLayers = symbolLayers;
    }

    /**
     * @description 将JSON格式的符号转换为JS对象
     * @param {Object} json 符号的实例化JSON
     */
    fromJSON(json) {
        json = json || {};
        const { type = 'unkown', opacity = 1, color = '#FFFFFF' } = json;
        this.type = type;
        this.color = color;
        this.opacity = opacity;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            color: this.color,
            opacity: this.opacity
        };
    }
}

export { Symbol };
mapgis.symbols.Symbol = Symbol;
