/*
 * @Author: your name
 * @Date: 2021-10-25 10:17:52
 * @LastEditTime: 2022-04-01 16:40:05
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\RegularLine1Primitive.js
 */
import BaseRegularPrimitive from "./BaseRegularPrimitive";
import RegularLine1ElementInstance from "../ElementInstance/RegularLine1ElementInstance";

export default class RegularLine1Primitive extends BaseRegularPrimitive {
  constructor() {
    super();
    this.extendPrimitiveAttributes = [
      "dimModHeight",
      "dimModAttitude",
      "isOpenWall",
      "isWallGradColor",
      "wallColor",
      "wallGradColor",
    ];
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

  _createGeomInstance() {
    const webMercatorProjection = new Cesium.WebMercatorProjection();

    const projectPos = this._positions.map((s) => {
      var cartographic = Cesium.Cartographic.fromCartesian(s);
      return webMercatorProjection.project(cartographic);
    });

    // 设置缩放参数
    const scale = this.getGlobelScale();
    this._elem.changeAttributeStatus(true, scale, scale);

    this._elem.setPoints(projectPos);
    return this._elementInstance(this._elem);
  }

  _elementInstance(ele) {
    const instances = new RegularLine1ElementInstance(
      ele,
      {...this.getBaseSaveAttributesValues(), globelScale: this.getGlobelScale()}
    ).getInstance();
    return instances;
  }

  initBaseSaveAttributes() {
    super.initBaseSaveAttributes()
    this.dimModAttitude = 1;
    this.isOpenWall = true;
    this.isWallGradColor = false
    this.wallColor = 'rgba(255,0,0,0.3)'
    this.wallGradColor = 'rgba(255,0,0,0.3)'
  }

  getPrimitiveBaseSaveAttributes() {
    return RegularLine1Primitive.extendPrimitiveAttributes.concat([]);
  }
}
