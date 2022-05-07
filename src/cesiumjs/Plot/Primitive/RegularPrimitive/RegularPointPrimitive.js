/*
 * @Author: your name
 * @Date: 2021-10-20 10:57:25
 * @LastEditTime: 2022-04-21 16:57:22
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\RegularPointPrimitive.js
 */
import BaseRegularPrimitive from "./BaseRegularPrimitive";
import RegularPointElementInstance from "../ElementInstance/RegularPointElementInstance";

export default class RegularPointPrimitive extends BaseRegularPrimitive {
  constructor(options) {
    super(options);
    this._modelMatrix = Cesium.Matrix4.clone(Cesium.Matrix4.IDENTITY);
    // 平移刷新
    this._isTranslate = false;
    this.extendPrimitiveAttributes = ["dimModHeight", "dimModAttitude"];
  }

  set modelMatrix(modalMatrix){
    this._modelMatrix=modalMatrix
  }
  get modelMatrix() {
    return this._modelMatrix;
  }

  set selected(selected) {
    this._selected = selected;
    this._update = true;
    this._isTranslate=false
  }

  _elemPropsUpdateHandler(event) {
    if (event.type === "positions") {
      this._positions = [];
      const positions = event.value;
      for (let i = 0; i < positions.length; i += 1) {
        const tempPos = this._elem.positions[i];
        this._positions.push(
          Cesium.Cartesian3.fromDegrees(tempPos.x, tempPos.y)
        );
      }
      this._isTranslate = true;
    }
    this._update = true;
    
  }
  update(frameState) {
    if (!this._elem || !this._elem.show) {
      return;
    }

    if (this._update) {
      this._update = false;
      this._translucent = false;
      // 更新刷新位置
      this._modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        this._positions[0]
      );

      if (this._primitives&&this._primitives.length>0 && this._isTranslate) {
        this._primitives.forEach((primitive)=>{
          primitive.modelMatrix = this._modelMatrix;
        })
        this._isTranslate = false;
      } else {
        // 设置缩放参数
        const scale = this.getGlobelScale();
        this._elem.changeAttributeStatus(true, scale, scale);

        const geomInstances = this._createGeomInstance();

        this.applySelectStatus(geomInstances);
        this.instancesToPrimitives(geomInstances);
      }
    }

    this.updatePrimitive(frameState);
  }

  isDestroyed() {
    return false;
  }

  _createGeomInstance() {
    return this._elementInstance(this._elem);
  }
  _elementInstance(ele) {
    const instances = new RegularPointElementInstance(
      ele,
      {...this.getBaseSaveAttributesValues(),globelScale:this.getGlobelScale()} 
    ).getInstance();
    return instances;
  }

  initBaseSaveAttributes() {
    this.dimModHeight = 0;
    this.dimModAttitude = 1;
  }

  getPrimitiveBaseSaveAttributes() {
    return RegularPointPrimitive.extendPrimitiveAttributes.concat([]);
  }

  instancesToPrimitives(instances) {
    if (instances && instances.length > 0) {
      this.destroy()
      this._primitives = instances.map((instance) => {
        const primitive = new Cesium.Primitive({
          geometryInstances: instance,
          modelMatrix: this._modelMatrix,
          appearance: new Cesium.PerInstanceColorAppearance({
            translucent: this._translucent || this.isTranslucentInstance(instance),
          }),
          asynchronous: false,
        });
        primitive.pickedPrimitive = this;
        return primitive;
      });
    }
  }
}
