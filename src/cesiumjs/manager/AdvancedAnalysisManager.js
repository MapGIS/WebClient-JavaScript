import { CesiumZondy } from '../core/Base';

function computeModelMatrix(entity, time) {
    const position = Cesium.Property.getValueOrUndefined(entity.position, time, new Cesium.Cartesian3());
    if (!Cesium.defined(position)) {
        return undefined;
    }
    const orientation = Cesium.Property.getValueOrUndefined(entity.orientation, time, new Cesium.Quaternion());
    let modelMatrix;
    if (!Cesium.defined(orientation)) {
        modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position, undefined, new Cesium.Matrix4());
    } else {
        modelMatrix = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(orientation, new Cesium.Matrix3()), position, new Cesium.Matrix4());
    }
    return modelMatrix;
}

function computeEmitterModelMatrix() {
    const hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, new Cesium.HeadingPitchRoll());
    const trs = new Cesium.TranslationRotationScale();
    trs.translation = Cesium.Cartesian3.fromElements(3.0, 3.0, 1.0, new Cesium.Cartesian3());
    trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, new Cesium.Quaternion());
    return Cesium.Matrix4.fromTranslationRotationScale(trs, new Cesium.Matrix4());
}

/**
 * @author 三维基础平台研发中心·周凌风
 * @class module:客户端可视化分析.AdvancedAnalysisManager
 * @classdesc 高级分析功能管理类
 * @description 高级分析功能的创建与移除
 * @param {Object} options 高级分析功能管理类构造参数
 * @param {Object} options.viewer 视图
 */
export default class AdvancedAnalysisManager {
    constructor(option) {
        this._viewer = Cesium.defaultValue(option.viewer, undefined);
        this._scene = this._viewer.scene;
    }

    /**
     * 视图
     * @memberof AdvancedAnalysisManager.prototype
     * @type {Viewer}
     * @readonly
     */
    get viewer() {
        return this._viewer;
    }

    /**
     * 场景
     * @memberof AdvancedAnalysisManager.prototype
     * @readonly
     * @type {Scene}
     */
    get scene() {
        return this._scene;
    }

    /**
     * 创建动画漫游实例
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createAnimation
     * @param {Object} optionsParam 动画漫游参数
     * @param {Number} [optionsParam.exHeight] 附加高程
     * @param {Boolean} [optionsParam.isLoop] 是否循环
     * @param {Object} optionsParam.modelUrl 模型url
     * @param {Function} [optionsParam.callback] 完成动漫漫游后的回调函数
     * @returns {Object} animation 返回动画漫游实例
     */
    createAnimation(optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const animation = new Cesium.AnimationAnalyse(this.viewer, {
            exHeight: Cesium.defaultValue(options.exHeight, 0.8),
            isLoop: Cesium.defaultValue(options.isLoop, false),
            modelUrl: options.modelUrl,
            complete: Cesium.defaultValue(options.callback, () => {})
        });
        return animation;
    }

    /**
     * 创建填挖方实例
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createCutFill
     * @param {Number} dataType 针对地形进行填挖方分析
     * @example
     * dataType=0.0 : 地形
     * @param {Object} optionsParam 填挖方参数
     * @param {Number} optionsParam.xPaneNum x方向采样点个数
     * @param {Number} optionsParam.yPaneNum y方向采样点个数
     * @param {Number} optionsParam.Height   设定的填挖规整高度
     * @param {callback} optionsParam.callback 返回结果的回调函数
     * @returns {Object} cutFill 返回填挖方实例
     */
    createCutFill(dataType, optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const { viewer } = this;
        const cutFill = new Cesium.CutFillAnalyzeC(viewer, {
            callBack: options.callback
        });
        cutFill.xPaneNum = options.xPaneNum;
        cutFill.yPaneNum = options.yPaneNum;
        cutFill.Height = options.Height;
        cutFill.dataType = Cesium.defaultValue(dataType, 0.0);
        return cutFill;
    }

    /**
     * 开始执行填挖方分析
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.startCutFill
     * @param {Object} cutFill 填挖方实例，使用createCutFill返回的实例
     * @param {Array} positions 填挖区域多边形的顶点数组
     */
    startCutFill(cutFill, positions) {
        const cutfillObject = cutFill;
        cutfillObject._pointsPolygon = positions;
        const minMax = cutfillObject.getMinAndMaxCartesian();
        cutfillObject.start(minMax);
        this.scene.requestRender();
    }

