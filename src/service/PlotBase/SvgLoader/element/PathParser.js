/*
 * @Author: your name
 * @Date: 2021-08-30 18:14:21
 * @LastEditTime: 2021-11-16 18:12:34
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\PathParser.js
 */
import { SVGPathData } from "svg-pathdata";
import Point from "../../../PlotUtilBase/Geometry/Point";

export default class PathParser extends SVGPathData {
  constructor(path) {
    super(
      path
        // Fix spaces after signs.
        .replace(/([+\-.])\s+/gm, "$1")
        // Remove invalid part.
        .replace(/[^MmZzLlHhVvCcSsQqTtAae\d\s.,+-].*/g, "")
    );
    this._basePath= path.replace(/([+\-.])\s+/gm, "$1").replace(/[^MmZzLlHhVvCcSsQqTtAae\d\s.,+-].*/g, "")
    this.control = null;
    this.start = null;
    this.current = null;
    this.command = null;
    this.commands = this.commands;
    this._i = -1;
    this._previousCommand = null;
    this._points = [];
    this._angles = [];
  }

  reset() {
    this._i = -1;
    this.command = null;
    this._previousCommand = null;
    this.start = new Point(0, 0);
    this.control = new Point(0, 0);
    this.current = new Point(0, 0);
    this._points = [];
    this._angles = [];
  }

  isEnd() {
    const { _i, commands } = this;

    return _i >= commands.length - 1;
  }

  next() {
    const command = this.commands[++this._i];

    this._previousCommand = this.command;
    this.command = command;

    return command;
  }

  getPoint(xProp = "x", yProp = "y") {
    const point = new Point(this.command[xProp], this.command[yProp]);

    return this.makeAbsolute(point);
  }

  getAsControlPoint(xProp, yProp) {
    const point = this.getPoint(xProp, yProp);

    this.control = point;

    return point;
  }

  getAsCurrentPoint(xProp, yProp) {
    const point = this.getPoint(xProp, yProp);

    this.current = point;

    return point;
  }

  getReflectedControlPoint() {
    const previousCommand = this.previousCommand.type;

    if (
      previousCommand !== SVGPathData.CURVE_TO &&
      previousCommand !== SVGPathData.SMOOTH_CURVE_TO &&
      previousCommand !== SVGPathData.QUAD_TO &&
      previousCommand !== SVGPathData.SMOOTH_QUAD_TO
    ) {
      return this.current;
    }

    // reflect point
    const {
      current: { x: cx, y: cy },
      control: { x: ox, y: oy },
    } = this;
    const point = new Point(2 * cx - ox, 2 * cy - oy);

    return point;
  }

  makeAbsolute(point) {
    if (this.command.relative) {
      const { x, y } = this.current;

      point.x += x;
      point.y += y;
    }

    return point;
  }

  addMarker(point, from, priorTo) {
    const points = this._points;
    const angles = this._angles;

    // if the last angle isn't filled in because we didn't have this point yet ...
    if (priorTo && angles.length > 0 && !angles[angles.length - 1]) {
      console.log("points[points.length - 1]",points[points.length - 1])
      angles[angles.length - 1] = points[points.length - 1].angleTo(priorTo);
    }

    this.addMarkerAngle(point, from ? from.angleTo(point) : null);
  }

  addMarkerAngle(point, angle) {
    this._points.push(point);
    this._angles.push(angle);
  }

  getMarkerPoints() {
    return this._points;
  }

  getMarkerAngles() {
    const angles = this._angles;
    const len = angles.length;

    for (let i = 0; i < len; i++) {
      if (!angles[i]) {
        for (let j = i + 1; j < len; j++) {
          if (angles[j]) {
            angles[i] = angles[j];
            break;
          }
        }
      }
    }

    return angles;
  }
  clone(){
    return new PathParser(this._basePath)
  }
}
