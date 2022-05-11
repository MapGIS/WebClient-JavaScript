/*
 * @Description: plotLayer
 * @Author: zk
 * @Date: 2022-05-11 19:05:03
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-05-11 20:46:18
 */
import { DrawPlotObjectFactory2D } from './Draw/DrawPlotObjectFactory2D';
import { PlotObjectFactory } from './Shapes/PlotObjectFactory';
import { createGuid } from "../PlotUtilBase/Util/Guid";
import SymbolManager from '../PlotBase/SymbolManager/SymbolManager';

export default class PlotCanvas {
    constructor() {
        // 标绘对象
        this.m_plotObjects = [];
        // fabricCanvas
        this._fabricCanvas=null
        // uuid
        this._layerId= createGuid()
    }

    /**
     * set given CoordSystem on PlotCanvas
     * @param {CoordSystem} coordSys CoordSystem to set
     * @return {void}
     */
    setCoordSys(coordSys) {
        this.m_CoordSys = coordSys;
    }

    /**
     * returns current CoordSystem
     * @return {CoordSystem} current CoordSystem
     */
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
        if(this._fabricCanvas){
            this._fabricCanvas.add(plotObj)
        }
    }

    /**
     * @description: 根据uid获取对象
     * @param {*} uid
     * @return {*}
     */
    getPlotObjectByUid(uid) {
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

    setFabricCanvas(fabricCanvas){
        this._fabricCanvas=fabricCanvas
    }
    getFabricCanvas(){
        return this._fabricCanvas
    }

    getPlotObjects(){
        return this.m_plotObjects
    }
    getLayerId(){
       return this._layerId
    }
}
