import {extend} from "../Util";
import {Zondy} from "../Base";
import {VectorStyle} from "./VectorStyle";

/**
 * 多边形样式
 * @class Zondy.Object.PolygonStyle
 * @classdesc 多边形样式
 * @param {Number} [outlineWidth = 0] 多边形外边线宽度，默认为1
 * @param {String} [outlineColor = #FFFFFF] 多边形外边线颜色，16进制颜色或rgb值或rgba值，默认#FFFFFF，白色
 * @param {String} [outlineDashArray = line] 多边形外边线样式，默认line，即实线
 * @param {Object} [shadowStyle = undefined] 阴影样式，默认undefined
 * @param {Object} [symbolStyle = undefined] 填充图案样式，默认undefined
 * @param {Object} [outlineSymbolStyle = undefined] 多边形外边线填充图案样式，默认undefined
 */
class PolygonStyle extends VectorStyle {
    constructor(option) {
        super();
        var options = option ? option : {};
        this.outlineWidth = 1;
        this.outlineColor = "#FFFFFF";
        this.outlineDashArray = "line";
        this.shadowStyle = undefined;
        this.symbolStyle = undefined;
        this.outlineSymbolStyle = undefined;
        extend(this, options);
    }
}

export {
    PolygonStyle
};
Zondy.Object.PolygonStyle = PolygonStyle;