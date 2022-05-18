/*
 * @class: Module:2DPlot.PlotCanvasGroup
 * @Description: 二维图层组
 * @Author: zk
 * @Date: 2022-05-13 11:01:10
 * @LastEditors: zk
 * @LastEditTime: 2022-05-18 14:52:57
 */

import { fabric } from 'fabric';
import PlotCanvas from './PlotCanvas';

export const PlotCanvasGroup = fabric.util.createClass(fabric.Canvas, {
    selection: false,
    /**
     * @function: Module:PlotCanvasGroup
     * @description: 构造
     * @param {HTMLCanvasElement} el
     * @param {Object} options
     * @return {*}
     */
    initialize: function (el, options) {
        if (!PlotCanvasGroup.instance) {
            this.callSuper('initialize', el, options);
            this._plotCanvasLayers = [];
            PlotCanvasGroup.instance = this;
        } else {
            return PlotCanvasGroup.instance;
        }
    },
    /**
     * @function: Module:PlotCanvasGroup.prototype.setCanvasDimensionsSize
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
     * @function: Module:PlotCanvasGroup.prototype.setCoordSys
     * @description: 设置坐标系
     * @param {*} coordSys
     * @return {*}
     */
    setCoordSys(coordSys) {
        this.m_CoordSys = coordSys;
    },
    /**
     * @function: Module:PlotCanvasGroup.prototype.getCoordSys
     * @description: 获取坐标系
     * @return {Object}
     */
    getCoordSys() {
        return this.m_CoordSys;
    },
    /**
     * @function: Module:PlotCanvasGroup.prototype.getLayerById
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
     * @function: Module:PlotCanvasGroup.prototype.addLayer
     * @description: 添加图层
     * @param {PlotCanvas} layer
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
     * @function: Module:PlotCanvasGroup.prototype.getLayers
     * @description: 获取图层组
     * @return {Array<PlotCanvas>}
     */
    getLayers() {
        return this._plotCanvasLayers;
    },
    /**
     * @function: Module:PlotCanvasGroup.prototype.removeLayer
     * @description: 移除图层
     * @param {PlotCanvas} layer
     */
    removeLayer(layer) {
        const layerID = layer.getLayerId();
        this.removeLayerById(layerID);
    },
    /**
     * @function: Module:PlotCanvasGroup.prototype.removeLayerById
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
     * @function: Module:PlotCanvasGroup.prototype.bringObjectsByLayerToFront
     * @description: 将图层前置
     * @param {*} layer
     * @return {*}
     */
    bringObjectsByLayerToFront(layer) {
        const plotObjects = layer.getPlotObjects();
        this.bringObjectsToFront(plotObjects);
    },
    /**
     * @function: Module:PlotCanvasGroup.prototype.bringObjectByLayerIdToFront
     * @description: 根据图层id将图层前置
     * @param {String} layerId
     */
    bringObjectByLayerIdToFront(layerId) {
        const layer = this.getLayerById(layerId);
        this.bringObjectsByLayerToFront(layer);
    },
    /**
     * @function: Module:PlotCanvasGroup.prototype.bringObjectsToFront
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
     * @function: Module:PlotCanvasGroup.prototype.removeFromArray
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
     * @function: Module:PlotCanvasGroup.prototype.getPlotObjectById
     * @description: 根据要素id获取要素对象
     * @param {*} uid
     * @return {*}
     */
    getPlotObjectById(uid) {
        let t;
        this._objects.forEach((s) => {
            const elem = s.getElement();
            if (elem && elem.getFeatureId() === uid) {
                t = s;
            }
        });
        return t;
    },
    _isInMapBounds(positions, mapBounds) {
        let flag = false;

        const nw = mapBounds[0];
        const es = mapBounds[1];

        for (let i = 0; i < positions.length; i++) {
            const x = positions[i].x;
            const y = positions[i].y;

            if (x > nw[0] && x < es[0] && y < es[1] && y > nw[1]) {
                flag = true;
                break;
            }
        }
        return flag;
    },
    /**
     * @function: Module:PlotCanvasGroup.prototype._renderObjects
     * @description: 渲染标绘对象代码
     * @param {CanvasRenderingContext2D} ctx
     * @param {Array<Object>} objects
     */
    _renderObjects(ctx, objects) {
        const mapBounds = this.getCoordSys().getBounds();
        var i, len;
        for (i = 0, len = objects.length; i < len; ++i) {
            const object = objects[i];
            const element = object.getElement();
            const flag = element ? this._isInMapBounds(element.positions, mapBounds) : false;
            flag && object && object.render(ctx);
        }
    }
});

fabric.PlotCanvasGroup = PlotCanvasGroup;
