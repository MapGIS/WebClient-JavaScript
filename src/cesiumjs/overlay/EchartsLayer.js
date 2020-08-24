import echarts from 'echarts';

import {
    CesiumZondy
} from '../core/Base';

import {
    MapCoordSys
} from './echarts/MapCoordSys';

// import Cesium from '../../../node_modules/cesium/Source/Cesium';

var echartsIdIndex = 0;

/**
 * @author 基础平台/创新中心 潘卓然
 * @class module:客户端可视化.EchartsLayer
 * @classdesc Echarts图表图层
 * @description cesium的echars 4.0的实现。请详细参考echarts源码,CesiumZondy.Overlayer.EchartsLayer
 * @see http://echarts.baidu.com/api.html#echarts
 * @example 这里唯一要注意的是我们中地数码的ceisum的右键事件不是放大缩小而是旋转视角
 * option = {
        title: {
            text: '全国主要城市空气质量 - 百度地图提供数据',
            textStyle: {
                color: '#eee'
            },
            subtext: 'data from PM25.in',
            sublink: 'http://www.pm25.in',
            left: 'center'
        },
        legend: {
            orient: 'vertical',
            y: 'top',
            x: 'left',
            data: ['pm2.5'],
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        cesium: {
            roam: true
        },
        series: [{
                name: 'pm2.5',
                type: 'scatter',
                coordinateSystem: 'cesium',
                data: convertData(data),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                },
                zlevel: 1
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'cesium',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 6)),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ]
    }
    layer = new CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map);
 */
export default class EchartsLayer {

    /**
     * @param {Cesium.Viewer} map Cesium.Viewer
     * @param {*} options 百度EchartsOptions https://echarts.apache.org/zh/option.html#title
     * @param {Boolean} [options.postRender=false] 是否实时渲染
     * @param {HTMLElement} [container] 传递给echarts绘制canvas的元素，如不传内部自动建立一个画布元素,外接的方式使用请MapvLayer
     */
    constructor(map, options, container) {
        this.map = map;
        this.scene = map.scene;
        this.options = options;
        this.initStats = false;

        this.handler = undefined;
        this.moveEndEvent = undefined;

        this.layerId = options.layerId || ("echarts" + echartsIdIndex++);
        this.layerClass = options.layerClass || "echartlayerdefaultclass";

        this.initDevicePixelRatio();

        this.visible = true;
        this.canvas = this._createCanvas();
        this.postRenderTime = 0;
        this.postRenderFrame = options.postRenderFrame || 30;

/*         this.container = map.container;
        this.addInnerContainer(); */
        if (container != undefined) {
            this.container = container;
            container.appendChild(this.canvas);
        } else {
            var parents = document.getElementsByClassName('cesium-widget');
            var parent = parents.length > 0 ? parents[0] : map.container;
            this.container = parent;
            this.addInnerContainer();
        }

        this.chart = echarts.init(this.canvas);

        this.initEcharts();
        this._resizeCanvas();

        this.resize();
        return this;
    }

    initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    }

    addInnerContainer() {
        this.container.appendChild(this.canvas);
    }

    initEcharts() {
        echarts.cesiumMap = this.map;

        echarts.registerCoordinateSystem('cesium', MapCoordSys);

        echarts.extendComponentModel({
            type: 'cesium',
            getBMap: function () {
                return this.__cesium;
            },
            defaultOption: {
                roam: false
            }
        });

        echarts.registerAction({
                type: 'CesiumRoma',
                event: 'CesiumRoma',
                update: 'updateLayout'
            },
            function (payload, ecModel) {

            }
        );

        return this;
    }

    _createCanvas() {
        var canvas = document.createElement('div');
        /*         canvas.setAttribute('id', this.layerId);
                canvas.setAttribute('class', this.layerClass); */
        //canvas.id = this.layerId;
        canvas.className = 'cesium-echarts-layer';
        canvas.setAttribute('class', 'cesium-echarts-layer');
        
        canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";

        canvas.style.pointerEvents = "none"; //屏蔽鼠标事件
        canvas.style.zIndex = this.options.zIndex || 100;

        var width = parseInt(this.map.canvas.width) + "px";
        var height = parseInt(this.map.canvas.height) + "px";

        canvas.width = width;
        canvas.height = height
        canvas.style.width = width;
        canvas.style.height = height;

        //这段可以先不不放开
        /* var devicePixelRatio = this.devicePixelRatio;
        if (this.mapVOptions.context == '2d') {
            canvas.getContext(this.mapVOptions.context).scale(devicePixelRatio, devicePixelRatio);
        } */

        // console.log('_creteWidgetCanvas', this.map.canvas, devicePixelRatio, this);
        return canvas;
    }

    _resizeCanvas() {
        const self = this;

        window.onresize = function () {
            var canvas = self.canvas;
            var map = self.map;

            canvas.style.position = 'absolute';
            canvas.style.top = "0px";
            canvas.style.left = "0px";

            var width = parseInt(map.canvas.width) + "px";
            var height = parseInt(map.canvas.height) + "px";
    
            canvas.width = width;
            canvas.height = height
            canvas.style.width = width;
            canvas.style.height = height;

            self.chart.resize();
        };

        //this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';

    }

    _visible() {
        this.visible = true;
        this.canvas.style.visibility = "visible";
    }

    _unvisible() {
        this.visible = false;
        this.canvas.style.visibility = "hidden";
    }

    /**
     * @description 将图层添加到三维球上
     * @function module:客户端可视化.EchartsLayer.prototype.addTo
     * @param {Cesium.Viewer} map 
     */
    addTo(map) {
        var self = this;
        echarts.extendComponentView({
            type: 'cesium',

            render: function (mapModel, ecModel, api) {
                var rendering = true

                var cesiumMap = echarts.cesiumMap

                var viewportRoot = api.getZr().painter.getViewportRoot()
                var coordSys = mapModel.coordinateSystem
                var moveHandler = function (type, target) {
                    if (rendering  || !self.map || !self.visible) {
                        return
                    }
                    self._unvisible();
                    var offsetEl = self.map.canvas;

                    var mapOffset = [-parseInt(offsetEl.style.left, 10) || 0, -parseInt(offsetEl.style.top, 10) || 0]
                    viewportRoot.style.left = mapOffset[0] + 'px'
                    viewportRoot.style.top = mapOffset[1] + 'px'

                    coordSys.setMapOffset(mapOffset)
                    
                    mapModel.__mapOffset = mapOffset
                    //mapModel.__mapViewRect = cesiumMap.scene.camera.computeViewRectangle();

                    api.dispatchAction({
                        type: 'CesiumRoma'
                    })
                }

                var moveEndHandler = function (type, target) {
                    if (rendering || !self.map || !self.visible) {
                        return
                    }
                    var offsetEl = self.map.canvas;

                    var mapOffset = [-parseInt(offsetEl.style.left, 10) || 0, -parseInt(offsetEl.style.top, 10) || 0]
                    viewportRoot.style.left = mapOffset[0] + 'px'
                    viewportRoot.style.top = mapOffset[1] + 'px'

                    coordSys.setMapOffset(mapOffset)
                    mapModel.__mapOffset = mapOffset

                    api.dispatchAction({
                        type: 'CesiumRoma'
                    })
                    self._visible();
                }

                self.moveEndEvent = moveEndHandler;

                function zoomStartHandler() {
                    self._unvisible();
                    if (rendering) {
                        return
                    }
                    api.dispatchAction({
                        type: 'CesiumRoma'
                    })
                }

                function zoomEndHandler() {
                    if (rendering) {
                        return
                    }
                    api.dispatchAction({
                        type: 'CesiumRoma'
                    })
                }

                self.handler = new Cesium.ScreenSpaceEventHandler(self.scene.canvas);
                
                if (self.initStats == false) {
                    self.initStats = true;    
                    if (self.options.postRender) {
                        self.map.scene.postRender.addEventListener(function () {
                            self.postRenderTime++
                            if (self.postRenderTime % self.postRenderFrame === 0) self.moveEndEvent();
                        });
                    } else {
                        self.handler.setInputAction(zoomStartHandler, Cesium.ScreenSpaceEventType.WHEEL);
                        self.handler.setInputAction(moveHandler, Cesium.ScreenSpaceEventType.LEFT_DOWN);
                        self.handler.setInputAction(moveEndHandler, Cesium.ScreenSpaceEventType.LEFT_UP);
                        self.handler.setInputAction(moveHandler, Cesium.ScreenSpaceEventType.RIGHT_DOWN);
                        self.handler.setInputAction(moveEndHandler, Cesium.ScreenSpaceEventType.RIGHT_UP);
                        self.map.scene.camera.moveEnd.addEventListener(function(){
                            //获取当前相机高度
                            self.moveEndEvent();
                        });
                    }
                }

                this._oldMoveHandler = moveHandler
                this._oldZoomEndHandler = zoomEndHandler

                var roam = mapModel.get('roam')
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

                rendering = false
            }
        });

        this.chart.setOption(this.options);
        return this;
    }

    /**
     * @description 显示图层
     * @function module:客户端可视化.EchartsLayer.prototype.show
     */
    show() {
        this._visible();
    }

    /**
     * @description 隐藏图层
     * @function module:客户端可视化.EchartsLayer.prototype.hide
     */
    hide() {
        this._unvisible();
    }

    /**
     * 重置图层大小
     * @function module:客户端可视化.EchartsLayer.prototype. resize
     */
    resize() {
        if (this.canvas == undefined || this.canvas == null) return;
        var canvas = this.canvas;
        canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.width = parseInt(this.map.canvas.width);
        canvas.height = parseInt(this.map.canvas.height);
        canvas.style.width = this.map.canvas.style.width;
        canvas.style.height = this.map.canvas.style.height;
    }

    /**
     * 删除图层
     * @function module:客户端可视化.EchartsLayer.prototype.remove
     */
    remove() {
        var self = this;
        /*         this.map._listeners.move.forEach(function (element) {
                    if (element.name === 'moveHandler') {
                        self.map.off('move', element);
                    }
                });
                this.map._listeners.move.forEach(function (element) {
                    if (element.name === 'zoomEndHandler') {
                        self.map.off('zoomend', element);
                    }
                }); */

        this.chart.clear();

        this.map.scene.camera.moveEnd.removeEventListener(function(){
            self.moveEndEvent();
        });
        this.handler.destroy();

        if (this.canvas.parentElement)
            this.canvas.parentElement.removeChild(this.canvas);
        this.map = undefined;
        
        return this;
    }
}

CesiumZondy.Overlayer.EchartsLayer = EchartsLayer;