import {Zondy} from '../../service/common/Base';
import {L} from 'leaflet';
import {newGuid} from '../../service/common/Util';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class Zondy.Map.MapDocLayer
 * @classdesc  地图文档加载类
 * @extends L.TileLayer
 * @param serverName - {String} 必选。地图服务名
 * @param option - {Object} 属性键值对，地图属性字段。
 * @param {String} [option.domain = ''] 【domain和（networkProtocol，ip，port）二选一】。域名
 * @param {String} [option.networkProtocol = location.protocol.split(":")[0] || "http"] 【domain和（networkProtocol，ip，port）二选一】。网络协议
 * @param {String} [option.ip = localhost] 【domain和（networkProtocol，ip，port）二选一】。地图服务ip
 * @param {String} [option.port = 6163] 【domain和（networkProtocol，ip，port）二选一】。地图服务端口
 *
 * @param {String} [option.tileSize = 256 ] 可选。出图瓦片大小
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
 * @param {String} [option.keepCache = true] 可选。是否使用本地缓存
 * @example
 //地图容器
 var map = L.map('leaf_map', {
                //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
                crs: L.CRS.EPSG4326,
                //显示中心
                center: [0, 0],
                //最小显示等级
                minZoom: 1,
                //最大显示等级
                maxZoom: 5,
                //当前显示等级
                zoom: 2,
                //限制显示地理范围
                maxBounds: L.latLngBounds(L.latLng(-180, -180), L.latLng(180, 180))
            });

 //矢量地图文档
 var layer = new Zondy.Map.MapDocLayer("WorldJWVector", {
                //IGServer所在ip地址
                ip: "develop.smaryun.com",
                //IGServer请求端口号
                port: "6163",
                //设置地图不连续显示
                noWrap: true
            }).addTo(map);
 */
var MapDocLayer = window.L.TileLayer.extend({
    options: {
        layers: null,
        filters: null,
        style: null,
        //图像类型：jpg,png,gif
        f: null,
        //动态投影参数,设置地图文档在服务器端重新投影所需的空间参考系对象
        proj: null,
        guid: null,
        cache: false,
        //keepCache设置为true时，会首先从客户端缓存中取瓦片，否则不从客户端缓存中提取
        keepCache: true,
        tileSize: 256,
        attribution: "Zondy Map doc Data"
    },

    initialize: function (serverName, options) {
        var domain = options && options.domain ? options.domain : '';
        if (domain === '') {
            this.networkProtocol = options.networkProtocol !== undefined ? options.networkProtocol : location.protocol.split(":")[0] || "http";
            var ip = options && options.ip ? options.ip : 'localhost';
            var port = options && options.port ? options.port : '6163';

            this.url = this._url = encodeURI(this.networkProtocol + '://' + ip + ':' + port + '/igs/rest/mrms/docs/' + serverName);
        } else {
            this.url = this._url = encodeURI(domain + '/igs/rest/mrms/docs/' + serverName);
        }
        window.L.TileLayer.prototype.initialize.apply(this, arguments);
        window.L.setOptions(this, options);
        window.L.stamp(this);
    },

    /**
     * @private
     * @function Zondy.Map.MapDocLayer.prototype.onAdd
     * @description 添加矢量地图文档。
     * @param map - {L.map} 待添加的矢量地图文档参数
     */
    onAdd: function (map) {
        this._crs = map.options.crs;
        this._initLayerUrl();
        window.L.TileLayer.prototype.onAdd.call(this, map);
    },

    /**
     * @private
     * @function Zondy.Map.MapDocLayer.prototype.getTileUrl
     * @description 根据行列号获取瓦片地址
     * @param coords - {Object} 行列号
     * @return {String} 瓦片地址
     */
    getTileUrl: function (coords) {
        var tileBounds = this._tileCoordsToBounds(coords);
        var nw = this._crs.project(tileBounds.getNorthWest());
        var se = this._crs.project(tileBounds.getSouthEast());
        var params = "&bbox=" + nw.x + "," + se.y + "," + se.x + "," + nw.y;
        if (!this.options.keepCache) {
            params += "&temp=" + Math.random();
        }
        return this._layerUrl + encodeURI(params);
    },

    _initLayerUrl: function () {
        var me = this;
        var layerUrl = me.url + "?";
        layerUrl += encodeURI(me._initAllRequestParams().join('&'));
        this._layerUrl = layerUrl;
    },

    _initAllRequestParams: function () {
        var me = this,
            options = me.options || {},
            params = [];

        var f = options.f || "png";
        params.push("f=" + f);
        var tileSize = this.options.tileSize;
        if (!(tileSize instanceof window.L.Point)) {
            tileSize = window.L.point(tileSize, tileSize);
        }
        params.push("w=" + tileSize.x);
        params.push("h=" + tileSize.y);

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
    },
    redraw: function () {
        if (this._map) {
            this._removeAllTiles();
            this._update();
        }
        return this;
    },
    refreshMap: function (guid) {
        if (guid !== null) {
            this.options.guid = guid;
        }
        this._initLayerUrl();
        this.redraw();
    }
});
export {MapDocLayer};
Zondy.Map.MapDocLayer = MapDocLayer;
export {L};

