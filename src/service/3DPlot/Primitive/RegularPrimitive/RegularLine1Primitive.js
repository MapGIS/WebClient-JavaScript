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

class RegularLine1Primitive extends BaseRegularPrimitive {
  constructor(options) {
    options = options || {};
    super(options);
    //是否贴地或贴模型
    const {classificationType} = options;
    this._classificationType = classificationType;
  }

  update(frameState) {
    let that = this;
    if (!this._elem || !this._elem.show) {
      return;
    }

    if (this._update) {
      this._update = false;
      this._translucent = false;
      this._createGeomInstance(function (elementInstance) {
        const {instances, wallGeomInstances} = elementInstance;
        that.applySelectStatus(instances);
        that.instancesToPrimitives(instances);
        //不贴地或不贴模型时，才显示墙
        if(!that._classificationType && !(typeof that._classificationType === 'number')){
          that.wallInstancesToPrimitive(wallGeomInstances);
        }
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
    this._elementInstance(this._elem, function (instances) {
      callback(instances);
    })
  }

  _elementInstance(ele, callback) {
    new RegularLine1ElementInstance(
      ele,
      {...this.getBaseSaveAttributesValues(), globelScale: this.getGlobelScale()}
    ).getInstance(function (instances) {
      callback(instances);
    });
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

RegularLine1Primitive.extendPrimitiveAttributes = [
  "dimModHeight",
  "dimModAttitude",
  "isOpenWall",
  "isWallGradColor",
  "wallColor",
  "wallGradColor",
];

export default RegularLine1Primitive;