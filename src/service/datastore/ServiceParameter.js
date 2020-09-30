import { Zondy } from '../common/Base';

/**
 * @author 创新中心-潘卓然
 * @class module:DataStore.ServiceParameter
 * @param option - {Object} 查询条件
 * @param {string} [option.domain=null] dataStore服务地址域名 （domain和[protocol，ip，port]，二选一）
 * @param {string} [option.protocol="http"] dataStore服务地址网络协议 （domain和[protocol，ip，port]，二选一）
 * @param {string} [option.ip =null] dataStore服务地址ip （domain和[protocol，ip，port]，二选一）
 * @param {string} [option.port=null] dataStore服务地址port （domain和[protocol，ip，port]，二选一）
 * @param {String} [option.pageSize = 100] 每页大小。默认10
 * @param {String} [option.pageNo] 页码，从1开始
 */
export class ServiceParameter {
    constructor(option) {
        /**
         * @member module:DataStore.ServiceParameter.prototype.domain
         * @description 域地址
         */
        this.domain = option.domain;
        /**
         * @member module:DataStore.ServiceParameter.prototype.protocol
         * @description 网络协议
         */
        this.protocol = option.protocol;
        /**
         * @member module:DataStore.ServiceParameter.prototype.ip
         * @description IP地址
         */
        this.ip = option.ip;
        /**
         * @member module:DataStore.ServiceParameter.prototype.port
         * @description 端口
         */
        this.port = option.port;
        /**
         * @member module:DataStore.ServiceParameter.prototype.pageSize
         * @description 页大小
         */
        this.pageSize = option.pageSize || 100;
        /**
         * @member module:DataStore.ServiceParameter.prototype.pageNo
         * @description 页数量
         */
        this.pageNo = option.pageNo || 1;
    }
}

export default ServiceParameter;
Zondy.DataStore.ServiceParameter = ServiceParameter;
