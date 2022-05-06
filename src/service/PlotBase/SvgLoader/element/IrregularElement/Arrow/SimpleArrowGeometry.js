/*
 * @Author: your name
 * @Date: 2021-10-18 10:17:39
 * @LastEditTime: 2021-11-09 13:37:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\SimpleArrow.js
 */
import { BaseIrregularElement } from "../BaseIrregularElement";
import { AttackArrow } from "../../../../../PlotUtilBase/Geometry/Arrow/Attack_Arrow";
import { Point } from "../../../../../PlotUtilBase/Geometry/Point";

export class SimpleArrowGeometry extends BaseIrregularElement {
  type = "msbl_singleArrow";
  _insertGeometry(points) {
    const pnts = points.map((s) => [s.x, s.y]);
    const exPnts = new AttackArrow(pnts).getPoints();
    const exPoints = exPnts.map((s) => new Point(s[0], s[1]));
    return [exPoints];
  }
}
