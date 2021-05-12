import {CatalogService}  from  "./CatalogService";
import {IgsServiceBase}  from  "../../baseserver/IServiceBase";
import {ChineseToUtf8} from '../../common/Util';
/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:目录服务.GDBInfo
 * @classdesc 地理数据库信息类
 * @description Zondy.Catalog.GDBInfo
 * @extends  Zondy.Catalog.CatalogService
 * @param option - {Object} 属性键值对，数据库属性字段。<br>
 * @param {String} [option.serverName = null] 服务器名称
 * @param {String} [option.gdbName = null] 数据库名称
 * @param {String} [option.dsName = null] 要素数据集名
 * @param {String} [option.rcsName = null] 栅格数据集名
 * @param {String} [option.User = null] 数据库用户名
 * @param {String} [option.Password = null] 数据库密码
 * @param {Boolean} [option.containAll = true] 是否包含所有
 */
class GDBInfo extends CatalogService {

    constructor(option) {
        var options = option || {};
        super(options);
        /**
         * @private
         * @member Zondy.Catalog.GDBInfo.prototype.serverName
         * @type {String}
         * @description 服务器名称
         * @default null
         */
        this.serverName = options.serverName !== undefined ? options.serverName : null;

        /**
         * @private
         * @member Zondy.Catalog.GDBInfo.prototype.gdbName
         * @type {String}
         * @description 数据库名称
         * @default null
         */
        this.gdbName = options.gdbName !== undefined ? options.gdbName : null;

        /**
         * @private
         * @member Zondy.Catalog.GDBInfo.prototype.dsName
         * @type {String}
         * @description 要素数据集名
         * @default 0
         */
        this.dsName = options.dsName !== undefined ? options.dsName : null;

        /**
         * @private
         * @member Zondy.Catalog.GDBInfo.prototype.rcsName
         * @type {String}
         * @description 栅格数据集名
         * @default null
         */
        this.rcsName = options.rcsName !== undefined ? options.rcsName : null;

        /**
         * @private
         * @member Zondy.Catalog.GDBInfo.prototype.User
         * @type {String}
         * @description 数据库用户名
         * @default null
         */
        this.User = options.User !== undefined ? options.User : null;

        /**
         * @private
         * @member Zondy.Catalog.GDBInfo.prototype.Password
         * @type {String}
         * @description 数据库密码
         * @default 0
         */
        this.Password = options.Password !== undefined ? options.Password : null;

        /**
         * @private
         * @member Zondy.Catalog.GDBInfo.prototype.containAll
         * @type {Boolean}
         * @description 是否包含所有
         * @default 0
         */
        this.containAll = options.containAll !== undefined ? options.containAll : true;
    }

