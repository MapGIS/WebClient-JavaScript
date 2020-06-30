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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = ol;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapvRenderer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _MapvCanvasLayer = __webpack_require__(6);

var _mapv = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaiduMapLayer = _mapv.baiduMapLayer ? _mapv.baiduMapLayer.__proto__ : Function;

/**
 * @class MapvRenderer
 * @classdesc MapV图层类。
 * @private
 * @param map - {Object} 地图
 * @param dataSet - {Object} 数据集
 * @param options - {Object} 参数，如：<br>
 *        paneName - {string} 窗口名。<br>
 *        enableMassClear - {} 。<br>
 *        context - {string} 内容。<br>
 *        zIndex - {number} 层级。<br>
 *        width - {number} 画布宽。<br>
 *        height - {number} 画布高。<br>
 *        mixBlendMode - {string} 最小混合模式。
 * @param mapWidth - {number} 地图宽度
 * @param mapHeight - {number} 地图高度
 * @param source - {Object} 资源
 * @extends BaiduMapLayer
 */

var MapvRenderer = exports.MapvRenderer = function (_BaiduMapLayer) {
    _inherits(MapvRenderer, _BaiduMapLayer);

    function MapvRenderer(map, dataSet, options, mapWidth, mapHeight, source) {
        _classCallCheck(this, MapvRenderer);

        var _this = _possibleConstructorReturn(this, (MapvRenderer.__proto__ || Object.getPrototypeOf(MapvRenderer)).call(this, map, dataSet, options));

        _this.dataSet = dataSet;
        _this.mapWidth = mapWidth;
        _this.mapHeight = mapHeight;
        var self = _this;
        options = options || {};
        _this.source = source;
        self.animator = null;
        self.map = map;
        self.init(options);
        self.argCheck(options);
        _this.canvasLayer = new _MapvCanvasLayer.MapvCanvasLayer({
            map: map,
            context: _this.context,
            paneName: options.paneName,
            mixBlendMode: options.mixBlendMode,
            enableMassClear: options.enableMassClear,
            zIndex: options.zIndex,
            width: mapWidth,
            height: mapHeight,
            update: function update() {
                self._canvasUpdate();
            }
        });
        _this.clickEvent = _this.clickEvent.bind(_this);
        _this.mousemoveEvent = _this.mousemoveEvent.bind(_this);
        map.on('movestart', _this.moveStartEvent.bind(_this));
        map.on('moveend', _this.moveEndEvent.bind(_this));
        map.getView().on('change:center', _this.zoomEvent.bind(_this));
        map.on('pointerdrag', _this.dragEvent.bind(_this));
        _this.bindEvent();
        return _this;
    }

    /**
     * @function MapvRenderer.prototype.init
     * @param options - {Object} 参数
     * @description 初始化参数
     */


    _createClass(MapvRenderer, [{
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

        /**
         * @function MapvRenderer.prototype.clickEvent
         * @param e - {Object} 事件参数
         * @description 点击事件
         */

    }, {
        key: 'clickEvent',
        value: function clickEvent(e) {
            var pixel = e.pixel;
            _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), 'clickEvent', this).call(this, { x: pixel[0] + this.offset[0], y: pixel[1] + this.offset[1] }, e);
        }

        /**
         * @function MapvRenderer.prototype.mousemoveEvent
         * @param e - {Object} 事件参数
         * @description 鼠标移动事件
         */

    }, {
        key: 'mousemoveEvent',
        value: function mousemoveEvent(e) {
            var pixel = e.pixel;
            _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), 'mousemoveEvent', this).call(this, { x: pixel[0], y: pixel[1] }, e);
        }

        /**
         * @function MapvRenderer.prototype.dragEvent
         * @description 鼠标拖动事件
         */

    }, {
        key: 'dragEvent',
        value: function dragEvent() {
            this.clear(this.getContext());
        }

        /**
         * @function MapvRenderer.prototype.zoomEvent
         * @description 缩放事件
         */

    }, {
        key: 'zoomEvent',
        value: function zoomEvent() {
            this.clear(this.getContext());
        }

        /**
         * @function MapvRenderer.prototype.moveStartEvent
         * @description 开始移动事件
         */

    }, {
        key: 'moveStartEvent',
        value: function moveStartEvent() {
            var animationOptions = this.options.animation;
            if (this.isEnabledTime() && this.animator) {
                this.steps.step = animationOptions.stepsRange.start;
            }
        }

        /**
         * @function MapvRenderer.prototype.moveEndEvent
         * @description 结束移动事件
         */

    }, {
        key: 'moveEndEvent',
        value: function moveEndEvent() {
            this.canvasLayer.draw();
        }

        /**
         * @function MapvRenderer.prototype.bindEvent
         * @description 绑定事件
         */

    }, {
        key: 'bindEvent',
        value: function bindEvent() {
            var me = this;
            var map = me.map;
            if (me.options.methods) {
                if (me.options.methods.click) {
                    map.on('click', me.clickEvent);
                }
                if (me.options.methods.mousemove) {
                    me.pointerInteraction = new _openlayers2.default.interaction.Pointer();
                    me.pointerInteraction.handleMoveEvent_ = function (event) {
                        me.mousemoveEvent(event);
                    };
                    map.addInteraction(me.pointerInteraction);
                }
            }
        }

        /**
         * @function MapvRenderer.prototype.unbindEvent
         * @description 解除绑定事件
         */

    }, {
        key: 'unbindEvent',
        value: function unbindEvent() {
            var map = this.map;
            if (this.options.methods) {
                if (this.options.methods.click) {
                    map.un('click', this.clickEvent);
                }
                if (this.options.methods.mousemove) {
                    map.removeInteraction(this.pointerInteraction);
                }
            }
        }

        /**
         * @function MapvRenderer.prototype.addData
         * @description 添加数据
         * @param data - {oject} 待添加的数据
         * @param options - {oject} 待添加的数据信息
         */

    }, {
        key: 'addData',
        value: function addData(data, options) {
            var _data = data;
            if (data && data.get) {
                _data = data.get();
            }
            this.dataSet.add(_data);
            this.update({ options: options });
        }

        /**
         * @function MapvRenderer.prototype.update
         * @description 更新图层
         * @param opt - {Object} 待更新的数据<br>
         *        data -{Object} mapv数据集<br>
         *        options -{Object} mapv绘制参数<br>
         */

    }, {
        key: 'update',
        value: function update(opt) {
            var update = opt || {};
            var _data = update.data;
            if (_data && _data.get) {
                _data = _data.get();
            }
            if (_data != undefined) {
                this.dataSet.set(_data);
            }
            _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), 'update', this).call(this, { options: update.options });
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.canvasLayer.draw();
        }

        /**
         * @function MapvRenderer.prototype.getData
         * @description 获取数据
         */

    }, {
        key: 'getData',
        value: function getData() {
            return this.dataSet;
        }

        /**
         * @function MapvRenderer.prototype.removeData
         * @description 删除符合过滤条件的数据
         * @param filter - {function} 过滤条件。条件参数为数据项，返回值为true,表示删除该元素；否则表示不删除
         */

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
            this.update({ options: null });
        }

        /**
         * @function MapvRenderer.prototype.clearData
         * @description 清除数据
         */

    }, {
        key: 'clearData',
        value: function clearData() {
            this.dataSet && this.dataSet.clear();
            this.update({ options: null });
        }
    }, {
        key: '_canvasUpdate',
        value: function _canvasUpdate(time) {
            if (!this.canvasLayer) {
                return;
            }
            var self = this;
            var animationOptions = self.options.animation;
            var map = self.map;
            var context = self.canvasLayer.canvas.getContext(self.context);
            if (self.isEnabledTime()) {
                if (time === undefined) {
                    self.clear(context);
                    return;
                }
                if (self.context == '2d') {
                    context.save();
                    context.globalCompositeOperation = 'destination-out';
                    context.fillStyle = 'rgba(0, 0, 0, .1)';
                    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                    context.restore();
                }
            } else {
                this.clear(context);
            }
            if (self.context == '2d') {
                for (var key in self.options) {
                    context[key] = self.options[key];
                }
            } else {
                context.clear(context.COLOR_BUFFER_BIT);
            }
            var view = map.getView();
            var size = [100, 100];
            var uid = self.map.ol_uid || 0;
            var selector = '.ol-viewport';
            var element = document.querySelector(selector);
            if (element) {
                var metrics = getComputedStyle(element);
                size[0] = parseInt(metrics.width, 10);
                size[1] = parseInt(metrics.height, 10);
            }
            var ext = map.getView().calculateExtent(size);
            var topLeft = map.getPixelFromCoordinate([ext[0], ext[3]]);

            var dataGetOptions = {
                transferCoordinate: function transferCoordinate(coordinate) {
                    var pixelP = map.getPixelFromCoordinate(coordinate);
                    var rotation = -map.getView().getRotation();
                    var center = map.getPixelFromCoordinate(map.getView().getCenter());
                    var scaledP = scale(pixelP, center, self.pixelRatio);
                    var rotatedP = rotate(scaledP, rotation, center);
                    // var result = [rotatedP[0] + self.offset[0] - topLeft[0], rotatedP[1] + self.offset[1] - topLeft[1]];
                    var result = [rotatedP[0] + self.offset[0], rotatedP[1] + self.offset[1]];
                    return result;
                }
            };

            //获取某像素坐标点pixelP绕中心center逆时针旋转rotation弧度后的像素点坐标。
            function rotate(pixelP, rotation, center) {
                var x = Math.cos(rotation) * (pixelP[0] - center[0]) - Math.sin(rotation) * (pixelP[1] - center[1]) + center[0];
                var y = Math.sin(rotation) * (pixelP[0] - center[0]) + Math.cos(rotation) * (pixelP[1] - center[1]) + center[1];
                return [x, y];
            }

            //获取某像素坐标点pixelP相对于中心center进行缩放scaleRatio倍后的像素点坐标。
            function scale(pixelP, center, scaleRatio) {
                var x = (pixelP[0] - center[0]) * scaleRatio + center[0];
                var y = (pixelP[1] - center[1]) * scaleRatio + center[1];
                return [x, y];
            }

            if (time !== undefined) {
                dataGetOptions.filter = function (item) {
                    var trails = animationOptions.trails || 10;
                    return time && item.time > time - trails && item.time < time;
                };
            }
            if (self.isEnabledTime() && !self.notFirst) {
                self.canvasLayer.resize(self.mapWidth, self.mapHeight);
                self.notFirst = true;
            }
            var data = self.dataSet.get(dataGetOptions);
            self.processData(data);
            self.options._size = self.options.size;
            var pixel = map.getPixelFromCoordinate([0, 0]);
            pixel = [pixel[0] - topLeft[0], pixel[1] - topLeft[1]];
            this.drawContext(context, new _mapv.DataSet(data), self.options, { x: pixel[0], y: pixel[1] });
            if (self.isEnabledTime()) {
                this.source.changed();
            }
            self.options.updateCallback && self.options.updateCallback(time);
        }
    }, {
        key: 'isEnabledTime',
        value: function isEnabledTime() {
            var animationOptions = this.options.animation;
            return animationOptions && !(animationOptions.enabled === false);
        }
    }, {
        key: 'argCheck',
        value: function argCheck(options) {
            if (options.draw === 'heatmap') {
                if (options.strokeStyle) {
                    console.warn('[heatmap] options.strokeStyle is discard, pleause use options.strength [eg: options.strength = 0.1]');
                }
            }
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this.canvasLayer.canvas.getContext(this.context);
        }
    }, {
        key: 'clear',
        value: function clear(context) {
            context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }
    }]);

    return MapvRenderer;
}(BaiduMapLayer);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _overlay = __webpack_require__(3);

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MapvSource = __webpack_require__(4);

