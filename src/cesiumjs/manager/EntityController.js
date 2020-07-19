import { CesiumZondy } from '../core/Base';

import BaseLayer from '../layer/BaseLayer';
import CommonFuncManager from './CommonFuncManager';

/**
 * @author 三维基础平台研发中心·冯桂英
 * @class module:客户端可视化.EntityController
 * @category EntityController
 * @classdesc 实体绘制控制器类
 * @description 该类实现了实体数据的绘制与删除功能
 * @param optionsParam.viewer viewer 视图
 */
export default class EntityController extends BaseLayer {
    constructor(optionsParam) {
        const options = optionsParam;
        super(options);
        this._commFun = new CommonFuncManager(options);
    }

    /**
     * @private
     */
    get commFun() {
        return this._commFun;
    }

    /**
     * 添加点
     * @function module:客户端可视化.EntityController.prototype.appendPoint
     * @param  {Number} lat 经度
     * @param  {Number} lon 纬度
     * @param  {Number} height 高程
     * @param  {String} name 名称
     * @param  {Number} pixelSize 像素大小
     * @param  {Color}  color (webGlobe.getColor(1,0,0,1))颜色
     * @param  {Color}  outlineColor 外边线颜色
     * @param  {Number} outlineWidth 边线宽度
     * @param  {String} description 属性描述信息
     * @returns {Entity}    返回点对象 移除通过removeEntity(entity)
     * @example
     * let entityController = new EntityController({viewer:viewer});
     * let color1 = new Cesium.Color(1, 0, 0, 1);
     * let color2 = new Cesium.Color(1, 1, 0, 1);
     * let point = entityController.appendPoint(115.2, 31, 200, '点', 100, color1, color2, 2);
     * // 跳转到点位置
     * viewer.flyTo(point);
     *
     */
    appendPoint(lat, lon, height, name, pixelSize, color, outlineColor, outlineWidth, description) {
        if (undefined === this.viewer) {
            return undefined;
        }
        const point = this.viewer.entities.add({
            name,
            position: Cesium.Cartesian3.fromDegrees(lat, lon, height),
            point: {
                // 点
                pixelSize,
                color,
                outlineColor,
                outlineWidth
            },
            description
        });
        return point;
    }

    /**
     * 通用添加点
     * @function module:客户端可视化.EntityController.prototype.appendPointComm
     * @param  {Number} lat 经度
     * @param  {Number} lon 纬度
     * @param  {Number} height 高程
     * @param  {String} name 名称
     * @param  {String} description 属性描述信息
     * @param  {Object} options entity参数信息对象
     * @see {@link https://cesium.com/docs/cesiumjs-ref-doc/PointGraphics.html } 参数信息
     * @example
     * let entityController = new EntityController({viewer:viewer});
     * let entity = entityController.appendPointComm(115.2, 31, 200,'点','通用点',Cesium.Color.BLUE,{outlineColor:Cesium.Color.WHITE,outlineWidth:1});
     * viewer.flyTo(entity);
     */
    appendPointComm(lat, lon, height, name, description, options) {
        const param = {
            name,
            position: Cesium.Cartesian3.fromDegrees(lat, lon, height),
            point: new Cesium.PointGraphics(),
            description
        };
        if (Cesium.defined(options)) {
            Object.extend(param, options);
        }
        const point = this.viewer.entities.add(param);
        return point;
    }

    /**
     * 添加
     * @function module:客户端可视化.EntityController.prototype.appendGraphics
     * @param {Object} options 包含entity中相关选项设置
     * @returns {Entity} 返回点对象 移除通过removeEntity(entity)
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
     */
    appendGraphics(options) {
        if (!Cesium.defined(options)) {
            return null;
        }
        const entity = new Cesium.Entity(options);
        this.viewer.entities.add(entity);
        return entity;
    }

