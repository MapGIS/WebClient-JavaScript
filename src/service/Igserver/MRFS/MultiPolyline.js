import { Geometry } from "./Geometry";
import { extend } from "../../common";

class VMultiPolyline extends Geometry {
  constructor(options) {
    super();
    this.type = "MultiLineString";
    extend(this, options);
  }
}

export { VMultiPolyline };
