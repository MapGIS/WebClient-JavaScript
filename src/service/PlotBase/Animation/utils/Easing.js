/*
 * @Description: 速率类
 * @Author: zk
 * @Date: 2022-04-24 16:04:58
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-04-25 11:00:13
 */
import {AnimationUtil} from './AnimationUtil'
const baseEasings = ['Linear','Sine', 'Circ', 'Bounce', 'Elastic'];

export function easingFunc(type){
  if(baseEasings.indexOf(type)===-1)return FunctionEasings.Linear();
  return FunctionEasings[type]()
}
export const FunctionEasings = {
    Linear: () => t => t,
    Sine: () => t => 1 - Math.cos(t * Math.PI / 2),
    Circ: () => t => 1 - Math.sqrt(1 - t * t),
    Bounce: () => t => {
      let pow2, b = 4;
      while (t < (( pow2 = Math.pow(2, --b)) - 1) / 11) {};
      return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow(( pow2 * 3 - 2 ) / 22 - t, 2)
    },
    Elastic: (amplitude = 1, period = .5) => {
      const a = AnimationUtil.minMax(amplitude, 1, 10);
      const p = AnimationUtil.minMax(period, .1, 2);
      return t => {
        return (t === 0 || t === 1) ? t : 
          -a * Math.pow(2, 10 * (t - 1)) * Math.sin((((t - 1) - (p / (Math.PI * 2) * Math.asin(1 / a))) * (Math.PI * 2)) / p);
      }
    }
  }