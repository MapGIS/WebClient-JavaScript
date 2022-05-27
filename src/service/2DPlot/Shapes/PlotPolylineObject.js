import { fabric } from 'fabric';
import PlotObject from './PlotObject';
import Bounds from '../../PlotUtilBase/Geometry/Bound';
import { defined } from '../../PlotUtilBase/Check';
import GeomUtil from '../../PlotUtilBase/Geometry/GeomUtil';
import { colorRgba, rgbToRgba } from '../../PlotUtilBase/Color';
import Point from '../../PlotUtilBase/Geometry/Point';

const _ = require('lodash');

const PlotPolylineObject = fabric.util.createClass(PlotObject, {
    cornerColor: 'rgb(60,110,190)',
    borderColor: 'rgb(0,179,255)',
    borderWidth: 12,
    // 不能通过负值实现翻转
    lockScalingFlip: true,
    m_offsetX: 0,
    m_offsetY: 0,
    transparentCorners: false,
    objectCaching: true,
    // 缩放更新缓存
    noScaleCache: true,
    cornerStyle: 'circle',
    cornerStrokeColor: 'rgb(255,255,255)',
    padding: 10,
    baseSize: 2000000,
    originBaseX: 0,
    originBaseY: 0,
    setPnts(latlngs) {
        this.callSuper('setPnts', latlngs);
        this.innerInitControls();
        this.set('dirty', true);
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
            xMin = Math.min(xMin, pnt[0]);
            yMin = Math.min(yMin, pnt[1]);
            xMax = Math.max(xMax, pnt[0]);
            yMax = Math.max(yMax, pnt[1]);
        }

        return new Bounds(xMin, yMin, xMax, yMax);
    },

    _setBounds: function _setBounds(bounds) {
        const halfStrokeWid = this.strokeWidth / 2;

        this.set('width', bounds.right - bounds.left + this.strokeWidth);
        this.set('height', bounds.top - bounds.bottom + this.strokeWidth);

        this.set('top', bounds.bottom - halfStrokeWid);
        this.set('left', bounds.left - halfStrokeWid);

        this.m_offsetX = -this.left - this.width / 2;
        this.m_offsetY = -this.top - this.height / 2;

        this.setCoords();
    },
    dataToPoint: function dataToPoint() {
        this.callSuper('dataToPoint');
        // 设置缩放比例
        const scale = this.getMapScale();
        this._elem.changeAttributeStatus(false, scale, scale);
        this.setCoordsPoints();
    },
    setCoordsPoints: function setCoordsPoints() {
        this._elem.setPoints(this.m_coordsPx);
    },
    /**
     * @description: 修改调整的scale比例
     * @param {*} number
     * @return {*}
     */
    setAdjustScale: function setAdjustScale(number) {
        this._elem.setAdjustScale(number);
        this.set('dirty', true);
    },
    getMapScale: function getMapScale() {
        const pxSize = this.getCoordSys().getScale();
        const scale = pxSize / this.baseSize;
        return scale * this._elem.getAdjustScale();
    },
    setPntByindex(index, point) {
        const pnts = _.cloneDeep(this._elem.positions);
        const tempPnt = this.getCoordSys().pointToData([point.x, point.y]);
        pnts[index] = new Point(tempPnt[0], tempPnt[1]);
        this.setPnts(pnts);
    },

    _drawPath(ctx, style) {
        Object.keys(style).forEach((key) => {
            ctx[key] = style[key];
        });

        if (defined(style.strokeStyle) && style.strokeStyle !== '' && style.strokeStyle !== 'none') {
            ctx.stroke();
        }

        if (style.fillStyleType > 0 && defined(style.fillStyle) && style.fillStyle !== '' && style.fillStyle !== 'none') {
            if (style.fillStyleType === 2) {
                const { fillGradColor, fillStyle, fillGradType } = style;
                let grad;
                const boxArr = this.getCoords();
                const t1 = {
                    x: boxArr[0].x + this.m_offsetX,
                    y: boxArr[0].y + this.m_offsetY
                };
                const t2 = {
                    x: boxArr[2].x + this.m_offsetX,
                    y: boxArr[2].y + this.m_offsetY
                };
                if (fillGradType === 1) {
                    grad = ctx.createLinearGradient(t1.x, t1.y, t2.x, t2.y);
                } else {
                    let r1 = Math.abs(t1.x - t2.x) / 2;
                    let r2 = r1 * 0.2;
                    let center = {
                        x: t1.x + (t2.x - t1.x) / 2,
                        y: t1.y + (t2.y - t1.y) / 2
                    };
                    grad = ctx.createRadialGradient(center.x, center.y, r2, center.x, center.y, r1);
                }
                grad.addColorStop(0, fillStyle);
                grad.addColorStop(1, fillGradColor);
                ctx.fillStyle = grad;
            }
            if (defined(style.fillRuleStyle) && style.fillRuleStyle !== '') {
                ctx.fill(style.fillRuleStyle);
            } else {
                ctx.fill();
            }
        }
    },
    calcMapScaleLineWidth: function calcMapScaleLineWidth(lineWidth) {
        const scaleY = this._elem.getScale()[1];
        return lineWidth * scaleY;
    },
    _pointsToPath: function _pointsToPath(ctx, style, coords) {
        ctx.save();
        const pnts = coords.filter((s) => s.length !== 0);
        for (let j = 0; j < pnts.length; j += 1) {
            const tempPnts = pnts[j];
            const tempPntsLen = tempPnts.length;
            const startPnt = tempPnts[0];
            const endPnt = tempPnts[tempPntsLen - 1];
            ctx.beginPath();
            ctx.moveTo(tempPnts[0].x + this.m_offsetX, tempPnts[0].y + this.m_offsetY);
            for (let m = 1; m < tempPntsLen; m += 1) {
                ctx.lineTo(tempPnts[m].x + this.m_offsetX, tempPnts[m].y + this.m_offsetY);
            }
            if (GeomUtil.PointEqualFuzzy(startPnt.x, startPnt.y, endPnt.x, endPnt.y)) {
                ctx.closePath();
            }

            this._drawPath(ctx, style);
        }
        ctx.restore();
    },
    _comparePathStyle: function _comparePathStyle(svgStyle) {
        const {
            compareLine,
            compareLineWidth,
            compareLineColor,
            compareLineOpacity,
            lineWidth,
            fillStyle,
            strokeStyle,
            miterLimit,
            lineJoin,
            lineCap
        } = svgStyle;

        if (compareLine === 0) {
            return false;
        }

        let strokeLineWidth = compareLineWidth + lineWidth;
        let color = compareLineColor;

        if (color.includes('#')) {
            color = colorRgba(color, compareLineOpacity);
        } else {
            color = rgbToRgba(color, compareLineOpacity);
        }
        // 处理填充部分的衬线，如果衬线对应填充部分，则不需要添加基础线宽
        // 对于线划部分，需要加入基础宽度
        if ((strokeStyle === 'none' || strokeStyle === 'rgba(0,0,0,0)') && fillStyle && fillStyle !== 'none' && fillStyle !== 'rgba(0,0,0,0)') {
            strokeLineWidth = compareLineWidth;
        }

        return {
            lineWidth: strokeLineWidth,
            strokeStyle: color,
            miterLimit,
            lineJoin,
            lineCap
        };
    },
    setPositionByOrigin: function setPositionByOrigin(pos, originX, originY) {
        const preLeft = _.cloneDeep(this.left);
        const preTop = _.cloneDeep(this.top);
        this.callSuper('setPositionByOrigin', pos, originX, originY);
        this.moveBy(this.left - preLeft, this.top - preTop);
    },
    innerInitControls: function innerInitControls() {
        function polyLinePositionHandler(dim, finalMatrix, fabricObject) {
            const x = fabricObject.m_coordsPx[this.pointIndex].x + fabricObject.m_offsetX;
            const y = fabricObject.m_coordsPx[this.pointIndex].y + fabricObject.m_offsetY;

            return fabric.util.transformPoint(
                { x, y },
                fabric.util.multiplyTransformMatrices(fabricObject.canvas.viewportTransform, fabricObject.calcTransformMatrix())
            );
        }

        function actionHandler(eventData, transform, x, y) {
            const object = transform.target;
            // eslint-disable-next-line no-underscore-dangle
            const currentControl = object.controls[object.__corner];
            const mouseLocalPosition = object.toLocalPoint(new fabric.Point(x, y), 'center', 'center');
            // eslint-disable-next-line no-underscore-dangle
            const polygonBaseSize = object._getNonTransformedDimensions();
            // eslint-disable-next-line no-underscore-dangle
            const size = object._getTransformedDimensions(0, 0);
            const finalPointPosition = {
                x: (mouseLocalPosition.x * polygonBaseSize.x) / size.x - object.m_offsetX,
                y: (mouseLocalPosition.y * polygonBaseSize.y) / size.y - object.m_offsetY
            };

            object.setPntByindex(currentControl.pointIndex, finalPointPosition);

            object.set('dirty', true);
            return true;
        }

        function anchorWrapper(anchorIndex, fn) {
            // eslint-disable-next-line func-names
            return function (eventData, transform, x, y) {
                const fabricObject = transform.target;
                const absolutePoint = fabric.util.transformPoint(
                    {
                        x: fabricObject.m_coordsPx[anchorIndex].x + fabricObject.m_offsetX,
                        y: fabricObject.m_coordsPx[anchorIndex].y + fabricObject.m_offsetY
                    },
                    fabricObject.calcTransformMatrix()
                );
                const actionPerformed = fn(eventData, transform, x, y);
                // eslint-disable-next-line no-underscore-dangle
                // fabricObject._setPositionDimensions({})
                // eslint-disable-next-line no-underscore-dangle
                const polygonBaseSize = fabricObject._getNonTransformedDimensions();
                const newX = (fabricObject.m_coordsPx[anchorIndex].x + fabricObject.m_offsetX) / polygonBaseSize.x;
                const newY = (fabricObject.m_coordsPx[anchorIndex].y + fabricObject.m_offsetY) / polygonBaseSize.y;
                fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
                return actionPerformed;
            };
        }

        const lastControl = this.m_coordsPx.length - 1;
        this.controls = this.m_coordsPx.reduce((acc, point, index) => {
            acc['p' + index] = new fabric.Control({
                positionHandler: polyLinePositionHandler,
                actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
                actionName: 'modifyPolyline',
                pointIndex: index
            });
            return acc;
        }, {});
    }
});

fabric.PlotPolylineObject = PlotPolylineObject;
export default PlotPolylineObject;
