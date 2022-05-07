/*
 * @Description:
 * @Author: zk
 * @Date: 2022-03-23 13:37:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-03-29 12:01:30
 */
class AnimationUtil {
  static getNumberRate(numberArr, rate) {
    if (numberArr.length === 1) return numberArr[0];
    const lengthArr = [];
    let expNum = 0;

    for (let i = 1; i < numberArr.length; i++) {
      lengthArr.push(numberArr[i] - numberArr[i - 1]);
    }

    const numberLength = lengthArr.reduce((pre, cur) => {
      return Math.abs(pre) + Math.abs(cur);
    });

    if (rate === 1) {
      return numberArr[numberArr.length - 1];
    } else {
      const baseLength = rate * numberLength;

      let cur = 0;
      for (let i = 0; i < lengthArr.length; i++) {
        const t = lengthArr[i];
        cur += Math.abs(t);

        if (baseLength <= cur) {
          const sliceArr = lengthArr.slice(0, i);

          let _length = 0;
          for (let i = 0; i < sliceArr.length; i++) {
            _length += Math.abs(sliceArr[i]);
          }
          let flag = t > 0 ? 1 : -1;

          expNum = numberArr[i] + (baseLength - _length) * flag;

          break;
        }
      }
      return expNum;
    }
  }
}

const is = {
  arr: function (a) {
    return Array.isArray(a);
  },
  obj: function (a) {
    return stringContains(Object.prototype.toString.call(a), "Object");
  },
  pth: function (a) {
    return is.obj(a) && a.hasOwnProperty("totalLength");
  },
  svg: function (a) {
    return a instanceof SVGElement;
  },
  inp: function (a) {
    return a instanceof HTMLInputElement;
  },
  dom: function (a) {
    return a.nodeType || is.svg(a);
  },
  str: function (a) {
    return typeof a === "string";
  },
  fnc: function (a) {
    return typeof a === "function";
  },
  und: function (a) {
    return typeof a === "undefined";
  },
  nil: function (a) {
    return is.und(a) || a === null;
  },
  hex: function (a) {
    return /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/i.test(a);
  },
  rgb: function (a) {
    return /^rgb/.test(a);
  },
  // hsl: function (a) {
  //   return /^hsl/.test(a);
  // },
  col: function (a) {
    return is.hex(a) || is.rgb(a);
  },
  key: function (a) {
    return (
      !defaultInstanceSettings.hasOwnProperty(a) &&
      !defaultTweenSettings.hasOwnProperty(a) &&
      a !== "targets" &&
      a !== "keyframes"
    );
  },
};

export {AnimationUtil, is}