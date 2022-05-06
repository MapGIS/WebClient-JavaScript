/*
 * @Author: your name
 * @Date: 2021-11-03 09:47:16
 * @LastEditTime: 2021-11-09 13:48:55
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\extend\MainElement.js
 */
import {BaseRegularPartElement} from "./BaseRegularPartElement";

export class MainElement extends BaseRegularPartElement {
  constructor() {
    super();
    this.type = "mainelement";
  }
}

``