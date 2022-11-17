import { CesiumZondy } from '../core/Base';

import CommonFuncManager from './CommonFuncManager';

const optionE = {
    directions: []
};

function calculatePositionSamplesGround(positions, startTime, multiplier) {
    if (positions !== undefined) {
        if (positions.constructor === Array) {
            const property = new Cesium.SampledPositionProperty();
            for (let since = 0; since < positions.length; since += 1) {
                property.addSample(Cesium.JulianDate.addSeconds(startTime, multiplier * since, new Cesium.JulianDate()), positions[since]);
            }
            return property;
        }
    }
    return undefined;
}

function calculatePositionSamples(positions, startTime, multiplier) {
    if (positions !== undefined) {
        if (positions.constructor === Array) {
            const property = new Cesium.SampledPositionProperty();
            for (let since = 0; since < positions.length; since += 1) {
                property.addSample(
                    Cesium.JulianDate.addSeconds(startTime, multiplier * since, new Cesium.JulianDate()),
                    Cesium.Cartesian3.fromDegrees(positions[since][0], positions[since][1])
                );
            }
            return property;
        }
    }
    return undefined;
}

function getTransForm(transform, lo, la, height) {
    let position = Cesium.Cartographic.toCartesian(Cesium.Cartographic.fromDegrees(lo, la, height));
    let matrix = new Cesium.Matrix4();
    matrix = Cesium.Matrix4.inverse(transform, matrix);
    position = Cesium.Matrix4.multiplyByPoint(matrix, position, position);
    const center = new Cesium.Cartesian3(0.0, 0.0, 0.0);
    Cesium.Cartesian3.subtract(position, center, position);
    Cesium.Matrix4.fromTranslation(position, matrix);
    return matrix;
}

function SortByBoxZValue(sortGeometryList, fZmaxCod) {
    let i;
    let j;
    let tempDotStru;
    let tempFZmaxCod;
    const len = sortGeometryList.length;
    const list = sortGeometryList;
    const cod = fZmaxCod;
    for (i = 1; i < len; i += 1) {
        for (j = len - 1; j >= i; j -= 1) {
            if (cod[j] > cod[j - 1]) {
                tempFZmaxCod = cod[j - 1];
                cod[j - 1] = cod[j];
                cod[j] = tempFZmaxCod;

                tempDotStru = list[j - 1];
                list[j - 1] = list[j];
                list[j] = tempDotStru;
            }
        }
    }
    const result = {
        list,
        cod
    };
    return result;
}

function getAxis() {
    let axis = 0;
    const { direction } = optionE;
    if (direction.x === 1.0 || direction.x === -1.0) {
        axis = 1;
    } else if (direction.y === 1.0 || direction.y === -1.0) {
        axis = 2;
    } else if (direction.z === 1.0 || direction.z === -1.0) {
        axis = 3;
    }
    return axis;
}

function getDistance(children, expDistance) {
    const lTotalNum = children.length;
    let fAxisCood = 0.0;
    let fZmaxCod = [];
    const mfExpDis = expDistance;

    const axis = getAxis();
    for (let i = 0; i < children.length; i += 1) {
        const child = children[i];
        if (child === undefined) {
            return undefined;
        }
        const { boundingSphere } = child;
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
            default:
                fAxisCood = boundingSphere.center.x;
                fZmaxCod[i] = fAxisCood;
                break;
        }
    }
    const sortResult = SortByBoxZValue(children, fZmaxCod);
    const childrenList = sortResult.list;
    fZmaxCod = sortResult.cod;
    const distances = [];
    for (let j = 0; j < childrenList.length; j += 1) {
        const fZTrans = (lTotalNum - j - 1) * mfExpDis;
        distances.push(fZTrans);
    }
    const result = {
        childList: childrenList,
        distances
    };
    return result;
}

function clockT() {
    const children = Cesium.defaultValue(optionE.children, undefined);
    const { isAxis } = optionE;
    if (!Cesium.defined(children)) {
        return undefined;
    }
    let distance = Cesium.defaultValue(optionE.distance, 50);
    let matrixChild;
    const { viewer } = optionE;
    optionE.deltaDistance += optionE.speed;
    if (isAxis) {
        for (let i = 0; i < children.length; i += 1) {
            const child = children[i];
            distance = optionE.distances[i];
            if (optionE.deltaDistance > distance) {
                break;
            }
            matrixChild = child.transform;
            const directionTemp = optionE.directions[i].clone();
            Cesium.Cartesian3.multiplyByScalar(directionTemp, optionE.speed, directionTemp);
            matrixChild[12] += directionTemp.x;
            matrixChild[13] += directionTemp.y;
            matrixChild[14] += directionTemp.z;
            child.transform = matrixChild.clone();
        }
        if (optionE.deltaDistance > optionE.maxDistances) {
            viewer.clock.onTick.removeEventListener(clockT);
        }
    } else {
        for (let i = 0; i < children.length; i += 1) {
            const child = children[i];
            matrixChild = child.transform;
            const directionTemp = optionE.directions[i].clone();
            Cesium.Cartesian3.multiplyByScalar(directionTemp, optionE.speed, directionTemp);
            matrixChild[12] += directionTemp.x;
            matrixChild[13] += directionTemp.y;
            matrixChild[14] += directionTemp.z;
            child.transform = matrixChild.clone();
        }
        if (optionE.deltaDistance > distance) {
            viewer.clock.onTick.removeEventListener(clockT);
        }
    }
    return undefined;
}
/**
 * @author 三维基础平台研发中心·周凌风
 * @class module:客户端可视化分析.AnalysisManager
 * @classdesc 分析功能管理类
 * @description 分析功能的创建与移除
 * @param {Object} options 分析功能管理类构造参数
 * @param {Object} options.viewer 视图
 */
