/*
 * @Description: 动画基础类
 * @Author: zk
 * @Date: 2022-03-23 10:02:49
 * @LastEditors: zk
 * @LastEditTime: 2022-06-30 15:52:51
 */
import { AnimationUtil } from '../utils/AnimationUtil';
import { easingFunc } from '../utils/Easing';
export default class PlotBaseAnimation {
    constructor(options) {
        this._initBaseAttributes(options);
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
        this.featureIds = options.featureIds;
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
        // 允许动画作用
        this._allowAnimation = false;
    }
    /**
     * @function: Module:PlotBaseAnimation.prototype.update
     * @description:更新动画参数
     * @return {*}
     */
    update() {
        if (Array.isArray(this._plotObjects) && this._plotObjects.length === 0) {
            this._plotObjects = this.featureIds
                .split(',')
                .map((t) => {
                    const s = this.getPlotObjectById(t);
                    return s;
                })
                .filter((b) => b);
        }
    }
    /**
     * @function: Module:PlotBaseAnimation.prototype.play
     * @description:开始动画
     * @return {*}
     */
    play() {
        this.updateGeometry();
        this.paused = false;
    }

    /**
     * @function: Module:PlotBaseAnimation.prototype.tick
     * @description: 步长函数
     * @param {number} time 时间节点
     * @return {*}
     */
    tick(time) {
        // 动画播放
        this.now = time;
        if (!this.startTime) this.startTime = this.now;
        const vTime = (this.now + (this.lastTime - this.startTime)) * this.speed;
        this.setInstanceProgress(vTime);
    }

    /**
     * @function: Module:PlotBaseAnimation.prototype.setInstanceProgress
     * @description: 设置动画进度
     * @param {*} engineTime
     * @return {*}
     */
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
        if (insTime <= insTimelineOffset ) {
            return;
        }

        if(insTime <= insDelay && this.remaining>1){
            this.setAnimationsProgress(0);
        }

        if (insTime >= insEndDelay) {
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

    /**
     * @function:  Module:PlotBaseAnimation.prototype.pause
     * @description: 暂停
     * @return {*}
     */
    pause() {
        this.paused = true;
        this.resetTime();
    }

    /**
     * @function: Module:PlotBaseAnimation.prototype.reset
     * @description: 重置
     * @return {*}
     */
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
    }

    /**
     * @function: Module:PlotBaseAnimation.prototype.restore
     * @description: 复位
     * @return {*}
     */
    restore() {
        this.updateGeometry();
        this.reset();
    }

    /**
     * @function: Module:PlotBaseAnimation.prototype.setAnimationsProgress
     * @description: 设置动画绘制进度
     * @param {*} time
     * @return {*}
     */
    setAnimationsProgress(time) {
        let rate = this.minMax(time / this.duration, 0, 1);
        rate = this.applyEasing(rate);
        this.render(rate);
    }

    /**
     * @function: Module:PlotBaseAnimation.prototype.countIteration
     * @description: 计算循环次数
     * @return {*}
     */
    countIteration() {
        if (this.remaining && this.remaining !== true) {
            this.remaining--;
        }
    }

    /**
     * @function: Module:PlotBaseAnimation.prototype.countIteration
     * @description: 跳转
     * @param {*} time
     * @return {*}
     */
    seek(time) {
        this.updateGeometry();
        this.setInstanceProgress(time);
        if (!this.paused) {
            this.resetTime();
        }
    }

    /**
     * @function: Module:PlotBaseAnimation.prototype.setSpeed
     * @description: 设置速率
     * @param {number} speed
     * @return {*}
     */
    setSpeed(speed) {
        this.speed = speed;
        if (!this.paused) {
            this.resetTime();
        }
    }

    /**
     * @function: Module:PlotBaseAnimation.prototype.resetTime
     * @description: 重置当前时间
     * @return {*}
     */
    resetTime() {
        this.startTime = 0;
        this.lastTime = this.adjustTime(this.currentTime) * (1 / this.speed);
    }

    /**
     * @function: Module:PlotBaseAnimation.prototype.exportOption
     * @description: 导出options
     * @return {*}
     */
    exportOption() {
        const propertys = PlotBaseAnimation.cacheProperty.split(',');
        const object = {};

        propertys.forEach((s) => {
            object[s] = this[s];
        });
        return object;
    }

    /**
     * @function: Module:PlotBaseAnimation.prototype.render
     * @description:实际绘制比率
     * @param {number} rate
     * @return {*}
     */
    render(rate) {}

    /** util */
    adjustTime(time) {
        const v = time - this.timelineOffset;
        if (v < 0) {
            return time;
        } else {
            return (this.reversed ? this.duration - v : v) + this.timelineOffset;
        }
    }
    applyEasing(rate) {
        return easingFunc(this.easing)(rate);
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

    isInAnimation(uid) {
        if (!this.featureIds) return false;
        const v = this.featureIds.split(',');
        if (v.indexOf(uid) > -1) {
            return true;
        }
        return false;
    }
    resetGeometryStatus() {
        this.render(0.000001);
    }
    updateGeometry() {
        if (this._updateGeometry) {
            this._updateGeometry = false;
            this.update();
            // this.render(0.00001);
        }
    }
}

PlotBaseAnimation.cacheProperty = 'animationType,duration,featureIds,animationName,easing,delay,endDelay,loop,timelineOffset';
