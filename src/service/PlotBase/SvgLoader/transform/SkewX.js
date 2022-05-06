/*
 * @Author: your name
 * @Date: 2021-08-31 08:59:39
 * @LastEditTime: 2021-10-22 14:04:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\transform\SkewX.js
 */
import { Matrix3 } from "../../../PlotUtilBase/Math/Matrix3";
import { Property } from "../element/Property";

export class SkewX{
    constructor(skew,transformOrigin) {
        const matrix=new Matrix3();
        const skewMatrix=new Matrix3();
        const angle=new Property(skew);
        const originX=transformOrigin[0];
        const originY=transformOrigin[1];

        matrix.identity();
        skewMatrix.identity();
        skewMatrix.set(1,0,Math.tan(angle.getRadians()),1,0,0);

		const tx = originX.getPixels('x');
		const ty = originY.getPixels('y');

		matrix.translate(tx, ty);
        matrix.multiply(skewMatrix);
		matrix.translate(-tx, -ty);

        this._matrix=matrix;
	}

    getMatrix()
    {
        return this._matrix;
    }
}