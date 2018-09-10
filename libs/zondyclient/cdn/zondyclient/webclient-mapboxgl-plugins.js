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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = mapboxgl;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

__webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * WebClient mapboxgl基类
 * 定义命名空间
 */
_mapboxGl2.default.zondy = _mapboxGl2.default.zondy || {};

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapvBaseLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mapv = __webpack_require__(14);

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseLayer = _mapv.baiduMapLayer ? _mapv.baiduMapLayer.__proto__ : Function;

/**
 * @private
 * @class MapvBaseLayer
 * @classdesc MapV图层渲染
 * @param map - {string} 地图
 * @param layer -{Object} 图层
 * @param dataSet -{Object} 数据集
 * @param options -{Object} 交互时所需可选参数。
 * @extends BaseLayer
 *
 */

var MapvBaseLayer = exports.MapvBaseLayer = function (_BaseLayer) {
    _inherits(MapvBaseLayer, _BaseLayer);

    function MapvBaseLayer(map, dataSet, options, mapboxLayer) {
        _classCallCheck(this, MapvBaseLayer);

        var _this = _possibleConstructorReturn(this, (MapvBaseLayer.__proto__ || Object.getPrototypeOf(MapvBaseLayer)).call(this, map, dataSet, options));

        if (!BaseLayer) return _possibleConstructorReturn(_this);

        _this.map = map; //此处的map是外面传入的mapboxgl的map对象
        _this.dataSet = dataSet;

        var self = _this;
        var data = null;
        options = options || {};

        self.init(options);
        self.argCheck(options);

        _this.initDevicePixelRatio();

        _this.canvasLayer = mapboxLayer;

        _this.stopAniamation = false;
        _this.animation = options.animation;

        _this.clickEvent = _this.clickEvent.bind(_this);
        _this.mousemoveEvent = _this.mousemoveEvent.bind(_this);

        _this.bindEvent();
        return _this;
    }

    /**
     * @function mapboxgl.zondy.MapvBaseLayer.prototype.initDevicePixelRatio
     * @description window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。
     * 公式表示就是：window.devicePixelRatio = 物理像素 / dips,该函数主要应用与移动设备
     */


    _createClass(MapvBaseLayer, [{
        key: 'initDevicePixelRatio',
        value: function initDevicePixelRatio() {
            this.devicePixelRatio = window.devicePixelRatio || 1;
        }

        /**
         * @function mapboxgl.zondy.MapvBaseLayer.prototype.clickEvent
         * @description 百度mapv原本的事件只有clickEvent和mousemoveEvent
         * @param e 点击事件对象 {latlng, layerPoint, containerPoint, originalEvent}
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

    }, {
        key: 'clickEvent',
        value: function clickEvent(e) {
            var pixel = e.point;
            _get(MapvBaseLayer.prototype.__proto__ || Object.getPrototypeOf(MapvBaseLayer.prototype), 'clickEvent', this).call(this, pixel, e);
        }

        /**
         * @function mapboxgl.zondy.MapvBaseLayer.prototype.mousemoveEvent
         * @description 百度mapv原本的事件只有clickEvent和mousemoveEvent
         * @param e 点击事件对象 {latlng, layerPoint, containerPoint, originalEvent}
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
            var pixel = e.point;
            _get(MapvBaseLayer.prototype.__proto__ || Object.getPrototypeOf(MapvBaseLayer.prototype), 'mousemoveEvent', this).call(this, pixel, e);
        }
    }, {
        key: 'addAnimatorEvent',
        value: function addAnimatorEvent() {}
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
        value: function bindEvent() {
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
        value: function unbindEvent() {
            var map = this.map;

            if (this.options.methods) {
                if (this.options.methods.click) {
                    map.off('click', this.clickEvent);
                }
                if (this.options.methods.mousemove) {
                    map.off('mousemove', this.mousemoveEvent);
                }
            }
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this.canvasLayer.canvas.getContext(this.context);
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
        key: '_canvasUpdate',
        value: function _canvasUpdate(time) {
            var map = this.map;
            if (!this.canvasLayer || this.stopAniamation || this.canvasLayer.disposeFlag == true) {
                return;
            }
            var self = this;

            var animationOptions = self.options.animation;

            var context = this.getContext();

            if (self.isEnabledTime()) {
                if (time === undefined) {
                    this.clear(context);
                    return;
                }
                if (this.context === '2d') {
                    context.save();
                    context.globalCompositeOperation = 'destination-out';
                    context.fillStyle = 'rgba(0, 0, 0, .1)';
                    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                    context.restore();
                }
            } else {
                this.clear(context);
            }

            if (this.context === '2d') {
                for (var key in self.options) {
                    context[key] = self.options[key];
                }
            } else {
                context.clear(context.COLOR_BUFFER_BIT);
            }

            if (self.options.minZoom && map.getZoom() < self.options.minZoom || self.options.maxZoom && map.getZoom() > self.options.maxZoom) {
                return;
            }

            var dataGetOptions = {
                transferCoordinate: function transferCoordinate(coordinate) {
                    var point = map.project(new _mapboxGl2.default.LngLat(coordinate[0], coordinate[1]));
                    return [point.x, point.y];
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

            var pixel = map.project(new _mapboxGl2.default.LngLat(0, 0));
            this.drawContext(context, new _mapv.DataSet(data), self.options, pixel);

            self.options.updateCallback && self.options.updateCallback(time);
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
        key: 'getData',
        value: function getData() {
            return this.dataSet;
        }
    }, {
        key: 'removeData',
        value: function removeData(_filter) {
            if (!this.dataSet) {
                return;
            }
            var newData = this.dataSet.get({
                filter: function filter(data) {
                    return _filter != null && typeof _filter === "function" ? !_filter(data) : true;
                }
            });
            this.dataSet.set(newData);
            this.update({
                options: null
            });
        }
    }, {
        key: 'clearData',
        value: function clearData() {
            this.dataSet && this.dataSet.clear();
            this.update({
                options: null
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
        }
    }]);

    return MapvBaseLayer;
}(BaseLayer);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapCoordSys = MapCoordSys;

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _echarts = __webpack_require__(5);

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MapCoordSys(MapboxGLMap, api) {
  this._MapboxGLMap = MapboxGLMap;
  this.dimensions = ['lng', 'lat'];
  this._mapOffset = [0, 0];

  this._api = api;
}

MapCoordSys.prototype.dimensions = ['lng', 'lat'];

MapCoordSys.prototype.setMapOffset = function (mapOffset) {
  this._mapOffset = mapOffset;
};

MapCoordSys.prototype.getBMap = function () {
  return this._MapboxGLMap;
};

MapCoordSys.prototype.dataToPoint = function (data) {
  var px = this._MapboxGLMap.project(data);

  var mapOffset = this._mapOffset;

  return [px.x - mapOffset[0], px.y - mapOffset[1]];
};

MapCoordSys.prototype.pointToData = function (pt) {
  var mapOffset = this._mapOffset;
  var pt = this._MapboxGLMap.project([pt[0] + mapOffset[0], pt[1] + mapOffset[1]]);
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
MapCoordSys.prototype.prepareCustoms = function (data) {
  var zrUtil = _echarts2.default.util;

  var rect = this.getViewRect();
  return {
    coordSys: {
      // The name exposed to user is always 'cartesian2d' but not 'grid'.
      type: 'mapboxgl',
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
  var coordSys;

  ecModel.eachComponent('mapboxgl', function (GLMapModel) {
    var viewportRoot = api.getZr().painter.getViewportRoot();
    var MapboxGLMap = _echarts2.default.mapboxglMap;
    coordSys = new MapCoordSys(MapboxGLMap, api);
    coordSys.setMapOffset(GLMapModel.__mapOffset || [0, 0]);
    GLMapModel.coordinateSystem = coordSys;
  });

  ecModel.eachSeries(function (seriesModel) {
    if (seriesModel.get('coordinateSystem') === 'mapboxgl') {
      seriesModel.coordinateSystem = coordSys;
    }
  });
};

exports.default = MapCoordSys;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(){try{return echarts}catch(e){return {}}}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
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
exports.MapExtend = undefined;

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

__webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function mapboxgl.zondy.MapExtend
 * @description 扩展了mapboxgl.Map对图层相关的操作
 * @private
 */
var MapExtend = exports.MapExtend = function () {

  _mapboxGl2.default.Map.prototype.overlayLayersManager = {};

  _mapboxGl2.default.Map.prototype.addLayer = function (layer, before) {
    if (layer.source) {
      this.style.addLayer(layer, before);
      this._update(true);
      return this;
    }
    if (this.overlayLayersManager[layer.id] || this.style._layers[layer.id]) {
      this.fire('error', {
        error: new Error('A layer with this id already exists.')
      });
      return;
    }
    addLayer(layer, this);
    this.overlayLayersManager[layer.id] = layer;
    return this;
  };
  _mapboxGl2.default.Map.prototype.getLayer = function (id) {
    if (this.overlayLayersManager[id]) {
      return this.overlayLayersManager[id];
    }
    return this.style.getLayer(id);
  };

  _mapboxGl2.default.Map.prototype.moveLayer = function (id, beforeId) {
    if (this.overlayLayersManager[id]) {
      moveLayer(id, beforeId);
      return this;
    }
    if (this.style._layers[id]) {
      this.style.moveLayer(id, beforeId);
      this._update(true);
      return this;
    }
  };

  _mapboxGl2.default.Map.prototype.removeLayer = function (id) {
    if (this.overlayLayersManager[id]) {
      removeLayer(this.overlayLayersManager[id]);
      delete this.overlayLayersManager[id];
      return this;
    }
    this.style.removeLayer(id);
    this._update(true);
    return this;
  };

  //目前扩展的overlayer，只支持 显示或隐藏图层操作
  _mapboxGl2.default.Map.prototype.setLayoutProperty = function (layerID, name, value) {
    if (this.overlayLayersManager[layerID]) {
      if (name === "visibility") {
        if (value === "block") {
          value = true;
        } else {
          value = false;
        }
        setVisibility(this.overlayLayersManager[layerID], value);
      }
      return this;
    }
    this.style.setLayoutProperty(layerID, name, value);
    this._update(true);
    return this;
  };

  function addLayer(layer, map) {
    layer.onAdd(map);
  }

  /**
   * @function mapboxgl.zondy.MapExtend.prototype.removeFromMap
   * @description 移除事件
   */
  function removeLayer(layer) {
    layer.removeFromMap();
  }

  /**
   * @function mapboxgl.zondy.MapExtend.prototype.setVisibility
   * @description 设置图层可见性，设置图层的隐藏，显示，重绘的相应的可见标记。
   * @param visibility - {string} 是否显示图层（当前地图的resolution在最大最小resolution之间）。
   */
  function setVisibility(layer, visibility) {
    layer.setVisibility(visibility);
  }

  /**
   * @function mapboxgl.zondy.MapExtend.prototype.moveTo
   * @description 将图层移动到某个图层之前。
   * @param layerID - {string} 待插入的图层ID。
   * @param beforeLayerID - {boolean} 是否将本图层插入到图层id为layerID的图层之前(默认为true，如果为false则将本图层插入到图层id为layerID的图层之后)。
   */
  function moveLayer(layerID, beforeLayerID) {
    var layer = document.getElementById(layerID);
    // var beforeLayer;
    if (beforeLayerID) {
      var beforeLayer = document.getElementById(beforeLayerID);
      if (!beforeLayer) {
        _mapboxGl2.default.Evented.prototype.fire("error", {
          error: new Error('Layer with id "' + beforeLayerID + '" does not exist on this document.')
        });
      }
    }
    if (layer && beforeLayer) {
      beforeLayer.parentNode.insertBefore(layer, beforeLayer);
    } else {
      //当没有传入beforeLayerID ，则默认将图层移动到最上面
      layer.parentNode.appendChild(layer);
    }
  }
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _MapCoordSys = __webpack_require__(4);

Object.defineProperty(exports, 'MapCoordSys', {
    enumerable: true,
    get: function get() {
        return _MapCoordSys.MapCoordSys;
    }
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MapvBaseLayer = __webpack_require__(3);

Object.defineProperty(exports, 'MapvBaseLayer', {
  enumerable: true,
  get: function get() {
    return _MapvBaseLayer.MapvBaseLayer;
  }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElsCubeLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

__webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class mapboxgl.zondy.CubeLayer
 * @category  时空立方体
 * @classdesc Cube图层
 * @param map - {Object} 地图
 * @param jsonData -{Object} 数据集
 * @param styleOptions -{Object} 样式参数。如：
 *        layerID - {string} 图层ID。<br>
 */
var ElsCubeLayer = exports.ElsCubeLayer = function () {

  /**
   * 
   * @param {Object} map 
   * @param {Object} jsonData 
   * @param {Object} Options 
   */
  function ElsCubeLayer(map, jsonData, options) {
    _classCallCheck(this, ElsCubeLayer);

    this.map = map;
    this.layers = [];

    this._prepareData(jsonData, options);
    this._createCubes(this.map, options.style);
  }

  /**
   * @function mapboxgl.zondy.ElsCubeLayer.prototype._prepareData
   * @description 针对原始数据进行数据处理，处理高程等信息
   */


  _createClass(ElsCubeLayer, [{
    key: '_prepareData',
    value: function _prepareData(originData, options) {
      /* if(options.z) */
      for (var i = 0; i < 10; i++) {

        var layer = {
          "type": "FeatureCollection",
          "features": []
        };

        this._prepareLayerCubes(layer, originData, options.space, options.index, options.style);

        this.layers.push(layer);
      }
    }
  }, {
    key: '_prepareLayerCubes',
    value: function _prepareLayerCubes(layer, originData, spaceRange, indexRange, styleOption) {
      var item = {};

      originData.forEach(function (point) {
        var centerx = point.lng;
        var centery = point.lat;
        item.minx = centerx - styleOption.radio;
        item.maxx = centerx + styleOption.radio;
        item.miny = centery - styleOption.radio;
        item.maxy = centery + styleOption.radio;
      });

      layer.features.push(this._createCubeItem(item.minx, item.maxx, item.miny, item.maxy));
    }
  }, {
    key: '_createCubeItem',
    value: function _createCubeItem(minx, maxx, miny, maxy, properties) {
      var feature = {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [[[minx, maxy], [maxx, maxy], [maxx, miny], [minx, miny], [minx, maxy]]]
        },
        "properties": properties
      };
      return feature;
    }
  }, {
    key: '_createCubes',
    value: function _createCubes(map, style) {
      //this.layers.forEach(function (layer, index) {
      for (var index = 0; index < this.layers.length; index++) {
        var layer = this.layers[this.layers.length - index - 1];
        var sourceId = "TimeSpaceCubeSource" + index;
        var layerId = "ElsCubeLayer" + index;
        var color = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);

        map.addSource(sourceId, {
          "type": "geojson",
          "data": layer
        });

        map.addLayer({
          "id": layerId, //id不同重复，否则只绘制一次
          "type": "fill-extrusion",
          "source": sourceId, //必须和上面的geojsonCollections一致
          "paint": {
            "fill-extrusion-color": color, //颜色  
            "fill-extrusion-height": style.height, //['get', 'height'], //固定语法，获取属性值height的数值
            "fill-extrusion-base": style.baseheight * index, //基础高度，表示相对水平面的高度
            "fill-extrusion-opacity": 0.8 //透明度
            //"fill-extrusion-pattern":"si-main-3", //线的拉伸图片类型，一定要与对应的样式库的图片名字一一对应
            //"fill-extrusion-translate": [0,0] //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上
          }
        });
      }
    }
  }, {
    key: '_getRandomColor',
    value: function _getRandomColor() {
      return function (m, s, c) {
        return (c ? arguments.callee(m, s, c - 1) : '#') + s[m.floor(m.random() * 16)];
      }(Math, '0123456789abcdef', 5);
    }
  }]);

  return ElsCubeLayer;
}();

_mapboxGl2.default.zondy.ElsCubeLayer = ElsCubeLayer;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeSpaceCubeLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

__webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class mapboxgl.zondy.CubeLayer
 * @category  时空立方体
 * @classdesc Cube图层
 * @param map - {Object} 地图
 * @param jsonData -{Object} 数据集
 * @param styleOptions -{Object} 样式参数。如：
 *        layerID - {string} 图层ID。<br>
 */
var TimeSpaceCubeLayer = exports.TimeSpaceCubeLayer = function () {

  /**
   * 
   * @param {Object} map 
   * @param {Object} jsonData 
   * @param {Object} Options 
   */
  function TimeSpaceCubeLayer(map, jsonData, options) {
    _classCallCheck(this, TimeSpaceCubeLayer);

    this.map = map;
    this.layers = [];

    this._prepareData(jsonData, options);
    this._createCubes(this.map, options.style);
  }

  /**
   * @function mapboxgl.zondy.TimeSpaceCubeLayer.prototype._prepareData
   * @description 针对原始数据进行数据处理，处理高程等信息
   */


  _createClass(TimeSpaceCubeLayer, [{
    key: '_prepareData',
    value: function _prepareData(originData, options) {
      /* if(options.z) */
      for (var i = 0; i < 10; i++) {

        var layer = {
          "type": "FeatureCollection",
          "features": []
        };

        this._prepareLayerCubes(layer, options.space, options.index, options.style);

        this.layers.push(layer);
      }
    }
  }, {
    key: '_prepareLayerCubes',
    value: function _prepareLayerCubes(layer, spaceRange, indexRange, styleOption) {
      var item = {};
      var xlength = (spaceRange.endx - spaceRange.startx) / indexRange.cols;
      var ylength = (spaceRange.endy - spaceRange.starty) / indexRange.rows;
      for (var col = 0; col < indexRange.cols; col++) {
        for (var row = 0; row < indexRange.rows; row++) {
          if (styleOption && styleOption.radio) {
            var centerx = spaceRange.endx + (col + 1) * xlength / 2;
            var centery = spaceRange.endy + (row + 1) * ylength / 2;
            item.minx = centerx - styleOption.radio;
            item.maxx = centerx + styleOption.radio;
            item.miny = centery - styleOption.radio;
            item.maxy = centery + styleOption.radio;
          } else {
            item.minx = spaceRange.startx + col * xlength;
            item.maxx = spaceRange.endx + (col + 1) * xlength;
            item.miny = spaceRange.starty + row * ylength;
            item.maxy = spaceRange.endy + (row + 1) * ylength;
          }

          layer.features.push(this._createCubeItem(item.minx, item.maxx, item.miny, item.maxy));
        }
      }
    }
  }, {
    key: '_createCubeItem',
    value: function _createCubeItem(minx, maxx, miny, maxy, properties) {
      var feature = {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [[[minx, maxy], [maxx, maxy], [maxx, miny], [minx, miny], [minx, maxy]]]
        },
        "properties": properties
      };
      return feature;
    }
  }, {
    key: '_createCubes',
    value: function _createCubes(map, style) {
      //this.layers.forEach(function (layer, index) {
      for (var index = 0; index < this.layers.length; index++) {
        var layer = this.layers[this.layers.length - index - 1];
        var sourceId = "TimeSpaceCubeSource" + index;
        var layerId = "TimeSpaceCubeLayer" + index;
        var color = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);

        map.addSource(sourceId, {
          "type": "geojson",
          "data": layer
        });

        map.addLayer({
          "id": layerId, //id不同重复，否则只绘制一次
          "type": "fill-extrusion",
          "source": sourceId, //必须和上面的geojsonCollections一致
          "paint": {
            "fill-extrusion-color": color, //颜色  
            "fill-extrusion-height": style.height, //['get', 'height'], //固定语法，获取属性值height的数值
            "fill-extrusion-base": style.baseheight * index, //基础高度，表示相对水平面的高度
            "fill-extrusion-opacity": 0.8 //透明度
            //"fill-extrusion-pattern":"si-main-3", //线的拉伸图片类型，一定要与对应的样式库的图片名字一一对应
            //"fill-extrusion-translate": [0,0] //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上
          }
        });
      }
    }
  }, {
    key: '_getRandomColor',
    value: function _getRandomColor() {
      return function (m, s, c) {
        return (c ? arguments.callee(m, s, c - 1) : '#') + s[m.floor(m.random() * 16)];
      }(Math, '0123456789abcdef', 5);
    }
  }]);

  return TimeSpaceCubeLayer;
}();

_mapboxGl2.default.zondy.TimeSpaceCubeLayer = TimeSpaceCubeLayer;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function(){try{return d3}catch(e){return {}}}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.D3Layer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _d = __webpack_require__(12);

var d3 = _interopRequireWildcard(_d);

__webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(34);

var D3Layer = exports.D3Layer = function () {
    function D3Layer(map, drawCallback, options) {
        _classCallCheck(this, D3Layer);

        this.map = map;
        this._drawCallback = drawCallback;
        this.initD3();
    }

    _createClass(D3Layer, [{
        key: 'initD3',
        value: function initD3() {
            d3.select("head").append("style").attr("type", "text/css").text("g.d3-overlay *{pointer-events:visiblePainted;}");
        }
    }, {
        key: 'bindMapEvent',
        value: function bindMapEvent() {
            var svg = this._svg;
            var svgContainer = this.selection;
            var draw = this.draw;
            var proj = this.projection;
            var map = this.map;
            var d3layer = this;
            this.map.on("viewreset", function () {
                d3layer.draw(d3layer, svgContainer, proj, map);
            });
            this.map.on("movestart", function () {
                svgContainer.classed("mapboxd3-hidden", true);
            });
            this.map.on("rotate", function () {
                svgContainer.classed("mapboxd3-hidden", true);
            });
            this.map.on("moveend", function () {
                svgContainer.classed("mapboxd3-hidden", false);
                d3layer.draw(d3layer, svgContainer, proj, map);
            });
        }
    }, {
        key: 'draw',
        value: function draw(thisLayer, selection, projection, map) {
            thisLayer._drawCallback(selection, projection, map.getZoom());
        }
    }, {
        key: 'addTo',
        value: function addTo(map) {
            this.onAdd(map);
            this.draw(this, this.selection, this.projection, this.map);
            this.bindMapEvent();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.svg.classed("mapboxd3-hidden", true);
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.svg.classed("mapboxd3-hidden", true);
            this.svg = null;
            this.selection = null;
        }
    }, {
        key: 'onAdd',
        value: function onAdd() {
            var _layermap = this.map;
            this._container = _layermap.getCanvasContainer();
            this._svg = d3.select(this._container).select("svg");
            this.selection = this._svg.append("g").classed("d3-overlay", true);;

            // Create projection object
            this.projection = {
                latLngToLayerPoint: function latLngToLayerPoint(longtitude, latitude, zoom) {
                    zoom = _layermap.getZoom() ? _layermap.getZoom() : zoom;
                    console.log("longtitude: " + longtitude + " latitude: " + latitude);
                    var screenPoint = _layermap.project(new _mapboxGl2.default.LngLat(longtitude, latitude));
                    console.log("screenPoint x: " + screenPoint.x + " y: " + screenPoint.y);
                    return screenPoint;
                },
                layerPointToLatLng: function layerPointToLatLng(point, zoom) {
                    zoom = _layermap.getZoom() ? _layermap.getZoom() : zoom;
                    var lnglat = _layermap.unproject(new _mapboxGl2.default.Point(point.x, point.y));
                    return lnglat;
                },
                unitsPerMeter: 256 * Math.pow(2, _layermap.getZoom()) / 40075017,
                map: _layermap,
                scale: 1
            };
            this.projection._projectPoint = function (x, y) {
                if (y == null) {
                    y = 0;
                }
                if (x == null) {
                    x = 0;
                }
                var point = _layermap.project(new _mapboxGl2.default.LngLat(x, y));
                return this.stream.point(point.x, point.y);
            };

            var projectionPointRef = this.projection._projectPoint;

            this.projection.pathFromGeojson = d3.geoPath().projection(d3.geoTransform({
                point: projectionPointRef
            }));
        }
    }]);

    return D3Layer;
}();

_mapboxGl2.default.zondy.d3Layer = D3Layer;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(){try{return mapv}catch(e){return {}}}();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapvLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

__webpack_require__(1);

var _MapvBaseLayer = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @origin author kyle / http://nikai.us/
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class mapboxgl.zondy.MapvLayer
 * @classdesc 基于mapboxgl的Layer对象进行的拓展
 * @param map - {Object} 传入的mapboxgl的地图对象
 * @param dataset - {MapvDataSet} 传入的mapv的属性。 <br>
 * @param mapvoption - {MapvOption} 可选参数。<br>
 */
var MapvLayer = exports.MapvLayer = function () {
    function MapvLayer(map, dataSet, mapVOptions) {
        _classCallCheck(this, MapvLayer);

        this.map = map;
        this.layerID = mapVOptions.layerID;
        delete mapVOptions["layerID"];
        this.mapvBaseLayer = new _MapvBaseLayer.MapvBaseLayer(map, dataSet, mapVOptions, this);
        this.mapVOptions = mapVOptions;

        this.initDevicePixelRatio();

        this.canvas = this._createCanvas();

        this.render = this.render.bind(this);

        this.bindEvent();

        this.mapContainer = map.getCanvasContainer();
        this.mapContainer.appendChild(this.canvas);
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';

        this._reset();
    }

    _createClass(MapvLayer, [{
        key: 'initDevicePixelRatio',
        value: function initDevicePixelRatio() {
            this.devicePixelRatio = window.devicePixelRatio || 1;
        }

        //-----------------------------------Event Methods----------------------------------------

    }, {
        key: 'bindEvent',
        value: function bindEvent() {
            var map = this.map;
            //下面几个是mapboxgl专属事件,clickEvent和mousemoveEvent是mapv内部自带的方法不放出来
            this.innerMoveStart = this.moveStartEvent.bind(this);
            this.innerMoveEnd = this.moveEndEvent.bind(this);

            this.innnerZoomStart = this.zoomStartEvent.bind(this);
            this.innnerZoomEnd = this.zoomEndEvent.bind(this);

            this.innnerRotateStart = this.rotateStartEvent.bind(this);
            this.innnerRotateEnd = this.rotateEndEvent.bind(this);

            this.innerResize = this.resizeEvent.bind(this);

            this.innerRemove = this.removeEvent.bind(this);

            map.on('resize', this.innerResize);

            map.on('zoomstart', this.innnerZoomStart);
            map.on('zoomend', this.innnerZoomEnd);

            map.on('rotatestart', this.innnerRotateStart);
            map.on('rotateend', this.innnerRotateEnd);

            map.on('movestart', this.innerMoveStart);
            map.on('moveend', this.innerMoveEnd);

            this.map.on('remove', this.innerRemove);
        }
    }, {
        key: 'unbindEvent',
        value: function unbindEvent() {
            var map = this.map;
            map.off('resize', this.innerResize);

            map.off('zoomstart', this.innnerZoomStart);
            map.off('zoomend', this.innnerZoomEnd);

            map.off('rotatestart', this.innnerRotateStart);
            map.off('rotateend', this.innnerRotateEnd);

            map.off('movestart', this.innerMoveStart);
            map.off('moveend', this.innerMoveEnd);
        }
    }, {
        key: 'moveStartEvent',
        value: function moveStartEvent() {
            this.mapvBaseLayer.animatorMovestartEvent();
            this._unvisiable();
        }
    }, {
        key: 'moveEndEvent',
        value: function moveEndEvent() {
            this.mapvBaseLayer.animatorMoveendEvent();
            this._reset();
            this._visiable();
        }
    }, {
        key: 'zoomStartEvent',
        value: function zoomStartEvent() {
            this._unvisiable();
        }
    }, {
        key: 'zoomEndEvent',
        value: function zoomEndEvent() {
            this._unvisiable();
        }
    }, {
        key: 'rotateStartEvent',
        value: function rotateStartEvent() {
            this.mapvBaseLayer.animatorMovestartEvent();
            this._unvisiable();
        }
    }, {
        key: 'rotateEndEvent',
        value: function rotateEndEvent() {
            this.mapvBaseLayer.animatorMoveendEvent();
            this._reset();
            this._visiable();
        }
    }, {
        key: 'resizeEvent',
        value: function resizeEvent() {
            this._reset();
            this._visiable();
        }
    }, {
        key: 'removeEvent',
        value: function removeEvent() {
            this.mapContainer.removeChild(this.canvas);
        }
        //-----------------------------------Event Methods----------------------------------------

        //-----------------------------------Start Data Operation---------------------------------
        /**
         * 增加数据
         * @function mapboxgl.zondy.MapVLayer.prototype.addData
         * 
         * @param data - {Array} 数据.
         * @param options - {Object} 只做额外增加的字段作用
         */

    }, {
        key: 'addData',
        value: function addData(data, options) {
            this.mapvBaseLayer.addData(data, options);
        }

        /**
         * 更新数据
         * @function mapboxgl.zondy.MapVLayer.prototype.addData
         * 
         * @param data - {Array} 数据.
         * @param options - {Object} 只做额外增加的字段作用
         */

    }, {
        key: 'updateData',
        value: function updateData(data, options) {
            this.mapvBaseLayer.updateData(data, options);
        }
    }, {
        key: 'getData',
        value: function getData() {
            if (this.mapvBaseLayer) {
                this.dataSet = this.mapvBaseLayer.getData();
            }
            return this.dataSet;
        }
    }, {
        key: 'removeData',
        value: function removeData(filter) {
            this.mapvBaseLayer && this.mapvBaseLayer.removeData(filter);
        }
    }, {
        key: 'removeAllData',
        value: function removeAllData() {
            this.mapvBaseLayer.clearData();
        }
        //-----------------------------------End Data Operation---------------------------------

    }, {
        key: '_visiable',
        value: function _visiable() {
            this.canvas.style.display = 'block';
            return this;
        }
    }, {
        key: '_unvisiable',
        value: function _unvisiable() {
            this.canvas.style.display = 'none';
            return this;
        }
    }, {
        key: '_createCanvas',
        value: function _createCanvas() {
            var canvas = document.createElement('canvas');
            canvas.id = this.layerID;
            canvas.style.position = 'absolute';
            canvas.style.top = "0px";
            canvas.style.left = "0px";
            canvas.width = parseInt(this.map.getCanvas().style.width);
            canvas.height = parseInt(this.map.getCanvas().style.height);
            canvas.style.width = this.map.getCanvas().style.width;
            canvas.style.height = this.map.getCanvas().style.height;
            var devicePixelRatio = this.devicePixelRatio;
            if (this.mapVOptions.context == '2d') {
                canvas.getContext(this.mapVOptions.context).scale(devicePixelRatio, devicePixelRatio);
            }
            return canvas;
        }
    }, {
        key: '_reset',
        value: function _reset() {
            if (this.canvas == null) {
                return;
            }
            this.resizeCanvas();
            this.fixPosition();
            this.onResize();
            this.render();
        }
    }, {
        key: 'draw',
        value: function draw() {
            return this._reset();
        }

        /**
         * 显示图层
         * @function mapboxgl.zondy.MapVLayer.prototype.show
         */

    }, {
        key: 'show',
        value: function show() {
            this._visiable();
        }
        /**
         * 隐藏图层
         * @function mapboxgl.zondy.MapVLayer.prototype.hide
         */

    }, {
        key: 'hide',
        value: function hide() {
            this._unvisiable();
        }
        /**
         * 更新图层
         * @function mapboxgl.zondy.MapVLayer.prototype.update
         */

    }, {
        key: 'update',
        value: function update(opt) {
            if (opt == undefined) {
                return;
            }
            this.updateData(opt.data, opt.options);
        }
    }, {
        key: 'resizeCanvas',
        value: function resizeCanvas() {
            this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
            var canvas = this.canvas;
            canvas.style.position = 'absolute';
            canvas.style.top = "0px";
            canvas.style.left = "0px";
            canvas.width = parseInt(this.map.getCanvas().style.width);
            canvas.height = parseInt(this.map.getCanvas().style.height);
            canvas.style.width = this.map.getCanvas().style.width;
            canvas.style.height = this.map.getCanvas().style.height;
        }
    }, {
        key: 'fixPosition',
        value: function fixPosition() {}
    }, {
        key: 'onResize',
        value: function onResize() {}
    }, {
        key: 'originPosition',
        value: function originPosition() {
            this.originPitch = this.map.getPitch();
            this.originBearing = this.map.getBearing();
            var origin = this.map.project(new _mapboxGl2.default.LngLat(0, 0));
            this.originX = origin.x;
            this.originY = origin.y;
        }
    }, {
        key: 'render',
        value: function render() {
            this.mapvBaseLayer._canvasUpdate();
        }
    }, {
        key: 'moveTo',
        value: function moveTo(layerID, before) {
            var layer = document.getElementById(this.layerID);
            before = before !== undefined ? before : true;
            if (before) {
                var beforeLayer = document.getElementById(layerID);
                if (layer && beforeLayer) {
                    beforeLayer.parentNode.insertBefore(layer, beforeLayer);
                }
                return;
            }
            var nextLayer = document.getElementById(layerID);
            if (layer) {
                if (nextLayer.nextSibling) {
                    nextLayer.parentNode.insertBefore(layer, nextLayer.nextSibling);
                    return;
                }
                nextLayer.parentNode.appendChild(layer);
            }
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.removeAllData();
            this.unbindEvent();
            this.mapContainer.removeChild(this.canvas);
            this.disposeFlag = true;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.removeAllData();
            this.unbindEvent();
            this.mapContainer.removeChild(this.canvas);
            this.disposeFlag = true;
        }
    }]);

    return MapvLayer;
}();

_mapboxGl2.default.zondy.MapvLayer = MapvLayer;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EchartsLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _echarts = __webpack_require__(5);

var _echarts2 = _interopRequireDefault(_echarts);

__webpack_require__(1);

var _MapCoordSys = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * leaflet的echars 4.0的实现
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class mapboxgl.zondy.EchartsLayer
 * @classdesc 基于mapboxgl的Layer对象进行的拓展
 * @param map - {Object} 传入的mapboxgl的地图对象
 * @param options - {Object} echarts.options
 * 
 * @see http://echarts.baidu.com/api.html#echarts
 */
var EchartsLayer = exports.EchartsLayer = function () {
    function EchartsLayer(map, options) {
        _classCallCheck(this, EchartsLayer);

        this.map = map;
        this.options = options;
        this.layerId = options.layerId || "echartlayerdefaultid";
        this.layerClass = options.classId || "echartlayerdefaultclass";

        this.initDevicePixelRatio();

        this.mapContainer = map.getCanvasContainer();
        this.canvas = this._createCanvas();
        this.mapContainer.appendChild(this.canvas);
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        this.chart = _echarts2.default.init(this.canvas);

        this.initEcharts();
        this._resizeCanvas();

        return this;
    }

    _createClass(EchartsLayer, [{
        key: 'initDevicePixelRatio',
        value: function initDevicePixelRatio() {
            this.devicePixelRatio = window.devicePixelRatio || 1;
        }
    }, {
        key: 'initEcharts',
        value: function initEcharts() {
            _echarts2.default.mapboxglMap = this.map;

            _echarts2.default.registerCoordinateSystem('mapboxgl', _MapCoordSys.MapCoordSys);

            _echarts2.default.extendComponentModel({
                type: 'mapboxgl',
                getBMap: function getBMap() {
                    return this.__mapboxgl;
                },
                defaultOption: {
                    roam: false
                }
            });

            _echarts2.default.registerAction({
                type: 'MapboxGLRoma',
                event: 'MapboxGLRoma',
                update: 'updateLayout'
            }, function (payload, ecModel) {});

            return this;
        }
    }, {
        key: '_createCanvas',
        value: function _createCanvas() {
            var canvas = document.createElement('div');
            canvas.id = this.layerId;
            canvas.style.position = 'absolute';
            canvas.style.top = "0px";
            canvas.style.left = "0px";
            canvas.width = parseInt(this.map.getCanvas().style.width);
            canvas.height = parseInt(this.map.getCanvas().style.height);
            canvas.style.width = this.map.getCanvas().style.width;
            canvas.style.height = this.map.getCanvas().style.height;

            canvas.setAttribute('id', this.layerId);
            canvas.setAttribute('class', this.layerClass);

            //这段可以先不不放开
            /*  var devicePixelRatio = this.devicePixelRatio;
            if (this.mapVOptions.context == '2d') {
                canvas.getContext(this.mapVOptions.context).scale(devicePixelRatio, devicePixelRatio);
            } */
            return canvas;
        }
    }, {
        key: '_resizeCanvas',
        value: function _resizeCanvas() {
            var self = this;

            window.onresize = function () {
                var canvas = self.canvas;
                var map = self.map;

                canvas.style.position = 'absolute';
                canvas.style.top = "0px";
                canvas.style.left = "0px";
                canvas.style.width = map.getCanvas().style.width;
                canvas.style.height = map.getCanvas().style.height;
                canvas.width = parseInt(map.getCanvas().style.width);
                canvas.height = parseInt(map.getCanvas().style.height);

                self.chart.resize();
            };

            //this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        }
    }, {
        key: 'addTo',
        value: function addTo(map) {
            _echarts2.default.extendComponentView({
                type: 'mapboxgl',

                render: function render(mapModel, ecModel, api) {
                    var rendering = true;

                    var mapboxglMap = _echarts2.default.mapboxglMap;

                    var viewportRoot = api.getZr().painter.getViewportRoot();
                    var coordSys = mapModel.coordinateSystem;
                    var moveHandler = function moveHandler(type, target) {
                        if (rendering) {
                            return;
                        }
                        // var offsetEl = viewportRoot.parentNode.parentNode.parentNode
                        var offsetEl = document.getElementsByClassName('mapboxgl-map')[0];

                        var mapOffset = [-parseInt(offsetEl.style.left, 10) || 0, -parseInt(offsetEl.style.top, 10) || 0];
                        viewportRoot.style.left = mapOffset[0] + 'px';
                        viewportRoot.style.top = mapOffset[1] + 'px';

                        coordSys.setMapOffset(mapOffset);
                        mapModel.__mapOffset = mapOffset;

                        api.dispatchAction({
                            type: 'MapboxGLRoma'
                        });
                    };

                    function zoomEndHandler() {
                        if (rendering) {
                            return;
                        }
                        api.dispatchAction({
                            type: 'MapboxGLRoma'
                        });
                    }

                    mapboxglMap.off('move', this._oldMoveHandler);
                    // FIXME
                    // Moveend may be triggered by centerAndZoom method when creating coordSys next time
                    // mapboxglMap.removeEventListener('moveend', this._oldMoveHandler)
                    mapboxglMap.off('zoomend', this._oldZoomEndHandler);
                    mapboxglMap.on('move', moveHandler);
                    // mapboxglMap.addEventListener('moveend', moveHandler)
                    mapboxglMap.on('zoomend', zoomEndHandler);

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
            return this;
        }
    }, {
        key: '_visible',
        value: function _visible() {
            this.canvas.style.visibility = "visible";
        }
    }, {
        key: '_unvisible',
        value: function _unvisible() {
            this.canvas.style.visibility = "hidden";
        }

        /**
         * 显示图层
         * @function mapboxgl.zondy.EchartsLayer.prototype.show
         */

    }, {
        key: 'show',
        value: function show() {
            this._visible();
        }

        /**
         * 隐藏图层
         * @function mapboxgl.zondy.EchartsLayer.prototype.hide
         */

    }, {
        key: 'hide',
        value: function hide() {
            this._unvisible();
        }

        /**
         * 删除图层
         * @function mapboxgl.zondy.EchartsLayer.prototype.remove
         */

    }, {
        key: 'remove',
        value: function remove() {
            var self = this;
            this.map._listeners.move.forEach(function (element) {
                if (element.name === 'moveHandler') {
                    self.map.off('move', element);
                }
            });
            this.map._listeners.move.forEach(function (element) {
                if (element.name === 'zoomEndHandler') {
                    self.map.off('zoomend', element);
                }
            });

            // this.map.off('move', this.map._listeners.move[1]);
            // this.map.off('zoomend', this.map._listeners.moveend[1]);

            this.chart.clear();

            if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
            this.map = undefined;
            return this;
        }
    }]);

    return EchartsLayer;
}();

_mapboxGl2.default.zondy.EchartsLayer = EchartsLayer;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Constructs an exception object that is thrown due to a developer error, e.g., invalid argument,
 * argument out of range, etc.  This exception should only be thrown during development;
 * it usually indicates a bug in the calling code.  This exception should never be
 * caught; instead the calling code should strive not to generate it.
 * <br /><br />
 * On the other hand, a {@link RuntimeError} indicates an exception that may
 * be thrown at runtime, e.g., out of memory, that the calling code should be prepared
 * to catch.
 * 
 * @author 潘卓然ParnDeedlit修改自Cesium.DeveloperError
 *
 * @alias DeveloperError
 * @constructor
 * @extends Error
 *
 * @param {String} [message] The error message for this exception.
 *
 * @see RuntimeError
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeveloperError = exports.DeveloperError = function (_Error) {
    _inherits(DeveloperError, _Error);

    function DeveloperError(message) {
        _classCallCheck(this, DeveloperError);

        /**
         * 'DeveloperError' indicating that this exception was thrown due to a developer error.
         * @type {String}
         * @readonly
         */
        var _this = _possibleConstructorReturn(this, (DeveloperError.__proto__ || Object.getPrototypeOf(DeveloperError)).call(this));

        _this.name = 'DeveloperError';
        /**
         * The explanation for why this exception was thrown.
         * @type {String}
         * @readonly
         */
        _this.message = message;

        //Browsers such as IE don't have a stack property until you actually throw the error.
        var stack;
        try {
            throw new Error();
        } catch (e) {
            stack = e.stack;
        }
        /**
         * The stack trace of this exception, if available.
         * @type {String}
         * @readonly
         */
        _this.stack = stack;
        return _this;
    }

    _createClass(DeveloperError, [{
        key: 'toString',
        value: function toString() {
            var str = this.name + ': ' + this.message;

            if (this.stack) {
                str += '\n' + this.stack.toString();
            }

            return str;
        }

        /**
         * @private
         */

    }, {
        key: 'throwInstantiationError',
        value: function throwInstantiationError() {
            throw new DeveloperError('This function defines an interface and should not be called directly.');
        }
    }]);

    return DeveloperError;
}(Error);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appendUrl = exports.Util = undefined;

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

_Base.Zondy.Util.extend = function (destination, source) {
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
var appendUrl = function appendUrl(url, paramStr) {
    var newUrl = url;
    if (paramStr) {
        var parts = (url + " ").split(/[?&]/);
        newUrl += parts.pop() === " " ? //如果url是以?或者&结尾的直接追加参数
        paramStr : parts.length ? "&" + paramStr : "?" + paramStr;
        //如果url不是以?或者&结尾的则根据是否有参数进行符号补充
    }
    return newUrl;
};

exports.appendUrl = appendUrl;


_Base.Zondy.Util.appendUrl = appendUrl;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(undefined, function (exports, module) {
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (self) {
  'use strict';

  // if __disableNativeFetch is set to true, the it will always polyfill fetch
  // with Ajax.

  if (!self.__disableNativeFetch && self.fetch) {
    return;
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var list = this.map[name];
    if (!list) {
      list = [];
      this.map[name] = list;
    }
    list.push(value);
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    var values = this.map[normalizeName(name)];
    return values ? values[0] : null;
  };

  Headers.prototype.getAll = function (name) {
    return this.map[normalizeName(name)] || [];
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)];
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function (name) {
      this.map[name].forEach(function (value) {
        callback.call(thisArg, value, name, this);
      }, this);
    }, this);
  };

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    return fileReaderReady(reader);
  }

  function readBlobAsText(blob, options) {
    var reader = new FileReader();
    var contentType = options.headers.map['content-type'] ? options.headers.map['content-type'].toString() : '';
    var regex = /charset\=[0-9a-zA-Z\-\_]*;?/;
    var _charset = blob.type.match(regex) || contentType.match(regex);
    var args = [blob];

    if (_charset) {
      args.push(_charset[0].replace(/^charset\=/, '').replace(/;$/, ''));
    }

    reader.readAsText.apply(reader, args);
    return fileReaderReady(reader);
  }

  var support = {
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body, options) {
      this._bodyInit = body;
      if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
        this._options = options;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (!body) {
        this._bodyText = '';
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type');
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        return this.blob().then(readBlobAsArrayBuffer);
      };

      this.text = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob, this._options);
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text');
        } else {
          return Promise.resolve(this._bodyText);
        }
      };
    } else {
      this.text = function () {
        var rejected = consumed(this);
        return rejected ? rejected : Promise.resolve(this._bodyText);
      };
    }

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = input;
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body, options);
  }

  Request.prototype.clone = function () {
    return new Request(this);
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function headers(xhr) {
    var head = new Headers();
    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
    pairs.forEach(function (header) {
      var split = header.trim().split(':');
      var key = split.shift().trim();
      var value = split.join(':').trim();
      head.append(key, value);
    });
    return head;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this._initBody(bodyInit, options);
    this.type = 'default';
    this.status = options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText;
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
    this.url = options.url || '';
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request;
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input;
      } else {
        request = new Request(input, init);
      }

      var xhr = new XMLHttpRequest();

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL;
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL');
        }

        return;
      }

      var __onLoadHandled = false;

      function onload() {
        if (xhr.readyState !== 4) {
          return;
        }
        var status = xhr.status === 1223 ? 204 : xhr.status;
        if (status < 100 || status > 599) {
          if (__onLoadHandled) {
            return;
          } else {
            __onLoadHandled = true;
          }
          reject(new TypeError('Network request failed'));
          return;
        }
        var options = {
          status: status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        };
        var body = 'response' in xhr ? xhr.response : xhr.responseText;

        if (__onLoadHandled) {
          return;
        } else {
          __onLoadHandled = true;
        }
        resolve(new Response(body, options));
      }
      xhr.onreadystatechange = onload;
      xhr.onload = onload;
      xhr.onerror = function () {
        if (__onLoadHandled) {
          return;
        } else {
          __onLoadHandled = true;
        }
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

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
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;

  // Support CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = self.fetch;
  }
})(typeof self !== 'undefined' ? self : undefined);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
function defaultClearTimeout() {
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
})();
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
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
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
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
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
    while (len) {
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

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

(function (global, undefined) {
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
        registerImmediate = function registerImmediate(handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
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
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function registerImmediate(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function registerImmediate(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function registerImmediate(handle) {
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
        registerImmediate = function registerImmediate(handle) {
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
})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6), __webpack_require__(21)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(22);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || undefined && undefined.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || undefined && undefined.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function () {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
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
  Promise._immediateFn(function () {
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
    if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
    if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
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
    Promise._immediateFn(function () {
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
    fn(function (value) {
      if (done) return;
      done = true;
      resolve(self, value);
    }, function (reason) {
      if (done) return;
      done = true;
      reject(self, reason);
    });
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function (onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = function (callback) {
  var constructor = this.constructor;
  return this.then(function (value) {
    return constructor.resolve(callback()).then(function () {
      return value;
    });
  }, function (reason) {
    return constructor.resolve(callback()).then(function () {
      return constructor.reject(reason);
    });
  });
};

Promise.all = function (arr) {
  return new Promise(function (resolve, reject) {
    if (!arr || typeof arr.length === 'undefined') throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(val, function (val) {
              res(i, val);
            }, reject);
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

Promise.resolve = function (value) {
  if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function (resolve) {
    resolve(value);
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn = typeof setImmediate === 'function' && function (fn) {
  setImmediate(fn);
} || function (fn) {
  setTimeoutFunc(fn, 0);
};

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(23).setImmediate))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promisePolyfill = __webpack_require__(24);

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//这里把系统的Promise替换程了promise-polyfill的版本，为了不同浏览器之间的兼容性
window.Promise = _promisePolyfill2.default;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FetchRequest = exports.DefaultTimeout = exports.CORS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(25);

__webpack_require__(20);

var _fetchJsonp = __webpack_require__(19);

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

var _Base = __webpack_require__(2);

var _Util = __webpack_require__(18);

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IServiceQuery = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = __webpack_require__(2);

var _FetchRequest = __webpack_require__(26);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_Base.Zondy.Service = _Base.Zondy.Service || {};
/*
 * @author 潘卓然 ParnDeedlit
 */

var IServiceQuery = exports.IServiceQuery = function () {
  function IServiceQuery(method, url, params, map, style, onSuccess, onFailure) {
    _classCallCheck(this, IServiceQuery);

    this.method = method;
    this.url = url;
    this.params = params;
    this.fetchServiceData(map, style, onSuccess, onFailure);
  }

  _createClass(IServiceQuery, [{
    key: "fetchServiceData",
    value: function fetchServiceData(map, style, success, failure) {
      _FetchRequest.FetchRequest.commit(this.method, this.url, this.params, {
        // headers: options.headers,
        // withCredentials: options.withCredentials,
        // timeout: options.async ? 0 : null,
        // proxy: options.proxy
      }).then(function (response) {
        if (response.text) {
          return response.text();
        }
        return response.json();
      }).then(function (text) {
        var result = null;
        if (typeof text === "string" && (text.toLowerCase() == 'true' || text.toLowerCase() == 'false')) {
          result = {};
          if (text.toLowerCase() == 'true') {
            result.succeed = true;
          } else {
            result.error = true;
          }
        } else if (typeof text === "string") {
          result = text;
        }

        if (!result || result.error) {
          if (result && result.error) {
            result = {
              error: result.error
            };
          } else {
            result = {
              error: true
            };
          }
        }
        if (result.error) {
          failure(result);
        } else {
          if (!isNaN(result)) //为数字
            {
              result = {
                value: result
              };
            }
          if (typeof result === "string") {
            result = {
              value: result
            };
          }
          if (Object.prototype.toString.call(result) != '[object Array]') {
            result.succeed = result.succeed == undefined ? true : result.succeed;
          } else {
            result = {
              value: result,
              succeed: true
            };
          }
          success(result, map, style);
        }
      });
    }
  }]);

  return IServiceQuery;
}();

;

_Base.Zondy.Service.IServiceQuery = IServiceQuery;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QUERY_TIMECUBE = exports.PARAM_INCLUDE_PROPS = exports.PARAM_SCHEMAS = exports.PARAM_TLE_NAME = exports.PARAM_LIB_NAME = exports.QUERY_TIMECUBE_INFO = exports.QUERY_TIMECUBE_LIB = exports.PARAM_SPLIT = exports.PARAM_COMMA = exports.PARAM_SUB = exports.URL_PARAM_LINK = exports.URL_BODY_END = exports.URL_SOCKET = exports.URL_SUB = exports.URL_DIVISION = exports.URL_HTTP_PROFIX = undefined;

var _Base = __webpack_require__(2);

_Base.Zondy.GeoSpark = _Base.Zondy.GeoSpark || {};

var URL_HTTP_PROFIX = exports.URL_HTTP_PROFIX = "http://";
var URL_DIVISION = exports.URL_DIVISION = "/";
var URL_SUB = exports.URL_SUB = ":";
var URL_SOCKET = exports.URL_SOCKET = "8020";
var URL_BODY_END = exports.URL_BODY_END = "?";
var URL_PARAM_LINK = exports.URL_PARAM_LINK = "&";

var PARAM_SUB = exports.PARAM_SUB = ":";
var PARAM_COMMA = exports.PARAM_COMMA = ",";
var PARAM_SPLIT = exports.PARAM_SPLIT = ";";

var QUERY_TIMECUBE_LIB = exports.QUERY_TIMECUBE_LIB = "pgsql";
var QUERY_TIMECUBE_INFO = exports.QUERY_TIMECUBE_INFO = "tableInfoAsJson";

var PARAM_LIB_NAME = exports.PARAM_LIB_NAME = "libName";
var PARAM_TLE_NAME = exports.PARAM_TLE_NAME = "tableName?";
var PARAM_SCHEMAS = exports.PARAM_SCHEMAS = "schemas";
var PARAM_INCLUDE_PROPS = exports.PARAM_INCLUDE_PROPS = "includeProps";

/*
 * 时空立方体服务
 * example http://192.168.81.223:9091/pgsql/tableInfoAsJson?libName=postgis&tableName=createspacetimecube_zhc_001&schemas=public&includeProps=true
 */
var QUERY_TIMECUBE = exports.QUERY_TIMECUBE = QUERY_TIMECUBE_LIB + URL_DIVISION + QUERY_TIMECUBE_INFO + URL_BODY_END;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeSpaceCubeService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = __webpack_require__(2);

var _BaseDefine = __webpack_require__(28);

var _IServiceQuery = __webpack_require__(27);

var _DeveloperError = __webpack_require__(17);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_Base.Zondy.GeoSpark.TimeSpaceCubeService = undefined;

/**
 * 时空立方体的总体介绍
 * @author 潘卓然ParnDeedlit 基础平台/创新中心
 *
 * @alias TimeSpaceCubeService
 * @constructor
 *
 * @param {Object} options 该对象拥有以下属性：
 * @param {Number} options.ip DataStore的ip地址.
 * @param {Number} options.socket DataStore的socket通信端口.
 * @param {Object} [options.queryOption=DEFAULT] 查询条件属性.
 *
 * @exception {DeveloperError} options.styleOption 必须是正确的样式.
 *
 * @see TimeSpaceCubeLayer
 *
 * @example
 * // create cylinder geometry
 * var cylinder = new Zondy.GeoSpark.TimeSpaceCubeService({
 *     ip: "192.168.81.223",
 *     socket: "9091",
 *     queryOption: {
 *        libName : "postgis",
 *        tableName : "createspacetimecube_zhc_001",
 *        schemas : "public",
 *        includeProps : true
 *     }
 * });
 * var geometry = Cesium.CylinderGeometry.createGeometry(cylinder);
 */

var TimeSpaceCubeService = exports.TimeSpaceCubeService = function () {
  function TimeSpaceCubeService(options, successCallBack, failureCallBack) {
    _classCallCheck(this, TimeSpaceCubeService);

    //ip, socket, map, queryOption, styleOption    
    this.urlAddress = "";

    this.queryOption = {};

    this.handleSuccess = successCallBack;
    this.handleFailure = failureCallBack;

    this.prefixUrlPost(options.ip, options.socket, options.queryOption);
    new _IServiceQuery.IServiceQuery("GET", this.urlAddress, this.queryOption, this.map, this.handleSuccess, this.handleFailure);
  }

  /*
  * 下面的逻辑是对应的DataStore的Post请求一一对应，这里只是一个封装，将用户的直观参数
  转换成DataStore要求的参数
  */


  _createClass(TimeSpaceCubeService, [{
    key: 'prefixUrlPost',
    value: function prefixUrlPost(ip, socket, queryOption) {
      this.urlAddress = "http://192.168.81.223:9091/pgsql/tableInfoAsJson?libName=postgis&tableName=createspacetimecube_zhc_001&schemas=public&includeProps=true";
      //处理url
      this.urlAddress = "" + _BaseDefine.URL_HTTP_PROFIX + ip + _BaseDefine.URL_SUB + socket + "/" + _BaseDefine.QUERY_TIMECUBE;
      //处理elasticsearch的数据库库名,表名等请求参数
      this.queryOption = queryOption;
    }
  }]);

  return TimeSpaceCubeService;
}();

;

_Base.Zondy.GeoSpark.TimeSpaceCubeService = TimeSpaceCubeService;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TimeSpaceCubeService = __webpack_require__(29);

Object.defineProperty(exports, 'TimeSpaceCubeService', {
  enumerable: true,
  get: function get() {
    return _TimeSpaceCubeService.TimeSpaceCubeService;
  }
});

var _EchartsLayer = __webpack_require__(16);

Object.defineProperty(exports, 'EchartsLayer', {
  enumerable: true,
  get: function get() {
    return _EchartsLayer.EchartsLayer;
  }
});

var _MapvLayer = __webpack_require__(15);

Object.defineProperty(exports, 'MapvLayer', {
  enumerable: true,
  get: function get() {
    return _MapvLayer.MapvLayer;
  }
});

var _D3Layer = __webpack_require__(13);

Object.defineProperty(exports, 'D3Layer', {
  enumerable: true,
  get: function get() {
    return _D3Layer.D3Layer;
  }
});

var _TimeSpaceCubeLayer = __webpack_require__(11);

Object.defineProperty(exports, 'TimeSpaceCubeLayer', {
  enumerable: true,
  get: function get() {
    return _TimeSpaceCubeLayer.TimeSpaceCubeLayer;
  }
});

var _ElsCubeLayer = __webpack_require__(10);

Object.defineProperty(exports, 'ElsCubeLayer', {
  enumerable: true,
  get: function get() {
    return _ElsCubeLayer.ElsCubeLayer;
  }
});

var _mapv = __webpack_require__(9);

Object.keys(_mapv).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mapv[key];
    }
  });
});

var _echarts = __webpack_require__(8);

Object.keys(_echarts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _echarts[key];
    }
  });
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MapExtend = __webpack_require__(7);

Object.defineProperty(exports, 'MapExtend', {
  enumerable: true,
  get: function get() {
    return _MapExtend.MapExtend;
  }
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(31);

Object.keys(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _core[key];
    }
  });
});

var _overlay = __webpack_require__(30);

Object.keys(_overlay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _overlay[key];
    }
  });
});

/***/ }),
/* 33 */,
/* 34 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);