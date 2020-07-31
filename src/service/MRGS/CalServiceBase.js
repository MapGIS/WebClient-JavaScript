import {
    Zondy
} from '../common/Base';
import {
    GeometryAnalysisBase
} from "./GeometryAnalysisBase";
import {
    Point2D
} from "../common/Point2D";
import {
    IgsServiceBase
} from "../baseserver/IServiceBase";
import {
    CProjectParam
} from "./CProjectParam";
import {
    CProjectBySRSID
} from "./CProjectBySRSID";

/**
 * 测量服务基类
 * @class module:几何分析服务.CalServiceBase
 * @classdesc 测量服务基类
 * @description Zondy.Service.CalServiceBase
 * @extends Zondy.Service.GeometryAnalysisBase
 * @param {Object} option 属性键值对,拓展属性,为其他属性赋值的键值对<br>
 * @param {Zondy.Object.Point2D} [option.dots=null] 需要计算的点数组 Array<{@link Zondy.Object.Point2D}>}
 * @param {Zondy.Service.CProjectParam} [option.projectInfo=null] 类型
 * @param {Zondy.Service.CProjectBySRSID} [option.projectInfoBySRSID=null] 投影座标系信息
 */
class CalServiceBase extends GeometryAnalysisBase {
    constructor(option) {
        var options = option ? option : {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.CalServiceBase.prototype.dots
         * @type {Array}
         * @description 需要计算的点数组 Array<{@link Zondy.Object.Point2D}>}
         * @default null
         */
        this.dots = options.dots !== undefined ? options.dots : null;

        /**
         * @private
         * @member Zondy.Service.CalServiceBase.prototype.projectInfo
         * @type {Zondy.Service.CProjectParam}
         * @description 类型
         * @default null
         */
        this.projectInfo = options.projectInfo !== undefined ? options.projectInfo : null;

        /**
         * @private
         * @member Zondy.Service.CalServiceBase.prototype.projectInfoBySRSID
         * @type {Zondy.Service.CProjectBySRSID}
         * @description 投影座标系信息
         * @default null
         */
        this.projectInfoBySRSID = options.projectInfoBySRSID !== undefined ? options.projectInfoBySRSID : null;
    }


    /**
     * @function Zondy.Service.CalServiceBase.prototype.execute
     * @description 通过传入投影参数或者通过传入SRSID参数进行计算
     * @param {Zondy.Service.CProjectBySRSID | Zondy.Service.CProjectParam} projParam 投影参数，建议普通用户采用此类直接获取MapGIS GDB 已经提供的空间参考系
     * @param {callback} onSuccess 执行成功后的回调函数
     * @param {callback} onError 执行失败后的回调函数
     */
    execute(projParam, onSuccess, onError) {
        if (projParam instanceof CProjectParam) {
            this.projectInfo = projParam;
        }
        if (projParam instanceof CProjectBySRSID) {
            this.projectInfoBySrsID = projParam;
        }
        var postObj = {};
        postObj.Dots = this.dots;
        postObj.ProjectInfo = this.projectInfo;
        postObj.ProjectInfoBySrsID = this.projectInfoBySrsID;
        var me = this;
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync({
            method: 'POST',
            data: JSON.stringify(postObj),
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8'
            }
        });
    }

}
export {
    CalServiceBase
};
Zondy.Service.CalServiceBase = CalServiceBase;