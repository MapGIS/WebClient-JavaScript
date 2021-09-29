import {extend} from "../Util";
import {Zondy} from "../Base";
import {VectorStyle} from "./VectorStyle";

/**
 * 点样式
 * @class Zondy.Object.PointStyle
 * @classdesc 点样式
 * @param {Number} [radius = 1] 半径
 * @param {Number} [outlineWidth = 0] 外边线宽度，默认0，没有外边线
 * @param {String} [outlineColor = #FFFFFF] 外边线颜色，16进制颜色或rgb值或rgba值，默认#FFFFFF，白色
 * @param {String} [anchor = center] 锚点，默center
 */
class PointStyle extends VectorStyle {
    constructor(option) {
        super();
        var options = option ? option : {};
        this.radius = 0;
        this.outlineColor = "#FFFFFF";
        this.outlineWidth = 0;
        this.anchor = "center";
        extend(this, options);
    }
}

export {
    PointStyle
};
Zondy.Object.PointStyle = PointStyle;