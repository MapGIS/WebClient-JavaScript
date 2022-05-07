/*
 * @Author: your name
 * @Date: 2021-11-09 10:34:29
 * @LastEditTime: 2022-03-11 11:38:59
 * @LastEditors: Do not edit
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Kidney.js
 */
import BaseIrregularElement from "./BaseIrregularElement";
import Kidney from "../../../../PlotUtilBase/Geometry/Kidney";

export default class KidneyGeometry extends BaseIrregularElement {
  constructor() {
    super();
    this.type = "msbl_Kidney";
  }
  _insertGeometry(points) {
    if (this._is3d && points.length===2) {
      points.reverse();
    }

    return [
      new Kidney({
        positions: points,
      }).calculate(),
    ];
  }
}