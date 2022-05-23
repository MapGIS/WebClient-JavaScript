/*
 * @Author: your name
 * @Date: 2021-10-25 11:03:09
 * @LastEditTime: 2022-05-23 15:49:43
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\RegularSurfacePrimitive.js
 */
import RegularSurfaceElementInstance from '../ElementInstance/RegularSurfaceElementInstance';
import RegularLine1Primitive from './RegularLine1Primitive';

class RegularSurfacePrimitive extends RegularLine1Primitive {
    constructor(options) {
        super(options);
    }

    _createFillInstance(instances, options) {
        const { polygonRect } = options;

        const img = this._elem._getFillImg();
        const px_height = img.height * this.getGlobelScale();
        const px_width = img.width * this.getGlobelScale();

        let _primitive = null;

        if (px_height !== 0 && px_width !== 0) {
            const xNum = Math.ceil(polygonRect.width / px_width);
            const yNum = Math.ceil(polygonRect.height / px_height);
            _primitive = new Cesium.GroundPrimitive({
                geometryInstances: instances,
                asynchronous: true,
                classificationType: Cesium.ClassificationType.TERRAIN,
                appearance: new Cesium.MaterialAppearance({
                    material: new Cesium.Material({
                        fabric: {
                            type: 'Image',
                            uniforms: {
                                image: img,
                                repeat: { x: xNum, y: yNum }
                            }
                        }
                    })
                })
            });
        }
        return _primitive;
    }
    _createPolylineOutInstance(polylineOutInstance, options) {
        const { borderColor } = options;

        const materialOpts = {
            fabric: {
                type: 'Color',
                uniforms: {
                    color: borderColor
                }
            }
        };

        return new Cesium.GroundPolylinePrimitive({
            geometryInstances: polylineOutInstance,
            asynchronous: true,
            appearance: new Cesium.PolylineMaterialAppearance({
                material: new Cesium.Material(materialOpts)
            })
        });
    }

    update(frameState) {
        if (!this._elem || !this._elem.show) {
            return;
        }
        if (this._update) {
            this._update = false;
            const instanceObject = this._createGeomInstance(this._elem);

            const { polygonRect, borderColor, instances, polylineOutInstance } = instanceObject;

            this._primitive = this._createFillInstance(instances, { polygonRect });

            if (this._primitive) {
                this._primitive.pickedPrimitive = this;
            }

            this._primitive1 = this._createPolylineOutInstance(polylineOutInstance, { borderColor });

            this._primitive1.pickedPrimitive = this;
        }
        this._primitive1 && this._primitive1.update(frameState);
        this._primitive && this._primitive.update(frameState);
    }
    _elementInstance(ele) {
        const instances = new RegularSurfaceElementInstance(ele, {
            ...this.getBaseSaveAttributesValues(),
            globelScale: this.getGlobelScale()
        }).getInstance();
        return instances;
    }

    initBaseSaveAttributes() {
        this.surfaceBorderWidth = 3;
    }

    getPrimitiveBaseSaveAttributes() {
        return RegularSurfacePrimitive.extendPrimitiveAttributes.concat([]);
    }
}

RegularSurfacePrimitive.extendPrimitiveAttributes = ['surfaceBorderWidth'];

export default RegularSurfacePrimitive;
