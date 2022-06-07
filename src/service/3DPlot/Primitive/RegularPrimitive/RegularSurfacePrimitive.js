import RegularSurfaceElementInstance from '../ElementInstance/RegularSurfaceElementInstance';
import RegularLine1Primitive from './RegularLine1Primitive';

/**
 * @class module:3DPlot.RegularSurfacePrimitive
 * @description 标绘图元（规则区一）基类
 * @author 基础平台-杨琨
 *
 * @param options - {Object} 初始化参数
 */
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

    /**
     * @description 重写父类的update方法
     * @function module:3DPlot.RegularSurfacePrimitive.update
     * @public
     *
     * @param {Boolean} frameState 是否更新
     */
    update(frameState) {
        if (!this._elem || !this._elem.show) {
            return;
        }
        if (this._update) {
            let that = this;
            this._update = false;
            this._createGeomInstance(function (instanceObject) {
                const { polygonRect, borderColor, instances, polylineOutInstance } = instanceObject;

                that._primitive = that._createFillInstance(instances, { polygonRect });

                if (that._primitive) {
                    that._primitive.pickedPrimitive = that;
                }

                that._primitive1 = that._createPolylineOutInstance(polylineOutInstance, { borderColor });

                that._primitive1.pickedPrimitive = that;
                that._primitive1 && that._primitive1.update(frameState);
                that._primitive && that._primitive.update(frameState);
            });
        }else {
            this._primitive1 && this._primitive1.update(frameState);
            this._primitive && this._primitive.update(frameState);   
        }
    }

    /**
     * @description 重写父类的_elementInstance方法
     * @private
     *
     * @param {function} callback 回调函数
     */
    _elementInstance(callback) {
        new RegularSurfaceElementInstance(this._elem, {
            ...this.getBaseSaveAttributesValues(),
            globelScale: this.getGlobelScale()
        }).getInstance(function (instances) {
            callback(instances);
        });
    }

    /**
     * @description 重写父类的initBaseSaveAttributes方法
     * @function module:3DPlot.RegularSurfacePrimitive.initBaseSaveAttributes
     * @public
     */
    initBaseSaveAttributes() {
        this.surfaceBorderWidth = 3;
    }

    /**
     * @description 重写父类的getPrimitiveBaseSaveAttributes方法
     * @function module:3DPlot.RegularSurfacePrimitive.getPrimitiveBaseSaveAttributes
     * @public
     *
     * @return {Array} Attributes 属性字段数组
     */
    getPrimitiveBaseSaveAttributes() {
        return RegularSurfacePrimitive.extendPrimitiveAttributes.concat([]);
    }
}

RegularSurfacePrimitive.extendPrimitiveAttributes = ['surfaceBorderWidth'];

export default RegularSurfacePrimitive;
