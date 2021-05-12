import { newGuid } from '../../common/Util';
import { GDBInfo } from './CatalogGDBInfo';
import { IgsServiceBase } from '../../baseserver/IServiceBase';
import { CAttStruct } from '../../common/CAttStruct';
/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:目录服务.VectorLayer
 * @classdesc 矢量图层类
 * @description Zondy.Catalog.VectorLayer
 * @extends  Zondy.Catalog.GDBInfo
 * @param option - {Object} 属性键值对。<br>
 * @param {String} [option.serverName = null] 服务器名称
 * @param {String} [option.gdbName = null] 数据库名称
 * @param {String} [option.dsName = null] 要素数据集
 * @param {String} [option.rcsName = null] 栅格数据集
 * @param {String} [option.User = null] 数据库用户名
 * @param {String} [option.Password = null] 数据库密码
 * @param {Boolean} [option.containAll = true] 是否包含所有
 */
class VectorLayer extends GDBInfo {
    constructor(option) {
        var options = option || {};
        super(options);
    }

    /**
     * @description 获取GDB下所有简单要素类列表
     * @function Zondy.Catalog.VectorLayer.prototype.getSfclsList
     * @param onSuccess - {Function} 请求成功回调函数。
     * @param onError - {Function} 请求失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称
                    gdbName: 'sample'
                });
     vector.getSfclsList(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    getSfclsList(onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase().indexOf('mapgislocal') >= 0)
            me.partUrl = 'datasource/' + me.serverName + '/' + me.gdbName + '/sfcls?containAll=' + me.containAll + '&f=json';
        else
            me.partUrl =
                'datasource/' +
                me.serverName +
                '/' +
                me.gdbName +
                '/sfcls?user=' +
                me.User +
                '&psw=' +
                me.Password +
                '&containAll=' +
                this.containAll +
                '&f=json';

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
     * @description 获取GDB下所有注记类列表
     * @function Zondy.Catalog.VectorLayer.prototype.getAclsList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称
                    gdbName: 'sample'
                });
     vector.getAclsList(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    getAclsList(onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase().indexOf('mapgislocal') >= 0)
            me.partUrl = 'datasource/' + me.serverName + '/' + me.gdbName + '/acls?containAll=' + me.containAll + '&f=json';
        else
            me.partUrl =
                'datasource/' +
                me.serverName +
                '/' +
                me.gdbName +
                '/acls?user=' +
                me.User +
                '&psw=' +
                me.Password +
                '&containAll=' +
                me.containAll +
                '&f=json';
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
     * @description 获取GDB下所有对象类列表
     * @function Zondy.Catalog.VectorLayer.prototype.getOclsList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称
                    gdbName: 'sample'
                });
     vector.getOclsList(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    getOclsList(onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase().indexOf('mapgislocal') >= 0)
            me.partUrl = 'datasource/' + me.serverName + '/' + me.gdbName + '/ocls?containAll=' + me.containAll + '&f=json';
        else
            me.partUrl =
                'datasource/' +
                me.serverName +
                '/' +
                me.gdbName +
                '/ocls?user=' +
                me.User +
                '&psw=' +
                me.Password +
                '&containAll=' +
                me.containAll +
                '&f=json';
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
     * @description 获取GDB下所有网络类列表
     * @function Zondy.Catalog.VectorLayer.prototype.getNclsList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称
                    gdbName: 'sample'
                });
     vector.getNclsList(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    getNclsList(onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase().indexOf('mapgislocal') >= 0)
            me.partUrl = 'datasource/' + me.serverName + '/' + me.gdbName + '/ncls?containAll=' + me.containAll + '&f=json';
        else
            me.partUrl =
                'datasource/' +
                me.serverName +
                '/' +
                me.gdbName +
                '/ncls?user=' +
                me.User +
                '&psw=' +
                me.Password +
                '&containAll=' +
                me.containAll +
                '&f=json';
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
     * @description 获取GDB下所有栅格数据集列表
     * @function Zondy.Catalog.VectorLayer.prototype.getRdsList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称
                    gdbName: 'sample'
                });
     vector.getRdsList(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    getRdsList(onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase().indexOf('mapgislocal') >= 0)
            me.partUrl = 'datasource/' + me.serverName + '/' + me.gdbName + '/rds?containAll=' + me.containAll + '&f=json';
        else
            me.partUrl =
                'datasource/' +
                me.serverName +
                '/' +
                me.gdbName +
                '/rds?user=' +
                me.User +
                '&psw=' +
                me.Password +
                '&containAll=' +
                me.containAll +
                '&f=json';
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
     * @description 获取GDB下指定要素集内所有简单要素类列表
     * @function Zondy.Catalog.VectorLayer.prototype.getDsSfclsList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称
                    gdbName: 'sample',
                    //设置目标要素数据集名称
                    dsName: '地图综合'
                });

     vector.getDsSfclsList(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    getDsSfclsList(onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase().indexOf('mapgislocal') >= 0 || me.serverName.toLowerCase() === 'mapgislocalplus')
            me.partUrl = 'datasource/' + me.serverName + '/' + me.gdbName + '/' + me.dsName + '/sfcls?f=json';
        else
            me.partUrl =
                'datasource/' + me.serverName + '/' + me.gdbName + '/' + me.dsName + '/sfcls?user=' + me.User + '&psw=' + me.Password + '&f=json';
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
     * @description 获取GDB下指定要素集内所有注记类列表
     * @function Zondy.Catalog.VectorLayer.prototype.getDsAclsList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称
                    gdbName: 'sample',
                    //设置目标要素数据集名称
                    dsName: '地图综合'
                });

     vector.getDsAclsList(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    getDsAclsList(onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase().indexOf('mapgislocal') >= 0)
            me.partUrl = 'datasource/' + me.serverName + '/' + me.gdbName + '/' + me.dsName + '/acls?f=json';
        else
            me.partUrl =
                'datasource/' + me.serverName + '/' + me.gdbName + '/' + me.dsName + '/acls?user=' + me.User + '&psw=' + me.Password + '&f=json';
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
     * @description 获取GDB下指定要素集内所有对象类列表
     * @function Zondy.Catalog.VectorLayer.prototype.getDsOclsList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称
                    gdbName: 'sample',
                    //设置目标要素数据集名称
                    dsName: '地图综合'
                });

     vector.getDsOclsList(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    getDsOclsList(onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase().indexOf('mapgislocal') >= 0)
            me.partUrl = 'datasource/' + me.serverName + '/' + me.gdbName + '/' + me.dsName + '/ocls?f=json';
        else
            me.partUrl =
                'datasource/' + me.serverName + '/' + me.gdbName + '/' + me.dsName + '/ocls?user=' + me.User + '&psw=' + me.Password + '&f=json';
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
     * @description 获取GDB下指定要素集内所有网络类列表
     * @function Zondy.Catalog.VectorLayer.prototype.getDsNclsList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称
                    gdbName: 'sample',
                    //设置目标要素数据集名称
                    dsName: '地图综合'
                });

     vector1.getDsNclsList(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    getDsNclsList(onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase().indexOf('mapgislocal') >= 0)
            me.partUrl = 'datasource/' + me.serverName + '/' + me.gdbName + '/' + me.dsName + '/ncls?f=json';
        else
            me.partUrl =
                'datasource/' + me.serverName + '/' + me.gdbName + '/' + me.dsName + '/ncls?user=' + me.User + '&psw=' + me.Password + '&f=json';
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
     * @description 获取GDB下指定栅格目录内所有栅格数据集列表
     * @function Zondy.Catalog.VectorLayer.prototype.getRdsListInRcs
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称 sample
                    gdbName: 'sample',
                    //设置目标要素数据集名称
                    rcsName: '栅格目录'
                });

     vector.getRdsListInRcs(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    getRdsListInRcs(onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase().indexOf('mapgislocal') >= 0)
            me.partUrl = 'datasource/' + me.serverName + '/' + me.gdbName + '/' + me.rcsName + '/rds?f=json';
        else
            me.partUrl =
                'datasource/' + me.serverName + '/' + me.gdbName + '/' + me.rcsName + '/rds?user=' + me.User + '&psw=' + me.Password + '&f=json';
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
     * @description 通过传入的参数选择获取GDB下面的哪一类
     * @function Zondy.Catalog.VectorLayer.prototype.getLayerList
     * @description 参数为分别为数据库下简单要素类，要素集，注记类，网络类，对象类，栅格数据集，栅格目录
     * @param  clsType  -{String} 值为"sfcls","ds", "acls", "ncls"，"ocls", "rds", "rcs"。<br>
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称
                    gdbName: 'sample'
                });
     vector.getLayerList('sfcls',function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    getLayerList(clsType, onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase().indexOf('mapgislocal') >= 0)
            me.partUrl = 'datasource/' + me.serverName + '/' + me.gdbName + '/' + clsType + '?containAll=' + me.containAll + '&f=json';
        else
            me.partUrl =
                'datasource/' +
                me.serverName +
                '/' +
                me.gdbName +
                '/' +
                clsType +
                '?user=' +
                me.User +
                '&psw=' +
                me.Password +
                '&containAll=' +
                me.containAll +
                '&f=json';
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
     * @description 通过传入的参数选择获取GDB下面指定要素集下的哪一类
     * @function Zondy.Catalog.VectorLayer.prototype.getLayerListInDS
     * @param  clsType  -{String} 分别为GDB下简单要素类，要素类，注记类或网络类。<br>
     * @param onSuccess - {Function} 获取成功回调函数。
     * @param onError - {Function}  获取失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称
                    gdbName: 'sample',
                    //设置目标要素数据集名称
                    dsName: '地图综合'
                });

     vector.getLayerListInDS('sfcls',function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    getLayerListInDS(clsType, onSuccess, onError) {
        var me = this;
        if (me.serverName.toLowerCase().indexOf('mapgislocal') >= 0)
            me.partUrl = 'datasource/' + me.serverName + '/' + me.gdbName + '/' + me.dsName + '/' + clsType + '?f=json';
        else
            me.partUrl =
                'datasource/' +
                me.serverName +
                '/' +
                me.gdbName +
                '/' +
                me.dsName +
                '/' +
                clsType +
                '?user=' +
                me.User +
                '&psw=' +
                me.Password +
                '&f=json';
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
     * @description 通过传入的参数选择获取GDB下面指定要素集下的哪一类
     * @function Zondy.Catalog.VectorLayer.prototype.getLayerInfo
     * @param  gdbpUrl  -{String} 类URL。<br>
     * @param onSuccess - {Function} 获取成功回调函数。
     * @param onError - {Function} 获取失败回调函数。
     * @example
     * var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163'
                });
     vector.getLayerInfo('gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区', function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    getLayerInfo(gdbpUrl, onSuccess, onError, encryptPassword) {
        var me = this;
        me.partUrl = 'layerinfo?gdbpUrl=' + gdbpUrl + '&f=json' + '&encryptPassword=' + encryptPassword + '&proj=' + this.proj;
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
     * @description 在指定GDB中创建图层
     * @function Zondy.Catalog.VectorLayer.prototype.CreateVectCls
     * @description 可指定图层的数据类型、几何形态、属性结构、要素数据集、空间参考等信息，其中图层的属性结构，采用POST参数形式传入,若未设置图层名称，则图层名称为当前guid。<br>
     * @param  vectCls  -{Zondy.Object.VectCls} 矢量类。<br>
     * @param onSuccess - {Function} 创建成功回调函数。
     * @param onError - {Function} 创建失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称
                    gdbName: 'sample'
                });
     //实例化图层对象
     var VectCls = new Zondy.Object.VectCls({
                    clsType: "SfeatureCls",
                    clsName: "新图层",
                    attStruct: {
                        "FldName": [
                            "ID",
                            "name",
                            "addrass",
                            "picture",
                            "city",
                            "LayerID",
                            "mpLayer"
                        ],
                        "FldNumber": "7",
                        "FldType": [
                            "long",
                            "string",
                            "string",
                            "string",
                            "string",
                            "long",
                            "long"
                        ]
                    }
                });
     vector.CreateVectCls(VectCls, function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */

