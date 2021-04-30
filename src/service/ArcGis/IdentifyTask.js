import {
    Zondy,extend,formatQuery
} from '../common';
import {ArcGisServiceBase} from "./ServiceBase";

/**
 * @class module:ArcGis.ArcGisIdentifyTask
 * @description Identify查询对象
 * @author 基础平台-杨琨
 * @param options - {Object} 必选项，初始化IdentifyTask参数。
 * @param {String} [option.url]  必选项，地图服务url。
 * @param {String} [option.gdbVersion]  可选项，地理服务器版本。
 */
class ArcGisIdentifyTask {
    constructor(options) {
        this.options = {
            gdbVersion: null,
            url: null
        }
        options.url = options.url + "/identify?f=json";
        extend(this.options,options);
    }
}

/**
 * @function module:ArcGis.ArcGisIdentifyTask.prototype.execute
 * @description 根据几何对象查询
 * @author 基础平台-杨琨
 * @param params - {Object} 必选项，查询参数。
 * @param requestOptions - {String} ke选项，查询参数。
 * @param {Geometry} [params.geometry]  必选项，几何查询条件。
 * @param {Number} [params.tolerance]  可选项，公差。
 * @param {String} [params.mapExtent]  必选项，地图范围，形式为mapExtent:“114.106,30.434,114.491,30.724”。
 * @param {Number} [params.width]  必选项，地图容器的的宽度。
 * @param {Number} [params.height]  必选项，地图容器的高度。
 * @param {Number} [params.dpi]  可选项，dpi值，默认为96。
 * @param {Array} [params.layerIds]  可选项，指定选择那些图层。
 * @param {String} [params.layerOption]  可选项，图层展示方式。
 * @param {Number} [params.geometryPrecision]  可选项，指定返回的几何对象的小数点位数。
 * @param {Number} [params.maxAllowableOffset]  可选项，最大偏移量。
 * @param {Boolean} [params.returnFieldName]  可选项，是否返回别名还是字段名。
 * @param {Boolean} [params.returnGeometry]  可选项，是否返回别几何坐标集合。
 * @param {Boolean} [params.returnM]  可选项，是否返回M值。
 * @param {Boolean} [params.returnUnformattedValues]  可选项，是否返回值是否格式化。
 * @param {Boolean} [params.returnZ]  可选项，是否返回Z值。
 * @param {String} [params.spatialReference]  可选项，指定空间坐标系。
 */
ArcGisIdentifyTask.prototype.execute = function (params, requestOptions) {
    let url = this.options.url,
        formatObj = {
            outSpatialReference:"sr"
        },
        service = new ArcGisServiceBase();
    let trueParams = {};
    let type = params['geometry'].type;
    let firstChar = type.substr(0,1).toUpperCase();
    let lastCher = type.substr(1,type.length);
    params['geometryType'] = "esriGeometry" + firstChar + lastCher;
    params['geometry'] = params['geometry'].toGeometryJSON();
    if(!trueParams['layers']){
        trueParams['layers'] = params['layerIds'] ? params['layerOption'] + ":" + String(params['layerIds']) : "layers=" + params['layerOption'];
        delete params['layerOption'];
        delete params['layerIds'];
    }
    if(!trueParams['imageDisplay']){
        trueParams['imageDisplay'] = params['width'] + "," + params['height'] + "," + params['dpi'];
        delete params['width'];
        delete params['height'];
        delete params['dpi'];
    }
    extend(trueParams,params);
    url = formatQuery(trueParams,url,null,formatObj);
    return service.getPromise(url);
}

export {ArcGisIdentifyTask};
Zondy.Service.ArcGisIdentifyTask = ArcGisIdentifyTask;