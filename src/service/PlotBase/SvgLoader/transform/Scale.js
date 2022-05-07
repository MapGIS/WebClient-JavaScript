/*
 * @Author: your name
 * @Date: 2021-08-30 23:45:09
 * @LastEditTime: 2021-10-22 11:10:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\transform\Scale.js
 */
import StringUtil from "../../../PlotUtilBase/Util/StringUtil";
import Point from "../../../PlotUtilBase/Geometry/Point";
import Matrix3 from "../../../PlotUtilBase/Math/Matrix3";

export default class Scale {
  constructor(scale, transformOrigin) {
    const [x = 1, y = x] = StringUtil.toNumbers(scale);

    const matrix = new Matrix3();
    matrix.identity();

    const scalePnt = new Point(x, y);
    const originX = transformOrigin[0];
    const originY = transformOrigin[1];

    const tx = originX.getPixels("x");
    const ty = originY.getPixels("y");

    matrix.translate(tx, ty);
    matrix.scale(scalePnt.x, scalePnt.y || scalePnt.x);
    matrix.translate(-tx, -ty);

    this._matrix = matrix;
  }

  getMatrix() {
    return this._matrix;
  }
}
