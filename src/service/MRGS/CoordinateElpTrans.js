import {
    Zondy
} from '../common/Base';
import {
    GeometryAnalysisBase
} from "./GeometryAnalysisBase";
import {
    IgsServiceBase
} from "../baseserver/IServiceBase";

/**
 * 三参数/七参数坐标转换
 * @param {Object} option 属性键值对<br>
 * @param {String} [option.points=x1,y1;x2,y2] 需要计算的点数组
 * @param {String} [option.dx=] 中误差x
 * @param {String} [option.dy=] 中误差y
 * @param {String} [option.dz=] 中误差z
 * @param {String} [option.m=] 七参数尺度因子
 * @param {String} [option.wx=] 七参数wx
 * @param {String} [option.wy=] 七参数wy
 * @param {String} [option.wz=] 七参数wz
 * @param {String} [option.srcsrsname=] 源坐标系名
 * @param {String} [option.dessrsname=] 目标坐标系名
 */
class CoordinateElpTrans extends GeometryAnalysisBase {
    constructor(option) {
        var options = option ? option : {};
        super(options);


        /**
         * @private
         * @type {String}
         * @description 坐标点
         * @example x1,y1;x2,y2
         * @default ""
         */
        this.points = options.points !== undefined ? options.points : "";


        /**
         * @private
         * @type {String}
         * @description dx
         * @default ""
         */
        this.dx = options.dx !== undefined ? options.dx : "";

        /**
         * @private
         * @type {String}
         * @description dy
         * @default ""
         */
        this.dy = options.dy !== undefined ? options.dy : "";

        /**
         * @private
         * @type {String}
         * @description dz
         * @default ""
         */
        this.dz = options.dz !== undefined ? options.dz : "";


        /**
         * @private
         * @type {String}
         * @description 七参数尺度因子
         * @default ""
         */
        this.m = options.m !== undefined ? options.m : "";

        /**
         * @private
         * @type {String}
         * @description 七参数wx
         * @default ""
         */
        this.wx = options.wx !== undefined ? options.wx : "";

        /**
         * @private
         * @type {String}
         * @description 七参数wy
         * @default ""
         */
        this.wy = options.wy !== undefined ? options.wy : "";

        /**
         * @private
         * @type {String}
         * @description 七参数wz
         * @default ""
         */
        this.wz = options.wz !== undefined ? options.wz : "";

        /**
         * @private
         * @type {String}
         * @description srcsrsname
         * @default ""
         */
        this.srcsrsname = options.srcsrsname !== undefined ? options.srcsrsname : "";

        /**
         * @private
         * @type {String}
         * @description dessrsname
         * @default ""
         */
        this.dessrsname = options.dessrsname !== undefined ? options.dessrsname : "";

    }

    /**
     * @function Zondy.Service.CoordinateTransform.prototype.coordinateTrans
     * @description 执行三参数/七参数转换
     * @param {callback} onSuccess 执行成功后的回调函数
     * @param {callback} onError 执行失败后的回调函数
     * @param {string} 请求方式
     * @example localhost:6163/igs/rest/mrgs/geomservice/transcoordinate?points=411832,109867,0&dx=100&dy=100&dz=100&m=1&wx=100&wy=100&wz=100&srcsrsname=WGS1984_秒&dessrsname=地理坐标系(西安)_秒
     */
    coordinateTrans(onSuccess, onError, type) {
        var postObj = {};
        if (type !== null && type.toUpperCase() === "POST") {
            postObj.paraValues = "";
            // this.partUrl = "execute/"+flowID+"?f="+this.f+"&isAsy="+isAsyStr+"&guid="+this.guid;
            this.partUrl = "geomservice/transcoordinate?points=" + this.points + "&dx=" + this.dx + "&dy=" + this.dy + "&dz=" + this.dz + "&m=" + this.m + "&wx=" + this.wx + "&wy=" + this.wy + "&wz=" + this.wz + "&srcsrsname=" + this.srcsrsname + "&dessrsname=" + this.dessrsname
        } else {
            postObj = this;
            this.partUrl = "geomservice/transcoordinate";
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

}
export {
    CoordinateElpTrans
};
Zondy.Service.CoordinateTransform = CoordinateElpTrans;