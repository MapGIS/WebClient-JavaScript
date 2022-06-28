/*
 * @Author: your name
 * @Date: 2021-11-09 10:34:29
 * @LastEditTime: 2022-06-28 10:20:51
 * @LastEditors: zk
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Kidney.js
 */
import BaseIrregularElement from './BaseIrregularElement';

export default class TriangleGemtry extends BaseIrregularElement {
    constructor(node) {
        super(node);
        this.type = 'triangle';
    }
    _insertGeometry(points) {
        if (points.legnth <= 2) {
            return [points];
        }

        const pnts = points.slice(0, 3)
        pnts.push(points[0])

        return [pnts];
    }
}
