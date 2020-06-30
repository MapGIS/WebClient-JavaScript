import {Zondy} from "../common/Base";

/**
 * 离散数据网格化参数类
 * @class Zondy.Object.ContourAnalyse.MeshingParam
 * @param {Object} option 属性键值对
 * @param {string} [option.SfClsURL=null] 点简单要素类URL
 * @param {string} [option.FieldName=null] Z值所在的字段名称
 * @param {int} [option.XCellNum=null] 生成的影像X方向网格数。只输出X方向网格数，计算时Y方向网格密度会自动与X方向保持一致,默认值为200
 * @param {Rect} [option.Bound=null] 生成的栅格数据集逻辑范围，如果为NULL则使用点简单要素类的逻辑范围
 * @param {int} [option.CalN=null] 初始N
 * @param {int} [option.CalM=null] 初始M
 * @param {boolean} [option.bIsCalInValidCtrlPnt=false] 是否计算无效的控制点
 * @param {Number} [option.nYCtrlNum=null] y方向初始层控制网格数
 * @param {Number} [option.nXCtrlNum=null] x方向初始层控制网格数
 * @param {Number} [option.nLayerNum=null] 多层B-Spline控制层数
 */

var MeshingParam = function (option) {
	var options = (option !== undefined) ? option : {};
	this.SfClsURL = options.SfClsURL !== undefined ? options.SfClsURL : null;
	this.FieldName = options.FieldName !== undefined ? options.FieldName : null;
	this.XCellNum = options.XCellNum !== undefined ? options.XCellNum : 200;
	this.Bound = options.Bound !== undefined ? options.Bound : null;
	this.CalN = options.CalN !== undefined ? options.CalN : null;
	this.CalM = options.CalM !== undefined ? options.CalM : null;
	this.bIsCalInValidCtrlPnt = options.bIsCalInValidCtrlPnt !== undefined ? options.bIsCalInValidCtrlPnt : false;
	this.nYCtrlNum = options.nYCtrlNum !== undefined ? options.nYCtrlNum : null;
	this.nXCtrlNum = options.nXCtrlNum !== undefined ? options.nXCtrlNum : null;
	this.nLayerNum = options.nLayerNum !== undefined ? options.nLayerNum : null;
};
export {MeshingParam};
Zondy.Object.ContourAnalyse.MeshingParam = MeshingParam;
