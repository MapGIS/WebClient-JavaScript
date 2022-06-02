import {getCenter, getCenterByCartesian} from "../Utils/PlotUtil"

/**
 * @class module:3DPlot.BasePlotPrimitive
 * @description 标绘图元基类
 * @author 基础平台-杨琨
 *
 * @param options - {Object} 初始化参数
 * @param {Object} [options.element] SVG符号对象
 */
class BasePlotPrimitive {
    constructor(options) {
        Cesium.Check.defined('options', options);
        Cesium.Check.defined('options.element', options.element);

        this._primitive = undefined;
        this._primitives = [];
        this._update = true;
        this._translucent = false;
        // 缩放
        this.m_scale = 20;
        this._modHeight = 500;

        this._elem = options.element;

        // 转存属性
        this.initBaseSaveAttributes();
        // 初始化一次
        const scale = this.getGlobelScale();
        this._elem.changeAttributeStatus(true, scale, scale);

        this._positions = [];

        const {positions} = this._elem;
        for (let i = 0; i < positions.length; i += 1) {
            const tempPos = this._elem.positions[i];
            this._positions.push(Cesium.Cartesian3.fromDegrees(tempPos.x, tempPos.y));
        }

        if (positions.length < 1) this._update = false;
        this._elem.propsUpdateSignal.add(this._elemPropsUpdateHandler, this);

        this.extendPrimitiveAttributes = ['dimModHeight'];
    }

    /**
     * @description 二三维联动处理方法
     * @private
     */
    _elemPropsUpdateHandler(event) {
        if (event.type === 'positions') {
            let {_positionBillboards,_shapeBillboards} = this;
            const positions = event.value;

            if(_positionBillboards && _shapeBillboards){
                let prevCenter = getCenterByCartesian(this._positions);
                let center = getCenter(positions);
                let cartographicStart = Cesium.Cartographic.fromDegrees(prevCenter.geometry.coordinates[0], prevCenter.geometry.coordinates[1], 0);
                let cartographicEnd = Cesium.Cartographic.fromDegrees(center.geometry.coordinates[0], center.geometry.coordinates[1], 0);
                let offsetLng = Cesium.Math.toDegrees(cartographicEnd.longitude - cartographicStart.longitude);
                let offsetLat = Cesium.Math.toDegrees(cartographicEnd.latitude - cartographicStart.latitude);
                //更新位置点坐标
                let _positionBillboard = _positionBillboards.get(0);
                let _positionBillboardCart = Cesium.Cartographic.fromCartesian(_positionBillboard.position);
                let positionPoint = Cesium.Cartesian3.fromDegrees(center.geometry.coordinates[0], center.geometry.coordinates[1], _positionBillboardCart.height);
                _positionBillboard.position = positionPoint;
                //更新控制点坐标
                //平移图元和形状控制点
                for (let i = 0; i < positions.length; i++) {
                    let shapePoint = _shapeBillboards.get(i);
                    if(shapePoint._isEdit === false){
                        let shapePointCart = Cesium.Cartographic.fromCartesian(shapePoint.position);
                        shapePoint.position = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(shapePointCart.longitude) + offsetLng, Cesium.Math.toDegrees(shapePointCart.latitude) + offsetLat, 600);
                    }
                }
            }

            this._positions = [];

            for (let i = 0; i < positions.length; i += 1) {
                const tempPos = this._elem.positions[i];
                this._positions.push(Cesium.Cartesian3.fromDegrees(tempPos.x, tempPos.y));
            }
        }

