import { CesiumZondy } from '../core/Base';

import BaseLayer from './BaseLayer';

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
     * 添加贴地区
     * @param {String} name
     * @param {Array} latLons_out 外圈点
     * @param {Array} latLons_in 内圈点
     * @param {Number} step 插值步长
     * @param {Object} options 可扩展参数
     * @param {Function} callback 回调
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
        for (let i in num) {
            positions.push(
                new Cesium.Cartesian2(
                    latLons_out[i * 2],
                    latLons_out[2 * i + 1]
                )
            );
        }
        let pnts = CommFunction.linearInterpolate(positions, step);

        if (pnts !== null && pnts.length > 0) {
            for (let j in pnts) {
                let cartographic = ellipsoid.cartesianToCartographic(
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
        outNum.push(cartographics.length); //外圈点数

        if (defined(latLons_in) && latLons_in.length > 0) {
            for (let k in latLons_in) {
                let lonLatArr_hole = latLons_in[k];
                let num_hole = lonLatArr_hole.length / 2;
                let positions_hole = [];
                for (var m in num_hole) {
                    positions_hole.push(
                        new Cesium.Cartesian2(
                            lonLatArr_hole[m * 2],
                            lonLatArr_hole[2 * m + 1]
                        )
                    );
                }
                let pnts_hole = CommFunction.linearInterpolate(
                    positions_hole,
                    step
                );

                if (pnts_hole !== null && pnts_hole.length > 0) {
                    for (let n in pnts_hole) {
                        let cartographic_tem = ellipsoid.cartesianToCartographic(
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

        let viewer = this.viewer;

        let promise = Cesium.sampleTerrain(
            viewer.terrainProvider,
            16,
            cartographics
        );
        when(promise, function (updatedPositions) {
            let cartesianPositions = ellipsoid.cartographicArrayToCartesianArray(
                updatedPositions
            );

            let outPos = cartesianPositions.slice(0, outNum[0]);
            let inPolygonHierarchyArr = [];
            for (var i in outNum) {
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
                    material: Cesium.Color.BLUE.withAlpha(0.5)
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
}

CesiumZondy.Layer.EntityController = EntityController;
