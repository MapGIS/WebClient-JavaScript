/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-18 15:08:54
 * @LastEditors: zk
 * @LastEditTime: 2022-06-13 19:14:58
 */
import { fabric } from 'fabric';
import PlotPolylineObject from '../PlotPolylineObject';

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
        style.lineWidth = lineWidth;
        this._pointsToPath(ctx, style, coords);
    },
    _comparePathElementRender: function _comparePathElementRender(ctx, coords) {
        const style = this._elem.getContextStyle();
        const lineWidth = this.calcMapScaleLineWidth(style.lineWidth);
        const { compareLine, compareLineWidth, compareLineColor, compareLineOpacity } = this._elem;
        const compareLineWidthMapScale = this.calcMapScaleLineWidth(compareLineWidth);

        const _compareStyle = this._comparePathStyle(
            Object.assign(style, {
                compareLine,
                compareLineWidth: compareLineWidthMapScale,
                compareLineColor,
                compareLineOpacity,
                lineWidth
            })
        );
        if (_compareStyle) {
            this._pointsToPath(ctx, _compareStyle, coords);
        }
    },
    _render(ctx) {
        const coords = this._elem.cacheCoords || this._elem.getCoords();
        this._comparePathElementRender(ctx, coords);
        this._pathElementRender(ctx, coords);
    }
});

fabric.PlotIrregularShape = PlotIrregularShape;
export default PlotIrregularShape;
