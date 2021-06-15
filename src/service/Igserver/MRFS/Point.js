import { Geometry } from "./Geometry";
import { extend } from "../../common";
import * as H from "@turf/helpers";
import * as T from "@turf/turf";

class VPoint extends Geometry {
  static getPointsCoordinates(FeatureSet) {
    let pointsArr = [];
    for (let i = 0; i < FeatureSet.length; i++) {
      for (let j = 0; j < FeatureSet[i].geometry.length; j++) {
        pointsArr.push(FeatureSet[i].geometry[j].coordinates);
      }
    }
    return pointsArr;
  }
  static getPointsCenter(pointsArr) {
    let centers = [],
      center;
    for (let i = 0; i < pointsArr.length; i++) {
      centers.push(H.point(pointsArr[i]));
    }
    center = T.center(T.featureCollection(centers));
    return center;
  }
  constructor(options) {
    super();
    this.type = "Point";
    extend(this, options);
  }
}

export { VPoint };
Zondy.Service.VPoint = VPoint;
