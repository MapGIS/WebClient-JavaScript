/*
 * @Author: your name
 * @Date: 2021-11-09 10:21:27
 * @LastEditTime: 2022-06-23 11:19:59
 * @LastEditors: zk
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\Arrow\AssaultArrow.js
 */
import BaseIrregularElement from '../BaseIrregularElement';

export default class BaseArrowGeometry extends BaseIrregularElement {
    constructor(node) {
        super(node);
        this.type = 'basearrow';
    }

    applyFuncToFillGeometry(coords) {
        let _fillCoords = [];
        coords.forEach((t) => {
            _fillCoords = _fillCoords.concat(t);
        });
        const fillCoords = [_fillCoords];
        return fillCoords;
    }
}
