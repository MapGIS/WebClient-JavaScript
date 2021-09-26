import { Common } from '@mapgis/webclient-es6-service';
const { Zondy } = Common;
import {Shape} from './Shape';
import {SmicPolygon} from './SmicPolygon';
import {SUtil} from './SUtil';

/**
 * @private
 * @class  Zondy.LevelRenderer.SmicBrokenLine
 * @classdesc 折线(ic)。
 * @extends Zondy.LevelRenderer.Shape
 * @example
 *   var shape = new Zondy.LevelRenderer.SmicBrokenLine({
 *         style: {
 *             pointList: [[0, 0], [100, 100], [100, 0]],
 *             smooth: 'bezier',
 *             strokeColor: 'purple'
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 */
class SmicBrokenLine extends Shape {

    /**
     * @member {Object} Zondy.LevelRenderer.SmicBrokenLine.prototype.style
     * @description 绘制样式。
     *
     * @param {Array} pointList - 节点数组，二维数组。默认值：null，必设参数。其形式如下：
     * (code)
     * (start code)
     *  [
     *  [10, 20],         //单个节点
     *  [30, 40],
     *  [25, 30]
     *   ]
     * (end)
     * @param {string} smooth - 是否做平滑插值, 平滑算法可以选择 "bezier", "spline"。默认值："";
     * @param {number} smoothConstraint - 平滑约束。
     * @param {string} strokeColor - 描边颜色。默认值："#000000'"。
     * @param {string} lineCape - 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * @param {number} lineWidth - 描边宽度。默认值：1。
     * @param {number} opacity - 绘制透明度。默认值：1。
     * @param {number} shadowBlur - 阴影模糊度，大于0有效。默认值：0。
     * @param {number} shadowColor - 阴影颜色。默认值："#000000'"。
     * @param {number} shadowOffsetX - 阴影横向偏移。默认值：0。
     * @param {number} shadowOffsetY - 阴影纵向偏移。默认值：0。
     * @param {string} text - 图形中的附加文本。默认值：""。
     * @param {string} textColor - 文本颜色。默认值："#000000'"。
     * @param {string} textFont - 附加文本样式。示例:'bold 18px verdana'。
     * @param {string} textPosition - 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * @param {string} textAlign - 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * @param {string} textBaseline - 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    /**
     * @function Zondy.LevelRenderer.SmicBrokenLine.constructor
     * @description 构造函数。
     *
     * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * @member {string}  Zondy.LevelRenderer.SmicBrokenLine.prototype.brushTypeOnly
         * @description 线条只能描边。
         */
        this.brushTypeOnly = 'stroke';

        /**
         * @member {string} Zondy.LevelRenderer.SmicBrokenLine.prototype.textPosition
         * @description 文本位置。
         */
        this.textPosition = 'end';

