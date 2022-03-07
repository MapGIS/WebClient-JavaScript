import {Zondy} from './mapboxBase';
//import {Zondy} from '../../service/common/Base';
import { newGuid, extend } from '../util/Util';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class mapboxgl.Zondy.Map.MapWMTSLayer
 * @classdesc  WMTS地图加载类。可使用接口Zondy.OGC.OGCWMTSInfo获取Capabilities信息
 * @param option - {Object} 属性键值对，地图属性字段。
 * @param {String} [option.domain = ''] 【domain和（networkProtocol，ip，port）二选一】。域名
 * @param {String} [option.networkProtocol = location.protocol.split(":")[0] || "http"] 【domain和（networkProtocol，ip，port）二选一】。网络协议
 * @param {String} [option.ip = localhost] 【domain和（networkProtocol，ip，port）二选一】。地图服务ip
 * @param {String} [option.port = 6163] 【domain和（networkProtocol，ip，port）二选一】。地图服务端口
 *
 * @param {String} [option.tilematrixSet = ] 必选。块阵集，即瓦片矩阵名称，主要由坐标系唯一确定。瓦片参考系，例如“EPSG:4326_WhMap”
 * @param {String} [option.layer = ] 必选。瓦片数据名称，根据发布的WMTS服务信息设置。格式为“服务名称:瓦片名称”，例如“TileTest1:WhMap”
 * @param {String} [option.format = image/png ] 可选。图块输出格式。image/png或image/jpeg
 * @param {String} [option.version = 1.0.0] 可选。WMTS版本
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
 //WMTS图层
 new mapboxgl.Zondy.Map.MapWMTSLayer({
        //IGServer所在ip地址
        ip: "localhost",
        //IGServer请求端口号
        port: "6163",
        //块阵集
        tilematrixSet: "EPSG:4610_CHINAXY_2_arcgis_GB",
        //wmts服务名称
        layer: "CHINAXY",
        //设置地图不连续显示
        noWrap: true,
    }).addToMap(map);
 */
var MapWMTSLayer = function (option) {
    var option = option ? option : {};
    var domain = option && option.domain ? option.domain : '';
    if (domain === '') {
        this.networkProtocol = option.networkProtocol !== undefined ? option.networkProtocol : location.protocol.split(":")[0] || "http";
        var ip = option && option.ip ? option.ip : 'localhost';
        var port = option && option.port ? option.port : '6163';
        this.url = this._url = encodeURI(this.networkProtocol + '://' + ip + ':' + port + '/igs/rest/ogc/WMTSServer');
    } else {
        this.url = this._url = encodeURI(domain + '/igs/rest/ogc/WMTSServer');
    }
    this.options = {
        layer: '',
        style: null,
        //图像类型：jpg,png,gif
        format: 'image/png',
        service: 'WMTS',
        version: '1.0.0',
        request: 'GetTile',
        tileMatrixSet: null,
        tileMatrix: '{z}',
        tileRow: '{y}',
        tileCol: '{x}',
        guid: null,
        //keepCache设置为true时，会首先从客户端缓存中取瓦片，否则不从客户端缓存中提取
        keepCache: true,
        attribution: "Zondy WMTS Data"
    };
    this.layerID = option.layerID ? option.layerID : null;
    this.sourceID = option.sourceID ? option.sourceID : null;
    this.map = null;
    extend(this.options, option);
};

/***
 * @description 将地图加载到地图容器中
 * @function mapboxgl.Zondy.Map.MapWMTSLayer.prototype.addToMap
 * @param map 地图对象
 * @returns {mapboxgl.Zondy.Map.MapWMTSLayer}
 */
MapWMTSLayer.prototype.addToMap = function (map) {
    this.map = map;
    this._initLayerUrl();

    this.map.crs = this.options.crs;
    var sourceID = this.sourceID || "source_" + newGuid();
    var layerID = this.layerID || "layer_" + newGuid();
    this.wmts_source = {
        'type': 'raster',//数据源类型，因为wms返回图片数据，因此为该类型
        'tiles': [this._layerUrl]
    };
    this.mLayer = {
        'id': layerID,//图层ID
        'type': 'raster',//图层类型
        'source': sourceID
    };

    if (this.map.getStyle()) {
        if (this.map.getSource(sourceID) === undefined) {
            this.map.addSource(sourceID, this.wmts_source);
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
            me.map.addSource(sourceID, me.wmts_source);
            me.sourceID = sourceID;
            me.map.addLayer(me.mLayer);
            me.layerID = layerID;
            return me;
        });

    }
};

MapWMTSLayer.prototype._initLayerUrl = function () {
    var me = this;
    var layerUrl = me.url + "?";
    layerUrl += me._initAllRequestParams().join('&');
    this._layerUrl = layerUrl;
};

MapWMTSLayer.prototype._initAllRequestParams = function () {
    var me = this,
        options = me.options || {},
        params = [];
    if (options.version) {
        params.push("version=" + options.version);
    }
    if (options.request) {
        params.push("request=" + options.request);
    }
    if (options.service) {
        params.push("service=" + options.service);
    }
    if (options.layer) {
        params.push("layer=" + options.layer);
    }
    if (options.style) {
        params.push("style=" + JSON.stringify(options.style));
    } else {
        params.push("style=");
    }
    if (options.format) {
        params.push("format=" + options.format);
    } else {
        params.push("format=image/png");
    }
    if (options.tileMatrixSet) {
        params.push("tileMatrixSet=" + options.tileMatrixSet);
    }
    if (options.tileMatrix) {
        params.push("tileMatrix=" + options.tileMatrix);
    }
    if (options.tileRow) {
        params.push("tileRow=" + options.tileRow);
    }
    if (options.tileCol) {
        params.push("tileCol=" + options.tileCol);
    }

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
 * @function mapboxgl.Zondy.Map.MapWMTSLayer.prototype.refreshMap
 * @param guid
 */
MapWMTSLayer.prototype.refreshMap = function (guid) {
    if (guid) {
        this.options.guid = guid;
    }
    this._initLayerUrl();
    this.map.removeLayer(this.layerID);
    this.map.removeSource(this.sourceID);

    this.wmts_source['tiles'] = [this._layerUrl];
    this.map.addSource(this.sourceID, this.wmts_source);
    this.map.addLayer(this.mLayer);
};

export {MapWMTSLayer};
Zondy.Map.MapWMTSLayer = MapWMTSLayer;
