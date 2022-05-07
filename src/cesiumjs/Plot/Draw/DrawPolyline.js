/*
 * @Author: your name
 * @Date: 2021-09-17 11:51:33
 * @LastEditTime: 2022-03-30 11:04:29
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Draw\DrawRegularPoint.js
 */

import DrawObject from "../../../service/PlotBase/Draw/DrawObject";
import { PrimitiveFactory } from "../Primitive/PrimitiveFactory";
import CesiumUtil from "../Utils/CesiumUtil";
import GeomUtil from "../../../service/PlotUtilBase/Geometry/GeomUtil";
import Point from "../../../service/PlotUtilBase/Geometry/Point";

function look(viewer, center, offset) {
  if (!viewer) {
    return;
  }

  var transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);

  var { camera } = viewer;
  camera.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
  camera.lookAtTransform(
    transform,
    new Cesium.Cartesian3(-offset, -offset, offset)
  );
  setTimeout(() => {
    camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  }, 100);
}

export default class DrawPolyline extends DrawObject {
  constructor(viewer, symbol) {
    super();
    this.m_coords = [];
    this._viewer = viewer;
    this._symbol = symbol;
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

      if (!this._primitive) {
        const primitive = PrimitiveFactory.createInstance(symbol.type, {
          positions: this.m_coords,
          element: symbol.getElement(),
        });
        this._primitive = primitive;
        viewer.scene.primitives.add(this._primitive);
      }

      const lnglat = CesiumUtil.cartesian3ToDegrees(
        viewer.scene.globe.ellipsoid,
        worldPos
      );
      this.m_coords.push(lnglat);

      if (this.m_coords.length >= 2) {
        const len = this.m_coords.length;
        const v1 = this.m_coords[len - 2];
        const v2 = this.m_coords[len - 1];
        if (v1.equals(v2)) {
          this.m_coords.splice(len - 1, 1);
        }
      }

      if (this.m_coords.length >= 2) {
        // 去除重复点
        const coords = this.m_coords.map((s) => new Point(s.x, s.y));
        GeomUtil.ClearSamePts(coords);
        this.m_coords = coords.map((s) => new Cesium.Cartesian2(s.x, s.y));
        this._primitive.positions = this.m_coords;
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction((event) => {
      this.fireFinishEvent({ plotObj3D: this._primitive });
      this.disable();
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    this._handler = handler;
  }

  removeHooks() {
    const handler = this._handler;
    this._primitive = null;
    if (this.m_coords.length > 0) {
      look(this.viewer, this.m_coords[this.m_coords.length - 1], 1000);
    }

    handler.removeInputAction();
    handler.destroy();
    this._handler = null;
  }
}
