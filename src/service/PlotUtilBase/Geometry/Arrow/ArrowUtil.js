import { MathUtil } from "../../Util/MathUtil";
import { Point } from "../Point";
import { Path2D } from "./Path2D";
import { GeomUtil } from "../GeomUtil";
import { PlottingUtil } from "./PlottingUtil";

/**
 * 箭头生成工具类
 */
export class ArrowUtil {
  static correctPnts(pnts) {
    const clonePnts = GeomUtil.PolylinClone(pnts);
    if (clonePnts.length === 3) {
      const x = ((clonePnts[0].x + clonePnts[1].x) / 2 + clonePnts[2].x) / 2;
      const y = ((clonePnts[0].y + clonePnts[1].y) / 2 + clonePnts[2].y) / 2;
      const pnt = new Point(x, y);
      clonePnts.push(clonePnts[2].clone());
      clonePnts[2] = pnt;
    }
    return clonePnts;
  }

  static generateMultiBezier(pnts, len, scaleValues, dis) {
    const scale0 = scaleValues[0];
    const scale1 = scaleValues[1];
    const midx01 = (pnts[0].x + pnts[1].x) / 2;
    const midy01 = (pnts[0].y + pnts[1].y) / 2;
    const offsetX = Math.abs(midx01 - pnts[2].x);
    const offsetY = Math.abs(midy01 - pnts[2].y);

    let S = 0;
    if (offsetX > 0 && offsetY > 0) {
      const f = 1 / (midx01 - pnts[2].x);
      const m = -1 / (midy01 - pnts[2].y);
      const L =
        (1 * pnts[2].y) / (midy01 - pnts[2].y) -
        (1 * pnts[2].x) / (midx01 - pnts[2].x);
      S =
        Math.abs(f * pnts[0].x + m * pnts[0].y + L) / Math.sqrt(f * f + m * m);
    } else if (MathUtil.EqualFuzzy(offsetY, 0)) {
      S = Math.abs(midy01 - pnts[1].y);
    } else {
      S = Math.abs(midx01 - pnts[1].x);
    }

    const s = [];
    const n = [];
    const sidePnt = PlottingUtil.getSidePointsOfLine(
      S,
      pnts[2],
      new Point(midx01, midy01)
    );

    let isRight = GeomUtil.IsRightTolin(pnts[1], pnts[2], pnts[0]);
    if (isRight) {
      [n[1], s[1]] = pnts;
    } else {
      [s[1], n[1]] = pnts;
    }

    pnts[1] = GeomUtil.SegMid(pnts[0], pnts[1]);
    const A =
      sidePnt.left.distanceTo(sidePnt.right) *
      ArrowUtil.Constant.sv_AtWidthDivAwWidth;

    let L = A * ArrowUtil.Constant.sv_AtLenDivAtWidth;
    let T = L * scale1;

    if (!MathUtil.EqualFuzzy(scale0, 0)) {
      L = dis * scale0;
      T = L * scale1;
    }

    let lastSegDis = pnts[len].distanceTo(pnts[len - 1]);
    if (lastSegDis < 2 * L) {
      L = lastSegDis / 2;
      T = L * scale1;
    }

    pnts.push(pnts[len]);

    let v = 0;
    let _ = 0;
    const I = [];
    for (let i = 2; i <= len; i += 1) {
      v += pnts[i - 1].distanceTo(pnts[i]);
    }

    v -= L;

    for (let i = 2; i < len; i += 1) {
      _ += pnts[i - 1].distanceTo(pnts[i]);
      const tempp = Math.pow(
        (v - _) / v,
        ArrowUtil.Constant.sv_AtScaleParameter
      );
      I[i] = T + (A - T) * tempp;
    }

    I[len] = T;

    const U = new Point(0, 0);
    const N = new Point(0, 0);
    const D = new Point(0, 0);

    let C = null;
    let E = null;
    let temp = 0;
    const a = [];
    const r = [];
    const p = [];
    const u = [];
    for (let i = 2; i < len; i += 1) {
      PlottingUtil.getTrianglePoints(
        0,
        3,
        pnts[i - 1],
        pnts[i],
        pnts[i + 1],
        U,
        N
      );
      if (i === len - 1) {
        PlottingUtil.getTrapezoidPoints(0.5, pnts[len], pnts[len - 1], N, D);
      }

      C = PlottingUtil.getSidePointsOfLine(I[i], U, pnts[i]);
      isRight = GeomUtil.IsRightTolin(N, U, C.right);
      if (isRight) {
        s[i] = C.right.clone();
        n[i] = C.left.clone();
      } else {
        s[i] = C.left.clone();
        n[i] = C.right.clone();
      }
    }

    if (pnts[len].distanceTo(D) > 0) {
      pnts[len] = PlottingUtil.getIncentrePntOnSegmBydis(L, pnts[len], D);
    }

    C = PlottingUtil.getSidePointsOfLine(T, pnts[len + 1], pnts[len]);
    isRight = GeomUtil.IsRightTolin(pnts[len], pnts[len + 1], C.left);
    if (isRight) {
      n[len] = C.left.clone();
      s[len] = C.right.clone();
    } else {
      n[len] = C.right.clone();
      s[len] = C.left.clone();
    }

    for (let i = 2; i < len; i += 1) {
      PlottingUtil.getTrianglePoints(3, 3, s[i - 1], s[i], s[i + 1], U, N);
      a[i] = U.clone();
      r[i] = N.clone();
      PlottingUtil.getTrianglePoints(3, 3, n[i - 1], n[i], n[i + 1], U, N);
      p[i] = U.clone();
      u[i] = N.clone();

      if (i === 2) {
        r[1] = new Point(0, 0);
        PlottingUtil.getTrapezoidPoints(0.5, s[1], s[2], a[2], r[1]);
        u[1] = new Point(0, 0);
        PlottingUtil.getTrapezoidPoints(0.5, n[1], n[2], p[2], u[1]);
      }

      if (i === len - 1) {
        lastSegDis = pnts[len].distanceTo(pnts[len - 1]);
        temp = lastSegDis / 3;
        E = PlottingUtil.getExcentrePntOnSegBydis(
          temp,
          pnts[len],
          pnts[len + 1]
        );
        E.x += s[len].x - pnts[len].x;
        E.y += s[len].y - pnts[len].y;

        lastSegDis = A - T;
        temp =
          lastSegDis * (temp / v) ** ArrowUtil.Constant.sv_AtScaleParameter;

        C = PlottingUtil.getSidePointsOfLine(temp, s[len], E);
        a[len] = C.left.clone();

        lastSegDis = n[len - 1].distanceTo(n[len]);
        temp = lastSegDis / 3;
        E = PlottingUtil.getExcentrePntOnSegBydis(
          temp,
          pnts[len],
          pnts[len + 1]
        );
        E.x += n[len].x - pnts[len].x;
        E.y += n[len].y - pnts[len].y;

        lastSegDis = A - T;
        temp =
          lastSegDis * (temp / v) ** ArrowUtil.Constant.sv_AtScaleParameter;

        C = PlottingUtil.getSidePointsOfLine(temp, n[len], E);
        p[len] = C.right.clone();
      }
    }

    return {
      arrowTouLen: L,
      leftBodyPts: ArrowUtil.genArrowBody(len, s, a, r),
      rightBodyPts: ArrowUtil.genArrowBody(len, n, p, u),
    };
  }

