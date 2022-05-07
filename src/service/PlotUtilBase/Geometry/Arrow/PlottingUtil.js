import MathUtil from '../../Util/MathUtil';
import GeomUtil from '../GeomUtil';
import Point from '../Point';

export default class PlottingUtil {
  static clonePolyline(pnts) {
    const newPnts = []
    for (let i = 0; i < pnts.length; i += 1) {
      newPnts.push(pnts[i].clone())
    }

    return newPnts
  }

  static getSidePointsOfLine(width, pnt1, pnt0) {
    const x1 = pnt1.x
    const y1 = pnt1.y
    const x0 = pnt0.x
    const y0 = pnt0.y

    const dis = pnt1.distanceTo(pnt0)

    const r = (width * (x1 - x0)) / dis
    const p = (width * (y1 - y0)) / dis

    return {
      left: new Point(x0 + p, y0 - r),
      right: new Point(x0 - p, y0 + r),
    }
  }

  static getTrianglePoints(rate1, rate2, pnt1, pnt2, pnt3, pntout1, pntout2) {
    const x1 = pnt1.x
    const y1 = pnt1.y
    const x2 = pnt2.x
    const y2 = pnt2.y
    const x3 = pnt3.x
    const y3 = pnt3.y
    let x5 = 0
    let y5 = 0

    let x4 = x2 + (x3 - x1)
    let y4 = y2 + (y3 - y1)
    if (x1 === x3) {
      x5 = x1
      y5 = y4
    } else if (y1 === y3) {
      x5 = x4
      y5 = y1
    } else {
      const k = (y3 - y1) / (x3 - x1)
      const b = y1 - k * x1
      x5 = (y4 + x4 / k - b) / (k + 1 / k)
      y5 = k * x5 + b
    }

    let d24 = pnt2.distanceTo(new Point(x4, y4))
    const d12 = pnt1.distanceTo(pnt2)
    const d23 = pnt2.distanceTo(pnt3)
    let S = 0
    S = d12 + d23 ? 1 + ((d23 - d12) * rate1) / (d23 + d12) : 1
    x4 = x5 + (x4 - x5) * S
    y4 = y5 + (y4 - y5) * S

    if (d24 === 0) d24 = 1

    pntout1.x = x2 + ((x2 - x4) * d12) / (rate2 * d24)
    pntout1.y = y2 + ((y2 - y4) * d12) / (rate2 * d24)
    pntout2.x = x2 + ((x4 - x2) * d23) / (rate2 * d24)
    pntout2.y = y2 + ((y4 - y2) * d23) / (rate2 * d24)
  }

  static getTrapezoidPoints(rate, pnt2, pnt1, pnt0, pntout) {
    const x2 = pnt2.x
    const y2 = pnt2.y
    const x1 = pnt1.x
    const y1 = pnt1.y
    const x0 = pnt0.x
    const y0 = pnt0.y
    let x4 = 0
    let y4 = 0
    let x5 = 0
    let y5 = 0

    if (y2 === y1) {
      x4 = x2 + x1 - x0
      y4 = y0
    } else if (x2 === x1) {
      x4 = x0
      y4 = y2 + y1 - y0
    } else {
      const k = (y2 - y1) / (x2 - x1)
      const b = y0 - k * x0
      x4 = ((y1 + y2) / 2 + (x2 + x1) / (2 * k) - b) / (k + 1 / k)
      y4 = k * x4 + b
      x4 = 2 * x4 - x0
      y4 = 2 * y4 - y0
    }

    const d21 = pnt2.distanceTo(pnt1)
    const d24 = pnt2.distanceTo(new Point(x4, y4))
    if (d21 > 0) {
      x5 = x2 + ((x1 - x2) * d24) / d21
      y5 = y2 + ((y1 - y2) * d24) / d21
    } else {
      x5 = x2
      y5 = y2
    }

    pntout.x = x5 + (x4 - x5) * rate
    pntout.y = y5 + (y4 - y5) * rate

    return pntout
  }

