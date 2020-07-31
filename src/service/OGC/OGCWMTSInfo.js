import {Zondy} from '../common/Base';
import {ServiceBase} from "../ServiceBase";
import axios
    from 'axios';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:OGC服务.OGCWMTSInfo
 * @classdesc  OGC-WMTS信息类
 * @description Zondy.OGC.OGCWMTSInfo 获取OGC WMTS 信息类
 * @extends  Zondy.Service.ServiceBase
 * @param option - {Object} 属性字段
 * @param {String} [option.ip = "localhost"] 必须。服务器ip。(getWMTSInfo,getFeatureInfo)
 * @param {String} [option.port = "6163"] 必须。服务器端口。(getWMTSInfo,getFeatureInfo)
 * @param {String} [option.serverName] 必须。服务名称。(getFeatureInfo)
 * @param {String} [option.name] 必须。瓦片名称。(getFeatureInfo)
 * @param {String} [option.tileMatrixSet] 必须。瓦片参考系。(getFeatureInfo)
 * @param {String} [option.tileMatrix] 必须。级数。(getFeatureInfo)
 * @param {String} [option.tileRow] 必须。行号。(getFeatureInfo)
 * @param {String} [option.tileCol] 必须。列号。(getFeatureInfo)
 * @param {String} [option.I] 必须。图块中像素的行号。(getFeatureInfo)
 * @param {String} [option.J] 必须。图块中像素的列号。(getFeatureInfo)
 * @param {String} [option.version = "1.0.0"] 可选。请求的版本号，支持1.0.0版本。(getFeatureInfo)
 * @param {String} [option.format = "image/png"] 可选。图块输出格式，image/png或image/jpeg。(getFeatureInfo)
 * @param {String} [option.infoFormat = "text/html"] 可选。返回值的格式，text/html、text/plain或application/vnd.ogc.gml。(getFeatureInfo)
 */
class OGCWMTSInfo extends ServiceBase {
    constructor(option) {
        var options = option || {};
        super(options);
        options.baseUrl = "igs/rest/ogc";

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.ip
         * @type {String}
         * @description 服务器ip
         * @default localhost
         */
        this.ip = options.ip || "localhost";

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.port
         * @type {String}
         * @description 服务器port
         * @default 6163
         */
        this.port = options.port || "6163";

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.baseUrl
         * @type {String}
         * @description 查询路径的基础字段
         */
        this.baseUrl = options.baseUrl;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.version
         * @type {String}
         * @description 请求的版本号，支持1.0.0版本
         * @default 1.0.0
         */
        this.version = options.version || '1.0.0';

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.serverName
         * @type {String}
         * @description 服务名称
         */
        this.serverName = options.serverName;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.name
         * @type {String}
         * @description 瓦片名称
         */
        this.name = options.name;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.style
         * @type {String}
         * @description 图层样式
         * @default default
         */
        this.style = options.style || 'default';

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.tileMatrixset
         * @type {String}
         * @description 块阵集，即瓦片矩阵名称，主要由坐标系唯一确定
         */
        this.tileMatrixset = options.tileMatrixset;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.tileMatrix
         * @type {String}
         * @description 级数
         */
        this.tileMatrix = options.tileMatrix;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.tileRow
         * @type {String}
         * @description 行号
         */
        this.tileRow = options.tileRow;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.tileCol
         * @type {String}
         * @description 列号
         */
        this.tileCol = options.tileCol;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.format
         * @type {String}
         * @description 图块输出格式，image/png或image/jpeg
         * @default image/png
         */
        this.format = options.format || 'image/png';

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.infoFormat
         * @type {String}
         * @description 返回值的格式，text/html、text/plain或application/vnd.ogc.gml
         * @default text/html
         */
        this.infoFormat = options.infoFormat || 'text/html';

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.I
         * @type {String}
         * @description 图块中像素的行号
         */
        this.I = options.I;

        /**
         * @private
         * @member  Zondy.OGC.OGCWMTSInfo.prototype.J
         * @type {String}
         * @description 图块中像素的列号
         */
        this.J = options.J;
    }

    /**
     * @description 获取WMTS信息
     * @function  Zondy.OGC.OGCWMTSInfo.prototype.getWMTSInfo
     * @param onSuccess -{Function} 获取WMTS信息成功回调函数
     * @param onError -{Function} 获取WMTS信息失败回调函数
     * @example
     var wmtsInfo = new Zondy.OGC.OGCWMTSInfo({
            ip: "localhost",
            port: "6163"
        });
     wmtsInfo.getWMTSInfo(function onSuccess(res) {
            var parser = new Zondy.Format.WMTSCapabilities();
            var result = parser.read(res.data);
            console.log(result);
        }, function onError(error) {
            console.log(error);
        });
     */
    getWMTSInfo(onSuccess, onError) {
        var me = this;
        let partUrl = '';
        if (me.serverName && me.serverName !== '') {
            partUrl += me.serverName + "/"
        }
        partUrl += "WMTSServer/1.0.0/WMTSCapabilities.xml";
        me.partUrl = partUrl;
        var url = me.getFullUrl();
        axios({
            method: 'get',
            url: url
        }).then(onSuccess).catch(onError);
    }

    /**
     * @description 要素拾取
     * @function  Zondy.OGC.OGCWMTSInfo.prototype.getFeatureInfo
     * @param onSuccess -{Function} 获取WMTS信息成功回调函数
     * @param onError -{Function} 获取WMTS信息失败回调函数
     * @example
     var wmtsInfo = new Zondy.OGC.OGCWMTSInfo({
            ip: "localhost",
            port: "6163",
            serverName: '234',
            name: '234',
            tileMatrixSet: 'EPSG:4610_DC2017G_028mm',
            tileMatrix: 1,
            tileRow: 0,
            tileCol: 0,
            I: 141,
            J: 82
        });
     wmtsInfo.getFeatureInfo(function onSuccess(res) {
            console.log(res);
        }, function onError(error) {
            console.log(error);
        });
     */
    getFeatureInfo(onSuccess, onError) {
        var me = this;
        me.partUrl = 'WMTSServer?service=WMTS&request=GetFeatureInfo&version=' + me.version + '&layer=' + me.serverName + ':' + me.name + '&style=' + me.style + '&TileMatrixSet=' + me.tileMatrixSet + '&TileMatrix=' + me.tileMatrix + '&TileRow=' + me.tileRow + '&TileCol=' + me.tileCol + '&format=' + me.format + '&InfoFormat=' + me.infoFormat + '&I=' + me.I + '&J=' + me.J;
        var url = me.getFullUrl();
        axios({
            method: 'get',
            url: url
        }).then(onSuccess).catch(onError);
    }
}

export {OGCWMTSInfo};
Zondy.OGC.OGCWMTSInfo = OGCWMTSInfo;
