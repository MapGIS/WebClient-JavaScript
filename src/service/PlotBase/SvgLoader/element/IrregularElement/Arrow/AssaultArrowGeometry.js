/*
 * @Author: your name
 * @Date: 2021-11-09 10:21:27
 * @LastEditTime: 2021-11-09 11:00:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\AssaultArrow.js
 */
import { BaseIrregularElement } from "../BaseIrregularElement";
import { AssaultArrow } from "../../../../../PlotUtilBase/Geometry/Arrow/AssaultArrow";

export class AssaultArrowGeometry extends BaseIrregularElement{
    type='msbl_AssaultArrow'
    _insertGeometry(points){
       return new AssaultArrow({
        ctrlPnts: points,
      }).calculate()
    }
}