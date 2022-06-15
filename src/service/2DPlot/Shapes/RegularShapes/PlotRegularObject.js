/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-17 16:12:55
 * @LastEditors: zk
 * @LastEditTime: 2022-06-14 11:13:58
 */

import { fabric } from 'fabric';
import PlotPolylineObject from '../PlotPolylineObject';
import { lineString } from '@turf/helpers';
import lineOffset from '@turf/line-offset';
import { Vector2 } from '../../../PlotUtilBase/Math/Vector2';
import FontStyle from '../../../PlotUtilBase/FontClass';
const _ = require('lodash');

const PlotRegularObject = fabric.util.createClass(PlotPolylineObject, {
    type: 'plotregular',
    extendstyleAttributes: ['text'],
    hasBorders: true,
    isCalcCompareLine: false,
    _calcBounds: function _calcBounds(ctx) {
        const boundingBox = this._elem.getBounds();
        this.m_coordsPx.forEach((t) => {
            boundingBox.addPnt(t.x, t.y);
        });
        return boundingBox;
    },
    _pathElementRender: function _pathElementRender(ctx) {
        const paths = [];
        this._elem.getPathElem(paths);
        for (let i = 0; i < paths.length; i += 1) {
            const tempPath = paths[i];
            const style = tempPath.getContextStyle();
            const lineWidth = this.calcMapScaleLineWidth(style.lineWidth);
            const _pnts = tempPath.cacheCoords || tempPath.getCoords();
            this._pointsToPath(ctx, Object.assign(style, { lineWidth }), _pnts);
        }
    },
    _comparePathElementRender: function _comparePathElementRender(ctx) {
        const paths = [];
        this._elem.getPathElem(paths);
        const { compareLine, compareLineWidth, compareLineColor, compareLineOpacity } = this._elem;
        for (let i = 0; i < paths.length; i += 1) {
            const tempPath = paths[i];
            const svgStyle = tempPath.getContextStyle();
            const compareLineWidthByMap = this.calcMapScaleLineWidth(compareLineWidth);
            const lineWidth = this.calcMapScaleLineWidth(svgStyle.lineWidth);
            const _compareStyle = this._comparePathStyle(
                Object.assign(svgStyle, {
                    compareLine,
                    compareLineWidth: compareLineWidthByMap,
                    compareLineColor,
                    compareLineOpacity,
                    lineWidth
                })
            );
            if (!_compareStyle) continue;

            const _pnts = tempPath.cacheCoords || tempPath.getCoords();

            const halfWidth = _compareStyle.lineWidth / 2;

            let truePnts = _pnts;

            if (this.isCalcCompareLine) {
                if (compareLine === 1) {
                    truePnts = this._pntsOffset(_pnts, -halfWidth + compareLineWidthByMap / 4);
                    _compareStyle.lineWidth = compareLineWidthByMap / 2;
                } else if (compareLine === 2) {
                    truePnts = this._pntsOffset(_pnts, halfWidth - compareLineWidthByMap / 4);
                    _compareStyle.lineWidth = compareLineWidthByMap / 2;
                }
            }

            this._pointsToPath(ctx, _compareStyle, truePnts);
        }
    },
    // 点组偏移 lineoffset
    _pntsOffset: function _pntsOffset(pnts, offset) {
        const lines = [];
        pnts.forEach((t) => {
            const line = lineString(t.map((s) => [s.x, s.y]));
            lines.push(lineOffset(line, offset, { units: 'degrees' }));
        });
        const truePnts = lines.map((s) => {
            return s.geometry.coordinates.map((t) => new Vector2(t[0], t[1]));
        });
        return truePnts;
    },
    _spanElementRender: function _spanElementRender(ctx) {
        const spans = [];
        this._elem.getSpanElem(spans);
        for (let i = 0; i < spans.length; i += 1) {
            const elem = spans[i];
            ctx.save();
            const style = elem.getContextStyle();

            const fontString = new FontStyle(style.fontStyle, style.fontVariant, style.fontWeight, style.fontSize, style.fontFamily).toString();

            delete style.FontStyle;
            delete style.fontVariant;
            delete style.fontWeight;
            delete style.fontSize;
            delete style.fontFamily;

            Object.keys(style).forEach((key) => {
                ctx[key] = style[key];
            });

            ctx.font = fontString;

            ctx.translate(this.m_offsetX, this.m_offsetY);
            const matrix = elem._getMatrix();
            const transformMatrix = elem._getTransform();

            const tureMatrix = transformMatrix.clone().multiply(matrix);

            const element = tureMatrix.elements;

            ctx.transform(element[0], element[1], element[3], element[4], element[6], element[7]);
            const text = elem.getText();
            const { width } = ctx.measureText(text);
            const pos = elem.getPos(width);

            if (style.fillStyle && style.fillStyle !== 'none' && style.fillStyle !== '') {
                ctx.fillText(text, pos.x, pos.y);
            }

            if (style.strokeStyle && style.strokeStyle !== 'none' && style.strokeStyle !== '') {
                ctx.strokeText(text, pos.x, pos.y);
            }
            ctx.restore();
        }
    },
    isNotVisible() {
        return this.callSuper('isNotVisible') || this._elem.positions.length < 2;
    },
    _render(ctx) {
        this._comparePathElementRender(ctx);
        this._pathElementRender(ctx);
        this._spanElementRender(ctx);
    }
});

fabric.PlotRegularObject = PlotRegularObject;
export default PlotRegularObject;
