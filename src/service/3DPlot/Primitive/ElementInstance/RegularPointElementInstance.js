import SvgElementInstance from "./SvgElementInstance";
import {CesiumGeomUtil} from "../../Utils/CesiumUtil";

/**
 * @class module:3DPlot.RegularPointElementInstance
 * @description SVG的点符号解析器
 * @author 基础平台-杨琨
 */
export default class RegularPointElementInstance extends SvgElementInstance {

  /**
   * @function module:3DPlot.SvgElementInstance.transformExtrudeGeometry
   * @description: 重载父类的transfromGeoCesium方法
   * @public
   * @override
   *
   * @param {Object} elem SVG符号对象
   * @param {Object} cesgeo 三维几何体对象
   * @param {Object} options 额外参数
   */
  transfromGeoCesium(elem,cesgeo, options) {
    const { dimModHeight, dimModAttitude } = options;

    // 点是否翻转直立
    let isTurnOver = false;
    if (dimModAttitude === "1") {
      isTurnOver = true;
    }

    const tranSize = this._elem.getTranSize()
      ? this._elem.getTranSize()
      : [1, 1];
    const tranAngle =
      this._elem.tranAngle || this._elem.tranAngle === 0
        ? this._elem.tranAngle
        : 0;

    const t1 = tranSize[0];
    const t2 = tranSize[1];

    const rad = Cesium.Math.toRadians(tranAngle);
    CesiumGeomUtil.scale(cesgeo, t1, t2, 1);

    // 旋转
    if (isTurnOver) {
      CesiumGeomUtil.rotateX(cesgeo, Math.PI / 2);
      CesiumGeomUtil.rotateZ(cesgeo, -rad);
    } else {
      CesiumGeomUtil.rotateZ(cesgeo, -rad);
    }
    // 平移模型
    CesiumGeomUtil.translate(cesgeo, new Cesium.Cartesian3(0, 0, dimModHeight));
  }
}
