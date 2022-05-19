/*
 * @Author: your name
 * @Date: 2021-10-25 10:26:48
 * @LastEditTime: 2022-03-31 14:41:20
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\ElementInstance\RegularLine1ElementInstance.js
 */

import { CesiumGeomUtil, CesiumUtil } from "../../Utils/CesiumUtil";
import MainElement from "../../../../service/PlotBase/SvgLoader/element/extend/MainElement";
import RegularLineElementInstance from "./RegularLineElementInstance";

export default class RegularLine1ElementInstance extends RegularLineElementInstance {
  pathElemToWallGeomInstance(pathElem, options) {
    if (!(pathElem instanceof MainElement)) return undefined;
    return super.pathElemToWallGeomInstance(pathElem, options);
  }

  transfromGeoCesium(elem, cesgeo, options) {
    super.transfromGeoCesium(elem, cesgeo, options);
    const {dimModAttitude}=options
    if (dimModAttitude === 1){
      this._rotatePart(elem, cesgeo, options);
    }
  }

  _rotatePart(ele, cesGeom, options) {
    const { dimModHeight } = options;
    if (ele instanceof MainElement) return;

    if (!ele._dimModal.is3DTran()) return;
    const translatePoint = ele._dimModal.getTranslatePnt();
    let lineAngle = ele._dimModal.getLineAngle();

    if (lineAngle < -90 || lineAngle >= 90) {
      lineAngle = 180 + lineAngle;
    }

    const t = CesiumUtil.WebMercatorUnProject(
      translatePoint.x,
      translatePoint.y
    );

    const originPnt = Cesium.Cartesian3.fromDegreesArrayHeights([
      t.x,
      t.y,
      dimModHeight,
    ])[0];

    const rad = Cesium.Math.toRadians(lineAngle);
    const _axis = new Cesium.Cartesian3(Math.cos(rad), Math.sin(rad), 0);
    const axis = Cesium.Cartesian3.normalize(_axis, new Cesium.Cartesian3());

    const matrix = Cesium.Transforms.eastNorthUpToFixedFrame(originPnt);

    const matrixInverse = Cesium.Matrix4.inverseTransformation(
      matrix,
      new Cesium.Matrix4()
    );

    CesiumGeomUtil.transform(cesGeom, matrixInverse);
    CesiumGeomUtil.rotateAxis(
      cesGeom,
      axis,
      new Cesium.Cartesian3(0, 0, 0),
      new Cesium.Cartesian3(1, 1, 1),
      Math.PI / 2
    );
    CesiumGeomUtil.transform(cesGeom, matrix);
  }
}
