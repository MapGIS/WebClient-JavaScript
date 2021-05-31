import mapboxgl from '@mapgis/mapbox-gl';
import { Zondy } from '../../service/common/Base';
import { ThemeLayer } from './ThemeLayer';
import { extend } from '../../service/common/Util';
import { copyAttributesWithClip } from '../../service/common/Util';

import { ShapeFactory } from '../../common/overlay/feature/ShapeFactory';
import { ThemeVector } from '../../common/overlay/ThemeVector';
import { FeatureSet } from '../../service/common/FeatureSet';

/**
 * @class Zondy.Map.GeoFeatureThemeLayer
 * @classdesc 地理几何专题要素型专题图层。
 * @param {string} name - 图层名。
 * @param {Object} options - 参数。
 * @param {mapboxgl.Map} options.map - 当前 mapboxgl map 对象。
 * @param {string} [options.id] - 专题图层 ID。
 * @param {boolean} [options.loadWhileAnimating=true] - 是否实时重绘。
 * @param {number} [options.nodesClipPixel=2] - 节点抽稀像素距离。
 * @param {boolean} [options.isHoverAble=false] - 图形是否在 hover 时高亮。
 * @param {boolean} [options.isMultiHover=false] - 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面）。
 * @param {boolean} [options.isClickAble=true] - 图形是否可点击。
 * @param {boolean} [options.isAllowFeatureStyle=false] -  是否允许 feature 样式（style） 中的有效属性应用到专题图层。禁止对专题要素使用数据（feature）的 style。此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
 * @param {number} [options.opacity=1] - 图层透明度。
 * @extends {Zondy.Map.ThemeLayer}
 * @fires Zondy.Map.GeoFeatureThemeLayer#beforefeaturesadded
 */
class GeoFeatureThemeLayer extends ThemeLayer {
    constructor(name, options) {
        super(name, options);
        /**
         * @member {string} Zondy.Map.GeoFeatureThemeLayer.prototype.name
         * @description 专题图图层名称。
         */
        this.name = null;
        /**
         * @member {Zondy.ThemeStyle} Zondy.Map.GeoFeatureThemeLayer.prototype.style
         * @description 专题图图层全局样式。
         */
        this.style = null;

        /**
         * @member {Zondy.ThemeStyle} Zondy.Map.GeoFeatureThemeLayer.prototype.highlightStyle
         * @description 专题图图层高亮样式。
         */
        this.highlightStyle = null;

        /**
         * @member {number} [Zondy.Map.GeoFeatureThemeLayer.prototype.nodesClipPixel=2]
         * @description 节点抽稀像素距离。
         */
        this.nodesClipPixel = 2;

        /**
         * @member {boolean} [Zondy.Map.GeoFeatureThemeLayer.prototype.isHoverAble=false]
         * @description 图形是否在 hover 时高亮。
         */
        this.isHoverAble = false;
        /**
         * @member {boolean} [Zondy.Map.GeoFeatureThemeLayer.prototype.isMultiHover=false]
         * @description 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面）。
         */
        this.isMultiHover = false;
        /**
         * @member {boolean} [Zondy.Map.GeoFeatureThemeLayer.prototype.isClickAble=true]
         * @description  图形是否可点击。
         */
        this.isClickAble = true;

        /**
         * @member {boolean} [Zondy.Map.GeoFeatureThemeLayer.prototype.isAllowFeatureStyle=false]
         * @description  是否允许 feature 样式（style） 中的有效属性应用到专题图层。</br>禁止对专题要素使用数据（feature）的 style。此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
         */
        this.isAllowFeatureStyle = false;
        extend(this, options);
        this.cache = options.cache || {};
        this.cacheFields = options.cacheFields || [];
        this.maxCacheCount = options.maxCacheCount || 0;
        this.isCustomSetMaxCacheCount = options.isCustomSetMaxCacheCount === undefined ? false : options.isCustomSetMaxCacheCount;
    }

