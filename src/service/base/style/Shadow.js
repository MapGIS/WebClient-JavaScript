import { extend } from '../../common/Util';
import { mapgis } from '../common/base';

/**
 * 阴影样式
 * @class mapgis.style.Shadow
 * @classdesc 阴影样式
 * @param {Number} [blur = 0] 阴影模糊度，默认为0，大于0有效
 * @param {String} [color = #000000] 阴影颜色，16进制颜色或rgb值或rgba值，默认黑色
 * @param {Number} [offsetX = 0] 阴影X轴偏移，默认0
 * @param {Number} [offsetY = 0] 阴影Y轴偏移，默认0
 */
export default class Shadow {
    constructor(option) {
        var options = option ? option : {};
        const { blur = 0, color = '#000000', offsetX = 0, offsetY = 0 } = options;
        this.blur = blur;
        this.color = color;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        extend(this, options);
    }
}

export { Shadow };
mapgis.style.Shadow = Shadow;
