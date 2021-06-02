import {Zondy} from '../../common/Base';
import {ServiceBase} from "../../ServiceBase";

/**
 * @author 基础平台/产品2部 龚跃健
 * @class Zondy.Catalog.G3DService
 * @classdesc  三维目录服务类
 * @extends  ServiceBase
 * @param option - {Object} 属性键值对。<br>
 * @param {String} [option.baseUrl = igs/rest/g3d] 基本地址
 */
class G3DService extends ServiceBase {
    constructor(option) {
        var options = option || {};
        options.baseUrl = "igs/rest/g3d";
        super(options);
    }
}

export {G3DService};
Zondy.Catalog.G3DService = G3DService;