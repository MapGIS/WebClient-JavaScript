import L from "leaflet";
import '../core/Base';
import {
    MapvBaseLayer
} from './mapv/MapvBaseLayer';
// * @class L.zondy.MapvLayer 
/**
 * @origin author kyle / http://nikai.us/
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class module:客户端可视化.MapvLayer
 * @classdesc 基于leaflet的Layer对象进行的拓展
 * @param map - {Object} 传入的leaflet的地图对象
 * @param dataset - {MapvDataSet} 传入的mapv的属性。 <br>
 * @param mapvoption - {MapvOption} 可选参数。<br>
 * @param options - {Object} L.Util.setOptions(this, options);只做额外增加的字段作用<br>
 * @see https://github.com/huiyan-fe/mapv/blob/master/API.md
 * @example
 * var options = {
      size: 13,
      gradient: {
        0.25: "rgb(0,0,255)",
        0.55: "rgb(0,255,0)",
        0.85: "yellow",
        1.0: "rgb(255,0,0)"
      },
      max: 60,
      animation: {
        type: 'time',
        stepsRange: {
          start: 0,
          end: 100
        },
        trails: 10,
        duration: 4,
      },
      draw: 'heatmap'
    }
    var mapvLayer = new L.zondy.MapvLayer(map, dataSet, options).addTo(map);
 */
