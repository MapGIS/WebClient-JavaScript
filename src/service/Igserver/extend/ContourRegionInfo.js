import { Zondy } from "../../common/Base";
var ContourRegionInfo = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.PatID = options.PatID != undefined ? options.PatID : 0;
    this.FillMode = options.FillMode != undefined ? options.FillMode : 0;
    this.FillColor = options.FillColor != undefined ? options.FillColor : 1;
    this.PatHeight = options.PatHeight != undefined ? options.PatHeight : 1.0;
    this.PatWidth = options.PatWidth != undefined ? options.PatWidth : 1.0;
    this.PatAngle = options.PatAngle != undefined ? options.PatAngle : 1.0;
    this.PatColor = options.PatColor != undefined ? options.PatColor : 1.0;
    this.OutPenWidth = options.OutPenWidth != undefined ? options.OutPenWidth : 1.0;
    this.OverMethod = options.OverMethod != undefined ? options.OverMethod : 0;
};
export { ContourRegionInfo };
Zondy.Object.ContourAnalyse.ContourRegionInfo = ContourRegionInfo;