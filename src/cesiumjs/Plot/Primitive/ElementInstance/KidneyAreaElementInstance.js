/*
 * @Author: your name
 * @Date: 2021-11-04 15:54:38
 * @LastEditTime: 2022-02-18 15:26:24
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\ElementInstance\KidneyAreaElementInstance.js
 */
import { RegularLine1ElementInstance } from "./RegularLine1ElementInstance";
import { CesiumGeomUtil } from "../../Utils/CesiumUtil";
export class KidneyAreaElementInstance extends RegularLine1ElementInstance {
  transfromGeoCesium(elem, cesgeo, options) {
    CesiumGeomUtil.degreesWithHeightToWorldCoords(
        cesgeo,
      options.dimModHeight
    );
    this._rotatePart(elem, cesgeo, options);
  }
}
