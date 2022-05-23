/*
 * @Author: your name
 * @Date: 2021-10-27 18:46:20
 * @LastEditTime: 2022-05-23 16:36:41
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\BasePlotPrimitive.js
 */
/**
 * 标绘primitive基类
 * @property positions 坐标信息
 * @property show 是否显示
 */

export default class BasePlotPrimitive {
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

        const { positions } = this._elem;
        for (let i = 0; i < positions.length; i += 1) {
            const tempPos = this._elem.positions[i];
            this._positions.push(Cesium.Cartesian3.fromDegrees(tempPos.x, tempPos.y));
        }

        if (positions.length < 1) this._update = false;
        this._elem.propsUpdateSignal.add(this._elemPropsUpdateHandler, this);

        this.extendPrimitiveAttributes = ['dimModHeight'];
    }

    _elemPropsUpdateHandler(event) {
        if (event.type === 'positions') {
            this._positions = [];
            const positions = event.value;
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
     * @description: 修改调整的scale比例
     * @param {*} number
     * @return {*}
     */
    setAdjustScale(number) {
        this._elem.setAdjustScale(number);
        this._update = true;
    }

    getElement() {
        return this._elem;
    }

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
     * @description: object to geojson
     * @param {*}
     * @return {*}
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
     * @param {*} key
     * @param {*} value
     * @param {*} ids
     * @param {*} isWaitRender
     * @return {*}
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
     * @description: geojson to object
     * @param {*} geoJson
     * @param {*} isLoadElement
     * @return {*}
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
     * @param {*}
     * @return {*}
     */
    initBaseSaveAttributes() {
        this.dimModHeight = this._modHeight;
    }

    /**
     * @description: 获取需要保存的字段数组
     * @param {*}
     * @return {*}
     */
    getPrimitiveBaseSaveAttributes() {
        return BasePlotPrimitive.extendPrimitiveAttributes.concat([]);
    }

    /**
     * @description: 获取需要保存的属性组对象
     * @param {*}
     * @return {*}
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
     * @param {*} geomInstances
     * @return {*}
     */
    isTranslucentInstance(geomInstance) {
        if (geomInstance.attributes.color.value[3] !== 255) {
            return true;
        }
        return false;
    }

    /**
     * @description: 实体转换
     * @param {*} instances
     * @return {*}
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
     * @param {*} wallInstances
     * @return {*}
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
                            repeat: { x: 1, y: 1 }
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
     * @param {*} flag
     * @return {*}
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
     * @param {*} geomInstances
     * @return {*}
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
     * @param {*} elevationRamp
     * @param {*} colorArr
     * @param {*} isVertical
     * @return {*}
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
}
