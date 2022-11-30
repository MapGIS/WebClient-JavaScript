import { CesiumZondy } from '../core/Base';

function icrf(scene, time) {
    if (scene.mode !== Cesium.SceneMode.SCENE3D) {
        return;
    }
    const icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);
    if (Cesium.defined(icrfToFixed)) {
        const { camera } = scene;
        const offset = Cesium.Cartesian3.clone(scene.camera.position);
        const transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
        camera.lookAtTransform(transform, offset);
    }
}

/**
 * @author 三维基础平台研发中心·周凌风
 * @class module:客户端视图管理.SceneManager
 * @classdesc 视图功能管理类
 * @description 视图功能的创建与移除
 * @param {Object} options 视图功能管理类构造参数
 * @param {Object} options.viewer 视图
 */
export default class SceneManager {
    constructor(option) {
        this._viewer = Cesium.defaultValue(option.viewer, undefined);
        this._scene = this._viewer.scene;
        this._ellipsoid = this._viewer.scene.globe.ellipsoid;
    }

    /**
     * 视图
     * @memberof SceneManager.prototype
     * @type {Viewer}
     * @readonly
     */
    get viewer() {
        return this._viewer;
    }

    /**
     * 场景
     * @memberof SceneManager.prototype
     * @readonly
     * @type {Scene}
     */
    get scene() {
        return this._scene;
    }

