import {Zondy} from '../../service/common/Base';
import {GeoFeatureSource} from './GeoFeatureSource';
import {copyAttributesWithClip} from '../../service/common/Util';
import {ThemeVector} from '../../common/overlay/ThemeVector';
import {ShapeFactory} from '../../common/overlay/feature/ShapeFactory';

/**
 * @class Zondy.Source.SimpleThemeSource
 * @classdesc 统一专题图图层源。
 * @param {string} name - 名称
 * @param {Object} options - 参数。
 * @param {ol.Map} options.map - 当前map对象。
 * @param {string} [options.id] - 专题图层 ID。
 * @param {number} [options.opacity = 1] - 图层透明度。
 * @param {ol.proj.Projection} [options.projection] - 投影信息。
 * @param {number} [options.ratio=1.5] - 视图比，1 表示画布是地图视口的大小，2 表示地图视口的宽度和高度的两倍，依此类推。必须是 1 或更高。
 * @param {Array} [options.resolutions] - 分辨率数组。
 * @param {ol.source.State} [options.state] - 资源状态。
 * @param {Object} [options.style] - 专题图样式。
 * @param {boolean} [options.isHoverAble = false] - 是否开启 hover 事件。
 * @param {Object} [options.highlightStyle] - 开启 hover 事件后，触发的样式风格。
 * @extends {Zondy.Source.GeoFeatureSource}
 */
class SimpleThemeSource extends GeoFeatureSource {

    constructor(name, options) {
        super(name, options);
        this.style = options.style;
        this.isHoverAble = options.isHoverAble;
        this.highlightStyle = options.highlightStyle;
    }

    /**
     * @function Zondy.Source.SimpleThemeSource.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.style = null;
        GeoFeatureSource.prototype.destroy.apply(this, arguments);
    }

    /**
     * @private
     * @function Zondy.Source.SimpleThemeSource.prototype.createThematicFeature
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

        //将数据转为专题要素（ThemeVector）
        var thematicFeature = new ThemeVector(feature, this, ShapeFactory.transformStyle(style), options);

        //直接添加图形到渲染器
        for (var m = 0; m < thematicFeature.shapes.length; m++) {
            this.renderer.addShape(thematicFeature.shapes[m]);
        }

        return thematicFeature;
    }

    /**
     * @private
     * @function Zondy.Source.SimpleThemeSource.prototype.getColor
     * @description 获取随机颜色
     */
    getColor() {
        var colorValue = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
        var colorArray = colorValue.split(",");
        var color = "#";//定义一个存放十六进制颜色值的字符串变量，先将#存放进去
        for (var i = 0; i < 6; i++) {
            color += colorArray[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /**
     * @private
     * @function Zondy.Source.SimpleThemeSource.prototype.getStyleByData
     * @description 通过数据获取 style。
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

    canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
        return GeoFeatureSource.prototype.canvasFunctionInternal_.apply(this, arguments);
    }
}

export {SimpleThemeSource};
Zondy.Source.SimpleThemeSource = SimpleThemeSource;