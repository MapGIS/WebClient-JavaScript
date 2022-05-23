/*
 * @class:
 * @Description:
 * @Author: zk
 * @Date: 2022-05-23 14:21:36
 * @LastEditors: zk
 * @LastEditTime: 2022-05-23 17:26:48
 */
import RegularSurfaceElementInstance from '../ElementInstance/RegularSurfaceElementInstance';
import SimpleAreaForKidneyElementInstance from '../ElementInstance/SimpleAreaForKidneyElementInstance';
import KidneyAreaPrimitive from './KidneyAreaPrimitive';

class SimpleAreaPrimitive extends KidneyAreaPrimitive {
    constructor(options) {
        super(options);
        this.isMustFill = this._elem.isMustFill;
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
        if (this.isMustFill) {
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
        } else {
            if (this._update) {
                this._update = false;
                this._translucent = false;
                const { instances, wallGeomInstances } = this._createGeomInstance();

                this.applySelectStatus(instances);
                this.instancesToPrimitives(instances);
                this.wallInstancesToPrimitive(wallGeomInstances);
            }
            this.updatePrimitive(frameState);
        }
    }

    _elementInstance(ele) {
        if (this.isMustFill) {
            const instances = new RegularSurfaceElementInstance(ele, {
                ...this.getBaseSaveAttributesValues(),
                globelScale: this.getGlobelScale()
            }).getInstance();
            return instances;
        } else {
            const instances = new SimpleAreaForKidneyElementInstance(ele, {
                ...this.getBaseSaveAttributesValues(),
                globelScale: this.getGlobelScale()
            }).getInstance();
            return instances;
        }
    }

    getPrimitiveBaseSaveAttributes() {
        return SimpleAreaPrimitive.extendPrimitiveAttributes.concat([]);
    }

    initBaseSaveAttributes() {
        this.dimModAttitude = this._elem.getSymbolPose();
        this.dimModHeight = this._modHeight;
        this.surfaceBorderWidth = 3;
        this.isWallGradColor = false;
        this.wallColor = 'rgba(255,0,0,0.3)';
        this.wallGradColor = 'rgba(255,0,0,0.3)';
    }
}
SimpleAreaPrimitive.extendPrimitiveAttributes = ['dimModAttitude', 'dimModHeight', 'isOpenWall', 'isWallGradColor', 'wallColor', 'wallGradColor','surfaceBorderWidth']

export default SimpleAreaPrimitive;
