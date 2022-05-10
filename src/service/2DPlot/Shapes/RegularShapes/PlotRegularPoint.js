/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-15 17:47:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-05-10 16:32:53
 */
import { fabric } from "fabric";
import  PlotRegularObject  from "./PlotRegularObject";

const _ = require("lodash");

const PlotRegularPoint = fabric.util.createClass(PlotRegularObject, {
  hasBorders: true,
  innerInitControls: function innerInitControls() {
    return true;
  },
  fromGeoJSON(geoJson) {
    this.callSuper("fromGeoJSON", geoJson);
    const elem = this._elem;
    const [x, y] = elem.getTranSize();
    this.angle = elem.tranAngle;
    this.set("scaleX", x);
    this.set("scaleY", y);
    this.set("dirty", true);
  },
  _render(ctx) {
    if (this.m_coordsPx.length < 1 || !this._elem.show) return;
    this._comparePathElementRender(ctx);
    this._pathElementRender(ctx);
    this._spanElementRender(ctx);
  },
});

fabric.PlotRegularPoint = PlotRegularPoint;
export default PlotRegularObject