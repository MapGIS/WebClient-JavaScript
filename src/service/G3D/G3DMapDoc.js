import {Zondy} from "../common/Base";
import {newGuid} from "../common/Util";
import {G3DService} from "./G3DService";
import {IgsServiceBase} from "../baseserver/IServiceBase";

/**
 * @author 基础平台/产品2部 龚跃健
 * @class Zondy.Catalog.G3DMapDoc
 * @classdesc  三维地图文档类
 * @extends Zondy.Catalog.G3DService
 * @param option - {Object} 属性键值对，地图属性字段。<br>
 * @param {String} [option.docName = null] 三维服务名称
 * @param {String} [option.gdbp =null] 图层的gdbp地址，多个图层用逗号分隔,使用该属性则地图服务名称失效
 * @param {String} [option.proj =null] 坐标系参数，输出的图层信息里的坐标为设置坐标系下对应的坐标，不设置则输出图层默认坐标系下的坐标。示例：设置proj='WGS1984_度'，输出图层信息中坐标为 WGS1984_度 坐标
 * @param {String} [option.f=json] 回结果的格式,缺省xml(json / xml),base64_geometry:返回单个三维几何信息的流，并转为base64
 * @param {String} [option.guid=newGuid()] 唯一id，可缺省
 * @param {String} [option.encryptPassword=null] 服务密码
 * @param {String} [option.layerindex = 0] 要查询的图层索引(多个请用','分隔)
 * @param {String} [option.geometryType=null] 几何类型（point3D,rect3D等）
 * @param {Object} [option.geometry=null] 几何类型的图形参数，现在只支持点x,y,z,distance
 * @param {String} [option.where=null] 查询条件（例如：id = 12）
 * @param {Object} [option.structs] 指定查询结果的结构，json规范（例如：structs={ IncludeAttribute:true | false, IncludeGeometry:true | false, IncludeWebGraphic :true |false}）
 * @param {Number} [option.page=0] 返回的要素分页的页数，默认返回第0页
 * @param {Number} [option.pageCount=20] 要素结果集每页的记录数量，默认为20条/页
 * @param {String} [option.objectIds=null] 要查询的要素oid(多个请用','分隔)
 * @param {String} [option.orderField=null] 排序字段名称
 * @param {Boolean} [option.rtnLabel=false] 是否计算Label点
 * @param {Boolean} [option.isAsc=false] 按照字段进行排列时，是否升序排列
 * @param {String} [option.format=json] 回结果的格式,缺省xml(json / xml)
 * @param {String} [option.systemLib=null] 系统库名称或者guid
 * @param {String} [option.layerRenderIndex=0] 图层layerRenderIndex
 */
class G3DMapDoc extends G3DService {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member  Zondy.Catalog.G3DMapDoc.prototype.docName
         * @type {String}
         * @description 三维服务名称
         * @default null
         */
        this.docName = options.docName || null;

        /**
         * @private
         * @member  Zondy.Catalog.G3DMapDoc.prototype.gdbp
         * @type {String}
         * @description 图层的gdbp地址，多个图层用逗号分隔,使用该属性则地图服务名称失效
         * @default null
         */
        this.gdbp = options.gdbp || null;

        /**
         * @private
         * @member  Zondy.Catalog.G3DMapDoc.prototype.proj
         * @type {String}
         * @description 坐标系参数，输出的图层信息里的坐标为设置坐标系下对应的坐标，不设置则输出图层默认坐标系下的坐标。示例：设置proj='WGS1984_度'，输出图层信息中坐标为 WGS1984_度 坐标
         * @default null
         */
        this.proj = options.proj || null;

        /**
         * @private
         * @member Zondy.Catalog.G3DMapDoc.prototype.f
         * @type {String}
         * @description 回结果的格式,缺省xml(json / xml),base64_geometry:返回单个三维几何信息的流，并转为base64
         * @default json
         */
        this.f = options.f || 'json';

        /**
         * @private
         * @member  Zondy.Catalog.G3DMapDoc.prototype.guid
         * @type {Object}
         * @description 唯一标识，用于标识地图文档
         * @default newGuid()
         */
        this.guid = options.guid !== undefined ? options.guid : newGuid();

