import BaseStyleObject from "./BaseStyleObjectClass";
import { Property } from "../../Property";
/*
 * @Description:
 * @Author: zk
 * @Date: 2022-03-03 14:07:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-03-07 09:24:59
 */
export default class StrokeStyleClass extends BaseStyleObject {
  static SVGSTYLENAMES =
    "stroke,stroke-width,stroke-linecap,stroke-linejoin,stroke-opacity,stroke-miterlimit".split(
      ","
    );
  static STYLENAMES = "strokeStyle,lineWidth,lineCap,lineJoin,miterLimit".split(
    ","
  );
  static isCanCreate = (elem) => {
    const strokeStyleProp = elem.getStyle("stroke");
    return !!strokeStyleProp.hasValue();
  };
  constructor(elem){
    super(elem)
    this.lineWidth=elem.getStyle("stroke-width").getNumber()
  }
  createStyleObject() {
    const elem = this._elem;
    const style = {};
    const strokeStyleProp = elem.getStyle("stroke");
    let strokeStyle, lineCap, lineJoin, miterLimit,lineWidth;
    if (strokeStyleProp.hasValue()) {
      if (strokeStyleProp.getString() === "currentColor") {
        strokeStyleProp.setValue(elem.getStyle("color").getColor());
      }

      strokeStyle = strokeStyleProp.getString();

      if (strokeStyle === "inherit") {
        strokeStyle="none"
      }

      const strokeOpacityProp = elem.getStyle("stroke-opacity");

      if (strokeOpacityProp.hasValue(true) &&  strokeStyle !== "none") {
        strokeStyle = new Property(strokeStyle)
          .addOpacity(strokeOpacityProp)
          .getString();
      }
    }

    lineWidth=elem.getStyle('stroke-width').getNumber()
    const strokeLinecapStyleProp = elem.getStyle("stroke-linecap");
    if (strokeLinecapStyleProp.hasValue()) {
      lineCap = strokeLinecapStyleProp.getString();
    }

    const strokeLinejoinStyleProp = elem.getStyle("stroke-linejoin");
    if (strokeLinejoinStyleProp.hasValue()) {
      lineJoin = strokeLinejoinStyleProp.getString();
    }
    const strokeMiterlimitProp = elem.getStyle("stroke-miterlimit");
    if (strokeMiterlimitProp.hasValue()) {
      miterLimit = strokeMiterlimitProp.getNumber();
    }
    style.strokeStyle = strokeStyle;
    style.lineCap = lineCap;
    style.lineJoin = lineJoin;
    style.miterLimit = miterLimit;
    style.lineWidth= lineWidth
    return style;
  }
  getBaseClass() {
    return StrokeStyleClass;
  }
  getStyle(){
    return {...this.styleObject} 
  }
}
