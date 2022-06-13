/*
 * @Author: your name
 * @Date: 2021-11-09 10:31:43
 * @LastEditTime: 2022-06-13 14:49:14
 * @LastEditors: zk
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\FigureFan.js
 */
import Point from "../../../../PlotUtilBase/Geometry/Point";
import BaseIrregularElement from "./BaseIrregularElement";
import Sector from "../../../../PlotUtilBase/Geometry/Sector";

export default class FigureFanGeometry extends BaseIrregularElement {
  constructor(node) {
    super(node);
    this.type = 'sector';
  }

  _insertGeometry(points) {
    let pnts = points.map((s) => [s.x, s.y])
    const exPnts = new Sector(pnts, {
      angleInverse: !this._is3d
    }).getPoints();
    const exPoints = exPnts.map((s) => new Point(s[0], s[1]))
    return [exPoints]
  }
}