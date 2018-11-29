/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = L;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_leaflet2.default.zondy = _leaflet2.default.zondy || {}; /**
                                                          *MapGIS WebClient Leaflet基类
                                                          * 定义命名空间
                                                          * 提供公共模块
                                                          */

_leaflet2.default.zondy.control = _leaflet2.default.zondy.control || {};

_leaflet2.default.mapv = _leaflet2.default.mapv || {};
_leaflet2.default.echarts = _leaflet2.default.echarts || {};

_leaflet2.default.CRS = _leaflet2.default.CRS || {};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Zondy = exports.Zondy = window.Zondy = window.Zondy || {};

Zondy.Util = Zondy.Util || {};
Zondy.Network = Zondy.Network || {};

Zondy.Event = Zondy.Event || {};
Zondy.Socket = Zondy.Socket || {};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LayerEvent = exports.BroadcastEvent = exports.SubscribeEvent = exports.BroadcastPrefix = exports.SubscribePrefix = undefined;

var _Base = __webpack_require__(2);

var SubscribePrefix = exports.SubscribePrefix = "/subscribe";
var BroadcastPrefix = exports.BroadcastPrefix = "/broadcast";

/**
 * SubscribeEvent WebSocket消息订阅通信事件流程
 * @readonly
 * @enum {String}
 */
var SubscribeEvent = exports.SubscribeEvent = {
  /** 广播流打开事件 */
  OPEN: "subscribeOpen",
  /** 广播流消息事件 */
  MESSAGE: "subscribeMessage",
  /** 广播流关闭事件 */
  CLOSE: "subscribeClose",
  /** 广播流错误事件 */
  ERROR: "subscribeError"
};

/**
 * BroadcastEvent WebSocket消息广播通信事件流程
 * @readonly
 * @enum {String}
 */
var BroadcastEvent = exports.BroadcastEvent = {
  /** 广播流打开事件 */
  OPEN: "broadcastOpen",
  /** 广播流消息事件 */
  MESSAGE: "broadcastMessage",
  /** 广播流关闭事件 */
  CLOSE: "broadcastClose",
  /** 广播流错误事件 */
  ERROR: "broadcastError"
};

/**
 * BroadcastEvent WebSocket 图层事件，用户、二次开发一般关注这个事件
 * @readonly
 * @enum {String}
 */
var LayerEvent = exports.LayerEvent = {
  /** 图层更新事件事件 */
  UPDATE: "layerupdate"
};

_Base.Zondy.Event.SubscribeEvent = SubscribeEvent;
_Base.Zondy.Event.BroadcastEvent = BroadcastEvent;
_Base.Zondy.Event.LayerEvent = BroadcastEvent;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(){try{return mapv}catch(e){return {}}}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapvLayer = exports.MapVLayer = undefined;

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

__webpack_require__(1);

var _MapvBaseLayer = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @origin author kyle / http://nikai.us/
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class L.zondy.MapVLayer
 * @classdesc 基于leaflet的Layer对象进行的拓展
 * @param map - {Object} 传入的leaflet的地图对象
 * @param dataset - {MapvDataSet} 传入的mapv的属性。 <br>
 * @param mapvoption - {MapvOption} 可选参数。<br>
 * @param options - {Object} L.Util.setOptions(this, options);只做额外增加的字段作用<br>
 */
