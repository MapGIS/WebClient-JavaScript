/*
 * @Author: your name
 * @Date: 2021-09-17 11:51:33
 * @LastEditTime: 2021-12-27 11:54:35
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Draw\DrawRegularPoint.js
 */

import DrawObject from "../../../service/PlotBase/Draw/DrawObject";
import {PrimitiveFactory} from "../Primitive/PrimitiveFactory";
import {CesiumUtil} from "../Utils/CesiumUtil";

export default class DrawPoint extends DrawObject {
    constructor(viewer, symbol, plotLayer) {
        super();
        this._viewer = viewer;
        this._symbol = symbol;
        this.m_coords = [];
        this._primitive = null;
        this._plotLayer = plotLayer;
    }

    addHooks() {
        const viewer = this._viewer;
        const symbol = this._symbol;
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        let that = this;
        handler.setInputAction((event) => {
            const worldPos = viewer.scene.globe.pick(
                viewer.camera.getPickRay(event.position),
                viewer.scene
            );

            if (!worldPos) return;

            symbol.getElement().then(function (res) {
                const {classificationType, id} = that._symbol;
                res.classificationType = classificationType;
                const {style} = that._symbol;
                if(style && style.nodeStyles){
                    res.initNodeStyles(style.nodeStyles);
                }
                if(id){
                    res.featureId = id;
                }
                that._primitive = PrimitiveFactory.createInstance(symbol.type, {
                    positions: that.m_coords,
                    element: res
                });
                that._primitive.id = id;
                const lnglat = CesiumUtil.cartesian3ToDegrees(
                    viewer.scene.globe.ellipsoid,
                    worldPos
                );
                that.m_coords.push(lnglat);
                that._plotLayer._primitiveCollection.add(that._primitive);

                that._primitive.positions = that.m_coords;
                that.disable();
                that.fireFinishEvent({plotObj3D: that._primitive});
            });
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        this._handler = handler;
    }

    removeHooks() {
        const handler = this._handler;
        // handler.removeInputAction();
        handler.destroy();
        this._handler = null;
    }
}
