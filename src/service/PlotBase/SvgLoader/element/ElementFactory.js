/*
 * @Author: your name
 * @Date: 2021-08-30 16:00:26
 * @LastEditTime: 2022-01-11 15:24:09
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\element-factory.js
 */
export default class ElementFactory {
  static register(type, proto) {
    ElementFactory._elementTypes[type] = proto;
  }

  static createInstance(node, elemtype) {
    let type = elemtype;
    if (!type) type = node.nodeName.replace(/^[^:]+:/, "");

    let proto = null;

    Object.keys(ElementFactory._elementTypes).forEach((stype) => {
      if (new RegExp(`^${stype}$`, "i").test(type)) {
        proto = ElementFactory._elementTypes[stype];
      }
    });

    if (proto == null || proto === "undefined") return null;
    const tempProto = new proto(node);

    return tempProto;
  }
}

ElementFactory._elementTypes = {};
