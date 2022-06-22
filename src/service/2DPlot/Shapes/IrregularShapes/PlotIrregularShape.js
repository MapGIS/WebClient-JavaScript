/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-18 15:08:54
 * @LastEditors: zk
 * @LastEditTime: 2022-06-22 10:16:55
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
    _calcStrokeOrFillGeometry(coords) {
        // 非规则符号使用外部设置函数进行控制点填充
        const strokeCoords = this._elem.applyFuncToStorkeGeometry(coords);
        // 非规则符号使用完整几何进行填充
        const fillCoords= this._elem.applyFuncToFillGeometry(coords);
        return { strokeCoords, fillCoords };
    },
    _pathElementRender: function _pathElementRender(ctx, coords) {
        const style = this._elem.getContextStyle();
        const lineWidth = this.calcMapScaleLineWidth(style.lineWidth);
        style.lineWidth = lineWidth;

        const { strokeCoords, fillCoords } = this._calcStrokeOrFillGeometry(coords);
        this._pointsToPath(ctx, style, strokeCoords, fillCoords);
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
            const { strokeCoords, fillCoords } = this._calcStrokeOrFillGeometry(coords);
            this._pointsToPath(ctx, style, strokeCoords, fillCoords);
        }
    },

    _pointsToPath: function _pointsToPath(ctx, style, strokeCoords, fillCoords) {
        //    stroke
        ctx.save();
        const strokeCoordsPnts = strokeCoords.filter((s) => s.length !== 0);
        for (let j = 0; j < strokeCoordsPnts.length; j += 1) {
            const tempPnts = strokeCoordsPnts[j];
            const tempPntsLen = tempPnts.length;
            ctx.beginPath();
            ctx.moveTo(tempPnts[0].x + this.m_offsetX, tempPnts[0].y + this.m_offsetY);
            for (let m = 1; m < tempPntsLen; m += 1) {
                ctx.lineTo(tempPnts[m].x + this.m_offsetX, tempPnts[m].y + this.m_offsetY);
            }
            this._drawPath(ctx, Object.assign({},style, { fillStyle: 'none' }));
        }
        ctx.restore();

        // fill
        ctx.save();
        const fillPnts = fillCoords.filter((s) => s.length !== 0);
        for (let j = 0; j < fillPnts.length; j += 1) {
            const tempPnts = fillPnts[j];
            const tempPntsLen = tempPnts.length;
            ctx.beginPath();
            ctx.moveTo(tempPnts[0].x + this.m_offsetX, tempPnts[0].y + this.m_offsetY);
            for (let m = 1; m < tempPntsLen; m += 1) {
                ctx.lineTo(tempPnts[m].x + this.m_offsetX, tempPnts[m].y + this.m_offsetY);
            }
            this._drawPath(ctx, Object.assign({},style, { strokeStyle: 'none' }));
        }
        ctx.restore();
    },
    _render(ctx) {
        const coords = this._elem.cacheCoords || this._elem.getCoords();
        this._comparePathElementRender(ctx, coords);
        this._pathElementRender(ctx, coords);
    }
});

fabric.PlotIrregularShape = PlotIrregularShape;
export default PlotIrregularShape;
