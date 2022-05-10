/*
 * @Author: your name
 * @Date: 2021-09-17 16:09:51
 * @LastEditTime: 2021-09-17 16:10:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\base\curves\ArcCurve.js
 */
import { EllipseCurve } from "./EllipseCurve.js";

class ArcCurve extends EllipseCurve {
  constructor(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
    super(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);

    this.type = "ArcCurve";
  }
}

ArcCurve.prototype.isArcCurve = true;

export { ArcCurve };
