import {extend} from "../Util";
import {Zondy} from "../Base";
import {VectorStyle} from "./VectorStyle";

/**
 * 线样式
 * @class Zondy.Object.LineStyle
 * @classdesc 线样式
 * @param {Number} [width = 1] 线宽度，默认为1
 * @param {String} [dashArray = line] 线的样式，默认line，即为实线
 * @param {String} [cap = butt] 线头样式，默认butt
 * @param {String} [join = miter] 拐角样式，默认miter
 * @param {Object} [shadowStyle = undefined] 阴影样式，默认undefined
 */
class LineStyle extends VectorStyle {
    constructor(option) {
        super();
        var options = option ? option : {};
        this.width = 1;
        this.dashArray = "line";
        this.cap = "butt";
        this.join = "miter";
        this.shadowStyle = undefined;
        extend(this, options);
    }
}

export {
    LineStyle
};
Zondy.Object.LineStyle = LineStyle;