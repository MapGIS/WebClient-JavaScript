import {Zondy} from '../../service/common/Base';
import {L} from 'leaflet';
import {copyAttributesWithClip} from '../../service/common/Util';
import {GeoFeatureThemeLayer} from './GeoFeatureThemeLayer';
import {ThemeLayer} from './ThemeLayer';

/**
 * @class Zondy.Map.simpleThemeLayer
 * @classdesc 统一分配专题图。
 * @description 统一分配专题图对数据（<{@link Zondy.Feature.Vector}>）属性字段（attributes）的属性值进行分段，使用统一的颜色或符号（线型、填充）渲染不同范围段的属性值。统一分配专题图一般用来反映连续分布现象的数量或程度特征，如降水量的分布，土壤侵蚀强度的分布等。
 * @extends Zondy.Map.GeoFeatureThemeLayer
 * @param {string} name - 图层名
 * @param {Object} options - 图层参数。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {number} [options.opacity=1] - 图层透明度。
 * @param {number} [options.nodesClipPixel=2] - 节点抽稀像素距离。
 * @param {boolean} [options.isHoverAble=false] - 图形是否在 hover 时高亮。
 * @param {boolean} [options.isMultiHover=false] - 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面）。
 * @param {boolean} [options.isClickAble=true] - 图形是否可点击。
 * @param {boolean} [options.isAllowFeatureStyle=false] - 是否允许 feature 样式（style） 中的有效属性应用到专题图层。禁止对专题要素使用数据（feature）的 style。此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
 */
var SimpleThemeLayer = GeoFeatureThemeLayer.extend({

    /**
     * @function Zondy.Map.simpleThemeLayer.prototype.initialize
     * @description 初始化。
     * @param {string} name - 专题图名。
     * @param {Object} options - 需要设置的参数对象。
     */
    initialize: function (name, options) {
        GeoFeatureThemeLayer.prototype.initialize.call(this, name, options);
        //{Array<Zondy.Map.ThemeStyle>} 图层中专题要素的样式
        this.style = [];
    },

    /**
     * @function Zondy.Map.simpleThemeLayer.prototype.getColor
     * @description 获取随机颜色
     * @return {Array} color
     */
    getColor: function () {
        var colorValue = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
        var colorArray = colorValue.split(",");
        var color = "#";//定义一个存放十六进制颜色值的字符串变量，先将#存放进去
        for (var i = 0; i < 6; i++) {
            color += colorArray[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    /**
     * @function Zondy.Map.simpleThemeLayer.prototype.getStyleByData
     * @description 根据用户数据（feature）设置专题要素的 Style
     * @return {Array<Zondy.Map.ThemeStyle>} 专题要素的 Style
     */
    getStyleByData: function () {
        var me = this;
        var style = copyAttributesWithClip({}, me.style);
        if (style.fillColor == null) {
            style.fillColor = me.getColor();
        }
        me.style = style;
        return style;
    },

    /**
     * @function Zondy.Map.simpleThemeLayer.prototype.redraw
     * @description 重绘专题图
     */
    redraw: function () {
        return ThemeLayer.prototype.redraw.apply(this, arguments);
    }
});
export var simpleThemeLayer = function (name, options) {
    return new SimpleThemeLayer(name, options);
};

Zondy.Map.simpleThemeLayer = simpleThemeLayer;