var MapVLayer = exports.MapVLayer = _leaflet2.default.Layer.extend({

    initialize: function initialize(map, dataset, mapvoption, options) {
        //----------------------------------------------
        //此处的三个参数仅仅是对百度的封装，只做参数传递作用
        this.map = map;
        this.dataset = dataset || {};
        this.mapvoption = mapvoption;
        //----------------------------------------------

        options = options || {};
        //this.project = this._project.bind(this);
        this.render = this.render.bind(this);
        _leaflet2.default.Util.setOptions(this, options);
        this._canvas = this._createCanvas();

        _leaflet2.default.stamp(this);
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
     * @function L.zondy.MapVLayer.prototype.addData
     * 
     * @param data - {Array} 数据.
     * @param options - {Object} 只做额外增加的字段作用
     */
    addData: function addData(data, options) {
        this.mapvBaseLayer.addData(data, options);
    },

    /**
     * 更新数据
     * @function L.zondy.MapVLayer.prototype.addData
     * 
     * @param data - {Array} 数据.
     * @param options - {Object} 只做额外增加的字段作用
     */
    updateData: function updateData(data, options) {
        this.mapvBaseLayer.updateData(data, options);
    },

    initDevicePixelRatio: function initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    },

    _createCanvas: function _createCanvas() {
        var canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = this.options.zIndex || 100;
        var className = 'leaflet-tile-container leaflet-zoom-animated';
        canvas.setAttribute('class', className);
        var devicePixelRatio = this.devicePixelRatio;
        if (this.mapvoption.context == '2d') {
            canvas.getContext(this.mapvoption.context).scale(devicePixelRatio, devicePixelRatio);
        }
        return canvas;
    },

    onAdd: function onAdd(map) {
        // add container with the canvas to the tile pane
        // the container is moved in the oposite direction of the 
        // map pane to keep the canvas always in (0, 0)
        var tilePane = this.getPane();
        var _container = _leaflet2.default.DomUtil.create('div', 'leaflet-layer', tilePane);
        _container.appendChild(this._canvas);
        //_container.appendChild(this._backCanvas);
        //this._backCanvas.style.display = 'none';
        //tilePane.appendChild(_container);

        this._container = _container;

        this.mapvBaseLayer = new _MapvBaseLayer.MapvBaseLayer(map, this.dataset, this.mapvoption, this);
        this.bindEvent();

        if (this.options.tileLoader) {
            this._initTileLoader();
        }

        this._reset();
        this.fire("loaded");
    },

    bindEvent: function bindEvent() {
        var map = this.map;
        map.on('movestart', this.innerMoveStartEvent);
        map.on('moveend', this.innerMoveEndEvent);
        map.on('zoomstart', this.innnerZoomstart);
        map.on('viewreset', this.innerViewreset);
        map.on('resize ', this.innerResize);
        this.mapvBaseLayer.bindEvent();
    },

    unbindEvent: function unbindEvent() {
        var map = this.map;
        map.off('movestart', this.innerMoveStartEvent);
        map.off('moveend', this.innerMoveEndEvent);
        map.off('zoomstart', this.innnerZoomstart);
        map.off('viewreset', this.innerViewreset);
        map.off('resize ', this.innerResize);
        this.mapvBaseLayer.unbindEvent();
    },

    moveStartEvent: function moveStartEvent() {
        this.mapvBaseLayer.animatorMovestartEvent();
        this._unvisiable();
    },

    moveEndEvent: function moveEndEvent() {
        this.mapvBaseLayer.animatorMoveendEvent();
        this._reset();
        this._visiable();
    },

    zoomStartEvent: function zoomStartEvent() {
        this._unvisiable();
    },

    viewresetEvent: function viewresetEvent() {
        this._reset();
        this._visiable();
    },

    resizeEvent: function resizeEvent() {
        this._reset();
        this._visiable();
    },

    _animateZoom: function _animateZoom(e) {
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

    _endZoomAnim: function _endZoomAnim() {
        //this._animating = false;
        //this._canvas.style.display = 'block';
        //this._backCanvas.style.display = 'none';
    },

    getCanvas: function getCanvas() {
        return this._canvas;
    },

    getAttribution: function getAttribution() {
        return this.options.attribution;
    },

    draw: function draw() {
        return this._reset();
    },

    onRemove: function onRemove(map) {
        //this._container.parentNode.removeChild(this._container);
        _leaflet2.default.DomUtil.remove(this._container);
        this.unbindEvent();
        this.disposeFlag = true;
    },

    /**
     * 设置透明度
     * @function L.zondy.MapVLayer.prototype.setOpacity
     * @param opacity - {Number} 1.0.
     */
    setOpacity: function setOpacity(opacity) {
        this.options.opacity = opacity;
        this._updateOpacity();
        return this;
    },

    /**
     * 设置Zindex
     * @function L.zondy.MapVLayer.prototype.setZIndex
     * @param zIndex - {Number} 10.
     */
    setZIndex: function setZIndex(zIndex) {
        this._canvas.style.zIndex = zIndex;
    },

    bringToFront: function bringToFront() {
        return this;
    },

    bringToBack: function bringToBack() {
        return this;
    },

    _reset: function _reset() {
        this.resizeCanvas();
        this.fixPosition();
        this.onResize();
        this.render();
    },

    _visiable: function _visiable() {
        this.getCanvas().style.display = 'block';
    },

    _unvisiable: function _unvisiable() {
        this.getCanvas().style.display = 'none';
    },

    _updateOpacity: function _updateOpacity() {},

    _render: function _render() {
        this.render();
    },

    /**
     * @description 拖动的时候和放大缩小的时候自定义图层不见得会和地图的像素坐标同步计算
     * 因此再绘制自定义图层的时候需要重新计算对应的位置,这里主要是对齐左上角
     * */
    fixPosition: function fixPosition() {
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
        var zero = this.map.latLngToLayerPoint(_leaflet2.default.latLng(0, 0));
        //这里之所以是latLngToLayerPoint的原因是
        //getPixelOrigin获取的一直是投影后地图的初始化显示的左上角相对投影源点[0,0]的偏移，这个不会随着拖动更改
        //参考 https://leafletjs.com/examples/extending/pixelorigin.html 中的红色角标相对绿色角标的偏移
        //为了满足拖动时候实时计算因此这里使用的是地图当前范围的左上角的经纬度，再换算成像素偏移即可
        var origin = this.map.getPixelOrigin();
        //console.log(topleft, offset, origin, zero);
        if (topleft) {
            _leaflet2.default.DomUtil.setPosition(this._canvas, {
                x: offset.x,
                y: offset.y
            });
        }
    },

    resizeCanvas: function resizeCanvas() {
        var size = this.map.getSize();
        var canvas = this.getCanvas();
        canvas.width = size.x;
        canvas.height = size.y;
        canvas.style.width = size.x + 'px';
        canvas.style.height = size.y + 'px';
    },

    // use direct: true if you are inside an animation frame call
    redraw: function redraw(direct) {
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
     * @function L.zondy.MapVLayer.prototype.show
     */
    show: function show() {
        this._visiable();
    },
    /**
     * 隐藏图层
     * @function L.zondy.MapVLayer.prototype.hide
     */
    hide: function hide() {
        this._unvisiable();
    },
    /**
     * 销毁图层
     * @function L.zondy.MapVLayer.prototype.destroy
     */
    destroy: function destroy() {
        _leaflet2.default.DomUtil.remove(this._container);
        this.unbindEvent();
        this.disposeFlag = true;
    },
    /**
     * 更新图层
     * @function L.zondy.MapVLayer.prototype.update
     */
    update: function update(opt) {
        if (opt == undefined) {
            return;
        }
        this.mapvBaseLayer.updateData(opt.data, opt.options);
    },

    onResize: function onResize() {},

    render: function render() {
        this.mapvBaseLayer._canvasUpdate();
        //throw new Error('render function should be implemented');
    }

});

var mapvLayer = exports.mapvLayer = function mapvLayer(dataSet, mapVOptions, options) {
    return new MapVLayer(dataSet, mapVOptions, options);
};

_leaflet2.default.zondy.MapvLayer = mapvLayer;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IServiceLoadData = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = __webpack_require__(2);

var _FetchRequest = __webpack_require__(22);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_Base.Zondy.ElasticSearch = _Base.Zondy.ElasticSearch || {};
/**
 * @class Zondy.ElasticSearch.IServiceLoadData
 * @classdesc ElasticSearch的可视化是通过MapV实现的，因此必须引入mapv的相关插件
 * @param method - {String} 网络请求方式：post get put delete
 * @param url - {String} 网络请求Url
 * @param params - {Object} 网络请求Params参数
 * @param style - {MapvOption} 地图可视化MapV的样式参数
 * @param map - {Object} 传入的地图组件
 * @param onSuccess - {function} 请求成功时的回调函数
 * @param onFailure - {function} 请求失败时的回调函数
 * @param onCallback(result) - {function} 请求成功时的回调函数，参数是result
 */

var IServiceLoadData = exports.IServiceLoadData = function () {
  function IServiceLoadData(method, url, params, style, map, onSuccess, onFailure, onCallback) {
    _classCallCheck(this, IServiceLoadData);

    this.method = method;
    this.url = url;
    this.params = params;
    this.fetchServiceData(map, style, onSuccess, onFailure, onCallback);
  }

  _createClass(IServiceLoadData, [{
    key: "fetchServiceData",
    value: function fetchServiceData(map, style, success, failure, callback) {
      _FetchRequest.FetchRequest.commit(this.method, this.url, this.params, {
        // headers: options.headers,
        // withCredentials: options.withCredentials,
        // timeout: options.async ? 0 : null,
        // proxy: options.proxy
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        success(result, map, style, callback);
      });
    }
  }]);

  return IServiceLoadData;
}();

;

_Base.Zondy.ElasticSearch.IServiceLoadData = IServiceLoadData;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeojsonBaseLayer = undefined;

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class GeojsonBaseLayer
 * @classdesc SocketLayer GeoJson渲染器。
 * @extends {L.GeoJSON}
 * @param {string} url - 数据流图层服务地址
 * @param {Object} options - 其他参数，先保留。
 *
 * @param {Object} options.style - 默认的geojson的style。
 * @param {Object} options.pointToLayer - geojson针对点图层的样式设置。
 * @param {Object} options.onEachFeature - geojson针对常见几何的样式设置。
 *
 * @param {Object} options.field - geojson的唯一标识字段，请确保该字段的唯一性。
 */
var GeojsonBaseLayer = exports.GeojsonBaseLayer = _leaflet2.default.GeoJSON.extend({
  initialize: function initialize(url, options) {
    options = options || {};
    if (options.style && !options.pointToLayer) {
      options.pointToLayer = function (feature, latlng) {
        return _leaflet2.default.circleMarker(latlng, options.style());
      };
    }

    _leaflet2.default.Util.setOptions(this, options);

    //与leaflet源代码一致，
    //var i = this.getLayerId(t);
    //return this._layers[i] = t
    this._layers = {};

    _leaflet2.default.stamp(this);

    this.url = url;
    this.fieldHash = {};
  },

  onMessage: function onMessage(msg) {
    var feature = msg.feature;
    var field = msg.feature.properties[this.options.field];
    var layer = null;
    if (field !== undefined && this.fieldHash[field]) {
      layer = this.getLayer(this.fieldHash[field]);
      this.parasFeature(layer, feature);
    } else {
      layer = _leaflet2.default.GeoJSON.geometryToLayer(feature, this.options);
      layer.feature = _leaflet2.default.GeoJSON.asFeature(feature);
      this.addLayer(layer);
      if (field !== undefined) {
        this.fieldHash[field] = this.getLayerId(layer);
      }
    }
    if (this.options.onEachFeature) {
      this.options.onEachFeature(feature, layer);
    }
  },

  parasFeature: function parasFeature(layer, feature) {
    if (feature.properties) {
      layer.feature.properties = feature.properties;
    }
    var coords = [];
    switch (feature.geometry.type) {
      case "Point":
        coords = _leaflet2.default.GeoJSON.coordsToLatLng(feature.geometry.coordinates);
        layer.setLatLng(coords);
        break;
      case "LineString":
        coords = _leaflet2.default.GeoJSON.coordsToLatLngs(feature.geometry.coordinates, 0);
        layer.setLatLngs(coords);
        break;
      case "MultiLineString":
      case "Polygon":
        coords = _leaflet2.default.GeoJSON.coordsToLatLngs(feature.geometry.coordinates, 1);
        layer.setLatLngs(coords);
        break;
      case "MultiPolygon":
        coords = _leaflet2.default.GeoJSON.coordsToLatLngs(feature.geometry.coordinates, 2);
        layer.setLatLngs(coords);
        break;
    }
  }
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceEvent = undefined;

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class L.zondy.ServiceEvent
 * @classdesc L.zondy 服务事件，该类主要是用于事件的传递
 * @param {string} url - url地址
 * @param {Object} options - 参数
 * @fires L.zondy.ServiceEvent#initialize
 * @fires L.zondy.ServiceEvent#destroy
 */
var ServiceEvent = exports.ServiceEvent = _leaflet2.default.Evented.extend({
  initialize: function initialize(url, options) {
    this.url = url;
    _leaflet2.default.setOptions(this, options);
    this.fire("initialize", this);
  },

  destroy: function destroy() {
    this.fire("destroy", this);
  }
});
_leaflet2.default.zondy.ServiceEvent = ServiceEvent;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelFn = exports.requestFn = exports.emptyImageUrl = exports.isArray = exports.lastId = exports.create = exports.endsWith = exports.extendFromArray = exports.appendUrl = exports.extend = exports.Util = undefined;
exports.bind = bind;
exports.stamp = stamp;
exports.throttle = throttle;
exports.wrapNum = wrapNum;
exports.falseFn = falseFn;
exports.formatNum = formatNum;
exports.trim = trim;
exports.splitWords = splitWords;
exports.setOptions = setOptions;
exports.getParamString = getParamString;
exports.template = template;
exports.indexOf = indexOf;
exports.requestAnimFrame = requestAnimFrame;
exports.cancelAnimFrame = cancelAnimFrame;

var _Base = __webpack_require__(2);

var Util = exports.Util = _Base.Zondy.Util = _Base.Zondy.Util || {};

/**
 * @description 复制源对象的所有属性到目标对象上，源对象上的没有定义的属性在目标对象上也不会被设置。
 * @example
 * 要复制Zondy.Size对象的所有属性到自定义对象上，使用方法如下:
 *     var size = new Zondy.Size(100, 100);
 *     var obj = {}；
 *     Zondy.Util.extend(obj, size);
 * @param destination - {Object} 目标对象。
 * @param source - {Object} 源对象，其属性将被设置到目标对象上。
 * @return {Object} 目标对象。
 */
var extend = exports.extend = function extend(destination, source) {
  destination = destination || {};
  if (source) {
    for (var property in source) {
      var value = source[property];
      if (value !== undefined) {
        destination[property] = value;
      }
    }

    /**
     * IE doesn't include the toString property when iterating over an object's
     * properties with the for(property in object) syntax.  Explicitly check if
     * the source has its own toString property.
     */

    /*
     * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
     * prototype object" when calling hawOwnProperty if the source object
     * is an instance of window.Event.
     */

    var sourceIsEvt = typeof window.Event === "function" && source instanceof window.Event;

    if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty("toString")) {
      destination.toString = source.toString;
    }
  }
  return destination;
};

/**
 * @description 给url追加参数。
 * @param url - {string} 待追加参数的url字符串。
 * @param paramStr - {string} 待追加的参数。
 * @return {string} The new url
 */
var appendUrl = exports.appendUrl = function appendUrl(url, paramStr) {
  var newUrl = url;
  if (paramStr) {
    var parts = (url + " ").split(/[?&]/);
    newUrl += parts.pop() === " " //如果url是以?或者&结尾的直接追加参数
    ? paramStr : parts.length ? "&" + paramStr : "?" + paramStr;
    //如果url不是以?或者&结尾的则根据是否有参数进行符号补充
  }
  return newUrl;
};

/**
 * @description 复制源对象数组的所有属性到目标对象上，源对象数组的当前对象会重写前一个对象的值
 * @author 潘卓然ParnDeedlit 基础平台/创新中心
 * @param dest - {Object}  目标对象
 * @param sources -{Array} 源对象数据，每个对象都会给目的对象设置对应的属性值
 * @private
 */
var extendFromArray = exports.extendFromArray = function extendFromArray(dest, sources) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var src = _step.value;

      for (var k in src) {
        dest[k] = src[k];
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return dest;
};

/**
 * 判断字符串是否以特定后缀字符结束
 * @author 潘卓然ParnDeedlit 基础平台/创新中心
 * @description
 * @param string {String} 判断字符串
 * @param string {String} 尾部后缀
 * @private
 */
var endsWith = exports.endsWith = function endsWith(string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1;
};

// @function create(proto: Object, properties?: Object): Object
// Compatibility polyfill for [Object.create](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
var create = exports.create = Object.create || function () {
  function F() {}
  return function (proto) {
    F.prototype = proto;
    return new F();
  };
}();

// @function bind(fn: Function, …): Function
// Returns a new function bound to the arguments passed, like [Function.prototype.bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
// Has a `L.bind()` shortcut.
function bind(fn, obj) {
  var slice = Array.prototype.slice;

  if (fn.bind) {
    return fn.bind.apply(fn, slice.call(arguments, 1));
  }

  var args = slice.call(arguments, 2);

  return function () {
    return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
  };
}

// @property lastId: Number
// Last unique ID used by [`stamp()`](#util-stamp)
var lastId = exports.lastId = 0;

// @function stamp(obj: Object): Number
// Returns the unique ID of an object, assigning it one if it doesn't have it.
function stamp(obj) {
  /*eslint-disable */
  obj._leaflet_id = obj._leaflet_id || (exports.lastId = lastId += 1);
  return obj._leaflet_id;
  /* eslint-enable */
}

// @function throttle(fn: Function, time: Number, context: Object): Function
// Returns a function which executes function `fn` with the given scope `context`
// (so that the `this` keyword refers to `context` inside `fn`'s code). The function
// `fn` will be called no more than one time per given amount of `time`. The arguments
// received by the bound function will be any arguments passed when binding the
// function, followed by any arguments passed when invoking the bound function.
// Has an `L.throttle` shortcut.
function throttle(fn, time, context) {
  var lock, args, wrapperFn, later;

  later = function later() {
    // reset lock and call if queued
    lock = false;
    if (args) {
      wrapperFn.apply(context, args);
      args = false;
    }
  };

  wrapperFn = function wrapperFn() {
    if (lock) {
      // called too soon, queue to call later
      args = arguments;
    } else {
      // call and lock until later
      fn.apply(context, arguments);
      setTimeout(later, time);
      lock = true;
    }
  };

  return wrapperFn;
}

// @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
// Returns the number `num` modulo `range` in such a way so it lies within
// `range[0]` and `range[1]`. The returned value will be always smaller than
// `range[1]` unless `includeMax` is set to `true`.
function wrapNum(x, range, includeMax) {
  var max = range[1],
      min = range[0],
      d = max - min;
  return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
}

// @function falseFn(): Function
// Returns a function which always returns `false`.
function falseFn() {
  return false;
}

// @function formatNum(num: Number, digits?: Number): Number
// Returns the number `num` rounded to `digits` decimals, or to 6 decimals by default.
function formatNum(num, digits) {
  var pow = Math.pow(10, digits === undefined ? 6 : digits);
  return Math.round(num * pow) / pow;
}

// @function trim(str: String): String
// Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}

// @function splitWords(str: String): String[]
// Trims and splits the string on whitespace and returns the array of parts.
function splitWords(str) {
  return trim(str).split(/\s+/);
}

// @function setOptions(obj: Object, options: Object): Object
// Merges the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`. Has an `L.setOptions` shortcut.
function setOptions(obj, options) {
  if (!obj.hasOwnProperty("options")) {
    obj.options = obj.options ? create(obj.options) : {};
  }
  for (var i in options) {
    obj.options[i] = options[i];
  }
  return obj.options;
}

// @function getParamString(obj: Object, existingUrl?: String, uppercase?: Boolean): String
// Converts an object into a parameter URL string, e.g. `{a: "foo", b: "bar"}`
// translates to `'?a=foo&b=bar'`. If `existingUrl` is set, the parameters will
// be appended at the end. If `uppercase` is `true`, the parameter names will
// be uppercased (e.g. `'?A=foo&B=bar'`)
function getParamString(obj, existingUrl, uppercase) {
  var params = [];
  for (var i in obj) {
    params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + "=" + encodeURIComponent(obj[i]));
  }
  return (!existingUrl || existingUrl.indexOf("?") === -1 ? "?" : "&") + params.join("&");
}

var templateRe = /\{ *([\w_-]+) *\}/g;

// @function template(str: String, data: Object): String
// Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
// and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
// `('Hello foo, bar')`. You can also specify functions instead of strings for
// data values — they will be evaluated passing `data` as an argument.
function template(str, data) {
  return str.replace(templateRe, function (str, key) {
    var value = data[key];

    if (value === undefined) {
      throw new Error("No value provided for variable " + str);
    } else if (typeof value === "function") {
      value = value(data);
    }
    return value;
  });
}

// @function isArray(obj): Boolean
// Compatibility polyfill for [Array.isArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
var isArray = exports.isArray = Array.isArray || function (obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
};

// @function indexOf(array: Array, el: Object): Number
// Compatibility polyfill for [Array.prototype.indexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
function indexOf(array, el) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === el) {
      return i;
    }
  }
  return -1;
}

// @property emptyImageUrl: String
// Data URI string containing a base64-encoded empty GIF image.
// Used as a hack to free memory from unused images on WebKit-powered
// mobile devices (by setting image `src` to this string).
var emptyImageUrl = exports.emptyImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

function getPrefixed(name) {
  return window["webkit" + name] || window["moz" + name] || window["ms" + name];
}

var lastTime = 0;

// fallback for IE 7-8
function timeoutDefer(fn) {
  var time = +new Date(),
      timeToCall = Math.max(0, 16 - (time - lastTime));

  lastTime = time + timeToCall;
  return window.setTimeout(fn, timeToCall);
}

var requestFn = exports.requestFn = window.requestAnimationFrame || getPrefixed("RequestAnimationFrame") || timeoutDefer;
var cancelFn = exports.cancelFn = window.cancelAnimationFrame || getPrefixed("CancelAnimationFrame") || getPrefixed("CancelRequestAnimationFrame") || function (id) {
  window.clearTimeout(id);
};

// @function requestAnimFrame(fn: Function, context?: Object, immediate?: Boolean): Number
// Schedules `fn` to be executed when the browser repaints. `fn` is bound to
// `context` if given. When `immediate` is set, `fn` is called immediately if
// the browser doesn't have native support for
// [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),
// otherwise it's delayed. Returns a request ID that can be used to cancel the request.
function requestAnimFrame(fn, context, immediate) {
  if (immediate && requestFn === timeoutDefer) {
    fn.call(context);
  } else {
    return requestFn.call(window, bind(fn, context));
  }
}