export default class AnalysisManager {
    constructor(options) {
        this._viewer = Cesium.defaultValue(options.viewer, undefined);
        this._scene = this._viewer.scene;
    }

    /**
     * 视图
     * @memberof AnalysisManager.prototype
     * @type {Viewer}
     * @readonly
     */
    get viewer() {
        return this._viewer;
    }

    /**
     * 场景
     * @memberof AnalysisManager.prototype
     * @readonly
     * @type {Scene}
     */
    get scene() {
        return this._scene;
    }

    /**
     * 创建热力图
     * @function module:客户端可视化分析.AnalysisManager.prototype.createHeatMap
     * @param {Object} bounds：WGS84 bounding box {north, east, south, west}
     * @param {Number} maxValue 最大值
     * @param {Number} minValue 最小值
     * @param {Array[]} data Array<[{'x':,'y':,'value':}]>
     * @param {Object} options 原生热力图参数
     * @returns {Object} 热力图实例
     */
    createHeatMap(bounds, minValue, maxValue, data, options) {
        const heatMap = Cesium.CesiumHeatmap.create(this.viewer, bounds, options);
        heatMap.setWGS84Data(minValue, maxValue, data);
        return heatMap;
    }

    /**
     * 移除热力图
     * @function module:客户端可视化分析.AnalysisManager.prototype.removeHeatMap
     * @param {Object} heatmap 热力图对象
     */
    removeHeatMap(heatmap) {
        heatmap.removeLayer();
        this.scene.requestRender();
    }

