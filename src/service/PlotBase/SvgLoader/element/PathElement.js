/* eslint-disable operator-assignment */
/* eslint-disable no-restricted-properties */
/*
 * @Author: your name
 * @Date: 2021-08-30 18:10:16
 * @LastEditTime: 2022-06-14 11:52:11
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\PathElement.js
 */
import Point from "../../../PlotUtilBase/Geometry/Point";
import Bounds from "../../../PlotUtilBase/Geometry/Bound";
import {Vector2} from "../../../PlotUtilBase/Math/Vector2";
import {ShapePath} from "../../../PlotUtilBase/Path2D/ShapePath";
import RenderedElement from "./RenderedElement";
import PathParser from "./PathParser";

function vectorMagnitude(v) {
  // eslint-disable-next-line no-restricted-properties
  return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
}

function vectorsRatio(u, v) {
  return (
    (u[0] * v[0] + u[1] * v[1]) / (vectorMagnitude(u) * vectorMagnitude(v))
  );
}

function vectorsAngle(u, v) {
  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vectorsRatio(u, v));
}

export default class PathElement extends RenderedElement {
  constructor(node) {
    super(node);
    this.type = "path";
    this._pathParser = new PathParser(this.getAttribute("d").getString());
  }

  _geometryPnts() {
    const pathParser = this._pathParser;
    pathParser.reset();
    const path2d = new ShapePath();
    while (!pathParser.isEnd()) {
      switch (pathParser.next().type) {
        case PathParser.MOVE_TO:
          this.pathM(path2d);
          break;

        case PathParser.LINE_TO:
          this.pathL(path2d);
          break;

        case PathParser.HORIZ_LINE_TO:
          this.pathH(path2d);
          break;

        case PathParser.VERT_LINE_TO:
          this.pathV(path2d);
          break;

        case PathParser.CURVE_TO:
          this.pathC(path2d);
          break;

        case PathParser.SMOOTH_CURVE_TO:
          this.pathS(path2d);
          break;

        case PathParser.QUAD_TO:
          this.pathQ(path2d);
          break;

        case PathParser.SMOOTH_QUAD_TO:
          this.pathT(path2d);
          break;

        case PathParser.ARC:
          this.pathA(path2d);
          break;

        case PathParser.CLOSE_PATH:
          this.pathZ(path2d);
          break;

        default:
      }
    }

    const pathArr = [];
    // 处理未连接部分
    let endPnts = null;
    for (let i = 0; i < path2d.subPaths.length; i += 1) {
      const subPath = path2d.subPaths[i];
      const v = subPath.getPoints(this.getInsertGeometryPoint(10));
      // v的返回值可能存在单个点数组的情况，后续无法构成path路径
      if (v && v.length > 1) {
        const startPnt = v[0];
        if (endPnts) {
          const endPnt = endPnts[1];
          if (
            Math.abs(endPnt.x - startPnt.x) < 10e-8 &&
            Math.abs(endPnt.y - startPnt.y) < 10e-8
          ) {
            v.unshift(endPnts[0]);
          }
        }
        endPnts = [v[v.length - 2], v[v.length - 1]];
        pathArr.push(v);
      } else {
        endPnts = null;
      }
    }
    return pathArr;
  }

  _getCoords(matrix) {
    const pathArr = this._geometryPnts();
    let v = [];
    if (Array.isArray(matrix)) {
      matrix.forEach((m) => {
        let t = [];
        for (let i = 0; i < pathArr.length; i += 1) {
          t.push([])
          for (let j = 0; j < pathArr[i].length; j += 1) {
            let p = pathArr[i][j].clone();
            p.applyMatrix3(m);
            t[i].push(p);
          }
          v = v.concat(t)
        }
      });
    } else {
      for (let i = 0; i < pathArr.length; i += 1) {
        for (let j = 0; j < pathArr[i].length; j += 1) {
          pathArr[i][j].applyMatrix3(matrix);
        }
      }
      v = pathArr;
    }

    return v;

  }

  getCoords() {
    const transformMatrix = this._getTransform();
    const matrix = this._getMatrix();
    let _coords = [];
    if (this.isAllowCoords) {
      if (Array.isArray(transformMatrix)) {
        const trueMatrixs = transformMatrix.map((s) => {
          return matrix.clone().multiply(s);
        });
        _coords = this._getCoords(trueMatrixs);
      } else {
        const tureMatrix = transformMatrix.clone().multiply(matrix);
        _coords = this._getCoords(tureMatrix);
      }
    } else {
      _coords = [];
    }

    return _coords;
  }

