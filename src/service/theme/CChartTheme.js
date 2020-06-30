import {
    Zondy
} from '../common/Base';
import {
    CTheme
} from './CTheme';
import {
    CChartType
} from './CChartType';
import {
    CChartThemeInfo
} from './CChartThemeInfo';
import {
    CChartThemeRepresentInfo
} from './CChartThemeRepresentInfo';

/**
 * 统计专题图
 * @class module:专题图服务.CChartTheme
 * @classdesc Zondy.Object.Theme.CChartTheme 统计专题图
 * @extends CTheme
 * @param {Object} opt_options 属性键值对。
 * @param {Number} [opt_options.ChartType = CChartType.Bar] 统计图类型 {@link Zondy.Object.Theme.CChartType}
 * @param {Array} [opt_options.ChartThemeInfoArr = null] 统计专题图信息 Array<{@link Zondy.Object.Theme.CChartThemeInfo}>
 * @param {Object} [opt_options.RepresentInfo = null] 统计图符号参数信息 {@link Zondy.Object.Theme.CChartThemeRepresentInfo}
 */
class CChartTheme extends CTheme {
    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);

        /**
         * @private
         * @member Zondy.Object.Theme.CChartTheme.prototype.ChartType
         * @type {Zondy.Object.Theme.CChartType}
         * @description 统计图类型 {@link Zondy.Object.Theme.CChartType}
         * @default CChartType.Bar
         */
        this.ChartType = (options.ChartType !== undefined) ? options.ChartType : CChartType.Bar;

        /**
         * @private
         * @member Zondy.Object.Theme.CChartTheme.prototype.ChartThemeInfoArr
         * @type {Zondy.Object.Theme.CChartThemeInfo}
         * @description 统计专题图信息 Array<{@link Zondy.Object.Theme.CChartThemeInfo}>
         * @default null
         */
        this.ChartThemeInfoArr = (options.ChartThemeInfoArr !== undefined) ? options.ChartThemeInfoArr : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CChartTheme.prototype.RepresentInfo
         * @type {Zondy.Object.Theme.CChartThemeRepresentInfo}
         * @description 统计图符号参数信息 {@link Zondy.Object.Theme.CChartThemeRepresentInfo}
         * @default null
         */
        this.RepresentInfo = (options.RepresentInfo !== undefined) ? options.RepresentInfo : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CChartTheme.prototype.Type
         * @type {String}
         * @description 专题图类型,只读属性
         * @default "CChartTheme"
         */
        this.Type = "CChartTheme";
    }
}
export {
    CChartTheme
};
Zondy.Object.Theme.CChartTheme = CChartTheme;