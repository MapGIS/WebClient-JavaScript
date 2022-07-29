import {Zondy} from './mapboxBase';
//import {Zondy} from '../../service/common/Base';
import { newGuid, extend } from '../util/Util';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class mapboxgl.Zondy.Map.MapDocLayer
 * @classdesc  mapboxgl地图文档加载类
 * @param serverName - {String} 必选。地图服务名
 * @param option - {Object} 属性键值对，地图属性字段。
 * @param {String} [option.domain = ''] 【domain和（networkProtocol，ip，port）二选一】。域名。代理服务器不提供端口号时可采用传入domain的方式。例如：domain:`http://www.sgic.net.cn/CoCloud3`。
 * @param {String} [option.networkProtocol = location.protocol.split(":")[0] || "http"] 【domain和（networkProtocol，ip，port）二选一】。网络协议
 * @param {String} [option.ip = localhost] 【domain和（networkProtocol，ip，port）二选一】。地图服务ip
 * @param {String} [option.port = 6163] 【domain和（networkProtocol，ip，port）二选一】。地图服务端口
 *
 * @param {String} [option.tileSize = 512 ] 可选。出图瓦片大小
 * @param {String} [option.cache = false ] 可选。true|false，默认为false。是否使用动态裁图功能。当此参数为true时，MapGIS将按照传入的行号、列号、级号将文档裁图成瓦片并且缓存起来。
 * @param {String} [option.f = 'png'] 可选。图片的格式，当cache为true时此参数无效（仅在非动态裁图时才有意义）。
 * @param {Array} [option.layers = null] 可选。指定需要被取图的图层序列号数组，以“，”分隔，不允许出现空分隔即出现“1,3,4”这种情况。默认为依据文档原始图层状态进行设置。当cache为true时此参数无效（仅在非动态裁图时才有意义）。例：layers=show:1,2
 1show：仅仅显示指定了图层序号的图层
 2hide ：显示除hide参数指定图层外所有的图层
 3include：除显示默认图层（地图文档内图层状态为可见的图层）外，另追加这些被指定的图层显示，追加的这些图层必须为地图中包含的图层。
 4exclude: 从默认图层列表里删除这些被指定的图层后，进行显示
 * @param {String} [option.filters = null] 可选。用户指定的图层过滤条件，它由多个键值对组成，值为过滤条件。当cache为true时此参数无效（仅在非动态裁图时才有意义）。
 * @param {String} [option.style = null] 可选。显示参数，指整个地图文档的显示参数，当cache为true时此参数无效（仅在非动态裁图时才有意义）。例：style={SymbleShow:true,ShowElemRect:true}
 语法： CDisplayStyle类的Json序列化形式来表示，CDisplayStyle类结构.NET定义如下：
 public class CDisplayStyle{
     public bool SymbleShow;//是否进行还原显示
     public bool LinPenWidFixed;// 线状符号线宽固定
     public bool LinSizeFixed;// 线状符号大小固定
     public bool PntPenWidFixed;// 点状符号笔宽固定
     public bool PntSizeFixed;// 点状符号大小固定
     public bool RegPenWidFixed;// 填充符号线宽固定
     public bool RegSizeFixed;// 填充符号大小固定
     public bool AnnSizeFixed;// 注记符号大小固定
     public bool FollowScale = true;//符号是否跟随显示放大，该属性已过时，请使用各个要素类的大小固定及线宽固定
     public bool ShowElemRect; // 显示元素的外包矩形
     public int DriverQuality; // 图像质量
     public bool DynProjFlag; // 是否动态投影
     public DynShowStyle[] ShowStyle; // 地图显示参数  每个GDB公用一个style时，其中每个图层的动态显示样式
}
 * @param {String} [option.proj = null] 可选。投影参数设置，仅在非动态裁图时有意义，针对整个地图文档进行操作。当cache为true时此参数无效（仅在非动态裁图时才有意义）。例：proj='WGS1984_度'
 * @param {String} [option.level = 0] 可选。动态裁图的级数，仅当cache为true时有效
 * @param {String} [option.update = false] 可选。是否更新当前瓦片，仅当cache为true时有效
 * @param {String} [option.guid = newGuid()] 可选。唯一ID，用户标识地图文档。当cache为true时此参数无效（仅在非动态裁图时才有意义）。
 * @param {String} [option.mode] 可选。模式，如果是快显取图（hiRender,fast_display），文档为只读，只有bbox,w,h有效。
 * @param {String} [option.isAntialiasing] 可选。是否高质量显示。
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
 //地图文档
 new mapboxgl.Zondy.Map.MapDocLayer('chinaXZ', {
        ip: 'localhost',
        port: '6163'
    }).addToMap(map);
 */
