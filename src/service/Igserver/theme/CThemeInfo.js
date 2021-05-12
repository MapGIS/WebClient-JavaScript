import {
    Zondy
} from '../../common/Base';
import {
    extend
} from "../../common/Util";
import {
    CPntInfo
} from "./CPntInfo";
import {
    CLinInfo
} from "./CLinInfo";
import {
    CRegInfo
} from "./CRegInfo";

/**
 * 专题图信息(基类)
 * @class module:专题图服务.CThemeInfo
 * @classdesc 专题图信息(基类)
 * @description Zondy.Object.Theme.CThemeInfo 
 * @param {Object} opt_options 属性键值对
 * @param {String} [opt_options.Caption = null] 名称
 * @param {Boolean} [opt_options.IsVisible = true] 可见标志
 * @param {Number} [opt_options.MaxScale = 0] 最大显示比
 * @param {Number} [opt_options.MinScale = 0] 最小显示比
 * @param {Zondy.Object.Theme.CRegInfo} [opt_options.RegInfo = null] 区信息 {@link Zondy.Object.Theme.CRegInfo}
 * @param {Zondy.Object.Theme.CLinInfo} [opt_options.LinInfo = null] 线信息 {@link Zondy.Object.Theme.CLinInfo}
 * @param {Zondy.Object.Theme.CPntInfo} [opt_options.PntInfo = null] 点信息 {@link Zondy.Object.Theme.CPntInfo}
 */
class CThemeInfo {
    constructor(opt_options) {
        var options = opt_options !== undefined ? opt_options : {};
        extend(this, options);

        /**
         * @private
         * @member Zondy.Object.Theme.CThemeInfo.prototype.Caption
         * @type {String}
         * @description 名称
         * @default null
         */
        this.Caption = (options.Caption !== undefined) ? options.Caption : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CThemeInfo.prototype.IsVisible
         * @type {Boolean}
         * @description 可见标志
         * @default true
         */
        this.IsVisible = (options.IsVisible !== undefined) ? options.IsVisible : true;

        /**
         * @private
         * @member Zondy.Object.Theme.CThemeInfo.prototype.MaxScale
         * @type {Number}
         * @description 最大显示比
         * @default 0
         */
        this.MaxScale = (options.MaxScale !== undefined) ? parseFloat(options.MaxScale) : 0;

        /**
         * @private
         * @member Zondy.Object.Theme.CThemeInfo.prototype.MinScale
         * @type {Number}
         * @description 最小显示比
         * @default 0
         */
        this.MinScale = (options.MinScale !== undefined) ? parseFloat(options.MinScale) : 0;

        /**
         * @private
         * @member Zondy.Object.Theme.CThemeInfo.prototype.RegInfo
         * @type {Zondy.Object.Theme.CRegInfo}
         * @description 区信息 {@link Zondy.Object.Theme.CRegInfo}
         * @default null
         */
        this.RegInfo = (options.RegInfo !== undefined) ? options.RegInfo : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CThemeInfo.prototype.LinInfo
         * @type {Zondy.Object.Theme.CLinInfo}
         * @description 线信息 {@link Zondy.Object.Theme.CLinInfo}
         * @default null
         */
        this.LinInfo = (options.LinInfo !== undefined) ? options.LinInfo : null;

        /**
         * @private
         * @member Zondy.Object.Theme.CThemeInfo.prototype.PntInfo
         * @type {Zondy.Object.Theme.CPntInfo}
         * @description 点信息 {@link Zondy.Object.Theme.CPntInfo}
         * @default null
         */
        this.PntInfo = (options.PntInfo !== undefined) ? options.PntInfo : null;
    }
}
export {
    CThemeInfo
};
Zondy.Object.Theme.CThemeInfo = CThemeInfo;