import mapboxgl from '@mapgis/mapbox-gl';
import { Common } from '@mapgis/webclient-es6-service';

import { GeoFeatureThemeLayer } from './GeoFeatureThemeLayer';
import { ThemeVector } from './common/overlay/ThemeVector';
import { ShapeFactory } from './common/overlay/feature/ShapeFactory';

const { copyAttributesWithClip, Zondy } = Common;

/**
 * @class Zondy.Map.simpleThemeLayer
 * @classdesc 单值专题图层。
 * @param {string} name - 图层名。
 * @param {Object} options - 参数。
 * @param {string} [options.id] - 专题图层 ID。
 * @param {boolean} [options.loadWhileAnimating=true] - 是否实时重绘。
 * @param {mapboxgl.Map} options.map - 当前 Mapbox GL map 对象。
 * @param {number} [options.opacity=1] - 图层透明度。
 * @param {string} options.themeField - 指定创建专题图字段。
 * @param {Object} options.style - 专题图样式。
 * @param {Object} options.styleGroups - 各专题类型样式组。
 * @param {boolean} [options.isHoverAble=false] - 是否开启 hover 事件。
 * @param {Object} [options.highlightStyle] - 开启 hover 事件后，触发的样式风格。
 * @extends {Zondy.Map.GeoFeatureThemeLayer}
 */
class SimpleThemeLayer extends GeoFeatureThemeLayer {
    constructor(name, options) {
        super(name, options);
        this.style = options.style;
        this.isHoverAble = options.isHoverAble;
        this.highlightStyle = options.highlightStyle;
        this.themeField = options.themeField;
        this.styleGroups = options.styleGroups;
    }

    /**
     * @function Zondy.Map.simpleThemeLayer.prototype.getColor
     * @description 获取随机颜色。
     */
    getColor() {
        var colorValue = '0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f';
        var colorArray = colorValue.split(',');
        var color = '#'; //定义一个存放十六进制颜色值的字符串变量，先将#存放进去
        for (var i = 0; i < 6; i++) {
            color += colorArray[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /**
     * @function Zondy.Map.simpleThemeLayer.prototype.createThematicFeature
     * @description 创建专题图要素。
     * @param {Object} feature - 要创建的专题图形要素。
     */
    createThematicFeature(feature) {
        //赋 style
        var style = this.getStyleByData(feature);
        //创建专题要素时的可选参数
        var options = {};
        options.nodesClipPixel = this.nodesClipPixel;
        options.isHoverAble = this.isHoverAble;
        options.isMultiHover = this.isMultiHover;
        options.isClickAble = this.isClickAble;
        options.highlightStyle = ShapeFactory.transformStyle(this.highlightStyle);

        //将数据转为专题要素（Vector）
        var thematicFeature = new ThemeVector(feature, this, ShapeFactory.transformStyle(style), options);

        //直接添加图形到渲染器
        for (var m = 0; m < thematicFeature.shapes.length; m++) {
            this.renderer.addShape(thematicFeature.shapes[m]);
        }
        return thematicFeature;
    }

    /**
     * @private
     * @function Zondy.Map.simpleThemeLayer.prototype.getStyleByData
     * @description 获取 style。
     */
    getStyleByData() {
        var me = this;
        var style = copyAttributesWithClip({}, me.style);
        if (style.fillColor == null) {
            style.fillColor = me.getColor();
        }
        me.style = style;
        return style;
    }
}

export { SimpleThemeLayer };
export var simpleThemeLayer = function (name, options) {
    return new SimpleThemeLayer(name, options);
};

Zondy.Map.simpleThemeLayer = simpleThemeLayer;
