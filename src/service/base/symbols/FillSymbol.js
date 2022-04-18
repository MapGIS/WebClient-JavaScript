import { mapgis } from '../common/base';

import { Symbol } from './Symbol';
import SimpleLineSymbol from './SimpleLineSymbol';

/**
 * 标记符号
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.PointStyle
 * @classdesc 线符号
 * @param {String} [type = 'simple-fill'] marker类型:可选值"simple-fill"|"picture-fill"
 * @param {SimpleLineSymbol} [outline] 简单标记轮廓线符号
 */
export default class FillSymbol extends Symbol {
    constructor(option) {
        super(option);
        var options = option ? option : {};
        const { color = 'rgb(0,0,0)', outline = undefined } = options;
        this.type = 'simple-fill';
        this.outline = outline ? new SimpleLineSymbol(outline) : undefined;
    }

    /**
     * @description 将JSON格式的符号转换为JS对象
     * @param {Object} json 符号的实例化JSON
     */
    fromJSON(json) {
        json = json || {};
        const { opacity = 1.0 } = json;
        const { type = 'simple-fill' } = json;
        const { outline = undefined } = json;

        // 父类属性Symbol.fromJSON
        this.opacity = opacity;

        // 自身属性
        this.type = type;
        this.outline = outline;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            outline: this.outline
        };
    }
}

export { FillSymbol };
mapgis.symbols.FillSymbol = FillSymbol;
