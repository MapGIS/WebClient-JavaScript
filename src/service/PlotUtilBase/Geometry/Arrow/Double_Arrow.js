import { PlotUtils } from '../PoltUtils';
import MathUtil from '../../Util/MathUtil';
import GeomUtil from '../GeomUtil';

export default class DoubleArrow {
    constructor(points) {
        this.points = points;
        this.headHeightFactor = 0.25;
        this.headWidthFactor = 0.3;
        this.neckHeightFactor = 0.85;
        this.neckWidthFactor = 0.15;
        this.connPoint = null;
        this.tempPoint4 = null;
    }

    insertPoints(points) {
        const count = points.length;
        if (count <= 2) {
            return [this.points];
        }
        const pnts = points;

        const pnt1 = pnts[0].slice(0);
        const pnt2 = pnts[1].slice(0);
        const pnt3 = pnts[2].slice(0);

        const pointCount = this.getPointCount();

        if (pointCount === 3) {
            this.tempPoint4 = this.getTempPoint4(pnt1, pnt2, pnt3);
        } else {
            // eslint-disable-next-line prefer-destructuring
            this.tempPoint4 = pnts[3];
        }

        if (pointCount === 3 || pointCount === 4) {
            const _connPoint = GeomUtil.SegMid(pnt1, pnt1);
            const connPoint = [_connPoint.x, _connPoint.y];
            this.connPoint = connPoint;
        } else {
            this.connPoint = pnts[4].slice(0);
        }

        let leftArrowPnts;
        let rightArrowPnts;
        if (PlotUtils.isClockWise(pnt1, pnt2, pnt3)) {
            leftArrowPnts = this.getArrowPoints(pnt1, this.connPoint, this.tempPoint4, false);
            rightArrowPnts = this.getArrowPoints(this.connPoint, pnt2, pnt3, true);
        } else {
            leftArrowPnts = this.getArrowPoints(pnt2, this.connPoint, pnt3, false);
            rightArrowPnts = this.getArrowPoints(this.connPoint, pnt1, this.tempPoint4, true);
        }
        const m = leftArrowPnts.length;
        const t = (m - 5) / 2;

        const llBodyPnts = leftArrowPnts.slice(0, t);
        const lArrowPnts = leftArrowPnts.slice(t, t + 5);
        let lrBodyPnts = leftArrowPnts.slice(t + 5, m);

        let rlBodyPnts = rightArrowPnts.slice(0, t);
        const rArrowPnts = rightArrowPnts.slice(t, t + 5);
        const rrBodyPnts = rightArrowPnts.slice(t + 5, m);

        rlBodyPnts = PlotUtils.getBezierPoints(rlBodyPnts);
        const bodyPnts = PlotUtils.getBezierPoints(rrBodyPnts.concat(llBodyPnts.slice(1)));
        lrBodyPnts = PlotUtils.getBezierPoints(lrBodyPnts);

        const ALLpnts = [rlBodyPnts, rArrowPnts, bodyPnts, lArrowPnts, lrBodyPnts];

        return ALLpnts;
    }

    getPoints() {
        return this.insertPoints(this.points);
    }

    getPointCount() {
        return this.points.length;
    }

    getArrowPoints(pnt1, pnt2, pnt3, clockWise) {
        const _midPnt = GeomUtil.SegMid(pnt1, pnt2);
        const midPnt = [_midPnt.x, _midPnt.y];
        const len = GeomUtil.Distance(midPnt, pnt3);
        let midPnt1 = PlotUtils.getThirdPoint(pnt3, midPnt, 0, len * 0.3, true);
        let midPnt2 = PlotUtils.getThirdPoint(pnt3, midPnt, 0, len * 0.5, true);
        // var midPnt3=PlotUtils.getThirdPoint(pnt3, midPnt, 0, len * 0.7, true);
        midPnt1 = PlotUtils.getThirdPoint(midPnt, midPnt1, MathUtil.HALF_PI, len / 5, clockWise);
        midPnt2 = PlotUtils.getThirdPoint(midPnt, midPnt2, MathUtil.HALF_PI, len / 4, clockWise);

        const points = [midPnt, midPnt1, midPnt2, pnt3];
        // 计算箭头部分
        const arrowPnts = this.getArrowHeadPoints(points);
        const neckLeftPoint = arrowPnts[0];
        const neckRightPoint = arrowPnts[4];
        // 计算箭身部分
        const tailWidthFactor = GeomUtil.Distance(pnt1, pnt2) / PlotUtils.getBaseLength(points) / 2;
        const bodyPnts = this.getArrowBodyPoints(points, neckLeftPoint, neckRightPoint, tailWidthFactor);
        const n = bodyPnts.length;
        let lPoints = bodyPnts.slice(0, n / 2);
        let rPoints = bodyPnts.slice(n / 2, n);
        lPoints.push(neckLeftPoint);
        rPoints.push(neckRightPoint);
        lPoints = lPoints.reverse();
        lPoints.push(pnt2);
        rPoints = rPoints.reverse();
        rPoints.push(pnt1);
        return lPoints.reverse().concat(arrowPnts, rPoints);
    }

