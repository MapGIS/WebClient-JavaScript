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
    CProjectParam
} from "./CProjectParam";
import {
    IgsServiceBase
} from "../baseserver/IServiceBase";

/**
 * 投影点数组
 * @class  module:几何分析服务.ProjectDots
 * @classdesc 投影点数组
 * @description Zondy.Service.ProjectDots
 * @extends Zondy.Service.GeometryAnalysisBase
 * @param {Zondy.Object.Point2D} dots 需要转换的点坐标 Array{@link Zondy.Object.Point2D}
 * @param {Zondy.Service.CProjectParam} srcparam 源投影参数
 * @param {Zondy.Service.CProjectParam} desparam 目标投影参数
 * @param {Object} option 属性键值对,拓展属性,为其他属性赋值的键值对
 * @example
 //构造需投影转换的点数组
 var dots = new Array(1);
 dots[0] = new Zondy.Object.Point2D(4819.949688726125, 67647.39383493776);
 //设置源投影参数
 var srcProjParam = new Zondy.Service.CProjectParam({
                    // 度分秒,即±DDDMMSS.SSSS格式
                    ProjAngleUnit: 5,
                    // 投影平面直角坐标系
                    ProjType: 3,
                    // 高斯-克吕格(横切椭圆柱等角)投影
                    ProjTypeID: 5,
                    // 厘米
                    ProjUnit: 12,
                    // 投影带号
                    ProjZoneNO: 20,
                    // 投影类型为3度分带
                    ProjZoneType: 1,
                    // 北京/克拉索夫斯基(1940年)椭球
                    SphereID: 2,
                    // 水平比例尺
                    ProjRate: 5000,
                    // 中央子午线经度
                    ProjLon: 1170000
                });
 //设置目的投影参数
 var desProjParam = new Zondy.Service.CProjectParam({
                    // 角度单位为度
                    ProjAngleUnit: 4,
                    // 地理坐标系
                    ProjType: 1,
                    // 地理坐标系
                    ProjTypeID: 0,
                    // 毫米
                    ProjUnit: 1,
                    // 投影带号
                    ProjZoneNO: 20,
                    // 投影类型为6度分带
                    ProjZoneType: 0,
                    // 北京/克拉索夫斯基(1940年)椭球
                    SphereID: 1,
                    // 水平比例尺
                    ProjRate: 1,
                    // 中央子午线经度
                    ProjLon: 1170000
                });
 //初始化投影转换服务
 var projectDotsService = new Zondy.Service.ProjectDots(
 //设置需要投影转换的点数组
 dots,
 //设置源投影参数
 srcProjParam,
 //设置目的投影参数
 desProjParam,
 //设置Options参数,包括服务器地址、端口号、返回结果格式
 {
     //IP地址
     ip: "develop.smaryun.com",
     //端口号
     port: "6163",
     //结果格式
     resultFormat: "json"
 });
 projectDotsService.execute(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
 */
class ProjectDots extends GeometryAnalysisBase {
    constructor(dots, srcparam, desparam, option) {
        var options = option ? option : {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.ProjectDots.prototype.InputDots
         * @type {Zondy.Object.Point2D}
         * @description 投影坐标 Array{@link Zondy.Object.Point2D}
         */
        this.InputDots = dots;

        /**
         * @private
         * @member Zondy.Service.ProjectDots.prototype.SrcProjParam
         * @type {Zondy.Service.CProjectParam}
         * @description 源投影参考
         */
        this.SrcProjParam = srcparam;

        /**
         * @private
         * @member Zondy.Service.ProjectDots.prototype.DesProjParm
         * @type {Zondy.Service.CProjectParam}
         * @description 目的投影参考
         */
        this.DesProjParm = desparam;
    }

    /**
     * @function Zondy.Service.ProjectDots.prototype.execute
     * @description 执行点投影
     * @param {callback} onSuccess 执行成功后的回调函数
     * @param {callback} onError 执行失败后的回调函数
     */
    execute(onSuccess, onError) {
        this.partUrl = "geomservice/projectdots?f=json";

        var postData = {};
        postData['InputDots'] = this.InputDots;
        postData['SrcProjParam'] = this.SrcProjParam;
        postData['DesProjParm'] = this.DesProjParm;
        var url = this.getFullUrl();
        var me = this;
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync({
            method: 'POST',
            data: JSON.stringify(postData),
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8'
            }
        });
    }

}
export {
    ProjectDots
};
Zondy.Service.ProjectDots = ProjectDots;