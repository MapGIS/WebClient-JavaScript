import { Geometry } from "./Geometry";
import { extend } from "../../common";
import * as H from "@turf/helpers";
import * as T from "@turf/turf";

class VPolyline extends Geometry {
  static getPolylinesCoordinates(FeatureSte) {
    let lineArr = [];
    for (let i = 0; i < FeatureSte.length; i++) {
      for (let j = 0; j < FeatureSte[i].geometry.length; j++) {
        let points = [],
          coordinates = FeatureSte[i].geometry[j].coordinates;
        for (let k = 0; k < coordinates.length; k++) {
          points.push([coordinates[k].x, coordinates[k].y]);
        }
        lineArr.push(points);
      }
    }
    return lineArr;
  }
  static getPolylinesCenter(lineArr) {
    let features = [];
    for (let i = 0; i < lineArr.length; i++) {
      features.push(H.lineString(lineArr[i]));
    }
    return T.center(T.featureCollection(features));
  }
  constructor(options) {
    super();
    this.type = "LineString";
    extend(this, options);
  }
}

export { VPolyline };
