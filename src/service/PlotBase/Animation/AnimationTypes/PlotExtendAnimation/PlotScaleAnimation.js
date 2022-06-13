/*
 * @Description:
 * @Author: zk
 * @Date: 2022-04-19 10:53:30
 * @LastEditors: zk
 * @LastEditTime: 2022-06-07 15:40:07
 */
import { AnimationUtil } from '../../utils/AnimationUtil';
import PlotBaseAnimation from '../PlotBaseAnimation';

export default class PlotScaleAnimation extends PlotBaseAnimation {
    constructor(options) {
        super(options);
    }
    _initBaseAttributes(options) {
        super._initBaseAttributes(options);
        // animation type
        this.animationType = 'scale-animation';
        // init options
        this.scaleRateArr = AnimationUtil.defineValue(options.scaleRateArr, [1, 2, 1]);
    }

    exportOption(){
        const object = super.exportOption()
        const propertys= PlotScaleAnimation.cacheProperty.split(',')
        propertys.forEach((s)=>{
            object[s]=this[s]
        })
        return object
    }
    
    restore() {
        super.restore();
        this._plotObjects.forEach((obj) => {
            obj.setAdjustScale(1);
        });
    }
    render(rate) {
        const currentAdjust = AnimationUtil.getNumberRate(this.scaleRateArr, rate);
        this._plotObjects.forEach((obj) => {
            obj.setAdjustScale(currentAdjust);
        });
    }
}
PlotScaleAnimation.cacheProperty='scaleRateArr'