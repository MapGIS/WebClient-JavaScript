/**
 * modify to zondy mapv
 * @origin author kyle / http://nikai.us/
 * @author 潘卓然 ParnDeedlit
 */

import {
    baiduMapLayer,
    DataSet
} from "mapv";
import L from 'leaflet';

var BaseLayer = baiduMapLayer ? baiduMapLayer.__proto__ : Function;

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
export class MapvBaseLayer extends BaseLayer {

    constructor(map, dataSet, options, leafletLayer) {
        super(map, dataSet, options);

        if (!BaseLayer) {
            return
        };

        this.map = map; //此处的map是外面传入的leaflet的map对象
        this.dataSet = dataSet;
        this.options = options;

        var self = this;
        var data = null;
        options = options || {};

        self.init(options);
        self.argCheck(options);

        this.initDevicePixelRatio();

        this.canvasLayer = leafletLayer;

        this.clickEvent = this.clickEvent.bind(this);
        this.mousemoveEvent = this.mousemoveEvent.bind(this);

        this.bindEvent();
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
    clickEvent(e) {
        var offset = this.map.containerPointToLayerPoint([0, 0]); //this.map.getPixelOrigin()
        var devicePixelRatio = this.devicePixelRatio || 1;
        var canvasPoint = e.layerPoint;
        var pixel = {
            x: (canvasPoint.x - offset.x) / devicePixelRatio,
            y: (canvasPoint.y - offset.y) / devicePixelRatio
        }
        //super.clickEvent(pixel, e);
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
    mousemoveEvent(e) {
        if (!e) {
            return;
        }
        var offset = this.map.containerPointToLayerPoint([0, 0]); //this.map.getPixelOrigin()
        var devicePixelRatio = this.devicePixelRatio || 1;
        var canvasPoint = e.layerPoint;
        var pixel = {
            x: (canvasPoint.x - offset.x) / devicePixelRatio,
            y: (canvasPoint.y - offset.y) / devicePixelRatio
        }
        //super.mousemoveEvent(pixel, e);
    }

    addAnimatorEvent() {
        /* this.map.on('movestart', this.animatorMovestartEvent.bind(this));
        this.map.on('moveend', this.animatorMoveendEvent.bind(this)); */
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

    bindEvent(e) {
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

    unbindEvent(e) {
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
    initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    }

    getContext() {
        return this.canvasLayer.getCanvas().getContext(this.context);
    }

    _canvasUpdate(time) {
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
            transferCoordinate: function (coordinate) {
                // get center from the map (projected)
                var point = map.latLngToContainerPoint(new L.LatLng(coordinate[1], coordinate[0]));
                if(self.options.draw === 'heatmap') {
                    point.x /= self.devicePixelRatio;
                    point.y /= self.devicePixelRatio;
                }
                return [point.x - offset.x, point.y - offset.y];
            }
        }

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

        var originpoint = map.latLngToContainerPoint(L.latLng(0, 0));
        var pixel = {
            x: originpoint.x - offset.x,
            y: originpoint.y - offset.y
        };

        this.drawContext(context, new DataSet(data), self.options, pixel);
        self.options.updateCallback && self.options.updateCallback(time);
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

    draw() {
        this.canvasLayer.draw();
    }

    //该函数从mapv/canvas/clear中提取
    clear(context) {
        context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        //context.canvas.width = context.canvas.width;
        //context.canvas.height = context.canvas.height;
    }

}
