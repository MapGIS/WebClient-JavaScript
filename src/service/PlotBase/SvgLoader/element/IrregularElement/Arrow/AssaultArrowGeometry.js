/*
 * @Author: your name
 * @Date: 2021-11-09 10:21:27
 * @LastEditTime: 2022-06-22 10:25:01
 * @LastEditors: zk
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\AssaultArrow.js
 */
import AssaultArrow from "../../../../../PlotUtilBase/Geometry/Arrow/AssaultArrow";
import BaseArrowGeometry from "./BaseArrowGeometry";

export default class AssaultArrowGeometry extends BaseArrowGeometry {
  constructor(node) {
    super(node);
    this.type = 'assaultarrow';
  }

  _insertGeometry(points) {
    return new AssaultArrow({
      ctrlPnts: points,
    }).calculate()
  }
}