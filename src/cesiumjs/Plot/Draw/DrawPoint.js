/*
 * @Author: your name
 * @Date: 2021-09-17 11:51:33
 * @LastEditTime: 2021-12-27 11:54:35
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Draw\DrawRegularPoint.js
 */

import { DrawObject } from "../../../service/PlotBase/Draw/DrawObject";
import { PrimitiveFactory } from "../Primitive/PrimitiveFactory";
import { CesiumUtil } from "../Utils/CesiumUtil";

export class DrawPoint extends DrawObject {
  constructor(viewer, symbol) {
    super();
    this._viewer = viewer;
    this._symbol = symbol;
    this.m_coords = [];
    this._primitive = null;
  }

  addHooks() {
    const viewer = this._viewer;
    const symbol = this._symbol;
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction((event) => {
      const worldPos = viewer.scene.globe.pick(
        viewer.camera.getPickRay(event.position),
        viewer.scene
      );

      if (!worldPos) return;

      this._primitive = PrimitiveFactory.createInstance(symbol.type, {
        positions: this.m_coords,
        element: symbol.getElement(),
      });

      const lnglat = CesiumUtil.cartesian3ToDegrees(
        viewer.scene.globe.ellipsoid,
        worldPos
      );
      this.m_coords.push(lnglat);

      viewer.scene.primitives.add(this._primitive);

      this._primitive.positions = this.m_coords;
      this.disable();
      this.fireFinishEvent({ plotObj3D: this._primitive });

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    this._handler = handler;
  }

  removeHooks() {
    const handler = this._handler;
    handler.removeInputAction();
    handler.destroy();
    this._handler = null;
  }
}
