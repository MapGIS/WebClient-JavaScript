/*
 * @Author: your name
 * @Date: 2021-11-09 10:29:43
 * @LastEditTime: 2022-02-15 13:47:47
 * @LastEditors: Do not edit
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\DoubleArrow.js
 */
import { BaseIrregularElement } from "../BaseIrregularElement";
import { DoubleArrow } from "../../../../../PlotUtilBase/Geometry/Arrow/Double_Arrow";
import { Point } from "../../../../../PlotUtilBase/Geometry/Point";

export class DoubleArrowGeometry extends BaseIrregularElement{
    type='msbl_doublearrow'
    _insertGeometry(points){
        const pnts= points.map((s)=> [s.x,s.y])
        const exPnts= new DoubleArrow(pnts).getPoints();
        const exPoints= exPnts.map((s)=>new Point(s[0],s[1]))
        return  [exPoints]
    }
}