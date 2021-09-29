import { extend } from '../Util';
import { mapgis } from '../Base';
import { VectorStyle } from './VectorStyle';
import { TextPlacement, Align } from './Enum';

/**
 * 点样式
 * @class mapgis.style.TextStyle
 * @classdesc 文字样式
 * @param {String} [fontFamily = 宋体] 字体
 * @param {String} [fontColor = #000000] 字体颜色，16进制颜色或rgb值或rgba值，默认#000000，黑色
 * @param {Number} [fontSize = 12] 字体大小，默认12
 * @param {String} [spacing = 0] 文字间距，默认0
 * @param {Number} [rotate = 0] 文字间距，默认0
 * @param {Number} [xOffset = 0] X轴偏移，默认0
 * @param {Number} [yOffset = 0] Y轴偏移，默认0
 * @param {Number} [lineHeight = 1.2] 行高，默认1.2
 * @param {Number} [maxWidth = 10] 一行最大宽度，默认10
 * @param {Number} [align = center] 对齐方式
 * @param {Number} [haloBlur = 0] 描边模糊度，默认0
 * @param {String} [haloColor = #000000] 描边颜色
 * @param {Number} [haloWidth = 0] 描边宽度
 * @param {String} [placement = point] 文字放置位置，默认point，按点的方式放置
 */
export default class TextStyle extends VectorStyle {
    constructor(option) {
        super();
        var options = option ? option : {};
        this.fontFamily = '宋体';
        this.fontColor = '#000000';
        this.fontSize = 12;
        this.spacing = 0;
        this.rotate = 0;
        this.xOffset = 0;
        this.yOffset = 0;
        this.lineHeight = 1.2;
        this.maxWidth = 10;
        this.align = Align.center;
        this.haloBlur = 0;
        this.haloColor = '#000000';
        this.haloWidth = 0;
        this.placement = TextPlacement.point;
        extend(this, options);
    }
}

export { TextStyle };
mapgis.style.TextStyle = TextStyle;
