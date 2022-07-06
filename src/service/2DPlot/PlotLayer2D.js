/*
 * @class: Module:2DPlot.PlotLayer2D
 * @Description: 二维图层类
 * @Author: zk
 * @Date: 2022-05-13 10:34:57
 * @LastEditors: zk
 * @LastEditTime: 2022-07-06 12:11:10
 */

import { DrawPlotObjectFactory2D } from './Draw/DrawPlotObjectFactory2D';
import { PlotObjectFactory } from './Shapes/PlotObjectFactory';
import { createGuid } from '../PlotUtilBase/Util/Guid';
import SymbolManager from '../PlotBase/SymbolManager/SymbolManager';
import FabricLineUtil from './EditTool/FabricLineUtil';
import { addExtendLayersPlot, removeExtendLayersPlot } from '../3DPlot/Utils/PlotUtil';
import { Zondy } from '../common/Base';

class PlotLayer2D {
    constructor() {
        // 标绘对象
        this.m_plotObjects = [];
        // fabricCanvas
        this._fabricCanvas = null;
        // uuid
        this._layerId = createGuid();
        //  visible
        this._visible = true;
        // event
        this._objectModifiedEventAction = this._objectModifiedEventAction.bind(this);
        this._eventHandlers = [];

        //二三维联动工具
        this._linkTool = undefined;
        //点击回调事件
        this._pickPlot = undefined;
        //是否在绘制图元，绘制途中不触发pick事件
        this._isDrawing = false;
        // 是否为可编辑活跃图层
        this.editable = false;
        //是否加载完毕
        this.loaded = false;
    }

    /**
     * @function: Module:PlotLayer2D.prototype.bindFabricCanvas
     * @description: 添加fabric canvas
     * @param {*} fabricCanvas
     * @return {*}
     */
    bindFabricCanvas(fabricCanvas) {
        this.bindEvent(fabricCanvas);
        this.setFabricCanvas(fabricCanvas);
        new FabricLineUtil(this).enable();
    }

    /**
     * @function: Module:PlotLayer2D.prototype.removeFabricCanvas
     * @description: 移除fabric canvas
     */
    removeFabricCanvas() {
        this.removeEvent();
        this.setFabricCanvas(null);
        new FabricLineUtil(this).disable();
    }

    /**
     * @function: Module:PlotLayer2D.prototype.bindEvent
     * @description: 绑定事件
     * @param {*} fabricCanvas
     */
    bindEvent(fabricCanvas) {
        // 更新触发事件
        fabricCanvas.on('object:modified', this._objectModifiedEventAction);
    }
    /**
     * @function: Module:PlotLayer2D.prototype.removeEvent
     * @description: 移除事件
     */
    removeEvent() {
        this._fabricCanvas && this._fabricCanvas.off('object:modified', this._objectModifiedEventAction);
    }
    /**
     * @param {{ target: any; action: string; }} event
     */
    _objectModifiedEventAction(event) {
        const target = event.target;
        if (this.m_plotObjects.indexOf(target) === -1) {
            return;
        }
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
    }
    /**
     * @function: Module:PlotLayer2D.prototype.on
     * @description: 监听事件
     * @param {String} eventName 事件名，参考fabricjs Canvas类事件
     * @param {Function} handler 绑定函数
     */
    on(eventName, handler) {
        this._eventHandlers.push({ eventName, handler });
        this._fabricCanvas.on(eventName, handler);
    }
    /**
     * @function: Module:PlotLayer2D.prototype.off
     * @description: 移除监听事件
     * @param {String} eventName 事件名
     * @return {*}
     */
    off(eventName) {
        this._eventHandlers.forEach((s) => {
            if (s.eventName === eventName) {
                this._fabricCanvas && this._fabricCanvas.off(s.eventName, s.handler);
            }
        });
    }
    /**
     * @function: Module:PlotLayer2D.prototype._createHandler
     * @description: 监听函数包装
     * @param {*} handler
     * @return {*}
     */
    _createHandler(handler) {
        return (/** @type {{ target: any; }} */ event) => {
            const target = event.target;
            if (this.m_plotObjects.indexOf(target) === -1) {
                return;
            }
            handler(event);
        };
    }
    /**
     * @function: Module:PlotLayer2D.prototype.setCoordSys
     * @description: 设置坐标参数对象
     * @param {*} coordSys
     */
    setCoordSys(coordSys) {
        this.m_CoordSys = coordSys;
    }

    /**
     * @function: Module:PlotLayer2D.prototype.getCoordSys
     * @description: 获取坐标参数独享
     */
    getCoordSys() {
        return this.m_CoordSys;
    }