export var MapvLayer = L.Layer.extend({

    initialize: function (map, dataset, mapvoption, options) {
        //----------------------------------------------
        //此处的三个参数仅仅是对百度的封装，只做参数传递作用
        this.map = map;
        this.dataset = dataset || {};
        this.mapvoption = mapvoption;
        //----------------------------------------------

        options = options || {};
        //this.project = this._project.bind(this);
        this.render = this.render.bind(this);
        L.Util.setOptions(this, options);
        this._canvas = this._createCanvas();

        L.stamp(this);
        // backCanvas for zoom animation
        //this._backCanvas = this._createCanvas();
        //this._ctx = this._canvas.getContext('2d');
        /*  
         this.currentAnimationFrame = -1;
         this.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
             window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                 return window.setTimeout(callback, 1000 / 60);
             };
         this.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
             window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || function (id) {
                 clearTimeout(id);
             }; 
         */
        //下面5个是leaflet专属事件,clickEvent和mousemoveEvent是mapv内部自带的方法不放出来
        this.innerMoveStartEvent = this.moveStartEvent.bind(this);
        this.innerMoveEndEvent = this.moveEndEvent.bind(this);
        this.innnerZoomstart = this.zoomStartEvent.bind(this);
        this.innerViewreset = this.viewresetEvent.bind(this);
        this.innerResize = this.resizeEvent.bind(this);
    },

    /**
     * 增加数据
     * @function L.zondy.MapvLayer.prototype.addData
     * 
     * @param data - {Array} 数据.
     * @param options - {Object} 只做额外增加的字段作用
     */
    addData: function (data, options) {
        this.mapvBaseLayer.addData(data, options);
    },

    /**
     * 更新数据
     * @function L.zondy.MapvLayer.prototype.addData
     * 
     * @param data - {Array} 数据.
     * @param options - {Object} 只做额外增加的字段作用
     */
    updateData: function (data, options) {
        this.mapvBaseLayer.updateData(data, options);
    },

    initDevicePixelRatio: function () {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    },

    _createCanvas: function () {
        var canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = this.options.zIndex || 100;

        var size = this.map.getSize();
        canvas.width = size.x;
        canvas.height = size.y;
        canvas.style.width = size.x + 'px';
        canvas.style.height = size.y + 'px';

        // var className = 'leaflet-tile-container leaflet-zoom-animated';
        // canvas.setAttribute('class', className);
        var devicePixelRatio = this.devicePixelRatio;
        canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
        if (this.mapvoption.context == '2d') {
            canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
        }
        return canvas;
    },

    onAdd: function (map) {
        // add container with the canvas to the tile pane
        // the container is moved in the oposite direction of the 
        // map pane to keep the canvas always in (0, 0)
        var tilePane = this.getPane();
        var _container = L.DomUtil.create('div', 'leaflet-layer', tilePane);
        _container.appendChild(this._canvas);
        //_container.appendChild(this._backCanvas);
        //this._backCanvas.style.display = 'none';
        //tilePane.appendChild(_container);

        this._container = _container;

        this.mapvBaseLayer = new MapvBaseLayer(map, this.dataset, this.mapvoption, this);
        this.bindEvent();

        if (this.options.tileLoader) {
            this._initTileLoader();
        }

        this._reset();
        this.fire("loaded");
    },

    bindEvent: function () {
        var map = this.map;
        map.on('movestart', this.innerMoveStartEvent);
        map.on('moveend', this.innerMoveEndEvent);
        map.on('zoomstart', this.innnerZoomstart);
        map.on('viewreset', this.innerViewreset);
        map.on('resize ', this.innerResize);
        this.mapvBaseLayer.bindEvent();
    },

    unbindEvent: function () {
        var map = this.map;
        map.off('movestart', this.innerMoveStartEvent);
        map.off('moveend', this.innerMoveEndEvent);
        map.off('zoomstart', this.innnerZoomstart);
        map.off('viewreset', this.innerViewreset);
        map.off('resize ', this.innerResize);
        this.removeAllData();
        this.mapvBaseLayer.unbindEvent();
    },

    moveStartEvent: function () {
        this.mapvBaseLayer.animatorMovestartEvent();
        this._unvisiable();
    },

    moveEndEvent: function () {
        this.mapvBaseLayer.animatorMoveendEvent();
        this._reset();
        this._visiable();
    },

    zoomStartEvent: function () {
        this._unvisiable();
    },

    viewresetEvent: function () {
        this._reset();
        this._visiable();
    },

    resizeEvent: function () {
        this._reset();
        this._visiable();
    },

    _animateZoom: function (e) {
        if (!this._animating) {
            this._animating = true;
        }
        /* var back = this._backCanvas;
    
          back.width = this._canvas.width;
          back.height = this._canvas.height;
    
          // paint current canvas in back canvas with trasnformation
          var pos = this._canvas._leaflet_pos || { x: 0, y: 0 };
          back.getContext('2d').drawImage(this._canvas, 0, 0);
    
          // hide original
          this._canvas.style.display = 'none';
          back.style.display = 'block';
          var map = this._map;
          var scale = map.getZoomScale(e.zoom);
          var newCenter = map._latLngToNewLayerPoint(map.getCenter(), e.zoom, e.center);
          var oldCenter = map._latLngToNewLayerPoint(e.center, e.zoom, e.center);
    
          var origin = {
            x:  newCenter.x - oldCenter.x,
            y:  newCenter.y - oldCenter.y
          };
    
          var bg = back;
          var transform = L.DomUtil.TRANSFORM; */
        //bg.style[transform] =  L.DomUtil.getTranslateString(origin) + ' scale(' + e.scale + ') ';
    },

    _endZoomAnim: function () {
        //this._animating = false;
        //this._canvas.style.display = 'block';
        //this._backCanvas.style.display = 'none';
    },

    getCanvas: function () {
        return this._canvas;
    },

    getAttribution: function () {
        return this.options.attribution;
    },

    draw: function () {
        return this._reset();
    },

    onRemove: function (map) {
        //this._container.parentNode.removeChild(this._container);
        L.DomUtil.remove(this._container);
        this.unbindEvent();
        this.disposeFlag = true;
    },

    /**
     * 设置透明度
     * @function L.zondy.MapvLayer.prototype.setOpacity
     * @param opacity - {Number} 1.0.
     */
    setOpacity: function (opacity) {
        this.options.opacity = opacity;
        this._updateOpacity();
        return this;
    },

    /**
     * 设置Zindex
     * @function L.zondy.MapvLayer.prototype.setZIndex
     * @param zIndex - {Number} 10.
     */
    setZIndex: function (zIndex) {
        this._canvas.style.zIndex = zIndex;
    },

    bringToFront: function () {
        return this;
    },

    bringToBack: function () {
        return this;
    },

    _reset: function () {
        this.resizeCanvas();
        this.fixPosition();
        this.onResize();
        this.render();
    },

    _visiable: function () {
        this.getCanvas().style.display = 'block';
    },

    _unvisiable: function () {
        this.getCanvas().style.display = 'none';
    },

    _updateOpacity: function () {},

    _render: function () {
        this.render();
    },

    /**
     * @description 拖动的时候和放大缩小的时候自定义图层不见得会和地图的像素坐标同步计算
     * 因此再绘制自定义图层的时候需要重新计算对应的位置,这里主要是对齐左上角
     * */
    fixPosition: function () {
        /* var domPosition = L.DomUtil.getPosition(this._map.getPanes().mapPane);
        console.log(domPosition);
        if (domPosition) {
            L.DomUtil.setPosition(this._canvas, {
                x: -domPosition.x,
                y: -domPosition.y
            });
        } */
        var topleft = this.map.getBounds().getNorthWest();
        var offset = this.map.latLngToLayerPoint(topleft);
        var zero = this.map.latLngToLayerPoint(L.latLng(0, 0));
        //这里之所以是latLngToLayerPoint的原因是
        //getPixelOrigin获取的一直是投影后地图的初始化显示的左上角相对投影源点[0,0]的偏移，这个不会随着拖动更改
        //参考 https://leafletjs.com/examples/extending/pixelorigin.html 中的红色角标相对绿色角标的偏移
        //为了满足拖动时候实时计算因此这里使用的是地图当前范围的左上角的经纬度，再换算成像素偏移即可
        var origin = this.map.getPixelOrigin();
        //console.log(topleft, offset, origin, zero);
        if (topleft) {
            L.DomUtil.setPosition(this._canvas, {
                x: offset.x,
                y: offset.y
            });
        }
    },

    resizeCanvas: function () {
        var size = this.map.getSize();
        var canvas = this.getCanvas();
        canvas.width = size.x;
        canvas.height = size.y;
        canvas.style.width = size.x + 'px';
        canvas.style.height = size.y + 'px';
    },

    // use direct: true if you are inside an animation frame call
    redraw: function (direct) {
        this.resizeCanvas();
        this.fixPosition();

        if (direct) {
            this.render();
        } else {
            this.render();
        }
    },
    /**
     * 显示图层
     * @function L.zondy.MapvLayer.prototype.show
     */
    show: function () {
        this._visiable();
    },
    /**
     * 隐藏图层
     * @function L.zondy.MapvLayer.prototype.hide
     */
    hide: function () {
        this._unvisiable();
    },
    /**
     * 销毁图层
     * @function L.zondy.MapvLayer.prototype.destroy
     */
    destroy: function () {
        L.DomUtil.remove(this._container);
        this.unbindEvent();
        this.disposeFlag = true;
    },
    /**
     * 更新图层
     * @function L.zondy.MapvLayer.prototype.update
     * @param opt.data - {Array} 需要更新的数据
     * @param opt.options - {Object} 需要更新的样式
     */
    update: function (opt) {
        if (opt == undefined) {
            return;
        }
        this.mapvBaseLayer.updateData(opt.data, opt.options);
    },

    /**
     * @function L.zondy.MapvLayer.prototype.removeData
     * @param filter - {Function} 过滤函数，返回true的保留
     * @description 移除满足过滤条件的数据
     * @example 
     * filter: function(item){
            if (item.count > 10 && item.count < 50) {
                return true;
            } else {
                return false;
            }
        }
     */
    removeData(filter) {
        this.mapvBaseLayer && this.mapvBaseLayer.removeData(filter);
    },

    /**
     * @function L.zondy.MapvLayer.prototype.removeAllData
     * @description 移除全部数据
     */
    removeAllData() {
        this.mapvBaseLayer.clearData();
    },

    onResize: function () {},

    render: function () {
        this.mapvBaseLayer._canvasUpdate();
        //throw new Error('render function should be implemented');
    }

});

export var mapvLayer = function (dataSet, mapVOptions, options) {
    return new MapvLayer(dataSet, mapVOptions, options);
};

L.zondy.MapvLayer = mapvLayer;
