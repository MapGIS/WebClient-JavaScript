import {Zondy} from './mapboxBase';
//import {Zondy} from '../../service/common/Base';
import {
    newGuid,
    extend
} from '../../service/common/Util';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class mapboxgl.Zondy.Map.MapWmsLayer
 * @classdesc  WMS地图加载类。可使用接口Zondy.OGC.OGCWMSInfo获取Capabilities信息
 * @param option - {Object} 属性键值对，地图属性字段。
 * @param {String} [option.domain = ''] 【domain和（networkProtocol，ip，port）二选一】。域名
 * @param {String} [option.networkProtocol = location.protocol.split(":")[0] || "http"] 【domain和（networkProtocol，ip，port）二选一】。网络协议
 * @param {String} [option.ip = localhost] 【domain和（networkProtocol，ip，port）二选一】。地图服务ip
 * @param {String} [option.port = 6163] 【domain和（networkProtocol，ip，port）二选一】。地图服务端口
 *
 * @param {String} [option.serverType ] 必选。服务类型，doc/layer
 * @param {String} [option.serverName ] 必选。服务名
 * @param {String} [option.layers = null] 必选。要显示的图层名集合
 * @param {String} [option.format = image/png ] 可选。图块输出格式。image/gif，image/png，image/jpeg
 * @param {String} [option.version = 1.0.0] 可选。WMS版本，1.1.1(默认)或1.3.0
 * @param {String} [option.srs ='EPSG:4326'] 可选。空间坐标参考系，只在版本1.1.1中有效,如EPSG:4326
 * @param {String} [option.crs ='EPSG:4326'] 可选。空间坐标参考系，只在版本1.3.0中有效,如crs:80
 * @param {String} [option.width = '256'] 可选。输出地图图片的象素宽,像素值，如256
 * @param {String} [option.height = '256'] 可选。输出地图图片的象素高,像素值，如256
 * @param {String} [option.tileSize = 512] 可选。瓦片大小
 * @param {String} [option.layerID] 可选。
 * @param {String} [option.sourceID] 可选。
 * @example
 //地图容器
 var map = new mapboxgl.Map({
        container: 'map', // 容器id
        crs: 'EPSG:4326',//mapboxgl原生只支持3857
        center: [101.74721254733845, 32.5665352689922],
        zoom: 3
    });
 //wms图层
 new mapboxgl.Zondy.Map.MapWmsLayer({
        //IGServer所在ip地址
        ip: "localhost",
        //IGServer请求端口号
        port: "6163",
        serverType:'layer',
        serverName:'wms',
        //wmts服务名称
        layers: ["省级行政区x","中国地级县x"],
        //设置地图不连续显示
        noWrap: true,
    }).addToMap(map);
 */
var MapWmsLayer = function (option) {
    var option = option ? option : {};
    var domain = option && option.domain ? option.domain : '';
    if (domain === '') {
        this.networkProtocol = option.networkProtocol !== undefined ? option.networkProtocol : location.protocol.split(":")[0] || "http";
        var ip = option && option.ip ? option.ip : 'localhost';
        var port = option && option.port ? option.port : '6163';
        this.url = this._url = encodeURI(this.networkProtocol + '://' + ip + ':' + port + '/igs/rest/ogc/' + option.serverType + '/' + option.serverName + '/WMSServer');
    } else {
        this.url = this._url = encodeURI(domain + '/igs/rest/ogc/' + option.serverType + '/' + option.serverName + '/WMSServer');
    }
    this.options = {
        layers: null,
        styles: null,
        //图像类型：jpg,png,gif
        format: 'image/png',
        service: 'WMS',
        version: '1.1.1',
        request: 'GetMap',
        width: '256',
        height: '256',
        srs: 'EPSG:4326',
        crs: 'EPSG:4326',
        guid: null,
        //keepCache设置为true时，会首先从客户端缓存中取瓦片，否则不从客户端缓存中提取
        keepCache: true,
        attribution: "Zondy WMS Data"
    };
    this.layerID = option.layerID ? option.layerID : null;
    this.sourceID = option.sourceID ? option.sourceID : null;
    this.map = null;
    extend(this.options, option);
};

