/*
 * @Author: your name
 * @Date: 2021-11-03 09:47:16
 * @LastEditTime: 2021-11-15 10:05:01
 * @LastEditors: Do not edit
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\CircleElement.js
 */
import { Point } from "../../../PlotUtilBase/Geometry/Point.js";
import { PathElement } from "./PathElement.js";
import { EllipseCurve } from "../../../PlotUtilBase/Curves";

export class CircleElement extends PathElement {
  constructor() {
    super();
    this.type = "circle";
  }
  _getCoords(matrix) {
    const cx = this.getAttribute("cx").getPixels("x");
    const cy = this.getAttribute("cy").getPixels("y");
    const r = this.getAttribute("r").getPixels();

    const pathArr = [];

    pathArr.push(new EllipseCurve(cx, cy, r, r).getPoints(40));

    for (let i = 0; i < pathArr.length; i += 1) {
      for (let j = 0; j < pathArr[i].length; j += 1) {
        pathArr[i][j].applyMatrix3(matrix);
      }
    }
    return pathArr;
  }

  getOriginPoint() {
    const cx = this.getAttribute("cx").getPixels("x");
    const cy = this.getAttribute("cy").getPixels("y");
    const origin = super.getOriginPoint();
    if (origin) {
      return origin;
    }
    return new Point(cx, cy);
  }
}
