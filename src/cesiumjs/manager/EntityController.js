import { CesiumZondy } from '../core/Base';

import BaseLayer from '../layer/BaseLayer';
import CommonFuncManager from './CommonFuncManager';

/**
 * @author 三维基础平台研发中心·邱文坤
 * @class LayerManager.EntityController
 * @category LayerManager
 * @classdesc 实体绘制控制器类
 * @description 该类实现了实体数据的绘制与删除功能
 * @param option.viewer = viewer 视图
 */
export default class EntityController extends BaseLayer {
    constructor(option) {
        super(option);
        this._commFun = new CommonFuncManager(option);
    }

    /**
     * @private
     */
    get commFun(){
        return this._commFun;
    }
    /**
     * 添加点
     * @param  {Number} lat 经度
     * @param  {Number} lon 纬度
     * @param  {Number} height 高程
     * @param  {String} name 名称
     * @param  {Number} pixelSize 像素大小
     * @param  {Color}  color (webGlobe.getColor(1,0,0,1))颜色
     * @param  {Color}  outlineColor 外边线颜色
     * @param  {Number} outlineWidth 边线宽度
     * @param  {string} description 属性描述信息
     * @example
     * let entityController = new EntityController({viewer});
     * let color1 = new Cesium.Color(1, 0, 0, 1);
     * let color2 = new Cesium.Color(1, 1, 0, 1);
     * let point = entityController.appendPoint(115.2, 31, 200, '点', 100, color1, color2, 2);
     * // 跳转到点位置
     * viewer.flyTo(point);
     *
     * @returns {entity}    返回点对象 移除通过removeEntity(entity)
     */
    appendPoint(
        lat,
        lon,
        height,
        name,
        pixelSize,
        color,
        outlineColor,
        outlineWidth,
        description
    ) {
        if (undefined === this.viewer) {
            return undefined;
        }
        let point = this.viewer.entities.add({
            name: name,
            position: Cesium.Cartesian3.fromDegrees(lat, lon, height),
            point: {
                //点
                pixelSize: pixelSize,
                color: color,
                outlineColor: outlineColor,
                outlineWidth: outlineWidth
            },
            description: description
        });
        return point;
    }

    /**
     * 通用添加点
     * @param  {Number} lat 经度
     * @param  {Number} lon 纬度
     * @param  {Number} height 高程
     * @param  {String} name 名称
     * @param  {string} description 属性描述信息
     * @param  {object} options     entity参数信息对象
     */
    appendPointComm(lat, lon, height, name, description, options) {
        let param = {
            name: name,
            position: Cesium.Cartesian3.fromDegrees(lat, lon, height),
            point: new Cesium.PointGraphics(),
            description: description
        };
        if (Cesium.defined(options)) {
            Object.extend(param, options);
        }
        var point = this.viewer.entities.add(param);
        return point;
    }

    /**
     * @private
     * 添加
     * @param  {object} entityOption 包含entity中相关选项设置
     *{
     *    id:
     *   name:
     *   availability:
     *   show:
     *   description:
     *   position:
     *   orientation:
     *   viewFrom:
     *   parent:
     *}
     * @returns {entity}    返回点对象 移除通过removeEntity(entity)
     */
    appendGraphics(options) {
        if (!Cesium.defined(options)) {
            return null;
        }
        let entity = new Cesium.Entity(options);
        this.viewer.entities.add(entity);
        return entity;
    }

