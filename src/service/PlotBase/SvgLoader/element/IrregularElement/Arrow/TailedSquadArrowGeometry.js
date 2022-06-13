/*
 * @Author: your name
 * @Date: 2021-11-09 10:38:10
 * @LastEditTime: 2022-06-13 15:23:17
 * @LastEditors: zk
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\SquadArrow.js
 */
import BaseIrregularElement from "../BaseIrregularElement";
import TailedSquadArrow from "../../../../../PlotUtilBase/Geometry/Arrow/Tailed_Squad_Arrow";
import Point from "../../../../../PlotUtilBase/Geometry/Point";

export default class TailedSquadArrowGeometry extends BaseIrregularElement {
  constructor(node) {
    super(node);
    this.type = 'tailedsquadarrow';
  }

  _insertGeometry(points) {
    const pnts = points.map((s) => [s.x, s.y])
    const exPnts = new TailedSquadArrow(pnts).getPoints();
    const exPoints = exPnts.map((s) => new Point(s[0], s[1]))
    return [exPoints]
  }
}