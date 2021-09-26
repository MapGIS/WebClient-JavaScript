import { CesiumZondy } from '../core/Base';

/**
 * 三维视图的主要类
 * @alias WebSceneControl
 * @constructor
 * @class module:客户端视图管理.WebSceneControl
 * @param {Element|String} elementId 放置视图的div的id
 * @param {Object} [options] 包含以下属性的对象
 * @param {String} [options.viewerMode=‘3D’] 初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图
 * @param {Boolean} [options.showInfo=false] 是否显示默认的属性信息框
 * @param {Boolean} [options.animation=true] 默认动画控制不显示
 * @param {Boolean} [options.baseLayerPicker=true] If set to false, the BaseLayerPicker widget will not be created.
 * @param {Boolean} [options.fullscreenButton=true] If set to false, the FullscreenButton widget will not be created.
 * @param {Boolean} [options.vrButton=false] If set to true, the VRButton widget will be created.
 * @param {Boolean} [options.onCopy=false] 是否禁用复制，默认为false禁用
 * @example
 *   var webGlobe = new CesiumZondy.WebSceneControl('GlobeView');
 *
 *   var webGlobe = new CesiumZondy.WebSceneControl('GlobeView',{showInfo:true});
 *   //或者如下
 *   var  options ={
 *       showInfo:false,
 *       viewerMode:'3D',
 *       keyEventEnable:false
 *   };
 *   var webGlobe = new CesiumZondy.WebSceneControl('GlobeView',options);
 */
export default class WebSceneControl {
    constructor(elementId, op) {
        const options = Cesium.defaultValue(op, {});

        /** 默认动画控制不显示 */
        options.animation = Cesium.defaultValue(options.animation, false);
        // 默认不显示图层控制显示
        options.baseLayerPicker = Cesium.defaultValue(options.baseLayerPicker, false);
        // 默认不显示全屏控制按钮
        options.fullscreenButton = Cesium.defaultValue(options.fullscreenButton, false);
        // 默认不显示地名查询框
        options.geocoder = Cesium.defaultValue(options.geocoder, false);
        // 默认不显示复位按钮
        options.homeButton = Cesium.defaultValue(options.homeButton, false);
        // 默认不显示信息框
        options.infoBox = Cesium.defaultValue(options.infoBox, false);
        // 默认不显示3D/2D选择器
        options.sceneModePicker = Cesium.defaultValue(options.sceneModePicker, false);
        // 默认不显示选取指示器组件
        options.selectionIndicator = Cesium.defaultValue(options.selectionIndicator, false);
        // 默认创建但不显示时间轴
        options.timeline = Cesium.defaultValue(options.timeline, false);
        // 默认不显示帮助按钮
        options.navigationHelpButton = Cesium.defaultValue(options.navigationHelpButton, false);

        options.navigationInstructionsInitiallyVisible = Cesium.defaultValue(options.navigationInstructionsInitiallyVisible, true);
        // 默认不显示渲染错误信息面板
        options.showRenderLoopErrors = Cesium.defaultValue(options.showRenderLoopErrors, false);
        // 默认场景为三维球面视图
        options.sceneMode = Cesium.defaultValue(options.sceneMode, Cesium.SceneMode.SCENE3D);
        // 默认地图投影为web 墨卡托
        options.mapProjection = Cesium.defaultValue(options.mapProjection, new Cesium.WebMercatorProjection());
        // 默认可视化数据源集合
        options.dataSources = Cesium.defaultValue(options.dataSources, new Cesium.DataSourceCollection());
        // 默认支持阴影
        options.shadows = Cesium.defaultValue(options.shadows, false);

        // 使用 ThreeJS 默认要关闭自动渲染
        if (this._useThreeJs) {
            options.useDefaultRenderLoop = false;
        }

        this._threeContainer = undefined;

        // 管理append添加的图层组
        this._appendCollection = [];

        // 默认支持键盘事件
        this._keyEventEnable = Cesium.defaultValue(options.keyEventEnable, true);
        // 创建默认视图对象
        this._viewer = new Cesium.Viewer(elementId, options);

        //隐藏版权信息
        this._viewer.cesiumWidget.creditContainer.style.display = 'none';

        // 场景对象
        this._scene = this._viewer.scene;

        this._screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);

        this._elementID = elementId;

        this._popupContain = []; // 用于管理多个popup，主要考虑到多个popup场景变化时需响应其事件，改变其位置

        const screenSpaceCameraController = this._viewer.scene.screenSpaceCameraController;
        //默认关闭hdr
        this._viewer.scene.highDynamicRange = false;
        screenSpaceCameraController.minimumZoomDistance = 1;
        screenSpaceCameraController.maximumZoomDistance = 2400000000000000;
        this._viewer.canvas.onclick = function () {
            this.focus();
        };

