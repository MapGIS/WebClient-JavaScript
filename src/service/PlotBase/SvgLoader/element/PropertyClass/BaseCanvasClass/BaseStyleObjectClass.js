/*
 * @Description:
 * @Author: zk
 * @Date: 2022-03-03 14:01:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-03-04 16:10:39
 */
export default class BaseStyleObject {
  static SVGSTYLENAMES = [];
  static STYLENAMES = [];
  static isCanCreate() {
    return true;
  }
  constructor(elem) {
    this._elem = elem;
    this.defineSVGStylesValue()
    this.styleObject = this.createStyleObject();
  }
  createStyleObject() {
    const style = {};
    return style;
  }
  getStyleNameArr() {
    return this.getBaseClass().STYLENAMES;
  }
  getSVGStyleNameArr() {
    return this.getBaseClass().SVGSTYLENAMES;
  }
  defineSVGStylesValue() {
    this.getBaseClass().SVGSTYLENAMES.forEach((s) => {
      if (!this._elem.getStyle(s).hasValue()) {
        // 创建默认对象
        this._elem.getStyle(s, true);
      }
    });
  }
  getBaseClass() {
    return BaseStyleObject;
  }
  setStyle(type, value) {
    this.styleObject[type] = value;
  }
  getStyle() {
    return this.styleObject;
  }
}
