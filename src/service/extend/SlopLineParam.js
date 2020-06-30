import {Zondy} from "../common/Base";

/**
 * 示坡线参数类
 * @class Zondy.Object.ContourAnalyse.SlopLineParam
 * @param {Object} option 属性键值对
 * @param {float} [option.XScale=2.0] X系数
 * @param {float} [option.YScale=10.0] Y系数
 * @param {Number} [option.LineType=0] 线型
 * @param {Number} [option.SubLineType=0] 辅助线型
 */
var SlopLineParam = function (option) {
	var options = (option !== undefined) ? option : {};
	this.XScale = options.XScale !== undefined ? options.XScale : 2.0;
	this.YScale = options.YScale !== undefined ? options.YScale : 10.0;
	this.LineType = options.LineType !== undefined ? options.LineType : 0;
	this.SubLineType = options.SubLineType !== undefined ? options.SubLineType : 0;
};
export {SlopLineParam};
Zondy.Object.ContourAnalyse.SlopLineParam = SlopLineParam;
