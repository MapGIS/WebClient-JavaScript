import { Geometry } from "./Geometry";
import { extend } from "../../common";
import * as H from "@turf/helpers";
import * as T from "@turf/turf";

class VPolygon extends Geometry {
  static getPolygonsCoordinates(FeatureSte) {
    let polygonsArr = [];
    for (let i = 0; i < FeatureSte.length; i++) {
      for (let j = 0; j < FeatureSte[i].geometry.length; j++) {
        let polygon = [];
        let exterior = FeatureSte[i].geometry[j].exterior,
          exteriorPoints = [];
        let interior = FeatureSte[i].geometry[j].interior,
          interiorPoints = [];
        for (let k = 0; k < exterior.length; k++) {
          exteriorPoints.push([exterior[k].x, exterior[k].y]);
        }
        for (let k = 0; k < interior.length; k++) {
          let inter = [];
          for (let m = 0; m < interior[k].length; m++) {
            inter.push([interior[k][m].x, interior[k][m].y]);
          }
          interiorPoints.push(inter);
        }
        polygon.push(exteriorPoints);
        polygon = polygon.concat(interiorPoints);
        polygonsArr.push(polygon);
      }
    }
    return polygonsArr;
  }
  static getPolygonsCenter(polygonsArr) {
    let features = [];
    for (let i = 0; i < polygonsArr.length; i++) {
      features.push(H.polygon(polygonsArr[i]));
    }
    return T.center(T.featureCollection(features));
  }
  constructor(options) {
    super();
    this.type = "Polygon";
    this.exterior = [];
    this.interior = [];
    extend(this, options);

    if (this.exterior.length > 0) {
      this.coordinates.push(this.exterior);
    }

    if (this.interior.length > 0) {
      for (let i = 0; i < this.interior.length; i++) {
        this.coordinates.push(this.interior[i]);
      }
    }
  }
}

export { VPolygon };
Zondy.Service.VPolygon = VPolygon;
