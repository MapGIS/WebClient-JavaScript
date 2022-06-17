/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-15 17:47:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-05-10 16:32:29
 */
import { fabric } from "fabric";
import  PlotRegularObject  from "./PlotRegularObject";
import { defined } from "../../../PlotUtilBase/Check";


const _ = require("lodash");

 const PlotRegularSurface = fabric.util.createClass(PlotRegularObject, {
  isCalcCompareLine:true,
  _drawPath(ctx, style) {
    
    Object.keys(style).forEach((key) => {
      ctx[key] = style[key];
    });

    if (defined(style.strokeStyle) && style.strokeStyle !== "") {
      ctx.stroke();
    }

    const canvas = this._elem._getFillCanvas();
    if (canvas&&canvas.height>0 && canvas.width>0 ) {
      // 创建CanvasPattern对象
      const pattern = ctx.createPattern(canvas, "repeat");
      // 将新创建的CanvasPattern对象赋值给fillStyle属性
      ctx.fillStyle = pattern;
    }
    if (defined(style.fillRuleStyle) && style.fillRuleStyle !== "") {
      ctx.fill(style.fillRuleStyle);
    } else {
      ctx.fill();
    }
  },
});

fabric.PlotRegularSurface = PlotRegularSurface;
export default PlotRegularSurface