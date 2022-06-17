import RegularLine1ElementInstance from "./RegularLine1ElementInstance";
import {CesiumGeomUtil} from "../../Utils/CesiumUtil";

/**
 * @class module:3DPlot.KidneyAreaElementInstance
 * @description SVG的二类线符号解析基类
 * @author 基础平台-杨琨
 */
export default class KidneyAreaElementInstance extends RegularLine1ElementInstance {

  /**
   * @function module:3DPlot.KidneyAreaElementInstance.transfromGeoCesium
   * @description: 重载父类的transfromGeoCesium方法
   * @public
   * @override
   *
   * @param {Object} elem SVG符号对象
   * @param {Object} cesgeo 三维几何体对象
   * @param {Object} options 额外参数
   */
  transfromGeoCesium(elem, cesgeo, options) {
    CesiumGeomUtil.degreesWithHeightToWorldCoords(
        cesgeo,
      options.dimModHeight
    );
    if(cesgeo.modDetail){
      this._rotatePart(elem, cesgeo, options);
    }
    
  }
}
