import { Zondy } from '../../../common/Base';
import { CloudDiskService } from '../../ServiceBase';

const SchemaPath = 'schema';
const FeatureMetadataPath = 'featureclass/metadata';
const RasterMetadataPath = 'raster/metadata';
const StatisticsPath = 'featureclass/statistics';

/**
 * @class module:CloudDisk.GisCore.GeoDatasetService
 * @description DataStore的云盘数据转换服务
 * @see 该方法强依赖java版本的mapgis.so动态库
 * @author 基础平台-潘卓然
 */
export class GeoDatasetService extends CloudDiskService {
  constructor(options) {
    super(options);
    /**
     * @member module:CloudDisk.GeoDatasetService.prototype.serviceUrl
     * @description 服务地址
     */
    this.serviceUrl = '/giscore/dataconvert/rest/geodataset/';
  }

  /**
   * @private 修正get/post需要的真正参数
   */
  fixOption(option) {
    this.option = {
    };
  }

  /**
   * @function module:CloudDisk.GeoDatasetService.prototype.schema
   * @description 空间数据元数据
   * @param  {Object} options 请求参数
   * @param  {String} [options.epsg] 完整的请求地址。
   * @param  {String} options.gdbp 完整的请求地址。
   * @param  {Function} onSuccess 成功回调
   * @param  {Function} onError 失败回调
   * @link http://192.168.199.53:9011/giscore/dataconvert/rest/geodataset/schema?
   */
  schema(options, onSuccess, onError) {
    let { serviceUrl } = this;
    serviceUrl += SchemaPath;
    let url = this.getFullUrl(serviceUrl, options);
    this.get(url, onSuccess, onError);
  }

  /**
  * @function module:CloudDisk.GeoDatasetService.prototype.featuremetadata
  * @description 简单要素类元数据
  * @param  {Object} options 请求参数
  * @param  {String} options.gdbp 要素GDBP地址
  * @param  {Function} onSuccess 成功回调
  * @param  {Function} onError 失败回调
  * @link http://192.168.199.53:9011/giscore/dataconvert/rest/geodataset/featureclass/metadata?
  */
  featuremetadata(options, onSuccess, onError) {
    let { serviceUrl } = this;
    serviceUrl += FeatureMetadataPath;
    let url = this.getFullUrl(serviceUrl, options);
    this.get(url, onSuccess, onError);
  }

  /**
  * @function module:CloudDisk.GeoDatasetService.prototype.rastermetadata
  * @description 简单要素类元数据
  * @param  {Object} options 请求参数
  * @param  {String} options.gdbp 要素GDBP地址
  * @param  {Function} onSuccess 成功回调
  * @param  {Function} onError 失败回调
  * @link http://192.168.199.53:9011/giscore/dataconvert/rest/geodataset/raster/metadata?
  */
  rastermetadata(options, onSuccess, onError) {
    let { serviceUrl } = this;
    serviceUrl += RasterMetadataPath;
    let url = this.getFullUrl(serviceUrl, options);
    this.get(url, onSuccess, onError);
  }

  /**
   * @function module:CloudDisk.GeoDatasetService.prototype.statistics
   * @description 简单要素类字段统计
   * @param  {Object} options 请求参数
   * @param  {String} options.gdbp 要素GDBP地址
   * @param  {String} options.statisticFields 统计字段
   * @param  {String} [options.pageSize = 100] 获取的数据量
   * @param  {Function} onSuccess 成功回调
   * @param  {Function} onError 失败回调
   * @link http://192.168.199.53:9011/giscore/dataconvert/rest/geodataset/featureclass/statistics?
   * @example
   * [{"field":"USER_ID","statisticTypes":[“max","min","avg”]},{"field":"GB","statisticTypes":[“unique”]}] 
   * unique(唯一值),count(计数),min(最小值),max(最大),avg(平均)，sum(求和)
   * const obj =[{field:name, statisticTypes: ["max", "min"] }];
   * statistics({ gdbp: gdbp, statisticFields: JSON.stringify(obj)});
   */
  statistics(options, onSuccess, onError) {
    let { serviceUrl } = this;
    serviceUrl += StatisticsPath;
    let url = this.getFullUrl(serviceUrl, options);
    this.get(url, onSuccess, onError);
  }

  /**
   * @function module:CloudDisk.GeoDatasetService.prototype.query
   * @description 简单要素类字段统计
   * @param  {Object} options 请求参数
   * @param  {String} options.gdbp 要素GDBP地址
   * @param  {String} [options.includeProperites] 是否返回属性字段
   * @param  {String} [options.fields] 自定义返回属性字段，统计计算中用于分组字段名列表，用逗号分隔
   * @param  {String} [options.geoFormat] 几何格式 支持wkt、geojson、circle、rect四种，其中当为circle时，geometry格式为：x坐标,y坐标,半径；当为rect时，geometry格式为：xmin,ymin,xmax,ymax
   * @param  {String} [options.geometry] 几何图形 wkt、geojson、自定义等字符串
   * @param  {String} [options.spatialRel] 空间关系 Contain(包含) DisJoint(分离) Intersect(求交) MBRIntersect(外包矩形求交)
   * @param  {String} [options.filter] 属性条件 sql where条件 （例如：id>5,id<10）
   * @param  {String} [options.epsg] 坐标系 只需要EPSG的编号 目前只支持 4326 / 3857
   * @param  {String} [options.pageNo = 1] 页号
   * @param  {String} [options.pageSize = 20] 每页返回数据量
   * @param  {Function} onSuccess 成功回调
   * @param  {Function} onError 失败回调
   * @link http://192.168.199.53:9011/giscore/dataconvert/rest/geodataset/featureclass/query?
   */
  query(options, onSuccess, onError) {
    let { serviceUrl } = this;
    serviceUrl += StatisticsPath;
    let url = this.getFullUrl(serviceUrl, options);
    this.get(url, onSuccess, onError);
  }

}

export default GeoDatasetService;
Zondy.CloudDisk.GisCore.GeoDatasetService = GeoDatasetService;
