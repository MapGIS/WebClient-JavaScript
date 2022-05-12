/*
 * @Description: plotLayer
 * @Author: zk
 * @Date: 2022-05-11 19:05:03
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-05-12 17:11:21
 */
import { DrawPlotObjectFactory2D } from './Draw/DrawPlotObjectFactory2D';
import { PlotObjectFactory } from './Shapes/PlotObjectFactory';
import { createGuid } from '../PlotUtilBase/Util/Guid';
import SymbolManager from '../PlotBase/SymbolManager/SymbolManager';

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
    bindFabricCanvas(fabricCanvas) {
        this.bindEvent(fabricCanvas);
        this.setFabricCanvas(fabricCanvas);
    }
    removeFabricCanvas() {
        this.removeEvent();
        this.setFabricCanvas(null);
    }

    bindEvent(fabricCanvas) {
        // 更新触发事件
        fabricCanvas.on('object:modified', this._objectModifiedEventAction);
    }
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
    on(eventName,handler){
        const t= this._createHandler(handler).bind(this)
        this._eventHandlers.push({eventName,handler:t})
        this._fabricCanvas.on(eventName,t)
    }
    off(eventName){
       this._eventHandlers.forEach((s)=>{
        if(s.eventName===eventName){
            this._fabricCanvas.off(s.eventName,s.handler)
        } 
       })
    }
    _createHandler(handler){
        return (event)=>{
            const target = event.target;
            if (this.m_plotObjects.indexOf(target) === -1) {
                return;
            }
            handler(event)
        }
    }
    setCoordSys(coordSys) {
        this.m_CoordSys = coordSys;
    }

    getCoordSys() {
        return this.m_CoordSys;
    }

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
    add(plotObj) {
        this.m_plotObjects.push(plotObj);
        if (this._fabricCanvas) {
            this._fabricCanvas.add(plotObj);
        }
    }
    remove(plotObj) {
        const i = this.m_plotObjects.indexOf(plotObj);
        if (i > -1) {
            this.m_plotObjects.splice(i, 0);
        }
        if (this._fabricCanvas) {
            this._fabricCanvas.remove(plotObj);
        }
    }
    removeById(id) {
        const plotObject = this.getPlotObjectById(id);
        this.remove(plotObject);
    }
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
    // eslint-disable-next-line no-unused-vars
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

    setFabricCanvas(fabricCanvas) {
        this._fabricCanvas = fabricCanvas;
    }
    getFabricCanvas() {
        return this._fabricCanvas;
    }

    getPlotObjects() {
        return this.m_plotObjects;
    }
    getLayerId() {
        return this._layerId;
    }
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
