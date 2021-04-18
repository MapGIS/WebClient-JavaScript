import {Zondy} from '../../service/common/Base';
import {L} from 'leaflet';
import {ThemeLayer} from './ThemeLayer';
import {ShapeFactory} from '../../common/overlay/feature/ShapeFactory';
import {ThemeVector} from '../../common/overlay/ThemeVector';
import {FeatureSet} from '../../service/common/FeatureSet';
import {Rectangle} from '../../service/common/Rectangle';

/**
 * @class Zondy.Map.GeoFeatureThemeLayer
 * @classdesc  地理几何专题要素型专题图层基类。此类型专题图的专题要素形状就是由 feature.geometry 决定。此类不建议直接实例化调用。
 * @extends Zondy.Map.ThemeLayer
 * @param {string} name - 专题图名。
 * @param {Object} options - 需要设置的参数对象。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {number} [options.opacity=1] - 图层透明度。
 * @param {number} [options.nodesClipPixel=2] - 节点抽稀像素距离。
 * @param {boolean} [options.isHoverAble=false] -  图形是否在 hover 时高亮。
 * @param {boolean} [options.isMultiHover=false] - 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面）。
 * @param {boolean} [options.isClickAble=true] - 图形是否可点击。
 * @param {boolean} [options.isAllowFeatureStyle=false] -  是否允许 feature 样式（style） 中的有效属性应用到专题图层。禁止对专题要素使用数据（feature）的 style。此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
 * @fires Zondy.Map.GeoFeatureThemeLayer#beforefeaturesadded
 */