    /**
     * 开启抗锯齿
     * @function module:客户端视图管理.SceneManager.prototype.antiAliasing
     */
    antiAliasing() {
        if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
            this.viewer.resolutionScale = window.devicePixelRatio;
        }
        this.viewer.scene.fxaa = true;
        this.viewer.scene.postProcessStages.fxaa.enabled = true;
    }

    /**
     * 显示经纬度 高程 视角高度
     * @function module:客户端视图管理.SceneManager.prototype.showPosition
     * @param {Element|String} elementId 要显示的div的id
     * @param {Object} options 附加属性
     * @param {Boolean} [options.showHpr = false] 显示
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
        const that = this;
        let elementIdValue = elementId;
        const optionsParam = Cesium.defaultValue(options, {});
        const showHpr = Cesium.defaultValue(optionsParam.showHpr, false);
        const showSelectTileInfo = Cesium.defaultValue(optionsParam.showSelectTileInfo, false);
        const showViewLevelInfo = Cesium.defaultValue(optionsParam.showViewLevelInfo, false);
        let viewLevel = 0;
        let longitudeString = null;
        let latitudeString = null;
        let cameraHeight = null;
        let cartesian = new Cesium.Cartesian3();
        let height = null;
        const ellipsoid = this._ellipsoid;
        const tilesToRender = this.viewer.scene.globe._surface.tileProvider._tilesToRenderByTextureCount;
        let selectedTile;
        let lastScreenPos;

        function selectTile(e) {
            let selectedTileTmp;
            cartesian = that.viewer.scene.camera.pickEllipsoid(e, ellipsoid);
            if (Cesium.defined(cartesian)) {
                const cartographic = ellipsoid.cartesianToCartographic(cartesian);
                const tilesRendered = that.viewer.scene.globe._surface.tileProvider._tilesToRenderByTextureCount;
                for (let textureCount = 0; !selectedTileTmp && textureCount < tilesRendered.length; textureCount += 1) {
                    const tilesRenderedByTextureCount = tilesRendered[textureCount];
                    if (Cesium.defined(tilesRenderedByTextureCount)) {
                        for (let tileIndex = 0; !selectedTileTmp && tileIndex < tilesRenderedByTextureCount.length; tileIndex += 1) {
                            const tile = tilesRenderedByTextureCount[tileIndex];
                            if (Cesium.Rectangle.contains(tile.rectangle, cartographic)) {
                                selectedTileTmp = tile;
                            }
                        }
                    }
                }
            }
            return selectedTileTmp;
        }

        function updateViewLevel() {
            for (let i = 0; i < tilesToRender.length; i += 1) {
                if (tilesToRender[i]) {
                    for (let tileIndex = 0; tileIndex < tilesToRender[i].length; tileIndex += 1) {
                        if (Cesium.Rectangle.contains(tilesToRender[i][tileIndex].rectangle, that.viewer.camera.positionCartographic)) {
                            viewLevel = tilesToRender[i][tileIndex]._level;
                        }
                    }
                }
            }
        }

        function updateShowInfo(screenPos) {
            cartesian = that.viewer.getCartesian3Position(screenPos, cartesian);
            const { camera } = that.viewer;
            let longlatHeight = '';
            if (cartesian) {
                const cartographic = ellipsoid.cartesianToCartographic(cartesian);
                longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
                latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
                cameraHeight = Math.ceil(that.viewer.camera.positionCartographic.height);
                // height = Math.max(that.viewer.scene.globe.getHeight(cartographic), cartographic.height);
                height = cartographic.height;
                longlatHeight = `经度:${longitudeString.toFixed(4)}°，纬度:${latitudeString.toFixed(4)}°，海拔高度:${height.toFixed(0)}米，相机视角高度:${cameraHeight.toFixed(0)}米`;
            }
            let strHpr = '';
            if (showHpr) {
                strHpr = ` heading：${Cesium.Math.toDegrees(camera.heading).toFixed(1)} pitch：${Cesium.Math.toDegrees(camera.pitch).toFixed(1)} roll：${Cesium.Math.toDegrees(camera.roll).toFixed(1)}`;
            }
            let selectTileInfo = '';
            if (showSelectTileInfo && selectedTile) {
                selectTileInfo = `，瓦片X:${selectedTile.x}，瓦片Y:${selectedTile.y}，瓦片级别:${selectedTile.level}，`;
            }
            if (height === undefined || height < -7000) {
                height = 0;
            }
            let level = '';
            if (showViewLevelInfo) {
                level = `当前地图级别:${viewLevel}`;
            }
            const iHtml = longlatHeight + strHpr + selectTileInfo + level;
            document.getElementById(elementIdValue).innerHTML = iHtml;
        }

        if (elementId === undefined || elementId === null) {
            const elementPt = document.createElement('div');
            elementPt.className = 'mapgis-web-scene-coordinateClass';
            elementPt.id = 'mapgis-web-scene-coordinateDiv';
            const element = document.createElement('label');
            element.id = 'mapgis-web-scene-coordinate_location';
            elementIdValue = 'mapgis-web-scene-coordinate_location';
            const style1 = document.createElement('style');
            style1.innerHTML = '.mapgis-web-scene-coordinate_location {color: #F0EFEF; line-height: 30px; margin-left: 30%;bottom:0px;font-size: 80%;font:"雅黑";}';
            element.style = style1;
            elementPt.appendChild(element);
            this.viewer._element.appendChild(elementPt);
        }
        if (elementId !== undefined) {
            this.viewer.scene.globe.tileLoadProgressEvent.addEventListener(() => {
                updateViewLevel();
            });
            this.viewer.camera.changed.addEventListener(() => {
                updateViewLevel();
            });
            if (!Cesium.defined(this.screenSpaceMouseEventHandler)) {
                this.screenSpaceMouseEventHandler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas);
            }
            this.screenSpaceMouseEventHandler.setInputAction((movement) => {
                updateViewLevel();
                selectedTile = selectTile(movement.endPosition);
                updateShowInfo(movement.endPosition);
                lastScreenPos = movement.endPosition;
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            this.screenSpaceMouseEventHandler.setInputAction(() => {
                updateViewLevel();
                selectedTile = selectTile(lastScreenPos);
                updateShowInfo(lastScreenPos);
            }, Cesium.ScreenSpaceEventType.WHEEL);
        }
        return document.getElementById(elementIdValue);
    }

    /**
     * 跳转到
     * @function module:客户端视图管理.SceneManager.prototype.flyTo
     * @param  {Number} lon 经度
     * @param  {Number} lat 纬度
     * @param  {Number} heightParam  视角高度
     * @param  {Number} duration 跳转持续时间
     */
    flyTo(lon, lat, heightParam, duration) {
        const height = Cesium.defaultValue(heightParam, Math.ceil(this.viewer.camera.positionCartographic.height));
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            duration,
            orientation: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(-90),
                roll: Cesium.Math.toRadians(0)
            }
        });
    }

    /**
     * 跳转到
     * @function module:客户端视图管理.SceneManager.prototype.flyToEx
     * @param  {Number} lon 经度
     * @param  {Number} lon 纬度
     * @param  {Object} [options] 其他参数
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
            heading = Cesium.Math.toRadians(Cesium.defaultValue(options.heading, Cesium.Math.toRadians(0)));
            pitch = Cesium.Math.toRadians(Cesium.defaultValue(options.pitch, Cesium.Math.toRadians(-90)));
            roll = Cesium.Math.toRadians(Cesium.defaultValue(options.roll, Cesium.Math.toRadians(0)));
            duration = Cesium.defaultValue(options.duration, 1);
        } else {
            heading = Cesium.Math.toRadians(0);
            pitch = Cesium.Math.toRadians(-90);
            roll = Cesium.Math.toRadians(0);
            duration = 1.0;
        }
        if (height === null || height === '' || height === undefined) {
            const cameraHeight = Math.ceil(this.viewer.camera.positionCartographic.height);
            height = cameraHeight;
        }
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            duration,
            orientation: {
                heading,
                pitch,
                roll
            }
        });
    }

    /**
     * 通用跳转接口
     * @function module:客户端视图管理.SceneManager.prototype.flyToComm
     * @param  {Number} lon 经度
     * @param  {Number} lat 纬度
     * @param  {Number} heightParam  视角高度
     * @param  {Object} [options] 扩展参数 兼容原生
     */
    flyToComm(lon, lat, heightParam, options) {
        const height = Cesium.defaultValue(heightParam, Math.ceil(this.viewer.camera.positionCartographic.height));
        const flyOptions = {
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height)
        };
        if (Cesium.defined(options)) {
            Cesium.Object.extend(flyOptions, options);
        }
        this.viewer.camera.flyTo(flyOptions);
    }

    /**
     * 设置当前视图范围
     * @function module:客户端视图管理.SceneManager.prototype.setView
     * @param {Number} lon 经度
     * @param {Number} lat 纬度
     * @param {Number} height 高度
     * @param {Number} curHeading 绕垂直于地心的轴旋转的度数
     * @param {Number} curPitch   绕纬度线旋转度数
     * @param {Number} curRoll    绕经度线旋转度数
     */
    setView(lon, lat, height, curHeading, curPitch, curRoll) {
        this.viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            orientation: {
                heading: Cesium.Math.toRadians(curHeading),
                pitch: Cesium.Math.toRadians(curPitch),
                roll: Cesium.Math.toRadians(curRoll)
            }
        });
    }

    /**
     * 开启自转
     * @function module:客户端视图管理.SceneManager.prototype.openRotation
     */
    openRotation() {
        this.viewer.camera.flyHome(0);
        this.viewer.clock.multiplier = 3 * 60 * 60;
        this.viewer.scene.preRender.addEventListener(icrf);
        if (!this._shouldAnimate) {
            this.viewer.clock._shouldAnimate = true;
        }
    }

    /**
     * 关闭自转
     * @function module:客户端视图管理.SceneManager.prototype.closeRotation
     */
    closeRotation() {
        this.scene.preRender.removeEventListener(icrf);
        this.viewer.clock.multiplier = 1;
        this.viewer.clock._shouldAnimate = this._shouldAnimate;
        this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    }

    /**
     * 复位
     * @function module:客户端视图管理.SceneManager.prototype.goHome
     */
    goHome() {
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(104, 30, 15682725)
        });
    }

    /**
     * 切换场景模式
     * @function module:客户端视图管理.SceneManager.prototype.changeSceneMode
     * @param  {String} sceneMode 场景模式'3D', '2D','COLUMBUS_VIEW'(平面三维)
     * @param  {Number} [duration]  动画持续时间，<=0时，保持场景范围不变
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
            default:
                break;
        }
        const mDuraion = Cesium.defaultValue(duration, 2.0);
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
     * 视距放大，物体缩小
     * @function module:客户端视图管理.SceneManager.prototype.zoomOut
     */
    zoomOut() {
        const cameraHeight = this._ellipsoid.cartesianToCartographic(this.viewer.camera.position).height;
        this.viewer.camera.zoomOut(cameraHeight / 10);
    }

    /**
     * 视距缩小，物体放大
     * @function module:客户端视图管理.SceneManager.prototype.zoomIn
     */
    zoomIn() {
        const cameraHeight = this._ellipsoid.cartesianToCartographic(this.viewer.camera.position).height;
        this.viewer.camera.zoomIn(cameraHeight / 10);
    }

    /**
     * 修改场景的天空盒
     * @function module:客户端视图管理.SceneManager.prototype.changeSkyBox
     * @param {SkyBox} skybox 天空盒对象
     * @example
     * let skybox = new Cesium.SkyBox({
     *     sources : {
     *         positiveX : 'Assets/Textures/SkyBox2/front.jpg',
     *         negativeX : 'Assets/Textures/SkyBox2/back.jpg',
     *         positiveY : 'Assets/Textures/SkyBox2/left.jpg',
     *         negativeY : 'Assets/Textures/SkyBox2/right.jpg',
     *         positiveZ : 'Assets/Textures/SkyBox2/top.jpg',
     *         negativeZ : 'Assets/Textures/SkyBox2/down.jpg'
     *     }
     * });
     */
    changeSkyBox(skybox) {
        if (Cesium.defined(skybox)) {
            this.scene.skyBox = skybox;
            this.scene.skyAtmosphere.show = false;

            const frameState = this.scene._frameState;
            this.scene.skyBox.update(frameState);
        }
    }

    /**
     * 根据ID飞行到特定要素位置
     * @function module:客户端视图管理.SceneManager.prototype.flyToFeatureById
     * @param {Array<layer>} layerList 图层列表
     * @param {Number} id ID列表
     * @param {Object} [options] 其他参数
     * @param {Color} [options.colorHighlight] 跳转后指定ID对应的特定要素的高亮颜色
     * @param {Number} [options.heading] 相机参数heading
     * @param {Number} [options.pitch] 相机参数pitch
     * @param {Number} [options.range] 相机参数range
     * @param {Object} [options.offset] 相机偏移量，通过HeadingPitchRange控制三个变量heading, pitch, range
     */
    flyToFeatureById(layerList, id, options) {
        if (!Cesium.defined(layerList)) {
            return;
        }
        const optionsParam = Cesium.defaultValue(options, {});
        const that = this;
        let first = true;
        const colorHighlight = Cesium.defaultValue(optionsParam.colorHighlight, undefined);
        function flyToF(feature) {
            const maxPoint = feature.getProperty('maxPoint');
            const minPoint = feature.getProperty('minPoint');
            let min = new Cesium.Cartesian3(minPoint[0], -minPoint[2], minPoint[1]);
            let max = new Cesium.Cartesian3(maxPoint[0], -maxPoint[2], maxPoint[1]);
            const { transform } = feature.tileset.root;
            max = Cesium.Matrix4.multiplyByPoint(transform, max, max);
            min = Cesium.Matrix4.multiplyByPoint(transform, min, min);
            const heading = Cesium.defaultValue(optionsParam.heading, Cesium.Math.toRadians(0));
            const pitch = Cesium.defaultValue(optionsParam.pitch, Cesium.Math.toRadians(0));
            const range = Cesium.defaultValue(optionsParam.range, 0.0);
            let boundingSphere = new Cesium.BoundingSphere();
            boundingSphere = Cesium.BoundingSphere.fromCornerPoints(min, max, boundingSphere);
            that.viewer.camera.flyToBoundingSphere(boundingSphere, {
                offset: Cesium.defaultValue(optionsParam.offset, new Cesium.HeadingPitchRange(heading, pitch, range))
            });
            first = false;
        }

        function evaluateColorCallBack(feature) {
            const featureSpec = feature;
            if (first) {
                const title = featureSpec.getProperty('name');
                const values = title.split('_');
                const vlueNumber = parseInt(values[2], 10);
                if (vlueNumber === id && first) {
                    flyToF(featureSpec);
                    if (colorHighlight !== undefined) {
                        featureSpec.color = colorHighlight.clone();
                    }
                }
            }
            return featureSpec.color;
        }

        for (let i = 0; i < layerList.length; i += 1) {
            const tileset = layerList[i];
            // tileset.styleEngine.justSelect(true);
            tileset.style = new Cesium.Cesium3DTileStyle();
            tileset.style.color = {
                evaluateColor: evaluateColorCallBack
            };
        }
    }
}

CesiumZondy.Manager.SceneManager = SceneManager;
