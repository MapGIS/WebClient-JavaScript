/*
 * @Description: 属性动画类
 * @Author: zk
 * @Date: 2022-03-23 10:02:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-04-01 15:46:20
 */
import AnimationUtil from "../utils/AnimationUtil";
import GradientColor from "../utils/GradientColor";
import PlotBaseAnimation from "./PlotBaseAnimation";

export default class PlotAttributeAnimation extends PlotBaseAnimation {
  constructor(options) {
    super(options);
    this._attrsItems = this.resloveAttrsItems(options.attrsItems);
    // animation type
    this._animationType = "attribute-animation";
    // copy attributes
    this._copyAttributes = this._plotObjects.map((s) => s.toGeoJSON().properties);
  }
  resloveAttrsItems(attrsItems) {
    if (!attrsItems) return [];
    return attrsItems.map((s) => {
      const arr = s.split("_");
      return this.sloveItemByType(arr[3], arr[0], arr[1], arr[2]);
    });
  }
  sloveItemByType(resloveType, ids, type, valStr) {
    const that = this;
    let item = {};
    if (resloveType === "number") {
      item.ids = ids;
      item.type = type;
      item.getRateValue = function (rate) {
        return that.rateToNum(valStr, rate);
      };
    }else if(resloveType==='color'){
      item.ids = ids;
      item.type = type;
      item.getRateValue = function (rate) {
        return that.rateToColor(valStr, rate);
      };
    }
    return item;
  }
  rateToNum(str, rate) {
    const arr = str.split(",").map((s) => parseFloat(s));
    if (arr.length === 0) new Error("动画参数错误！");
    if (arr.length === 1) return arr[0];
    return AnimationUtil.getNumberRate(arr,rate)
  }
  rateToColor(str, rate) {
    const colorArr=str.split(',')
    return new GradientColor(colorArr).getGradientColorByRate(rate)
  }
  restore(){
    super.restore()
    this._plotObjects.forEach((s,index)=>{
      const geoJson= s.toGeoJSON()
      geoJson.properties=this._copyAttributes[index]
      s.fromGeoJSON(geoJson)
    })
  }
  render(rate) {
    this._plotObjects.forEach((s) => {
      this._attrsItems.forEach((item) => {
        const t = item.getRateValue(rate);
        s.setValue(item.type, t, item.ids);
      });
    });
    this.handRefresh();
  }
}