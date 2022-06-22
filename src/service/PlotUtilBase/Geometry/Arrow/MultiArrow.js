import Point from '../Point';
import GeomUtil from '../GeomUtil';
import MathUtil from '../../Util/MathUtil';
import PlottingUtil from './PlottingUtil';
import Path2D from './Path2D';

export default class MultiArrow {
  constructor(options) {
    this.MIN_PTCNT_PERARROW = 3
    this.MIN_GEOPT_CNT = 2
    this.ATL_DIV_ABL_1 = 0.18
    this.ATL_DIV_ABL = 0.12
    this.AML_DIV_ATL = 0.7
    this.AHL_DIV_AML = 0.148
    this.AL_SCALE = 1.25
    this.AB_CTRLPNT_RATE1 = 0
    this.AB_CTRLPNT_RATE2 = 3
    this.AB_CTRLPNT_RATE3 = 0.5
    this.AEW_DIV_ATL = 0.4
    this.AEL_DIV_ATL = 0.3
    this.ArrowWoCtrl = 0.6
    this.AJCTRL = 0.6
    this.SV1_defaultATLenDivABLen = 0
    this.SV2_defaultAYPosScale = 0.65
    this.ctrlpnts = []
    this.scaleValues = []
    this.ctrlpnts = options.ctrlpnts || []
  }

