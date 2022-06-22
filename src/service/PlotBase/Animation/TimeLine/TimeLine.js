/*
 * @Description: 时间轴
 * @Author: zk
 * @Date: 2022-03-23 11:53:45
 * @LastEditors: zk
 * @LastEditTime: 2022-06-17 19:58:03
 */

import { AnimationReg } from '../AnimationTypes';
export default class TimeLine {
    constructor(layerGroup, options) {
        this._layerGroup = layerGroup;
        this._timeLineName = options.timeLineName || '';
        // 动画对象的队列
        this._animationArr = [];
        // 初始化图层组方法
        this.initLayerGroupFunction(layerGroup);
        //-- 时间轴选项 -
        // 反转
        this.invert = false;
        // 速率
        this.speed = 1;
        // 请求raf
        this.raf = null;
        // 是否重新刷新动画队列
        // this._refreshAnimationList = false;
        // 统一设置初始状态
        this._initGeometryStatus=false
    }

    /**
     * @function: Module:TimeLine.prototype.initLayerGroupFunction
     * @description: 初始化动画所需的图层组函数
     * @param {Object} layerGroup
     * @return {*}
     */
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
    /**
     * @function: Module:TimeLine.prototype.createAnimationObject
     * @description: 根据动画options创建动画对象
     * @param {Object} item
     * @return {*}
     */
    createAnimationObject(item) {
        const animation = AnimationReg.getAnimation(item.animationType);
        const plotObjects = item.featureIds
            .split(',')
            .map((t) => {
                const s = this._layerGroup.getPlotObjectById(t);
                return s;
            })
            .filter((b) => b);

        if (!animation) {
            throw new Error('动画类型错误！');
        }

        const animate = new animation(
            Object.assign(item, {
                plotObjects,
                getPlotObjectById: this.getPlotObjectById.bind(this),
                drawUtilPlotObject: this.drawUtilPlotObject,
                removeDrawUtilPlotObject: this.removeDrawUtilPlotObject
            })
        );
        return animate;
    }

