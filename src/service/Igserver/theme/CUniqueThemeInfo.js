import {
    Zondy
} from '../../common/Base';
import {
    CThemeInfo
} from "./CThemeInfo";

/**
 * 单值专题图信息
 * @class module:专题图服务.CUniqueThemeInfo
 * @classdesc 单值专题图信息
 * @description Zondy.Object.Theme.CUniqueThemeInfo 
 * @extends CThemeInfo
 * @param {Object} opt_options 属性键值对
 */
class CUniqueThemeInfo extends CThemeInfo {
    constructor(value, opt_options) {
        var options = opt_options ? opt_options : {};
        super(options);
        this.Value = (value !== undefined) ? value : "";
    }
}
export {
    CUniqueThemeInfo
};
Zondy.Object.Theme.CUniqueThemeInfo = CUniqueThemeInfo;