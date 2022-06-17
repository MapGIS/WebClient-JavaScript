/*
 * @Description:
 * @Author: zk
 * @Date: 2022-03-29 11:15:32
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-04-13 17:16:12
 */
export class AnimationColorUtil {
  static colorRgb(sColor) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return sColorChange;
    } else {
      return sColor;
    }
  }

  // 将rgb表示方式转换为hex表示方式
  static colorHex(rgb) {
    var _this = rgb;
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
      var strHex = "#";
      for (var i = 0; i < aColor.length; i++) {
        var hex = Number(aColor[i]).toString(16);
        hex = hex < 10 ? 0 + "" + hex : hex; // 保证每个rgb的值为2位
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      var aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        var numHex = "#";
        for (var i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }

  /**
   * @description: hex转rgba
   * @param {type}
   * @return {type}
   */
  static getRgba(sHex) {
    // 十六进制颜色值的正则表达式
    var reg =
      /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/;
    /* 16进制颜色转为RGB格式 */
    var sColor = sHex.toLowerCase();
    var alpha = 1;
    if (sColor && reg.test(sColor)) {
      //  #fff #ffff
      if (sColor.length === 4 || sColor.length === 5) {
        var sColorNew = "#";
        for (var i = 1; i < sColor.length; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      // 如果有透明度再执行
      if (sColor.length === 9) {
        alpha = (parseInt("0x" + sColor.slice(7, 9)) / 255).toFixed(2);
      }
      //  处理六位的颜色值
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
    } else {
      return sColor;
    }
  }

  static transRgba(data) {
    let obj = null;
    if (typeof data === "string" && data.indexOf("rgba") === -1) {
      return data;
    } else if (Object.prototype.toString.call(data) === "[object String]") {
      let arr = data.match(/\(([^)]*)\)/)[1].split(",");
      obj = {
        r: Number(arr[0]),
        g: Number(arr[1]),
        b: Number(arr[2]),
        a: Number(arr[3]),
      };
    } else {
      let { r, g, b, a } = data;
      obj = `rgba(${r},${g},${b},${a})`;
    }
    return obj;
  }
}
