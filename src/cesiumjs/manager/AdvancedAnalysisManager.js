import { CesiumZondy } from '../core/Base';

/**
 * @author 三维基础平台研发中心·周凌风
 * @class AdvancedAnalysisManager
 * @classdesc 高级分析功能管理类
 * @description 高级分析功能的创建与移除
 */
export default class AdvancedAnalysisManager {
    constructor(option) {
        this._viewer = Cesium.defaultValue(option.viewer, undefined);
        this._scene = this._viewer.scene;
    }

    get viewer() {
        return this._viewer;
    }

    get scene() {
        return this._scene;
    }

    /**
     * 创建动画漫游实例
     * @param {Number} options.exHeight 附加高程
     * @param {Boolean} options.isLoop 是否循环
     * @param {object} options.modelUrl 模型url
     * @param {function} options.callback 完成动漫漫游后的回调函数
     * @returns {object} animation 返回动画漫游实例
     */
    createAnimation(options) {
        if (!Cesium.defined(options)) {
            options = {};
        }
        let animation = new Cesium.AnimationAnalyse(this.viewer, {
            exHeight: Cesium.defaultValue(options.exHeight, 0.8),
            isLoop: Cesium.defaultValue(options.isLoop, false),
            modelUrl: options.modelUrl,
            complete: Cesium.defaultValue(options.callback, function () {
                alert('完毕');
            })
        });
        return animation;
    }

