import SvgElementInstance from "./SvgElementInstance";
import { CesiumGeomUtil, CesiumUtil } from "../../Utils/CesiumUtil";
import MainElement from "../../../PlotBase/SvgLoader/element/extend/MainElement";
import { defined } from "../../../PlotUtilBase/Check";

/**
 * @class module:3DPlot.RegularLineElementInstance
 * @description SVG的线符号解析基类
 * @author 基础平台-杨琨
 */
export default class RegularLineElementInstance extends SvgElementInstance {

  /**
   * @function module:3DPlot.RegularLineElementInstance.svgToGeomInstances
   * @description 重载父类的svgToGeomInstances方法
   * @public
   * @override
   *
   * @param {Object} elem SVG符号对象
   * @param {Object} options 额外参数
   * @param {function} callback 回调函数
   */
  svgToGeomInstances(elem, options, callback) {
    let that = this;
    super.svgToGeomInstances(elem, options, function (instances, wallOffsetHeights) {
      const wallGeomInstances = that.generateWallGeometryInstances(elem, options, wallOffsetHeights);
      callback({ instances, wallGeomInstances });
    });
  }

  /**
   * @function module:3DPlot.RegularLineElementInstance.generateWallGeometryInstances
   * @description 生成三维墙体几何对象
   * @public
   *
   * @param {Object} elem SVG符号对象
   * @param {Object} options 额外参数
   * @param {Array} wallOffsetHeights 开启高程采样是墙体的抬高高度数组
   */
  generateWallGeometryInstances(elem, options, wallOffsetHeights) {
    if (!options.isOpenWall) return undefined;

    const paths = [];
    elem.getPathElem(paths);

    let instances = [], wallIndex = 0, wallOffsetHeightArray;
    for (let i = 0; i < paths.length; i += 1) {
      const {type} = paths[i];
      if(wallOffsetHeights instanceof Array && wallOffsetHeights.length > 0 && (type === 'extendline' || type === 'mainline')){
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

  /**
   * @function module:3DPlot.RegularLineElementInstance.pathElemToWallGeomInstance
   * @description 生成三维墙的CesiumGeometry对象
   * @public
   *
   * @param {Object} pathElem SVG的path符号对象
   * @param {Object} options 额外参数
   * @param {Array} wallOffsetHeights 开启高程采样是墙体的抬高高度数组
   */
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

  /**
   * @function module:3DPlot.RegularLineElementInstance.pathElemToGeomInstance
   * @description 重载父类的pathElemToGeomInstance方法
   * @public
   * @override
   *
   * @param {Object} pathElem SVG的path符号对象
   * @param {Object} options 额外参数
   */
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

  /**
   * @function module:3DPlot.SvgElementInstance.transformExtrudeGeometry
   * @description: 重载父类的transformExtrudeGeometry方法
   * @public
   * @override
   *
   * @param {Object} geometry 三维几何体对象
   * @param {Object} options 额外参数
   */
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

  /**
   * @function module:3DPlot.SvgElementInstance.transfromGeoCesium
   * @description: 重载父类的transfromGeoCesium方法
   * @public
   * @override
   *
   * @param {Object} elem SVG符号对象
   * @param {Object} cesGeom 三维几何体对象
   * @param {Object} options 额外参数
   */
  transfromGeoCesium(elem,cesGeom, options) {
    CesiumGeomUtil.degreesWithHeightToWorldCoords(
      cesGeom,
      options.dimModHeight
    );
  }
}
