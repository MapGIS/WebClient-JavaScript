/*
 * @Description: 显隐动画类
 * @Author: zk
 * @Date: 2022-03-23 10:02:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-04-01 15:46:12
 */
import PlotBaseAnimation from "./PlotBaseAnimation";
import AnimationColorUtil from "../utils/ColorUtil";
import { AnimationUtil, is } from "../utils/AnimationUtil";

const _ = require("lodash");
export default class PlotVisibleAnimation extends PlotBaseAnimation {
  constructor(options) {
    super(options);
    // animation type
    this._animationType = "visible-animation";

    this._init();
  }
  _init() {
    // options
    const attributes = this._plotObjects.map((s) => {
      return s.toGeoJSON().properties;
    });
    const copyAttributes = attributes.map((s) => JSON.parse(JSON.stringify(s)));

    this._applyColorItems(attributes, copyAttributes);

    this._copyAttributes = copyAttributes;
  }
  _applyColorItems(baseAttributes, copyAttributes) {
    baseAttributes.forEach((s, index) => {
      const keys = Object.keys(s);
      const copyAttribute = copyAttributes[index];
      keys.forEach((k) => {
        if (is.col(s[k])) {
        } else if (Object.prototype.toString.call(s[k]) === "[object Object]") {
          this._applyColorItems([s[k]], [copyAttribute[k]]);
        } else {
          delete copyAttribute[k];
        }
      });
    });
  }
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
  _setColorV(obj, rate) {
    const keys = Object.keys(obj);
    keys.forEach((s) => {
      if (Object.prototype.toString.call(obj[s]) === "[object Object]") {
        this._setColorV(obj[s], rate);
      } else {
        obj[s] = this._calcColorRate(obj[s], rate);
      }
    });
  }
  _getColorItemByRate(rate) {
    const colorItems = JSON.parse(JSON.stringify(this._copyAttributes));
    colorItems.forEach((s) => {
      this._setColorV(s, rate);
    });
    return colorItems;
  }
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
  render(rate) {
    const colorItems = this._getColorItemByRate(rate);
    this._setColorItems(colorItems)
    this.handRefresh()
  }
}
