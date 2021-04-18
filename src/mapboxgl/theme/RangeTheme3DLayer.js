import { Zondy } from '../../service/common/Base';
import {Theme3DLayer} from './Theme3DLayer';
import {extend} from '../../service/common/Util';

/**
 * @class RangeTheme3DLayer
 * @classdesc 三维分段专题图
 * @param  id -{string} 专题图图层id
 * @param  layerOptions -{Object} 专题图图层配置项,参数继承自Theme3DLayer,新增参数如下：<br>
 *            heightStops -{Array} 数据高度分段数组<br>
 *            colorStops -{Array} 数据颜色分段数组<br>
 *            base -{number} 数据分段线性增量<br>
 *            legendRatio -{number} 图例数值扩大系数<br>
 * @example
 * new RangeTheme3DLayer(layerId, map, {
 *           enableHighlight:true,
 *           // 设置分段
 *           heightField: "floor",
 *           heightStops: [[1, 10], [10, 100]],
 *           colorStops: [
 *               [0, 'rgba(33, 41, 52, 0.8)'], [20, 'rgba(69,117,180, 0.7)'], [50, 'rgba(116,173,209, 0.7)'], [100, 'rgba(171,217,233, 0.7)']
 *           ],
 *           // 显示图例
 *           showLegend: true,
 *           legendTheme: 'dark',
 *           legendTitle: "图例"
 *       });
 */
class RangeTheme3DLayer extends Theme3DLayer {

    constructor(id, layerOptions) {
        super(id, layerOptions);
        /**
         * @member  heightStops -{Array}
         * @description 数据高度分段数组
         */
        this.heightStops = null;

        /**
         * @member  colorStops -{Array}
         * @description 数据颜色分段数组
         */
        this.colorStops = null;
        /**
         * @member  base -{number}
         * @description 数据分段线性增量
         */
        this.base = null;

        /**
         * @member  legendRatio -{number}
         * @description 图例数值扩大系数
         */
        this.legendRatio = 1;

        extend(this, layerOptions);
    }

    /**
     * @function  getLayerStyleOptions
     * @description 获取图层样式
     * @return {Object}  mapbox gl样式对象
     */
    getLayerStyleOptions() {
        var opacity = this.opacity == null ? 1 : this.opacity;
        opacity = isNaN(parseFloat(opacity)) ? 1 : parseFloat(opacity);
        var reg = /^[0-9]+.?[0-9]*$/;
        var options = {
            'fill-extrusion-color': {
                'stops': this.colorStops,
                'property': this.themeField || this.heightField,
                'type': 'interval',
                'base': reg.test(this.base) ? this.base : 1
            },
            'fill-extrusion-opacity': opacity
        };
        if (this.heightStops) {
            options['fill-extrusion-height'] = {
                'stops': this.heightStops,
                'property': this.heightField || 'height',
                'base': reg.test(this.base) ? this.base : 1
            }
        } else if (this.height) {
            options['fill-extrusion-height'] = this.height;
        } else {
            options['fill-extrusion-height'] = {
                'property': this.heightField || 'height',
                'type': 'identity'
            }
        }

        if (this.baseHeightField) {
            options['fill-extrusion-base'] = {
                'property': this.baseHeightField,
                'type': 'identity'
            }
        }
        return options;
    }

    /**
     * @function getHighlightStyleOptions
     * @description 获取高亮样式
     * @returns {Object}  mapbox gl样式对象
     */
    getHighlightStyleOptions() {
        var color = (this.highlight && this.highlight.color != null) ? this.highlight.color : '#ADA91E';
        return {
            'fill-extrusion-color': color,
            'fill-extrusion-height': {
                "stops": this.heightStops,
                "property": this.heightField
            },
            'fill-extrusion-opacity': this.highlight && this.highlight.opacity || 0.6
        }
    }

    _createLegendElement() {
        var len = this.colorStops && this.colorStops.length || 0;
        //颜色分段对应标识
        var legendListElement = "<ul>";
        var i;
        for (i = 0; i < len; i++) {
            var value = this.colorStops[i][0];
            var text = this._getWrapperText(value);
            if (i === len - 1) {
                text = "> " + text;
            } else {
                var next = this._getWrapperText(this.colorStops[i + 1][0]);
                text = text + "-" + next;
            }

            var color = this.colorStops[i][1];

            legendListElement += "<li><span style='background-color:" + color + ";'></span><span>" + text + "</span></li>";
        }
        legendListElement += "</ul>";
        return legendListElement;
    }

    _getWrapperText(number) {
        var value = number * ((this.legendRatio == null) ? 1 : parseFloat(this.legendRatio));

        //单个颜色值宽度为60px,最大只能完全显示1000000，否则就超出宽度，则显示以为k计数单位的值
        var num = parseFloat(value);
        if (num % 1000000 <= 1000000) {
            return num.toString();
        }
        return parseInt(num / 1000) + 'k'
    }

};
export {RangeTheme3DLayer};
export var rangeTheme3DLayer = function (id, layerOptions) {
    return new RangeTheme3DLayer(id, layerOptions);
};

Zondy.Map.rangeTheme3DLayer = rangeTheme3DLayer;