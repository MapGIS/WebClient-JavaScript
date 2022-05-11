/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-15 17:47:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-05-11 21:07:40
 */
import { fabric } from 'fabric';
import FabricLineUtil from './EditTool/FabricLineUtil';

export const PlotCanvasGroup = fabric.util.createClass(fabric.Canvas, {
    selection: false,

    /**
     * Constructor
     * @param {HTMLElement | String} el &lt;canvas> element to initialize instance on
     * @param {Object} [options] Options object
     * @return {Object} thisArg
     */
    initialize: function (el, options) {
        this.callSuper('initialize', el, options);

        this._plotCanvasLayers = [];

        // 更新触发事件
        this.on('object:modified', (event) => {
            const target = event.target;
            if (target && target.getElement) {
                const ele = target.getElement();

                if (event.action === 'rotate') {
                    if (ele.tranAngle || ele.tranAngle === 0) {
                        ele.tranAngle = target.angle;
                    }
                }
                if (event.action === 'scale' || event.action === 'scaleX' || event.action === 'scaleY') {
                    if (ele.setTranSize) {
                        ele.setTranSize(target.scaleX, target.scaleY);
                    }
                }
            }
        });
        // 修改lineUtil
        new FabricLineUtil(this);
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

    /**
     * set given CoordSystem on PlotCanvas
     * @param {CoordSystem} coordSys CoordSystem to set
     * @return {void}
     */
    setCoordSys(coordSys) {
        this.m_CoordSys = coordSys;
    },

    /**
     * returns current CoordSystem
     * @return {CoordSystem} current CoordSystem
     */
    getCoordSys() {
        return this.m_CoordSys;
    },
    addLayer(layer) {
        this._plotCanvasLayers.push(layer);
        layer.setFabricCanvas(this);
        layer.setCoordSys(this.m_CoordSys)
        layer.getPlotObjects().forEach((plot) => {
            this.add(plot);
        });
    },
    removeLayer(layer) {
        const layerID = layer.getLayerId();
        const layers = this._plotCanvasLayers;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].getLayerId() === layerID) {
                layer[i].getPlotObjects().forEach((plot) => {
                    this.remove(plot);
                });
                layers.splice(i, 1);
                layer.setFabricCanvas(null);
                layer.setCoordSys(null)
                break;
            }
        }
    }
});

fabric.PlotCanvasGroup = PlotCanvasGroup;
