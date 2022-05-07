/*
 * @Author: your name
 * @Date: 2021-08-30 22:31:05
 * @LastEditTime: 2021-11-16 14:33:25
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\GElement.js
 */
import Point from "../../../PlotUtilBase/Geometry/Point";
import Element from "./Element";
import {Transform} from "../transform";

export default class GElement extends Element {
  constructor(node) {
    super(node);
    this._matrix = Transform.getTransfromFrmElement(this);
    this.type = 'g';
  }

  getOriginPoint() {
    let origin;
    if (this.getAttribute("origin").hasValue()) {
      const arr = this.getAttribute("origin").getString().split(",");
      origin = new Point(parseFloat(arr[0]), parseFloat(arr[1]));
    } else {
      const bounds = this.getBoundingBox();
      origin = bounds.getCenter();
    }
    return origin;
  }

  _clone(cloneObject) {
    super._clone(cloneObject)
    cloneObject._matrix = this._matrix ? this._matrix.clone() : null
  }
}
