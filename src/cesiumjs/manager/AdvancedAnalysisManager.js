import { CesiumZondy } from '../core/Base';

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
     * @param {Object} options 动画漫游参数
     * @param {Number} [options.exHeight] 附加高程
     * @param {Boolean} [options.isLoop] 是否循环
     * @param {Object} options.modelUrl 模型url
     * @param {Function} [options.callback] 完成动漫漫游后的回调函数
     * @returns {Object} animation 返回动画漫游实例
     */
    createAnimation(options) {
        const optionsParam = Cesium.defaultValue(options, {});
        const animation = new Cesium.AnimationTool(this.viewer, {
            exHeight: Cesium.defaultValue(optionsParam.exHeight, 0.8),
            isLoop: Cesium.defaultValue(optionsParam.isLoop, false),
            modelUrl: optionsParam.modelUrl,
            complete: Cesium.defaultValue(optionsParam.callback, () => {})
        });
        return animation;
    }

    /**
     * 创建填挖方实例
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createCutFill
     * @param {Number} dataType 针对地形进行填挖方分析
     * @example
     * dataType=0.0 : 地形
     * @param {Object} options 填挖方参数
     * @param {Number} options.xPaneNum x方向采样点个数
     * @param {Number} options.yPaneNum y方向采样点个数
     * @param {Number} options.height   设定的填挖规整高度
     * @param {callback} options.callback 返回结果的回调函数
     * @returns {Object} cutFill 返回填挖方实例
     */
    createCutFill(dataType, options) {
        const optionsParam = Cesium.defaultValue(options, {});
        const { viewer } = this;
        const cutFill = new Cesium.CutFillAnalysis(viewer, {
            callBack: optionsParam.callback
        });
        cutFill.xPaneNum = optionsParam.xPaneNum;
        cutFill.yPaneNum = optionsParam.yPaneNum;
        cutFill.height = optionsParam.height;
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
     * @param {Array<Cartesian3>} dotsList 指定区域多边形顶点坐标数组
     * @param {Object} options 洪水分析参数
     * @param {Number} [options.minHeight] 最低洪水水位高度
     * @param {Number} [options.maxHeight] 最高洪水水位高度
     * @param {Number} [options.floodSpeed] 洪水上涨速度
     * @returns {Object} flood 返回洪水实例
     */
    createFlood(dotsList, options) {
        const optionsParam = Cesium.defaultValue(options, {});
        const flood = new Cesium.FloodAnalysis(this.scene, dotsList);
        flood.minHeight = Cesium.defaultValue(optionsParam.minHeight, 0);
        flood.maxHeight = Cesium.defaultValue(optionsParam.maxHeight, 100);
        flood.floodSpeed = Cesium.defaultValue(optionsParam.floodSpeed, 20);
        return flood;
    }

    /**
     * 创建动态航班实例
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createDynamicPolyline
     * @param {Object} posStart 轨迹线起点
     * @param {Array} posEnds 轨迹线终点
     * @param {Object} options 动态航班参数
     * @param {Boolean} [options.isAdd] 是否已添加航班线
     * @param {Color} [options.color] 轨迹线混合颜色，基调为红色
     * @param {Number} [options.duration] 周期时间,单位毫秒
     * @returns {Object} dynamicPolyline 返回动态航班实例
     */
    createDynamicPolyline(posStart, posEnds, options) {
        const optionsParam = Cesium.defaultValue(options, {});
        let dynamicPolyline;
        if (posStart !== undefined && posEnds !== undefined) {
            dynamicPolyline = new Cesium.DynamicPolyline(this.viewer, posStart, posEnds, {
                isAdd: Cesium.defaultValue(optionsParam.isAdd, false),
                color: Cesium.defaultValue(optionsParam.color, Cesium.Color.ORANGE),
                duration: 3000
            });
            dynamicPolyline.setVisible('add');
        } else {
            return undefined;
        }
        return dynamicPolyline;
    }

    /**
     * 模型压平
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createModelFlatten
     * @param {Object} tileset 图层信息
     * @param {Object} options 模型压平参数
     * @param {Boolean} options.isFlatten 是否执行模型压平
     * @param {Number} options.height 压平到指定高度
     * @param {Number} options.arrayLength 压平区域顶点数组长度
     * @param {Array} options.array 压平区域顶点数组
     * @returns {Object} tileset 返回图层信息
     */
    createModelFlatten(tileset, options) {
        const optionsParam = Cesium.defaultValue(options, {});
        const tilesetObject = tileset;
        tilesetObject.isFlatten = Cesium.defaultValue(optionsParam.isFlatten, true);
        tilesetObject.height = Cesium.defaultValue(optionsParam.height, 0.0);
        tilesetObject.positionArray = Cesium.defaultValue(optionsParam.array, []);
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
        const manager = this.scene.visualAnalysisManager;
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
        const manager = this.scene.visualAnalysisManager;
        manager.removeAll();
    }

    /**
     * 创建天际线实例
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createSkyLine
     * @returns {Object} skyLineAn 返回天际线实例
     */
    createSkyLine() {
        const manager = this.scene.visualAnalysisManager;
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
        const manager = this.scene.visualAnalysisManager;
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
        const manager = this.scene.visualAnalysisManager;
        const visibilityAnalysis = new Cesium.VisiblityAnalysis({});
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
     * @param {Object} options 限高分析参数
     * @param {Color} [options.limitedColor] 限高区域颜色
     * @param {Number} [options.blendTransparency] 限高颜色混合比例0-1
     * @returns {Object} heightLimited 限高分析实例
     * @example 使用方法
     * 添加：globe.addSceneEffect(heightLimited)
     * 移除：globe.removeSceneEffect(heightLimited)
     */
    createHeightLimited(height, posArray, options) {
        const optionsParam = Cesium.defaultValue(options, {});
        const heightLimited = new Cesium.HeightLimited(this.viewer, {
            height: Cesium.defaultValue(height, 0),
            posArray,
            limitedColor: Cesium.defaultValue(optionsParam.limitedColor, new Cesium.Color(1, 0, 0, 0.5)),
            blendTransparency: Cesium.defaultValue(optionsParam.blendTransparency, 0.8)
        });
        return heightLimited;


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
     * @returns {Object} weather 返回天气特效实例
     */
    createRain(options) {
        const optionsParam = Cesium.defaultValue(options, {});
        const weather = new Cesium.WeatherEffect(this.viewer);
        weather.addRain();
        
        this.scene.skyAtmosphere.hueShift = Cesium.defaultValue(optionsParam.hueShift, -0.8);
        this.scene.skyAtmosphere.saturationShift = Cesium.defaultValue(optionsParam.saturationShift, -0.7);
        this.scene.skyAtmosphere.brightnessShift = Cesium.defaultValue(optionsParam.brightnessShift, -0.33);
        this.scene.fog.density = Cesium.defaultValue(optionsParam.density, 0.001);
        this.scene.fog.minimumBrightness = Cesium.defaultValue(optionsParam.minimumBrightness, 0.8);
        return weather;
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
     * @returns {Object} weather 返回天气特效实例
     */
    createSnow(options) {
        const optionsParam = Cesium.defaultValue(options, {});
        const weather = new Cesium.WeatherEffect(this.viewer);
        weather.addSnow();
        this.scene.skyAtmosphere.hueShift = Cesium.defaultValue(optionsParam.hueShift, -0.8);
        this.scene.skyAtmosphere.saturationShift = Cesium.defaultValue(optionsParam.saturationShift, -0.7);
        this.scene.skyAtmosphere.brightnessShift = Cesium.defaultValue(optionsParam.brightnessShift, -0.33);
        this.scene.fog.density = Cesium.defaultValue(optionsParam.density, 0.001);
        this.scene.fog.minimumBrightness = Cesium.defaultValue(optionsParam.minimumBrightness, 0.8);
        return weather;
    }

    /**
     * 创建雾特效
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createFog
     * @param {Object} options 雾特效参数
     * @param {Number} [options.alpha] 雾特效透明度
     * @returns {Object} weather 返回雾特效实例
     */
    createFog(options) {
        const optionsParam = Cesium.defaultValue(options, {});
        const weather = new Cesium.WeatherEffect(this.viewer);
        weather.addFog(optionsParam);
        return weather;
    }

    /**
     * 移除特效，雨、雪、雾通用
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.removeStage
     * @param {Object} stage 雨、雪、雾特效实例
     */
    removeStage(stage) {
        this.viewer.scene.postProcessStages.remove(stage);
    }

    /**
     * 动态粒子特效
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createRoamParticle
     * @param {Object} options 动态粒子特效参数
     * @param {String} options.imageUrl 粒子url
     * @param {String} options.modelUrl 模型url
     * @param {Date} [options.startTime] 开始时间
     * @param {Number} [options.duration] 持续周期
     * @param {Cartesian3} [options.positionStart] 起点坐标
     * @param {Cartesian3} [options.positionEnd] 终点坐标
     * @returns {Object} roamParticle 返回粒子特效实例
     */
    createRoamParticle(options) {
        const optionsParam = Cesium.defaultValue(options, {});
        const roamParticle = new Cesium.RoamParticle(this.viewer, {
            imageUrl: optionsParam.imageUrl,
            modelUrl: optionsParam.modelUrl,
            startTime: Cesium.defaultValue(optionsParam.startTime, new Date(2015, 2, 25, 16)),
            duration: Cesium.defaultValue(optionsParam.duration, 120),
            positionStart: Cesium.defaultValue(optionsParam.positionStart, Cesium.Cartesian3.fromDegrees(-75.15787310614596, 39.97862668312678)),
            positionEnd: Cesium.defaultValue(optionsParam.positionEnd, Cesium.Cartesian3.fromDegrees(-75.1633691390455, 39.95355089912078))
        });
        roamParticle.start();
        return roamParticle;
    }

    /**
     * 移除动态粒子特效
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.removeRoamParticle
     * @param {Object} roamParticle 动态粒子特效实例
     */
    removeRoamParticle(roamParticle) {
        roamParticle.remove();
        this.scene.requestRender();
    }

    /**
     * 固定位置粒子特效，可通过更改image与附加参数来实现火焰、喷泉、烟雾等粒子特效
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.createStableParticle
     * @param {String} imageUrl 粒子url
     * @param {Cartesian3} position 粒子特效位置
     * @param {Object} options 特效粒子参数
     * @param {String} options.modelUrl 模型url
     * @param {Number} [options.minimumPixelSize] 最小像素尺寸
     * @param {Color} [options.startColor] 开始的颜色
     * @param {Color} [options.endColor] 结束的颜色
     * @param {Number} [options.startScale] 起始尺寸
     * @param {Number} [options.endScale] 结束尺寸
     * @param {Number} [options.minimumParticleLife] 最小粒子周期
     * @param {Number} [options.maximumParticleLife] 最大粒子周期
     * @param {Number} [options.minimumSpeed] 最小速率
     * @param {Number} [options.maximumSpeed] 最大速率
     * @param {Cartesian2} [options.imageSize] 粒子图像大小
     * @param {Number} [options.emissionRate] 排放率
     * @param {Number} [options.minimumImageSize] 最小Image尺寸
     * @param {Number} [options.maximumImageSize] 最大Image尺寸
     * @param {Number} [options.lifetime] 单个粒子生命周期
     * @param {Object} [options.emitter] 粒子发射器类型
     * @param {Number} [options.gravity] 粒子重力
     * @param {Number} [options.viewHeight] 用于控制粒子特效在0到该值范围内可见，范围外不可见，当值为-1时，默认全部可见
     * @param {Number} [options.heading] 俯仰角
     * @param {Number} [options.pitch] 偏航角
     * @param {Number} [options.roll] 翻滚角
     * @returns {Object} stableParticle 返回粒子特效实例
     */
    createStableParticle(imageUrl, position, options) {
        this.viewer.clock.shouldAnimate = true;
        const optionsParam = Cesium.defaultValue(options, {});
        const stableParticle = new Cesium.StableParticle(this.viewer, imageUrl, position, {
            modelUrl: optionsParam.modelUrl,
            minimumPixelSize: Cesium.defaultValue(optionsParam.minimumPixelSize, 64.0),
            startColor: Cesium.defaultValue(optionsParam.startColor, Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7)),
            endColor: Cesium.defaultValue(optionsParam.endColor, Cesium.Color.WHITE.withAlpha(0.0)),
            startScale: Cesium.defaultValue(optionsParam.startScale, 1.0),
            endScale: Cesium.defaultValue(optionsParam.endScale, 4.0),
            minimumParticleLife: Cesium.defaultValue(optionsParam.minimumParticleLife, 1.2),
            maximumParticleLife: Cesium.defaultValue(optionsParam.maximumParticleLife, 1.2),
            minimumSpeed: Cesium.defaultValue(optionsParam.minimumSpeed, 1.0),
            maximumSpeed: Cesium.defaultValue(optionsParam.maximumSpeed, 4.0),
            imageSize: Cesium.defaultValue(optionsParam.imageSize, new Cesium.Cartesian2(25.0, 25.0)),
            emissionRate: Cesium.defaultValue(optionsParam.emissionRate, 5.0),
            minimumImageSize: Cesium.defaultValue(optionsParam.minimumImageSize, new Cesium.Cartesian2(25.0, 25.0)),
            maximumImageSize: Cesium.defaultValue(optionsParam.maximumImageSize, new Cesium.Cartesian2(25.0, 25.0)),
            lifetime: Cesium.defaultValue(optionsParam.lifetime, 16.0),
            emitter: Cesium.defaultValue(optionsParam.emitter, new Cesium.ConeEmitter(Cesium.Math.toRadians(5.0))),
            gravity: Cesium.defaultValue(optionsParam.gravity, 0.0),
            viewHeight: Cesium.defaultValue(optionsParam.viewHeight, -1),
            heading: Cesium.defaultValue(optionsParam.heading, 0.0),
            pitch: Cesium.defaultValue(optionsParam.pitch, 0.0),
            roll: Cesium.defaultValue(optionsParam.roll, 0.0)
        });
        stableParticle.start();
        return stableParticle;
    }

    /**
     * 移除火焰特效
     * @function module:客户端可视化分析.AdvancedAnalysisManager.prototype.removeStableParticle
     * @param {Object} stableParticle 火焰特效实例
     */
    removeStableParticle(stableParticle) {
        stableParticle.remove();
        this.scene.requestRender();
    }
}

CesiumZondy.Manager.AdvancedAnalysisManager = AdvancedAnalysisManager;
