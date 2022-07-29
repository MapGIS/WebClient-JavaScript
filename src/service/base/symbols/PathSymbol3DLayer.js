import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import Symbol3DLayer from './Symbol3DLayer';
import { Anchor, Cap, Join } from './Enum';

/**
 * 三维线图层
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.PathSymbol3DLayer
 * @classdesc 三维线图层
 * @param {String} [type] 类型,只能是'path'
 * @param {Anchor} [anchor='center'] 锚点,可选值"center"|"bottom"|"top"
 * @param {Cap} [cap = 'butt'] 线头类型，默认为平头butt, 可选"butt" 平头 |"round" 圆头 |"square" 方头|"none" 无
 * @param {Object} [castShadows=true] 阴影，默认激活
 * @param {Number} [height] 高度
 * @param {Join} [join = 'miter'] 拐角类型,可选"miter" 尖角 |"round" 圆角 |"bevel" 平角
 * @param {Object} [material] 材质
 * @param {String} [material.color='rgb(255,255,255)'] 材质-颜色,默认白色
 * @param {String} [profile="circle"] 横截面，可选"circle"|"quad"
 * @param {String} [profileRotation="all"] 横截面旋转角度，可选"heading"|"all"
 * @param {Number} [width=10] 宽度或者东西直径，传undefined会基于模型重新计算
 */
export default class PathSymbol3DLayer extends Symbol3DLayer {
    constructor(option) {
        super(option);
        var option = option ? option : {};
        const { anchor = Anchor.center, castShadows = true } = option;
        const { cap = Cap.butt, join = Join.miter } = option;
        const { height, width } = option;
        const { material, profile, profileRotation } = option;

        this.type = 'path';
        this.anchor = anchor;
        this.cap = cap;
        this.castShadows = castShadows;
        this.height = height;
        this.join = join;
        this.material = material;
        this.profile = profile;
        this.profileRotation = profileRotation;
        this.width = width;
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
        const { type = 'path' } = json;
        const { anchor = Anchor.center, castShadows = true } = json;
        const { cap = Cap.butt, join = Join.miter } = json;
        const { height, width } = json;
        const { material, profile, profileRotation } = json;

        this.type = type;

        this.anchor = anchor;
        this.cap = cap;
        this.castShadows = castShadows;
        this.height = height;
        this.join = join;
        this.material = material;
        this.profile = profile;
        this.profileRotation = profileRotation;
        this.width = width;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            anchor: this.anchor,
            cap: this.cap,
            castShadows: this.castShadows,
            height: this.height,
            join: this.join,
            material: this.material,
            profile: this.profile,
            profileRotation: this.profileRotation,
            width: this.width
        };
    }
}

export { PathSymbol3DLayer };
mapgis.symbols.PathSymbol3DLayer = PathSymbol3DLayer;
