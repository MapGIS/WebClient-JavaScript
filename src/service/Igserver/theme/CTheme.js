import {
    Zondy
} from '../../common/Base';
import {
    extend
} from "../../common/Util";
/**
 * 专题图对象（基类）
 * @class module:专题图服务.CTheme
 * @classdesc 专题图对象（基类）
 * @description Zondy.Object.Theme.CTheme 
 * @param {Object} opt_options 属性键值对
 * @param {String} [opt_options.Name = null] 专题图名称
 * @param {Boolean} [opt_options.IsBaseTheme = true] 是否为单值专题图
 * @param {Boolean} [opt_options.Visible = true] 专题图是否可见
 */
class CTheme {
    constructor(opt_options) {
        var options = opt_options !== undefined ? opt_options : {};
        extend(this, options);

        /**
         * @private
         * @member Zondy.Object.Theme.CTheme.prototype.Name
         * @type {String}
         * @description 专题图名称
         * @default null
         */
        this.Name = options && options.Name ? options.Name : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CTheme.prototype.IsBaseTheme
         * @type {Boolean}
         * @description 是否为单值专题图
         * @default true
         */
        this.IsBaseTheme = options && options.IsBaseTheme ? options.IsBaseTheme : true;

        /**
         * @private
         * @member Zondy.Object.Theme.CTheme.prototype.Visible
         * @type {Boolean}
         * @description 专题图是否可见
         * @default true
         */
        this.Visible = options && options.Visible ? options.Visible : true;
    }
}
export {
    CTheme
};
Zondy.Object.Theme.CTheme = CTheme;