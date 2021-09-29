import {extend} from "../Util";
import {Zondy} from "../Base";

/**
 * 矢量样式基类
 * @class Zondy.Object.VectorStyle
 * @classdesc 矢量样式基类
 * @param {Number} [opacity = 1] 透明度，0~1之间的值，默认为1，不透明
 * @param {String} [color = #FFFFFF] 颜色，十六进制或RGB，默认为#FFFFFF，白色
 */
class VectorStyle {
    constructor(option) {
        var options = option ? option : {};
        this.opacity = 1;
        this.color = "#FFFFFF";
        extend(this, options);
    }
}

export {
    VectorStyle
};
Zondy.Object.VectorStyle = VectorStyle;