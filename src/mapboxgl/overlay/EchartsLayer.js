import mapboxgl from '@mapgis/mapbox-gl';
import echarts from 'echarts';

import '../core/Base';

import {
    MapCoordSys
} from './echarts/MapCoordSys';

/**
 * mapboxgl的echars 4.0的实现
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class mapboxgl.zondy.EchartsLayer
 * @classdesc 基于mapboxgl的Layer对象进行的拓展
 * @param map - {Object} 传入的mapboxgl的地图对象
 * @param options - {Object} echarts.options 使用 option 来描述其对图表的各种需求，包括：有什么数据、要画什么图表、图表长什么样子、含有什么组件、组件能操作什么事情等等。简而言之，option 表述了：数据、数据如何映射成图形、交互行为。
 *
 * @see http://echarts.baidu.com/api.html#echarts
 * @example option的关键参数
 * var option = {
 *    mapboxgl: {     //关键地方---1
 *       roam: true
 *    },
 *    series: [{
 *       coordinateSystem: 'mapboxgl',//关键地方---2
 *    }]
 * };
 *
 * @example
 *  // 用 option 描述 `数据`、`数据如何映射成图形`、`交互行为` 等。
    // option 是个大的 JavaScript 对象。
    var option = {
        // option 每个属性是一类组件。
        legend: {...},
        grid: {...},
        tooltip: {...},
        toolbox: {...},
        dataZoom: {...},
        visualMap: {...},
        // 如果有多个同类组件，那么就是个数组。例如这里有三个 X 轴。
        xAxis: [
            // 数组每项表示一个组件实例，用 type 描述“子类型”。
            {type: 'category', ...},
            {type: 'category', ...},
            {type: 'value', ...}
        ],
        yAxis: [{...}, {...}],
        // 这里有多个系列，也是构成一个数组。
        series: [
            // 每个系列，也有 type 描述“子类型”，即“图表类型”。
            {type: 'line', data: [['AA', 332], ['CC', 124], ['FF', 412], ... ]},
            {type: 'line', data: [2231, 1234, 552, ... ]},
            {type: 'line', data: [[4, 51], [8, 12], ... ]}
        }]
    };

    // 调用 setOption 将 option 输入 echarts，然后 echarts 渲染图表。
    var layer = new mapboxgl.zondy.EchartsLayer(map, option);
    layer.update(option);
 * @example 系列里的 series.data 是本系列的数据。而另一种描述方式，系列数据从 dataset 中取：
    var option = {
        dataset: {
            source: [
                [121, 'XX', 442, 43.11],
                [663, 'ZZ', 311, 91.14],
                [913, 'ZZ', 312, 92.12],
                ...
            ]
        },
        xAxis: {},
        yAxis: {},
        series: [
            // 数据从 dataset 中取，encode 中的数值是 dataset.source 的维度 index （即第几列）
            {type: 'bar', encode: {x: 1, y: 0}},
            {type: 'bar', encode: {x: 1, y: 2}},
            {type: 'scatter', encode: {x: 1, y: 3}},
            ...
        ]
    };
 */
export class EchartsLayer {

    constructor(map, options) {
        this.map = map;
        this.options = options;
        this.layerId = options.layerId || "echartlayerdefaultid";
        this.layerClass = options.classId || "echartlayerdefaultclass";

        this.initDevicePixelRatio();

        this.mapContainer = map.getCanvasContainer();
        this.canvas = this._createCanvas();
        this.mapContainer.appendChild(this.canvas);
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        this.chart = echarts.init(this.canvas);
        this.visible = true;

        this.initEcharts();
        this._resizeCanvas();

        return this;
    }

    initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    }

    initEcharts() {
        echarts.mapboxglMap = this.map;

        echarts.registerCoordinateSystem('mapboxgl', MapCoordSys);

        echarts.extendComponentModel({
            type: 'mapboxgl',
            getBMap: function () {
                return this.__mapboxgl;
            },
            defaultOption: {
                roam: false
            }
        });

        echarts.registerAction({
                type: 'MapboxGLRoma',
                event: 'MapboxGLRoma',
                update: 'updateLayout'
            },
            function (payload, ecModel) {

            }
        );

        return this;
    }

    _createCanvas() {
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

    _resizeCanvas() {
        const self = this;

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

    addTo(map) {
        const vm = this;
        echarts.extendComponentView({
            type: 'mapboxgl',

            render: function (mapModel, ecModel, api) {
                var rendering = true

                var mapboxglMap = echarts.mapboxglMap

                var viewportRoot = api.getZr().painter.getViewportRoot()
                var coordSys = mapModel.coordinateSystem
                var moveHandler = function (type, target) {
                    if (rendering || !vm.visible) {
                        return
                    }
                    // var offsetEl = viewportRoot.parentNode.parentNode.parentNode
                    var offsetEl = document.getElementsByClassName('mapboxgl-map')[0];

                    var mapOffset = [-parseInt(offsetEl.style.left, 10) || 0, -parseInt(offsetEl.style.top, 10) || 0]
                    viewportRoot.style.left = mapOffset[0] + 'px'
                    viewportRoot.style.top = mapOffset[1] + 'px'

                    coordSys.setMapOffset(mapOffset)
                    mapModel.__mapOffset = mapOffset

                    api.dispatchAction({
                        type: 'MapboxGLRoma'
                    })
                }

                function zoomEndHandler() {
                    if (rendering || !vm.visible) {
                        return
                    }
                    api.dispatchAction({
                        type: 'MapboxGLRoma'
                    })
                }

                mapboxglMap.off('move', this._oldMoveHandler)
                // FIXME
                // Moveend may be triggered by centerAndZoom method when creating coordSys next time
                // mapboxglMap.removeEventListener('moveend', this._oldMoveHandler)
                mapboxglMap.off('zoomend', this._oldZoomEndHandler)
                mapboxglMap.on('move', moveHandler)
                // mapboxglMap.addEventListener('moveend', moveHandler)
                mapboxglMap.on('zoomend', zoomEndHandler)

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

    _visible() {
        this.visible = true;
        this.canvas.style.visibility = "visible";
    }

    _unvisible() {
        this.visible = false;
        this.canvas.style.visibility = "hidden";
    }

    /**
     * 显示图层
     * @function mapboxgl.zondy.EchartsLayer.prototype.show
     */
    show() {
        this._visible();
    }

    /**
     * 隐藏图层
     * @function mapboxgl.zondy.EchartsLayer.prototype.hide
     */
    hide() {
        this._unvisible();
    }

    /**
     * 删除图层
     * @function mapboxgl.zondy.EchartsLayer.prototype.remove
     */
    remove() {
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

        if (this.canvas.parentNode)
            this.canvas.parentNode.removeChild(this.canvas);
        this.map = undefined;
        return this;
    }

    /**
     * @function mapboxgl.zondy.EchartsLayer.prototype.update
     * @param {*} option echarts.option
     * @see https://www.echartsjs.com/zh/tutorial.html#异步数据加载和更新
     * @description ECharts 由数据驱动，数据的改变驱动图表展现的改变，因此动态数据的实现也变得异常简单。所有数据的更新都通过 setOption实现，你只需要定时获取数据，setOption 填入数据，而不用考虑数据到底产生了那些变化，ECharts 会找到两组数据之间的差异然后通过合适的动画去表现数据的变化。
     */
    update(option){
        this.chart.setOption(option);
    }
}

mapboxgl.zondy.EchartsLayer = EchartsLayer;
