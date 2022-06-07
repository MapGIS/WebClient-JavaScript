/*
 * @Description: 动画基础类
 * @Author: zk
 * @Date: 2022-03-23 10:02:49
 * @LastEditors: zk
 * @LastEditTime: 2022-06-07 16:21:27
 */
import { AnimationUtil } from '../utils/AnimationUtil';
import { easingFunc } from '../utils/Easing';
export default class PlotBaseAnimation {
    constructor(options) {
        this._initBaseAttributes(options);
        this.update();
    }
    _initBaseAttributes(options) {
        // copy options
        this._options = options;
        // animation type
        this.animationType = 'base-animation';
        // init options
        this.duration = AnimationUtil.defineValue(options.duration, 3000);
        this.easing = AnimationUtil.defineValue(options.easing, 'Linear');
        this.delay = AnimationUtil.defineValue(options.delay, 0);
        this.endDelay = AnimationUtil.defineValue(options.endDelay, 0);
        this.animationName = AnimationUtil.defineValue(options.animationName, '');
        this.loop = AnimationUtil.defineValue(options.loop, 1);
        this.timelineOffset = AnimationUtil.defineValue(options.timelineOffset, 0);
        this.featureIds= options.featureIds
        // 动画对象
        this._plotObjects = options.plotObjects || null;
        // 动画状态
        this._status = 'pending';
        // 图层组函数
        this.getPlotObjectById = options.getPlotObjectById || function (uid) {};
        this.drawUtilPlotObject = options.drawUtilPlotObject ? options.drawUtilPlotObject : function () {};
        this.removeDrawUtilPlotObject = options.removeDrawUtilPlotObject ? options.removeDrawUtilPlotObject : function () {};
        // 动画参数
        this.reversed = false;
        this.speed = 1;
        // 重置参数
        this.reset();
        // 状态
        this._updateGeometry = true;
        this._firstRender = true;
    }
    // 更新动画参数
    update() {}
    // 开始动画
    play() {
        if (this._updateGeometry) {
            this._updateGeometry = false;
            this.update();
        }
        if (this._firstRender) {
            this._firstRender = false;
            this.render(0.00001);
        }
        this.paused = false;
    }
    tick(time) {
        // 动画播放
        this.now = time;
        if (!this.startTime) this.startTime = this.now;
        const vTime = (this.now + (this.lastTime - this.startTime)) * this.speed;
        this.setInstanceProgress(vTime);
    }

    setInstanceProgress(engineTime) {
        const insDuration = this.duration;
        const insTimelineOffset = this.timelineOffset;
        const totalDuration = insDuration + insTimelineOffset;
        const insDelay = this.delay + insTimelineOffset;
        const insEndDelay = totalDuration - this.endDelay;
        const insTime = this.adjustTime(engineTime);

        this.currentTime = this.minMax(insTime, 0, totalDuration);

        if (!this.loopBegan && this.currentTime > 0) {
            this.loopBegan = true;
        }
        if ( insTime <= insDelay) {
            this.setAnimationsProgress(0);
        }
        if ((insTime >= insEndDelay && this.currentTime !== totalDuration) || !insDuration) {
            this.setAnimationsProgress(insDuration);
        }
        if (insTime > insDelay && insTime < insEndDelay) {
            this.setAnimationsProgress(insTime - insTimelineOffset);
        }

        if (engineTime >= totalDuration) {
            this.lastTime = 0;
            this.countIteration();
            if (!this.remaining) {
                this.paused = true;
                if (!this.completed) {
                    this.completed = true;
                }
            } else {
                this.startTime = this.now - insTimelineOffset / this.speed;
            }
        }
    }

    adjustTime(time) {
        const v = time - this.timelineOffset;
        if (v < 0) {
            return time;
        } else {
            return (this.reversed ? this.duration - v : v) + this.timelineOffset;
        }
    }

    minMax(val, min, max) {
        if (val === min) {
            return min;
        }
        if (val === max) {
            return max;
        }
        return Math.min(Math.max(val, min), max);
    }

    // 暂停动画
    pause() {
        this.paused = true;
        this.resetTime();
    }
    // 重置动画
    reset() {
        this.remaining = this.loop;
        this.paused = true;
        this.completed = false;
        this.timeSpace = 0;
        this.progress = 0;
        this.currentTime = 0;
        this.startTime = 0;
        this.lastTime = 0;
        this._updateGeometry = true;
        this._firstRender = true;
    }
    // 复位动画
    restore() {
        this.reset();
    }

    applyEasing(rate) {
        return easingFunc(this.easing)(rate);
    }

    setAnimationsProgress(time) {
        let rate = this.minMax(time / this.duration, 0, 1);
        rate = this.applyEasing(rate);
        // rate=parseFloat(rate.toFixed(5))
        // if(!rate || rate<10e-5) return;
        this.render(rate);
    }

    countIteration() {
        if (this.remaining && this.remaining !== true) {
            this.remaining--;
        }
    }

    seek(time) {
        this.currentTime=this.minMax(time, 0, this.timelineOffset + this.duration);
        this.resetTime();
    }

    setSpeed(speed) {
        this.speed = speed;
        if (!this.paused) {
            this.resetTime();
        }
    }

    resetTime() {
        this.startTime = 0;
        this.lastTime = this.adjustTime(this.currentTime) * (1 / this.speed);
    }
    
    exportOption(){
       const propertys= PlotBaseAnimation.cacheProperty.split(',')
       const object ={}
       
       propertys.forEach((s)=>{
           object[s]=this[s]
       })
       return object
    }

    isInAnimation(uid){
        if(!this.featureIds) return false;
        const v = this.featureIds.split(',')
        if(v.indexOf(uid)>-1){
            return true
        }
        return false
    }

    render(rate) {}
}

PlotBaseAnimation.cacheProperty='animationType,duration,featureIds,animationName,easing,delay,endDelay,loop,timelineOffset'