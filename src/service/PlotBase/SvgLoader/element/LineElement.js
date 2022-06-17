/*
 * @Author: your name
 * @Date: 2021-05-17 14:39:27
 * @LastEditTime: 2022-06-14 11:42:27
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \TypeScript-Babel-Starter\src\Document\RectElement.ts
 */
import Point from '../../../PlotUtilBase/Geometry/Point.js';
import PathElement from './PathElement.js';

export default class LineElement extends PathElement {
    constructor(node) {
        super(node);
        this.type = 'line';
    }

    _geometryPnts() {
        const p1 = new Point(this.getAttribute('x1').getPixels(), this.getAttribute('y1').getPixels());
        const p2 = new Point(this.getAttribute('x2').getPixels(), this.getAttribute('y2').getPixels());

        const expArr = [[p1, p2]];

        return expArr;
    }


}
