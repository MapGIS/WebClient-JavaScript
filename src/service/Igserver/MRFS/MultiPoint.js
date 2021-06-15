import { Geometry } from "./Geometry";
import { extend } from "../../common";

class VMultiPoint extends Geometry {
  constructor(options) {
    super();
    this.type = "MultiPoint";
    extend(this, options);
  }
}

export { VMultiPoint };
