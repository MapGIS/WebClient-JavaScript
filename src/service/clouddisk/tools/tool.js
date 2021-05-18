import Qs from 'qs';

import { Zondy } from '../../common/Base';
import { CloudDiskService } from '../ServiceBase';

const TasksPath = '/tasks';

/**
 * @class module:CloudDisk.ToolsService
 * @description DataStore的云盘数据转换服务
 * @see 该方法强依赖datastore
 * @author 基础平台-潘卓然
 * @see http://192.168.199.53:9011/clouddisk/rest/swagger-ui.html
 * @example
 * let service = new ToolsService({ domain: "http://192.168.199.53:9011"});
 * service.setHeaders({authorization: 'pk.xxxxxx'});
 * service.gettasks({
 *      taskid: "9baaeff5-7b08-4681-b0d4-ce2e70c1d61e",
 *      taskName: "创建缓冲分析任务",
 *      srcUrl: "",
 *      taskType: 13,
 *      beginTime: 1621305760000
 *      endTime: 1621305770000
 * }, (res) => {}, (error) => {});
 */
export class ToolsService extends CloudDiskService {
    constructor(options) {
        super(options);
        /**
         * @member module:CloudDisk.ToolsService.prototype.serviceUrl
         * @description 服务地址
         */
        this.serviceUrl = '/clouddisk/rest/tools/tasks';
    }

    /**
     * @function module:CloudDisk.ToolsService.prototype.gettasks
     * @description 空间数据元数据
     * @param  {Object} options 请求参数
     * @param  {String} [options.taskID] taskID
     * @param  {String} [options.taskName] taskName
     * @param  {String} [options.srcUrl] srcUrl
     * @param  {Number} [options.taskType] 任务类型id，从字典接口获取（task）
     * @param  {Number} [options.beginTime] 开始时间 时间戳 毫秒
     * @param  {Number} [options.endTime] 结束时间 时间戳 毫秒
     * @param  {Number} [options.pageSize = 20] pageSize
     * @param  {Number} [options.pageNum = 1] pageNum
     * @param  {Function} onSuccess 成功回调
     * @param  {Function} onError 失败回调
     * @example http://192.168.199.53:9011/clouddisk/rest/CalculateModel/catalog
     */
    gettasks(options, onSuccess, onError) {
        let { serviceUrl } = this;
        serviceUrl += TasksPath;
        let url = this.getFullUrl(serviceUrl, options);
        this.get(url, onSuccess, onError);
    }
}

export default ToolsService;
Zondy.CloudDisk.Model.ToolsService = ToolsService;
