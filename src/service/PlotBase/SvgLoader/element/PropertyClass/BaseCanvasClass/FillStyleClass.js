/*
 * @Description:
 * @Author: zk
 * @Date: 2022-03-03 15:57:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-03-08 10:14:58
 */
import BaseStyleObject from "./BaseStyleObjectClass";
import Property from "../../Property";

export default class FillStyleClass extends BaseStyleObject {
  constructor() {
    super();
    this.SVGSTYLENAMES = "fill,fill-rule,fill-opacity".split(",");
    this.STYLENAMES =
      "fillStyleType,fillGradType,fillStyle,fillGradColor".split(",");
    this.isCanCreate = (elem) => {
      return true;
    };
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
    if (fillStyleProp.hasValue()) {
      fillStyleType = 1;
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
