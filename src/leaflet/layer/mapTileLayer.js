//对于中地的瓦片数据，坐标系4326和3857测试都支持,只支持原点为4个角，
//这是因为leaf的瓦片序列在0级只支持2张瓦片,如果是任意点为原点，
//那么在0级的时候就有4张瓦片，不能一一对应
import {Zondy} from '../../service/common/Base';
import {L} from 'leaflet';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class Zondy.Map.MapTileLayer
 * @classdesc  瓦片地图加载类
 * @extends L.TileLayer
 * @param serverName - {String} 必选。地图服务名
 * @param option - {Object} 属性键值对，地图属性字段。
 * @param {String} [option.domain = ''] 【domain和（networkProtocol，ip，port）二选一】。域名,代理服务器不提供端口号时可采用传入domain的方式。例如：domain:`http://www.sgic.net.cn/CoCloud3`。
 * @param {String} [option.networkProtocol = location.protocol.split(":")[0] || "http"] 【domain和（networkProtocol，ip，port）二选一】。网络协议
 * @param {String} [option.ip = localhost] 【domain和（networkProtocol，ip，port）二选一】。地图服务ip
 * @param {String} [option.port = 6163] 【domain和（networkProtocol，ip，port）二选一】。地图服务端口
 *
 * @param {String} [option.origin = [-180, 90]] 可选。瓦片原点
 * @param {String} [option.tileSize = 256] 可选。瓦片大小
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
                maxZoom: 8,
                //当前显示等级
                zoom: 2,
                //限制显示地理范围
                //maxBounds: L.latLngBounds(L.latLng(-180, -180), L.latLng(180, 180))
            });

 //瓦片地图，WORLDTILE为IGServer上发布的瓦片服务名称
 var layer = new Zondy.Map.MapTileLayer("WORLDTILE", {
                //IGServer所在ip地址
                ip: 'develop.smaryun.com',
                //IGServer请求端口号
                port: '6163',
                //设置地图不连续显示
                noWrap:true
            }).addTo(map);
 */
var MapTileLayer = window.L.TileLayer.extend({
	options: {
		yAxis: "down",
		origin: [-180, 90],
		tileSize: 256,
		attribution: "Zondy Map Tile Data"
	},

	initialize: function (serverName, options) {
		var domain = options && options.domain ? options.domain : '';
		if (domain === '') {
			this.networkProtocol = options.networkProtocol !== undefined ? options.networkProtocol : location.protocol.split(":")[0] || "http";
			var ip = options && options.ip ? options.ip : 'localhost';
			var port = options && options.port ? options.port : '6163';
			this.url = this._url = encodeURI(this.networkProtocol + '://' + ip + ':' + port + '/igs/rest/mrms/tile/' + serverName);
		} else {
			this.url = this._url = encodeURI(domain + '/igs/rest/mrms/tile/' + serverName);
		}
		this.options.origin = options.origin ? options.origin : null;
		window.L.TileLayer.prototype.initialize.apply(this, arguments);
		window.L.GridLayer.prototype.initialize(arguments[1]);
		window.L.setOptions(this, options);
		window.L.stamp(this);
	},

	/**
	 * @private
	 * @description 添加地图。
	 * @param map - {L.map} 待添加的影像地图参数
	 */
	onAdd: function (map) {
		this._crs = this.options.crs || map.options.crs;
		let bounds = this._crs.projection.bounds;
		let northWest = [bounds.min.x,bounds.max.y]
		this._origin = this.options.origin ? this.options.origin:northWest
		window.L.TileLayer.prototype.onAdd.call(this, map);
	},

	/**
	 * @private
	 * @function Zondy.Map.MapTileLayer.prototype.getTileUrl
	 * @description 根据行列号获取瓦片地址
	 * @param coords - {Object} 行列号
	 * @return {String} 瓦片地址
	 */
	getTileUrl: function (coords) {
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
		var tileUrl = this.url + '/{z}/{y}/{x}?size=' + this.options.tileSize;
		// ileUrl = tileUrl.replace('{x}', xGrid.toString()).replace('{y}', yGrid.toString()).replace('{z}', coords.z.toString());
		tileUrl = tileUrl.replace('{x}', coords.x.toString()).replace('{y}', coords.y.toString()).replace('{z}', coords.z.toString());
		return tileUrl;
	}
});

export {MapTileLayer};
Zondy.Map.MapTileLayer = MapTileLayer;

