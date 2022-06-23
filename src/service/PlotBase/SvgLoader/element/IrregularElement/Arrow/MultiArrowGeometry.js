/*
 * @Author: your name
 * @Date: 2021-11-09 10:37:25
 * @LastEditTime: 2022-06-23 11:19:47
 * @LastEditors: zk
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\MultiArrow.js
 */
import MultiArrow from '../../../../../PlotUtilBase/Geometry/Arrow/MultiArrow';
import Point from '../../../../../PlotUtilBase/Geometry/Point';
import BaseArrowGeometry from './BaseArrowGeometry';
export default class MultiArrowGeometry extends BaseArrowGeometry {
    constructor(node) {
        super(node);
        this.type = 'multiArrow';
    }

    _insertGeometry(points) {
        const mutiArrow = new MultiArrow({
            ctrlpnts: points
        });
        return mutiArrow.calculate();
    }
}
