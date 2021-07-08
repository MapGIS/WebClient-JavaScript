import {
    Zondy,extend,formatQuery
} from '../common';
import {ArcGisServiceBase} from "./ServiceBase";

/**
 * @class module:ArcGis.ArcGisFindTask
 * @description find查询对象
 * @author 基础平台-杨琨
 * @param options - {Object} 必选项，初始化FindTask参数。
 * @param {String} [option.url]  必选项，地图服务url。
 * @param {String} [option.gdbVersion]  可选项，地理服务器版本。
 */
class ArcGisFindTask{
    constructor(options){
        this.options = {
            gdbVersion: null,
            url: null
        }
        options.url = options.url + "/find?f=json";
        extend(this.options,options);
    }
}

/**
 * @function module:ArcGis.ArcGisFindTask.prototype.execute
 * @description 根据输入参数查询
 * @author 基础平台-杨琨
 * @param params - {Object} 必选项，查询参数。
 * @param {String} [params.searchText]  必选项，要查询的值，可不指定字段，在所有字段中查询。
 * @param {Boolean} [params.contains]  可选项，指定要查询的值是否大小写敏感，默认为true，查询值大小写敏感，可选值：true | false。
 * @param {Array} [params.layerIds]  必选项，要查询的图层Id数组，格式为：[layerId1,layerId2,layerId3,...]。
 * @param {Array} [params.searchFields]  可选项，要查询的字段名数组，格式为：[field1,field1,field1,...]。
 * @param {Boolean} [params.returnGeometry]  可选项，是否返回几何坐标集合，默认为true，返回几何坐标集合，可选值true | false。
 * @param {Number} [params.geometryPrecision]  可选项，指定返回的几何坐标集合的小数点位数，例如geometryPrecision=3，保留三位小数。
 * @param {Number} [params.maxAllowableOffset]  可选项，指定返回的几何坐标集合的最大偏移量，例如maxAllowableOffset=2。
 * @param {String} [params.outSpatialReference]  可选项，定义返回的几何坐标集合的空间坐标系，默认为地图坐标系。
 * @param {String} [params.gdbVersion]  可选项，定义地理数据库的版本号。
 * @example
 *          //初始化FindTask对象
            var FindTask = new Zondy.Service.ArcGisFindTask({
               url: 'http://localhost:6080/arcgis/rest/services/wuhan_2/MapServer'
            });
            //初始化FindParameters查询参数对象
            var FindParameters = new Zondy.Service.ArcGisFindParameters({
                layerIds: [0],
                searchText:'彩票销售店'
            });
            //示例一：在图层0中，进行文本查询，对所有字段进行查询
            FindTask.execute(FindParameters).then(function (data) {
                console.log("查询成功")
                console.log(data)
            });
            //示例二：在图层0和1中，对指定字段Name进行查询
            var FindParameters = new Zondy.Service.ArcGisFindParameters({
                layerIds: [0,1],
                searchText:'滠口街道',
                searchFields:['Name'],
            });
            FindTask.execute(FindParameters).then(function (data) {
                console.log("查询成功")
                console.log(JSON.parse(data))
            });
 */
ArcGisFindTask.prototype.execute = function (params) {
    let url = this.options.url,formatObj = {
        layerIds:"layers",
        outSpatialReference:"sr"
    },service = new ArcGisServiceBase();
    url = formatQuery(params,url,null,formatObj);
    return service.getPromise(url);
}

export {ArcGisFindTask};
Zondy.Service.ArcGisFindTask = ArcGisFindTask;