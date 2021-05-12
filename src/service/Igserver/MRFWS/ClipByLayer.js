import {
    Zondy
} from '../../common/Base';
import {
    ClipBase
} from "./ClipBase";

/**
 * 图层裁剪
 * @class module:分析服务.ClipByLayer
 * @classdesc 图层裁剪
 * @description Zondy.Service.ClipByLayer
 * @extends Zondy.Service.ClipBase
 * @param {Object} option 属性键值对
 * @param {String} [option.srcInfo1 = null] 源图层URL
 * @param {String} [option.srcInfo2 = null] 裁剪框简单要素类的URL
 * @example
 //缓存结果图层的基地址
 var resultBaseUrl = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/";
 var resultname = resultBaseUrl + "clipByCircleAnalysisResultLayer" + self.getCurentTime();
 //实例化ClipByLayer类
 var clipParam = new Zondy.Service.ClipByLayer({
                    //IGServer所在ip地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口号
                    port: "6163",
                    //源简单要素类的URL
                    srcInfo1: "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流",
                    //裁剪框简单要素类的URL
                    srcInfo2: "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区",
                    //设置结果URL
                    desInfo: resultname
                });
 clipParam.execute(function (res) {
                    console.log(res);
                }, "post",function (error) {
                    console.log(error);
                });
 */
class ClipByLayer extends ClipBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.ClipByLayer.prototype.srcInfo1
         * @type {String}
         * @description 源简单要素类的URL
         * @default null
         */
        this.srcInfo1 = options.srcInfo1 !== undefined ? options.srcInfo1 : null;

        /**
         * @private
         * @member Zondy.Service.ClipByLayer.prototype.srcInfo2
         * @type {String}
         * @description 裁剪框简单要素类的URL
         * @default null
         */
        this.srcInfo2 = options.srcInfo2 !== undefined ? options.srcInfo2 : null;

        /**
         * @private
         * @member Zondy.Service.ClipByLayer.prototype.flowID
         * @type {String}
         * @description 工作流ID
         * @default "600230"
         */
        this.flowID = "600230";
    }
}
export {
    ClipByLayer
};
Zondy.Service.ClipByLayer = ClipByLayer;