import {L} from '../core/Base.js';

/**
 * @class L.mapgis.TileLayer
 * @classdesc 新版igserver瓦片服务加载类
 * @extends L.TileLayer
 * @example
        //地图容器
        var map = L.map("leaf_map", {
          //添加缩放控件
          zoomControl: true,
          //投影坐标系
          crs: L.CRS.EPSG4326,
          center: [(29.969811000000004 + 31.363327503204342) / 2, (113.69534616 + 115.07704496383667) / 2],
          //最大级数
          maxZoom: 17,
          //最小级数
          minZoom: 7,
          //显示级数
          zoom: 8,
        });

        //瓦片地图
        var layer = new L.mapgis.TileLayer(
          "http://192.168.199.71:8089/igs/rest/services/layertest/栅格瓦片/TileServer",
          {
            noWrap: true
          }
        ).addTo(map);
 */

var TileLayer = L.TileLayer.extend({
    options: {
        // blankTile:null
    },

    initialize: function(url,options){
        this.url = encodeURI(url + "/tileImage");
        L.TileLayer.prototype.initialize.apply(this, arguments);
        L.setOptions(this,options);
        L.stamp(this);
    },

    onAdd:function(map) {
        L.TileLayer.prototype.onAdd.call(this,map);
    },

    getTileUrl: function (coords) {
        // var vm = this,
        //     options = vm.options || {};
        var tileUrl = this.url + '/{z}/{y}/{x}?f=image';
        // if(options.blankTile !== undefined && options.blankTile !== null){
        //     tileUrl = tileUrl + '&blankTile=' + options.blankTile;
        // }
		tileUrl = tileUrl.replace('{x}', coords.x.toString()).replace('{y}', coords.y.toString()).replace('{z}', coords.z.toString());
		return tileUrl;
    }
});

export {TileLayer};
L.mapgis.TileLayer = TileLayer;
export {L};