// @function cancelAnimFrame(id: Number): undefined
// Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
function cancelAnimFrame(id) {
  if (id) {
    cancelFn.call(window, id);
  }
}

_Base.Zondy.Util.extend = extend;
_Base.Zondy.Util.appendUrl = appendUrl;
_Base.Zondy.Util.endsWith = endsWith;
_Base.Zondy.Util.extendFromArray = extendFromArray;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function(){try{return echarts}catch(e){return {}}}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapvBaseLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mapv = __webpack_require__(4);

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * modify to zondy mapv
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @origin author kyle / http://nikai.us/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author 潘卓然 ParnDeedlit
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var BaseLayer = _mapv.baiduMapLayer ? _mapv.baiduMapLayer.__proto__ : Function;

/**
 * @class L.zondy.MapvBaseLayer
 * @classdesc MapV的核心渲染图层，这里是直接集成的baiduMapLayer，原因在于mapv的对外导出exports的就是baiduMapLayer
 * @param map - {Object} 传入的leaflet的地图对象
 * @param dataSet - {MapvDataSet} 传入的mapv的属性。 <br>
 * @param options - {MapvOption} 可选参数。<br>
 * @param leafletLayer - {Object} 传入的leaflet的实际渲染图层。<br>
 * 
 * @example
options = {
    zIndex: 1, // 层级
    size: 5, // 大小值
    unit: 'px', // 'px': 以像素为单位绘制,默认值。'm': 以米制为单位绘制，会跟随地图比例放大缩小
    mixBlendMode: 'normal', // 不同图层之间的叠加模式，参考[https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
    fillStyle: 'rgba(200, 200, 50, 1)', // 填充颜色
    strokeStyle: 'rgba(0, 0, 255, 1)', // 描边颜色
    lineWidth: 4, // 描边宽度
    globalAlpha: 1, // 透明度
    globalCompositeOperation: 'lighter', // 颜色叠加方式
    coordType: 'bd09ll', // 可选百度墨卡托坐标类型bd09mc和百度经纬度坐标类型bd09ll(默认)
    shadowColor: 'rgba(255, 255, 255, 1)', // 投影颜色
    shadowBlur: 35,  // 投影模糊级数
    updateCallback: function (time) { // 重绘回调函数，如果是时间动画、返回当前帧的时间
    },
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    context: '2d', // 可选2d和webgl，webgl目前只支持画simple模式的点和线
    lineCap: 'butt',
    lineJoin: 'miter',
    miterLimit: 10,
    methods: { // 一些事件回调函数
        click: function (item) { // 点击事件，返回对应点击元素的对象值
            console.log(item);
        },
        mousemove: function(item) { // 鼠标移动事件，对应鼠标经过的元素对象值
            console.log(item);
        }
    },
    animation: {
        type: 'time', // 按时间展示动画
        stepsRange: { // 动画时间范围,time字段中值
            start: 0,
            end: 100
        },
        trails: 10, // 时间动画的拖尾大小
        duration: 5, // 单个动画的时间，单位秒
    }
}
 */

var MapvBaseLayer = exports.MapvBaseLayer = function (_BaseLayer) {
    _inherits(MapvBaseLayer, _BaseLayer);

    function MapvBaseLayer(map, dataSet, options, leafletLayer) {
        _classCallCheck(this, MapvBaseLayer);

        var _this = _possibleConstructorReturn(this, (MapvBaseLayer.__proto__ || Object.getPrototypeOf(MapvBaseLayer)).call(this, map, dataSet, options));

        if (!BaseLayer) {
            return _possibleConstructorReturn(_this);
        };

        _this.map = map; //此处的map是外面传入的leaflet的map对象
        _this.dataSet = dataSet;

        var self = _this;
        var data = null;
        options = options || {};

        self.init(options);
        self.argCheck(options);

        _this.initDevicePixelRatio();

        _this.canvasLayer = leafletLayer;

        _this.clickEvent = _this.clickEvent.bind(_this);
        _this.mousemoveEvent = _this.mousemoveEvent.bind(_this);

        _this.bindEvent();
        return _this;
    }

    /**
     * @function L.zondy.MapvBaseLayer.prototype.clickEvent
     * @description 百度mapv原本的事件只有clickEvent和mousemoveEvent
     * @param e - {Object}  点击事件对象 {latlng, layerPoint, containerPoint, originalEvent}
     * @example 
     * //mapv.map.BaseLayer.clickEvent
     * clickEvent(pixel, e) {
     *    var dataItem = this.isPointInPath(this.getContext(), pixel);
     *    if (dataItem) {
     *       this.options.methods.click(dataItem, e);
     *    } else {
     *       this.options.methods.click(null, e);
     *    }
     *  }
     */


    _createClass(MapvBaseLayer, [{
        key: 'clickEvent',
        value: function clickEvent(e) {
            var offset = this.map.containerPointToLayerPoint([0, 0]); //this.map.getPixelOrigin()
            var devicePixelRatio = this.devicePixelRatio || 1;
            var canvasPoint = e.layerPoint;
            var pixel = {
                x: (canvasPoint.x - offset.x) / devicePixelRatio,
                y: (canvasPoint.y - offset.y) / devicePixelRatio
                //super.clickEvent(pixel, e);
            };
        }

        /**
         * @function L.zondy.MapvBaseLayer.prototype.mousemoveEvent
         * @description 百度mapv原本的事件只有clickEvent和mousemoveEvent
         * @param e - {Object}  点击事件对象 {latlng, layerPoint, containerPoint, originalEvent}
         * @example 
         * //mapv.map.BaseLayer.mousemoveEvent
         * mousemoveEvent(pixel, e) {
         *   var dataItem = this.isPointInPath(this.getContext(), pixel);
         *   if (dataItem) {
         *       this.options.methods.mousemove(dataItem, e);
         *   } else {
         *       this.options.methods.mousemove(null, e);
         *   }
         * }
         */

    }, {
        key: 'mousemoveEvent',
        value: function mousemoveEvent(e) {
            if (!e) {
                return;
            }
            var offset = this.map.containerPointToLayerPoint([0, 0]); //this.map.getPixelOrigin()
            var devicePixelRatio = this.devicePixelRatio || 1;
            var canvasPoint = e.layerPoint;
            var pixel = {
                x: (canvasPoint.x - offset.x) / devicePixelRatio,
                y: (canvasPoint.y - offset.y) / devicePixelRatio
                //super.mousemoveEvent(pixel, e);
            };
        }
    }, {
        key: 'addAnimatorEvent',
        value: function addAnimatorEvent() {
            /* this.map.on('movestart', this.animatorMovestartEvent.bind(this));
            this.map.on('moveend', this.animatorMoveendEvent.bind(this)); */
        }
    }, {
        key: 'animatorMovestartEvent',
        value: function animatorMovestartEvent() {
            var animationOptions = this.options.animation;
            if (this.isEnabledTime() && this.animator) {
                this.steps.step = animationOptions.stepsRange.start;
                //this.animator.stop();
            }
        }
    }, {
        key: 'animatorMoveendEvent',
        value: function animatorMoveendEvent() {
            if (this.isEnabledTime() && this.animator) {
                //this.animator.start();
            }
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent(e) {
            var map = this.map;

            if (this.options.methods) {
                if (this.options.methods.click) {
                    map.on('click', this.clickEvent);
                }
                if (this.options.methods.mousemove) {
                    map.on('mousemove', this.mousemoveEvent);
                }
            }
        }
    }, {
        key: 'unbindEvent',
        value: function unbindEvent(e) {
            var map = this.map;

            if (this.options.methods) {
                if (this.options.methods.click) {
                    map.removeListener('click', this.clickEvent);
                }
                if (this.options.methods.mousemove) {
                    map.removeListener('mousemove', this.mousemoveEvent);
                }
            }
        }

        /**
         * @function L.zondy.MapvBaseLayer.prototype.initDevicePixelRatio
         * @description window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。
         * 公式表示就是：window.devicePixelRatio = 物理像素 / dips,该函数主要应用与移动设备
         */

    }, {
        key: 'initDevicePixelRatio',
        value: function initDevicePixelRatio() {
            this.devicePixelRatio = window.devicePixelRatio || 1;
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this.canvasLayer.getCanvas().getContext(this.context);
        }
    }, {
        key: '_canvasUpdate',
        value: function _canvasUpdate(time) {
            if (!this.canvasLayer || this.canvasLayer.disposeFlag) {
                return;
            }

            var self = this;
            var map = this.map;

            var animationOptions = self.options.animation;

            var context = this.getContext();

            if (self.isEnabledTime()) {
                if (time === undefined) {
                    this.clear(context);
                    return;
                }
                if (this.context == '2d') {
                    context.save();
                    context.globalCompositeOperation = 'destination-out';
                    context.fillStyle = 'rgba(0, 0, 0, .1)';
                    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                    context.restore();
                }
            } else {
                this.clear(context);
            }

            if (this.context == '2d') {
                for (var key in self.options) {
                    context[key] = self.options[key];
                }
            } else {
                context.clear(context.COLOR_BUFFER_BIT);
            }

            if (self.options.minZoom && map.getZoom() < self.options.minZoom || self.options.maxZoom && map.getZoom() > self.options.maxZoom) {
                return;
            }

            /* var scale = 1;
            if (this.context != '2d') {
                scale = this.canvasLayer.devicePixelRatio;
            } */

            var topLeft = map.getBounds().getNorthWest();
            var offset = map.latLngToContainerPoint(topLeft);
            //console.log(offset, this.canvasLayer.getTopLeft());

            var dataGetOptions = {
                //fromColumn: self.options.coordType == 'bd09mc' ? 'coordinates' : 'coordinates_mercator',
                transferCoordinate: function transferCoordinate(coordinate) {
                    // get center from the map (projected)
                    var point = map.latLngToContainerPoint(new _leaflet2.default.LatLng(coordinate[1], coordinate[0]));
                    return [point.x - offset.x, point.y - offset.y];
                }
            };

            if (time !== undefined) {
                dataGetOptions.filter = function (item) {
                    var trails = animationOptions.trails || 10;
                    if (time && item.time > time - trails && item.time < time) {
                        return true;
                    } else {
                        return false;
                    }
                };
            }

            var data = self.dataSet.get(dataGetOptions);

            this.processData(data);

            if (self.options.unit == 'm' && self.options.size) {
                //self.options._size = self.options.size / zoomUnit;
                self.options._size = self.options.size;
            } else {
                self.options._size = self.options.size;
            }

            var originpoint = map.latLngToContainerPoint(_leaflet2.default.latLng(0, 0));
            var pixel = {
                x: originpoint.x - offset.x,
                y: originpoint.y - offset.y
            };

            this.drawContext(context, new _mapv.DataSet(data), self.options, pixel);
            self.options.updateCallback && self.options.updateCallback(time);
        }
    }, {
        key: 'init',
        value: function init(options) {

            var self = this;

            self.options = options;

            this.initDataRange(options);

            this.context = self.options.context || '2d';

            if (self.options.zIndex) {
                this.canvasLayer && this.canvasLayer.setZIndex(self.options.zIndex);
            }

            this.initAnimator();
        }
    }, {
        key: 'updateData',
        value: function updateData(data, options) {
            var _data = data;
            if (_data && _data.get) {
                _data = _data.get();
            }
            if (_data != undefined) {
                this.dataSet.set(_data);
            }

            _get(MapvBaseLayer.prototype.__proto__ || Object.getPrototypeOf(MapvBaseLayer.prototype), 'update', this).call(this, {
                options: options
            });
        }
    }, {
        key: 'addData',
        value: function addData(data, options) {
            var _data = data;
            if (data && data.get) {
                _data = data.get();
            }
            this.dataSet.add(_data);
            this.update({
                options: options
            });
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.canvasLayer.draw();
        }

        //该函数从mapv/canvas/clear中提取

    }, {
        key: 'clear',
        value: function clear(context) {
            context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            //context.canvas.width = context.canvas.width;
            //context.canvas.height = context.canvas.height;
        }
    }]);

    return MapvBaseLayer;
}(BaseLayer);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var URL_HTTP_PROFIX = exports.URL_HTTP_PROFIX = "http://";
var URL_DIVISION = exports.URL_DIVISION = "/";
var URL_SUB = exports.URL_SUB = ":";
var uriSocket = exports.uriSocket = "8020";
var uriBody_end = exports.uriBody_end = "?";
var uriParamLink = exports.uriParamLink = "&";

var elsName = exports.elsName = "es";
var elsQuery = exports.elsQuery = "generalQuery";
var elsIndex = exports.elsIndex = "indexName=";
var elsType = exports.elsType = "typeName=";
var elsSpatial = exports.elsSpatial = "spatialCondition=";
var elsTimeComdition = exports.elsTimeComdition = "timeCondition=";
var elsQueryField = exports.elsQueryField = "queryField=";

var PARAM_SUB = exports.PARAM_SUB = ":";
var PARAM_COMMA = exports.PARAM_COMMA = ",";
var PARAM_SPLIT = exports.PARAM_SPLIT = ";";

var aggGeoFormat = exports.aggGeoFormat = "0"; //0表示点  1表示区
var elsPercision = exports.elsPercision = "percision"; //geohash聚类的精度


var SPACE_ENUM_POINT = exports.SPACE_ENUM_POINT = "point";
var SPACE_ENUM_LINE = exports.SPACE_ENUM_LINE = "line";
var SPACE_ENUM_POLYGON = exports.SPACE_ENUM_POLYGON = "polygon";

var QUERY_GEOHASH = exports.QUERY_GEOHASH = "stGeoHashQueryByAgg";
var QUERY_GEOHASH_POINT = exports.QUERY_GEOHASH_POINT = "0";
var QUERY_GEOHASH_POLYGON = exports.QUERY_GEOHASH_POLYGON = "1";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoPointService = exports.GeoPointService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

var _mapv = __webpack_require__(4);

var _Base = __webpack_require__(13);

__webpack_require__(1);

var _MapvLayer = __webpack_require__(5);

var _IServiceLoadData = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_leaflet2.default.zondy.GeoHashLayer = undefined;

var GeoPointService = exports.GeoPointService = function () {
  function GeoPointService(ip, socket, map, queryOption, styleOption) {
    _classCallCheck(this, GeoPointService);

    this.layer = null;

    this.map = map;
    this.urlAddress = "";

    this.queryOption = {};
    this.styleOption = styleOption;

    this.prefixUrlPost(ip, socket, queryOption);
    new _IServiceLoadData.IServiceLoadData("GET", this.urlAddress, this.queryOption, this.styleOption, this.map, this.onSuccess, this.onFailure);
  }

  /*
  * 下面的逻辑是对应的DataStore的Post请求一一对应，这里只是一个封装，将用户的直观参数
  转换成DataStore要求的参数
  */


  _createClass(GeoPointService, [{
    key: "prefixUrlPost",
    value: function prefixUrlPost(ip, socket, queryOption) {
      //处理url
      this.urlAddress = "" + _Base.URL_HTTP_PROFIX + ip + _Base.URL_SUB + socket + "/es/" + _Base.QUERY_GEOHASH;
      //处理elasticsearch的数据库库名,表名
      this.queryOption.indexName = queryOption.db;
      this.queryOption.typeName = queryOption.table;
      //处理空间属性参数
      this.queryOption.aggfield = queryOption.space.field; //空间字段
      this.queryOption.spatialCondition = _Base.SPACE_ENUM_POLYGON + _Base.PARAM_SUB + queryOption.space.north + _Base.PARAM_COMMA + queryOption.space.west + _Base.PARAM_SPLIT + queryOption.space.north + _Base.PARAM_COMMA + queryOption.space.east + _Base.PARAM_SPLIT + queryOption.space.south + _Base.PARAM_COMMA + queryOption.space.east + _Base.PARAM_SPLIT + queryOption.space.south + _Base.PARAM_COMMA + queryOption.space.west;
      this.queryOption.aggGeoFormat = _Base.QUERY_GEOHASH_POINT; //结果以点的形式返回
      this.queryOption.percision = queryOption.space.percision;
      //处理时间属性参数
      this.queryOption.timefield = queryOption.time.field; //时间字段
      this.queryOption.timeCondition = "" + queryOption.time.starttime + _Base.PARAM_COMMA + queryOption.time.endtime; //时间起始时间
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(result, map, style) {
      if (_leaflet2.default.zondy.GeoHashLayer != undefined) _leaflet2.default.zondy.GeoHashLayer.remove();
      var dataSet = [];
      var features = result.features;
      if (features == null || features == undefined) return;
      features.forEach(function (feature) {
        dataSet.push({
          geometry: {
            type: 'Point',
            coordinates: feature.geometry.coordinates
          },
          count: feature.properties.aggcount
        });
      });
      dataSet = new dataSet(dataSet);
      _leaflet2.default.zondy.GeoHashLayer = new _MapvLayer.MapVLayer(map, dataSet, style).addTo(map);
    }
  }, {
    key: "onFailure",
    value: function onFailure() {}

    // convertData(response) {
    //   this.dataSet = [];
    //   response.features.forEach(function(feature) {
    //     this.dataSet.push({
    //       geometry: {
    //         type: 'Point',
    //         coordinates: feature.geometry.coordinates
    //       },
    //       count: feature.properties.aggcount
    //     });
    //   });
    // }
    //
    // updateLayer() {
    //   this.layer = new MapVLayer(this.map, this.dataSet, this.styleOption).addTo(this.map);
    // }
    //
    // removeLayer() {
    //   this.layer.remove(this.map);
    // }

  }]);

  return GeoPointService;
}();

;

var geoPointService = exports.geoPointService = function geoPointService(ip, socket, map, queryOption, styleOption) {
  return new GeoPointService(ip, socket, map, queryOption, styleOption);
};

_leaflet2.default.zondy.GeoPointService = geoPointService;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (exports, module) {
  'use strict';

  var defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  };

  function generateCallbackFunction() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }

  function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }

  function removeScript(scriptId) {
    var script = document.getElementById(scriptId);
    if (script) {
      document.getElementsByTagName('head')[0].removeChild(script);
    }
  }

  function fetchJsonp(_url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // to avoid param reassign
    var url = _url;
    var timeout = options.timeout || defaultOptions.timeout;
    var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

    var timeoutId = undefined;

    return new Promise(function (resolve, reject) {
      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
      var scriptId = jsonpCallback + '_' + callbackFunction;

      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return Promise.resolve(response);
          }
        });

        if (timeoutId) clearTimeout(timeoutId);

        removeScript(scriptId);

        clearFunction(callbackFunction);
      };

      // Check if the user set their own params, and if not add a ? to start a list of params
      url += url.indexOf('?') === -1 ? '?' : '&';

      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
      if (options.charset) {
        jsonpScript.setAttribute('charset', options.charset);
      }
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        window[callbackFunction] = function () {
          clearFunction(callbackFunction);
        };
      }, timeout);

      // Caught if got 404/500
      jsonpScript.onerror = function () {
        reject(new Error('JSONP request to ' + _url + ' failed'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    });
  }

  // export as global function
  /*
  let local;
  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }
  local.fetchJsonp = fetchJsonp;
  */

  module.exports = fetchJsonp;
});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  // if __disableNativeFetch is set to true, the it will always polyfill fetch
  // with Ajax.
  if (!self.__disableNativeFetch && self.fetch) {
    return
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob, options) {
    var reader = new FileReader()
    var contentType = options.headers.map['content-type'] ? options.headers.map['content-type'].toString() : ''
    var regex = /charset\=[0-9a-zA-Z\-\_]*;?/
    var _charset = blob.type.match(regex) || contentType.match(regex)
    var args = [blob]

    if(_charset) {
      args.push(_charset[0].replace(/^charset\=/, '').replace(/;$/, ''))
    }

    reader.readAsText.apply(reader, args)
    return fileReaderReady(reader)
  }

  var support = {
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function Body() {
    this.bodyUsed = false


    this._initBody = function(body, options) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
        this._options = options
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob, this._options)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body, options)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this._initBody(bodyInit, options)
    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return;
      }

      var __onLoadHandled = false;

      function onload() {
        if (xhr.readyState !== 4) {
          return
        }
        var status = (xhr.status === 1223) ? 204 : xhr.status
        if (status < 100 || status > 599) {
          if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
          reject(new TypeError('Network request failed'))
          return
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText;

        if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
        resolve(new Response(body, options))
      }
      xhr.onreadystatechange = onload;
      xhr.onload = onload;
      xhr.onerror = function() {
        if (__onLoadHandled) { return; } else { __onLoadHandled = true; }
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      // `withCredentials` should be setted after calling `.open` in IE10
      // http://stackoverflow.com/a/19667959/1219343
      try {
        if (request.credentials === 'include') {
          if ('withCredentials' in xhr) {
            xhr.withCredentials = true;
          } else {
            console && console.warn && console.warn('withCredentials is not supported, you can ignore this warning');
          }
        }
      } catch (e) {
        console && console.warn && console.warn('set withCredentials error:' + e);
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true

  // Support CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = self.fetch;
  }
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 17 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6), __webpack_require__(17)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(18);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = function(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
};

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(19).setImmediate))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promisePolyfill = __webpack_require__(20);

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//这里把系统的Promise替换程了promise-polyfill的版本，为了不同浏览器之间的兼容性
window.Promise = _promisePolyfill2.default;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FetchRequest = exports.DefaultTimeout = exports.CORS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(21);

