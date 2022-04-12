import { Zondy } from '../../common/Base';
import { toJSON } from '../../common/Util';
import { newGuid } from '../../common/Util';
import { CatalogService } from './CatalogService';
import { IgsServiceBase } from '../../baseserver/IServiceBase';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:目录服务.MapDoc
 * @classdesc 地图文档类
 * @description Zondy.Catalog.MapDoc
 * @extends Zondy.Catalog.CatalogService
 * @param option - {Object} 属性键值对，地图属性字段。<br>
 * @param {String} [option.docName = null] 地图文档名称
 * @param {Number} [option.mapIndex = 0] 地图索引
 * @param {Number|String} [option.layerID = 0] 图层索引
 * @param {String} [option.version = null] 版本信息
 * @param {Zondy.Service.Catalog.IncludeStruct} [option.include = {includeDetails:true,includeSubs:false}] 指定地图文档相关信息的结构
 * @param {Boolean} [option.returnFullStyle = false] 是否返回由DWS所返回的原始格式信息
 * @param {Object} [option.guid = newGuid()] 唯一标识，用于标识地图文档
 */
class MapDoc extends CatalogService {
    constructor(option) {
        var options = option || {};
        super(options);
        /**
         * @private
         * @member  Zondy.Catalog.MapDoc.prototype.docName
         * @type {String}
         * @description 地图文档名称
         * @default null
         */
        this.docName = options.docName !== undefined ? options.docName : null;

        /**
         * @private
         * @member  Zondy.Catalog.MapDoc.prototype.mapIndex
         * @type {Number}
         * @description 地图索引
         * @default 0
         */
        this.mapIndex = options.mapIndex !== undefined ? options.mapIndex : 0;

        /**
         * @private
         * @member  Zondy.Catalog.MapDoc.prototype.rcsName
         * @type {Number|String}
         * @description 图层索引
         * @default 0
         */
        this.layerID = options.layerID !== undefined ? options.layerID : 0;

        /**
         * @private
         * @member  Zondy.Catalog.MapDoc.prototype.version
         * @type {String}
         * @description 版本信息
         * @default 2
         */
        this.version = options.version !== undefined ? options.version : 2;

        /**
         * @private
         * @member  Zondy.Catalog.MapDoc.prototype.include
         * @type {Zondy.Service.Catalog.IncludeStruct}
         * @description 指定地图文档相关信息的结构，默认includeDetails为true ,includeSubs为false
         * @default {includeDetails:true,includeSubs:false}
         */
        this.include = options.include !== undefined ? options.include : '{includeDetails:true,includeSubs:false}';

        /**
         * @private
         * @member  Zondy.Catalog.MapDoc.prototype.returnFullStyle
         * @type {Boolean}
         * @description 是否返回由DWS所返回的原始格式信息
         * @default false
         */
        this.returnFullStyle = options.returnFullStyle !== undefined ? options.returnFullStyle : false;

        /**
         * @private
         * @member  Zondy.Catalog.MapDoc.prototype.guid
         * @type {Object}
         * @description 唯一标识，用于标识地图文档
         * @default newGuid()
         */
        this.guid = options.guid !== undefined ? options.guid : newGuid();
    }

