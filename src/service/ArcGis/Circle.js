import {
    Zondy, extend
} from "../common";
import {ArcGisGeometry} from "./Geometry";
import * as T from '@turf/turf'
import * as H from '@turf/helpers'

/**
 * @class module:ArcGis.ArcGisCircle
 * @description ArcGis服务
 * @author 基础平台-杨琨
 * @param options - {Object} 必选项，构造圆对象参数。
 * @param {String} [options.center] 可选项。圆的中心点坐标，默认[0, 0]。
 * @param {String} [options.radius] 可选项。圆的半径，默认1000。
 * @param {String} [options.radiusUnit] 可选项。圆的半径单位，默认米，可选值["feet"|"kilometers"|"meters"|"miles"|"nautical-miles"|"yards"]。
 * @param {String} [options.numberOfPoints] 可选项。构成圆弧的插值数量，默认60。
 * @param {String} [options.geodesic] 可选项。启用自定义坐标系，默认false。
 * @param {ArcGisSpatialReference} [options.spatialReference] 可选项。多边形的空间坐标系，默认4326。
 */
class ArcGisCircle extends ArcGisGeometry{
    constructor(options) {
        super(options);
        this.center = [0, 0];
        this.radius = 1000;
        this.radiusUnit = "meters";
        this.numberOfPoints = 60;
        this.geodesic = false;
        this.type = "circle";

        extend(this,options);
        let opts = {steps: this.numberOfPoints, units: this.radiusUnit};
        let circle = T.circle(this.center, this.radius, opts);
        this.rings = circle.geometry.coordinates;
    }
}

export {ArcGisCircle};
Zondy.Service.ArcGisCircle = ArcGisCircle;