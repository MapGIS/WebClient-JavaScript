/*
 * @class: 
 * @Description: 
 * @Author: zk
 * @Date: 2022-06-13 19:19:48
 * @LastEditors: zk
 * @LastEditTime: 2022-06-13 19:19:48
 */
import RegularLine1Primitive from "./RegularLine1Primitive";
import RegularLine2ElementInstance from "../ElementInstance/RegularLine2ElementInstance";

/**
 * @class module:3DPlot.RegularLine2Primitive
 * @description 标绘图元（规则线二）基类
 * @author 基础平台-杨琨
 *
 * @param options - {Object} 初始化参数
 */
class RegularLine2Primitive extends RegularLine1Primitive {
  constructor(options) {
    super(options);
  }

  /**
   * @description 重载父类的_elementInstance方法
   * @private
   *
   * @param {function} callback 回调函数
   * */
  _elementInstance(callback) {
    new RegularLine2ElementInstance(this._elem,Object.assign(this.getBaseSaveAttributesValues(),{globelScale: this.getGlobelScale()})).getInstance(function (instances) {
      callback(instances);
    });
  }

  /**
   * @description 重载父类的initBaseSaveAttributes方法
   * @function module:3DPlot.RegularLine2Primitive.initBaseSaveAttributes
   * @public
   * */
  initBaseSaveAttributes() {
    this.dimModHeight = this._modHeight
    this.isOpenWall = true
    this.isWallGradColor = false
    this.wallColor = 'rgba(255,0,0,0.3)'
    this.wallGradColor = 'rgba(255,0,0,0.3)'
  }

  /**
   * @description 重载父类的getPrimitiveBaseSaveAttributes方法
   * @function module:3DPlot.RegularLine2Primitive.getPrimitiveBaseSaveAttributes
   * @public
   *
   * @return {Array} Attributes 属性字段数组
   * */
  getPrimitiveBaseSaveAttributes() {
    const attrs = super.getPrimitiveBaseSaveAttributes();
    return attrs.concat(RegularLine2Primitive.extendPrimitiveAttributes);
  }
}

RegularLine2Primitive.extendPrimitiveAttributes = ['dimModHeight', 'isOpenWall', 'isWallGradColor', 'wallColor', 'wallGradColor'];

export default RegularLine2Primitive;