  generateArrowBody(pnts, e, h) {
    const pntNum = pnts.length - 1
    if (pntNum < 2) return {dATLenDivABLen: 0, arrowBodyPts: []}

    const leftArrowPnts = []
    const rightArrowPnts = []

    const clonepnts = PlottingUtil.clonePolyline(pnts)
    const arrowLen = GeomUtil.PolylinDistance(clonepnts)

    const arrowTailLen =
      e === 0
        ? arrowLen * this.ATL_DIV_ABL_1
        : (arrowLen + e) * this.ATL_DIV_ABL

    // 计算箭头尾部左右点
    const ATSide = PlottingUtil.getSidePointsOfLine(
      arrowTailLen,
      clonepnts[1],
      clonepnts[0]
    )
    leftArrowPnts[1] = ATSide.left
    rightArrowPnts[1] = ATSide.right

    let arrowMidLen = 0
    if (MathUtil.EqualFuzzy(h, 0)) {
      arrowMidLen = arrowTailLen * this.AML_DIV_ATL
    } else {
      arrowMidLen = arrowLen * h
    }

    const d12 = clonepnts[1].distanceTo(clonepnts[2])

    if (arrowMidLen * arrowMidLen > d12) {
      arrowMidLen = 0.5 * d12
    }

    // 计算箭头中间部分宽度参数
    const arrowHeadLen = arrowMidLen * this.AHL_DIV_AML
    clonepnts.push(clonepnts[pntNum].clone())
    const tempWid = arrowLen - arrowMidLen
    let tempLen = 0
    const arrowWidsLen = []
    for (let i = 2; i <= pntNum; i += 1) {
      tempLen += clonepnts[i - 1].distanceTo(clonepnts[i - 2])
      if (MathUtil.EqualFuzzy(tempWid, 0)) {
        arrowWidsLen[i] = 0
      } else if (MathUtil.EqualFuzzy(tempWid - tempLen, 0)) {
        arrowWidsLen[i] = arrowHeadLen
      } else {
        arrowWidsLen[i] =
          arrowHeadLen +
          (arrowTailLen - arrowHeadLen) *
          ((tempWid - tempLen) / tempWid) ** this.AL_SCALE
      }
    }

    arrowWidsLen[pntNum + 1] = arrowHeadLen

    // 根据宽度参数计算箭头中间部分左右点
    const X = new Point(0, 0)
    const O = new Point(0, 0)
    const _ = new Point(0, 0)
    for (let i = 2; i <= pntNum; i += 1) {
      PlottingUtil.getTrianglePoints(
        this.AB_CTRLPNT_RATE1,
        this.AB_CTRLPNT_RATE2,
        clonepnts[i - 2],
        clonepnts[i - 1],
        clonepnts[i],
        X,
        O
      )
      if (i === pntNum) {
        PlottingUtil.getTrapezoidPoints(
          this.AB_CTRLPNT_RATE3,
          clonepnts[pntNum],
          clonepnts[pntNum - 1],
          O,
          _
        )
      }

      const sidepnt = PlottingUtil.getSidePointsOfLine(
        arrowWidsLen[i],
        X,
        clonepnts[i - 1]
      )
      rightArrowPnts[i] = sidepnt.left
      leftArrowPnts[i] = sidepnt.right
    }

    if (clonepnts[pntNum].distanceTo(_) > 0) {
      clonepnts[pntNum] = PlottingUtil.getIncentrePntOnSegmBydis(
        arrowMidLen,
        clonepnts[pntNum],
        _
      )
    }

    const sidetemp = PlottingUtil.getSidePointsOfLine(
      arrowHeadLen,
      clonepnts[pntNum + 1],
      clonepnts[pntNum]
    )
    leftArrowPnts[pntNum + 1] = sidetemp.left
    rightArrowPnts[pntNum + 1] = sidetemp.right

    // 计算箭头曲线控制点
    const leftCtrlPnts1 = []
    const leftCtrlPnts2 = []
    const rightCtrlPnts1 = []
    const rightCtrlPnts2 = []
    for (let i = 2; i <= pntNum; i += 1) {
      leftCtrlPnts1[i] = new Point(0, 0)
      leftCtrlPnts2[i] = new Point(0, 0)
      rightCtrlPnts1[i] = new Point(0, 0)
      rightCtrlPnts2[i] = new Point(0, 0)

      PlottingUtil.getTrianglePoints(
        this.AB_CTRLPNT_RATE2,
        this.AB_CTRLPNT_RATE2,
        leftArrowPnts[i - 1],
        leftArrowPnts[i],
        leftArrowPnts[i + 1],
        leftCtrlPnts1[i],
        leftCtrlPnts2[i]
      )

      PlottingUtil.getTrianglePoints(
        this.AB_CTRLPNT_RATE2,
        this.AB_CTRLPNT_RATE2,
        rightArrowPnts[i - 1],
        rightArrowPnts[i],
        rightArrowPnts[i + 1],
        rightCtrlPnts1[i],
        rightCtrlPnts2[i]
      )
    }

    leftCtrlPnts2[1] = new Point(0, 0)
    rightCtrlPnts2[1] = new Point(0, 0)
    PlottingUtil.getTrapezoidPoints(
      this.AB_CTRLPNT_RATE3,
      leftArrowPnts[1],
      leftArrowPnts[2],
      leftCtrlPnts1[2],
      leftCtrlPnts2[1]
    )
    PlottingUtil.getTrapezoidPoints(
      this.AB_CTRLPNT_RATE3,
      rightArrowPnts[1],
      rightArrowPnts[2],
      rightCtrlPnts1[2],
      rightCtrlPnts2[1]
    )

    let leftDis =
      GeomUtil.Distance(leftArrowPnts[pntNum + 1], leftArrowPnts[pntNum]) / 3
    const expnt = PlottingUtil.getExcentrePntOnSegBydis(
      leftDis,
      clonepnts[pntNum],
      clonepnts[pntNum + 1]
    )
    expnt.x = expnt.x + leftArrowPnts[pntNum + 1].x - clonepnts[pntNum].x
    expnt.y = expnt.y + leftArrowPnts[pntNum + 1].y - clonepnts[pntNum].y
    leftDis =
      (arrowTailLen - arrowHeadLen) *
      (leftDis / tempWid) ** (this.AL_SCALE + 0.3)
    leftCtrlPnts1[pntNum + 1] = PlottingUtil.getSidePointsOfLine(
      leftDis,
      leftArrowPnts[pntNum + 1],
      expnt
    ).left

    let rightDis =
      GeomUtil.Distance(rightArrowPnts[pntNum + 1], rightArrowPnts[pntNum]) / 3
    const rightExPnt = PlottingUtil.getExcentrePntOnSegBydis(
      rightDis,
      clonepnts[pntNum],
      clonepnts[pntNum + 1]
    )
    rightExPnt.x =
      rightExPnt.x + rightArrowPnts[pntNum + 1].x - clonepnts[pntNum].x
    rightExPnt.y =
      rightExPnt.y + rightArrowPnts[pntNum + 1].y - clonepnts[pntNum].y
    rightDis =
      (arrowTailLen - arrowHeadLen) *
      (leftDis / tempWid) ** (this.AL_SCALE + 0.3)
    rightCtrlPnts1[pntNum + 1] = PlottingUtil.getSidePointsOfLine(
      rightDis,
      rightArrowPnts[pntNum + 1],
      rightExPnt
    ).right

    // 生成箭头三角
    const arrowHeadTri = []
    const aeLen = arrowMidLen * this.AEL_DIV_ATL
    const aeWid = arrowMidLen * this.AEW_DIV_ATL
    const ctrlExPnt = PlottingUtil.getExcentrePntOnSegBydis(
      aeLen,
      clonepnts[pntNum],
      clonepnts[pntNum + 1]
    )
    const arrowHeadSide = PlottingUtil.getSidePointsOfLine(
      aeWid,
      clonepnts[pntNum + 1],
      ctrlExPnt
    )
    arrowHeadTri.push(arrowHeadSide.right)
    arrowHeadTri.push(clonepnts[pntNum + 1].clone())
    arrowHeadTri.push(arrowHeadSide.left)

    // 生成箭身左边控制点
    const leftArrowBody = []
    leftArrowBody.push(leftArrowPnts[pntNum + 1])
    for (let i = pntNum; i >= 1; i -= 1) {
      leftArrowBody.push(leftCtrlPnts1[i + 1])
      leftArrowBody.push(leftCtrlPnts2[i])
      leftArrowBody.push(leftArrowPnts[i])
    }

    // 生成箭身右边控制点
    const rightArrowBody = []
    for (let i = 1; i <= pntNum; i += 1) {
      rightArrowBody.push(rightArrowPnts[i])
      rightArrowBody.push(rightCtrlPnts2[i])
      rightArrowBody.push(rightCtrlPnts1[i + 1])
    }
    rightArrowBody.push(rightArrowPnts[pntNum + 1])

    const arrowBodyPts = []
    arrowBodyPts.push(...rightArrowBody)
    arrowBodyPts.push(...arrowHeadTri)
    arrowBodyPts.push(...leftArrowBody)

    const dATLenDivABLen = arrowMidLen / arrowLen
    return {
      dATLenDivABLen,
      arrowBodyPts,
    }
  }

