/*
 * @Description: 样条曲线类
 * @Author: zk
 * @Date: 2021-11-17 11:57:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-04-08 16:02:19
 */
export default class Spline {
  /**
   * @description: 生成样条曲线
   * @param {Array<{x:number,y:number}>} points
   * @param {boolean} close
   * @param {number} offset
   * @return {*}
   */
  constructor(points, options) {
    let close = false;
    this.offset = 0;
    this.MAXPOINT = 5;
    if (options) {
      close = typeof options.close === "boolean" ? options.close : false;
      this.offset =
        typeof options.offset === "number" ? options.offset : this.offset;
      this.MAXPOINT = options.maxPoint ? options.maxPoint : this.MAXPOINT;
      this.isInsertByLength =
        typeof options.isInsertByLength === "boolean"
          ? options.isInsertByLength
          : false;
    }

    this.lengthArr = [];
    this.beziPoint = [];
    this.angles = [];
    this.curveArr = [];
    this.poly = points;
    this.pathstr = this.spline(points, 1, close);
  }

  /**
   * @description: 控制点转换
   * @param {*} points
   * @param {*} close
   * @return {*}
   */
  formatPoints(points, close) {
    points = [...points];
    // so that coords can be passed as objects or arrays
    if (!Array.isArray(points[0])) {
      // eslint-disable-next-line no-param-reassign
      points = points.map(({ x, y }) => [x, y]);
    }

    if (close) {
      const lastPoint = points[points.length - 1];
      const secondToLastPoint = points[points.length - 2];

      const firstPoint = points[0];
      const secondPoint = points[1];

      points.unshift(lastPoint);
      points.unshift(secondToLastPoint);

      points.push(firstPoint);
      points.push(secondPoint);
    }

    return points.flat();
  }

  /**
   * @description: 计算样条曲线参数
   * @param {*} points
   * @param {*} tension
   * @param {*} close
   * @param {*} cb
   * @return {*}
   */
  spline(points = [], tension = 1, close = false, cb = false) {
    points = this.formatPoints(points, close);
    const size = points.length;

    const last = size - 4;

    const startPointX = close ? points[2] : points[0];
    const startPointY = close ? points[3] : points[1];

    // get minX minY maxX maxY
    let minX = startPointX,
      maxX = startPointX,
      minY = startPointY,
      maxY = startPointY;

    let path = "M" + [startPointX, startPointY];

    cb && cb("MOVE", [startPointX, startPointY]);

    const startIteration = close ? 2 : 0;
    const maxIteration = close ? size - 6 : size - 2;
    const inc = 2;

    for (let i = startIteration; i < maxIteration; i += inc) {
      let x0 = i ? points[i - 2] : points[0];
      let y0 = i ? points[i - 1] : points[1];

      let x1 = points[i + 0];

      let y1 = points[i + 1];

      let x2 = points[i + 2];
      let y2 = points[i + 3];

      let x3 = i !== last ? points[i + 4] : x2;
      let y3 = i !== last ? points[i + 5] : y2;

      let cp1x = x1 + ((x2 - x0) / 6) * tension;
      let cp1y = y1 + ((y2 - y0) / 6) * tension;

      let cp2x = x2 - ((x3 - x1) / 6) * tension;
      let cp2y = y2 - ((y3 - y1) / 6) * tension;

      if (this.offset !== 0) {
        const coors = this.getOffsetControlCoords(
          x1,
          y1,
          cp1x,
          cp1y,
          cp2x,
          cp2y,
          x2,
          y2,
          this.offset
        );

        if (coors) {
          const [t1, t2, t3, t4, t5, t6, t7, t8] = coors;
          x1 = t1;
          y1 = t2;
          cp1x = t3;
          cp1y = t4;
          cp2x = t5;
          cp2y = t6;
          x2 = t7;
          y2 = t8;
        }
      }

      let pathLength = this.getBezierLength(
        x1,
        y1,
        cp1x,
        cp1y,
        cp2x,
        cp2y,
        x2,
        y2
      );

      this.lengthArr.push(pathLength);
      this.beziPoint.push([x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2]);

      const xArr = [x1, cp1x, cp2x, x2].filter((val) => {
        if (Number.isNaN(val) || !(typeof val === "number")) {
          return false;
        }
        return true;
      });
      const yArr = [y1, cp1y, cp2y, y2].filter((val) => {
        if (Number.isNaN(val) || !(typeof val === "number")) {
          return false;
        }
        return true;
      });
      minX = Math.min(...xArr) > minX ? minX : Math.min(...xArr);
      minY = Math.min(...yArr) > minY ? minY : Math.min(...yArr);
      maxX = Math.max(...xArr) > maxX ? Math.max(...xArr) : maxX;
      maxY = Math.max(...yArr) > maxY ? Math.max(...yArr) : maxY;

      if (i === 0) {
        this.angles.push(
          this.getAngle(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2, 0)
        );
      }

      this.angles.push(
        this.getAngle(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2, 1)
      );

      if (size === 4) {
        path += "M" + [x1, y1];
        path += "L" + [x2, y2];
      } else {
        path += "C" + [cp1x, cp1y, cp2x, cp2y, x2, y2];
      }

      this.curveArr.push([cp1x, cp1y, cp2x, cp2y, x2, y2]);

      cb && cb("CURVE", [cp1x, cp1y, cp2x, cp2y, x2, y2]);
    }

    this.bound = {
      left: minX,
      top: minY,
      right: maxX,
      bottom: maxY,
    };

    return path;
  }

