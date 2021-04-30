import {
    Zondy,extend,cloneObject,returnPoint
} from "../common";
import {ArcGisGeometry} from "./Geometry";
import {ArcGisPoint} from "./Point";

/**
 * @class module:ArcGis.ArcGisMultipoint
 * @description ArcGis服务
 * @author 基础平台-杨琨
 * @param options - {Object} 必选项，构造点对象参数。
 * @param {String} [options.points] 可选项。点坐标数组，
 * Example：[[x1,y1],[x2,y2]]。
 * @param {ArcGisSpatialReference} [options.spatialReference] 可选项。多边形的空间坐标系，默认4326。
 */
class ArcGisMultipoint extends ArcGisGeometry{
    constructor(options) {
        super(options);
        this.points = [];
        this.type = "multipoint";
        extend(this,options);
    }
}

/**
 * @function module:ArcGis.ArcGisMultipoint.prototype.addPoint
 * @description 添加点坐标，可以为[x,y]坐标或者ArcGisPoint对象
 * @param point - {ArcGisPoint} 必选项，要查询的多边形序号，可为点坐标数组或者坐标或者ArcGisPoint对象数组。
 */
ArcGisMultipoint.prototype.addPoint = function (point){
    if(point instanceof Array){
        this.points.push(point);
    }else if(point instanceof ArcGisPoint){
        this.points.push([point.x,point.y]);
    }
}

/**
 * @function module:ArcGis.ArcGisMultipoint.prototype.getPoint
 * @description 根据index返回ArcGisPoint对象
 * @param index - {Number} 必选项，要查询的点序号。
 * @returns ArcGisPoint，点对象
 */
ArcGisMultipoint.prototype.getPoint = function (index){
    return returnPoint(ArcGisPoint,this,this.points[index]);
}

/**
 * @function module:ArcGis.ArcGisMultipoint.prototype.removePoint
 * @description 根据index删除一个ArcGisPoint对象
 * @param index - {Number} 必选项，要查询的点序号。
 * @returns ArcGisPoint，点对象
 */
ArcGisMultipoint.prototype.removePoint = function (index){
    let positionArr = this.points.splice(index,1);
    return returnPoint(ArcGisPoint,this,positionArr);
}

/**
 * @function module:ArcGis.ArcGisMultipoint.prototype.setPoint
 * @description 根据index，更新一个点对象
 * @param index - {Number} 必选项，在pointIndex处，更新这个点。
 * @returns ArcGisMultipoint，线对象
 */
ArcGisMultipoint.prototype.setPoint = function (index,point){
    if(index >= this.points.length)
        return null;
    if(point instanceof Array){
        this.points[index] = [point[0],point[1]];
    }else if(point instanceof ArcGisPoint){
        this.points[index] = [point.x,point.y];
    }
    return this;
}

/**
 * @function module:ArcGis.ArcGisMultipoint.prototype.toGeometryJSON
 * @description 将点坐标转换为Json对象
 * @returns String
 */
ArcGisMultipoint.prototype.toGeometryJSON = function () {
    return '{"points":[[' + this.points.join("],[") + ']]}';
}

export {ArcGisMultipoint};
Zondy.Service.ArcGisMultipoint = ArcGisMultipoint;