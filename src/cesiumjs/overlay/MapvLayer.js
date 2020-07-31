import { CesiumZondy } from '../core/Base';
import { MapvBaseLayer } from './mapv/MapvBaseLayer';

var idIndex = 0;

/**
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class  module:客户端可视化.MapVLayer
 * @classdesc  Mapv图表图层
 * @description CesiumZondy.Overlayer.MapVLayer 基于新建立的Html Element嵌入mapv
 * @param map - {Object} 传入的cesium的地图对象Viewer
 * @param dataset - {MapvDataSet} 传入的mapv的属性
 * @param mapVOptions - {MapvOption} 可选参数。https://github.com/huiyan-fe/mapv/blob/master/API.md
 * @param {Object} [mapVOptions.cesium] cesium的渲染模式
 * @param {Boolean} [mapVOptions.cesium.postRender=false] 是否实时渲染
 * @param {Boolean} [mapVOptionscesium.cesium.postRenderFrame=30] 每间隔多少帧渲染一次
 * @param container - {Element} 外部传入的div;外接的方式使用mapv
 * @example 
 *  // 构建对应的dataset
    var dataSet = new mapv.DataSet(data);

    // 设置对应的参数
    // https://github.com/huiyan-fe/mapv/blob/master/API.md
    var options = {
    context: '2d',    //cesium必须设置画布为2d
    postRender: false,
    postRenderFrame: 5,
    //fillStyle: 'rgba(255, 250, 50, 0.7)',
    label: {
        show: true,
        fillStyle: 'white',
        shadowColor: 'yellow',
        font: '15px Arial',
        shadowBlur: 10
    },
    size: 30,
    gradient: {
        0: "rgba(49, 54, 149, 0)",
        0.2: "rgba(69,117,180, 0.7)",
        0.3: "rgba(116,173,209, 0.7)",
        0.4: "rgba(171,217,233, 0.7)",
        0.5: "rgba(224,243,248, 0.7)",
        0.6: "rgba(254,224,144,0.7)",
        0.7: "rgba(253,174,97,0.7)",
        0.8: "rgba(244,109,67,0.8)",
        0.9: "rgba(215,48,39,0.8)",
        0.95: "rgba(165, 0, 38,0.8)"
    },
    max: 100,
    draw: 'honeycomb'   // 绘制蜂窝图
    }
    // 声明cesium的mapv图层并将其显示到三维球上
    var mapvLayer = new CesiumZondy.Overlayer.MapvLayer(map, dataSet, options);
 */
export default class MapvLayer {
    constructor(map, dataSet, mapVOptions, container) {
        this.map = map;
        this.scene = map.scene;

        this.mapvBaseLayer = new MapvBaseLayer(map, dataSet, mapVOptions, this);
        this.mapVOptions = mapVOptions;

        this.initDevicePixelRatio();

        this.canvas = this._creteWidgetCanvas(); //this._createCanvas();

        this.render = this.render.bind(this);
        this.postRenderTime = 0;

        let cesiumOpt = mapVOptions.cesium;
        if (cesiumOpt) {
            this.postRender = cesiumOpt.postRender || false;
            this.postRenderFrame = cesiumOpt.postRenderFrame || 30;
        }

        if (container != undefined) {
            this.container = container;
            container.appendChild(this.canvas);
        } else {
            var parents = document.getElementsByClassName('cesium-widget');
            var parent = parents.length > 0 ? parents[0] : map.container;
            this.container = parent;
            this.addInnerContainer();
        }

        this.bindEvent();

        this._reset();
    }

    initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    }

    addInnerContainer() {
        //var container = document.createElement('div');
        this.container.appendChild(this.canvas);
        //container.appendChild(this.canvas);
        //return container;
    }

    bindEvent() {
        let self = this;
        var map = this.map;
        //下面几个是cesium专属事件,clickEvent和mousemoveEvent是mapv内部自带的方法不放出来
        this.innerMoveStart = this.moveStartEvent.bind(this);
        this.innerMoveEnd = this.moveEndEvent.bind(this);

        this.innnerZoomStart = this.zoomStartEvent.bind(this);
        this.innnerZoomEnd = this.zoomEndEvent.bind(this);

        this.postEventHandle = this.postEvent.bind(this);
        this.postStartEvent = this.postStartEvent.bind(this);
        this.postEndEvent = this.postEndEvent.bind(this);

        var handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas);
        //handler.setInputAction(this.innerMoveEnd, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        if (this.postRender) {
            // this.scene.postRender.addEventListener(this.postEventHandle);
            this.scene.camera.moveStart.addEventListener(this.postStartEvent, this);
            this.scene.camera.moveEnd.addEventListener(this.postEndEvent, this);
        } else {
            handler.setInputAction(this.innerMoveEnd, Cesium.ScreenSpaceEventType.WHEEL);
            handler.setInputAction(this.innerMoveStart, Cesium.ScreenSpaceEventType.LEFT_DOWN);
            handler.setInputAction(this.innerMoveEnd, Cesium.ScreenSpaceEventType.LEFT_UP);
            handler.setInputAction(this.innerMoveStart, Cesium.ScreenSpaceEventType.RIGHT_DOWN);
            handler.setInputAction(this.innerMoveEnd, Cesium.ScreenSpaceEventType.RIGHT_UP);

            map.scene.camera.moveEnd.addEventListener(function () {
                //获取当前相机高度
                self.innerMoveEnd();
            });
        }
    }

    unbindEvent() {
        if (this.postRender) {
            this.scene.camera.moveStart.removeEventListener(this.postStartEvent, this);
            this.scene.camera.moveEnd.removeEventListener(this.postEndEvent, this);
        }
    }

    postStartEvent() {
        if (this.mapvBaseLayer) {
            this.mapvBaseLayer.animatorMovestartEvent();
            this.scene.postRender.addEventListener(this._reset, this);
        }
        this._visiable();
    }

    postEndEvent() {
        if (this.mapvBaseLayer) {
            this.mapvBaseLayer.animatorMoveendEvent();
            this.scene.postRender.removeEventListener(this._reset, this);
        }
        this._reset();
        this._visiable();
    }

    moveStartEvent() {
        if (this.mapvBaseLayer) {
            this.mapvBaseLayer.animatorMovestartEvent();
        }
        this._unvisiable();
    }

    moveEndEvent() {
        if (this.mapvBaseLayer) {
            this.mapvBaseLayer.animatorMoveendEvent();
        }
        this._reset();
        this._visiable();
    }

    zoomStartEvent() {
        this._unvisiable();
    }
    zoomEndEvent() {
        this._unvisiable();
    }

    postEvent() {
        this.postRenderTime++;
        if (this.postRenderTime % this.postRenderFrame === 0) this.moveEndEvent();
    }

    //-----------------------------------Start Data Operation---------------------------------

    /**
     * 增加数据
     * @function module:客户端可视化.MapVLayer.prototype.addData
     *
     * @param data - {Array} 数据.
     * @param options - {Object} 只做额外增加的字段作用
     * @see https://github.com/huiyan-fe/mapv/blob/master/API.md
     */
    addData(data, options) {
        if (this.mapvBaseLayer == undefined) return;
        this.mapvBaseLayer.addData(data, options);
    }

    /**
     * 更新数据
     * @function module:客户端可视化.MapVLayer.prototype.updateData
     *
     * @param data - {Array} 数据.
     * @param options - {Object} 只做额外增加的字段作用
     * @see https://github.com/huiyan-fe/mapv/blob/master/API.md
     */
    updateData(data, options) {
        if (this.mapvBaseLayer == undefined) return;
        this.mapvBaseLayer.updateData(data, options);
    }

    /**
     * 获取数据
     * @function module:客户端可视化.MapVLayer.prototype.getData
     *
     * @param data - {Array} 数据.
     * @param options - {Object} 只做额外增加的字段作用
     * @see https://github.com/huiyan-fe/mapv/blob/master/API.md
     */
    getData() {
        if (this.mapvBaseLayer) {
            this.dataSet = this.mapvBaseLayer.getData();
        }
        return this.dataSet;
    }

    removeData(filter) {
        if (this.mapvBaseLayer == undefined) return;
        this.mapvBaseLayer && this.mapvBaseLayer.removeData(filter);
    }

    /**
     * 删除数据
     * @function module:客户端可视化.MapVLayer.prototype.removeAllData
     */
    removeAllData() {
        if (this.mapvBaseLayer == undefined) return;
        this.mapvBaseLayer.clearData();
    }
    //-----------------------------------End Data Operation---------------------------------
    _visiable() {
        this.canvas.style.display = 'block';
        return this;
    }

    _unvisiable() {
        this.canvas.style.display = 'none';
        return this;
    }

    _createCanvas() {
        var canvas = document.createElement('canvas');
        canvas.id = this.mapVOptions.layerid || 'mapv' + idIndex++;
        canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';

        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = this.mapVOptions.zIndex || 100;

        canvas.width = parseInt(this.map.canvas.width);
        canvas.height = parseInt(this.map.canvas.height);
        canvas.style.width = this.map.canvas.style.width;
        canvas.style.height = this.map.canvas.style.height;
        var devicePixelRatio = this.devicePixelRatio;
        if (this.mapVOptions.context == '2d') {
            canvas.getContext(this.mapVOptions.context).scale(devicePixelRatio, devicePixelRatio);
        }
        return canvas;
    }

    _creteWidgetCanvas() {
        var canvas = document.createElement('canvas');

        canvas.id = this.mapVOptions.layerid || 'mapv' + idIndex++;
        canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';

        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = this.mapVOptions.zIndex || 100;

        canvas.width = parseInt(this.map.canvas.width);
        canvas.height = parseInt(this.map.canvas.height);
        canvas.style.width = this.map.canvas.style.width;
        canvas.style.height = this.map.canvas.style.height;
        var devicePixelRatio = this.devicePixelRatio;
        if (this.mapVOptions.context == '2d') {
            canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
        }

        return canvas;
    }

    _reset() {
        this.resizeCanvas();
        this.fixPosition();
        this.onResize();
        this.render();
    }

    /**
     * 强制重回图层
     * @function module:客户端可视化.MapVLayer.prototype.draw
     */
    draw() {
        this._reset();
    }

    /**
     * 显示图层
     * @function module:客户端可视化.MapVLayer.prototype.show
     */
    show() {
        this._visiable();
    }
    /**
     * 隐藏图层
     * @function module:客户端可视化.MapVLayer.prototype.hide
     */
    hide() {
        this._unvisiable();
    }

    /**
     * 销毁图层-实际调用remove，为了接口保持一致
     * @function module:客户端可视化.MapVLayer.prototype.destroy
     */
    destroy() {
        this.remove();
    }

    /**
     * 销毁图层
     * @function module:客户端可视化.MapVLayer.prototype.remove
     */
    remove() {
        if (this.mapvBaseLayer == undefined) return;
        this.removeAllData();
        this.unbindEvent();
        this.mapvBaseLayer.clear(this.mapvBaseLayer.getContext());
        this.mapvBaseLayer = undefined;
        var parent = this.canvas.parentElement;
        parent.removeChild(this.canvas);
    }

    /**
     * 更新图层
     * @function module:客户端可视化.MapVLayer.prototype.update
     */
    update(opt) {
        if (opt == undefined) {
            return;
        }
        this.updateData(opt.data, opt.options);
    }

    resizeCanvas() {
        //this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        if (this.canvas == undefined || this.canvas == null) return;
        var canvas = this.canvas;
        canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';
        canvas.width = parseInt(this.map.canvas.width);
        canvas.height = parseInt(this.map.canvas.height);
        //canvas.style.width = this.map.canvas.style.width;
        //canvas.style.height = this.map.canvas.style.height;
        var devicePixelRatio = this.devicePixelRatio;
        if (this.mapVOptions.context == '2d') {
            canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
        }
    }

    fixPosition() {}

    onResize() {}

    render() {
        if (this.mapvBaseLayer == undefined) return;
        this.mapvBaseLayer._canvasUpdate();
    }
}

CesiumZondy.Overlayer.MapvLayer = MapvLayer;
