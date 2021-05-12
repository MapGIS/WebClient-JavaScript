import {
    Zondy
} from '../../common/Base';
import {
    CTheme
} from "./CTheme";
/**
 * 专题图结构信息对象构造函数
 * @class module:专题图服务.ThemesInfo
 * @classdesc 专题图结构信息对象构造函数
 * @description Zondy.Object.Theme.ThemesInfo 
 * @param {String} [LayerName = ""] 图层名
 * @param {Array} [themeArr = null] 专题图数组 Array<{@link Zondy.Object.Theme.CTheme}>
 */
var ThemesInfo = function (LayerName, themeArr) {
    /**
     * @private
     * @member Zondy.Object.Theme.ThemesInfo.prototype.LayerName
     * @type {String}
     * @description 图层名
     * @default null
     */
    this.LayerName = LayerName !== undefined ? LayerName : null;

    /**
     * @private
     * @member Zondy.Object.Theme.ThemesInfo.prototype.ThemeArr
     * @type {Array}
     * @description 专题图数组 Array<{@link Zondy.Object.Theme.CTheme}>
     * @default null
     */
    this.ThemeArr = themeArr !== undefined ? themeArr : null;
};
export {
    ThemesInfo
};
Zondy.Object.Theme.ThemesInfo = ThemesInfo;