__webpack_require__(16);

var _fetchJsonp = __webpack_require__(15);

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

var _Base = __webpack_require__(2);

var _Util = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetch = window.fetch;

/**
 * @member Zondy.CORS
 * @description 是否支持跨域
 * @type {boolean}
 */
var CORS = _Base.Zondy.CORS = _Base.Zondy.CORS || window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest();

/**
 * @member Zondy.DefaultTimeout
 * @description 请求超时时间，默认60s
 * @type {number}
 */
var DefaultTimeout = _Base.Zondy.DefaultTimeout = _Base.Zondy.DefaultTimeout || 60000;

/**
 * @class FetchRequest
 * @classdesc 核心请求库，该库封装了GET,POST,PUT,DELETE四种网络请求，使用jsonp进行客户端的跨域处理以及proxy代理功能
 */
var FetchRequest = _Base.Zondy.FetchRequest = {
    commit: function commit(method, url, params, options) {
        method = method ? method.toUpperCase() : method;
        switch (method) {
            case 'GET':
                return this.get(url, params, options);
            case 'POST':
                return this.post(url, params, options);
            case 'PUT':
                return this.put(url, params, options);
            case 'DELETE':
                return this.delete(url, params, options);
            default:
                return this.get(url, params, options);
        }
    },

    get: function get(url, params, options) {
        options = options || {};
        var type = 'GET';
        url = this.prefixUrl(url, options);
        url = (0, _Util.appendUrl)(url, this.getParamString(params || {}));
        if (!this.urlIsLong(url)) {
            return this.fetchByES(url, params, options, type);
        }
        return this.postSimulate(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    delete: function _delete(url, params, options) {
        options = options || {};
        var type = 'DELETE';
        url = this.prefixUrl(url, options);
        url = (0, _Util.appendUrl)(url, this.getParamString(params || {}));
        if (!this.urlIsLong(url) && CORS) {
            return this.fetchByES(url, params, options, type);
        }
        return this.postSimulate(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    post: function post(url, params, options) {
        options = options || {};
        return this.fetchByES(this.prefixUrl(url, options), params, options, 'POST');
    },

    put: function put(url, params, options) {
        options = options || {};
        return this.fetchByES(this.prefixUrl(url, options), params, options, 'PUT');
    },

    /**
    * 判断当前url的长度是否超过2000的限制
    * @function Zondy.FetchRequest.prototype.postSimulate
    * 
    * @param url - {String} 网络请求Url.
    * @returns post {function} 发送处理好参数后的url的post请求.
    */
    urlIsLong: function urlIsLong(url) {
        //当前url的字节长度。
        var totalLength = 0,
            charCode = null;
        for (var i = 0, len = url.length; i < len; i++) {
            //转化为Unicode编码
            charCode = url.charCodeAt(i);
            if (charCode < 0x007f) {
                // 0 -127是单字节
                totalLength++;
            } else if (0x0080 <= charCode && charCode <= 0x07ff) {
                // 128 -2047是双字节
                totalLength += 2;
            } else if (0x0800 <= charCode && charCode <= 0xffff) {
                // 2048 -65535是三字节
                totalLength += 3;
            }
        }
        return totalLength < 2000 ? false : true;
    },

    /**
     * 模拟post请求Url
     * @function Zondy.FetchRequest.prototype.postSimulate
     * 
     * @param type - {String} "get, post, delete, add".
     * @param url - {String} 网络请求Url.
     * @param params - {String} 网络请求参数.
     * @param options - {Object} 额外的选项.
     * @returns post {function} 发送处理好参数后的url的post请求.
     */
    postSimulate: function postSimulate(type, url, params, options) {
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        url += separator + '_method=' + type;
        if (typeof params !== 'string') {
            params = JSON.stringify(params);
        }
        return this.post(url, params, options);
    },

    /**
     * 修正代理后的post请求Url
     * @function Zondy.FetchRequest.prototype.prefixUrl
     * 
     * @param url - {String} 网络请求Url.
     * @param options - {Object} 额外的选项.
     * @returns url {String} 发送处理好代理参数后的url.
     */
    prefixUrl: function prefixUrl(url, options) {
        if (options && options.proxy) {
            if (typeof options.proxy === "function") {
                url = options.proxy(url);
            } else {
                url = decodeURIComponent(url);
                url = options.proxy + encodeURIComponent(url);
            }
        }
        return url;
    },

    /**
     * 模拟post请求Url
     * @function Zondy.FetchRequest.prototype.fetchByES
     * 
     * @param url - {String} 网络请求Url.
     * @param params - {String} 网络请求参数.
     * @param options - {Object} 额外的选项.
     * @param type - {String} "get, post, delete, add".
     * @returns response {Object} 返回结果.
     */
    fetchByES: function fetchByES(url, params, options, type) {
        options = options || {};
        options.headers = options.headers || {};
        if (!options.headers['Content-Type']) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        //        options.headers['Access-Control-Allow-Origin'] = '*';
        //        options.headers['Access-Control-Allow-Headers'] = 'Origin,X-Requested-With,Content-Type,Accept';
        //        options.headers['Accept'] = 'application/json';
        // options.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, DELETE';
        if (options.timeout) {
            return this.timeDelay(options.timeout, fetch(url, {
                method: type,
                headers: options.headers,
                body: type === 'PUT' || type === 'POST' ? params : undefined,
                credentials: options.withCredentials ? 'include' : 'omit',
                mode: 'cors',
                timeout: DefaultTimeout
            }).then(function (response) {
                return response;
            }));
        }
        return fetch(url, {
            method: type,
            body: type === 'PUT' || type === 'POST' ? params : undefined,
            headers: options.headers,
            credentials: options.withCredentials ? 'include' : 'omit',
            mode: 'cors',
            timeout: DefaultTimeout
        }).then(function (response) {
            return response;
        });
    },

    /**
     * 当需要前端使用jsonp进行跨域的时候，使用jsonp进行跨域，这个最好直接让后台改下跨域问题就行了，免得麻烦
     * @function Zondy.FetchRequest.prototype.fetchByJsonp
     * 
     * @param url - {String} 网络请求Url.
     * @param options - {Object} 额外的选项.
     * @returns url {String} 发送处理好代理参数后的url.
     */
    fetchByJsonp: function fetchByJsonp(url, options) {
        options = options || {};
        return (0, _fetchJsonp2.default)(url, { method: 'GET', timeout: options.timeout }).then(function (response) {
            return response;
        });
    },

    /**
     * 延时发送网络请求
     * @function Zondy.FetchRequest.prototype.timeDelay
     * 
     * @param seconds - {Number} 延时的秒数.
     * @param promise - {Promise} 要延时执行的Promise.
     * @returns {Promise} 延迟处理的Promise.
     */
    timeDelay: function timeDelay(seconds, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("timeout"));
            }, seconds);
            promise.then(resolve, reject);
        });
    },

    getParamString: function getParamString(params) {
        var paramsArray = [];
        for (var key in params) {
            var value = params[key];
            if (value != null && typeof value !== 'function') {
                var encodedValue;
                if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Array) {
                    var encodedItemArray = [];
                    var item;
                    for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                        item = value[itemIndex];
                        encodedItemArray.push(encodeURIComponent(item === null || item === undefined ? "" : item));
                    }
                    encodedValue = '[' + encodedItemArray.join(",") + ']';
                } else {
                    encodedValue = encodeURIComponent(value);
                }
                paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
            }
        }
        return paramsArray.join("&");
    }
};
exports.CORS = CORS;
exports.DefaultTimeout = DefaultTimeout;
exports.FetchRequest = FetchRequest;