    /**
     * @description 获取数据源列表
     * @function Zondy.Catalog.GDBInfo.prototype.getServerList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var CatalogServer = new Zondy.Catalog.GDBInfo({
                    //IGServer所在地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口
                    port: "6163",
                });
     CatalogServer.getServerList(function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    getServerList(onSuccess, onError) {
        var me = this;
        me.partUrl = "datasource?f=json";
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 获取指定数据源下数据库列表
     * @function Zondy.Catalog.GDBInfo.prototype.getGDBList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var CatalogServer = new Zondy.Catalog.GDBInfo({
                    //数据源名称
                    serverName: 'mapgislocal',
                    //IGServer所在地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口
                    port: "6163"
                });
     CatalogServer.getGDBList(function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    getGDBList(onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase() === "mapgislocal") {
            me.partUrl = "datasource/" + me.serverName + "?f=json";
        }
        else {
            me.partUrl = "datasource/" + me.serverName + "?user=" + me.User + "&psw=" + me.Password + "&f=json";
        }
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 获取GDB下要素集列表
     * @function Zondy.Catalog.GDBInfo.prototype.getDsList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var CatalogServe = new Zondy.Catalog.GDBInfo({
                    //数据源名称
                    serverName: 'mapgislocal',
                    //IGServer所在地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口
                    port: "6163",
                    //数据库名称
                    gdbName: '示例数据'
                });

     CatalogServe.getDsList(function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    getDsList(onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase() === "mapgislocal") {
            me.partUrl = "datasource/" + me.serverName + "/" + me.gdbName + "/ds?containAll=" + me.containAll + "&f=json";
        }
        else {
            me.partUrl = "datasource/" + me.serverName + "/" + me.gdbName + "/ds?user=" + me.User + "&psw=" + me.Password + "&containAll=" + me.containAll + "&f=json";
        }
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 获取GDB下所有栅格目录列表
     * @function Zondy.Catalog.GDBInfo.prototype.getRcsList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var CatalogServe = new Zondy.Catalog.GDBInfo({
                    //数据源名称
                    serverName: 'mapgislocal',
                    //IGServer所在地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口
                    port: "6163",
                    //数据库名称
                    gdbName: '示例数据'
                });

     CatalogServe.getRcsList(function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    getRcsList(onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase() === "mapgislocal") {
            me.partUrl = "datasource/" + me.serverName + "/" + me.gdbName + "/rcs?f=json";
        }
        else {
            me.partUrl = "datasource/" + me.serverName + "/" + me.gdbName + "/rcs?user=" + me.User + "&psw=" + me.Password + "&containAll=" + me.containAll + "&f=json";
        }
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 获取参照系列表
     * @function Zondy.Catalog.GDBInfo.prototype.getProjectList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var CatalogServe = new Zondy.Catalog.GDBInfo({
                    //数据源名称
                    serverName: 'mapgislocal',
                    //IGServer所在地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口
                    port: "6163",
                    //数据库名称
                    gdbName: '示例数据'
                });

     CatalogServe.getProjectList(function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    getProjectList(onSuccess, onError) {
        var me = this;
        me.partUrl = "datasource/" + me.serverName + "/" + me.gdbName + "?f=json";
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 获取参照系信息
     * @function Zondy.Catalog.GDBInfo.prototype.getProjectInfo
     * @param srefID -{Integer}空间参照系ID。<br>
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var CatalogServe = new Zondy.Catalog.GDBInfo({
                    //数据源名称
                    serverName: 'mapgislocal',
                    //IGServer所在地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口
                    port: "6163",
                    //数据库名称
                    gdbName: '示例数据'
                });

     CatalogServe.getProjectInfo(5,function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    getProjectInfo(srefID, onSuccess, onError) {
        var me = this;
        me.partUrl = "datasource/" + me.serverName + "/" + me.gdbName + "/" + srefID + "?f=json";
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 附加地理数据库。在附加前，数据源内应不包含将附加的数据库
     * @function Zondy.Catalog.GDBInfo.prototype.AttachGDB
     * @param path -{String}数据库的绝对路径。
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var CatalogServer = new Zondy.Catalog.GDBInfo({
                    //数据源名称
                    serverName: 'mapgislocal',
                    //IGServer所在地址
                    ip: "localhost",
                    //IGServer请求端口
                    port: "6163",
                    //设置数据库名称
                    gdbName: '专题图数据'
                });
     CatalogServer.AttachGDB('D:/20180629MapGIS 10/Sample/专题图数据.hdf', function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    AttachGDB(path, onSuccess, onError) {
        var me = this;
        if (me.serverName === null || me.gdbName === null || path === null) {
            return;
        }
        me.partUrl = "gdb/attach/" + me.gdbName + "?gdbSvrName=" + me.serverName + "&path=" + path + "&f=json";
        if (me.User !== null && me.Password !== null) {
            me.partUrl += "&gdbUserName=" + me.User + "&gdbPwd=" + me.Password;
        }
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 注销地理数据库。如果将要被注销的数据库正在被使用，则会注销失败
     * @function Zondy.Catalog.GDBInfo.prototype.DetachGDB
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var CatalogServer = new Zondy.Catalog.GDBInfo({
                    //数据源名称
                    serverName: 'mapgislocal',
                    //IGServer所在地址
                    ip: "localhost",
                    //IGServer请求端口
                    port: "6163",
                    //设置数据库名称
                    gdbName: '专题图数据'
                });
     CatalogServer.DetachGDB(function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    DetachGDB(onSuccess, onError) {
        var me = this;
        if (me.serverName === null || me.gdbName === null) {
            return;
        }
        me.partUrl = "gdb/detach/" + me.gdbName + "?gdbSvrName=" + me.serverName;

        if (me.User !== null && me.Password !== null) {
            me.partUrl += "&gdbUserName=" + me.User + "&gdbPwd=" + me.Password;
        }
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 创建地理数据库,新建的数据库会保存到本地，同时附加到数据源
     * @function Zondy.Catalog.GDBInfo.prototype.CreateGDB
     * @param path -{String}数据库的绝对路径(本地数据源，即MapGISLocal，必须设置，仅包含创建数据库路径，不包含数据库名称)。<br>
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var CatalogServer = new Zondy.Catalog.GDBInfo({
                    //数据源名称
                    serverName: 'mapgislocal',
                    //IGServer所在地址
                    ip: "localhost",
                    //IGServer请求端口
                    port: "6163",
                    //设置数据库名称
                    gdbName: '专题图数据'
                });
     CatalogServer.CreateGDB('D:/20180629MapGIS 10/Sample/专题图数据.hdf', function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    CreateGDB(path, onSuccess, onError) {
        var me = this;
        if (me.serverName === null || me.gdbName === null) {
            return;
        }
        if (me.serverName.toLowerCase() === 'mapgislocal' && path === null) {
            return;
        }
        me.partUrl = "gdb/creat/" + me.gdbName + "?gdbSvrName=" + me.serverName + "&path=" + path + "&f=json";
        if (me.User !== null && me.Password !== null) {
            me.partUrl += "&gdbUserName=" + me.User + "&gdbPwd=" + me.Password;
        }
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 删除地理数据库
     * @function Zondy.Catalog.GDBInfo.prototype.DeleteGDB
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var CatalogServer = new Zondy.Catalog.GDBInfo({
                    //数据源名称
                    serverName: 'mapgislocal',
                    //IGServer所在地址
                    ip: "localhost",
                    //IGServer请求端口
                    port: "6163",
                    //设置数据库名称
                    gdbName: '专题图数据'
                });
     CatalogServer.DeleteGDB(function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    DeleteGDB(onSuccess, onError) {
        var me = this;
        if (me.serverName === null || me.gdbName === null) {
            return;
        }
        me.partUrl = "gdb/delete/" + me.gdbName + "?gdbSvrName=" + me.serverName;

        if (me.User !== null && me.Password !== null) {
            me.partUrl += "&gdbUserName=" + me.User + "&gdbPwd=" + me.Password;
        }
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }
}
export {GDBInfo};
Zondy.Catalog.GDBInfo = GDBInfo;