  generateCtrlPntsBetArrow(
    arrPntsA,
    arrBodyPntsA,
    arrPntsB,
    arrBodyPntsB,
    rate
  ) {
    const mids = []
    for (let i = 0; i < 3; i += 1) {
      mids[i] = GeomUtil.SegMid(arrPntsA[i], arrPntsB[i])
    }

    const dMid01 = mids[0].distanceTo(mids[1])
    const dMid12 = mids[1].distanceTo(mids[2])

    let dis = rate * (dMid01 + dMid12)

    let inMidPnt = null
    let inArrAPnt = null
    let inArrBPnt = null

    if (dis > dMid12) {
      dis = dMid01 + dMid12 - dis
      inMidPnt = PlottingUtil.getIncentrePntOnSegmBydis(dis, mids[0], mids[1])
      const dArrA01 = arrPntsA[0].distanceTo(arrPntsA[1])
      const dArrB01 = arrPntsB[0].distanceTo(arrPntsB[1])

      inArrAPnt = PlottingUtil.getIncentrePntOnSegmBydis(
        (dArrA01 * dis) / dMid01,
        arrPntsA[0],
        arrPntsA[1]
      )
      inArrBPnt = PlottingUtil.getIncentrePntOnSegmBydis(
        (dArrB01 * dis) / dMid01,
        arrPntsB[0],
        arrPntsB[1]
      )
    } else {
      inMidPnt = PlottingUtil.getIncentrePntOnSegmBydis(dis, mids[2], mids[1])
      const dArrA21 = arrPntsA[2].distanceTo(arrPntsA[1])
      const dArrB21 = arrPntsB[2].distanceTo(arrPntsB[1])
      inArrAPnt = PlottingUtil.getIncentrePntOnSegmBydis(
        (dArrA21 * dis) / dMid12,
        arrPntsA[2],
        arrPntsA[1]
      )
      inArrBPnt = PlottingUtil.getIncentrePntOnSegmBydis(
        (dArrB21 * dis) / dMid12,
        arrPntsB[2],
        arrPntsB[1]
      )
    }

    const dInPntA = inMidPnt.distanceTo(inArrAPnt)
    const dInPntB = inMidPnt.distanceTo(inArrBPnt)
    const arrAPnt11 = arrBodyPntsA[11].clone()
    const arrAPnt10 = arrBodyPntsA[10].clone()
    const arrBPnt5 = arrBodyPntsB[5].clone()
    const arrBPnt6 = arrBodyPntsB[6].clone()
    const leftCtrlPnt2 = PlottingUtil.getIncentrePntOnSegmBydis(
      dInPntA * this.ArrowWoCtrl,
      inMidPnt,
      inArrAPnt
    )
    const rightCtrlPnt1 = PlottingUtil.getIncentrePntOnSegmBydis(
      dInPntB * this.ArrowWoCtrl,
      inMidPnt,
      inArrBPnt
    )

    let crsPnt = GeomUtil.GetSegCrossPnt(
      arrAPnt10,
      arrAPnt11,
      inMidPnt,
      inArrAPnt
    )
    const dCrsPnt10 = crsPnt.distanceTo(arrAPnt10)
    const dInMid10 = arrAPnt10.distanceTo(inMidPnt)
    const dleftCtrlPnt1 =
      dCrsPnt10 > dInMid10 ? this.AJCTRL * dInMid10 : this.AJCTRL * dCrsPnt10
    const leftCtrlPnt1 = PlottingUtil.getIncentrePntOnSegmBydis(
      dleftCtrlPnt1,
      arrAPnt10,
      arrAPnt11
    )
    arrBodyPntsA[11] = leftCtrlPnt1.clone()

    crsPnt = GeomUtil.GetSegCrossPnt(arrBPnt6, arrBPnt5, inMidPnt, inArrBPnt)
    const dCrsPnt6 = crsPnt.distanceTo(arrBPnt6)
    const dInMid6 = arrBPnt6.distanceTo(inMidPnt)
    const dRightCtrlPnt2 =
      dCrsPnt6 > dInMid6 ? this.AJCTRL * dInMid6 : this.AJCTRL * dCrsPnt6
    const rightCtrlPnt2 = PlottingUtil.getIncentrePntOnSegmBydis(
      dRightCtrlPnt2,
      arrBPnt6,
      arrBPnt5
    )
    arrBodyPntsB[5] = rightCtrlPnt2.clone()

    const leftPnts = []
    const rightPnts = []
    leftPnts.push(arrAPnt10)
    leftPnts.push(leftCtrlPnt1)
    leftPnts.push(leftCtrlPnt2)
    leftPnts.push(inMidPnt)

    rightPnts.push(inMidPnt)
    rightPnts.push(rightCtrlPnt1)
    rightPnts.push(rightCtrlPnt2)
    rightPnts.push(arrBPnt6)

    return {
      leftPnts,
      rightPnts,
    }
  }

