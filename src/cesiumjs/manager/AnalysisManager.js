import { CesiumZondy } from "../core/Base";

let explosionOption = {
    directions: [],
};
/**
 *
 * @param {*} param
 */
function clockT(param) {
    var children = Cesium.defaultValue(explosionOption.children, undefined);
    var isAxis = explosionOption.isAxis;
    if (!Cesium.defined(children)) {
        return undefined;
    }
    var distance = Cesium.defaultValue(explosionOption.distance, 50); // 默认爆炸距离为 50 米
    var matrixChild = undefined;
    var viewer = explosionOption.viewer;
    explosionOption.deltaDistance += explosionOption.speed;
    if (isAxis) {
        //轴向爆炸
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            //判断该child是否移动结束
            var distance = explosionOption.distances[i];
            if (explosionOption.deltaDistance > distance) {
                break;
            }
            matrixChild = child.transform;
            var directionTemp = explosionOption.directions[i].clone();
            // 沿射线方向移动距离
            // Cartesian3.multiplyByScalar(directionTemp, explosionOption.deltaDistance, directionTemp);
            Cesium.Cartesian3.multiplyByScalar(
                directionTemp,
                explosionOption.speed,
                directionTemp,
            ); //zlf
            // Matrix4.fromTranslation(directionTemp, matrixChild);
            //zlf
            matrixChild[12] += directionTemp.x;
            matrixChild[13] += directionTemp.y;
            matrixChild[14] += directionTemp.z;
            // 设置矩阵
            child.transform = matrixChild.clone();
        }
        if (explosionOption.deltaDistance > explosionOption.maxDistances) {
            viewer.clock.onTick.removeEventListener(clockT);
        }
    } else {
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            matrixChild = child.transform;
            var directionTemp = explosionOption.directions[i].clone();
            // 沿射线方向移动距离
            // Cartesian3.multiplyByScalar(directionTemp, explosionOption.deltaDistance, directionTemp);
            Cesium.Cartesian3.multiplyByScalar(
                directionTemp,
                explosionOption.speed,
                directionTemp,
            ); //zlf
            // Matrix4.fromTranslation(directionTemp, matrixChild);
            matrixChild[12] += directionTemp.x;
            matrixChild[13] += directionTemp.y;
            matrixChild[14] += directionTemp.z;
            // 设置矩阵
            child.transform = matrixChild.clone();
        }
        if (explosionOption.deltaDistance > distance) {
            viewer.clock.onTick.removeEventListener(clockT);
        }
    }
}
/**
 * @author 三维基础平台研发中心·周凌风
 * @class AnalysisManager
 * @category
 * @classdesc 分析功能管理类
 * @description 分析功能的创建与移除
 * @see
 */
export default class AnalysisManager {
    constructor(option) {
        this.viewer = Cesium.defaultValue(option.viewer, undefined);
        this.scene = this.viewer.scene;
    }

    ////====82,83====////已完成
    /**
     * 创建热力图
     * @param  {object} bounds   ：WGS84 bounding box {north, east, south, west}
     * @param  {Number} maxValue 最大值
     * @param  {Number} minValue 最小值
     * @param  {Array[]} data  Array<[{'x':,'y':,'value':}]>
     * @returns {object}   热力图实例
     */
    createHeatMap(bounds, minValue, maxValue, data, options) {
        let heatMap = Cesium.CesiumHeatmap.create(this.viewer, bounds, options);
        heatMap.setWGS84Data(minValue, maxValue, data);
        return heatMap;
    }

    /**
     * 移除热力图
     * @param {object} heatmap 热力图对象
     */
    removeHeatMap(heatmap) {
        heatmap.removeLayer();
    }

