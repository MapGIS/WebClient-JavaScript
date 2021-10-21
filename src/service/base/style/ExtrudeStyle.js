import { extend } from '../../common/Util';
import { mapgis } from '../common/base';
import { VectorStyle } from './VectorStyle';
import { Symbol } from './Symbol';

/**
 * 拉伸体样式
 * @class mapgis.style.ExtrudeStyle
 * @classdesc 拉伸体样式
 * @param {Number} [outlineWidth = 0] 拉伸体外边线宽度，默认为1
 * @param {String} [outlineColor = #FFFFFF] 拉伸体外边线颜色，16进制颜色或rgb值或rgba值，默认#FFFFFF，白色
 * @param {Object} [shadowStyle = undefined] 阴影样式，默认undefined
 * @param {Object} [symbolStyle = undefined] 填充图案样式，默认undefined
 * @param {Object} [outlineSymbolStyle = undefined] 拉伸体外边线填充图案样式，默认undefined
 */
export default class ExtrudeStyle extends VectorStyle {
    constructor(option) {
        super();
        var options = option ? option : {};
        const { symbol } = options;
        this.type = 'extrude';
        this.outlineWidth = 1;
        this.outlineColor = '#FFFFFF';
        this.shadowStyle = undefined;
        this.symbolStyle = symbol || new Symbol();
        extend(this, options);
    }
}

export { ExtrudeStyle };
mapgis.style.ExtrudeStyle = ExtrudeStyle;
