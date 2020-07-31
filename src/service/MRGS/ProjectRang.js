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
 * 对矩形范围坐标点进行投影转换
 * @class  module:几何分析服务.ProjectRang
 * @classdesc 对矩形范围坐标点进行投影转换
 * @description Zondy.Service.ProjectRang
 * @extends Zondy.Service.GeometryAnalysisBase
 * @param {Object} option 属性键值对
 * @param {String} [option.gdbsvrName = "MapGISLocal"] 数据源名称
 * @param {String} [option.gdbName = null] 数据库名称
 * @param {Number} [option.srefID = 0] 源投影参考系ID
 * @param {Number} [option.desfID = 0] 目的投影参考系ID
 * @param {String} [option.userName = null] 地理数据源/地理数据库账户名
 * @param {String} [option.password = null] 地理数据源/地理数据库密码
 * @example
 //需要投影转换的矩形
 var rectangle = new Zondy.Object.Rectangle(2119075.5815982167, -8944857.387927618, -1350086.1660772718, 3477202.6583427647);
 //对矩形范围坐标点进行投影转换
 var ProjectRang = new Zondy.Service.ProjectRang({
                    //数据源名称,默认值为"MapGISLocal"
                    gdbsvrName: "MapGISLocal",
                    //数据库名称
                    gdbName: "OpenLayerVecterMap",
                    //源投影参考系ID
                    srefID: 10,
                    //目的投影参考系ID
                    desfID: 601,
                    //服务器地址
                    ip: "develop.smaryun.com",
                    //服务器端口
                    port: "6163"
                });
 ProjectRang.execute(rectangle, function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
 */
class ProjectRang extends GeometryAnalysisBase {
    constructor(option) {
        var options = option ? option : {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.ProjectRang.prototype.gdbsvrName
         * @type {String}
         * @description 数据源名称
         * @default MapGISLocal
         */
        this.gdbsvrName = options.gdbsvrName !== undefined ? options.gdbsvrName : "MapGISLocal";

        /**
         * @private
         * @member Zondy.Service.ProjectRang.prototype.gdbName
         * @type {String}
         * @description 数据库名称
         * @default null
         */
        this.gdbName = options.gdbName !== undefined ? options.gdbName : null;

        /**
         * @private
         * @member Zondy.Service.ProjectRang.prototype.srefID
         * @type {Number}
         * @description 源投影参考系ID
         * @default 0
         */
        this.srefID = options.srefID !== undefined ? options.srefID : 0;

        /**
         * @private
         * @member Zondy.Service.ProjectRang.prototype.desfID
         * @type {Number}
         * @description 目的投影参考系ID
         * @default 0
         */
        this.desfID = options.desfID !== undefined ? options.desfID : 0;

        /**
         * @private
         * @member Zondy.Service.ProjectRang.prototype.userName
         * @type {String}
         * @description 地理数据源/地理数据库账户名
         * @default null
         */
        this.userName = options.userName !== undefined ? options.userName : null;

        /**
         * @private
         * @member Zondy.Service.ProjectRang.prototype.password
         * @type {String}
         * @description 地理数据源/地理数据库密码
         * @default null
         */
        this.password = options.password !== undefined ? options.password : null;
    }

    /**
     * @function Zondy.Service.ProjectRang.prototype.execute
     * @description 执行点投影
     * @param {Object} rectangle {xmin, xmax, ymin, ymax}
     * @param {callback} onSuccess 执行成功后的回调函数
     * @param {callback} onError 执行失败后的回调函数
     */
    execute(rectangle, onSuccess, onError) {
        var rang = "";
        if (rectangle) {
            rang = rectangle.xmin + "$" + rectangle.ymin + "$" + rectangle.xmax + "$" + rectangle.ymax;
        }
        if (this.userName === null || this.password === null) {
            this.partUrl = "geomservice/" + this.gdbsvrName + "/" + this.gdbName + "/" + this.srefID + "/" + this.desfID + "?f=json&rang=" + rang;
        } else {
            this.partUrl = "geomservice/" + this.gdbsvrName + "/" + this.gdbName + "/" + this.srefID + "/" + this.desfID + "?f=json&rang=" + rang + "&userName=" + this.userName + "&password=" + this.password;
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
        service.processAsync();
    }

}
export {
    ProjectRang
};
Zondy.Service.ProjectRang = ProjectRang;