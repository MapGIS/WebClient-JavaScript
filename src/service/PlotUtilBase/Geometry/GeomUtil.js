import { isArray } from "../Check";
import MathUtil from "../Util/MathUtil";
import Point from "./Point";
import Bounds from "./Bound";

/**
 * geometry工具类
 */
export default class GeomUtil {
  /**
   * 判断两点是否重合
   * @function
   *
   * @static
   *
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   * @param {Number} tolerance 容差
   * @returns {Boolean}
   */
  static PointEqualFuzzy(x1, y1, x2, y2, tolerance) {
    return (
      MathUtil.EqualFuzzy(x1, x2, tolerance) &&
      MathUtil.EqualFuzzy(y1, y2, tolerance)
    );
  }

  /**
   * 计算两点距离
   * @function
   *
   * @static
   *
   * @param Point pnt0
   * @param Point pnt1
   * @returns {Number} 两点距离
   */
  static Distance(pnt0, pnt1) {
    let x0;
    let y0;
    let x1;
    let y1;
    if (isArray(pnt0)) {
      [x0, y0] = pnt0;
    } else {
      x0 = pnt0.x;
      y0 = pnt0.y;
    }

    if (isArray(pnt1)) {
      [x1, y1] = pnt1;
    } else {
      x1 = pnt1.x;
      y1 = pnt1.y;
    }

    return Math.sqrt(1 * (x0 - x1) * (x0 - x1) + 1 * (y0 - y1) * (y0 - y1));
  }

  /**
   * 计算线段与x轴夹角弧度值
   * 
   * @function
   * 
   * @static
   * 
   * @param Point pnt0 
   * @param Point pnt1 
   * @returns {Number}
   */
  static Radian(pnt0,pnt1){
    const offsetX=pnt1.x-pnt0.x;
    const offsetY=pnt1.y-pnt0.y;

    const radian=Math.atan2(offsetY,offsetX);

    return radian<0?radian+2*Math.PI:radian;
  }

  /**
   * 去除重复点
   * @function
   *
   * @static
   *
   * @param {Array<Point>} pnts
   * @returns {Array<Point>}
   */
  static ClearSamePts(pnts) {
    let len = pnts.length;
    for (let i = 0; i < len - 1; ) {
      if (pnts[i].isSamePnt(pnts[i + 1])) {
        pnts.splice(i, 1);
        len -= 1;
      } else {
        i += 1;
      }
    }

    return pnts;
  }

  /**
   * 计算线段中点
   * @function
   *
   * @static
   *
   * @param Point pnt1
   * @param Point pnt2
   * @returns Point
   */
  static SegMid(pnt1, pnt2) {
    if (isArray(pnt1)) {
      return new Point((pnt1[0] + pnt2[0]) / 2, (pnt1[1] + pnt2[1]) / 2);
    }

    return new Point((pnt1.x + pnt2.x) / 2, (pnt1.y + pnt2.y) / 2);
  }

  static GetSegCrossPnt(pntA, pntB, pntC, pntD) {
    const diffXAB = pntB.x - pntA.x;
    const diffYAB = pntB.y - pntA.y;
    const diffXCD = pntD.x - pntC.x;
    const diffYCD = pntD.y - pntC.y;
    const p = diffXAB * diffYCD - diffYAB * diffXCD;
    if (MathUtil.EqualFuzzy(p, 0)) return null;

    const u = (diffXAB * (pntA.y - pntC.y) - diffYAB * (pntA.x - pntC.x)) / p;
    return new Point(pntC.x + u * diffXCD, pntC.y + u * diffYCD);
  }

  /**
   * 复制点数组
   * @function
   * @static
   * @param {Array<Point>} pnts 点数组
   * @returns {Array<Point>}
   */
  static PolylinClone(pnts) {
    const newPnts = [];
    if (!isArray(pnts)) return newPnts;

    for (let i = 0; i < pnts.length; i += 1) {
      newPnts.push(pnts[i].clone());
    }

    return newPnts;
  }

  /**
   * 计算折线长度
   * @function
   *
   * @static
   *
   * @param {Array<Point>} pnts 点数组
   * @returns {Number}
   */
  static PolylinDistance(pnts) {
    const pntLen = pnts.length;
    if (pntLen === 0) return 0;

    let dis = 0;
    for (let i = 0; i < pntLen - 1; i += 1) {
      dis += GeomUtil.Distance(pnts[i], pnts[i + 1]);
    }
    return dis;
  }

  static FormatPnts(pnts, arrToObj) {
    const ret = [];
    if (arrToObj) {
      for (let i = 0; i < pnts.length; i += 1) {
        ret.push(new Point(pnts[i][0], pnts[i][1]));
      }
    } else {
      for (let i = 0; i < pnts.length; i += 1) {
        ret.push([pnts[i].x, pnts[i].y]);
      }
    }

    return ret;
  }

  static GetPntOnSegByDis(pnt1, pnt2, dis) {
    const dis12 = GeomUtil.Distance(pnt1, pnt2);
    if (dis12 === 0) return pnt1.clone();

    return GeomUtil.GetPntOnSegByRatio(pnt1, pnt2, dis / dis12);
  }

  static IsRightTolin(pnt, linPnt1, linPnt2) {
    return (
      (linPnt1.x - pnt.x) * (linPnt2.y - pnt.y) -
        (linPnt2.x - pnt.x) * (linPnt1.y - pnt.y) <
      0
    );
  }

  static GetPntOnSegByRatio(pnt1, pnt2, ratio) {
    const x = pnt1.x + (pnt2.x - pnt1.x) * ratio;
    const y = pnt1.y + (pnt2.y - pnt1.y) * ratio;

    return new Point(x, y);
  }

  /**
   * 计算折线矩形范围
   * @function
   * 
   * @static
   * 
   * @param {Array<Point>} pnts 
   * @returns {Bounds} 
   */
  static CalcPolyLineBounds(pnts) {
    let xMin = Number.POSITIVE_INFINITY;
    let yMin = Number.POSITIVE_INFINITY;
    let xMax = Number.NEGATIVE_INFINITY;
    let yMax = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < pnts.length; i += 1) {
      const pnt = pnts[i];
      xMin = Math.min(xMin, pnt.x);
      yMin = Math.min(yMin, pnt.y);
      xMax = Math.max(xMax, pnt.x);
      yMax = Math.max(yMax, pnt.y);
    }

    return new Bounds(xMin, yMin, xMax, yMax);
  }

  static isRight(pnt1, pnt2, pnt3) {
    return (
      (pnt3.x - pnt2.x) * (pnt1.y - pnt2.y) -
        (pnt1.x - pnt2.x) * (pnt3.y - pnt2.y) <
      0
    )
  }
}
