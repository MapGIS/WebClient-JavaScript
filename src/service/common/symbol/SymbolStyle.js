import {extend} from "../Util";
import {Zondy} from "../Base";
import {VectorStyle} from "./VectorStyle";

/**
 * 符号样式
 * @class Zondy.Object.SymbolStyle
 * @classdesc 符号样式
 * @param {String} [symbol = ""] 符号名称或url
 * @param {Number} [size = 1] 符号大小
 * @param {Number} [rotate = 0] 旋转角度，0~360度
 * @param {Number} [xOffset = 0] X轴偏移
 * @param {Number} [yOffset = 0] Y轴偏移
 * @param {String} [anchor = center] 锚点
 */
class SymbolStyle extends VectorStyle {
    constructor(option) {
        super();
        var options = option ? option : {};
        this.symbol = "";
        this.size = 1;
        this.rotate = 0;
        this.xOffset = 0;
        this.yOffset = 0;
        this.anchor = "center";
        extend(this, options);
    }
}

export {
    SymbolStyle
};
Zondy.Object.SymbolStyle = SymbolStyle;