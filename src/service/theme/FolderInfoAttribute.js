import {
    Zondy
} from '../common/Base';
/**
 * 文件夹信息属性
 * @class module:专题图服务.FolderInfoAttribute
 * @classdesc Zondy.Object.Theme.FolderInfoAttribute 文件夹信息属性
 * @param {String} [n = null] 名称
 * @param {String} [v = null] 值
 */
var FolderInfoAttribute = function (n, v) {
    /**
     * @private
     * @member Zondy.Object.Theme.FolderInfoAttribute.prototype.name
     * @type {String}
     * @description 名称
     * @default null
     */
    this.name = n !== undefined ? n : null;

    /**
     * @private
     * @member Zondy.Object.Theme.FolderInfoAttribute.prototype.Value
     * @type {String}
     * @description 值
     * @default null
     */
    this.Value = v !== undefined ? v : null;
};
export {
    FolderInfoAttribute
};
Zondy.Object.Theme.FolderInfoAttribute = FolderInfoAttribute;