var GeoFeatureThemeLayer = ThemeLayer.extend({

    options: {

        // {Number} 节点抽稀像素距离，默认值 2。
        nodesClipPixel: 2,

        //{Boolean} 图形是否在 hover 时高亮 ，默认值：false。
        isHoverAble: false,

        //{Boolean} 是否多图形同时高亮，用于高亮同一个数据对应的所有图形（如：多面），默认值：false。
        isMultiHover: false,

        // {Boolean} 图形是否可点击，默认 true
        isClickAble: true,
        //是否允许 feature 样式（style） 中的有效属性应用到专题图层。
        //默认值为： false，禁止对专题要素使用数据（feature）的 style。
        //此属性可强制将数据 feature 的 style 中有效属性应用到专题要素上，且拥有比图层 style 和 styleGroups 更高的优先级，使专题要素的样式脱离专题图层的控制。可以通过此方式实现对特殊数据（feature） 对应专题要素赋予独立 style。
        isAllowFeatureStyle: false
    },

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.initialize
     * @description 初始化。
     * @param {string} name - 专题图名。
     * @param {Object} options - 需要设置的参数对象。
     */
    initialize: function (name, options) {
        ThemeLayer.prototype.initialize.call(this, name, options);
        window.L.Util.setOptions(this, options);
        var me = this;
        me.cache = {};
        me.cacheFields = [];
        me.style = {};
        me.highlightStyle = {};
    },

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.addFeatures
     * @description 向专题图图层中添加数据。
     * @param {Object} features - 待填加的要素。
     */
    addFeatures: function (features) {
        var me = this;

        /**
         * @event Zondy.Map.GeoFeatureThemeLayer#beforefeaturesadded
         * @description 向专题图图层中添加数据之前触发。
         * @property {Object} features - 事件对象。
         */
        me.fire("beforefeaturesadded", {features: features});
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
        if (!me.isCustomSetMaxCacheCount) {
            me.maxCacheCount = me.features.length * 5;
        }

        if (!me.renderer) {
            return;
        }
        //绘制专题要素
        if (me._map) {
            me.redrawThematicFeatures(me._map.getBounds());
        } else {
            me.redrawThematicFeatures();
        }
    },

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.removeFeatures
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。参数中的 features 数组中的每一项，必须是已经添加到当前图层中的 feature。
     * @param {Object} features - 要删除的要素。
     */
    removeFeatures: function (features) { // eslint-disable-line no-unused-vars
        this.clearCache();
        ThemeLayer.prototype.removeFeatures.call(this, arguments);
    },

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures: function () {
        this.clearCache();
        ThemeLayer.prototype.removeAllFeatures.call(this, arguments);
    },

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素。
     *              此方法包含绘制专题要素的所有步骤，包含用户数据到专题要素的转换，抽稀，缓存等步骤。
     *              地图漫游时调用此方法进行图层刷新。
     * @param {L.bounds} bounds - 重绘的范围。
     */
    redrawThematicFeatures: function (bounds) {
        var me = this;
        //获取高亮专题要素对应的用户 id
        var hoverone = me.renderer.getHoverOne();
        var hoverFid = null;
        if (hoverone && hoverone.refDataID) {
            hoverFid = hoverone.refDataID;
        }
        if (bounds && bounds instanceof window.L.LatLngBounds) {
            var crs = this._map.options.crs;
            bounds = window.L.bounds(crs.project(bounds.getSouthWest()), crs.project(bounds.getNorthEast()));
            bounds = new Rectangle(bounds.min.x, bounds.min.y, bounds.max.x, bounds.max.y);
        }
        //清除当前所有可视元素
        me.renderer.clearAll();

        var features = me.features;
        var cache = me.cache;
        var cacheFields = me.cacheFields;
        var cmZoom = me._map.getZoom();

        var maxCC = me.maxCacheCount;

        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            var feaBounds = feature.bound;

            //剔除当前视图（地理）范围以外的数据
            if (bounds && !bounds.intersectsBounds(feaBounds)) {
                continue;
            }

            //缓存字段
            var fields = feature.FID + "_zoom_" + cmZoom.toString();
            if (cache[fields]) {
                cache[fields].updateAndAddShapes();
                continue;
            }

            var thematicFeature = me.createThematicFeature(features[i]);
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

        me.renderer.render();

        //地图漫游后，重新高亮图形
        if (hoverFid && me.options.isHoverAble && me.options.isMultiHover) {
            var hShapes = this.getShapesByFeatureID(hoverFid);
            this.renderer.updateHoverShapes(hShapes);
        }
    },

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.createThematicFeature
     * @description 创建专题要素。
     * @param {Object} feature - 要创建的要素。
     */
    createThematicFeature: function (feature) {
        var me = this;
        var style = me.getStyleByData(feature);
        //创建专题要素时的可选参数
        var options = {};
        options.nodesClipPixel = me.options.nodesClipPixel;
        options.isHoverAble = me.options.isHoverAble;
        options.isMultiHover = me.options.isMultiHover;
        options.isClickAble = me.options.isClickAble;
        options.highlightStyle = ShapeFactory.transformStyle(me.highlightStyle);

        //将数据转为专题要素（Vector）
        var thematicFeature = new ThemeVector(feature, me, ShapeFactory.transformStyle(style), options);

        //直接添加图形到渲染器
        for (var m = 0; m < thematicFeature.shapes.length; m++) {
            me.renderer.addShape(thematicFeature.shapes[m]);
        }

        return thematicFeature;
    },
    getStyleByData: function (feat) {
        //子类必须实现此方法
    },
    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.redraw
     * @description 重绘该图层。
     */
    redraw: function () {
        this.clearCache();
        return ThemeLayer.prototype.redraw.apply(this, arguments);
    },

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.clearCache
     * @description 清除缓存数据。
     */
    clearCache: function () {
        this.cache = {};
        this.cacheFields = [];
    },

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.clear
     * @description 清除的内容包括数据（features） 、专题要素、缓存。
     */
    clear: function () {
        var me = this;
        me.renderer.clearAll();
        me.renderer.refresh();
        me.removeAllFeatures();
        me.clearCache();
    },

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.getCacheCount
     * @description 获取当前缓存数量。
     * @returns {number} 返回当前缓存数量。
     */
    getCacheCount: function () {
        return this.cacheFields.length;
    },

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.setMaxCacheCount
     * @description 设置最大缓存数量。
     * @param {number} cacheCount - 最大缓存量。
     */
    setMaxCacheCount: function (cacheCount) {
        if (isNaN(cacheCount)) {
            return;
        }
        this.maxCacheCount = cacheCount;
        this.isCustomSetMaxCacheCount = true;
    },

    /**
     * @function Zondy.Map.GeoFeatureThemeLayer.prototype.getShapesByFeatureID
     * @description 通过 FeatureID 获取 feature 关联的所有图形。如果不传入此参数，函数将返回所有图形。
     * @param {number} featureID - 要素 ID。
     */
    getShapesByFeatureID: function (featureID) {
        var me = this,
            list = [],
            shapeList = me.renderer.getAllShapes();

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
});
export {GeoFeatureThemeLayer};
Zondy.Map.GeoFeatureThemeLayer = GeoFeatureThemeLayer;