Object.defineProperty(exports, 'MapvSource', {
  enumerable: true,
  get: function get() {
    return _MapvSource.MapvSource;
  }
});

var _mapv = __webpack_require__(8);

Object.keys(_mapv).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mapv[key];
    }
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapvSource = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

__webpack_require__(5);

var _MapvRenderer = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class ol.source.MapvSource
 * @category  Visualization MapV
 * @classdesc MapV图层源。
 * @param opt_options -{Object} 参数
 * @extends ol.source.ImageCanvas{@linkdoc-openlayers/ol.source.ImageCanvas}
 */
var MapvSource = exports.MapvSource = function (_ol$source$ImageCanva) {
  _inherits(MapvSource, _ol$source$ImageCanva);

  function MapvSource(map, data, options) {
    _classCallCheck(this, MapvSource);

    var _this = _possibleConstructorReturn(this, (MapvSource.__proto__ || Object.getPrototypeOf(MapvSource)).call(this, {
      attributions: options.attributions || new _openlayers2.default.Attribution({
        html: "© 2017 百度 MapV提供数据<span>© <a href='http://www.smaryun.com' target='_blank'>MapGIS WebClient</a></span>"
      }),
      canvasFunction: canvasFunctionInternal_,
      logo: options.logo,
      projection: options.projection,
      ratio: options.ratio,
      resolutions: options.resolutions,
      state: options.state
    }));

    _this.map = map;
    _this.dataSet = data;
    _this.mapvOptions = options;

    _this.initDevicePixelRatio();

    function canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) {
      // eslint-disable-line no-unused-vars
      var mapWidth = size[0] * pixelRatio;
      var mapHeight = size[1] * pixelRatio;
      var width = this.map.getSize()[0] * pixelRatio;
      var height = this.map.getSize()[1] * pixelRatio;
      if (!this.layer) {
        this.layer = new _MapvRenderer.MapvRenderer(this.map, this.dataSet, this.mapvOptions, mapWidth, mapHeight, this);
      }
      this.layer.pixelRatio = pixelRatio;
      this.layer.offset = [(mapWidth - width) / 2 / pixelRatio, (mapHeight - height) / 2 / pixelRatio];
      if (!this.rotate) {
        this.rotate = this.map.getView().getRotation();
      } else {
        if (this.rotate !== this.map.getView().getRotation()) {
          this.layer.canvasLayer.resize(mapWidth, mapHeight);
          this.rotate = this.map.getView().getRotation();
        }
      }
      var canvas = this.layer.canvasLayer.canvas;
      if (!this.layer.isEnabledTime()) {
        this.layer.canvasLayer.resize(mapWidth, mapHeight);
        this.layer.canvasLayer.draw();
      }
      if (!this.context) {
        var canvas = document.createElement('CANVAS');
        if (mapWidth) {
          canvas.width = mapWidth;
        }
        if (mapHeight) {
          canvas.height = mapHeight;
        }
        this.context = canvas.getContext('2d');
      }
      var canvas2 = this.context.canvas;
      this.context.clearRect(0, 0, canvas2.width, canvas2.height);
      canvas2.width = mapWidth;
      canvas2.height = mapHeight;
      canvas2.style.width = mapWidth + "px";
      canvas2.style.height = mapHeight + "px";
      this.context.drawImage(canvas, 0, 0, mapWidth, mapHeight, 0, 0, mapWidth, mapHeight);
      if (this.resolution !== resolution || JSON.stringify(this.extent) !== JSON.stringify(extent)) {
        this.resolution = resolution;
        this.extent = extent;
      }
      if (!this.mapvoption.context || this.mapvoption.context == '2d') {
        canvas2.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
      }
      return this.context.canvas;
    }
    return _this;
  }

  _createClass(MapvSource, [{
    key: 'initDevicePixelRatio',
    value: function initDevicePixelRatio() {
      this.devicePixelRatio = window.devicePixelRatio || 1;
    }

    /**
     * @function ol.source.MapvSource.prototype.addData
     * @description 追加数据
     * @param data - {Object} 要追加的数据
     * @param options -{Object} 要追加的值
     */

  }, {
    key: 'addData',
    value: function addData(data, options) {
      this.layer.addData(data, options);
    }

    /**
     * @function ol.source.MapvSource.prototype.getData
     * @description 获取数据
     * @return {mapv.DataSet} mapv数据集
     */

  }, {
    key: 'getData',
    value: function getData() {
      if (this.layer) {
        this.dataSet = this.layer.getData();
      }
      return this.dataSet;
    }

    /**
     * @function ol.source.MapvSource.prototype.removeData
     * @description 删除符合过滤条件的数据
     * @param filter - {function} 过滤条件。条件参数为数据项，返回值为true,表示删除该元素；否则表示不删除
     * @example
     *  filter=function(data){
     *    if(data.id=="1"){
     *      return true
     *    }
     *    return false;
     *  }
     */

  }, {
    key: 'removeData',
    value: function removeData(filter) {
      this.layer && this.layer.removeData(filter);
    }

    /**
     * @function ol.source.MapvSource.prototype.clearData
     * @description 清除数据
     */

  }, {
    key: 'clearData',
    value: function clearData() {
      this.layer.clearData();
    }

    /**
     * @function ol.source.MapvSource.prototype.update
     * @description 更新数据
     * @param options - {Object} 待更新的数据<br>
     *        data -{Object} mapv数据集<br>
     *        options -{Object} mapv绘制参数<br>
     */

  }, {
    key: 'update',
    value: function update(options) {
      this.layer.update(options);
      this.changed();
    }
  }]);

  return MapvSource;
}(_openlayers2.default.source.ImageCanvas);

