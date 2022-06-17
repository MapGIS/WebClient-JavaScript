import MathUtil from "../../Util/MathUtil";
import GeomUtil from "../GeomUtil";
import PlottingUtil from "./PlottingUtil";
import ArrowUtil from "./ArrowUtil";
import BaseArrow from "./BaseArrow";

/**
 * 突击箭头
 */
export default class AssaultArrow extends BaseArrow {
  constructor(options) {
    super(options);
    this.mScaleValues = [];
    this.mScaleValues.push(...[0.2, 0.2, 0.4, 0.4, 0.1, 0.2, 0.1, 0.2, 1, 1]);
  }

  generateArrowPnts() {
    const shapePts = [];
    let leftBodyPts = [];
    const rightBodyPts = [];
    let arrowHeadPts = [];
    const clonePnts = GeomUtil.PolylinClone(this.mCtrlPnts);
    const arrowBody = ArrowUtil.generateArrowBody(
      this.mCtrlPnts,
      this.mScaleValues,
      ArrowUtil.ArrowBodyType.ARROWBODY_MULTIPOLYBEZIER
    );

    leftBodyPts = arrowBody.leftBodyPts;

    if (!MathUtil.EqualFuzzy(arrowBody.arrowTouLen, 0)) {
      const headCtrlPnts = [];
      const headScales = [];
      headCtrlPnts.push(
        arrowBody.leftBodyPts[arrowBody.leftBodyPts.length - 1]
      );
      headCtrlPnts.push(
        arrowBody.rightBodyPts[arrowBody.rightBodyPts.length - 1]
      );

      headScales.push(this.mScaleValues[2]);
      headScales.push(this.mScaleValues[3]);
      headScales.push(0);
      headScales.push(0);

      arrowHeadPts = ArrowUtil.generateArrowHead(
        clonePnts,
        headCtrlPnts,
        headScales,
        arrowBody.arrowTouLen,
        ArrowUtil.ArrowHeadType.ARROWHEAD_WITH_EAR
      );

      for (let t = 0; t < arrowBody.leftBodyPts.length; t += 1)
        shapePts.push(arrowBody.leftBodyPts[t]);

      for (let t = 0; t < arrowHeadPts.length; t += 1)
        shapePts.push(arrowHeadPts[t]);

      for (let t = arrowBody.rightBodyPts.length - 1; t >= 0; t -= 1) {
        shapePts.push(arrowBody.rightBodyPts[t]);
        rightBodyPts.push(arrowBody.rightBodyPts[t]);
      }
    }

    return { shapePts, leftBodyPts, rightBodyPts, arrowHeadPts };
  }

  calculate() {
    const ret = [];

    if (this.mCtrlPnts.length < 3) return ret;

    const clonePnts = GeomUtil.PolylinClone(this.mCtrlPnts);

    const dis = GeomUtil.PolylinDistance(clonePnts);
    const arrowPnts = this.generateArrowPnts();

    ret.push(arrowPnts.shapePts);

    if (this.mScaleValues.length < 9) {
      this.mScaleValues = [];
      this.mScaleValues.push(...[0.2, 0.2, 0.4, 0.4, 0.1, 0.2, 0.1, 0.2, 1, 1]);
    }

    const dis4 = dis * this.mScaleValues[4];
    const dis5 = dis * this.mScaleValues[5];
    const dis01 = GeomUtil.Distance(clonePnts[0], clonePnts[1]);
    let pntOnSeg01 = GeomUtil.GetPntOnSegByDis(
      clonePnts[1],
      clonePnts[0],
      dis01 + dis5
    );

    const sidePnt1 = PlottingUtil.getSidePointsOfLine(
      dis4,
      clonePnts[1],
      pntOnSeg01
    );

    const dis6 = dis * this.mScaleValues[6];
    const dis7 = dis * this.mScaleValues[7];
    pntOnSeg01 = GeomUtil.GetPntOnSegByDis(
      clonePnts[0],
      clonePnts[1],
      dis01 + dis7
    );
    const sidePnt2 = PlottingUtil.getSidePointsOfLine(
      dis6,
      clonePnts[0],
      pntOnSeg01
    );

    const beizerCtrlPnts = [];
    beizerCtrlPnts.push(sidePnt1.left.clone());
    beizerCtrlPnts.push(clonePnts[0].clone());
    beizerCtrlPnts.push(clonePnts[1].clone());
    beizerCtrlPnts.push(sidePnt2.right);

    const beizerPnts =
      PlottingUtil.generateBeizerPntsWithoutCtrlPnts(beizerCtrlPnts);
    ret.push(beizerPnts);

    return ret;
  }
}
