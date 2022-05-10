/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-15 17:47:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-05-10 16:34:23
 */
import { fabric } from "fabric";
import  PlotRegularObject  from "./PlotRegularObject";


const PlotKidneyarea = fabric.util.createClass(PlotRegularObject, {
  isCalcCompareLine:true
});

fabric.PlotKidneyarea = PlotKidneyarea;
export default PlotKidneyarea