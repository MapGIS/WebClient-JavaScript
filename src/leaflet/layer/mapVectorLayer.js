import {Zondy} from '../../service/common/Base';
import {L} from 'leaflet';
import {newGuid} from '../../service/common/Util';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class Zondy.Map.MapVectorLayer
 * @classdesc  瓦片地图加载类
 * @extends L.TileLayer
 * @param gdbps - {String} 必选。图层的gdbps地址，允许多个图层，以“,”隔开
 * @param option - {Object} 属性键值对，地图属性字段。
 * @param {String} [option.domain = ''] 【domain和（networkProtocol，ip，port）二选一】。域名
 * @param {String} [option.networkProtocol = location.protocol.split(":")[0] || "http"] 【domain和（networkProtocol，ip，port）二选一】。网络协议
 * @param {String} [option.ip = localhost] 【domain和（networkProtocol，ip，port）二选一】。地图服务ip
 * @param {String} [option.port = 6163] 【domain和（networkProtocol，ip，port）二选一】。地图服务端口
 *
 * @param {String} [option.filters = null] 可选。用户指定的图层过滤条件，它由多个键值对组成，值为过滤条件。例：filters=1:ID>4,3:ID>1
 * @param {String} [option.style = null] 可选。用户指定的图层显示样式，每个gdbp对应一个style，style为CDisplayStyleExtend的json序列化形式，多个style之间用“，”隔开。例：sytles=[{index:0,symbleshow:true,followscale:true},{index:1,symbleshow:true,FollowScale:true}]
 * @param {String} [option.keepCache = true] 可选。是否使用本地缓存
 * @param {String} [option.f = 'png'] 可选。矢量图片的格式。jpg|png|gif(默认)
 * @param {String} [option.isAntialiasing] 可选。是否高质量显示。
 * @param {String} [option.proj = null] 可选。投影参数设置，仅在非动态裁图时有意义，针对整个地图文档进行操作。当cache为true时此参数无效（仅在非动态裁图时才有意义）。例：proj='WGS1984_度'
 * @param {String} [option.guid = newGuid()] 可选。唯一ID，用户标识地图文档。当cache为true时此参数无效（仅在非动态裁图时才有意义）。
 * @example
 //地图容器
 var map = L.map('leaf_map', {
                //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
                crs: L.CRS.EPSG4326,
                //显示中心
                center: [0, 0],
                //最小显示等级
                minZoom: 0,
                //最大显示等级
                maxZoom: 10,
                //当前显示等级
                zoom: 2,
                //限制显示地理范围
                maxBounds: L.latLngBounds(L.latLng(-180, -180), L.latLng(180, 180))
            });

 //矢量图层
 var layer = new Zondy.Map.MapVectorLayer("gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区,gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流", {
                //IGServer所在ip地址
                ip: "develop.smaryun.com",
                //IGServer请求端口号
                port: "6163",
                //设置地图不连续显示
                noWrap: true,
                //缓存名称
                guid:(new Date()).getTime().toString()
            }).addTo(map);
 */
var MapVectorLayer = window.L.TileLayer.extend({
    options: {
        gdbps: null,
        filters: null,
        style: null,
        //图像类型：jpg,png,gif
        f: null,
        //keepCache设置为true时，会首先从客户端缓存中取瓦片，否则不从客户端缓存中提取
        keepCache: true,
        guid: null,
        attribution: "Zondy Map vector Data",
        proj: null
    },

    initialize: function (gdbps, options) {
        options = options || {};
        options.gdbps = gdbps;
        var domain = options && options.domain ? options.domain : '';
        if (domain === '') {
            this.networkProtocol = options.networkProtocol !== undefined ? options.networkProtocol : location.protocol.split(":")[0] || "http";
            var ip = options && options.ip ? options.ip : 'localhost';
            var port = options && options.port ? options.port : '6163';

            this.url = this._url = encodeURI(this.networkProtocol + '://' + ip + ':' + port + '/igs/rest/mrms/layers');
        } else {
            this.url = this._url = encodeURI(domain + '/igs/rest/mrms/layers');
        }
        window.L.TileLayer.prototype.initialize.apply(this, arguments);
        window.L.setOptions(this, options);
        window.L.stamp(this);
    },

    /**
     * @private
     * @function Zondy.MapVectorLayer.prototype.onAdd
     * @description 添加影像地图。
     * @param map - {L.map} 待添加的影像地图参数
     */
    onAdd: function (map) {
        this._crs = map.options.crs;
        this._initLayerUrl();
        window.L.TileLayer.prototype.onAdd.call(this, map);
    },

    /**
     * @private
     * @function Zondy.Map.MapVectorLayer.prototype.getTileUrl
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
        if (options.gdbps) {
            params.push("gdbps=" + options.gdbps);
        }
        var tileSize = this.options.tileSize;
        if (!(tileSize instanceof window.L.Point)) {
            tileSize = window.L.point(tileSize, tileSize);
        }
        params.push("w=" + tileSize.x);
        params.push("h=" + tileSize.y);

        if (options.filters) {
            params.push("filters=" + options.filters);
        }
        if (options.style) {
            params.push("style=" + JSON.stringify(options.style));
        }
        if (options.proj) {
            params.push("proj=" + options.proj);
        }
        var guid = options.guid || newGuid();
        params.push("guid=" + guid);

        if (options.isAntialiasing !== undefined && options.isAntialiasing !== null) {
            params.push("isAntialiasing=" + options.isAntialiasing);
        }

        return params;
    },
    redraw: function () {
        if (this._map) {
            this._removeAllTiles();
            var guid = newGuid();
            this.options.guid = guid;
            this._initLayerUrl();
            this._update();
        }
        return this;
    }
});
export {MapVectorLayer};
Zondy.Map.MapVectorLayer = MapVectorLayer;