  getBounds() {
    const _coords = this.cacheCoords || this.getCoords();
    const bounds = new Bounds();
    _coords.forEach((s) => {
      s.forEach((t) => {
        bounds.addPnt(t.x, t.y);
      });
    });
    const lineWidth = this.getMapScaleLineWidth();

    if (lineWidth > 0.01) {
      bounds.extendBoundsArea(lineWidth / 2, lineWidth / 2);
    }
    return bounds;
  }

  getBoundingBox() {
    const bound = new Bounds();
    const matrix = this._getMatrix();
    const pnts = this._getCoords(matrix).flat();

    pnts.forEach((t) => {
      bound.addPnt(t.x, t.y);
    });

    return bound;
  }

  _clone(cloneObject) {
    super._clone(cloneObject);
    cloneObject._pathParser = new PathParser(
      this.getAttribute("d").getString()
    );
  }

  /* draw */

  static pathM(pathParser) {
    const point = pathParser.getAsCurrentPoint();

    pathParser.start = pathParser.current;

    return {
      point,
    };
  }

  pathM(ctx) {
    const pathParser = this._pathParser;
    const {point} = PathElement.pathM(pathParser);

    pathParser.addMarker(point);

    if (ctx) {
      ctx.moveTo(point.x, point.y);
    }
  }

  static pathL(pathParser) {
    const {current} = pathParser;
    const point = pathParser.getAsCurrentPoint();

    return {
      current,
      point,
    };
  }

  pathL(ctx) {
    const pathParser = this._pathParser;
    const {current, point} = PathElement.pathL(pathParser);

    pathParser.addMarker(point, current);

    if (ctx) {
      ctx.lineTo(point.x, point.y);
    }
  }

  static pathH(pathParser) {
    const {current, command} = pathParser;
    const point = new Point(
      (command.relative ? current.x : 0) + command.x,
      current.y
    );

    pathParser.current = point;

    return {
      current,
      point,
    };
  }

  pathH(ctx) {
    const pathParser = this._pathParser;
    const {current, point} = PathElement.pathH(pathParser);

    pathParser.addMarker(point, current);

    if (ctx) {
      ctx.lineTo(point.x, point.y);
    }
  }

  static pathV(pathParser) {
    const {current, command} = pathParser;
    const point = new Point(
      current.x,
      (command.relative ? current.y : 0) + command.y
    );

    pathParser.current = point;

    return {
      current,
      point,
    };
  }

  pathV(ctx) {
    const pathParser = this._pathParser;
    const {current, point} = PathElement.pathV(pathParser);

    pathParser.addMarker(point, current);

    if (ctx) {
      ctx.lineTo(point.x, point.y);
    }
  }

  static pathC(pathParser) {
    const {current} = pathParser;
    const point = pathParser.getPoint("x1", "y1");
    const controlPoint = pathParser.getAsControlPoint("x2", "y2");
    const currentPoint = pathParser.getAsCurrentPoint();

    return {
      current,
      point,
      controlPoint,
      currentPoint,
    };
  }

  pathC(ctx) {
    const pathParser = this._pathParser;
    const {current, point, controlPoint, currentPoint} =
      PathElement.pathC(pathParser);

    pathParser.addMarker(currentPoint, controlPoint, point);

    if (ctx) {
      ctx.bezierCurveTo(
        point.x,
        point.y,
        controlPoint.x,
        controlPoint.y,
        currentPoint.x,
        currentPoint.y
      );
    }
  }

  static pathS(pathParser) {
    const {current} = pathParser;
    const point = pathParser.getReflectedControlPoint();
    const controlPoint = pathParser.getAsControlPoint("x2", "y2");
    const currentPoint = pathParser.getAsCurrentPoint();

    return {
      current,
      point,
      controlPoint,
      currentPoint,
    };
  }

  pathS(ctx) {
    const pathParser = this._pathParser;
    const {current, point, controlPoint, currentPoint} =
      PathElement.pathS(pathParser);

    pathParser.addMarker(currentPoint, controlPoint, point);

    if (ctx) {
      ctx.bezierCurveTo(
        point.x,
        point.y,
        controlPoint.x,
        controlPoint.y,
        currentPoint.x,
        currentPoint.y
      );
    }
  }

