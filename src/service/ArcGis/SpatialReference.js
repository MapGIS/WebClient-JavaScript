import {
    Zondy,extend
} from "../common";
import {ArcGisBaseParam} from "./BaseParam";

/**
 * @class module:ArcGis.ArcGisSpatialReference
 * @description ArcGis服务
 * @author 基础平台-杨琨
 * @param options - {Object} 必选项，构造点对象参数。
 * @param {Number} [options.wkid] 可选项。空间坐标系编号。如：4326、3857。
 * @param {String} [options.wkt] 可选项。空间坐标系的描述信息。
 */
class ArcGisSpatialReference extends ArcGisBaseParam{
    constructor(options) {
        super();
        this.imageCoordinateSystem = null;
        this.isGeographic = false;
        this.isWebMercator = false;
        this.isWGS84 = false;
        this.isWrappable = false;
        this.WebMercator = null;
        this.WGS84 = null;
        this.latestVcsWkid = null;
        this.latestWkid = null;
        this.vcsWkid = null;
        this.wkid = undefined;
        this.wkt = null;

        extend(this,options);

        if(this.wkid === 3857){
            this.isWebMercator = true;
            this.isWrappable = true;
        }else if(this.wkid === 4326){
            this.sGeographic = true;
            this.isWGS84 = true;
            this.isWrappable = true;
        }
    }
}

/**
 * @function module:ArcGis.ArcGisSpatialReference.prototype.equals
 * @description 比较两个空间坐标系对象是否相等，如果wkid和wkt相等，怎犯规true。
 * @param sr - {ArcGisSpatialReference} 必选项，要比较的ArcGisSpatialReference对象。
 * @returns {boolean} 是否相等。
 */
ArcGisSpatialReference.prototype.equals = function (sr) {
    return sr.wkid === this.wkid || sr.wkt === this.wkt;
}

export {ArcGisSpatialReference};
Zondy.Service.ArcGisSpatialReference = ArcGisSpatialReference;