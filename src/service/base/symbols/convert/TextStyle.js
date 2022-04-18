import { extend } from '../../common/Util';
import { mapgis } from '../common/base';
import { FontStyle } from './FontStyle';
import { VectorStyle } from './VectorStyle';
import { TextPlacement, HorizontalAlignment, VerticalAlignment } from './Enum';

/**
 * 点样式
 * @class mapgis.style.TextStyle
 * @classdesc 文字样式
 * @param {String} [fontFamily = 宋体] 字体
 * @param {String} [fontColor = #000000] 字体颜色，16进制颜色或rgb值或rgba值，默认#000000，黑色
 * @param {Number} [fontSize = 12] 字体大小，默认12
 * @param {Number} [angle = 0] 文字角度，默认0
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
        const { angle = 0, allowOverlap = false } = options;
        const { backgroundColor, borderLineColor, borderLineSize } = options;
        const { color = '#000000', font } = options;
        const { haloColor = '#000000', haloSize = 0, horizontalAlignment = HorizontalAlignment.center } = options;
        const { kerning = true, lineHeight = 1.0, lineWidth = 192 } = options;
        const { rotated = false, text = '', type = 'text', verticalAlignment = VerticalAlignment.baseline } = options;
        const { xoffset = 0, yoffset = 0 } = options;

        this.allowOverlap = allowOverlap;
        this.angle = angle;
        this.backgroundColor = backgroundColor;
        this.borderLineColor = borderLineColor;
        this.borderLineSize = borderLineSize;
        this.color = color;
        this.font = font || new FontStyle();
        this.haloColor = haloColor;
        this.haloSize = haloSize;
        this.horizontalAlignment = horizontalAlignment;
        this.kerning = kerning;
        this.lineHeight = lineHeight;
        this.lineWidth = lineWidth;
        this.rotated = rotated;
        this.text = text;
        this.type = 'text';
        this.verticalAlignment = verticalAlignment;
        this.xoffset = xoffset;
        this.yoffset = yoffset;

        extend(this, options);
    }

    /**
     * @param  {Boolean} [highlight = false] 是否激活高亮样式
     * @link https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#symbol
     * @returns MapboxGL点格式的样式
     */
    toMapboxStyle(options) {
        options = options || {};
        const { highlight = false } = options;
        const { angle, allowOverlap, color, font } = this;
        const { family, size, style, weight } = font;
        const { backgroundColor, borderLineColor, borderLineSize } = this;
        const { haloColor, haloSize, horizontalAlignment } = this;
        const { kerning, lineHeight, lineWidth } = this;
        const { rotated, text, type, verticalAlignment } = this;
        const { xoffset, yoffset } = this;

        let mapstyle = {
            paint: {
                'text-color': color,
                'text-halo-color': haloColor,
                'text-halo-width': haloSize
            },
            layout: {
                'text-rotate': angle,
                'text-font': [family, family],
                'text-line-height': lineHeight,
                'text-max-width': lineWidth,
                'text-field': text,
                'text-offset': [xoffset, yoffset],
                'text-size': size,
                'text-allow-overlap': allowOverlap
            }
        };
        if (highlight) {
            let highsize = size * 1.5;
            mapstyle.paint['text-color'] = ['case', ['boolean', ['feature-state', 'hover'], false], color, 'rgba(0, 0, 0, 0)'];
            // mapstyle.layout['text-size'] = ['case', ['boolean', ['feature-state', 'hover'], false], highsize, 0];
        }
        return mapstyle;
    }

    /**
     * @link https://sandcastle.cesium.com/index.html?src=Circles%20and%20Ellipses.html&label=Geometries
     * @returns Cesium点格式的样式
     */
    toCesiumStyle(Cesium) {
        let { color = '#FFFFFF', opacity = 1, radius, outlineColor = '#000000', outlineWidth = 1, outlineOpacity = 1, show = true } = this;
        return {
            show: show,
            pixelSize: radius,
            color: Cesium.Color.fromCssColorString(color).withAlpha(opacity),
            outlineWidth: outlineWidth,
            outlineColor: Cesium.Color.fromCssColorString(outlineColor).withAlpha(outlineOpacity)
        };
    }
}

export { TextStyle };
mapgis.style.TextStyle = TextStyle;
