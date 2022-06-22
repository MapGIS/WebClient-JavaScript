/*
 * @class:
 * @Description: 燕尾进攻符号建模
 * @Author: zk
 * @Date: 2022-06-13 11:35:38
 * @LastEditors: zk
 * @LastEditTime: 2022-06-22 10:34:37
 */
import { PlotUtils } from '../PoltUtils';
import AttackArrow from './Attack_Arrow';
import MathUtil from '../../Util/MathUtil';

export default class TailedSquadArrow extends AttackArrow {
    constructor(props) {
        super(props);
        this.headHeightFactor = 0.18;
        this.headWidthFactor = 0.3;
        this.neckHeightFactor = 0.85;
        this.neckWidthFactor = 0.15;
        this.tailWidthFactor = 0.1;
        this.swallowTailFactor = 1;
        this.swallowTailPnt = null;
    }

    insertPoints(points) {
        var count = points.length;
        if (count < 2) {
            return [points];
        }
        var pnts = points
        //有时用户移动过快或者过慢，_onMouseMove捕获到的坐标会和onTouch捕获到的坐标一样。
        //为了防止这种事情发生：
        if (pnts[pnts.length - 1][1] == pnts[pnts.length - 2][1] && pnts[pnts.length - 1][2] == pnts[pnts.length - 2][2]) {
            return [points];
        }
        var tailPnts = this.getTailPoints(pnts);
        var headPnts = this.getArrowHeadPoints(pnts, tailPnts[0], tailPnts[2]);
        var neckLeft = headPnts[0];
        var neckRight = headPnts[4];
        var bodyPnts = this.getArrowBodyPoints(pnts, neckLeft, neckRight, this.tailWidthFactor);
        var bodycount = bodyPnts.length;
        var leftPnts = [tailPnts[0]].concat(bodyPnts.slice(0, bodycount / 2));
        leftPnts.push(neckLeft);
        var rightPnts = [tailPnts[2]].concat(bodyPnts.slice(bodycount / 2, bodycount));
        rightPnts.push(neckRight);

        leftPnts = PlotUtils.getQBSplinePoints(leftPnts);
        rightPnts = PlotUtils.getQBSplinePoints(rightPnts);

        return [leftPnts,headPnts, rightPnts.reverse(), [rightPnts[rightPnts.length-1],tailPnts[1], leftPnts[0]]]
    }

    getTailPoints(points) {
        var allLen = PlotUtils.getBaseLength(points);
        var tailWidth = allLen * this.tailWidthFactor;
        var tailLeft = PlotUtils.getThirdPoint(points[1], points[0], MathUtil.HALF_PI, tailWidth, false);
        var tailRight = PlotUtils.getThirdPoint(points[1], points[0], MathUtil.HALF_PI, tailWidth, true);
        var len = tailWidth * this.swallowTailFactor;
        var swallowTailPnt = PlotUtils.getThirdPoint(points[1], points[0], 0, len, true);
        return [tailLeft, swallowTailPnt, tailRight];
    }
}
