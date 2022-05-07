/*
 * @Description: 样式Property
 * @Author: zk
 * @Date: 2022-03-03 10:56:04
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-03-10 10:47:19
 */
export default class PropertyClass {
  constructor(elem, classArr) {
    this.type = "property";
    this._elem = elem;
    this.styleObjectArr = classArr
      .map((s) => {
        if (s.isCanCreate(elem)) {
          return new s(elem);
        }
      })
      .filter((s) => s);
  }
  getStyleNameArr() {
    return this.styleObjectArr.map((s) => s.getStyleNameArr()).flat();
  }
  getSVGStyleNameArr() {
    return this.styleObjectArr.map((s) => s.getSVGStyleNameArr()).flat();
  }
  getStyle() {
    let style = {};
    this.styleObjectArr.forEach((t) => {
      style = { ...style, ...t.getStyle() };
    });
    return style;
  }

  setStyle(str, val) {
    for(let s of this.styleObjectArr){
      const arr = s.getStyleNameArr();
      if (arr.indexOf(str) > -1) {
         s.setStyle(str,val)
        return
      }
    }

  }
}
