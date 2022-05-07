/*
 * @Author: your name
 * @Date: 2021-07-01 09:30:22
 * @LastEditTime: 2021-11-08 17:15:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \leaflet-mark-dtis\src\Component\Geometry\Squad_Arrow.js
 */
import AttackArrow from './Attack_Arrow'
import {PlotUtils} from '../PoltUtils'
import MathUtil from '../../Util/MathUtil'

export default class SquadArrow extends AttackArrow {
  constructor(props) {
    super(props);
    this.headHeightFactor = 0.18
    this.headWidthFactor = 0.3
    this.neckHeightFactor = 0.85
    this.neckWidthFactor = 0.15
    this.tailWidthFactor = 0.1
  }

  insertPoints(points) {
    const count = points.length
    if (count < 2) {
      return this.points
    }
    const pnts = points
    // 有时用户移动过快或者过慢，_onMouseMove捕获到的坐标会和onTouch捕获到的坐标一样。
    // 为了防止这种事情发生：
    if (
      pnts[pnts.length - 1][1] === pnts[pnts.length - 2][1] &&
      pnts[pnts.length - 1][2] === pnts[pnts.length - 2][2]
    ) {
      return pnts
    }
    const tailPnts = this.getTailPoints(pnts)
    const headPnts = this.getArrowHeadPoints(pnts, tailPnts[0], tailPnts[1])
    const neckLeft = headPnts[0]
    const neckRight = headPnts[4]
    const bodyPnts = this.getArrowBodyPoints(
      pnts,
      neckLeft,
      neckRight,
      this.tailWidthFactor
    )
    const bodyPntscount = bodyPnts.length
    let leftPnts = [tailPnts[0]].concat(bodyPnts.slice(0, bodyPntscount / 2))
    leftPnts.push(neckLeft)
    let rightPnts = [tailPnts[1]].concat(
      bodyPnts.slice(bodyPntscount / 2, bodyPntscount)
    )
    rightPnts.push(neckRight)
    leftPnts = PlotUtils.getQBSplinePoints(leftPnts)
    rightPnts = PlotUtils.getQBSplinePoints(rightPnts)
    return leftPnts.concat(headPnts, rightPnts.reverse())
  }

  getTailPoints(points) {
    const allLen = PlotUtils.getBaseLength(points)
    const tailWidth = allLen * this.tailWidthFactor
    const tailLeft = PlotUtils.getThirdPoint(
      points[1],
      points[0],
      MathUtil.HALF_PI,
      tailWidth,
      false
    )
    const tailRight = PlotUtils.getThirdPoint(
      points[1],
      points[0],
      MathUtil.HALF_PI,
      tailWidth,
      true
    )
    return [tailLeft, tailRight]
  }
}
