import {Zondy} from '../../service/common/Base';
import {L} from  'leaflet';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class Zondy.Map.ArcGISLayer
 * @classdesc  ArcGIS地图加载类
 * @extends L.TileLayer
 * @param option - {Object} 属性键值对，地图属性字段。<br>
 * @param {String} [option.layerType = NGS_Topo_US_2D] 必选(使用图层类型的方式调用接口时必选)。图层类型。{@link Zondy.Enum.Map.ArcGISLayerType}
 * @param {String} [option.url = http://services.arcgisonline.com/ArcGIS/rest/services/{layerType}/MapServer/tile/{z}/{y}/{x}.jpg] 必选(使用url的方式调用接口时必选)。服务地址。
 * @param {String} [option.tileSize = 256] 可选(使用url的方式调用接口时生效)。瓦片大小。
 * @param {String} [option.dpi = 96] 可选(使用url的方式调用接口时生效)。DPI值。
 * @example
 //通过图层类型的方式访问。这种方式访问的服务地址是 http://services.arcgisonline.com/ArcGIS/rest/services/{layerType}/MapServer
 new Zondy.Map.ArcGISLayer({
         layerType: Zondy.Enum.Map.ArcGISLayerType.StreetMapWorld2D
     }).addTo(map);
 * @example
 //通过url的方式访问。这种方式访问的服务地址类似于 http://192.168.120.1:6080/arcgis/rest/services/SampleWorldCities/MapServer
 new Zondy.Map.ArcGISLayer({
        url: 'http://192.168.120.1:6080/arcgis/rest/services/SampleWorldCities/MapServer'
    }).addTo(map);
 */
var ArcGISLayer = window.L.TileLayer.extend({
    options: {
        layerType: 'NGS_Topo_US_2D',
        url: "http://services.arcgisonline.com/ArcGIS/rest/services/{layerType}/MapServer/tile/{z}/{y}/{x}.jpg",
        tileSize: 256,
        f: 'image',
        format: 'png',
        dpi: 96,
        transparent: true,
        attribution: "ArcGIS",
        layers: ""
    },

    initialize: function (options) {
        options = options || {};
        window.L.setOptions(this, options);
        window.L.stamp(this);
    },
    onAdd: function (map) {
        this._url = this.options.url;
        if (this.options.layerType && this._url.indexOf('{layerType}/MapServer/tile/{z}/{y}/{x}') > 0) {
            this._url = this.options.url.replace("{layerType}", this.options.layerType);
        } else {
            this._crs = this.options.crs || map.options.crs;
        }
        window.L.TileLayer.prototype.onAdd.call(this, map);
    },
    /**
     * @private
     * @function Zondy.Map.ArcGISLayer.prototype.getTileUrl
     * @description 根据行列号获取瓦片地址
     * @param coords - {Object} 行列号
     * @return {string} 瓦片地址
     */
    getTileUrl: function (coords) {
        var url = null;
        if (this._url.indexOf('tile/{z}/{y}/{x}') > 0) {
            var zoom = this._getZoomForUrl();
            url = this._url.replace("{x}", coords.x).replace("{y}", coords.y).replace("{z}", zoom);
        } else {
            var tileBounds = this._tileCoordsToBounds(coords);
            var nw = this._crs.project(tileBounds.getNorthWest());
            var se = this._crs.project(tileBounds.getSouthEast());
            var bbox = nw.x + "," + se.y + "," + se.x + "," + nw.y;

            var obj = {
                bbox: bbox,
                f: this.options.f,
                format: this.options.format,
                transparent: this.options.transparent,
                size: this.options.tileSize + ',' + this.options.tileSize,
                bboxsr: this._crs.code.split(":")[1],
                imagesr: this._crs.code.split(":")[1],
                dpi: 96,
                layers: this.options.layers
            };
            var str = window.L.Util.getParamString(obj, url);
            str = str.slice(1, str.length);
            url = this._url + '/export?' + str;
        }
        return url;
    }
});
export {ArcGISLayer};
Zondy.Map.ArcGISLayer = ArcGISLayer;
