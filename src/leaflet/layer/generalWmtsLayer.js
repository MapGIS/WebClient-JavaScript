import {Zondy} from '../../service/common/Base';
import {L} from  'leaflet';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class Zondy.Map.GeneralWMTSLayer
 * @classdesc  常规WMTS地图加载类
 * @extends L.TileLayer
 * @param option - {Object} 属性键值对，地图属性字段。
 * @param {String} [option.version = 1.0.0] 可选。WMTS版本
 * @param {String} [option.tilematrixSet = ] 必选。块阵集，即瓦片矩阵名称，主要由坐标系唯一确定。瓦片参考系，例如“EPSG:4326_WhMap”
 * @param {String} [option.layer = ] 必选。瓦片数据名称，根据发布的WMTS服务信息设置。格式为“服务名称:瓦片名称”，例如“TileTest1:WhMap”
 * @param {String} [option.format = image/png ] 可选。图块输出格式。image/png或image/jpeg
 * @param {String} [option.tileSize = 256] 可选。瓦片大小
 * @example
 //layerUrl:服务路径。例如：http://192.168.176.40:6163/igs/rest/ogc/WMTSServer
 new Zondy.Map.GeneralWMTSLayer(layerUrl, {
            tilematrixSet: TileMatrixSet.Identifier,//矩阵集。例如：EPSG:4610_CHINATILE_028mm_GB
            layer: layerSour.Identifier,//wmts服务名称。例如：INDEX2016
            tilematrixIds: tileMatrixIds,//支持的瓦片级数集合。例如：[0,1,2,3,4,5,6,7,8,9]
            noWrap: true//设置地图不连续显示
        });
 */
var GeneralWMTSLayer = window.L.TileLayer.extend({
    url: '',
    options: {
        version: '1.0.0',
        style: 'default',
        tilematrixSet: '',     //矩阵集名称
        layer: '',             //图层名
        format: 'image/png',
        tileSize: 256,
        attribution: "WMTS Data"
    },

    initialize: function (url, options) { // (String, Object)
        this._url = encodeURI(url);
        window.L.setOptions(this, options);
    },

    onAdd: function (map) {
        window.L.TileLayer.prototype.onAdd.call(this, map);
    },

    /**
     * @private
     * @function Zondy.Map.GeneralWMTSLayer.prototype.getTileUrl
     * @description 根据行列号获取瓦片地址
     * @param coords - {Object} 行列号
     * @return {string} 瓦片地址
     */
    getTileUrl: function (coords) { // (Point, Number) -> String
        var zoom = this._getZoomForUrl();
        var url = window.L.Util.template(this._url, {s: this._getSubdomain(coords)});
        var obj = {
            service: 'WMTS',
            request: 'GetTile',
            version: this.options.version,
            style: this.options.style,
            tilematrixSet: this.options.tilematrixSet,
            format: this.options.format,
            layer: this.options.layer,
            tilematrix: this.options.tilematrixIds[zoom],
            height: this.options.tileSize,
            width: this.options.tileSize,
            tilerow: coords.y,
            tilecol: coords.x
        };
        var str = window.L.Util.getParamString(obj, url);
        str = str.slice(1, str.length);
        return url + "?" + str;
    }
});

export {GeneralWMTSLayer};
Zondy.Map.GeneralWMTSLayer = GeneralWMTSLayer;