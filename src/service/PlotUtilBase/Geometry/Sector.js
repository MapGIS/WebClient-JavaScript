/* eslint-disable*/
/*
 * @Author: your name
 * @Date: 2021-06-30 13:35:50
 * @LastEditTime: 2022-02-17 16:11:52
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \TypeScript-Babel-Starter\src\Geometry\Attack_Arrow.js
 */
import { PlotUtils } from "./PoltUtils";
import { GeomUtil } from "./GeomUtil";

export class Sector {
  points = [];
  constructor(points, options) {
    this.points = points;
    this.angleInverse = options.angleInverse || false;
  }
  insertPoints(points) {
    const count = points.length;
    if (count <= 2) {
      return points;
    }
    const pnts = points;
    let center = pnts[0];
    let pnt2 = pnts[1];
    let pnt3 = pnts[2];
    let radius = GeomUtil.Distance(pnt2, center);

    let startPnt, endPnt;
    startPnt = pnt3;
    endPnt = pnt2;

    if (this.angleInverse) {
      startPnt = pnt2;
      endPnt = pnt3;
    } else {
      startPnt = pnt3;
      endPnt = pnt2;
    }

    let startAngle = PlotUtils.getAzimuth(startPnt, center);
    let endAngle = PlotUtils.getAzimuth(endPnt, center);
    let pList = PlotUtils.getArcPoints(center, radius, startAngle, endAngle);
    pList.push(center, pList[0]);
    return pList;
  }
  getPoints() {
    return this.insertPoints(this.points);
  }
}