var MapDocLayer = function (serverName, option) {
    var option = option ? option : {};
    var domain = option && option.domain ? option.domain : '';
    if (domain === '') {
        this.networkProtocol = option.networkProtocol !== undefined ? option.networkProtocol : location.protocol.split(":")[0] || "http";
        var ip = option && option.ip ? option.ip : 'localhost';
        var port = option && option.port ? option.port : '6163';

        this.url = this._url = encodeURI(this.networkProtocol + '://' + ip + ':' + port + '/igs/rest/mrms/docs/' + serverName);
    } else {
        this.url = this._url = encodeURI(domain + '/igs/rest/mrms/docs/' + serverName);
    }
    this.options = {
        layers: null,
        filters: null,
        style: null,
        //图像类型：jpg,png,gif
        f: null,
        //动态投影参数,设置地图文档在服务器端重新投影所需的空间参考系对象
        proj: null,
        guid: null,
        //keepCache设置为true时，会首先从客户端缓存中取瓦片，否则不从客户端缓存中提取
        keepCache: true,
        attribution: "Zondy Map doc Data"
    };
    this.layerID = option.layerID ? option.layerID : null;
    this.sourceID = option.sourceID ? option.sourceID : null;
    this.map = null;
    extend(this.options, option);
};

/***
 * @description 将地图加载到地图容器中
 * @function mapboxgl.Zondy.Map.MapDocLayer.prototype.addToMap
 * @param map 地图对象
 * @returns {mapboxgl.Zondy.Map.MapDocLayer}
 */
MapDocLayer.prototype.addToMap = function (map) {
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

MapDocLayer.prototype._initLayerUrl = function () {
    var me = this;
    var layerUrl = me.url + "?";
    layerUrl += encodeURI(me._initAllRequestParams().join('&'));
    layerUrl += '&bbox={bbox}';
    this._layerUrl = layerUrl;
};

MapDocLayer.prototype._initAllRequestParams = function () {
    var me = this,
        options = me.options || {},
        params = [];

    var f = options.f || "png";
    params.push("f=" + f);

    var tileSize = this.options.tileSize || 512;
    var width, height;
    if (typeof tileSize === 'number') {
        width = height = tileSize
    } else {
        params.push("w=" + tileSize.x || 512);
        params.push("h=" + tileSize.y || 512);
    }
    params.push("w=" + width);
    params.push("h=" + height);

    if (options.layers) {
        params.push("layers=" + options.layers);
    }
    if (options.filters) {
        params.push("filters=" + options.filters);
    }
    if (options.style) {
        params.push("style=" + JSON.stringify(options.style));
    }
    var guid = options.guid || newGuid();
    params.push("guid=" + guid);

    if (options.proj) {
        params.push("proj=" + options.proj);
    }

    if (options.cache !== undefined && options.isAntialiasing !== null) {
        params.push("cache=" + options.cache);
    }

    if (options.update !== undefined && options.isAntialiasing !== null) {
        params.push("update=" + options.update);
    }

    if (options.mode) {
        params.push("mode=" + options.mode);
    }

    if (options.isAntialiasing !== undefined && options.isAntialiasing !== null) {
        params.push("isAntialiasing=" + options.isAntialiasing);
    }
    return params;
};

/***
 * @description 刷新地图
 * @function mapboxgl.Zondy.Map.MapDocLayer.prototype.refreshMap
 * @param guid
 */
MapDocLayer.prototype.refreshMap = function (guid) {
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
export {MapDocLayer};
Zondy.Map.MapDocLayer = MapDocLayer;

