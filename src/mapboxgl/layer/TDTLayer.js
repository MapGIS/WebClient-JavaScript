import {Zondy} from './mapboxBase';
//import {Zondy} from '../../service/common/Base';
import { newGuid, extend } from '../util/Util';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class mapboxgl.Zondy.Map.TDTLayer
 * @classdesc  mapboxgl地图文档加载类
 * @param option - {Object} 属性键值对，地图属性字段。
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
 * @param {String} [option.layerID] 可选。
 * @param {String} [option.sourceID] 可选。
 * @example //常用
 * new mapboxgl.Zondy.Map.TDTLayer({
                    //图层类型，必选
                    layerType: 'cva',
                    //设置地图不连续显示，可选
                    noWrap: true,
                    //key，必选
                    token:"4c27d6e0e8a90715b23a989d42272fd8"
                }).addToMap(map);
 * @example //通过基地址请求
 * new mapboxgl.Zondy.Map.TDTLayer({
                    //设置地图不连续显示，可选
                    noWrap: true,
                    //基地址，必选
                    baseURL:"http://t2.tianditu.gov.cn/cva_c/wmts",
                    //key，必选
                    token:"4c27d6e0e8a90715b23a989d42272fd8"
                }).addToMap(map);
 * @example //通过IGS请求
 * new mapboxgl.Zondy.Map.TDTLayer({
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
                }).addToMap(map);
 */
var TDTLayer = function (option) {
    this.layerLabelMap = {
        "vec": "cva",
        "ter": "cta",
        "img": "cia"
    };
    this.layerZoomMap = {
        "vec": 18,
        "ter": 14,
        "img": 18
    };
    this.options = {
        layerType: "vec",    //(vec:矢量图层，cva:矢量标签图层，img:影像图层,cia:影像标签图层，ter:地形,cta:地形标签图层)
        isLabel: false,
        url: "http://t" + Math.round(Math.random() * 7) + ".tianditu.gov.cn/{layer}_{proj}/wmts?",
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
    };
    this.layerID = option.layerID ? option.layerID : null;
    this.sourceID = option.sourceID ? option.sourceID : null;
    this.map = null;

    this.initialize(option);
    extend(this.options, option);

};

TDTLayer.prototype.initialize = function (options) {
    options = options || {};
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
};

/***
 * @description 将地图加载到地图容器中
 * @function mapboxgl.Zondy.Map.TDTLayer.prototype.addToMap
 * @param map 地图对象
 * @returns {mapboxgl.Zondy.Map.TDTLayer}
 */
TDTLayer.prototype.addToMap = function (map) {
    this.map = map;
    this._initLayerUrl();

    var sourceID = this.sourceID || "source_" + newGuid();
    var layerID = this.layerID || "layer_" + newGuid();
    this.map_source = {
        'type': 'raster',//数据源类型，因为wms返回图片数据，因此为该类型
        'tiles': [this._layerUrl],
        'tileSize': this.options.tileSize || 512 //图片显示的大小，最好和上面大小保持一致
    };
    this.mLayer = {
        'id': layerID,//图层ID
        'type': 'raster',//图层类型
        'source': sourceID
    };
    if (this.map.style) {
        if (this.map.getSource(sourceID) === undefined) {
            this.map.addSource(sourceID, this.map_source);
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
            me.map.addSource(sourceID, me.map_source);
            me.sourceID = sourceID;
            me.map.addLayer(me.mLayer);
            me.layerID = layerID;
            return me;
        });
    }
};

TDTLayer.prototype._initLayerUrl = function () {
    this._crs = this.options.crs || this.map.crs.epsgCode;
    this.options.tilematrixSet = this._crs === "EPSG:4326" ? "c" : "w";
    let params = [];
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
    if (this.options.layerType.indexOf("igs") < 0) {
        //this._url = this._url + 'request=GetTile';
        params.push('request=GetTile');
        if (this.options.version) {
            //this._url = this._url + 'version=' + this.options.version;
            params.push('version=' + this.options.version);
        }
        if (this.options.style) {
            //this._url = this._url + 'style=' + this.options.style;
            params.push('style=' + this.options.style);
        }
        if (this.options.tilematrixSet) {
            //this._url = this._url + 'tilematrixSet=' + this.options.tilematrixSet;
            params.push('tilematrixSet=' + this.options.tilematrixSet);
        }
        if (this.options.format) {
            //this._url = this._url + 'format=' + this.options.format;
            params.push('format=' + this.options.format);
        }
        if (this.options.tileSize) {
            //this._url = this._url + 'width=' + this.options.tileSize;
            params.push('width=' + this.options.tileSize);
            //this._url = this._url + 'height=' + this.options.tileSize;
            params.push('height=' + this.options.tileSize);
        }
        if (this.options.layer) {
            //this._url = this._url + 'layer=' + this.options.layer;
            params.push('layer=' + this.options.layer);
        }
        params.push('tilematrix={z}');
        params.push('tilerow={y}');
        params.push('tilecol={x}');
    }
    if (this.options.token) {
        //this._url = this._url + 'tk=' + this.options.token;
        params.push('tk=' + this.options.token);
    }
    params.push('service=WMTS');
    this._url += params.join('&');
    this._layerUrl = this._url;
};

/***
 * @description 刷新地图
 * @function mapboxgl.Zondy.Map.TDTLayer.prototype.refreshMap
 * @param guid
 */
TDTLayer.prototype.refreshMap = function (guid) {
    if (guid) {
        this.options.guid = guid;
    }
    this._initLayerUrl();
    this.map.removeLayer(this.layerID);
    this.map.removeSource(this.sourceID);

    this.map_source['tiles'] = [this._layerUrl];
    this.map.addSource(this.sourceID, this.map_source);
    this.map.addLayer(this.mLayer);
};
export {TDTLayer};
Zondy.Map.TDTLayer = TDTLayer;

