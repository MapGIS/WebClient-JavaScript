/*
 * @Description:动画工具类
 * @Author: zk
 * @Date: 2022-03-23 13:37:34
 * @LastEditors: zk
 * @LastEditTime: 2022-06-07 16:10:34
 */
export class AnimationUtil {
    /**
     * @description: 确定定义值
     * @param {any} v
     * @param {any} def
     * @return {*}
     */
    static defineValue(v, def) {
        if (typeof v === 'undefined') {
            return def;
        }
        return v;
    }
    static getNumberRate(numberArr, rate) {
        if (numberArr.length === 1) return numberArr[0];
        const lengthArr = [];
        let expNum = 0;

        for (let i = 1; i < numberArr.length; i++) {
            lengthArr.push(numberArr[i] - numberArr[i - 1]);
        }

        let numberLength = 0;
        lengthArr.forEach((t) => {
            numberLength += Math.abs(t);
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

    static minMax(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }
}
export const is = {
    arr: function (a) {
        return Array.isArray(a);
    },
    obj: function (a) {
        return stringContains(Object.prototype.toString.call(a), 'Object');
    },
    pth: function (a) {
        return is.obj(a) && a.hasOwnProperty('totalLength');
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
        return typeof a === 'string';
    },
    fnc: function (a) {
        return typeof a === 'function';
    },
    und: function (a) {
        return typeof a === 'undefined';
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
        return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes';
    }
};
