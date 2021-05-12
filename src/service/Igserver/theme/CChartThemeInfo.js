import {
    Zondy
} from '../../common/Base';
import {
    CThemeInfo
} from "./CThemeInfo";

/**
 * 专题图信息统计类
 * @class module:专题图服务.CChartThemeInfo
 * @classdesc 专题图信息统计类
 * @description Zondy.Object.Theme.CChartThemeInfo
 * @extends CThemeInfo
 * @param {Object} options 属性键值对。
 * @param {String} expression 字段表达式
 */
class CChartThemeInfo extends CThemeInfo {
    constructor(expression, opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);
        this.Expression = (expression !== undefined) ? expression : "";
    }
}
export {
    CChartThemeInfo
};
Zondy.Object.Theme.CChartThemeInfo = CChartThemeInfo;