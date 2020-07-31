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
 * @class module:分析服务.ProjectByLayer
 * @classdesc 投影服务基类
 * @description Zondy.Service.ProjectByLayer
 * @extends Zondy.Service.ProjectBase
 * @param {Object} project 属性键值对
 * @param {Number} [project.projTypeID = 23] 投影类型 0地理坐标系，1UTM，2兰伯特等角圆锥投影坐标系
 * @param {Number} [project.sphereType = 2] 椭球体类型，2为西安80
 * @param {Number} [project.projAngleUnit = 5] 弧度单位，1为毫米，2为米，3为秒，4为度，6为英尺，7为分，8为弧度
 * @param {Number} [project.projType = 0] 坐标系类型，0为自定义坐标系、1地理坐标系，3投影平面直角坐标系
 * @param {Number} [project.projZoneType = 0] 投影分带类型
 * @param {Number} [project.projZoneNO = 0] 投影带号
 * @param {Number} [project.projLon = 0] 中央子午线经度
 * @param {Number} [project.projLat = 0] 投影原点纬度
 * @param {Number} [project.projLat1 = 0] 第一标准维度
 * @param {Number} [project.projLat2 = 0] 第二标准维度
 * @param {Number} [project.projUnit = 2] 水平单位，1为毫米，2为米，3为秒，4为度，6为英尺，7为分，8为弧度，详细请参见EnumProjAngleUnit
 * @param {Number} [project.projRate = 1] 水平比例尺
 * @param {Number} [project.x = 0] 投影偏移x
 * @param {Number} [project.y = 0] 投影偏移y
 * @param {Object} option 属性键值对，用来拓展属性
 * @example
 //缓存结果图层的基地址
 var resultBaseUrl = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/";
 //显示结果的图层名称
 var resultname = resultBaseUrl + "overLayByPolyAnalysisResultLayer" + self.getCurentTime();
 var projByLayer = new Zondy.Service.ProjectByLayer({
                    //设置服务ip
                    ip: "develop.smaryun.com",
                    //设置端口号
                    port: "6163",
                    //投影类型，0地理坐标系，1UTM，2兰伯特等角圆锥投影坐标系
                    projTypeID: 23,
                    //椭球体类型，2为西安80
                    sphereType: 2,
                    //弧度单位，1为毫米，2为米，3为秒，4为度，6为英尺，7为分，8为弧度
                    projAngleUnit: 5,
                    //坐标系类型，0为自定义坐标系、1地理坐标系，3投影平面直角坐标系
                    projType: 0,
                    //投影分带类型
                    projZoneType: 0,
                    //投影带号
                    projZoneNO: 0,
                    //中央子午线经度
                    projLon: 0,
                    //投影原点纬度
                    projLat: 0,
                    //第一标准维度
                    projLat1: 0,
                    //第二标准维度
                    projLat2: 0,
                    //水平单位，1为毫米，2为米，3为秒，4为度，6为英尺，7为分，8为弧度，详细请参见EnumProjAngleUnit
                    projUnit: 2,
                    //水平比例尺
                    projRate: 1,
                    x: 0,
                    y: 0,
                    resultName: "rel"
                });
 //需转换的要素类地址，继承于ProjectBase类属性
 projByLayer.clsName = "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区";
 //结果要素类地址，继承ProjectBase类属性
 projByLayer.desClsName = resultname;
 projByLayer.execute(function (res) {
                    console.log(res);
                }, "post",function (error) {
                    console.log(error);
                });
 */
class ProjectByLayer extends ProjectBase {
    constructor(project, option) {
        var options = option || {};
        extend(options, project);

        super(options);

        /**
         * @private
         * @member Zondy.Service.ProjectByLayer.prototype.flowID
         * @type {String}
         * @description 工作流ID
         * @default "600235"
         */
        this.flowID = "600235";
    }
}
export {
    ProjectByLayer
};
Zondy.Service.ProjectByLayer = ProjectByLayer;