import { AnimationUtil } from "../../utils/AnimationUtil";
import { PlotBaseAnimation } from "../PlotBaseAnimation";

/*
 * @Description: 路径动画类
 * @Author: zk
 * @Date: 2022-04-19 09:59:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-04-19 11:27:07
 */
export class PlotPathAnimation extends PlotBaseAnimation {
  constructor(options) {
    super(options)
    // animation type
    this.animationType = "path-animation";
    // init options
    this.animationCoords = AnimationUtil.defineValue(
      options.animationCoords,
      []
    );
    this.showPath = AnimationUtil.defineValue(options.showPath, false);
    this.pathStyle = AnimationUtil.defineValue(options.pathStyle, {});
    this.pathType = AnimationUtil.defineValue(options.pathType, "line");
    this.startPathRate = AnimationUtil.defineValue(options.startPathRate, 0);
    this.endPathRate = AnimationUtil.defineValue(options.endPathRate, 1);
  }
}
