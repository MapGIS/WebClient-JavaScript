import { defaultValue } from "./Check";
import { defined } from "./Check";

const rgbaMatcher =
  /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
/**
 * 颜色类
 * @property red    红色值
 * @property green  绿色值
 * @property blue   蓝色值
 * @property alpha  透明度
 */
export class Color {
  /**
   *
   * @param {Number} [red=0]     红色值
   * @param {Number} [green=0]   绿色值
   * @param {Number} [blue=0]    蓝色值
   * @param {Number} [alpha=0.0] 透明度
   */
  constructor(red, green, blue, alpha) {
    this.red = defaultValue(red, 255);
    this.green = defaultValue(green, 255);
    this.blue = defaultValue(blue, 255);
    this.alpha = defaultValue(alpha, 0.0);
  }

  /**
   * 根据rgba字符串创建color对象
   * @function
   * @static
   * @param {String} str rgba 字符串
   * @returns {Color}
   */
  static fromRgbaStr(str) {
    const matches = rgbaMatcher.exec(str);
    if (!defined(matches)) return new Color();

    let red = defined(matches[1]) ? parseInt(matches[1], 10) : null;
    let green = defined(matches[2]) ? parseInt(matches[2], 10) : null;
    let blue = defined(matches[3]) ? parseInt(matches[3], 10) : null;
    let alpha = defined(matches[4]) ? parseFloat(matches[4]) : null;

    return new Color(red, green, blue, alpha);
  }
}

/**
 * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
 * sHex为传入的十六进制的色值
 * alpha为rgba的透明度
 */
export function colorRgba(sHex, alpha) {
  // 十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  let sColor = sHex.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      // eslint-disable-next-line radix
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    // return sColorChange.join(',')
    return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
  }
  return sColor;
}

/**
 * rgb转rgba
 * @param color
 * @param alp
 * @returns {string}
 */
export function rgbToRgba(color, alp) {
  var rgbaAttr = color.match(/[\d.]+/g);
  if (rgbaAttr.length >= 3) {
    let r, g, b;
    r = rgbaAttr[0];
    g = rgbaAttr[1];
    b = rgbaAttr[2];
    return "rgba(" + r + "," + g + "," + b + "," + alp + ")";
  }
  return color;
}

/**
 * rgba转rgb
 * @param color
 * @returns {string}
 */
export function rgbaToRgb(color) {
  var rgbaAttr = color.match(/[\d.]+/g);
  if (rgbaAttr.length >= 4) {
    var r, g, b, alpha, nr, ng, nb;
    r = rgbaAttr[0];
    g = rgbaAttr[1];
    b = rgbaAttr[2];
    alpha = rgbaAttr[3];

    // Color = Color * alpha + bkg * (1 - alpha);
    var bkg = "rgb(255,177,84)";
    var bkgAttr = bkg.match(/[\d.]+/g);
    nr = r * alpha + bkgAttr[0] * (1 - alpha);
    ng = g * alpha + bkgAttr[1] * (1 - alpha);
    nb = b * alpha + bkgAttr[2] * (1 - alpha);

    return "rgb(" + nr + "," + ng + "," + nb + ")";
  }

  return "";
}
