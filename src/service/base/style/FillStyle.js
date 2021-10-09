import { extend } from '../../common/Util';
import { mapgis } from '../common/base';
import { VectorStyle } from './VectorStyle';
import { Symbol } from './Symbol';
import { Shadow } from './Shadow';

/**
 * 多边形样式
 * @class mapgis.style.FillStyle
 * @classdesc 多边形样式
 * @param {Number} [outlineWidth = 0] 多边形外边线宽度，默认为1
 * @param {String} [outlineColor = #FFFFFF] 多边形外边线颜色，16进制颜色或rgb值或rgba值，默认#FFFFFF，白色
 * @param {String} [outlineDashArray = line] 多边形外边线样式，默认line，即实线
 * @param {Object} [shadowStyle = undefined] 阴影样式，默认undefined
 * @param {Object} [symbolStyle = undefined] 填充图案样式，默认undefined
 * @param {Object} [outlineSymbolStyle = undefined] 多边形外边线填充图案样式，默认undefined
 */
export default class FillStyle extends VectorStyle {
    constructor(option) {
        super();
        var options = option ? option : {};
        const {
            outlineWidth = 1,
            outlineColor = '#FFFFFF',
            outlineDashArray = 'line',
            offsetX = 0,
            offsetY = 0,
            shadow,
            symbol,
            outlineSymbolStyle
        } = options;
        this.outlineWidth = outlineWidth;
        this.outlineColor = outlineColor;
        this.outlineDashArray = outlineDashArray;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.shadowStyle = shadow || new Shadow();
        this.symbolStyle = symbol || new Symbol();
        this.outlineSymbolStyle = outlineSymbolStyle || new Symbol();
        extend(this, options);
    }

    /**
     * @link https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#fill
     * @returns MapboxGL线格式的样式
     */
    toMapboxStyle() {
        let { color, opacity, outlineColor, symbolStyle, offsetX, offsetY } = this;
        let style = {
            paint: {
                'fill-antialias': true, //抗锯齿，true表示针对边界缝隙进行填充
                'fill-color': color,
                'fill-opacity': opacity,
                'fill-outline-color': outlineColor
            }
        };
        if (symbolStyle && symbolStyle.symbol) {
            style.paint['fill-pattern'] = symbolStyle.symbol;
        }
        if (offsetX || offsetY) {
            style.paint['fill-translate'] = [offsetX, offsetY];
        }
        return style;
    }

    /**
     * @link https://sandcastle.cesium.com/index.html?src=Polygon.html
     * @returns Cesium区格式的样式
     */
    toCesiumStyle(Cesium) {
        let { color, opacity, outlineColor } = this;
        let material = new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(color).withAlpha(opacity));
        let outline = new Cesium.Color.fromCssColorString(outlineColor);
        return { material, outlineColor: outline };
    }
}

export { FillStyle };
mapgis.style.FillStyle = FillStyle;