_Base.Zondy.Network.FetchRequest = FetchRequest;
_Base.Zondy.Network.CORS = CORS;
_Base.Zondy.Network.DefaultTimeout = DefaultTimeout;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * elasticsearch的HTTP前缀
 * @type {String}
 * @default http://
 * @readonly
 */
var URL_HTTP_PROFIX = exports.URL_HTTP_PROFIX = "http://";

/**
 * elasticsearch的URL路径分隔符
 * @type {String}
 * @default /
 * @readonly
 */
var URL_DIVISION = exports.URL_DIVISION = "/";

/**
 * elasticsearch的URL端口分割符
 * @type {String}
 * @default :
 * @readonly
 */
var URL_SUB = exports.URL_SUB = ":";

/**
 * elasticsearch的默认端口号
 * @type {String}
 * @default 8020
 * @readonly
 */
var uriSocket = exports.uriSocket = "8020";

/**
 * elasticsearch的默认参数分隔符
 * @type {String}
 * @default ?
 * @readonly
 */
var uriBody_end = exports.uriBody_end = "?";

/**
 * elasticsearch的默认参数分隔符
 * @type {String}
 * @default &
 * @readonly
 */
var uriParamLink = exports.uriParamLink = "&";

/**
 * elasticsearch的默认请求前缀
 * @type {String}
 * @default es
 * @readonly
 */
var elsName = exports.elsName = "es";
/**
 * elasticsearch的默认常规查询
 * @type {String}
 * @default generalQuery
 * @readonly
 */
var elsQuery = exports.elsQuery = "generalQuery";
/**
 * elasticsearch的默认index筛选参数
 * @type {String}
 * @default indexName=
 * @readonly
 */
var elsIndex = exports.elsIndex = "indexName=";
/**
 * elasticsearch的默认type筛选参数
 * @type {String}
 * @default typeName=
 * @readonly
 */
var elsType = exports.elsType = "typeName=";
/**
 * elasticsearch的默认空间筛选参数
 * @type {String}
 * @default spatialCondition=
 * @readonly
 */
var elsSpatial = exports.elsSpatial = "spatialCondition=";
/**
 * elasticsearch的默认时间筛选参数
 * @type {String}
 * @default timeCondition=
 * @readonly
 */
var elsTimeComdition = exports.elsTimeComdition = "timeCondition=";
/**
 * elasticsearch的默认查询租佃参数
 * @type {String}
 * @default queryField=
 * @readonly
 */
var elsQueryField = exports.elsQueryField = "queryField=";

/**
 * elasticsearch的默认查询租佃参数
 * @type {String}
 * @default queryField=
 * @readonly
 */
var PARAM_SUB = exports.PARAM_SUB = ":";
/**
 * elasticsearch的默认查询租佃参数
 * @type {String}
 * @default queryField=
 * @readonly
 */
var PARAM_COMMA = exports.PARAM_COMMA = ",";
/**
 * elasticsearch的默认分号
 * @type {String}
 * @default ;
 * @readonly
 */
var PARAM_SPLIT = exports.PARAM_SPLIT = ";";
/**
 * elasticsearch的默认类型
 * @type {String}
 * @default 0
 * @readonly
 */
var aggGeoFormat = exports.aggGeoFormat = "0"; //0表示点  1表示区
/**
 * elasticsearch的默认聚类精度
 * @type {String}
 * @default percision
 * @readonly
 */
var elsPercision = exports.elsPercision = "percision"; //geohash聚类的精度

/**
 * elasticsearch的空间-点类型
 * @type {String}
 * @default point
 * @readonly
 */
var SPACE_ENUM_POINT = exports.SPACE_ENUM_POINT = "point";
/**
 * elasticsearch的空间-线类型
 * @type {String}
 * @default line
 * @readonly
 */
var SPACE_ENUM_LINE = exports.SPACE_ENUM_LINE = "line";
/**
 * elasticsearch的空间-区类型
 * @type {String}
 * @default polygon
 * @readonly
 */
var SPACE_ENUM_POLYGON = exports.SPACE_ENUM_POLYGON = "polygon";

/**
 * elasticsearch的地理哈希聚合服务
 * @type {String}
 * @default polygon
 * @readonly
 */
var QUERY_GEOHASH = exports.QUERY_GEOHASH = "stGeoHashQueryByAgg";
/**
 * elasticsearch的地理哈希聚合服务返回结果-点类型
 * @type {String}
 * @default 0
 * @readonly
 */
var QUERY_GEOHASH_POINT = exports.QUERY_GEOHASH_POINT = "0";
/**
 * elasticsearch的地理哈希聚合服务返回结果-区类型
 * @type {String}
 * @default 1
 * @readonly
 */
var QUERY_GEOHASH_POLYGON = exports.QUERY_GEOHASH_POLYGON = "1";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoHashService = exports.GeoHashService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

var _mapv = __webpack_require__(4);

var _BaseDefine = __webpack_require__(23);

var _IServiceLoadData = __webpack_require__(7);

__webpack_require__(1);

var _MapvLayer = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_leaflet2.default.zondy.GeoHashLayer = undefined;

/**
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class L.zondy.GeoHashService
 * @classdesc 基于leaflet与mapv的针对els的地理哈希聚类的封装接口
 * @param ip - {String} 传入的datastore的部署的ip地址
 * @param socket - {String} 传入的datastore的部署的ip端口
 * @param map - {Object} 传入的leaflet的地图对象
 * @param queryOption - {TimeSpaceOption} 传入的时间空间查询接口
 * @param styleOption - {MapvOption} 传入的mapv的属性
 * @param callback(result) - {function} 请求成功的回调函数，返回请求数据<br>
 */

var GeoHashService = exports.GeoHashService = function () {
  function GeoHashService(ip, socket, map, queryOption, styleOption, callback) {
    _classCallCheck(this, GeoHashService);

    this.layer = null;

    this.map = map;
    this.urlAddress = "";

    this.queryOption = {};
    this.styleOption = styleOption;

    this.onCallback = callback;

    this.prefixUrlPost(ip, socket, queryOption);
    new _IServiceLoadData.IServiceLoadData("GET", this.urlAddress, this.queryOption, this.styleOption, this.map, this.onSuccess, this.onFailure, this.onCallback);
  }

  /*
  * 下面的逻辑是对应的DataStore的Post请求一一对应，这里只是一个封装，将用户的直观参数
  转换成DataStore要求的参数
  */


  _createClass(GeoHashService, [{
    key: "prefixUrlPost",
    value: function prefixUrlPost(ip, socket, queryOption) {
      //处理url
      this.urlAddress = "" + _BaseDefine.URL_HTTP_PROFIX + ip + _BaseDefine.URL_SUB + socket + "/es/" + _BaseDefine.QUERY_GEOHASH;
      //处理elasticsearch的数据库库名,表名
      this.queryOption.indexName = queryOption.db;
      this.queryOption.typeName = queryOption.table;

      //处理空间属性参数
      if (queryOption && queryOption.space) {
        this.queryOption.aggfield = queryOption.space.field; //空间字段  
        this.queryOption.spatialCondition = _BaseDefine.SPACE_ENUM_POLYGON + _BaseDefine.PARAM_SUB + queryOption.space.north + _BaseDefine.PARAM_COMMA + queryOption.space.west + _BaseDefine.PARAM_SPLIT + queryOption.space.north + _BaseDefine.PARAM_COMMA + queryOption.space.east + _BaseDefine.PARAM_SPLIT + queryOption.space.south + _BaseDefine.PARAM_COMMA + queryOption.space.east + _BaseDefine.PARAM_SPLIT + queryOption.space.south + _BaseDefine.PARAM_COMMA + queryOption.space.west;
      }

      //处理时间属性参数
      if (queryOption && queryOption.time) {
        this.queryOption.timefield = queryOption.time.field; //时间字段  
        this.queryOption.timeCondition = "" + queryOption.time.starttime + _BaseDefine.PARAM_COMMA + queryOption.time.endtime; //时间起始时间
        this.startTime = queryOption.time.starttime;
        this.endTime = queryOption.time.endtime;
      }

      this.queryOption.aggGeoFormat = _BaseDefine.QUERY_GEOHASH_POINT; //结果以点的形式返回
      this.queryOption.percision = queryOption.space.percision;
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(result, map, style, callback) {
      /*     if(result.succeed != true){
            console.log("els成功的回调里面的succeed！=true，请检查els的后台环境！")
            return;
          }else{
            console.log(result)
          } */
      if (_leaflet2.default.zondy.GeoHashLayer != undefined) _leaflet2.default.zondy.GeoHashLayer.remove();
      var dataSet = [];
      var features = result.features;
      if (features == null || features == undefined) return;
      features.forEach(function (feature) {
        dataSet.push({
          geometry: {
            type: 'Point',
            coordinates: feature.geometry.coordinates
          },
          count: feature.properties.aggcount
        });
      });
      dataSet = new _mapv.DataSet(dataSet);
      _leaflet2.default.zondy.GeoHashLayer = new _MapvLayer.MapVLayer(map, dataSet, style).addTo(map);

      if (callback != null && callback != undefined) {
        callback(result);
      }
    }
  }, {
    key: "onFailure",
    value: function onFailure() {}

    // convertData(response) {
    //   this.dataSet = [];
    //   response.features.forEach(function(feature) {
    //     this.dataSet.push({
    //       geometry: {
    //         type: 'Point',
    //         coordinates: feature.geometry.coordinates
    //       },
    //       count: feature.properties.aggcount
    //     });
    //   });
    // }
    //
    // updateLayer() {
    //   this.layer = new MapVLayer(this.map, this.dataSet, this.styleOption).addTo(this.map);
    // }
    //
    // removeLayer() {
    //   this.layer.remove(this.map);
    // }

  }]);

  return GeoHashService;
}();

;

var geoHashService = exports.geoHashService = function geoHashService(ip, socket, map, queryOption, styleOption, callback) {
  return new GeoHashService(ip, socket, map, queryOption, styleOption, callback);
};

_leaflet2.default.zondy.GeoHashService = geoHashService;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeoPointService = exports.GeoHashService = undefined;

var _GeoHashService = __webpack_require__(24);

var _GeoPointService = __webpack_require__(14);

exports.GeoHashService = _GeoHashService.GeoHashService;
exports.GeoPointService = _GeoPointService.GeoPointService;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ServiceEvent = __webpack_require__(9);

Object.defineProperty(exports, "ServiceEvent", {
  enumerable: true,
  get: function get() {
    return _ServiceEvent.ServiceEvent;
  }
});

var _elasticsearch = __webpack_require__(25);

Object.keys(_elasticsearch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _elasticsearch[key];
    }
  });
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeojsonBaseLayer = undefined;

