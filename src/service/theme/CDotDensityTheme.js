import {
    Zondy
} from '../common/Base';
import {
    CTheme
} from "./CTheme";
import {
    CPntInfo
} from "./CPntInfo";

/**
 * 点密度专题图
 * @class module:专题图服务.CDotDensityTheme
 * @classdesc Zondy.Object.Theme.CDotDensityTheme 点密度专题图
 * @extends CTheme
 * @param {Object} opt_options 属性键值对。
 * @param {String} [opt_options.Expression = ] 字段表达式
 * @param {Zondy.Object.Theme.CPntInfo} [opt_options.Info = null] 点图形信息 {@link Zondy.Object.Theme.CPntInfo}
 * @param {Number} [opt_options.Value = null] 专题图中每一个点所代表的数值
 */
class CDotDensityTheme extends CTheme {
    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);
        /**
         * @private
         * @member Zondy.Object.Theme.CDotDensityTheme.prototype.Expression
         * @type {String}
         * @description 字段表达式
         * @default ''
         */
        this.Expression = (options.Expression !== undefined) ? options.Expression : "";

        /**
         * @private
         * @member Zondy.Object.Theme.CDotDensityTheme.prototype.Info
         * @type {Object}
         * @description 点图形信息 {@link Zondy.Object.Theme.CPntInfo}
         * @default null
         */
        this.Info = (options.Info !== undefined) ? options.Info : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CDotDensityTheme.prototype.Value
         * @type {Number}
         * @description 专题图中每一个点所代表的数值
         * @default null
         */
        this.Value = (options.Value !== undefined) ? options.Value : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CDotDensityTheme.prototype.Type
         * @type {String}
         * @description 专题图类型,只读属性
         * @default "CDotDensityTheme"
         */
        this.Type = "CDotDensityTheme";
    }
}
export {
    CDotDensityTheme
};
Zondy.Object.Theme.CDotDensityTheme = CDotDensityTheme;