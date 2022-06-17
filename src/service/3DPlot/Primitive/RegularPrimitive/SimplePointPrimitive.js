import RegularPointPrimitive from "./RegularPointPrimitive";

/**
 * @class module:3DPlot.SimplePointPrimitive
 * @description 标绘图元（新规则区）基类
 * @author 基础平台-杨琨
 *
 * @param options - {Object} 初始化参数
 */
class SimplePointPrimitive extends RegularPointPrimitive {

  /**
   * @description 重写父类的initBaseSaveAttributes方法
   * @function module:3DPlot.SimplePointPrimitive.initBaseSaveAttributes
   * @public
   */
  initBaseSaveAttributes() {
    this.dimModHeight = 0;
    this.dimModAttitude = this._elem.getSymbolPose();
  }

  /**
   * @description 重写父类的getPrimitiveBaseSaveAttributes方法
   * @function module:3DPlot.SimplePointPrimitive.getPrimitiveBaseSaveAttributes
   * @public
   *
   * @return {Array} Attributes 属性字段数组
   */
  getPrimitiveBaseSaveAttributes() {
    return SimplePointPrimitive.extendPrimitiveAttributes.concat([]);
  }
}

SimplePointPrimitive.extendPrimitiveAttributes = ["dimModHeight", "dimModAttitude"];

export default SimplePointPrimitive;