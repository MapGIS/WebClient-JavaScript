import { Zondy } from '../common/Base';
import { QueryServiceBase } from './QueryServiceBase';
import { ObjClsQueryParameter } from './ObjClsQueryParameter';
import { IgsServiceBase } from '../baseserver/IServiceBase';
/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:要素服务.ObjClsQuery
 * @classdesc 注记查询类
 * @description Zondy.Service.ObjClsQuery
 * @extends Zondy.Service.QueryServiceBase
 * @param queryParam -{Zondy.Service.ObjClsQueryParameter} 对象类查询的参数类。
 * @param gdbp -{String} 对象类的GDBP地址。<br>
 * @param option - {Object} 属性键值对。<br>
 * @param {Zondy.Object.QueryByLayerParameter} [option.queryParam = null] 查询参数信息
 */
class ObjClsQuery extends QueryServiceBase {
    constructor(queryParam, gdbp, option) {
        var options = option ? option : {};
        super(options);
        /**
         * @private
         * @member Zondy.Service.ObjClsQuery.prototype.queryParam
         * @type {Zondy.Object.QueryByLayerParameter}
         * @description 查询参数信息
         */
        this.queryParam = queryParam;
        /**
         * @private
         * @member Zondy.Service.ObjClsQuery.prototype.gdbp
         * @type {String}
         * @description 图层URL
         */
        this.gdbp = gdbp;
        /**
         * @private
         * @member Zondy.Service.ObjClsQuery.prototype.baseUrl
         * @type {String}
         * @description 基类地址
         */
        this.baseUrl = 'igs/rest/extend/dxlcz';
        /**
         * @private
         * @member Zondy.Service.ObjClsQuery.prototype.partUrl
         * @type {String}
         * @description 查询参数地址
         */
        this.partUrl = 'objlayer/query?gdbp=' + gdbp;
        this.partUrl += queryParam.getParameterURL();
    }

    /**
     * @description 查询函数，向服务器发送请求
     * @function Zondy.Service.ObjClsQuery.prototype.query
     * @param onSuccess - {Function} 查询成功回调函数。
     * @param onError - {Function} 查询失败回调函数。
     * @example
     //初始化查询结构对象，设置查询结构包含几何信息
     var queryStruct = new Zondy.Service.QueryFeatureStruct();
     //是否包含几何信息
     queryStruct.IncludeGeometry = true;
     //实例化查询参数对象
     var queryParam = new Zondy.Service.ObjClsQueryParameter({
                //设置查询条件
                objectIds: 3,
                where: "username = 'liu'",
                //设置结果返回类型
                resultFormat: "json",
                //设置查询结构
                struct: queryStruct
            });
     //实例化地图文档查询服务对象
     var queryService = new Zondy.Service.ObjClsQuery(queryParam, "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/ocls/user,gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/ocls/user2", {
                //IP地址
                ip: "develop.smaryun.com",
                //端口号
                port: "6163"
            });
     queryService.query(function (res) {
                        console.log(res);
                    }, function (error) {
                        console.log(error);
                    });
     */
    query(onSuccess, onError) {
        if (this.queryParam === null || !(this.queryParam instanceof ObjClsQueryParameter)) {
            return;
        }
        var me = this;
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
export { ObjClsQuery };
Zondy.Service.ObjClsQuery = ObjClsQuery;
