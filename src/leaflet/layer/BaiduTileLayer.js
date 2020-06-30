import {Zondy} from '../../service/common/Base';
import {L} from  'leaflet';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class Zondy.Map.BaiduTileLayer
 * @classdesc  百度地图加载类
 * @extends L.TileLayer
 * @param option - {Object} 属性键值对，地图属性字段。
 * @param {Number} [option.minZoom = 3] 可选。显示此图层的最小缩放级别
 * @param {String} [option.maxZoom = 18] 可选。显示此图层的最大缩放级别
 * @param {String} [option.subdomains = [0, 1, 2]] 可选。服务的子域。 一个字符串（每个字母是子域名）或字符串数组。
 * @param {String} [option.errorTileUrl = ] 可选。要显示的图块图像的URL，以代替无法加载的图块。
 * @param {String} [option.zoomOffset = 0 ] 可选。缩放偏移量。
 * @param {String} [option.tms = true] 可选。如果是'true`，则反转tile的Y轴编号（启动[TMS]（https://en.wikipedia.org/wiki/Tile_Map_Service）服务）。
 * @param {String} [option.zoomReverse = false] 可选。如果设置为true，则平铺URL中使用的缩放编号将被反转（`maxZoom  -  zoom`而不是`zoom`）
 * @param {String} [option.detectRetina = false] 可选。如果设置为`true`，并且用户在视网膜显示器上浏览，将使用指定大小一半大的四个瓦片来显示，以达到高分辨率的显示。
 * @param {String} [option.crossOrigin = false] 可选。是否将crossOrigin属性添加到切片中。如果要访问平铺像素数据，则所有tile都将其crossOrigin属性设置为提供的String。有关有效的字符串值，请参阅[CORS设置]（https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes）。
 * @param {String} [option.baidukey = HmkUGKETQBkEcd6aj3udNZ3W5hKXmXSi ] 必选。百度key
 * @param {String} [option.id = dark] 必选。可设置为dark,light,street
 * @example
 var BaiduCRS = new L.Proj.CRS(
 'EPSG:3395',
 '+proj=merc +lon_0=0 +k=1 +x_0=140 +y_0=-250 +datum=WGS84 +units=m +no_defs', {
                        resolutions: function () {
                            level = 19;
                            var res = [];
                            res[0] = Math.pow(2, 18);
                            for (var i = 1; i < level; i++) {
                                res[i] = Math.pow(2, (18 - i))
                            }
                            return res;
                        }(),
                        origin: [0, 0],
                        bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
                    }
 );
 var map = L.map('map', {
                    crs: BaiduCRS,
                    layers: [midnight]
                }).setView([29.578285, 106.563777], 3);
 var pl = new Zondy.Map.BaiduTileLayer({
                    styles: 'pl',
                    baidukey: '5ssIAkexwFSGMatjOF95gg3sjet3yxQ1'
                });
 pl.addTo(map);
 */
var BaiduTileLayer = window.L.TileLayer.extend({
    style: {
        light: 'light',
        visualization: 'visualization',
        redalert: 'redalert',
        grassgreen: 'grassgreen',
        pink: 'pink',
        bluish: 'bluish',
        darkgreen: 'darkgreen',
        grayscale: 'grayscale',
        hardedge: 'hardedge',
        midnight: 'midnight',
        default: 'pl'
    },

    url: 'http://api2.map.bdimg.com/customimage/tile?&udt=20180601&scale=1&x={x}&y={y}&z={z}&ak={baidukey}&styles={styles}',


    options: {
        // @option minZoom: Number = 3
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 3,

        // @option maxZoom: Number = 18
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: 18,

        // @option subdomains: String|String[] = 'abc'
        // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
        subdomains: [0, 1, 2],

        // @option errorTileUrl: String = ''
        // URL to the tile image to show in place of the tile that failed to load.
        errorTileUrl: '',

        // @option zoomOffset: Number = 0
        // The zoom number used in tile URLs will be offset with this value.
        zoomOffset: 0,

        // @option tms: Boolean = false
        // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
        tms: true,

        // @option zoomReverse: Boolean = false
        // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
        zoomReverse: false,

        // @option detectRetina: Boolean = false
        // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
        detectRetina: false,

        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: false,

        baidukey: 'HmkUGKETQBkEcd6aj3udNZ3W5hKXmXSi',

        //dark,light,street
        id: 'dark',

        styles: "pl"
    },

    initialize: function (options) {
        window.L.setOptions(this, options);
    },
    onAdd: function (map) {
        window.L.TileLayer.prototype.onAdd.call(this, map);
    },
    _getSubdomain: function (tilePoint) {
        var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
        return this.options.subdomains[index];
    },

    /**
     * @private
     * @function Zondy.Map.BaiduTileLayer.prototype.getTileUrl
     * @description 根据行列号获取瓦片地址
     * @param coords - {Object} 行列号
     * @return {string} 瓦片地址
     */
    getTileUrl: function (coords) {
        var data = {
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl(),
            styles: this.options.styles,
            ak: this.options.baidukey
        };
        if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }

        return window.L.Util.template(this.url, window.L.Util.extend(data, this.options));
    }
});

export {BaiduTileLayer};
Zondy.Map.BaiduTileLayer = BaiduTileLayer;