/***
 * @description 将地图加载到地图容器中
 * @function mapboxgl.Zondy.Map.MapWmsLayer.prototype.addToMap
 * @param map 地图对象
 * @returns {mapboxgl.Zondy.Map.MapWmsLayer}
 */
MapWmsLayer.prototype.addToMap = function (map) {
    this.map = map;
    this._initLayerUrl();

    var sourceID = this.sourceID || "source_" + newGuid();
    var layerID = this.layerID || "layer_" + newGuid();
    this.wms_source = {
        'type': 'raster',//数据源类型，因为wms返回图片数据，因此为该类型
        'tiles': [this._layerUrl],
        'tileSize': this.options.tileSize || 512 //图片显示的大小，最好和上面大小保持一致
    };
    this.mLayer = {
        'id': layerID,//图层ID
        'type': 'raster',//图层类型
        'source': sourceID
    };

    if (this.map.getStyle()) {
        if (this.map.getSource(sourceID) === undefined) {
            this.map.addSource(sourceID, this.wms_source);
            this.sourceID = sourceID;
        }
        if (this.map.getLayer(layerID) === undefined) {
            this.map.addLayer(this.mLayer);
            this.layerID = layerID;
        }
        return this;
    } else {
        this.map.setStyle({
            "version": 8,
            "sources": {},
            "layers": []
        });
        var me = this;
        me.map.on('load', function () {
            me.map.addSource(sourceID, me.wms_source);
            me.sourceID = sourceID;
            me.map.addLayer(me.mLayer);
            me.layerID = layerID;
            return me;
        });
    }
};

MapWmsLayer.prototype._initLayerUrl = function () {
    var me = this;
    var layerUrl = me.url + "?";
    layerUrl += encodeURI(me._initAllRequestParams().join('&'));
    layerUrl += '&bbox={bbox}';
    this._layerUrl = layerUrl;
};

MapWmsLayer.prototype._initAllRequestParams = function () {
    var me = this,
        options = me.options || {},
        params = [];
    if (options.version) {
        params.push("version=" + options.version);
    }
    if (options.request) {
        params.push("request=" + options.request);
    }
    if (options.version === '1.1.1') {
        params.push("srs=" + options.srs);
    } else if (options.version === '1.3.0') {
        params.push("crs=" + options.crs);
    }
    if (options.service) {
        params.push("service=" + options.service);
    }
    if (options.layers) {
        params.push("layers=" + options.layers);
    }
    if (options.filters) {
        params.push("filters=" + options.filters);
    }
    if (options.styles) {
        params.push("styles=" + JSON.stringify(options.styles));
    } else {
        params.push("styles=");
    }
    if (options.format) {
        params.push("format=" + options.format);
    } else {
        params.push("format=image/png");
    }
    params.push("width=" + options.width);
    params.push("height=" + options.height);

    if (options.guid) {
        params.push("guid=" + options.guid);
    }
    if (!options.keepCache) {
        params.push("temp=" + Math.random());
    }
    return params;
};

/**
 * @description 刷新地图
 * @function mapboxgl.Zondy.Map.MapWmsLayer.prototype.refreshMap
 * @param guid
 */
MapWmsLayer.prototype.refreshMap = function (guid) {
    if (guid) {
        this.options.guid = guid;
    }
    this._initLayerUrl();
    this.map.removeLayer(this.layerID);
    this.map.removeSource(this.sourceID);

    this.wms_source['tiles'] = [this._layerUrl];
    this.map.addSource(this.sourceID, this.wms_source);
    this.map.addLayer(this.mLayer);
};
export {MapWmsLayer};
Zondy.Map.MapWmsLayer = MapWmsLayer;

