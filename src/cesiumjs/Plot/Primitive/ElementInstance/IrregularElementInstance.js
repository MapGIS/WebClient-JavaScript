/*
 * @Description:
 * @Author: zk
 * @Date: 2022-01-12 13:59:36
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-03-31 10:31:38
 */
import { defined } from "../../../../service/PlotUtilBase/Check";
import RegularLineElementInstance from "./RegularLineElementInstance";
import GeomUtil from "../../../../service/PlotUtilBase/Geometry/GeomUtil";

export default class IrregularElementInstance extends RegularLineElementInstance {
  svgToGeomInstances(elem, options) {
    const instances = this.pathElemToGeomInstance(elem, options);
    let wallGeomInstances;
    if (!options.isOpenWall) {
      wallGeomInstances = undefined;
    } else {
      wallGeomInstances = this.pathElemToWallGeomInstance(elem, options);
    }
    return { instances, wallGeomInstances };
  }

  pathElemToGeomInstance(elem, options) {
    const instances = [];
    const coords = elem.cacheCoords || elem.getCoords();
    const pathStyle = elem.getContextStyle();
    const lineWidth = pathStyle.lineWidth;
    const fillStyleType = pathStyle.fillStyleType;

    const strokeColor = Cesium.Color.fromCssColorString(pathStyle.strokeStyle);
    const widthSize = (lineWidth * this.globelScale) / 2;

    const fillColor = Cesium.Color.fromCssColorString(pathStyle.fillStyle);
    const fillSize = (this.fillDefaultWidth * this.globelScale) / 2;

    const strokeColorAttribute =
      Cesium.ColorGeometryInstanceAttribute.fromColor(strokeColor);
    const fillColorAttribute =
      Cesium.ColorGeometryInstanceAttribute.fromColor(fillColor);

    for (let i = 0; i < coords.length; i += 1) {
      let path = coords[i];
      path = GeomUtil.ClearSamePts(path);
      const geometry = this._generateStrokeGeometry(path, widthSize);
      if (!geometry) {
        continue;
      }

      const instance = this._generateCesiumGeometryInstance(
        elem,
        geometry,
        options,
        strokeColorAttribute
      );

      if (!defined(instance)) continue;

      instances.push(instance);
    }

    if (fillStyleType > 0) {
      for (let i = 0; i < coords.length; i += 1) {
        let path = coords[i];
        path = GeomUtil.ClearSamePts(path);
        const geometry = this._generateFillGeometry(path, fillSize);
        if (!geometry) {
          continue;
        }

        const instance = this._generateCesiumGeometryInstance(
          elem,
          geometry,
          options,
          fillColorAttribute
        );

        if (!defined(instance)) continue;

        instances.push(instance);
      }
    }

    return instances;
  }
}
