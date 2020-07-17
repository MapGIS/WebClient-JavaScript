import { CesiumZondy } from '../core/Base';
/**
 * @class PopupElement
 * @author 基础平台研发中心·冯桂英
 * @category PopupElement
 * @classdesc popup类
 * @description 记录popup信息
 * @param {Oeject} optionsParam 信息
 * @param {String} optionsParam.id 代表divID
 * @param {String} optionsParam.id 代表容器divID
 * @param {Cartesian3} optionsParam.position 坐标（地图坐标）
 * @param {String} optionsParam.element div元素
 * @param {String} optionsParam.wPosition 窗口位置
 * @param {Array} offset [x,y]偏移值，像素单位
 * @param {Number} optionsParam.scaleByDistance 基于距摄像机距离指定广告牌比例
 * @param {Number} options.translucencyByDistance 基于距摄像机的距离来指定广告牌的透明度
 * @param {Number} options.pixelOffsetScaleByDistance 基于距摄像机的距离指定广告牌像素偏移
 */
export default class PopupElement {
    constructor(optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        this.id = Cesium.defaultValue(options.id, null);
        this.containID = Cesium.defaultValue(options.containID, null);
        this.position = Cesium.defaultValue(options.position, null);
        this.element = Cesium.defaultValue(options.element, null);
        this.wPosition = Cesium.defaultValue(options.wPosition, null);
        this.offset = Cesium.defaultValue(options.offset, [0, 0]);
        this.scaleByDistance = Cesium.defaultValue(options.scaleByDistance, null);
        this.translucencyByDistance = Cesium.defaultValue(options.translucencyByDistance, null);
        this.pixelOffsetScaleByDistance = Cesium.defaultValue(options.pixelOffsetScaleByDistance, null);
    }
}
CesiumZondy.Manager.PopupElement = PopupElement;
