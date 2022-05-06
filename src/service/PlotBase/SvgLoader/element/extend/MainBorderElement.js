/*
 * @Author: your name
 * @Date: 2021-11-03 09:47:16
 * @LastEditTime: 2021-11-17 09:13:50
 * @LastEditors: Do not edit
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\extend\MainBorderElement.js
 */
import { MainElement } from "./MainElement";

export class MainBorderElement extends MainElement {
  constructor(props) {
    super(props);
    this.type = "mainborder";
  }

  _clone(cloneObject){
    super._clone(cloneObject);
    cloneObject._pathParser=this._pathParser?this._pathParser.clone():null
  }
}
