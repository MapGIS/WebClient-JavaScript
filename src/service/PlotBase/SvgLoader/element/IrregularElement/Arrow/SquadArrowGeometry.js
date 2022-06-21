/*
 * @Author: your name
 * @Date: 2021-11-09 10:38:10
 * @LastEditTime: 2022-06-21 11:15:48
 * @LastEditors: zk
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\SquadArrow.js
 */
import SquadArrow from "../../../../../PlotUtilBase/Geometry/Arrow/Squad_Arrow";
import Point from "../../../../../PlotUtilBase/Geometry/Point";
import BaseArrowGeometry from "./BaseArrowGeometry";

export default class SquadArrowGeometry extends BaseArrowGeometry {
  constructor(node) {
    super(node);
    this.type = 'squadarrow';
  }

  _insertGeometry(points) {
    const pnts = points.map((s) => [s.x, s.y])
    const exPnts = new SquadArrow(pnts).getPoints();
    const exPoints = exPnts.map((t) => t.map((s) => new Point(s[0], s[1])));
    return exPoints
  }
}