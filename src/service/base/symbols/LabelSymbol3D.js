import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import Symbol3D from './Symbol3D';

/**
 * 三维文本符号
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.LabelSymbol3D
 * @classdesc 三维文本符号
 * @param {String} [type] 类型，只能是'label-3d'
 * @param {String} [callout] 插图线，连接点与地形高度之间的示意线
 * @param {Object} [styleOrigin] 样式起源，{ name: '', [styleName|styleUrl] :'' }
 * @param {Object} [styleOrigin.name] 样式起源-名称，表示引用样式的名称
 * @param {Object} [styleOrigin.styleName] 样式起源-样式名称，表示默认的内置的MapGIS的样式
 * @param {Object} [styleOrigin.styleUrl] 样式起源-样式地址，表示样式Url路径
 * @param {Array<TextSymbol3DLayer>} [symbolLayers] 图层集合，用来可视化要素和制图综合
 * @param {Object} [verticalOffset] 垂直偏移策略
 * @param {Object} [verticalOffset.screenLength ] 垂直偏移策略-屏幕高度
 * @param {Object} [verticalOffset.minWorldLength ] 垂直偏移策略-最小世界高度
 * @param {Object} [verticalOffset.maxWorldLength ] 垂直偏移策略-最大世界高度
 */
export default class LabelSymbol3D extends Symbol3D {
    constructor(option) {
        super(option);
        var options = option ? option : {};

        const { callout = undefined } = options;
        const { styleOrigin = { name: 'mapgis-style', styleName: 'styleName' } } = options;
        const { symbolLayers, verticalOffset } = options;

        this.type = 'label-3d';

        this.callout = callout;
        this.styleOrigin = styleOrigin;
        this.symbolLayers = symbolLayers;
        this.verticalOffset = verticalOffset;
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
        const { type = 'label-3d' } = json;
        const { callout = undefined } = options;
        const { styleOrigin = { name: 'mapgis-style', styleName: 'styleName' } } = options;
        const { symbolLayers, verticalOffset } = options;

        this.type = type;

        this.callout = callout;
        this.styleOrigin = styleOrigin;
        this.symbolLayers = symbolLayers;
        this.verticalOffset = verticalOffset;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            callout: this.callout,
            styleOrigin: this.styleOrigin,
            symbolLayers: this.symbolLayers,
            verticalOffset: this.verticalOffset
        };
    }
}

export { LabelSymbol3D };
mapgis.symbols.LabelSymbol3D = LabelSymbol3D;
