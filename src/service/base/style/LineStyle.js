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
        const { width = 1, dashArray, cap = LineCap.butt, join = LineJoin.miter, shadow, symbol } = options;
        this.width = width;
        this.dashArray = dashArray;
        this.cap = cap;
        this.join = join;
        this.shadowStyle = shadow || new Shadow();
        this.symbolStyle = symbol || new Symbol();
        extend(this, options);
    }

    /**
     * @link https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#line
     * @returns MapboxGL线格式的样式
     */
    toMapboxStyle() {
        let { color, opacity, width, cap, join, blur, dashArray, shadowStyle, symbolStyle } = this;
        if (shadowStyle) {
            blur = shadowStyle.blur;
            width = width + blur;
        }
        let style = {
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
        return style;
    }
}

export { LineStyle };
mapgis.style.LineStyle = LineStyle;
