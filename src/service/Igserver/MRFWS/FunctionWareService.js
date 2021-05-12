import {Zondy} from "../../common/Base";
import {AnalysisBase}  from "./AnalysisBase";
import {IgsServiceBase}  from "../../baseserver/IServiceBase";
import {newGuid}  from "../../common/Util";

/**
 * @classdesc 工作流仓库服务
 * @author xiehang
 * @Date 2018-09-27
 */
class FunctionWareService extends AnalysisBase {
    constructor(opt_options) {
        var options = opt_options || {};
        super(options);
        this.guid = options.guid ? options.guid : newGuid();
        this.f = options.f !== undefined ? options.f : 'json';
    }

    /**
     * @description 根据工作流ID执行工作流(支持GET和POST请求)
     * @param flowID {string}  工作流id号
     * @param paraValues {string} 工作流参数的键值对（key:value;key:value）
     * @param isAsyStr {boolean}  是否异步执行一个工作流，默认为false
     * @param onSuccess {function} 成功回调
     * @param onError {function} 失败回调
     * @example http://192.168.83.126:6163/igs/rest/mrfws/execute/600348?paraValues=linSfclsURL:gdbp://MapGisLocal/FjdzRubbish/sfcls/WarnContourL_20130502100530;TraceBlkRowCol:1024&amp;f=json
     */
    executeWorkFlow(flowID, paraValues, isAsyStr, onSuccess, onError, type) {
        if (!isAsyStr) {
            isAsyStr = false;
        }

        var postObj = {};
        if (type !== null && type.toUpperCase() === "POST") {
            postObj.paraValues = paraValues;
            this.partUrl = "execute/" + flowID + "?f=" + this.f + "&isAsy=" + isAsyStr + "&guid=" + this.guid;
        } else {
            this.partUrl = "execute/" + flowID + "?paraValues=" + paraValues + "&f=" + this.f + "&isAsy=" + isAsyStr + "&guid=" + this.guid;
        }

        var me = this;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        if (type !== null && type.toUpperCase() === "POST") {
            service.processAsync({
                method: 'POST',
                data: JSON.stringify(postObj)
            });
        }
        else {
            service.processAsync();
        }
    }

    /**
     * @description 获取工作流执行信息记录(支持GET请求)
     * @param id {string} 异步任务id
     * @param onSuccess {function} 成功回调
     * @param onError {function} 失败回调
     * @example http://192.168.83.126:6163/igs/rest/mrfws/instanceLogs/0affa8ef509846d4ac3e32a7d0eef99e?f=json
     */
    getInstanceMessage(id, onSuccess, onError) {
        this.partUrl = "instanceLogs/" + id + "?f=" + this.f + "&guid=" + this.guid;
        var me = this;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 获取工作流输出参数(支持GET请求)
     * @param id {string} 异步任务id
     * @param name {string} 需要获取参数值的参数名
     * @param onSuccess {function} 成功回调
     * @param onError {function} 失败回调
     * @example http://192.168.83.126:6163/igs/rest/mrfws/outputvalues/0affa8ef509846d4ac3e32a7d0eef99e?name=area&amp;f=json
     */
    getInstanceOutPutValue(id, name, onSuccess, onError) {
        this.partUrl = "outputvalues/" + id + "?name=" + name + "&f=" + this.f + "&guid=" + this.guid;
        var me = this;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 获取工作流执行结果(支持GET请求)
     * @param id {string} 异步任务id
     * @param onSuccess {function} 成功回调
     * @param onError {function} 失败回调
     * @example http://192.168.83.126:6163/igs/rest/mrfws/outputvalues/0affa8ef509846d4ac3e32a7d0eef99e?name=area&amp;f=json
     */
    getInstanceResult(id, onSuccess, onError) {
        this.partUrl = "results/" + id + "?f=" + this.f + "&guid=" + this.guid;
        var me = this;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 获取工作流执行状态(支持GET请求)
     * @param id {string} 异步任务id
     * @param onSuccess {function} 成功回调
     * @param onError {function} 失败回调
     */
    getInstanceStatus(id, onSuccess, onError) {
        this.partUrl = "status/" + id + "?f=" + this.f + "&guid=" + this.guid;
        var me = this;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 获取工作流分组名称(支持GET请求)
     * @param onSuccess {function} 成功回调
     * @param onError {function} 失败回调
     */
    getWorkFlowGroups(onSuccess, onError) {
        this.partUrl = "groups/?f=" + this.f + "&guid=" + this.guid;
        var me = this;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }


    /**
     * @description 获取工作流信息(支持GET请求)
     * @param id {string} 异步任务id
     * @param onSuccess {function} 成功回调
     * @param onError {function} 失败回调
     */
    getWorkFlowInfoByID(id, onSuccess, onError) {
        this.partUrl = "workflows/" + id + "?f=" + this.f + "&guid=" + this.guid;
        var me = this;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 获取工作流列表(支持GET请求)
     * @param id {string} 异步任务id
     * @param onSuccess {function} 成功回调
     * @param onError {function} 失败回调
     */
    getWorkFlowInfos(onSuccess, onError) {
        this.partUrl = "workflows?f=" + this.f + "&guid=" + this.guid;
        var me = this;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }


    /**
     * @description 获取工作流模板信息(支持GET请求)
     * @param id {string} 异步任务id
     * @param onSuccess {function} 成功回调
     * @param onError {function} 失败回调
     */
    getWorkFlowInfosByGroup(groupName, onSuccess, onError) {
        this.partUrl = "workflowsbygroup/" + groupName + "?f=" + this.f + "&guid=" + this.guid;
        var me = this;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /////////////////////////////////////////获取工作流目录有以下几种方式//////////////////////////////////////////////////////


    /**
     * @description 获取工作流模板信息(支持GET请求)
     * @param onSuccess {function} 成功回调
     * @param onError {function} 失败回调
     */
    getFolder1(onSuccess, onError) {
        this.partUrl = "folderInfos?f=" + this.f + "&guid=" + this.guid;
        var me = this;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 获取工作流模板信息(支持GET请求)
     * @param onSuccess {function} 成功回调
     * @param onError {function} 失败回调
     */
    getFolder2(onSuccess, onError) {
        this.partUrl = "folderInfos/workflow?f=" + this.f + "&guid=" + this.guid;
        var me = this;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 获取工作流模板信息(支持GET请求)
     * @param onSuccess {function} 成功回调
     * @param onError {function} 失败回调
     */
    getFolder3(groupName, onSuccess, onError) {
        this.partUrl = "folderInfos/workflow/" + groupName + "?f=" + this.f + "&guid=" + this.guid;
        var me = this;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }
}

export {FunctionWareService};
Zondy.Service.FunctionWareService = FunctionWareService;