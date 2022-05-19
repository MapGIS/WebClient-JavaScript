/*
 * @Author: your name
 * @Date: 2021-10-25 11:03:09
 * @LastEditTime: 2022-04-01 09:59:55
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\RegularSurfacePrimitive.js
 */
import RegularSurfaceElementInstance from "../ElementInstance/RegularSurfaceElementInstance";
import RegularLine1Primitive from "./RegularLine1Primitive";

class RegularSurfacePrimitive extends RegularLine1Primitive {
  constructor(options) {
    super(options);
  }

  update(frameState) {
    if (!this._elem || !this._elem.show) {
      return;
    }
    if (this._update) {
      this._update = false;
      const instanceObject = this._createGeomInstance(this._elem);

      const {polygonRect, borderColor, instances, polylineOutInstance} =
        instanceObject;

      const img = this._elem._getFillImg();

      const px_height = img.height * this.getGlobelScale();
      const px_width = img.width * this.getGlobelScale();

      if (px_height !== 0 && px_width !== 0) {
        const xNum = Math.ceil(polygonRect.width / px_width);
        const yNum = Math.ceil(polygonRect.height / px_height);
        this._primitive = new Cesium.GroundPrimitive({
          geometryInstances: instances,
          asynchronous: true,
          classificationType: Cesium.ClassificationType.TERRAIN,
          appearance: new Cesium.MaterialAppearance({
            material: new Cesium.Material({
              fabric: {
                type: "Image",
                uniforms: {
                  image: img,
                  repeat: {x: xNum, y: yNum},
                },
              },
            }),
          }),
        });
        this._primitive.pickedPrimitive = this;
      } else {
        this._primitive = null;
      }

      const materialOpts = {
        fabric: {
          type: "Color",
          uniforms: {
            color: borderColor,
          },
        },
      };

      this._primitive1 = new Cesium.GroundPolylinePrimitive({
        geometryInstances: polylineOutInstance,
        asynchronous: true,
        appearance: new Cesium.PolylineMaterialAppearance({
          material: new Cesium.Material(materialOpts),
        }),
      });

      this._primitive1.pickedPrimitive = this;
    }
    this._primitive1 && this._primitive1.update(frameState);
    this._primitive && this._primitive.update(frameState);
  }

  _elementInstance(ele) {
    const instances = new RegularSurfaceElementInstance(
      ele,
      {...this.getBaseSaveAttributesValues(), globelScale: this.getGlobelScale()}
    ).getInstance();
    return instances;
  }

  initBaseSaveAttributes() {
    this.surfaceBorderWidth = 3;
  }

  getPrimitiveBaseSaveAttributes() {
    return RegularSurfacePrimitive.extendPrimitiveAttributes.concat([]);
  }
}

RegularSurfacePrimitive.extendPrimitiveAttributes = ["surfaceBorderWidth"];

export default RegularSurfacePrimitive;