    /**
     * @function addFeatures
     * @description 添加要素
     * @param features - {Object} 只支持FeatureSet
     */
    addFeatures(features) {
        var me = this;
        mapboxgl.Evented.prototype.fire('beforefeaturesadded', {
            features: features
        });

        if (features instanceof FeatureSet) {
            var attrs = null;
            var LabelDots = features.LabelDots;
            var attstruct = features.AttStruct;
            var feaArr = features.SFEleArray;
            if (feaArr != null && feaArr.length > 0) {
                for (var j = 0; j < feaArr.length; j++) {
                    var feature = feaArr[j];
                    if (feature.AttValue != null && feature.AttValue.length > 0) {
                        var attrs = {};
                        for (var i = 0; i < feature.AttValue.length; i++) {
                            attrs[attstruct.FldName[i]] = feature.AttValue[i];
                        }
                        attrs['FID'] = feature.FID;
                    }
                    feature.attributes = attrs;
                    LabelDots && LabelDots[j] && (feature.LabelDot = LabelDots[j]);
                    me.features.push(feature);
                }
            }
        }
        if (!this.isCustomSetMaxCacheCount) {
            this.maxCacheCount = this.features.length * 5;
        }
        //绘制专题要素
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getBounds());
        }
    }

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.removeFeatures
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
     * @param {Zondy.Feature.Vector} features - 要删除的要素对象。
     */
    removeFeatures(features) {
        // eslint-disable-line no-unused-vars
        this.clearCache();
        ThemeLayer.prototype.removeFeatures.apply(this, arguments);
    }

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures() {
        this.clearCache();
        ThemeLayer.prototype.removeAllFeatures.apply(this, arguments);
    }

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素。
     * @param {mapboxgl.LngLatBounds} extent - 重绘的范围。
     */
    redrawThematicFeatures(extent) {
        // eslint-disable-line no-unused-vars
        this.clearCache();
        //获取高亮专题要素对应的用户 id
        var hoverone = this.renderer.getHoverOne();
        var hoverFid = null;
        if (hoverone && hoverone.refDataID) {
            hoverFid = hoverone.refDataID;
        }
        //清除当前所有可视元素
        this.renderer.clearAll();

        var features = this.features;
        var cache = this.cache;
        var cacheFields = this.cacheFields;
        var cmZoom = this.map.getZoom();

        var maxCC = this.maxCacheCount;

        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];

            // var feaBounds = feature.bound;
            //
            // //剔除当前视图（地理）范围以外的数据
            // if (bounds && !bounds.intersectsBounds(feaBounds)) {
            //     continue;
            // }

            //缓存字段
            var fields = feature.FID + '_zoom_' + cmZoom.toString();

            var thematicFeature;

            //判断专题要素缓存是否存在
            if (cache[fields]) {
                cache[fields].updateAndAddShapes();
            } else {
                //如果专题要素缓存不存在，创建专题要素
                thematicFeature = this.createThematicFeature(features[i]);

                //检查 thematicFeature 是否有可视化图形
                if (thematicFeature.getShapesCount() < 1) {
                    continue;
                }

                //加入缓存
                cache[fields] = thematicFeature;
                cacheFields.push(fields);

                //缓存数量限制
                if (cacheFields.length > maxCC) {
                    var fieldsTemp = cacheFields[0];
                    cacheFields.splice(0, 1);
                    delete cache[fieldsTemp];
                }
            }
        }
        this.renderer.render();

        //地图漫游后，重新高亮图形
        if (hoverFid && this.isHoverAble && this.isMultiHover) {
            var hShapes = this.getShapesByFeatureID(hoverFid);
            this.renderer.updateHoverShapes(hShapes);
        }
    }

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.createThematicFeature
     * @description 创建专题要素。
     * @param {Zondy.Feature.Vector} feature - 要素对象。
     */
    createThematicFeature(feature) {
        var style = copyAttributesWithClip(this.style);
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
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.clearCache
     * @description 清除缓存。
     */
    clearCache() {
        this.cache = {};
        this.cacheFields = [];
    }

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.clear
     * @description  清除的内容包括数据（features）、专题要素和缓存。
     */
    clear() {
        this.renderer.clearAll();
        this.renderer.refresh();
        this.removeAllFeatures();
        this.clearCache();
    }

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.getCacheCount
     * @description 获取当前缓存数量。
     * @returns {number} 当前缓存数量。
     */
    getCacheCount() {
        return this.cacheFields.length;
    }

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.setMaxCacheCount
     * @param {number} [cacheCount] - 缓存总数。
     * @description 设置最大缓存条数。
     */
    setMaxCacheCount(cacheCount) {
        if (!isNaN(cacheCount)) {
            this.maxCacheCount = cacheCount;
            this.isCustomSetMaxCacheCount = true;
        }
    }

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.setMaxCacheCount
     * @param {number} [featureID=si.refDataID] - 要素 ID。
     * @description 通过 FeatureID 获取 feature 关联的所有图形。如果不传入此参数，函数将返回所有图形。
     */
    getShapesByFeatureID(featureID) {
        var list = [];
        var shapeList = this.renderer.getAllShapes();
        if (!featureID) {
            return shapeList;
        }
        for (var i = 0, len = shapeList.length; i < len; i++) {
            var si = shapeList[i];
            if (si.refDataID && featureID === si.refDataID) {
                list.push(si);
            }
        }
        return list;
    }
}

export { GeoFeatureThemeLayer };
Zondy.Map.GeoFeatureThemeLayer = GeoFeatureThemeLayer;
