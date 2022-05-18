/*
 * @Author: your name
 * @Date: 2021-11-04 15:54:38
 * @LastEditTime: 2022-02-18 15:26:24
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\ElementInstance\KidneyAreaElementInstance.js
 */
import RegularLine1ElementInstance from "./RegularLine1ElementInstance";
import {CesiumGeomUtil} from "../../Utils/CesiumUtil";
export default class KidneyAreaElementInstance extends RegularLine1ElementInstance {
  transfromGeoCesium(elem, cesgeo, options) {
    let {dimModHeight} = options;
    if(typeof this._classificationType === 'number' && this._classificationType >= 0){
      dimModHeight = 0;
    }

    CesiumGeomUtil.degreesWithHeightToWorldCoords(
        cesgeo,
      dimModHeight
    );
    this._rotatePart(elem, cesgeo, options);
  }
}
