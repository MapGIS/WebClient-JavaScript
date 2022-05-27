/*
 * @Author: your name
 * @Date: 2021-07-05 11:32:52
 * @LastEditTime: 2022-05-27 11:43:25
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlot\src\js\Shapes\PlotObject.js
 */
import Point from '../../PlotUtilBase/Geometry/Point';
import { fabric } from 'fabric';
import Bounds from '../../PlotUtilBase/Geometry/Bound';
import { defined } from '../../PlotUtilBase/Check';

const _ = require('lodash');
const PlotUtilLine = fabric.util.createClass(fabric.Object, {
    fill: null,
    strokeLineJoin: 'round',
    strokeWidth:20,
    strokeStyle:"#00ff00",
    lineWidth:20,
    initialize: function initialize(options) {
        this.callSuper('initialize', options);
        this.canvas = options.canvas;
        this.m_coords = options.coords || [];
        this.m_coordsPx = [];
        this.isExtendPlotObject = false;
    },
    setPnts(latlngs) {
        this.m_coords = latlngs;
        this.dataToPoint();
        this.set('dirty', true);
    },
    getCoordSys: function getCoordSys() {
        return this.canvas.getCoordSys();
    },
    dataToPoint: function dataToPoint() {
        debugger
        const coordSys = this.getCoordSys();
        const positions = this.m_coords;
        this.m_coordsPx = [];
        for (let i = 0; i < positions.length; i += 1) {
            const pntPx = coordSys.dataToPoint([positions[i].x, positions[i].y]);
            this.m_coordsPx.push(new Point(pntPx[0], pntPx[1]));
        }
    },
    setBounds: function setBounds(ctx) {
        this._setBounds(this._calcBounds(ctx));
    },
    // eslint-disable-next-line no-unused-vars
    _calcBounds: function _calcBounds(ctx) {
        let xMin = Number.POSITIVE_INFINITY;
        let yMin = Number.POSITIVE_INFINITY;
        let xMax = Number.NEGATIVE_INFINITY;
        let yMax = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < this.m_coordsPx.length; i += 1) {
            const pnt = this.m_coordsPx[i];
            xMin = Math.min(xMin, pnt.x);
            yMin = Math.min(yMin, pnt.y);
            xMax = Math.max(xMax, pnt.x);
            yMax = Math.max(yMax, pnt.y);
        }

        return new Bounds(xMin, yMin, xMax, yMax);
    },

    _setBounds: function _setBounds(bounds) {
        const halfStrokeWid = this.strokeWidth / 2;
        this.set('top', bounds.bottom - halfStrokeWid);
        this.set('left', bounds.left - halfStrokeWid);
        this.set('width', bounds.right - bounds.left + this.strokeWidth);
        this.set('height', bounds.top - bounds.bottom + this.strokeWidth);

        this.m_offsetX = -this.left - this.width / 2;
        this.m_offsetY = -this.top - this.height / 2;
        this.setCoords();
    },
    // eslint-disable-next-line no-unused-vars
    moveBy: function moveBy(moveX, moveY) {
        const coordSys = this.getCoordSys();
        const coords = [];
        const coordPx = this.m_coordsPx;

        for (let i = 0; i < coordPx.length; i += 1) {
            coordPx[i].x += moveX;
            coordPx[i].y += moveY;
        }

        for (let i = 0; i < coordPx.length; i += 1) {
            const latlng = coordSys.pointToData([coordPx[i].x, coordPx[i].y]);
            coords.push(new Point(latlng[0], latlng[1]));
        }

        this.setPnts(coords);
    },
    getPlotCanvas: function getPlotCanvas() {
        return this.canvas;
    },
    render: function render(ctx) {
        if (this.isNotVisible()) {
            return;
        }
        this.dataToPoint();
        this.setBounds(ctx);
        this.callSuper('render', ctx);
    },
    _render(ctx) {
        if (this.m_coordsPx.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(this.m_coordsPx[0].x + this.m_offsetX, this.m_coordsPx[0].y + this.m_offsetY);
        for (let i = 0; i < this.m_coordsPx.length; i += 1) {
            const point = this.m_coordsPx[i];
            ctx.lineTo(point.x + this.m_offsetX, point.y+ this.m_offsetY);
        }
        
        this._drawPath(ctx,{strokeStyle:"#ff00ff",lineWidth:6})
    },
    _createStyleObject(){
    },
    _drawPath(ctx, style) {
        Object.keys(style).forEach((key) => {
            ctx[key] = style[key];
        });

        if (defined(style.strokeStyle) && style.strokeStyle !== '' && style.strokeStyle !== 'none') {
            ctx.stroke();
        }
    },
});
fabric.PlotUtilLine = PlotUtilLine;
export default PlotUtilLine;
