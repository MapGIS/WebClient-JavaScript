/*
 * @Description: 时间轴
 * @Author: zk
 * @Date: 2022-03-23 11:53:45
 * @LastEditors: zk
 * @LastEditTime: 2022-06-08 10:52:19
 */

import { AnimationReg } from '../AnimationTypes';
export default class TimeLine {
    constructor(layerGroup, options) {
        this._layerGroup = layerGroup;
        this._timeLineName = options.timeLineName || '';
        // 动画对象的队列
        this._animationArr = [];
        // 初始化
        this.initLayerGroupFunction(layerGroup);
        // 时间轴选项
        this.invert = false;
        this.speed = 1;
        this.raf = null;
    }

    initLayerGroupFunction(layerGroup) {
        this.handleRender = layerGroup.requestRenderAll ? layerGroup.requestRenderAll.bind(layerGroup) : () => {};
        this.getPlotObjectById = layerGroup.getPlotObjectById
            ? layerGroup.getPlotObjectById.bind(layerGroup)
            : () => {
                  return null;
              };
        this.drawUtilPlotObject = layerGroup.drawUtilPlotObject
            ? layerGroup.drawUtilPlotObject.bind(layerGroup)
            : () => {
                  return null;
              };
        this.removeDrawUtilPlotObject = layerGroup.removeDrawUtilPlotObject
            ? layerGroup.removeDrawUtilPlotObject.bind(layerGroup)
            : () => {
                  return null;
              };
    }
    _getAnimationObject(item) {
        const animation = AnimationReg.getAnimation(item.animationType);

        const plotObjects = item.featureIds
            .split(',')
            .map((t) => {
                const s = this._layerGroup.getPlotObjectById(t);
                return s;
            })
            .filter((b) => b);

        const animate = new animation({
            ...item,
            plotObjects,
            getPlotObjectById: this.getPlotObjectById.bind(this),
            drawUtilPlotObject: this.drawUtilPlotObject,
            removeDrawUtilPlotObject: this.removeDrawUtilPlotObject
        });
        return animate;
    }

    play() {
        this.resetTime();
        this.animationAction((t) => t.play())();
        this.handleRender();
        const activeInstances = this._animationArr.concat([]);
        const that = this;
        const engine = (function () {
            function start() {
                that.raf = requestAnimationFrame(step);
            }
            function step(t) {
                let activeInstancesLength = activeInstances.length;
                if (activeInstancesLength) {
                    let i = 0;
                    while (i < activeInstancesLength) {
                        const activeInstance = activeInstances[i];
                        if (!activeInstance.paused) {
                            activeInstance.tick(t);
                        } else {
                            const instanceIndex = activeInstances.indexOf(activeInstance);
                            if (instanceIndex > -1) {
                                activeInstances.splice(instanceIndex, 1);
                                activeInstancesLength = activeInstances.length;
                            }
                        }
                        i++;
                    }
                    that.handleRender();
                    start();
                } else {
                    that.raf = cancelAnimationFrame(that.raf);
                }
            }
            return start;
        })();
        engine();
    }
    pause() {
        this.animationAction((t) => t.pause())();
    }

    clear() {
        this._animationArr = [];
        this.restore();
    }

    toJson() {
        const animationOptions = this._animationArr.map((ani) => ani.exportOption());
        const t = {
            timeLineName: this._timeLineName,
            animations: animationOptions
        };
        return t;
    }

    getAnimationById(id) {
        return this._animationArr.filter((v) => v.isInAnimation(id));
    }

    addAnimationObject(item) {
        const addAnimation = this._getAnimationObject(item);
        this._animationArr.push(addAnimation);
        return addAnimation;
    }

    removeAnimation(animation) {
        const i = this._animationArr.indexOf(animation);
        if (i > -1) {
            const ani = this._animationArr[i];
            ani.paused = true;
            ani.restore();
            this._animationArr.splice(i, 1);
        }
    }

    fromJSON(json) {
        if (!json || !json.animations) return;
        this._timeLineName = json.timeLineName;
        this._animationArr = json.animations.map((s) => {
            return this._getAnimationObject(s);
        });
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
    seek(time) {
        this.animationAction((s) => {
            s.seek(time);
        })();
        this.handleRender();
    }

    setSpeed(speed) {
        if (speed < 0) return;
        this.speed = speed;
        this.animationAction((s) => s.setSpeed(speed))();
    }
    getSpeed() {
        return this.speed;
    }
    // new
    resetTime() {
        this.animationAction((s) => s.resetTime())();
    }
    reversed(flag) {
        this.animationAction((s) => (s.reversed = flag))();
        this.resetTime();
    }
    restore() {
        this.reversed(false);
        this.setSpeed(1);
        this.animationAction((t) => t.restore())();
        this.handleRender();
    }
}
