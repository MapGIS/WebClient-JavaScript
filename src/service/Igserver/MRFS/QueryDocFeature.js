import {Zondy} from '../../common/Base';
import {QueryServiceBase}  from  "./QueryServiceBase";
/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:要素服务.QueryDocFeature
 * @classdesc 要素文档查询类
 * @description Zondy.Service.QueryDocFeature
 * @extends  Zondy.Service.QueryServiceBase
 * @param queryParam - {Zondy.Service.QueryParameter} 查询参数信息。
 * @param docName - {String} 地图文档名称。
 * @param layerIndex -{String} 图层索引号。<br>
 * @param option - {Object} 属性键值对。<br>
 * @param {Zondy.Object.QueryByLayerParameter} [option.queryParam = null] 查询参数信息
 * @example
 var queryStruct = new Zondy.Service.QueryFeatureStruct();
 //是否包含几何图形信息
 queryStruct.IncludeGeometry = true;
 //是否包含属性信息
 queryStruct.IncludeAttribute = true;
 //是否包含图形显示参数
 queryStruct.IncludeWebGraphic = false;
 //创建一个用于查询的矩形
 var geomObj = new Zondy.Object.Rectangle(93, 35, 111, 56);
 //制定查询规则
 var rule = new Zondy.Service.QueryFeatureRule({
                 //是否将要素的可见性计算在内
                 EnableDisplayCondition: false,
                 //是否完全包含
                 MustInside: false,
                 //是否仅比较要素的外包矩形
                 CompareRectOnly: false,
                 //是否相交
                 Intersect: true
             });
 //实例化查询参数对象
 var queryParam = new Zondy.Service.QueryParameter({
                 //几何对象
                 geometry: geomObj,
                 //结果格式
                 resultFormat: "json",
                 //查询结构
                 struct: queryStruct,
                 //查询规则
                 rule: rule
             });
 //设置查询分页号
 queryParam.pageIndex = 0;
 //设置查询要素数目
 queryParam.recordNumber = 20;
 //实例化地图文档查询服务对象
 var queryService = new Zondy.Service.QueryDocFeature(queryParam, "WorldJWVector", 1, {
                 //IP地址
                 ip: "develop.smaryun.com",
                 //端口号
                 port: "6163"
             });
 //执行查询操作，querySuccess为成功回调，queryError为失败回调
 queryService.query(function (res) {
                        console.log(res);
                    }, function (error) {
                        console.log(error);
                    });
 */
class QueryDocFeature extends QueryServiceBase {
    constructor(queryParam, docName, layerIndex, option) {
        var options = option ? option : {};
        super(options);
        /**
         * @member Zondy.Service.QueryDocFeature.prototype.queryParam
         * @type {Zondy.Object.QueryByLayerParameter}
         * @description 查询参数信息
         */
        this.queryParam = queryParam;

        /**
         * @member Zondy.Service.QueryDocFeature.prototype.docName
         * @type {String}
         * @description 文档名称
         */
        this.docName = docName;

        /**
         * @member Zondy.Service.QueryDocFeature.prototype.layerIndex
         * @type {Number}
         * @description 图层索引
         */
        this.layerIndex = layerIndex == undefined ? -1 : layerIndex;

        /**
         * @member Zondy.Service.QueryDocFeature.prototype.mapIndex
         * @type {Number}
         * @description 地图索引
         */
        this.mapIndex = 0;

        /**
         * @member Zondy.Service.QueryDocFeature.prototype.partUrl
         * @type {String}
         * @description 查询参数地址
         */
        this.partUrl = "docs/" + this.docName + "/" + this.mapIndex.toString() + "/" + this.layerIndex.toString() + "/query";
    }
}
export {QueryDocFeature};
Zondy.Service.QueryDocFeature = QueryDocFeature;