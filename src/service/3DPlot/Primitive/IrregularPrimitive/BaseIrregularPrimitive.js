/*
 * @Author: your name
 * @Date: 2021-10-25 10:17:42
 * @LastEditTime: 2022-04-01 09:46:07
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\IrregularPrimitive\BaseIrregularPrimitive.js
 */
import Point from "../../../../service/PlotUtilBase/Geometry/Point";
import {Vector2} from "../../../PlotUtilBase/Math/Vector2";
import BasePlotPrimitive from "../BasePlotPrimitive";
import IrregularElementInstance from "../ElementInstance/IrregularElementInstance";

class BaseIrregularPrimitive extends BasePlotPrimitive {
  constructor(options) {
    super(options);
  }

  update(frameState) {
    if (!this._elem || !this._elem.show) {
      return;
    }

    if (this._update) {
      this._update = false;
      this._translucent = false;
      const {instances, wallGeomInstances} = this._createGeomInstance();

      this.applySelectStatus(instances);

      this.instancesToPrimitives(instances);

      this.wallInstancesToPrimitive(wallGeomInstances);
    }
    this.updatePrimitive(frameState);
  }

  /**
   * @description: 处理最后两点绘制不闭合
   * @param {*} coords
   * @return {*}
   */
  _closeCoordsPath(coords) {
    if (!coords || coords.length < 3) return;
    const firstPnt = coords[0];
    const endPnt = coords[coords.length - 1];

    if (
      Math.abs(firstPnt.x - endPnt.x) < 10e-8 &&
      Math.abs(firstPnt.y - endPnt.y) < 10e-8
    ) {
      const secondPnt = coords[1];
      const lastPnt = new Vector2(secondPnt.x, secondPnt.y);
      coords.push(lastPnt);
    }
  }

  _createGeomInstance() {
    const webMercatorProjection = new Cesium.WebMercatorProjection();
    const projectPos = this._positions.map((s) => {
      var cartographic = Cesium.Cartographic.fromCartesian(s);
      var projectPnts = webMercatorProjection.project(cartographic);
      return new Point(projectPnts.x, projectPnts.y);
    });

    // 设置缩放参数
    const scale = this.getGlobelScale();
    this._elem.changeAttributeStatus(true, scale, scale);
    // 设置点
    this._elem.setPoints(projectPos);

    return this._elementInstance(this._elem);
  }

  _elementInstance(ele) {
    return new IrregularElementInstance(ele, {
      ...this.getBaseSaveAttributesValues(),
      globelScale: this.getGlobelScale(),
    }).getInstance();
  }

  initBaseSaveAttributes() {
    this.dimModHeight = this._modHeight;
    this.isOpenWall = true;
    this.isWallGradColor = false;
    this.wallColor = "rgba(255,0,0,0.3)";
    this.wallGradColor = "rgba(255,0,0,0.3)";
  }

  getPrimitiveBaseSaveAttributes() {
    return BaseIrregularPrimitive.extendPrimitiveAttributes.concat([]);
  }
}

BaseIrregularPrimitive.extendPrimitiveAttributes = [
  "dimModHeight",
  "isOpenWall",
  "isWallGradColor",
  "wallColor",
  "wallGradColor",
];

export default BaseIrregularPrimitive;
