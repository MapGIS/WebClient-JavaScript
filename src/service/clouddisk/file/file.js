import { Zondy } from '../../common/Base';
import { CloudDiskService } from '../ServiceBase';

const CopyPath = 'copy';

/**
 * @class module:CloudDisk.GisCore.FileService
 * @description DataStore的云盘数据转换服务
 * @see 该方法强依赖datastore
 * @author 基础平台-潘卓然
 */
export class FileService extends CloudDiskService {
  constructor(options) {
    super(options);
    /**
     * @member module:CloudDisk.FileService.prototype.serviceUrl
     * @description 服务地址
     */
    this.serviceUrl = '/clouddisk/rest/file/';
  }

  /**
   * @private 修正get/post需要的真正参数
   */
  fixOption(option) {
    this.option = {
    };
  }

  /**
   * @function module:CloudDisk.FileService.prototype.schema
   * @description 空间数据元数据
   * @param  {Object} options 请求参数
   * @param  {String} options.destFileName 
   * @param  {String} options.destFolderDir 
   * @param  {String} options.isFolder 
   * @param  {String} options.srcUrl 
   * @param  {Function} onSuccess 成功回调
   * @param  {Function} onError 失败回调
   * @link http://192.168.199.53:9011/giscore/dataconvert/rest/geodataset/schema?
   */
  copy(options, onSuccess, onError) {
    let { serviceUrl } = this;
    serviceUrl += CopyPath;
    let url = this.getFullUrl(serviceUrl, options);
    this.get(url, onSuccess, onError);
  }

}

export default FileService;
Zondy.CloudDisk.GisCore.FileService = FileService;
