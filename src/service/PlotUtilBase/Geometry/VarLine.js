/*
 * @Description:
 * @Version: 2.0
 * @Date: 2021-08-01 21:55:49
 * @LastEditTime: 2021-08-02 00:51:13
 * @Author: xinxiao
 * @LastEditors: xinxiao
 */

import { Point } from './Point'

function lineIntersects(
  line1StartX,
  line1StartY,
  line1EndX,
  line1EndY,
  line2StartX,
  line2StartY,
  line2EndX,
  line2EndY
) {
  let a
  let b
  const result = {
    x: null,
    y: null,
    onLine1: false,
    onLine2: false,
  }
  const denominator =
    (line2EndY - line2StartY) * (line1EndX - line1StartX) -
    (line2EndX - line2StartX) * (line1EndY - line1StartY)
  if (denominator === 0) {
    if (result.x !== null && result.y !== null) {
      return result
    }
    return false
  }
  a = line1StartY - line2StartY
  b = line1StartX - line2StartX
  const numerator1 =
    (line2EndX - line2StartX) * a - (line2EndY - line2StartY) * b
  const numerator2 =
    (line1EndX - line1StartX) * a - (line1EndY - line1StartY) * b
  a = numerator1 / denominator
  b = numerator2 / denominator

  // 两条直线交点
  result.x = line1StartX + a * (line1EndX - line1StartX)
  result.y = line1StartY + a * (line1EndY - line1StartY)

  // if line1 is a segment and line2 is infinite, they intersect if:
  if (a >= 0 && a <= 1) {
    result.onLine1 = true
  }
  // if line2 is a segment and line1 is infinite, they intersect if:
  if (b >= 0 && b <= 1) {
    result.onLine2 = true
  }

  if (result.onLine1 && result.onLine2) {
    return new Point(result.x, result.y)
  }
  return false
}

export class Varlin {
  constructor() {
    this.pnts = []
  }

  getPnts() {
    return this.pnts
  }

  getPntNum() {
    return this.pnts.length
  }

  addPnt(x, y) {
    let pnt = null
    if (x instanceof Point) {
      pnt = x
    } else {
      pnt = new Point(x, y)
    }

    const len = this.pnts.length
    if (len > 0 && this.pnts[len - 1].isSamePnt(pnt)) return
    this.pnts.push(pnt)
  }

  getPntByIndex(index) {
    if (index > this.pnts.length - 1) return null
    return this.pnts[index]
  }

  // 计算自相交点
  kinks(tolerance) {
    const res = []
    const len = this.getPntNum()
    const pnts = this.getPnts()
    for (let i = 0; i < len - 1; i += 1) {
      for (let k = i; k < len - 1; k += 1) {
        // 相邻两个线段不处理
        if (Math.abs(i - k) === 1) continue
        // 闭合线第一段和最后一段不处理
        if (
          i === 0 &&
          k === len - 2 &&
          pnts[i].isSamePnt(pnts[k + 1], tolerance)
        )
          continue

        const intersection = lineIntersects(
          pnts[i].x,
          pnts[i].y,
          pnts[i + 1].x,
          pnts[i + 1].y,
          pnts[k].x,
          pnts[k].y,
          pnts[k + 1].x,
          pnts[k + 1].y
        )
        if (intersection) {
          res.push({ pnt: intersection, index: i })
          res.push({ pnt: intersection, index: k })
        }
      }
    }

    res.sort((a, b) => {
      if (
        a.index < b.index ||
        (a.index === b.index &&
          pnts[a.index].distanceTo(a.pnt) < pnts[b.index].distanceTo(b.pnt))
      ) {
        return -1
      }
      return 1
    })
    return res
  }

  clone() {
    const res = new Varlin()
    for (let i = 0; i < this.getPntNum(); i += 1) {
      const pnt = this.getPntByIndex(i)
      res.addPnt(pnt.x, pnt.y)
    }

    return res
  }

  // 自相交剪断
  selfIntersectClip(tolerance) {
    const res = []
    if (this.getPntNum() < 2) return res

    const intersections = this.kinks(tolerance)
    if (!intersections || intersections.length < 1) {
      res.push(this.clone())
      return res
    }

    function CheckAndPushLinToArray(lin, arr) {
      if (lin.getPntNum() < 2) return
      arr.push(lin)
    }
    const pnts = this.getPnts()
    let preIntersectionIndex = -1
    let indexIndex = 0
    let intersectionIndex = intersections[indexIndex].index
    let intersection = intersections[indexIndex].pnt
    let lin = new Varlin()
    for (let i = 0; i < this.getPntNum(); i += 1) {
      lin.addPnt(pnts[i].clone())
      if (i === intersectionIndex) {
        do {
          lin.addPnt(intersection.clone())
          CheckAndPushLinToArray(lin, res)
          lin = new Varlin()
          lin.addPnt(intersection.clone())
          indexIndex += 1
          preIntersectionIndex = intersectionIndex
          if (indexIndex < intersections.length) {
            intersectionIndex = intersections[indexIndex].index
            intersection = intersections[indexIndex].pnt
          }
        } while (
          indexIndex < intersections.length &&
          intersectionIndex === preIntersectionIndex
        )
      }
    }

    CheckAndPushLinToArray(lin, res)

    return res
  }
}
