import {
    Zondy, extend, returnPoint,formatPoints
} from "../common";
import {ArcGisGeometry} from "./Geometry";
import {ArcGisPoint} from "./Point";
import * as T from '@turf/turf'
import * as H from '@turf/helpers'

/**
 * @class module:ArcGis.ArcGisPolygon
 * @description ArcGis服务
 * @author 基础平台-杨琨
 * @param options - {Object} 必选项，构造点对象参数。
 * @param {String} [options.rings] 可选项。构成多边形的点坐标，坐标必须闭合，可有多个矩形。
 * Example：rings:[[[x1,y1],[x2,y2],[x3,y3],[x1,y1]],[[x4,y4],[x5,y5],[x6,y6],[x4,y4]]]
 * @param {ArcGisSpatialReference} [options.spatialReference] 可选项。多边形的空间坐标系，默认4326。
 */
class ArcGisPolygon extends ArcGisGeometry{
    constructor(options) {
        super(options);
        this.centroid = null;
        this.isSelfIntersecting = false;
        this.rings = [];
        this.type = "polygon";

        extend(this,options);

        if(this.rings[0] && this.rings[0][0]){
            if(this.rings[0][0].length >= 3){
                this.hasZ = true;
            }
        }
    }
}

/**
 * @function module:ArcGis.ArcGisPolygon.prototype.getPoint
 * @description 根据ringIndex、pointIndex返回点对象
 * @param ringIndex - {Number} 必选项，要查询的多边形序号。
 * @param pointIndex - {Number} 必选项，要查询的点序号。
 * @returns ArcGisPoint，点对象
 */
ArcGisPolygon.prototype.getPoint = function (ringIndex, pointIndex){
    if(ringIndex >= this.rings.length || pointIndex >= this.rings[ringIndex].length)
        return null;
    return returnPoint(ArcGisPoint,this,this.rings[ringIndex][pointIndex]);
}

/**
 * @function module:ArcGis.ArcGisPolygon.prototype.insertPoint
 * @description 根据ringIndex、pointIndex，在pointIndex之后插入一个点对象
 * @param ringIndex - {Number} 必选项，要插入的多边形序号。
 * @param pointIndex - {Number} 必选项，在第pointIndex之后插入一个点，线标从0开始。
 * @param point - {Number} 必选项，要要插入的点对象。
 * @returns ArcGisPolygon，多边形对象
 */
ArcGisPolygon.prototype.insertPoint = function (ringIndex, pointIndex, point){
    if(ringIndex < this.rings.length && pointIndex <= this.rings[ringIndex].length) {
        if(point instanceof Array){
            this.rings[ringIndex].splice(pointIndex,0,point);
        }else if(point instanceof ArcGisPoint){
            this.rings[ringIndex].splice(pointIndex,0,point.hasZ ? [point.x,point.y,point.z] : [point.x,point.y]);
        }
    }
    return this;
}

/**
 * @function module:ArcGis.ArcGisPolygon.prototype.removePoint
 * @description 根据ringIndex、pointIndex删除一个点，并返回该点对象
 * @param ringIndex - {Number} 必选项，要删除的点所在的多边形序号。
 * @param pointIndex - {Number} 必选项，在pointIndex处，删除这个点。
 * @returns ArcGisPoint，点对象
 */
ArcGisPolygon.prototype.removePoint = function (ringIndex, pointIndex){
    if(ringIndex >= this.rings.length || pointIndex >= this.rings[ringIndex].length)
        return null;
    let positionArr = this.rings[ringIndex].splice(pointIndex,1)[0];
    return returnPoint(ArcGisPoint,this,positionArr);
}

/**
 * @function module:ArcGis.ArcGisPolygon.prototype.setPoint
 * @description 根据ringIndex、pointIndex，更新一个点对象
 * @param ringIndex - {Number} 必选项，要更新的点所在的多边形序号。
 * @param pointIndex - {Number} 必选项，在pointIndex处，更新这个点。
 * @param point - {ArcGisPoint} 必选项，ArcGisPoint对象或者[x,y]或[x,y,z]数组,要更新的点。
 * @returns ArcGisPolygon，多边形对象
 */
ArcGisPolygon.prototype.setPoint = function (ringIndex, pointIndex, point){
    if(ringIndex >= this.rings.length || pointIndex >= this.rings[ringIndex].length)
        return null;
    if(point instanceof Array){
        this.rings[ringIndex][pointIndex] = point;
    }else if(point instanceof ArcGisPoint){
        let pointArr = [point.x,point.y];
        if(point.hasZ){
            pointArr.push(point.z);
        }if(point.hasM){
            pointArr.push(point.m);
        }
        this.rings[ringIndex][pointIndex] = pointArr;
    }
    return this;
}

