/*
 * @Author: your name
 * @Date: 2021-08-30 15:20:38
 * @LastEditTime: 2022-03-02 16:11:32
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\Property.js
 */
import StringUtil from "../../../PlotUtilBase/Util/StringUtil";
import { colorRgba,rgbToRgba } from "../../../PlotUtilBase/Color";

function normalizeColor(color) {
  if (!color.startsWith("rgb")) {
    return color;
  }

  let rgbParts = 3;
  const normalizedColor = color.replace(/\d+(\.\d+)?/g, (num, isFloat) =>
    rgbParts-- && isFloat ? String(Math.round(parseFloat(num))) : num
  );

  return normalizedColor;
}

export default class Property {
  constructor(value) {
    this._value = value;
    this._isNormalizedColor = false;
  }

  hasValue(zeroIsValue) {
    const value = this._value;
    const flag=(
      value !== null &&
      value !== "" &&
      (zeroIsValue || value !== 0) &&
      typeof value !== "undefined"
    );
    return flag
  }

  isString(regexp) {
    const value = this._value;

    const result = typeof value === "string";

    if (!result || !regexp) {
      return result;
    }

    return regexp.test(value);
  }

  split(separator = " ") {
    return StringUtil.compressSpaces(this.getString())
      .trim()
      .split(separator)
      .map((value) => new Property(value));
  }

  isUrlDefinition() {
    return this.isString(/^url\(/);
  }

  isPixels() {
    if (!this.hasValue()) {
      return false;
    }

    const asString = this.getString();

    switch (true) {
      case asString.endsWith("px"):
      case /^[0-9]+$/.test(asString):
        return true;

      default:
        return false;
    }
  }

  setValue(value) {
    this._value = value;
    return this;
  }

  getValue() {
    return this._value;
  }

  getNumber() {
    if (!this.hasValue()) {
      return 0;
    }

    const value = this._value;

    let n = parseFloat(value);

    if (this.isString(/%$/)) {
      n /= 100.0;
    }

    return n;
  }

  getString() {
    if (this.hasValue()) {
      return typeof this._value === "undefined" ? "" : String(this._value);
    } return "";
  }

  getColor() {
    let color = this.getString();

    if (this._isNormalizedColor) {
      return color;
    }

    this._isNormalizedColor = true;
    color = normalizeColor(color);
    this.setValue(color);
    return color;
  }

  getDpi() {
    return 96.0;
  }

  getUnits() {
    return this.getString().replace(/[0-9.-]/g, "");
  }

  getMilliseconds() {
    if (!this.hasValue()) {
      return 0;
    }

    if (this.isString(/ms$/)) {
      return this.getNumber();
    }

    return this.getNumber() * 1000;
  }

  getRadians() {
    if (!this.hasValue()) {
      return 0;
    }

    switch (true) {
      case this.isString(/deg$/):
        return this.getNumber() * (Math.PI / 180.0);

      case this.isString(/grad$/):
        return this.getNumber() * (Math.PI / 200.0);

      case this.isString(/rad$/):
        return this.getNumber();

      default:
        return this.getNumber() * (Math.PI / 180.0);
    }
  }

  getPixels() {
    if (!this.hasValue()) {
      return 0;
    }

    return this.getNumber();
  }

  addOpacity(opacity) {
    let value = this.getColor()
    const len = value.length
    let commas = 0

    // Simulate old RGBColor version, which can't parse rgba.
    for (let i = 0; i < len; i++) {
      if (value[i] === ',') {
        commas++
      }

      if (commas === 3) {
        break
      }
    }

    if (opacity.hasValue(true) && this.isString() && commas !== 3) {
  
      const styleOpacity= opacity.getNumber()
      if(commas===0){
        value= colorRgba(value,styleOpacity)
      }

      if(commas===2){
        value=rgbToRgba(value,styleOpacity)
      }
    }

    return new Property(value)
  }

  clone(){
     return new Property(this._value)
  }
}
