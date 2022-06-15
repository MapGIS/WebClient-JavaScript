/*
 * @Author: your name
 * @Date: 2021-05-17 14:39:27
 * @LastEditTime: 2022-06-14 11:56:53
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \TypeScript-Babel-Starter\src\Document\RectElement.ts
 */
import Point from '../../../PlotUtilBase/Geometry/Point.js';
import PolylineElement from './PolylineElement.js';

export default class PolygonElement extends PolylineElement {
    constructor(node) {
        super(node);
        this.type = 'polygon';
    }

    _geometryPnts() {
        const { geoPoints } = this;
        const [{ x: x0, y: y0 }] = geoPoints;
        const v= geoPoints.map((t)=> new Point(t.x,t.y))
        const expArr = [ v.concat([new Point(x0, y0)])];
        return expArr;
    }
}
