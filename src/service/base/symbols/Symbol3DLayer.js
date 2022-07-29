import { mapgis } from '../common/base';

/**
 * 三维符号图层
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.Symbol3DLayer
 * @classdesc 三维符号图层
 * @param {String} [type] 简单填充符号类型，可选 "icon"|"object"|"line"|"path"|"fill"|"water"|"extrude"|"text"
 */
export default class Symbol3DLayer {
    constructor(option) {
        var option = option ? option : {};
        this.type = undefined;
    }

    /**
     * @description 将JSON格式的符号转换为JS对象
     * @param {Object} json 符号的实例化JSON
     */
    fromJSON(json) {
        json = json || {};
        const { type = 'unkown' } = json;
        this.type = type;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type
        };
    }
}

export { Symbol3DLayer };
mapgis.symbols.Symbol3DLayer = Symbol3DLayer;
