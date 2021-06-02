import {
    Zondy
} from '../../common/Base';
import {
    copyExcluce
} from "../../common/Util";
import {
    getWFParameterString
} from "../../common/Util";
import {
    ServiceBase
} from "../../ServiceBase";
import {
    IgsServiceBase
} from "../../baseserver/IServiceBase";

/**
 * 空间分析服务基类
 * @class module:分析服务.AnalysisBase
 * @classdesc 空间分析服务基类
 * @description Zondy.Service.AnalysisBase
 * @extends Zondy.Service.ServiceBase
 * @param {Object} option 属性键值对,拓展属性
 * @param {Number} [option.flowID] 工作流ID号
 */
class AnalysisBase extends ServiceBase {
    constructor(option) {
        var options = option || {};
        options.baseUrl = "igs/rest/mrfws";
        super(options);

        /**
         * @private
         * @member Zondy.Service.AnalysisBase.prototype.flowID
         * @type {Number}
         * @description 工作流ID号
         * @default null
         */
        this.flowID = options.flowID !== undefined ? options.flowID : null;
    }

    /**
     * @function Zondy.Service.AnalysisBase.prototype.execute
     * @description 执行空间分析服务
     * @param {Function} onSuccess 必要参数，执行成功后的回调函数
     * @param {String} way 服务器请求类型,'POST' or 'GET'，默认为'Get',当所需要发送的数据量比较大时，请选择'Post',否则可能会执行失败
     * @param {Function} onError 错误回调函数
     */
    execute(onSuccess, way, onError) {
        var data = {};
        copyExcluce(data, this, ['port', 'ip', 'baseUrl', 'partUrl', 'flowID']);
        if (!way) {
            way = "get";
        }
        if (way.toLowerCase() === "get") {
            this.partUrl = "execute/" + this.flowID + "?isAsy=false&f=json";
            if (data !== null) {
                var paraStr = getWFParameterString(data);
                if (paraStr !== null || paraStr !== '') {
                    this.partUrl += '&paraValues=' + paraStr;
                }
            }
        }
        if (way.toLowerCase() === "post") {
            this.partUrl = "execute/" + this.flowID + "?isAsy=false&f=json";
            var keyValueArray = new Array();
            if (data !== null) {
                for (var o in data) {
                    if (data[o] !== null) {
                        var keyValue = {};
                        keyValue.Key = o;
                        keyValue.Value = data[o].toString();
                        keyValueArray.push(keyValue);
                    }
                }
            }
            data = keyValueArray;

        }
        var url = this.getFullUrl();
        var me = this;
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        if (way.toLowerCase() === "post") {
            service.processAsync({
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'text/plain;charset=UTF-8'
                }
            });
        } else {
            service.processAsync();
        }
    }
}
export {
    AnalysisBase
};
Zondy.Service.AnalysisBase = AnalysisBase;