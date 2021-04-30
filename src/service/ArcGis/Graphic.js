import {
    Zondy,extend
} from "../common";
import {ArcGisBaseParam} from "./BaseParam";

/**
 * @class module:ArcGis.ArcGisGraphic
 * @description ArcGis服务
 * @author 基础平台-杨琨
 * @param options - {Object} 必选项，构造点对象参数。
 * @param {Object} [options.attributes] 必选项。要插入要素的字段值。
 * @param {Geometry} [options.geometry] 必选项。要插入的要素的几何坐标对象。
 */

class ArcGisGraphic extends ArcGisBaseParam{
    constructor(options) {
        super();
        this.attributes = null;
        this.geometry = null;
        this.isAggregate = false;
        this.layer = null;
        this.popupTemplate = null;
        this.symbol = null;
        this.visible = true;

        extend(this,options);
    }
}

/**
 * @function module:ArcGis.ArcGisGraphic.prototype.getAttribute
 * @description 根据输入的字段名，查询attributes，返回所对应的值。
 * @param name - {String} 必选项，字段名。
 * @returns {String} 字段对应的值。
 */
ArcGisGraphic.prototype.getAttribute = function (name){
    return this.attributes[name];
}

ArcGisGraphic.prototype.getEffectivePopupTemplate = function (defaultPopupTemplateEnabled){
    // return this.attributes[name];
}

/**
 * @function module:ArcGis.ArcGisGraphic.prototype.getObjectId
 * @description 返回objectId。
 * @returns {Number} objectId。
 */
ArcGisGraphic.prototype.getObjectId = function (){
    return this.attributes["objectId"];
}

/**
 * @function module:ArcGis.ArcGisGraphic.prototype.setAttribute
 * @description 新增一个字段属性。
 * @param name - {String} 必选项，字段名。
 * @param newValue - {Object} 必选项，字段值。
 * @returns {String} 新加入的值。
 */
ArcGisGraphic.prototype.setAttribute = function (name, newValue){
    return this.attributes[name] = newValue;
}

export {ArcGisGraphic};
Zondy.Service.ArcGisGraphic = ArcGisGraphic;