import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import Symbol3DLayer from './Symbol3DLayer';
import { Anchor } from './Enum';

/**
 * 三维对象图层
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.ObjectSymbol3DLayer
 * @classdesc 三维对象图层
 * @param {String} [type] 类型,只能是'object'
 * @param {Anchor} [anchor='origin'] 锚点,可选值"center"|"top"|"bottom"|"origin"|"relative"。
 * 1. 当图元为球，立方，菱形时,origin在中心位置;
 * 2. 当图元为圆柱、锥、四面体时，origin在底部；
 * 3. 当图元为href时，origin为模型的原点；
 * 4. 如果anchor设置为relative，通过anchorPosition辅助外包盒
 * @param {Object} [anchorPosition] 锚点偏移位置 {x:0,y:0,z:0}
 * @param {Object} [castShadows=true] 阴影，默认激活
 * @param {Number} [depth=10] 深度或者南北直径，传undefined会基于模型重新计算
 * @param {Number} [heading] 偏航角,Z轴旋转角度
 * @param {Number} [height=10] 高度，传undefined会基于模型重新计算
 * @param {Object} [material] 材质
 * @param {String} [material.color='rgb(255,255,255)'] 材质-颜色,默认白色
 * @param {Object} [resource = { primitive: "sphere" }] 资源，默认{ primitive: "sphere" }
 * @param {Object} [resource.primitive="sphere"] 资源-图元,使用内置的形状'sphere', 'cylinder', 'cube','cone', 'inverted-cone','diamond', 'tetrahedron'
 * @param {String} [resource.href] 资源-引用，引用GLTF的路径URL/URI
 * @param {Number} [roll] 滚转角,Y轴旋转角度
 * @param {Number} [tilt] 倾斜角,X轴旋转角度,对应pitch
 * @param {Number} [width=10] 宽度或者东西直径，传undefined会基于模型重新计算
 */
export default class ObjectSymbol3DLayer extends Symbol3DLayer {
    constructor(option) {
        super(option);
        var option = option ? option : {};

        const { anchor = Anchor.origin, anchorPosition = { x: 0, y: 0, z: 0 } } = option;
        const { castShadows = true } = option;
        const { material = { color: 'rgb(255,255,255)' } } = option;
        const { resource = { primitive: 'sphere' } } = option;
        const { heading, roll, tilt } = option;
        const { depth = 10, height = 10, width = 10 } = option;

        this.type = 'object';

        this.anchor = anchor;
        this.anchorPosition = anchorPosition;
        this.castShadows = castShadows;
        this.height = height;
        this.width = width;
        this.depth = depth;
        this.material = material;
        this.resource = resource;
        this.heading = heading;
        this.roll = roll;
        this.tilt = tilt;
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
        const { type = 'object' } = json;
        const { anchor = Anchor.origin, anchorPosition = { x: 0, y: 0, z: 0 } } = json;
        const { castShadows = true } = json;
        const { material = { color: 'rgb(255,255,255)' } } = json;
        const { resource = { primitive: 'sphere' } } = json;
        const { heading, roll, tilt } = json;
        const { depth = 10, height = 10, width = 10 } = json;

        this.type = type;

        this.anchor = anchor;
        this.anchorPosition = anchorPosition;
        this.castShadows = castShadows;
        this.height = height;
        this.width = width;
        this.depth = depth;
        this.material = material;
        this.resource = resource;
        this.heading = heading;
        this.roll = roll;
        this.tilt = tilt;
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
            castShadows: this.castShadows,
            height: this.height,
            width: this.width,
            depth: this.depth,
            material: this.material,
            resource: this.resource,
            heading: this.heading,
            roll: this.roll,
            tilt: this.tilt
        };
    }
}

export { ObjectSymbol3DLayer };
mapgis.symbols.ObjectSymbol3DLayer = ObjectSymbol3DLayer;
