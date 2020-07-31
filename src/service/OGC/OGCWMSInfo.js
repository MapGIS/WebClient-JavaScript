import {Zondy} from '../common/Base';
import {ServiceBase}  from  "../ServiceBase";
import axios from 'axios';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:OGC服务.OGCWMSInfo
 * @classdesc  OGC-WMS信息类
 * @description  Zondy.OGC.OGCWMSInfo 获取OGC WMS 信息类
 * @extends  Zondy.Service.ServiceBase
 * @param option - {Object} 属性字段
 * @param {String} [option.ip = "localhost"] 必选。服务器ip。(getWMSInfo,getFeatureInfo)
 * @param {String} [option.port = "6163"] 必选。服务器端口。(getWMSInfo,getFeatureInfo)
 * @param {String} [option.serverType] 必选。查询的服务类型。(getWMSInfo,getFeatureInfo)
 * @param {String} [option.serverName] 必选。查询的服务名。(getWMSInfo,getFeatureInfo)
 * @param {String} [option.version = "1.1.1"] 可选。请求的版本号,1.1.1或1.3.0，服务默认版本为1.1.1。(getWMSInfo,getFeatureInfo)
 * @param {String} [option.layersName] 必选。请求的图层名，用逗号分隔多个图层；既支持单纯的图层名，也支持服务名称（图层名）。(getFeatureInfo)
 * @param {String} [option.srs] 必选。空间坐标参考系。(getFeatureInfo)
 * @param {String} [option.bbox] 必选。显示范围，坐标用minx,miny,maxx,maxy表示（1.1.1版本）,坐标用miny,minx,maxy,maxx表示（1.3.0版本），与srs对应设置可以达到动态投影的效果。(getFeatureInfo)
 * @param {String} [option.width = "1024"] 可选。输出地图图片的象素宽。(getFeatureInfo)
 * @param {String} [option.height = "768"] 可选。输出地图图片的象素高。(getFeatureInfo)
 * @param {String} [option.I] 必选。目标图形上进行点查询时的水平方向像素值。(getFeatureInfo)
 * @param {String} [option.J] 必选。目标图形上进行点查询时的垂直方向像素值。(getFeatureInfo)
 * @param {String} [option.style = "default"] 可选。图层样式，用逗号分隔各图层对应的样式。(getFeatureInfo)
 * @param {String} [option.format = "image/png"] 可选。输出图象的类型,支持三种格式gif、png、jpg。(getFeatureInfo)
 * @param {String} [option.infoFormat = "text/html"] 可选。返回要素信息的格式，1.1.1版本支持以下三种格式：application/vnd.ogc.gml，text/plain，text/html;
 * 1.3.0版本支持以下三种格式：text/xml，text/plain，text/html。(getFeatureInfo)
 */
class OGCWMSInfo extends ServiceBase {
    constructor(option) {
        var options = option || {};
        super(options);
        options.baseUrl = "igs/rest/ogc";

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.ip
         * @type {String}
         * @description 服务器ip
         * @default localhost
         */
        this.ip = options.ip || "localhost";

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.port
         * @type {String}
         * @description 服务器port
         * @default 6163
         */
        this.port = options.port || "6163";

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.baseUrl
         * @type {String}
         * @description 查询路径的基础字段
         */
        this.baseUrl = options.baseUrl;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.serverType
         * @type {String}
         * @description 查询的服务类型
         */
        this.serverType = options.serverType;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.serverName
         * @type {String}
         * @description 查询的服务名
         */
        this.serverName = options.serverName;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.version
         * @type {String}
         * @description 请求的版本号,1.1.1或1.3.0，服务默认版本为1.1.1
         */
        this.version = options.version || "1.1.1";

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.layersName
         * @type {String}
         * @description 请求的图层名，用逗号分隔多个图层；既支持单纯的图层名，也支持服务名称（图层名）
         */
        this.layersName = options.layersName;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.style
         * @type {String}
         * @description 图层样式，用逗号分隔各图层对应的样式
         * @default default
         */
        this.style = options.style || "default";

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.srs
         * @type {String}
         * @description 空间坐标参考系
         */
        this.srs = options.srs;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.bbox
         * @type {String}
         * @description 显示范围，坐标用minx,miny,maxx,maxy表示（1.1.1版本），与srs对应设置可以达到动态投影的效果;坐标用miny,minx,maxy,maxx表示（1.3.0版本），与crs对应设置可以达到动态投影的效果（设置crs为地理坐标系时如EPSG:4326、EPSG:4214等）
         */
        this.bbox = options.bbox;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.width
         * @type {String}
         * @description 输出地图图片的象素宽
         * @default 1024
         */
        this.width = options.width || "1024";

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.height
         * @type {String}
         * @description 输出地图图片的象素高
         * @default 768
         */
        this.height = options.height || "768";

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.format
         * @type {String}
         * @description 输出图象的类型,支持三种格式gif、png、jpg
         * @default image/png
         */
        this.format = options.format || "image/png";

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.infoFormat
         * @type {String}
         * @description 返回要素信息的格式，1.1.1版本支持以下三种格式：application/vnd.ogc.gml，text/plain，text/html，1.3.0版本支持以下三种格式：text/xml，text/plain，text/html。
         * @default text/html
         */
        this.infoFormat = options.infoFormat || "text/html";

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.I
         * @type {String}
         * @description 目标图形上进行点查询时的水平方向像素值
         */
        this.I = options.I;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMSInfo.prototype.J
         * @type {String}
         * @description 目标图形上进行点查询时的垂直方向像素值
         */
        this.J = options.J;
    }

