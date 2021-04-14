import {Zondy} from '../../service/common/Base';
import {L} from 'leaflet';
import {modifyDOMElement} from "../../service/common/Util";
import {LevelRenderer} from '../../common/overlay/levelRender/LevelRenderer';

/**
 * @class Zondy.Map.ThemeLayer
 * @classdesc 专题图层基类，调用建议使用其子类实现类。
 * @extends {L.Layer}
 * @param {string} name - 专题图图层名称。
 * @param {Object} options - 可选参数。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {number} [options.opacity=1] - 图层透明度。
 * @fires Zondy.Map.ThemeLayer#featuresremoved
 */
var ThemeLayer = window.L.Layer.extend({

    options: {
        name: null,
        opacity: 1,
        // {Array} 专题要素事件临时存储，临时保存图层未添加到 map 前用户添加的事件监听，待图层添加到 map 后把这些事件监听添加到图层上，清空此图层。
        //这是一个二维数组，组成二维数组的每个一维数组长度为 2，分别是 event, callback。
        TFEvents: null
    },

    initialize: function (name, options) {
        window.L.Util.setOptions(this, options);
        this.options.name = name;
        this.features = [];
        this.TFEvents = options && options.TFEvents ? options.TFEvents : [];
        this.levelRenderer = new LevelRenderer();
        this.movingOffset = [0, 0];
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.getEvents
     * @description 获取图层事件。
     * @returns {Object} 返回图层支持的事件。
     */
    getEvents: function () {
        var me = this;
        var events = {
            zoomend: me._reset,
            moveend: me._reset,
            resize: me._resize
        };
        if (this._map._zoomAnimated) {
            events.zoomanim = me._zoomAnim;
        }
        return events;
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.onRemove
     * @description 删除某个地图。
     * @param {L.Map} map - 要删除的地图。
     */
    onRemove: function (map) {
        var me = this;
        window.L.DomUtil.remove(me.container);
        map.off("mousemove", me.mouseMoveHandler);
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.onAdd
     * @description 添加专题图。
     * @param {L.Map} map - 要添加的地图。
     * @private
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

        me.update();
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.addFeatures
     * @description 向专题图图层中添加数据。
     * @param {Object} features - 待转要素。
     */
    addFeatures: function (features) { // eslint-disable-line no-unused-vars
        //子类实现此方法
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.redrawThematicFeatures
     * @description 抽象方法，可实例化子类必须实现此方法。
     * @param {L.bounds} bounds - 重绘专题要素范围。
     */
    redrawThematicFeatures: function (bounds) { // eslint-disable-line no-unused-vars
        //子类必须实现此方法
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.destroyFeatures
     * @description 销毁要素。
     * @param {Array.<Zondy.Feature.Vector>} features - 将被销毁的要素。
     */
    destroyFeatures: function (features) {
        if (features === undefined) {
            features = this.features;
        }
        if (!features) {
            return;
        }
        this.removeFeatures(features);
        for (var i = features.length - 1; i >= 0; i--) {
            features[i].destroy();
        }
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.removeFeatures
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
     * @param {Array.<Zondy.Feature.Vector>} features - 将被删除的要素。
     */
    removeFeatures: function (features) {
        var me = this;
        if (!features || features.length === 0) {
            return;
        }
        if (features === me.features) {
            return me.removeAllFeatures();
        }
        if (!(window.L.Util.isArray(features))) {
            features = [features];
        }

        var featuresFailRemoved = [];

        for (var i = features.length - 1; i >= 0; i--) {
            var feature = features[i];

            //如果我们传入的feature在features数组中没有的话，则不进行删除，
            //并将其放入未删除的数组中。
            var findex = window.L.Util.indexOf(me.features, feature);

            if (findex === -1) {
                featuresFailRemoved.push(feature);
                continue;
            }
            me.features.splice(findex, 1);
        }

        var drawFeatures = [];
        for (var hex = 0, len = me.features.length; hex < len; hex++) {
            feature = me.features[hex];
            drawFeatures.push(feature);
        }
        me.features = [];
        me.addFeatures(drawFeatures);
        //绘制专题要素
        if (me.renderer) {
            if (me._map) {
                me.redrawThematicFeatures(me._map.getBounds());
            } else {
                me.redrawThematicFeatures();
            }
        }

        var succeed = featuresFailRemoved.length === 0;
        /**
         * @event Zondy.Map.ThemeLayer#featuresremoved
         * @description 删除的要素成功之后触发。
         * @property {Array.<Zondy.Feature.Vector>} features - 事件对象。
         * @property {boolean} succeed - 要输是否删除成功，true 为删除成功，false 为删除失败。
         */
        me.fire("featuresremoved", {
            features: featuresFailRemoved,
            succeed: succeed
        });
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures: function () {
        var me = this;
        if (me.renderer) {
            me.renderer.clear();
        }
        me.features = [];
        me.fire("featuresremoved", {
            features: [],
            succeed: true
        });
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.getFeatures
     * @description 查看当前图层中的有效数据。
     * @returns {Array} 返回图层中的有效数据。
     */
    getFeatures: function () {
        var me = this;
        var len = me.features.length;
        var clonedFeatures = new Array(len);
        for (var i = 0; i < len; ++i) {
            clonedFeatures[i] = me.features[i];
        }
        return clonedFeatures;
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.getFeatureBy
     * @description 在专题图的要素数组 features 里面遍历每一个 feature，当 feature[property] === value 时，返回此 feature（并且只返回第一个）。
     * @param {string} property - 要的某个属性名。
     * @param {string} value - 对应属性名得值。
     */
    getFeatureBy: function (property, value) {
        var me = this;
        var feature = null;
        for (var id in me.features) {
            if (me.features[id][property] !== value) {
                continue;
            }
            feature = me.features[id];
            break;
        }
        return feature;
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.getFeatureById
     * @description 通过给定一个 ID，返回对应的矢量要素,如果不存在则返回 null。
     * @param {number} featureId - 要素 ID。
     */
    getFeatureById: function (featureId) {
        return this.getFeatureBy('FID', featureId);
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.getFeaturesByAttribute
     * @description 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
     * @param {string} attrName - key 值。
     * @param {string} attrValue - value 值。
     * @returns {Array} 返回所有匹配的要素数组。
     */
    getFeaturesByAttribute: function (attrName, attrValue) {
        var me = this,
            feature,
            foundFeatures = [];
        for (var id in me.features) {
            feature = me.features[id];
            if (feature && feature.attributes && (feature.attributes[attrName] === attrValue)) {
                foundFeatures.push(feature);
            }
        }
        return foundFeatures;
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.update
     * @description 更新图层。
     * @param {L.bounds} bounds - 图层范围。
     */
    update: function (bounds) {
        var mapOffset = this._map.containerPointToLayerPoint([0, 0]);
        window.L.DomUtil.setPosition(this.container, mapOffset);

        var me = this;
        //  var bounds = me._map.getBounds();
        //  var topLeft = me._map.latLngToLayerPoint(bounds.getNorthWest());
        //  var mapOffset = [parseInt(topLeft.x, 10) || 0, parseInt(topLeft.y, 10) || 0]
        // // var offsetLeft = parseInt(me._map.getContainer().style.left, 10);
        // // offsetLeft = -Math.round(offsetLeft);
        //  //var offsetTop = parseInt(me._map.getContainer().style.top, 10);
        //  //offsetTop = -Math.round(offsetTop);
        //  me.container.style.left = mapOffset[0] + 'px';
        //  me.container.style.top = mapOffset[1] + 'px';

        //绘制专题要素
        if (me.renderer) {
            me.redrawThematicFeatures(bounds);
        }

        if (me.currentMousePosition) {
            me.currentMousePosition = window.L.point(
                me.currentMousePosition.x - me.movingOffset[0],
                me.currentMousePosition.y - me.movingOffset[1]);
        }
        me.movingOffset = [0, 0];
        me._zoom = me._map.getZoom();
        me._center = me._map.getCenter();
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.setOpacity
     * @description 设置图层的不透明度,取值 [0-1] 之间。
     * @param {number} opacity - 不透明度。
     */
    setOpacity: function (opacity) {
        var me = this;
        if (opacity === me.options.opacity) {
            return;
        }
        if (!isNaN(opacity)) {
            me.options.opacity = opacity;
            me._updateOpacity();
        }

    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.redraw
     * @description 重绘该图层。
     * @returns {boolean} 返回是否重绘成功。
     */
    redraw: function () {
        var me = this;
        if (!me.renderer) {
            return false;
        }
        if (me._map) {
            me.redrawThematicFeatures(me._map.getBounds());
        } else {
            me.redrawThematicFeatures();
        }
        return true;
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.on
     * @description 添加专题要素事件监听。添加专题要素事件监听。
     * @param {Event} event - 监听事件。
     * @param {Function} callback - 回调函数。
     * @param {string} context - 信息。
     */
    on: function (event, callback, context) { // eslint-disable-line no-unused-vars
        if (this.renderer) {
            this.renderer.on(event, callback);
        } else {
            window.L.Layer.prototype.on.call(this, event, callback);
        }
        return this;
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.off
     * @description 移除专题要素事件监听。
     * @param {Event} event - 监听事件。
     * @param {Function} callback - 回调函数。
     * @param {string} context -  信息。
     */
    off: function (event, callback, context) { // eslint-disable-line no-unused-vars
        var me = this;
        if (me.renderer) {
            me.renderer.un(event, callback);
        } else {
            window.L.Layer.prototype.off.call(this, event, callback);
        }
        return this;
    },
    fire: function (type, data, propagate) { // eslint-disable-line no-unused-vars
        if (this.renderer) {
            this.renderer.trigger(type, data);
        }
        window.L.Layer.prototype.fire.call(this, type, data, propagate);
        return this;
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.addTFEvents
     * @description 将图层添加到地图上之前用户要求添加的事件监听添加到图层。
     * @private
     */
    addTFEvents: function () {
        var me = this;
        var tfEs = me.TFEvents;
        var len = tfEs.length;

        for (var i = 0; i < len; i++) {
            me.renderer.on(tfEs[i][0], tfEs[i][1]);
        }
    },

    /**
     * @function Zondy.Map.ThemeLayer.prototype.getLocalXY
     * @description 地理坐标转为像素坐标。
     * @param {Array} coordinate
     */
    getLocalXY: function (coordinate) {
        if (!this._map) {
            return coordinate;
        }
        var coor = coordinate;
        if (window.L.Util.isArray(coordinate)) {
            coor = window.L.point(coordinate[0], coordinate[1]);
        } else if (!(coordinate instanceof window.L.Point)) {
            if (coordinate instanceof Zondy.LonLat) {
                coor = window.L.point(coordinate.lon, coordinate.lat);
            } else {
                coor = window.L.point(coordinate.x, coordinate.y);
            }
        }
        var point = this._map.latLngToContainerPoint(this._map.options.crs.unproject(coor));
        return [point.x, point.y];
    },

    _initContainer: function () {
        var parentContainer = this.getPane();
        var animated = this._map.options.zoomAnimation && window.L.Browser.any3d;
        var className = this.options.name || "themeLayer";
        className += ' leaflet-layer leaflet-zoom-' + (animated ? 'animated' : 'hide');
        this.container = window.L.DomUtil.create("div", className, parentContainer);

        var originProp = window.L.DomUtil.testProp(['transformOrigin', 'WebkitTransformOrigin', 'msTransformOrigin']);
        this.container.style[originProp] = '50% 50%';

        this.container.style.position = "absolute";
        this.container.style.zIndex = 200;
    },


    _zoomAnim: function (e) {
        var scale = this._map.getZoomScale(e.zoom),
            offset = this._map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

        if (window.L.DomUtil.setTransform) {
            window.L.DomUtil.setTransform(this.container, offset, scale);

        } else {
            this.container.style[window.L.DomUtil.TRANSFORM] = window.L.DomUtil.getTranslateString(offset) + ' scale(' + scale + ')';
        }
    },

    _updateOpacity: function () {
        var me = this;
        modifyDOMElement(me.container, null, null, null, null, null, null, me.options.opacity);
        if (me._map !== null) {
            /**
             * @event Zondy.Map.ThemeLayer#changelayer
             * @description 图层属性改变之后触发。
             * @property {Object} layer - 图层。
             * @property {string} property - 图层属性。
             */
            me._map.fire("changelayer", {
                layer: me,
                property: "opacity"
            });
        }
    },

    //缩放移动重绘
    _reset: function () {
        var me = this;
        var latLngBounds = me._map.getBounds();
        me.update(latLngBounds);
        var size = me._map.getSize();
        var mapOffset = this._map.containerPointToLayerPoint([0, 0]);
        window.L.DomUtil.setPosition(this.container, mapOffset);


        if (parseFloat(me.container.width) !== parseFloat(size.x)) {
            me.container.width = size.x + 'px';
        }
        if (parseFloat(me.container.height) !== parseFloat(size.y)) {
            me.container.height = size.y + 'px';
        }
        me.redraw();
    },

    //通知渲染器的尺寸变化
    _resize: function () {
        var me = this;
        var newSize = me._map.getSize();
        me.container.style.width = newSize.x + "px";
        me.container.style.height = newSize.y + "px";
        me.renderer.resize();
    }
});
export {ThemeLayer};
Zondy.Map.ThemeLayer = ThemeLayer;