import {Zondy} from '../common/Base';
import {QueryServiceBase}  from  "./QueryServiceBase";
import {MultiGeoQueryParameter}  from  "./MultiGeoQueryParameter";
import {IgsServiceBase}  from  "../baseserver/IServiceBase";
/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:要素服务.MultiGeoQuery
 * @classdesc Zondy.Service.MultiGeoQuery 多几何查询类
 * @extends  Zondy.Service.QueryServiceBase
 * @param queryParam  -{Zondy.Object.QueryByLayerParameter} 查询参数信息。
 * @param docName  - {String} 文档名称。
 * @param layerIndex  -{Number} 图层序号。
 * @param option - {Object} 属性键值对。
 */
class MultiGeoQuery extends QueryServiceBase {

    constructor(queryParam, docName, layerIndex, option) {
        var options = option ? option : {};
        super(options);
        /**
         * @private
         * @member Zondy.Service.MultiGeoQuery.prototype.queryParam{Zondy.Object.QueryByLayerParameter}
         * @type {String}
         * @description 查询参数信息
         */
        this.queryParam = queryParam;

        /**
         * @private
         * @member Zondy.Service.MultiGeoQuery.prototype.mapName
         * @type {String}
         * @description  地图名称
         */
        this.mapName = docName;

        /**
         * @private
         * @member Zondy.Service.MultiGeoQuery.prototype.mapIndex
         * @type {Number}
         * @description  地图索引
         */
        this.mapIndex = 0;

        /**
         * @private
         * @member Zondy.Service.MultiGeoQuery.prototype.layerIndex
         * @type {Number}
         * @description  图层索引
         */
        this.layerIndex = layerIndex;

        /**
         * @private
         * @member Zondy.Service.MultiGeoQuery.prototype.baseUrl
         * @type {String}
         * @description  基类地址
         */
        this.baseUrl = "igs/rest/extend/MultiGeo";

        /**
         * @private
         * @member Zondy.Service.MultiGeoQuery.prototype.partUrl
         * @type {String}
         * @description 查询参数地址
         */
        this.partUrl = "docs/" + this.mapName + "/" + this.mapIndex.toString() + "/" + this.layerIndex + "/Geoquery";
        this.partUrl += queryParam.getParameterURL();
    }

    /**
     * @description 查询函数，向服务器发送请求
     * @function Zondy.Service.MultiGeoQuery.prototype.query
     * @param onSuccess - {Function} 查询成功回调函数。
     * @param onError - {Function}  查询失败回调函数。
     * @example
     //初始化查询结构对象，设置查询结构包含几何信息
     var queryStruct = new Zondy.Service.QueryFeatureStruct();
     //是否包含几何信息
     queryStruct.IncludeGeometry = true;
     //创建两个用于查询的矩形数组
     var pointObj = new Array();
     pointObj[0] = new Zondy.Object.Point2D(116.4375, 41.53125);
     pointObj[1] = new Zondy.Object.Point2D(114.6875, 39.08125);
     pointObj[2] = new Zondy.Object.Point2D(118.1875, 39.34375);
     pointObj[3] = new Zondy.Object.Point2D(116.4375, 41.53125);
     var geomObj1 = new Zondy.Object.Polygon(pointObj);
     var pointObj2 = new Array();
     pointObj2[0] = new Zondy.Object.Point2D(105.5875, 48.70625);
     pointObj2[1] = new Zondy.Object.Point2D(106.1125, 46.86875);
     pointObj2[2] = new Zondy.Object.Point2D(108.3875, 48.44375);
     pointObj2[3] = new Zondy.Object.Point2D(105.5875, 48.70625);
     var geomObj2 = new Zondy.Object.Polygon(pointObj2);
     //实例化查询参数对象
     var queryParam = new Zondy.Service.MultiGeoQueryParameter({
                        //设置查询几何对象
                        geometry: [geomObj1, geomObj2],
                        //设置查询几何类型
                        geometryType: "polygon",
                        //设置结果返回类型
                        resultFormat: "json",
                        //设置查询结构对象
                        struct: queryStruct
                    });
     //实例化地图文档查询服务对象
     var queryService = new Zondy.Service.MultiGeoQuery(queryParam, "WorldJWVector", 1, {
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
        if (this.queryParam === null || !(this.queryParam instanceof MultiGeoQueryParameter)) {
            return;
        }
        var dataObj = null;
        if (this.queryParam.geometryType === "point") {
            dataObj = {pointArr: this.queryParam.geometry};
        }
        else if (this.queryParam.geometryType === "line") {
            dataObj = {lineArr: this.queryParam.geometry};
        }
        else if (this.queryParam.geometryType === "polygon") {
            dataObj = {PolygonObjs: this.queryParam.geometry};
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
        service.processAsync({
            method: 'POST',
            data: JSON.stringify(dataObj),
            headers: {'Content-Type': 'text/plain;charset=UTF-8'}
        });
    }
}
export {MultiGeoQuery};
Zondy.Service.MultiGeoQuery = MultiGeoQuery;