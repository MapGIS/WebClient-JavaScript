/*
 * @Author: your name
 * @Date: 2021-11-09 10:21:27
 * @LastEditTime: 2022-02-17 16:21:39
 * @LastEditors: Do not edit
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\AssaultArrow.js
 */
import BaseIrregularElement from "./BaseIrregularElement";
import CombinationalCircle from "../../../../PlotUtilBase/Geometry/CombinationalCircle";

export default class CombinationalCircleGeometry extends BaseIrregularElement{
  constructor(node) {
    super(node);
    this.type='msbl_CombinationalCircle';
  }
    _insertGeometry(points){
      let radius
      if(this._is3d){
        // 米
        radius=4400
      }else{
        // 经纬度
        radius=0.04
      }
       return new CombinationalCircle({
        controlPoints:points,
        radius:radius
      }).calculate()
    }
}