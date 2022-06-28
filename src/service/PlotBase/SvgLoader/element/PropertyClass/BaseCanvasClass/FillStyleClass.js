/*
 * @Description:
 * @Author: zk
 * @Date: 2022-03-03 15:57:30
 * @LastEditors: zk
 * @LastEditTime: 2022-06-28 10:35:07
 */
import BaseStyleObject from "./BaseStyleObjectClass";
import Property from "../../Property";

class FillStyleClass extends BaseStyleObject {
  constructor(elem) {
    super(elem);
  }

  createStyleObject() {
    const elem = this._elem;
    const style = {};
    // tip:fillStyleType
    // -1 无法填充（没有闭合的几何）
    // 0 无填充
    // 1 纯色填充
    // 2 渐变填充
    // 3 其他规则符号填充
    let fillStyleType = 0,
      fillGradType = 1,
      fillStyle,
      fillGradColor,
      fillRule;
    // 计算填充样式
    const fillStyleProp = elem.getStyle("fill");

    if (fillStyleProp.hasValue() ) {

      if(fillStyleProp.getString()==='none'){
        fillStyleType = 0;
      }else{
        fillStyleType = 1
      }

      if (fillStyleProp.getString() === "currentColor") {
        fillStyleProp.setValue(elem.getStyle("color").getColor());
      }
      
      fillStyle = fillStyleProp.getColor();

      if (fillStyle === "inherit") {
        fillStyle = "none";
      }

      const fillOpacityStyleProp = elem.getStyle("fill-opacity");
      if (fillOpacityStyleProp.hasValue(true) && fillStyle !== "none") {
        fillStyle = new Property(fillStyle)
          .addOpacity(fillOpacityStyleProp)
          .getColor();
      }

      const fillRuleStyleProp = elem.getStyle("fill-rule");
      fillRule = fillRuleStyleProp.getString();
      fillGradColor = fillStyle;

      style.fillStyleType = fillStyleType;
      style.fillGradType = fillGradType;
      style.fillGradColor = fillGradColor === 'none' ? "rgba(0,0,0,0)" : fillGradColor;
      style.fillStyle = fillStyle;
      style.fillRule = fillRule;
    }

    return style;
    
  }

  getBaseClass() {
    return FillStyleClass;
  }
}

FillStyleClass.SVGSTYLENAMES = "fill,fill-rule,fill-opacity".split(",");
FillStyleClass.STYLENAMES =
  "fillStyleType,fillGradType,fillStyle,fillGradColor".split(",");
FillStyleClass.isCanCreate = (elem) => {
  return true;
};

export default FillStyleClass;