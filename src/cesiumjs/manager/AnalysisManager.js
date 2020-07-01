import { CesiumZondy } from "../core/Base";

/**
 * 全局变量，用于控制爆炸中参数传递到回调函数中
 */
let optionE = {
    directions: []
};
/**
 * 时钟回调函数，用于模型爆炸中实现动画效果
 * @param {object} param
 */
function clockT(param) {
    var children = Cesium.defaultValue(optionE.children, undefined);
    var isAxis = optionE.isAxis;
    if (!Cesium.defined(children)) {
        return undefined;
    }
    var distance = Cesium.defaultValue(optionE.distance, 50);
    var matrixChild = undefined;
    var viewer = optionE.viewer;
    optionE.deltaDistance += optionE.speed;
    if (isAxis) {
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var distance = optionE.distances[i];
            if (optionE.deltaDistance > distance) {
                break;
            }
            matrixChild = child.transform;
            var directionTemp = optionE.directions[i].clone();
            Cesium.Cartesian3.multiplyByScalar(
                directionTemp,
                optionE.speed,
                directionTemp
            );
            matrixChild[12] += directionTemp.x;
            matrixChild[13] += directionTemp.y;
            matrixChild[14] += directionTemp.z;
            child.transform = matrixChild.clone();
        }
        if (optionE.deltaDistance > optionE.maxDistances) {
            viewer.clock.onTick.removeEventListener(clockT);
        }
    } else {
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            matrixChild = child.transform;
            var directionTemp = optionE.directions[i].clone();
            Cesium.Cartesian3.multiplyByScalar(
                directionTemp,
                optionE.speed,
                directionTemp
            );
            matrixChild[12] += directionTemp.x;
            matrixChild[13] += directionTemp.y;
            matrixChild[14] += directionTemp.z;
            child.transform = matrixChild.clone();
        }
        if (optionE.deltaDistance > distance) {
            viewer.clock.onTick.removeEventListener(clockT);
        }
    }
}
/**
 * @author 三维基础平台研发中心·周凌风
 * @class AnalysisManager
 * @classdesc 分析功能管理类
 * @description 分析功能的创建与移除
 */
export default class AnalysisManager {
    constructor(option) {
        this._viewer = Cesium.defaultValue(option.viewer, undefined);
        this._scene = this._viewer.scene;
    }