  static pathQ(pathParser) {
    const {current} = pathParser;
    const controlPoint = pathParser.getAsControlPoint("x1", "y1");
    const currentPoint = pathParser.getAsCurrentPoint();

    return {
      current,
      controlPoint,
      currentPoint,
    };
  }

  pathQ(ctx) {
    const pathParser = this._pathParser;
    const {controlPoint, currentPoint} = PathElement.pathQ(pathParser);

    pathParser.addMarker(currentPoint, controlPoint, controlPoint);

    if (ctx) {
      ctx.quadraticCurveTo(
        controlPoint.x,
        controlPoint.y,
        currentPoint.x,
        currentPoint.y
      );
    }
  }

  static pathT(pathParser) {
    const {current} = pathParser;
    const controlPoint = pathParser.getReflectedControlPoint();

    pathParser.control = controlPoint;

    const currentPoint = pathParser.getAsCurrentPoint();

    return {
      current,
      controlPoint,
      currentPoint,
    };
  }

  pathT(ctx) {
    const pathParser = this._pathParser;
    const {current, controlPoint, currentPoint} =
      PathElement.pathT(pathParser);

    pathParser.addMarker(currentPoint, controlPoint, controlPoint);

    if (ctx) {
      ctx.quadraticCurveTo(
        controlPoint.x,
        controlPoint.y,
        currentPoint.x,
        currentPoint.y
      );
    }
  }

  static pathA(pathParser) {
    const {current, command} = pathParser;
    let {rX, rY} = command;
    const {xRot, lArcFlag, sweepFlag} = command;
    const xAxisRotation = xRot * (Math.PI / 180.0);
    const currentPoint = pathParser.getAsCurrentPoint();
    // Conversion from endpoint to center parameterization
    // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
    // x1', y1'
    const currp = new Point(
      (Math.cos(xAxisRotation) * (current.x - currentPoint.x)) / 2.0 +
      (Math.sin(xAxisRotation) * (current.y - currentPoint.y)) / 2.0,
      (-Math.sin(xAxisRotation) * (current.x - currentPoint.x)) / 2.0 +
      (Math.cos(xAxisRotation) * (current.y - currentPoint.y)) / 2.0
    );
    // adjust radii
    const l =
      Math.pow(currp.x, 2) / Math.pow(rX, 2) +
      Math.pow(currp.y, 2) / Math.pow(rY, 2);

    if (l > 1) {
      rX *= Math.sqrt(l);
      rY *= Math.sqrt(l);
    }

    // cx', cy'
    let s =
      (lArcFlag === sweepFlag ? -1 : 1) *
      Math.sqrt(
        (Math.pow(rX, 2) * Math.pow(rY, 2) -
          Math.pow(rX, 2) * Math.pow(currp.y, 2) -
          Math.pow(rY, 2) * Math.pow(currp.x, 2)) /
        (Math.pow(rX, 2) * Math.pow(currp.y, 2) +
          Math.pow(rY, 2) * Math.pow(currp.x, 2))
      );

    if (Number.isNaN(s)) {
      s = 0;
    }

    const cpp = new Point((s * rX * currp.y) / rY, (s * -rY * currp.x) / rX);
    // cx, cy
    const centp = new Point(
      (current.x + currentPoint.x) / 2.0 +
      Math.cos(xAxisRotation) * cpp.x -
      Math.sin(xAxisRotation) * cpp.y,
      (current.y + currentPoint.y) / 2.0 +
      Math.sin(xAxisRotation) * cpp.x +
      Math.cos(xAxisRotation) * cpp.y
    );
    // initial angle
    const a1 = vectorsAngle(
      [1, 0],
      [(currp.x - cpp.x) / rX, (currp.y - cpp.y) / rY]
    ); // θ1
    // angle delta
    const u = [(currp.x - cpp.x) / rX, (currp.y - cpp.y) / rY];
    const v = [(-currp.x - cpp.x) / rX, (-currp.y - cpp.y) / rY];
    let ad = vectorsAngle(u, v); // Δθ

    if (vectorsRatio(u, v) <= -1) {
      ad = Math.PI;
    }

    if (vectorsRatio(u, v) >= 1) {
      ad = 0;
    }

    return {
      currentPoint,
      rX,
      rY,
      sweepFlag,
      xAxisRotation,
      centp,
      a1,
      ad,
    };
  }