        this._cameraParameter = {};
        const flags = {
            looking: false,
            rotateLeft: false,
            rotateRight: false,
            moveUp: false,
            moveDown: false,
            moveLeft: false,
            moveRight: false,
            goHome: false,
            wireFrame: false,
            showFPS: false
        };

        //与activex球保持一致
        function getFlagForKeyCode(keyCode) {
            switch (keyCode) {
                case 'W'.charCodeAt(0): //向下平移镜头
                    return 'moveDown';
                case 'S'.charCodeAt(0): //向上平移镜头
                    return 'moveUp';
                case 'A'.charCodeAt(0): //向右平移镜头
                    return 'moveRight';
                case 'D'.charCodeAt(0): //向左平移镜头
                    return 'moveLeft';
                case 'Q'.charCodeAt(0): //向右旋转镜头
                    return 'rotateRight';
                case 'E'.charCodeAt(0): //向左旋转镜头
                    return 'rotateLeft';
                case 'Z'.charCodeAt(0): //空格键复位
                    return 'goHome';
                case 'G'.charCodeAt(0): //G键显示网
                    return 'wireFrame';
                case 'F'.charCodeAt(0): //F键显示帧率
                    return 'showFPS';
                default:
                    return undefined;
            }
        }

        document.addEventListener(
            'keydown',
            function (e) {
                const flagName = getFlagForKeyCode(e.keyCode);
                if (typeof flagName !== 'undefined') {
                    flags[flagName] = true;
                }
            },
            false
        );
        document.addEventListener(
            'keyup',
            function (e) {
                const flagName = getFlagForKeyCode(e.keyCode);
                if (typeof flagName !== 'undefined') {
                    flags[flagName] = false;
                }
            },
            false
        );

        this._shouldAnimate = Cesium.defaultValue(options.shouldAnimate, false); //记录全局是否允许动画
        var that = this;

        this._viewer.clock.onTick.addEventListener(function () {
            //获取相机高度
            if (that.keyEventEnable) {
                const position = that._viewer.camera.position;
                const cameraHeight = that._viewer.scene.globe.ellipsoid.cartesianToCartographic(position).height;
                const moveRate = cameraHeight / 40.0;
                if (flags.rotateLeft) {
                    that._viewer.camera.rotateLeft(0.01);
                }
                if (flags.rotateRight) {
                    that._viewer.camera.rotateRight(0.01);
                }
                if (flags.moveUp) {
                    that._viewer.camera.moveBackward(moveRate);
                }
                if (flags.moveDown) {
                    that._viewer.camera.moveForward(moveRate);
                }
                if (flags.moveLeft) {
                    that._viewer.camera.moveLeft(moveRate);
                }
                if (flags.moveRight) {
                    that._viewer.camera.moveRight(moveRate);
                }
                if (flags.goHome) {
                    that._viewer.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(104, 30, 15682725)
                    });
                }
                if (flags.wireFrame) {
                    var bShowWireframe = that._viewer.scene.globe._surface.tileProvider._debug.wireframe;
                    that._viewer.scene.globe._surface.tileProvider._debug.wireframe = !bShowWireframe;
                    flags.wireFrame = false;
                }
                if (flags.showFPS) {
                    var bShowFPS = that._viewer.scene.debugShowFramesPerSecond;
                    that._viewer.scene.debugShowFramesPerSecond = !bShowFPS;
                    flags.showFPS = false;
                }
            }
        });
        /**
         * 禁用右键菜单
         */
        document.oncontextmenu = function () {
            event.returnValue = false;
        };
        // /**
        //  * 禁用选中功能
        //  */
        // document.onselectstart = function(){
        //     event.returnValue = false;
        // };
        /**
         * 禁用复制功能
         */
        document.oncopy = function () {
            event.returnValue = that._onCopy;
        };

        this.scene.skyAtmosphere.showGroundAtmosphere = false;
        this._isRecoverExplosion = false;
    }

    /**
     * 视图
     * @memberof WebSceneControl.prototype
     * @type {Viewer}
     * @readonly
     */
    get viewer() {
        return this._viewer;
    }

    /**
     * 场景
     * @memberof WebSceneControl.prototype
     * @readonly
     * @type {Scene}
     */
    get scene() {
        return this._scene;
    }

    /**
     * 事件句柄
     * @memberof WebSceneControl.prototype
     * @readonly
     */
    get screenSpaceEventHandler() {
        return this._screenSpaceEventHandler;
    }

    /**
     * 当前椭球
     * @memberof WebSceneControl.prototype
     * @type {Ellipsoid}
     * @readonly
     */
    get ellipsoid() {
        return this._viewer.scene.globe.ellipsoid;
    }
}

CesiumZondy.WebSceneControl = WebSceneControl;
