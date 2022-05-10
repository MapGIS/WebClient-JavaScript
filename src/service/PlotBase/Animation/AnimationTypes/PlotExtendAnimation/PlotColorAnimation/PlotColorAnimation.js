/*
 * @Description: 对象颜色动画类
 * @Author: zk
 * @Date: 2022-03-23 10:02:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-04-20 15:46:57
 */
import { PlotBaseAnimation } from "../../PlotBaseAnimation";
import { AnimationColorUtil } from "../../../utils/ColorUtil";
import { is } from "../../../utils/AnimationUtil";

export class PlotColorAnimation extends PlotBaseAnimation {
  constructor(options) {
    super(options);
    // animation type
    this.animationType = "color-animation";
    this._init();
  }
  _init() {
    // options
    const attributes = this._plotObjects.map((s) => {
      return s.toGeoJSON().properties;
    });
    const copyAttributes = attributes.map((s) => JSON.parse(JSON.stringify(s)));

    // 获取所有颜色对象
    this._cacheColorItems(attributes, copyAttributes);
    // 将颜色值缓存
    this._copyAttributes = copyAttributes;
  }
  /**
   * @description: 缓存颜色节点
   * @param {*} baseAttributes
   * @param {*} copyAttributes
   * @return {*}
   */
  _cacheColorItems(baseAttributes, copyAttributes) {
    baseAttributes.forEach((s, index) => {
      const keys = Object.keys(s);
      const copyAttribute = copyAttributes[index];
      keys.forEach((k) => {
        if (is.col(s[k])) {
        } else if (Object.prototype.toString.call(s[k]) === "[object Object]") {
          this._cacheColorItems([s[k]], [copyAttribute[k]]);
        } else {
          delete copyAttribute[k];
        }
      });
    });
  }

  /**
   * @description: 计算单个颜色的中间值
   * @param {*} color
   * @param {*} rate
   * @return {*}
   */
  _calcColorRate(color, rate) {
    const v = AnimationColorUtil.transRgba(AnimationColorUtil.getRgba(color));
    if (!(typeof v === "string")) {
      let a = v.a * rate;
      if (a === 0) {
        a = 0;
      } else if (a >= 1) {
        a = 1;
      }
      v.a = a;
      const hex = AnimationColorUtil.colorHex(
        "rgba(" + v.r + "," + v.g + "," + v.b + "," + v.a + ")"
      );
      return hex;
    } else {
      return v;
    }
  }
  /**
   * @description: 根据比率修改颜色对象的中间值
   * @param {*} colorItem
   * @param {*} rate
   * @return {*}
   */
  _applyColorByRate(colorItem, rate) {
    const keys = Object.keys(colorItem);
    keys.forEach((s) => {
      if (Object.prototype.toString.call(colorItem[s]) === "[object Object]") {
        this._applyColorByRate(colorItem[s], rate);
      } else {
        colorItem[s] = this._calcColorRate(colorItem[s], colorRate);
      }
    });
  }
  /**
   * @description: 根据比率获取修改后的颜色对象
   * @param {*} rate
   * @return {*}
   */
  _getColorItemByRate(rate) {
    const colorItems = JSON.parse(JSON.stringify(this._copyAttributes));
    colorItems.forEach((colorItem) => {
      this._applyColorByRate(colorItem, rate);
    });
    return colorItems;
  }

  /**
   * @description: 扁平化颜色对象（根据颜色条和比例获取颜色）
   * @param {*} colorItems
   * @return {*}
   */
  _flatColorItems(colorItems){
    const v=[]
    const nodes= colorItems.symbolNodes
    if(nodes){
      const keys= Object.keys(nodes)
      keys.forEach((s)=>{
        Object.keys(nodes[s]).forEach((h)=>{
           v.push({
             type:h,
             value:nodes[s][h],
             ids:s,
           })
        })
      })
      delete colorItems.symbolNodes
    }
    const domModAttributes=colorItems.domModAttributes
    if(domModAttributes){
      const keys= Object.keys(domModAttributes)
      keys.forEach((s)=>{
        v.push({
          type:s,
          value:domModAttributes[s]
        })
      })
      delete colorItems.domModAttributes
    }
    const keys= Object.keys(colorItems)
    keys.forEach((s)=>{
      v.push({
        type:s,
        value:colorItems[s]
      })
    })
    return v
  }
  /**
   * @description: 作用颜色对象
   * @param {*} colorItems
   * @return {*}
   */
  _setColorItems(colorItems){
    colorItems.forEach((s, index) => {
      const plotObj = this._plotObjects[index];
      const v= this._flatColorItems(s)    
      v.forEach((s)=>{
        plotObj.setValue(s.type, s.value, s.ids);
      })
    });
  }
  restore(){
    super.restore()
    const colorItems = JSON.parse(JSON.stringify(this._copyAttributes));
    this._setColorItems(colorItems)
  }

}