    /**
     * @function: Module:PlotLayer2D.prototype.addPlotObjectBy3DPlotObj
     * @description: 根据三维对象添加二维对象
     * @param {*} plotObj3D
     * @return {*}
     */
    addPlotObjectBy3DPlotObj(plotObj3D) {
        const element = plotObj3D.getElement();

        const plotObj = PlotObjectFactory.createInstance(element.type, {
            element: element,
            positions: element.positions,
            canvas: this
        });

        this.addPlot(plotObj);
        return plotObj;
    }
    /**
     * @function: Module:PlotLayer2D.prototype.addPlot
     * @description: 添加标绘对象
     * @param {Object} plotObj
     * @return {*}
     */
    addPlot(plotObj) {
        this.m_plotObjects.push(plotObj);
        addExtendLayersPlot(this._linkTool, plotObj);
        if (this._fabricCanvas) {
            this._fabricCanvas.add(plotObj);
            if (!this.editable) {
                plotObj.selectable = false;
                plotObj.evented = false;
            }
        }
    }
    /**
     * @function: Module:PlotLayer2D.prototype.removePlot
     * @description: 删除标绘对象
     * @param {Object} plot
     * @return {*}
     */
    removePlot(plot) {
        const i = this.m_plotObjects.indexOf(plot);
        if (i > -1) {
            this.m_plotObjects.splice(i, 1);
        }
        if (this._fabricCanvas) {
            this._fabricCanvas.remove(plot);
            removeExtendLayersPlot(this._linkTool, plot);
        }
    }
    /**
     * @function: Module:PlotLayer2D.prototype.removePlotByID
     * @description: 通过要素id移除
     * @param {String} id
     * @return {*}
     */
    removePlotByID(id) {
        const plotObject = this.getPlotByID(id);
        this.removePlot(plotObject);
    }
    /**
     * @function: Module:PlotLayer2D.prototype.getPlotByID
     * @description: 根据要素id获取要素对象
     * @param {*} uid
     * @return {*}
     */
    getPlotByID(uid) {
        let t;
        this.m_plotObjects.forEach((s) => {
            const elem = s.getElement();
            if (elem && elem.getFeatureId() === uid) {
                t = s;
            }
        });
        return t;
    }

    /**
     * @function: Module:PlotLayer2D.prototype.toJSON
     * @description: 导出geosjon对象
     */
    toJSON() {
        const base = {
            type: 'FeatureCollection',
            features: []
        };
        this.m_plotObjects.forEach((s) => {
            if (s.toGeoJSON) {
                base.features.push(s.toGeoJSON());
            }
        });
        return base;
    }

    /**
     * @function: Module:PlotLayer2D.prototype.fromJSON
     * @description: 加载geojson对象
     * @param {Object} geoJson geojson对象
     * @return {*}
     */
    fromJSON(geoJson) {
        if (geoJson.type === 'FeatureCollection') {
            const { features } = geoJson;
            let that = this;
            features.forEach((/** @type {any} */ s) => {
                this.addGeoJSONObject(s);
            });
            let layerInterval = setInterval(function () {
                if(features.length === that.getPlotObjects().length){
                    that.loaded = true;
                    clearInterval(layerInterval);
                }
            },50);
        } else {
            // eslint-disable-next-line no-new
            new Error('GeoJSON类型错误，传入值非要素集！');
        }
    }

    /**
     * @function: Module:PlotLayer2D.prototype.addGeoJSONObject
     * @description: 根据geojson子节点添加要素
     * @param {*} geoFeature geojson collection子节点
     */
    async addGeoJSONObject(geoFeature) {
        // 1、element
        const id = geoFeature.properties.symbolId;
        const symbolManager = SymbolManager.instance;

        const leaf = symbolManager.getLeafByID(id);
        if (!leaf) return null;

        const element = await leaf.getElement();
        if (!element) return null;
        const plotObj = PlotObjectFactory.createInstance(element.type, {
            element,
            positions: element.positions,
            canvas: this
        });
        plotObj.fromGeoJSON(geoFeature);
        this.addPlot(plotObj);
    }

    /**
     * @function: Module:PlotLayer2D.prototype.setFabricCanvas
     * @description: 设置fabricCanvas
     * @param {Object} fabricCanvas
     * @return {*}
     */
    setFabricCanvas(fabricCanvas) {
        this._fabricCanvas = fabricCanvas;
    }
    /**
     * @function: Module:PlotLayer2D.prototype.getFabricCanvas
     * @description: 获取fabricCanvas
     */
    getFabricCanvas() {
        return this._fabricCanvas;
    }