  // line offset
  /**
   * @description: 贝塞尔偏移曲线算法
   * @param {*} x1
   * @param {*} y1
   * @param {*} cp1x
   * @param {*} cp1y
   * @param {*} cp2x
   * @param {*} cp2y
   * @param {*} x2
   * @param {*} y2
   * @param {*} offset
   * @return {*}
   */
  getOffsetControlCoords(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2, offset) {
    const arr = [x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2];
    let isNan = false;
    arr.forEach((s) => {
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(s)) {
        isNan = true;
      }
    });

    if (Math.abs(x2 - x1) < 1e-10 || Math.abs(y2 - y1) < 1e-10 || isNan) {
      return null;
    }

    const t = this.offsetCoords(
      [
        [x1, y1],
        [cp1x, cp1y],
        [cp2x, cp2y],
        [x2, y2],
      ],
      offset
    );

    if (t.length === 4) {
      return [
        t[0][0],
        t[0][1],
        t[1][0],
        t[1][1],
        t[2][0],
        t[2][1],
        t[3][0],
        t[3][1],
      ];
    }
    if (t.length === 2) {
      const rate1 =
        this.dist2d([cp1x, cp1y], [x1, y1]) / this.dist2d([x1, y1], [x2, y2]);
      const rate2 =
        this.dist2d([cp2x, cp2y], [x1, y1]) / this.dist2d([x1, y1], [x2, y2]);
      const t1 = t[0];
      const t2 = t[1];
      const c1 = [
        t1[0] + (t2[0] - t1[0]) * rate1,
        t1[1] + (t2[1] - t1[1]) * rate1,
      ];
      const c2 = [
        t1[0] + (t2[0] - t1[0]) * rate2,
        t1[1] + (t2[1] - t1[1]) * rate2,
      ];

      return [t1[0], t1[1], c1[0], c1[1], c2[0], c2[1], t2[0], t2[1]];
    }
    return null;
  }

  dist2d(coord1, coord2) {
    let dx = coord1[0] - coord2[0];
    let dy = coord1[1] - coord2[1];
    return Math.sqrt(dx * dx + dy * dy);
  }

  equals(coord1, coord2) {
    let equals = true;
    // eslint-disable-next-line no-plusplus
    for (let i = coord1.length - 1; i >= 0; --i) {
      if (coord1[i] !== coord2[i]) {
        equals = false;
        break;
      }
    }
    return equals;
  }

  offsetCoords(coords, offset) {
    let path = [];
    let N = coords.length - 1;
    let max = N;
    let mi, mi1, li, li1, ri, ri1, si, si1, Xi1, Yi1;
    let p0, p1, p2;
    let isClosed = this.equals(coords[0], coords[N]);
    if (!isClosed) {
      p0 = coords[0];
      p1 = coords[1];
      p2 = [
        p0[0] + ((p1[1] - p0[1]) / this.dist2d(p0, p1)) * offset,
        p0[1] - ((p1[0] - p0[0]) / this.dist2d(p0, p1)) * offset,
      ];
      path.push(p2);
      coords.push(coords[N]);
      // eslint-disable-next-line no-plusplus
      N++;
      // eslint-disable-next-line no-plusplus
      max--;
    }
    for (let i = 0; i < max; i += 1) {
      p0 = coords[i];
      p1 = coords[(i + 1) % N];
      p2 = coords[(i + 2) % N];
      mi = (p1[1] - p0[1]) / (p1[0] - p0[0]);
      mi1 = (p2[1] - p1[1]) / (p2[0] - p1[0]);
      // Prevent alignements
      if (Math.abs(mi - mi1) > 1e-10) {
        li = Math.sqrt(
          (p1[0] - p0[0]) * (p1[0] - p0[0]) + (p1[1] - p0[1]) * (p1[1] - p0[1])
        );
        li1 = Math.sqrt(
          (p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1])
        );
        ri = p0[0] + (offset * (p1[1] - p0[1])) / li;
        ri1 = p1[0] + (offset * (p2[1] - p1[1])) / li1;
        si = p0[1] - (offset * (p1[0] - p0[0])) / li;
        si1 = p1[1] - (offset * (p2[0] - p1[0])) / li1;
        Xi1 = (mi1 * ri1 - mi * ri + si - si1) / (mi1 - mi);
        Yi1 = (mi * mi1 * (ri1 - ri) + mi1 * si - mi * si1) / (mi1 - mi);
        // Correction for vertical lines
        if (p1[0] - p0[0] === 0) {
          Xi1 = p1[0] + (offset * (p1[1] - p0[1])) / Math.abs(p1[1] - p0[1]);
          Yi1 = mi1 * Xi1 - mi1 * ri1 + si1;
        }
        if (p2[0] - p1[0] === 0) {
          Xi1 = p2[0] + (offset * (p2[1] - p1[1])) / Math.abs(p2[1] - p1[1]);
          Yi1 = mi * Xi1 - mi * ri + si;
        }
        path.push([Xi1, Yi1]);
      }
    }
    if (isClosed) {
      path.push(path[0]);
    } else {
      coords.pop();
      p0 = coords[coords.length - 1];
      p1 = coords[coords.length - 2];
      p2 = [
        p0[0] - ((p1[1] - p0[1]) / this.dist2d(p0, p1)) * offset,
        p0[1] + ((p1[0] - p0[0]) / this.dist2d(p0, p1)) * offset,
      ];
      path.push(p2);
    }
    return path;
  }

  /**
   * @description: 获取曲线长度百分比处的点信息
   * @param {number} rate
   * @return {[[number,number],number,number,number]}
   */
  getTransfromByRate(rate) {
    let total = this.getTotalLength();

    let s = 0;
    let pathRate = 0;
    let beziIndex = -1;

    let angle;
    let point;

    let v = total * rate;

    for (let i = 0; i < this.lengthArr.length; i += 1) {
      s += this.lengthArr[i];

      if (s >= v) {
        beziIndex = i;
        pathRate = 1 - (s - v) / this.lengthArr[i];
        break;
      }
    }

    let points = this.beziPoint[beziIndex];

    let x0 = points[0],
      y0 = points[1],
      x1 = points[2],
      y1 = points[3],
      x2 = points[4],
      y2 = points[5],
      x3 = points[6],
      y3 = points[7];
    point = this.getPointByT(x0, y0, x1, y1, x2, y2, x3, y3, pathRate);
    angle = this.getAngle(x0, y0, x1, y1, x2, y2, x3, y3, pathRate);

    return [point, angle, beziIndex, pathRate];
  }

  /**
   * @description: 按宽度切分
   * @param {*} width
   * @param {*} rate
   * @return {*}
   */
  getPntInfoBywidth(width, rate = 0) {
    let total = this.getTotalLength();
    let points = [];
    for (let i = width * rate; i < total; i += width) {
      let val = this.getTransfromByRate(i / total);
      if ((1 - rate) * width + i > total && rate !== 0) {
        return points;
      }
      val && points && points.push([val[0], val[1]]);
    }

    return points;
  }

  /**
   * @description: 获取线段比率处点的几何信息
   * @param {*} x0
   * @param {*} y0
   * @param {*} x1
   * @param {*} y1
   * @param {*} x2
   * @param {*} y2
   * @param {*} x3
   * @param {*} y3
   * @param {*} t
   * @return {*}
   */
  getPointByT(x0, y0, x1, y1, x2, y2, x3, y3, t) {
    const size = this.poly.length;
    if (size === 2) {
      return [x0 + (x3 - x0) * t, y0 + (y3 - y0) * t];
    }
    let x =
      x0 * Math.pow(1 - t, 3) +
      3 * x1 * t * Math.pow(1 - t, 2) +
      3 * x2 * Math.pow(t, 2) * (1 - t) +
      x3 * Math.pow(t, 3);
    let y =
      y0 * Math.pow(1 - t, 3) +
      3 * y1 * t * Math.pow(1 - t, 2) +
      3 * y2 * Math.pow(t, 2) * (1 - t) +
      y3 * Math.pow(t, 3);

    return [x, y];
  }

  getBPathStr(
    x0,
    y0,
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    t1,
    t2,
    pointCount = this.MAXPOINT
  ) {
    let path = "";

    // 判断是否为直线
    const k1 = (y1 - y0) / (x1 - x0);
    const k2 = (y3 - y2) / (x3 - x2);

    if (Math.abs(k2 - k1) < 10e-8) {
      const p1 = [x0 + (x3 - x0) * t1, y0 + (y3 - y0) * t1];
      const p2 = [x0 + (x3 - x0) * t2, y0 + (y3 - y0) * t2];
      path += "M" + [p1[0], p1[1]];
      path += "L" + [p2[0], p2[1]];
      return path;
    }

    let pCount = pointCount;

    if (this.isInsertByLength) {
      const l = this.getBezierLength(x0, y0, x1, y1, x2, y2, x3, y3);
      const s =this.poly.length>0?this.poly.length:1
      const partLength = this.getTotalLength() /pCount*s;
      pCount = Math.ceil(l / partLength);
    }

    for (let i = 0; i <= pCount; i += 1) {
      let pnt = this.getPointByT(
        x0,
        y0,
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        ((t2 - t1) * i) / pCount + t1
      );

      if (i === 0) {
        path += "M" + [pnt[0], pnt[1]];
      } else {
        path += ` ${pnt[0]},${pnt[1]}`;
      }
    }
    return path;
  }

  getAngle(x0, y0, x1, y1, x2, y2, x3, y3, t) {
    let dx =
      x0 * 3 * Math.pow(1 - t, 2) * -1 +
      3 * x1 * (Math.pow(1 - t, 2) + t * 2 * (1 - t) * -1) +
      3 * x2 * (2 * t * (1 - t) + Math.pow(t, 2) * -1) +
      x3 * 3 * Math.pow(t, 2);
    let dy =
      y0 * 3 * Math.pow(1 - t, 2) * -1 +
      3 * y1 * (Math.pow(1 - t, 2) + t * 2 * (1 - t) * -1) +
      3 * y2 * (2 * t * (1 - t) + Math.pow(t, 2) * -1) +
      y3 * 3 * Math.pow(t, 2);
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }

  getBezierLength(x0, y0, x1, y1, x2, y2, x3, y3, pointCount = this.MAXPOINT) {
    // 取点 默认 30个
    let length = 0.0;
    let lastPoint = this.getPointByT(x0, y0, x1, y1, x2, y2, x3, y3, 0);
    for (let i = 1; i <= pointCount; i += 1) {
      let point = this.getPointByT(
        x0,
        y0,
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        i / pointCount
      );
      length += Math.sqrt(
        (point[0] - lastPoint[0]) * (point[0] - lastPoint[0]) +
          (point[1] - lastPoint[1]) * (point[1] - lastPoint[1])
      );
      lastPoint = point;
    }
    return Math.abs(length);
  }

  getTotalLength() {
    let total = 0;
    if (this.lengthArr.length > 0) {
      this.lengthArr.forEach((num) => {
        total += num;
      });
    }
    return total;
  }
  clone() {
    return new Spline(this.poly);
  }
}