        this._update = true;
    }

    set positions(positions) {
        this._elem.positions = positions;
    }

    get positions() {
        return this._elem.positions;
    }

    set selected(selected) {
        this._selected = selected;
        this._update = true;
    }

    /**
     * @description 修改调整的scale比例
     * @function module:3DPlot.BasePlotPrimitive.setAdjustScale
     * @public
     *
     * @param {Number} number 比例值
     */
    setAdjustScale(number) {
        this._elem.setAdjustScale(number);
        this._update = true;
    }

    getElement() {
        return this._elem;
    }

    /**
     * @description 标绘图元更新方法，有这个方法，则被cesium视为一个primitive
     * @function module:3DPlot.BasePlotPrimitive.update
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
            const geomInstances = this._createGeomInstance();
            this._translucent = false;
            if (this._selected) {
                for (let i = 0; i < geomInstances.length; i += 1) {
                    geomInstances[i].attributes.color.value[3] = 255 * 0.4;
                }
                this._translucent = true;
            }
            this._primitive = new Cesium.Primitive({
                geometryInstances: geomInstances,
                appearance: new Cesium.PerInstanceColorAppearance({
                    translucent: this._translucent
                }),
                asynchronous: false
            });
            this._primitive.pickedPrimitive = this;
        }

        this._primitive && this._primitive.update(frameState);
    }

    /**
     * @description 生成cesium的geometry对象方法
     * @private
     * */
    _createGeomInstance() {
        return [];
    }

    isDestroyed() {
        return false;
    }

    destroy() {
        if (this._primitive) {
            this._primitive.destroy();
            this._primitive.pickedPrimitive = null;
            this._primitive = undefined;
        }
        this._primitives.forEach((s) => {
            if (s) {
                s.destroy();
                s.pickedPrimitive = null;
            }
        });
        return Cesium.destroyObject(this);
    }

    getGlobelScale() {
        return this.m_scale * this._elem.getAdjustScale();
    }

    /**
     * @description: 导出JSON数据
     * @function module:3DPlot.BasePlotPrimitive.toGeoJSON
     * @public
     *
     * @return {Object} json 导出的数据
     */
    toGeoJSON() {
        const json = this._elem.toGeoJSON();
        const saveBaseObject = {};
        json.properties.domModAttributes = saveBaseObject;

        const baseAttrNames = this.getPrimitiveBaseSaveAttributes();
        baseAttrNames.forEach((t) => {
            saveBaseObject[t] = this[t];
        });
        return json;
    }

    /**
     * @description: 修改属性
     * @function module:3DPlot.BasePlotPrimitive.setValue
     * @public
     *
     * @param {String} key 属性名
     * @param {Any} value 属性值
     * @param {String} ids 要修改的部件id，多个id以逗号分隔
     * @param {Boolean} isWaitRender 是否更新
     */
    setValue(key, value, ids, isWaitRender = true) {
        const baseAttrNames = this.getPrimitiveBaseSaveAttributes();
        if (baseAttrNames.indexOf(key) > -1) {
            this[key] = value;
        } else {
            this._elem.setNodeAttr(key, value, ids);
        }
        if (isWaitRender) {
            this._update = true;
        }
    }

    /**
     * @description: 从json导入数据
     * @function module:3DPlot.BasePlotPrimitive.fromGeoJSON
     * @public
     *
     * @param {Object} geoJson 要导入的数据
     * @param {Boolean} isLoadElement 是否更新符号
     */
    fromGeoJSON(geoJson, isLoadElement = true) {
        if (geoJson.type === 'Feature') {
            // 控制点
            if (this._elem && isLoadElement) {
                this._elem.fromGeoJSON(geoJson);
                this.positions = this._elem.positions;
            }

            const domModValue = geoJson.properties.domModAttributes;

            if (domModValue) {
                const baseAttrNames = this.getPrimitiveBaseSaveAttributes();
                baseAttrNames.forEach((t) => {
                    this[t] = domModValue[t];
                });
            }
        } else {
            // eslint-disable-next-line no-new
            new Error('GeoJSON类型错误!');
        }
    }

    /**
     * @description: 初始化保存属性（必须和extend扩展数组对应）
     * @function module:3DPlot.BasePlotPrimitive.initBaseSaveAttributes
     * @public
     */
    initBaseSaveAttributes() {
        this.dimModHeight = this._modHeight;
    }

    /**
     * @description: 获取需要保存的字段数组
     * @function module:3DPlot.BasePlotPrimitive.initBaseSaveAttributes
     * @public
     *
     * @return {Array} Attributes 字段数组
     */
    getPrimitiveBaseSaveAttributes() {
        return BasePlotPrimitive.extendPrimitiveAttributes.concat([]);
    }

    /**
     * @description: 获取需要保存的属性组对象
     * @function module:3DPlot.BasePlotPrimitive.getBaseSaveAttributesValues
     * @public
     *
     * @return {Object} v 属性组对象
     */
    getBaseSaveAttributesValues() {
        const attrs = this.getPrimitiveBaseSaveAttributes();
        const v = {};
        attrs.forEach((s) => {
            v[s] = this[s];
        });
        return v;
    }

    /**
     * @description: 检验是否需要开启透明度渲染
     * @function module:3DPlot.BasePlotPrimitive.isTranslucentInstance
     * @public
     *
     * @param {Array} geomInstance 几何实例数组
     * @return {Boolean} 是否需要开启透明度渲染
     */
    isTranslucentInstance(geomInstance) {
        if (geomInstance.attributes.color.value[3] !== 255) {
            return true;
        }
        return false;
    }

    /**
     * @description: 实体转换
     * @function module:3DPlot.BasePlotPrimitive.instancesToPrimitives
     * @public
     *
     * @param {Array} instances 几何实例数组
     */
    instancesToPrimitives(instances) {
        if (instances) {
            this.destroy();
            this._primitives = instances.map((instance) => {
                const primitive = new Cesium.Primitive({
                    geometryInstances: instance,
                    appearance: new Cesium.PerInstanceColorAppearance({
                        translucent: this._translucent || this.isTranslucentInstance(instance)
                    }),
                    asynchronous: false
                });
                primitive.pickedPrimitive = this;
                return primitive;
            });
        }
    }

    /**
     * @description: 墙实体转换
     * @function module:3DPlot.BasePlotPrimitive.wallInstancesToPrimitive
     * @public
     *
     * @param {Array} wallInstances 墙的几何实例数组
     */
    wallInstancesToPrimitive(wallInstances) {
        if (this._wallPrimitive) {
            this._wallPrimitive.destroy();
        }
        this._wallPrimitive = undefined;
        let appearance;
        const isWallGradColor = this.isWallGradColor;
        const WallGradColor = this.wallGradColor;
        const wallColor = this.wallColor;
        if (isWallGradColor && WallGradColor) {
            appearance = new Cesium.MaterialAppearance({
                material: new Cesium.Material({
                    fabric: {
                        type: 'Image',
                        uniforms: {
                            image: this.getColorRamp([0.0, 1], [wallColor, WallGradColor], true),
                            repeat: {x: 1, y: 1}
                        }
                    }
                })
            });
        } else {
            appearance = new Cesium.PerInstanceColorAppearance({
                translucent: true
            });
        }

        if (!wallInstances) return;

        this._wallPrimitive = new Cesium.Primitive({
            geometryInstances: wallInstances,
            appearance: appearance,
            asynchronous: false
        });
    }

    /**
     * @description: 更新实体状态
     * @function module:3DPlot.BasePlotPrimitive.updatePrimitive
     * @public
     *
     * @param {Boolean} flag 是否更新
     */
    updatePrimitive(flag) {
        if (this._primitives && this._primitives.length > 0) {
            this._primitives.forEach((primitive) => {
                primitive.update(flag);
            });
        }
        this._wallPrimitive && this._wallPrimitive.update(flag);
    }

    /**
     * @description: 作用选中后透明度效果
     * @function @function module:3DPlot.BasePlotPrimitive.applySelectStatus
     * @public
     *
     * @param {Array} geomInstances 几何实例数组
     */
    applySelectStatus(geomInstances) {
        if (this._selected) {
            for (let i = 0; i < geomInstances.length; i += 1) {
                const colorA = geomInstances[i].attributes.color.value[3] * 0.4;
                geomInstances[i].attributes.color.value[3] = colorA;
            }
            this._translucent = true;
        }
    }

    /**
     * @description: 获取渐变材料的canvas
     * @function @function module:3DPlot.BasePlotPrimitive.getColorRamp
     * @public
     *
     * @param {Array} elevationRamp 渐变范围
     * @param {Array} colorArr 渐变颜色数组
     * @param {Boolean} isVertical 排列方式，横向或竖向
     * @return {Object} ramp 渐变材料的canvas对象
     */
    getColorRamp(elevationRamp, colorArr, isVertical = true) {
        var ramp = document.createElement('canvas');
        ramp.width = isVertical ? 1 : 100;
        ramp.height = isVertical ? 100 : 1;
        var ctx = ramp.getContext('2d');

        var values = elevationRamp;
        var grd = isVertical ? ctx.createLinearGradient(0, 0, 0, 100) : ctx.createLinearGradient(0, 0, 100, 0);
        grd.addColorStop(values[0], colorArr[0]);
        grd.addColorStop(values[1], colorArr[1]);

        ctx.fillStyle = grd;
        if (isVertical) ctx.fillRect(0, 0, 1, 100);
        else ctx.fillRect(0, 0, 100, 1);
        return ramp;
    }

    /**
     * @description: 设置标绘图元样式，必须通过此方法设置，修改样式的属性无效
     * @function @function module:3DPlot.BasePlotPrimitive.setStyle
     * @public
     *
     * @param key {String} 样式名
     * @param value {Any} 样式值
     * @param value {Any} 样式值
     * @param nodeIds {String} 图元部件ID字符串，可传入多个id，以逗号分隔，当id有多个时，可统一修改多个部件的样式，
     * 若找不到id则不做改变
     */
    setStyle(key, value, nodeIds) {
        this.setValue(key, value, nodeIds);
    }

    /**
     * @description: 获取标绘图元样式
     * @function @function module:3DPlot.BasePlotPrimitive.getStyle
     * @public
     *
     * @return {Object} style 图元样式
     */
    getStyle() {
        return this._elem.getStyleJSON();
    }
}

export default BasePlotPrimitive;