    /**
     * @function: Module:PlotLayer2D.prototype.getPlotObjects
     * @description: 获取标绘对象列表
     * @return {Array<Object>}
     */
    getPlotObjects() {
        return this.m_plotObjects;
    }
    /**
     * @function: Module:PlotLayer2D.prototype.getLayerId
     * @description: 获取图层Id
     * @return {String}
     */
    getLayerId() {
        return this._layerId;
    }
    /**
     * @function: Module:PlotLayer2D.prototype.setVisible
     * @description: 设置图层可见性
     * @param {Boolean} flag
     */
    setVisible(flag) {
        this._visible = flag;
        if (!flag) {
            this.m_plotObjects.forEach((s) => {
                s.setValue('show', false);
            });
        } else {
            this.m_plotObjects.forEach((s) => {
                s.setValue('show', true);
            });
        }
        this._fabricCanvas.requestRenderAll();
    }

    /**
     * @function: Module:PlotLayer2D.prototype.queryPlotByLatLng
     * @description: 点选标绘对象
     * @param {{lng:number,lat:number}|[number,number]} latlng
     * @return {*}
     */
    queryPlotByLatLng(latlng) {
        const latlngArr = Array.isArray(latlng) ? latlng : [latlng.lng, latlng.lat];
        const point = this.getCoordSys().dataToPoint(latlngArr);
        return this.queryPlotByPoint(point);
    }

    /**
     * @function: Module:PlotLayer2D.prototype.queryPlotByPoint
     * @description: 点选标绘对象
     * @param {{ x: number; y: number; } | [number,number]} point
     * @return {null | Object} 标绘对象
     */
    queryPlotByPoint(point) {
        const p = Array.isArray(point) ? point : [point.x, point.y];
        for (let i = 0; i < this.m_plotObjects.length; i++) {
            const plot = this.m_plotObjects[i];
            const element = plot.getElement();
            const bounds = element.getBounds();
            if (this._isInBounds(p, bounds)) {
                return plot;
            }
        }
        return null;
    }

    /**
     * @function: Module:PlotLayer2D.prototype.queryPlotsByLatlngBounds
     * @description: 矩阵选查询
     * @param {{ left: number; right: number; bottom: number; top: number; }} bounds
     * @return {*}
     */
    queryPlotsByLatlngBounds(bounds) {
        const p1 = [bounds.left, bounds.bottom];
        const p2 = [bounds.right, bounds.top];
        const coordSys = this.getCoordSys();
        const leftBottom = coordSys.dataToPoint(p1);
        const rightTop = coordSys.dataToPoint(p2);
        return this.queryPlotsByBounds({ left: leftBottom[0], top: leftBottom[1], bottom: rightTop[1], right: rightTop[0] });
    }
    /**
     * @function: Module:PlotLayer2D.prototype.queryPlotsByBounds
     * @description: 矩阵选查询
     * @param {{ left: number; right: number; bottom: number; top: number; }} bounds
     * @return {*}
     */
    queryPlotsByBounds(bounds) {
        const expPlots = [];
        for (let i = 0; i < this.m_plotObjects.length; i++) {
            const plot = this.m_plotObjects[i];
            const element = plot.getElement();
            const ebounds = element.getBounds();

            const p1 = [ebounds.left, ebounds.bottom];
            const p2 = [ebounds.right, ebounds.bottom];
            if (this._isInBounds(p1, bounds) && this._isInBounds(p2, bounds)) {
                expPlots.push(plot);
            }
        }
        return expPlots;
    }
    /**
     * @param {any[]} p
     * @param {{ left: any; bottom: any; top: any; right: any; }} bounds
     */
    _isInBounds(p, bounds) {
        const left = bounds.left;
        const bottom = bounds.bottom;
        const top = bounds.top;
        const right = bounds.right;
        if (left <= p[0] && p[0] <= right && bottom <= p[1] && p[1] <= top) {
            return true;
        }
        return false;
    }

    initCoords() {
        this.m_plotObjects.forEach((s) => {
            s.dataToPoint && s.dataToPoint();
        });
    }

    /**
     * @function: Module:PlotLayer2D.prototype.requestRenderAll
     * @description: 请求渲染
     */
    requestRenderAll() {
        this._fabricCanvas && this._fabricCanvas.requestRenderAll();
    }
}

Object.defineProperties(PlotLayer2D.prototype, {
    editable: {
        get: function () {
            return this._editable;
        },
        set: function (value) {
            this._editable = value;
            //启用编辑工具
            if (this._editable) {
                this.m_plotObjects.forEach((plot) => {
                    plot.selectable = true;
                    plot.evented = true;
                });
            } else {
                this.m_plotObjects.forEach((plot) => {
                    plot.selectable = false;
                    plot.evented = false;
                });
            }
        }
    },
    pickPlot: {
        get() {
            return this._pickPlot;
        },
        set(v) {
            let that = this;
            this._pickPlot = v;
            this.off('mouse:down');
            this.on('mouse:down', function (result) {
                result = result || {};
                if (result.target && !that._isDrawing) {
                    that._pickPlot(result.target);
                }
            });
        }
    }
});

export default PlotLayer2D;

Zondy.Plot.PlotLayer2D=PlotLayer2D