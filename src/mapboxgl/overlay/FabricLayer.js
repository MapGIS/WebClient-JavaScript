/*
 * @class: Module:FabricLayer
 * @Description: fabric-地图框架联动图层
 * @Author: zk
 * @Date: 2022-05-13 11:22:56
 * @LastEditors: zk
 * @LastEditTime: 2022-05-24 11:23:51
 */
import mapboxgl from '@mapgis/mapbox-gl';
import { PlotMapCoordSys } from './fabric/PlotMapCoordSys';
import { throttle } from '../util/Util';

export class FabricLayer {
    /**
     * @function: Module:FabricLayer
     * @description: 构造
     * @param {Object} map mapboxglmap
     * @param {Function} fabricClass fabric图层
     * @param {Object} fabricOptions fabric图层选项
     */
    constructor(map, fabricClass, fabricOptions) {
        if(!FabricLayer.instance){
            const m_fabricOptions = fabricOptions || {};
            this.map = map;
            this.initDevicePixelRatio();
            this.canvas = this._createCanvas();
            this.mapContainer = map.getCanvasContainer();
            this.mapContainer.appendChild(this.canvas);
    
            this.m_fabricCanvas = this._createFabricCanvas(this.canvas, fabricClass, m_fabricOptions);
            this.m_fabricCanvas.setMap(this.map)
            // this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
    
            this.bindEvent();
            this._reset();

            // set fabric instance
            FabricLayer.instance= this
        }else{
            return FabricLayer.instance
        }
       
    }

