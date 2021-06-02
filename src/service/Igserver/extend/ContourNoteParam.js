import { Zondy } from "../../common/Base";
/*
*	平面等值线追踪所用到的注记参数类
*param {bool} IsClipLine 注记是否剪断线(true/false 剪断/不剪断),默认值为true
*param {bool} isXYScaleOut 是否输出轴向标尺,默认值为false
*param {int} NoteDirection 注记方向(1/2/3:斜坡上方/斜坡下方/图幅上方),默认值为1
*param {double} LineWidth 注记等值线线宽,默认值为0.05
*param {float} MaxAngle 注记的最大倾角,默认值为90.0
*param {float} MinDist 注记间最小允许距离,默认值为10.0
*param {bool} IsAbs 数值是否取绝对值,默认值为false
*param {bool} IsComma 数值是否采用千位分隔符,默认值为false
*param {short} DigitNum 注记数值的小数位数,默认值为0
*param {int} FormatNo 数据格式 （0/1/2: 定点/科学/通常）,默认值为0
*param {int} LogFlag 取对数标志（0/1/2: 未取对数/10为底/自然对数）,默认值为0
*param {string} Prefix 注记前缀,默认值为""
*param {string} Suffix 注记后缀,默认值为""
*param {int} ColorNo 注记颜色号,默认值为0
*param {float} FixSize 注记尺寸,默认值为0.01
*param {short} FontNo 注记字体号,默认值为0
*/
var ContourNoteParam = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.IsClipLine = options.IsClipLine != undefined ? options.IsClipLine : true;
    this.isXYScaleOut = options.isXYScaleOut != undefined ? options.isXYScaleOut : false;
    this.NoteDirection = options.NoteDirection != undefined ? options.NoteDirection : 1;
    this.LineWidth = options.LineWidth != undefined ? options.LineWidth : 0.05;
    this.MaxAngle = options.MaxAngle != undefined ? options.MaxAngle : 90.0;
    this.MinDist = options.MinDist != undefined ? options.MinDist : 10.0;
    this.IsAbs = options.IsAbs != undefined ? options.IsAbs : false;
    this.IsComma = options.IsComma != undefined ? options.IsComma : false;
    this.DigitNum = options.DigitNum != undefined ? options.DigitNum : 0;
    this.FormatNo = options.FormatNo != undefined ? options.FormatNo : 0;
    this.LogFlag = options.LogFlag != undefined ? options.LogFlag : 0;
    this.Prefix = options.Prefix != undefined ? options.Prefix : "";
    this.Suffix = options.Suffix != undefined ? options.Suffix : "";
    this.ColorNo = options.ColorNo != undefined ? options.ColorNo : 0;
    this.FixSize = options.FixSize != undefined ? options.FixSize : 0.01;
    this.FontNo = options.FontNo != undefined ? options.FontNo : 0;
};
export { ContourNoteParam };
Zondy.Object.ContourAnalyse.ContourNoteParam = ContourNoteParam;