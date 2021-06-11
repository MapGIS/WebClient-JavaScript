import {extend, Zondy} from "../../common";
import {VPoint} from "./Point";
import {VPolyline} from "./Polyline";
import {VPolygon} from "./Polygon";

class VFeature {
  static fromQueryResult(result) {
    if (
      !result.hasOwnProperty("SFEleArray") ||
      !result.hasOwnProperty("AttStruct") ||
      (result.hasOwnProperty("SFEleArray") && !result.SFEleArray) ||
      (result.hasOwnProperty("AttStruct") && !result.AttStruct)
    ) {
      return [];
    }
    let SFEleArray = result.SFEleArray;
    let AttStruct = result.AttStruct;
    let features = [],
      feature;
    for (let i = 0; i < SFEleArray.length; i++) {
      let attributes = {},
        geometry = [],
        geometryType;
      for (let j = 0; j < SFEleArray[i].AttValue.length; j++) {
        if (SFEleArray[i].AttValue[j] !== "") {
          attributes[AttStruct.FldName[j]] = SFEleArray[i].AttValue[j];
        }
      }
      if (SFEleArray[i].fGeom) {
        switch (SFEleArray[i].ftype) {
          case 1:
            let PntGeom = SFEleArray[i].fGeom.PntGeom;
            for (let k = 0; k < PntGeom.length; k++) {
              let point = new VPoint({
                coordinates: [PntGeom[k].Dot.x, PntGeom[k].Dot.y]
              });
              geometry.push(point);
              geometryType = "Point";
            }
            break;
          case 2:
            let LinGeom = SFEleArray[i].fGeom.LinGeom;
            for (let k = 0; k < LinGeom.length; k++) {
              let polyline = new VPolyline({
                coordinates: LinGeom[k].Line.Arcs[0].Dots
              });
              geometry.push(polyline);
              geometryType = "LineString";
            }
            break;
          case 3:
            let RegGeom = SFEleArray[i].fGeom.RegGeom;
            for (let k = 0; k < RegGeom.length; k++) {
              let polygon = new VPolygon();
              polygon.exterior = RegGeom[k].Rings[0].Arcs[0].Dots;
              for (let m = 1; m < RegGeom[k].Rings.length; m++) {
                polygon.interior.push(RegGeom[k].Rings[m].Arcs[0].Dots);
              }
              geometry.push(polygon);
              geometryType = "Polygon";
            }
            break;
        }
      }
      let style;
      if (SFEleArray[i].GraphicInfo) {
        let GraphicInfo = SFEleArray[i].GraphicInfo;
        switch (GraphicInfo.InfoType) {
          case 1:
            style = GraphicInfo.PntInfo;
            break;
          case 2:
            style = GraphicInfo.LinInfo;
            break;
          case 3:
            style = GraphicInfo.RegInfo;
            break;
        }
      }

      feature = new VFeature({
        attributes: attributes,
        FID: SFEleArray[i].FID,
        geometry: geometry,
        geometryType: geometryType,
        style: style
      });
      features.push(feature);
    }
    return features;
  };
  static fromGeoJSON(geoJSON) {
    let feature,
      features = [];
    if (!geoJSON.hasOwnProperty("type")) {
      throw new Error("请输入正确的geoJSON");
    }
    if (geoJSON.type === "Feature") {
      feature = new VFeature({
        geometry: VFeature.geometry,
        attributes: geoJSON.properties
      });
      return feature;
    } else if (geoJSON.type === "FeatureCollection") {
      let featureCollection = geoJSON.features,
        geometry,
        coordinates,
        fCoordinates;
      for (let i = 0; i < featureCollection.length; i++) {
        geometry = [];
        fCoordinates = featureCollection[i].geometry.coordinates;
        switch (featureCollection[i].geometry.type) {
          case "Point":
            geometry.push(featureCollection[i].geometry);
            break;
          case "LineString":
            coordinates = [];
            for (let j = 0; j < fCoordinates.length; j++) {
              coordinates.push({
                x: Number(fCoordinates[j][0]),
                y: Number(fCoordinates[j][1])
              });
            }
            featureCollection[i].geometry.coordinates = coordinates;
            geometry.push(featureCollection[i].geometry);
            break;
          case "Polygon":
            let polygon = new VPolygon();
            for (let j = 0; j < fCoordinates[0].length; j++) {
              polygon.exterior.push({
                x: Number(fCoordinates[0][j][0]),
                y: Number(fCoordinates[0][j][1])
              });
            }
            for (let j = 1; j < fCoordinates.length; j++) {
              let ext = [];
              for (let k = 0; k < fCoordinates[j].length; k++) {
                ext.push({
                  x: Number(fCoordinates[j][k][0]),
                  y: Number(fCoordinates[j][k][1])
                });
              }
              polygon.exterior.push(ext);
            }
            geometry.push(polygon);
            break;
        }
        feature = new VFeature({
          geometry: geometry,
          attributes: featureCollection[i].properties,
          geometryType: featureCollection[i].geometry.type
        });
        features.push(feature);
      }
      return features;
    } else {
      throw new Error("不支持的geoJSON类型");
    }
  };
  static toAntTableData(result) {
    let data = [];
    let featureSet = VFeature.fromQueryResult(result);
    for (let i = 0; i < featureSet.length; i++) {
      data.push(
        Object.assign(featureSet[i].attributes, {
          key: featureSet[i].FID ? featureSet[i].FID : i
        })
      );
    }
    return data;
  };
  static resultToGeojson(result) {
    let geo = VFeature.fromQueryResult(result);
    let featureSet = [];
    geo = JSON.parse(
      JSON.stringify(geo)
        .replace(/attributes/g, "properties")
        .replace(/geometryType/g, "type")
    );
    let feature;
    for (let i = 0; i < geo.length; i++) {
      feature = VFeature.polygonToGeojson(geo[i]);
      featureSet = featureSet.concat(feature);
    }
    let geojson = {
      type: "feature",
      features: featureSet
    };
    return geojson;
  };
  static polygonToGeojson(VFeature) {
    let feature,
      features = [];
    let geomArr = VFeature.geometry;
    let properties = VFeature.properties;

    for (let i = 0; i < geomArr.length; i++) {
      feature = {};
      //处理数据coordinates
      if (geomArr[i].type === "Polygon") {
        geomArr[i].coordinates = geomArr[i].coordinates.concat(
          geomArr[i].exterior,
          geomArr[i].interior
        );
      }
      feature.geometry = geomArr[i];
      feature.properties = properties;
      features.push(feature);
    }
    return features;
  };

  constructor(options) {
    this.geometry = undefined;
    this.geometryType = undefined;
    this.attributes = undefined;
    this.style = undefined;
    this.FID = undefined;

    extend(this, options);
  }
}

export { VFeature };
Zondy.Service.VFeature = VFeature;
