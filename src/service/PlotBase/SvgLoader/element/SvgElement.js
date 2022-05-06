/*
 * @Author: your name
 * @Date: 2021-08-30 22:20:42
 * @LastEditTime: 2022-01-11 15:24:19
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\SvgElement.js
 */
import { RenderedElement } from "./RenderedElement";

export class SvgElement extends RenderedElement {
  type = "svg";
  constructor(node) {
    super(node);

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
