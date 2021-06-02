import {
    Zondy
} from '../../common/Base';
import {
    CTheme
} from "./CTheme";

/**
 * 四色专题图
 * @class module:专题图服务.CFourColorTheme
 * @classdesc 四色专题图
 * @description Zondy.Object.Theme.CFourColorTheme
 * @extends CTheme
 * @param {Object} opt_options 属性键值对。
 * @param {Array} [opt_options.ClrInfo = [25, 57, 89, 121]] 颜色信息 Array<Integer>
 */
class CFourColorTheme extends CTheme {
    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);
        /**
         * @private
         * @member Zondy.Object.Theme.CFourColorTheme.prototype.ClrInfo
         * @type {Array}
         * @description 颜色信息,最长为16,优先选择前4种 Array<Integer>
         * @default [25, 57, 89, 121]
         */
        this.ClrInfo = (options.ClrInfo !== undefined) ? options.ClrInfo : [25, 57, 89, 121];

        /**
         * @private
         * @member Zondy.Object.Theme.CFourColorTheme.prototype.Type
         * @type {String}
         * @description 专题图类型,只读属性
         * @default "CFourColorTheme"
         */
        this.Type = "CFourColorTheme";
    }
}
export {
    CFourColorTheme
};
Zondy.Object.Theme.CFourColorTheme = CFourColorTheme;