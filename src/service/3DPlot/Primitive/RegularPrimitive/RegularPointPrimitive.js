import BaseRegularPrimitive from "./BaseRegularPrimitive";
import RegularPointElementInstance from "../ElementInstance/RegularPointElementInstance";

/**
 * @class module:3DPlot.RegularPointPrimitive
 * @description 标绘图元（规则点）基类
 * @author 基础平台-杨琨
 *
 * @param options - {Object} 初始化参数
 */
class RegularPointPrimitive extends BaseRegularPrimitive {
    constructor(options) {
        super(options);
        this._modelMatrix = Cesium.Matrix4.clone(Cesium.Matrix4.IDENTITY);
        // 平移刷新
        this._isTranslate = false;
    }

    set modelMatrix(modalMatrix) {
        this._modelMatrix = modalMatrix
    }

    get modelMatrix() {
        return this._modelMatrix;
    }

    set selected(selected) {
        this._selected = selected;
        this._update = true;
        this._isTranslate = false
    }
    
     fromGeoJSON(geoJson, isLoadElement = true){
        super.fromGeoJSON(geoJson,isLoadElement)
        this._isTranslate = false;
     }

    /**
     * @description 重写父类的_elemPropsUpdateHandler方法
     * @private
     *
     * @param {Object} event 事件对象
     */
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

    /**
     * @description 重写父类的update方法
     * @function module:3DPlot.RegularPointPrimitive.update
     * @public
     *
     * @param {Boolean} frameState 是否更新
     */
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

            if (this._primitives && this._primitives.length > 0 && this._isTranslate) {
                this._primitives.forEach((primitive) => {
                    primitive.modelMatrix = this._modelMatrix;
                })
                this._isTranslate = false;
                this.updatePrimitive(frameState);
            } else {
                // 设置缩放参数
                let that = this;
                const scale = this.getGlobelScale();
                this._elem.changeAttributeStatus(true, scale, scale);
                this._isTranslate = false;

                this._createGeomInstance(function (geomInstances) {
                    that.applySelectStatus(geomInstances);
                    that.instancesToPrimitives(geomInstances);
                    that.updatePrimitive(frameState);
                });
            }
        } else {
            this.updatePrimitive(frameState);
        }
    }

    isDestroyed() {
        return false;
    }

    /**
     * @description 重写父类的_createGeomInstance方法
     * @private
     *
     * @param {function} callback 回调函数
     */
    _createGeomInstance(callback) {
        this._elementInstance(function (instances) {
            callback(instances);
        });
    }

    /**
     * @description 重写父类的_elementInstancee方法
     * @private
     *
     * @param {function} callback 回调函数
     */
    _elementInstance(callback) {
        new RegularPointElementInstance(
            this._elem,
            Object.assign(this.getBaseSaveAttributesValues(),{globelScale: this.getGlobelScale()})
        ).getInstance(function (instances) {
            callback(instances);
        });
    }

    /**
     * @description 重写父类的initBaseSaveAttributes方法
     * @function module:3DPlot.RegularPointPrimitive.initBaseSaveAttributes
     * @public
     */
    initBaseSaveAttributes() {
        this.dimModHeight = 0;
        this.dimModAttitude = "1";
    }

    /**
     * @description 重写父类的getPrimitiveBaseSaveAttributes方法
     * @function module:3DPlot.RegularPointPrimitive.getPrimitiveBaseSaveAttributes
     * @public
     *
     * @return {Array} Attributes 属性字段数组
     */
    getPrimitiveBaseSaveAttributes() {
        return RegularPointPrimitive.extendPrimitiveAttributes.concat([]);
    }

    /**
     * @description 重写父类的instancesToPrimitives方法
     * @function module:3DPlot.RegularPointPrimitive.instancesToPrimitives
     * @public
     * @param {Array} instances 几何实例数组
     */
    instancesToPrimitives(instances) {
        if (instances && instances.length > 0) {
            this.destroy()
            this._primitives = instances.map((instance) => {
                const primitive = new Cesium.Primitive({
                    geometryInstances: instance,
                    modelMatrix: this._modelMatrix,
                    appearance: new Cesium.PerInstanceColorAppearance({
                        translucent: this._translucent || this.isTranslucentInstance(instance),
                        noAlpha: true
                    }),
                    asynchronous: false,
                });
                primitive.pickedPrimitive = this;
                return primitive;
            });
        }
    }
}

RegularPointPrimitive.extendPrimitiveAttributes = ["dimModHeight", "dimModAttitude"];

export default RegularPointPrimitive;