/*
 * @Author: your name
 * @Date: 2021-11-09 10:34:29
 * @LastEditTime: 2022-06-28 09:50:05
 * @LastEditors: zk
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Kidney.js
 */
import BaseIrregularElement from './BaseIrregularElement';

export default class PathwayGeometry extends BaseIrregularElement {
    constructor(node) {
        super(node);
        this.type = 'pathway';
    }
    _insertGeometry(points) {
        return [points];
    }
}
