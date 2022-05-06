/*
 * @Author: your name
 * @Date: 2021-11-03 09:47:16
 * @LastEditTime: 2022-01-10 11:24:05
 * @LastEditors: Do not edit
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\extend\BaseRegularPartElement.js
 */
import {PathElement} from "../PathElement";
import {PathParser} from "../PathParser";

export class BaseRegularPartElement extends PathElement {
  constructor() {
    super();
  }

  type = "mainline";
  m_scaleX = 100;
  m_scaleY = 100;

  // 适应主轴的几何
  applyMainGeo(mainGeo) {
    if (mainGeo) {
      this.mainGeometry = mainGeo;
      this._pathParser = new PathParser(mainGeo.pathstr);
    }
  }

  // 适应随图缩放
  applyMapScale(x, y) {
    this.m_scaleX = x;
    this.m_scaleY = y;
  }

  // 克隆
  _clone(cloneObject) {
    super._clone(cloneObject);
    cloneObject.m_scaleX = this.m_scaleX;
    cloneObject.m_scaleY = this.m_scaleY;
    cloneObject.mainGeometry = this.mainGeometry
      ? this.mainGeometry.clone()
      : null;
    cloneObject._pathParser =
      this._pathParser && cloneObject.mainGeometry
        ? new PathParser(cloneObject.mainGeometry.pathstr)
        : null;
  }
}
