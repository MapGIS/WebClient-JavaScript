import { extend } from '../../common/Util';
import { mapgis } from '../../common/Base';

/**
 * 阴影样式
 * @class mapgis.style.Shadow
 * @classdesc 阴影样式
 * @param {Number} [shadowBlur = 0] 阴影模糊度，默认为0，大于0有效
 * @param {String} [shadowColor = #000000] 阴影颜色，16进制颜色或rgb值或rgba值，默认黑色
 * @param {Number} [shadowOffsetX = 0] 阴影X轴偏移，默认0
 * @param {Number} [shadowOffsetY = 0] 阴影Y轴偏移，默认0
 */
 export default class Shadow {
    constructor(option) {
        var options = option ? option : {};
        this.shadowBlur = 0;
        this.shadowColor = '#000000';
        this.shadowOffsetX = 0;
        this.shadowOffsetY = 0;
        extend(this, options);
    }
}

export { Shadow };
mapgis.style.Shadow = Shadow;
