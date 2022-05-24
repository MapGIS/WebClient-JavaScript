/*
 * @Author: your name
 * @Date: 2021-10-25 10:26:48
 * @LastEditTime: 2022-05-20 17:14:28
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\ElementInstance\RegularLine1ElementInstance.js
 */
import SvgElementInstance from "./SvgElementInstance";
import { CesiumGeomUtil, CesiumUtil } from "../../Utils/CesiumUtil";
import MainElement from "../../../../service/PlotBase/SvgLoader/element/extend/MainElement";
import { defined } from "../../../PlotUtilBase/Check";

export default class RegularLineElementInstance extends SvgElementInstance {
  svgToGeomInstances(elem, options, callback) {
    let that = this;
    super.svgToGeomInstances(elem, options, function (instances, wallOffsetHeights) {
      const wallGeomInstances = that.generateWallGeometryInstances(elem, options, wallOffsetHeights);
      callback({ instances, wallGeomInstances });
    });
  }

  /**
   * 生成墙
   * @param {*} elem
   * @param {*} options
   * @returns
   */
  generateWallGeometryInstances(elem, options, wallOffsetHeights) {
    if (!options.isOpenWall) return undefined;

    const paths = [];
    elem.getPathElem(paths);

    let instances = [], wallIndex = 0, wallOffsetHeightArray;
    for (let i = 0; i < paths.length; i += 1) {
      const {type} = paths[i];
      if(type === 'extendline' || type === 'mainline'){
        wallOffsetHeightArray = wallOffsetHeights[wallIndex];
        wallIndex++;
      }

      const wallGeomInstance = this.pathElemToWallGeomInstance(
        paths[i],
        options,
        wallOffsetHeightArray
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

  pathElemToWallGeomInstance(pathElem, options, wallOffsetHeights) {
    const wallHeight = options.dimModHeight;
    const wallColor = options.wallColor;
    const cesiumWallColor = Cesium.ColorGeometryInstanceAttribute.fromColor(
      Cesium.Color.fromCssColorString(wallColor)
    );

    const parts = pathElem.cacheCoords || pathElem.getCoords();
    const instances = [];
    if(wallOffsetHeights instanceof Array && wallOffsetHeights.length > 0){
      for (let i = 0; i < parts.length; i += 1) {
        const coords = parts[i];

        const degreeArrayHeights = [];
        for (let j = 0; j < coords.length; j += 1) {
          const coord = coords[j];
          const res = CesiumUtil.WebMercatorUnProject(coord.x, coord.y);
          degreeArrayHeights.push(res.x, res.y, wallHeight + wallOffsetHeights[i][j]);
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
    }else {
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
    }

    return instances;
  }

  pathElemToGeomInstance(pathElem, options) {
    const instances = [];
    const style=pathElem.getContextStyle()
    const fill =style.fillStyle;
    const stroke = style.strokeStyle;
    const fillStyleType=style.fillStyleType
    const lineWidth=style.lineWidth
    const strokeWidthSize = lineWidth*this.globelScale/2;
    const _fillWidthSize = this.fillDefaultWidth*this.globelScale/2
    const {offsetHeights} = options;

    const parts = pathElem.cacheCoords || pathElem.getCoords();
    
    const isMainElement = !!(pathElem instanceof MainElement);

    if (stroke && stroke !== "none") {

      for (let i = 0; i < parts.length; i += 1) {
        let offsetHeight;
        if(offsetHeights){
          offsetHeight = offsetHeights[i];
        }
        const coords = parts[i];
        const geometry = this._generateStrokeGeometry(
          coords,
          isMainElement ? strokeWidthSize - 5 : strokeWidthSize,
          offsetHeight
        );
        geometry.modDetail=pathElem.getGeometryDetail(i)
        const instance = this._generateCesiumGeometryInstance(
          pathElem,
          geometry,
          options,
          this.getColor(pathElem, "strokeStyle"),
          true
        );
        if (defined(instance)) instances.push(instance);
      }
    }

    if (fill && fill !== "none" && fillStyleType>0) {

      for (let i = 0; i < parts.length; i += 1) {
        const coords = parts[i];
        const geometry = this._generateFillGeometry(coords, _fillWidthSize);
        geometry.modDetail=pathElem.getGeometryDetail(i)
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

  transformExtrudeGeometry(geometry,options) {
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

  transfromGeoCesium(elem,cesGeom, options) {
    CesiumGeomUtil.degreesWithHeightToWorldCoords(
      cesGeom,
      options.dimModHeight
    );
  }
}