  static getIncentrePntOnSegmBydis(dis, pnt1, pnt2) {
    const d12 = pnt1.distanceTo(pnt2)
    if (d12 === 0) {
      return new Point(pnt1.x, pnt1.y)
    }

    const scale = dis / d12
    return new Point(
      pnt1.x + (pnt2.x - pnt1.x) * scale,
      pnt1.y + (pnt2.y - pnt1.y) * scale
    )
  }

  static getExcentrePntOnSegBydis(dis, pnt1, pnt2) {
    const d12 = pnt1.distanceTo(pnt2)
    if (d12 === 0) {
      return new Point(pnt1.x, pnt1.y)
    }
    const scale = dis / d12
    return new Point(
      pnt1.x + (pnt1.x - pnt2.x) * scale,
      pnt1.y + (pnt1.y - pnt2.y) * scale
    )
  }

  static isRight(pnt1, pnt2, pnt3) {
    return (
      (pnt3.x - pnt2.x) * (pnt1.y - pnt2.y) -
        (pnt1.x - pnt2.x) * (pnt3.y - pnt2.y) <
      0
    )
  }

  static getBeizerCtrlPnt(pnts) {
    const ret = []
    const pntNum = pnts.length
    if (pntNum < 3) return ret

    for (let i = 0; i < pntNum; i += 1) {
      ret.push(pnts[i].clone())
      ret.push(new Point(0, 0))
      ret.push(new Point(0, 0))
    }

    for (let i = 1; i < pntNum - 1; i += 1) {
      PlottingUtil.getTrianglePoints(
        8,
        3,
        pnts[i - 1],
        pnts[i],
        pnts[i + 1],
        ret[3 * i + 1],
        ret[3 * i + 2]
      )
    }

    PlottingUtil.getTrapezoidPoints(0.6, ret[0], ret[3], ret[4], ret[2])
    PlottingUtil.getTrapezoidPoints(
      0.6,
      ret[3 * pntNum - 3],
      ret[3 * pntNum - 6],
      ret[3 * pntNum - 4],
      ret[3 * pntNum - 2]
    )

    ret[1] = pnts[0].clone()
    ret[3 * pntNum - 1] = pnts[pntNum - 1].clone()

    return ret
  }

  static generateBeizerPntsByCtrlPnts(pnts) {
    const pntNum = pnts.length
    if (pntNum < 3) return null

    const ret = []
    for (let i = 0; i < pntNum; i += 3) {
      if (i + 4 > pntNum) continue

      const { x } = pnts[i]
      const { y } = pnts[i]
      const x3 = pnts[i + 3].x
      const y3 = pnts[i + 3].y
      const x2 = pnts[i + 2].x
      const y2 = pnts[i + 2].y
      const x4 = pnts[i + 4].x
      const y4 = pnts[i + 4].y

      const dis02 = pnts[i].distanceTo(pnts[i + 2])
      const dis34 = pnts[i + 3].distanceTo(pnts[i + 4])
      if (MathUtil.EqualFuzzy(dis02, 0) && MathUtil.EqualFuzzy(dis34, 0)) {
        ret.push(pnts[i].clone())
        ret.push(pnts[i + 4].clone())
      } else {
        for (let j = 0; j <= 1; j += 0.03125) {
          const square = j * j
          const cube = square * j

          const temp1 = 1 - 3 * j + 3 * square - cube
          const temp2 = 3 * (j - 2 * square + cube)
          const temp3 = 3 * (square - cube)
          ret.push(
            new Point(
              temp1 * x + temp2 * x2 + temp3 * x4 + cube * x3,
              temp1 * y + temp2 * y2 + temp3 * y4 + cube * y3
            )
          )
        }
      }
    }

    return ret
  }

  static generateBeizerPntsWithoutCtrlPnts(pnts) {
    const clonePnts = GeomUtil.PolylinClone(pnts)
    const ctrlPnts = PlottingUtil.getBeizerCtrlPnt(clonePnts)
    return PlottingUtil.generateBeizerPntsByCtrlPnts(ctrlPnts)
  }
}
