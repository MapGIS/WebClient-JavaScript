import { CesiumZondy } from "../core/Base";

/**
 * @author 三维基础平台研发中心·周凌风
 * @class SceneManager
 * @category
 * @classdesc 视图功能管理类
 * @description 视图功能的创建与移除
 * @see
 */
export default class SceneManager {
    constructor(option) {
        this.viewer = Cesium.defaultValue(option.viewer, undefined);
        this.scene = this.viewer.scene;
        this.ellipsoid = this.viewer.scene.globe.ellipsoid;
        //是否支持键盘事件
        this.keyEventEnable = Cesium.defaultValue(option.keyEventEnable, true);
        let flags = {
            looking: false,
            rotateLeft: false,
            rotateRight: false,
            moveUp: false,
            moveDown: false,
            moveLeft: false,
            moveRight: false,
            goHome: false,
            wireFrame: false,
            showFPS: false,
        };
        let that = this;
        this.viewer.clock.onTick.addEventListener(function (clock) {
            //获取相机高度
            if (that.keyEventEnable) {
                let position = that.viewer.camera.position;
                let cameraHeight = that.viewer.scene.globe.ellipsoid.cartesianToCartographic(
                    position,
                ).height;
                let moveRate = cameraHeight / 40.0;
                if (flags.rotateLeft) {
                    that.viewer.camera.rotateLeft(0.01);
                }
                if (flags.rotateRight) {
                    that.viewer.camera.rotateRight(0.01);
                }
                if (flags.moveUp) {
                    that.viewer.camera.moveBackward(moveRate);
                }
                if (flags.moveDown) {
                    that.viewer.camera.moveForward(moveRate);
                }
                if (flags.moveLeft) {
                    that.viewer.camera.moveLeft(moveRate);
                }
                if (flags.moveRight) {
                    that.viewer.camera.moveRight(moveRate);
                }
                if (flags.goHome) {
                    that.viewer.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(
                            104,
                            30,
                            15682725,
                        ),
                    });
                }
                if (flags.wireFrame) {
                    let bShowWireframe =
                        that.viewer.scene.globe._surface.tileProvider._debug
                            .wireframe;
                    that.viewer.scene.globe._surface.tileProvider._debug.wireframe = !bShowWireframe;
                    flags.wireFrame = false;
                }
                if (flags.showFPS) {
                    let bShowFPS = that.viewer.scene.debugShowFramesPerSecond;
                    that.viewer.scene.debugShowFramesPerSecond = !bShowFPS;
                    flags.showFPS = false;
                }
            }
        });
    }

    ////====68====////
    /**
     * 显示经纬度 高程 视角高度
     *
     * @param  {Element|String} elementId 要显示的div的id
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
            false,
        );
        let showViewLevelInfo = Cesium.defaultValue(
            options.showViewLevelInfo,
            false,
        );
        let viewLevel = 0;
        let longitudeString = null;
        let latitudeString = null;
        let cameraHeight = null;
        let cartesian = new Cesium.Cartesian3();
        let height = null;
        let ellipsoid = this.ellipsoid;
        let tilesToRender = this.viewer.scene.globe._surface.tileProvider
            ._tilesToRenderByTextureCount; //获取层级
        let selectedTile;
        let lastScreenPos;

        function selectTile(e) {
            //获取瓦片
            let selectedTileTmp;
            let cartesian = that.viewer.scene.camera.pickEllipsoid(
                e,
                ellipsoid,
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
                                cartographic,
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
            //当每次瓦片和地形加载完毕时
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
                                that.viewer.camera.positionCartographic,
                            )
                        ) {
                            viewLevel = tilesToRender[i][tileIndex]._level;
                            //selectedTile = tilesToRender[i][tileIndex];
                        }
                    }
                }
            }
        }

        function updateShowInfo(screenPos) {
            //修改为带模型一起拾取
            cartesian = that.viewer.getCartesian3Position(screenPos, cartesian);
            let camera = that.viewer.camera;
            let longlatHeight = "";
            if (cartesian) {
                //updateViewLevel();
                //将笛卡尔坐标转换为地理坐标
                let cartographic = ellipsoid.cartesianToCartographic(cartesian);
                //将弧度转为度的十进制度表示
                longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
                latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
                //获取相机高度
                cameraHeight = Math.ceil(
                    that.viewer.camera.positionCartographic.height,
                );

                //获取高程
                //height = that.viewer.scene.globe.getHeight(cartographic);
                height = Math.max(
                    that.viewer.scene.globe.getHeight(cartographic),
                    cartographic.height,
                );
                longlatHeight =
                    "经度:" +
                    longitudeString.toFixed(4) +
                    "°，纬度:" +
                    latitudeString.toFixed(4) +
                    "°，海拔高度:" +
                    height.toFixed(0) +
                    "米" +
                    "，相机视角高度:" +
                    cameraHeight.toFixed(0) +
                    "米";
            }
            let strHpr = "";
            if (showHpr) {
                strHpr =
                    " heading：" +
                    Cesium.Math.toDegrees(camera.heading).toFixed(1) +
                    " pitch：" +
                    Cesium.Math.toDegrees(camera.pitch).toFixed(1) +
                    " roll：" +
                    Cesium.Math.toDegrees(camera.roll).toFixed(1);
            }
            //showSelectTileInfo = true;
            let selectTileInfo = "";
            if (showSelectTileInfo && selectedTile) {
                selectTileInfo =
                    "，瓦片X:" +
                    selectedTile.x +
                    "，瓦片Y:" +
                    selectedTile.y +
                    "，瓦片级别:" +
                    selectedTile.level +
                    "，";
            }
            if (height === undefined || height < -7000) {
                height = 0;
            }
            let level = ""; //'当前地图级别:'+that.viewer.scene.globe._surface._currentLevel;
            if (showViewLevelInfo) {
                level = "当前地图级别:" + viewLevel;
            }
            let iHtml = longlatHeight + strHpr + selectTileInfo + level;
            document.getElementById(elementId).innerHTML = iHtml;
        }

        if (elementId === undefined || elementId === null) {
            let elementPt = document.createElement("div");
            elementPt.className = "coordinateClass";
            elementPt.id = "coordinateDiv";
            let element = document.createElement("label");
            elementId = element.id = "coordinate_location";
            let style1 = document.createElement("style");
            style1.innerHTML =
                '.coordinate_location {color: #F0EFEF; line-height: 30px; margin-left: 30%;bottom:0px;font-size: 80%;font:"雅黑";}';
            element.style = style1;
            elementPt.appendChild(element);
            this.viewer._element.appendChild(elementPt);
        }
        if (elementId !== undefined) {
            this.viewer.scene.globe.tileLoadProgressEvent.addEventListener(
                function (datalength) {
                    //获取自上一个渲染帧以来更改tile加载队列的长度时引发的事件。当加载队列为空时，当前视图的所有地形和图像都已加载。
                    updateViewLevel();
                },
            );
            this.viewer.camera.changed.addEventListener(function () {
                updateViewLevel();
            });
            // // 定义当前场景的画布元素的事件处理
            // if (!defined(this.screenSpaceEventHandler)) {
            //     this.screenSpaceEventHandler = new ScreenSpaceEventHandler(this.scene.canvas);
            // }
            // 定义当前场景的画布元素的事件处理
            if (!Cesium.defined(this.screenSpaceMouseEventHandler)) {
                this.screenSpaceMouseEventHandler = new Cesium.ScreenSpaceEventHandler(
                    this.scene.canvas,
                );
            }
            //设置鼠标移动事件的处理函数，这里负责监听x,y坐标值变化
            this.screenSpaceMouseEventHandler.setInputAction(function (
                movement,
            ) {
                updateViewLevel();
                selectedTile = selectTile(movement.endPosition);
                updateShowInfo(movement.endPosition);
                lastScreenPos = movement.endPosition;
            },
                Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            //设置鼠标移动事件的处理函数，这里负责监听x,y坐标值变化
            this.screenSpaceMouseEventHandler.setInputAction(function (
                movement,
            ) {
                updateViewLevel();
                selectedTile = selectTile(lastScreenPos);
                updateShowInfo(lastScreenPos);
            },
                Cesium.ScreenSpaceEventType.WHEEL);
        }
        return document.getElementById(elementId);
    }

    ////====69,70,71====////
    /**
     * 跳转到
     * @param  {Number} lon 经度
     * @param  {Number} lon 纬度
     * @param  {Number} height  视角高度
     * @param  {Number} duration 跳转持续时间
     */
    flyTo(lon, lat, height, duration) {
        if (height === null || height === "" || height === undefined) {
            let cameraHeight = Math.ceil(
                this.viewer.camera.positionCartographic.height,
            );
            height = cameraHeight;
        }
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            duration: duration,
            orientation: {
                heading: Cesium.Math.toRadians(0), //0 //绕垂直于地心的轴旋转 ,相当于头部左右转
                pitch: Cesium.Math.toRadians(-90), ///-90  //绕经度线旋转， 相当于头部上下
                roll: Cesium.Math.toRadians(0), //0         //绕纬度线旋转 ，面对的一面瞬时针转
            },
        });
    }

    /**
     * 跳转到
     * @param  {Number} lon 经度
     * @param  {Number} lon 纬度
     * @param  {Object} [options] 跳转持续时间
     * @param  {Number} [options.height]视角高度
     * @param  {Number} [options.duration]持续时间
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
                Cesium.defaultValue(options.heading, Cesium.Math.toRadians(0)),
            );
            pitch = Cesium.Math.toRadians(
                Cesium.defaultValue(options.pitch, Cesium.Math.toRadians(-90)),
            );
            roll = Cesium.Math.toRadians(
                Cesium.defaultValue(options.roll, Cesium.Math.toRadians(0)),
            );
            duration = Cesium.defaultValue(options.duration, 1);
        } else {
            heading = Cesium.Math.toRadians(0);
            pitch = Cesium.Math.toRadians(-90);
            roll = Cesium.Math.toRadians(0);
            duration = 1.0;
        }
        if (height === null || height === "" || height === undefined) {
            let cameraHeight = Math.ceil(
                this.viewer.camera.positionCartographic.height,
            );
            height = cameraHeight;
        }
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            duration: duration,
            orientation: {
                heading: heading, //0 //绕垂直于地心的轴旋转 ,相当于头部左右转
                pitch: pitch, ///-90  //绕经度线旋转， 相当于头部上下
                roll: roll, //0         //绕纬度线旋转 ，面对的一面瞬时针转
            },
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
        if (height === null || height === "" || height === undefined) {
            let cameraHeight = Math.ceil(
                this.viewer.camera.positionCartographic.height,
            );
            height = cameraHeight;
        }
        let flyOptions = {
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
        };
        if (Cesium.defined(options)) {
            Cesium.Object.extend(flyOptions, options);
        }
        this.viewer.camera.flyTo(flyOptions);
    }

    ////====72,73====////
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
        // 使视角到达某一地点
        //设置镜头位置与方向
        this.viewer.camera.setView({
            //镜头的经纬度、高度。镜头默认情况下，在指定经纬高度俯视（pitch=-90）地球
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            //下面的几个方向正好反映默认值
            heading: Cesium.Math.toRadians(curHeading), //0 //绕垂直于地心的轴旋转
            pitch: Cesium.Math.toRadians(curPitch), ///-90  //绕纬度线旋转
            roll: Cesium.Math.toRadians(curRoll), //0         //绕经度线旋转
        });
    }

    /**
     *
     * @param {*} scene
     * @param {*} time
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

    ////====74,75====////
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

    ////====76,77====////
    /**
     * 复位
     * @returns {}
     */
    goHome() {
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(104, 30, 15682725),
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
            case "3D":
                mSceneMode = Cesium.SceneMode.SCENE3D;
                break;
            case "COLUMBUS_VIEW":
                mSceneMode = Cesium.SceneMode.COLUMBUS_VIEW;
                break;
            case "2D":
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

    ////====78,79====////
    /**
     * 放大
     */
    zoomOut() {
        let cameraHeight = this.ellipsoid.cartesianToCartographic(
            this.viewer.camera.position,
        ).height;
        this.viewer.camera.zoomOut(cameraHeight / 10);
    }

    /**
     * 缩小
     */
    zoomIn() {
        let cameraHeight = this.ellipsoid.cartesianToCartographic(
            this.viewer.camera.position,
        ).height;
        this.viewer.camera.zoomIn(cameraHeight / 10);
    }

    ////====80====////
    /**
     * 修改场景的天空盒
     * @param  {SkyBox} skybox 天空和对象
     * @example
     *let skybox = new Cesium.SkyBox({
     *                    sources : {
     *                      positiveX : 'Mapgis/MapgisPlugin/Assets/Textures/SkyBox2/front.jpg',
     *                      negativeX : 'Mapgis/MapgisPlugin/Assets/Textures/SkyBox2/back.jpg',
     *                      positiveY : 'Mapgis/MapgisPlugin/Assets/Textures/SkyBox2/left.jpg',
     *                      negativeY : 'Mapgis/MapgisPlugin/Assets/Textures/SkyBox2/right.jpg',
     *                      positiveZ : 'Mapgis/MapgisPlugin/Assets/Textures/SkyBox2/top.jpg',
     *                      negativeZ : 'Mapgis/MapgisPlugin/Assets/Textures/SkyBox2/bottom.jpg'
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

    ////====81====////
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
            let maxPoint = feature.getProperty("maxPoint");
            let minPoint = feature.getProperty("minPoint");
            //这里注意 存储的yz是反的 并且原始y 进行了取反
            let min = new Cesium.Cartesian3(
                minPoint[0],
                -minPoint[2],
                minPoint[1],
            );
            let max = new Cesium.Cartesian3(
                maxPoint[0],
                -maxPoint[2],
                maxPoint[1],
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
                boundingSphere,
            );
            that.viewer.camera.flyToBoundingSphere(boundingSphere, {
                offset: Cesium.defaultValue(
                    options.offset,
                    new Cesium.HeadingPitchRange(heading, pitch, range),
                ),
            });
            for (let i = 0; i < layerList.length; ++i) {
                let tileset = layerList[i];
                tileset.style = undefined;
                tileset.styleEngine.justSelect(false, true); //这个一定要有
            }
            first = false;
        }

        function evaluateColorCallBack(feature, result) {
            //let bid = feature.getProperty('batchId');
            if (first) {
                let title = feature.getProperty("name");
                let values = title.split("_");
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
                evaluateColor: evaluateColorCallBack,
            };
        }
    }
}

CesiumZondy.Manager.SceneManager = SceneManager;
