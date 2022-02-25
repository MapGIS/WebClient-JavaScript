import { extend } from '../../common/Util';
import { mapgis } from '../common/base';
import { VectorStyle } from './VectorStyle';
import { LineCap, LineJoin } from './Enum';
import { Shadow } from './Shadow';
import { Symbol } from './Symbol';

/**
 * 线样式
 * @class mapgis.style.LineStyle
 * @classdesc 线样式
 * @param {Number} [width = 1] 线宽度，默认为1
 * @param {String} [type = 'line'] 线的样式，默认line，即为实线
 * @param {String} [dashArray = [5, 5]] 虚实组合关系
 * @param {String} [cap = butt] 线头样式，默认butt
 * @param {String} [join = miter] 拐角样式，默认miter
 * @param {Object} [shadowStyle = undefined] 阴影样式，默认undefined
 */
export default class LineStyle extends VectorStyle {
    constructor(option) {
        super();
        var options = option ? option : {};
        const {
            width = 1,
            dashArray,
            cap = LineCap.butt,
            join = LineJoin.miter,
            shadow,
            symbol
        } = options;
        this.type = 'line';
        this.width = width;
        this.dashArray = dashArray;
        this.cap = cap;
        this.join = join;
        this.shadowStyle = shadow || new Shadow();
        this.symbolStyle = symbol || new Symbol();
        extend(this, options);
    }

    /**
     * @param  {Boolean} [highlight = false] 是否激活高亮样式
     * @link https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#line
     * @returns MapboxGL线格式的样式
     */
    toMapboxStyle(options) {
        options = options || {};
        const { highlight = false } = options;
        let { color, opacity, width, cap, join, blur, dashArray, shadowStyle, symbolStyle } = this;
        if (shadowStyle) {
            blur = shadowStyle.blur;
            width = width + blur;
        }
        let style = {
            filter: ['==', '$type', 'LineString'],
            layout: {
                'line-cap': cap,
                'line-join': join
            },
            paint: {
                'line-width': width,
                'line-color': color,
                'line-opacity': opacity, //透明度 `0 ~ 1.0`
                'line-blur': blur
            }
        };
        if (symbolStyle && symbolStyle.symbol) {
            style.paint['line-pattern'] = symbolStyle.symbol;
        }
        if (dashArray) {
            style.paint['line-dasharray'] = dashArray;
        }
        if (highlight) {
            style.paint['line-width'] = ['case', ['boolean', ['feature-state', 'hover'], false], width, 0];
        }
        return style;
    }

    /**
     * @link https://sandcastle.cesium.com/index.html?src=Polyline.html&label=Geometries
     * @returns Cesium线格式的样式
     */
    toCesiumStyle(Cesium) {
        let material;
        let { dashArray, shadowStyle, color, opacity, width } = this;
        // PolylineArrowMaterialProperty
        if (dashArray) {
            material = new Cesium.PolylineDashMaterialProperty({
                color: Cesium.Color.fromCssColorString(color)
            });
        } else if (shadowStyle && shadowStyle.blur > 0) {
            width = width + shadowStyle.blur;
            material = new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.2,
                taperPower: 0.5,
                color: Cesium.Color.fromCssColorString(shadowStyle.color)
            });
        } else {
            material = new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(color).withAlpha(opacity));
        }

        return { material, width };
    }
}

export { LineStyle };
mapgis.style.LineStyle = LineStyle;
