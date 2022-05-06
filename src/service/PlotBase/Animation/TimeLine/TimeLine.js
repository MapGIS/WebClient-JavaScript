/*
 * @Description: 时间轴
 * @Author: zk
 * @Date: 2022-03-23 11:53:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-04-02 14:28:18
 */
import { AnimationReg } from "../AnimationTypes";
export default class TimeLine {
  constructor(canvas, options) {
    this._canvas = canvas;
    this._timeLineName = options.timeLineName || "";
    this._totalTime = options.totalTime || 20;
    // 动画对象的队列
    this.handleRender = function () {
      canvas.requestRenderAll ? canvas.requestRenderAll() : null;
    };
    this._animationArr = [];
    this._animationItems=[]
  }
  addAnimationObject(item) {
    const t = (item.startTime + item.duration) * 1000;
    if (t > this._totalTime) {
      this._totalTime = t;
    }
    this._animationArr.push(this._getAnimationObject(item)) 
    this._animationItems.push(item)
  }
  _getAnimationObject(item) {
    const animation = AnimationReg.getAnimation(item.type);
    const plotObjects = item.featureIds
      .split(",")
      .map((t) => {
        return this._canvas.getPlotObjectByUid(t);
      })
      .filter((b) => b);
    return new animation({
      ...item,
      plotObjects,
      handRefresh: this.handleRender.bind(this),
    });
  }

  fromJSON(json) {
    if (!json || !json.animations) return;
    this._timeLineName = json.timeLineName;
    this._totalTime = json.totalTime;
    this._animationArr = json.animations.map((s) => {
      this._animationItems.push(s)
      return this._getAnimationObject(s)
    });
  }
  play() {
    const totalTime = this._totalTime * 1000;
    this._animationArr.forEach((s) => {
      s.play(totalTime);
    });
  }
  reset() {
    this._animationArr.forEach((s) => {
      s.reset()
    });
    this._animationArr.forEach((s) => {
      s.render(0.001)
    });
    this.handleRender();
  }
  pause() {
    this._animationArr.forEach((s) => {
      s.pause();
    });
  }
  clear(){
    this._animationArr=[]
    this.reset()
  }
  restore(){
    this._animationArr.forEach((s) => {
      s.restore();
    });
    this.handleRender();
  }
  save(){
    const t={
      timeLineName:this._timeLineName,
      totalTime:this._totalTime/1000,
      animations:this._animationItems
    }
    return t
  }
  stop() {}
  destory() {}
}
