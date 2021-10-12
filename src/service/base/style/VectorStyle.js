import { extend } from '../../common/Util';
import { mapgis } from '../common/base';

/**
 * 矢量样式基类
 * @class mapgis.style.VectorStyle
 * @classdesc 矢量样式基类
 * @param {Number} [opacity = 1] 透明度，0~1之间的值，默认为1，不透明
 * @param {String} [color = #FFFFFF] 颜色，十六进制或RGB，默认为#FFFFFF，白色
 */
export default class VectorStyle {
    constructor(option) {
        var options = option ? option : {};
        const { opacity = 1, color = '#FFFFFF' } = options;
        this.type = undefined;
        this.opacity = opacity;
        this.color = color;
        extend(this, options);
    }
}

export { VectorStyle };
mapgis.style.VectorStyle = VectorStyle;
