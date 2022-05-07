/*
 * @Description: 动画基础类
 * @Author: zk
 * @Date: 2022-03-23 10:02:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-04-01 17:44:25
 */

export default class PlotBaseAnimation {
  constructor(options) {
    // copy options
    this._options=options
    // animation type
    this._animationType = "base-animation";
    // init options
    this._duration = options.duration || 2.5;
    this._easing = options.easing;
    this._repeat = options.repeat || false;
    this._startTime = options.startTime || 0;
    this._animationName = options.animationName || "";
    this._plotObjects = options.plotObjects || null;
    // 动画状态
    this._status = "pending";
    // 刷新函数
    this.handRefresh = options.handRefresh || function () {};
    // 时段记录
    this.timeSpace = 0;
    // 动画stepid
    this.reqId=null
  }
  // 销毁动画
  destory() {}
  // 开始动画
  play(_totalTime) {
    let rate = 0;
    let start;
    let isHasHistory = false;
    const that = this;
    const time = this._duration * 1000;
    const startTime=this._startTime*1000
    const totalTime= (_totalTime>time+startTime)?time+startTime:_totalTime  
    if (this._status === "pausing" || this.timeSpace!==0) {
      isHasHistory = true;
    }
    this._status = "animating";

    function step(timestamp) {
      if (start === undefined) start = timestamp;
      if (isHasHistory) {
        start = start - that.timeSpace;
        isHasHistory = false;
      }
      const elapsed = timestamp - start;
      that.timeSpace = elapsed;
       
      if(elapsed>=startTime){
        rate = (elapsed-startTime)/ time;
        if (rate >= 1 ) {
          rate = 1;
          that.timeSpace=time+startTime
        }
        that.render(rate);
      }

      if (elapsed <=totalTime && that._status === "animating") {
        that.reqId=window.requestAnimationFrame(step);
      }
    }
    that.reqId= window.requestAnimationFrame(step);
  }
  // 暂停动画
  pause() {
    this._status = "pausing";
  }
  // 重置动画
  reset() {
    this._status = "pending";
    this.timeSpace=0
    this.removeReq()
  }
  // 停止动画
  stop() {
    this._status = "pending";
  }
  // 复位动画
  restore(){
    this._status = "pending";
    this.timeSpace=0
    this.removeReq()
  }
  // 清空req
  removeReq(){
    if(this.reqId!==null){
      window.cancelAnimationFrame(this.reqId)
    }
  }
  // render
  render(rate) {
    
  }
}
