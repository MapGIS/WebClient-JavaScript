import { defined } from "../../../PlotUtilBase/Check";
import RegularLineElementInstance from "./RegularLineElementInstance";
import GeomUtil from "../../../../service/PlotUtilBase/Geometry/GeomUtil";

/**
 * @class module:3DPlot.IrregularElementInstance
 * @description SVG的非规则符号解析器
 * @author 基础平台-杨琨
 */
export default class IrregularElementInstance extends RegularLineElementInstance {

  /**
   * @function module:3DPlot.IrregularElementInstance.svgToGeomInstances
   * @description 重载父类的svgToGeomInstances方法
   * @public
   * @override
   *
   * @param {Object} elem SVG符号对象
   * @param {Object} options 额外参数
   * @param {function} callback 回调函数
   */
  svgToGeomInstances(elem, options, callback) {
    const instances = this.pathElemToGeomInstance(elem, options);
    let wallGeomInstances;
    if (!options.isOpenWall) {
      wallGeomInstances = undefined;
    } else {
      wallGeomInstances = this.pathElemToWallGeomInstance(elem, options);
    }
    callback({ instances, wallGeomInstances });
  }

  /**
   * @function module:3DPlot.IrregularElementInstance.pathElemToGeomInstance
   * @description 重载父类的pathElemToGeomInstance方法
   * @public
   * @override
   *
   * @param {Object} elem SVG的path符号对象
   * @param {Object} options 额外参数
   */
  pathElemToGeomInstance(elem, options) {
    const instances = [];
    const coords = elem.cacheCoords || elem.getCoords();
    const pathStyle = elem.getContextStyle();
    const lineWidth = pathStyle.lineWidth;
    const fillStyleType = pathStyle.fillStyleType;

    // 非规则符号使用外部设置函数进行控制点填充
    const strokeCoords = this._elem.applyFuncToStorkeGeometry(coords);
    // 非规则符号使用完整几何进行填充
    const fillCoords= this._elem.applyFuncToFillGeometry(coords);


    const strokeColor = Cesium.Color.fromCssColorString(pathStyle.strokeStyle);
    const widthSize = (lineWidth * this.globelScale) / 2;

    const fillColor = Cesium.Color.fromCssColorString(pathStyle.fillStyle);
    const fillSize = (this.fillDefaultWidth * this.globelScale) / 2;

    const strokeColorAttribute =
      Cesium.ColorGeometryInstanceAttribute.fromColor(strokeColor);
    const fillColorAttribute =
      Cesium.ColorGeometryInstanceAttribute.fromColor(fillColor);

    for (let i = 0; i < strokeCoords.length; i += 1) {
      let path = strokeCoords[i];
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
      for (let i = 0; i < fillCoords.length; i += 1) {
        let path = fillCoords[i];
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
