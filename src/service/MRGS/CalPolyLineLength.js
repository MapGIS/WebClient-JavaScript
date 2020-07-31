import {
    Zondy
} from '../common/Base';
import {
    CalServiceBase
} from "./CalServiceBase";
import {
    extend
} from "../common/Util";
import {
    Point2D
} from "../common/Point2D";

/**
 * 折线长度计算服务
 * @class module:几何分析服务.CalPolyLineLength
 * @classdesc 折线长度计算服务
 * @description Zondy.Service.CalPolyLineLength
 * @extends Zondy.Service.CalServiceBase
 * @param {Zondy.Object.Point2D} obj 需要计算的点数组 Array<{@link Zondy.Object.Point2D}>
 * @param {Object} option 属性键值对,拓展属性,为其他属性赋值的键值对
 * @example
 //设置要计算长度的几何对象点集
 var dots = [new Zondy.Object.Point2D(15, 23), new Zondy.Object.Point2D(54, 96), new Zondy.Object.Point2D(65, 42)];
 //初始化长度测量服务
 var calLength = new Zondy.Service.CalPolyLineLength(dots, {
                    //IP地址
                    ip: "develop.smaryun.com",
                    //端口号
                    port: "6163"
                });
 //建议普通用户采用此类直接获取MapGIS GDB已经提供的空间参考系
 var gdbInfo = new Zondy.Object.CGDBInfo({
                    //数据库名称
                    GDBName: "OpenLayerVecterMap",
                    //数据源名称
                    ServerName: "MapGISLocal",
                    //除MapGISLocal数据源，其它的都设置
                    Password: "",
                    //除MapGISLocal数据源，其它的都设置
                    User: ""
                });
 //用于进行SRSID投影的参数类
 var projBySRSID = new Zondy.Service.CProjectBySRSID(601, gdbInfo);
 calLength.execute(projBySRSID, function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
 */
class CalPolyLineLength extends CalServiceBase {
    constructor(obj, option) {
        var options = option ? option : {};
        extend(options, {
            "dots": obj
        });
        super(options);

        /**
         * @private
         * @member Zondy.Service.CalPolyLineLength.prototype.partUrl
         * @type {String}
         * @description 地址路径
         * @default "geomservice/calLength?f=json"
         */
        this.partUrl = "geomservice/calLength?f=json";
    }
}
export {
    CalPolyLineLength
};
Zondy.Service.CalPolyLineLength = CalPolyLineLength;