  generateAWWidth(arrNum, pnts) {
    const out = []
    if (arrNum === 1) {
      out.push(0)
    } else {
      out.push(pnts[0].distanceTo(pnts[this.MIN_PTCNT_PERARROW]))
      let j = this.MIN_PTCNT_PERARROW
      for (let i = 1; i < arrNum - 1; i += 1, j += this.MIN_PTCNT_PERARROW) {
        const dis =
          pnts[j].distanceTo(pnts[j - this.MIN_PTCNT_PERARROW]) +
          pnts[j].distanceTo(pnts[j + this.MIN_PTCNT_PERARROW])
        out.push(dis / 2)
      }

      out.push(pnts[j].distanceTo(pnts[j - this.MIN_PTCNT_PERARROW]))
    }
    return out
  }

  correectCtrlPnts(pnts) {
    const out = GeomUtil.PolylinClone(pnts)
    let pntNum = out.length
    let arrNum = Math.floor(pntNum / this.MIN_PTCNT_PERARROW)
    const remainder = pntNum % this.MIN_PTCNT_PERARROW
    const newPnt = new Point(0, 0)
    if (remainder === 2) {
      newPnt.x = 0.5 * (out[pntNum - 2].x + out[pntNum - 1].x)
      newPnt.y = 0.5 * (out[pntNum - 2].y + out[pntNum - 1].y)
      out.push(out[pntNum - 1].clone())
      out[pntNum - 1] = newPnt
      arrNum += 1
      pntNum += 1
    }

    if (pntNum <= 3) return out

    for (let t = 0, o = arrNum - 1; t < arrNum - 1; o -= 1, t += 1) {
      for (
        let t = 0;
        t < o * this.MIN_PTCNT_PERARROW;
        t += this.MIN_PTCNT_PERARROW
      )
        if (!PlottingUtil.isRight(out[t + 3], out[t + 1], out[t + 2])) {
          let temp = out[t]
          out[t] = out[t + 3]
          out[t + 3] = temp
          temp = out[t + 1]
          out[t + 1] = out[t + 4]
          out[t + 4] = temp
          temp = out[t + 2]
          out[t + 2] = out[t + 5]
          out[t + 5] = temp
        }
    }
    return out
  }

