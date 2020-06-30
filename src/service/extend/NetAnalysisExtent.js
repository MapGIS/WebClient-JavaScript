/// <summary>空间分析服务基类构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>

import { Zondy } from "../common/Base";
import { extend }  from  "../common/Util";
import { ServiceBase }  from  "../ServiceBase";
import { IgsServiceBase }  from  "../baseserver/IServiceBase";

class NetAnalysisExtent extends ServiceBase{
    constructor(opt_options) {
        var options = opt_options || {};
        super(options);
        /// <summary>工作流ID号,Interger</summary>
        //网络类url
        this.netClsUrl = options.netClsUrl !== undefined ? options.netClsUrl : null;
        //网标序列，包括点上网标、网线网标
        this.flagPosStr = options.flagPosStr !== undefined ? options.flagPosStr : null;
        //分析模式，包括用户模式、系统模式（系统模型下有六种分析方式）
        this.analyTp = options.analyTp !== undefined ? options.analyTp : 'UserMode';
        //权值
        this.weight = options.weight !== undefined ? options.weight : ',Weight1,Weight1';
        //返回格式
        this.outFormat = options.outFormat !== undefined ? options.outFormat : 'JSON';
        //网络元素类型，包括结点元素、边线元素、以及其他分析中会用到的如源、汇等类型。
        this.elementType = options.elementType !== undefined ? options.elementType : 2;
        //网标或障碍的捕捉精度
        this.nearDis = options.nearDis !== undefined ? options.nearDis : 0.001;
        //障碍序列，包括点上障碍、线上障碍
        this.barrierPosStr = options.barrierPosStr !== undefined ? options.barrierPosStr : null;
        //生成报告时道路名称字段
        this.roadName = options.roadName !== undefined ? options.roadName : "name";

        this.baseUrl = "igs/rest/netAnaly";
    }
    /** 
    * 获取网络类权值信息（只支持GET方式）
    * Parameters:
    * infoType-{string}获取网络类信息类型,取值"weight"
    * onSuccess - {function} 执行成功的回调函数 
    * onError - {function} 执行失败的回调函数 
    * resultFormat-{string}回调结果的包装形式，取值为'json','xml',默认为json格式
    * type-{string}请求类型,取值"Get","Post"，当前功能默认只取值GET，设置POST无效，只做兼容保留
    * contentType-{string}get方式默认为‘application/x-www-form-urlencoded’，post默认为text/plain,一般使用默认即可
    * options-{Object} 主要用来扩展ajax的参数，一般无需设置
    */
    getNetInfo(infoType, onSuccess, onError, options) {
        if (infoType == null || infoType == undefined) {
            infoType = "weight";
        }
        //当前服务默认只支持GET方式
        this.partUrl = "netClsInfo?netCls=" + this.netClsUrl + "&type=" + infoType;

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
    * 添加网标(支持GET和POST两种方式)
    * Parameters:
    * dotVal-{string}添加网标点坐标,格式为"x1,y1,x2,y2,...",
    * onSuccess - {function} 执行成功的回调函数 
    * onError - {function} 执行失败的回调函数 
    * resultFormat-{string}回调结果的包装形式，取值为'json','xml',默认为json格式
    * type-{string}请求类型,取值"Get","Post"，当前功能默认GET方式，也可以设置POST的方式
    * contentType-{string}get方式默认为‘application/x-www-form-urlencoded’，post默认为text/plain,一般使用默认即可
    * options-{Object} 主要用来扩展ajax的参数，一般无需设置
    */
    addNetFlag(dotVal, onSuccess, onError, type, options) {
        var postString = null;
        var postObj = {};
        if (type != null && type.toUpperCase() == "POST") {
            postObj.dotVal = dotVal;
            this.partUrl = "netClsFlag?netCls=" + this.netClsUrl + "&type=" + this.elementType + "&nearDis=" + this.nearDis;
        }
        else {
            this.partUrl = "netClsFlag?netCls=" + this.netClsUrl + "&type=" + this.elementType + "&value=" + dotVal + "&nearDis=" + this.nearDis;
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
        if (type != null && type.toUpperCase() == "POST") {
            service.processAsync({ method: 'POST', data: JSON.stringify(postObj), headers: { 'Content-Type': 'text/plain;charset=UTF-8'} });
        }
        else {
            service.processAsync();
        }
    }
    /** 
    * 执行网络分析（只支持POST方式）
    * Parameters:
    * dataObject-{Object}服务器发送的数据
    * onSuccess - {function} 执行成功的回调函数 
    * onError - {function} 执行失败的回调函数 
    * resultFormat-{string}回调结果的包装形式，取值为'json','xml',默认为json格式
    * type-{string}请求类型,取值"Get","Post"，当前功能默认只提供POST的方式，GET方式设置无效，只做兼容保留
    * contentType-{string}get方式默认为‘application/x-www-form-urlencoded’，post默认为text/plain,一般使用默认即可
    * options-{Object} 主要用来扩展ajax的参数，一般无需设置
    */
    netAnalyse(dataObject, onSuccess, onError, options) {
        this.partUrl = "netAnalyse";
        //当前服务只支持POST的方式
        var me = this;
        var url = me.getFullUrl();

        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync({ method: 'POST', data: JSON.stringify(dataObject), headers: { 'Content-Type': 'text/plain;charset=UTF-8'} });
    }
    /** 
    * 执行多策略网络分析（只支持POST方式）
    * Parameters:
    * dataObject-{Object}服务器发送的数据
    * onSuccess - {function} 执行成功的回调函数 
    * onError - {function} 执行失败的回调函数 
    * resultFormat-{string}回调结果的包装形式，取值为'json','xml',默认为json格式
    * type-{string}请求类型,取值"Get","Post"，当前功能默认只提供POST的方式，GET方式设置无效，只做兼容保留
    * contentType-{string}get方式默认为‘application/x-www-form-urlencoded’，post默认为text/plain,一般使用默认即可
    * options-{Object} 主要用来扩展ajax的参数，一般无需设置
    */
    comNetAnalyse(dataObject, onSuccess, onError, options) {
        this.partUrl = "comNetAnalyse";
        var me = this;
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync({ method: 'POST', data: JSON.stringify(dataObject), headers: { 'Content-Type': 'text/plain;charset=UTF-8'} });
    }
    /** 
    * 执行多路网络分析（只支持POST方式）
    * Parameters:
    * dataObject-{Object}服务器发送的数据
    * onSuccess - {function} 执行成功的回调函数 
    * onError - {function} 执行失败的回调函数 
    * resultFormat-{string}回调结果的包装形式，取值为'json','xml',默认为json格式
    * type-{string}请求类型,取值"Get","Post"，当前功能默认只提供POST的方式，GET方式设置无效，只做兼容保留
    * contentType-{string}get方式默认为‘application/x-www-form-urlencoded’，post默认为text/plain,一般使用默认即可
    * options-{Object} 主要用来扩展ajax的参数，一般无需设置
    */
    pluNetAnalyse(dataObject, onSuccess, onError, options) {
        this.partUrl = "pluNetAnalyse";
        //当前服务只支持post的方式
        var me = this;
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync({ method: 'POST', data: JSON.stringify(dataObject), headers: { 'Content-Type': 'text/plain;charset=UTF-8'} });
    }
};

export { NetAnalysisExtent};
Zondy.Service.NetAnalysisExtent = NetAnalysisExtent;