        /**
         * @private
         * @member  Zondy.Catalog.G3DMapDoc.prototype.encryptPassword
         * @type {String}
         * @description 服务密码
         * @default null
         */
        this.encryptPassword = options.encryptPassword || null;

        /**
         * @private
         * @member  Zondy.Catalog.G3DMapDoc.prototype.layerindex
         * @type {String}
         * @description 要查询的图层索引(多个请用','分隔)
         * @default 0
         */
        this.layerindex = options.layerindex || 0;

        /**
         * @private
         * @member  Zondy.Catalog.G3DMapDoc.prototype.geometryType
         * @type {String}
         * @description 几何类型（point3D,rect3D等）
         * @default null
         */
        this.geometryType = options.geometryType || null;

        /**
         * @private
         * @member  Zondy.Catalog.G3DMapDoc.prototype.geometry
         * @type {Object}
         * @description 几何类型的图形参数，现在只支持点x,y,z,distance
         * @default null
         */
        this.geometry = options.geometry || null;

        /**
         * @private
         * @member  Zondy.Catalog.G3DMapDoc.prototype.where
         * @type {String}
         * @description 查询条件（例如：id = 12）
         * @default null
         */
        this.where = options.where || null;

        /**
         * @private
         * @member  Zondy.Catalog.G3DMapDoc.prototype.structs
         * @type {Object}
         * @description 指定查询结果的结构，json规范（例如：structs={ IncludeAttribute:true | false, IncludeGeometry:true | false, IncludeWebGraphic :true |false}）
         * @default null
         */
        this.structs = options.structs || {
            IncludeAttribute: true,
            IncludeGeometry: false,
            IncludeWebGraphic: false
        };

        /**
         * @private
         * @member  Zondy.Catalog.G3DMapDoc.prototype.page
         * @type {Number}
         * @description 返回的要素分页的页数，默认返回第0页
         * @default 0
         */
        this.page = options.page || 0;

        /**
         * @private
         * @member  Zondy.Catalog.G3DMapDoc.prototype.pageCount
         * @type {Number}
         * @description 要素结果集每页的记录数量，默认为20条/页
         * @default 20
         */
        this.pageCount = options.pageCount || 20;

        /**
         * @private
         * @member Zondy.Catalog.G3DMapDoc.prototype.objectIds
         * @type {Number}
         * @description 要查询的要素oid(多个请用','分隔)
         * @default null
         */
        this.objectIds = options.objectIds || null;

        /**
         * @private
         * @member Zondy.Catalog.G3DMapDoc.prototype.orderField
         * @type {Number}
         * @description 排序字段名称
         * @default null
         */
        this.orderField = options.orderField || null;

        /**
         * @private
         * @member Zondy.Catalog.G3DMapDoc.prototype.rtnLabel
         * @type {Boolean}
         * @description 是否计算Label点
         * @default false
         */
        this.rtnLabel = options.rtnLabel === undefined ? false : options.rtnLabel;

        /**
         * @private
         * @member Zondy.Catalog.G3DMapDoc.prototype.isAsc
         * @type {Boolean}
         * @description 是否计算Label点
         * @default false
         */
        this.isAsc = options.isAsc === undefined ? false : options.isAsc;

        /**
         * @private
         * @member Zondy.Catalog.G3DMapDoc.prototype.format
         * @type {String}
         * @description 回结果的格式,缺省xml(json / xml)
         * @default json
         */
        this.format = options.format || 'json';

        /**
         * @private
         * @member Zondy.Catalog.G3DMapDoc.prototype.systemLib
         * @type {String}
         * @description 系统库guid或者名称
         * @default null
         */
        this.systemLib = options.systemLib || null;

