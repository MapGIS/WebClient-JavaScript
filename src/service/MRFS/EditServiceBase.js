import {Zondy} from '../common/Base';
import {ServiceBase}  from  "../ServiceBase";
import {newGuid}  from  "../common/Util";
/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:要素服务.EditServiceBase
 * @classdesc Zondy.Service.EditServiceBase 编辑服务基类
 * @extends   ServiceBase
 * @param option - {Object} 属性键值对。<br>
 * @param {Object} [option.guid = newGuid()] 唯一标识
 */
class EditServiceBase extends ServiceBase {
    constructor(option) {
        var options = option || {};
        super(options);
        /**
         * @private
         * @member Zondy.Service.EditServiceBase.prototype.guid
         * @type {String}
         * @description 唯一标识
         * @default newGuid()
         */
        this.guid = options.guid !== undefined ? options.guid : newGuid();

        /**
         * @private
         * @member Zondy.Service.EditServiceBase.prototype.baseUrl
         * @type {String}
         * @description  基类地址
         * @default "igs/rest/mrfs"
         */
        this.baseUrl = "igs/rest/mrfs";

        /**
         * @private
         * @member Zondy.Service.EditServiceBase.prototype.f
         * @type {String}
         * @description 返回格式
         * @default json
         */
        this.f = options.f !== undefined ? options.f : 'json';
    }
}
export {EditServiceBase};
Zondy.Service.EditServiceBase = EditServiceBase;