import {
    Zondy
} from './Base';

/**
 * 地理数据库信息对象构造函数
 * @class Zondy.Object.CAttStruct
 * @classdesc 地理数据库信息对象构造函数
 * @param {Object} option 属性键值对
 * @param {String} [option.ServerName = null] 数据源名称
 * @param {String} [option.GDBName = null] 数据库名称
 * @param {String} [option.User = null] 用户名
 * @param {String} [option.Password = null] 密码
 */
var CGDBInfo = function (option) {
    var options = option ? option : {};
    // extend(this, options);

    /**
     * @private
     * @member Zondy.Object.CGDBInfo.prototype.GDBSvrName
     * @type {String}
     * @description 数据源名称
     * @default null
     */
    this.GDBSvrName = options.ServerName !== undefined ? options.ServerName : null;

    /**
     * @private
     * @member Zondy.Object.CGDBInfo.prototype.GDBName
     * @type {String}
     * @description 数据库名称
     * @default null
     */
    this.GDBName = options.GDBName !== undefined ? options.GDBName : null;

    /**
     * @private
     * @member Zondy.Object.CGDBInfo.prototype.User
     * @type {String}
     * @description 用户名
     * @default null
     */
    this.User = options.User !== undefined ? options.User : null;

    /**
     * @private
     * @member Zondy.Object.CGDBInfo.prototype.Password
     * @type {String}
     * @description 密码
     * @default null
     */
    this.Password = options.Password !== undefined ? options.Password : null;

};
export {
    CGDBInfo
};
Zondy.Object.CGDBInfo = CGDBInfo;