    /**
     * 创建洪水分析实例
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createFlood
     * @param {Object} optionsParam 洪水分析参数
     * @param {Number} [optionsParam.minHeight] 最低洪水水位高度
     * @param {Number} [optionsParam.maxHeight] 最高洪水水位高度
     * @param {Number} [optionsParam.floodSpeed] 洪水上涨速度
     * @returns {Object} flood 返回洪水实例
     */
    createFlood(optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const flood = new Cesium.FloodAnalysis(this.scene);
        flood.minHeight = Cesium.defaultValue(options.minHeight, 0);
        flood.maxHeight = Cesium.defaultValue(options.maxHeight, 100);
        flood.floodSpeed = Cesium.defaultValue(options.floodSpeed, 20);
        return flood;
    }

    /**
     * 创建动态航班实例
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createPlague
     * @param {Object} posStart 轨迹线起点
     * @param {Array} posEnds 轨迹线终点
     * @param {Object} optionsParam 动态航班参数
     * @param {Boolean} [optionsParam.isAdd] 是否已添加航班线
     * @returns {Object} plague 返回动态航班实例
     */
    createPlague(posStart, posEnds, optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        let plague;
        if (posStart !== undefined && posEnds !== undefined) {
            plague = new Cesium.Plague(this.viewer, {
                center: posStart,
                cities: posEnds,
                isAdd: Cesium.defaultValue(options.isAdd, false)
            });
            plague.setVisible('add');
        } else {
            return undefined;
        }
        return plague;
    }

    /**
     * 模型压平
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createModelFlatten
     * @param {Object} tileset 图层信息
     * @param {Object} optionsParam 模型压平参数
     * @param {Boolean} optionsParam.isFlatten 是否执行模型压平
     * @param {Number} optionsParam.height 压平到指定高度
     * @param {Number} optionsParam.arrayLength 压平区域顶点数组长度
     * @param {Array} optionsParam.array 压平区域顶点数组
     * @returns {Object} tileset 返回图层信息
     */
    createModelFlatten(tileset, optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const tilesetObject = tileset;
        tilesetObject.u_isFlatten = Cesium.defaultValue(options.isFlatten, true);
        tilesetObject.u_height = Cesium.defaultValue(options.height, 0.0);
        tilesetObject.u_arrayLength = Cesium.defaultValue(options.arrayLength, 0.0);
        tilesetObject.u_positionArray = Cesium.defaultValue(options.array, []);
        this.scene.requestRender();
        return tilesetObject;
    }

    /**
     * 场景投放
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createSceneProjector
     * @param {Number} type 场景投放的类型
     * @example type取值及含义
     * type = 0 : 颜色COLOR
     * type = 1 : 图片IMAGE
     * type = 2 : 视频VIDEO
     * type = 3 : RTMP视频流
     * @returns 返回场景投放实例
     */
    createSceneProjector(type) {
        let proType = Cesium.SceneProjectorType.COLOR;
        switch (type) {
            case 0: {
                proType = Cesium.SceneProjectorType.COLOR;
                break;
            }
            case 1: {
                proType = Cesium.SceneProjectorType.IMAGE;
                break;
            }
            case 2: {
                proType = Cesium.SceneProjectorType.VIDEO;
                break;
            }
            case 3: {
                proType = Cesium.SceneProjectorType.RTMP;
                break;
            }
            default:
                proType = Cesium.SceneProjectorType.COLOR;
                break;
        }
        const scenePro = new Cesium.SceneProjector(proType);
        const manager = this.scene.VisualAnalysisManager;
        manager.add(scenePro);
        return scenePro;
    }

    /**
     * 开始场景投放
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.startSceneProjector
     * @param {Object} scenePro 场景投放实例
     * @param {Cartesian3} cartesian 场景投放起始点
     * @param {String} url 投放类型url，投放颜色时传入颜色。
     */
    startSceneProjector(scenePro, cartesian, url) {
        const sceneProjector = scenePro;
        if (cartesian !== undefined) {
            sceneProjector.viewPosition = cartesian;
            sceneProjector.textureSource = url;
        }
        this.scene.requestRender();
    }

    /**
     * 完成场景投放
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.endSceneProjector
     * @param {Object} scenePro 场景投放实例
     * @param {Cartesian3} cartesian 场景投放结束点
     */
    endSceneProjector(scenePro, cartesian) {
        const sceneProjector = scenePro;
        if (cartesian !== undefined) {
            sceneProjector.targetPosition = cartesian;
        }
        this.scene.requestRender();
    }

    /**
     * 移除场景投放
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.removeSceneProjector
     */
    removeSceneProjector() {
        const manager = this.scene.VisualAnalysisManager;
        manager.removeAll();
    }

    /**
     * 创建天际线实例
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createSkyLine
     * @returns {Object} skyLineAn 返回天际线实例
     */
    createSkyLine() {
        const manager = this.scene.VisualAnalysisManager;
        const skyLineAn = new Cesium.SkyLineAnalysis({
            scene: this.scene,
            analysisEndCallBack() {}
        });
        manager.add(skyLineAn);
        return skyLineAn;
    }

