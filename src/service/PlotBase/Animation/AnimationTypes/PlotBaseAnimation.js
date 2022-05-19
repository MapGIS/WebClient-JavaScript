/*
 * @Description: 动画基础类
 * @Author: zk
 * @Date: 2022-03-23 10:02:49
 * @LastEditors: zk
 * @LastEditTime: 2022-05-19 15:28:41
 */
import { AnimationUtil } from "../utils/AnimationUtil";
import { easingFunc } from "../utils/Easing";
export default class PlotBaseAnimation {
  constructor(options) {
    // copy options
    this._options = options;
    // animation type
    this.animationType = "base-animation";
    // init options
    this.duration = AnimationUtil.defineValue(options.duration, 3000);
    this.easing = AnimationUtil.defineValue(options.easing, "Linear");
    this.repeat = AnimationUtil.defineValue(options.repeat, false);
    this.startTime = AnimationUtil.defineValue(options.startTime, 0);
    this.animationName = AnimationUtil.defineValue(options.animationName, "");
    // 动画对象
    this._plotObjects = options.plotObjects || null;
    // 动画状态
    this._status = "pending";
    // 刷新函数
    this.handRefresh = options.handRefresh || function () {};
    // 时段记录
    this.timeSpace = 0;
    // 播放历史
    this.isHasHistory = false;
    // 动画stepid
    this.reqId = null;
    // 动画重复播放间隔
    this.timeRepeatSpace = 0;
    // requestAnimationArr
    this.requestAnimationArr = [];
    // 动画是否可绘制
    this.isCanRender = true;
  }
  // 销毁动画
  destory() {}
  // 开始动画
  play(_totalTime) {
    let rate = 0;
    let start;
    let repeatTimes = 0;
    let repeatStart = 0;
    let repeatTotalTimes=0
    let isTimeRepeatSpace = false;
    let timeLimit = 40;
    let limitStart;

    const that = this;
    const time = this.duration;
    const startTime = this.startTime;
    const timeRepeatSpace = this.timeRepeatSpace ;
    const totalTime = this._getTotalTime(_totalTime);

    if (this._status === "pausing" || this.timeSpace !== 0) {
      this.isHasHistory = true;
    }
    this._status = "animating";

    function step(timestamp) {
      if (start === undefined) {
        start = timestamp;
      }
      if (limitStart === undefined) limitStart = timestamp;

      if (that.isHasHistory) {
        start = timestamp-that.timeSpace;
        that.isHasHistory = false;
      }
      

      let elapsed = timestamp - start;
      // 记录当前时间
      that.timeSpace = elapsed;
      if (timestamp - limitStart > timeLimit) {
        limitStart = timestamp;
        if (elapsed >= startTime) {
          // 减去repeat时间 开始时间
          rate = (elapsed - startTime-repeatTotalTimes) / time;
          if (that.repeat) {
            if (rate >= 1) {
              const v = Math.floor(rate);
              rate = rate - Math.floor(rate);
              if (repeatTimes < v && !isTimeRepeatSpace) {
                repeatTimes = repeatTimes + 1;
                isTimeRepeatSpace = true;
                repeatStart = timestamp;
              }
            }
          } else {
            if (rate >= 1) {
              rate = 1;
              that.timeSpace = time + startTime;
            }
          }
          rate = rate.toFixed(3);
          if (isTimeRepeatSpace && timestamp - repeatStart >= timeRepeatSpace) {
            isTimeRepeatSpace = false;
            repeatTotalTimes += timeRepeatSpace;
          }
          if (!isTimeRepeatSpace) {
            that.render(that.applyEasing(rate));
          }
        }
      }
      if (elapsed <= totalTime && that._status === "animating") {
        that.limitReq();
        that.reqId = window.requestAnimationFrame(step);
        that.requestAnimationArr.push(that.reqId);
      }
    }
    that.reqId = window.requestAnimationFrame(step);
  }
  _getTotalTime(_totalTime) {
    const time = this.duration ;
    const startTime = this.startTime;
    const totalTime =
      _totalTime > time + startTime
        ? this.repeat
          ? _totalTime
          : time + startTime
        : _totalTime;
    return totalTime;
  }
  // 暂停动画
  pause() {
    this._status = "pausing";
  }
  // 重置动画
  reset() {
    this._status = "pending";
    this.timeSpace = 0;
    this.removeReq();
  }
  // 停止动画
  stop() {
    this._status = "pending";
  }
  // 复位动画
  restore() {
    this._status = "pending";
    this.timeSpace = 0;
    this.removeReq();
  }
  // 清空req
  removeReq() {
    if (this.reqId !== null) {
      window.cancelAnimationFrame(this.reqId);
    }
  }
  limitReq() {
    this.requestAnimationArr.forEach((s) => {
      window.cancelAnimationFrame(s);
    });
    this.requestAnimationArr = [];
  }

  jumpTo(time) {
    this.timeSpace=time
    this.isHasHistory = true;
  }
  applyEasing(rate){
   return easingFunc(this.easing)(rate)
  }
  // render
  render(rate) {}
}