_openlayers2.default.zondy.MapvSource = MapvSource;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_openlayers2.default.zondy = _openlayers2.default.zondy || {}; /**
                                                                *MapGIS WebClient OpenLayers
                                                                * 定义命名空间
                                                                * 提供公共模块
                                                                */

_openlayers2.default.zondy.control = _openlayers2.default.zondy.control || {}; //讲真，人家这样做从架构上其实还确实挺正确的

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class ol.zondy.MapvCanvasLayer
 * @classdesc Mapv渲染器。
 * @private
 * @param options - {Object} 可选参数。如：<br>
 *        paneName - {string} 窗口名。<br>
 *        enableMassClear - {} 。<br>
 *        context - {string} 内容。<br>
 *        zIndex - {number} 层级。<br>
 *        width - {number} 画布宽。<br>
 *        height - {number} 画布高。<br>
 *        mixBlendMode - {string} 最小混合模式。
 */
var MapvCanvasLayer = exports.MapvCanvasLayer = function () {
    function MapvCanvasLayer(options) {
        _classCallCheck(this, MapvCanvasLayer);

        this.options = options || {};
        this.enableMassClear = this.options.enableMassClear;
        this._map = options.map;
        this.paneName = this.options.paneName || 'mapPane';
        this.context = this.options.context || '2d';
        this.zIndex = this.options.zIndex || 2;
        this.mixBlendMode = this.options.mixBlendMode || null;
        this.width = options.width;
        this.height = options.height;
        this.initialize();
    }

    _createClass(MapvCanvasLayer, [{
        key: 'initialize',
        value: function initialize() {
            var me = this;
            var canvas = me.canvas = document.createElement("canvas");
            canvas.style.cssText = "position:absolute;" + "left:0;" + "top:0;" + "z-index:" + me.zIndex + ";user-select:none;";
            canvas.style.mixBlendMode = me.mixBlendMode;
            canvas.className = "mapvClass";
            var global$2 = typeof window === 'undefined' ? {} : window;
            var devicePixelRatio = me.devicePixelRatio = global$2.devicePixelRatio;
            canvas.width = me.width;
            canvas.height = me.height;
            if (me.context == '2d') {
                canvas.getContext(me.context).scale(devicePixelRatio, devicePixelRatio);
            }
            canvas.style.width = canvas.width + "px";
            canvas.style.height = canvas.height + "px";
        }

        /**
         * @function ol.zondy.MapvCanvasLayer.prototype.draw
         * @description 生成地图
         */

    }, {
        key: 'draw',
        value: function draw() {
            this.options.update && this.options.update.call(this);
        }

        /**
         * @function ol.zondy.MapvCanvasLayer.prototype.resize
         * @param mapWidth - {number} 地图宽度
         * @param mapHeight - {number} 地图高度
         * @description 调整地图大小
         */

    }, {
        key: 'resize',
        value: function resize(mapWidth, mapHeight) {
            this.canvas.width = mapWidth;
            this.canvas.height = mapHeight;
            this.canvas.style.width = mapWidth + "px";
            this.canvas.style.height = mapHeight + "px";
        }

        /**
         * @function ol.zondy.MapvCanvasLayer.prototype.getContainer
         * @description 获取容器
         * @return {Element} 包含Mapv图层的dom对象
         */

    }, {
        key: 'getContainer',
        value: function getContainer() {
            return this.canvas;
        }

        /**
         * @function ol.zondy.MapvCanvasLayer.prototype.setZIndex
         * @param zIndex - {number} 层级参数
         * @description 设置图层层级
         */

    }, {
        key: 'setZIndex',
        value: function setZIndex(zIndex) {
            this.canvas.style.zIndex = zIndex;
        }

        /**
         * @function ol.zondy.MapvCanvasLayer.prototype.getZIndex
         * @description 获取图层层级
         */

    }, {
        key: 'getZIndex',
        value: function getZIndex() {
            return this.zIndex;
        }
    }]);

    return MapvCanvasLayer;
}();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function(){try{return mapv}catch(e){return {}}}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MapvRenderer = __webpack_require__(1);

Object.defineProperty(exports, 'MapvRenderer', {
  enumerable: true,
  get: function get() {
    return _MapvRenderer.MapvRenderer;
  }
});

/***/ })
/******/ ]);