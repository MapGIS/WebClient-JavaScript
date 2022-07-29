import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import Symbol3DLayer from './Symbol3DLayer';
import { Anchor } from './Enum';

/**
 * 三维图标图层
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.IconSymbol3DLayer
 * @classdesc 三维图标图层
 * @param {String} [type] 类型,只能是'icon'
 * @param {Anchor} [anchor='center'] 锚点位置, 可选"center"|"left"|"right"|"top"|"bottom"|"top-left"|"top-right"|"bottom-left"|"bottom-right"|"relative"
 * @param {Object} [anchorPosition ={x:0, y:0}] 锚点偏移
 * @param {Object} [material] 材质
 * @param {String} [material.color] 材质颜色
 * @param {Object} [outline] 轮廓 {color: 'rgba(255, 255,255,1)', size: 4}
 * @param {String} [outline.color] 轮廓颜色
 * @param {Number} [outline.size] 轮廓大小
 * @param {Object} [resource = { primitive: "circle" }] 资源，默认{ primitive: "circle" }
 * @param {Object} [resource.primitive="circle"] 资源-图元,使用内置的形状'circle', 'square', 'cross','x', 'kite','triangle'
 * @param {Object} [resource.href] 资源-引用，引用SVG的路径URL/URI，SVG的root node必须设置width和height
 * @param {Number} [size=12] 大小
 */
export default class IconSymbol3DLayer extends Symbol3DLayer {
    constructor(option) {
        super(option);
        var option = option ? option : {};
        const { anchor = Anchor.center, anchorPosition = { x: 0, y: 0 } } = option;
        const { material = undefined, outline = undefined, resource = { primitive: 'circle' } } = option;
        const { size = 12 } = option;

        this.type = 'icon';

        this.anchor = Anchor.center;
        this.anchorPosition = anchorPosition;
        this.material = material;
        this.outline = outline;
        this.resource = resource;
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
        const { type = 'icon' } = json;
        const { anchor = Anchor.center, anchorPosition = { x: 0, y: 0 } } = json;
        const { material = undefined, outline = undefined, resource = { primitive: 'circle' } } = json;
        const { size = 12 } = json;

        this.type = undefined;

        this.anchor = Anchor.center;
        this.anchorPosition = anchorPosition;
        this.material = material;
        this.outline = outline;
        this.resource = resource;
        this.size = size;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            anchor: this.anchor,
            anchorPosition: this.anchorPosition,
            material: this.material,
            outline: this.outline,
            resource: this.resource,
            size: this.size
        };
    }
}

export { IconSymbol3DLayer };
mapgis.symbols.IconSymbol3DLayer = IconSymbol3DLayer;