        /**
         * @member {string} Zondy.LevelRenderer.SmicBrokenLine.prototype.type
         * @description 图形类型.
         */
        this.type = 'smicbroken-line';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        this.CLASS_NAME = "Zondy.LevelRenderer.Shape.SmicBrokenLine";
    }

    /**
     * @function Zondy.LevelRenderer.SmicBrokenLine.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.brushTypeOnly = null;
        this.textPosition = null;
        this.type = null;

        super.destroy();
    }

    /**
     * @function Zondy.LevelRenderer.SmicBrokenLine.prototype.buildPath
     * @description 创建折线路径。
     *
     * @param {CanvasRenderingContext2D} ctx - Context2D 上下文。
     * @param {Object} style - style。
     *
     */
    buildPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        var __OP = this.refOriginalPosition;

        var pointList = style.pointList;
        if (pointList.length < 2) {
            // 少于2个点就不画了~
            return;
        }

        var len = Math.min(style.pointList.length, Math.round(style.pointListLength || style.pointList.length));

        if (style.smooth && style.smooth !== 'spline') {
            var controlPoints = SUtil.SUtil_smoothBezier(pointList, style.smooth, false, style.smoothConstraint, __OP);

            ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
            var cp1;
            var cp2;
            var p;
            for (let i = 0; i < len - 1; i++) {
                cp1 = controlPoints[i * 2];
                cp2 = controlPoints[i * 2 + 1];
                p = [pointList[i + 1][0] + __OP[0], pointList[i + 1][1] + __OP[1]];
                ctx.bezierCurveTo(
                    cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                );
            }
        } else {
            if (style.smooth === 'spline') {
                pointList = SUtil.SUtil_smoothSpline(pointList, null, null, __OP);
                len = pointList.length;
            }
            if (!style.lineType || style.lineType === 'solid') {
                // 默认为实线
                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i < len; i++) {
                    ctx.lineTo(pointList[i][0] + __OP[0], pointList[i][1] + __OP[1]);
                }
            } else if (style.lineType === 'dashed'
                || style.lineType === 'dotted'
                || style.lineType === 'dot'
                || style.lineType === 'dash'
                || style.lineType === 'longdash'
            ) {
                let dashLength = (style.lineWidth || 1);
                let pattern1 = dashLength;
                let pattern2 = dashLength;

                //dashed
                if (style.lineType === 'dashed') {
                    pattern1 *= 5;
                    pattern2 *= 5;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }

                //dotted
                if (style.lineType === 'dotted') {
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 = 1;
                        pattern2 += dashLength;
                    }
                }

                //dot
                if (style.lineType === 'dot') {
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 = 1;
                        pattern2 += dashLength;
                    }
                }

                //dash
                if (style.lineType === 'dash') {
                    pattern1 *= 4;
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }

                //longdash
                if (style.lineType === 'longdash') {
                    pattern1 *= 8;
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }

                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (var i = 1; i < len; i++) {
                    SUtil.SUtil_dashedLineTo(
                        ctx,
                        pointList[i - 1][0] + __OP[0], pointList[i - 1][1] + __OP[1],
                        pointList[i][0] + __OP[0], pointList[i][1] + __OP[1],
                        dashLength,
                        [pattern1, pattern2]
                    );
                }
            } else if (style.lineType === 'dashot'
                || style.lineType === 'longdashdot'
            ) {
                let dashLength = (style.lineWidth || 1);
                let pattern1 = dashLength;
                let pattern2 = dashLength;
                let pattern3 = dashLength;
                let pattern4 = dashLength;

                //dashot
                if (style.lineType === 'dashot') {
                    pattern1 *= 4;
                    pattern2 *= 4;
                    pattern4 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                        pattern3 = 1;
                        pattern4 += dashLength;
                    }
                }

                //longdashdot
                if (style.lineType === 'longdashdot') {
                    pattern1 *= 8;
                    pattern2 *= 4;
                    pattern4 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                        pattern3 = 1;
                        pattern4 += dashLength;
                    }
                }

                dashLength = (style.lineWidth || 1)
                    * (style.lineType === 'dashed' ? 5 : 1);
                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i < len; i++) {
                    SUtil.SUtil_dashedLineTo(
                        ctx,
                        pointList[i - 1][0] + __OP[0], pointList[i - 1][1] + __OP[1],
                        pointList[i][0] + __OP[0], pointList[i][1] + __OP[1],
                        dashLength,
                        [pattern1, pattern2, pattern3, pattern4]
                    );
                }
            }

        }
        return;
    }

    /**
     * @function Zondy.LevelRenderer.SmicBrokenLine.prototype.getRect
     * @description 计算返回折线包围盒矩形。该包围盒是直接从四个控制点计算，并非最小包围盒。
     *
     * @param {Object} style - style
     * @return {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;
        return SmicPolygon.prototype.getRect.apply(this, [style, __OP]);
    }

    /**
     * @function Zondy.LevelRenderer.Shape.prototype.brush
     * @description 绘制图形。
     *
     * @param {CanvasRenderingContext2D} ctx - Context2D 上下文。
     * @param {boolean} isHighlight - 是否使用高亮属性。
     * @param {Function} updateCallback - 需要异步加载资源的 shape 可以通过这个 callback(e),让painter更新视图，base.brush 没用，需要的话重载 brush。
     */
    brush(ctx, isHighlight) {

        var style = this.beforeBrush(ctx, isHighlight);

        ctx.beginPath();
        this.buildPath(ctx, style);

        switch (style.brushType) {
          /* jshint ignore:start */
            case 'both':
                this.setCtxGlobalAlpha(ctx, "fill", style);
                //ctx.fill();
                if (style.lineWidth > 0) {
                    this.setCtxGlobalAlpha(ctx, "stroke", style);
                    ctx.stroke();
                }
                this.setCtxGlobalAlpha(ctx, "reset", style);
                break;
            case 'stroke':
                this.setCtxGlobalAlpha(ctx, "stroke", style);
                style.lineWidth > 0 && ctx.stroke();
                this.setCtxGlobalAlpha(ctx, "reset", style);
                break;
          /* jshint ignore:end */
            default:
                this.setCtxGlobalAlpha(ctx, "fill", style);
                //ctx.fill();
                this.setCtxGlobalAlpha(ctx, "reset", style);
                break;
        }

        this.drawText(ctx, style, this.style);

        this.afterBrush(ctx);
    }
}

export {SmicBrokenLine};
Zondy.LevelRenderer.SmicBrokenLine = SmicBrokenLine;
