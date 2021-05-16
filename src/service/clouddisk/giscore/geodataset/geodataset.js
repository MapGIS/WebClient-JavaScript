import Qs from 'qs';

import { Zondy } from '../../../common/Base';
import { CloudDiskService } from '../../ServiceBase';

const SchemaPath = 'schema';
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
   * @param  {Object} options 请求参数
   * @param  {String} [options.epsg] 完整的请求地址。
   * @param  {String} options.gdbp 完整的请求地址。
   * @param  {Function} onSuccess 成功回调
   * @param  {Function} onError 失败回调
   * @link http://192.168.199.53:9011/giscore/dataconvert/rest/geodataset/schema?
   */
  schema(options, onSuccess, onError) {
    let { serviceUrl, option } = this;
    serviceUrl += SchemaPath;
    let url = this.getFullUrl(serviceUrl, options);
    this.get(url, onSuccess, onError);
  }

  /**
   * @function module:CloudDisk.GeoDatasetService.prototype.statistics
   * @param  {Object} options 请求参数
   * @param  {String} options.gdbp 要素GDBP地址
   * @param  {String} options.statisticFields 统计字段
   * @param  {String} [options.pageSize = 100] 获取的数据量
   * @param  {Function} onSuccess 成功回调
   * @param  {Function} onError 失败回调
   * @link http://192.168.199.53:9011/giscore/dataconvert/rest/geodataset/featureclass/statistics?
   * @example
   [{"field":"USER_ID","statisticTypes":[“max","min","avg”]},{"field":"GB","statisticTypes":[“unique”]}]
   unique(唯一值),count(计数),min(最小值),max(最大),avg(平均)，sum(求和)
     const obj =[{field:name, statisticTypes: ["max", "min"] }];
     statistics({ gdbp: gdbp, statisticFields: JSON.stringify(obj)});
   */
  statistics(options, onSuccess, onError) {
    let { serviceUrl, option } = this;
    serviceUrl += StatisticsPath;
    let url = this.getFullUrl(serviceUrl, options);
    this.get(url, onSuccess, onError);
  }

}

export default GeoDatasetService;
Zondy.CloudDisk.GisCore.GeoDatasetService = GeoDatasetService;
