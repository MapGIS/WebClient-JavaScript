import {Zondy} from '../common/Base';
import {ServiceBase}  from  "../ServiceBase";

/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:目录服务.CatalogService
 * @classdesc Zondy.Catalog.CatalogService 目录服务类
 * @extends  ServiceBase
 * @param option - {Object} 属性键值对。<br>
 * @param {String} [option.baseUrl = igs/rest/mrcs] 基本地址
 */
class CatalogService extends ServiceBase {
    constructor(option) {
        var options = option || {};
        options.baseUrl = "igs/rest/mrcs";
        super(options);
    }
}
export {CatalogService};
Zondy.Catalog.CatalogService = CatalogService;