/*
 * @Author: your name
 * @Date: 2021-10-18 10:17:39
 * @LastEditTime: 2022-06-21 11:17:52
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\SimpleArrow.js
 */
import AttackArrow from "../../../../../PlotUtilBase/Geometry/Arrow/Attack_Arrow";
import Point from "../../../../../PlotUtilBase/Geometry/Point";
import BaseArrowGeometry from "./BaseArrowGeometry";

export default class SimpleArrowGeometry extends BaseArrowGeometry {
  constructor(node) {
    super(node);
    this.type = "singlearrow";
  }
  _insertGeometry(points) {
    const pnts = points.map((s) => [s.x, s.y]);
    const exPnts = new AttackArrow(pnts).getPoints();
    const exPoints = exPnts.map((t) => t.map((s) => new Point(s[0], s[1])));
    return exPoints;
  }
}
