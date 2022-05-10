/*
 * @Description:
 * @Author: zk
 * @Date: 2022-04-19 10:53:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-04-24 15:54:12
 */
import { AnimationUtil } from "../../utils/AnimationUtil";
import { PlotBaseAnimation } from "../PlotBaseAnimation";

export class PlotScaleAnimation extends PlotBaseAnimation {
  constructor(options) {
    super(options)
    // animation type
    this.animationType = "scale-animation";
    // init options
    this.scaleRateArr = AnimationUtil.defineValue(
      options.scaleRateArr,
      [1, 2, 1]
    );
  }
  restore() {
    super.restore();
    this._plotObjects.forEach((obj) => {
        obj.setAdjustScale(1);
    });
  }
  render(rate) {
    const currentAdjust = AnimationUtil.getNumberRate(this.scaleRateArr, rate);
    this._plotObjects.forEach((obj) => {
      obj.setAdjustScale(currentAdjust)
    });
    this.handRefresh();
  }
}