var _GeojsonBaseLayer = __webpack_require__(8);

exports.GeojsonBaseLayer = _GeojsonBaseLayer.GeojsonBaseLayer;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* import echarts from 'echarts';
import LeafletCoordSys from './LeafletCoordSys';

import './LeafletModel';

if (echarts & echarts.registerCoordinateSystem & echarts.registerAction) {
  echarts.registerCoordinateSystem('leaflet', LeafletCoordSys);

  echarts.registerAction({
      type: 'LeafletRoma',
      event: 'LeafletRoma',
      update: 'updateLayout'
    },
    function (payload, ecModel) {
       ecModel.eachComponent('leaflet', function(leafletModel) {
        const leaflet = leafletModel.getLeaflet();
        const center = leaflet.getCenter();
        leafletModel.setCenterAndZoom(
          [center.lng, center.lat],
          leaflet.getZoom()
        );
      }); 
    }
  );

}

export const version = '1.0.0'; */


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapvBaseLayer = undefined;

var _MapvBaseLayer = __webpack_require__(12);

exports.MapvBaseLayer = _MapvBaseLayer.MapvBaseLayer;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Evented = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = __webpack_require__(10);

var Util = _interopRequireWildcard(_Util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * @class Evented
 * @aka L.Evented
 * @inherits Class
 *
 * A set of methods shared between event-powered classes (like `Map` and `Marker`). Generally, Evented allow you to execute some function when something happens with an object (e.g. the user clicks on the map, causing the map to fire `'click'` event).
 *
 * @example
 *
 * ```js
 * map.on('click', function(e) {
 * 	alert(e.latlng);
 * } );
 * ```
 *
 * Leaflet deals with event listeners by reference, so if you want to add a listener and then remove it, define it as a function:
 *
 * ```js
 * function onClick(e) { ... }
 *
 * map.on('click', onClick);
 * map.off('click', onClick);
 * ```
 */

var Evented = exports.Evented = function () {
  function Evented() {
    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: "on",

    /* @method on(type: String, fn: Function, context?: Object): this
     * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
     *
     * @alternative
     * @method on(eventMap: Object): this
     * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
     */
    value: function on(types, fn, context) {
      // types can be a map of types/handlers
      if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {
        for (var type in types) {
          // we don't process space-separated Evented here for performance;
          // it's a hot path since Layer uses the on(obj) syntax
          this._on(type, types[type], fn);
        }
      } else {
        // types can be a string of space-separated words
        types = Util.splitWords(types);

        for (var i = 0, len = types.length; i < len; i++) {
          this._on(types[i], fn, context);
        }
      }

      return this;
    }

    /* @method off(type: String, fn?: Function, context?: Object): this
     * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
     *
     * @alternative
     * @method off(eventMap: Object): this
     * Removes a set of type/listener pairs.
     *
     * @alternative
     * @method off: this
     * Removes all listeners to all Evented on the object.
     */

  }, {
    key: "off",
    value: function off(types, fn, context) {
      if (!types) {
        // clear all listeners if called without arguments
        delete this._Evented;
      } else if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {
        for (var type in types) {
          this._off(type, types[type], fn);
        }
      } else {
        types = Util.splitWords(types);

        for (var i = 0, len = types.length; i < len; i++) {
          this._off(types[i], fn, context);
        }
      }

      return this;
    }

    // attach listener (without syntactic sugar now)

  }, {
    key: "_on",
    value: function _on(type, fn, context) {
      this._Evented = this._Evented || {};

      /* get/init listeners for type */
      var typeListeners = this._Evented[type];
      if (!typeListeners) {
        typeListeners = [];
        this._Evented[type] = typeListeners;
      }

      if (context === this) {
        // Less memory footprint.
        context = undefined;
      }
      var newListener = { fn: fn, ctx: context },
          listeners = typeListeners;

      // check if fn already there
      for (var i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i].fn === fn && listeners[i].ctx === context) {
          return;
        }
      }

      listeners.push(newListener);
    }
  }, {
    key: "_off",
    value: function _off(type, fn, context) {
      var listeners, i, len;

      if (!this._Evented) {
        return;
      }

      listeners = this._Evented[type];

      if (!listeners) {
        return;
      }

      if (!fn) {
        // Set all removed listeners to noop so they are not called if remove happens in fire
        for (i = 0, len = listeners.length; i < len; i++) {
          listeners[i].fn = Util.falseFn;
        }
        // clear all listeners for a type if function isn't specified
        delete this._Evented[type];
        return;
      }

      if (context === this) {
        context = undefined;
      }

      if (listeners) {
        // find fn and remove it
        for (i = 0, len = listeners.length; i < len; i++) {
          var l = listeners[i];
          if (l.ctx !== context) {
            continue;
          }
          if (l.fn === fn) {
            // set the removed listener to noop so that's not called if remove happens in fire
            l.fn = Util.falseFn;

            if (this._firingCount) {
              /* copy array in case Evented are being fired */
              this._Evented[type] = listeners = listeners.slice();
            }
            listeners.splice(i, 1);

            return;
          }
        }
      }
    }

    // @method fire(type: String, data?: Object, propagate?: Boolean): this
    // Fires an event of the specified type. You can optionally provide an data
    // object — the first argument of the listener function will contain its
    // properties. The event can optionally be propagated to event parents.

  }, {
    key: "fire",
    value: function fire(type, data, propagate) {
      if (!this.listens(type, propagate)) {
        return this;
      }

      var event = Util.extend({}, data, {
        type: type,
        target: this,
        sourceTarget: data && data.sourceTarget || this
      });

      if (this._Evented) {
        var listeners = this._Evented[type];

        if (listeners) {
          this._firingCount = this._firingCount + 1 || 1;
          for (var i = 0, len = listeners.length; i < len; i++) {
            var l = listeners[i];
            l.fn.call(l.ctx || this, event);
          }

          this._firingCount--;
        }
      }

      if (propagate) {
        // propagate the event to parents (set with addEventParent)
        this._propagateEvent(event);
      }
      return this;
    }

    // @method listens(type: String): Boolean
    // Returns `true` if a particular event type has any listeners attached to it.

  }, {
    key: "listens",
    value: function listens(type, propagate) {
      var listeners = this._Evented && this._Evented[type];
      if (listeners && listeners.length) {
        return true;
      }

      if (propagate) {
        // also check parents for listeners if event propagates
        for (var id in this._eventParents) {
          if (this._eventParents[id].listens(type, propagate)) {
            return true;
          }
        }
      }
      return false;
    }

    // @method once(…): this
    // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.

  }, {
    key: "once",
    value: function once(types, fn, context) {
      if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {
        for (var type in types) {
          this.once(type, types[type], fn);
        }
        return this;
      }

      var handler = Util.bind(function () {
        this.off(types, fn, context).off(types, handler, context);
      }, this);

      // add a listener that's executed once and removed after that
      return this.on(types, fn, context).on(types, handler, context);
    }

    // @method addEventParent(obj: Evented): this
    // Adds an event parent - an `Evented` that will receive propagated Evented

  }, {
    key: "addEventParent",
    value: function addEventParent(obj) {
      this._eventParents = this._eventParents || {};
      this._eventParents[Util.stamp(obj)] = obj;
      return this;
    }

    // @method removeEventParent(obj: Evented): this
    // Removes an event parent, so it will stop receiving propagated Evented

  }, {
    key: "removeEventParent",
    value: function removeEventParent(obj) {
      if (this._eventParents) {
        delete this._eventParents[Util.stamp(obj)];
      }
      return this;
    }
  }, {
    key: "_propagateEvent",
    value: function _propagateEvent(e) {
      for (var id in this._eventParents) {
        this._eventParents[id].fire(e.type, Util.extend({
          layer: e.target,
          propagatedFrom: e.target
        }, e), true);
      }
    }
  }]);

  return Evented;
}();

// aliases; we should ditch those eventually

// @method addEventListener(…): this
// Alias to [`on(…)`](#evented-on)


Evented.addEventListener = Evented.on;

// @method removeEventListener(…): this
// Alias to [`off(…)`](#evented-off)

// @method clearAllEventListeners(…): this
// Alias to [`off()`](#evented-off)
Evented.removeEventListener = Evented.clearAllEventListeners = Evented.off;

// @method addOneTimeEventListener(…): this
// Alias to [`once(…)`](#evented-once)
Evented.addOneTimeEventListener = Evented.once;

// @method fireEvent(…): this
// Alias to [`fire(…)`](#evented-fire)
Evented.fireEvent = Evented.fire;

// @method hasEventListeners(…): Boolean
// Alias to [`listens(…)`](#evented-listens)
Evented.hasEventListeners = Evented.listens;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ISocketService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = __webpack_require__(2);

var _Evented = __webpack_require__(30);

var _SocketEvent = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_Base.Zondy.Socket.ISocketService = undefined;

/**
 * Socket的基类
 * @author 潘卓然ParnDeedlit 基础平台/创新中心
 *
 * @alias ISocketService
 * @constructor
 *
 * @param {Object} url Socket流地址的url：
 * @param {Number} options 其他预留参数.
 *
 * @example
 * 固定url  ws://{ip}:{socket}/websocket/{servicename}
 * 服务名 streamdemo
 * 消息接收 ws://192.168.91.121:9382/websocket/streamdemo/subscribe
 * 消息发送 ws://192.168.91.121:9382/websocket/streamdemo/broadcast
 *
 */

var ISocketService = exports.ISocketService = function () {
  function ISocketService(url, options) {
    _classCallCheck(this, ISocketService);

    this.url = url || "";

    this.options = options;

    this.subscribesocket = null;
    this.subscribesocket = null;

    this.evented = new _Evented.Evented();
  }

  _createClass(ISocketService, [{
    key: "createSubscribe",
    value: function createSubscribe() {
      var self = this;
      this.subscribesocket = this.connect(this.url + _SocketEvent.SubscribePrefix);

      this.subscribesocket.onopen = function (event) {
        event.eventType = _SocketEvent.SubscribeEvent.OPEN;
        self.evented.fire(_SocketEvent.SubscribeEvent.OPEN, event);
      };
      this.subscribesocket.onmessage = function (event) {
        var feature = JSON.parse(event.data);
        event.feature = feature;
        event.eventType = _SocketEvent.SubscribeEvent.MESSAGE;
        self.evented.fire(_SocketEvent.SubscribeEvent.MESSAGE, event);
      };
      this.subscribesocket.onclose = function (event) {
        event.eventType = _SocketEvent.SubscribeEvent.CLOSE;
        self.evented.fire(_SocketEvent.SubscribeEvent.CLOSE, event);
      };
      this.subscribesocket.onerror = function (event) {
        event.eventType = _SocketEvent.SubscribeEvent.ERROR;
        self.evented.fire(_SocketEvent.SubscribeEvent.ERROR, event);
      };
    }
  }, {
    key: "createBroadcast",
    value: function createBroadcast() {
      var self = this;

      this.broadcastsocket = this.connect(this.url + _SocketEvent.BroadcastPrefix);

      this.broadcastsocket.onopen = function (event) {
        event.eventType = _SocketEvent.BroadcastEvent.OPEN;
        self.evented.fire(_SocketEvent.BroadcastEvent.OPEN, event);
      };
      this.broadcastsocket.onmessage = function (event) {
        var feature = JSON.parse(event.data);
        event.feature = feature;
        event.eventType = _SocketEvent.BroadcastEvent.MESSAGE;
        self.evented.fire(_SocketEvent.BroadcastEvent.MESSAGE, event);
      };
      this.broadcastsocket.onclose = function (event) {
        event.eventType = _SocketEvent.BroadcastEvent.CLOSE;
        self.evented.fire(_SocketEvent.BroadcastEvent.CLOSE, event);
      };
      this.broadcastsocket.onerror = function (event) {
        event.eventType = _SocketEvent.BroadcastEvent.ERROR;
        self.evented.fire(_SocketEvent.BroadcastEvent.ERROR, event);
      };
    }
  }, {
    key: "connect",
    value: function connect(url) {
      var socketFactory = "MozWebSocket" in window ? window.MozWebSocket : WebSocket;
      return new socketFactory(url);
    }
  }, {
    key: "broadcast",
    value: function broadcast(data) {
      if (!this.broadcastWebSocket || !this.broadcastWebSocket.isOpen) {
        return;
      }
      this.broadcastsocket.send(JSON.stringify(data));
    }
  }, {
    key: "closeSubscribe",
    value: function closeSubscribe() {
      this.subscribesocket.close();
      this.subscribesocket = null;
    }
  }, {
    key: "closeBroadcast",
    value: function closeBroadcast() {
      this.broadcastsocket.close();
      this.broadcastsocket = null;
    }
  }, {
    key: "close",
    value: function close() {
      this.subscribesocket.close();
      this.broadcastsocket.close();
      this.subscribesocket = null;
      this.broadcastsocket = null;
    }
  }]);

  return ISocketService;
}();

