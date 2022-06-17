/*
 * @Author: your name
 * @Date: 2021-10-13 14:17:06
 * @LastEditTime: 2021-10-22 11:10:30
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\transform\matrix.js
 */
import StringUtil from "../../../PlotUtilBase/Util/StringUtil";
import Matrix3 from "../../../PlotUtilBase/Math/Matrix3";

export default class Matrix {
  constructor(matrixArr, transformOrigin) {
    const [t1, t2, t3, t4, t5, t6] = StringUtil.toNumbers(matrixArr);

    const matrix = new Matrix3();
    matrix.identity();
    const originX = transformOrigin[0];
    const originY = transformOrigin[1];

    const tx = originX.getPixels("x");
    const ty = originY.getPixels("y");

    matrix.translate(tx, ty);
    matrix.set(t1, t3, t5, t2, t4, t6, 0, 0, 1);
    matrix.translate(-tx, -ty);

    this._matrix = matrix;
  }

  getMatrix() {
    return this._matrix;
  }
}
