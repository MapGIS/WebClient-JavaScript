import {newGuid} from '../../service/common/Util';
import { L } from '../core/Base.js';

/**
 * @class L.mapgis.MapLayer
 * @classdesc 新版igserver地图服务加载类
 * @extends L.TileLayer
 * @example
            //地图容器
            var map = L.map('leaf_map', {
                //添加缩放控件
                zoomControl: true,
                //投影坐标系
                crs: L.CRS.EPSG4326,
                //中心点[y,x]
                center: [(30.86431739220 + 30.3383275329) / 2, (114.57307983700002 + 113.97889584400014)/ 2],//武汉建筑
                //最大级数
                maxZoom: 10,
                //最小级数
                minZoom: 7,
                //显示级数
                zoom: 8
            });
            
            //创建地图图层
            var mapLayer = new L.mapgis.MapLayer("http://192.168.199.71:8089/igs/rest/services/layertest/武汉建筑/MapServer", {
                layers:'show:0',
                imageFormat: 'jpg',
                filters:{"0":{"where":"Floor>10"}},
                styles: {"0":{"displayRegionBorder":true}},
                imageTransparent:false,
                //只显示一个图层,不平铺显示
                noWrap: true
            }).addTo(map);
 */

var MapLayer = L.TileLayer.extend({
    options: {
        imageFormat: null,
        imageHeight: 512,
        imageWidth: 512,
        guid:null,
        imageTransparent: null,
        filters: null,
        styles: null,
        layers: null,
        crs: null,
        isAntialiasing: null
    },
    /**
     * 
     * @param url - {String} 必选，地图服务的基地址。例如"http://192.168.199.71:8089/igs/rest/services/layertest/武汉建筑/MapServer".
     * @param options - {Object} 属性键值对，地图属性字段。
     * @param {String} [options.imageFormat = 'png'] 可选，图片的格式，支持png|jpg|gif。
     * @param {Object} [options.filters = null] 可选，图层的过滤信息。例如，{"0":{"where":"Floor>10"}}。
     * @param {Object} [options.styles = null] 可选，图层的样式。例如，{"0":{"displayRegionBorder":true}}。
     * @param {String} [options.layers = null]  可选，指定需要被取图的图层序列号。格式：show/hide/include/exclude: layerid1,layerid2。
     1 show：仅仅显示指定了图层序号的图层
     2 hide ：显示除hide参数指定图层外所有的图层
     3 include：除显示默认图层（地图文档内图层状态为可见的图层）外，另追加这些被指定的图 层显示，追加的这些图层必须为地图中包含的图层。
     4 exclude: 从默认图层列表里删除这些被指定的图层后，进行显示
     * @param {String} [options.crs = null] 可选，投影空间参照系，支持mapgis参照系名称和epsg编号。
     * @param {Number} [options.imageHeight = 512] 可选，图片的高度。
     * @param {Number} [options.imageWidth = 512] 可选，图片的宽度。
     * @param {Boolean} [options.isAntialiasing = false] 可选，返回的图片是否抗锯齿。
     * @param {Boolean} [options.imageTransparent = true] 可选，返回的图片是否透明。
     * @param {String} [options.guid = newGuid()] 可选。唯一ID，用户标识地图文档。
     *
     */
    initialize: function (url, options) {
        this.url = encodeURI(url + '/image');
        L.TileLayer.prototype.initialize.apply(this, arguments);
        L.setOptions(this, options);
        L.stamp(this);
    },

    onAdd: function (map) {
        this._crs = map.options.crs;
        this._initLayerUrl();
        L.TileLayer.prototype.onAdd.call(this, map);
    },

    getTileUrl: function (coords) {
        var tileBounds = this._tileCoordsToBounds(coords);
        var nw = this._crs.project(tileBounds.getNorthWest());
        var se = this._crs.project(tileBounds.getSouthEast());
        var params = '&bbox=' + nw.x + ',' + se.y + ',' + se.x + ',' + nw.y;
        return this._layerUrl + encodeURI(params);
    },

    _initLayerUrl: function () {
        var vm = this;
        var layerUrl = vm.url + '?';
        layerUrl += encodeURI(vm._initAllRequestParams().join('&'));
        this._layerUrl = layerUrl;
    },

    _initAllRequestParams: function () {
        var vm = this,
            options = vm.options || {},
            params = [];

        var imageHeight = this.options.imageHeight;
        var imageWidth = this.options.imageWidth;
        params.push('size=' + imageWidth + ',' + imageHeight);

        var guid = options.guid || newGuid();
        params.push("clientId=" + guid);

        if (options.imageFormat) {
            params.push('format=' + options.imageFormat);
        }
        if (options.layers) {
            params.push('layers=' + options.layers);
        }
        if (options.filters) {
            params.push('layerFilters=' + JSON.stringify(options.filters));
        }
        if (options.styles) {
            params.push('layerStyles=' + JSON.stringify(options.styles));
        }
        if (options.imageTransparent !== undefined && options.imageTransparent !== null) {
            params.push('transparent=' + options.imageTransparent);
        }

        if (options.crs) {
            params.push('projectionSrs=' + options.crs);
        }

        if (options.isAntialiasing !== undefined && options.isAntialiasing !== null) {
            params.push('isAntialiasing=' + options.isAntialiasing);
        }

        params.push('f=image');

        return params;
    }
});

export { MapLayer };
L.mapgis.MapLayer = MapLayer;
export { L };