    /**
     * @function: Module:TimeLine.prototype.play
     * @description: 播放
     * @return {*}
     */
    play() {
        // 重置当前时间
        this.resetTime();
        // 修改动画状态
        this.animationAction((t) => t.play())();
        // 动画对象默认从rate=0处开始
        if(this._initGeometryStatus){
            this._initGeometryStatus=false
            this.animationAction((t) => t.resetGeometryStatus())();
        }
        // 强制刷新
        this.handleRender();
        let activeInstances = this._animationArr.concat([]);
        const that = this;
        const engine = (function () {
            function start() {
                that.raf = requestAnimationFrame(step);
            }
            function step(t) {
                // 重新刷新动画队列
                // if (that._refreshAnimationList) {
                //     activeInstances = that._animationArr.concat([]);
                //     activeInstances.forEach((ani) => {
                //         ani.play();
                //     });
                //     that._refreshAnimationList = false;
                // }

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
    /**
     * @function: Module:TimeLine.prototype.pause
     * @description: 暂停
     * @return {*}
     */
    pause() {
        this.animationAction((t) => t.pause())();
    }

    /**
     * @function: Module:TimeLine.prototype.clear
     * @description: 清理
     * @return {*}
     */
    clear() {
        this._animationArr = [];
        this.restore();
    }

    /**
     * @function: Module:TimeLine.prototype.toJSON
     * @description: 导出动画列表json对象
     * @return {*}
     */
    toJSON() {
        const animationOptions = this._animationArr.map((ani) => ani.exportOption());
        const t = {
            timeLineName: this._timeLineName,
            animations: animationOptions
        };
        return t;
    }
    /**
     * @function: Module:TimeLine.prototype.fromJSON
     * @description:
     * @param {*} json
     * @return {*}
     */
    fromJSON(json) {
        if (!json || !json.animations) return;
        this._timeLineName = json.timeLineName;
        this._animationArr = json.animations.map((s) => {
            return this.createAnimationObject(s);
        });
    }

    /**
     * @function: Module:TimeLine.prototype.getAnimationById
     * @description:根据动画id获取动画对象
     * @param {string} id
     * @return {*}
     */
    getAnimationById(id) {
        return this._animationArr.filter((v) => v.isInAnimation(id));
    }

    // /**
    //  * @function: Module:TimeLine.prototype.addAnimationObject
    //  * @description: 添加动画对象
    //  * @param {*} plotObjects
    //  * @param {*} item
    //  * @return {*}
    //  */
    // addAnimationObject(plotObjects,item) {
    //     if(!plotObjects || plotObjects.length===0) return;
    //     const animationOptions= Object.assign({},item)
    //     const keyString= plotObjects.map((s)=>{
    //         return  s.getElement().getFeatureId()
    //     }).toString()
    //     animationOptions.featureIds=keyString
    //     const addAnimation = this.createAnimationObject(animationOptions);
    //     this._animationArr.push(addAnimation);
    //     return addAnimation;
    // }

    addAnimationObject(item) {
        const addAnimation = this.createAnimationObject(item);
        this._animationArr.push(addAnimation);
        return addAnimation;
    }

    /**
     * @function: Module:TimeLine.prototype.removeAnimation
     * @description: 移除动画
     * @param {*} animation
     * @return {*}
     */
    removeAnimation(animation) {
        const i = this._animationArr.indexOf(animation);
        if (i > -1) {
            const ani = this._animationArr[i];
            ani.paused = true;
            ani.restore();
            this._animationArr.splice(i, 1);
        }
    }

    /**
     * @function: Module:TimeLine.prototype.animationAction
     * @description: 自定义动画作用函数
     * @param {*} func
     * @return {*}
     */
    animationAction(func) {
        const that = this;
        return function () {
            that._animationArr.forEach((ani) => {
                func(ani);
            });
        };
    }

    /**
     * @function: Module:TimeLine.prototype.seek
     * @description: 跳转
     * @param {*} time
     * @return {*}
     */
    seek(time) {
        this.pause()
        this.animationAction((s) => {
            s.seek(time);
        })();
        this.handleRender();
        this._refreshAnimationList = true;
    }

    /**
     * @function: Module:TimeLine.prototype.setSpeed
     * @description: 设置速率
     * @param {*} speed
     * @return {*}
     */
    setSpeed(speed) {
        if (speed < 0) return;
        this.speed = speed;
        this.animationAction((s) => s.setSpeed(speed))();
    }

    /**
     * @function: Module:TimeLine.prototype.getSpeed
     * @description: 获取速率
     * @return {*}
     */
    getSpeed() {
        return this.speed;
    }
    /**
     * @function: Module:TimeLine.prototype.getTotalTime
     * @description: 获取总时间
     * @return {*}
     */
    getTotalTime() {
        let totalTime = 0;
        this.animationAction((a) => {
            const s = a.timelineOffset + a.duration * a.loop;
            if (s > totalTime) {
                totalTime = s;
            }
        })();
        return totalTime;
    }

    /**
     * @function: Module:TimeLine.prototype.resetTime
     * @description: 重置时间
     * @return {*}
     */
    resetTime() {
        this.animationAction((s) => s.resetTime())();
    }

    /**
     * @function: Module:TimeLine.prototype.reversed
     * @description: 反转（正放或倒放）
     * @param {*} flag
     * @return {*}
     */
    reversed(flag) {
        this.animationAction((s) => (s.reversed = flag))();
        this.resetTime();
    }

    /**
     * @function: Module:TimeLine.prototype.restore
     * @description: 复位
     * @return {*}
     */
    restore() {
        this._initGeometryStatus=true
        this.reversed(false);
        this.setSpeed(1);
        this.animationAction((t) => t.restore())();
        this.handleRender();
    }
}
