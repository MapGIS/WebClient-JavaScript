/* eslint-disable*/
/*
 * @Author: your name
 * @Date: 2021-06-30 15:55:20
 * @LastEditTime: 2021-11-08 15:23:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TypeScript-Babel-Starter\src\Geometry\Util\PoltUtils.ts
 */

import { MathUtil } from 'MapGISBase/Util/MathUtil'

import { GeomUtil } from './GeomUtil'

const FITTING_COUNT=100;

const PlotUtils = {}

PlotUtils.getBaseLength = function (points) {
  return Math.pow(GeomUtil.PolylinDistance(points), 0.99)
}

PlotUtils.getCircleCenterOfThreePoints = function (pnt1, pnt2, pnt3) {
  var pntA = [(pnt1[0] + pnt2[0]) / 2, (pnt1[1] + pnt2[1]) / 2]
  var pntB = [pntA[0] - pnt1[1] + pnt2[1], pntA[1] + pnt1[0] - pnt2[0]]
  var pntC = [(pnt1[0] + pnt3[0]) / 2, (pnt1[1] + pnt3[1]) / 2]
  var pntD = [pntC[0] - pnt1[1] + pnt3[1], pntC[1] + pnt1[0] - pnt3[0]]
  return PlotUtils.getIntersectPoint(pntA, pntB, pntC, pntD)
}

PlotUtils.getIntersectPoint = function (pntA, pntB, pntC, pntD) {
  if (pntA[1] == pntB[1]) {
    var f = (pntD[0] - pntC[0]) / (pntD[1] - pntC[1])
    var x = f * (pntA[1] - pntC[1]) + pntC[0]
    var y = pntA[1]
    return [x, y]
  }
  if (pntC[1] == pntD[1]) {
    var e = (pntB[0] - pntA[0]) / (pntB[1] - pntA[1])
    x = e * (pntC[1] - pntA[1]) + pntA[0]
    y = pntC[1]
    return [x, y]
  }
  e = (pntB[0] - pntA[0]) / (pntB[1] - pntA[1])
  f = (pntD[0] - pntC[0]) / (pntD[1] - pntC[1])
  y = (e * pntA[1] - pntA[0] - f * pntC[1] + pntC[0]) / (e - f)
  x = e * y - e * pntA[1] + pntA[0]
  return [x, y]
}

PlotUtils.getAzimuth = function (startPnt, endPnt) {
  var azimuth
  var angle = Math.asin(
    Math.abs(endPnt[1] - startPnt[1]) / GeomUtil.Distance(startPnt, endPnt)
  )
  if (endPnt[1] >= startPnt[1] && endPnt[0] >= startPnt[0])
    azimuth = angle + Math.PI
  else if (endPnt[1] >= startPnt[1] && endPnt[0] < startPnt[0])
    azimuth = MathUtil.TWO_PI - angle
  else if (endPnt[1] < startPnt[1] && endPnt[0] < startPnt[0]) azimuth = angle
  else if (endPnt[1] < startPnt[1] && endPnt[0] >= startPnt[0])
    azimuth = Math.PI - angle
  return azimuth
}

PlotUtils.getAngleOfThreePoints = function (pntA, pntB, pntC) {
  var angle =
    PlotUtils.getAzimuth(pntB, pntA) - PlotUtils.getAzimuth(pntB, pntC)
  return angle < 0 ? angle + MathUtil.TWO_PI : angle
}

PlotUtils.isClockWise = function (pnt1, pnt2, pnt3) {
  return (
    (pnt3[1] - pnt1[1]) * (pnt2[0] - pnt1[0]) >
    (pnt2[1] - pnt1[1]) * (pnt3[0] - pnt1[0])
  )
}

PlotUtils.getPointOnLine = function (t, startPnt, endPnt) {
  var x = startPnt[0] + t * (endPnt[0] - startPnt[0])
  var y = startPnt[1] + t * (endPnt[1] - startPnt[1])
  return [x, y]
}

PlotUtils.getCubicValue = function (t, startPnt, cPnt1, cPnt2, endPnt) {
  t = Math.max(Math.min(t, 1), 0)
  var tp = 1 - t
  var t2 = t * t
  var t3 = t2 * t
  var tp2 = tp * tp
  var tp3 = tp2 * tp
  var x =
    tp3 * startPnt[0] +
    3 * tp2 * t * cPnt1[0] +
    3 * tp * t2 * cPnt2[0] +
    t3 * endPnt[0]
  var y =
    tp3 * startPnt[1] +
    3 * tp2 * t * cPnt1[1] +
    3 * tp * t2 * cPnt2[1] +
    t3 * endPnt[1]
  return [x, y]
}

