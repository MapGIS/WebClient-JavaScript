/*
 * @Author: your name
 * @Date: 2021-08-30 23:38:09
 * @LastEditTime: 2021-08-31 09:23:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\transform\Translate.js
 */
import Point from "../../../PlotUtilBase/Geometry/Point";
import Matrix3 from "../../../PlotUtilBase/Math/Matrix3";

export default class Translate{
    constructor(strPnt) {
        const pnt = Point.parse(strPnt);
        const matrix=new Matrix3();
        matrix.identity();

        matrix.translate(pnt.x,pnt.y)

        this._matrix=matrix;

	}

    getMatrix()
    {
        return this._matrix;
    }
}