  svgAngle(ux, uy, vx, vy) {
    const dot = ux * vx + uy * vy;
    const len = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
    let ang = Math.acos(Math.max(-1, Math.min(1, dot / len))); // floating point precision, slightly over values appear

    if (ux * vy - uy * vx < 0) ang = -ang;
    return ang;
  }

  parseArcCommand(
    path,
    rx,
    ry,
    x_axis_rotation,
    large_arc_flag,
    sweep_flag,
    start,
    end
  ) {
    if (rx === 0 || ry === 0) {
      // draw a line if either of the radii == 0
      path.lineTo(end.x, end.y);
      return;
    }

    x_axis_rotation = (x_axis_rotation * Math.PI) / 180; // Ensure radii are positive

    rx = Math.abs(rx);
    ry = Math.abs(ry); // Compute (x1', y1')

    const dx2 = (start.x - end.x) / 2.0;
    const dy2 = (start.y - end.y) / 2.0;
    const x1p =
      Math.cos(x_axis_rotation) * dx2 + Math.sin(x_axis_rotation) * dy2;
    const y1p =
      -Math.sin(x_axis_rotation) * dx2 + Math.cos(x_axis_rotation) * dy2; // Compute (cx', cy')

    let rxs = rx * rx;
    let rys = ry * ry;
    const x1ps = x1p * x1p;
    const y1ps = y1p * y1p; // Ensure radii are large enough

    const cr = x1ps / rxs + y1ps / rys;

    if (cr > 1) {
      // scale up rx,ry equally so cr == 1
      const s = Math.sqrt(cr);
      rx = s * rx;
      ry = s * ry;
      rxs = rx * rx;
      rys = ry * ry;
    }

    const dq = rxs * y1ps + rys * x1ps;
    const pq = (rxs * rys - dq) / dq;
    let q = Math.sqrt(Math.max(0, pq));
    if (large_arc_flag === sweep_flag) q = -q;
    const cxp = (q * rx * y1p) / ry;
    const cyp = (-q * ry * x1p) / rx; // Step 3: Compute (cx, cy) from (cx', cy')

    const cx =
      Math.cos(x_axis_rotation) * cxp -
      Math.sin(x_axis_rotation) * cyp +
      (start.x + end.x) / 2;
    const cy =
      Math.sin(x_axis_rotation) * cxp +
      Math.cos(x_axis_rotation) * cyp +
      (start.y + end.y) / 2; // Step 4: Compute θ1 and Δθ

    const theta = this.svgAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
    const delta =
      this.svgAngle(
        (x1p - cxp) / rx,
        (y1p - cyp) / ry,
        (-x1p - cxp) / rx,
        (-y1p - cyp) / ry
      ) %
      (Math.PI * 2);
    path.currentPath.absellipse(
      cx,
      cy,
      rx,
      ry,
      theta,
      theta + delta,
      sweep_flag === 0,
      x_axis_rotation
    );
  }

  pathA(ctx) {
    const pathParser = this._pathParser;
    const {currentPoint, rX, rY, sweepFlag, xAxisRotation, centp, a1, ad} =
      PathElement.pathA(pathParser);
    // for markers
    const dir = 1 - sweepFlag ? 1.0 : -1.0;
    const ah = a1 + dir * (ad / 2.0);
    const halfWay = new Point(
      centp.x + rX * Math.cos(ah),
      centp.y + rY * Math.sin(ah)
    );

    pathParser.addMarkerAngle(halfWay, ah - (dir * Math.PI) / 2);
    pathParser.addMarkerAngle(currentPoint, ah - dir * Math.PI);

    const {command} = pathParser;

    const start = new Vector2(currentPoint.x, currentPoint.y);
    let end = null;
    if (command.relative) {
      end = new Vector2(currentPoint.x - command.x, currentPoint.y - command.y);
    } else {
      end = new Vector2(command.x, command.y);
    }

    // 当传入屏幕坐标时，开始点和结束点互换，二维上保证角度方向一致。
    // 问题描述：由于椭圆几何类适用于直角坐标系下，当传入屏幕坐标系下控制点时，圆弧方向会出现错误。
    this.parseArcCommand(
      ctx,
      command.rX,
      command.rY,
      command.xRot,
      command.lArcFlag,
      command.sweepFlag,
      end,
      start
    );
  }

  static pathZ(pathParser) {
    pathParser.current = pathParser.start;
  }

  pathZ(ctx) {
    PathElement.pathZ(this._pathParser);
    if (ctx) {
      ctx.closePath();
    }
  }
}
