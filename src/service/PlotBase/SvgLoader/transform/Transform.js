/*
 * @Author: your name
 * @Date: 2021-08-30 17:45:55
 * @LastEditTime: 2021-10-25 11:50:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\Transform.js
 */
import Matrix3 from "../../../PlotUtilBase/Math/Matrix3";
import { TransformFactory } from "./TransfromFactory";
import StringUtil from '../../../PlotUtilBase/Util/StringUtil';

function parseTransforms(transform) {
	return StringUtil.compressSpaces(transform)
		.trim()
		.replace(/\)([a-zA-Z])/g, ') $1')
		.replace(/\)(\s?,\s?)/g, ') ')
		.split(/\s(?=[a-z])/);
}

function parseTransform(transform) {
	const [
		type,
		value
	] = transform.split('(');

	return [
		type.trim(),
		value.trim().replace(')', '')
	];
}

export default class Transform{
    static getTransfromFrmElement(element){
        const transformStyle = element.getStyle('transform', false, true);
		const [
			transformOriginXProperty,
			transformOriginYProperty = transformOriginXProperty
		] = element.getStyle('transform-origin', false, true).split();
		const transformOrigin = [
			transformOriginXProperty,
			transformOriginYProperty
		];

		if (transformStyle.hasValue()) {
			return new Transform(
				transformStyle.getString(),
				transformOrigin
			).getMatrix();
		}

		return new Matrix3().identity();
    }
    constructor(transform,transformOrigin) {
		const data = parseTransforms(transform);
		this._transforms=[]

		data.forEach((t) => {
			if (t === 'none') {
				return;
			}

			const [
				type,
				value
			] = parseTransform(t);

			const instance=TransformFactory.createInstance(type, value, transformOrigin);
			if(instance!=null)
			{
			this._transforms.push(instance)
			}
		});
	}

	getMatrix()
	{
		const transforms= this._transforms;
		const len = transforms.length;
		const matrix =new Matrix3().identity();
		for (let i = 0; i < len; i++) {
			matrix.multiply(transforms[i].getMatrix())
		}

		return matrix;
	}
}