    /**
     * 画多边形区
     * @function module:客户端可视化.EntityController.prototype.appendPolygon
     * @param {String} name  名称
     * @param {Array} points  点数组 顺序是逆时针
     * @param {Color} fillColorParam  区填充色 默认白色半透明
     * @param {Color} outlineColorParam  外框线颜色 默认红色半透明
     * @param {Object} options 参数
     * @see {@link https://cesium.com/docs/cesiumjs-ref-doc/PolygonGraphics.html }
     * @returns {Entity} 绘制的多边形区对象 移除通过removeEntity(entity)
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
    appendPolygon(name, points, fillColorParam, outlineColorParam, options) {
        const fillColor = Cesium.defaultValue(fillColorParam, Cesium.Color.WHITE.withAlpha(0.5));
        const outlineColor = Cesium.defaultValue(outlineColorParam, Cesium.Color.RED.withAlpha(0.5));
        let outlineWidth = 20;
        let height = 0;
        if (Cesium.defined(options)) {
            outlineWidth = Cesium.defaultValue(options.outlineWidth, 20);
            height = Cesium.defaultValue(options.height, 0);
        }
        const para = {
            name,
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray(points),
                extrudedHeight: 0,
                material: fillColor,
                outline: true,
                outlineColor,
                outlineWidth,
                height
            }
        };
        if (Cesium.defined(options)) {
            Object.extend(para, options);
        }
        const polygon = this.viewer.entities.add(para);
        return polygon;
    }

    /**
     * 添加带洞多边形（二维）
     * @function module:客户端公共方法.EntityController.prototype.appendHolePolygon
     * @param {String} name 名称
     * @param {Array} latLonsOut 外圈坐标:[x1,y1,x2,y2,x3,y3]
     * @param {Array} latLonsIn 内圈Array<[x1,y1,x2,y2,x3,y3]>
     * @param {Object} options 参数对象
     * @param {Color} [options.material] 填充颜色 new Cesium.Color(0, 0, 1, 1)
     * @returns {Entity} 绘制的多边形区对象 移除通过removeEntity(entity)
     * @example
     * let entityController = new EntityController({viewer:viewer});
     * let arryPointOut = [95.1550, 30.8902, 95.1668, 30.8800, 95.1836, 30.8902, 95.1696, 30.91];
     * let arrayPointIn =[[95.1617, 30.8902, 95.1668, 30.8882, 95.1766, 30.8939, 95.1696, 30.8996]];
     * let material = new Cesium.Color(1, 0, 0, 1);
     * let entity = entityController.appendHolePolygon('1',arryPointOut,arrayPointIn,{material:material});
     * viewer.flyTo(entity);
     */
    appendHolePolygon(name, latLonsOut, latLonsIn, options) {
        const holeHierars = [];
        if (Cesium.defined(latLonsIn) && latLonsIn.length > 0) {
            for (let i = 0; i < latLonsIn.length; i += 1) {
                holeHierars.push(new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(latLonsIn[i])));
            }
        }
        const polyHierar = new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(latLonsOut), holeHierars);
        const para = {
            name,
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
        const polygon = this.viewer.entities.add(para);
        return polygon;
    }

    /**
     * 添加带洞贴地区
     * @function module:客户端可视化.EntityController.prototype.appendHolePolygonOnTerrain
     * @param {String} name 名称
     * @param {Array} latLonsOut 外圈点
     * @param {Array} latLonsIn 内圈点
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
    appendHolePolygonOnTerrain(name, latLonsOut, latLonsIn, step, options, callback) {
        const cartographics = [];
        const { ellipsoid } = this.viewer.scene.globe;

        const num = latLonsOut.length / 2;
        const positions = [];
        for (let i = 0; i < num; i += 1) {
            positions.push(new Cesium.Cartesian2(latLonsOut[i * 2], latLonsOut[2 * i + 1]));
        }
        const pnts = CommonFuncManager.linearInterpolate(positions, step);

        if (pnts !== null && pnts.length > 0) {
            for (let j = 0; j < pnts.length; j += 1) {
                const cartographic = this.ellipsoid.cartesianToCartographic(Cesium.Cartesian3.fromDegrees(pnts[j].x, pnts[j].y, 0, ellipsoid));
                cartographics.push(cartographic);
            }
        }

        const outNum = [];
        outNum.push(cartographics.length);

        if (Cesium.defined(latLonsIn) && latLonsIn.length > 0) {
            for (let k = 0; k < latLonsIn.length; k += 1) {
                const lonLatArrHole = latLonsIn[k];
                const numHole = lonLatArrHole.length / 2;
                const positionsHole = [];
                for (let m = 0; m < numHole; m += 1) {
                    positionsHole.push(new Cesium.Cartesian2(lonLatArrHole[m * 2], lonLatArrHole[2 * m + 1]));
                }
                const pntsHole = CommonFuncManager.linearInterpolate(positionsHole, step);

                if (pntsHole !== null && pntsHole.length > 0) {
                    for (let n = 0; n < pntsHole.length; n += 1) {
                        const cartographicTem = this.ellipsoid.cartesianToCartographic(Cesium.Cartesian3.fromDegrees(pntsHole[n].x, pntsHole[n].y, 0, ellipsoid));
                        cartographics.push(cartographicTem);
                    }
                    outNum.push(cartographics.length);
                }
                positionsHole.length = 0;
            }
        }

        const promise = Cesium.sampleTerrain(this.viewer.terrainProvider, 16, cartographics);
        Cesium.when(promise, (updatedPositions) => {
            const cartesianPositions = this.ellipsoid.cartographicArrayToCartesianArray(updatedPositions);

            const outPos = cartesianPositions.slice(0, outNum[0]);
            const inPolygonHierarchyArr = [];
            for (let i = 1; i < outNum.length; i += 1) {
                inPolygonHierarchyArr.push(new Cesium.PolygonHierarchy(cartesianPositions.slice(outNum[i - 1], outNum[i])));
            }
            const polyHierar = new Cesium.PolygonHierarchy(outPos, inPolygonHierarchyArr);
            const para = {
                name,
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
            const retultEntity = this.viewer.entities.add(para);
            if (typeof callback === 'function') {
                callback(retultEntity);
            }
        });
    }

    /**
     * 根据给定点画线
     * @function module:客户端公共方法.EntityController.prototype.appendLine
     * @param  {String} name 名称
     * @param  {Array} pointsArray 点数组
     * @param  {Number} width 线的宽度
     * @param  {Color} color 线颜色(默认为蓝色)
     * @param  {Boolean} isHeight 设置是否识别带高度的坐标
     * @param  {Object} options 包含的附加属性
     * @see {@link https://cesium.com/docs/cesiumjs-ref-doc/PolylineGraphics.html }
     * @returns {Entity} 绘制的线 移除通过removeEntity(entity)
     * @example
     * //不带高度
     *  let entityController = new EntityController({viewer:viewer});
     *  let color = new Cesium.Color(1, 1, 0, 1);
     *  let arrayp =[104.0, 28.0,
     *              106.0, 27.0,
     *             107.0, 28.0,
     *              108.0, 29.0];
     *  let entity = entityController.appendLine('testPtn', array, 2, color, false);
     * //带高程 并且isHeight设置为true
     *  let arrayp = [104.0, 28.0,1000,
     *               106.0, 27.0,1000,
     *               107.0, 28.0,1000,
     *               108.0, 29.0,800];
     *
     *  let entity = entityController.appendLine('testPtn', array, 2, color, true);
     *  viewer.zoomTo(entity);
     */
    appendLine(name, pointsArray, width, colorParam, isGround, options) {
        const color = Cesium.defaultValue(colorParam, Cesium.Color.BLUE);
        let posArr = null;
        if (Cesium.defined(isGround) && isGround) {
            posArr = Cesium.Cartesian3.fromDegreesArrayHeights(pointsArray);
        } else {
            posArr = Cesium.Cartesian3.fromDegreesArray(pointsArray);
        }
        const para = {
            name,
            polyline: {
                positions: posArr,
                width,
                material: color
            }
        };
        if (Cesium.defined(options)) {
            Object.extend(para, options);
        }
        const line = this.viewer.entities.add(para);
        return line;
    }

    /**
     * 根据给定点绘制贴地线(可编辑)
     * @function module:客户端公共方法.EntityController.prototype.appendLineOnTerrain
     * @param {String} name 名称
     * @param {Array} pointsArray 点数组
     * @param {Number} step 离散步长
     * @param {Number} level 地形级别
     * @param {Function} callback 回调函数
     * @returns {Entity} 绘制的线 移除通过removeEntity(entity)
     * @example
     * let entityController = new EntityController({viewer:viewer});
     * let array = [120.3, 23.0, 121.8, 23.0];
     * function appendLineSuccess(entity) {
     *      let entity = entity;
     *   }
     * entityController.appendLineOnTerrain('lineOnTerrain', array, 0.05, 16,appendLineSuccess);
     */
    appendLineOnTerrain(name, pointsArray, step, level, callback, options) {
        if (Cesium.defined(pointsArray) && pointsArray.length >= 4) {
            const num = pointsArray.length / 2;
            const positions = [];
            for (let i = 0; i < num; i += 1) {
                positions.push(new Cesium.Cartesian2(pointsArray[i * 2], pointsArray[2 * i + 1]));
            }
            const pnts = CommonFuncManager.linearInterpolate(positions, step);
            this.commFun.setZValueByTerrain(this.viewer.terrainProvider, level, pnts, this.viewer.scene.globe.ellipsoid, (pntWithz) => {
                const simplifyPnts = this.commFun.simplifyLine(pntWithz);
                const para = {
                    positions: simplifyPnts,
                    width: 1,
                    geodesic: true,
                    id: name
                };
                if (Cesium.defined(options)) {
                    Object.extend(para, options);
                }
                const polyline = new Cesium.PathTool.PolylinePrimitive(para);
                this.scene.primitives.add(polyline);
                if (typeof callback === 'function') {
                    callback(polyline);
                }
            });
        }
    }

    /**
     * 绘制贴地球线
     * @function module:客户端公共方法.EntityController.prototype.appendGroundLine
     * @param {Array} pnts 点序列
     * @param {Color} color 线颜色
     * @returns {Object} primitive对象
     * @example
     * let entityController = new EntityController({viewer:viewer});
     * let pnts = [-115.0, 37.0, -107.0, 33.0];
     * let color = new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5);
     * let primitive = entityController.appendGroundLine(pnts,color);
     */
    appendGroundLine(pnts, color) {
        const corridor = new Cesium.CorridorGeometry({
            positions: Cesium.Cartesian3.fromDegreesArray(pnts),
            width: 10,
            cornerType: Cesium.CornerType.MITERED
        });
        const lineInstance = new Cesium.GeometryInstance({
            geometry: corridor,
            id: `groundPolygon_${CommonFuncManager.generateRandom()}`,
            attributes: {
                color
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
     * @function module:客户端公共方法.EntityController.prototype.appendGroundPolygon
     * @param  {Array} outPnts   外圈坐标数组（经纬度）
     * @param  {Array} innerPnts <Array<>> inerPnts 内圈坐标数组（经纬度）
     * @param  {Color} color     填充颜色(默认不指定时为蓝色) 通过getColor(red, green, blue, alpha)
     * @param  {Options} 扩展参数
     * @see {@link https://cesium.com/docs/cesiumjs-ref-doc/GroundPrimitive.html }
     * @example
     * let entityController = new EntityController({viewer:viewer});
     * let latLon_out = [121.1550, 23.8902, 121.1668, 23.8800, 121.1836, 23.8902, 121.1696, 23.91];
     * let lanLon_in = [[121.1617, 23.8902, 121.1668, 23.8882, 121.1766, 23.8939, 121.1696, 23.8996]];
     * var color =  new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5);
     * let entity = entityController.appendGroundPolygon(latLon_out,lanLon_in,color);
     */
    appendGroundPolygon(outPnts, innerPnts, color, options) {
        let polygonGeom = null;
        if (outPnts === undefined || outPnts.length <= 0) {
            return null;
        }
        if (innerPnts === null || innerPnts.length <= 0) {
            polygonGeom = new Cesium.PolygonGeometry({
                polygonHierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(outPnts))
            });
        } else {
            const holePolygon = [];
            for (let i = 0; i < innerPnts.length; i += 1) {
                holePolygon.push(new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(innerPnts[i])));
            }
            polygonGeom = new Cesium.PolygonGeometry({
                polygonHierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(outPnts), holePolygon)
            });
        }
        const polygonInstance = new Cesium.GeometryInstance({
            geometry: polygonGeom,
            id: `groundPolygon_${CommonFuncManager.generateRandom()}`,
            attributes: {
                color
            }
        });
        const para = {
            geometryInstances: polygonInstance
        };
        if (Cesium.defined(options)) {
            Object.extend(para, options);
        }
        return this.scene.primitives.add(new Cesium.GroundPrimitive(para));
    }

    /**
     * 添加带视频的几何实体
     * @function module:客户端公共方法.EntityController.prototype.appendEntityWithVideo
     * @param  {String} videoContainID 视频（video）的dom元素id
     * @param  {PolygonGraphics} geomGraphicParam 几何图形
     * @returns {Entity} 返回添加成功的几何实体
     */
    appendEntityWithVideo(videoContainID, geomGraphicParam) {
        const geomGraphic = Cesium.defaultValue(geomGraphicParam, {});
        const videoElement = document.getElementById(videoContainID);
        if (Cesium.defined(videoElement) && Cesium.defined(geomGraphic)) {
            const imageMaterial = new Cesium.ImageMaterialProperty({
                image: videoElement
            });
            geomGraphic.material = imageMaterial;
            if (geomGraphic instanceof Cesium.PolygonGraphics) {
                return this.viewer.entities.add({
                    polygon: geomGraphic
                });
            }
        }
        return undefined;
    }
}

CesiumZondy.Manager.EntityController = EntityController;
