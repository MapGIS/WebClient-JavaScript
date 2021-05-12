import { CatalogService } from './CatalogService';
import { IgsServiceBase } from '../../baseserver/IServiceBase';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:目录服务.SystomInfo
 * @classdesc 瓦片图层类
 * @description Zondy.Catalog.SystomInfo
 * @extends  Zondy.Catalog.CatalogService
 * @param option - {Object} 属性键值对。<br>
 * @param {String} [option.f=json] 回结果的格式,缺省xml(json / xml),base64_geometry:返回单个三维几何信息的流，并转为base64
 * @param {String} [option.guid=newGuid()] 唯一id，可缺省
 * @param {Number} [option.page=0] 返回的要素分页的页数，默认返回第0页
 * @param {Number} [option.pageCount=20] 要素结果集每页的记录数量，默认为20条/页
 * @param {String} [option.systemLib=null] 系统库名称或者guid
 * @param {String} [option.type=null] 类型SymbolGeomType(GeomEnt3D,GeomLin,GeomPnt,GeomReg,GeomSur3D,Unknown)
 */
class SystomInfo extends CatalogService {
    constructor(option) {
        var options = option || {};
        super(options);
        /**
         * @private
         * @member Zondy.Catalog.SystomInfo.prototype.f
         * @type {String}
         * @description 回结果的格式,缺省xml(json / xml),base64_geometry:返回单个三维几何信息的流，并转为base64
         * @default json
         */
        this.f = options.f || 'json';

        /**
         * @private
         * @member  Zondy.Catalog.SystomInfo.prototype.page
         * @type {Number}
         * @description 返回的要素分页的页数，默认返回第0页
         * @default 0
         */
        this.page = options.page || 0;

        /**
         * @private
         * @member  Zondy.Catalog.SystomInfo.prototype.pageCount
         * @type {Number}
         * @description 要素结果集每页的记录数量，默认为20条/页
         * @default 20
         */
        this.pageCount = options.pageCount || 20;

        /**
         * @private
         * @member Zondy.Catalog.SystomInfo.prototype.systemLib
         * @type {String}
         * @description 系统库guid或者名称
         * @default null
         */
        this.systemLib = options.systemLib || null;

        /**
         * @private
         * @member Zondy.Catalog.SystomInfo.prototype.type
         * @type {String}
         * @description 类型SymbolGeomType(GeomEnt3D,GeomLin,GeomPnt,GeomReg,GeomSur3D,Unknown)
         * @default null
         */
        this.type = options.type || null;
    }

    /**
     * @function Zondy.Catalog.SystomInfo.prototype.GetSystemLibrary
     * @description 获取系统库列表
     * @param option - {Object} 属性键值对。<br>
     * @param {String} [option.f=json] 回结果的格式,缺省xml(json / xml),base64_geometry:返回单个三维几何信息的流，并转为base64
     * @constructor
     * @example
     * var systomInfo = new Zondy.Catalog.SystomInfo({
                ip: "192.168.176.40",
                port: "6163"
            });
     systomInfo.GetSystemLibrary(function(res){
                console.log('GetSystemLibrary');
                console.log(res)
            },false,false,function (error) {
                console.log(error)
            },false);
     */
    GetSystemLibrary(onSuccess, onError) {
        var me = this;
        me.partUrl = 'systemlibraries?f=' + me.f;
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
     * @function Zondy.Catalog.SystomInfo.prototype.GetSystemLibrary
     * @description 获取符号
     * @param option - {Object} 属性键值对。<br>
     * @param {String} [option.systemLib=null]【必选】系统库名称或者guid
     * @param {String} [option.type=null]【必选】类型SymbolGeomType(GeomEnt3D,GeomLin,GeomPnt,GeomReg,GeomSur3D,Unknown)
     * @param {String} [option.f=json] 回结果的格式,缺省xml(json / xml),base64_geometry:返回单个三维几何信息的流，并转为base64
     * @param {String} [option.guid=newGuid()] 唯一id，可缺省
     * @param {Number} [option.page=0] 返回的要素分页的页数，默认返回第0页
     * @param {Number} [option.pageCount=20] 要素结果集每页的记录数量，默认为20条/页
     * @example
     * var systomInfo = new Zondy.Catalog.SystomInfo({
                ip: "192.168.176.40",
                port: "6163",
                systemLib:"eaeed6b9-b978-4cba-92df-70aad998da5d",
                type:"GeomReg"
            });
     systomInfo.GetSymbol(function(res){
                console.log('GetSymbol');
                console.log(res)
            },false,false,function (error) {
                console.log(error)
            },false);
     */
    GetSymbol(onSuccess, onError) {
        var me = this;
        var str = 'symbols?&systemLib=' + me.systemLib + '&type=' + me.type;
        if (me.f) {
            str += '&f=' + me.f;
        }
        if (me.page) {
            str += '&page=' + me.page;
        }
        if (me.size) {
            str += '&size=' + me.pageCount;
        }
        me.partUrl = str;
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

export { SystomInfo };
Zondy.Catalog.SystomInfo = SystomInfo;
