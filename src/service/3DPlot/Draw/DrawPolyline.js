/*
 * @Author: your name
 * @Date: 2021-09-17 11:51:33
 * @LastEditTime: 2022-03-30 11:04:29
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Draw\DrawRegularPoint.js
 */

import DrawObject from "../../../service/PlotBase/Draw/DrawObject";
import PrimitiveFactory from "../Primitive/index";
import {CesiumUtil} from "../Utils/CesiumUtil";
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
  constructor(viewer, symbol, plotLayer) {
    super();
    this.m_coords = [];
    this._viewer = viewer;
    this._symbol = symbol;
    this._primitive = null;
    this._isAdded = false;
    this._plotLayer = plotLayer;
    this.uuid = Math.random() * 10000000;
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
        if (!that._isAdded) {
          const {classificationType} = that._symbol;
          res.classificationType = classificationType;
          const {style} = that._symbol;
          if(style && style.nodeStyles){
            res.initNodeStyles(style.nodeStyles);
          }
          that._primitive = PrimitiveFactory.createInstance(symbol.type, {
            positions: that.m_coords,
            element: res,
          });
          that._isAdded = true;
          that._plotLayer._primitiveCollection.add(that._primitive);
        }

        const lnglat = CesiumUtil.cartesian3ToDegrees(
          viewer.scene.globe.ellipsoid,
          worldPos
        );
        that.m_coords.push(lnglat);

        if (that.m_coords.length >= 2) {
          const len = that.m_coords.length;
          const v1 = that.m_coords[len - 2];
          const v2 = that.m_coords[len - 1];
          if (v1.equals(v2)) {
            that.m_coords.splice(len - 1, 1);
          }
        }

        if (that.m_coords.length >= 2) {
          // 去除重复点
          const coords = that.m_coords.map((s) => new Point(s.x, s.y));
          GeomUtil.ClearSamePts(coords);
          that.m_coords = coords.map((s) => new Cesium.Cartesian2(s.x, s.y));
          that._primitive.positions = that.m_coords;
        }
      });
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

    // handler.removeInputAction();
    handler.destroy();
    this._handler = null;
  }
}
