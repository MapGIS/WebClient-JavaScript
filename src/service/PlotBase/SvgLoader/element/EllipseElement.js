/*
 * @Author: your name
 * @Date: 2021-11-03 09:47:16
 * @LastEditTime: 2022-05-10 17:13:59
 * @LastEditors: Do not edit
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\CircleElement.js
 */
import { EllipseCurve } from "../../../PlotUtilBase/Curves";
import  CircleElement  from "./CircleElement.js";

export default class EllipseElement extends CircleElement {
  constructor(node) {
    super(node);
    this.type = "ellipse";
  }
  _getCoords(matrix) {
    const cx = this.getAttribute("cx").getPixels("x");
    const cy = this.getAttribute("cy").getPixels("y");
    const rx = this.getAttribute("rx").getPixels();
    const ry = this.getAttribute("ry").getPixels();

    const pathArr = [];

    pathArr.push(new EllipseCurve(cx, cy, rx, ry).getPoints(this.getInsertGeometryPoint(40)));

    for (let i = 0; i < pathArr.length; i += 1) {
      for (let j = 0; j < pathArr[i].length; j += 1) {
        pathArr[i][j].applyMatrix3(matrix);
      }
    }
    return pathArr;
  }

}