PlotUtils.getThirdPoint = function (
  startPnt,
  endPnt,
  angle,
  distance,
  clockWise
) {
  var azimuth = PlotUtils.getAzimuth(startPnt, endPnt)
  var alpha = clockWise ? azimuth + angle : azimuth - angle
  var dx = distance * Math.cos(alpha)
  var dy = distance * Math.sin(alpha)
  return [endPnt[0] + dx, endPnt[1] + dy]
}

PlotUtils.getArcPoints = function (center, radius, startAngle, endAngle) {
  var x,
    y,
    pnts = []
  var angleDiff = endAngle - startAngle
  angleDiff = angleDiff < 0 ? angleDiff + MathUtil.TWO_PI : angleDiff
  for (var i = 0; i <= FITTING_COUNT; i++) {
    var angle = startAngle + (angleDiff * i) / FITTING_COUNT
    x = center[0] + radius * Math.cos(angle)
    y = center[1] + radius * Math.sin(angle)
    pnts.push([x, y])
  }
  return pnts
}

PlotUtils.getBisectorNormals = function (t, pnt1, pnt2, pnt3) {
  var normal = PlotUtils.getNormal(pnt1, pnt2, pnt3)
  var dist = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1])
  var uX = normal[0] / dist
  var uY = normal[1] / dist
  var d1 = GeomUtil.Distance(pnt1, pnt2)
  var d2 = GeomUtil.Distance(pnt2, pnt3)
  if (dist > MathUtil.DEFAULT_TOLERANCE) {
    if (PlotUtils.isClockWise(pnt1, pnt2, pnt3)) {
      var dt = t * d1
      var x = pnt2[0] - dt * uY
      var y = pnt2[1] + dt * uX
      var bisectorNormalRight = [x, y]
      dt = t * d2
      x = pnt2[0] + dt * uY
      y = pnt2[1] - dt * uX
      var bisectorNormalLeft = [x, y]
    } else {
      dt = t * d1
      x = pnt2[0] + dt * uY
      y = pnt2[1] - dt * uX
      bisectorNormalRight = [x, y]
      dt = t * d2
      x = pnt2[0] - dt * uY
      y = pnt2[1] + dt * uX
      bisectorNormalLeft = [x, y]
    }
  } else {
    x = pnt2[0] + t * (pnt1[0] - pnt2[0])
    y = pnt2[1] + t * (pnt1[1] - pnt2[1])
    bisectorNormalRight = [x, y]
    x = pnt2[0] + t * (pnt3[0] - pnt2[0])
    y = pnt2[1] + t * (pnt3[1] - pnt2[1])
    bisectorNormalLeft = [x, y]
  }
  return [bisectorNormalRight, bisectorNormalLeft]
}

PlotUtils.getNormal = function (pnt1, pnt2, pnt3) {
  var dX1 = pnt1[0] - pnt2[0]
  var dY1 = pnt1[1] - pnt2[1]
  var d1 = Math.sqrt(dX1 * dX1 + dY1 * dY1)
  dX1 /= d1
  dY1 /= d1

  var dX2 = pnt3[0] - pnt2[0]
  var dY2 = pnt3[1] - pnt2[1]
  var d2 = Math.sqrt(dX2 * dX2 + dY2 * dY2)
  dX2 /= d2
  dY2 /= d2

  var uX = dX1 + dX2
  var uY = dY1 + dY2
  return [uX, uY]
}

PlotUtils.getCurvePoints = function (t, controlPoints) {
  var leftControl = PlotUtils.getLeftMostControlPoint(controlPoints)
  var normals = [leftControl]
  for (var i = 0; i < controlPoints.length - 2; i++) {
    var pnt1 = controlPoints[i]
    var pnt2 = controlPoints[i + 1]
    var pnt3 = controlPoints[i + 2]
    var normalPoints = PlotUtils.getBisectorNormals(t, pnt1, pnt2, pnt3)
    normals = normals.concat(normalPoints)
  }
  var rightControl = PlotUtils.getRightMostControlPoint(controlPoints)
  normals.push(rightControl)
  var points = []
  for (i = 0; i < controlPoints.length - 1; i++) {
    pnt1 = controlPoints[i]
    pnt2 = controlPoints[i + 1]
    points.push(pnt1)
    for (var t = 0; t < FITTING_COUNT; t++) {
      var pnt = PlotUtils.getCubicValue(
        t / FITTING_COUNT,
        pnt1,
        normals[i * 2],
        normals[i * 2 + 1],
        pnt2
      )
      points.push(pnt)
    }
    points.push(pnt2)
  }
  return points
}

