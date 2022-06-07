/*
 * @Description: 显隐动画类
 * @Author: zk
 * @Date: 2022-03-23 10:02:49
 * @LastEditors: zk
 * @LastEditTime: 2022-06-07 15:41:34
 */
import { AnimationUtil } from '../../../utils/AnimationUtil';
import PlotColorAnimation from './PlotColorAnimation';

const _ = require('lodash');
export default class PlotVisibleAnimation extends PlotColorAnimation {
    constructor(options) {
        super(options);
    }
    _initBaseAttributes(options) {
        super._initBaseAttributes(options);
        // animation type
        this.animationType = 'visible-animation';
        // init options
        this.endStatus = AnimationUtil.defineValue(options.endStatus, false);
    }

    _applyColorByRate(colorItem, rate) {
        const keys = Object.keys(colorItem);
        keys.forEach((s) => {
            if (Object.prototype.toString.call(colorItem[s]) === '[object Object]') {
                this._applyColorByRate(colorItem[s], rate);
            } else {
                const colorRate = this.endStatus ? 1 - rate : rate;
                colorItem[s] = this._calcColorRate(colorItem[s], colorRate);
            }
        });
    }

    exportOption(){
        const object = super.exportOption()
        const propertys= PlotVisibleAnimation.cacheProperty.split(',')
        propertys.forEach((s)=>{
            object[s]=this[s]
        })
        return object
    }


    render(rate) {
        const colorItems = this._getColorItemByRate(rate);
        this._setColorItems(colorItems);
    }
}

PlotVisibleAnimation.cacheProperty='endStatus'