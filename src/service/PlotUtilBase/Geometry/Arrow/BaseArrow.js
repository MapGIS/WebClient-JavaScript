
import { GeomUtil } from "../GeomUtil";
export class BaseArrow {
  mCtrlPnts = [];

  constructor(options) {
    const clonePnts = GeomUtil.PolylinClone(options.ctrlPnts);

    GeomUtil.ClearSamePts(clonePnts);
    this.mCtrlPnts = clonePnts;
  }

  calculate() {
    return [];
  }
}
