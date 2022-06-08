/*
 * @Description: 根据比率获取渐变颜色
 * @Author: zk
 * @Date: 2022-03-28 10:46:58
 * @LastEditors: zk
 * @LastEditTime: 2022-06-08 11:59:31
 */

import { AnimationUtil } from "./AnimationUtil";
import { AnimationColorUtil } from "./ColorUtil";
export class GradientColor {
  constructor(colorArr, isOpacity = true) {
    this._colorArr = colorArr;
    this._isOpacity = isOpacity;
    if (colorArr.length === 0) {
      throw new Error("颜色渐变数组为空！");
    }
  }

  getGradientColorByRate(rate) {
    const rColor = [];
    const gColor = [];
    const bColor = [];
    const alpha = [];

    this._colorArr.forEach((t) => {
      const rgb = AnimationColorUtil.transRgba(AnimationColorUtil.getRgba(t));
      if (!(typeof rgb === "string")) {
        rColor.push(rgb.r);
        gColor.push(rgb.g);
        bColor.push(rgb.b);
        alpha.push(rgb.a);
      }
    });
    let currentAlpha = this._isOpacity
      ? parseFloat(AnimationUtil.getNumberRate(alpha, rate)).toFixed(3)
      : rate === 0
      ? 0
      : rate.toFixed(3);
    if(currentAlpha>=1){
      currentAlpha=1
    }

    const hex = AnimationColorUtil.colorHex(
      "rgba(" +
        parseInt(AnimationUtil.getNumberRate(rColor, rate)) +
        "," +
        parseInt(AnimationUtil.getNumberRate(gColor, rate)) +
        "," +
        parseInt(AnimationUtil.getNumberRate(bColor, rate)) +
        "," +
        currentAlpha +
        ")"
    );
    return hex;
  }
}