    /**
     * 创建填挖方实例
     * @param {Number} dataType 针对地形进行填挖方分析
     * @example
     * dataType=0.0 : 地形
     * @param {Number} options.xPaneNum x方向采样点个数
     * @param {Number} options.yPaneNum y方向采样点个数
     * @param {Number} options.Height   设定的填挖规整高度
     * @param {callback} options.callback 返回结果的回调函数
     * @returns {object} cutFill 返回填挖方实例
     */
    createCutFill(dataType, options) {
        if (!Cesium.defined(options)) {
            options = {};
        }
        let viewer = this.viewer;
        let cutFill = new Cesium.CutFillAnalyzeC(viewer, {
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
     * @param {object} cutFill 填挖方实例，使用createCutFill返回的实例
     * @param {Array} positions 填挖区域多边形的顶点数组
     */
    startCutFill(cutFill, positions) {
        cutFill._pointsPolygon = positions;
        let minMax = cutFill.getMinAndMaxCartesian();
        cutFill.start(minMax);
    }

    /**
     * 创建洪水分析实例
     * @param {Number} options.minHeight 最低洪水水位高度
     * @param {Number} options.maxHeight 最高洪水水位高度
     * @param {Number} options.floodSpeed 洪水上涨速度
     * @returns {object} flood 返回洪水实例
     */
    createFlood(options) {
        if (!Cesium.defined(options)) {
            options = {};
        }
        let flood = new Cesium.FloodAnalysis(this.scene);
        flood.minHeight = Cesium.defaultValue(options.minHeight, 0);
        flood.maxHeight = Cesium.defaultValue(options.maxHeight, 100);
        flood.floodSpeed = Cesium.defaultValue(options.floodSpeed, 20);
        return flood;
    }

    /**
     * 创建动态航班实例
     * @param {object} posStart 轨迹线起点
     * @param {Array} posEnds 轨迹线终点
     * @param {Boolean} options.isAdd 是否已添加航班线
     * @returns {object} plague 返回动态航班实例
     */
    createPlague(posStart, posEnds, options) {
        if (!Cesium.defined(options)) {
            options = {};
        }
        let plague;
        if (posStart !== undefined && posEnds !== undefined) {
            plague = new Cesium.Plague(this.viewer, {
                center: posStart,
                cities: posEnds,
                isAdd: Cesium.defaultValue(options.isAdd, false)
            });
            plague.setVisible('add');
        } else {
            return;
        }
        return plague;
    }

    /**
     * 模型压平
     * @param {object} tileset 图层信息
     * @param {Boolean} options.isFlatten 是否执行模型压平
     * @param {Number} options.height 压平到指定高度
     * @param {Number} options.arrayLength 压平区域顶点数组长度
     * @param {Array} options.array 压平区域顶点数组
     * @returns {object} tileset 返回图层信息
     */
    createModelFlatten(tileset, options) {
        if (!Cesium.defined(options)) {
            options = {};
        }
        tileset.u_isFlatten = Cesium.defaultValue(options.isFlatten, true);
        tileset.u_height = Cesium.defaultValue(options.height, 0.0);
        tileset.u_arrayLength = Cesium.defaultValue(options.arrayLength, 0.0);
        tileset.u_positionArray = Cesium.defaultValue(options.array, []);
        return tileset;
    }

    /**
     * 场景投放
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
        }
        let scenePro = new Cesium.SceneProjector(proType);
        let manager = this.scene.VisualAnalysisManager;
        manager.add(scenePro);
        return scenePro;
    }

    /**
     * 开始场景投放
     * @param {object} scenePro 场景投放实例
     * @param {Cartesian3} cartesian 场景投放起始点
     * @param {String} url 投放类型url，投放颜色时传入颜色。
     */
    startSceneProjector(scenePro, cartesian, url) {
        if (cartesian != undefined) {
            scenePro.viewPosition = cartesian;
            scenePro.textureSource = url;
        }
        this.scene.requestRender();
    }

    /**
     * 完成场景投放
     * @param {object} scenePro 场景投放实例
     * @param {Cartesian3} cartesian 场景投放结束点
     */
    endSceneProjector(scenePro, cartesian) {
        if (cartesian != undefined) {
            scenePro.targetPosition = cartesian;
        }
    }

    /**
     * 移除场景投放
     */
    removeSceneProjector() {
        let manager = this.scene.VisualAnalysisManager;
        manager.removeAll();
    }

    /**
     * 创建天际线实例
     * @returns {object} skyLineAn 返回天际线实例
     */
    createSkyLine() {
        let manager = this.scene.VisualAnalysisManager;
        let skyLineAn = new Cesium.SkyLineAnalysis({
            scene: this.scene,
            analysisEndCallBack: function (pos3DList) {
                alert('分析完成');
            }
        });
        manager.add(skyLineAn);
        return skyLineAn;
    }

    /**
     * 创建可视域实例
     * @returns {object} viewshedAnalysis 返回可视域实例
     */
    createViewshedAnalysis() {
        let manager = this.scene.VisualAnalysisManager;
        let viewshedAnalysis = new Cesium.ViewshedAnalysis();
        manager.add(viewshedAnalysis);
        return viewshedAnalysis;
    }

    /**
     * 创建通视实例
     * @returns {object} visibilityAnalysis 返回通视实例
     */
    createVisibilityAnalysis() {
        let manager = this.scene.VisualAnalysisManager;
        let visibilityAnalysis = new Cesium.VisiblityAnalysis();
        manager.add(visibilityAnalysis);
        return visibilityAnalysis;
    }

    /**
     * 创建限高分析实例
     * @param {Number} height 限高高度
     * @param {Matrix4} transform 数据矩阵
     * @example tileset.root.transform
     * @param {Array} posArray 执行限高分析边界，坐标为模型坐标点，点个数大于2
     * @param {Color} options.limitedColor 限高区域颜色
     * @param {Number} options.限高颜色混合比例0-1
     * @returns {object} heightLimited 限高分析实例
     * @example 使用方法
     * 添加：globe.addSceneEffect(heightLimited)
     * 移除：globe.removeSceneEffect(heightLimited)
     */
    createHeightLimited(height, transform, posArray, options) {
        if (!Cesium.defined(options)) {
            options = {};
        }
        let heightLimited = new Cesium.HeightLimited(this.viewer, {
            height: Cesium.defaultValue(height, 0),
            transform: transform,
            posArray: posArray,
            limitedColor: Cesium.defaultValue(
                options.limitedColor,
                new Cesium.Color(1, 0, 0, 0.5)
            ),
            blendTransparency: Cesium.defaultValue(
                options.blendTransparency,
                0.8
            )
        });
        return heightLimited;
    }

    /**
     * 坡向分析
     * @param {Array<Color>} color 坡度分层颜色信息，分6层
     * @returns {object} aspect 返回坡向分析实例
     */
    createAspectAnalysis(color) {
        let manager = this.scene.VisualAnalysisManager;
        let aspect = new Cesium.AspectAnalysis(this.viewer, {
            colors: color
        });
        manager.add(aspect);
        aspect.start();
        return aspect;
    }

    /**
     * 坡度分析
     * @param {Array<Color>} color 坡度分层颜色信息，分6层
     * @returns {object} slope 返回坡度分析实例
     */
    createSlopeAnalysis(color) {
        let manager = this.scene.VisualAnalysisManager;
        let slope = new Cesium.SlopeAnalysis(this.viewer, {
            colors: color
        });
        manager.add(slope);
        slope.start();
        return slope;
    }

    /**
     * 雷达
     * @param {Cartesian3} center 雷达中心点
     * @param {Number} radius 扫描半径
     * @param {Color} scanColor 扫描区域颜色
     * @param {Number} duration 周期时间,单位毫秒
     * @returns {object} radar 雷达扫描实例
     * @example 使用方法
     * 添加：globe.addSceneEffect(radar)
     * 移除：globe.removeSceneEffect(radar)
     */
    createRadarScan(center, radius, scanColor, duration) {
        let radar = new Cesium.RadarScanEffect(this.viewer, {
            center: Cesium.defaultValue(
                center,
                Cesium.Cartesian3.fromDegrees(0, 0, 0)
            ),
            radius: Cesium.defaultValue(radius, 50),
            scanColor: Cesium.defaultValue(
                scanColor,
                new Cesium.Color(1, 0, 0, 1)
            ),
            duration: Cesium.defaultValue(duration, 8000)
        });
        return radar;
    }

    /**
     * 创建下雨特效
     * @param {Number} options.hueShift 色调
     * @param {Number} options.saturationShift 饱和度
     * @param {Number} options.brightnessShift 亮度
     * @param {Number} options.density 密度
     * @param {Number} options.minimumBrightness 最小亮度
     * @returns {object} rain 返回下雨特效实例
     */
    createRain(options) {
        let collection = this.viewer.scene.postProcessStages;
        let rain = Cesium.PostProcessStageLibrary.createRainStage();
        collection.add(rain);
        this.scene.skyAtmosphere.hueShift = Cesium.defaultValue(
            options.hueShift,
            -0.8
        );
        this.scene.skyAtmosphere.saturationShift = Cesium.defaultValue(
            options.saturationShift,
            -0.7
        );
        this.scene.skyAtmosphere.brightnessShift = Cesium.defaultValue(
            options.brightnessShift,
            -0.33
        );
        this.scene.fog.density = Cesium.defaultValue(options.density, 0.001);
        this.scene.fog.minimumBrightness = Cesium.defaultValue(
            options.minimumBrightness,
            0.8
        );
        return rain;
    }

    /**
     * 创建下雪特效
     * @param {Number} options.hueShift 色调
     * @param {Number} options.saturationShift 饱和度
     * @param {Number} options.brightnessShift 亮度
     * @param {Number} options.density 密度
     * @param {Number} options.minimumBrightness 最小亮度
     * @returns {object} snow 返回下雪特效实例
     */
    createSnow(options) {
        let collection = this.viewer.scene.postProcessStages;
        let snow = Cesium.PostProcessStageLibrary.createSnowStage();
        collection.add(snow);
        this.scene.skyAtmosphere.hueShift = Cesium.defaultValue(
            options.hueShift,
            -0.8
        );
        this.scene.skyAtmosphere.saturationShift = Cesium.defaultValue(
            options.saturationShift,
            -0.7
        );
        this.scene.skyAtmosphere.brightnessShift = Cesium.defaultValue(
            options.brightnessShift,
            -0.33
        );
        this.scene.fog.density = Cesium.defaultValue(options.density, 0.001);
        this.scene.fog.minimumBrightness = Cesium.defaultValue(
            options.minimumBrightness,
            0.8
        );
        return snow;
    }

    /**
     * 创建雾特效
     * @param {Number} options.alpha 雾特效透明度
     * @returns {object} fog 返回雾特效实例
     */
    createFog(options) {
        if (Cesium.defined(options)) {
            options = {};
        }
        let collection = this.viewer.scene.postProcessStages;
        let fog = Cesium.PostProcessStageLibrary.createFogStage(
            Cesium.defaultValue(options.alpha, 0.1)
        );
        collection.add(fog);
        return fog;
    }

    /**
     * 烟雾粒子特效
     */
    // createParticle() {
    //     let particle = '';

    //     return particle;
    // }

    /**
     * 火焰特效
     * @param {String} modelUrl 模型url
     * @example
     * fireExtinguisher.gltf 灭火器，gltf格式
     * @param {Array} position 模型位置，position[0]：经度，position[1]：纬度，position[2]：高度
     * @param {String} imageUrl 火焰图片url
     * @param {Number} options.minimumPixelSize 模型最小像素尺寸
     * @param {Number} options.startScale 起始规模
     * @param {Number} options.endScale 终止规模
     * @param {Number} options.particleLife 粒子生命
     * @param {Number} options.speed 速度
     * @param {Cartesian2} options.imageSize 图像尺寸
     * @param {Number} options.emissionRate 排放率
     * @param {Number} options.lifetime 持续时间
     */
    createFire(modelUrl, position, imageUrl, options) {
        if (!Cesium.defined(options)) {
            options = {};
        }
        let entity = this.viewer.entities.add({
            model: {
                uri: modelUrl,
                minimumPixelSize: Cesium.defaultValue(
                    options.minimumPixelSize,
                    64
                )
            },
            position: Cesium.Cartesian3.fromDegrees(
                position[0],
                position[1],
                position[2]
            )
        });
        this.viewer.trackedEntity = entity;
        this.scene.primitives.add(
            new Cesium.ParticleSystem({
                image: imageUrl,
                startScale: Cesium.defaultValue(options.startScale, 1.0),
                endScale: Cesium.defaultValue(options.endScale, 4.0),
                particleLife: Cesium.defaultValue(options.particleLife, 1.0),
                speed: Cesium.defaultValue(options.speed, 5.0),
                imageSize: Cesium.defaultValue(
                    options.imageSize,
                    new Cesium.Cartesian2(20, 20)
                ),
                emissionRate: Cesium.defaultValue(options.emissionRate, 5.0),
                lifetime: Cesium.defaultValue(options.lifetime, 16.0),
                modelMatrix: this.computeModelMatrix(
                    entity,
                    Cesium.JulianDate.now()
                ),
                emitterModelMatrix: this.computeEmitterModelMatrix()
            })
        );
    }

    computeModelMatrix(entity, time) {
        let position = Cesium.Property.getValueOrUndefined(
            entity.position,
            time,
            new Cesium.Cartesian3()
        );
        if (!Cesium.defined(position)) {
            return undefined;
        }
        let orientation = Cesium.Property.getValueOrUndefined(
            entity.orientation,
            time,
            new Cesium.Quaternion()
        );
        let modelMatrix = undefined;
        if (!Cesium.defined(orientation)) {
            modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
                position,
                undefined,
                new Cesium.Matrix4()
            );
        } else {
            modelMatrix = Cesium.Matrix4.fromRotationTranslation(
                Cesium.Matrix3.fromQuaternion(
                    orientation,
                    new Cesium.Matrix3()
                ),
                position,
                new Cesium.Matrix4()
            );
        }
        return modelMatrix;
    }

    computeEmitterModelMatrix() {
        let hpr = Cesium.HeadingPitchRoll.fromDegrees(
            0.0,
            0.0,
            0.0,
            new Cesium.HeadingPitchRoll()
        );
        let trs = new Cesium.TranslationRotationScale();
        trs.translation = Cesium.Cartesian3.fromElements(
            3.0,
            3.0,
            1.0,
            new Cesium.Cartesian3()
        );
        trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(
            hpr,
            new Cesium.Quaternion()
        );
        return Cesium.Matrix4.fromTranslationRotationScale(
            trs,
            new Cesium.Matrix4()
        );
    }
}

CesiumZondy.Manager.AdvancedAnalysisManager = AdvancedAnalysisManager;
