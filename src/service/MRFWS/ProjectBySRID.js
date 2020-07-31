import {
    Zondy
} from '../common/Base';
import {
    ProjectBase
} from "./ProjectBase";
import {
    extend
} from "../common/Util";

/**
 * 投影服务基类
 * @class module:分析服务.ProjectBySRID
 * @classdesc 投影服务基类
 * @description Zondy.Service.ProjectBySRID
 * @extends Zondy.Service.ProjectBase
 * @param {Object} project 投影参数
 * @param {String} [project.srID = 32] 投影座标系ID
 * @param {Object} option 属性键值对，用来拓展属性
 * @example
 //缓存结果图层的基地址
 var resultBaseUrl = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/";
 //显示结果的图层名称
 var resultname = resultBaseUrl + "overLayByPolyAnalysisResultLayer" + self.getCurentTime();
 //初始化Zondy.Service. ProjectBySRID类
 var projBySRID = new Zondy.Service.ProjectBySRID({
                    //IGServer所在ip地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口号
                    port: "6163",
                    //参照系ID
                    srID: 606
                });
 //需转换的要素类地址，继承于ProjectBase类属性
 projBySRID.clsName = "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区";
 //结果要素类地址，继承ProjectBase类属性
 projBySRID.desClsName = resultname;
 //调用基类的execute方法，执行投影变换， projectLayerSuccess为结果回调函数，服务器请求方式为POST
 projBySRID.execute(function (res) {
                    console.log(res);
                }, "post",function (error) {
                    console.log(error);
                });
 */
class ProjectBySRID extends ProjectBase {
    constructor(project, option) {
        var options = option || {};

        extend(options, project);

        super(options);

        /**
         * @member Zondy.Service.ProjectBySRID.prototype.flowID
         * @type {String}
         * @description 工作流ID
         * @default "600234"
         */
        this.flowID = "600234";

        /**
         * @member Zondy.Service.ProjectBySRID.prototype.srID
         * @type {Number}
         * @description 投影座标系ID
         * @default 32
         */
        this.srID = options.srID !== undefined ? options.srID : 32;
    }
}
export {
    ProjectBySRID
};
Zondy.Service.ProjectBySRID = ProjectBySRID;