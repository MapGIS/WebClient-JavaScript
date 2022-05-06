/*
 * @Author: your name
 * @Date: 2021-08-31 00:04:34
 * @LastEditTime: 2021-10-22 11:56:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\transform\Rotate.js
 */
import { StringUtil } from "../../../PlotUtilBase/Util/StringUtil";
import { Matrix3 } from "../../../PlotUtilBase/Math/Matrix3";
import { Property } from "../element/Property";

export class Rotate {
  constructor(rotate, transformOrigin) {
    const numbers = StringUtil.toNumbers(rotate);

    const matrix = new Matrix3();
    matrix.identity();

    const angle = new Property(numbers[0]);
    const originX = transformOrigin[0];
    const originY = transformOrigin[1];
    const cx = numbers[1] || 0;
    const cy = numbers[2] || 0;

    const tx = cx + originX.getPixels("x");
    const ty = cy + originY.getPixels("y");

    matrix.translate(tx, ty);
    matrix.rotate(angle.getRadians());
    matrix.translate(-tx, -ty);

    this._matrix = matrix;
  }

  getMatrix() {
    return this._matrix;
  }
}
