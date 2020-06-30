import Layer from 'ol/layer/Layer';
import CanvasLayerRenderer from 'ol/renderer/canvas/VectorLayer';
import * as ol from '../core/Base';
import {
    MapvBaseLayer
} from './mapv/MapvBaseLayer';

/**
 * @origin author kyle / http://nikai.us/
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class openlayers.zondy.MapvLayer
 * @classdesc 基于mapboxgl的Layer对象进行的拓展
 * @param map - {Object} 传入的mapboxgl的地图对象
 * @param dataset - {MapvDataSet} 传入的mapv的属性。 <br>
 * @param mapvoption - {MapvOption} 可选参数。<br>
 */
export class MapvLayer /* extends Layer */ {

    constructor(map, dataSet, mapVOptions, source, mapWidth, mapHeight, offset, pixelRatio) {
        // super({});
        this.map = map;
        this.layerID = mapVOptions.layerID;
        delete mapVOptions["layerID"];
        this.mapvBaseLayer = new MapvBaseLayer(map, dataSet, mapVOptions, this, offset, pixelRatio);
        this.mapVOptions = mapVOptions;

        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.pixelRatio = pixelRatio;
        this.offset = offset;

        this.initDevicePixelRatio();

        this.canvas = this._createCanvas();

        this.render = this.render.bind(this);

        this.bindEvent();

        // this.mapContainer = map.getCanvasContainer();
        // this.mapContainer.appendChild(this.canvas);
        // this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        this.resizeCanvas(this.mapWidth, this.mapHeight);
        this.render();
        // this._reset();
        map.getView().setZoom(map.getView().getZoom() + 1);
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

        map.on('movestart', this.innerMoveStart);
        map.on('moveend', this.innerMoveEnd);
        map.getView().on('change:center', this.innnerZoomEnd);
        // map.getView().on('change:resolution', this.zoomEndEvent);
        map.getView().on('change:size', this.innerResize);
    }

    unbindEvent() {
        var map = this.map;
        map.off('movestart', this.innerMoveStart);
        map.off('moveend', this.innerMoveEnd);
        map.getView().off('change:center', this.innnerZoomEnd);
        // map.getView().off('change:resolution', this.zoomEndEvent);
        map.getView().off('change:size', this.innerResize);
    }

    moveStartEvent() {
        var animationOptions = this.mapVOptions.animation;
        if (this.isEnabledTime() && this.animator) {
            this.steps.step = animationOptions.stepsRange.start;
        }
    }

    moveEndEvent() {
        // this.mapvBaseLayer.animatorMoveendEvent();
        this.draw();
        // this._visiable();
    }

    zoomStartEvent() {
        this.mapvBaseLayer.clear();
        // this._unvisiable();
    }
    zoomEndEvent() {
        this.mapvBaseLayer.clear();
        // this._unvisiable();
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
        // this.mapContainer.removeChild(this.canvas);
    }
    //-----------------------------------Event Methods----------------------------------------

    //-----------------------------------Start Data Operation---------------------------------
    /**
     * 增加数据
     * @function openlayers.zondy.MapVLayer.prototype.addData
     * 
     * @param data - {Array} 数据.
     * @param options - {Object} 只做额外增加的字段作用
     */
    addData(data, options) {
        this.mapvBaseLayer.addData(data, options);
    }

    /**
     * 更新数据
     * @function openlayers.zondy.MapVLayer.prototype.addData
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

    removeData(filter) {
        this.mapvBaseLayer && this.mapvBaseLayer.removeData(filter);
    }

    removeAllData() {
        this.mapvBaseLayer.clearData();
    }
    //-----------------------------------End Data Operation---------------------------------


    isEnabledTime() {
        var animationOptions = this.mapVOptions.animation;
        return animationOptions && !(animationOptions.enabled === false);
    }

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
        canvas.id = this.layerID;
        // canvas.style.position = 'absolute';
        canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.width = parseInt(this.mapWidth);
        canvas.height = parseInt(this.mapHeight);
        canvas.style.width = this.mapWidth; + 'px';
        canvas.style.height = this.mapHeight + 'px';
        var devicePixelRatio = this.devicePixelRatio;

        canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
        
        return canvas;
    }

    _reset() {
        if (this.canvas == null) {
            return;
        }
        this.resizeCanvas(this.mapWidth, this.mapHeight);
        this.fixPosition();
        this.onResize();
        this.render();
    }

    draw() {
        return this._reset();
    }

    /**
     * 显示图层
     * @function openlayers.zondy.MapVLayer.prototype.show
     */
    show() {
        this._visiable();
    }
    /**
     * 隐藏图层
     * @function openlayers.zondy.MapVLayer.prototype.hide
     */
    hide() {
        this._unvisiable();
    }
    /**
     * 更新图层
     * @function openlayers.zondy.MapVLayer.prototype.update
     */
    update(opt) {
        if (opt == undefined) { return; }
        this.updateData(opt.data, opt.options);
    }

    resizeCanvas(mapWidth, mapHeight) {
        // this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        var canvas = this.canvas;
        canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.width = parseInt(mapWidth);
        canvas.height = parseInt(mapHeight);
        canvas.style.width = mapWidth + 'px';
        canvas.style.height = mapHeight + 'px';
    }

    setOffset(offset) {
        this.offset = offset;
        this.mapvBaseLayer && this.mapvBaseLayer.setOffset(offset);
    }

    fixPosition() {

    }

    onResize() {

    }

    originPosition() {
        /* this.originPitch = this.map.getPitch();
        this.originBearing = this.map.getBearing();
        var origin = this.map.project(new openlayers.LngLat(0, 0));
        this.originX = origin.x;
        this.originY = origin.y */
    }

    render() {
        this.mapvBaseLayer && this.mapvBaseLayer._canvasUpdate();
    }

    clear() {
        this.mapvBaseLayer && this.mapvBaseLayer.clear();
    }

    addTo(map) {
        map.addLayer(this);
    }

    getCanvas() {
        return this.canvas;
    }

    moveTo(layerID, before) {
        /*         var layer = document.getElementById(this.layerID);
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
                } */
    }

    remove() {
        this.removeAllData();
        this.unbindEvent();
        // this.mapContainer.removeChild(this.canvas);
        this.disposeFlag = true;
    }

    destroy() {
        this.removeAllData();
        this.unbindEvent();
        // this.mapContainer.removeChild(this.canvas);
        this.disposeFlag = true;
    }

}
ol.zondy = ol.zondy || {};
ol.zondy.MapvLayer = MapvLayer;