PlotUtils.getLeftMostControlPoint = function (controlPoints) {
  var pnt1 = controlPoints[0]
  var pnt2 = controlPoints[1]
  var pnt3 = controlPoints[2]
  var pnts = PlotUtils.getBisectorNormals(0, pnt1, pnt2, pnt3)
  var normalRight = pnts[0]
  var normal = PlotUtils.getNormal(pnt1, pnt2, pnt3)
  var dist = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1])
  if (dist > MathUtil.DEFAULT_TOLERANCE) {
    var mid = GeomUtil.SegMid(pnt1, pnt2)
    var pX = pnt1[0] - mid[0]
    var pY = pnt1[1] - mid[1]

    var d1 = GeomUtil.Distance(pnt1, pnt2)
    // normal at midpoint
    var n = 2.0 / d1
    var nX = -n * pY
    var nY = n * pX

    // upper triangle of symmetric transform matrix
    var a11 = nX * nX - nY * nY
    var a12 = 2 * nX * nY
    var a22 = nY * nY - nX * nX

    var dX = normalRight[0] - mid[0]
    var dY = normalRight[1] - mid[1]

    // coordinates of reflected vector
    var controlX = mid[0] + a11 * dX + a12 * dY
    var controlY = mid[1] + a12 * dX + a22 * dY
  } else {
    controlX = pnt1[0] + t * (pnt2[0] - pnt1[0])
    controlY = pnt1[1] + t * (pnt2[1] - pnt1[1])
  }
  return [controlX, controlY]
}

PlotUtils.getRightMostControlPoint = function (controlPoints) {
  var count = controlPoints.length
  var pnt1 = controlPoints[count - 3]
  var pnt2 = controlPoints[count - 2]
  var pnt3 = controlPoints[count - 1]
  var pnts = PlotUtils.getBisectorNormals(0, pnt1, pnt2, pnt3)
  var normalLeft = pnts[1]
  var normal = PlotUtils.getNormal(pnt1, pnt2, pnt3)
  var dist = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1])
  if (dist > MathUtil.DEFAULT_TOLERANCE) {
    var mid = GeomUtil.SegMid(pnt2, pnt3)
    var pX = pnt3[0] - mid[0]
    var pY = pnt3[1] - mid[1]

    var d1 = GeomUtil.Distance(pnt2, pnt3)
    // normal at midpoint
    var n = 2.0 / d1
    var nX = -n * pY
    var nY = n * pX

    // upper triangle of symmetric transform matrix
    var a11 = nX * nX - nY * nY
    var a12 = 2 * nX * nY
    var a22 = nY * nY - nX * nX

    var dX = normalLeft[0] - mid[0]
    var dY = normalLeft[1] - mid[1]

    // coordinates of reflected vector
    var controlX = mid[0] + a11 * dX + a12 * dY
    var controlY = mid[1] + a12 * dX + a22 * dY
  } else {
    controlX = pnt3[0] + t * (pnt2[0] - pnt3[0])
    controlY = pnt3[1] + t * (pnt2[1] - pnt3[1])
  }
  return [controlX, controlY]
}

PlotUtils.getBezierPoints = function (points) {
  if (points.length <= 2) return points

  var bezierPoints = []
  var n = points.length - 1
  for (var t = 0; t <= 1; t += 0.01) {
    var x = 0,
      y = 0
    for (var index = 0; index <= n; index++) {
      var factor = PlotUtils.getBinomialFactor(n, index)
      var a = Math.pow(t, index)
      var b = Math.pow(1 - t, n - index)
      x += factor * a * b * points[index][0]
      y += factor * a * b * points[index][1]
    }
    bezierPoints.push([x, y])
  }
  bezierPoints.push(points[n])
  return bezierPoints
}

PlotUtils.getBinomialFactor = function (n, index) {
  return (
    PlotUtils.getFactorial(n) /
    (PlotUtils.getFactorial(index) * PlotUtils.getFactorial(n - index))
  )
}

PlotUtils.getFactorial = function getFactorial(n) {
  if (n <= 1) return 1
  if (n == 2) return 2
  if (n == 3) return 6
  if (n == 4) return 24
  if (n == 5) return 120
  var result = 1
  for (var i = 1; i <= n; i++) result *= i
  return result
}

PlotUtils.getQBSplinePoints = function getQBSplinePoints(points) {
  if (points.length <= 2) return points

  var n = 2

  var bSplinePoints = []
  var m = points.length - n - 1
  bSplinePoints.push(points[0])
  for (var i = 0; i <= m; i++) {
    for (var t = 0; t <= 1; t += 0.05) {
      var x = 0,
        y = 0
      for (var k = 0; k <= n; k++) {
        var factor = PlotUtils.getQuadricBSplineFactor(k, t)
        x += factor * points[i + k][0]
        y += factor * points[i + k][1]
      }
      bSplinePoints.push([x, y])
    }
  }
  bSplinePoints.push(points[points.length - 1])
  return bSplinePoints
}

PlotUtils.getQuadricBSplineFactor = function getQuadricBSplineFactor(k, t) {
  if (k === 0) return Math.pow(t - 1, 2) / 2
  if (k === 1) return (-2 * Math.pow(t, 2) + 2 * t + 1) / 2
  if (k === 2) return Math.pow(t, 2) / 2
  return 0
}

export { PlotUtils }
