import {
    baiduMapLayer,
    DataSet
} from "mapv";

import Cesium from '../../../../node_modules/cesium/Source/Cesium';

var BaseLayer = baiduMapLayer ? baiduMapLayer.__proto__ : Function;

/**
 * @private
 * @class MapvBaseLayer
 * @classdesc MapV图层渲染
 * @param map - {string} 地图
 * @param layer -{Object} 图层
 * @param dataSet -{Object} 数据集
 * @param options -{Object} 交互时所需可选参数。
 * @see https://github.com/huiyan-fe/mapv/blob/master/API.md
 * @extends BaseLayer
 *
 */
export class MapvBaseLayer extends BaseLayer {
    constructor(map, dataSet, options, cesiumLayer) {
        super(map, dataSet, options);

        if (!BaseLayer) return;

        this.map = map; //此处的map是外面传入的cesium的map对象
        this.scene = map.scene;
        this.dataSet = dataSet;

        var self = this;
        var data = null;
        options = options || {};

        self.init(options);
        self.argCheck(options);

        this.initDevicePixelRatio();

        this.canvasLayer = cesiumLayer;

        this.stopAniamation = false;
        this.animation = options.animation;

        this.clickEvent = this.clickEvent.bind(this);
        this.mousemoveEvent = this.mousemoveEvent.bind(this);

        this.bindEvent();
    }

    /**
     * @function cesium.zondy.MapvBaseLayer.prototype.initDevicePixelRatio
     * @description window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。
     * 公式表示就是：window.devicePixelRatio = 物理像素 / dips,该函数主要应用与移动设备
     */
    initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    }

    /**
     * @function cesium.zondy.MapvBaseLayer.prototype.clickEvent
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
    clickEvent(e) {
        var pixel = e.point;
        super.clickEvent(pixel, e);
    }

    /**
     * @function cesium.zondy.MapvBaseLayer.prototype.mousemoveEvent
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
    mousemoveEvent(e) {
        var pixel = e.point;
        super.mousemoveEvent(pixel, e);
    }

    addAnimatorEvent() {

    }

    animatorMovestartEvent() {
        var animationOptions = this.options.animation;
        if (this.isEnabledTime() && this.animator) {
            this.steps.step = animationOptions.stepsRange.start;
            //this.animator.stop();
        }
    }

    animatorMoveendEvent() {
        if (this.isEnabledTime() && this.animator) {
            //this.animator.start();
        }
    }

    bindEvent() {
        var map = this.map;
        if (this.options.methods) {
            if (this.options.methods.click) {
                //map.on('click', this.clickEvent);
            }
            if (this.options.methods.mousemove) {
                //map.on('mousemove', this.mousemoveEvent);
            }
        }
    }

    unbindEvent() {
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

    getContext() {
        return this.canvasLayer.canvas.getContext(this.context);
    }


    init(options) {

        var self = this;

        self.options = options;

        this.initDataRange(options);

        this.context = self.options.context || '2d';

        if (self.options.zIndex) {
            this.canvasLayer && this.canvasLayer.setZIndex(self.options.zIndex);
        }

        this.initAnimator();
    }

    _canvasUpdate(time) {
        var map = this.map;
        var scene = this.scene;
        if (!this.canvasLayer || this.stopAniamation) {
            return;
        }
        var self = this;

        var animationOptions = self.options.animation;

        var context = self.getContext();

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

        /*  if (self.options.minZoom && map.getZoom() < self.options.minZoom || self.options.maxZoom && map.getZoom() > self.options.maxZoom) {
             return;
         } */

/*         var dataGetOptions = {
            transferCoordinate: function (coordinate) {
                var position = Cesium.Cartesian3.fromDegrees(coordinate[0], coordinate[1]);
                var point = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, position);
                if (point == undefined) {
                    return [-1, -1];
                }
                return [point.x, point.y];
            }
        }; */
        var dataGetOptions = {
            transferCoordinate: function (coordinate) {
                var pointSphere = Cesium.Cartesian3.fromDegrees(coordinate[0], coordinate[1]);  
                var position = self.map.camera.position;
                var cameraHeight = self.map.scene.globe.ellipsoid.cartesianToCartographic(position).height;
                cameraHeight += self.map.scene.globe.ellipsoid.maximumRadius * 1.2;
                var distance = Cesium.Cartesian3.distance(position, pointSphere);
                if(distance>cameraHeight){
                    return undefined;    
                    // return [-50, -50];
                }

                var position = Cesium.Cartesian3.fromDegrees(coordinate[0], coordinate[1]);
                var point = Cesium.SceneTransforms.wgs84ToWindowCoordinates(self.map.scene, position);
                if (!point) return [0, 0];
                return [point.x, point.y];
            }
        };

        if (time !== undefined) {
            dataGetOptions.filter = function (item) {
                var trails = animationOptions.trails || 10;
                if (time && item.time > (time - trails) && item.time < time) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        var data = self.dataSet.get(dataGetOptions);

        this.processData(data);

        if (self.options.unit == 'm' && self.options.size) {
            //self.options._size = self.options.size / zoomUnit;
            self.options._size = self.options.size;
        } else {
            self.options._size = self.options.size;
        }

        var pixel = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, Cesium.Cartesian3.fromDegrees(0, 0));
        let point;
        if (!pixel) point = [0, 0];
        point = [pixel.x, pixel.y];
        this.drawContext(context, new DataSet(data), self.options, point);

        self.options.updateCallback && self.options.updateCallback(time);
    }

    updateData(data, options) {
        var _data = data;
        if (_data && _data.get) {
            _data = _data.get();
        }
        if (_data != undefined) {
            this.dataSet.set(_data);
        }

        super.update({
            options: options
        });

    }

    addData(data, options) {
        var _data = data;
        if (data && data.get) {
            _data = data.get();
        }
        this.dataSet.add(_data);
        this.update({
            options: options
        });
    }

    getData() {
        return this.dataSet;
    }

    removeData(filter) {
        if (!this.dataSet) {
            return;
        }
        var newData = this.dataSet.get({
            filter: function (data) {
                return (filter != null && typeof filter === "function") ? !filter(data) : true;
            }
        });
        this.dataSet.set(newData);
        this.update({
            options: null
        });
    }

    clearData() {
        this.dataSet && this.dataSet.clear();
        this.update({
            options: null
        });
    }

    draw() {
        this.canvasLayer.draw();
    }

    //该函数从mapv/canvas/clear中提取
    clear(context) {
        context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

}