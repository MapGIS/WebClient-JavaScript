/*
 * @Author: your name
 * @Date: 2021-10-25 10:17:52
 * @LastEditTime: 2022-05-20 10:38:22
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\RegularLine1Primitive.js
 */
import BaseRegularPrimitive from "./BaseRegularPrimitive";
import RegularLine1ElementInstance from "../ElementInstance/RegularLine1ElementInstance";

class RegularLine1Primitive extends BaseRegularPrimitive {
  constructor(options) {
    super(options);
  }

  update(frameState) {
    if (!this._elem || !this._elem.show) {
      return;
    }

    if (this._update) {
      let that = this;
      this._update = false;
      this._translucent = false;
      this._createGeomInstance(function (instancesObj) {
        const {instances, wallGeomInstances} = instancesObj;
        that.applySelectStatus(instances);
        that.instancesToPrimitives(instances);
        that.wallInstancesToPrimitive(wallGeomInstances);
        that.updatePrimitive(frameState);
      });
    }else {
      this.updatePrimitive(frameState);
    }
  }

  _createGeomInstance(callback) {
    const webMercatorProjection = new Cesium.WebMercatorProjection();

    const projectPos = this._positions.map((s) => {
      var cartographic = Cesium.Cartographic.fromCartesian(s);
      return webMercatorProjection.project(cartographic);
    });

    // 设置缩放参数
    const scale = this.getGlobelScale();
    this._elem.changeAttributeStatus(true, scale, scale);

    this._elem.setPoints(projectPos);
    this._elementInstance(function (instances) {
      callback(instances);
    });
  }

  _elementInstance(callback) {
    new RegularLine1ElementInstance(
        this._elem,
      {...this.getBaseSaveAttributesValues(), globelScale: this.getGlobelScale()}
    ).getInstance(function (instances) {
      callback(instances);
    });
  }

  initBaseSaveAttributes() {
    super.initBaseSaveAttributes()
    this.dimModAttitude = "1";
    this.isOpenWall = true;
    this.isWallGradColor = false
    this.wallColor = 'rgba(255,0,0,0.3)'
    this.wallGradColor = 'rgba(255,0,0,0.3)'
  }

  getPrimitiveBaseSaveAttributes() {
    return RegularLine1Primitive.extendPrimitiveAttributes.concat([]);
  }
}

RegularLine1Primitive.extendPrimitiveAttributes = [
  "dimModHeight",
  "dimModAttitude",
  "isOpenWall",
  "isWallGradColor",
  "wallColor",
  "wallGradColor",
];

export default RegularLine1Primitive;