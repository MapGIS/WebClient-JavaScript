/*
 * @Author: your name
 * @Date: 2021-10-25 10:29:02
 * @LastEditTime: 2022-01-14 17:01:17
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\ElementInstance\RegularPointElementInstance.js\
 */
import SvgElementInstance from "./SvgElementInstance";
import {CesiumGeomUtil} from "../../Utils/CesiumUtil";

export default class RegularPointElementInstance extends SvgElementInstance {

  transfromGeoCesium(elem,cesgeo, options) {
    const { dimModHeight, dimModAttitude } = options;


    let isRotate = false;
    if (dimModAttitude === 1) {
      isRotate = true;
    }

    const tranSize = this._elem.getTranSize()
      ? this._elem.getTranSize()
      : [1, 1];
    const tranAngle =
      this._elem.tranAngle || this._elem.tranAngle === 0
        ? this._elem.tranAngle
        : 0;

    const t1 = tranSize[0];
    const t2 = tranSize[1];

    const rad = Cesium.Math.toRadians(tranAngle);
    CesiumGeomUtil.scale(cesgeo, t1, t2, 1);

    if (isRotate) {
      CesiumGeomUtil.rotateX(cesgeo, Math.PI / 2);
      CesiumGeomUtil.rotateZ(cesgeo, -rad);
    } else {
      CesiumGeomUtil.rotateZ(cesgeo, -rad);
    }
    CesiumGeomUtil.translate(cesgeo, new Cesium.Cartesian3(0, 0, dimModHeight));
  }
}