    /**
     * @function: Module:FabricLayer.pototype.initDevicePixelRatio
     * @description: 初始化dpi
     */
    initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    }
    /**
     * @function: Module:FabricLayer.pototype._createFabricCanvas
     * @description: 创建fabric图层
     * @param {Object} fabricClass fabric canvas类
     * @param {Object} fabricOptions fabric options
     * @return {Object} fabric图层
     */
    _createFabricCanvas(canvas, fabricClass, fabricOptions) {
        const m_fabricCanvas = new fabricClass(canvas, fabricOptions);
        m_fabricCanvas.setCoordSys(new PlotMapCoordSys(this.map));

        m_fabricCanvas.on('selection:created', () => {
            this.map.dragRotate.disable();
            this.map.dragPan.disable();
        });
        m_fabricCanvas.on('selection:cleared', () => {
            this.map.dragRotate.enable();
            this.map.dragPan.enable();
        });
        return m_fabricCanvas
    }
    /**
     * @function: Module:FabricLayer.pototype.getFabricCanvas
     * @description: 获取fabricCanvas
     * @return {Object} fabricCanvas
     */
    getFabricCanvas(){
       return this.m_fabricCanvas
    }

    //-----------------------------------Event Methods----------------------------------------
    /**
     * @function: Module:FabricLayer.pototype.bindEvent
     * @description: 绑定地图事件
     */
    bindEvent() {
        var map = this.map;
        //下面几个是mapboxgl专属事件,clickEvent和mousemoveEvent是mapv内部自带的方法不放出来
        this.innerMove= throttle(this.moveEvent,25,this) 
        this.innerMoveStart = this.moveStartEvent.bind(this);
        this.innerMoveEnd = this.moveEndEvent.bind(this);

        this.innnerZoomStart = this.zoomStartEvent.bind(this);
        this.innnerZoomEnd = this.zoomEndEvent.bind(this);

        this.innnerRotateStart = this.rotateStartEvent.bind(this);
        this.innnerRotateEnd = this.rotateEndEvent.bind(this);

        this.innnerPitchStart = this.pitchStartEvent.bind(this);
        this.innnerPitchEnd = this.pitchEndEvent.bind(this);

        this.innerResize = this.resizeEvent.bind(this);

        this.innerRemove = this.removeEvent.bind(this);

        map.on('resize', this.innerResize);

        map.on('zoomstart', this.innnerZoomStart);
        map.on('zoomend', this.innnerZoomEnd);

        map.on('rotatestart', this.innnerRotateStart);
        map.on('rotateend', this.innnerRotateEnd);

        map.on('pitchstart', this.innnerPitchStart);
        map.on('pitchend', this.innnerPitchEnd);

        // map.on('move',this.innerMove)
        map.on('movestart', this.innerMoveStart);
        map.on('moveend', this.innerMoveEnd);

        this.map.on('remove', this.innerRemove);
    }

    /**
     * @function: Module:FabricLayer.pototype.unbindEvent
     * @description: 解绑地图事件
     */
    unbindEvent() {
        var map = this.map;
        map.off('resize', this.innerResize);

        map.off('zoomstart', this.innnerZoomStart);
        map.off('zoomend', this.innnerZoomEnd);

        map.off('rotatestart', this.innnerRotateStart);
        map.off('rotateend', this.innnerRotateEnd);

        map.off('pitchstart', this.innnerPitchStart);
        map.off('pitchend', this.innnerPitchEnd);

        // map.off('move',this.innerMove)
        map.off('movestart', this.innerMoveStart);
        map.off('moveend', this.innerMoveEnd);
    }

    moveEvent(){
        this._reset();
    }
    moveStartEvent() {
        this._unvisiable();
    }

    moveEndEvent() {
        this._reset();
        this._visiable()
    }

    zoomStartEvent() {
        this._unvisiable();
    }
    zoomEndEvent() {
        this._reset();
        this._visiable();
    }

    rotateStartEvent() {
        this._unvisiable();

    }
    rotateEndEvent() {
        this._reset();
        this._visiable();
    }

    pitchStartEvent() {
        this._unvisiable();

    }
    pitchEndEvent() {
        this._reset();
        this._visiable();
    }

    resizeEvent() {
        this._reset();
        this._visiable();
    }
    removeEvent() {
        try {
            this.mapContainer.removeChild(this.canvas);
        }catch (e) {}
    }

    /**
     * @function: Module:FabricLayer.pototype._createCanvas
     * @description: 创建canvas
     * @return {HTMLCanvasElement}
     */
    _createCanvas() {
        var canvas = document.createElement('canvas');
        var devicePixelRatio = this.devicePixelRatio;
        canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';
        canvas.width = parseInt(this.map.getCanvas().style.width) * devicePixelRatio;
        canvas.height = parseInt(this.map.getCanvas().style.height) * devicePixelRatio;
        canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
        canvas.style.width = this.map.getCanvas().style.width;
        canvas.style.height = this.map.getCanvas().style.height;
        return canvas;
    }

    /**
     * @function: Module:FabricLayer.pototype._reset
     * @description: 重置视图
     */
    _reset() {
        if (this.canvas === null || this.m_fabricCanvas === null) {
            return;
        }
        this.resizeCanvas();
        this.fixPosition();
        this.onResize();
        this.render();
    }

    /**
     * @function: Module:FabricLayer.pototype.draw
     * @description: 绘制
     */
    draw() {
        return this._reset();
    }

    _visiable() {
        this.canvas.style.display = 'block';
        return this;
    }

    _unvisiable() {
        this.canvas.style.display = 'none';
        return this;
    }

    /**
     * @function: Module:FabricLayer.pototype.resizeCanvas
     * @description: 刷新canvas 
     */
    resizeCanvas() {
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        if (this.canvas == undefined || this.canvas == null) return;

        const x = parseInt(this.map.getCanvas().style.width) * this.devicePixelRatio;
        const y = parseInt(this.map.getCanvas().style.height) * this.devicePixelRatio;
        this.m_fabricCanvas.setCanvasDimensionsSize({ height: y, width: x });


        const topLeft ={x:0,y:0};

        // 偏移canvas
        this._applyPosition(this.m_fabricCanvas.lowerCanvasEl, topLeft);
        this._applyPosition(this.m_fabricCanvas.upperCanvasEl, topLeft);

        this.m_fabricCanvas.renderAll();
    }
    /**
     * @function: Module:FabricLayer.pototype._applyPosition
     * @description: 偏移fabriccanvas
     * @param {HTMLCanvasElement} canvas
     * @param {{x:number,y:number}} origin
     */
    _applyPosition(canvas, origin) {
        if (!canvas) return;
        const temp = canvas;
        temp.style.left = origin.x + 'px';
        temp.style.top = origin.y + 'px';
    }

    fixPosition() {}

    onResize() {}
    
    /**
     * @function: Module:FabricLayer.pototype.render
     * @description: 渲染
     */
    render() {
        if (!this.canvas || !this.m_fabricCanvas) return;
        this.m_fabricCanvas.requestRenderAll();
    }

    /**
     * @function: Module:FabricLayer.pototype.destroy
     * @description: 
     */
    destroy() {
        this.unbindEvent();
        this.mapContainer.removeChild(this.canvas);
        this.m_fabricCanvas = null;
    }
}

mapboxgl.zondy.FabricLayer = FabricLayer;
