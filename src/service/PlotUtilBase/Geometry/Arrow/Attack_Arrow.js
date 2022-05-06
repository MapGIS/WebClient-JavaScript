/* eslint-disable*/
/*
 * @Author: your name
 * @Date: 2021-06-30 13:35:50
 * @LastEditTime: 2021-11-08 17:00:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TypeScript-Babel-Starter\src\Geometry\Attack_Arrow.js
 */

import { PlotUtils } from '../PoltUtils'
import { MathUtil } from 'PlotUtilBase/Util/MathUtil'
import { GeomUtil } from '../GeomUtil'

export class AttackArrow 
  {
    headHeightFactor= 0.18
    headWidthFactor=0.3
    neckHeightFactor= 0.85
    neckWidthFactor= 0.15
    headTailFactor= 0.8
    points=[]
    constructor(points) {
      this.points = points
    }
     insertPoints(points) {
      let count = points.length
      if (count <= 2) {
        return points
      }
      const pnts = points
      // 计算箭尾
      let tailLeft = pnts[0]
      let tailRight = pnts[1]
      if (PlotUtils.isClockWise(pnts[0], pnts[1], pnts[2])) {
        ;[tailRight, tailLeft] = pnts
      }
      const midTail = [
        GeomUtil.SegMid(tailLeft, tailRight).x,
        GeomUtil.SegMid(tailLeft, tailRight).y,
      ]
      const bonePnts = [midTail].concat(pnts.slice(2))
      // 计算箭头
      const headPnts = this.getArrowHeadPoints(bonePnts, tailLeft, tailRight)
      const neckLeft = headPnts[0]
      const neckRight = headPnts[4]
      const tailWidthFactor =
        GeomUtil.Distance(tailLeft, tailRight) /
        PlotUtils.getBaseLength(bonePnts)
      // 计算箭身
      const bodyPnts = this.getArrowBodyPoints(
        bonePnts,
        neckLeft,
        neckRight,
        tailWidthFactor
      )
      // 整合
      count = bodyPnts.length
      let leftPnts = [tailLeft].concat(bodyPnts.slice(0, count / 2))
      leftPnts.push(neckLeft)
      let rightPnts = [tailRight].concat(bodyPnts.slice(count / 2, count))
      rightPnts.push(neckRight)

      leftPnts = PlotUtils.getQBSplinePoints(leftPnts)
      rightPnts = PlotUtils.getQBSplinePoints(rightPnts)
      return leftPnts.concat(headPnts, rightPnts.reverse())
    }
    getPoints() {
      return this.insertPoints(this.points)
    }
    getArrowHeadPoints(
      points,
      tailLeft,
      tailRight
    ) {
      let len = PlotUtils.getBaseLength(points)
      let headHeight = len * this.headHeightFactor
      const headPnt = points[points.length - 1]
      len = GeomUtil.Distance(headPnt, points[points.length - 2])
      const tailWidth = GeomUtil.Distance(tailLeft, tailRight)
      if (headHeight > tailWidth * this.headTailFactor) {
        headHeight = tailWidth * this.headTailFactor
      }
      const headWidth = headHeight * this.headWidthFactor
      const neckWidth = headHeight * this.neckWidthFactor
      headHeight = headHeight > len ? len : headHeight
      const neckHeight = headHeight * this.neckHeightFactor
      const headEndPnt = PlotUtils.getThirdPoint(
        points[points.length - 2],
        headPnt,
        0,
        headHeight,
        true
      )
      const neckEndPnt = PlotUtils.getThirdPoint(
        points[points.length - 2],
        headPnt,
        0,
        neckHeight,
        true
      )
      const headLeft = PlotUtils.getThirdPoint(
        headPnt,
        headEndPnt,
        MathUtil.HALF_PI,
        headWidth,
        false
      )
      const headRight = PlotUtils.getThirdPoint(
        headPnt,
        headEndPnt,
        MathUtil.HALF_PI,
        headWidth,
        true
      )
      const neckLeft = PlotUtils.getThirdPoint(
        headPnt,
        neckEndPnt,
        MathUtil.HALF_PI,
        neckWidth,
        false
      )
      const neckRight = PlotUtils.getThirdPoint(
        headPnt,
        neckEndPnt,
        MathUtil.HALF_PI,
        neckWidth,
        true
      )
      return [neckLeft, headLeft, headPnt, headRight, neckRight]
    }
    getArrowBodyPoints(
      points,
      neckLeft,
      neckRight,
      tailWidthFactor
    ) {
      const allLen = GeomUtil.PolylinDistance(points)
      const len = PlotUtils.getBaseLength(points)
      const tailWidth = len * tailWidthFactor
      const neckWidth = GeomUtil.Distance(neckLeft, neckRight)
      const widthDif = (tailWidth - neckWidth) / 2
      let tempLen = 0
      const leftBodyPnts = []
      const rightBodyPnts = []
      for (let i = 1; i < points.length - 1; i += 1) {
        const angle =
          PlotUtils.getAngleOfThreePoints(
            points[i - 1],
            points[i],
            points[i + 1]
          ) / 2
        tempLen += GeomUtil.Distance(points[i - 1], points[i])
        const w =
          (tailWidth / 2 - (tempLen / allLen) * widthDif) / Math.sin(angle)
        const left = PlotUtils.getThirdPoint(
          points[i - 1],
          points[i],
          Math.PI - angle,
          w,
          true
        )
        const right = PlotUtils.getThirdPoint(
          points[i - 1],
          points[i],
          angle,
          w,
          false
        )
        leftBodyPnts.push(left)
        rightBodyPnts.push(right)
      }
      return leftBodyPnts.concat(rightBodyPnts)
    }
  }