_Base.Zondy.Socket.ISocketService = ISocketService;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socketService = exports.SocketService = undefined;

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

var _SocketEvent = __webpack_require__(3);

var _ISocketService = __webpack_require__(31);

var _ServiceEvent = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_leaflet2.default.zondy.SocketService = undefined;

/**
 * LeafeltSocket的代理类，实际上是接受websocket的事件，然后转换成leaflet的事件再进行发送
 * @author 潘卓然ParnDeedlit 基础平台/创新中心
 *
 * @alias SocketService
 * @constructor
 *
 * @param {Object} url Socket流地址的url：
 * @param {Number} options 其他预留参数.
 *
 * @example
 * 固定url  ws://{ip}:{socket}/websocket/{servicename}
 * 服务名 streamdemo
 * 消息接收 ws://192.168.91.121:9382/websocket/streamdemo/subscribe
 * 消息发送 ws://192.168.91.121:9382/websocket/streamdemo/broadcast
 *
 * @exception {DeveloperError} options.styleOption 必须是正确的样式.
 *
 */
var SocketService = exports.SocketService = _ServiceEvent.ServiceEvent.extend({
  initialize: function initialize(url, options) {
    this.url = url || "";

    this.options = options || {};

    this.socket = new _ISocketService.ISocketService(url, options);
  },
  createSubscribe: function createSubscribe() {
    console.log("在使用流图层的时候容易出现回调堆栈溢出的问题，其核心原因是socket通信是双工通信，因此上下文环境context在不同的场景下是不一样的，以leaflet的on为例，其函数原型off(types, fn, context)第三个参数context的默认会是运行时的this而不是绑定时的this，最好在使用on监听的时候主动传入真正的上下文环境this");
    this.socket.createSubscribe();
    this.socket.evented.on(_SocketEvent.SubscribeEvent.OPEN, this.mapEvent, this);
    this.socket.evented.on(_SocketEvent.SubscribeEvent.MESSAGE, this.mapEvent, this);
    this.socket.evented.on(_SocketEvent.SubscribeEvent.CLOSE, this.mapEvent, this);
    this.socket.evented.on(_SocketEvent.SubscribeEvent.ERROR, this.mapEvent, this);
  },
  createBroadcast: function createBroadcast() {
    this.socket.createBroadcast();
    this.socket.evented.on(_SocketEvent.BroadcastEvent.OPEN, this.mapEvent, this);
    this.socket.evented.on(_SocketEvent.BroadcastEvent.MESSAGE, this.mapEvent, this);
    this.socket.evented.on(_SocketEvent.BroadcastEvent.CLOSE, this.mapEvent, this);
    this.socket.evented.on(_SocketEvent.BroadcastEvent.ERROR, this.mapEvent, this);
  },
  mapEvent: function mapEvent(event) {
    this.fire(event.eventType || event.type, event);
  },
  broadcast: function broadcast(data) {
    if (!this.socket) {
      return;
    }
    this.socket.broadcast(data);
  },
  closeSubscribe: function closeSubscribe() {
    this.socket.closeSubscribe();
    this.socket.evented.off(_SocketEvent.SubscribeEvent.OPEN, this.mapEvent, this);
    this.socket.evented.off(_SocketEvent.SubscribeEvent.MESSAGE, this.mapEvent, this);
    this.socket.evented.off(_SocketEvent.SubscribeEvent.CLOSE, this.mapEvent, this);
    this.socket.evented.off(_SocketEvent.SubscribeEvent.ERROR, this.mapEvent, this);
  },
  closeBroadcast: function closeBroadcast() {
    this.socket.closeBroadcast();
    this.socket.evented.off(_SocketEvent.BroadcastEvent.OPEN, this.mapEvent);
    this.socket.evented.off(_SocketEvent.BroadcastEvent.MESSAGE, this.mapEvent);
    this.socket.evented.off(_SocketEvent.BroadcastEvent.CLOSE, this.mapEvent);
    this.socket.evented.off(_SocketEvent.BroadcastEvent.ERROR, this.mapEvent);
  }
});

var socketService = exports.socketService = function socketService(url, options) {
  return new SocketService(url, options);
};

_leaflet2.default.zondy.SocketService = socketService;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streamLayer = exports.StreamLayer = undefined;

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

__webpack_require__(1);

var _SocketService = __webpack_require__(32);

var _SocketEvent = __webpack_require__(3);

var _GeojsonBaseLayer = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class L.zondy.StreamLayer
 * @classdesc 基于leaflet的Layer对象进行的拓展
 * @extends {L.LayerGroup}
 * @param {string} url - 数据流图层服务地址
 * @param {Object} options - 设置图层参数
 * @param {Object} [options.render='normal'] - 渲染方式。可选值为'geojson', 'mapv', 'echarts'
 */
var StreamLayer = exports.StreamLayer = _leaflet2.default.LayerGroup.extend({
  initialize: function initialize(map, url, options) {
    this.options = options || {};
    this.map = map;
    this.url = url;

    //与leaflet源代码一致，
    //var i = this.getLayerId(t);
    //return this._layers[i] = t
    this._layers = {};

    _leaflet2.default.Util.setOptions(this, options);

    this.socketService = new _SocketService.SocketService(this.url, this.options);
  },

  onAdd: function onAdd(map) {
    this.bindEvent();

    if (this.options.render === "mapv") {
      //this.addLayer(new MapvRenderer(this.url, this.options));
    } else {
      this.addLayer(new _GeojsonBaseLayer.GeojsonBaseLayer(this.url, this.options));
    }
    _leaflet2.default.LayerGroup.prototype.onAdd.call(this, map);
  },

  bindEvent: function bindEvent() {
    var _this = this;

    this.socketService.createSubscribe();

    this.socketService.on(_SocketEvent.SubscribeEvent.OPEN, function (e) {
      return _this.fire(_SocketEvent.SubscribeEvent.OPEN, e);
    });
    this.socketService.on(_SocketEvent.SubscribeEvent.MESSAGE, function (msg) {
      return _this.onMessage(msg);
    });
  },

  unbindEvent: function unbindEvent() {
    var _this2 = this;

    if (!this.socketService) return;

    this.socketService.on(_SocketEvent.SubscribeEvent.OPEN, function (e) {
      return _this2.fire(_SocketEvent.SubscribeEvent.OPEN, e);
    });
    this.socketService.on(_SocketEvent.SubscribeEvent.MESSAGE, function (msg) {
      return _this2.onMessage(msg);
    });

    this.socketService && this.socketService.closeSubscribe();
  },

  onRemove: function onRemove(map) {
    this.unbindEvent();
  },

  onMessage: function onMessage(msg) {
    var _this3 = this;

    this.getLayers().map(function (layer) {
      layer.onMessage(msg);
      _this3.fire(_SocketEvent.LayerEvent.UPDATE, {
        layer: layer,
        data: msg.feature
      });
      return layer;
    });
  }
});

var streamLayer = exports.streamLayer = function streamLayer(map, url, options) {
  return new StreamLayer(map, url, options);
};

_leaflet2.default.zondy.StreamLayer = streamLayer;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapCoordSys = MapCoordSys;

var _echarts = __webpack_require__(11);

var _echarts2 = _interopRequireDefault(_echarts);

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MapCoordSys(LeafletMap, api) {
    this._LeafletMap = LeafletMap;
    this.dimensions = ['lng', 'lat'];
    this._mapOffset = [0, 0];

    this._api = api;
}

MapCoordSys.prototype.dimensions = ['lng', 'lat'];

MapCoordSys.prototype.setMapOffset = function (mapOffset) {
    this._mapOffset = mapOffset;
};

MapCoordSys.prototype.getBMap = function () {
    return this._LeafletMap;
};

MapCoordSys.prototype.dataToPoint = function (data) {
    if (data[1] === null) {
        data[1] = 89.99;
    }

    var point = new _leaflet2.default.latLng(data[1], data[0]);
    var px = this._LeafletMap.latLngToLayerPoint(point);

    var mapOffset = this._mapOffset;

    return [px.x - mapOffset[0], px.y - mapOffset[1]];
};

MapCoordSys.prototype.pointToData = function (pt) {
    var mapOffset = this._mapOffset;
    var pt = this._LeafletMap.layerPointToLatLng([pt[0] + mapOffset[0], pt[1] + mapOffset[1]]);
    return [pt.lng, pt.lat];
};

MapCoordSys.prototype.getViewRect = function () {
    var api = this._api;
    return new _echarts2.default.graphic.BoundingRect(0, 0, api.getWidth(), api.getHeight());
};

MapCoordSys.prototype.getRoamTransform = function () {
    return _echarts2.default.matrix.create();
};

//https://github.com/apache/incubator-echarts/issues/6953
//https://github.com/apache/incubator-echarts/issues/7789
MapCoordSys.prototype.prepareCustoms = function () {
    var zrUtil = _echarts2.default.util;

    var rect = this.getViewRect();
    return {
        coordSys: {
            // The name exposed to user is always 'cartesian2d' but not 'grid'.
            type: 'leaflet',
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
        },
        api: {
            coord: zrUtil.bind(this.dataToPoint, this),
            size: zrUtil.bind(dataToCoordSize, this)
        }
    };

    function dataToCoordSize(dataSize, dataItem) {
        dataItem = dataItem || [0, 0];
        return zrUtil.map([0, 1], function (dimIdx) {
            var val = dataItem[dimIdx];
            var halfSize = dataSize[dimIdx] / 2;
            var p1 = [];
            var p2 = [];
            p1[dimIdx] = val - halfSize;
            p2[dimIdx] = val + halfSize;
            p1[1 - dimIdx] = p2[1 - dimIdx] = dataItem[1 - dimIdx];
            return Math.abs(this.dataToPoint(p1)[dimIdx] - this.dataToPoint(p2)[dimIdx]);
        }, this);
    }
};

// For deciding which dimensions to use when creating list data
MapCoordSys.dimensions = MapCoordSys.prototype.dimensions;

MapCoordSys.create = function (ecModel, api) {
    /* ecModel.eachComponent('LeafletMap', function (LeafletMapModel) {
        var leafletMap = echarts.leafletMap;
        coordSys = new MapCoordSys(leafletMap);
        coordSys.setMapOffset(LeafletMapModel.__mapOffset || [0, 0]);
        LeafletMapModel.coordinateSystem = coordSys;
    })
    ecModel.eachSeries(function (seriesModel) {
        if (seriesModel.get('coordinateSystem') === 'leaflet') {
            seriesModel.coordinateSystem = coordSys
        }
    }) */
    var coordSys;

    ecModel.eachComponent('leaflet', function (leafletMapModel) {
        var viewportRoot = api.getZr().painter.getViewportRoot();
        var leafletMap = _echarts2.default.leafletMap;
        if (!coordSys) {

            coordSys = new MapCoordSys(leafletMap, api);
        }

        coordSys.setMapOffset(leafletMapModel.__mapOffset || [0, 0]);
        leafletMapModel.coordinateSystem = coordSys;
    });

    ecModel.eachSeries(function (seriesModel) {
        if (!seriesModel.get('coordinateSystem') || seriesModel.get('coordinateSystem') === 'leaflet') {
            if (!coordSys) {
                var leafletMap = _echarts2.default.leafletMap;
                coordSys = new MapCoordSys(leafletMap, api);
            }
            seriesModel.coordinateSystem = coordSys;
            seriesModel.animation = seriesModel.animation === true;
        }
    });
};

exports.default = MapCoordSys;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.echartsLayer = exports.EchartsLayer = undefined;

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

var _echarts = __webpack_require__(11);

var _echarts2 = _interopRequireDefault(_echarts);

__webpack_require__(1);

var _MapCoordSys = __webpack_require__(34);

