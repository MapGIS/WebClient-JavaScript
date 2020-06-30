import {Zondy} from './mapboxBase';
//import {Zondy} from '../../service/common/Base';
import {
    newGuid,
    extend
} from '../../service/common/Util';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class mapboxgl.Zondy.Map.MapVectorLayer
 * @classdesc  mapboxgl瓦片地图加载类
 * @param gdbps - {String} 必选。图层的gdbps地址，允许多个图层，以“,”隔开
 * @param option - {Object} 属性键值对，地图属性字段。
 * @param {String} [option.domain = ''] 【domain和（networkProtocol，ip，port）二选一】。域名
 * @param {String} [option.networkProtocol = location.protocol.split(":")[0] || "http"] 【domain和（networkProtocol，ip，port）二选一】。网络协议
 * @param {String} [option.ip = localhost] 【domain和（networkProtocol，ip，port）二选一】。地图服务ip
 * @param {String} [option.port = 6163] 【domain和（networkProtocol，ip，port）二选一】。地图服务端口
 *
 * @param {String} [option.filters = null] 可选。用户指定的图层过滤条件，它由多个键值对组成，值为过滤条件。例：filters=1:ID>4,3:ID>1
 * @param {String} [option.style = null] 可选。用户指定的图层显示样式，每个gdbp对应一个style，style为CDisplayStyleExtend的json序列化形式，多个style之间用“，”隔开。例：sytles=[{index:0,symbleshow:true,followscale:true},{index:1,symbleshow:true,FollowScale:true}]
 * @param {String} [option.f = null] 可选。矢量图片的格式。jpg|png|gif(默认)
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
 //矢量图层
 var layer = new mapboxgl.Zondy.Map.MapVectorLayer("gdbp://MapGisLocal/平台基础示例数据/ds/世界地图/sfcls/世界政区_颜色索引", {
        //IGServer所在ip地址
        ip: "localhost",
        //IGServer请求端口号
        port: "6163",
        //设置地图不连续显示
        noWrap: true,
        //缓存名称
        guid:(new Date()).getTime().toString()
    }).addToMap(map);
 */
var MapVectorLayer = function (gdbps, option) {
    var option = option ? option : {};
    var domain = option && option.domain ? option.domain : '';
    if (domain === '') {
        this.networkProtocol = option.networkProtocol !== undefined ? option.networkProtocol : location.protocol.split(":")[0] || "http";
        var ip = option && option.ip ? option.ip : 'localhost';
        var port = option && option.port ? option.port : '6163';
        this.url = this._url = encodeURI(this.networkProtocol + '://' + ip + ':' + port + '/igs/rest/mrms/layers');
    } else {
        this.url = this._url = encodeURI(domain + '/igs/rest/mrms/layers');
    }
    this.options = {
        gdbps: gdbps,
        filters: null,
        style: null,
        //图像类型：jpg,png,gif
        f: null,
        guid: null,
        //keepCache设置为true时，会首先从客户端缓存中取瓦片，否则不从客户端缓存中提取
        keepCache: true,
        attribution: "Zondy Map vector Data"
    };
    this.layerID = option.layerID ? option.layerID : null;
    this.sourceID = option.sourceID ? option.sourceID : null;
    this.map = null;
    extend(this.options, option);
};

/***
 * @description 将地图加载到地图容器中
 * @function mapboxgl.Zondy.Map.MapVectorLayer.prototype.addToMap
 * @param map 地图对象
 * @returns {mapboxgl.Zondy.Map.MapVectorLayer}
 */
MapVectorLayer.prototype.addToMap = function (map) {
    this.map = map;
    this._initLayerUrl();

    var sourceID = this.sourceID || "source_" + newGuid();
    var layerID = this.layerID || "layer_" + newGuid();
    this.vector_source = {
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
            this.map.addSource(sourceID, this.vector_source);
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
            me.map.addSource(sourceID, me.vector_source);
            me.sourceID = sourceID;
            me.map.addLayer(me.mLayer);
            me.layerID = layerID;
            return me;
        });
    }
};
MapVectorLayer.prototype._initLayerUrl = function () {
    var me = this;
    var layerUrl = me.url + "?";
    layerUrl += encodeURI(me._initAllRequestParams().join('&'));
    layerUrl += '&bbox={bbox}';
    this._layerUrl = layerUrl;
};

MapVectorLayer.prototype._initAllRequestParams = function () {
    var me = this,
        options = me.options || {},
        params = [];

    var tileSize = this.options.tileSize || 512;
    params.push("width=" + tileSize);
    params.push("height=" + tileSize);

    if (options.gdbps) {
        params.push("gdbps=" + options.gdbps);
    }
    if (options.filters) {
        params.push("filters=" + options.filters);
    }
    if (options.style) {
        params.push("style=" + JSON.stringify(options.style));
    }
    if (options.f) {
        params.push("f=" + options.style);
    } else {
        params.push("f=png");
    }
    if (options.guid) {
        params.push("guid=" + options.guid);
    }
    if (!options.keepCache) {
        params.push("temp=" + Math.random());
    }
    return params;
};

/***
 * @description 刷新地图
 * @function mapboxgl.Zondy.Map.MapVectorLayer.prototype.refreshMap
 * @param guid
 */
MapVectorLayer.prototype.refreshMap = function (guid) {
    if (guid) {
        this.options.guid = guid;
    }
    this._initLayerUrl();
    this.map.removeLayer(this.layerID);
    this.map.removeSource(this.sourceID);

    this.vector_source['tiles'] = [this._layerUrl];
    this.map.addSource(this.sourceID, this.vector_source);
    this.map.addLayer(this.mLayer);
};
export {MapVectorLayer};
Zondy.Map.MapVectorLayer = MapVectorLayer;

