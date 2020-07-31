import {
    Zondy
} from '../common/Base';
import {
    CTheme
} from "./CTheme";
/**
 * 随机专题图
 * @class module:专题图服务.CRandomTheme
 * @classdesc 随机专题图
 * @description Zondy.Object.Theme.CRandomTheme 
 * @extends CTheme
 * @param {Object} opt_options 属性键值对
 */
class CRandomTheme extends CTheme {
    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);
        /**
         * @private
         * @member Zondy.Object.Theme.CRandomTheme.prototype.Type
         * @type {String}
         * @description 专题图类型,只读属性
         * @default "CRandomTheme"
         */
        this.Type = "CRandomTheme";
    }
}
export {
    CRandomTheme
};
Zondy.Object.Theme.CRandomTheme = CRandomTheme;