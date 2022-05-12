/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-15 17:47:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-05-12 16:26:03
 */
import { fabric } from 'fabric';
import FabricLineUtil from './EditTool/FabricLineUtil';

export const PlotCanvasGroup = fabric.util.createClass(fabric.Canvas, {
    selection: false,
    initialize: function (el, options) {
        if (!PlotCanvasGroup.instance) {
            this.callSuper('initialize', el, options);
            this._plotCanvasLayers = [];
            PlotCanvasGroup.instance = this;
            // 修改lineUtil
            new FabricLineUtil(this);
        } else {
            return PlotCanvasGroup.instance;
        }
    },
    /* 
     tip:改写方法
     修改宽度和高度并刷新,原有方法 setDimensions设置高宽时会触发 requestRenderAll()
     在二三维联动时三维会频繁发送事件，二维界面会出现闪烁，因此改写为立即触发render
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

    setCoordSys(coordSys) {
        this.m_CoordSys = coordSys;
    },
    getCoordSys() {
        return this.m_CoordSys;
    },
    getLayerById(layerId) {
        let layer = null;
        const i = this._plotCanvasLayers.findIndex((s) => s.getLayerId() === layerId);
        if (i > -1) {
            layer = this._plotCanvasLayers[i];
        }
        return layer;
    },
    addLayer(layer) {
        layer.bindFabricCanvas(this);
        layer.setCoordSys(this.m_CoordSys);
        layer.getPlotObjects().forEach((plot) => {
            this.add(plot);
        });
        this._plotCanvasLayers.push(layer);
    },
    getLayers() {
        return this._plotCanvasLayers;
    },
    removeLayer(layer) {
        const layerID = layer.getLayerId();
        this.removeLayerById(layerID);
    },
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
    bringObjectsByLayerToFront(layer) {
        const plotObjects = layer.getPlotObjects();
        this.bringObjectsToFront(plotObjects);
    },
    bringObjectByLayerIdToFront(layerId) {
        const layer = this.getLayerById(layerId);
        this.bringObjectsByLayerToFront(layer);
    },
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
    removeFromArray: function (array, value) {
        var idx = array.indexOf(value);
        if (idx !== -1) {
            array.splice(idx, 1);
        }
        return array;
    }
});

fabric.PlotCanvasGroup = PlotCanvasGroup;
