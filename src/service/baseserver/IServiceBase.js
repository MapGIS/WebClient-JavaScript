﻿import { transformResult } from '../common/Util';
import { CommonServiceBase } from './CommonServiceBase';

class IgsServiceBase extends CommonServiceBase {
    constructor(url, options) {
        options = options || {};
        super(url, options);
        this.CLASS_NAME = 'Zondy.IgsServiceBase';
    }

    destroy() {
        super.destroy();
        var me = this;
        if (me.events) {
            me.events.un(me.eventListeners);
            me.events.listeners = null;
            me.events.destroy();
            me.events = null;
            me.eventListeners = null;
        }
    }

    /**
     * @function  MapService.prototype.processAsync
     * @description 负责将客户端的设置的参数传递到服务端，与服务端完成异步通讯。
     */
    processAsync(options) {
        var me = this;
        me.request({
            method: options && options.method ? options.method : 'GET',
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed,
            data: options && options.data ? options.data : null,
            headers: options && options.headers ? options.headers : null
        });
    }

    /**
     * @function serviceProcessCompleted
     * @description 获取地图状态完成，执行此方法。
     * @param {Object} result 服务器返回的结果对象。
     */
    serviceProcessCompleted(result) {
        var me = this;
        result = transformResult(result);
        // bug 13893 后统改succeed 为 success，这就导致如果项目上的版本是用的这个节点前的igserver的版本
        // webclient-es6-service只能使用10.5.4-1之前的版本，需要慎重处理
        if (result.succeed) {
            me.events && me.events.triggerEvent('processCompleted', { result: result });
        } else {
            ////在没有token是返回的是200，但是其实是没有权限，所以这里也应该是触发失败事件
            me.events && me.events.triggerEvent('processFailed', { result: result });
        }
    }
}
export { IgsServiceBase };
Zondy.Service.IgsServiceBase = IgsServiceBase;
