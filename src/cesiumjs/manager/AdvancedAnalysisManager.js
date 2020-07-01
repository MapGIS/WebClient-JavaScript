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

    /**
     * 创建动画漫游实例
     * @param {object} options.modelUrl 模型url
     * @returns {object} animation 返回动画漫游实例
     */
    createAnimation(options) {
        if (!Cesium.defined(options)) {
            options = {};
        }
        let animation = new Cesium.AnimationAnalyse(this._viewer, {
            exHeight: 0.8,
            isLoop: false,
            modelUrl: options.modelUrl,
            complete: function () {
                alert('完毕');
            }
        });
        return animation;
    }

    /**
     * 创建填挖方实例
     * @param {Number} dataType 区分地形与模型的标识，dataType=0.0为地形，dataType=1.0为模型
     * @param {Number} options.xPaneNum x方向采样点个数
     * @param {Number} options.yPaneNum y方向采样点个数
     * @param {Number} options.Height   设定的填挖规整高度
     * @param {callback} options.callback 返回结果的回调函数
     * @returns {object} cutFill 返回填挖方实例
     */
    createCutFill(dataType, options) {
        let viewer = this._viewer;
        let cutFill = new Cesium.CutFillAnalyzeC(viewer, {
            callBack: options.callback
        });
        if (Cesium.defined(options)) {
            cutFill.xPaneNum = options.xPaneNum;
            cutFill.yPaneNum = options.yPaneNum;
            cutFill.Height = options.Height;
        }
        cutFill.dataType = Cesium.defaultValue(dataType, 0.0);
        return cutFill;
    }

    /**
     * 创建洪水分析实例
     * @param {*} options
     * @returns {object} flood
     */
    createFlood(options) {
        let flood = new Cesium.FloodAnalysis(this._scene);
        if (!Cesium.defined(options)) {
            options = {};
        }
        flood.minHeight = Cesium.defaultValue(options.minHeight, 0);
        flood.maxHeight = Cesium.defaultValue(options.maxHeight, 100);
        flood.floodSpeed = Cesium.defaultValue(options.floodSpeed, 20);

        return flood;
    }

    /**
     * 创建动态航班实例
     * @param {*} options.center
     * @param {*} options.cities
     * @returns {object} plague 返回动态航班实例
     */
    // createPlague(options) {
    //     if (!Cesium.defined(options)) {
    //         options = {};
    //     }
    //     options = {
    //         isAdd: false,
    //         center: options.center,
    //         cities: options.cities
    //     };
    //     let plague = new Cesium.Plague(this._viewer, options);
    //     plague.setVisible('add');
    //     return plague;
    // }

    /**
     * 更新tileset来创建模型压平
     * @param {*} tileset
     * @param {*} options.isFlatten
     * @param {*} options.height
     * @param {*} options.array
     * @returns {object} tileset
     */
    createModelFlatten(tileset, options) {
        if (!Cesium.defined(options)) {
            options = {};
        }
        tileset.u_isFlatten = Cesium.defaultValue(options.isFlatten, false);
        tileset.u_height = Cesium.defaultValue(options.height, 0.0);
        tileset.u_arrayLength = Cesium.defaultValue(options.array.length, 0.0);
        tileset.u_positionArray = Cesium.defaultValue(options.array, []);

        return tileset;
    }

    /**
     * 创建天际线实例
     * @returns {object} skyLineAn 返回天际线实例
     */
    // createSkyLine() {
    //     let manager = this._scene.VisualAnalysisManager;
    //     let skyLineAn = new Cesium.SkyLineAnalysis({
    //         scene: this._scene,
    //         analysisEndCallBack: function (pos3DList) {
    //             alert('分析完成');
    //         }
    //     });
    //     manager.add(skyLineAn);

    //     return skyLineAn;
    // }

    /**
     * 创建可视域实例
     * @returns {object} viewshedAnalysis 返回可视域实例
     */
    createViewshedAnalysis() {
        let manager = this._scene.VisualAnalysisManager;
        let viewshedAnalysis = new Cesium.ViewshedAnalysis();
        manager.add(viewshedAnalysis);
        return viewshedAnalysis;
    }

    /**
     * 创建通视实例
     * @returns {object} visibilityAnalysis 返回通视实例
     */
    createVisibilityAnalysis() {
        let manager = this._scene.VisualAnalysisManager;
        let visibilityAnalysis = new Cesium.VisibilityAnalysis();
        manager.add(visibilityAnalysis);
        return visibilityAnalysis;
    }

    /**
     * 创建限高分析实例
     */
    // createHeightLimited() {}

    /**
     * 创建下雨特效 
     * @returns {object} rain 返回下雨特效实例
     */
    createRain() {
        let collection = this._viewer.scene.postProcessStages;
        let rain = Cesium.PostProcessStageLibrary.createRainStage();
        collection.add(rain);
        this._scene.skyAtmosphere.hueShift = -0.8;
        this._scene.skyAtmosphere.saturationShift = -0.7;
        this._scene.skyAtmosphere.brightnessShift = -0.33;
        this._scene.fog.density = 0.001;
        this._scene.fog.minimumBrightness = 0.8;
        return rain;
    }

    /**
     * 创建下雪特效 
     * @returns {object} snow 返回下雪特效实例
     */
    createSnow() {
        let collection = this._viewer.scene.postProcessStages;
        let snow = Cesium.PostProcessStageLibrary.createSnowStage();
        collection.add(snow);
        this._scene.skyAtmosphere.hueShift = -0.8;
        this._scene.skyAtmosphere.saturationShift = -0.7;
        this._scene.skyAtmosphere.brightnessShift = -0.33;
        this._scene.fog.density = 0.001;
        this._scene.fog.minimumBrightness = 0.8;
        return snow;
    }

    /**
     * 创建雾特效 
     * @returns {object} fog 返回雾特效实例
     */
    createFog() {
        let collection = this._viewer.scene.postProcessStages;
        let fog = Cesium.PostProcessStageLibrary.createFogStage(0.1);
        collection.add(fog);
        return fog;
    }
}

CesiumZondy.Manager.AdvancedAnalysisManager = AdvancedAnalysisManager;
