/*
 * @Author: your name
 * @Date: 2021-10-25 10:26:48
 * @LastEditTime: 2022-04-01 09:17:56
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\ElementInstance\RegularLine1ElementInstance.js
 */
import SvgElementInstance from "./SvgElementInstance";
import {CesiumGeomUtil, CesiumUtil} from "../../Utils/CesiumUtil";
import MainElement from "../../../../service/PlotBase/SvgLoader/element/extend/MainElement";
import {defined} from "../../../PlotUtilBase/Check";

export default class RegularLineElementInstance extends SvgElementInstance {
  svgToGeomInstances(elem, options, callback) {
    let that = this;
    super.svgToGeomInstances(elem, options, function (instances) {
      const wallGeomInstances = that.generateWallGeometryInstances(elem, options);
      callback({instances, wallGeomInstances});
    });
  }

  /**
   * 生成墙
   * @param {*} elem
   * @param {*} options
   * @returns
   */
  generateWallGeometryInstances(elem, options) {
    if (!options.isOpenWall) return undefined;

    const paths = [];
    elem.getPathElem(paths);

    let instances = [];
    for (let i = 0; i < paths.length; i += 1) {
      const wallGeomInstance = this.pathElemToWallGeomInstance(
        paths[i],
        options
      );
      if (!defined(wallGeomInstance)) continue;
      if (Array.isArray(wallGeomInstance)) {
        instances = instances.concat(wallGeomInstance);
      } else {
        instances.push(wallGeomInstance);
      }
    }
    return instances;
  }

  pathElemToWallGeomInstance(pathElem, options) {
    const wallHeight = options.dimModHeight;
    const wallColor = options.wallColor;
    const cesiumWallColor = Cesium.ColorGeometryInstanceAttribute.fromColor(
      Cesium.Color.fromCssColorString(wallColor)
    );

    const parts = pathElem.cacheCoords || pathElem.getCoords();
    const instances = [];
    for (let i = 0; i < parts.length; i += 1) {
      const coords = parts[i];

      const degreeArrayHeights = [];
      for (let j = 0; j < coords.length; j += 1) {
        const coord = coords[j];
        const res = CesiumUtil.WebMercatorUnProject(coord.x, coord.y);
        degreeArrayHeights.push(res.x, res.y, wallHeight);
      }

      const wallGeometry = Cesium.WallGeometry.createGeometry(
        new Cesium.WallGeometry({
          positions:
            Cesium.Cartesian3.fromDegreesArrayHeights(degreeArrayHeights),
        })
      );

      instances.push(
        new Cesium.GeometryInstance({
          geometry: wallGeometry,
          attributes: {
            color: cesiumWallColor,
          },
        })
      );
    }

    return instances;
  }

  pathElemToGeomInstance(pathElem, options) {
    console.log("---pathElem", pathElem)
    const instances = [];
    const style = pathElem.getContextStyle()
    const fill = style.fillStyle;
    const stroke = style.strokeStyle;
    const fillStyleType = style.fillStyleType
    const lineWidth = style.lineWidth
    const strokeWidthSize = lineWidth * this.globelScale / 2;
    const _fillWidthSize = this.fillDefaultWidth * this.globelScale / 2

    const parts = pathElem.cacheCoords || pathElem.getCoords();
    const isMainElement = !!(pathElem instanceof MainElement);
    const {pathHeights} = options;

    if (pathHeights && pathHeights.length !== parts.length) {
      console.error("pathHeights数目不对！");
    }
    let geometry
    if (stroke && stroke !== "none") {

      for (let i = 0; i < parts.length; i += 1) {
        const coords = parts[i];
        if (pathHeights && pathHeights instanceof Array) {
          if (pathElem.type === 'mainline') {
            geometry = this._generateStrokeGeometry(
              coords,
              isMainElement ? strokeWidthSize - 5 : strokeWidthSize,
              pathHeights[i]
            );
          } else if (pathElem.type === 'circle') {
            console.log("=====pathHeights===", pathHeights)
            geometry = this._generateStrokeGeometry(
              coords,
              isMainElement ? strokeWidthSize - 5 : strokeWidthSize
            );
          } else {
            geometry = this._generateStrokeGeometry(
              coords,
              isMainElement ? strokeWidthSize - 5 : strokeWidthSize
            );
          }
        } else {
          geometry = this._generateStrokeGeometry(
            coords,
            isMainElement ? strokeWidthSize - 5 : strokeWidthSize
          );
        }

        const instance = this._generateCesiumGeometryInstance(
          pathElem,
          geometry,
          options,
          this.getColor(pathElem, "strokeStyle"),
          true
        );
        if (pathElem.type === 'circle') {
          console.log("instances", instances)
          let {values} = instance.geometry.attributes.position;
          for (let i = 0; i < values.length; i += 3) {
            let cartographic =  Cesium.Cartographic.fromCartesian(new Cesium.Cartesian3(values[i], values[i + 1], values[i + 2]));
            cartographic.height += pathHeights[0][0];
            let car = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude), cartographic.height);
            values[i] = car.x;
            values[i + 1] = car.y;
            values[i + 2] = car.z;
          }
        }
        if (defined(instance)) instances.push(instance);
      }
    }

    if (fill && fill !== "none" && fillStyleType > 0) {

      console.log("pathElem", pathElem)
      for (let i = 0; i < parts.length; i += 1) {
        const coords = parts[i];
        if (pathHeights && pathHeights instanceof Array) {
          if (pathElem.type === 'path' && !pathElem._dimModal.translatePnt) {
            geometry = this._generateFillGeometry(coords, _fillWidthSize, pathHeights[i]);
          } else {
            geometry = this._generateFillGeometry(coords, _fillWidthSize);
          }
        } else {
          geometry = this._generateFillGeometry(coords, _fillWidthSize);
        }

        const instance = this._generateCesiumGeometryInstance(
          pathElem,
          geometry,
          options,
          this.getColor(pathElem, "fillStyle"),
          true
        );
        if (defined(instance)) instances.push(instance);
      }
    }
    return instances;
  }

  transformExtrudeGeometry(geometry, options) {
    if (!defined(geometry)) return;

    const position = geometry.vertexArrayBuffer;
    if (!defined(position)) return;

    const positionArr = position.array;
    for (let i = 0; i < positionArr.length; i += 3) {
      const res = CesiumUtil.WebMercatorUnProject(
        positionArr[i],
        positionArr[i + 1]
      );

      positionArr[i] = res.x;
      positionArr[i + 1] = res.y;
    }
  }

  transfromGeoCesium(elem, cesGeom, options) {
    CesiumGeomUtil.degreesWithHeightToWorldCoords(
      cesGeom,
      options.dimModHeight
    );
  }
}
