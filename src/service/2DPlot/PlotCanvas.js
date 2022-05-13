/*
 * @class:  Module:2DPlot.PlotCanvas
 * @Description: 二维图层类
 * @Author: zk
 * @Date: 2022-05-13 10:34:57
 * @LastEditors: zk
 * @LastEditTime: 2022-05-13 11:06:46
 */

import { DrawPlotObjectFactory2D } from './Draw/DrawPlotObjectFactory2D';
import { PlotObjectFactory } from './Shapes/PlotObjectFactory';
import { createGuid } from '../PlotUtilBase/Util/Guid';
import SymbolManager from '../PlotBase/SymbolManager/SymbolManager';
import FabricLineUtil from './EditTool/FabricLineUtil';

export default class PlotCanvas {
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
        this._eventHandlers=[]
    }

    /**
     * @function: Module:PlotCanvas.prototype.bindFabricCanvas
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
     * @function: Module:PlotCanvas.prototype.removeFabricCanvas
     * @description: 移除fabric canvas
     */
    removeFabricCanvas() {
        this.removeEvent();
        this.setFabricCanvas(null);
        new FabricLineUtil(this).disable();
    }

    /**
     * @function: Module:PlotCanvas.prototype.bindEvent
     * @description: 绑定事件
     * @param {*} fabricCanvas
     */
    bindEvent(fabricCanvas) {
        // 更新触发事件
        fabricCanvas.on('object:modified', this._objectModifiedEventAction);
    }
    /**
     * @function: Module:PlotCanvas.prototype.removeEvent
     * @description: 移除事件
     */
    removeEvent() {
        this._fabricCanvas && this._fabricCanvas.off('object:modified', this._objectModifiedEventAction);
    }
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
     * @function: Module:PlotCanvas.prototype.on
     * @description: 监听事件
     * @param {String} eventName 事件名，参考fabricjs Canvas类事件
     * @param {Function} handler 绑定函数
     */
    on(eventName,handler){
        const t= this._createHandler(handler).bind(this)
        this._eventHandlers.push({eventName,handler:t})
        this._fabricCanvas.on(eventName,t)
    }
    /**
     * @function: Module:PlotCanvas.prototype.off
     * @description: 移除监听事件
     * @param {String} eventName 事件名
     * @return {*}
     */
    off(eventName){
       this._eventHandlers.forEach((s)=>{
        if(s.eventName===eventName){
            this._fabricCanvas.off(s.eventName,s.handler)
        } 
       })
    }
    /**
     * @function: Module:PlotCanvas.prototype._createHandler
     * @description: 监听函数包装
     * @param {*} handler
     * @return {*}
     */
    _createHandler(handler){
        return (event)=>{
            const target = event.target;
            if (this.m_plotObjects.indexOf(target) === -1) {
                return;
            }
            handler(event)
        }
    }
    /**
     * @function: Module:PlotCanvas.prototype.setCoordSys
     * @description: 设置坐标参数对象
     * @param {*} coordSys
     */
    setCoordSys(coordSys) {
        this.m_CoordSys = coordSys;
    }

    /**
     * @function: Module:PlotCanvas.prototype.getCoordSys
     * @description: 获取坐标参数独享
     */
    getCoordSys() {
        return this.m_CoordSys;
    }

    /**
     * @function: Module:PlotCanvas.prototype.DrawSymbol
     * @description: 绘制工具
     * @param {*} symbol 符号节点
     * @return {*}
     */
    DrawSymbol(symbol) {
        if (this.drawTool) {
            this.drawTool.disable();
        }
        this.drawTool = DrawPlotObjectFactory2D.createInstance(symbol.type, this, symbol);
        if (this.drawTool) {
            this.drawTool.enable();
        }
        return this.drawTool;
    }
    /**
     * @function: Module:PlotCanvas.prototype.addPlotObjectBy3DPlotObj
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

        this.add(plotObj);
        return plotObj;
    }
    /**
     * @function: Module:PlotCanvas.prototype.add
     * @description: 添加标绘对象
     * @param {Object} plotObj
     * @return {*}
     */
    add(plotObj) {
        this.m_plotObjects.push(plotObj);
        if (this._fabricCanvas) {
            this._fabricCanvas.add(plotObj);
        }
    }
    /**
     * @function: Module:PlotCanvas.prototype.remove
     * @description: 删除标绘对象
     * @param {Object} plotObj
     * @return {*}
     */
    remove(plotObj) {
        const i = this.m_plotObjects.indexOf(plotObj);
        if (i > -1) {
            this.m_plotObjects.splice(i, 0);
        }
        if (this._fabricCanvas) {
            this._fabricCanvas.remove(plotObj);
        }
    }
    /**
     * @function: Module:PlotCanvas.prototype.removeById
     * @description: 通过要素id移除
     * @param {String} id
     * @return {*}
     */
    removeById(id) {
        const plotObject = this.getPlotObjectById(id);
        this.remove(plotObject);
    }
    /**
     * @function: Module:PlotCanvas.prototype.getPlotObjectById
     * @description: 根据要素id获取要素对象
     * @param {*} uid
     * @return {*}
     */
    getPlotObjectById(uid) {
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
     * @function: Module:PlotCanvas.prototype.toGeoJSON
     * @description: 导出geosjon对象
     */
    toGeoJSON() {
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
     * @function: Module:PlotCanvas.prototype.fromGeoJSON
     * @description: 加载geojson对象
     * @param {Object} geoJson geojson对象
     * @return {*}
     */
    fromGeoJSON(geoJson) {
        if (geoJson.type === 'FeatureCollection') {
            const { features } = geoJson;
            features.forEach((s) => {
                this.addGeoJSONObject(s);
            });
        } else {
            // eslint-disable-next-line no-new
            new Error('GeoJSON类型错误，传入值非要素集！');
        }
    }

    /**
     * @function: Module:PlotCanvas.prototype.addGeoJSONObject
     * @description: 根据geojson子节点添加要素
     * @param {*} geoFeature geojson collection子节点
     */
    async addGeoJSONObject(geoFeature) {
        // 1、element
        const id = geoFeature.properties.symbolId;
        const symbolManager = SymbolManager.instance;

        const leaf = symbolManager.getLeafByID(id);

        const element = await leaf.getElement();
        const plotObj = PlotObjectFactory.createInstance(element.type, {
            element,
            positions: element.positions,
            canvas: this
        });

        plotObj.fromGeoJSON(geoFeature);
        this.add(plotObj);
    }

    /**
     * @function: Module:PlotCanvas.prototype.setFabricCanvas
     * @description: 设置fabricCanvas
     * @param {Object} fabricCanvas
     * @return {*}
     */
    setFabricCanvas(fabricCanvas) {
        this._fabricCanvas = fabricCanvas;
    }
    /**
     * @function: Module:PlotCanvas.prototype.getFabricCanvas
     * @description: 获取fabricCanvas
     */
    getFabricCanvas() {
        return this._fabricCanvas;
    }

    /**
     * @function: Module:PlotCanvas.prototype.getPlotObjects
     * @description: 获取标绘对象列表
     * @return {Array<Object>} 
     */
    getPlotObjects() {
        return this.m_plotObjects;
    }
    /**
     * @function: Module:PlotCanvas.prototype.getLayerId
     * @description: 获取图层Id
     * @return {String}
     */
    getLayerId() {
        return this._layerId;
    }
    /**
     * @function: Module:PlotCanvas.prototype.setVisible
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
}
