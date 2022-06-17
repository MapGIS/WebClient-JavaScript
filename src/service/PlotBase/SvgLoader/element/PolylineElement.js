/*
 * @Author: your name
 * @Date: 2021-05-17 14:39:27
 * @LastEditTime: 2022-06-14 11:56:28
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \TypeScript-Babel-Starter\src\Document\RectElement.ts
 */
import { point } from '@turf/turf';
import Bounds from '../../../PlotUtilBase/Geometry/Bound.js';
import Point from '../../../PlotUtilBase/Geometry/Point.js';
import PathElement from './PathElement.js';

export default class PolylineElement extends PathElement {
    constructor(node) {
        super(node);
        this.type = 'polyline';
        this.geoPoints = Point.parsePath(this.getAttribute('points').getString());
    }

    _geometryPnts() {
        const { geoPoints } = this;
        const v= geoPoints.map((t)=> new Point(t.x,t.y))
        return [v];
    }

    getOriginPoint() {
        const { geoPoints } = this;
        const  bounds =new Bounds()
        geoPoints.forEach((p)=>{
            bounds.addPnt(p.x,p.y)
        })
        return bounds.getCenter()
      }
}
