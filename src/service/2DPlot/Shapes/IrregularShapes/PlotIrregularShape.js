/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-18 15:08:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-05-12 15:52:44
 */
import { fabric } from "fabric";
import  PlotPolylineObject  from "../PlotPolylineObject";

 const PlotIrregularShape = fabric.util.createClass(PlotPolylineObject, {
  hasBorders: false,
  _calcBounds: function _calcBounds(ctx) {
    const boundingBox = this._elem.getBounds();
    this.m_coordsPx.forEach((t) => {
      boundingBox.addPnt(t.x, t.y);
    });
    return boundingBox;
  },
  _pathElementRender: function _pathElementRender(ctx, coords) {
    const style = this._elem.getContextStyle();
    const lineWidth = this.calcMapScaleLineWidth(style.lineWidth);
    this._pointsToPath(ctx, { ...style, lineWidth }, coords);
  },
  _comparePathElementRender: function _comparePathElementRender(ctx, coords) {
    const style = this._elem.getContextStyle();
    const lineWidth = this.calcMapScaleLineWidth(style.lineWidth);
    const {
      compareLine,
      compareLineWidth,
      compareLineColor,
      compareLineOpacity,
    } = this._elem;
    const compareLineWidthMapScale =
      this.calcMapScaleLineWidth(compareLineWidth);
    const _compareStyle = this._comparePathStyle({
      compareLine,
      compareLineWidth: compareLineWidthMapScale,
      compareLineColor,
      compareLineOpacity,
      ...style,
      lineWidth,
    });
    if (_compareStyle) {
      this._pointsToPath(ctx, _compareStyle, coords);
    }
  },
  _render(ctx) {
    const coords = this._elem.cacheCoords || this._elem.getCoords();
    this._comparePathElementRender(ctx, coords);
    this._pathElementRender(ctx, coords);
  },
});

fabric.PlotIrregularShape = PlotIrregularShape;
export default PlotIrregularShape