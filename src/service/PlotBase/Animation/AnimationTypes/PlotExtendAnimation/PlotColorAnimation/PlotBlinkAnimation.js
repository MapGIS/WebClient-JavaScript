/*
 * @Description: 闪烁动画类
 * @Author: zk
 * @Date: 2022-03-23 10:02:49
 * @LastEditors: zk
 * @LastEditTime: 2022-06-08 11:47:33
 */
import PlotColorAnimation from './PlotColorAnimation';
import { GradientColor } from '../../../utils/GradientColor';
import { AnimationUtil } from '../../../utils/AnimationUtil';

export default class PlotBlinkAnimation extends PlotColorAnimation {
    constructor(options) {
        super(options);
    }

    _initBaseAttributes(options) {
        super._initBaseAttributes(options);
        // animation type
        this.animationType = 'blink-animation';
        //init base options
        this.loop = AnimationUtil.defineValue(options.loop, 500);
        this.duration = AnimationUtil.defineValue(options.duration, 1000);
        // init options
        this.blinkColors = AnimationUtil.defineValue(options.blinkColors, []);
        this.isBlinkGrad = AnimationUtil.defineValue(options.isBlinkGrad, true);
        this.endStatus = AnimationUtil.defineValue(options.endStatus, true);
    }

    /**
     * @description: 根据颜色条和比例获取颜色
     * @param {*} colorArr
     * @param {*} rate
     * @return {*}
     */
    _calcColorArrByRate(colorArr, rate) {
        return new GradientColor(colorArr).getGradientColorByRate(rate);
    }
    /**
     * @description: 不进行颜色渐变
     * @param {*} colorArr
     * @param {*} rate
     * @return {*}
     */
    _calcColorArrByRateWithNoGrad(colorArr, rate) {
        const len = colorArr.length;
        if (len === 0) return;
        if (len === 1) return colorArr[0];
        const partRate = (1 / len).toFixed(3);
        const partIndex = rate === 1 ? len - 1 : Math.floor(rate / partRate);
        return colorArr[partIndex];
    }
    _applyColorByRate(colorItem, rate) {
        const keys = Object.keys(colorItem);
        let blinkColors = this.blinkColors;

        let color;
        // 数组为空，按绘制对象初始颜色进行闪烁
        if (blinkColors.length === 0) {
            color = null;
        } else {
            const lastColor = blinkColors[blinkColors.length - 1];
            if (!this.endStatus) {
                blinkColors = blinkColors.concat([this._calcColorRate(lastColor, 0)]);
            }
            color = this.isBlinkGrad ? this._calcColorArrByRate(blinkColors, rate) : this._calcColorArrByRateWithNoGrad(blinkColors, rate);
        }

        keys.forEach((s) => {
            if (Object.prototype.toString.call(colorItem[s]) === '[object Object]') {
                this._applyColorByRate(colorItem[s], rate);
            } else {
                colorItem[s] = color ? color : (this.isBlinkGrad ? this._calcColorRate(colorItem[s], rate) : colorItem[s]);
            }
        });
    }

    
    exportOption(){
        const object = super.exportOption()
        const propertys= PlotBlinkAnimation.cacheProperty.split(',')
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

PlotBlinkAnimation.cacheProperty='blinkColors,isBlinkGrad,endStatus'