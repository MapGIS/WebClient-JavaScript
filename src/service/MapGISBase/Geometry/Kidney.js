import { Check } from "../Check";
import { MathUtil } from "../Util/MathUtil";
import { GeomUtil } from "./GeomUtil";
import { Point } from "./Point";

/**
 * 肾脏区
 */
export class Kidney {
  constructor(options) {
    Check.defined(options.positions);
    this._positions = options.positions;
  }

  calculate() {
    const positions = this._positions;
    const posLen = positions.length;
    if (posLen < 2) return [];

    let ctrlPnts = [];
    if (posLen == 2) {
      const protudePnt = this._calcProtudePnt(positions[0], positions[1]).left;
      ctrlPnts.push(positions[0]);
      ctrlPnts.push(positions[1]);
      ctrlPnts.push(protudePnt);
    } else {
      ctrlPnts.push(positions[0]);
      ctrlPnts.push(positions[1]);
      ctrlPnts.push(positions[2]);
    }

    //根据控制点计算贝塞尔曲线控制点
    ctrlPnts = this._reNormalizeCtrlPnts(ctrlPnts);

    let e = [];
    let o = this._calcShapePoints(ctrlPnts);

    if (12 != o.length) return e;
    o.push(o[0]), o.push(o[1]), o.splice(0, 1);
    for (let t = 0; t < o.length - 3; t += 3) {
      let i = [];
      (i = this._getBezierPtsWithScalePts(o[t], o[t + 1], o[t + 2], o[t + 3])),
        (e = e.concat(i));
    }
    return e;
  }

  _getBezierPtsWithScalePts(t, e, o, i) {
    let l = [],
      s = t.x,
      n = t.y,
      a = e.x,
      r = e.y,
      p = o.x,
      u = o.y,
      h = i.x,
      g = i.y;
    if (
      MathUtil.EqualFuzzy(s, a, 1e-10) &&
      MathUtil.EqualFuzzy(n, r, 1e-10) &&
      MathUtil.EqualFuzzy(p, h, 1e-10) &&
      MathUtil.EqualFuzzy(u, g, 1e-10)
    )
      l.push(new Point(s, n)), l.push(new Point(p, u));
    else
      for (let t = 0; t <= 1; t += 0.03125) {
        let e,
          o,
          i,
          c,
          y = t * t,
          P = y * t;
        (e = 1 - 3 * t + 3 * y - P),
          (o = 3 * (t - 2 * y + P)),
          (i = 3 * (y - P)),
          (c = P);
        let d = new Point(
          e * s + o * a + i * p + c * h,
          e * n + o * r + i * u + c * g
        );
        l.push(d);
      }
    return l;
  }

  _calcShapePoints(o) {
    const e = [];
    let l = new Point(0, 0),
      s = new Point(0, 0);

    (l.x = 0.5 * (o[0].x + o[1].x)),
      (l.y = 0.5 * (o[0].y + o[1].y)),
      (s.x = l.x - 0.1 * (o[2].x - l.x)),
      (s.y = l.y - 0.1 * (o[2].y - l.y));
    let n = this._getPtsByTriangle(3, 0, o[1], o[0], s);
    e.push(n.pr), e.push(s), e.push(n.pl);
    let a = this._getPtsByTriangle(4, 2, o[2], o[0], o[1]);
    e.push(a.pr), e.push(o[1]), e.push(a.pl);
    let r = this._getPtsByTriangle(2, 0, o[0], o[1], o[2]);
    e.push(r.pr), e.push(o[2]), e.push(r.pl);
    let p = this._getPtsByTriangle(4, 1, o[1], o[2], o[0]);
    return e.push(p.pr), e.push(o[0]), e.push(p.pl), e;
  }

  _getPtsByTriangle(t, e, o, i, l) {
    let s = new Point(0, 0),
      n = 0,
      a = 0;
    return (
      (n = GeomUtil.Distance(l, o)),
      (a = GeomUtil.Distance(i, l)),
      1 == e && (n *= 2),
      2 == e && (a *= 2),
      (s.x = (n * i.x + a * o.x) / (n + a)),
      (s.y = (n * i.y + a * o.y) / (n + a)),
      {
        pl: this._getWhichPtOfNormal(t, o, s, l),
        pr: this._getWhichPtOfNormal(t, i, s, l),
      }
    );
  }

  _getWhichPtOfNormal(t, e, o, i) {
    let l,
      s = 0,
      n = 0;
    n = GeomUtil.Distance(i, e) / t;
    let a = this._getPointsOfNormal(n, o, i);
    return (l =
      (s = GeomUtil.Distance(e, a.right)) >= (n = GeomUtil.Distance(e, a.left))
        ? a.left
        : a.right);
  }

  _reNormalizeCtrlPnts(ctrlPnts) {
    const len = ctrlPnts.length;
    if (len < 2) return ctrlPnts;

    const ret = [];
    if (len === 2) {
      ret[0] = ctrlPnts[0];
      ret[1] = ctrlPnts[1];
      ret[2] = this._calcProtudePnt(ctrlPnts[0], ctrlPnts[1]).left;
    } else {
      let p0 = ctrlPnts[0];
      let p1 = ctrlPnts[1];
      let p2 = ctrlPnts[2];
      const dis01 = GeomUtil.Distance(p0, p1);
      const dis12 = GeomUtil.Distance(p1, p2);
      const dis02 = GeomUtil.Distance(p0, p2);

      if (dis12 >= dis01 && dis12 >= dis02) {
        let temp = p0.clone();
        p0 = p2.clone();
        p2 = temp.clone();
      } else if (dis02 >= dis01 && dis02 >= dis12) {
        let temp = p2.clone();
        p2 = p1.clone();
        p1 = temp.clone();
      }

      if (GeomUtil.isRight(p2, p0, p1)) {
        let temp = p0.clone();
        p0 = p1.clone();
        p1 = temp.clone();
      }

      ret[0] = p0;
      ret[1] = p1;
      ret[2] = p2;
      return ret;
    }
  }

  /**
   * 根据两个点计算肾脏区突出的点
   */
  _calcProtudePnt(pntA, pntB) {
    const midX = 0.5 * (pntA.x + pntB.x);
    const midY = 0.5 * (pntA.y + pntB.y);
    const dis = GeomUtil.Distance(pntA, pntB) / 2.7;
    return this._getPointsOfNormal(dis, pntA, new Point(midX, midY));
  }

  _getPointsOfNormal(dis, pntA, pntB) {
    const disAB = GeomUtil.Distance(pntA, pntB);
    const pnt = new Point();
    if (disAB === 0) {
      pnt.y = 0;
      pnt.x = dis;
    } else {
      const rate = dis / disAB;
      pnt.x = rate * (pntA.x - pntB.x);
      pnt.y = rate * (pntA.y - pntB.y);
    }

    return {
      left: new Point(pntB.x - pnt.y, pntB.y + pnt.x),
      right: new Point(pntB.x + pnt.y, pntB.y - pnt.x),
    };
  }
}
