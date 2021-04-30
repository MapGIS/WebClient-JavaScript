import {
    Zondy, extend, returnPoint,formatPoints
} from "../common";
import {ArcGisGeometry} from "./Geometry";
import {ArcGisPoint} from "./Point";
/**
 * @class module:ArcGis.ArcGisPolyline
 * @description ArcGis服务
 * @author 基础平台-杨琨
 * @param options - {Object} 必选项，构造点对象参数。
 * @param {String} [options.paths] 可选项。构成线的点坐标，可有多条。
 * Example: [[[x1,y1],[x2,y2],[x3,y3]],[[x4,y4],[x5,y5],[x6,y6]]]
 * @param {ArcGisSpatialReference} [options.spatialReference] 可选项。多边形的空间坐标系，默认4326。
 */
class ArcGisPolyline extends ArcGisGeometry{
    constructor(options) {
        super(options);
        this.paths = [];
        this.type = "polyline";

        extend(this,options);
    }
}

/**
 * @function module:ArcGis.ArcGisPolyline.prototype.getPoint
 * @description 根据pathIndex和pointIndex返回ArcGisPoint对象
 * @param pathIndex - {Number} 必选项，要查询的多边形序号。
 * @param pointIndex - {Number} 必选项，要查询的点序号。
 * @returns ArcGisPoint，点对象
 */
ArcGisPolyline.prototype.getPoint = function (pathIndex,pointIndex){
    if(pathIndex >= this.paths.length || pointIndex >= this.paths[pathIndex].length)
        return null;
    return returnPoint(ArcGisPoint,this,this.paths[pathIndex][pointIndex]);
}

/**
 * @function module:ArcGis.ArcGisPolyline.prototype.removePoint
 * @description 根据ringIndex、pointIndex删除一个点，并返回该点对象
 * @param pathIndex - {Number} 必选项，要删除的点所在的多边形序号。
 * @param pointIndex - {Number} 必选项，在pointIndex处，删除这个点。
 * @returns ArcGisPoint，点对象
 */
ArcGisPolyline.prototype.removePoint = function (pathIndex,pointIndex){
    if(pathIndex >= this.paths.length || pointIndex >= this.paths[pathIndex].length)
        return null;
    let positionArr = this.paths[pathIndex].splice(pointIndex,1)[0];
    return returnPoint(ArcGisPoint,this,positionArr);
}

/**
 * @function module:ArcGis.ArcGisPolyline.prototype.setPoint
 * @description 根据ringIndex、pointIndex，更新一个点对象
 * @param pathIndex - {Number} 必选项，要删除的点所在的多边形序号。
 * @param pointIndex - {Number} 必选项，在pointIndex处，删除这个点。
 * @param point - {ArcGisPoint} 必选项，ArcGisPoint对象或者[x,y]或[x,y,z]数组,要更新的点。
 * @returns ArcGisPolyline，线对象
 */
ArcGisPolyline.prototype.setPoint = function (pathIndex, pointIndex, point){
    if(pathIndex >= this.paths.length || pointIndex >= this.paths[pathIndex].length)
        return null;
    if(point instanceof Array){
        this.paths[pathIndex][pointIndex] = point;
    }else if(point instanceof ArcGisPoint){
        let pointArr = [point.x,point.y];
        if(point.hasZ){
            pointArr.push(point.z);
        }if(point.hasM){
            pointArr.push(point.m);
        }
        this.paths[pathIndex][pointIndex] = pointArr;
    }
    return this;
}

/**
 * @function module:ArcGis.ArcGisPolyline.prototype.addRing
 * @description 传入坐标数组或者[ArcGisPoint]数组，新增一条线
 * @param points - {Array} 必选项，要插入的一组多边形点坐标数组，
 * example：[[x1,y1],[x2,y2],[x3,y3]]。
 * @returns ArcGisPolyline，线对象
 */
ArcGisPolyline.prototype.addPath = function (points){
    if(points instanceof Array){
        this.paths.push(formatPoints(points));
    }else {
        this.paths.push([]);
    }
    return this;
}

/**
 * @function module:ArcGis.ArcGisPolyline.prototype.removeRing
 * @description 根据index删除一条线，并返回点对象数组
 * @param index - {Array} 必选项，要删除的多边形序号。
 * @returns [ArcGisPoint]，被删除的线的点对象数组
 */
ArcGisPolyline.prototype.removePath = function (index){
    if(index >= this.path.length) return null;
    let path = this.paths.splice(index,1)[0],point,pointArr = [];
    for(let i = 0;i < path.length;i++){
        point = returnPoint(ArcGisPoint,this,path[i]);
        pointArr.push(point);
    }
    return pointArr
}

/**
 * @function module:ArcGis.ArcGisPolyline.prototype.insertPoint
 * @description 根据ringIndex、pointIndex，在pointIndex之后插入一个点对象
 * @param pathIndex - {Number} 必选项，要插入的多边形序号。
 * @param pointIndex - {Number} 必选项，在第pointIndex之后插入一个点，线标从0开始。
 * @param point - {Number} 必选项，要要插入的点对象。
 * @returns ArcGisPolyline，线对象
 */
ArcGisPolyline.prototype.insertPoint = function (pathIndex, pointIndex, point){
    if(pathIndex < this.paths.length && pointIndex <= this.paths[pathIndex].length) {
        if(point instanceof Array){
            this.paths[pathIndex].splice(pointIndex,0,point);
        }else if(point instanceof ArcGisPoint){
            this.paths[pathIndex].splice(pointIndex,0,point.hasZ ? [point.x,point.y,point.z] : [point.x,point.y]);
        }
    }

    return this;
}

/**
 * @function module:ArcGis.ArcGisPolyline.prototype.toGeometryJSON
 * @description 将点坐标转换为Json对象
 * @returns String
 */
ArcGisPolyline.prototype.toGeometryJSON = function () {
    let paths = this.paths;
    let geometryStr = '{"paths":[';
    for(let i = 0;i < paths.length;i++){
        geometryStr += "[";
        for(let j = 0;j < paths[i].length;j++){
            geometryStr += "[";
            geometryStr += paths[i][j].join(',');
            geometryStr += "],";
        }
        geometryStr = geometryStr.substr(0,geometryStr.length - 1);
        geometryStr += "],";
    }
    geometryStr = geometryStr.substr(0,geometryStr.length - 1);
    geometryStr += ']}';
    return geometryStr;
}

export {ArcGisPolyline};
Zondy.Service.ArcGisPolyline = ArcGisPolyline;