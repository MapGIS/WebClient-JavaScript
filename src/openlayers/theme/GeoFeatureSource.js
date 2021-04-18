import {Zondy} from '../../service/common/Base';
import {ThemeSource} from './ThemeSource';
import {copyAttributesWithClip} from '../../service/common/Util';
import {ShapeFactory} from '../../common/overlay/feature/ShapeFactory';
import {ThemeVector} from '../../common/overlay/ThemeVector';
import {FeatureSet} from '../../service/common/FeatureSet';
import {Rectangle} from '../../service/common/Rectangle';

/**
 * @class Zondy.Source.GeoFeatureSource
 * @classdesc 地理几何专题要素型专题图层基类。
 * @param {string} name - 图层名称。
 * @param {Object} options - 参数。
 * @param {ol.Map} options.map - 当前 OpenLayers Map 对象。
 * @param {string} [options.id] - 专题图层 ID
 * @param {number} [options.opacity=1] - 图层透明度。
 * @param {ol.proj.Projection} [options.projection] - 投影信息。
 * @param {number} [options.ratio=1.5] - 视图比，1 表示画布是地图视口的大小，2 表示地图视口的宽度和高度的两倍，依此类推。 必须是 1 或更高。
 * @param {Array} [options.resolutions] - 分辨率数组。
 * @param {ol.source.State} [option.state] - 资源状态。
 * @param {Object} [options.style] - 专题图样式。
 * @param {Object} [options.styleGroups] - 各专题类型样式组。
 * @param {boolean} [options.isHoverAble=false] - 是否开启 hover 事件。
 * @param {Object} [options.highlightStyle] - 开启 hover 事件后，触发的样式风格。
 * @extends {Zondy.Source.ThemeSource}
 */
class GeoFeatureSource extends ThemeSource {

    constructor(name, options) {
        super(name, options);
        this.cache = options.cache || {};
        this.cacheFields = options.cacheFields || [];
        this.style = options.style || {};
        this.maxCacheCount = options.maxCacheCount || 0;
        this.isCustomSetMaxCacheCount = options.isCustomSetMaxCacheCount || false;
        this.nodesClipPixel = options.nodesClipPixel || 2;
        this.isHoverAble = options.isHoverAble || false;
        this.isMultiHover = options.isMultiHover || false;
        this.isClickAble = options.isClickAble || true;
        this.highlightStyle = options.highlightStyle || null;
        this.isAllowFeatureStyle = options.isAllowFeatureStyle || false;
    }

    /**
     * @function Zondy.Source.GeoFeatureSource.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.maxCacheCount = null;
        this.isCustomSetMaxCacheCount = null;
        this.nodesClipPixel = null;
        this.isHoverAble = null;
        this.isMultiHover = null;
        this.isClickAble = null;
        this.cache = null;
        this.cacheFields = null;
        this.style = null;
        this.highlightStyle = null;
        this.isAllowFeatureStyle = null;
    }

    /**
     * @function Zondy.Source.GeoFeatureSource.prototype.addFeatures
     * @description 添加要素。
     * @param {Object} features - 要素对象。
     */
    addFeatures(features) {
        var me = this;
        this.dispatchEvent({
            type: 'beforefeaturesadded',
            value: {features: features}
        });
        if (features instanceof FeatureSet) {

            var attrs = null;
            var attstruct = features.AttStruct;
            var feaArr = features.SFEleArray;
            if (feaArr != null && feaArr.length > 0) {
                for (var j = 0; j < feaArr.length; j++) {
                    var feature = feaArr[j];
                    if (feature.AttValue != null && feature.AttValue.length > 0) {
                        var attrs = {};
                        for (var i = 0; i < feature.AttValue.length; i++) {
                            attrs[(attstruct.FldName)[i]] = (feature.AttValue)[i];
                        }
                        attrs['FID'] = feature.FID;
                    }
                    feature.attributes = attrs;
                    me.features.push(feature);
                }
            }
        }
        if (!this.isCustomSetMaxCacheCount) {
            this.maxCacheCount = this.features.length * 5;
        }
        //绘制专题要素
        if (this.renderer) {
            this.changed();
        }
    }

    /**
     * @function Zondy.Source.GeoFeatureSource.prototype.removeFeatures
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
     * @param {Zondy.Feature.Vector} features - 要删除的要素对象。
     */
    removeFeatures(features) { // eslint-disable-line no-unused-vars
        this.clearCache();
        ThemeSource.prototype.removeFeatures.apply(this, arguments);
    }

    /**
     * @function Zondy.Source.GeoFeatureSource.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures() {
        this.clearCache();
        ThemeSource.prototype.removeAllFeatures.apply(this, arguments);
    }

    /**
     * @function Zondy.Source.GeoFeatureSource.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素。
     * @param {Object} extent - 视图范围数据。
     */
    redrawThematicFeatures(extent) {
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
        var cmZoom = this.map.getView().getZoom();

        var maxCC = this.maxCacheCount;

        var bounds = new Rectangle(extent[0], extent[1], extent[2], extent[3]);

        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            var feaBounds = feature.bound;

            //剔除当前视图（地理）范围以外的数据
            if (bounds && !bounds.intersectsBounds(feaBounds)) {
                continue;
            }

            //缓存字段
            var fields = feature.FID + "_zoom_" + cmZoom.toString();

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
     * @function Zondy.Source.GeoFeatureSource.prototype.createThematicFeature
     * @description 创建专题要素。
     * @param {Object} feature - 要素对象。
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

    canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
        return ThemeSource.prototype.canvasFunctionInternal_.apply(this, arguments);
    }

    /**
     * @function Zondy.Source.GeoFeatureSource.prototype.clearCache
     * @description 清除缓存。
     */
    clearCache() {
        this.cache = {};
        this.cacheFields = [];
    }

    /**
     * @function Zondy.Source.GeoFeatureSource.prototype.clear
     * @description  清除的内容包括数据（features）、专题要素、缓存。
     */
    clear() {
        this.renderer.clearAll();
        this.renderer.refresh();
        this.removeAllFeatures();
        this.clearCache();
    }

    /**
     * @function Zondy.Source.GeoFeatureSource.prototype.getCacheCount
     * @description 获取当前缓存数量。
     * @returns {number} 返回当前缓存数量。
     */
    getCacheCount() {
        return this.cacheFields.length;
    }

    /**
     * @function Zondy.Source.GeoFeatureSource.prototype.setMaxCacheCount
     * @param {number} cacheCount - 缓存总数。
     * @description 设置最大缓存条数。
     */
    setMaxCacheCount(cacheCount) {
        if (!isNaN(cacheCount)) {
            this.maxCacheCount = cacheCount;
            this.isCustomSetMaxCacheCount = true;
        }
    }

    /**
     * @function Zondy.Source.GeoFeatureSource.prototype.setMaxCacheCount
     * @param {number} featureID - 要素 ID。
     * @description 通过 FeatureID 获取 feature 关联的所有图形。如果不传入此参数，函数将返回所有图形。
     */
    getShapesByFeatureID(featureID) {
        var list = [];
        var shapeList = this.renderer.getAllShapes();
        if (!featureID) {
            return shapeList
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

export {GeoFeatureSource};
Zondy.Source.GeoFeatureSource = GeoFeatureSource;