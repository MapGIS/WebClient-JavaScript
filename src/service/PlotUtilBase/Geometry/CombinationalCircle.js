import { defaultValue, Check } from "../Check";
import MathUtil from "../Util/MathUtil";
import Circle from "./Circle";
import GeomUtil from "./GeomUtil";
import Point from "./Point";
import * as turfHelp from "@turf/helpers";
import polygonize from "@turf/polygonize";

function adjustAngle(angle) {
  for (; angle > 360; ) angle -= 360;
  for (; angle < 0; ) angle += 360;
  return angle;
}
/**
 * 组合圆
 */
export default class CombinationalCircle {
  constructor(options) {
    Check.defined(options.controlPoints);
    this._controlPoints = options.controlPoints;
    this._radius = defaultValue(options.radius, 60);
    this._angleRange = [];
    this._scaleValues = [];
  }

  calculate() {
    let pnts = [];
    let allCirclePnts = [];
    // 分类数组
    const ctrlPnts = this._controlPoints;
    const ctrlPntsLen = ctrlPnts.length;
    for (let i = 0; i < ctrlPntsLen; i += 1) {
      this._scaleValues[i] = this._radius;
      this._angleRange[i] = [{ Start: 0, End: 360 }];
    }

    for (let i = 0; i < ctrlPntsLen; i += 1) {
      if (this._angleRange[i].length === 0) continue;

      if (
        this._angleRange[i][0].Start === 0 &&
        this._angleRange[i][0].End === 0
      )
        continue;

      for (let j = i + 1; j < ctrlPntsLen; j += 1) {
        if (this._angleRange[j].length === 0) continue;

        if (
          this._angleRange[j][0].Start === 0 &&
          this._angleRange[j][0].End === 0
        )
          continue;

        // 计算圆心之间的距离
        const dis = GeomUtil.Distance(ctrlPnts[i], ctrlPnts[j]);
        //两个圆相离
        if (dis > this._scaleValues[i] + this._scaleValues[j]) continue;

        //一个圆在另一个圆内部
        if (dis < Math.abs(this._scaleValues[i] - this._scaleValues[j])) {
          //第i个圆位于另一个圆内部，第i个圆直接移除
          if (this._scaleValues[i] < this._scaleValues[j]) {
            this._angleRange[i][0].Start = 0;
            this._angleRange[i][0].End = 0;
            break;
          }

          this._angleRange[j][0].Start = 0;
          this._angleRange[j][0].End = 0;
        } else {
          //两圆相交
          for (let u = 0; u < 2; u += 1) {
            let index;
            let angle;
            let angle1;
            if (u === 0) {
              index = i;
              angle = MathUtil.RTOD * GeomUtil.Radian(ctrlPnts[i], ctrlPnts[j]);
              angle1 =
                MathUtil.RTOD *
                Math.acos(
                  (dis * dis +
                    this._scaleValues[i] * this._scaleValues[i] -
                    this._scaleValues[j] * this._scaleValues[j]) /
                    (2 * dis * this._scaleValues[i])
                );
            } else {
              index = j;
              angle = MathUtil.RTOD * GeomUtil.Radian(ctrlPnts[j], ctrlPnts[i]);
              angle1 =
                MathUtil.RTOD *
                Math.acos(
                  (dis * dis +
                    this._scaleValues[j] * this._scaleValues[j] -
                    this._scaleValues[i] * this._scaleValues[i]) /
                    (2 * dis * this._scaleValues[j])
                );
            }

            let startAngle = angle + angle1;
            let endAngle = angle - angle1;
            let r =
              (endAngle < 0 && startAngle > 0) ||
              startAngle > 360 ||
              endAngle > 360;

            startAngle = adjustAngle(startAngle);
            endAngle = adjustAngle(endAngle);

            for (let m = this._angleRange[index].length - 1; m >= 0; m -= 1) {
              if (r) {
                if (
                  startAngle > this._angleRange[index][m].End ||
                  MathUtil.EqualFuzzy(
                    startAngle,
                    this._angleRange[index][m].End
                  )
                ) {
                  this._angleRange[index].splice(m, 1);
                  continue;
                }

                if (startAngle > this._angleRange[index][m].Start)
                  this._angleRange[index][m].Start = startAngle;

                if (
                  endAngle < this._angleRange[index][m].Start ||
                  MathUtil.EqualFuzzy(
                    endAngle,
                    this._angleRange[index][m].Start
                  )
                ) {
                  this._angleRange[index].splice(m, 1);
                  continue;
                }

                if (endAngle < this._angleRange[index][m].End)
                  this._angleRange[index][m].End = endAngle;
              } else if (
                endAngle < this._angleRange[index][m].Start &&
                startAngle > this._angleRange[index][m].End
              ) {
                this._angleRange[index].splice(m, 1);
              } else if (
                endAngle > this._angleRange[index][m].Start &&
                startAngle < this._angleRange[index][m].End
              ) {
                this._angleRange[index].push({
                  Start: this._angleRange[index][m].Start,
                  End: endAngle,
                });
                this._angleRange[index].push({
                  Start: startAngle,
                  End: this._angleRange[index][m].End,
                });
                this._angleRange[index].splice(m, 1);
              } else {
                if (endAngle > this._angleRange[index][m].End) continue;

                if (endAngle > this._angleRange[index][m].Start)
                  this._angleRange[index][m].End = endAngle;

                if (startAngle < this._angleRange[index][m].Start) continue;

                if (startAngle < this._angleRange[index][m].End)
                  this._angleRange[index][m].Start = startAngle;
              }
            }
          }
        }
      }
    }
    for (let i = 0; i < ctrlPntsLen; i += 1) {
      if (this._angleRange[i].length === 0) continue;

      if (
        this._angleRange[i][0].Start === 0 &&
        this._angleRange[i][0].End === 0
      )
        continue;
      for (let j = this._angleRange[i].length - 1; j >= 0; j -= 1) {
        let start = adjustAngle(this._angleRange[i][j].Start);
        let end = adjustAngle(this._angleRange[i][j].End);
        for (; end < start; ) {
          end += 360;
        }
        if (end - start == 360) {
          const circle = new Circle(ctrlPnts[i], this._scaleValues[i]);
          allCirclePnts.push(...circle.calculate(72));
        } else {
          const coords = [];
          const perAngle = (end - start) / 72;

          for (let m = start; m < end + perAngle / 2; m += perAngle) {
            let x =
              ctrlPnts[i].x +
              this._scaleValues[i] * Math.cos(m * MathUtil.DTOR);
            let y =
              ctrlPnts[i].y +
              this._scaleValues[i] * Math.sin(m * MathUtil.DTOR);

            coords.push(new Point(x, y));
          }
          pnts.push(coords);
        }
      }
    }

    if (pnts.length > 0) {
      const _pnts = pnts.map((s) => s.map((t) => [t.x, t.y]));
      try {
        const polygon = polygonize(turfHelp.multiLineString(_pnts));
        pnts = polygon.features.map((feature) => {
          return feature.geometry.coordinates[0].map(
            (s) => new Point(s[0], s[1])
          );
        });
      } catch(e) {}
    }

    return pnts.concat(allCirclePnts);
  }
}