    /**
     * 模型漫游
     * @function module:客户端可视化分析.AnalysisManager.prototype.cruiseModel
     * @param  {String} modelURL 模型url
     * @param  {Array[]} positionArr 漫游线路节点坐标数组 Array<[x,y]>
     * @param  {Boolean} isShowPath 是否显示线路和节点
     * @param  {Number} clockFrequency 漫游时钟频率
     * @returns {Array} entities 模型对象Array<entity>
     */
    cruiseModel(modelURL, positionArr, isShowPath, clockFrequency) {
        const resultEntities = [];
        const start = Cesium.JulianDate.now();
        const seconds = (positionArr.length - 1) * Cesium.defaultValue(clockFrequency, 10);
        const stop = Cesium.JulianDate.addSeconds(start, seconds, new Cesium.JulianDate());
        this.viewer.clock.startTime = start.clone();
        this.viewer.clock.stopTime = stop.clone();
        this.viewer.clock.currentTime = start.clone();
        this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // Loop at the end
        this.viewer.clock.multiplier = 10;
        for (let i = 0; i < positionArr.length; i += 1) {
            const positionT = Cesium.Cartesian3.fromDegrees(positionArr[i][0], positionArr[i][1]);
            const pntEntity = this.viewer.entities.add({
                position: positionT,
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
        const position = calculatePositionSamples(positionArr, start, clockFrequency);
        const modelEntity = this.viewer.entities.add({
            availability: new Cesium.TimeIntervalCollection([
                new Cesium.TimeInterval({
                    start,
                    stop
                })
            ]),
            position,
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
     * 模型漫游贴地
     * @function module:客户端可视化分析.AnalysisManager.prototype.cruiseModelGround
     * @param  {String} modelURL 模型路径
     * @param  {Array[]} positionArr 漫游线路节点坐标数组 Array<[x,y]>
     * @param  {Boolean} isShowPath 是否显示线路和节点
     * @param  {Number} clockFrequency 漫游时钟频率
     * @param  {Function} callback 回调函数
     * @example
     *      function successCreate(entities) {
     *          viewer.trackedEntity = entities[entities.length - 1];
     *      };
     *      let positionArr = [];
     *      for (let i = 0; i <= 360; i += 45) {
     *          let radians = Cesium.Math.toRadians(i);
     *          positionArr.push([121.0924 + (0.03 * 1.5 * Math.cos(radians)), 23.1476 + (0.03 * Math.sin(radians))]);
     *      }
     *      analysisManager.cruiseModelGround('../data/donghua.gltf', positionArr, true, 10, successCreate);
     *      analysisManager.startCruiseModel();
     */
    cruiseModelGround(modelURL, positionArr, isShowPath, clockFrequency, callback) {
        const resultEntities = [];
        const cartesianArr = [];
        for (let i = 0; i < positionArr.length; i += 1) {
            cartesianArr.push(Cesium.Cartesian3.fromDegrees(positionArr[i][0], positionArr[i][1]));
        }

        const numOforiPnt = positionArr.length;

        let len = 0;
        for (let j = 0; j < cartesianArr.length - 1; j += 1) {
            len += Math.sqrt((cartesianArr[j].x - cartesianArr[j + 1].x) ** 2 + (cartesianArr[j].y - cartesianArr[j + 1].y) ** 2);
        }
        const pnts = CommonFuncManager.linearInterpolate3D(cartesianArr, len / 300);

        let cartographicsArr = this._viewer.scene.globe.ellipsoid.cartesianArrayToCartographicArray(cartesianArr);
        cartographicsArr = cartographicsArr.concat(this._viewer.scene.globe.ellipsoid.cartesianArrayToCartographicArray(pnts));

        const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
        const seconds = (positionArr.length - 1) * Cesium.defaultValue(clockFrequency, 10);
        const stop = Cesium.JulianDate.addSeconds(start, seconds, new Cesium.JulianDate());
        this.viewer.clock.startTime = start.clone();
        this.viewer.clock.stopTime = stop.clone();
        this.viewer.clock.currentTime = start.clone();
        this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // Loop at the end
        this.viewer.clock.multiplier = 10;

        Cesium.sampleTerrain(this.viewer.terrainProvider, 7, cartographicsArr).then((updatedPositions) => {
            const cartesianPositions = this.viewer.scene.globe.ellipsoid.cartographicArrayToCartesianArray(updatedPositions);
            const oriVertices = cartesianPositions.slice(0, numOforiPnt);
            const samplePoints = cartesianPositions.slice(numOforiPnt);

            for (let j = 0; j < oriVertices.length; j += 1) {
                const pntEntity = this.viewer.entities.add({
                    position: oriVertices[j],
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

            const clockFrequencyTem = (clockFrequency * (oriVertices.length - 1)) / (samplePoints.length - 1);
            const position = calculatePositionSamplesGround(samplePoints, start, clockFrequencyTem);
            const modelEntity = this.viewer.entities.add({
                availability: new Cesium.TimeIntervalCollection([
                    new Cesium.TimeInterval({
                        start,
                        stop
                    })
                ]),
                position,
                orientation: new Cesium.VelocityOrientationProperty(position),
                model: {
                    uri: modelURL,
                    minimumPixelSize: 128
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
            if (typeof callback === 'function') {
                callback(resultEntities);
            }
        });
    }

    /**
     * 清除模型漫游
     * @function module:客户端可视化分析.AnalysisManager.prototype.clearCruiseModel
     * @param {Object} modelEntities 模型实例
     */
    clearCruiseModel(modelEntities) {
        if (modelEntities.constructor === Array) {
            for (let i = modelEntities.length - 1; i >= 0; i -= 1) {
                this.viewer.entities.remove(modelEntities[i]);
            }
        }
    }

    /**
     * 开始模型漫游
     * @function module:客户端可视化分析.AnalysisManager.prototype.startCruiseModel
     */
    startCruiseModel() {
        this.viewer.clock.shouldAnimate = true;
    }

    /**
     * 结束模型漫游
     * @function module:客户端可视化分析.AnalysisManager.prototype.stopCruiseModel
     */
    stopCruiseModel() {
        this.viewer.clock.shouldAnimate = false;
    }

    /**
     * 开挖
     * @function module:客户端可视化分析.AnalysisManager.prototype.createExcavateAnalysis
     * @param {Object} options 开挖参数
     * @param {Object} options.tileset 图层信息
     * @param {Object} options.planes 开挖面的形状
     * @param {Object} [options.material] 裁剪面材质
     * @param {Color} [options.edgeColor] 边界线颜色
     * @param {Number} [options.edgeWidth] 边界线宽度
     * @param {Boolean} [options.unionClippingRegions] 裁减法线方向，默认值为 false
     * @param {Number} options.longitude 开挖面定位点经度
     * @param {Number} options.latitude 开挖面定位点纬度
     * @param {Number} [options.height] 开挖面定位点高度
     */
    createExcavateAnalysis(options) {
        if (!Cesium.defined(options.tileset) || !Cesium.defined(options.planes)) {
            return undefined;
        }
        const { tileset } = options;
        const { planes } = options;
        const material = Cesium.defaultValue(options.material, Cesium.Color.WHITE.withAlpha(0.02));
        const edgeColor = Cesium.defaultValue(options.edgeColor, Cesium.Color.RED);
        const edgeWidth = Cesium.defaultValue(options.edgeWidth, 0);
        const unionClippingRegions = Cesium.defaultValue(options.unionClippingRegions, false);
        const { longitude } = options;
        const { latitude } = options;
        const height = Cesium.defaultValue(options.height, 0.0);
        const { transform } = tileset._root;
        const rotation = new Cesium.Matrix3();
        Cesium.Matrix4.getRotation(transform, rotation);
        const scale = new Cesium.Cartesian3();
        Cesium.Matrix4.getScale(transform, scale);
        const center = new Cesium.Cartesian3();
        Cesium.Matrix4.getTranslation(transform, center);
        let modelMatrix = transform.clone();
        if (Cesium.defined(longitude) && Cesium.defined(latitude)) {
            modelMatrix = getTransForm(transform, longitude, latitude, height);
        }
        tileset.clippingPlanes = new Cesium.ClippingPlaneCollection({
            modelMatrix,
            planes,
            edgeColor,
            edgeWidth,
            unionClippingRegions
        });
        const planeEntityArray = [];
        const { radius } = tileset.boundingSphere;
        for (let i = 0; i < planes.length; i += 1) {
            const planeEntity = this.viewer.entities.add({
                position: center,
                plane: {
                    dimensions: new Cesium.Cartesian2(radius * 2.5, radius * 2.5),
                    material
                }
            });
            planeEntityArray.push(planeEntity);
        }
        return {
            tileset,
            planes: planeEntityArray
        };
    }

    /**
     * 开始动态开挖
     * @function module:客户端可视化分析.AnalysisManager.prototype.startDynamicExcavate
     * @param {Object} options 执行开挖参数
     * @param {Object} options.planetEntity 开挖实例
     * @param {Number} options.distance 开挖距离
     * @param {Array} options.planes 平面集
     * @param {Matrix4} options.transform 转换矩阵
     */
    startDynamicExcavate(options) {
        const { planetEntity } = options;
        const { distance } = options;
        const { planes } = options;
        const { transform } = options;
        const scratchPlane = new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0);
        planetEntity.plane.plane = new Cesium.CallbackProperty(() => {
            for (let i = 0; i < planes.length; i += 1) {
                if (i === planes.length - 1) {
                    const plane = planes[i];
                    plane.distance = distance;
                    Cesium.Plane.transform(plane, transform, scratchPlane);
                }
            }
        }, false);
        this.scene.requestRender();
    }

    /**
     * 裁剪
     * @function module:客户端可视化分析.AnalysisManager.prototype.getClippingPlanes
     * @param {Array} positions
     * @returns {Array} clippingPlanes 返回裁剪面集合
     */
    getClippingPlanes(positions) {
        if (!positions) {
            return undefined;
        }
        const pointsLength = positions.length;
        if (pointsLength < 2) {
            return undefined;
        }
        const clippingPlanes = [];
        for (let i = 0; i < pointsLength; i += 1) {
            const nextIndex = (i + 1) % pointsLength;
            let midpoint = Cesium.Cartesian3.add(positions[i], positions[nextIndex], new Cesium.Cartesian3());
            midpoint = Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);
            const up = Cesium.Cartesian3.normalize(midpoint, new Cesium.Cartesian3());
            let right = Cesium.Cartesian3.subtract(positions[nextIndex], midpoint, new Cesium.Cartesian3());
            right = Cesium.Cartesian3.normalize(right, right);
            let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3());
            normal = Cesium.Cartesian3.normalize(normal, normal);
            const originCenteredPlane = new Cesium.Plane(normal, 0.0);
            const distance = Cesium.Plane.getPointDistance(originCenteredPlane, midpoint);
            clippingPlanes.push(new Cesium.ClippingPlane(normal, distance));
        }
        this.scene.requestRender();
        return clippingPlanes;
    }

    /**
     * 动态剖切
     * @function module:客户端可视化分析.AnalysisManager.prototype.createDynamicCutting
     * @param {Object} tileset 图层集
     * @param {Array} planes 平面集
     * @param {Object} options 动态剖切参数
     * @param {Color} [options.color=Color.WHITE.withAlpha(0.5)] 材质
     * @param {Number} [options.scaleHeight=2.5] 高度缩放比
     * @param {Number} [options.scaleWidth=2.5] 宽度缩放比
     * @param {Boolean} [options.interaction] 交互
     *
     * @returns {Object} 返回对象
     */
    createDynamicCutting(tilesets, planes, options) {
        if (!Cesium.defined(tilesets) && tilesets.length > 0) {
            return undefined;
        }
        var scaleHeight = Cesium.defaultValue(options.scaleHeight, 2.5);
        var scaleWidth = Cesium.defaultValue(options.scaleWidth, 2.5);
        let material = Cesium.Color.WHITE.withAlpha(0.5);
        let interaction = false;
        const optionsParam = Cesium.defaultValue(options, {});

        material = Cesium.defaultValue(optionsParam.color, material);
        interaction = Cesium.defaultValue(optionsParam.interaction, false);

        const that = this;
        const cutPlanes = [];
        for (let j = 0; j < tilesets.length; j += 1) {
            const tileset = tilesets[j];
            tileset.clippingPlanes = new Cesium.ClippingPlaneCollection({
                planes,
                edgeColor: Cesium.Color.RED,
                edgeWidth: 0,
                unionClippingRegions: false
            });
            const { radius } = tileset.boundingSphere;
            const { transform } = tileset._root;
            const center = new Cesium.Cartesian3();
            Cesium.Matrix4.getTranslation(transform, center);
            for (let i = 0; i < planes.length; i += 1) {
                const normal = planes[i].normal._cartesian3;
                const planeEntity = this.viewer.entities.add({
                    position: Cesium.CommonFunction.getPointOntoPlane(center, normal, tileset.boundingSphere.center, new Cesium.Cartesian3()),
                    plane: {
                        dimensions: new Cesium.Cartesian2(radius * scaleWidth, radius * scaleHeight),
                        material
                    }
                });
                cutPlanes.push(planeEntity);
            }
        }
        let selectedPlane;
        let downHandler;
        if (interaction) {
            downHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
            downHandler.setInputAction((movement) => {
                const pickedObject = that.scene.pick(movement.position);
                if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id) && Cesium.defined(pickedObject.id.plane)) {
                    selectedPlane = pickedObject.id.plane;
                    selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.0001);
                    selectedPlane.outlineColor = Cesium.Color.WHITE;
                    that.scene.screenSpaceCameraController.enableInputs = false;
                }
            }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);
            downHandler.setInputAction(() => {
                if (Cesium.defined(selectedPlane)) {
                    selectedPlane.material = material;
                    selectedPlane.outlineColor = material;
                    selectedPlane = undefined;
                }

                that.scene.screenSpaceCameraController.enableInputs = true;
            }, Cesium.ScreenSpaceEventType.MIDDLE_UP);
        }
        return {
            tilesets,
            planes: cutPlanes,
            handler: downHandler
        };
    }

    /**
     * 开始动态剖切
     * @function module:客户端可视化分析.AnalysisManager.prototype.startDynamicCutting
     * @param {Object} options 执行剖切参数
     * @param {Object} options.planetEntity 剖切实例
     * @param {Number} options.distance 距离
     * @param {Object} options.plane 平面
     * @param {Matrix4} options.transform 转换矩阵
     */
    startDynamicCutting(options) {
        const { planetEntity } = options;
        const { distance } = options;
        const { plane } = options;
        const { transform } = options;

        const scratchPlane = new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0);
        planetEntity.plane.plane = new Cesium.CallbackProperty(() => {
            plane.distance = distance;
            return Cesium.Plane.transform(plane, transform, scratchPlane);
        }, false);
        this.scene.requestRender();
    }

    /**
     * 移除动态剖切
     * @function module:客户端可视化分析.AnalysisManager.prototype.deleteDynamicCutting
     * @param {Object} dynaObject 动态剖切实例
     */
    deleteDynamicCutting(dynaObject) {
        if (!Cesium.defined(dynaObject)) {
            return;
        }
        const { handler } = dynaObject;
        const { planes } = dynaObject;
        let { tilesets } = dynaObject;
        if (Cesium.defined(dynaObject.tileset)) {
            if (Cesium.defined(tilesets)) {
                tilesets.push(dynaObject.tileset);
            } else {
                tilesets = [dynaObject.tileset];
            }
        }
        for (let i = 0; i < planes.length; i += 1) {
            const plane = planes[i];
            plane.distance = 0;
            this.viewer.entities.remove(plane);
        }
        if (Cesium.defined(tilesets)) {
            for (let j = 0; j < tilesets.length; j += 1) {
                const tileset = tilesets[j];
                tileset.clippingPlanes.removeAll();
            }
        }
        if (Cesium.defined(handler)) {
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MIDDLE_DOWN);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MIDDLE_UP);
        }
    }

    /**
     * 卷帘
     * @function module:客户端可视化分析.AnalysisManager.prototype.createRollershutters
     * @param {Object} tileset 图层集
     * @param {Array} planeArray 用于卷帘分析的两个面
     * @param {Number} distance 平面一的距离
     * @param {Number} distance1 平面二的距离
     * @param {Object} options 剖切面材质参数
     * @param {Color} [options.color] 剖切一的颜色
     * @param {Color} [options.color1] 剖切二的颜色
     * @example
     * 调用方法
     * analysisManager.createRollershutters([tileset],distance,distance2);
     */
    createRollershutters(tileset, planeArray, distance, distance1, options) {
        const optionsParam = Cesium.defaultValue(options, {});
        const plane = Cesium.defaultValue(planeArray[0], new Cesium.ClippingPlane(new Cesium.Cartesian3(1, 0, 0), -200.0));
        const plane1 = Cesium.defaultValue(planeArray[1], new Cesium.ClippingPlane(new Cesium.Cartesian3(-1, 0, 0), -200.0));
        const dynaCut = this.createDynamicCutting(tileset, [plane], {
            color: Cesium.defaultValue(optionsParam.color, new Cesium.Color(1.0, 1.0, 1.0, 0.3))
        });
        const planetEntity = dynaCut.planes[0];
        planetEntity.plane.plane = new Cesium.CallbackProperty(() => {
            plane.distance = distance;
            return Cesium.Plane.transform(plane, tileset[0].modelMatrix, new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0));
        }, false);
        const dynaCut1 = this.createDynamicCutting(tileset, [plane1], {
            color: Cesium.defaultValue(optionsParam.color1, new Cesium.Color(1.0, 1.0, 1.0, 0.3))
        });
        const planetEntity1 = dynaCut1.planes[0];
        planetEntity1.plane.plane = new Cesium.CallbackProperty(() => {
            plane1.distance = distance1;
            return Cesium.Plane.transform(plane1, tileset[0].modelMatrix, new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0));
        }, false);
    }

    /** 高亮
     * @function module:客户端可视化分析.AnalysisManager.prototype.startCustomDisplay
     * @param {Array<layer>} layerList 图层列表
     * @param {Array<id>} idList id列表
     * @param {Object} options 扩展属性
     * @param {Color} [options.color = new Cesium.Color(1.0,0,0,0.5)] 高亮颜色
     * @param {Cesium3DTileColorBlendMode} [options.colorBlendMode =  Cesium.Cesium3DTileColorBlendMode.HIGHLIGHT] 高亮模式
     * @param {Number} [options.colorBlendAmount =  0.5] 混合系数
     * @param {Boolean} [options.applyForLayer =  false] 是否应用至图层
     * @param {Color} [options.negate = true] 是否取反 ——意思是除了id列表中的要素应用color
     * @param {Color} [options.negateColor = new Cesium.Color.WHITE] 取反的颜色  只有在negate=true 的时候才起作用
     * @param {String} [options.style='EdgeHighlight'] 高亮模式//'EdgeHighlight'高亮+描边   'Edge'//描边
     * @param {Color} [options.edgeColor=new Cesium.Color(0, 0, 1,1.0)] //描边颜色 默认红色
     *
     */
    startCustomDisplay(layerList, idList, options) {
        if (!Cesium.defined(layerList) || !Cesium.defined(idList)) {
            return;
        }
        const optionsParam = Cesium.defaultValue(options, {});
        const that = this;
        let colorUse = Cesium.defaultValue(optionsParam.color, new Cesium.Color(1, 0, 0, 0.5));
        const edgeColorUse = Cesium.defaultValue(optionsParam.edgeColor, new Cesium.Color(1, 0, 0, 1.0));
        const negate = Cesium.defaultValue(optionsParam.negate, false);
        const negateColor = Cesium.defaultValue(optionsParam.negateColor, Cesium.Color.WHITE);
        const applyForLayer = Cesium.defaultValue(optionsParam.applyForLayer, false);
        const style = Cesium.defaultValue(optionsParam.style, '');
        const colorBlendMode = Cesium.defaultValue(optionsParam.colorBlendMode, Cesium.Cesium3DTileColorBlendMode.HIGHLIGHT);
        const colorBlendAmount = Cesium.defaultValue(optionsParam.colorBlendAmount, 0.5);
        if (style === 'Edge' && !Cesium.defined(this._edgeDetectionStageCD)) {
            this._edgeDetectionStageCD = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
            this._edgeDetectionStageCD.uniforms.color = edgeColorUse; // Color.BLUE;
            this._edgeDetectionStageCD.uniforms.length = 0.05;
            this._edgeDetectionStageCD.selected = [];
            this._silhouetteStageCD = Cesium.PostProcessStageLibrary.createSilhouetteStage([this._edgeDetectionStageCD]);
            this.viewer.scene.postProcessStages.add(this._silhouetteStageCD);
        }

        function evaluateColorCallBack(feature, result) {
            if (feature && feature.hasProperty('name')) {
                const title = feature.getProperty('name');
                const layerNow = feature.tileset;
                const values = title.split('_');
                const vlueNumber = parseInt(values[2], 10);
                let { color } = feature;
                colorUse = layerNow.color;
                if (style === 'EdgeHighlight' || style === 'Edge') {
                    if (!Cesium.defined(layerNow._edgeDetectionfeatureList)) {
                        layerNow._edgeDetectionfeatureList = [];
                    }
                    if (title !== undefined && title !== null && idList.indexOf(vlueNumber) > -1) {
                        if (layerNow._edgeDetectionfeatureList.indexOf(feature) < 0) {
                            layerNow._edgeDetectionfeatureList.push(feature);
                        }
                        that._edgeDetectionStageCD.selected = layerNow._edgeDetectionfeatureList;
                    }
                    if (style === 'Edge') {
                        return color;
                    }
                }
                if (applyForLayer) {
                    color = colorUse;
                } else if (!layerNow.negate) {
                    if (title !== undefined && title !== null && idList.indexOf(vlueNumber) > -1) {
                        color = colorUse;
                    } else {
                        color = negateColor;
                    }
                } else if (title !== undefined && title !== null && idList.indexOf(vlueNumber) > -1) {
                    color = negateColor;
                } else {
                    color = colorUse;
                }
                return Cesium.Color.clone(color, result);
            } else {
                return colorUse;
            }
        }
        for (let i = 0; i < layerList.length; i += 1) {
            const layer = layerList[i];
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
     * @function module:客户端可视化分析.AnalysisManager.prototype.stopCustomDisplay
     * @param {Array<layer>} layerList 图层列表
     */
    stopCustomDisplay(layerList) {
        if (!Cesium.defined(layerList)) {
            return;
        }
        for (let i = 0; i < layerList.length; i += 1) {
            const tileset = layerList[i];
            tileset.style = undefined;
        }
        if (Cesium.defined(this._edgeDetectionStageCD) && Cesium.defined(this._silhouetteStageCD)) {
            this.viewer.scene.postProcessStages.remove(this._silhouetteStageCD);
            this._edgeDetectionStageCD = undefined;
            this._silhouetteStageCD.destroy();
            this._silhouetteStageCD = undefined;
        }
        this.viewer.scene.render();
    }

    /**
     * 根据id停止高亮
     * @function module:客户端可视化分析.AnalysisManager.prototype.stopCustomDisplayByIds
     * @param {Array<layer>} layerList 图层列表
     * @param {Array<id>} idList ID列表
     */
    stopCustomDisplayByIds(layerList, idList) {
        if (!Cesium.defined(layerList) || !Cesium.defined(idList)) {
            return;
        }
        const that = this;

        function evaluateColorCallBack(feature, result) {
            const title = feature.getProperty('name');
            const values = title.split('_');
            const layerNow = feature.tileset;
            const vlueNumber = parseInt(values[2], 10);
            let { color } = feature;
            if (title !== undefined && title !== null && idList.indexOf(vlueNumber) > -1 && layerNow._edgeDetectionfeatureList) {
                const feIndex = layerNow._edgeDetectionfeatureList.indexOf(feature);
                if (feIndex > -1) {
                    layerNow._edgeDetectionfeatureList.splice(feIndex, 1);
                    that._edgeDetectionStageCD.selected = layerNow._edgeDetectionfeatureList;
                }
                color = Cesium.Color.WHITE;
            }
            return Cesium.Color.clone(color, result);
        }

        for (let i = 0; i < layerList.length; i += 1) {
            const tileset = layerList[i];
            tileset.style = new Cesium.Cesium3DTileStyle();
            tileset.style.color = {
                evaluateColor: evaluateColorCallBack
            };
        }
    }

    /** 模型爆炸动画版
     * @function module:客户端可视化分析.AnalysisManager.prototype.createExplosion
     * @param {Object}       options           爆炸参数
     * @param {Array<child>} options.children  当前图层子节点，如果为空则返回undefined
     * @param {Cartesian3}   options.center    爆炸中心中心
     * @param {Cartesian3}   [options.direction] 图层整体爆炸方向，默认值为 Cartesian3(1.0, 0.0, 0.0)
     * @param {Number}       [options.distance]  沿当前方向移动距离，默认值为 50
     * */
    createExplosion(options) {
        optionE.children = Cesium.defaultValue(options.children, undefined);
        if (!Cesium.defined(optionE.children)) {
            return undefined;
        }
        optionE.center = Cesium.defaultValue(options.center, undefined);
        optionE.direction = Cesium.defaultValue(options.direction, new Cesium.Cartesian3(0.0, 0.0, 1.0));
        optionE.distance = Cesium.defaultValue(options.distance, 50);
        optionE.scene = this.scene;
        optionE.viewer = this.viewer;
        optionE.deltaDistance = Cesium.defaultValue(options.speed, 1);
        optionE.directions = [];
        optionE.distancesCenterPoint = [];
        optionE.speed = Cesium.defaultValue(options.speed, 1);
        const isAxis = Cesium.defaultValue(options.isAxis, false);
        optionE.isAxis = Cesium.defaultValue(options.isAxis, false);
        const expDistance = Cesium.defaultValue(options.expDistance, 100);
        optionE.expDistance = Cesium.defaultValue(options.expDistance, 100);
        const { transform } = options;
        optionE.transform = options.transform;

        const direction = optionE.direction.clone();
        const originPoint = new Cesium.Cartesian3(0, 0, 0);
        const directionPoint = direction;
        for (let i = 0; i < optionE.children.length; i += 1) {
            const child = optionE.children[i];
            if (Cesium.defined(optionE.center)) {
                const childCenter = child.boundingSphere.center;
                Cesium.Cartesian3.subtract(childCenter, optionE.center, direction);
                const length = Cesium.Cartesian3.magnitude(direction);
                if (length < 1.0e-10) {
                    direction.x = 1.0;
                }
                Cesium.Cartesian3.normalize(direction, direction);
                optionE.directions.push(direction.clone());
            }
        }
        if (isAxis) {
            Cesium.Matrix4.multiplyByPoint(transform, originPoint, originPoint);
            Cesium.Matrix4.multiplyByPoint(transform, directionPoint, directionPoint);
            Cesium.Cartesian3.subtract(directionPoint, originPoint, direction);
            const length = Cesium.Cartesian3.magnitude(direction);
            if (length < 1.0e-10) {
                direction.x = 1.0;
            }
            Cesium.Cartesian3.normalize(direction, direction);
            for (let i = 0; i < optionE.children.length; i += 1) {
                optionE.directions.push(direction.clone());
            }
            const result = getDistance(optionE.children, expDistance);
            optionE.children = result.childList;
            optionE.distances = result.distances;
            const temp = result.distances[0];
            optionE.maxDistances = temp;
            this.viewer.clock.onTick.addEventListener(clockT);
        } else {
            this.viewer.clock.onTick.addEventListener(clockT);
        }
        this.scene.requestRender();
        return undefined;
    }

    /**
     * 模型爆炸无动画版
     * @function module:客户端可视化分析.AnalysisManager.prototype.createExplosion1
     * @param {Object}       options           爆炸参数
     * @param {Array<child>} options.children 当前图层子节点，如果为空则返回undefined
     * @param {Cartesian3} options.center 包围盒中心点
     * @param {Cartesian3} [options.direction] 子节点爆炸方向
     * @param {Number} [options.distance] 子节点爆炸距离
     * @param {Boolean} [options.isAxis] 是否执行轴向爆炸，默认为false中心点爆炸，为true时轴向爆炸
     * @param {Number} [options.expDistance] 爆炸移动距离基数
     */
    createExplosion1(options) {
        let children = Cesium.defaultValue(options.children, undefined);
        if (!Cesium.defined(children)) {
            return undefined;
        }
        const center = Cesium.defaultValue(options.center, undefined);
        let direction = Cesium.defaultValue(options.direction, new Cesium.Cartesian3(0.0, 0.0, 1.0));
        const distance = Cesium.defaultValue(options.distance, 50);
        const isAxis = Cesium.defaultValue(options.isAxis, false);
        const expDistance = Cesium.defaultValue(options.expDistance, 100);
        const { scene } = this;

        const matrixChild = new Cesium.Matrix4();
        if (isAxis === false) {
            for (let i = 0; i < children.length; i += 1) {
                const child = children[i];
                if (Cesium.defined(center)) {
                    const childCenter = child.boundingSphere.center;
                    Cesium.Cartesian3.subtract(center, childCenter, direction);
                    const length = Cesium.Cartesian3.magnitude(direction);
                    if (length < 1.0e-10) {
                        direction.x = 1.0;
                    }
                }
                Cesium.Cartesian3.normalize(direction, direction);
                optionE.directions.push(direction.clone());
                Cesium.Cartesian3.multiplyByScalar(direction, distance, direction);
                Cesium.Matrix4.fromTranslation(direction, matrixChild);
                child.transform = matrixChild.clone();
            }
        }
        if (isAxis) {
            const transform = Cesium.defaultValue(options.transform);
            if (transform === undefined) {
                return undefined;
            }
            const originPoint = new Cesium.Cartesian3(0, 0, 0);
            const directionPoint = direction.clone();
            Cesium.Matrix4.multiplyByPoint(transform, originPoint, originPoint);
            Cesium.Matrix4.multiplyByPoint(transform, directionPoint, directionPoint);
            Cesium.Cartesian3.subtract(directionPoint, originPoint, direction);
            const length = Cesium.Cartesian3.magnitude(direction);
            if (length < 1.0e-10) {
                direction.x = 1.0;
            }
            Cesium.Cartesian3.normalize(direction, direction);
            optionE.direction = direction.clone();
            const result = getDistance(children, expDistance);
            children = result.childList;
            const { distances } = result;
            const tempDirection = direction.clone();
            for (let i = 0; i < children.length; i += 1) {
                const child = children[i];
                Cesium.Cartesian3.multiplyByScalar(direction, distances[i], direction);
                Cesium.Matrix4.fromTranslation(direction, matrixChild);
                direction = tempDirection.clone();
                child.transform = matrixChild.clone();
            }
        }
        scene.requestRender();
        return undefined;
    }

    /**
     * 移除爆炸
     * @function module:客户端可视化分析.AnalysisManager.prototype.recoverExplosion
     * @param {Object} options 移除爆炸参数
     * @param {Array<child>} options.children 当前图层子节点，如果为空则返回undefined
     */
    recoverExplosion(options) {
        const children = Cesium.defaultValue(options.children, undefined);
        if (!Cesium.defined(children)) {
            return undefined;
        }
        const matrixChild = new Cesium.Matrix4();
        if (optionE.direction) {
            const direction = optionE.direction.clone();
            if (direction.x !== 0 || direction.x !== 0.0) {
                direction.x *= -1.0;
            } else if (direction.y !== 0 || direction.y !== 0.0) {
                direction.y *= -1.0;
            } else if (direction.z !== 0 || direction.z !== 0.0) {
                direction.z *= -1.0;
            }
            for (let i = 0; i < children.length; i += 1) {
                const child = children[i];
                Cesium.Matrix4.fromTranslation(direction, matrixChild);
                child.transform = matrixChild.clone();
            }
        } else if (optionE.directions) {
            for (let i = 0; i < children.length; i += 1) {
                const direction = optionE.directions[i].clone();
                direction.x *= -1.0;
                direction.y *= -1.0;
                direction.z *= -1.0;

                const child = children[i];
                Cesium.Matrix4.fromTranslation(direction, matrixChild);
                child.transform = matrixChild.clone();
            }
        }
        this.scene.requestRender();
        return undefined;
    }

    /**
     * 添加场景特效
     * @function module:客户端可视化分析.AnalysisManager.prototype.addSceneEffect
     * @param {Object} effect 场景特效实例
     * @see https://cesium.com/docs/cesiumjs-ref-doc/PostProcessStage.html
     * @see https://cesium.com/docs/cesiumjs-ref-doc/PostProcessStageComposite.html
     */
    addSceneEffect(effect) {
        if (Cesium.defined(effect)) {
            return this.scene.postProcessStages.add(effect._effect);
        }
        return undefined;
    }

    /**
     * 移除场景特效
     * @function module:客户端可视化分析.AnalysisManager.prototype.removeSceneEffect
     * @param {Object} effect 场景特效实例
     */
    removeSceneEffect(effect) {
        if (Cesium.defined(effect)) {
            this.scene.postProcessStages.remove(effect._effect);
        }
    }

    /**
     * 移除全部场景特效
     * @function module:客户端可视化分析.AnalysisManager.prototype.removeAllSceneEffect
     */
    removeAllSceneEffect() {
        this.scene.postProcessStages.removeAll();
    }
}

CesiumZondy.Manager.AnalysisManager = AnalysisManager;
