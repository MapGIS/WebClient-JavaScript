/*
 * @Author: your name
 * @Date: 2021-11-09 10:29:43
 * @LastEditTime: 2022-06-22 10:25:20
 * @LastEditors: zk
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\DoubleArrow.js
 */
import DoubleArrow from '../../../../../PlotUtilBase/Geometry/Arrow/Double_Arrow';
import Point from '../../../../../PlotUtilBase/Geometry/Point';
import BaseArrowGeometry from './BaseArrowGeometry';

export default class DoubleArrowGeometry extends BaseArrowGeometry {
    constructor(node) {
        super(node);
        this.type = 'doublearrow';
    }


    _insertGeometry(points) {
        const pnts = points.map((s) => [s.x, s.y]);
        const exPnts = new DoubleArrow(pnts).getPoints();
        const exPoints = exPnts.map((t) => t.map((s) => new Point(s[0], s[1])));
        return exPoints;
    }
}
