/*
 * @Author: your name
 * @Date: 2021-10-25 10:29:02
 * @LastEditTime: 2022-05-20 10:25:10
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\ElementInstance\RegularPointElementInstance.js\
 */
import SvgElementInstance from "./SvgElementInstance";
import {CesiumGeomUtil} from "../../Utils/CesiumUtil";

export default class RegularPointElementInstance extends SvgElementInstance {

  transfromGeoCesium(elem,cesgeo, options) {
    const { dimModHeight, dimModAttitude } = options;

    // 点是否翻转直立
    let isTurnOver = false;
    if (dimModAttitude === "1") {
      isTurnOver = true;
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

    // 旋转
    if (isTurnOver) {
      CesiumGeomUtil.rotateX(cesgeo, Math.PI / 2);
      CesiumGeomUtil.rotateZ(cesgeo, -rad);
    } else {
      CesiumGeomUtil.rotateZ(cesgeo, -rad);
    }
    // 平移模型
    CesiumGeomUtil.translate(cesgeo, new Cesium.Cartesian3(0, 0, dimModHeight));
  }
}
