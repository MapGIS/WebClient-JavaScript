/*
 * @Author: your name
 * @Date: 2021-09-14 17:00:31
 * @LastEditTime: 2021-11-16 14:31:29
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\element\TextElement.js
 */
import RenderedElement from "./RenderedElement";

export default class TextElement extends RenderedElement {
  constructor(node) {
    super(node);

    this._x = this.getAttribute("x").getPixels();
    this._y = this.getAttribute("y").getPixels();

    const dxAttr = this.getAttribute("dx");
    const dyAttr = this.getAttribute("dy");
    if (dxAttr.hasValue()) this._x += dxAttr.getPixels();

    if (dyAttr.hasValue()) this._y += dyAttr.getPixels();
    this.type='text'
  }
  _clone(cloneObject){
    super._clone(cloneObject)
    cloneObject._x=this._x
    cloneObject._y=this._y
  }
}
