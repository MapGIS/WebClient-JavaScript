import BaseStyleObject from "./BaseStyleObjectClass";
import FontStyle from "../../../../../PlotUtilBase/FontClass";
/*
 * @Description:
 * @Author: zk
 * @Date: 2022-03-03 14:07:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-03-07 15:53:14
 */


class FontStyleClass extends BaseStyleObject {
  constructor(elem) {
    super(elem);
  }

  createStyleObject() {
    const elem = this._elem;
    let style = {};

    const fontStyleProp = elem.getStyle("font");
    const fontStyleProp1 = elem.getStyle("font-style");

    if (fontStyleProp.hasValue() && fontStyleProp.getString() !== 'none') {
      style = FontStyle.parse(fontStyleProp.getString()).getFontObject();
    } else if (
      fontStyleProp1.hasValue()
    ) {
      const fontStyleStyleProp = elem.getStyle("font-style");
      const fontVariantStyleProp = elem.getStyle("font-variant");
      const fontWeightStyleProp = elem.getStyle("font-weight");
      const fontSizeStyleProp = elem.getStyle("font-size");
      const fontFamilyStyleProp = elem.getStyle("font-family");

      style = new FontStyle(
        fontStyleStyleProp.getString(),
        fontVariantStyleProp.getString(),
        fontWeightStyleProp.getString(),
        fontSizeStyleProp.getString(),
        fontFamilyStyleProp.getString()
      ).getFontObject();
    }
    return style;
  }

  getBaseClass() {
    return FontStyleClass;
  }
}

FontStyleClass.SVGSTYLENAMES =
  "font,font-style,font-variant,font-size,font-weight,font-family".split(",");
FontStyleClass.STYLENAMES = "fontSize,fontWeight,fontFamily".split(",");
FontStyleClass.isCanCreate = (elem) => {
  return true
};

export default FontStyleClass;