    /**
     * 创建热力图
     * @param  {object} bounds：WGS84 bounding box {north, east, south, west}
     * @param  {Number} maxValue 最大值
     * @param  {Number} minValue 最小值
     * @param  {Array[]} data Array<[{'x':,'y':,'value':}]>
     * @returns {object} 热力图实例
     */
    createHeatMap(bounds, minValue, maxValue, data, options) {
        let heatMap = Cesium.CesiumHeatmap.create(
            this._viewer,
            bounds,
            options
        );
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

    /**
     * 模型漫游
     * @param  {string} modelURL 模型url
     * @param  {Array[]} positionArr 漫游线路节点坐标数组 Array<[x,y]>
     * @param  {bool} isShowPath 是否显示线路和节点
     * @param  {Number} clockFrequency 漫游时钟频率
     * @returns {Array} entities 模型对象Array<entity>
     */
    cruiseModel(modelURL, positionArr, isShowPath, clockFrequency) {
        let resultEntities = [];
        let start = Cesium.JulianDate.now();
        let seconds =
            (positionArr.length - 1) * Cesium.defaultValue(clockFrequency, 10);
        let stop = Cesium.JulianDate.addSeconds(
            start,
            seconds,
            new Cesium.JulianDate()
        );
        this._viewer.clock.startTime = start.clone();
        this._viewer.clock.stopTime = stop.clone();
        this._viewer.clock.currentTime = start.clone();
        this._viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
        this._viewer.clock.multiplier = 10;
        for (let i = 0; i < positionArr.length; i++) {
            let position_t = Cesium.Cartesian3.fromDegrees(
                positionArr[i][0],
                positionArr[i][1]
            );
            let pntEntity = this._viewer.entities.add({
                position: position_t,
                point: {
                    pixelSize: 8,
                    color: Cesium.Color.TRANSPARENT,
                    outlineColor: Cesium.Color.YELLOW,
                    outlineWidth: 3
                },
                show: Cesium.defaultValue(isShowPath, true)
            });
            resultEntities.push(pntEntity);
        }
        let position = this.calculatePositionSamples(
            positionArr,
            start,
            clockFrequency
        );
        let modelEntity = this._viewer.entities.add({
            availability: new Cesium.TimeIntervalCollection([
                new Cesium.TimeInterval({
                    start: start,
                    stop: stop
                })
            ]),
            position: position,
            orientation: new Cesium.VelocityOrientationProperty(position),

            model: {
                uri: modelURL,
                minimumPixelSize: 64
            },
            path: {
                resolution: 1,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.1,
                    color: Cesium.Color.YELLOW
                }),
                width: 10,
                show: Cesium.defaultValue(isShowPath, true)
            }
        });
        resultEntities.push(modelEntity);
        return resultEntities;
    }

    /**
     * 计算位置样本
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
                            new Cesium.JulianDate()
                        ),
                        Cesium.Cartesian3.fromDegrees(
                            positions[since][0],
                            positions[since][1]
                        )
                    );
                }
                return property;
            }
        }
    }

    /**
     * 清除模型漫游
     * @param {object} modelEntities 模型实例
     */
    clearCruiseModel(modelEntities) {
        if (modelEntities.constructor === Array) {
            for (let i = modelEntities.length - 1; i >= 0; i--) {
                this._viewer.entities.remove(modelEntities[i]);
            }
        }
    }
    /**
     * 开始模型漫游
     */
    startCruiseModel() {
        this._viewer.clock.shouldAnimate = true;
    }
    /**
     * 结束模型漫游
     */
    stopCruiseModel() {
        this._viewer.clock.shouldAnimate = false;
    }

    /**
     * 开挖
     * @param {Object} option.tileSet 图层信息
     * @param {Object} option.planes 开挖面的形状
     * @param {Object} option.material 裁剪面材质
     * @param {Object} option.edgeColor 边界线颜色
     * @param {Object} option.edgeWidth 边界线宽度
     * @param {Object} option.unionClippingRegions 裁减法线方向，默认值为 false
     * @param {Object} option.longitude 开挖面定位点经度
     * @param {Object} option.latitude 开挖面定位点纬度
     * @param {Object} option.height 开挖面定位点高度
     */
    createExcavateAnalysis(option) {
        if (!Cesium.defined(option.tileSet) || !Cesium.defined(option.planes)) {
            return undefined;
        }
        let tileSet = option.tileSet;
        let planes = option.planes;
        let material = Cesium.defaultValue(
            option.material,
            Cesium.Color.WHITE.withAlpha(0.02)
        );
        let edgeColor = Cesium.defaultValue(option.edgeColor, Cesium.Color.RED);
        let edgeWidth = Cesium.defaultValue(option.edgeWidth, 0);
        let unionClippingRegions = Cesium.defaultValue(
            option.unionClippingRegions,
            false
        );
        let longitude = option.longitude;
        let latitude = option.latitude;
        let height = Cesium.defaultValue(option.height, 0.0);
        let transform = tileSet._root.transform;
        let rotation = new Cesium.Matrix3();
        Cesium.Matrix4.getRotation(transform, rotation);
        let scale = new Cesium.Cartesian3();
        Cesium.Matrix4.getScale(transform, scale);
        let center = new Cesium.Cartesian3();
        Cesium.Matrix4.getTranslation(transform, center);
        let modelMatrix = transform.clone();
        if (Cesium.defined(longitude) && Cesium.defined(latitude)) {
            modelMatrix = this.getTransForm(
                center,
                longitude,
                latitude,
                height
            );
        }
        tileSet.clippingPlanes = new Cesium.ClippingPlaneCollection({
            modelMatrix: modelMatrix,
            planes: planes,
            edgeColor: edgeColor,
            edgeWidth: edgeWidth,
            unionClippingRegions: unionClippingRegions
        });
        let planeEntityArray = [];
        let radius = tileSet.boundingSphere.radius;
        for (let i = 0; i < planes.length; ++i) {
            let planeEntity = this._viewer.entities.add({
                position: center,
                plane: {
                    dimensions: new Cesium.Cartesian2(
                        radius * 2.5,
                        radius * 2.5
                    ),
                    material: material
                }
            });
            planeEntityArray.push(planeEntity);
        }
        return {
            tileSet: tileSet,
            planes: planeEntityArray
        };
    }

    /**
     * 开始动态开挖
     * @param {Object} option.planetEntity 开挖实例
     * @param {Number} option.distance 开挖距离
     * @param {Array} option.planes 平面集
     * @param {Matrix4} option.transform 转换矩阵
     */
    startDynamicExcavate(option) {
        let planetEntity = option.planetEntity;
        let distance = option.distance;
        let planes = option.planes;
        let transform = option.transform;
        let scratchPlane = new Cesium.ClippingPlane(
            Cesium.Cartesian3.UNIT_X,
            0.0
        );
        planetEntity.plane.plane = new Cesium.CallbackProperty(function (date) {
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
     * 根据中心点、经纬度、高度等信息获取转换矩阵
     * @param {Cartesian3} center 中心点
     * @param {Number} lo 经度
     * @param {Number} la 纬度
     * @param {Number} height 高度
     */
    getTransForm(center, lo, la, height) {
        let position1 = Cesium.Cartographic.toCartesian(
            new Cesium.Cartographic.fromDegrees(lo, la, height)
        );
        let sub = new Cesium.Cartesian3();
        Cesium.Cartesian3.subtract(center, position1, sub);
        sub.z = height;
        let modelMatrix = new Cesium.Matrix4();
        Cesium.Matrix4.fromTranslation(sub, modelMatrix);
        return modelMatrix;
    }

    /**
     * 裁剪
     * @param {Array} positions
     */
    getClippingPlanes(positions) {
        if (!positions) {
            return;
        }
        let pointsLength = positions.length;
        if (pointsLength < 2) {
            return;
        }
        let clippingPlanes = [];
        for (let i = 0; i < pointsLength; ++i) {
            let nextIndex = (i + 1) % pointsLength;
            let midpoint = Cesium.Cartesian3.add(
                positions[i],
                positions[nextIndex],
                new Cesium.Cartesian3()
            );
            midpoint = Cesium.Cartesian3.multiplyByScalar(
                midpoint,
                0.5,
                midpoint
            );
            let up = Cesium.Cartesian3.normalize(
                midpoint,
                new Cesium.Cartesian3()
            );
            let right = Cesium.Cartesian3.subtract(
                positions[nextIndex],
                midpoint,
                new Cesium.Cartesian3()
            );
            right = Cesium.Cartesian3.normalize(right, right);
            let normal = Cesium.Cartesian3.cross(
                right,
                up,
                new Cesium.Cartesian3()
            );
            normal = Cesium.Cartesian3.normalize(normal, normal);
            let originCenteredPlane = new Cesium.Plane(normal, 0.0);
            let distance = Cesium.Plane.getPointDistance(
                originCenteredPlane,
                midpoint
            );
            clippingPlanes.push(new Cesium.ClippingPlane(normal, distance));
        }
        return clippingPlanes;
    }

    /**
     * 动态剖切
     * @param {Object} tileSet 图层集
     * @param {Object} planes 平面集
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
                unionClippingRegions: false
            });
            let radius = tileSet.boundingSphere.radius;
            let transform = tileSet._root.transform;
            let center = new Cesium.Cartesian3();
            Cesium.Matrix4.getTranslation(transform, center);
            for (let i = 0; i < planes.length; ++i) {
                let planeEntity = this._viewer.entities.add({
                    position: center,
                    plane: {
                        dimensions: new Cesium.Cartesian2(
                            radius * 250,
                            radius * 2.5
                        ),
                        material: material
                    }
                });
                cutPlanes.push(planeEntity);
            }
        }
        let selectedPlane;
        let downHandler;
        if (interaction) {
            downHandler = new Cesium.ScreenSpaceEventHandler(
                this._viewer.scene.canvas
            );
            downHandler.setInputAction(function (movement) {
                let pickedObject = that.scene.pick(movement.position);
                if (
                    Cesium.defined(pickedObject) &&
                    Cesium.defined(pickedObject.id) &&
                    Cesium.defined(pickedObject.id.plane)
                ) {
                    selectedPlane = pickedObject.id.plane;
                    selectedPlane.material = Cesium.Color.WHITE.withAlpha(
                        0.0001
                    );
                    selectedPlane.outlineColor = Cesium.Color.WHITE;
                    that.scene.screenSpaceCameraController.enableInputs = false;
                }
            }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);
            downHandler.setInputAction(function () {
                if (Cesium.defined(selectedPlane)) {
                    selectedPlane.material = material;
                    selectedPlane.outlineColor = material;
                    selectedPlane = undefined;
                }

                that.scene.screenSpaceCameraController.enableInputs = true;
            }, Cesium.ScreenSpaceEventType.MIDDLE_UP);
            downHandler.setInputAction(function (movement) {
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
            handler: downHandler
        };
    }

    /**
     * 开始动态剖切
     * @param {object} option.planetEntity 剖切实例
     * @param {Number} option.distance 距离
     * @param {object} option.plane 平面
     * @param {Matrix4} option.transform 转换矩阵
     */
    startDynamicCutting(option) {
        let planetEntity = option.planetEntity;
        let distance = option.distance;
        let plane = option.plane;
        let transform = option.transform;

        let scratchPlane = new Cesium.ClippingPlane(
            Cesium.Cartesian3.UNIT_X,
            0.0
        );
        planetEntity.plane.plane = new Cesium.CallbackProperty(function (date) {
            plane.distance = distance;
            return Cesium.Plane.transform(plane, transform, scratchPlane);
        }, false);
    }

    /**
     * 移除动态剖切
     * @param {object} dynaObject 动态剖切实例
     */
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
            this._viewer.entities.remove(plane);
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
            new Cesium.Color(1, 0, 0, 0.5)
        );
        let edgeColorUse = Cesium.defaultValue(
            otherOptions.edgeColor,
            new Cesium.Color(1, 0, 0, 1.0)
        );
        let negate = Cesium.defaultValue(otherOptions.negate, false);
        let negateColor = Cesium.defaultValue(
            otherOptions.negateColor,
            Cesium.Color.WHITE
        );
        let applyForLayer = Cesium.defaultValue(
            otherOptions.applyForLayer,
            false
        );
        let style = Cesium.defaultValue(otherOptions.style, '');
        let colorBlendMode = Cesium.defaultValue(
            otherOptions.colorBlendMode,
            Cesium.Cesium3DTileColorBlendMode.HIGHLIGHT
        );
        let colorBlendAmount = Cesium.defaultValue(
            otherOptions.colorBlendAmount,
            0.5
        );
        if (style === 'Edge' && !Cesium.defined(this._edgeDetectionStageCD)) {
            this._edgeDetectionStageCD = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
            this._edgeDetectionStageCD.uniforms.color = edgeColorUse; //Color.BLUE;
            this._edgeDetectionStageCD.uniforms.length = 0.05;
            this._edgeDetectionStageCD.selected = [];
            this._silhouetteStageCD = Cesium.PostProcessStageLibrary.createSilhouetteStage(
                [this._edgeDetectionStageCD]
            );
            this._viewer.scene.postProcessStages.add(this._silhouetteStageCD);
        }

        function evaluateColorCallBack(feature, result) {
            var title = feature.getProperty('name');
            var layerNow = feature.tileset;
            var values = title.split('_');
            var vlueNumber = parseInt(values[2]);
            var color = feature.color;
            colorUse = layerNow.color;
            if (style === 'EdgeHighlight' || style === 'Edge') {
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
                if (style === 'Edge') {
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
                    color = negateColor;
                }
            } else if (
                title !== undefined &&
                title !== null &&
                idList.indexOf(vlueNumber) > -1
            ) {
                color = negateColor;
            } else {
                color = colorUse;
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
                evaluateColor: evaluateColorCallBack
            };
        }
    }
    /**
     * 停止全部高亮
     * @param {Array<layer>} layerList 图层列表
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
                this._silhouetteStageCD
            );
            this._edgeDetectionStageCD = undefined;
            this._silhouetteStageCD.destroy();
            this._silhouetteStageCD = undefined;
        }
        this._viewer.scene.render();
    }

    /**
     * 根据id停止高亮
     * @param {Array<layer>} layerList 图层列表
     * @param {Array<id>} idList ID列表
     * @param {obj} otherOptions 其他参数
     */
    stopCustomDisplayByIds(layerList, idList, otherOptions) {
        if (!Cesium.defined(layerList) || !Cesium.defined(idList)) {
            return;
        }
        let that = this;

        function evaluateColorCallBack(feature, result) {
            let title = feature.getProperty('name');
            let values = title.split('_');
            let layerNow = feature.tileset;
            let vlueNumber = parseInt(values[2]);
            let color = feature.color;
            if (
                title !== undefined &&
                title !== null &&
                idList.indexOf(vlueNumber) > -1 &&
                layerNow._edgeDetectionfeatureList
            ) {
                let feIndex = layerNow._edgeDetectionfeatureList.indexOf(
                    feature
                );
                if (feIndex > -1) {
                    layerNow._edgeDetectionfeatureList.splice(feIndex, 1);
                    that._edgeDetectionStageCD.selected =
                        layerNow._edgeDetectionfeatureList;
                }
                color = Cesium.Color.WHITE;
            }
            return Cesium.Color.clone(color, result);
        }

        for (let i = 0; i < layerList.length; ++i) {
            let tileset = layerList[i];
            tileset.style = new Cesium.Cesium3DTileStyle();
            tileset.style.color = {
                evaluateColor: evaluateColorCallBack
            };
        }
    }

    /**
     * 对包围盒中心点进行排序，并调整对应的children数组顺序
     * @param {Array<child>} sortGeometryList 当前图层子节点，如果为空则返回undefined
     * @param {Array} fZmaxCod 包围盒中心点在某一轴上的数值数组
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
        let direction = optionE.direction;
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
     * @param {Array<child>} children 当前图层子节点，如果为空则返回undefined
     * @param {Number} expDistance 移动距离基数
     */
    getDistance(children, expDistance) {
        let lTotalNum = children.length;
        let fAxisCood = 0.0;
        let fZmaxCod = [];
        let m_fExpDis = expDistance;

        let axis = this.getAxis();
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child === undefined) {
                return;
            }
            let boundingSphere = child.boundingSphere;
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
        }
        this.SortByBoxZValue(children, fZmaxCod);
        let distances = [];
        for (let j = 0; j < children.length; j++) {
            let fZTrans = (lTotalNum - j - 1) * m_fExpDis;
            distances.push(fZTrans);
        }
        let result = {
            childList: children,
            distances: distances
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
        optionE.children = Cesium.defaultValue(option.children, undefined);
        if (!Cesium.defined(optionE.children)) {
            return undefined;
        }
        optionE.center = Cesium.defaultValue(option.center, undefined);
        optionE.direction = Cesium.defaultValue(
            option.direction,
            new Cesium.Cartesian3(0.0, 0.0, 1.0)
        );
        optionE.distance = Cesium.defaultValue(option.distance, 50);
        optionE.scene = this._scene;
        optionE.viewer = this._viewer;
        optionE.deltaDistance = Cesium.defaultValue(option.speed, 1);
        optionE.directions = [];
        optionE.distancesCenterPoint = [];
        optionE.speed = Cesium.defaultValue(option.speed, 1);
        let isAxis = (optionE.isAxis = Cesium.defaultValue(
            option.isAxis,
            false
        ));
        let expDistance = (optionE.expDistance = Cesium.defaultValue(
            option.expDistance,
            100
        ));
        let transform = (optionE.transform = option.transform);

        let direction = optionE.direction.clone();
        let originPoint = new Cesium.Cartesian3(0, 0, 0);
        let directionPoint = direction;
        for (let i = 0; i < optionE.children.length; i++) {
            let child = optionE.children[i];
            if (Cesium.defined(optionE.center)) {
                let childCenter = child.boundingSphere.center;
                Cesium.Cartesian3.subtract(
                    childCenter,
                    optionE.center,
                    direction
                );
                let length = Cesium.Cartesian3.magnitude(direction);
                if (length < 1.0e-10) {
                    direction.x = 1.0;
                }
                Cesium.Cartesian3.normalize(direction, direction);
                optionE.directions.push(direction.clone());
            }
        }
        if (isAxis) {
            Cesium.Matrix4.multiplyByPoint(transform, originPoint, originPoint);
            Cesium.Matrix4.multiplyByPoint(
                transform,
                directionPoint,
                directionPoint
            );
            Cesium.Cartesian3.subtract(directionPoint, originPoint, direction);
            let length = Cesium.Cartesian3.magnitude(direction);
            if (length < 1.0e-10) {
                direction.x = 1.0;
            }
            Cesium.Cartesian3.normalize(direction, direction);
            for (let i = 0; i < optionE.children.length; i++) {
                optionE.directions.push(direction.clone());
            }
            let result = this.getDistance(optionE.children, expDistance);
            optionE.children = result.childList;
            optionE.distances = result.distances;
            optionE.maxDistances = result.distances[0];
            this._viewer.clock.onTick.addEventListener(clockT);
        } else {
            this._viewer.clock.onTick.addEventListener(clockT);
        }
        this._scene.requestRender();
    }

    /**
     * 模型爆炸无动画版
     * @param {Array<child>} option.children 当前图层子节点，如果为空则返回undefined
     * @param {Cartesian3} option.center 包围盒中心点
     * @param {Cartesian3} option.direction 子节点爆炸方向
     * @param {Number} option.distance 子节点爆炸距离
     * @param {Boolean} option.isAxis 是否执行轴向爆炸，默认为false中心点爆炸，为true时轴向爆炸
     * @param {Number} option.expDistance 爆炸移动距离基数
     */
    createExplosion1(option) {
        let children = Cesium.defaultValue(option.children, undefined);
        if (!Cesium.defined(children)) {
            return undefined;
        }
        let center = Cesium.defaultValue(option.center, undefined);
        let direction = Cesium.defaultValue(
            option.direction,
            new Cesium.Cartesian3(0.0, 0.0, 1.0)
        );
        let distance = Cesium.defaultValue(option.distance, 50);
        let isAxis = Cesium.defaultValue(option.isAxis, false);
        let expDistance = Cesium.defaultValue(option.expDistance, 100);
        let scene = this._scene;

        let matrixChild = new Cesium.Matrix4();
        if (isAxis === false) {
            let directions = [];
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                if (Cesium.defined(center)) {
                    let childCenter = child.boundingSphere.center;
                    Cesium.Cartesian3.subtract(center, childCenter, direction);
                    let length = Cesium.Cartesian3.magnitude(direction);
                    if (length < 1.0e-10) {
                        direction.x = 1.0;
                    }
                }
                Cesium.Cartesian3.normalize(direction, direction);
                optionE.directions.push(direction.clone());
                Cesium.Cartesian3.multiplyByScalar(
                    direction,
                    distance,
                    direction
                );
                Cesium.Matrix4.fromTranslation(direction, matrixChild);
                child.transform = matrixChild.clone();
            }
        }
        if (isAxis) {
            let transform = Cesium.defaultValue(option.transform);
            if (transform === undefined) {
                return;
            }
            let originPoint = new Cesium.Cartesian3(0, 0, 0);
            let directionPoint = direction.clone();
            Cesium.Matrix4.multiplyByPoint(transform, originPoint, originPoint);
            Cesium.Matrix4.multiplyByPoint(
                transform,
                directionPoint,
                directionPoint
            );
            Cesium.Cartesian3.subtract(directionPoint, originPoint, direction);
            let length = Cesium.Cartesian3.magnitude(direction);
            if (length < 1.0e-10) {
                direction.x = 1.0;
            }
            Cesium.Cartesian3.normalize(direction, direction);
            optionE.direction = direction.clone();
            let result = this.getDistance(children, expDistance);
            children = result.childList;
            let distances = result.distances;
            let tempDirection = direction.clone();
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                Cesium.Cartesian3.multiplyByScalar(
                    direction,
                    distances[i],
                    direction
                );
                Cesium.Matrix4.fromTranslation(direction, matrixChild);
                direction = tempDirection.clone();
                child.transform = matrixChild.clone();
            }
        }
        scene.requestRender();
    }
    /**
     * 移除爆炸
     * @param {Array<child>} option.children 当前图层子节点，如果为空则返回undefined
     */
    recoverExplosion(option) {
        let children = Cesium.defaultValue(option.children, undefined);
        if (!Cesium.defined(children)) {
            return undefined;
        }
        let matrixChild = new Cesium.Matrix4();
        if (optionE.direction) {
            let direction = optionE.direction.clone();
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
        } else if (optionE.directions) {
            for (let i = 0; i < children.length; i++) {
                let direction = optionE.directions[i].clone();
                direction.x *= -1.0;
                direction.y *= -1.0;
                direction.z *= -1.0;

                let child = children[i];
                Cesium.Matrix4.fromTranslation(direction, matrixChild);
                child.transform = matrixChild.clone();
            }
        }
        this._scene.requestRender();
    }

    /**
     * 添加场景特效
     * @param {Object} effect 场景特效实例
     */
    addSceneEffect(effect) {
        if (Cesium.defined(effect)) {
            return this._scene.postProcessStages.add(effect._effect);
        }
        return undefined;
    }
    /**
     * 移除场景特效
     * @param {Object} effect 场景特效实例
     */
    removeSceneEffect(effect) {
        if (Cesium.defined(effect)) {
            this._scene.postProcessStages.remove(effect._effect);
        }
    }
    /**
     * 移除全部场景特效
     */
    removeAllSceneEffect() {
        this._scene.postProcessStages.removeAll();
    }
}

CesiumZondy.Manager.AnalysisManager = AnalysisManager;
