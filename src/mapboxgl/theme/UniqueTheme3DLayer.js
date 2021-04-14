import { mapboxgl } from  '@mapgis/mapbox-gl';
import { Zondy } from '../../service/common/Base';
import {Theme3DLayer} from './Theme3DLayer';
import {extend} from '../../service/common/Util';

/**
 * @class mapboxgl.zondy.UniqueTheme3DLayer
 * @classdesc 三维单值专题图
 * @param  id -{string} 专题图图层id
 * @param  layerOptions -{Object} 专题图图层配置项,参数继承自Theme3DLayer,新增参数如下：<br>
 *            height -{number} 如果数据指定的heightField(默认height)没有可以表示高度的字段，可以为所有数据统一设置一个高度<br>
 *            colorStops -{Array} 数据颜色分段数组<br>
 */
class UniqueTheme3DLayer extends Theme3DLayer {
    constructor(id, layerOptions) {
        super(id, layerOptions);
        /**
         * @member  mapboxgl.zondy.UniqueTheme3DLayer.prototype.colorStops -{Array}
         * @description 数据颜色数组，如[["绿地","#CD7054"],["道路","#AD1283"]]
         */
        this.colorStops = null;
        this.heightStops = null;
        extend(this, layerOptions);
    }
    /**
     * @function  mapboxgl.zondy.UniqueTheme3DLayer.prototype.getLayerStyleOptions
     * @description 获取图层样式
     * @return {Object}  mapbox gl样式对象
     */
    getLayerStyleOptions() {
        var opacity = this.opacity == null ? 1 : this.opacity;
        opacity = isNaN(parseFloat(opacity)) ? 1 : parseFloat(opacity);
        var options = {
            'fill-extrusion-color': {
                'stops': this.colorStops,
                'property': this.themeField,
                'type': 'categorical'
            },
            'fill-extrusion-opacity': opacity
        };

        if (this.height != null) {
            options['fill-extrusion-height'] = this.height;
        } else {
            options['fill-extrusion-height'] = {
                'property': this.heightField || 'height',
                'type': 'categorical',
                'stops': this.heightStops,
            };
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
     * @function mapboxgl.zondy.UniqueTheme3DLayer.prototype.getHighlightStyleOptions
     * @description 获取高亮样式
     * @returns {Object}  mapbox gl样式对象
     */
    getHighlightStyleOptions() {
        var color = (this.highlight && this.highlight.color != null) ? this.highlight.color : '#ADA91E';
        var paint = {
            'fill-extrusion-color': color,
            'fill-extrusion-height': {
                "stops": this.heightStops,  
                "property": this.heightField,
                'type': 'categorical'
            },
            'fill-extrusion-opacity': this.highlight && this.highlight.opacity || 0.6
        };
        if (this.height != null) {
            paint['fill-extrusion-height'] = this.height || 0;
        }
        return paint;
    }

    _createLegendElement() {
        var legendListElement = "<ul>";
        var len = this.colorStops && this.colorStops.length || 0;
        for (var i = 0; i < len; i++) {
            var text = this.colorStops[i][0];
            var color = this.colorStops[i][1];
            legendListElement += "<li><span style='background-color:" + color + ";'></span><span>" + text + "</span></li>";
        }
        legendListElement += "</ul>";
        return legendListElement;
    }
};

export {UniqueTheme3DLayer};
export var uniqueTheme3DLayer = function (id, layerOptions) {
    return new UniqueTheme3DLayer(id, layerOptions);
};
Zondy.Map.uniqueTheme3DLayer = uniqueTheme3DLayer;