/**
 * @function module:ArcGis.ArcGisPolygon.prototype.addRing
 * @description 根据ringIndex、pointIndex，更新一个多边形对象
 * @param points - {Array} 必选项，要插入的一组多边形点坐标数组，
 * example：[[x1,y1],[x2,y2],[x3,y3],[x1,y1]]。
 * @returns ArcGisPolygon，多边形对象
 */
ArcGisPolygon.prototype.addRing = function (points){
    if(points instanceof Array){
        this.rings.push(formatPoints(points));
    }else {
        this.rings.push([]);
    }
    return this;
}

/**
 * @function module:ArcGis.ArcGisPolygon.prototype.removeRing
 * @description 根据index，删除一个多边形点坐标数组
 * @param index - {Array} 必选项，要删除的多边形序号。
 * @returns [ArcGisPoint]，被删除的多边形点对象数组
 */
ArcGisPolygon.prototype.removeRing = function (index){
    if(index >= this.rings.length) return null;
    let path = this.rings.splice(index,1)[0],point,pointArr = [];
    for(let i = 0;i < path.length;i++){
        point = returnPoint(ArcGisPoint,this,path[i]);
        pointArr.push(point);
    }
    return pointArr
}

/**
 * @function module:ArcGis.ArcGisPolygon.prototype.isClockwise
 * @description 判断是否是顺时针。
 * @param ring - {Array} 必选项，[ArcGisPoint]或[[x,y,z]]或[x,y],输入值必须是一组点坐标或对象数组（就是一条线,封闭线就是多边形），不能是多维数组。
 * @returns {boolean} 是否是顺时针。
 */
ArcGisPolygon.prototype.isClockwise = function (ring){
    let sum = 0,i = 1,
        hasZ = false,//是否有值
        prev,//上一个点
        cur;//当前点
    hasZ = !!ring[0][2];
    while (i < ring.length) {
        //第一次将ring[0]给prev，之后都是cur
        prev = cur || ring[0];
        cur = ring[i];
        //根据两组坐标(x1 - x1) * (y1 + y0) * (z1 + z0)的值累计相加，最后的值大于0则是顺实战，否则逆时针
        sum += hasZ ? (cur[0] - prev[0]) * (cur[1] + prev[1]) * (cur[2] + prev[2])
            : (cur[0] - prev[0]) * (cur[1] + prev[1]);
        i++;
    }
    return sum > 0;
}

/**
 * @function module:ArcGis.ArcGisPolygon.prototype.contains
 * @description 判断多边形是否包含一个点。
 * @param point - {ArcGisPoint} 必选项，要检测的点对象。
 * @returns {boolean} 多边形是否包含点。
 */
ArcGisPolygon.prototype.contains = function (point){
    if(point instanceof ArcGisPoint){
        let g = H.polygon(this.rings,{name:"_extentPlygon"});
        let p = H.point(point.toArray());
        return T.booleanContains(g,p);
    }else {
        return false;
    }
}

/**
 * @function module:ArcGis.ArcGisPolygon.prototype.toGeometryJSON
 * @description 将点坐标转换为Json对象
 * @returns String
 */
ArcGisPolygon.prototype.toGeometryJSON = function () {
    let rings = this.rings;
    let geometryStr = '{"rings":[';
    for(let i = 0;i < rings.length;i++){
        geometryStr += "[";
        for(let j = 0;j < rings[i].length;j++){
            geometryStr += "[";
            geometryStr += rings[i][j].join(',');
            geometryStr += "],";
        }
        geometryStr = geometryStr.substr(0,geometryStr.length - 1);
        geometryStr += "],";
    }
    geometryStr = geometryStr.substr(0,geometryStr.length - 1);
    geometryStr += ']}';
    return geometryStr;
}

/**
 * @function module:ArcGis.ArcGisPolygon.prototype.fromExtent
 * @description 输入一个Extent对象返回一个多边形对象
 * @param Extent - {ArcGisExtent} 必选项，要输入的ArcGisExtent对象。
 * @returns {ArcGisPolygon} 新的多边形对象。
 */
ArcGisPolygon.prototype.fromExtent = function (Extent) {
    return new ArcGisPolygon({
        rings:Extent._extentPolygon.geometry.coordinates
    });
}
export {ArcGisPolygon};
Zondy.Service.ArcGisPolygon = ArcGisPolygon;