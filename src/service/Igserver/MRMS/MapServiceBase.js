﻿import {Zondy} from '../../common/Base';
import {ServiceBase}  from  "../../ServiceBase";

/**
 * @class module:地图服务.MapServiceBase
 * @classdesc 地图服务基类
 * @description Zondy.Service.MapServiceBase
 * @extends Zondy.Service.ServiceBase
 * @param {Object} option 属性键值对
 */
class MapServiceBase extends ServiceBase {
    constructor(option) {
        var options = option || {};
        options.baseUrl = "igs/rest/mrms";
        super(options);
    }
}
export {MapServiceBase};
Zondy.Service.MapServiceBase = MapServiceBase;