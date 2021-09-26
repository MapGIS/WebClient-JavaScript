import mapboxgl from '@mapgis/mapbox-gl';
import { Common } from '@mapgis/webclient-es6-service';

import { LevelRenderer } from './common/overlay/levelRender/LevelRenderer';

const { modifyDOMElement, isArray, indexOf, newGuid, Zondy } = Common;

/**
 * @class Zondy.Map.ThemeLayer
 * @classdesc 专题图基类。
 * @param {string} name - 专题图图层名。
 * @param {Object} options -可选参数。
 * @param {mapboxgl.Map} options.map - 当前 mapboxgl map 对象，将在下个版本弃用，请用 map.addLayer()方法添加图层。
 * @param {string} [options.id] - 专题图层 ID
 * @param {boolean} [options.loadWhileAnimating=true] - 是否实时重绘。
 * @param {boolean} [options.visibility=true] - 图层是否可见。
 * @param {number} [options.opacity=1] - 图层透明度。
 * @fires Zondy.Map.ThemeLayer#changelayer
 * @fires Zondy.Map.ThemeLayer#featuresremoved
 */
class ThemeLayer {
    constructor(name, opt_options) {
        var options = opt_options ? opt_options : {};
        /**
         * @member {string} Zondy.Map.ThemeLayer.prototype.name
         * @description 专题图图层名称。
         */
        this.name = name;

        /**
         * @member {string} [Zondy.Map.ThemeLayer.prototype.id]
         * @description 专题图图层 id。
         */
        this.id = options.id ? options.id : newGuid();
        /**
         * @member {float} [Zondy.Map.ThemeLayer.prototype.opacity=1]
         * @description 图层透明度。
         */
        this.opacity = options.opacity ? options.opacity : 1;

        /**
         * @member {boolean} [Zondy.Map.ThemeLayer.prototype.visibility=true]
         * @description 图层是否可见。
         */
        this.visibility = true;

        /**
         * @member {boolean} [Zondy.Map.ThemeLayer.prototype.loadWhileAnimating=true]
         * @description 是否实时重绘。(当绘制大数据量要素的情况下会出现卡顿，建议把该参数设为 false)。
         */
        this.loadWhileAnimating = options.loadWhileAnimating === undefined ? true : options.loadWhileAnimating;

        /**
         * @member {mapboxgl.Map} Zondy.Map.ThemeLayer.prototype.map
         * @description map 对象。
         */
        this.map = options.map ? options.map : null;

        this.features = [];
        this.TFEvents = [];

        //todo 保留之前创建图层同时添加到图层的用法，在下个版本遗弃
        if (this.map) {
            this.map.addLayer(this);
        }
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.onAdd
     * @description 向底图添加该图层。
     */
    onAdd(map) {
        this.map = map;
        this._createCanvasContainer();

        //处理用户预先（在图层添加到 map 前）监听的事件
        this.addTFEvents();
        this.map.on('resize', this.resizeEvent.bind(this));
        this.map.on('zoomstart', this.zoomStartEvent.bind(this));
        this.map.on('zoomend', this.zoomEndEvent.bind(this));
        this.map.on('rotatestart', this.rotateStartEvent.bind(this));
        this.map.on('rotate', this.rotateEvent.bind(this));
        this.map.on('rotateend', this.rotateEndEvent.bind(this));
        this.map.on('dragend', this.dragEndEvent.bind(this));
        this.map.on('movestart', this.moveStartEvent.bind(this));
        this.map.on('move', this.moveEvent.bind(this));
        this.map.on('moveend', this.moveEndEvent.bind(this));
        this.map.on('remove', this.removeFromMap.bind(this));

        this.refresh();
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.refresh
     * @description 强制刷新当前热点显示，在图层热点数组发生变化后调用，更新显示。
     */
    refresh() {
        if (this.features.length === 0) {
            return;
        }
        if (this.map) {
            this.redrawThematicFeatures(this.map.getBounds());
        }
    }

    _createCanvasContainer() {
        this.movingOffset = [0, 0];
        this.mapContainer = this.map.getCanvasContainer();
        this.div = document.createElement('div');
        this.div.id = this.id;
        this.div.style.position = 'absolute';
        var container = this.map.getCanvasContainer();
        var canvas = this.map.getCanvas();
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        this.div.style.width = canvas.style.width;
        this.div.style.height = canvas.style.height;
        this.div.className = 'themeLayer';
        this.div.width = parseInt(canvas.width);
        this.div.height = parseInt(canvas.height);
        container.appendChild(this.div);
        this.setOpacity(this.opacity);
        this.levelRenderer = new LevelRenderer();
        this.renderer = this.levelRenderer.init(this.div);
        this.renderer.clear();
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.destroyFeatures
     * @description 销毁某个要素。
     * @param {Zondy.Feature.Vector} features - 将被销毁的要素。
     */
    destroyFeatures(features) {
        var all = features === undefined;
        if (all) {
            features = this.features;
        }
        if (features) {
            this.removeFeatures(features);
            for (var i = features.length - 1; i >= 0; i--) {
                features[i].destroy();
            }
        }
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.setVisibility
     * @description 设置图层可见性，设置图层的隐藏，显示，重绘的相应的可见标记。
     * @param {boolean} [visibility] - 是否显示图层（当前地图的 resolution 在最大最小 resolution 之间）。
     */
    setVisibility(visibility) {
        if (visibility !== this.visibility) {
            this.visibility = visibility;
            this.display(visibility);
            this.redrawThematicFeatures(this.map.getBounds());
        }
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.display
     * @description 临时隐藏或者显示图层。通过对 CSS 控制产生即时效果，重新渲染失效。一般用 setVisibility 方法来动态控制图层的显示和隐藏。
     * @param {boolean} [display] - 是否显示图层。
     */
    display(display) {
        this.div.style.display = display ? 'block' : 'none';
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.setOpacity
     * @description 设置图层的不透明度,取值[0-1]之间。
     * @param {number} [opacity] - 不透明度。
     */
    setOpacity(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            var element = this.div;
            modifyDOMElement(element, null, null, null, null, null, null, opacity);

            if (this.map !== null) {
                /**
                 * @event Zondy.Map.ThemeLayer#changelayer
                 * @description 图层属性改变之后触发。
                 * @property {Object} layer - 图层。
                 * @property {string} property - 被改变的属性。
                 */
                mapboxgl.Evented.prototype.fire('changelayer', {
                    layer: this,
                    property: 'opacity'
                });
            }
        }
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.addFeatures
     * @param {Object} features - 待添加要素。
     * @description 抽象方法，可实例化子类必须实现此方法。向专题图图层中添加数据 ,
     */
    addFeatures(features) {
        // eslint-disable-line no-unused-vars
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.removeFeatures
     * @param {Array.<Zondy.Feature.Vector>} features - 要删除 feature 的数组。
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。
     *              参数中的 features 数组中的每一项，必须是已经添加到当前图层中的 feature，
     *              如果无法确定 feature 数组，则可以调用 removeAllFeatures 来删除所有 feature。
     *              如果要删除的 feature 数组中的元素特别多，推荐使用 removeAllFeatures，
     *              删除所有 feature 后再重新添加。这样效率会更高。
     */
    removeFeatures(features) {
        if (!features || features.length === 0) {
            return;
        }
        if (features === this.features) {
            return this.removeAllFeatures();
        }
        if (!isArray(features)) {
            features = [features];
        }
        var featuresFailRemoved = [];
        for (var i = features.length - 1; i >= 0; i--) {
            var feature = features[i];
            //如果我们传入的feature在features数组中没有的话，则不进行删除，
            //并将其放入未删除的数组中。
            var findex = indexOf(this.features, feature);
            if (findex === -1) {
                featuresFailRemoved.push(feature);
                continue;
            }
            this.features.splice(findex, 1);
        }
        var drawFeatures = [];
        for (var hex = 0, len = this.features.length; hex < len; hex++) {
            feature = this.features[hex];
            drawFeatures.push(feature);
        }
        this.features = [];
        this.addFeatures(drawFeatures);
        //绘制专题要素
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getBounds());
        }
        var succeed = featuresFailRemoved.length === 0 ? true : false;
        /**
         * @event Zondy.Map.ThemeLayer#featuresremoved
         * @description 要素删除之后触发。
         * @property {Array.<Zondy.Feature.Vector>} features - 未被成功删除的要素。
         * @property {boolean} succeed - 删除成功与否。
         */
        mapboxgl.Evented.prototype.fire('featuresremoved', {
            features: featuresFailRemoved,
            succeed: succeed
        });
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures() {
        if (this.renderer) {
            this.renderer.clear();
        }
        this.features = [];
        mapboxgl.Evented.prototype.fire('featuresremoved', {
            features: [],
            succeed: true
        });
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.getFeatures
     * @description 查看当前图层中的有效数据。
     * @returns {Zondy.Feature.Vector} 用户加入图层的有效数据。
     */
    getFeatures() {
        var len = this.features.length;
        var clonedFeatures = new Array(len);
        for (var i = 0; i < len; ++i) {
            clonedFeatures[i] = this.features[i];
        }
        return clonedFeatures;
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.getFeatureBy
     * @description 在专题图的要素数组 features 里面遍历每一个 feature，当 feature[property] === value 时，
     *              返回此 feature（并且只返回第一个）。
     * @param {string} property - feature 的某个属性名称。
     * @param {string} value - property 所对应的值。
     * @returns {Zondy.Feature.Vector} 第一个匹配属性和值的矢量要素。
     */
    getFeatureBy(property, value) {
        var feature = null;
        for (var id in this.features) {
            if (this.features[id][property] === value) {
                feature = this.features[id];
                break;
            }
        }
        return feature;
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.getFeatureById
     * @description 通过给定一个 id，返回对应的矢量要素。
     * @param {string} featureId - 矢量要素的属性 id。
     * @returns {Zondy.Feature.Vector} 对应 id 的 feature，如果不存在则返回 null。
     */
    getFeatureById(featureId) {
        return this.getFeatureBy('FID', featureId);
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.getFeaturesByAttribute
     * @description 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
     * @param {string} attrName - 属性的 key。
     * @param {string} attrValue - 矢量要素的属性 id。
     * @returns {Array.<Zondy.Feature.Vector>} 一个匹配的 feature 数组。
     */
    getFeaturesByAttribute(attrName, attrValue) {
        var feature,
            foundFeatures = [];
        for (var id in this.features) {
            feature = this.features[id];
            if (feature && feature.attributes) {
                if (feature.attributes[attrName] === attrValue) {
                    foundFeatures.push(feature);
                }
            }
        }
        return foundFeatures;
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.redrawThematicFeatures
     * @description 抽象方法，可实例化子类必须实现此方法。重绘专题要素。
     * @param {mapboxgl.LngLatBounds} extent - 重绘的范围。
     */
    redrawThematicFeatures(extent) {
        // eslint-disable-line no-unused-vars
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.on
     * @description 添加专题要素事件监听。添加专题要素事件监听。
     * @param {Event} event - 监听事件。
     * @param {function} callback - 回调函数。
     * @param {string} context - 信息。
     */
    on(event, callback, context) {
        // eslint-disable-line no-unused-vars
        if (this.renderer) {
            this.renderer.on(event, callback);
        } else {
            this.map.on(event, callback);
        }
        return this;
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.off
     * @description 移除专题要素事件监听。
     * @param {Event} event - 监听事件。
     * @param {function} callback - 回调函数。
     * @param {string} context - 信息。
     */
    off(event, callback, context) {
        // eslint-disable-line no-unused-vars
        var me = this;
        if (me.renderer) {
            me.renderer.off(event, callback);
        } else {
            this.map.off(event, callback);
        }
        return this;
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.addTFEvents
     * @description 将图层添加到地图上之前用户要求添加的事件监听添加到图层。
     * @private
     */
    addTFEvents() {
        var tfEs = this.TFEvents;
        var len = tfEs.length;
        for (var i = 0; i < len; i++) {
            this.renderer.on(tfEs[i][0], tfEs[i][1]);
        }
    }

    WebMercator2lonLat(cx, cy) {
        var x = (cx / 20037508.34) * 180;
        var y = (cy / 20037508.34) * 180;
        y = (180 / Math.PI) * (2 * Math.atan(Math.exp((y * Math.PI) / 180)) - Math.PI / 2);
        return [x, y];
    }

    lonLat2WebMercator(wx, wy) {
        var x = (wx * 20037508.34) / 180;
        var y = Math.log(Math.tan(((90 + wy) * Math.PI) / 360)) / (Math.PI / 180);
        y = (y * 20037508.34) / 180;
        return {
            x: x,
            y: y
        };
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.getLocalXY
     * @description 地理坐标转为像素坐标。
     * @param {Object} [coordinate] - 坐标位置。
     */
    getLocalXY(coordinate) {
        var pixelP,
            map = this.map;
        var tempPoint = null;
        if (isArray(coordinate)) {
            // coordinate = this.WebMercator2lonLat(coordinate[0], coordinate[1]);
            coordinate = new mapboxgl.LngLat(coordinate[0], coordinate[1]);
            tempPoint = map.project(coordinate);
            pixelP = [tempPoint.x, tempPoint.y];
        }
        return pixelP;
    }

    moveEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.div.style.transform = '';
        this.redrawThematicFeatures(this.map.getBounds());
        this._show();
    }

    moveStartEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.startPitch = this.map.getPitch();
        this.startBearing = this.map.getBearing();
        var startMovePoint = this.map.project(new mapboxgl.LngLat(0, 0));
        this.startMoveX = startMovePoint.x;
        this.startMoveY = startMovePoint.y;
    }

    moveEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            this.redrawThematicFeatures(this.map.getBounds());
            return;
        }
        if (this.rotating || this.zooming) {
            return;
        }
        if (this.map.getPitch() !== 0) {
            this._hide();
        }
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        var tPitch = this.map.getPitch() - this.startPitch;
        var tBearing = -this.map.getBearing() + this.startBearing;
        // var endMovePoint = this.map.project(this.WebMercator2lonLat(0, 0));
        var endMovePoint = this.map.project(new mapboxgl.LngLat(0, 0));
        var tMoveX = endMovePoint.x - this.startMoveX;
        var tMoveY = endMovePoint.y - this.startMoveY;
        this.div.style.transform =
            'rotateX(' + tPitch + 'deg)' + ' rotateZ(' + tBearing + 'deg)' + ' translate3d(' + tMoveX + 'px, ' + tMoveY + 'px, 0px)';
    }

    zoomStartEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.zooming = true;
        this._hide();
    }

    zoomEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.zooming = false;
        this._show();
    }

    rotateStartEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.rotating = true;
    }

    rotateEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        if (this.map.getPitch() !== 0) {
            this._hide();
        }
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        var tPitch = this.map.getPitch() - this.startPitch;
        var tBearing = -this.map.getBearing() + this.startBearing;
        this.div.style.transform = 'rotateX(' + tPitch + 'deg)' + ' rotateZ(' + tBearing + 'deg)';
    }

    rotateEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.rotating = false;
        this._show();
    }

    dragEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this._hide();
    }

    resizeEvent() {
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        var canvas = this.map.getCanvas();
        this.div.style.width = canvas.style.width;
        this.div.style.height = canvas.style.height;
        this.div.width = parseInt(canvas.width);
        this.div.height = parseInt(canvas.height);
        this.renderer.resize();
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.removeFromMap
     * @description 移除图层。
     */
    removeFromMap() {
        this.mapContainer.removeChild(this.div);
        this.removeAllFeatures();
    }

    /**
     * @function Zondy.Map.ThemeLayer.prototype.moveTo
     * @description 将图层移动到某个图层之前。
     * @param {string} layerID - 待插入的图层 ID。
     * @param {boolean} [before=true] - 是否将本图层插入到图层 id 为 layerID 的图层之前(如果为 false 则将本图层插入到图层 id 为 layerID 的图层之后)。
     */
    moveTo(layerID, before) {
        const layer = document.getElementById(this.div.id);
        before = before !== undefined ? before : true;
        if (before) {
            const beforeLayer = document.getElementById(layerID);
            if (layer && beforeLayer) {
                beforeLayer.parentNode.insertBefore(layer, beforeLayer);
            }
            return;
        }
        const nextLayer = document.getElementById(layerID);
        if (layer) {
            if (nextLayer.nextSibling) {
                nextLayer.parentNode.insertBefore(layer, nextLayer.nextSibling);
                return;
            }
            nextLayer.parentNode.appendChild(layer);
        }
    }

    _hide() {
        this.renderer.painter.root.style.display = 'none';
    }

    _show() {
        this.renderer.painter.root.style.display = 'block';
    }
}

export { ThemeLayer };
Zondy.Map.ThemeLayer = ThemeLayer;