    CreateVectCls(vectCls, onSuccess, onError) {
        var me = this;
        vectCls = vectCls !== null ? vectCls : null;
        if (vectCls === null || me.serverName === null || me.gdbName === null) {
            return;
        }
        if (me.User !== null && me.Password !== null) {
            me.partUrl = 'datasource/' + me.User + ':' + me.Password + '@';
        } else {
            me.partUrl = 'datasource/';
        }
        if (vectCls.clsName === null) {
            vectCls.clsName = newGuid();
        }
        me.partUrl +=
            me.serverName +
            '/' +
            me.gdbName +
            '/' +
            vectCls.clsType +
            '/' +
            vectCls.clsName +
            '/create?' +
            'geoType=' +
            vectCls.geoType +
            '&srefName=' +
            vectCls.srefName +
            '&dsName=' +
            vectCls.dsName +
            '&f=json';

        if (vectCls.attStruct === null) {
            vectCls.attStruct = new CAttStruct();
        }
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync({
            method: 'POST',
            data: JSON.stringify(vectCls.attStruct),
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
        });
    }

    /**
     * @description 在指定GDB中删除图层
     * @function Zondy.Catalog.VectorLayer.prototype.deleteXCls
     * @param  clsType  -{Zondy.Enum.XClsType} 数据类型。<br>
     * @param  clsName  -{String} 数据名称。<br>
     * @param onSuccess - {Function} 删除成功回调函数。<br>
     * @param onError - {Function}  删除失败回调函数。
     * @example
     var vector = new Zondy.Catalog.VectorLayer({
                    //设置GIS数据服务器IP
                    ip: 'develop.smaryun.com',
                    //设置GIS服务端口号
                    port: '6163',
                    //设置数据源名称
                    serverName: 'MapGISLocal',
                    //设置数据库名称
                    gdbName: 'sample'
                });
     vector.deleteXCls("SfeatureCls", "新图层", function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    deleteXCls(clsType, clsName, onSuccess, onError) {
        var me = this;
        if (me.serverName === null || me.gdbName === null || clsType === null || clsName === null) {
            return;
        }
        me.partUrl = 'datasource/' + me.serverName + '/' + me.gdbName + '/' + clsType + '/' + clsName + '/delete?f=json';
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
export { VectorLayer };
Zondy.Catalog.VectorLayer = VectorLayer;
