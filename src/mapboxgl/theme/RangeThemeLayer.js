import mapboxgl from "@mapgis/mapbox-gl";
import { Zondy } from "../../service/common/Base";
import { copyAttributesWithClip } from "../../service/common/Util";
import { GeoFeatureThemeLayer } from "./GeoFeatureThemeLayer";
import { ThemeVector } from "../../common/overlay/ThemeVector";
import { ShapeFactory } from "../../common/overlay/feature/ShapeFactory";

/**
 * @class Zondy.Map.rangeThemeLayer
 * @classdesc 分段专题图层。
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
class RangeThemeLayer extends GeoFeatureThemeLayer {
  constructor(name, options) {
    super(name, options);
    this.style = options.style;
    this.isHoverAble = options.isHoverAble;
    this.highlightStyle = options.highlightStyle;
    this.themeField = options.themeField;
    this.styleGroups = options.styleGroups;
  }

  /**
   * @function Zondy.Map.rangeThemeLayer.prototype.createThematicFeature
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
    var thematicFeature = new ThemeVector(
      feature,
      this,
      ShapeFactory.transformStyle(style),
      options
    );

    //直接添加图形到渲染器
    for (var m = 0; m < thematicFeature.shapes.length; m++) {
      this.renderer.addShape(thematicFeature.shapes[m]);
    }
    return thematicFeature;
  }

  /**
   * @private
   * @function Zondy.Map.rangeThemeLayer.prototype.getStyleByData
   * @description 通过数据获取 style。
   * @param {Object} fea - 要素数据。
   */
  getStyleByData(fea) {
    var style = {};
    var feature = fea;
    style = copyAttributesWithClip(style, this.style);
    if (
      this.themeField &&
      this.styleGroups &&
      this.styleGroups.length > 0 &&
      feature.attributes
    ) {
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
          if (attr >= Gro[i].start && attr < Gro[i].end) {
            //feature.style = CommonUtil.copyAttributes(feature.style, this.defaultStyle);
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
}

export { RangeThemeLayer };
export var rangeThemeLayer = function(name, options) {
  return new RangeThemeLayer(name, options);
};

Zondy.Map.rangeThemeLayer = rangeThemeLayer;
