import {Zondy} from '../../service/common/Base';
import {GeoFeatureSource} from './GeoFeatureSource';
import {copyAttributesWithClip} from '../../service/common/Util';
import {ThemeVector} from '../../overlay/ThemeVector';
import {ShapeFactory} from '../../overlay/feature/ShapeFactory';

/**
 * @class Zondy.Source.RangeThemeSource
 * @classdesc 分段专题图图层源。
 * @param {string} name - 名称
 * @param {Object} options - 参数。
 * @param {ol.Map} options.map - 当前map对象。
 * @param {string} options.themeField - 指定创建专题图字段。
 * @param {string} [options.id] - 专题图层 ID。
 * @param {number} [options.opacity = 1] - 图层透明度。
 * @param {ol.proj.Projection} [options.projection] - 投影信息。
 * @param {number} [options.ratio=1.5] - 视图比，1 表示画布是地图视口的大小，2 表示地图视口的宽度和高度的两倍，依此类推。必须是 1 或更高。
 * @param {Array} [options.resolutions] - 分辨率数组。
 * @param {ol.source.State} [options.state] - 资源状态。
 * @param {Object} [options.style] - 专题图样式。
 * @param {Object} [options.styleGroups] - 各专题类型样式组。
 * @param {boolean} [options.isHoverAble = false] - 是否开启 hover 事件。
 * @param {Object} [options.highlightStyle] - 开启 hover 事件后，触发的样式风格。
 * @extends {Zondy.Source.GeoFeatureSource}
 */
class RangeThemeSource extends GeoFeatureSource {

    constructor(name, options) {
        super(name, options);
        this.style = options.style;
        this.isHoverAble = options.isHoverAble;
        this.highlightStyle = options.highlightStyle;
        this.themeField = options.themeField;
        this.styleGroups = options.styleGroups;
    }

    /**
     * @function Zondy.Source.RangeThemeSource.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.style = null;
        this.themeField = null;
        this.styleGroups = null;
        GeoFeatureSource.prototype.destroy.apply(this, arguments);
    }

    /**
     * @private
     * @function Zondy.Source.RangeThemeSource.prototype.createThematicFeature
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
     * @function Zondy.Source.RangeThemeSource.prototype.getStyleByData
     * @description 通过数据获取 style。
     * @param {Object} fea - 要素数据。
     */
    getStyleByData(fea) {
        var style = {};
        var feature = fea;
        style = copyAttributesWithClip(style, this.style);
        if (this.themeField && this.styleGroups && this.styleGroups.length > 0 && feature.attributes) {
            var Sf = this.themeField;
            var Attrs = feature.attributes;
            var Gro = this.styleGroups;
            var isSfInAttrs = false; //指定的 themeField 是否是 feature 的属性字段之一
            var attr = null; //属性值

            for (var property in Attrs) {
                if (Sf === property) {
                    isSfInAttrs = true;
                    attr = Attrs[property];
                    break;
                }
            }
            //判断属性值是否属于styleGroups的某一个范围，以便对获取分组 style
            if (isSfInAttrs) {
                for (var i = 0, len = Gro.length; i < len; i++) {
                    if ((attr >= Gro[i].start) && (attr < Gro[i].end)) {
                        var sty1 = Gro[i].style;
                        style = copyAttributesWithClip(style, sty1);
                    }
                }
            }
        }
        if (feature.style && this.isAllowFeatureStyle === true) {
            style = copyAttributesWithClip(feature.style);
        }
        return style;
    }

    canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
        return GeoFeatureSource.prototype.canvasFunctionInternal_.apply(this, arguments);
    }
}

export {RangeThemeSource};
Zondy.Source.RangeThemeSource = RangeThemeSource;