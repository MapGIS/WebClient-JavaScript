/*
 * @Description:
 * @Author: zk
 * @Date: 2022-03-04 11:50:03
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-03-07 15:38:10
 */
import { defined } from "@/PlotUtilBase/Check";
export default class FontStyle {
  constructor(fontStyle, fontVariant, fontWeight, fontSize, fontFamily) {
    // normal\italic\oblique\inherit
    this._fontStyle = fontStyle;
    // normal\small-caps\inherit
    this._fontVariant = fontVariant;
    // normal\bold\bolder\lighter\100\200\300\400\500\600\700\800\900\inherit
    this._fontWeight = fontWeight;
    this._fontSize = fontSize;
    this._fontFamily = fontFamily;
  }

  toString() {
    return [
      FontStyle.prepareFontStyle(this._fontStyle),
      this._fontVariant,
      FontStyle.prepareFontWeight(this._fontWeight),
      this._fontSize,
      this._fontFamily,
    ]
      .join(" ")
      .trim();
  }

  getFontObject() {
    return {
      fontStyle: FontStyle.prepareFontStyle(this._fontStyle),
      fontVariant: this._fontVariant,
      fontWeight: FontStyle.prepareFontWeight(this._fontWeight),
      fontSize: this._fontSize,
      fontFamily: FontStyle.prepareFontFamily(this._fontFamily),
    };
  }

  static prepareFontStyle(fontStyle) {
    if (!defined(fontStyle)) return "";

    const targetFontStyle = fontStyle.trim().toLowerCase();

    switch (targetFontStyle) {
      case "normal":
      case "italic":
      case "oblique":
      case "inherit":
      case "initial":
      case "unset":
        return targetFontStyle;

      default:
        if (/^oblique\s+(-|)\d+deg$/.test(targetFontStyle)) {
          return targetFontStyle;
        }

        return "";
    }
  }

  static prepareFontWeight(fontWeight) {
    if (!defined(fontWeight)) return "";

    const targetFontWeight = fontWeight.trim().toLowerCase();
    switch (targetFontWeight) {
      case "normal":
      case "bold":
      case "lighter":
      case "bolder":
      case "inherit":
      case "initial":
      case "unset":
        return targetFontWeight;

      default:
        if (/^[\d.]+$/.test(targetFontWeight)) {
          return targetFontWeight;
        }

        return "";
    }
  }

  static prepareFontFamily(fontFamily) {
    if (!defined(fontFamily)) return "";

    // eslint-disable-next-line no-shadow
    function wrapFontFamily(fontFamily) {
      const trimmed = fontFamily.trim();

      return /^('|")/.test(trimmed) ? trimmed : `"${trimmed}"`;
    }

    return fontFamily.trim().split(",").map(wrapFontFamily).join(",");
  }

  static parse(string) {
    const arr = string.split(",");
    return new FontStyle(arr[0], arr[1], arr[2], arr[3], arr[4]);
  }
}
