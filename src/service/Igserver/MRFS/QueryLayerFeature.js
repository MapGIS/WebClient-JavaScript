import { Zondy } from '../../common/Base';
import { QueryServiceBase } from './QueryServiceBase';
/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:要素服务.QueryLayerFeature
 * @classdesc 矢量图层要素查询类
 * @description Zondy.Service.QueryLayerFeature
 * @extends  Zondy.Service.QueryServiceBase
 * @param queryParam -{Zondy.Object.QueryByLayerParameter} 查询参数信息。
 * @param option - {Object} 属性键值对。<br>
 * @param {Zondy.Object.QueryByLayerParameter} [option.queryParam = null] 查询参数信息
 * @example
 //创建查询结构对象
 var queryStruct = new Zondy.Service.QueryFeatureStruct();
 //是否包含几何图形信息
 queryStruct.IncludeGeometry = true;
 //创建一个用于查询的矩形
 var geomObj = new Zondy.Object.Rectangle(93, 35, 111, 56);
 //指定查询规则
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
 var queryParam = new Zondy.Service.QueryByLayerParameter("gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区", {
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
 var queryService = new Zondy.Service.QueryLayerFeature(queryParam, {
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
class QueryLayerFeature extends QueryServiceBase {
    constructor(queryParam, option) {
        var options = option ? option : {};
        super(options);
        /**
         * @private
         * @member Zondy.Service.QueryLayerFeature.prototype.queryParam
         * @type {Zondy.Object.QueryByLayerParameter}
         * @description  查询参数信息
         */
        this.queryParam = queryParam;

        /**
         * @private
         * @member Zondy.Service.QueryLayerFeature.prototype.partUrl
         * @type {String}
         * @description  查询参数地址
         */
        this.partUrl = 'layer/query';
    }
}
export { QueryLayerFeature };
Zondy.Service.QueryLayerFeature = QueryLayerFeature;