    /**
     * @description 获取WMS信息
     * @function  Zondy.OGC.OGCWMSInfo.prototype.getWMSInfo
     * @param onSuccess -{Function} 获取WMTS信息成功回调函数
     * @param onError -{Function} 获取WMTS信息失败回调函数
     * @example
     var wmsInfo = new Zondy.OGC.OGCWMSInfo({
            ip: "localhost",
            port: "6163",
            serverName: "zhuanti",
            serverType: "layer",
            version: "1.1.1"
        });
     wmsInfo.getWMSInfo(function onSuccess(res) {
            var parser = new Zondy.Format.WMSCapabilities();
            var result = parser.read(res.data);
            console.log(result);
        }, function onError(error) {
            console.log(error);
        });
     */
    getWMSInfo(onSuccess, onError) {
        var me = this;
        me.partUrl = me.serverType + "/" + me.serverName + "/WMSServer?service=WMS&REQUEST=GetCapabilities&version=" + me.version;
        var url = me.getFullUrl();
        axios({
            method: 'get',
            url: url
        }).then(onSuccess).catch(onError);
    }

    /**
     * @description 要素拾取
     * @function  Zondy.OGC.OGCWMSInfo.prototype.getFeatureInfo
     * @param onSuccess -{Function} 获取WMTS信息成功回调函数
     * @param onError -{Function} 获取WMTS信息失败回调函数
     * @example
     var wmsInfo = new Zondy.OGC.OGCWMSInfo({
                    ip: "localhost",
                    port: "6163",
                    serverName: "zhuanti",
                    serverType: "layer",
                    version: "1.1.1",
                    layersName: ["省级行政区x", "省会城市"],
                    srs: "",
                    bbox: [73.4507840311814, 18.163867376307, 134.976488196105, 53.5323367652971],
                    width: '1024',
                    height: '768',
                    I: 639,
                    J: 468
                });
     wmsInfo.getFeatureInfo(function (res) {
            console.log(res);
        }, function onError(error) {
            console.log(error);
        });
     */
    getFeatureInfo(onSuccess, onError){
        var me = this;
        me.partUrl = me.serverType + '/' + me.serverName + '/WMSServer?layers=' + me.layersName + '&version='+ me.version +'&service=WMS&request=GetFeatureInfo&styles='+ me.style +'&format='+ me.format +'&bbox=' + me.bbox + '&width='+ me.width +'&height='+ me.height +'&query_Layers=' + me.layersName + '&info_Format='+ me.infoFormat;
        if (me.version === '1.1.1') {
            me.partUrl += '&srs=' + me.srs + '&&X=' + me.I + '&Y=' + me.J;
        } else if (me.version === '1.3.0') {//服务元数据的输出格式，1.3.0版本的请求参数（暂不支持）
            me.partUrl += '&crs=' + me.srs + '&&I=' + me.I + '&J=' + me.J;
        }
        var url = me.getFullUrl();
        axios({
            method: 'get',
            url: url
        }).then(onSuccess).catch(onError);
    }

}
export {OGCWMSInfo};
Zondy.OGC.OGCWMSInfo = OGCWMSInfo;
