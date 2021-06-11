import { BaseParameter } from "./BaseParameter";
import { extend, Zondy } from "../../common";
import {VPoint} from "./Point";
import {VPolyline} from "./Polyline";
import {VPolygon} from "./Polygon";

class GeometryParameter extends BaseParameter {
  constructor(options) {
    super();
    this.geometry = undefined;
    this.where = undefined;
    this.compareRectOnly = false;
    this.enableDisplayCondition = false;
    this.spatialRelationType = "Intersect";

    extend(this, options);
  }
}

GeometryParameter.prototype.fromGeoJSON = function(geoJSON) {
  if (geoJSON) {
    let me = this;
    switch (geoJSON.geometry.type) {
      case "Point":
        me.geometry = new VPoint({
          coordinates: geoJSON.geometry.coordinates
        });
        break;
      case "LineString":
        me.geometry = new VPolyline({
          coordinates: geoJSON.geometry.coordinates
        });
        break;
      case "Polygon":
        me.geometry = new VPolygon({
          coordinates: geoJSON.geometry.coordinates[0]
        });
        break;
    }
  }
};

export { GeometryParameter };
Zondy.Service.GeometryParameter = GeometryParameter;
