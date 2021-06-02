import {
    Zondy,extend
} from "../common";
import {ArcGisGeometry} from "./Geometry";
import proj4 from "proj4";
import {ArcGisSpatialReference} from "./SpatialReference";

/**
 * @class module:ArcGis.ArcGisPoint
 * @description 生成Point对象
 * @author 基础平台-杨琨
 * @param options - {Object} 必选项，构造点对象参数。
 * @param {String} [options.latitude] 可选项。纬度。
 * @param {String} [options.longitude] 可选项。经度。
 * @param {String} [options.m] 可选项。m值。
 * @param {String} [options.x] 可选项。x值，单位米。
 * @param {String} [options.y] 可选项。y值，单位米。
 * @param {String} [options.z] 可选项。z值，单位米。
 */
class ArcGisPoint extends ArcGisGeometry{
    constructor(options) {
        super();
        this.hasM = false;
        this.hasZ = false;
        this.latitude = 0;
        this.longitude = 0;
        this.m = undefined;
        this.x = 0;
        this.y = 0;
        this.z = undefined;
        this.type = "point";

        //保留原始坐标系
        let originalSR = this.spatialReference.wkid;

        extend(this,options);

        //options存才要做的处理
        if(options){
            if(!options.hasOwnProperty("spatialReference")
                    || (options.hasOwnProperty("spatialReference") && options.spatialReference.hasOwnProperty("wkid") && options.spatialReference.wkid === 4326)){
                //如果options里面的经纬度或者xy值没有，则为undefined
                let me = this;
                ["longitude","latitude","x","y"].forEach(function (key) {
                    if(!options.hasOwnProperty(key)) me[key] = undefined;
                })

                //如果x或y存在，增强行将xy的值传给经纬度
                if(options.hasOwnProperty("x"))this.longitude = this.x;
                if(options.hasOwnProperty("y"))this.latitude = this.y;
                if(!options.hasOwnProperty("x") && options.hasOwnProperty("longitude")) this.x = this.longitude;
                if(!options.hasOwnProperty("y") && options.hasOwnProperty("latitude")) this.y = this.latitude;
            }else if(options.hasOwnProperty("spatialReference") && options.spatialReference.hasOwnProperty("wkid")
                && options.spatialReference.wkid === 3857){
                if(options.hasOwnProperty("longitude") && options.hasOwnProperty("latitude")){
                    P(originalSR,"3857",[this.longitude,this.latitude],"x","y",this,options);
                }else if(options.hasOwnProperty("x") && options.hasOwnProperty("y")){
                    P("3857",originalSR,[this.x,this.y],"longitude","latitude",this,options);
                }else {
                    if(!options.hasOwnProperty("x")){
                        if(options.hasOwnProperty("longitude")) this.x = this.longitude;
                        if(!options.hasOwnProperty("longitude")) this.x = this.longitude = undefined;
                    }
                    if(!options.hasOwnProperty("y")){
                        if(options.hasOwnProperty("latitude")) this.y = this.latitude;
                        if(!options.hasOwnProperty("latitude")) this.y = this.latitude = undefined;
                    }
                    P("3857",originalSR,[this.x,this.y],"longitude","latitude",this,options);
                }
            }
        }else {
            this.x = this.y = this.latitude = this.longitude = undefined;
        }

        //只有m值存在，hasM才为true否则为false
        this.hasM = !!this.m;

        //只有z值存在，hasZ才为true否则为false
        this.hasZ = !!this.z;
    }
}

/**
 * @function module:ArcGis.ArcGisPoint.prototype.toArray
 * @description 返回[x,y]坐标数组，如果有z值，则返回[x,y,z]
 * @author 基础平台-杨琨
 * @returns [x,y,z]坐标数组
 */
ArcGisPoint.prototype.toArray = function () {
    let position = [];
    position.push(this.x);
    position.push(this.y);
    if(this.z)
    position.push(this.z);
    return position;
}

/**
 * @function module:ArcGis.ArcGisPoint.prototype.copy
 * @description 复制point的所有值，并覆盖当前对象
 * @author 基础平台-杨琨
 * @param point - {ArcGisPoint} 必选项，查询参数。
 */
ArcGisPoint.prototype.copy = function (point){
    extend(this,point);
}

/**
 * @function module:ArcGis.ArcGisPoint.prototype.distance
 * @description 根据两个point的x、y、z值，算出两点的距离
 * @author 基础平台-杨琨
 * @param point - {ArcGisPoint} 必选项，查询参数。
 * @returns Number，两点距离
 */
ArcGisPoint.prototype.distance = function (point){
    let width = Math.abs(this.x - point.x),
        height = Math.abs(this.y - point.y),
        zLength = 0;
    if(this.hasZ && point.hasZ) zLength = Math.abs(this.z - point.z);
    return Math.sqrt(Math.pow(width,2) + Math.pow(height,2) + Math.pow(zLength,2));
}

/**
 * @function module:ArcGis.ArcGisPoint.prototype.equals
 * @description 判断两个点是否相等，判断条件为x、y、z、m以及坐标系都相等
 * @author 基础平台-杨琨
 * @param point - {ArcGisPoint} 必选项，查询参数。
 * @returns Boolean，是否相等
 */
ArcGisPoint.prototype.equals = function (point){
    return this.x === point.x && this.y === point.y && this.z === point.z && this.m === point.m
        && this.spatialRefere.equals(point.spatialRefere)
}

/**
 * @function module:ArcGis.ArcGisPoint.prototype.toGeometryJSON
 * @description 将坐标转为特定格式，供IdentifyTask使用
 * @author 基础平台-杨琨
 * @returns String，包含点坐标的JSON字符串
 */
ArcGisPoint.prototype.toGeometryJSON = function () {
    return '{"x":' + this.x + ',"y":' + this.y + '}';
}
//转换坐标系
function P(fromSR,toST,point,xName,yName,me,options) {
    let arr = proj4("EPSG:" + fromSR, "EPSG:" + toST, [point[0], point[1]]);
    me[xName] = isNaN(arr[0]) ? undefined : arr[0];
    me[yName] = isNaN(arr[1]) ? undefined : arr[1];
    me.spatialReference = new ArcGisSpatialReference(options.spatialReference);
}

export {ArcGisPoint};
Zondy.Service.ArcGisPoint = ArcGisPoint;