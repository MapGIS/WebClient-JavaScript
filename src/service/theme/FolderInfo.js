import {
    Zondy
} from '../common/Base';
import {
    FolderInfoAttribute
} from "./FolderInfoAttribute";

/**
 * 文件夹信息
 * @class module:专题图服务.FolderInfo
 * @classdesc Zondy.Object.Theme.FolderInfo 文件夹信息
 * @param {String} [n = null] 名称
 * @param {Zondy.Object.Theme.FolderInfoAttribute} [att = null] 属性 {@link Zondy.Object.Theme.FolderInfoAttribute}
 */
var FolderInfo = function (n, att) {
    /**
     * @private
     * @member Zondy.Object.Theme.FolderInfo.prototype.name
     * @type {String}
     * @description 名称
     * @default null
     */
    this.name = n !== undefined ? n : null;

    /**
     * @private
     * @member Zondy.Object.Theme.FolderInfo.prototype.attribute
     * @type {Zondy.Object.Theme.FolderInfoAttribute}
     * @description 属性 {@link Zondy.Object.Theme.FolderInfoAttribute}
     * @default null
     */
    this.attribute = att !== undefined ? att : null;
};
export {
    FolderInfo
};
Zondy.Object.Theme.FolderInfo = FolderInfo;