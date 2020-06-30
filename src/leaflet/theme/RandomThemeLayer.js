import {Zondy} from '../../service/common/Base';
import {L} from 'leaflet';
import {copyAttributesWithClip} from '../../service/common/Util';
import {GeoFeatureThemeLayer} from './GeoFeatureThemeLayer';
import {ThemeLayer} from './ThemeLayer';
import {Rectangle} from '../../service/common/Rectangle';

/**
 * @class Zondy.Map.randomThemeLayer
 * @classdesc 随机专题图。
 * @description 随机专题图对数据（<{@link Zondy.Feature.Vector}>）属性字段（attributes）的属性值进行分段，使用不同的颜色或符号（线型、填充）渲染不同范围段的属性值。
 * 随机专题图一般用来反映连续分布现象的数量或程度特征，如降水量的分布，土壤侵蚀强度的分布等。
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
var RandomThemeLayer = GeoFeatureThemeLayer.extend({

    /**
     * @function Zondy.Map.RandomThemeLayer.prototype.initialize
     * @description 初始化。
     * @param {string} name - 专题图名。
     * @param {Object} options - 需要设置的参数对象。
     */
    initialize: function (name, options) {
        GeoFeatureThemeLayer.prototype.initialize.call(this, name, options);
        //{Array<Zondy.Map.ThemeStyle>} 图层中专题要素的样式
        this.style = [];
        //{String} 用于指定专题要素样式的属性字段名称。
        // 此属性字段是要用户数据（feature） attributes 中包含的字段，且字段对应的值的类型必须是数值型。使用标签分组显示还需要设置 styleGroups 属性。
        this.keepStyle = true;
    },

    /**
     * @function Zondy.Map.randomThemeLayer.prototype.getColor
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
     * @function Zondy.Map.randomThemeLayer.prototype.getStyleByData
     * @return {Array<Zondy.Map.ThemeStyle>} 专题要素的 Style
     */
    getStyleByData: function () {
        var me = this;
        var style = copyAttributesWithClip({}, me.style);
        style.fillColor = me.getColor();
        return style;
    },

    /**
     * @function Zondy.Map.randomThemeLayer.prototype.onAdd
     * @description 添加专题图
     * @param map - {L.map} 要添加的地图
     */
    onAdd: function (map) {
        var me = this;


        me.map = me._map = map;
        me._initContainer();
        if (!me.levelRenderer) {
            map.removeLayer(me);
            return;
        }
        //初始化渲染器
        var size = map.getSize();
        me.container.style.width = size.x + "px";
        me.container.style.height = size.y + "px";
        me._updateOpacity();

        me.renderer = me.levelRenderer.init(me.container);
        me.renderer.clear();
        if (me.features && me.features.length > 0) {
            me._reset();
        }

        //处理用户预先（在图层添加到 map 前）监听的事件
        me.addTFEvents();
        me.mouseMoveHandler = function (e) {
            var xy = e.layerPoint;
            me.currentMousePosition = window.L.point(xy.x + me.movingOffset[0], xy.y + me.movingOffset[1]);
        };
        map.on("mousemove", me.mouseMoveHandler);
        me.zoomstartHandler = function (e) {
            me.keepStyle = false;
            // alert('start');
        };
        map.on('zoomstart ', me.zoomstartHandler);
        me.zoomendHandler = function (e) {
            me.keepStyle = true;
            //alert('end');
        };
        map.on('zoomend', me.zoomendHandler);

        me.update();
    },

    /**
     * @function Zondy.Map.randomThemeLayer.prototype.redrawThematicFeatures
     * @description 重绘专题要素
     * @param bounds - {L.Bounds} 地图范围
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
            if (cache[fields] && me.keepStyle) {
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
            //console.log("total: %d ,current:%d", features.length,i);
        }

        me.renderer.render();

        //地图漫游后，重新高亮图形
        if (hoverFid && me.options.isHoverAble && me.options.isMultiHover) {
            var hShapes = this.getShapesByFeatureID(hoverFid);
            this.renderer.updateHoverShapes(hShapes);
        }
    },

    /**
     * @function Zondy.Map.randomThemeLayer.prototype.redraw
     * @description 重绘专题图
     */
    redraw: function () {
        if (!this.keepStyle) {
            this.clearCache();
        }
        return ThemeLayer.prototype.redraw.apply(this, arguments);
    }
});
export var randomThemeLayer = function (name, options) {
    return new RandomThemeLayer(name, options);
};

Zondy.Map.randomThemeLayer = randomThemeLayer;