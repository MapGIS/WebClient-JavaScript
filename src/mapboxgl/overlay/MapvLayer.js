import mapboxgl from '@mapgis/mapbox-gl';
import '../core/Base';
import { MapvBaseLayer } from "./mapv/MapvBaseLayer";

/**
 * @origin author kyle / http://nikai.us/
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class mapboxgl.zondy.MapvLayer
 * @classdesc 基于mapboxgl的Layer对象进行的拓展
 * @param map - {Object} 传入的mapboxgl的地图对象
 * @param dataset - {MapvDataSet} 传入的mapv的属性。 <br>
 * @param mapvoption - {MapvOption} 可选参数。<br>
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

    var mapvLayer = new mapboxgl.zondy.MapvLayer(map, dataSet, options);
 */
export class MapvLayer {

    constructor(map, dataSet, mapVOptions) {
        this.map = map;
        this.layerID = mapVOptions.layerID;
        delete mapVOptions["layerID"];
        this.mapvBaseLayer = new MapvBaseLayer(map, dataSet, mapVOptions, this);
        this.mapVOptions = mapVOptions;

        this.initDevicePixelRatio();

        this.canvas = this._createCanvas();

        this.render = this.render.bind(this);

        this.bindEvent();

        this.mapContainer = map.getCanvasContainer();
        this.mapContainer.appendChild(this.canvas);
        // this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';

        this._reset();
    }

    initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    }

    //-----------------------------------Event Methods----------------------------------------
    bindEvent() {
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

    unbindEvent() {
        var map = this.map;
        map.off('resize', this.innerResize);

        map.off('zoomstart', this.innnerZoomStart);
        map.off('zoomend', this.innnerZoomEnd);

        map.off('rotatestart', this.innnerRotateStart);
        map.off('rotateend', this.innnerRotateEnd);

        map.off('movestart', this.innerMoveStart);
        map.off('moveend', this.innerMoveEnd);
    }

    moveStartEvent() {
        this.mapvBaseLayer.animatorMovestartEvent();
        this._unvisiable();
    }

    moveEndEvent() {
        this.mapvBaseLayer.animatorMoveendEvent();
        this._reset();
        this._visiable();
    }

    zoomStartEvent() {
        this._unvisiable();
    }
    zoomEndEvent() {
        this._unvisiable();
    }

    rotateStartEvent() {
        this.mapvBaseLayer.animatorMovestartEvent();
        this._unvisiable();
    }
    rotateEndEvent() {
        this.mapvBaseLayer.animatorMoveendEvent();
        this._reset();
        this._visiable();
    }

    resizeEvent() {
        this._reset();
        this._visiable();
    }

    removeEvent() {
        this.mapContainer.removeChild(this.canvas);
    }
    //-----------------------------------Event Methods----------------------------------------

    //-----------------------------------Start Data Operation---------------------------------
    /**
     * 增加数据
     * @function mapboxgl.zondy.MapvLayer.prototype.addData
     *
     * @param data - {Array} 数据.
     * @param options - {Object} 只做额外增加的字段作用
     */
    addData(data, options) {
        this.mapvBaseLayer.addData(data, options);
    }

    /**
     * 更新数据
     * @function mapboxgl.zondy.MapvLayer.prototype.updateData
     *
     * @param data - {Array} 数据.
     * @param options - {Object} 只做额外增加的字段作用
     */
    updateData(data, options) {
        this.mapvBaseLayer.updateData(data, options);
    }

    getData() {
        if (this.mapvBaseLayer) {
            this.dataSet = this.mapvBaseLayer.getData();
        }
        return this.dataSet;
    }

    /**
     * @function mapboxgl.zondy.MapvLayer.prototype.removeData
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
    }

    /**
     * @function mapboxgl.zondy.MapvLayer.prototype.removeAllData
     * @description 移除全部数据
     */
    removeAllData() {
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
        var devicePixelRatio = this.devicePixelRatio;
        canvas.id = this.layerID;
        canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.width = parseInt(this.map.getCanvas().style.width) * devicePixelRatio;
        canvas.height = parseInt(this.map.getCanvas().style.height) * devicePixelRatio;
        if (!this.mapVOptions.context || this.mapVOptions.context == '2d') {
            canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
        }
        canvas.style.width = this.map.getCanvas().style.width;
        canvas.style.height = this.map.getCanvas().style.height;
        return canvas;
    }

    _reset() {
        if (this.canvas == null) {
            return;
        }
        this.resizeCanvas();
        this.fixPosition();
        this.onResize();
        this.render();
    }

    draw() {
        return this._reset();
    }

    /**
     * 显示图层
     * @function mapboxgl.zondy.MapvLayer.prototype.show
     */
    show() {
        this._visiable();
    }
    /**
     * 隐藏图层
     * @function mapboxgl.zondy.MapvLayer.prototype.hide
     */
    hide() {
        this._unvisiable();
    }
    /**
     * 更新图层
     * @function mapboxgl.zondy.MapvLayer.prototype.update
     * @param opt.data - {Array} 需要更新的数据
     * @param opt.options - {Object} 需要更新的样式
     */
    update(opt) {
        if (opt == undefined) { return; }
        this.updateData(opt.data, opt.options);
    }

    resizeCanvas() {
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        if(this.canvas == undefined || this.canvas == null) return;
        var canvas = this.canvas;
        var devicePixelRatio = this.devicePixelRatio;
        canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.width = parseInt(this.map.getCanvas().style.width) * devicePixelRatio;
        canvas.height = parseInt(this.map.getCanvas().style.height) * devicePixelRatio;
        // canvas.style.width = this.map.getCanvas().style.width;
        // canvas.style.height = this.map.getCanvas().style.height;
        if (!this.mapVOptions.context || this.mapVOptions.context == '2d') {
            canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
        }
    }

    fixPosition() {

    }

    onResize() {

    }

    originPosition() {
        this.originPitch = this.map.getPitch();
        this.originBearing = this.map.getBearing();
        var origin = this.map.project(new mapboxgl.LngLat(0, 0));
        this.originX = origin.x;
        this.originY = origin.y
    }

    render() {
        if (this.mapvBaseLayer == undefined) return;
        this.mapvBaseLayer._canvasUpdate();
    }

    moveTo(layerID, before) {
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

    /**
     * 移除图层，清空所有的事件与数据，与destroy效果一致，保持接口与mapboxgl本身一致
     * @function mapboxgl.zondy.MapvLayer.prototype.remove
     */
    remove() {
        this.removeAllData();
        this.unbindEvent();
        this.mapContainer.removeChild(this.canvas);
        this.disposeFlag = true;
    }

    /**
     * 销毁图层，清空所有的事件与数据，与remove效果一致
     * @function mapboxgl.zondy.MapvLayer.prototype.destroy
     */
    destroy() {
        this.removeAllData();
        this.unbindEvent();
        this.mapContainer.removeChild(this.canvas);
        this.disposeFlag = true;
    }

}

mapboxgl.zondy.MapvLayer = MapvLayer;
