import {Zondy} from './mapboxBase';
//import {Zondy} from '../../service/common/Base';
import {
    newGuid,
    extend
} from '../../service/common/Util';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class mapboxgl.Zondy.Map.ArcGISLayer
 * @classdesc  mapboxgl地图文档加载类
 * @param option - {Object} 属性键值对，地图属性字段。
 * @param {String} [option.layerType = NGS_Topo_US_2D] 必选(使用图层类型的方式调用接口时必选)。图层类型。{@link Zondy.Enum.Map.ArcGISLayerType}
 * @param {String} [option.url = http://services.arcgisonline.com/ArcGIS/rest/services/{layerType}/MapServer/tile/{z}/{y}/{x}.jpg] 必选(使用url的方式调用接口时必选)。服务地址。
 * @param {String} [option.tileSize = 256] 可选(使用url的方式调用接口时生效)。瓦片大小。
 * @param {String} [option.dpi = 96] 可选(使用url的方式调用接口时生效)。DPI值。
 * @example
 //地图容器
 //通过图层类型的方式访问。这种方式访问的服务地址是 http://services.arcgisonline.com/ArcGIS/rest/services/{layerType}/MapServer
 new mapboxgl.Zondy.Map.ArcGISLayer({
         layerType: Zondy.Enum.Map.ArcGISLayerType.StreetMapWorld2D
     }).addToMap(map);
 * @example
 //通过url的方式访问。这种方式访问的服务地址类似于 http://192.168.120.1:6080/arcgis/rest/services/SampleWorldCities/MapServer
 new mapboxgl.Zondy.Map.ArcGISLayer({
        url: 'http://192.168.120.1:6080/arcgis/rest/services/SampleWorldCities/MapServer'
    }).addToMap(map);
 */
var ArcGISLayer = function (option) {
    this.options = {
        layerType: 'NGS_Topo_US_2D',
        url: "http://services.arcgisonline.com/ArcGIS/rest/services/{layerType}/MapServer/tile/{z}/{y}/{x}.jpg",
        tileSize: 256,
        f: 'image',
        format: 'png',
        dpi: 96,
        transparent: true,
        attribution: "ArcGIS"
    };
    this.layerID = null;
    this.sourceID = null;
    this.map = null;
    extend(this.options, option);
};

/***
 * @description 将地图加载到地图容器中
 * @function mapboxgl.Zondy.Map.ArcGISLayer.prototype.addToMap
 * @param map 地图对象
 * @returns {mapboxgl.Zondy.Map.ArcGISLayer}
 */
ArcGISLayer.prototype.addToMap = function (map) {
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
    }
    else {
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

ArcGISLayer.prototype._initLayerUrl = function () {
    this._url = this.options.url;
    if (this.options.layerType && this._url.indexOf('{layerType}/MapServer/tile/{z}/{y}/{x}') > 0) {
        this._url = this.options.url.replace("{layerType}", this.options.layerType);
    } else {
        this._crs = this.options.crs || this.map.options.crs;
    }
    this._layerUrl = this._url;
};

/***
 * @description 刷新地图
 * @function mapboxgl.Zondy.Map.ArcGISLayer.prototype.refreshMap
 * @param guid
 */
ArcGISLayer.prototype.refreshMap = function (guid) {
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
export {ArcGISLayer};
Zondy.Map.ArcGISLayer = ArcGISLayer;

