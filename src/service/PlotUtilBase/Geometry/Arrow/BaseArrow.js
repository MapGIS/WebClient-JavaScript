
import GeomUtil from "../GeomUtil";
export default class BaseArrow {
  constructor(options) {
    const clonePnts = GeomUtil.PolylinClone(options.ctrlPnts);
    this.mCtrlPnts = [];
    GeomUtil.ClearSamePts(clonePnts);
    this.mCtrlPnts = clonePnts;
  }

  calculate() {
    return [];
  }
}
