import {
    Zondy
} from './Base';
import {
    FeatureGraphicBase
} from "./FeatureGraphicBase";
import {
    AnyLine
} from "./AnyLine";

/**
 * 线要素几何图形信息对象
 * @class Zondy.Object.GLine
 * @classdesc 线要素几何图形信息对象
 * @extends Zondy.Object.FeatureGraphicBase
 * @param {Zondy.Object.AnyLine} [line = null] 构造线要素的线几何对象
 * @param {Object} option 属性键值对,拓展属性
 */
class GLine extends FeatureGraphicBase {
    /// <summary>线要素几何图形信息对象构造函数</summary>
    /// <param name="line" type="Zondy.Object.AnyLine">构造线要素的线几何对象</param>
    constructor(line, option) {
        var options = option ? option : {};
        super(options);

        /**
         * @member Zondy.Object.GLine.prototype.Line
         * @type {Zondy.Object.AnyLine}
         * @description 构造线要素的线几何对象
         * @default null
         */
        this.Line = (line !== undefined && line !== null) ? line : null;
    }

    /**
     * @function Zondy.Object.GLine.prototype.setLine
     * @description 设置线要素几何信息
     * @param {Zondy.Object.AnyLine} [line=null] 线几何对象
     */
    setLine(line) {
        this.Line = (line !== undefined && line !== null) ? line : null;
    }
}
export {
    GLine
};
Zondy.Object.GLine = GLine;