/*
 * @Author: your name
 * @Date: 2021-11-09 10:38:10
 * @LastEditTime: 2021-11-09 11:03:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\SquadArrow.js
 */
import BaseIrregularElement from "../BaseIrregularElement";
import SquadArrow from "../../../../../PlotUtilBase/Geometry/Arrow/Squad_Arrow";
import Point from "../../../../../PlotUtilBase/Geometry/Point";

export default class SquadArrowGeometry extends BaseIrregularElement {
  constructor() {
    super();
    this.type = 'msbl_squadarrow';
  }

  _insertGeometry(points) {
    const pnts = points.map((s) => [s.x, s.y])
    const exPnts = new SquadArrow(pnts).getPoints();
    const exPoints = exPnts.map((s) => new Point(s[0], s[1]))
    return [exPoints]
  }
}