//对于中地的瓦片数据，坐标系目前只支持3857测试都支持,只支持原点为4个角，
//这是因为leaf的瓦片序列在0级只支持2张瓦片,如果是任意点为原点，
//那么在0级的时候就有4张瓦片，不能一一对应
import {Zondy} from './mapboxBase';
//import {Zondy} from '../../service/common/Base';
import {
    newGuid,
    extend
} from '../../service/common/Util';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class mapboxgl.Zondy.Map.MapTileLayer
 * @classdesc  mapboxgl瓦片地图加载类
 * @param serverName - {String} 必选。地图服务名
 * @param option - {Object} 属性键值对，地图属性字段。
 * @param {String} [option.domain = ''] 【domain和（networkProtocol，ip，port）二选一】。域名,代理服务器不提供端口号时可采用传入domain的方式。例如：domain:`http://www.sgic.net.cn/CoCloud3`。
 * @param {String} [option.networkProtocol = location.protocol.split(":")[0] || "http"] 【domain和（networkProtocol，ip，port）二选一】。网络协议
 * @param {String} [option.ip = localhost] 【domain和（networkProtocol，ip，port）二选一】。地图服务ip
 * @param {String} [option.port = 6163] 【domain和（networkProtocol，ip，port）二选一】。地图服务端口
 *
 * @param {String} [option.zoomOffset = 0] 可选。加载瓦片的0级与mapboxgl标准瓦片0级（墨卡托裁图标准）的差值
 * @param {String} [option.origin = [-180, 90]] 可选。瓦片原点
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
 //瓦片地图
 new mapboxgl.Zondy.Map.MapTileLayer('CHINAXY_4', {
        ip: 'localhost',
        port: '6163',
        zoomOffset: 2
    }).addToMap(map);
 */
var MapTileLayer = function (serverName, option) {
    var option = option ? option : {};
    var domain = option && option.domain ? option.domain : '';
    if (domain === '') {
        this.networkProtocol = option.networkProtocol !== undefined ? option.networkProtocol : location.protocol.split(":")[0] || "http";
        var ip = option && option.ip ? option.ip : 'localhost';
        var port = option && option.port ? option.port : '6163';
        this.url = this._url = encodeURI(this.networkProtocol + '://' + ip + ':' + port + '/igs/rest/mrms/tile/' + serverName);
    } else {
        this.url = this._url = encodeURI(domain + '/igs/rest/mrms/tile/' + serverName);
    }
    this.options = {
        tileExtent: [-180, -90, 180, 90],
        zoomOffset: 0,
        yAxis: "down",
        origin: [-180, 90],
        tileSize: 512,//mapbox源码里和IGServer里都默认为512
        attribution: "Zondy Map Tile Data"
    };
    this.layerID = option.layerID ? option.layerID : null;
    this.sourceID = option.sourceID ? option.sourceID : null;
    this.map = null;
    extend(this.options, option);
};

/***
 * @description 将地图加载到地图容器中
 * @function mapboxgl.Zondy.Map.MapTileLayer.prototype.addToMap
 * @param map 地图对象
 * @returns {mapboxgl.Zondy.Map.MapTileLayer}
 */
MapTileLayer.prototype.addToMap = function (map) {
    this.map = map;
    this._initLayerUrl();
    var zoomOffset = this.options.zoomOffset;
    //重写mapbox中CanonicalTileID的url类，以支持非标准裁剪的瓦片（这里的非标准不是指任意裁剪瓦片，而是当前瓦片的0级不是mapbox定义的瓦片的0级，中间相差zoomOffset级）
    mapboxgl.CanonicalTileID.prototype.url = function (urls, scheme) {
        const bbox = this.getTileBBox();
        if (zoomOffset > this.z) {
            zoomOffset = 0;
        }
        const quadkey = getQuadkey(this.z - zoomOffset, this.x, this.y);

        return urls[(this.x + this.y) % urls.length]
            .replace('{prefix}', (this.x % 16).toString(16) + (this.y % 16).toString(16))
            .replace('{z}', String(this.z - zoomOffset))
            .replace('{x}', String(this.x))
            .replace('{y}', String(scheme === 'tms' ? (Math.pow(2, this.z) - this.y - 1) : this.y))
            .replace('{quadkey}', quadkey)
            .replace('{bbox-epsg-3857}', bbox);
    };
    var sourceID = this.sourceID || "source_" + newGuid();
    var layerID = this.layerID || "layer_" + newGuid();
    var tile_source = {
        'type': 'raster',//数据源类型，因为wms返回图片数据，因此为该类型
        'tiles': [this._layerUrl],
        'tileSize': this.options.tileSize || 512 //图片显示的大小，最好和上面大小保持一致
    };
    var mLayer = {
        'id': layerID,//图层ID
        'type': 'raster',//图层类型
        'source': sourceID
    };

    if (this.map.getStyle()) {
        if (this.map.getSource(sourceID) === undefined) {
            this.map.addSource(sourceID, tile_source);
            this.sourceID = sourceID;
        }
        if (this.map.getLayer(layerID) === undefined) {
            this.map.addLayer(mLayer);
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
            me.map.addSource(sourceID, tile_source);
            me.sourceID = sourceID;
            me.map.addLayer(mLayer);
            me.layerID = layerID;
            return me;
        });
    }
};
MapTileLayer.prototype._initLayerUrl = function () {
    var me = this;
    var layerUrl = me.url + "/{z}/{y}/{x}";
    this._layerUrl = layerUrl;
};

function getQuadkey(z, x, y) {
    let quadkey = '',
        mask;
    for (let i = z; i > 0; i--) {
        mask = 1 << (i - 1);
        quadkey += ((x & mask ? 1 : 0) + (y & mask ? 2 : 0));
    }
    return quadkey;
}

export {MapTileLayer};
Zondy.Map.MapTileLayer = MapTileLayer;

