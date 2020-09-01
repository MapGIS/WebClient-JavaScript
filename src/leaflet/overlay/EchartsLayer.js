import L from 'leaflet';
import echarts from 'echarts';

import '../core/Base';

import MapCoordSys from './echart/MapCoordSys';

/**
 * leaflet的echars 4.0的实现
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class module:客户端可视化.EchartsLayer
 * @classdesc 基于leaflet的Layer对象进行的拓展
 * @param map - {Object} 传入的leaflet的地图对象
 * @param options - {Object} echarts.options 使用 option 来描述其对图表的各种需求，包括：有什么数据、要画什么图表、图表长什么样子、含有什么组件、组件能操作什么事情等等。简而言之，option 表述了：数据、数据如何映射成图形、交互行为。
 * 
 * @see http://echarts.baidu.com/api.html#echarts
 * @example option的关键参数
 * var option = {
 *    leaflet: {     //关键地方---1
 *       roam: true
 *    },
 *    series: [{
 *       coordinateSystem: 'leaflet',//关键地方---2
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
export var EchartsLayer = L.Layer.extend({
    map: null, //传入的leaflet地图
    chart: null,
    options: null,
    canvas: null,

    initialize: function (map, options) {
        this.map = map;
        this.options = options;
        this.layerId = options.layerId || 'echartlayerdefaultid';
        this.layerClass = options.classId || 'echartlayerdefaultclass';

        this.visible = true;
        this.initDevicePixelRatio();
        this.initOptions(this.options);
        this.initEcharts();

        this._resizeCanvas();
    },

    initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    },

    initOptions: function (options) {
        if (options) {
            if (options.leaflet) {
                return;
            }
            this.options.leaflet = {
                roam: true
            };
        }
    },

    initEcharts() {
        echarts.registerCoordinateSystem('leaflet', MapCoordSys);

        echarts.extendComponentModel({
            type: 'leaflet',
            getBMap: function () {
                return this.__leaflet;
            },
            defaultOption: {
                roam: false
            }
        });

        echarts.registerAction(
            {
                type: 'LeafletRoma',
                event: 'LeafletRoma',
                update: 'updateLayout'
            },
            function (payload, ecModel) {
                /* ecModel.eachComponent('leaflet', function(leafletModel) {
                  const leaflet = leafletModel.getLeaflet();
                  const center = leaflet.getCenter();
                  leafletModel.setCenterAndZoom(
                    [center.lng, center.lat],
                    leaflet.getZoom()
                  );
                }); */
            }
        );
    },

    _visible: function () {
        this.visible = true;
        this.canvas.style.visibility = 'visible';
    },

    _unvisible: function () {
        this.visible = false;
        this.canvas.style.visibility = 'hidden';
    },

    onAdd: function (map) {
        const vm = this;
        this.map = map;
        this.canvas = this._createCanvas();
        map.getPanes().overlayPane.appendChild(this.canvas);

        this.chart = echarts.init(this.canvas);

        echarts.leafletMap = map;

        var self = this;
        map.on('resize', function (e) {
            let size = e.newSize;
            self.canvas.style.width = size.x + 'px';
            self.canvas.style.height = size.y + 'px';
            self.chart.resize();
        });
        map.on('zoomstart', function () {
            self._unvisible();
        });

        echarts.extendComponentView({
            type: 'leaflet',

            render: function (mapModel, ecModel, api) {
                var rendering = true;

                var leafletMap = echarts.leafletMap;

                var viewportRoot = api.getZr().painter.getViewportRoot();
                var coordSys = mapModel.coordinateSystem;

                var moveHandler = function () {
                    if (rendering || !vm.visible) {
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

                var zoomEndHandler = function () {
                    if (rendering || !vm.visible) {
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

    onRemove: function (map) {
        this.chart.dispose();
    },

    _createCanvas: function () {
        var canvas = document.createElement('div');
        canvas.id = this.layerId;
        //canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';
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

    _resizeCanvas: function () {
        const self = this;

        window.onresize = function () {
            var canvas = self.canvas;
            var map = self.map;

            //canvas.style.position = 'absolute';
            canvas.style.top = '0px';
            canvas.style.left = '0px';
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
    show: function () {
        this._visible();
    },

    /**
     * 隐藏图层
     * @function L.zondy.EchartsLayer.prototype.hide
     */
    hide: function () {
        this._unvisible();
    },

    /**
     * 重置图层大小
     * @function L.zondy.EchartsLayer.prototype.resize
     */
    resize: function () {
        var canvas = this.canvas;
        var map = this.map;

        //canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';
        canvas.height = this.map.getSize().y + 'px';
        canvas.width = this.map.getSize().x + 'px';
        canvas.style.height = this.map.getSize().y + 'px';
        canvas.style.width = this.map.getSize().x + 'px';

        this.chart.resize();
    },

    /**
     * @function L.zondy.EchartsLayer.prototype.update
     * @param {*} option echarts.option
     * @see https://www.echartsjs.com/zh/tutorial.html#异步数据加载和更新
     * @description ECharts 由数据驱动，数据的改变驱动图表展现的改变，因此动态数据的实现也变得异常简单。所有数据的更新都通过 setOption实现，你只需要定时获取数据，setOption 填入数据，而不用考虑数据到底产生了那些变化，ECharts 会找到两组数据之间的差异然后通过合适的动画去表现数据的变化。
     */
    update: function (option) {
        this.chart.setOption(option);
    }
});

export var echartsLayer = function (echartsParams, options) {
    return new EchartsLayer(echartsParams, options);
};

L.zondy.EchartsLayer = echartsLayer;
