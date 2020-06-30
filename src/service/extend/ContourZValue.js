import { Zondy } from "../common/Base";
import { CLineInfo }  from  "../common/CLineInfo";
import { ContourRegionInfo }  from  "./ContourRegionInfo";
/*
*	等值线层参数类，用来描述每一层的信息
*param {double} ZValue 等值线层值，不能为NULL,默认值为1.0
*param {Zondy.Object.CLineInfo} LineInfo 等值线参数，为空则取默认值
*param {Zondy.Object.ContourAnalyse.ContourRegionInfo} RegInfo 生成区参数，为空则取默认值
*param {bool} IsOutputNote 该层是否绘制注记,默认值为false
*@author fmm 2015-07-01
*/
var ContourZValue = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.ZValue = options.ZValue != undefined ? options.ZValue : 1;
    this.LineInfo = options.LineInfo != undefined ? options.LineInfo : null;
    this.RegInfo = options.RegInfo != undefined ? options.RegInfo : null;
    this.IsOutputNote = options.IsOutputNote != undefined ? options.IsOutputNote : false;
};
export { ContourZValue };
Zondy.Object.ContourAnalyse.ContourZValue = ContourZValue;
