/*
 * @Description: 动画基础类
 * @Author: zk
 * @Date: 2022-03-23 10:02:49
 * @LastEditors: zk
 * @LastEditTime: 2022-05-13 13:33:39
 */
import  Point  from "../../../../PlotUtilBase/Geometry/Point";
import Spline from "../../../../PlotUtilBase/Geometry/Spline";
import { PlotBaseAnimation } from "../PlotBaseAnimation";

export class PlotGrowAnimation extends PlotBaseAnimation {
  constructor(options) {
    super(options);
    // animation type
    this.animationType = "grow-animation";
    // init options
    this.startRate = options.startRate || 0;
    this.endRate = options.endRate || 0;
    // init base attrs
    this._init();
  }
  _init() {
    const plotObjects = this._plotObjects;
    this._animationPolys = plotObjects.map((s) => {
      const elem = s.getElement();
      if (elem) {
        return elem.positions.map((s) => new Point(s.x, s.y));
      }
    });
    this._splines = this._animationPolys.map((s) => {
      return new Spline(s);
    });
  }
  restore() {
    super.restore();
    this._plotObjects.forEach((s, i) => {
      this._setPnts(s, this._animationPolys[i]);
    });
  }
  _setPnts(obj, positions) {
    if (obj.positions) {
      obj.positions = positions;
    }
    if (obj.setPnts) {
      obj.setPnts(positions);
    }
  }
  render(rate) {
    const startRate = this.startRate;
    const endRate = this.endRate;
    let trueRate = (endRate - startRate) * rate + startRate;
    this._splines.forEach((t, index) => {
      const animationPoly = this._animationPolys[index];
      const animationObject = this._plotObjects[index];
      if (animationPoly.length > 0) {
        const temp = t.getTransfromByRate(trueRate);
        const startPnt = animationPoly[0];
        const i = temp[2];
        const p = temp[0];
        let pArr = [];
        if (
          Math.abs(startPnt.x - p[0]) > 10e-8 ||
          Math.abs(startPnt.y - p[1]) > 10e-8
        ) {
          pArr = pArr.concat(animationPoly.slice(0, i + 1));
          pArr.push(new Point(p[0], p[1]));
        }

        if (pArr.length > 1) {
          this._setPnts(animationObject, pArr);
        }
      }
    });
    this.handRefresh();
  }
}