        /**
         * @private
         * @member Zondy.Catalog.G3DMapDoc.prototype.layerRenderIndex
         * @type {String}
         * @description 图层的layerRenderIndex
         * @default null
         */
        this.layerRenderIndex = options.layerRenderIndex || 0;
    }

    /**
     * @function Zondy.Catalog.G3DMapDoc.prototype.GetDocList
     * @description  获取服务器三维地图文档列表。
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     *var mapdoc = new Zondy.Catalog.G3DMapDoc({
                ip: "192.168.176.40",
                port: "6163"
            });
     mapdoc.GetDocList(function(res){
                console.log('GetDocList');
                console.log(res)
            },function (error) {
                console.log(error)
            });
     */
    GetDocList(onSuccess, onError) {
        var me = this;
        me.partUrl = "GetDocList";
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
     * 获取指定三维地图文档的详细信息
     * @function Zondy.Catalog.G3DMapDoc.prototype.GetDocInfo
     * @param option - {Object} 属性键值对，地图属性字段。<br>
     * @param {String} [option.docName = null] 【必选】三维服务名称
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     * var mapdoc = new Zondy.Catalog.G3DMapDoc({
                ip: "192.168.176.40",
                port: "6163",
                docName: "shenzhenZT"
            });
     mapdoc.GetDocInfo(function(res){
                console.log('GetDocInfo');
                console.log(res)
            },false,false,function (error) {
                console.log(error)
            },false);
     */
    GetDocInfo(onSuccess, onError) {
        var me = this;
        me.partUrl = me.docName + "/GetDocInfo?&f=json";
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
     * 获取指定三维地图文档图层的详细信息
     * @function Zondy.Catalog.G3DMapDoc.prototype.GetLayerInfo
     * @param option - {Object} 属性键值对，地图属性字段。<br>
     * @param {String} [option.gdbp =null]【必选】图层的gdbp地址，多个图层用逗号分隔,使用该属性则地图服务名称失效
     * @param {String} [option.proj =null] 坐标系参数，输出的图层信息里的坐标为设置坐标系下对应的坐标，不设置则输出图层默认坐标系下的坐标。示例：设置proj='WGS1984_度'，输出图层信息中坐标为 WGS1984_度 坐标
     * @param {String} [option.f=json] 回结果的格式,缺省xml(json / xml),base64_geometry:返回单个三维几何信息的流，并转为base64
     * @param {String} [option.guid=newGuid()] 唯一id，可缺省
     * @param {String} [option.encryptPassword=null] 服务密码
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     *var mapdoc = new Zondy.Catalog.G3DMapDoc({
                ip: "192.168.176.40",
                port: "6163",
                gdbp: "GDBP://MapGisLocal/深圳数据库/sfcls/深圳南山"
            });
     mapdoc.GetLayerInfo(function(res){
                console.log('GetLayerInfo');
                console.log(res)
            },false,false,function (error) {
                console.log(error)
            },false);
     */
    GetLayerInfo(onSuccess, onError) {
        var me = this;
        var str = "layerinfo?gdbp=" + this.gdbp;
        if (me.proj) {
            str += "&proj=" + me.proj;
        }
        if (me.f) {
            str += "&f=" + me.f;
        }
        if (me.guid) {
            str += "&guid=" + me.guid;
        }
        if (me.encryptPassword) {
            str += "&encryptPassword=" + me.encryptPassword;
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

    /**
     * @function Zondy.Catalog.G3DMapDoc.prototype.GetFeature
     * @description 查询三维服务中要素类图层的属性信息
     * @param option - {Object} 属性键值对，地图属性字段。<br>
     * @param {String} [option.gdbp =null]【gdbp和（docName，layerindex）二选一】图层的gdbp地址，多个图层用逗号分隔,使用该属性则地图服务名称失效
     * @param {String} [option.docName = null]【gdbp和（docName，layerindex）二选一】三维服务名称
     * @param {String} [option.layerindex = 0]【gdbp和（docName，layerindex）二选一】要查询的图层索引(多个请用','分隔)
     * @param {String} [option.geometryType=null] 几何类型（point3D,rect3D等）
     * @param {Object} [option.geometry=null] 几何类型的图形参数，现在只支持点x,y,z,distance
     * @param {String} [option.where=null] 查询条件（例如：id = 12）
     * @param {Object} [option.structs] 指定查询结果的结构，json规范（例如：structs={ IncludeAttribute:true | false, IncludeGeometry:true | false, IncludeWebGraphic :true |false}）
     * @param {Number} [option.page=0] 返回的要素分页的页数，默认返回第0页
     * @param {Number} [option.pageCount=20] 要素结果集每页的记录数量，默认为20条/页
     * @param {String} [option.objectIds=null] 要查询的要素oid(多个请用','分隔)
     * @param {String} [option.orderField=null] 排序字段名称
     * @param {Boolean} [option.rtnLabel=false] 是否计算Label点
     * @param {Boolean} [option.isAsc=false] 按照字段进行排列时，是否升序排列
     * @param {String} [option.format=json] 回结果的格式,缺省xml(json / xml)
     * @constructor
     * @example
     *var mapdoc = new Zondy.Catalog.G3DMapDoc({
                ip: "192.168.176.40",
                port: "6163",
                //gdbp: "GDBP://MapGisLocal/深圳数据库/sfcls/深圳南山",
                docName: "shenzhenZT",
                layerindex:2
            });
     mapdoc.GetFeature(function(res){
                console.log('GetFeature');
                console.log(res)
            },false,false,function (error) {
                console.log(error)
            },false);
     */
    GetFeature(onSuccess, onError) {
        var me = this;
        var str = "getFeature?";
        if (me.gdbp && me.gdbp !== '') {
            str += "gdbp=" + me.gdbp;
        } else if (me.docName) {
            str += "docName=" + me.docName + "&layerindex=" + me.layerindex;
        }


        if (me.geometryType) {
            str += "&geometryType=" + me.geometryType;
        }

        if (me.geometry) {
            str += "&geometry=" + me.geometry;
        }

        if (me.where) {
            str += "&where=" + me.where;
        }

        if (me.structs) {
            str += "&structs=" + JSON.stringify(me.structs);
        }

        if (me.page) {
            str += "&page=" + me.page;
        }

        if (me.pageCount) {
            str += "&pageCount=" + me.pageCount;
        }

        if (me.objectIds) {
            str += "&objectIds=" + me.objectIds;
        }

        if (me.orderField) {
            str += "&orderField=" + me.orderField;
        }

        if (me.rtnLabel) {
            str += "&rtnLabel=" + me.rtnLabel;
        }

        if (me.isAsc) {
            str += "&isAsc=" + me.isAsc;
        }

        if (me.guid) {
            str += "&guid=" + me.guid;
        }

        if (me.format) {
            str += "&format=" + me.format;
        }

        if (me.f) {
            str += "&f=" + me.f;
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


    /**
     * @function Zondy.Catalog.G3DMapDoc.prototype.SetSystemLibraryByDoc
     * @description 设置三维文档下图层系统库接口
     * @param option - {Object} 属性键值对，地图属性字段。<br>
     * @param {String} [option.docName = null]【必选】 三维服务名称
     * @param {String} [option.systemLib=null]【必选】 系统库名称或者guid
     * @param {String} [option.layerRenderIndex=null]【必选】 图层layerRenderIndex
     * @param {String} [option.f=json] 回结果的格式,缺省xml(json / xml),base64_geometry:返回单个三维几何信息的流，并转为base64
     * @param {String} [option.guid=newGuid()] 唯一id，可缺省
     * @example
     * var mapdoc = new Zondy.Catalog.G3DMapDoc({
                ip: "192.168.176.40",
                port: "6163",
                docName: "shenzhenZT",
                systemLib:"9cbd5f3b-3d69-46aa-8a6d-af8d0f9f621b",
                layerRenderIndex:2
            });
     mapdoc.SetSystemLibraryByDoc(function(res){
                console.log('SetSystemLibraryByDoc');
                console.log(res)
            },false,false,function (error) {
                console.log(error)
            },false);
     */
    SetSystemLibraryByDoc(onSuccess, onError) {
        var me = this;
        var str = me.docName + "/setSystemLibrary?systemLib=" + me.systemLib + "&layerRenderIndex=" + me.layerRenderIndex;

        if (me.f) {
            str += "&f=" + me.f;
        }
        if (me.guid) {
            str += "&guid=" + me.guid;
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

export {G3DMapDoc};
Zondy.Catalog.G3DMapDoc = G3DMapDoc;