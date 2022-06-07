import RegularLine2Primitive from "./RegularLine2Primitive";
import KidneyAreaElementInstance from "../ElementInstance/KidneyAreaElementInstance";

/**
 * @class module:3DPlot.KidneyAreaPrimitive
 * @description 标绘图元（规则区二）基类
 * @author 基础平台-杨琨
 *
 * @param options - {Object} 初始化参数
 */
export default class KidneyAreaPrimitive extends RegularLine2Primitive {
  constructor(options) {
    super(options);
  }

  /**
   * @description 重载了父类的生成Element对象的方法
   * @private
   *
   * @param {function} callback 回调函数
   */
  _elementInstance(callback) {
    new KidneyAreaElementInstance(this._elem, {
      ...this.getBaseSaveAttributesValues(),
      globelScale: this.getGlobelScale()
    }).getInstance(function (instances) {
      callback(instances);
    });
  }
}
