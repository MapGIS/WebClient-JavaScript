import Point from '../Point';
import GeomUtil from '../GeomUtil';
import Bounds from '../Bound';

class Element {
  constructor(x, y, type) {
    this.m_x = x
    this.m_y = y
    this.m_type = type
  }

  GetX() {
    return this.m_x
  }

  GetY() {
    return this.m_y
  }

  GetType() {
    return this.m_type
  }

  GetPosition() {
    return new Point(this.m_x, this.m_y)
  }

  SetPosition(x, y) {
    this.m_x = x
    this.m_y = y
  }

  SetType(type) {
    this.m_type = type
  }

  IsCurveTo() {
    return this.m_type === 2
  }

  IsLineTo() {
    return this.m_type === 1
  }

  IsMoveTo() {
    return this.m_type === 0
  }

  Equal(elem, tolerance) {
    if (this.m_type !== elem.GetType()) return false
    return GeomUtil.PointEqualFuzzy(
      this.m_x,
      this.m_y,
      elem.GetX(),
      elem.GetY(),
      tolerance
    )
  }

  clone() {
    return new Element(this.m_x, this.m_y, this.m_type)
  }
}

class Path2DData {
  constructor(t) {
    this.cStart = 0
    this.require_StartNewFigure = true
    this.isBoundsDirty = true
    this.bounds = null
    this.ref = 0
    this.elements = []
    if (t) {
      this.cStart = t.cStart
      this.require_StartNewFigure = t.require_StartNewFigure
      this.isBoundsDirty = t.isBoundsDirty
      this.bounds = new Bounds(
        t.bounds.left,
        t.bounds.bottom,
        t.bounds.right,
        t.bounds.top
      )
      this.ref = 1
      this.elements = []
      for (let i = 0; i < t.elements.length; i += 1)
        this.elements.push(t.elements[i].clone())
    } else {
      this.ref = 1
      this.bounds = new Bounds(0, 0, 0, 0)
      this.elements = []
    }
  }

  MaybeStartNewFigure() {
    if (this.require_StartNewFigure) {
      const elem = this.elements[this.elements.length - 1].clone()
      elem.SetType(0)
      this.elements.push(elem)
      this.require_StartNewFigure = false
    }
  }
}

export default class Path2D {
  constructor() {
    this.m_pData = null
  }

  MoveTo(pnt) {
    this.ensureData()
    this.detach()
    const dataPtr = this.getDataPtr()
    dataPtr.require_StartNewFigure = false
    if (dataPtr.elements[dataPtr.elements.length - 1].GetType() === 0) {
      dataPtr.elements[dataPtr.elements.length - 1].SetPosition(pnt.x, pnt.y)
    } else {
      const elem = new Element(pnt.x, pnt.y, 0)
      dataPtr.elements.push(elem)
    }
    dataPtr.cStart = dataPtr.elements.length - 1
  }

  LineTo(pnt) {
    this.ensureData()
    this.detach()
    const dataPtr = this.getDataPtr()
    dataPtr.MaybeStartNewFigure()
    if (
      dataPtr.elements[dataPtr.elements.length - 1].GetX() !== pnt.x ||
      dataPtr.elements[dataPtr.elements.length - 1].GetY() !== pnt.y
    ) {
      const elem = new Element(pnt.x, pnt.y, 1)
      dataPtr.elements.push(elem)
    }
  }

  CurveTo(pnt1, pnt2, pnt3) {
    this.ensureData()
    this.detach()
    const dataPtr = this.getDataPtr()
    if (
      dataPtr.elements[dataPtr.elements.length - 1].GetX() !== pnt1.x ||
      dataPtr.elements[dataPtr.elements.length - 1].GetY() !== pnt1.y ||
      pnt1.x !== pnt2.x ||
      pnt1.y !== pnt2.y ||
      pnt2.x !== pnt3.x ||
      pnt2.y !== pnt3.y
    ) {
      dataPtr.MaybeStartNewFigure()
      const elem1 = new Element(pnt1.x, pnt1.y, 2)
      const elem2 = new Element(pnt2.x, pnt2.y, 3)
      const elem3 = new Element(pnt3.x, pnt3.y, 3)
      dataPtr.elements.push(elem1)
      dataPtr.elements.push(elem2)
      dataPtr.elements.push(elem3)
    }
  }

  ToSubPathPolygons(out) {
    if (this.IsEmpty()) return false
    const dataPtr = this.getDataPtr()
    let pnts = []
    const elemCnt = this.GetElementCount()
    for (let i = 0; i < elemCnt; i += 1) {
      const elem = dataPtr.elements[i]
      switch (elem.GetType()) {
        case 0: {
          if (pnts.length > 1) {
            out.push(pnts)
          }
          pnts = []

          pnts.push(elem.GetPosition())
          break
        }
        case 1:
          pnts.push(elem.GetPosition())
          break
        case 2: {
          if (dataPtr.elements[i + 1].GetType() !== 3) break
          const a = dataPtr.elements[i - 1].GetX()
          const r = dataPtr.elements[i - 1].GetY()
          const p = elem.GetX()
          const u = elem.GetY()
          const h = dataPtr.elements[i + 1].GetX()
          const g = dataPtr.elements[i + 1].GetY()
          const c = dataPtr.elements[i + 2].GetX()
          const y = dataPtr.elements[i + 2].GetY()
          for (let t = 0; t <= 1; t += 0.03125) {
            const P = t * t
            const d = P * t
            const S = 1 - 3 * t + 3 * P - d
            const f = 3 * (t - 2 * P + d)
            const m = 3 * (P - d)
            const L = d
            pnts.push(
              new Point(
                S * a + f * p + m * h + L * c,
                S * r + f * u + m * g + L * y
              )
            )
          }
          i += 2
          break
        }
        default:
          break
      }
    }

    if (pnts.length > 1) out.push(pnts)
    return true
  }

  IsEmpty() {
    if (this.m_pData === null) return true
    const len = this.m_pData.elements.length
    if (len === 0) return true

    if (len === 1) return this.m_pData.elements[0].GetType() === 0

    return false
  }

  ensureData() {
    if (this.m_pData === null) {
      this.ensureData_helper()
    }
  }

  ensureData_helper() {
    const pathData = new Path2DData()
    const elem = new Element(0, 0, 0)
    pathData.elements.push(elem)
    if (this.m_pData !== null) this.mtDeRef(this.m_pData.ref)

    this.m_pData = pathData
  }

  detach() {
    if (this.m_pData.ref !== 1) {
      this.detach_helper()
    }

    this.setBoundsDirty(true)
  }

  detach_helper() {
    const t = new Path2DData()
    if (this.m_pData == null) this.mtDeRef(this.m_pData.ref)

    this.m_pData = t
  }

  setBoundsDirty(dirty) {
    this.getDataPtr().isBoundsDirty = dirty
  }

  getDataPtr() {
    return this.m_pData
  }

  GetElementCount() {
    if (this.m_pData === null) return 0

    return this.m_pData.elements.length
  }

  static mtRef(t) {
    t += 1
    return t !== 0
  }

  static mtDeRef(t) {
    t -= 1
    return t !== 0
  }
}