    ////====84,85,86,87====////已完成
    /**
     * 模型漫游
     * @param  {string} modelURL  模型url
     * @param  {Array[]} positionArr 漫游线路节点坐标数组 Array<[x,y]>
     * @param  {bool} isShowPath 是否显示线路和节点
     * @param  {Number} clockFrequency 漫游时钟频率
     * @returns {Array}  entities 模型对象Array<entity>
     */
    cruiseModel(modelURL, positionArr, isShowPath, clockFrequency) {
        let resultEntities = [];
        let start = Cesium.JulianDate.now();
        let seconds =
            (positionArr.length - 1) * Cesium.defaultValue(clockFrequency, 10);
        let stop = Cesium.JulianDate.addSeconds(
            start,
            seconds,
            new Cesium.JulianDate(),
        );
        this.viewer.clock.startTime = start.clone();
        this.viewer.clock.stopTime = stop.clone();
        this.viewer.clock.currentTime = start.clone();
        this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
        this.viewer.clock.multiplier = 10;
        for (let i = 0; i < positionArr.length; i++) {
            let position_t = Cesium.Cartesian3.fromDegrees(
                positionArr[i][0],
                positionArr[i][1],
            );
            let pntEntity = this.viewer.entities.add({
                position: position_t,
                point: {
                    pixelSize: 8,
                    color: Cesium.Color.TRANSPARENT,
                    outlineColor: Cesium.Color.YELLOW,
                    outlineWidth: 3,
                },
                show: Cesium.defaultValue(isShowPath, true),
            });
            resultEntities.push(pntEntity);
        }
        let position = this.calculatePositionSamples(
            positionArr,
            start,
            clockFrequency,
        );
        let modelEntity = this.viewer.entities.add({
            availability: new Cesium.TimeIntervalCollection([
                new Cesium.TimeInterval({
                    start: start,
                    stop: stop,
                }),
            ]),
            position: position,
            orientation: new Cesium.VelocityOrientationProperty(position),

            model: {
                uri: modelURL,
                minimumPixelSize: 64,
            },
            path: {
                resolution: 1,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.1,
                    color: Cesium.Color.YELLOW,
                }),
                width: 10,
                show: Cesium.defaultValue(isShowPath, true),
            },
        });
        resultEntities.push(modelEntity);
        return resultEntities;
    }

    /**
     *
     * @param {*} positions 点数组
     * @param {*} startTime 起始时间
     * @param {*} multiplier 乘数
     */
    calculatePositionSamples(positions, startTime, multiplier) {
        if (positions !== undefined) {
            if (positions.constructor === Array) {
                let property = new Cesium.SampledPositionProperty();
                for (let since = 0; since < positions.length; since++) {
                    property.addSample(
                        Cesium.JulianDate.addSeconds(
                            startTime,
                            multiplier * since,
                            new Cesium.JulianDate(),
                        ),
                        Cesium.Cartesian3.fromDegrees(
                            positions[since][0],
                            positions[since][1],
                        ),
                    );
                }
                return property;
            }
        }
    }

    /**
     * 清除模型漫游
     * @param {*} modelEntities 模型实例
     */
    clearCruiseModel(modelEntities) {
        if (modelEntities.constructor === Array) {
            for (let i = modelEntities.length - 1; i >= 0; i--) {
                this.viewer.entities.remove(modelEntities[i]);
            }
        }
    }
    /**
     * 开始模型漫游
     */
    startCruiseModel() {
        this.viewer.clock.shouldAnimate = true;
    }
    /**
     * 结束模型漫游
     */
    stopCruiseModel() {
        this.viewer.clock.shouldAnimate = false;
    }

    ////====88====////已完成
    /**
     * 开挖
     * @param {Object} option.tileSet
     * 开挖面的形状
     * @param {Object} option.planes
     * 裁剪面材质
     * @param {Object} option.material
     * 边界线颜色
     * @param {Object} option.edgeColor
     * 边界线宽度
     * @param {Object} option.edgeWidth
     * 裁减法线方向，默认值为 false
     * @param {Object} option.unionClippingRegions
     * 开挖面定位点经度
     * @param {Object} option.longitude
     * 开挖面定位点纬度
     * @param {Object} option.latitude
     * 开挖面定位点高度
     * @param {Object} option.height
     */
    createExcavateAnalysis(option) {
        if (!Cesium.defined(option.tileSet) || !Cesium.defined(option.planes)) {
            return undefined;
        }
        let tileSet = option.tileSet;
        let planes = option.planes;
        let material = Cesium.defaultValue(
            option.material,
            Cesium.Color.WHITE.withAlpha(0.02),
        );
        let edgeColor = Cesium.defaultValue(option.edgeColor, Cesium.Color.RED);
        let edgeWidth = Cesium.defaultValue(option.edgeWidth, 0);
        let unionClippingRegions = Cesium.defaultValue(
            option.unionClippingRegions,
            false,
        );
        // 传入经纬度定位值
        let longitude = option.longitude;
        let latitude = option.latitude;
        let height = Cesium.defaultValue(option.height, 0.0);

        // 图层所使用的的旋转、缩放、平移矩阵
        // bug:tileset没有root
        let transform = tileSet._root.transform;
        // 获取旋转矩阵
        let rotation = new Cesium.Matrix3();
        Cesium.Matrix4.getRotation(transform, rotation);
        // 获取缩放比
        let scale = new Cesium.Cartesian3();
        Cesium.Matrix4.getScale(transform, scale);
        // 获取中心点位置
        let center = new Cesium.Cartesian3();
        Cesium.Matrix4.getTranslation(transform, center);

        let modelMatrix = transform.clone();
        // 根据经纬度给剖切面重算定位矩阵
        if (Cesium.defined(longitude) && Cesium.defined(latitude)) {
            modelMatrix = this.getTransForm(
                center,
                longitude,
                latitude,
                height,
            );
        }

        tileSet.clippingPlanes = new Cesium.ClippingPlaneCollection({
            modelMatrix: modelMatrix,
            planes: planes,
            edgeColor: edgeColor,
            edgeWidth: edgeWidth,
            unionClippingRegions: unionClippingRegions,
        });

        let planeEntityArray = [];
        let radius = tileSet.boundingSphere.radius;
        for (let i = 0; i < planes.length; ++i) {
            let planeEntity = this.viewer.entities.add({
                position: center,
                plane: {
                    dimensions: new Cesium.Cartesian2(
                        radius * 2.5,
                        radius * 2.5,
                    ),
                    material: material,
                },
            });
            planeEntityArray.push(planeEntity);
        }

        return {
            tileSet: tileSet,
            planes: planeEntityArray,
        };
    }

    //zlf 添加设置动态开挖的函数
    /**
     * 开始动态开挖
     * @param {*} option.planetEntity
     * @param {*} option.distance
     * @param {*} option.planes
     * @param {*} option.transform
     */
    startDynamicExcavate(option) {
        let planetEntity = option.planetEntity;
        let distance = option.distance;
        let planes = option.planes;
        let transform = option.transform;

        let scratchPlane = new Cesium.ClippingPlane(
            Cesium.Cartesian3.UNIT_X,
            0.0,
        );
        planetEntity.plane.plane = new Cesium.CallbackProperty(function(date) {
            for (let i = 0; i < planes.length; i++) {
                if (i === planes.length - 1) {
                    let plane = planes[i];
                    plane.distance = distance;
                    Cesium.Plane.transform(plane, transform, scratchPlane);
                }
            }
        }, false);
    }

    /**
     *
     * @param {*} center
     * @param {*} lo
     * @param {*} la
     * @param {*} height
     */
    getTransForm(center, lo, la, height) {
        let position1 = Cesium.Cartographic.toCartesian(
            new Cesium.Cartographic.fromDegrees(lo, la, height),
        );

        let sub = new Cesium.Cartesian3();
        Cesium.Cartesian3.subtract(center, position1, sub);
        // 这里指定开挖深度
        sub.z = height;

        let modelMatrix = new Cesium.Matrix4();
        Cesium.Matrix4.fromTranslation(sub, modelMatrix);

        return modelMatrix;
    }

    ////====89====////
    /**
     * 裁剪
     * @param {\} positions
     */
    getClippingPlanes(positions) {
        if (!positions) {
            return;
        }
        let pointsLength = positions.length;
        if (pointsLength < 2) {
            return;
        }
        // 为每个剪裁平面创建中心点
        let clippingPlanes = [];
        for (let i = 0; i < pointsLength; ++i) {
            let nextIndex = (i + 1) % pointsLength;
            let midpoint = Cesium.Cartesian3.add(
                positions[i],
                positions[nextIndex],
                new Cesium.Cartesian3(),
            );
            midpoint = Cesium.Cartesian3.multiplyByScalar(
                midpoint,
                0.5,
                midpoint,
            );
            let up = Cesium.Cartesian3.normalize(
                midpoint,
                new Cesium.Cartesian3(),
            );
            let right = Cesium.Cartesian3.subtract(
                positions[nextIndex],
                midpoint,
                new Cesium.Cartesian3(),
            );
            right = Cesium.Cartesian3.normalize(right, right);
            let normal = Cesium.Cartesian3.cross(
                right,
                up,
                new Cesium.Cartesian3(),
            );
            normal = Cesium.Cartesian3.normalize(normal, normal);
            // 假设平面在原点计算距离
            let originCenteredPlane = new Cesium.Plane(normal, 0.0);
            let distance = Cesium.Plane.getPointDistance(
                originCenteredPlane,
                midpoint,
            );
            clippingPlanes.push(new Cesium.ClippingPlane(normal, distance));
        }
        return clippingPlanes;
    }

    ////====90,91====//// 已完成
    /**
     * 动态剖切
     * @param {Object} tileSet
     * @param {Object} planes
     * @param {Boolean} interaction 交互
     */
    createDynamicCutting(tileSets, planes, otherOptions) {
        if (!Cesium.defined(tileSets) && tileSets.length > 0) {
            return;
        }
        let material = Cesium.Color.WHITE.withAlpha(0.02);
        let interaction = false;
        let distance = 1;
        if (Cesium.defined(otherOptions)) {
            material = Cesium.defaultValue(otherOptions.color, material);
            interaction = Cesium.defaultValue(otherOptions.interaction, false);
            distance = Cesium.defaultValue(otherOptions.distance, 1);
        }
        let that = this;
        let cutPlanes = [];
        for (let j = 0; j < tileSets.length; ++j) {
            let tileSet = tileSets[j];
            tileSet.clippingPlanes = new Cesium.ClippingPlaneCollection({
                planes: planes,
                edgeColor: Cesium.Color.RED,
                edgeWidth: 0,
                unionClippingRegions: false,
            });
            let radius = tileSet.boundingSphere.radius;
            // 图层所使用的的旋转、缩放、平移矩阵
            let transform = tileSet._root.transform;
            // 获取中心点位置
            let center = new Cesium.Cartesian3();
            Cesium.Matrix4.getTranslation(transform, center);
            for (let i = 0; i < planes.length; ++i) {
                let planeEntity = this.viewer.entities.add({
                    position: center,
                    plane: {
                        dimensions: new Cesium.Cartesian2(
                            radius * 250,
                            radius * 2.5,
                        ),
                        material: material,
                    },
                });
                cutPlanes.push(planeEntity);
            }
        }
        let selectedPlane;
        let downHandler;
        if (interaction) {
            downHandler = new Cesium.ScreenSpaceEventHandler(
                this.viewer.scene.canvas,
            );
            downHandler.setInputAction(function(movement) {
                let pickedObject = that.scene.pick(movement.position);
                if (
                    Cesium.defined(pickedObject) &&
                    Cesium.defined(pickedObject.id) &&
                    Cesium.defined(pickedObject.id.plane)
                ) {
                    selectedPlane = pickedObject.id.plane;
                    selectedPlane.material = Cesium.Color.WHITE.withAlpha(
                        0.0001,
                    );
                    selectedPlane.outlineColor = Cesium.Color.WHITE;
                    that.scene.screenSpaceCameraController.enableInputs = false;
                }
            }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);
            downHandler.setInputAction(function() {
                if (Cesium.defined(selectedPlane)) {
                    selectedPlane.material = material;
                    selectedPlane.outlineColor = material;
                    selectedPlane = undefined;
                }

                that.scene.screenSpaceCameraController.enableInputs = true;
            }, Cesium.ScreenSpaceEventType.MIDDLE_UP);
            downHandler.setInputAction(function(movement) {
                if (defined(selectedPlane)) {
                    let deltaY =
                        movement.startPosition.y - movement.endPosition.y;
                    distance += deltaY * 8;
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        }
        return {
            tileSets: tileSets,
            planes: cutPlanes,
            handler: downHandler,
        };
    }

    //zlf 添加动态剖切的函数
    /**
     * 开始动态剖切
     * @param {*} option.planetEntity
     * @param {*} option.distance
     * @param {*} option.plane
     * @param {*} option.transform
     */
    startDynamicCutting(option) {
        let planetEntity = option.planetEntity;
        let distance = option.distance;
        let plane = option.plane;
        let transform = option.transform;

        let scratchPlane = new Cesium.ClippingPlane(
            Cesium.Cartesian3.UNIT_X,
            0.0,
        );
        planetEntity.plane.plane = new Cesium.CallbackProperty(function(date) {
            plane.distance = distance;
            return Cesium.Plane.transform(plane, transform, scratchPlane);
        }, false);
    }

    deleteDynamicCutting(dynaObject) {
        if (!Cesium.defined(dynaObject)) {
            return;
        }
        let handler = dynaObject.handler;
        let planes = dynaObject.planes;
        let tileSets = dynaObject.tileSets;
        if (Cesium.defined(dynaObject.tileSet)) {
            if (Cesium.defined(tileSets)) {
                tileSets.push(dynaObject.tileSet);
            } else {
                tileSets = [dynaObject.tileSet];
            }
        }
        for (let i = 0; i < planes.length; ++i) {
            let plane = planes[i];
            plane.distance = 0;
            this.viewer.entities.remove(plane);
        }
        if (Cesium.defined(tileSets)) {
            for (let j = 0; j < tileSets.length; ++j) {
                let tileSet = tileSets[j];
                tileSet.clippingPlanes.removeAll();
            }
        }
        if (Cesium.defined(handler)) {
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MIDDLE_DOWN);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MIDDLE_UP);
        }
    }

    ////====92,93,94====////已完成
    /**高亮
     * @param {Array<layer>} layerList 图层列表
     * @param {Array<id>} idList id列表
     * @param {Object} options 扩展属性
     * @param {Color} [options.color = new Cesium.Color(1.0,0,0,0.5)] 高亮颜色
     * @param {Cesium3DTileColorBlendMode}[options.colorBlendMode =  Cesium.Cesium3DTileColorBlendMode.HIGHLIGHT] 高亮模式
     * @param {Number}[options.colorBlendAmount =  0.5] 混合系数
     * @param {Boolean}[options.applyForLayer =  false] 是否应用至图层
     * @param {Color} [options.negate = true] 是否取反 ——意思是除了id列表中的要素应用color
     * @param {Color} [options.negateColor = new Cesium.Color.WHITE] 取反的颜色  只有在negate=true 的时候才起作用
     * @param {String} [options.style='EdgeHighlight'] 高亮模式//'EdgeHighlight'高亮+描边   'Edge'//描边
     * @param {Color}[options.edgeColor=new Cesium.Color(0, 0, 1,1.0)]//描边颜色 默认红色
     *
     */
    startCustomDisplay(layerList, idList, otherOptions) {
        if (!Cesium.defined(layerList) || !Cesium.defined(idList)) {
            return;
        }
        if (!Cesium.defined(otherOptions)) {
            otherOptions = {};
        }
        let that = this;
        let colorUse = Cesium.defaultValue(
            otherOptions.color,
            new Cesium.Color(1, 0, 0, 0.5),
        );
        let edgeColorUse = Cesium.defaultValue(
            otherOptions.edgeColor,
            new Cesium.Color(1, 0, 0, 1.0),
        );
        let negate = Cesium.defaultValue(otherOptions.negate, false);
        let negateColor = Cesium.defaultValue(
            otherOptions.negateColor,
            Cesium.Color.WHITE,
        );
        let applyForLayer = Cesium.defaultValue(
            otherOptions.applyForLayer,
            false,
        );
        let style = Cesium.defaultValue(otherOptions.style, "");
        let colorBlendMode = Cesium.defaultValue(
            otherOptions.colorBlendMode,
            Cesium.Cesium3DTileColorBlendMode.HIGHLIGHT,
        );
        let colorBlendAmount = Cesium.defaultValue(
            otherOptions.colorBlendAmount,
            0.5,
        );
        if (style === "Edge" && !Cesium.defined(this._edgeDetectionStageCD)) {
            this._edgeDetectionStageCD = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
            this._edgeDetectionStageCD.uniforms.color = edgeColorUse; //Color.BLUE;
            this._edgeDetectionStageCD.uniforms.length = 0.05;
            this._edgeDetectionStageCD.selected = [];
            this._silhouetteStageCD = Cesium.PostProcessStageLibrary.createSilhouetteStage(
                [this._edgeDetectionStageCD],
            );
            this._viewer.scene.postProcessStages.add(this._silhouetteStageCD);
        }

        function evaluateColorCallBack(feature, result) {
            var title = feature.getProperty("name");
            var layerNow = feature.tileset;
            var values = title.split("_");
            var vlueNumber = parseInt(values[2]);
            var color = feature.color;
            colorUse = layerNow.color;
            if (style === "EdgeHighlight" || style === "Edge") {
                if (!defined(layerNow._edgeDetectionfeatureList)) {
                    layerNow._edgeDetectionfeatureList = [];
                }
                if (
                    title !== undefined &&
                    title !== null &&
                    idList.indexOf(vlueNumber) > -1
                ) {
                    if (
                        layerNow._edgeDetectionfeatureList.indexOf(feature) < 0
                    ) {
                        layerNow._edgeDetectionfeatureList.push(feature);
                    }
                    that._edgeDetectionStageCD.selected =
                        layerNow._edgeDetectionfeatureList;
                }
                if (style === "Edge") {
                    return color;
                }
            }
            if (applyForLayer) {
                color = colorUse;
            } else if (!layerNow.negate) {
                if (
                    title !== undefined &&
                    title !== null &&
                    idList.indexOf(vlueNumber) > -1
                ) {
                    color = colorUse;
                } else {
                    color = negateColor; //feature.color;
                }
            } else if (
                title !== undefined &&
                title !== null &&
                idList.indexOf(vlueNumber) > -1
            ) {
                color = negateColor; //Color.WHITE;
            } else {
                color = colorUse; //feature.color;
            }
            return Cesium.Color.clone(color, result);
        }

        for (let i = 0; i < layerList.length; ++i) {
            let layer = layerList[i];
            layer.negate = negate;
            layer.color = colorUse;
            layer.colorBlendMode = colorBlendMode;
            layer.colorBlendAmount = colorBlendAmount;
            layer.style = new Cesium.Cesium3DTileStyle();
            layer.style.color = {
                evaluateColor: evaluateColorCallBack,
            };
        }
    }
    /**
     * 停止全部高亮
     */
    stopCustomDisplay(layerList) {
        if (!Cesium.defined(layerList)) {
            return;
        }
        for (let i = 0; i < layerList.length; ++i) {
            let tileset = layerList[i];
            tileset.style = undefined;
        }
        if (
            Cesium.defined(this._edgeDetectionStageCD) &&
            Cesium.defined(this._silhouetteStageCD)
        ) {
            this._viewer.scene.postProcessStages.remove(
                this._silhouetteStageCD,
            );
            //this._edgeDetectionStageCD.destroy();
            this._edgeDetectionStageCD = undefined;
            this._silhouetteStageCD.destroy();
            this._silhouetteStageCD = undefined;
        }
        //hys注意这里需要强制刷新一帧保证停止后数据确实回复正常 不然可能会由于前面没来的及恢复 导致 之前被停止高亮的id 没有及时刷新颜色保留了高亮的颜色
        //从而使得之前的id 和现在的都高亮了
        this.viewer.scene.render();
    }

    /**
     * 根据id停止高亮
     */
    stopCustomDisplayByIds(layerList, idList, otherOptions) {
        if (!Cesium.defined(layerList) || !Cesium.defined(idList)) {
            return;
        }
        let that = this;

        function evaluateColorCallBack(feature, result) {
            //let bid = feature.getProperty('batchId');
            let title = feature.getProperty("name");
            let values = title.split("_");
            let layerNow = feature.tileset;
            let vlueNumber = parseInt(values[2]);
            let color = feature.color; //new Color();
            if (
                title !== undefined &&
                title !== null &&
                idList.indexOf(vlueNumber) > -1 &&
                layerNow._edgeDetectionfeatureList
            ) {
                let feIndex = layerNow._edgeDetectionfeatureList.indexOf(
                    feature,
                );
                if (feIndex > -1) {
                    layerNow._edgeDetectionfeatureList.splice(feIndex, 1);
                    that._edgeDetectionStageCD.selected =
                        layerNow._edgeDetectionfeatureList;
                }
                color = Cesium.Color.WHITE; //colorUse;
            }
            return Cesium.Color.clone(color, result);
        }

        for (let i = 0; i < layerList.length; ++i) {
            let tileset = layerList[i];
            tileset.style = new Cesium.Cesium3DTileStyle();
            tileset.style.color = {
                evaluateColor: evaluateColorCallBack,
            };
        }
    }

    ////====95,96,97====////已完成
    /**
     * 对包围盒中心点进行排序，并调整对应的children数组顺序
     * @param {*} sortGeometryList
     * @param {*} fZmaxCod
     */
    SortByBoxZValue(sortGeometryList, fZmaxCod) {
        let i, j;
        let tempDotStru;
        let tempFZmaxCod;
        let len = sortGeometryList.length;
        for (i = 1; i < len; i++) {
            for (j = len - 1; j >= i; j--) {
                if (fZmaxCod[j] > fZmaxCod[j - 1]) {
                    tempFZmaxCod = fZmaxCod[j - 1];
                    fZmaxCod[j - 1] = fZmaxCod[j];
                    fZmaxCod[j] = tempFZmaxCod;

                    tempDotStru = sortGeometryList[j - 1];
                    sortGeometryList[j - 1] = sortGeometryList[j];
                    sortGeometryList[j] = tempDotStru;
                }
            }
        }
    }

    /**
     * 对于轴向爆炸，根据方向XYZ的值设定对应轴向的type
     */
    getAxis() {
        let axis = 0;
        let direction = explosionOption.direction;
        if (direction.x === 1.0 || direction.x === -1.0) {
            axis = 1;
        } else if (direction.y === 1.0 || direction.y === -1.0) {
            axis = 2;
        } else if (direction.z === 1.0 || direction.z === -1.0) {
            axis = 3;
        }
        return axis;
    }

    /**
     * 根据块的中心点位置与整个模型中心点位置的距离，来设置对应的移动距离。距离越远，移动距离越大
     * @param {*} children
     * @param {*} expDistance
     */
    getDistance(children, expDistance) {
        let lTotalNum = children.length;
        let fAxisCood = 0.0;
        let fZmaxCod = [];
        let m_fExpDis = expDistance; //爆炸距离参数，暂时设定为100

        let axis = this.getAxis();
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child === undefined) {
                return;
            }
            //获取包围盒
            let boundingSphere = child.boundingSphere; //Shpere只有中心点和半径

            switch (axis) {
                case 1:
                case -1:
                    fAxisCood = boundingSphere.center.x;
                    fZmaxCod[i] = fAxisCood;
                    break;
                case 2:
                case -2:
                    fAxisCood = boundingSphere.center.y;
                    fZmaxCod[i] = fAxisCood;
                    break;
                case 3:
                case -3:
                    fAxisCood = boundingSphere.center.z;
                    fZmaxCod[i] = fAxisCood;
                    break;
            }
            // tempList.push(child);
        }
        //对child和distance进行排序
        this.SortByBoxZValue(children, fZmaxCod);
        let distances = [];
        for (
            let j = 0;
            j < children.length;
            j++ //顺序怎么保证,按包围盒的Z值排序
        ) {
            let fZTrans = (lTotalNum - j - 1) * m_fExpDis; //最后一个没有移动
            distances.push(fZTrans);
        }
        let result = {
            childList: children,
            distances: distances,
        };
        return result;
    }

    /** 模型爆炸动画版
     * @param {Array<child>} option.children  当前图层子节点，如果为空则返回undefined
     * @param {Cartesian3}   option.center    爆炸中心中心
     * @param {Cartesian3}   option.direction 图层整体爆炸方向，默认值为 Cartesian3(1.0, 0.0, 0.0)
     * @param {Number}       option.distance  沿当前方向移动距离，默认值为 50
     **/
    createExplosion(option) {
        explosionOption.children = Cesium.defaultValue(
            option.children,
            undefined,
        );
        if (!Cesium.defined(explosionOption.children)) {
            return undefined;
        }
        explosionOption.center = Cesium.defaultValue(option.center, undefined);
        explosionOption.direction = Cesium.defaultValue(
            option.direction,
            new Cesium.Cartesian3(0.0, 0.0, 1.0),
        );
        explosionOption.distance = Cesium.defaultValue(option.distance, 50); // 默认爆炸距离为 50 米
        explosionOption.scene = this.scene;
        explosionOption.viewer = this.viewer;
        explosionOption.deltaDistance = Cesium.defaultValue(option.speed, 1);
        explosionOption.directions = [];
        explosionOption.distancesCenterPoint = [];
        explosionOption.speed = Cesium.defaultValue(option.speed, 1);
        let isAxis = (explosionOption.isAxis = Cesium.defaultValue(
            option.isAxis,
            false,
        ));
        let expDistance = (explosionOption.expDistance = Cesium.defaultValue(
            option.expDistance,
            100,
        ));
        let transform = (explosionOption.transform = option.transform);

        let direction = explosionOption.direction.clone();
        let originPoint = new Cesium.Cartesian3(0, 0, 0);
        let directionPoint = direction;
        for (let i = 0; i < explosionOption.children.length; i++) {
            let child = explosionOption.children[i];
            if (Cesium.defined(explosionOption.center)) {
                let childCenter = child.boundingSphere.center;
                // 计算方向
                Cesium.Cartesian3.subtract(
                    childCenter,
                    explosionOption.center,
                    direction,
                );
                // 射线方向是否为0，如果为0，则默认沿x轴方向移动
                let length = Cesium.Cartesian3.magnitude(direction);
                if (length < 1.0e-10) {
                    direction.x = 1.0;
                }
                // 射线标准化
                Cesium.Cartesian3.normalize(direction, direction);
                explosionOption.directions.push(direction.clone());
                // explosionOption.distancesCenterPoint.push(length);
            }
        }
        if (isAxis) {
            //将原点坐标和方向点坐标转成世界坐标
            Cesium.Matrix4.multiplyByPoint(transform, originPoint, originPoint);
            Cesium.Matrix4.multiplyByPoint(
                transform,
                directionPoint,
                directionPoint,
            ); //此处direction为方向点
            // 计算方向
            Cesium.Cartesian3.subtract(directionPoint, originPoint, direction);
            // 射线方向是否为0，如果为0，则默认沿x轴方向移动
            let length = Cesium.Cartesian3.magnitude(direction);
            if (length < 1.0e-10) {
                direction.x = 1.0;
            }
            // 射线标准化
            Cesium.Cartesian3.normalize(direction, direction);
            //四个child存入相同的direction
            for (let i = 0; i < explosionOption.children.length; i++) {
                explosionOption.directions.push(direction.clone());
            }

            //zlf  轴向爆炸，为不同的children设置不同的移动距离distance
            let result = this.getDistance(
                explosionOption.children,
                expDistance,
            );
            explosionOption.children = result.childList;
            //移动距离数组
            explosionOption.distances = result.distances;
            //最大移动距离
            explosionOption.maxDistances = result.distances[0];
            this.viewer.clock.onTick.addEventListener(clockT);
        } else {
            this.viewer.clock.onTick.addEventListener(clockT);
        }
        // 更新当前帧
        this.scene.requestRender();
    }

    /**
     * 模型爆炸无动画版
     * @param {*} option
     */
    createExplosion1(option) {
        let children = Cesium.defaultValue(option.children, undefined);
        if (!Cesium.defined(children)) {
            return undefined;
        }
        let center = Cesium.defaultValue(option.center, undefined);
        let direction = Cesium.defaultValue(
            option.direction,
            new Cesium.Cartesian3(0.0, 0.0, 1.0),
        );
        let distance = Cesium.defaultValue(option.distance, 50); // 默认爆炸距离为 50 米
        let isAxis = Cesium.defaultValue(option.isAxis, false); //默认为中心点爆炸
        let expDistance = Cesium.defaultValue(option.expDistance, 100);
        let scene = this.scene;

        let matrixChild = new Cesium.Matrix4();

        //中心点爆炸
        if (isAxis === false) {
            let directions = [];
            for (let i = 0; i < children.length; i++) {
                let child = children[i];

                if (Cesium.defined(center)) {
                    let childCenter = child.boundingSphere.center;
                    // 计算方向
                    Cesium.Cartesian3.subtract(center, childCenter, direction);
                    // 射线方向是否为0，如果为0，则默认沿x轴方向移动
                    let length = Cesium.Cartesian3.magnitude(direction);
                    if (length < 1.0e-10) {
                        direction.x = 1.0;
                    }
                }
                // 射线标准化
                Cesium.Cartesian3.normalize(direction, direction);
                explosionOption.directions.push(direction.clone());

                // 沿射线方向移动距离
                Cesium.Cartesian3.multiplyByScalar(
                    direction,
                    distance,
                    direction,
                );
                Cesium.Matrix4.fromTranslation(direction, matrixChild);
                // 设置矩阵
                child.transform = matrixChild.clone();
            }
        }
        //轴向爆炸
        if (isAxis) {
            let transform = Cesium.defaultValue(option.transform);
            if (transform === undefined) {
                return;
            }
            let originPoint = new Cesium.Cartesian3(0, 0, 0);
            let directionPoint = direction.clone();
            //将原点坐标和方向点坐标转成世界坐标
            Cesium.Matrix4.multiplyByPoint(transform, originPoint, originPoint);
            Cesium.Matrix4.multiplyByPoint(
                transform,
                directionPoint,
                directionPoint,
            ); //此处direction为方向点
            // 计算方向
            Cesium.Cartesian3.subtract(directionPoint, originPoint, direction);
            // 射线方向是否为0，如果为0，则默认沿x轴方向移动
            let length = Cesium.Cartesian3.magnitude(direction);
            if (length < 1.0e-10) {
                direction.x = 1.0;
            }
            // 射线标准化
            Cesium.Cartesian3.normalize(direction, direction);
            explosionOption.direction = direction.clone();
            //zlf  轴向爆炸，为不同的children设置不同的移动距离distance
            let result = this.getDistance(children, expDistance);
            children = result.childList;
            //移动距离数组
            let distances = result.distances;
            let tempDirection = direction.clone();
            //根据方向移动距离
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                // 沿射线方向移动距离
                Cesium.Cartesian3.multiplyByScalar(
                    direction,
                    distances[i],
                    direction,
                );
                Cesium.Matrix4.fromTranslation(direction, matrixChild);
                direction = tempDirection.clone();
                // 设置矩阵
                child.transform = matrixChild.clone();
            }
        }
        // 更新当前帧
        scene.requestRender();
    }
    /**
     * 移除爆炸
     * @param {*} option
     */
    recoverExplosion(option) {
        let children = Cesium.defaultValue(option.children, undefined);
        if (!Cesium.defined(children)) {
            return undefined;
        }
        //this.viewer.clock.onTick.removeEventListener(clockT);
        let matrixChild = new Cesium.Matrix4();
        if (explosionOption.direction) {
            let direction = explosionOption.direction.clone();
            //Cartesian3.multiplyByScalar(direction, -1.0, direction);
            if (direction.x != 0 || direction.x != 0.0) {
                direction.x *= -1.0;
            } else if (direction.y != 0 || direction.y != 0.0) {
                direction.y *= -1.0;
            } else if (direction.z != 0 || direction.z != 0.0) {
                direction.z *= -1.0;
            }
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                Cesium.Matrix4.fromTranslation(direction, matrixChild);
                child.transform = matrixChild.clone();
            }
        } else if (explosionOption.directions) {
            for (let i = 0; i < children.length; i++) {
                let direction = explosionOption.directions[i].clone();
                direction.x *= -1.0;
                direction.y *= -1.0;
                direction.z *= -1.0;

                let child = children[i];
                Cesium.Matrix4.fromTranslation(direction, matrixChild);
                child.transform = matrixChild.clone();
            }
        }
        // 更新当前帧
        this.scene.requestRender();
    }

    ////====98,99,100====////
    /**
     * 添加场景特效
     */
    addSceneEffect(effect) {
        if (Cesium.defined(effect)) {
            return this.scene.postProcessStages.add(effect._effect);
        }
        return undefined;
    }
    /**
     * 移除场景特效
     */
    removeSceneEffect(effect) {
        if (Cesium.defined(effect)) {
            this.scene.postProcessStages.remove(effect._effect);
        }
    }
    /**
     * 移除全部场景特效
     */
    removeAllSceneEffect() {
        this.scene.postProcessStages.removeAll();
    }
}

CesiumZondy.Manager.AnalysisManager = AnalysisManager;
