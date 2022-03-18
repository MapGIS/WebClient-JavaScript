import { Zondy } from '../../service/common/Base';
import { L } from 'leaflet';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class Zondy.Map.MapWMTSLayer
 * @classdesc  WMTS地图加载类。可使用接口Zondy.OGC.OGCWMTSInfo获取Capabilities信息
 * @extends L.TileLayer
 * @param gdbps - {String} 必选。图层的gdbps地址，允许多个图层，以“,”隔开
 * @param option - {Object} 属性键值对，地图属性字段。
 * @param {String} [option.domain = ''] 【domain和（networkProtocol，ip，port）二选一】。域名
 * @param {String} [option.networkProtocol = location.protocol.split(":")[0] || "http"] 【domain和（networkProtocol，ip，port）二选一】。网络协议
 * @param {String} [option.ip = localhost] 【domain和（networkProtocol，ip，port）二选一】。地图服务ip
 * @param {String} [option.port = 6163] 【domain和（networkProtocol，ip，port）二选一】。地图服务端口
 *
 * @param {String} [option.tilematrixSet = ] 必选。块阵集，即瓦片矩阵名称，主要由坐标系唯一确定。瓦片参考系，例如“EPSG:4326_WhMap”
 * @param {String} [option.layer = ] 必选。瓦片数据名称，根据发布的WMTS服务信息设置。格式为“服务名称:瓦片名称”，例如“TileTest1:WhMap”
 * @param {String} [option.serverName = '' ] 可选。服务名
 * @param {String} [option.format = image/png ] 可选。图块输出格式。image/png或image/jpeg
 * @param {String} [option.tileSize = 256] 可选。瓦片大小
 * @param {String} [option.version = 1.0.0] 可选。WMTS版本
 * @param {String} [option.tokenKey = ""] 可选。token的key值（token/tk）
 * @param {String} [option.token = ""] 可选。token值
 * @example
 new Zondy.Map.MapWMTSLayer({
                    //IGServer所在ip地址
                    ip: "localhost",
                    //IGServer请求端口号
                    port: "6163",
                    //块阵集
                    tilematrixSet: tilematrixSet,
                    //wmts服务名称
                    layer: serverName,
                    //设置地图不连续显示
                    noWrap: true,
                })
 */
var MapWMTSLayer = window.L.TileLayer.extend({
    options: {
        version: '1.0.0',
        style: '',
        serverName: '', //服务名
        tilematrixSet: '', //矩阵集名称
        layer: '', //图层名
        format: 'image/png',
        tileSize: 256,
        attribution: 'Zondy WMTS Data',
        noWrap: true
    },
    //var layer3 = new ZondyMapWMTSLayer("http://localhost:6163/igs/rest/ogc/WMTSServer", { tilematrixSet: "EPSG:4326_世界地图经纬度LEVEL7_028mm_GB", layer: 'World_level7_WMTS' }).addTo(mymap);
    //
    initialize: function (options) {
        // (String, Object)
        if (options.url) {
            if (options.url.indexOf('?') > -1) {
                this._url = options.url.split('?')[0];
            } else {
                this._url = options.url;
            }
        } else {
            var partUrl = '/igs/rest/ogc/WMTSServer';
            if (options.serverName && options.serverName !== '') {
                partUrl = '/igs/rest/ogc/' + options.serverName + '/WMTSServer';
            }
            var domain = options && options.domain ? options.domain : '';
            if (domain === '') {
                this.networkProtocol = options.networkProtocol !== undefined ? options.networkProtocol : location.protocol.split(':')[0] || 'http';
                var ip = options && options.ip ? options.ip : 'localhost';
                var port = options && options.port ? options.port : '6163';
                this._url = encodeURI(this.networkProtocol + '://' + ip + ':' + port + partUrl);
            } else {
                this._url = encodeURI(domain + partUrl);
            }
        }
        if (this._url.toLowerCase().indexOf('ime-cloud') > -1) {
            //吉威的数据
            this._url += '?service=WMTS&REQUEST=GetTile';
        } else {
            this._url += '?service=WMTS&request=GetTile';
        }
        this.options.origin = options.origin ? options.origin : null;
        window.L.setOptions(this, options);
    },
    onAdd: function (map) {
        this._crs = this.options.crs || map.options.crs;
        let bounds = this._crs.projection.bounds;
        let northWest = [bounds.min.x, bounds.max.y];
        this._origin = this.options.origin ? this.options.origin : northWest;
        window.L.TileLayer.prototype.onAdd.call(this, map);
    },
    /**
     * @private
     * @function Zondy.Map.MapWMTSLayer.prototype.getTileUrl
     * @description 根据行列号获取瓦片地址。考虑发布的wmts的瓦片不按左上角为原点的情况，需另外处理
     * @param coords - {Object} 行列号
     * @return {string} 瓦片地址
     */
    getTileUrl: function (coords) {
        // (Point, Number) -> String
        // var tileBounds = this._tileCoordsToBounds(coords);
        // var ne = this._crs.project(tileBounds.getNorthEast());
        // var sw = this._crs.project(tileBounds.getSouthWest());
        // var tileSize = this.options.tileSize;
        // var resolution = Math.max(Math.abs(ne.x - sw.x) / tileSize, Math.abs(ne.y - sw.y) / tileSize);
        //
        // var centerPnt = [(ne.x + sw.x) / 2, (ne.y + sw.y) / 2];
        // var dx = centerPnt[0] - (this._origin)[0];
        // var dy = centerPnt[1] - (this._origin)[1];
        //
        // var xGrid = -1e8;
        // var yGrid = -1e8;
        //
        // xGrid = Math.floor(dx / (tileSize * resolution));
        // if (this.options.yAxis === 'down') {
        // 	yGrid = Math.floor(-dy / (tileSize * resolution));
        // } else {
        // 	yGrid = Math.floor(dy / (tileSize * resolution));
        // }

        var zoom = this._getZoomForUrl();
        var url = window.L.Util.template(this._url, { s: this._getSubdomain(coords) });

        var obj = {
            version: this.options.version,
            style: this.options.style,
            tilematrixSet: this.options.tilematrixSet,
            format: this.options.format,
            layer: this.options.layer,
            tilematrix: zoom,
            tilerow: coords.y,
            tilecol: coords.x
        };

        //根据地图的不同，拼装不同的url参数
        if (url.indexOf('tianditu') > -1) {
            obj.tilematrixSet = 'c';
        } else if (url.indexOf('geoserver') > -1) {
            obj.tilematrix = this.options.tilematrixSet + ':' + zoom;
        }

        if (this.options.token) {
            if (this.options.tokenKey) {
                obj[this.options.tokenKey] = this.options.token;
            } else {
                if (url.indexOf('tianditu') > -1) {
                    obj.tk = this.options.token;
                } else {
                    obj.token = this.options.token;
                }
            }
        }

        return url + window.L.Util.getParamString(obj, url);
    }
});

export { MapWMTSLayer };
Zondy.Map.MapWMTSLayer = MapWMTSLayer;
