/*
 * @Description: 时间轴
 * @Author: zk
 * @Date: 2022-03-23 11:53:45
 * @LastEditors: zk
 * @LastEditTime: 2022-05-19 14:51:07
 */

/**
   * tip:不通过时间轴来控制动画的原因
   * 时间轴控制帧动画时，某一帧承载的压力过大，导致动画性能严重降低。
     因此时间轴只做用作动画组的概念，所有操作都下放
   */

import { AnimationReg } from "../AnimationTypes";
export default class TimeLine {
  constructor(layerGroup, options) {
    this._layerGroup = layerGroup;
    this._timeLineName = options.timeLineName || "";
    this._totalTime = options.totalTime || 20000;
    // 动画对象的队列
    this.handleRender = function () {
      layerGroup.requestRenderAll ? layerGroup.requestRenderAll() : null;
    };
    this._animationArr = [];
    this._animationItems = [];
  }
  addAnimationObject(item) {
    const t = (item.startTime + item.duration);
    if (t > this._totalTime) {
      this._totalTime = t;
    }
    this._animationArr.push(this._getAnimationObject(item));
    this._animationItems.push(item);
  }
  _getAnimationObject(item) {
    const animation = AnimationReg.getAnimation(item.type);
    const plotObjects = item.featureIds
      .split(",")
      .map((t) => {
        return this._layerGroup.getPlotObjectById(t);
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
      this._animationItems.push(s);
      return this._getAnimationObject(s);
    });
  }

  play() {
    const totalTime = this._totalTime;
    this.animationAction((t) => t.play(totalTime))();
  }
  reset() {
    this.animationAction((t) => t.reset())();
    this.animationAction((t) => {
      t.render(0.001);
    })();
    this.handleRender();
  }
  pause() {
    this.animationAction((t) => t.pause())();
  }
  clear() {
    this._animationArr = [];
    this.reset();
  }
  restore() {
    this.animationAction((t) => t.restore())();
    this.handleRender();
  }
  save() {
    const t = {
      timeLineName: this._timeLineName,
      totalTime: this._totalTime,
      animations: this._animationItems,
    };
    return t;
  }
  animationAction(func) {
    const that = this;
    return function () {
      that._animationArr.forEach((ani) => {
        func(ani);
      });
    };
  }
  
  /**
   * @description: 时间轴跳转
   * @param {number} time
   * @return {*}
   */
  jumpTo(time){
    let _time 
    if(time>this._totalTime){
      _time=this._totalTime
    }else if(time<0){
      _time=0
    }else {
      _time=time
    }
    
    this.animationAction((s)=>s.jumpTo(_time))()
  }
  stop() {}
  destory() {}
}