    getArrowHeadPoints(points) {
        const len = PlotUtils.getBaseLength(points);
        const headHeight = len * this.headHeightFactor;
        const headPnt = points[points.length - 1];

        const headWidth = headHeight * this.headWidthFactor;
        const neckWidth = headHeight * this.neckWidthFactor;
        const neckHeight = headHeight * this.neckHeightFactor;
        const headEndPnt = PlotUtils.getThirdPoint(points[points.length - 2], headPnt, 0, headHeight, true);
        const neckEndPnt = PlotUtils.getThirdPoint(points[points.length - 2], headPnt, 0, neckHeight, true);
        const headLeft = PlotUtils.getThirdPoint(headPnt, headEndPnt, MathUtil.HALF_PI, headWidth, false);
        const headRight = PlotUtils.getThirdPoint(headPnt, headEndPnt, MathUtil.HALF_PI, headWidth, true);
        const neckLeft = PlotUtils.getThirdPoint(headPnt, neckEndPnt, MathUtil.HALF_PI, neckWidth, false);
        const neckRight = PlotUtils.getThirdPoint(headPnt, neckEndPnt, MathUtil.HALF_PI, neckWidth, true);
        return [neckLeft, headLeft, headPnt, headRight, neckRight];
    }

    getArrowBodyPoints(points, neckLeft, neckRight, tailWidthFactor) {
        const allLen = GeomUtil.PolylinDistance(points);
        const len = PlotUtils.getBaseLength(points);
        const tailWidth = len * tailWidthFactor;
        const neckWidth = GeomUtil.Distance(neckLeft, neckRight);
        const widthDif = (tailWidth - neckWidth) / 2;
        let tempLen = 0;
        const leftBodyPnts = [];
        const rightBodyPnts = [];
        for (let i = 1; i < points.length - 1; i += 1) {
            const angle = PlotUtils.getAngleOfThreePoints(points[i - 1], points[i], points[i + 1]) / 2;
            tempLen += GeomUtil.Distance(points[i - 1], points[i]);
            const w = (tailWidth / 2 - (tempLen / allLen) * widthDif) / Math.sin(angle);
            const left = PlotUtils.getThirdPoint(points[i - 1], points[i], Math.PI - angle, w, true);
            const right = PlotUtils.getThirdPoint(points[i - 1], points[i], angle, w, false);
            leftBodyPnts.push(left);
            rightBodyPnts.push(right);
        }
        return leftBodyPnts.concat(rightBodyPnts);
    }

    // 计算对称点
    getTempPoint4(linePnt1, linePnt2, point) {
        const _minPnt = GeomUtil.SegMid(linePnt1, linePnt2);
        const midPnt = [_minPnt.x, _minPnt.y];
        const len = GeomUtil.Distance(midPnt, point);
        const angle = PlotUtils.getAngleOfThreePoints(linePnt1, midPnt, point);
        let symPnt;
        let distance1;
        let distance2;
        let mid;
        if (angle < MathUtil.HALF_PI) {
            distance1 = len * Math.sin(angle);
            distance2 = len * Math.cos(angle);
            mid = PlotUtils.getThirdPoint(linePnt1, midPnt, MathUtil.HALF_PI, distance1, false);
            symPnt = PlotUtils.getThirdPoint(midPnt, mid, MathUtil.HALF_PI, distance2, true);
        } else if (angle >= MathUtil.HALF_PI && angle < Math.PI) {
            distance1 = len * Math.sin(Math.PI - angle);
            distance2 = len * Math.cos(Math.PI - angle);
            mid = PlotUtils.getThirdPoint(linePnt1, midPnt, MathUtil.HALF_PI, distance1, false);
            symPnt = PlotUtils.getThirdPoint(midPnt, mid, MathUtil.HALF_PI, distance2, false);
        } else if (angle >= Math.PI && angle < Math.PI * 1.5) {
            distance1 = len * Math.sin(angle - Math.PI);
            distance2 = len * Math.cos(angle - Math.PI);
            mid = PlotUtils.getThirdPoint(linePnt1, midPnt, MathUtil.HALF_PI, distance1, true);
            symPnt = PlotUtils.getThirdPoint(midPnt, mid, MathUtil.HALF_PI, distance2, true);
        } else {
            distance1 = len * Math.sin(Math.PI * 2 - angle);
            distance2 = len * Math.cos(Math.PI * 2 - angle);
            mid = PlotUtils.getThirdPoint(linePnt1, midPnt, MathUtil.HALF_PI, distance1, true);
            symPnt = PlotUtils.getThirdPoint(midPnt, mid, MathUtil.HALF_PI, distance2, false);
        }
        return symPnt;
    }
}
