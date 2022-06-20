/*
 * @Author: your name
 * @Date: 2021-11-09 10:37:25
 * @LastEditTime: 2022-06-13 14:48:21
 * @LastEditors: zk
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\MultiArrow.js
 */
import BaseIrregularElement from "../BaseIrregularElement";
import MultiArrow from '../../../../../PlotUtilBase/Geometry/Arrow/MultiArrow';

export default class MultiArrowGeometry extends BaseIrregularElement{
  constructor(node) {
    super(node);
    this.type='multiArrow';
  }
    _insertGeometry(points){
      const mutiArrow=new MultiArrow({
        ctrlpnts: points,
      })      
      return  [mutiArrow.calculate()]
    }
}