  static generateArrowHead(pnts, headCtrlPnts, scaleValues, dis, type) {
    if (
      type === ArrowUtil.ArrowHeadType.ARROWHEAD_WITH_EAR ||
      type === ArrowUtil.ArrowHeadType.ARROWHEAD_WITHOUT_EAR
    ) {
      const ret = [];
      const scale0 = scaleValues[0];
      const scale1 = scaleValues[1];
      const scale2 = scaleValues[2];
      let scale3 = null;
      if (scaleValues.length === 4) {
        [, , , scale3] = scaleValues;
      }

      let dis1 = 0;
      if (!MathUtil.EqualFuzzy(scale2, 0) && !MathUtil.EqualFuzzy(scale3, 0)) {
        const temppnts = GeomUtil.PolylinClone(pnts);
        temppnts.splice(temppnts.length - 1, 1);
        dis1 = GeomUtil.PolylinDistance(temppnts) * scale2 * scale3;
      }

      const midpnt = GeomUtil.SegMid(headCtrlPnts[0], headCtrlPnts[1]);

      if (MathUtil.EqualFuzzy(scale1, 0)) {
        return ret;
      }

      const exPnt = PlottingUtil.getExcentrePntOnSegBydis(
        dis * scale1,
        midpnt,
        pnts[pnts.length - 1]
      );

      const sidePnt = PlottingUtil.getSidePointsOfLine(
        dis * scale0 + dis1,
        pnts[pnts.length - 1],
        exPnt
      );

      ret.push(sidePnt.right);
      ret.push(pnts[pnts.length - 1]);
      ret.push(sidePnt.left);

      return ret;
    }

    return null;
  }

