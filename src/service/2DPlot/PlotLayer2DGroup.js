/*
 * @class: Module:2DPlot.PlotLayer2DGroup
 * @Description: 二维图层组
 * @Author: zk
 * @Date: 2022-05-13 11:01:10
 * @LastEditors: zk
 * @LastEditTime: 2022-05-30 16:22:23
 */

import { fabric } from 'fabric';
import PlotLayer2D from './PlotLayer2D';
import DrawTool from '../PlotBase/Draw/DrawTool';
import SymbolManager from '../PlotBase/SymbolManager/SymbolManager';
import { PlotObjectFactory } from './Shapes/PlotObjectFactory';

export const PlotLayer2DGroup = fabric.util.createClass(fabric.Canvas, {
    selection: false,
    /**
     * @function: Module:PlotLayer2DGroup
     * @description: 构造
     * @param {HTMLCanvasElement} el
     * @param {Object} options
     * @return {*}
     */
    initialize: function (el, options) {
        if (!PlotLayer2DGroup.instance) {
            this.callSuper('initialize', el, options);
            PlotLayer2DGroup.instance = this;
            // 工具图层
            this._utilPlotCanvas = new PlotLayer2D();
            this._plotCanvasLayers = [];
            this.addLayer(this._utilPlotCanvas);
        } else {
            return PlotLayer2DGroup.instance;
        }
    },
    setMap(map){
        this._map=map
    },
    getMap(){
        return this._map
    },

    /**
     * @function: Module:PlotLayer2DGroup.prototype.setCanvasDimensionsSize
     * @description: fabricCanvas改写方法
     * @tip: 修改宽度和高度并刷新,原有方法 setDimensions设置高宽时会触发 requestRenderAll()
      在二三维联动时三维会频繁发送事件，二维界面会出现闪烁，因此改写为立即触发render
     * @param {{height:number,width:number}} dimensions
     * @param {Object} options
     */
    setCanvasDimensionsSize: function (dimensions, options) {
        var cssValue;

        options = options || {};

        for (var prop in dimensions) {
            cssValue = dimensions[prop];

            if (!options.cssOnly) {
                this._setBackstoreDimension(prop, dimensions[prop]);
                cssValue += 'px';
                this.hasLostContext = true;
            }

            if (!options.backstoreOnly) {
                this._setCssDimension(prop, cssValue);
            }
        }
        if (this._isCurrentlyDrawing) {
            this.freeDrawingBrush && this.freeDrawingBrush._setBrushStyles();
        }
        this._initRetinaScaling();
        this.calcOffset();

        return this;
    },

    /**
     * @function: Module:PlotLayer2DGroup.prototype.setCoordSys
     * @description: 设置坐标系
     * @param {*} coordSys
     * @return {*}
     */
    setCoordSys(coordSys) {
        this.m_CoordSys = coordSys;
    },
    /**
     * @function: Module:PlotLayer2DGroup.prototype.getCoordSys
     * @description: 获取坐标系
     * @return {Object}
     */
    getCoordSys() {
        return this.m_CoordSys;
    },
    /**
     * @function: Module:PlotLayer2DGroup.prototype.getLayerById
     * @description: 根据id获取图层
     * @param {*} layerId
     * @return {Object} layer
     */
    getLayerById(layerId) {
        let layer = null;
        const i = this._plotCanvasLayers.findIndex((s) => s.getLayerId() === layerId);
        if (i > -1) {
            layer = this._plotCanvasLayers[i];
        }
        return layer;
    },
    /**
     * @function: Module:PlotLayer2DGroup.prototype.addLayer
     * @description: 添加图层
     * @param {PlotLayer2D} layer
     */
    addLayer(layer) {
        layer.bindFabricCanvas(this);
        layer.setCoordSys(this.m_CoordSys);
        layer.getPlotObjects().forEach((plot) => {
            this.add(plot);
        });
        this._plotCanvasLayers.push(layer);
    },
    /**
     * @function: Module:PlotLayer2DGroup.prototype.getLayers
     * @description: 获取图层组
     * @return {Array<PlotLayer2D>}
     */
    getLayers() {
        return this._plotCanvasLayers;
    },
    /**
     * @function: Module:PlotLayer2DGroup.prototype.removeLayer
     * @description: 移除图层
     * @param {PlotLayer2D} layer
     */
    removeLayer(layer) {
        const layerID = layer.getLayerId();
        this.removeLayerById(layerID);
    },
    /**
     * @function: Module:PlotLayer2DGroup.prototype.removeLayerById
     * @description: 根据图层ID移除图层
     * @param {String} layerID
     */
    removeLayerById(layerID) {
        const layers = this._plotCanvasLayers;
        for (let i = 0; i < layers.length; i++) {
            const tempLayer = layers[i];
            if (tempLayer.getLayerId() === layerID) {
                tempLayer.getPlotObjects().forEach((plot) => {
                    this.remove(plot);
                });
                layers.splice(i, 1);
                tempLayer.removeFabricCanvas();
                tempLayer.setCoordSys(null);
                break;
            }
        }
    },
    /**
     * @function: Module:PlotLayer2DGroup.prototype.bringObjectsByLayerToFront
     * @description: 将图层前置
     * @param {*} layer
     * @return {*}
     */
    bringObjectsByLayerToFront(layer) {
        const plotObjects = layer.getPlotObjects();
        this.bringObjectsToFront(plotObjects);
    },
    /**
     * @function: Module:PlotLayer2DGroup.prototype.bringObjectByLayerIdToFront
     * @description: 根据图层id将图层前置
     * @param {String} layerId
     */
    bringObjectByLayerIdToFront(layerId) {
        const layer = this.getLayerById(layerId);
        this.bringObjectsByLayerToFront(layer);
    },
    /**
     * @function: Module:PlotLayer2DGroup.prototype.bringObjectsToFront
     * @description: 将标绘对象前置
     * @param {Array<Object>} objectArray PlotObject数组
     */
    bringObjectsToFront(objectArray) {
        if (!objectArray) {
            return;
        }
        objectArray.forEach((object) => {
            this.removeFromArray(this._objects, object);
        });
        objectArray.forEach((object) => {
            this._objects.push(object);
        });
        this.requestRenderAll();
        return this;
    },
    /**
     * @function: Module:PlotLayer2DGroup.prototype.removeFromArray
     * @description: 移除数组value
     * @param {Array<any>} array
     * @param {*} value
     * @return {*}
     */
    removeFromArray: function (array, value) {
        var idx = array.indexOf(value);
        if (idx !== -1) {
            array.splice(idx, 1);
        }
        return array;
    },

    /**
     * @function: Module:PlotLayer2DGroup.prototype.getPlotObjectById
     * @description: 根据要素id获取要素对象
     * @param {String} uid
     * @return {*}
     */
    getPlotObjectById(uid) {
        let t = null;
        for (let i = 0; i < this._objects.length; i++) {
            const object = this._objects[i];
            const elem = object.getElement();
            if (elem && elem.getFeatureId() === uid) {
                t = object;
                break;
            }
        }
        return t;
    },
    initLayerCoords() {
        this._plotCanvasLayers.forEach((layer) => {
            layer.initCoords();
        });
    },
    /**
     * @function: Module:PlotLayer2DGroup.prototype._renderObjects
     * @description: 渲染标绘对象代码
     * @param {CanvasRenderingContext2D} ctx
     * @param {Array<Object>} objects
     */
    _renderObjects(ctx, objects) {
        this.initLayerCoords();
        var i, len;
        for (i = 0, len = objects.length; i < len; ++i) {
            const object = objects[i];
            let flag = true;
            if (object.isExtendPlotObject) {
                const element = object.getElement();
                const bounds = element.getBounds();
                const left = bounds.left;
                const bottom = bounds.bottom;
                const top = bounds.top;
                const right = bounds.right;

                if ((this.width < left && this.height < bottom) || (top < 0 && right < 0)) {
                    flag = false;
                }
            }

            flag && object && object.render(ctx);
        }
    },
    drawUtilPlotObject(id, options) {
        const symbol = SymbolManager.instance;
        const leaf = symbol.getLeafByID(id);
        return leaf.getElement().then((element) => {
            const plotObj = PlotObjectFactory.createInstance(element.type, {
                element,
                positions: options.positions,
                canvas: this._utilPlotCanvas
            });
            this._utilPlotCanvas.add(plotObj);
            return plotObj;
        });
    },
    removeDrawUtilPlotObject(plotObject){
        this._utilPlotCanvas.remove(plotObject)  
    }
});

fabric.PlotLayer2DGroup = PlotLayer2DGroup;
