/*
 * @Description:
 * @Author: zk
 * @Date: 2022-03-23 15:13:16
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-04-20 15:47:24
 */
import { PlotAttributeAnimation } from "./PlotExtendAnimation/PlotAttributeAnimation";
import { PlotBaseAnimation } from "./PlotBaseAnimation";
import { PlotBlinkAnimation } from "./PlotExtendAnimation/PlotColorAnimation/PlotBlinkAnimation";
import { PlotGrowAnimation } from "./PlotExtendAnimation/PlotGrowAnimation";
import { PlotScaleAnimation } from "./PlotExtendAnimation/PlotScaleAnimation";
import { PlotVisibleAnimation } from "./PlotExtendAnimation/PlotColorAnimation/PlotVisibleAnimation";
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
    } else if (type === 4 || type === "blink-animation") {
      return PlotBlinkAnimation;
    }else if (type === 5 || type === "scale-animation") {
      return PlotScaleAnimation;
    }  else {
      new Error("动画类型错误!");
    }
  }
}

export { PlotBaseAnimation, AnimationReg };