  static genArrowBody(t, e, o, i) {
    const path2D = new Path2D();
    if (!(t < 2)) {
      path2D.MoveTo(e[1]);
      for (let s = 1; s <= t - 1; s += 1)
        path2D.CurveTo(i[s], o[s + 1], e[s + 1]);
      const s = [];
      path2D.ToSubPathPolygons(s);
      return s[0];
    }

    return null;
  }

  static generateArrowBody(pnts, scaleValues, bodyType) {
    if (bodyType === ArrowUtil.ArrowBodyType.ARROWBODY_MULTIPOLYBEZIER) {
      const dis = GeomUtil.PolylinDistance(pnts);
      if (dis === 0) return null;

      const newPnts = ArrowUtil.correctPnts(pnts);
      const len = newPnts.length - 1;

      const bezier = ArrowUtil.generateMultiBezier(
        newPnts,
        len,
        scaleValues,
        dis
      );
      return {
        arrowTouLen: bezier.arrowTouLen,
        leftBodyPts: bezier.leftBodyPts,
        rightBodyPts: bezier.rightBodyPts,
        ctrlPnts: newPnts,
      };
    }
    return null;
  }
}

ArrowUtil.ArrowHeadType = {
  ARROWHEAD_POLYLINE: 0,
  ARROWHEAD_TRIANGLE: 1,
  ARROWHEAD_COATTAIL: 2,
  ARROWHEAD_TRIANGLE_SOLID: 3,
  ARROWHEAD_COATTAIL_HOLLOW: 6,
  ARROWHEAD_WITH_EAR: 4,
  ARROWHEAD_WITHOUT_EAR: 5,
};

ArrowUtil.ArrowTailType = {
  ARROWTAIL_NONE: 0,
  ARROWTAIL_LINE: 1,
  ARROWTAIL_CURVE: 2,
  ARROWTAIL_COATTAIL: 3, // 燕尾
  ARROWTAIL_COATTAIL_POLYBODY: 4,
};

ArrowUtil.ArrowBodyType = {
  ARROWBODY_POLYLINE: 0,
  ARROWBODY_POLYBEZIER: 1,
  ARROWBODY_COATTAIL: 5,
  ARROWBODY_PARALLEL: 2,
  ARROWBODY_TRAPEZOID: 3,
  ARROWBODY_MULTIPOLYBEZIER: 4,
};

ArrowUtil.Constant = {
  MAX_ARRAY_SIZE: 128,
  sv_AtScaleParameter: 1.5,
  sv_AtLenDivAtWidth: 1.35,
  sv_AtWidthDivAwWidth: 0.5,
  DUOJIANTOU_TAIL_RATE_1: 8,
  DUOJIANTOU_TAIL_RATE_2: 3,
  DUOJIANTOU_TAIL_RATE_3: 0.6,
};
