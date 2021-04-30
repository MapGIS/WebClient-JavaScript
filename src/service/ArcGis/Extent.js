import {extend, Zondy,notNULL} from "../common";
import {ArcGisGeometry}  from "./Geometry";
import {ArcGisPoint} from "./Point";
import * as T from '@turf/turf'
import * as H from '@turf/helpers'

/**
 * @class module:ArcGis.ArcGisExtent
 * @description ArcGisExtent对象
 * @author 基础平台-杨琨
 * @param options - {Object} 必选项，构造Extent对象参数。
 * @param {String} [query.xmin] 可选项，x轴最小坐标。
 * @param {String} [query.ymin] 可选项，x轴最大坐标。
 * @param {String} [query.ymin] 可选项，y轴最小坐标。
 * @param {String} [query.ymax] 可选项，y轴最小坐标。
 * @param {String} [query.zmin] 可选项，z轴最小坐标。
 * @param {String} [query.zmax] 可选项，z轴最小坐标。
 * @param {String} [query.mmin] 可选项，m轴最小坐标。
 * @param {String} [query.mmax] 可选项，m轴最小坐标。
 */

class ArcGisExtent extends ArcGisGeometry{
    constructor(options) {
        super(options);
        this.center = undefined;
        this.hasM = false;
        this.hasZ = false;
        this.height = 0;
        this.mmax = undefined;
        this.mmin = undefined;
        this.type = "extent";
        this.width = 0;
        this.xmax = 0;
        this.xmin = 0;
        this.ymax = 0;
        this.ymin = 0;
        this.zmax = undefined;
        this.zmin = undefined;
        this.extent = this;

        //确保私有变量不能被options修改
        this.private = ["center","hasM","hasZ","height","width","type","extent"];
        for (let key in this.private){
            if(notNULL(options[this.private[key]])){
                throw new Error("[accessor] cannot assign to read-only property '" + this.private[key] + "' of ArcGisExtent");
            }
        }

        extend(this,options);

        //如果z、m有值，hasZ、hasM采薇true
        if(this.zmax || this.zmin){
            this.hasZ = true;
        }
        if(this.mmax || this.mmin){
            this.hasM = true;
        }

        //生成bbox
        this._extentPolygon = T.polygon([[
            [this.xmin, this.ymin],
            [this.xmin, this.ymax],
            [this.xmax, this.ymax],
            [this.ymax, this.ymin],
            [this.xmin, this.ymin]
        ]],{name:"_extentPlygon"});

        //生成中心点
        this.center = initCenter(this);

        //计算width，height
        this.width = this.xmax - this.xmin;
        this.height = this.ymax - this.ymin;
    }
}

function initCenter(me){
    let points = [
        H.point( [me.xmin, me.ymin]),
        H.point( [me.xmin, me.ymax]),
        H.point( [me.xmax, me.ymax]),
        H.point( [me.ymax, me.ymin]),
        H.point( [me.xmin, me.ymin])
    ];
    let featureCollection = H.featureCollection(points);
    let coordinates = T.center(featureCollection).geometry.coordinates;
    return new ArcGisPoint({
        longitude: coordinates[0],
        latitude: coordinates[1]
    });
}

/**
 * @function module:ArcGis.ArcGisExtent.prototype.equals
 * @description 比较两个Extent对象是否相等
 * @param extent - {ArcGisExtent} 必选项，要比较的ArcGisExtent对象。
 * @returns Boolean，对象是否相等
 */
ArcGisExtent.prototype.equals = function (extent){
    return this.mmax === extent.mmax &&
        this.mmin === extent.mmin &&
        this.xmax === extent.xmax &&
        this.xmin === extent.xmin &&
        this.ymax === extent.ymax &&
        this.ymin === extent.ymin &&
        this.zmax === extent.zmax &&
        this.zmin === extent.zmin;
}

/**
 * @function module:ArcGis.ArcGisExtent.prototype.contains
 * @description 判断是否包含一个点或者一个ArcGisExtent对象
 * @param geometry - {Geometry} 必选项，要比较的ArcGisExtent对象或者ArcGisPoint对象。
 * @returns Boolean，是否包含
 */
ArcGisExtent.prototype.contains = function (geometry){
    if(geometry.type === "point"){
        let point = geometry.toArray();
        point = T.point([point[0], point[1]]);
        return T.booleanContains(this._extentPolygon,point)
    }
    if(geometry.type === "extent"){
        return T.booleanContains(this._extentPolygon,geometry._extentPolygon)
    }
    return false;
}

/**
 * @function module:ArcGis.ArcGisExtent.prototype.expand
 * @description 根据输入的值，扩大或缩小一个ArcGisExtent
 * @param factor - {Number} 必选项，放大或缩小系数。
 * @returns ArcGisExtent，缩放后的ArcGisExtent
 */
