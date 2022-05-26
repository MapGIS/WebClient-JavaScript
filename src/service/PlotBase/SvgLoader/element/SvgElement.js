/*
 * @Author: your name
 * @Date: 2021-08-30 22:20:42
 * @LastEditTime: 2022-05-26 16:13:17
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\SvgElement.js
 */
import RenderedElement from "./RenderedElement";

export default class SvgElement extends RenderedElement {
  constructor(node) {
    super(node);

    this.type = "svg";

    const widthProps = this.getAttribute("width");
    if (widthProps.hasValue()) {
      this.width = widthProps.getNumber();
    }

    const heightProps = this.getAttribute("height");
    if (heightProps.hasValue()) {
      this.height = heightProps.getNumber();
    }
  }

  _clone(cloneObject) {
    super._clone(cloneObject);
    cloneObject.width = this.width;
    cloneObject.height = this.height;
  }
}

