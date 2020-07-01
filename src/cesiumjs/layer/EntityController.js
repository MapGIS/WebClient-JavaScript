import { CesiumZondy } from "../core/Base";

import BaseLayer from "./BaseLayer";

/**
 * @author 三维基础平台研发中心·邱文坤
 * @class LayerManager.EntityController
 * @category LayerManager
 * @classdesc 实体绘制控制器类
 * @description 该类实现了实体数据的绘制与删除功能
 * @param option.viewer = viewer 视图
 * @see
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
        description,
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
                outlineWidth: outlineWidth,
            },
            description: description,
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
            description: description,
        };
        if (Cesium.defined(options)) {
            Object.extend(param, options);
        }
        var point = this.viewer.entities.add(param);
        return point;
    }
}

CesiumZondy.Layer.EntityController = EntityController;
