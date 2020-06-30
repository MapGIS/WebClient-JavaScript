import {Zondy} from '../../service/common/Base';
import {L} from 'leaflet';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class Zondy.Map.TDTLayer
 * @classdesc  天地图加载类
 * @extends L.TileLayer
 * @param option - {Object} 属性键值对，地图属性字段。<br>
 * @param {String} [option.layerType = 'vec'] 必选。图层类型。
 vec：天地图矢量数据；
 img：天地图影像数据；
 cva：天地图矢量注记数据；
 cia：天地图影像注记数据；
 vec_igs：天地图矢量数据(通过IGS)；
 img_igs：天地图影像数据(通过IGS)；
 cva_igs：天地图矢量注记数据(通过IGS)；
 cia_igs：天地图影像注记数据(通过IGS)
 * @param {String} [option.token] 必选。请求天地图的key值
 * @param {Boolean} [option.isLabel = false] 可选。是否为标签图层
 * @param {String} [option.baseURL] 可选。请求的基地址
 *
 * @param {String} [option.domain = ''] 【domain和（networkProtocol，ip，port）二选一】。域名
 * @param {String} [option.networkProtocol = location.protocol.split(":")[0] || "http"] 【domain和（networkProtocol，ip，port）二选一】。网络协议
 * @param {String} [option.ip = localhost] 【domain和（networkProtocol，ip，port）二选一】。地图服务ip
 * @param {String} [option.port = 6163] 【domain和（networkProtocol，ip，port）二选一】。地图服务端口
 *
 * @param {String} [option.version = '1.0.0'] 可选。请求的地图版本
 * @param {String} [option.style = 'default'] 可选。样式
 * @param {String} [option.tilematrixSet = ''] 可选。瓦片参考系
 * @param {String} [option.tileSize = 256] 可选。瓦片大小
 * @example //常用
 * new Zondy.Map.TDTLayer({
                    //图层类型，必选
                    layerType: 'cva',
                    //设置地图不连续显示，可选
                    noWrap: true,
                    //key，必选
                    token:"4c27d6e0e8a90715b23a989d42272fd8"
                }).addTo(map);
 * @example //通过基地址请求
 * new Zondy.Map.TDTLayer({
                    //设置地图不连续显示，可选
                    noWrap: true,
                    //基地址，必选
                    baseURL:"http://t2.tianditu.gov.cn/cva_c/wmts",
                    //key，必选
                    token:"4c27d6e0e8a90715b23a989d42272fd8"
                }).addTo(map);
 * @example //通过IGS请求
 * new Zondy.Map.TDTLayer({
                    //图层类型，必选
                    layerType: 'cva_igs',
                    //IGServer所在ip地址，必选
                    ip: 'localhost',
                    //IGServer请求端口号，必选
                    port: '6163',
                    //设置地图不连续显示，可选
                    noWrap: true,
                    //key，必选
                    token:"4c27d6e0e8a90715b23a989d42272fd8"
                }).addTo(map);
 */
var TDTLayer = window.L.TileLayer.extend({
    layerLabelMap: {
        "vec": "cva",
        "ter": "cta",
        "img": "cia"
    },
    layerZoomMap: {
        "vec": 18,
        "ter": 14,
        "img": 18
    },
    options: {
        layerType: "vec",    //(vec:矢量图层，cva:矢量标签图层，img:影像图层,cia:影像标签图层，ter:地形,cta:地形标签图层)
        isLabel: false,
        url: "http://t{s}.tianditu.gov.cn/{layer}_{proj}/wmts?",
        zoomOffset: 1,
        dpi: 96,
        style: "default",
        format: "tiles",
        subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
        version: '1.0.0',
        tilematrixSet: '',
        tileSize: 256,
        matrixIds: null,
        layer: '',
        attribution: "天地图"
    },

    initialize: function (options) {
        options = options || {};
        window.L.setOptions(this, options);
        if (this.options.baseURL) {
            var str = this.options.baseURL.split("gov.cn/")[1];
            if (this.options.baseURL.indexOf("?") > 0) {
                str = str.split("?")[0];
            }
            this.options.layerType = str.substring(0, str.length - 7);
        }
        this.options.layer = (this.options.isLabel && this.layerLabelMap[this.options.layerType]) ? this.layerLabelMap[this.options.layerType] : this.options.layerType;
        if (this.options.layerType === "ter") {
            this.options.maxZoom = 14;
        } else {
            this.options.maxZoom = 18;
        }
        this._url = this.options.url;
        this.options.ip = this.options.ip ? this.options.ip : 'localhost';
        this.options.port = this.options.port ? this.options.port : '6163';
        window.L.stamp(this);
    },

    onAdd: function (map) {
        this._crs = this.options.crs || map.options.crs;
        this.options.tilematrixSet = this._crs.code === "EPSG:4326" ? "c" : "w";
        if (this.options.layerType.indexOf("igs") > 0) {
            var url = "http://{ip}:{port}/igs/rest/cts/tianditu/{layerType}/{x}/{y}/{z}?";
            var domain = this.options && this.options.domain ? this.options.domain : '';
            if (domain === '') {
                this.networkProtocol = this.options.networkProtocol !== undefined ? this.options.networkProtocol : location.protocol.split(":")[0] || "http";
                url = this.networkProtocol + '://' + this.options.ip + ':' + this.options.port + "/igs/rest/cts/tianditu/{layerType}/{x}/{y}/{z}?";
            } else {
                url = domain + '/igs/rest/cts/tianditu/{layerType}/{x}/{y}/{z}?';
            }
            var layerType;
            switch (this.options.layerType) {
                case 'vec_igs':
                    layerType = "vector";
                    break;
                case 'img_igs':
                    layerType = "raster";
                    break;
                case 'cva_igs':
                    layerType = "vectorAnno";
                    break;
                case 'cia_igs':
                    layerType = "rasterAnno";
                    break;
                default:
                    layerType = "vector";
                    break;
            }
            this._url = url.replace("{layerType}", layerType);
        } else if (this.options.baseURL) {
            this._url = this.options.baseURL;
            if (this.options.baseURL.indexOf("?") < 0) {
                this._url += "?";
            }
        } else {
            this._url = this._url.replace("{layer}", this.options.layer).replace("{proj}", this.options.tilematrixSet);
        }
        window.L.TileLayer.prototype.onAdd.call(this, map);
    },
    getTileUrl: function (coords) {
        var zoom = this._getZoomForUrl();
        var z = this.options.matrixIds ? this.options.matrixIds[zoom].identifier : zoom;
        var obj = {};
        var url;
        if (this.options.layerType.indexOf("igs") > 0) {
            url = this._url.replace("{x}", coords.x).replace("{y}", coords.y).replace("{z}", z);
        } else {
            url = window.L.Util.template(this._url, {s: this._getSubdomain(coords)});
            obj = {
                request: 'GetTile',
                version: this.options.version,
                style: this.options.style,
                tilematrixSet: this.options.tilematrixSet,
                format: this.options.format,
                width: this.options.tileSize,
                height: this.options.tileSize,
                layer: this.options.layer,
                tilematrix: z,
                tilerow: coords.y,
                tilecol: coords.x
            };
        }
        if (this.options.token) {
            obj.tk = this.options.token;
        }
        url = url + 'service=WMTS';
        return url + window.L.Util.getParamString(obj, url);
    }
});
export {TDTLayer};
Zondy.Map.TDTLayer = TDTLayer;