ArcGisExtent.prototype.expand = function (factor){
    if(factor instanceof Number){
        factor = Math.abs(factor);
        this.width = this.width * factor;
        this.height = this.height * factor;
        this.xmin = this.center.x - this.width / 2;
        this.xmax = this.center.x + this.width / 2;
        this.ymin = this.center.y - this.height / 2;
        this.ymax = this.center.y + this.height / 2;
        return this;
    }else {
        throw new Error("require is not defined");
    }
}

/**
 * @function module:ArcGis.ArcGisExtent.prototype.intersects
 * @description 比较点、多点、线、多边形、extent是否与当前extent相交
 * @param geometry - {Geometry} 必选项，要比较的几何对象。
 * @returns Boolean，是否相交
 */
ArcGisExtent.prototype.intersects = function (geometry){
    if(!geometry.type){
        return false;
    }
    let geom;
    if(geometry.type === "polyline"){
        geom = H.multiLineString(geometry.paths);
    }else if(geometry.type === "point"){
        geom = H.point(geometry.toArray());
    }else if(geometry.type === "multipoint"){
        geom = H.multiPoint(geometry.points);
    }else if(geometry.type === "extent"){
        geom = geometry._extentPolygon;
    }else if(geometry.type === "polygon"){
        geom = H.polygon(geometry.rings);
    }
    return !T.booleanDisjoint(geom,this._extentPolygon);
}

/**
 * @function module:ArcGis.ArcGisExtent.prototype.offset
 * @description 根据输入的dx, dy, dz值，平移extend
 * @param dx - {Number} 必选项，要平移的x值。
 * @param dx - {Number} 必选项，要平移的y值。
 * @param dx - {Number} 必选项，要平移的z值。
 * @returns ArcGisExtent，平移后的ArcGisExtent对象
 */
ArcGisExtent.prototype.offset = function (dx, dy, dz){
    this.xmax += dx;
    this.xmin += dx;
    this.ymax += dy;
    this.ymin += dy;
    if(this.hasZ){
        this.zmax += dz;
        this.zmin += dz;
    }else {
        this.hasZ = true;
        this.zmax = 0;
        this.zmin = 0;
    }
    return this;
}

/**
 * @function module:ArcGis.ArcGisExtent.prototype.centerAt
 * @description 根据输入的ArcGisPoint对象，生成衣蛾新的中心点
 * @param point - {ArcGisPoint} 必选项，新的中心点。
 * @returns ArcGisExtent
 */
ArcGisExtent.prototype.centerAt = function (point){
    if(point instanceof ArcGisPoint){
        this.center = new ArcGisPoint({
            longitude: point.x,
            latitude: point.y
        });
        this.xmin = this.center.x - this.width / 2;
        this.xmax = this.center.x + this.width / 2;
        this.ymin = this.center.y - this.height / 2;
        this.ymax = this.center.y + this.height / 2;
        return this;
    }
}

ArcGisExtent.prototype.normalize = function (){
    return [this];
}

/**
 * @function module:ArcGis.ArcGisExtent.prototype.union
 * @description 输入一个ArcGisExtent对象，与原extent对象合并，生成一个新的extent
 * @param extent - {ArcGisExtent} 必选项，要合并的ArcGisExtent对象。
 * @returns ArcGisExtent，新的Extent对象
 */
ArcGisExtent.prototype.union = function (extent){
    let cur = this.center;
    let nex = extent.center;
    if(((nex.x - cur.x) > 0 && (nex.y - cur.y) > 0) || ((nex.x - cur.x) === 0 && (nex.y - cur.y) > 0)
        || ((nex.x - cur.x) === 0 && (nex.y - cur.y) === 0)
        || ((nex.x - cur.x) > 0 && (nex.y - cur.y) === 0)){
        this.xmax = extent.xmax;
        this.ymax = extent.ymax;
    }else if((nex.x - cur.x) > 0 && (nex.y - cur.y) < 0 || ((nex.x - cur.x) === 0 && (nex.y - cur.y) < 0)){
        this.xmax = extent.xmax;
        this.ymin = extent.ymin;
    }else if((nex.x - cur.x) < 0 && (nex.y - cur.y) < 0){
        this.xmin = extent.xmin;
        this.ymin = extent.ymin;
    }else if((nex.x - cur.x) < 0 && (nex.y - cur.y || ((nex.x - cur.x) < 0 && (nex.y - cur.y) < 0)) === 0){
        this.xmin = extent.xmin;
        this.ymax = extent.ymax;
    }
    this.center = initCenter(this);
    //计算width，height
    this.width = this.xmax - this.xmin;
    this.height = this.ymax - this.ymin;
    return this;
}

/**
 * @function module:ArcGis.ArcGisExtent.prototype.toString
 * @description 返回如下格式的字符串："xmin,ymin,xmax,ymax"
 * @returns Sting
 */
ArcGisExtent.prototype.toString = function (){
    return this.xmin + "," + this.ymin + "," + this.xmax + "," + this.ymax;
}

export {ArcGisExtent};
Zondy.Service.ArcGisExtent = ArcGisExtent;