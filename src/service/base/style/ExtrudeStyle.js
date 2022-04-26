import { extend } from '../../common/Util';
import { mapgis } from '../common/base';
import { Symbol } from './Symbol';
import { Graphic } from './Graphic';

/**
 * 拉伸体样式
 * @class mapgis.symbols.ExtrudeStyle
 * @classdesc 拉伸体样式
 * @param {String} [color = #FFFFFF] 拉伸体外边线颜色，16进制颜色或rgb值或rgba值，默认#FFFFFF，白色
 * @param {Object} [shadowStyle = undefined] 阴影样式，默认undefined
 * @param {Object} [symbolStyle = undefined] 填充图案样式，默认undefined
 * @param {Object} [outlineSymbolStyle = undefined] 拉伸体外边线填充图案样式，默认undefined
 */
export default class ExtrudeStyle extends Symbol {
    constructor(option) {
        super();
        var options = option ? option : {};
        const { color = '#FFFFFF', opacity = 1.0, symbol } = options;
        const { castShadows = true, edges, size = 1, material } = options;

        this.type = 'extrude';

        this.color = color;
        this.opacity = opacity;
        this.symbolStyle = symbol || new Graphic();

        this.castShadows = castShadows;
        this.edges = edges;
        this.material = material || color;
        this.size = size;

        extend(this, options);
    }

    /**
     * @param  {Boolean} [highlight = false] 是否激活高亮样式
     * @link https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#fill-extrusion
     * @returns MapboxGL线格式的样式
     */
    toMapboxStyle(options) {
        options = options || {};
        const { highlight = false } = options;
        let { material, size, opacity, symbolStyle } = this;
        const { pattern, xoffset, yoffset } = symbolStyle;
        let style = {
            filter: ['==', '$type', 'Polygon'],
            paint: {
                'fill-extrusion-base': 0,
                'fill-extrusion-color': material,
                'fill-extrusion-height': size,
                'fill-extrusion-opacity': opacity,
                'fill-extrusion-translate': [xoffset, yoffset],
                'fill-extrusion-translate-anchor': 'map',
                'fill-extrusion-vertical-gradient': true
            }
        };
        if (symbolStyle && pattern) {
            style.paint['fill-extrusion-pattern'] = pattern;
        }
        if (highlight) {
            style.paint['fill-extrusion-color'] = ['case', ['boolean', ['feature-state', 'hover'], false], material, 'rgba(0,0,0,0)'];
            style.paint['fill-extrusion-base'] = ['case', ['boolean', ['feature-state', 'hover'], false], 100, 0];
        }
        return style;
    }
}

export { ExtrudeStyle };
mapgis.symbols.ExtrudeStyle = ExtrudeStyle;
