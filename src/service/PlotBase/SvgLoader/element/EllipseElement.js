/*
 * @Author: your name
 * @Date: 2021-11-03 09:47:16
 * @LastEditTime: 2022-05-20 13:56:52
 * @LastEditors: zk
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
  _geometryPnts() {
    const cx = this.getAttribute("cx").getPixels("x");
    const cy = this.getAttribute("cy").getPixels("y");
    const rx = this.getAttribute("rx").getPixels();
    const ry = this.getAttribute("ry").getPixels();

    const pathArr = [];

    pathArr.push(new EllipseCurve(cx, cy, rx, ry).getPoints(this.getInsertGeometryPoint(40)));

    return pathArr;
  }

}
