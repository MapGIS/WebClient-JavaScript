import { defined } from "../Check";

/*
 * @Description:
 * @Version: 2.0
 * @Date: 2021-07-19 00:09:15
 * @LastEditTime: 2021-07-21 10:52:29
 * @Author: xinxiao
 * @LastEditors: xinxiao
 */
export default class ArrayUtil {
  static isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  }

  static removeItem(arr, item) {
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      if (arr[i] === item) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  static pushArr(arr, src) {
    for (let i = 0; i < src.length; i += 1) {
      arr.push(src[i]);
    }
  }

  /**
   * 将多个参数依次push到arr中
   * @param {*} arr
   * @param  {...any} args
   */
   static push(arr, ...args) {
    for (let i = 0; i < args.length; i += 1) {
      arr.push(args[i]);
    }
  }

  /**
   * 拷贝数组
   * @param { Array } src 源数组
   * @param { Array } des 目的数组
   * @param { number } srcStart 源数组起始位置
   * @param { number } srcEnd 源数组终止位置
   * @param { number } desStart 目的数组起始位置
   */
  static copyArr(src, des, srcStart, srcEnd, desStart) {
    if (defined(srcStart) || defined(srcEnd)) {
      if (src.slice) {
        src = src.slice(srcStart, srcEnd);
      } else {
        src = Array.prototype.slice.call(src, srcStart, srcEnd);
      }
    }

    des.set(src, desStart);
  }
}