    /**
     * 画多边形区
     * @param  {String} name  名称
     * @param  {Array}  points  点数组（顺序是逆时针
     * @param  {Color}  fillColor  区填充色 默认白色半透明
     * @param  {Color}  outlineColor  外框线颜色 默认红色半透明
     * @returns {entity}  绘制的多边形区对象 移除通过removeEntity(entity)
     * @example
     * let entityController = new EntityController({viewer:viewer});
     * let arryPoint =[ -115.0,37.0,
                  -115.0,32.0,
                  -107.0, 33.0,
                  -102.0,31.0,
                  -102.0,35.0];
     * let fillColor = new Cesium.Color(1, 0, 0, 1);
     * let outlineColor = new Cesium.Color(1, 1, 0, 1);
     * let entity = entityController.appendPolygon('1',arryPoint,fillColor,outlineColor);
     * viewer.flyTo(entity);
     
     */
    appendPolygon(name, points, fillColor, outlineColor, options) {
        if (fillColor === undefined) {
            fillColor = Cesium.Color.WHITE.withAlpha(0.5);
        }
        if (outlineColor === undefined) {
            outlineColor = Cesium.Color.RED.withAlpha(0.5);
        }
        var outlineWidth = 20;
        var height = 0;
        if (Cesium.defined(options)) {
            outlineWidth = Cesium.defaultValue(options.outlineWidth, 20);
            height = Cesium.defaultValue(options.height, 0);
        }
        let para = {
            name: name,
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray(points),
                extrudedHeight: 0,
                material: fillColor,
                outline: true,
                outlineColor: outlineColor,
                outlineWidth: outlineWidth,
                height: height
            }
        };
        if (Cesium.defined(options)) {
            Object.extend(para, options);
        }
        let polygon = this.viewer.entities.add(para);
        return polygon;
    }

    /**
     * 添加带洞多边形（二维）
     * @param  {String} name  名称
     * @param  {Array}  latLons_out 外圈坐标:[x1,y1,x2,y2,x3,y3]
     * @param  {Array}  latLons_in  内圈Array<[x1,y1,x2,y2,x3,y3]>
     * @param  {Object} options  参数对象
     * @param  {Color} options.material 填充颜色 new Cesium.Color(0, 0, 1, 1)
     * @returns {entity}  绘制的多边形区对象 移除通过removeEntity(entity)
     * @example
     * let entityController = new EntityController({viewer:viewer});
     * let arryPointOut = [95.1550, 30.8902, 95.1668, 30.8800, 95.1836, 30.8902, 95.1696, 30.91];
     * let arrayPointIn =[[95.1617, 30.8902, 95.1668, 30.8882, 95.1766, 30.8939, 95.1696, 30.8996]];
     * let material = new Cesium.Color(1, 0, 0, 1);
     * let entity = entityController.appendHolePolygon('1',arryPointOut,arrayPointIn,{material:material});
     * viewer.flyTo(entity);
     */
    appendHolePolygon(name, latLons_out, latLons_in, options) {
        let holeHierars = [];
        if (Cesium.defined(latLons_in) && latLons_in.length > 0) {
            for (var i = 0; i < latLons_in.length; i++) {
                holeHierars.push(
                    new Cesium.PolygonHierarchy(
                        Cesium.Cartesian3.fromDegreesArray(latLons_in[i])
                    )
                );
            }
        }
        let polyHierar = new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray(latLons_out),
            holeHierars
        );
        let para = {
            name: name,
            polygon: {
                hierarchy: polyHierar,
                perPositionHeight: false,
                outline: true,
                outlineColor: Cesium.Color.RED.withAlpha(1.0),
                outlineWidth: 10,
                material: Cesium.Color.BLUE.withAlpha(0.5)
            }
        };
        if (Cesium.defined(options)) {
            Object.extend(para.polygon, options);
        }
        let polygon = this.viewer.entities.add(para);
        return polygon;
    }

    /**
     * 添加带洞贴地区
     * @param {String} name
     * @param {Array} latLons_out 外圈点
     * @param {Array} latLons_in 内圈点
     * @param {Number} step 插值步长
     * @param {Object} options 可扩展参数
     * @param {Function} callback 回调函数
     * @example
     *  let entityController = new EntityController({viewer:viewer});
     *  let latLon_out = [121.1550, 23.8902, 121.1668, 23.8800, 121.1836, 23.8902, 121.1696, 23.91];
     *  let lanLon_in = [[121.1617, 23.8902, 121.1668, 23.8882, 121.1766, 23.8939, 121.1696, 23.8996]];
     *  let len = 0;
     *  for (let i = 0; i < latLon_out.length / 2 - 1; i++) {
     *    len += Math.sqrt(Math.pow((latLon_out[2 * i] - latLon_out[2 * (i + 1)]), 2) + Math.pow((latLon_out[2 * i + 1] - latLon_out[2 * (i + 1) + 1]), 2));
     *  }
     *  function holePolygonSuccess(entity) {
     *    viewer.flyTo(entity);
     *  }
     *  entityController.appendHolePolygonOnTerrain('aa', latLon_out, null, len / 20, null, holePolygonSuccess);
     */
    appendHolePolygonOnTerrain(
        name,
        latLons_out,
        latLons_in,
        step,
        options,
        callback
    ) {
        let cartographics = [];
        let ellipsoid = this.viewer.scene.globe.ellipsoid;

        let num = latLons_out.length / 2;
        let positions = [];
        for (let i = 0; i < num; i++) {
            positions.push(
                new Cesium.Cartesian2(
                    latLons_out[i * 2],
                    latLons_out[2 * i + 1]
                )
            );
        }
        let pnts = this.commFun.linearInterpolate(positions, step);

        if (pnts !== null && pnts.length > 0) {
            for (let j = 0; j < pnts.length; j++) {
                let cartographic = this.ellipsoid.cartesianToCartographic(
                    Cesium.Cartesian3.fromDegrees(
                        pnts[j].x,
                        pnts[j].y,
                        0,
                        ellipsoid
                    )
                );
                cartographics.push(cartographic);
            }
        }

        let outNum = [];
        outNum.push(cartographics.length);

        if (Cesium.defined(latLons_in) && latLons_in.length > 0) {
            for (let k = 0; k < latLons_in.length; k++) {
                let lonLatArr_hole = latLons_in[k];
                let num_hole = lonLatArr_hole.length / 2;
                let positions_hole = [];
                for (var m = 0; m < num_hole; m++) {
                    positions_hole.push(
                        new Cesium.Cartesian2(
                            lonLatArr_hole[m * 2],
                            lonLatArr_hole[2 * m + 1]
                        )
                    );
                }
                let pnts_hole = this.commFun.linearInterpolate(
                    positions_hole,
                    step
                );

                if (pnts_hole !== null && pnts_hole.length > 0) {
                    for (let n = 0; n < pnts_hole.length; n++) {
                        let cartographic_tem = this.ellipsoid.cartesianToCartographic(
                            Cesium.Cartesian3.fromDegrees(
                                pnts_hole[n].x,
                                pnts_hole[n].y,
                                0,
                                ellipsoid
                            )
                        );
                        cartographics.push(cartographic_tem);
                    }
                    outNum.push(cartographics.length);
                }
                positions_hole.length = 0;
            }
        }

        let promise = Cesium.sampleTerrain(
            this.viewer.terrainProvider,
            16,
            cartographics
        );
        Cesium.when(promise, (updatedPositions) => {
            let cartesianPositions = this.ellipsoid.cartographicArrayToCartesianArray(
                updatedPositions
            );

            let outPos = cartesianPositions.slice(0, outNum[0]);
            let inPolygonHierarchyArr = [];
            for (let i = 1; i < outNum.length; i++) {
                inPolygonHierarchyArr.push(
                    new Cesium.PolygonHierarchy(
                        cartesianPositions.slice(outNum[i - 1], outNum[i])
                    )
                );
            }
            let polyHierar = new Cesium.PolygonHierarchy(
                outPos,
                inPolygonHierarchyArr
            );
            let para = {
                name: name,
                polygon: {
                    hierarchy: polyHierar,
                    perPositionHeight: true,
                    outline: true,
                    outlineColor: Cesium.Color.RED.withAlpha(0.5),
                    outlineWidth: 10,
                    material: Cesium.Color.BLUE.withAlpha(0.5),
                    classificationType: Cesium.ClassificationType.TERRAIN
                }
            };
            if (Cesium.defined(options)) {
                Object.extend(para, options);
            }
            let retultEntity = this.viewer.entities.add(para);
            if (typeof callback === 'function') {
                callback(retultEntity);
            }
        });
    }

    /**
     * 根据给定点画线
     * @param  {String} name 名称
     * @param  {Array} pointsArray 点数组
     * @param  {Number} width 线的宽度
     * @param  {Color} color 线颜色(默认为蓝色)
     * @param  {Boolean} isGround 设置为是否贴地(可识别带高度的坐标)
     * @param  {Object} options 包含的附加属性
     * @example
     * //不带高度
     *  let entityController = new EntityController({viewer:viewer});
     *  let color = new Cesium.Color(1, 1, 0, 1);
     *  let arrayp =[104.0, 28.0,
     *              106.0, 27.0,
     *             107.0, 28.0,
     *              108.0, 29.0];
     *  let entity = entityController.appendLine('testPtn', array, 2, color, false);
     * //带高程 并且isGround设置为true
     *  let arrayp = [104.0, 28.0,1000,
     *               106.0, 27.0,1000,
     *               107.0, 28.0,1000,
     *               108.0, 29.0,800];
     *
     *  let entity = entityController.appendLine('testPtn', array, 2, color, true);
     *  viewer.zoomTo(entity);
     * @returns {entity} 绘制的线 移除通过removeEntity(entity)
     */
    appendLine(name, pointsArray, width, color, isGround, options) {
        if (color === undefined) {
            color = Cesium.Color.BLUE;
        }
        let posArr = null;
        if (Cesium.defined(isGround) && isGround) {
            posArr = Cesium.Cartesian3.fromDegreesArrayHeights(pointsArray);
        } else {
            posArr = Cesium.Cartesian3.fromDegreesArray(pointsArray);
        }
        let para = {
            name: name,
            polyline: {
                positions: posArr,
                width: width,
                material: color
            }
        };
        if (Cesium.defined(options)) {
            Object.extend(para, options);
        }
        let line = this.viewer.entities.add(para);
        return line;
    }

    /**
     * 根据给定点绘制贴地线(可编辑)
     * @param  {String} name  名称
     * @param  {Array} pointsArray 点数组
     * @param  {Number} step 离散步长
     * @param  {Number} level 地形级别
     * @param  {function} callback 回调函数
     * @see removeEntity
     * @example
     * let entityController = new EntityController({viewer:viewer});
     * let array = [120.3, 23.0, 121.8, 23.0];
     * function appendLineSuccess(entity) {
     *      let entity = entity;
     *   }
     * entityController.appendLineOnTerrain('lineOnTerrain', array, 0.05, 16,appendLineSuccess);
     * @returns {entity} 绘制的线 移除通过removeEntity(entity)
     */
    appendLineOnTerrain(name, pointsArray, step, level, callback, options) {
        if (Cesium.defined(pointsArray) && pointsArray.length >= 4) {
            let num = pointsArray.length / 2;
            let positions = [];
            for (var i = 0; i < num; i++) {
                positions.push(
                    new Cesium.Cartesian2(
                        pointsArray[i * 2],
                        pointsArray[2 * i + 1]
                    )
                );
            }
            var pnts = this.commFun.linearInterpolate(positions, step);
            this.commFun.setZValueByTerrain(
                this.viewer.terrainProvider,
                level,
                pnts,
                this.viewer.scene.globe.ellipsoid,
                 pnts => {
                    var simplify_pnts = this.commFun.simplifyLine(pnts);
                    var para = {
                        positions: simplify_pnts,
                        width: 1,
                        geodesic: true,
                        id: name
                    };
                    if (Cesium.defined(options)) {
                        Object.extend(para, options);
                    }
                    let polyline = new Cesium.PathTool.PolylinePrimitive(para);
                    this.scene.primitives.add(polyline);
                    if (typeof callback === 'function') {
                        callback(polyline);
                    }
                }
            );
        }
    }

    /**
     * 绘制贴地线
     * @param {Number[]} pnts 点序列
     * @param {Color} color 线颜色
     * @returns {Object}  primitive
     * @example
     * let entityController = new EntityController({viewer:viewer});
     * let pnts = [-115.0, 37.0, -107.0, 33.0];
     * let color = new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5);
     * let primitive = entityController.appendGroundLine(pnts,color);
     */
    appendGroundLine(pnts, color) {
        let corridor = new Cesium.CorridorGeometry({
            positions: Cesium.Cartesian3.fromDegreesArray(pnts),
            width: 100,
            cornerType: Cesium.CornerType.MITERED
        });
        let lineInstance = new Cesium.GeometryInstance({
            geometry: corridor,
            id: 'groundPolygon_' + this.commFun.generateRandom(),
            attributes: {
                color: color
            }
        });
        return this.scene.primitives.add(
            new Cesium.GroundPrimitive({
                geometryInstances: lineInstance
            })
        );
    }

    /**
     * 根据给定点画贴地多边形
     * @param  {Array} outPnts   外圈坐标数组（经纬度）
     * @param  {Array}  Array<Array<>> inerPnts 内圈坐标数组（经纬度）
     * @param  {Color} color     填充颜色(默认不指定时为蓝色) 通过getColor(red, green, blue, alpha)
     * @param  {Options} 可扩展参数
     * @see {@link https://cesium.com/docs/cesiumjs-ref-doc/GroundPrimitive.html?classFilter=GroundPrimitive }
     * @example
     * let entityController = new EntityController({viewer:viewer});
     * let latLon_out = [121.1550, 23.8902, 121.1668, 23.8800, 121.1836, 23.8902, 121.1696, 23.91];
     * let lanLon_in = [[121.1617, 23.8902, 121.1668, 23.8882, 121.1766, 23.8939, 121.1696, 23.8996]];
     * var color =  new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5);
     * let entity = entityController.appendGroundPolygon(latLon_out,lanLon_in,color); 
     */
    appendGroundPolygon(outPnts, inerPnts, color, options) {
        let polygonGeom = null;
        if (outPnts === undefined || outPnts.length <= 0) {
            return null;
        }
        if (inerPnts === null || inerPnts.length <= 0) {
            polygonGeom = new Cesium.PolygonGeometry({
                polygonHierarchy: new Cesium.PolygonHierarchy(
                    Cesium.Cartesian3.fromDegreesArray(outPnts)
                )
            });
        } else {
            let holePolygon = [];
            for (let i = 0; i < inerPnts.length; i++) {
                holePolygon.push(
                    new Cesium.PolygonHierarchy(
                        Cesium.Cartesian3.fromDegreesArray(inerPnts[i])
                    )
                );
            }
            polygonGeom = new Cesium.PolygonGeometry({
                polygonHierarchy: new Cesium.PolygonHierarchy(
                    Cesium.Cartesian3.fromDegreesArray(outPnts),
                    holePolygon
                )
            });
        }
        let polygonInstance = new Cesium.GeometryInstance({
            geometry: polygonGeom,
            id: 'groundPolygon_' + this.commFun.generateRandom(),
            attributes: {
                color: color
            }
        });
        let para = {
            geometryInstances: polygonInstance
        };
        if (Cesium.defined(options)) {
            Object.extend(para, options);
        }
        return this.scene.primitives.add(new Cesium.GroundPrimitive(para));
    }
}

CesiumZondy.Layer.EntityController = EntityController;
