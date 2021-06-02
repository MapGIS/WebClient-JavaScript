import {
    Zondy
} from '../../common/Base';
import {
    ClipBase
} from "./ClipBase";

/**
 * 圆裁剪
 * @class module:分析服务.ClipByCircle
 * @classdesc 圆裁剪
 * @description Zondy.Service.ClipByCircle
 * @extends Zondy.Service.ClipBase
 * @param {Object} option 属性键值对
 * @param {String} [option.srcInfo = null] 源图层URL
 * @param {String} [option.center = null] 圆点坐标，string：x,y
 * @param {Number} [option.radius = null] 半径长度
 * @param {Number} [option.step = 0.001] 离散化步长
 * @example
 //缓存结果图层的基地址
 var resultBaseUrl = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/";
 var resultname = resultBaseUrl + "clipByCircleAnalysisResultLayer" + getCurentTime();
 var clipParam = new Zondy.Service.ClipByCircle({
        //IGServer所在ip地址
        ip: "develop.smaryun.com",
        //IGServer请求端口号
        port: "6163",
        //设置圆心坐标
        center: "88.62, 47.09",
        //设置圆半径长度    
        radius: 50,
        //设置被裁剪图层URL 	        
        srcInfo: "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区",
        //设置结果URL 		
        desInfo: resultname
    });
 clipParam.execute(function (res) {
                    console.log(res);
                }, "post",function (error) {
                    console.log(error);
                });
 */
class ClipByCircle extends ClipBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.ClipByCircle.prototype.srcInfo
         * @type {String}
         * @description 源图层URL
         * @default null
         */
        this.srcInfo = options.srcInfo !== undefined ? options.srcInfo : null;

        /**
         * @private
         * @member Zondy.Service.ClipByCircle.prototype.center
         * @type {String}
         * @description 圆点坐标，string：x,y
         * @default null
         */
        this.center = options.center !== undefined ? options.center : null;

        /**
         * @private
         * @member Zondy.Service.ClipByCircle.prototype.radius
         * @type {Number}
         * @description 半径长度 float
         * @default null
         */
        this.radius = options.radius !== undefined ? options.radius : null;

        /**
         * @private
         * @member Zondy.Service.ClipByCircle.prototype.step
         * @type {Number}
         * @description 离散化步长
         * @default null
         */
        this.step = options.step !== undefined ? options.step : 0.001;

        /**
         * @private
         * @member Zondy.Service.ClipByCircle.prototype.flowID
         * @type {String}
         * @description 工作流ID
         * @default "600229"
         */
        this.flowID = "600229";
    }
}
export {
    ClipByCircle
};
Zondy.Service.ClipByCircle = ClipByCircle;