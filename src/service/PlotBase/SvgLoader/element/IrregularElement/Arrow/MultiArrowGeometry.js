/*
 * @Author: your name
 * @Date: 2021-11-09 10:37:25
 * @LastEditTime: 2022-06-22 10:25:33
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

    applyFuncToStorkeGeometry(coords, func) {
      console.log('coords: ', coords);
        let v = coords.map((t) => t.map((s) => new Point(s.x, s.y)));

        let s = [];
        for (let i = 0; i < coords.length; i=i+2) {
            const vt = coords[i].map((t) => new Point(t.x, t.y));
            delete v[i];
            const v1 = vt.slice(0, 20);
            const v2 = vt.slice(25,45);
            const v3 = vt.slice(50);
            s.unshift(v3,v2, v1);
        }

        s=s.filter((t)=>t.length!==0)
        v=v.filter((t)=>t)
        
        s = s.concat(v);
        return s;
    }

    _insertGeometry(points) {
        const mutiArrow = new MultiArrow({
            ctrlpnts: points
        });
        return mutiArrow.calculate();
    }
}