    /**
     * 创建可视域实例
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createViewshedAnalysis
     * @returns {Object} viewshedAnalysis 返回可视域实例
     */
    createViewshedAnalysis() {
        const manager = this.scene.VisualAnalysisManager;
        const viewshedAnalysis = new Cesium.ViewshedAnalysis();
        manager.add(viewshedAnalysis);
        return viewshedAnalysis;
    }

    /**
     * 创建通视实例
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createVisibilityAnalysis
     * @returns {Object} visibilityAnalysis 返回通视实例
     */
    createVisibilityAnalysis() {
        const manager = this.scene.VisualAnalysisManager;
        const visibilityAnalysis = new Cesium.VisiblityAnalysis();
        manager.add(visibilityAnalysis);
        return visibilityAnalysis;
    }

    /**
     * 创建限高分析实例
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createHeightLimited
     * @param {Number} height 限高高度
     * @param {Matrix4} transform 数据矩阵
     * @example tileset.root.transform
     * @param {Array} posArray 执行限高分析边界，坐标为模型坐标点，点个数大于2
     * @param {Object} optionsParam 限高分析参数
     * @param {Color} [optionsParam.limitedColor] 限高区域颜色
     * @param {Number} [optionsParam.blendTransparency] 限高颜色混合比例0-1
     * @returns {Object} heightLimited 限高分析实例
     * @example 使用方法
     * 添加：globe.addSceneEffect(heightLimited)
     * 移除：globe.removeSceneEffect(heightLimited)
     */
    createHeightLimited(height, transform, posArray, optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const heightLimited = new Cesium.HeightLimited(this.viewer, {
            height: Cesium.defaultValue(height, 0),
            transform,
            posArray,
            limitedColor: Cesium.defaultValue(options.limitedColor, new Cesium.Color(1, 0, 0, 0.5)),
            blendTransparency: Cesium.defaultValue(options.blendTransparency, 0.8)
        });
        return heightLimited;
    }

    /**
     * 坡向分析
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createAspectAnalysis
     * @param {Array<Color>} color 坡度分层颜色信息，分6层
     * @returns {Object} aspect 返回坡向分析实例
     */
    createAspectAnalysis(color) {
        const manager = this.scene.VisualAnalysisManager;
        const aspect = new Cesium.AspectAnalysis(this.viewer, {
            colors: color
        });
        manager.add(aspect);
        aspect.start();
        return aspect;
    }

    /**
     * 坡度分析
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createSlopeAnalysis
     * @param {Array<Color>} color 坡度分层颜色信息，分6层
     * @returns {Object} slope 返回坡度分析实例
     */
    createSlopeAnalysis(color) {
        const manager = this.scene.VisualAnalysisManager;
        const slope = new Cesium.SlopeAnalysis(this.viewer, {
            colors: color
        });
        manager.add(slope);
        slope.start();
        return slope;
    }

    /**
     * 雷达
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createRadarScan
     * @param {Cartesian3} center 雷达中心点
     * @param {Number} radius 扫描半径
     * @param {Color} scanColor 扫描区域颜色
     * @param {Number} duration 周期时间,单位毫秒
     * @returns {Object} radar 雷达扫描实例
     * @example 使用方法
     * 添加：globe.addSceneEffect(radar)
     * 移除：globe.removeSceneEffect(radar)
     */
    createRadarScan(center, radius, scanColor, duration) {
        const radar = new Cesium.RadarScanEffect(this.viewer, {
            center: Cesium.defaultValue(center, Cesium.Cartesian3.fromDegrees(0, 0, 0)),
            radius: Cesium.defaultValue(radius, 50),
            scanColor: Cesium.defaultValue(scanColor, new Cesium.Color(1, 0, 0, 1)),
            duration: Cesium.defaultValue(duration, 8000)
        });
        return radar;
    }

    /**
     * 创建下雨特效
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createRain
     * @param {Object} options 下雨特效参数
     * @param {Number} [options.hueShift] 色调
     * @param {Number} [options.saturationShift] 饱和度
     * @param {Number} [options.brightnessShift] 亮度
     * @param {Number} [options.density] 密度
     * @param {Number} [options.minimumBrightness] 最小亮度
     * @returns {Object} rain 返回下雨特效实例
     */
    createRain(options) {
        const collection = this.viewer.scene.postProcessStages;
        const rain = Cesium.PostProcessStageLibrary.createRainStage();
        collection.add(rain);
        this.scene.skyAtmosphere.hueShift = Cesium.defaultValue(options.hueShift, -0.8);
        this.scene.skyAtmosphere.saturationShift = Cesium.defaultValue(options.saturationShift, -0.7);
        this.scene.skyAtmosphere.brightnessShift = Cesium.defaultValue(options.brightnessShift, -0.33);
        this.scene.fog.density = Cesium.defaultValue(options.density, 0.001);
        this.scene.fog.minimumBrightness = Cesium.defaultValue(options.minimumBrightness, 0.8);
        return rain;
    }

