import { CesiumZondy } from '../core/Base';

/**
 * @author 三维基础平台研发中心·周凌风
 * @class SceneManager
 * @classdesc 视图功能管理类
 * @description 视图功能的创建与移除
 */
export default class SceneManager {
    constructor(option) {
        this._viewer = Cesium.defaultValue(option.viewer, undefined);
        this._scene = this._viewer.scene;
        this._ellipsoid = this._viewer.scene.globe.ellipsoid;
    }

    get viewer(){
        return this._viewer;
    }

    get scene(){
        return this._scene;
    }
    /**
     * 显示经纬度 高程 视角高度
     * @param {Element|String} elementId 要显示的div的id
     * @param {Object} options 附加属性
     * @param {Boolean}[options.showHpr = false]
     * @param {Boolean}[options.showSelectTileInfo = false] 显示当前鼠标所在位置拾取到的级别
     * @param {Boolean}[options.showViewLevelInfo = false] 显示视图级别
     * @example
     * webGlobe.showPosition('', {
     * showHpr: true,
     * showSelectTileInfo:true,
     * showViewLevelInfo:true
     * });
     * @returns {Element} element 状态栏的element
     * @  deprecated 该接口即将弃用 请用show替换
     */
    showPosition(elementId, options) {
        let that = this;
        if (!Cesium.defined(options)) {
            options = {};
        }
        let showHpr = Cesium.defaultValue(options.showHpr, false);
        let showSelectTileInfo = Cesium.defaultValue(
            options.showSelectTileInfo,
            false
        );
        let showViewLevelInfo = Cesium.defaultValue(
            options.showViewLevelInfo,
            false
        );
        let viewLevel = 0;
        let longitudeString = null;
        let latitudeString = null;
        let cameraHeight = null;
        let cartesian = new Cesium.Cartesian3();
        let height = null;
        let ellipsoid = this._ellipsoid;
        let tilesToRender = this.viewer.scene.globe._surface.tileProvider
            ._tilesToRenderByTextureCount;
        let selectedTile;
        let lastScreenPos;

        function selectTile(e) {
            let selectedTileTmp;
            let cartesian = that.viewer.scene.camera.pickEllipsoid(
                e,
                ellipsoid
            );
            if (Cesium.defined(cartesian)) {
                let cartographic = ellipsoid.cartesianToCartographic(cartesian);
                let tilesRendered =
                    that.viewer.scene.globe._surface.tileProvider
                        ._tilesToRenderByTextureCount;
                for (
                    let textureCount = 0;
                    !selectedTileTmp && textureCount < tilesRendered.length;
                    ++textureCount
                ) {
                    let tilesRenderedByTextureCount =
                        tilesRendered[textureCount];
                    if (!Cesium.defined(tilesRenderedByTextureCount)) {
                        continue;
                    }
                    for (
                        let tileIndex = 0;
                        !selectedTileTmp &&
                        tileIndex < tilesRenderedByTextureCount.length;
                        ++tileIndex
                    ) {
                        let tile = tilesRenderedByTextureCount[tileIndex];
                        if (
                            Cesium.Rectangle.contains(
                                tile.rectangle,
                                cartographic
                            )
                        ) {
                            selectedTileTmp = tile;
                        }
                    }
                }
            }
            return selectedTileTmp;
        }

        function updateViewLevel() {
            for (let i = 0; i < tilesToRender.length; i++) {
                if (tilesToRender[i]) {
                    for (
                        let tileIndex = 0;
                        tileIndex < tilesToRender[i].length;
                        tileIndex++
                    ) {
                        if (
                            Cesium.Rectangle.contains(
                                tilesToRender[i][tileIndex].rectangle,
                                that.viewer.camera.positionCartographic
                            )
                        ) {
                            viewLevel = tilesToRender[i][tileIndex]._level;
                        }
                    }
                }
            }
        }

        function updateShowInfo(screenPos) {
            cartesian = that.viewer.getCartesian3Position(screenPos, cartesian);
            let camera = that.viewer.camera;
            let longlatHeight = '';
            if (cartesian) {
                let cartographic = ellipsoid.cartesianToCartographic(cartesian);
                longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
                latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
                cameraHeight = Math.ceil(
                    that.viewer.camera.positionCartographic.height
                );
                height = Math.max(
                    that.viewer.scene.globe.getHeight(cartographic),
                    cartographic.height
                );
                longlatHeight =
                    '经度:' +
                    longitudeString.toFixed(4) +
                    '°，纬度:' +
                    latitudeString.toFixed(4) +
                    '°，海拔高度:' +
                    height.toFixed(0) +
                    '米' +
                    '，相机视角高度:' +
                    cameraHeight.toFixed(0) +
                    '米';
            }
            let strHpr = '';
            if (showHpr) {
                strHpr =
                    ' heading：' +
                    Cesium.Math.toDegrees(camera.heading).toFixed(1) +
                    ' pitch：' +
                    Cesium.Math.toDegrees(camera.pitch).toFixed(1) +
                    ' roll：' +
                    Cesium.Math.toDegrees(camera.roll).toFixed(1);
            }
            let selectTileInfo = '';
            if (showSelectTileInfo && selectedTile) {
                selectTileInfo =
                    '，瓦片X:' +
                    selectedTile.x +
                    '，瓦片Y:' +
                    selectedTile.y +
                    '，瓦片级别:' +
                    selectedTile.level +
                    '，';
            }
            if (height === undefined || height < -7000) {
                height = 0;
            }
            let level = '';
            if (showViewLevelInfo) {
                level = '当前地图级别:' + viewLevel;
            }
            let iHtml = longlatHeight + strHpr + selectTileInfo + level;
            document.getElementById(elementId).innerHTML = iHtml;
        }

        if (elementId === undefined || elementId === null) {
            let elementPt = document.createElement('div');
            elementPt.className = 'coordinateClass';
            elementPt.id = 'coordinateDiv';
            let element = document.createElement('label');
            elementId = element.id = 'coordinate_location';
            let style1 = document.createElement('style');
            style1.innerHTML =
                '.coordinate_location {color: #F0EFEF; line-height: 30px; margin-left: 30%;bottom:0px;font-size: 80%;font:"雅黑";}';
            element.style = style1;
            elementPt.appendChild(element);
            this.viewer._element.appendChild(elementPt);
        }
        if (elementId !== undefined) {
            this.viewer.scene.globe.tileLoadProgressEvent.addEventListener(
                function (datalength) {
                    updateViewLevel();
                }
            );
            this.viewer.camera.changed.addEventListener(function () {
                updateViewLevel();
            });
            if (!Cesium.defined(this.screenSpaceMouseEventHandler)) {
                this.screenSpaceMouseEventHandler = new Cesium.ScreenSpaceEventHandler(
                    this.scene.canvas
                );
            }
            this.screenSpaceMouseEventHandler.setInputAction(function (
                movement
            ) {
                updateViewLevel();
                selectedTile = selectTile(movement.endPosition);
                updateShowInfo(movement.endPosition);
                lastScreenPos = movement.endPosition;
            },
            Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            this.screenSpaceMouseEventHandler.setInputAction(function (
                movement
            ) {
                updateViewLevel();
                selectedTile = selectTile(lastScreenPos);
                updateShowInfo(lastScreenPos);
            },
            Cesium.ScreenSpaceEventType.WHEEL);
        }
        return document.getElementById(elementId);
    }

    /**
     * 跳转到
     * @param  {Number} lon 经度
     * @param  {Number} lon 纬度
     * @param  {Number} height  视角高度
     * @param  {Number} duration 跳转持续时间
     */
    flyTo(lon, lat, height, duration) {
        if (height === null || height === '' || height === undefined) {
            let cameraHeight = Math.ceil(
                this.viewer.camera.positionCartographic.height
            );
            height = cameraHeight;
        }
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            duration: duration,
            orientation: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(-90),
                roll: Cesium.Math.toRadians(0) //0
            }
        });
    }

    /**
     * 跳转到
     * @param  {Number} lon 经度
     * @param  {Number} lon 纬度
     * @param  {Object} [options] 跳转持续时间
     * @param  {Number} [options.height] 视角高度
     * @param  {Number} [options.duration] 持续时间
     * @param  {Number} [options.heading] 方位角
     * @param  {Number} [options.pitch] 俯仰角
     * @param  {Number} [options.roll] 翻滚角
     */
    flyToEx(lon, lat, options) {
        let height = null;
        let heading;
        let pitch;
        let roll;
        let duration;
        if (options) {
            height = Cesium.defaultValue(options.height, undefined);
            heading = Cesium.Math.toRadians(
                Cesium.defaultValue(options.heading, Cesium.Math.toRadians(0))
            );
            pitch = Cesium.Math.toRadians(
                Cesium.defaultValue(options.pitch, Cesium.Math.toRadians(-90))
            );
            roll = Cesium.Math.toRadians(
                Cesium.defaultValue(options.roll, Cesium.Math.toRadians(0))
            );
            duration = Cesium.defaultValue(options.duration, 1);
        } else {
            heading = Cesium.Math.toRadians(0);
            pitch = Cesium.Math.toRadians(-90);
            roll = Cesium.Math.toRadians(0);
            duration = 1.0;
        }
        if (height === null || height === '' || height === undefined) {
            let cameraHeight = Math.ceil(
                this.viewer.camera.positionCartographic.height
            );
            height = cameraHeight;
        }
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            duration: duration,
            orientation: {
                heading: heading,
                pitch: pitch,
                roll: roll
            }
        });
    }

    /**
     * 通用跳转接口
     * @param  {Number} lon 经度
     * @param  {Number} lon 纬度
     * @param  {Number} height  视角高度
     * @param  {object} options 扩展参数 兼容原生
     */
    flyToComm(lon, lat, height, options) {
        if (height === null || height === '' || height === undefined) {
            let cameraHeight = Math.ceil(
                this.viewer.camera.positionCartographic.height
            );
            height = cameraHeight;
        }
        let flyOptions = {
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height)
        };
        if (Cesium.defined(options)) {
            Cesium.Object.extend(flyOptions, options);
        }
        this.viewer.camera.flyTo(flyOptions);
    }

    /**
     * 设置当前视图范围
     * @param {Number} lon 经度
     * @param {Number} lat 纬度
     * @param {Number} height 高度
     * @param {Number} curHeading 绕垂直于地心的轴旋转的度数
     * @param {Number} curPitch   绕纬度线旋转度数
     * @param {Number} curRoll    绕经度线旋转度数
     */
    setView(lon, lat, height, curHeading, curPitch, curRoll) {
        this.viewer.camera.setView({
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            heading: Cesium.Math.toRadians(curHeading),
            pitch: Cesium.Math.toRadians(curPitch),
            roll: Cesium.Math.toRadians(curRoll)
        });
    }

    /**
     * icrf
     * @param {object} scene 场景
     * @param {object} time 时间
     */
    icrf(scene, time) {
        if (scene.mode !== Cesium.SceneMode.SCENE3D) {
            return;
        }
        let icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);
        if (Cesium.defined(icrfToFixed)) {
            let camera = scene.camera;
            let offset = Cesium.Cartesian3.clone(scene.camera.position);
            let transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
            camera.lookAtTransform(transform, offset);
        }
    }

    /**
     * 开启自转
     */
    openRotation() {
        this.viewer.camera.flyHome(0);
        this.viewer.clock.multiplier = 3 * 60 * 60;
        this.viewer.scene.preRender.addEventListener(this.icrf);
        if (!this._shouldAnimate) {
            this.viewer.clock._shouldAnimate = true;
        }
    }

    /**
     * 关闭自转
     */
    closeRotation() {
        this.scene.preRender.removeEventListener(this.icrf);
        this.viewer.clock.multiplier = 1;
        this.viewer.clock._shouldAnimate = this._shouldAnimate;
        this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    }

    /**
     * 复位
     */
    goHome() {
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(104, 30, 15682725)
        });
    }

    /**
     * 切换场景模式
     * @param  {String} sceneMode 场景模式'3D', '2D','COLUMBUS_VIEW'(平面三维)
     * @param  {Number} duration  动画持续时间，<=0时，保持场景范围不变
     */
    changeSceneMode(sceneMode, duration) {
        let mSceneMode = null;
        switch (sceneMode) {
            case '3D':
                mSceneMode = Cesium.SceneMode.SCENE3D;
                break;
            case 'COLUMBUS_VIEW':
                mSceneMode = Cesium.SceneMode.COLUMBUS_VIEW;
                break;
            case '2D':
                mSceneMode = Cesium.SceneMode.SCENE2D;
                break;
        }
        let mDuraion = Cesium.defaultValue(duration, 2.0);
        if (this.scene.mode !== mSceneMode) {
            if (mSceneMode === Cesium.SceneMode.SCENE3D) {
                this.viewer.scene.morphTo3D(mDuraion);
            } else if (mSceneMode === Cesium.SceneMode.COLUMBUS_VIEW) {
                this.viewer.scene.morphToColumbusView(mDuraion);
            } else {
                this.viewer.scene.morphTo2D(mDuraion);
            }
        }
    }

    /**
     * 放大
     */
    zoomOut() {
        let cameraHeight = this._ellipsoid.cartesianToCartographic(
            this.viewer.camera.position
        ).height;
        this.viewer.camera.zoomOut(cameraHeight / 10);
    }

    /**
     * 缩小
     */
    zoomIn() {
        let cameraHeight = this._ellipsoid.cartesianToCartographic(
            this.viewer.camera.position
        ).height;
        this.viewer.camera.zoomIn(cameraHeight / 10);
    }

    /**
     * 修改场景的天空盒
     * @param  {SkyBox} skybox 天空和对象
     * @example
     *let skybox = new Cesium.SkyBox({
     *                    sources : {
     *                      positiveX : 'Assets/Textures/SkyBox2/front.jpg',
     *                      negativeX : 'Assets/Textures/SkyBox2/back.jpg',
     *                      positiveY : 'Assets/Textures/SkyBox2/left.jpg',
     *                      negativeY : 'Assets/Textures/SkyBox2/right.jpg',
     *                      positiveZ : 'Assets/Textures/SkyBox2/top.jpg',
     *                      negativeZ : 'Assets/Textures/SkyBox2/bottom.jpg'
     *                 }
     *            });
     */
    changeSkyBox(skybox) {
        if (Cesium.defined(skybox)) {
            this.scene.skyBox = skybox;
            let frameState = this.scene._frameState;
            this.scene.skyBox.update(frameState);
        }
    }

    /**
     * 根据ID飞行到特定要素位置
     * @param {Array<layer>} layerList 图层列表
     * @param {Array<id>} id ID列表
     * @param {object} options 其他参数
     */
    flyToFeatureById(layerList, id, options) {
        if (!Cesium.defined(layerList)) {
            return;
        }
        if (!Cesium.defined(options)) {
            options = {};
        }
        let that = this;
        let first = true;

        function flyToF(feature) {
            let maxPoint = feature.getProperty('maxPoint');
            let minPoint = feature.getProperty('minPoint');
            let min = new Cesium.Cartesian3(
                minPoint[0],
                -minPoint[2],
                minPoint[1]
            );
            let max = new Cesium.Cartesian3(
                maxPoint[0],
                -maxPoint[2],
                maxPoint[1]
            );
            let transform = feature.tileset.root.transform;
            max = Cesium.Matrix4.multiplyByPoint(transform, max, max);
            min = Cesium.Matrix4.multiplyByPoint(transform, min, min);
            let heading = Cesium.Math.toRadians(0);
            let pitch = Cesium.Math.toRadians(0);
            let range = Cesium.defaultValue(options.range, 0.0);
            let boundingSphere = new Cesium.BoundingSphere();
            boundingSphere = Cesium.BoundingSphere.fromCornerPoints(
                min,
                max,
                boundingSphere
            );
            that.viewer.camera.flyToBoundingSphere(boundingSphere, {
                offset: Cesium.defaultValue(
                    options.offset,
                    new Cesium.HeadingPitchRange(heading, pitch, range)
                )
            });
            for (let i = 0; i < layerList.length; ++i) {
                let tileset = layerList[i];
                tileset.style = undefined;
                tileset.styleEngine.justSelect(false, true);
            }
            first = false;
        }

        function evaluateColorCallBack(feature, result) {
            if (first) {
                let title = feature.getProperty('name');
                let values = title.split('_');
                let vlueNumber = parseInt(values[2]);
                if (vlueNumber === id && first) {
                    flyToF(feature);
                }
            }
            return feature.color;
        }

        for (let i = 0; i < layerList.length; ++i) {
            let tileset = layerList[i];
            tileset.styleEngine.justSelect(true);
            tileset.style = new Cesium.Cesium3DTileStyle();
            tileset.style.color = {
                evaluateColor: evaluateColorCallBack
            };
        }
    }
}

CesiumZondy.Manager.SceneManager = SceneManager;
