/*
 * @Description:
 * @Author: zk
 * @Date: 2022-03-23 15:13:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-03-29 09:10:10
 */
import PlotAttributeAnimation from "./PlotAttributeAnimation";
import PlotBaseAnimation from "./PlotBaseAnimation";
import PlotGrowAnimation from "./PlotGrowAnimation";
import PlotVisibleAnimation from "./PlotVisibleAnimation";
class AnimationReg {
  static getAnimation(type) {
    if (type === 0 || type === "base-animation") {
      return PlotBaseAnimation;
    } else if (type === 1 || type === "attribute-animation") {
      return PlotAttributeAnimation;
    } else if (type === 2 || type === "grow-animation") {
      return PlotGrowAnimation;
    } else if (type === 3 || type === "visible-animation") {
      return PlotVisibleAnimation;
    } else {
      new Error("动画类型错误!");
    }
  }
}

export { PlotBaseAnimation, AnimationReg };