    /**
     * 创建下雪特效
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createSnow
     * @param {Object} options 下雪特效参数
     * @param {Number} [options.hueShift] 色调
     * @param {Number} [options.saturationShift] 饱和度
     * @param {Number} [options.brightnessShift] 亮度
     * @param {Number} [options.density] 密度
     * @param {Number} [options.minimumBrightness] 最小亮度
     * @returns {Object} snow 返回下雪特效实例
     */
    createSnow(options) {
        const collection = this.viewer.scene.postProcessStages;
        const snow = Cesium.PostProcessStageLibrary.createSnowStage();
        collection.add(snow);
        this.scene.skyAtmosphere.hueShift = Cesium.defaultValue(options.hueShift, -0.8);
        this.scene.skyAtmosphere.saturationShift = Cesium.defaultValue(options.saturationShift, -0.7);
        this.scene.skyAtmosphere.brightnessShift = Cesium.defaultValue(options.brightnessShift, -0.33);
        this.scene.fog.density = Cesium.defaultValue(options.density, 0.001);
        this.scene.fog.minimumBrightness = Cesium.defaultValue(options.minimumBrightness, 0.8);
        return snow;
    }

    /**
     * 创建雾特效
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createFog
     * @param {Object} optionsParam 雾特效参数
     * @param {Number} [optionsParam.alpha] 雾特效透明度
     * @returns {Object} fog 返回雾特效实例
     */
    createFog(optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const collection = this.viewer.scene.postProcessStages;
        const fog = Cesium.PostProcessStageLibrary.createFogStage(Cesium.defaultValue(options.alpha, 0.1));
        collection.add(fog);
        return fog;
    }

    /**
     * 烟雾粒子特效
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createParticle
     * @param {Object} optionsParam 烟雾粒子特效参数
     * @param {String} optionsParam.imageUrl 粒子url
     * @param {String} optionsParam.modelUrl 模型url
     * @param {Date} [optionsParam.startTime] 开始时间
     * @param {Number} [optionsParam.duration] 持续周期
     */
    createParticle(optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const particleSystem = new Cesium.ParticleC(this.viewer, {
            imageUrl: options.imageUrl,
            modelUrl: options.modelUrl,
            startTime: Cesium.defaultValue(options.startTime, new Date(2015, 2, 25, 16)),
            duration: Cesium.defaultValue(options.duration, 120)
        });

        return particleSystem;
    }

    /**
     * 火焰特效
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createFire
     * @param {String} modelUrl 模型url,可使用gltf格式模型
     * @param {Array} position 模型位置，position[0]：经度，position[1]：纬度，position[2]：高度
     * @param {String} imageUrl 火焰图片url
     * @param {Object} optionsParam 火焰特效参数
     * @param {Number} [optionsParam.minimumPixelSize] 模型最小像素尺寸
     * @param {Number} [optionsParam.startScale] 起始规模
     * @param {Number} [optionsParam.endScale] 终止规模
     * @param {Number} [optionsParam.particleLife] 粒子生命
     * @param {Number} [optionsParam.speed] 速度
     * @param {Cartesian2} [optionsParam.imageSize] 图像尺寸
     * @param {Number} [optionsParam.emissionRate] 排放率
     * @param {Number} [optionsParam.lifetime] 持续时间
     */
    createFire(modelUrl, position, imageUrl, optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const entity = this.viewer.entities.add({
            model: {
                uri: modelUrl,
                minimumPixelSize: Cesium.defaultValue(options.minimumPixelSize, 64)
            },
            position: Cesium.Cartesian3.fromDegrees(position[0], position[1], position[2])
        });
        this.viewer.trackedEntity = entity;
        this.scene.primitives.add(
            new Cesium.ParticleSystem({
                image: imageUrl,
                startScale: Cesium.defaultValue(options.startScale, 1.0),
                endScale: Cesium.defaultValue(options.endScale, 4.0),
                particleLife: Cesium.defaultValue(options.particleLife, 1.0),
                speed: Cesium.defaultValue(options.speed, 5.0),
                imageSize: Cesium.defaultValue(options.imageSize, new Cesium.Cartesian2(20, 20)),
                emissionRate: Cesium.defaultValue(options.emissionRate, 5.0),
                lifetime: Cesium.defaultValue(options.lifetime, 16.0),
                modelMatrix: computeModelMatrix(entity, Cesium.JulianDate.now()),
                emitterModelMatrix: computeEmitterModelMatrix()
            })
        );
    }
}

CesiumZondy.Manager.AdvancedAnalysisManager = AdvancedAnalysisManager;
