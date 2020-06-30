import {
    Zondy
} from '../common/Base';
import {
    CTheme
} from "./CTheme";
import {
    CThemeInfo
} from "./CThemeInfo";
/**
 * 统一配置专题图
 * @class module:专题图服务.CSimpleTheme
 * @classdesc Zondy.Object.Theme.CSimpleTheme 统一配置专题图
 * @extends CTheme
 * @param {Object} opt_options 属性键值对
 * @param {Zondy.Object.Theme.CThemeInfo} [opt_options.ThemeInfo = new CThemeInfo()] 缺省专题绘制信息 {@link Zondy.Object.Theme.CThemeInfo}
 */
class CSimpleTheme extends CTheme {
    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);
        /**
         * @private
         * @member Zondy.Object.Theme.CSimpleTheme.prototype.ThemeInfo
         * @type {Zondy.Object.Theme.CThemeInfo}
         * @description 缺省专题绘制信息 {@link Zondy.Object.Theme.CThemeInfo}
         * @default new CThemeInfo()
         */
        this.ThemeInfo = (options.ThemeInfo !== undefined) ? options.ThemeInfo : new CThemeInfo();

        /**
         * @private
         * @member Zondy.Object.Theme.CSimpleTheme.prototype.Type
         * @type {String}
         * @description 专题图类型,只读属性
         * @default "CSimpleTheme"
         */
        this.Type = "CSimpleTheme";
    }
}
export {
    CSimpleTheme
};
Zondy.Object.Theme.CSimpleTheme = CSimpleTheme;