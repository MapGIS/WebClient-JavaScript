import {Zondy} from "../common/Base";
import {ContourNoteParam} from "./ContourNoteParam";
import {SlopLineParam} from "./SlopLineParam";
import {ContourZValue} from "./ContourZValue";


/**
 * 平面等值线追踪参数类
 * @class Zondy.Object.ContourAnalyse.ContourParam
 * @param {Object} option 属性键值对
 * @param {boolean} [option.IsSmoothLine=false] 是否进行光滑线处理；如果为true则配合SmoothGrade使用,默认值为false
 * @param {int} [option.SmoothGrade=1] 线光滑程度， 0/1/2分别代表“低/中/高”，仅在IsSmoothLine为true时生效,默认值为1
 * @param {boolean} [option.IsMakeReg=false] 是否生成区,默认值为false
 * @param {boolean} [option.IsMakeNote=false] 是否生成注记,默认值为false
 * @param {boolean} [option.IsMakeSLin=false] 是否输出示坡线,默认值为false
 * @param {int} [option.MapWay=1] 生成的地图范围的设置方法。0/1/2/3分表表示“自动检测设置/原始数据范围/数据投影变换/用户自定义”,默认值为1
 * @param {double} [option.FrameWidth=1.0] 制图宽度，仅在MapWay=3的情况下有效,默认值为1.0
 * @param {double} [option.FrameHeight=1.0] 制图高度，仅在MapWay=3的情况下有效,默认值为1.0
 * @param {boolean} [option.IsDrawColorScl=false] 是否绘制色阶。如果绘制，则必须同时指定生成线、区、注记层，任何一个图层都不能忽略生成，才可见色阶输出效果,默认值为false
 * @param {boolean} [option.IsSaveEdge=false] 线图层是否保存边界,默认值为false
 * @param {Zondy.Object.ContourAnalyse.ContourNoteParam} [option.NoteParam=new Zondy.Object.ContourAnalyse.ContourNoteParam()] 注记生成参数，如果NULL则取默认值。只有在IsMakeNote为true时该参数才能发挥作用
 * @param {Zondy.Object.ContourAnalyse.SlopLineParam} [option.SlopLineParam=new Zondy.Object.ContourAnalyse.SlopLineParam()] 示坡线参数，如果为NULL则取默认值。只有在IsMakeSLin为true时该参数参能发挥作用
 * @param {Zondy.Object.ContourAnalyse.ContourZValue[]} [option.ZValues=null] 等值线层参数，不能为NULL
 *       如果ZValues的最大层值小于影像最大像元值，则生成的区值区间是ZValues的次大值到像元最大值；如果要绘制ZVlaues最大值到像元最大值区间，需要为ZValues增加一个大于最大像元值的成员
 * @author fmm 2015-07-01
 */
var ContourParam = function (option) {
	var options = (option != undefined) ? option : {};
	this.IsSmoothLine = options.IsSmoothLine !== undefined ? options.IsSmoothLine : false;
	this.SmoothGrade = options.SmoothGrade !== undefined ? options.SmoothGrade : 1;
	this.IsMakeReg = options.IsMakeReg !== undefined ? options.IsMakeReg : false;
	this.IsMakeNote = options.IsMakeNote !== undefined ? options.IsMakeNote : false;
	this.IsMakeSLin = options.IsMakeSLin !== undefined ? options.IsMakeSLin : false;
	this.MapWay = options.MapWay !== undefined ? options.MapWay : 1;
	this.FrameWidth = options.FrameWidth !== undefined ? options.FrameWidth : 1.0;
	this.FrameHeight = options.FrameHeight !== undefined ? options.FrameHeight : 1.0;
	this.IsDrawColorScl = options.IsDrawColorScl !== undefined ? options.IsDrawColorScl : false;
	this.IsSaveEdge = options.IsSaveEdge !== undefined ? options.IsSaveEdge : false;
	this.NoteParam = options.NoteParam !== undefined ? options.NoteParam : new Zondy.Object.ContourAnalyse.ContourNoteParam();
	this.SlopLineParam = options.SlopLineParam !== undefined ? options.SlopLineParam : new Zondy.Object.ContourAnalyse.SlopLineParam();
	this.ZValues = options.ZValues !== undefined ? options.ZValues : new Zondy.Object.ContourAnalyse.ContourZValue();
};
export {ContourParam};
Zondy.Object.ContourAnalyse.ContourParam = ContourParam;