  calculate() {
    const pnts = this.correectCtrlPnts(this.ctrlpnts)  
    const pntNum = pnts.length
    if (pntNum < 3) return pnts
    const arrNum = Math.floor(pntNum / this.MIN_PTCNT_PERARROW)
    let scaleNum = this.scaleValues.length

    if (scaleNum < 2 * arrNum - 1) {
      if (scaleNum === 1) {
        this.scaleValues.push(this.SV1_defaultATLenDivABLen)
        scaleNum += 1
      }

      for (let i = 0; i < 2 * arrNum - 1 - scaleNum; i += 2) {
        this.scaleValues.splice(
          scaleNum / 2 + 1,
          0,
          this.SV1_defaultATLenDivABLen
        )
        this.scaleValues.splice(
          this.scaleValues.length,
          0,
          this.SV2_defaultAYPosScale
        )
      }
    } else if (scaleNum > 2 * arrNum - 1) {
      for (let t = 0; t < arrNum; t += 1)
        this.scaleValues.push(this.SV1_defaultATLenDivABLen)
      for (let t = 0; t < arrNum - 1; t += 1)
        this.scaleValues.push(this.SV2_defaultAYPosScale)
    }

    return this.arrowMesh(pnts)
  }

  arrowMesh(pnts) {
    const pntNum = pnts.length
    const arrNum = Math.floor(pntNum / this.MIN_PTCNT_PERARROW)
    const arrBodys = []
    const ctrlPntsBetArr = []
    const dis = this.generateAWWidth(arrNum, pnts)
    for (let i = 0, j = 0; i < arrNum; i += 1, j += this.MIN_PTCNT_PERARROW) {
      const arrPnts = []
      arrPnts[0] = pnts[j]
      arrPnts[1] = pnts[j + 1]
      arrPnts[2] = pnts[j + 2]

      const arrBody = this.generateArrowBody(
        arrPnts,
        dis[i],
        this.scaleValues[i]
      )
      arrBodys[i] = arrBody.arrowBodyPts
    }

    for (
      let i = 0, j = 0;
      i < arrNum - 1;
      i += 1, j += this.MIN_PTCNT_PERARROW
    ) {
      const arrA = []
      const arrB = []
      arrA[0] = pnts[j]
      arrA[1] = pnts[j + 1]
      arrA[2] = pnts[j + 2]
      arrB[0] = pnts[j + 3]
      arrB[1] = pnts[j + 4]
      arrB[2] = pnts[j + 5]
      const ctrlPnts = this.generateCtrlPntsBetArrow(
        arrA,
        arrBodys[i],
        arrB,
        arrBodys[i + 1],
        this.scaleValues[arrNum + i]
      )
      ctrlPntsBetArr.push(ctrlPnts.leftPnts)
      ctrlPntsBetArr.push(ctrlPnts.rightPnts)
      
      
    }
    const path2D = new Path2D()
    path2D.MoveTo(arrBodys[0][0])
    path2D.CurveTo(arrBodys[0][1], arrBodys[0][2], arrBodys[0][3])
    path2D.CurveTo(arrBodys[0][4], arrBodys[0][5], arrBodys[0][6])

    for (let i = 7; i < 10; i += 1) {
      path2D.LineTo(arrBodys[0][i])
    }

    for (
      let i = 1, j = this.MIN_PTCNT_PERARROW;
      i < arrNum;
      i += 1, j += this.MIN_PTCNT_PERARROW
    ) {
      const arrBody = arrBodys[i]
      const index = i + i - 2
      let ctrlPnt = ctrlPntsBetArr[index]

      path2D.LineTo(ctrlPnt[0])
      path2D.CurveTo(ctrlPnt[1], ctrlPnt[2], ctrlPnt[3])

      ctrlPnt = ctrlPntsBetArr[index + 1]
      path2D.CurveTo(ctrlPnt[1], ctrlPnt[2], ctrlPnt[3])

      for (let m = 7; m < 10; m += 1) {
        path2D.LineTo(arrBody[m])
      }
    }

    // 处理最后一个箭头
    const lastArrBody = arrBodys[arrNum - 1]
    path2D.LineTo(lastArrBody[10])
    path2D.CurveTo(lastArrBody[11], lastArrBody[12], lastArrBody[13])
    path2D.CurveTo(lastArrBody[14], lastArrBody[15], lastArrBody[16])

    const arrPolygon = []
    path2D.ToSubPathPolygons(arrPolygon)
    return arrPolygon
  }
}
