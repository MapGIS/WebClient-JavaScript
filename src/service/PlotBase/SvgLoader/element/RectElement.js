/*
 * @Author: your name
 * @Date: 2021-05-17 14:39:27
 * @LastEditTime: 2022-05-20 13:58:36
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \TypeScript-Babel-Starter\src\Document\RectElement.ts
 */
import Point from "../../../PlotUtilBase/Geometry/Point.js";
import PathElement from "./PathElement.js";
import { QuadraticBezierCurve } from "../../../PlotUtilBase/Curves";

export default class RectElement extends PathElement {
  constructor(node) {
    super(node);
    this.type = "rect";
  }

  _geometryPnts() {
    const x = this.getAttribute("x").getNumber();
    const y = this.getAttribute("y").getNumber();
    const width = this.getStyle("width").getNumber();
    const height = this.getStyle("height").getNumber();
    const rxAttr = this.getAttribute("rx");
    const ryAttr = this.getAttribute("ry");
    let rx = rxAttr.getNumber();
    let ry = ryAttr.getNumber();

    if (rxAttr.hasValue() && !ryAttr.hasValue()) {
      ry = rx;
    }

    if (ryAttr.hasValue() && !rxAttr.hasValue()) {
      rx = ry;
    }

    rx = Math.min(rx, width / 2.0);
    ry = Math.min(ry, height / 2.0);

    const KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);

    let path = [];
    let s = [];

    s.push(new Point(x + rx, y), new Point(x + width - rx, y));

    if (rx > 10e-8 || ry > 10e-8) {
      const t1 = new QuadraticBezierCurve(
        new Point(x + width - rx + KAPPA * rx, y),
        new Point(x + width, y + ry - KAPPA * ry),
        new Point(x + width, y + ry)
      ).getPoints(this.getInsertGeometryPoint(15));

      s = s.concat(t1);
    }

    s.push(new Point(x + width, y + height - ry));
    if (rx > 10e-8 || ry > 10e-8) {
      const t2 = new QuadraticBezierCurve(
        new Point(x + width, y + height - ry + KAPPA * ry),
        new Point(x + width - rx + KAPPA * rx, y + height),
        new Point(x + width - rx, y + height)
      ).getPoints(this.getInsertGeometryPoint(15));

      s = s.concat(t2);
    }
    s.push(new Point(x + rx, y + height));
    if (rx > 10e-8 || ry > 10e-8) {
      const t3 = new QuadraticBezierCurve(
        new Point(x + rx - KAPPA * rx, y + height),
        new Point(x, y + height - ry + KAPPA * ry),
        new Point(x, y + height - ry)
      ).getPoints(this.getInsertGeometryPoint(15));

      s = s.concat(t3);
    }

    s.push(new Point(x, y + ry));
    if (rx > 10e-8 || ry > 10e-8) {
      const t4 = new QuadraticBezierCurve(
        new Point(x, y + ry - KAPPA * ry),
        new Point(x + rx - KAPPA * rx, y),
        new Point(x + rx, y)
      ).getPoints(this.getInsertGeometryPoint(15));

      s = s.concat(t4);
    }
    path.push(s);
    path = path.map((c) => c.map((t) => new Point(t.x, t.y)));

    return path;
  }
}