var _MapCoordSys2 = _interopRequireDefault(_MapCoordSys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * leaflet的echars 4.0的实现
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class L.zondy.EchartsLayer
 * @classdesc 基于leaflet的Layer对象进行的拓展
 * @param map - {Object} 传入的leaflet的地图对象
 * @param options - {Object} echarts.options
 * 
 * @see http://echarts.baidu.com/api.html#echarts
 */
var EchartsLayer = exports.EchartsLayer = _leaflet2.default.Layer.extend({

    map: null, //传入的leaflet地图
    chart: null,
    options: null,
    canvas: null,

    initialize: function initialize(map, options) {
        this.map = map;
        this.options = options;
        this.layerId = options.layerId || "echartlayerdefaultid";
        this.layerClass = options.classId || "echartlayerdefaultclass";

        this.initDevicePixelRatio();
        this.initOptions(this.options);
        this.initEcharts();

        this._resizeCanvas();
    },

    initDevicePixelRatio: function initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    },


    initOptions: function initOptions(options) {
        if (options) {
            if (options.leaflet) {
                return;
            }
            this.options.leaflet = {
                roam: true
            };
        }
    },

    initEcharts: function initEcharts() {
        _echarts2.default.registerCoordinateSystem('leaflet', _MapCoordSys2.default);

        _echarts2.default.extendComponentModel({
            type: 'leaflet',
            getBMap: function getBMap() {
                return this.__leaflet;
            },
            defaultOption: {
                roam: false
            }
        });

        _echarts2.default.registerAction({
            type: 'LeafletRoma',
            event: 'LeafletRoma',
            update: 'updateLayout'
        }, function (payload, ecModel) {
            /* ecModel.eachComponent('leaflet', function(leafletModel) {
              const leaflet = leafletModel.getLeaflet();
              const center = leaflet.getCenter();
              leafletModel.setCenterAndZoom(
                [center.lng, center.lat],
                leaflet.getZoom()
              );
            }); */
        });
    },


    _visible: function _visible() {
        this.canvas.style.visibility = "visible";
    },

    _unvisible: function _unvisible() {
        this.canvas.style.visibility = "hidden";
    },

    onAdd: function onAdd(map) {
        this.map = map;
        this.canvas = this._createCanvas();
        map.getPanes().overlayPane.appendChild(this.canvas);

        this.chart = _echarts2.default.init(this.canvas);

        _echarts2.default.leafletMap = map;

        var self = this;
        map.on('resize', function (e) {
            var size = e.newSize;
            self.canvas.style.width = size.x + 'px';
            self.canvas.style.height = size.y + 'px';
            self.chart.resize();
        });
        map.on("zoomstart", function () {
            self._unvisible();
        });

        _echarts2.default.extendComponentView({
            type: 'leaflet',

            render: function render(mapModel, ecModel, api) {
                var rendering = true;

                var leafletMap = _echarts2.default.leafletMap;

                var viewportRoot = api.getZr().painter.getViewportRoot();
                var coordSys = mapModel.coordinateSystem;

                var moveHandler = function moveHandler() {
                    if (rendering) {
                        return;
                    }
                    var topleft = leafletMap.getBounds().getNorthWest();
                    var offset = leafletMap.latLngToLayerPoint(topleft);
                    var mapOffset = [parseInt(offset.x, 10) || 0, parseInt(offset.y, 10) || 0];
                    viewportRoot.style.left = mapOffset[0] + 'px';
                    viewportRoot.style.top = mapOffset[1] + 'px';
                    coordSys.setMapOffset(mapOffset);
                    mapModel.__mapOffset = mapOffset;

                    api.dispatchAction({
                        type: 'LeafletRoma'
                    });
                };

                var zoomEndHandler = function zoomEndHandler() {
                    if (rendering) {
                        return;
                    }

                    api.dispatchAction({
                        type: 'LeafletRoma'
                    });

                    self._visible();
                };

                leafletMap.off('move', this._oldMoveHandler);
                leafletMap.off('zoomend', this._oldZoomEndHandler);
                // FIXME
                // Moveend may be triggered by centerAndZoom method when creating coordSys next time
                // leafletMap.off('moveend', this._oldMoveHandler)
                leafletMap.on('move', moveHandler);
                leafletMap.on('zoomend', zoomEndHandler);
                // leafletMap.on('moveend', moveHandler)
                this._oldMoveHandler = moveHandler;
                this._oldZoomEndHandler = zoomEndHandler;

                var roam = mapModel.get('roam');
                if (roam && roam !== 'scale') {
                    // todo 允许拖拽
                } else {
                        // todo 不允许拖拽
                    }
                if (roam && roam !== 'move') {
                    // todo 允许移动
                } else {
                        // todo 不允许允许移动
                    }

                rendering = false;
            }
        });
        this.chart.setOption(this.options);
    },

    onRemove: function onRemove(map) {
        this.chart.dispose();
    },

    _createCanvas: function _createCanvas() {
        var canvas = document.createElement('div');
        canvas.id = this.layerId;
        //canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.height = this.map.getSize().y + 'px';
        canvas.width = this.map.getSize().x + 'px';
        canvas.style.height = this.map.getSize().y + 'px';
        canvas.style.width = this.map.getSize().x + 'px';
        canvas.style.zIndex = 100;

        canvas.setAttribute('id', this.layerId);
        canvas.setAttribute('class', this.layerClass);

        this.canvas = canvas;

        return canvas;
    },

    _resizeCanvas: function _resizeCanvas() {
        var self = this;

        window.onresize = function () {
            var canvas = self.canvas;
            var map = self.map;

            //canvas.style.position = 'absolute';
            canvas.style.top = "0px";
            canvas.style.left = "0px";
            canvas.height = this.map.getSize().y + 'px';
            canvas.width = this.map.getSize().x + 'px';
            canvas.style.height = this.map.getSize().y + 'px';
            canvas.style.width = this.map.getSize().x + 'px';

            self.chart.resize();
        };
    },

    /**
     * 显示图层
     * @function L.zondy.EchartsLayer.prototype.show
     */
    show: function show() {
        this._visible();
    },

    /**
     * 隐藏图层
     * @function L.zondy.EchartsLayer.prototype.hide
     */
    hide: function hide() {
        this._unvisible();
    },

    /**
     * 重置图层大小
     * @function L.zondy.EchartsLayer.prototype.resize
     */
    resize: function resize() {
        var canvas = this.canvas;
        var map = this.map;

        //canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.height = this.map.getSize().y + 'px';
        canvas.width = this.map.getSize().x + 'px';
        canvas.style.height = this.map.getSize().y + 'px';
        canvas.style.width = this.map.getSize().x + 'px';

        this.chart.resize();
    }
});

var echartsLayer = exports.echartsLayer = function echartsLayer(echartsParams, options) {
    return new EchartsLayer(echartsParams, options);
};

_leaflet2.default.zondy.EchartsLayer = echartsLayer;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MapvLayer = __webpack_require__(5);

Object.defineProperty(exports, "MapVLayer", {
  enumerable: true,
  get: function get() {
    return _MapvLayer.MapVLayer;
  }
});

var _EchartsLayer = __webpack_require__(35);

Object.defineProperty(exports, "EchartsLayer", {
  enumerable: true,
  get: function get() {
    return _EchartsLayer.EchartsLayer;
  }
});

var _StreamLayer = __webpack_require__(33);

Object.defineProperty(exports, "StreamLayer", {
  enumerable: true,
  get: function get() {
    return _StreamLayer.StreamLayer;
  }
});

var _mapv = __webpack_require__(29);

Object.keys(_mapv).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mapv[key];
    }
  });
});

var _echart = __webpack_require__(28);

Object.keys(_echart).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _echart[key];
    }
  });
});

var _stream = __webpack_require__(27);

Object.keys(_stream).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _stream[key];
    }
  });
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.baiduTileLayer = exports.BaiduTileLayer = undefined;

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

__webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaiduTileLayer = exports.BaiduTileLayer = _leaflet2.default.TileLayer.extend({

    style: {
        light: 'light',
        visualization: 'visualization',
        redalert: 'redalert',
        grassgreen: 'grassgreen',
        pink: 'pink',
        bluish: 'bluish',
        darkgreen: 'darkgreen',
        grayscale: 'grayscale',
        hardedge: 'hardedge',
        midnight: 'midnight',
        default: 'pl'
    },

    url: 'http://api2.map.bdimg.com/customimage/tile?&udt=20180601&scale=1&x={x}&y={y}&z={z}&ak={baidukey}&styles={styles}',

    options: {
        // @option minZoom: Number = 3
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 3,

        // @option maxZoom: Number = 18
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: 18,

        // @option subdomains: String|String[] = 'abc'
        // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
        subdomains: [0, 1, 2],

        // @option errorTileUrl: String = ''
        // URL to the tile image to show in place of the tile that failed to load.
        errorTileUrl: '',

        // @option zoomOffset: Number = 0
        // The zoom number used in tile URLs will be offset with this value.
        zoomOffset: 0,

        // @option tms: Boolean = false
        // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
        tms: true,

        // @option zoomReverse: Boolean = false
        // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
        zoomReverse: false,

        // @option detectRetina: Boolean = false
        // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
        detectRetina: false,

        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: false,

        baidukey: 'HmkUGKETQBkEcd6aj3udNZ3W5hKXmXSi',

        //dark,light,street
        id: 'dark',

        styles: "pl"
    },

    initialize: function initialize(options) {
        this.options = _leaflet2.default.Util.setOptions(this, options);
    },

    getTileUrl: function getTileUrl(coords) {
        var data = {
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl(),
            styles: this.options.styles,
            ak: this.options.baidukey
        };
        if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }

        //this.options.styles = this.options.styles;               

        return _leaflet2.default.Util.template(this.url, _leaflet2.default.Util.extend(data, this.options));
    },

    _getSubdomain: function _getSubdomain(tilePoint) {
        var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
        return this.options.subdomains[index];
    }
});

var baiduTileLayer = exports.baiduTileLayer = function baiduTileLayer(options) {
    return new BaiduTileLayer(options);
};

_leaflet2.default.zondy.BaiduTileLayer = baiduTileLayer;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaiduTileLayer = __webpack_require__(37);

Object.defineProperty(exports, 'BaiduTileLayer', {
  enumerable: true,
  get: function get() {
    return _BaiduTileLayer.BaiduTileLayer;
  }
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BaiduMercator = undefined;

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaiduMercator = exports.BaiduMercator = {

	R: 6378137,
	MAX_LATITUDE: 85.0511287798,

	project: function project(latlng) {
		var d = Math.PI / 180,
		    max = this.MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    sin = Math.sin(lat * d);

		return new _leaflet2.default.Point(this.R * latlng.lng * d, this.R * Math.log((1 + sin) / (1 - sin)) / 2);
	},

	unproject: function unproject(point) {
		var d = 180 / Math.PI;

		return new _leaflet2.default.LatLng((2 * Math.atan(Math.exp(point.y / this.R)) - Math.PI / 2) * d, point.x * d / this.R);
	},

	bounds: function () {
		var d = 6378137 * Math.PI;
		return new _leaflet2.default.Bounds([-d, -d], [d, d]);
	}()
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Projection = __webpack_require__(39);

Object.defineProperty(exports, 'BaiduMercator', {
  enumerable: true,
  get: function get() {
    return _Projection.BaiduMercator;
  }
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.epsgBaidu = exports.EPSGBaidu = undefined;

var _leaflet = __webpack_require__(0);

var _leaflet2 = _interopRequireDefault(_leaflet);

__webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @namespace CRS
 * @crs L.CRS.Baidu
 * @see L.Proj.CRS in proj4leaflet.js
 * 针对百度最小3级，最大18级的特定的web墨卡托的EPSG参数设定
 */

/* if (L && L.Proj) {
	EPSGBaidu = new L.Proj.CRS(
		'EPSG:3395',
		'+proj=merc +lon_0=0 +k=1 +x_0=140 +y_0=-250 +datum=WGS84 +units=m +no_defs', {
			resolutions: function () {
				var level = 19;
				var res = [];
				res[0] = Math.pow(2, 18);
				for (var i = 1; i < level; i++) {
					res[i] = Math.pow(2, (18 - i))
				}
				return res;
			}(),
			origin: [0, 0],
			bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
		}
	);
} else {
	console.log('Leaflet and proj4 必须在使用之前加载！常见错误：如js引入的顺序问题leaflet>proj4>plugins!');
} */

var EPSGBaidu = exports.EPSGBaidu = undefined;
var epsgBaidu = exports.epsgBaidu = function epsgBaidu() {
	return new EPSGBaidu();
};

if (_leaflet2.default && _leaflet2.default.Proj) {
	_leaflet2.default.CRS.EPSGBaidu = new _leaflet2.default.Proj.CRS('EPSG:3395', '+proj=merc +lon_0=0 +k=1 +x_0=140 +y_0=-250 +datum=WGS84 +units=m +no_defs', {
		resolutions: function () {
			var level = 19;
			var res = [];
			res[0] = Math.pow(2, 18);
			for (var i = 1; i < level; i++) {
				res[i] = Math.pow(2, 18 - i);
			}
			return res;
		}(),
		origin: [0, 0],
		bounds: _leaflet2.default.bounds([20037508.342789244, 0], [0, 20037508.342789244])
	});
} else {
	console.log("使用高斯投影的时候，请严格遵守espg的规范 http://client.snanyun.com:8899/ui/epsg.html , 请不要过分相信上面表格中的中文名字，以后面的+proj=tmerc +lat_0=0 +lon_0=135 为标准");
	console.log('Leaflet and proj4 必须在使用之前加载！常见错误：如js引入的顺序问题leaflet>proj4>plugins!');
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _CRS = __webpack_require__(41);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Base = __webpack_require__(1);

Object.keys(_Base).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Base[key];
    }
  });
});

var _crs = __webpack_require__(42);

Object.keys(_crs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _crs[key];
    }
  });
});

var _projection = __webpack_require__(40);

Object.keys(_projection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _projection[key];
    }
  });
});

var _tilelayer = __webpack_require__(38);

Object.keys(_tilelayer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tilelayer[key];
    }
  });
});

var _overlay = __webpack_require__(36);

Object.keys(_overlay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _overlay[key];
    }
  });
});

var _service = __webpack_require__(26);

Object.keys(_service).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _service[key];
    }
  });
});

/***/ })
/******/ ]);