    /**
     * @function Zondy.Catalog.MapDoc.prototype.getMapDocList
     * @description  获取服务器地图文档列表。
     * v为版本信息，例如v=2。
     * 当v缺省时，只返回直接发布的地图文档列表，当v=2时，返回包含直接发布的地图文档和目录形式发布的地图文档在内的所有地图文档列表。
     * 在发布地图文档时需注意，尽量保证直接发布的地图文档与目录发布的地图文档之间不存在重名文件。
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     *var mapdoc = new Zondy.Catalog.MapDoc({
                    ip: "localhost",
                    port: "6163"
                });
     mapdoc.getMapDocList(function(res){
                    console.log(res)
                },function (error) {
                    console.log(error)
                });
     */
    getMapDocList(onSuccess, onError) {
        var me = this;
        me.partUrl = 'docs?v=' + this.version + '&f=json';
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
     * 获取指定地图文档的详细信息
     * @function Zondy.Catalog.MapDoc.prototype.getMapDocInfo
     * @param onSuccess - {Function} 成功回调函数。
     * @param details  -{Boolean} 返回结果是否包含地图详细内容。<br>
     * @param subs     -{Boolean} 返回结果是否为地图信息。<br>
     * @param onError - {Function} 失败回调函数。
     * @param returnFullStyle -{Boolean} 此参数为"真"，details，sub属性设置才能生效
     * @example
     *var mapdoc = new Zondy.Catalog.MapDoc({
                    ip: "localhost",
                    port: "6163",
                    docName: "world"
                });
     mapdoc.getMapDocInfo(function(res){
                    console.log(res)
                },false,false,function (error) {
                    console.log(error)
                },false);
     */
    getMapDocInfo(onSuccess, details, subs, onError, returnFullStyle) {
        var me = this;
        if (typeof returnFullStyle === 'boolean') {
            me.returnFullStyle = returnFullStyle;
        }
        if (typeof details === 'boolean' || typeof subs === 'boolean') {
            var includeObj = {
                includeDetails: typeof details === 'boolean' ? details : true,
                includeSubs: typeof subs === 'boolean' ? subs : false
            };
            me.include = toJSON(includeObj);
        }
        me.partUrl = 'docs/' + me.docName + '?include=' + me.include + '&returnFullStyle=' + me.returnFullStyle + '&guid=' + me.guid + '&f=json';
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
     * 获取地图文档中指定地图的相关信息
     * @function Zondy.Catalog.MapDoc.prototype.getMapInfo
     * @param onSuccess - {Function} 成功回调函数。
     * @param returnFullStyle -{Boolean} 是否返回由DWS所返回的原始格式信息。<br>
     * @param onError - {Function} 失败回调函数。
     * @example
     *var mapdoc = new Zondy.Catalog.MapDoc({
                    ip: "localhost",
                    port: "6163",
                    docName: "world"
                });
     mapdoc.getMapInfo(function(res){
                    console.log(res)
                },false,function (error) {
                    console.log(error)
                });
     */
    getMapInfo(onSuccess, returnFullStyle, onError) {
        var me = this;
        if (typeof returnFullStyle === 'boolean') {
            me.returnFullStyle = returnFullStyle;
        }
        me.partUrl = 'docs/' + me.docName + '/' + me.mapIndex + '?returnFullStyle=' + me.returnFullStyle + '&guid=' + me.guid + '&f=json';
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
     * @description 获取指定地图文档的目录树信息
     * @function Zondy.Catalog.MapDoc.prototype.getMapDocTree
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     *var mapdoc = new Zondy.Catalog.MapDoc({
                    ip: "localhost",
                    port: "6163",
                    docName: "world"
                });
     mapdoc.getMapDocTree(function(res){
                    console.log(res)
                },function (error) {
                    console.log(error)
                });
     */
    getMapDocTree(onSuccess, onError) {
        var me = this;
        me.partUrl = 'docs/' + me.docName + '?tree=true&guid=' + me.guid + '&f=json';
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
     * 获取指定地图下指定图层的相关信息
     * @function Zondy.Catalog.MapDoc.prototype.getLayerInfo
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     *var mapdoc = new Zondy.Catalog.MapDoc({
                    ip: "localhost",
                    port: "6163",
                    docName: "world",
                    layerID:0
                });
     mapdoc.getLayerInfo(function(res){
                    console.log(res)
                },function (error) {
                    console.log(error)
                });
     */
    getLayerInfo(onSuccess, onError) {
        var me = this;
        me.partUrl =
            'docs/' + me.docName + '/' + me.mapIndex + '/' + me.layerID + '?returnFullStyle=' + me.returnFullStyle + '&guid=' + me.guid + '&f=json';
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
     * 获取指定地图下所有图层的图层信息
     * @function Zondy.Catalog.MapDoc.prototype.getLayersInfo
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     *var mapdoc = new Zondy.Catalog.MapDoc({
                    ip: "localhost",
                    port: "6163",
                    docName: "world"
                });
     mapdoc.getLayersInfo(function(res){
                    console.log(res)
                },function (error) {
                    console.log(error)
                });
     */
    getLayersInfo(onSuccess, onError) {
        var me = this;
        me.partUrl = 'docs/' + me.docName + '/' + me.mapIndex + '/layers?f=json';
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
     * 删除地图图层
     * @function Zondy.Catalog.MapDoc.prototype.deleteLayer
     * @description -返回是否成功删除地图图层
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     *var mapdoc = new Zondy.Catalog.MapDoc({
                    ip: "localhost",
                    port: "6163",
                    docName: "world",
                    layerID:0
                });
     mapdoc.deleteLayer(function(res){
                    console.log(res)
                },function (error) {
                    console.log(error)
                });
     */
    deleteLayer(onSuccess, onError) {
        var me = this;
        me.partUrl = 'docs/' + me.docName + '/' + me.mapIndex + '/layers/delete?layerIDs=' + me.layerID + '&guid=' + me.guid + '&f=json';
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
     * 添加地图图层
     * @function Zondy.Catalog.MapDoc.prototype.addLayer
     * @description -返回是否成功添加地图图层。
     * @param addLayerInfos -{Array} 需要添加的图层数组。<br>
     * @param onSuccess - {Function} 成功回调函数。<br>
     * @param onError - {Function} 失败回调函数。
     * @example
     *var mapdoc = new Zondy.Catalog.MapDoc({
                    ip: "localhost",
                    port: "6163",
                    docName: "world"
                });
     var layerinfo = {
                    //图层的索引号，默认为-1表示从文档末尾附加
                    Index: -1,
                    //图层名称
                    LayerName: "NewAddLayer",
                    //图层的GDBP值
                    GDBP: "gdbp://MapGisLocal/平台基础示例数据/ds/世界地图/sfcls/中国省界_不含国界"
                };
     mapdoc.addLayer([layerinfo],function(res){
                    console.log(res)
                },function (error) {
                    console.log(error)
                });
     */
    addLayer(addLayerInfos, onSuccess, onError) {
        var me = this;
        me.partUrl = 'docs/' + me.docName + '/' + me.mapIndex + '/layers/add?guid=' + me.guid + '&f=json';
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
            data: JSON.stringify(addLayerInfos),
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
        });
    }

    /**
     * 更改图层顺序
     * @function Zondy.Catalog.MapDoc.prototype.changeIndex
     * @description -返回是否成功更改图层顺序。
     * @param newIndexArray -{Array} 新图层的序号顺序数组。<br>
     * @param onSuccess - {Function} 成功回调函数。<br>
     * @param onError - {Function} 失败回调函数。
     * @example
     *var mapdoc = new Zondy.Catalog.MapDoc({
                    ip: "localhost",
                    port: "6163",
                    docName: "world"
                });
     mapdoc.changeIndex([4, 3, 2, 1, 0],function(res){
                    console.log(res)
                },function (error) {
                    console.log(error)
                });
     */
    changeIndex(newIndexArray, onSuccess, onError) {
        var me = this;
        me.partUrl = 'docs/' + me.docName + '/' + me.mapIndex + '/layers/index?guid=' + me.guid + '&f=json';
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
            data: JSON.stringify(newIndexArray),
            header: { 'Content-Type': 'text/plain;charset=UTF-8' }
        });
    }

    /**
     * 获取指定图层图例信息
     * @function Zondy.Catalog.MapDoc.prototype.getLegendInfo
     * @description -返回指定图层图例信息对象。
     * @param layerIDs -{String} 需要获取图例信息的图层索引,如0,6。<br>
     * @param fields  -{String} 需要获取图例信息图层对应的字段,如省名,ID。<br>
     * @param onSuccess - {Function} 成功回调函数。<br>
     * @param onError - {Function} 失败回调函数。
     * @example
     *var mapdoc = new Zondy.Catalog.MapDoc({
                    ip: "localhost",
                    port: "6163",
                    docName: "world"
                });
     mapdoc.getLegendInfo([1, 0],['ID'],function(res){
                    console.log(res)
                },function (error) {
                    console.log(error)
                });
     */
    getLegendInfo(layerIDs, fields, onSuccess, onError) {
        var me = this;
        me.partUrl = 'legendInfo/' + me.docName + '?f=json&layerIndexes=' + layerIDs + '&fields=' + fields;
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
export { MapDoc };
Zondy.Catalog.MapDoc = MapDoc;
