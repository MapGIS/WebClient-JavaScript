import BaseRegularPrimitive from "./BaseRegularPrimitive";
import RegularLine1ElementInstance from "../ElementInstance/RegularLine1ElementInstance";

/**
 * @class module:3DPlot.RegularLine1Primitive
 * @description 标绘图元（规则线一）基类
 * @author 基础平台-杨琨
 *
 * @param options - {Object} 初始化参数
 */
class RegularLine1Primitive extends BaseRegularPrimitive {
  constructor(options) {
    super(options);
  }

  /**
   * @description 重载父类的update方法
   * @function module:3DPlot.RegularLine1Primitive.update
   * @public
   *
   * @param {Boolean} frameState 是否更新
   * */
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

  /**
   * @description 重载父类的_createGeomInstance方法
   * @private
   *
   * @param {function} callback 回调函数
   * */
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

  /**
   * @description 重载父类的_elementInstance方法
   * @private
   *
   * @param {function} callback 回调函数
   * */
  _elementInstance(callback) {
    new RegularLine1ElementInstance(
        this._elem,
      {...this.getBaseSaveAttributesValues(), globelScale: this.getGlobelScale()}
    ).getInstance(function (instances) {
      callback(instances);
    });
  }

  /**
   * @description 重载父类的initBaseSaveAttributes方法
   * @function module:3DPlot.RegularLine1Primitive.initBaseSaveAttributes
   * @public
   * */
  initBaseSaveAttributes() {
    super.initBaseSaveAttributes()
    this.dimModAttitude = "1";
    this.isOpenWall = true;
    this.isWallGradColor = false
    this.wallColor = 'rgba(255,0,0,0.3)'
    this.wallGradColor = 'rgba(255,0,0,0.3)'
  }

  /**
   * @description 重载父类的getPrimitiveBaseSaveAttributes方法
   * @function module:3DPlot.RegularLine1Primitive.getPrimitiveBaseSaveAttributes
   * @public
   *
   * @return {Array} Attributes 属性字段数组
   * */
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