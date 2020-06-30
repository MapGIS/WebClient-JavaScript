/// <summary>
/// 第三方数据
/// </summary>

import {Zondy} from '../../service/common/Base';
import {newGuid} from '../../service/common/Util';
import TileImage
    from 'ol/source/TileImage.js';
import * as ol_extent
    from 'ol/extent.js';
import TileGrid
    from 'ol/tilegrid/TileGrid.js';
import {inherits} from 'ol/util.js';
import TileLayer
    from 'ol/layer/Tile.js';
import * as ol_proj
    from 'ol/proj.js';

/**
 * 百度地图资源构造函数
 * @class Zondy.Source.BaiduMapSource
 * @classdesc extent(图层范围)必须设置，origin(瓦片原点)如果不赋值则默认取[0，0]
 * @extends Zondy.Source.BaiduMapSource
 *
 * @param {Object} option 属性键值对
 * @param {String} [option.attributions = null] 基本描述内容
 * @param {String} [option.logo = null] 基本描述图标Logo
 * @param {String} [option.opaque = null] 不透明度
 * @param {String} [option.projection = null] ol.proj
 * @param {String} [option.state = undefined] 状态
 * @param {String} [option.tilePixelRatio = ] 瓦片的像素分辨率
 * @param {Boolean} [option.wrapX = false] 通过wrapX:false限制图层在x轴方向重复
 * @param {String} [option.crossOrigin = null] crossOrigin="anonymous"为跨域调用
 */
var BaiduMapSource = function (option) {
    var options = option !== undefined ? option : {};
    TileImage.call(this, {
        attributions: options.attributions,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? options.state : undefined,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null
    });

    /**
     * @member Zondy.Source.BaiduMapSource.prototype.maxResolution
     * @type {Number}
     * @description 最大分辨率,新瓦片必须指定
     * @default null
     */
    this.maxResolution = options.maxResolution !== undefined ? options.maxResolution : null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : null;

    /**
     * @member Zondy.Source.BaiduMapSource.prototype.tileExtent
     * @type {Array}
     * @description 瓦片范围 [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
     * @default [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
     */
    this.tileExtent = [-180, -90, 180, 90];
    if (tileProjection != null) {
        this.tileExtent = tileProjection.getExtent();
    } else {
        this.tileExtent = [-20037508.34, -20037508.34, 20037508.34, 20037508.34];
    }

    /**
     * @member Zondy.Source.BaiduMapSource.prototype.extent
     * @type {Array}
     * @description 地图范围 options.extent 或者 this.tileExtent
     * @default null
     */
    this.extent = options.extent !== undefined ? options.extent : this.tileExtent;

    /**
     * @member Zondy.Source.BaiduMapSource.prototype.origin
     * @type {Array}
     * @description 地图的原点，可由外部指定,默认左上角 Array<Number> [0, 0]
     * @default [0, 0]
     */
    this.origin = options.origin !== undefined ? options.origin : [0, 0];

    /**
     * @member Zondy.Source.BaiduMapSource.prototype.maxZoom
     * @type {Number}
     * @description 瓦片地图总级数
     * @default 16
     */
    this.maxZoom = options.maxZoom !== undefined ? options.maxZoom : 16;

    /**
     * @member Zondy.Source.BaiduMapSource.prototype.tileSize
     * @type {Number}
     * @description 地图图片大小
     * @default 256
     */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;

    /**
     * @member Zondy.Source.BaiduMapSource.prototype.resolutions
     * @type {Number}
     * @description 分辨率数组，根据传入的分辨率或范围计算得到
     * @see Zondy.Source.BaiduMapSource.prototype.getResolutions
     */
    this.resolutions = this.getResolutions();

    /**
     * @member Zondy.Source.BaiduMapSource.prototype.tileGrid
     * @private
     * @type {Object}
     * @description 创建网格(内部调用){@link ol.TileGrid}
     * @example
     * this.tileGrid = new TileGrid({
            origin: this.origin, //数组类型，如[0,0],
            resolutions: this.resolutions, //分辨率
            tileSize: this.tileSize //瓦片图片大小
        });
     */
    this.tileGrid = new TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    /**
     * @member Zondy.Source.BaiduMapSource.prototype.tileUrlFunction
     * @protected
     * @type {ol.TileUrlFunctionType}
     * @description 拼接取图地址方法
     * @default this.tileUrlFunctionExtend
     */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;

};
inherits(BaiduMapSource, TileImage);

/**
 * @function Zondy.Source.BaiduMapSource.prototype.getResolutions
 * @description 创建分辨率数组
 * @return {Array} opt_resolutions
 */
BaiduMapSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol_extent.getWidth(this.tileExtent);
        var height = ol_extent.getHeight(this.tileExtent);
        this.maxResolution = (width >= height ? height : width) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (var z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
 * @function Zondy.Source.BaiduMapSource.prototype.tileUrlFunctionExtend
 * @description 拼接url取图地址
 * @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
 * @param {String} pixelRatio 像素比率
 * @param {ol.proj.Projection} projection 投影
 * @return {String} 替换x-y-z后的url地址
 */
BaiduMapSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    var urlTemplate = "http://online2.map.bdimg.com/tile/?qt=tile&x=" + '{x}' + "&y=" + '{y}' + "&z=" + '{z}' + "&styles=pl&udt=20141219&scaler=1";
    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = tileCoord[2];
    return urlTemplate.replace('{z}', z.toString()).replace('{y}', y.toString()).replace('{x}', x.toString());
};

export {BaiduMapSource};
Zondy.Source.BaiduMapSource = BaiduMapSource;

/**
 * 百度地图资源构造函数
 * @class Zondy.Map.BaiDuLayer
 * @classdesc 显示百度地图的功能服务构造函数
 *
 * @param {Object} option 属性键值对
 * @param {Zondy.Source.BaiduMapSource} [option.source = null] openlayer的地图source
 */
var BaiDuLayer = function (option) {
    var options = option !== undefined ? option : {};
    TileLayer.call(this, options);
    if (options.source == undefined) {
        this.source = new BaiduMapSource(options);
        this.setSource(this.source);
    }
};
inherits(BaiDuLayer, TileLayer);

export {BaiDuLayer};
Zondy.Map.BaiDuLayer = BaiDuLayer;

/**
 * @class Zondy.Source.GaodeMapSource
 * @classdesc 高德地图资源构造函数, extent(图层范围)必须设置，origin(瓦片原点)如果不赋值则默认取图层范围的左上角
 *
 * @param {Object} option 属性键值对
 * @param {String} [option.attributions = null] 基本描述内容
 * @param {String} [option.logo = null] 基本描述图标Logo
 * @param {String} [option.opaque = null] 不透明度
 * @param {String} [option.projection = null] ol.proj
 * @param {String} [option.state = undefined] 状态
 * @param {String} [option.tilePixelRatio = ] 瓦片的像素分辨率
 * @param {Boolean} [option.wrapX = false] 通过wrapX:false限制图层在x轴方向重复
 * @param {String} [option.crossOrigin = null] crossOrigin="anonymous"为跨域调用
 */
var GaodeMapSource = function (option) {
    var options = option !== undefined ? option : {};
    TileImage.call(this, {
        attributions: options.attributions,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? options.state : undefined,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用,
    });

    /**
     * @public
     * @member Zondy.Source.GaodeMapSource.prototype.maxResolution
     * @type {Number}
     * @description 最大分辨率,新瓦片必须指定
     * @default null
     */
    this.maxResolution = null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : null;

    /**
     * @member Zondy.Source.GaodeMapSource.prototype.tileExtent
     * @type {Array}
     * @description 瓦片范围 [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
     * @default [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
     */
    this.tileExtent = [-180, -90, 180, 90];

    if (tileProjection != null) {
        this.tileExtent = tileProjection.getExtent();
    } else {
        this.tileExtent = [-20037508.34, -20037508.34, 20037508.34, 20037508.34];
    }

    /**
     * @member Zondy.Source.GaodeMapSource.prototype.extent
     * @type {Array}
     * @description 地图范围 options.extent 或者 this.tileExtent
     * @default this.tileExtent
     */
    this.extent = options.extent !== undefined ? options.extent : this.tileExtent;

    /**
     * @public
     * @member Zondy.Source.GaodeMapSource.prototype.origin
     * @type {Array}
     * @description 地图的原点，可由外部指定,默认左上角 Array<Number> [0, 0]
     * @default ol_extent.getTopLeft(this.extent)
     */
    this.origin = options.origin !== undefined ? options.origin : ol_extent.getTopLeft(this.extent);

    /**
     * @public
     * @member Zondy.Source.GaodeMapSource.prototype.maxZoom
     * @type {Number}
     * @description 瓦片地图总级数
     * @default 16
     */
    this.maxZoom = options.maxZoom !== undefined ? (options.maxZoom <= 18 ? options.maxZoom : 18) : 18;

    /**
     * @public
     * @member Zondy.Source.GaodeMapSource.prototype.tileSize
     * @type {Number}
     * @description 地图图片大小
     * @default 256
     */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;

    /**
     * @member Zondy.Source.GaodeMapSource.prototype.resolutions
     * @type {Number}
     * @description 分辨率数组，根据传入的分辨率或范围计算得到
     * @see Zondy.Source.GaodeMapSource.prototype.getResolutions
     */
    this.resolutions = this.getResolutions();

    /**
     * @member Zondy.Source.GaodeMapSource.prototype.tileGrid
     * @private
     * @type {Object}
     * @description 创建网格(内部调用){@link ol.TileGrid}
     * @example
     * this.tileGrid = new TileGrid({
            origin: this.origin, //数组类型，如[0,0],
            resolutions: this.resolutions, //分辨率
            tileSize: this.tileSize //瓦片图片大小
        });
     */
    this.tileGrid = new TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    /**
     * @member Zondy.Source.GaodeMapSource.prototype.tileUrlFunction
     * @protected
     * @type {ol.TileUrlFunctionType}
     * @description 拼接取图地址方法
     * @default this.tileUrlFunctionExtend
     */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;

};
inherits(GaodeMapSource, TileImage);

/**
 * @function Zondy.Source.GaodeMapSource.prototype.getResolutions
 * @description 创建分辨率数组
 * @return {Array} opt_resolutions
 */
GaodeMapSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol_extent.getWidth(this.tileExtent);
        var height = ol_extent.getHeight(this.tileExtent);
        this.maxResolution = (width >= height ? height : width) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (var z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
 * @function Zondy.Source.GaodeMapSource.prototype.tileUrlFunctionExtend
 * @description 拼接url取图地址
 * @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
 * @param {String} pixelRatio 像素比率
 * @param {ol.proj.Projection} projection 投影
 * @return {String} 替换x-y-z后的url地址
 */
GaodeMapSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    var urlTemplate = [
        "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7" + "&z=" + '{z}' + "&y=" + '{y}' + "&x=" + '{x}',
        "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7" + "&z=" + '{z}' + "&y=" + '{y}' + "&x=" + '{x}',
        "http://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7" + "&z=" + '{z}' + "&y=" + '{y}' + "&x=" + '{x}',
        "http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7" + "&z=" + '{z}' + "&y=" + '{y}' + "&x=" + '{x}'
    ];

    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = -(tileCoord[2] + 1);
    return urlTemplate[Math.round(Math.random() * (urlTemplate.length - 1))].replace('{z}', z.toString())
        .replace('{y}', y.toString())
        .replace('{x}', x.toString());

};

export {GaodeMapSource};
Zondy.Source.GaodeMapSource = GaodeMapSource;

/**
 * 显示高德地图的功能服务
 * @class Zondy.Map.GaoDeLayer
 * @classdesc 显示百度地图的功能服务构造函数
 *
 * @param {Object} option 属性键值对
 * @param {Zondy.Source.GaodeMapSource} [option.source = null] openlayer的地图source
 */
var GaoDeLayer = function (option) {
    var options = option !== undefined ? option : {};
    TileLayer.call(this, options);
    if (options.source == undefined) {
        this.source = new GaodeMapSource(options);
        this.setSource(this.source);
    }
};
inherits(GaoDeLayer, TileLayer);

export {GaoDeLayer};
Zondy.Map.GaoDeLayer = GaoDeLayer;


/**
 * @class Zondy.Source.TiandituMapSource
 * @classdesc 天地图资源构造函数, extent(图层范围)必须设置，origin(瓦片原点)如果不赋值则默认取图层范围的左上角
 *
 * @param {Object} option 属性键值对
 * @param {String} [option.attributions = null] 基本描述内容
 * @param {String} [option.logo = null] 基本描述图标Logo
 * @param {String} [option.opaque = null] 不透明度
 * @param {String} [option.projection = null] ol.proj
 * @param {String} [option.state = undefined] 状态
 * @param {String} [option.tilePixelRatio = ] 瓦片的像素分辨率
 * @param {Boolean} [option.wrapX = false] 通过wrapX:false限制图层在x轴方向重复
 * @param {String} [option.crossOrigin = null] crossOrigin="anonymous"为跨域调用
 */
var TiandituMapSource = function (option) {
    var options = option !== undefined ? option : {};
    TileImage.call(this, {
        attributions: options.attributions,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? options.state : undefined,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用,
    });

    /**
     * @member Zondy.Source.TiandituMapSource.prototype.layerType
     * @type {TiandituType}
     * @description layerType(图层类型)，默认情况下为"vec" {@link Zondy.Enum.Map.TiandituType}
     * @default Zondy.Enum.Map.TiandituType.VEC
     */
    this.layerType = options.layerType !== undefined ? options.layerType : Zondy.Enum.Map.TiandituType.VEC;

    /**
     * @member Zondy.Source.TiandituMapSource.prototype.ip
     * @type {String}
     * @description ip地址
     * @default null
     */
    this.ip = options.ip !== undefined ? options.ip : "127.0.0.1";

    /**
     * @member Zondy.Source.TiandituMapSource.prototype.port
     * @type {Number}
     * @description port端口号
     * @default null
     */
    this.port = options.port !== undefined ? options.port : "6163";

    /**
     * @public
     * @type {string}
     * 请求使用的网格协议，默认http协议
     */
    this.networkProtocol = options.networkProtocol !== undefined ? options.networkProtocol : location.protocol.split(":")[0] || "http";

    /**
     * @public
     * @type {string}
     * 请求使用的域名，基地址
     */
    this.domain = options && options.domain ? options.domain : '';

    if (this.domain === '') {
        this.domainStr = this.networkProtocol + '://' + this.ip + ':' + this.port;
    } else {
        this.domainStr = this.domain;
    }

    /**
     * @public
     * @member Zondy.Source.TiandituMapSource.prototype.maxResolution
     * @type {Number}
     * @description 最大分辨率,新瓦片必须指定
     * @default null
     */
    this.maxResolution = null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : null;

    /**
     * @member Zondy.Source.TiandituMapSource.prototype.tileExtent
     * @type {Array}
     * @description 瓦片范围 [-180, -90, 180, 90]
     * @default [-180, -90, 180, 90]
     */
    this.tileExtent = [-180, -90, 180, 90];
    if (tileProjection != null) {
        this.tileExtent = tileProjection.getExtent();
    }

    /**
     * @member Zondy.Source.TiandituMapSource.prototype.extent
     * @type {Array}
     * @description 设置地图范围 options.extent 或者 this.tileExtent
     * @default this.tileExtent
     */
    this.extent = options.extent !== undefined ? options.extent : this.tileExtent;

    /**
     * @public
     * @member Zondy.Source.TiandituMapSource.prototype.origin
     * @type {Array}
     * @description 地图的原点，可由外部指定,默认左上角 Array<Number> [0, 0]
     * @default ol_extent.getTopLeft(this.extent)
     */
    this.origin = options.origin !== undefined ? options.origin : ol_extent.getTopLeft(this.extent);//ol_extent.getBottomLeft(this.extent);

    /**
     * @public
     * @member Zondy.Source.TiandituMapSource.prototype.maxZoom
     * @type {Number}
     * @description 瓦片地图总级数
     * @default 18
     */
    this.maxZoom = options.maxZoom !== undefined ? (options.maxZoom <= 18 ? options.maxZoom : 18) : 18;

    /**
     * @public
     * @member Zondy.Source.TiandituMapSource.prototype.tileSize
     * @type {Number}
     * @description 地图图片大小
     * @default 256
     */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;

    /**
     * @member Zondy.Source.TiandituMapSource.prototype.resolutions
     * @type {Number}
     * @description 分辨率数组，根据传入的分辨率或范围计算得到
     * @see Zondy.Source.GaodeMapSource.prototype.getResolutions
     */
    this.resolutions = this.getResolutions();

    /**
     * @public
     * @type {object}
     * 自定义天地图
     * @param layer {String} 图层名称
     * @param baseUrl {string} 基地址
     * @param version {string} 版本
     */
    this.custom = options.custom !== undefined ? options.custom : null;

    /**
     * @public
     * @type {string}
     * 天地图取图token
     */
    this.token = options.token;

    /**
     * @member Zondy.Source.TiandituMapSource.prototype.tileGrid
     * @private
     * @type {Object}
     * @description 创建网格(内部调用){@link ol.TileGrid}
     * @example
     * this.tileGrid = new TileGrid({
            origin: this.origin, //数组类型，如[0,0],
            resolutions: this.resolutions, //分辨率
            tileSize: this.tileSize //瓦片图片大小
        });
     */
    this.tileGrid = new TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    /**
     * @member Zondy.Source.TiandituMapSource.prototype.tileUrlFunction
     * @protected
     * @type {ol.TileUrlFunctionType}
     * @description 拼接取图地址方法
     * @default this.tileUrlFunctionExtend
     */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;

};
inherits(TiandituMapSource, TileImage);

/**
 * @function Zondy.Source.TiandituMapSource.prototype.getResolutions
 * @description 创建分辨率数组
 * @return {Array} opt_resolutions
 */
TiandituMapSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol_extent.getWidth(this.tileExtent);
        var height = ol_extent.getHeight(this.tileExtent);
        this.maxResolution = (width <= height ? height : width) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (var z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
 * @function Zondy.Source.TiandituMapSource.prototype.tileUrlFunctionExtend
 * @description 拼接url取图地址
 * @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
 * @param {String} pixelRatio 像素比率
 * @param {ol.proj.Projection} projection 投影
 * @return {String} 替换x-y-z后的url地址
 */
TiandituMapSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    var urlTemplate = "";
    if (this.custom !== null && this.custom !== undefined) {
        if (this.custom.baseURL === undefined) {
            return;
        }
        this.custom.layer = this.custom.layer ? this.custom.layer : Zondy.Enum.Map.TiandituType.VEC;
        this.custom.version = this.custom.version ? this.custom.version : "1.0.0";
        // urlTemplate = this.custom.baseURL + "?SERVICE=WMTS&REQUEST=GetTile&VERSION=" + this.custom.version + "&LAYER=" + this.custom.type + "&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" + "&TILECOL=" + '{x}' + "&TILEROW=" + '{y}' + "&TILEMATRIX=" + '{z}';
        if (this.custom.baseURL.indexOf("?") > 0)
            urlTemplate = this.custom.baseURL + "&SERVICE=WMTS&REQUEST=GetTile&VERSION=" + this.custom.version + "&LAYER=" + this.custom.layer + "&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" + "&TILECOL=" + '{x}' + "&TILEROW=" + '{y}' + "&TILEMATRIX=" + '{z}';
        else
            urlTemplate = this.custom.baseURL + "?SERVICE=WMTS&REQUEST=GetTile&VERSION=" + this.custom.version + "&LAYER=" + this.custom.layer + "&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" + "&TILECOL=" + '{x}' + "&TILEROW=" + '{y}' + "&TILEMATRIX=" + '{z}';
    } else {
        switch (this.layerType) {
            case Zondy.Enum.Map.TiandituType.VEC:
            case Zondy.Enum.TiandituType.VEC:
                urlTemplate = "http://t" + Math.round(Math.random() * 7) + ".tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" + "&TILECOL=" + '{x}' + "&TILEROW=" + '{y}' + "&TILEMATRIX=" + '{z}';
                break;
            case Zondy.Enum.Map.TiandituType.IMG:
            case Zondy.Enum.TiandituType.IMG:
                urlTemplate = "http://t" + Math.round(Math.random() * 7) + ".tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" + "&TILECOL=" + '{x}' + "&TILEROW=" + '{y}' + "&TILEMATRIX=" + '{z}';
                break;
            case Zondy.Enum.Map.TiandituType.CVA:
            case Zondy.Enum.TiandituType.CVA:
                urlTemplate = "http://t" + Math.round(Math.random() * 7) + ".tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" + "&TILECOL=" + '{x}' + "&TILEROW=" + '{y}' + "&TILEMATRIX=" + '{z}';
                break;
            case Zondy.Enum.Map.TiandituType.CIA:
            case Zondy.Enum.TiandituType.CIA:
                urlTemplate = "http://t" + Math.round(Math.random() * 7) + ".tianditu.gov.cn/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" + "&TILECOL=" + '{x}' + "&TILEROW=" + '{y}' + "&TILEMATRIX=" + '{z}';
                break;
            case Zondy.Enum.Map.TiandituType.VEC_IGS:
            case Zondy.Enum.TiandituType.VEC_IGS:
                urlTemplate = this.domainStr + "/igs/rest/cts/tianditu" + "/vector/" + '{x}' + "/" + '{y}' + "/" + '{z}';
                break;
            case Zondy.Enum.Map.TiandituType.IMG_IGS:
            case Zondy.Enum.TiandituType.IMG_IGS:
                urlTemplate = this.domainStr + "/igs/rest/cts/tianditu" + "/raster/" + '{x}' + "/" + '{y}' + "/" + '{z}';
                break;
            case Zondy.Enum.Map.TiandituType.CVA_IGS:
            case Zondy.Enum.TiandituType.CVA_IGS:
                urlTemplate = this.domainStr + "/igs/rest/cts/tianditu" + "/vectorAnno/" + '{x}' + "/" + '{y}' + "/" + '{z}';
                break;
            case Zondy.Enum.Map.TiandituType.CIA_IGS:
            case Zondy.Enum.TiandituType.CIA_IGS:
                urlTemplate = this.domainStr + "/igs/rest/cts/tianditu" + "/rasterAnno/" + '{x}' + "/" + '{y}' + "/" + '{z}';
                break;
        }
    }

    var token = "";
    if (this.token != undefined && this.token != "") {
        token = "tk=" + this.token;
        if (urlTemplate.indexOf("?") > 0)
            urlTemplate += "&" + token;
        else
            urlTemplate += "?" + token;
    }
    var z = tileCoord[0];
    var x = tileCoord[1];
    //var y = parseInt(Math.pow(2, z - 1) - 1 - tileCoord[2]);
    var y = -(tileCoord[2] + 1);
    return urlTemplate.replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
};

export {TiandituMapSource};
Zondy.Source.TiandituMapSource = TiandituMapSource;


/**
 * 显示天地图的功能服务
 * @class Zondy.Map.TianDiTu
 * @classdesc 显示天地图的功能服务构造函数
 *
 * @param {Object} option 属性键值对
 * @param {Zondy.Source.TiandituMapSource} [option.source = null] openlayer的地图source
 */
var TianDiTu = function (option) {
    var options = option !== undefined ? option : {};
    TileLayer.call(this, options);
    if (options.source == undefined) {
        this.source = new TiandituMapSource(options);
        this.setSource(this.source);
    }
};
inherits(TianDiTu, TileLayer);

export {TianDiTu};
Zondy.Map.TianDiTu = TianDiTu;

/**
 * @class Zondy.Source.GoogleMapSource
 * @classdesc 谷歌地图资源构造函数, extent(图层范围)必须设置，origin(瓦片原点)如果不赋值则默认取图层范围的左上角
 *
 * @param {Object} option 属性键值对
 * @param {String} [option.attributions = null] 基本描述内容
 * @param {String} [option.logo = null] 基本描述图标Logo
 * @param {String} [option.opaque = null] 不透明度
 * @param {String} [option.projection = null] ol.proj
 * @param {String} [option.state = undefined] 状态
 * @param {String} [option.tilePixelRatio = ] 瓦片的像素分辨率
 * @param {Boolean} [option.wrapX = false] 通过wrapX:false限制图层在x轴方向重复
 * @param {String} [option.crossOrigin = null] crossOrigin="anonymous"为跨域调用
 */
var GoogleMapSource = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    TileImage.call(this, {
        attributions: options.attributions,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? options.state : undefined,
        wrapX: options.wrapX,
        tilePixelRatio: options.tilePixelRatio,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用,
    });

    /**
     * @member Zondy.Source.GoogleMapSource.prototype.ip
     * @type {String}
     * @description ip地址
     * @default null
     */
    this.ip = options.ip !== undefined ? options.ip : null;

    /**
     * @member Zondy.Source.GoogleMapSource.prototype.port
     * @type {Number}
     * @description port端口号
     * @default null
     */
    this.port = options.port !== undefined ? options.port : null;

    /**
     * @public
     * @type {string}
     * 请求使用的网格协议，默认http协议
     */
    this.networkProtocol = options.networkProtocol !== undefined ? options.networkProtocol : location.protocol.split(":")[0] || "http";

    /**
     * @public
     * @type {string}
     * 请求使用的域名，基地址
     */
    this.domain = options && options.domain ? options.domain : '';

    if (this.domain === '') {
        this.domainStr = this.networkProtocol + '://' + this.ip + ':' + this.port;
    } else {
        this.domainStr = this.domain;
    }

    /**
     * @member Zondy.Source.GoogleMapSource.prototype.layerType
     * @type {GoogleLayerType}
     * @description layerType(图层类型)，默认情况下为"vector" {@link Zondy.Enum.Map.GoogleLayerType.VEC}
     * @default Zondy.Enum.Map.GoogleLayerType.VEC
     */
    this.layerType = options.layerType !== undefined ? options.layerType : Zondy.Enum.Map.GoogleLayerType.VEC;

    /**
     * @public
     * @member Zondy.Source.GoogleMapSource.prototype.maxResolution
     * @type {Number}
     * @description 最大分辨率,新瓦片必须指定
     * @default null
     */
    this.maxResolution = null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : null;


    /**
     * @member Zondy.Source.GoogleMapSource.prototype.tileExtent
     * @type {Array}
     * @description 瓦片范围 [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892]
     * @default [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892]
     */
    this.tileExtent = [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];
    if (tileProjection != null) {
        this.tileExtent = tileProjection.getExtent();
    }

    /**
     * @member Zondy.Source.GoogleMapSource.prototype.extent
     * @type {Array}
     * @description 设置地图范围 options.extent 或者 this.tileExtent
     * @default this.tileExtent
     */
    this.extent = options.extent !== undefined ? options.extent : this.tileExtent;

    /**
     * @public
     * @member Zondy.Source.GoogleMapSource.prototype.origin
     * @type {Array}
     * @description 地图的原点，可由外部指定,默认左上角 Array<Number> [0, 0]
     * @default ol_extent.getTopLeft(this.extent)
     */
    this.origin = options.origin !== undefined ? options.origin : ol_extent.getTopLeft(this.extent);

    /**
     * @public
     * @member Zondy.Source.GoogleMapSource.prototype.maxZoom
     * @type {Number}
     * @description 瓦片地图总级数
     * @default 24
     */
    this.maxZoom = options.maxZoom !== undefined ? (options.maxZoom <= 24 ? options.maxZoom : 24) : 24;

    /**
     * @public
     * @member Zondy.Source.GoogleMapSource.prototype.tileSize
     * @type {Number}
     * @description 地图图片大小
     * @default 256
     */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;

    /**
     * @member Zondy.Source.GoogleMapSource.prototype.resolutions
     * @type {Number}
     * @description 分辨率数组，根据传入的分辨率或范围计算得到
     * @see Zondy.Source.GoogleMapSource.prototype.getResolutions
     */
    this.resolutions = this.getResolutions();

    /**
     * @member Zondy.Source.GoogleMapSource.prototype.baseURL
     * @type {String}
     * @description 基本Url地址
     * @see Zondy.Source.GoogleMapSource.prototype.getBaseURL
     */
    this.baseURL = options.baseURL !== undefined ? options.baseURL : this.getBaseURL();

    /**
     * @member Zondy.Source.GoogleMapSource.prototype.tileGrid
     * @private
     * @type {Object}
     * @description 创建网格(内部调用){@link ol.TileGrid}
     * @example
     * this.tileGrid = new TileGrid({
            origin: this.origin, //数组类型，如[0,0],
            resolutions: this.resolutions, //分辨率
            tileSize: this.tileSize //瓦片图片大小
        });
     */
    this.tileGrid = new TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    /**
     * @member Zondy.Source.GoogleMapSource.prototype.tileUrlFunction
     * @protected
     * @type {ol.TileUrlFunctionType}
     * @description 拼接取图地址方法
     * @default this.tileUrlFunctionExtend
     */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;

};
inherits(GoogleMapSource, TileImage);


/**
 * @function Zondy.Source.GoogleMapSource.prototype.getBaseURL
 * @description 创建基地址
 * @return {String} url_base 基地址
 */
GoogleMapSource.prototype.getBaseURL = function () {
    var url_base = "";
    switch (this.layerType) {
        case Zondy.Enum.Map.GoogleLayerType.VEC:
        case Zondy.Enum.GoogleLayerType.VEC:
            url_base = "http://mt" + Math.round(Math.random() * 3) + ".google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&s=Galile";
            break;
        case Zondy.Enum.Map.GoogleLayerType.RASTER:
        case Zondy.Enum.GoogleLayerType.RASTER:
            url_base = "http://mt" + Math.round(Math.random() * 3) + ".google.cn/vt?lyrs=s@173&hl=zh-Hans-CN&gl=CN&token=63145";
            break;
        case Zondy.Enum.Map.GoogleLayerType.ROAD:
        case Zondy.Enum.GoogleLayerType.ROAD:
            url_base = "http://mt" + Math.round(Math.random() * 3) + ".google.cn/vt/imgtp=png32&lyrs=h@248000000,highlight:0x342eaef8dd85f26f:0x39c2c9ac6c582210@1%7Cstyle:maps&hl=zh-CN&gl=CN&src=app&s=Galileo";
            break;
        case Zondy.Enum.Map.GoogleLayerType.TERRAIN:
        case Zondy.Enum.GoogleLayerType.TERRAIN:
            // url_base = "http://mt" + Math.round(Math.random() * 3) + ".google.cn/vt/lyrs=t@132,r@248000000&hl=zh-CN&src=app&s=Galileo";
            //url_base = "http://mt" + Math.round(Math.random() * 3) + ".google.cn/vt/lyrs=t@132,r@249000000&hl=zh-CN&src=app&s=Galileo";
            url_base = "http://mt" + Math.round(Math.random() * 3) + ".google.cn/vt?lyrs=t&scale=1";
            break;
        case Zondy.Enum.Map.GoogleLayerType.VEC_IGS:
        case Zondy.Enum.GoogleLayerType.VEC_IGS:
            url_base = this.domain + "/igs/rest/cts/google" + "/vector/";
            break;
        case Zondy.Enum.Map.GoogleLayerType.RASTER_IGS:
        case Zondy.Enum.GoogleLayerType.RASTER_IGS:
            url_base = this.domain + "/igs/rest/cts/google" + "/raster/";
            break;
        case Zondy.Enum.Map.GoogleLayerType.ROAD_IGS:
        case Zondy.Enum.GoogleLayerType.ROAD_IGS:
            url_base = this.domain + "/igs/rest/cts/google" + "/road/";
            break;
        case Zondy.Enum.Map.GoogleLayerType.TERRAIN_IGS:
        case Zondy.Enum.GoogleLayerType.TERRAIN_IGS:
            url_base = this.domain + "/igs/rest/cts/google" + "/terrain/";
            break;
    }
    return url_base;
};

/**
 * @function Zondy.Source.GoogleMapSource.prototype.getResolutions
 * @description 创建分辨率数组
 * @return {Array} opt_resolutions
 */
GoogleMapSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol_extent.getWidth(this.tileExtent);
        var height = ol_extent.getHeight(this.tileExtent);
        this.maxResolution = (width <= height ? height : width) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (var z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
 * @function Zondy.Source.GoogleMapSource.prototype.tileUrlFunctionExtend
 * @description 拼接url取图地址
 * @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
 * @param {String} pixelRatio 像素比率
 * @param {ol.proj.Projection} projection 投影
 * @return {String} 替换x-y-z后的url地址
 */
GoogleMapSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    var urlTemplate = "";
    switch (this.layerType) {
        case Zondy.Enum.Map.GoogleLayerType.VEC:
        case Zondy.Enum.GoogleLayerType.VEC:
        case Zondy.Enum.Map.GoogleLayerType.RASTER:
        case Zondy.Enum.GoogleLayerType.RASTER:
        case Zondy.Enum.Map.GoogleLayerType.ROAD:
        case Zondy.Enum.GoogleLayerType.ROAD:
        case Zondy.Enum.Map.GoogleLayerType.TERRAIN:
        case Zondy.Enum.GoogleLayerType.TERRAIN:
            urlTemplate = this.baseURL + "&x=" + '{x}' + "&y=" + '{y}' + "&z=" + '{z}';
            break;
        case Zondy.Enum.Map.GoogleLayerType.VEC_IGS:
        case Zondy.Enum.GoogleLayerType.VEC_IGS:
        case Zondy.Enum.Map.GoogleLayerType.RASTER_IGS:
        case Zondy.Enum.GoogleLayerType.RASTER_IGS:
        case Zondy.Enum.Map.GoogleLayerType.ROAD_IGS:
        case Zondy.Enum.GoogleLayerType.ROAD_IGS:
        case Zondy.Enum.Map.GoogleLayerType.TERRAIN_IGS:
        case Zondy.Enum.GoogleLayerType.TERRAIN_IGS:
            urlTemplate = this.baseURL + '{x}' + "/" + '{y}' + "/" + '{z}';
            break;
    }
    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = -(tileCoord[2] + 1);
    //var y = Math.pow(2, z) - 1 - tileCoord[2];

    return urlTemplate.replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
};

export {GoogleMapSource};
Zondy.Source.GoogleMapSource = GoogleMapSource;

//**********************************************************Zondy.Source.GoogleMapSource(end)************************************************//
//**********************************************************Zondy.Map.GoogleLayer(start)************************************************//

/**
 * 显示谷歌地图的功能服务构造函数
 * @class Zondy.Map.GoogleLayer
 * @classdesc 显示谷歌地图的功能服务构造函数
 *
 * @param {Object} option 属性键值对
 * @param {Zondy.Source.GoogleMapSource} [option.source = null] openlayer的地图source
 */
var GoogleLayer = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    TileLayer.call(this, options);
    if (options.source == undefined) {
        this.source = new GoogleMapSource(options);
        this.setSource(this.source);
    }
};
inherits(GoogleLayer, TileLayer);

export {GoogleLayer};
Zondy.Map.GoogleLayer = GoogleLayer;

/**
 * @class Zondy.Source.ArcGISMapSource
 * @classdesc ArcGIS地图资源构造函数, extent(图层范围)必须设置，origin(瓦片原点)如果不赋值则默认取图层范围的左上角
 *
 * @param {Object} option 属性键值对
 * @param {String} [option.attributions = null] 基本描述内容
 * @param {String} [option.logo = null] 基本描述图标Logo
 * @param {String} [option.opaque = null] 不透明度
 * @param {String} [option.projection = null] ol.proj
 * @param {String} [option.state = undefined] 状态
 * @param {String} [option.tilePixelRatio = ] 瓦片的像素分辨率
 * @param {Boolean} [option.wrapX = false] 通过wrapX:false限制图层在x轴方向重复
 * @param {String} [option.crossOrigin = null] crossOrigin="anonymous"为跨域调用
 */
var ArcGISMapSource = function (option) {
    var options = option !== undefined ? option : {};
    TileImage.call(this, {
        attributions: options.attributions,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? options.state : undefined,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用,
    });

    /**
     * @member Zondy.Source.ArcGISMapSource.prototype.layerType
     * @type {ArcGISLayerType}
     * @description layerType(图层类型)，默认情况下为"World_Terrain_Base" {@link Zondy.Enum.Map.ArcGISLayerType.WorldTerrainBase}
     * @default Zondy.Enum.Map.ArcGISLayerType.WorldTerrainBase
     */
    this.layerType = options.layerType !== undefined ? options.layerType : Zondy.Enum.Map.ArcGISLayerType.WorldTerrainBase;

    /**
     * @public
     * @member Zondy.Source.ArcGISMapSource.prototype.maxResolution
     * @type {Number}
     * @description 最大分辨率,新瓦片必须指定
     * @default null
     */
    this.maxResolution = null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : this.initProjection();

    /**
     * @member Zondy.Source.ArcGISMapSource.prototype.tileExtent
     * @type {Array}
     * @description 瓦片范围 [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892]
     * @default [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892]
     */
    this.tileExtent = [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];
    if (tileProjection != null) {
        this.tileExtent = tileProjection.getExtent();
    }

    /**
     * @member Zondy.Source.ArcGISMapSource.prototype.extent
     * @type {Array}
     * @description 设置地图范围 options.extent 或者 this.tileExtent
     * @default this.tileExtent
     */
    this.extent = options.extent !== undefined ? options.extent : this.tileExtent;

    /**
     * @public
     * @member Zondy.Source.ArcGISMapSource.prototype.origin
     * @type {Array}
     * @description 地图的原点，可由外部指定,默认左上角 Array<Number> [0, 0]
     * @default ol_extent.getTopLeft(this.extent)
     */
    this.origin = options.origin !== undefined ? options.origin : ol_extent.getBottomLeft(this.extent);

    /**
     * @public
     * @member Zondy.Source.ArcGISMapSource.prototype.maxZoom
     * @type {Number}
     * @description 瓦片地图总级数
     * @default 20
     */
    this.maxZoom = options.maxZoom !== undefined ? (options.maxZoom <= 20 ? options.maxZoom : 20) : this.initMaxZoom();

    /**
     * @public
     * @member Zondy.Source.ArcGISMapSource.prototype.tileSize
     * @type {Number}
     * @description 地图图片大小
     * @default Zondy.Source.ArcGISMapSource.prototype.initTileSize
     */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : this.initTileSize();

    /**
     * @member Zondy.Source.ArcGISMapSource.prototype.resolutions
     * @type {Number}
     * @description 分辨率数组，根据传入的分辨率或范围计算得到
     * @see Zondy.Source.ArcGISMapSource.prototype.getResolutions
     */
    this.resolutions = this.getResolutions();

    /**
     * @member Zondy.Source.ArcGISMapSource.prototype.baseURL
     * @type {String}
     * @description 基本Url地址
     * @default "http://services.arcgisonline.com/ArcGIS/rest/services/"
     */
    this.baseURL = options.baseURL !== undefined ? options.baseURL : "http://services.arcgisonline.com/ArcGIS/rest/services/";

    /**
     * @member Zondy.Source.ArcGISMapSource.prototype.tileGrid
     * @private
     * @type {Object}
     * @description 创建网格(内部调用){@link ol.TileGrid}
     * @example
     * this.tileGrid = new TileGrid({
            origin: this.origin, //数组类型，如[0,0],
            resolutions: this.resolutions, //分辨率
            tileSize: this.tileSize //瓦片图片大小
        });
     */
    this.tileGrid = new TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });


    /**
     * @member Zondy.Source.ArcGISMapSource.prototype.tileUrlFunction
     * @protected
     * @type {ol.TileUrlFunctionType}
     * @description 拼接取图地址方法
     * @default this.tileUrlFunctionExtend
     */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;
};
inherits(ArcGISMapSource, TileImage);

/**
 * @function Zondy.Source.ArcGISMapSource.prototype.initTileSize
 * @description 初始化瓦片大小
 * @return {Number} tileSize 256
 */
ArcGISMapSource.prototype.initTileSize = function () {
    var tileSize = 256;
    //枚举Zondy.Enum.ArcGISLayerType是为了兼容OpenLayers2的写法
    switch (this.layerType) {
        case Zondy.Enum.Map.ArcGISLayerType.ImageryWorld2D:
        case Zondy.Enum.ArcGISLayerType.ImageryWorld2D:
        case Zondy.Enum.Map.ArcGISLayerType.StreetMapWorld2D:
        case Zondy.Enum.ArcGISLayerType.StreetMapWorld2D:
        case Zondy.Enum.Map.ArcGISLayerType.TopoUS2D:
        case Zondy.Enum.ArcGISLayerType.TopoUS2D:
            tileSize = 512;
            break;
        default:
            tileSize = 256;
            break;
    }
    return tileSize;
};

/**
 * @function Zondy.Source.ArcGISMapSource.prototype.initProjection
 * @description 初始化投影参照系
 * @return {ol_proj} ol_proj.get('EPSG:3857')
 */
ArcGISMapSource.prototype.initProjection = function () {
    var projection = null;
    switch (this.layerType) {
        case Zondy.Enum.Map.ArcGISLayerType.ImageryWorld2D:
        case Zondy.Enum.ArcGISLayerType.ImageryWorld2D:
        case Zondy.Enum.Map.ArcGISLayerType.StreetMapWorld2D:
        case Zondy.Enum.ArcGISLayerType.StreetMapWorld2D:
        case Zondy.Enum.Map.ArcGISLayerType.TopoUS2D:
        case Zondy.Enum.ArcGISLayerType.TopoUS2D:
            projection = ol_proj.get('EPSG:4326');
            break;
        default:
            projection = ol_proj.get('EPSG:3857');
            break;
    }
    return projection;
};

/**
 * @function Zondy.Source.ArcGISMapSource.prototype.initMaxZoom
 * @description 初始化最大级数
 * @return {Number} maxZoom
 */
ArcGISMapSource.prototype.initMaxZoom = function () {
    var maxZoom = null;
    switch (this.layerType) {
        case Zondy.Enum.Map.ArcGISLayerType.ImageryWorld2D:
        case Zondy.Enum.ArcGISLayerType.ImageryWorld2D:
        case Zondy.Enum.Map.ArcGISLayerType.StreetMapWorld2D:
        case Zondy.Enum.ArcGISLayerType.StreetMapWorld2D:
        case Zondy.Enum.Map.ArcGISLayerType.USATopoMaps:
        case Zondy.Enum.ArcGISLayerType.USATopoMaps:
            maxZoom = 16;
            break;
        case Zondy.Enum.Map.ArcGISLayerType.TopoUS2D:
        case Zondy.Enum.ArcGISLayerType.TopoUS2D:
        case Zondy.Enum.Map.ArcGISLayerType.WorldShadedRelief:
        case Zondy.Enum.ArcGISLayerType.WorldShadedRelief:
        case Zondy.Enum.Map.ArcGISLayerType.WorldTerrainBase:
        case Zondy.Enum.ArcGISLayerType.WorldTerrainBase:
            maxZoom = 14;
            break;
        case Zondy.Enum.Map.ArcGISLayerType.WorldPhysical:
        case Zondy.Enum.ArcGISLayerType.WorldPhysical:
            maxZoom = 9;
            break;
        case Zondy.Enum.Map.ArcGISLayerType.WorldStreet:
        case Zondy.Enum.ArcGISLayerType.WorldStreet:
        case Zondy.Enum.Map.ArcGISLayerType.WorldTopo:
        case Zondy.Enum.ArcGISLayerType.WorldTopo:
        case Zondy.Enum.Map.ArcGISLayerType.WorldImagery:
        case Zondy.Enum.ArcGISLayerType.WorldImagery:
            maxZoom = 20;
            break;
        case Zondy.Enum.Map.ArcGISLayerType.NatGeoWorldMap:
        case Zondy.Enum.ArcGISLayerType.NatGeoWorldMap:
        case Zondy.Enum.Map.ArcGISLayerType.OceanBasemap:
        case Zondy.Enum.ArcGISLayerType.OceanBasemap:
            maxZoom = 17;
            break;
    }
    return maxZoom;
};

/**
 * @function Zondy.Source.ArcGISMapSource.prototype.getResolutions
 * @description 创建分辨率数组
 * @return {Array} opt_resolutions
 */
ArcGISMapSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol_extent.getWidth(this.tileExtent);
        var height = ol_extent.getHeight(this.tileExtent);
        this.maxResolution = (width >= height ? height : width) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (var z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
 * @function Zondy.Source.ArcGISMapSource.prototype.tileUrlFunctionExtend
 * @description 拼接url取图地址
 * @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
 * @param {String} pixelRatio 像素比率
 * @param {ol.proj.Projection} projection 投影
 * @return {String} 替换x-y-z后的url地址
 */
ArcGISMapSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    var urlTemplate = this.baseURL + this.layerType + "/MapServer/tile/" + '{z}' + "/" + '{y}' + "/" + '{x}' + ".jpg";

    var z = tileCoord[0];
    var x = tileCoord[1];
    // var y = tileCoord[2];

    var y = Math.pow(2, z) - 1 - tileCoord[2];
    return urlTemplate.replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
};

export {ArcGISMapSource};
Zondy.Source.ArcGISMapSource = ArcGISMapSource;

/**
 * 显示ArcGIS地图的功能服务构造函数
 * @class Zondy.Map.ArcGISLayer
 * @classdesc 显示ArcGIS地图的功能服务构造函数
 *
 * @param {Object} option 属性键值对
 * @param {Zondy.Source.ArcGISMapSource} [option.source = null] openlayer的地图source
 */
var ArcGISLayer = function (option) {
    var options = option !== undefined ? option : {};
    TileLayer.call(this, options);
    if (options.source == undefined) {
        this.source = new ArcGISMapSource(options);
        this.setSource(this.source);
    }
};
inherits(ArcGISLayer, TileLayer);

export {ArcGISLayer};
Zondy.Map.ArcGISLayer = ArcGISLayer;

/**
 * @class Zondy.Source.OpenStreetMapSource
 * @classdesc OpenStreet地图资源构造函数, extent(图层范围)必须设置，origin(瓦片原点)如果不赋值则默认取图层范围的左上角
 *
 * @param {Object} option 属性键值对
 * @param {String} [option.attributions = null] 基本描述内容
 * @param {String} [option.logo = null] 基本描述图标Logo
 * @param {String} [option.opaque = null] 不透明度
 * @param {String} [option.projection = null] ol.proj
 * @param {String} [option.state = undefined] 状态
 * @param {String} [option.tilePixelRatio = ] 瓦片的像素分辨率
 * @param {Boolean} [option.wrapX = false] 通过wrapX:false限制图层在x轴方向重复
 * @param {String} [option.crossOrigin = null] crossOrigin="anonymous"为跨域调用
 */
var OpenStreetMapSource = function (option) {
    var options = option !== undefined ? option : {};

    TileImage.call(this, {
        attributions: options.attributions,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? options.state : undefined,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用,
    });

    /**
     * @member Zondy.Source.OpenStreetMapSource.prototype.layerType
     * @type {OpenStreetLayerType}
     * @description layerType(图层类型)，默认情况下为"openstreetmap" {@link Zondy.Enum.Map.OpenStreetLayerType.OSM}
     * @default Zondy.Enum.Map.OpenStreetLayerType.OSM
     */
    this.layerType = options.layerType !== undefined ? options.layerType : Zondy.Enum.Map.OpenStreetLayerType.OSM;

    /**
     * @public
     * @member Zondy.Source.OpenStreetMapSource.prototype.maxResolution
     * @type {Number}
     * @description 最大分辨率,新瓦片必须指定
     * @default null
     */xResolution = null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : ol_proj.get('EPSG:3857');

    /**
     * @member Zondy.Source.OpenStreetMapSource.prototype.tileExtent
     * @type {Array}
     * @description 瓦片范围 [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892]
     * @default [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892]
     */
    this.tileExtent = [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];
    if (tileProjection != null) {
        this.tileExtent = tileProjection.getExtent();
    }

    /**
     * @member Zondy.Source.OpenStreetMapSource.prototype.extent
     * @type {Array}
     * @description 设置地图范围 options.extent 或者 this.tileExtent
     * @default this.tileExtent
     */
    this.extent = options.extent !== undefined ? options.extent : this.tileExtent;

    /**
     * @public
     * @member Zondy.Source.OpenStreetMapSource.prototype.origin
     * @type {Array}
     * @description 地图的原点，可由外部指定,默认左下角 Array<Number> [0, 0]
     * @default ol_extent.getBottomLeft(this.extent)
     */
    this.origin = options.origin !== undefined ? options.origin : ol_extent.getBottomLeft(this.extent);

    /**
     * @public
     * @member Zondy.Source.OpenStreetMapSource.prototype.maxZoom
     * @type {Number}
     * @description 瓦片地图总级数
     * @default 20
     */
    this.maxZoom = options.maxZoom !== undefined ? (options.maxZoom <= 20 ? options.maxZoom : 20) : 20;

    /**
     * @public
     * @member Zondy.Source.OpenStreetMapSource.prototype.tileSize
     * @type {Number}
     * @description 地图图片大小
     * @default 256
     */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;

    /**
     * @member Zondy.Source.OpenStreetMapSource.prototype.resolutions
     * @type {Number}
     * @description 分辨率数组，根据传入的分辨率或范围计算得到
     * @see Zondy.Source.OpenStreetMapSource.prototype.getResolutions
     */
    this.resolutions = this.getResolutions();

    /**
     * @member Zondy.Source.OpenStreetMapSource.prototype.baseURL
     * @type {String}
     * @description 基本Url地址
     * @default Zondy.Source.OpenStreetMapSource.prototype.GetUrlFormat
     */
    this.baseURL = options.baseURL !== undefined ? options.baseURL : this.GetUrlFormat();

    /**
     * @member Zondy.Source.OpenStreetMapSource.prototype.tileGrid
     * @private
     * @type {Object}
     * @description 创建网格(内部调用){@link ol.TileGrid}
     * @example
     * this.tileGrid = new TileGrid({
            origin: this.origin, //数组类型，如[0,0],
            resolutions: this.resolutions, //分辨率
            tileSize: this.tileSize //瓦片图片大小
        });
     */
    this.tileGrid = new TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    /**
     * @member Zondy.Source.OpenStreetMapSource.prototype.tileUrlFunction
     * @protected
     * @type {ol.TileUrlFunctionType}
     * @description 拼接取图地址方法
     * @default this.tileUrlFunctionExtend
     */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;

};
inherits(OpenStreetMapSource, TileImage);

/**
 * @function Zondy.Source.OpenStreetMapSource.prototype.GetUrlFormat
 * @description 获取取图地址的格式
 * @return {String} urlForMat
 */
OpenStreetMapSource.prototype.GetUrlFormat = function () {
    var urlForMat = null;
    var preIndex = "abc";
    switch (this.layerType) {
        case Zondy.Enum.Map.OpenStreetLayerType.LandScape:
        case Zondy.Enum.OpenStreetLayerType.LandScape:
            urlForMat = "http://" + preIndex[Math.round(Math.random() * 2)] + ".tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png";
            break;
        case Zondy.Enum.Map.OpenStreetLayerType.CYCLE:
        case Zondy.Enum.OpenStreetLayerType.CYCLE:
            urlForMat = "http://" + preIndex[Math.round(Math.random() * 2)] + ".tile.opencyclemap.org/cycle/{z}/{x}/{y}.png";
            break;
        case Zondy.Enum.Map.OpenStreetLayerType.CycleTransport:
        case Zondy.Enum.OpenStreetLayerType.CycleTransport:
            urlForMat = "http://" + preIndex[Math.round(Math.random() * 2)] + ".tile2.opencyclemap.org/transport/{z}/{x}/{y}.png";
            break;
        case Zondy.Enum.Map.OpenStreetLayerType.OSM:
        case Zondy.Enum.OpenStreetLayerType.OSM:
            urlForMat = "http://" + preIndex[Math.round(Math.random() * 2)] + ".tile.openstreetmap.org/{z}/{x}/{y}.png";
            break;
        case Zondy.Enum.Map.OpenStreetLayerType.OSM_HYB:
        case Zondy.Enum.OpenStreetLayerType.OSM_HYB:
            urlForMat = "http://otile" + (Math.round(Math.random() * 2) + 1) + ".mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png";
            break;
        case Zondy.Enum.Map.OpenStreetLayerType.OSM_Quest:
        case Zondy.Enum.OpenStreetLayerType.OSM_Quest:
            urlForMat = "http://otile" + (Math.round(Math.random() * 2) + 1) + ".mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png";
            break;
        case Zondy.Enum.Map.OpenStreetLayerType.OSM_Q_SAT:
        case Zondy.Enum.OpenStreetLayerType.OSM_Q_SAT:
            urlForMat = "http://otile" + (Math.round(Math.random() * 2) + 1) + ".mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg";
            break;
    }
    return urlForMat;
};

/**
 * @function Zondy.Source.OpenStreetMapSource.prototype.getResolutions
 * @description 创建分辨率数组
 * @return {Array} opt_resolutions
 */
OpenStreetMapSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol_extent.getWidth(this.tileExtent);
        var height = ol_extent.getHeight(this.tileExtent);
        this.maxResolution = (width >= height ? height : width) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (var z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
 * @function Zondy.Source.OpenStreetMapSource.prototype.tileUrlFunctionExtend
 * @description 拼接url取图地址
 * @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
 * @param {String} pixelRatio 像素比率
 * @param {ol.proj.Projection} projection 投影
 * @return {String} 替换x-y-z后的url地址
 */
OpenStreetMapSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = Math.pow(2, z) - 1 - tileCoord[2];

    return this.baseURL.replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
};
export {OpenStreetMapSource};
Zondy.Source.OpenStreetMapSource = OpenStreetMapSource;

/**
 * 显示OpenStreet地图的功能服务构造函数
 * @class Zondy.Map.OpenStreetLayer
 * @classdesc 显示ArcGIS地图的功能服务构造函数
 *
 * @param {Object} option 属性键值对
 * @param {Zondy.Source.OpenStreetMapSource} [option.source = null] openlayer的地图source
 */
var OpenStreetLayer = function (option) {
    var options = option !== undefined ? option : {};
    TileLayer.call(this, options);
    if (options.source == undefined) {
        this.source = new OpenStreetMapSource(options);
        this.setSource(this.source);
    }
};
inherits(OpenStreetLayer, TileLayer);

export {OpenStreetLayer};
Zondy.Map.OpenStreetLayer = OpenStreetLayer;

/**
 * 天地图资源类型
 * @readonly
 * @enum {String}
 */
var TiandituType = {
    /** 天地图矢量数据 */
    VEC: 'vec',
    /** 天地图影像数据 */
    IMG: 'img',
    /** 天地图矢量注记数据 */
    CVA: 'cva',
    /** 天地图影像注记数据 */
    CIA: 'cia',
    /** 天地图矢量数据(通过IGS) */
    VEC_IGS: 'vec_igs',
    /** 天地图影像数据(通过IGS) */
    IMG_IGS: 'img_igs',
    /** 天地图矢量注记数据(通过IGS) */
    CVA_IGS: 'cva_igs',
    /** 天地图影像注记数据(通过IGS) */
    CIA_IGS: 'cia_igs'
};
export {TiandituType};
Zondy.Enum.Map.TiandituType = Zondy.Enum.TiandituType = TiandituType;

/**
 * 谷歌地图资源类型
 * @readonly
 * @enum {String}
 */
var GoogleLayerType = {
    /** Google矢量数据 */
    VEC: 'vector',
    /** Google影像数据 */
    RASTER: 'raster',
    /** Google道路数据 */
    ROAD: 'road',
    /** Google地形数据 */
    TERRAIN: 'terrain',
    /** Google矢量数据(通过IGS) */
    VEC_IGS: 'vector_igs',
    /** Google影像数据(通过IGS) */
    RASTER_IGS: 'raster_igs',
    /** Google道路数据(通过IGS) */
    ROAD_IGS: 'road_igs',
    /** Google地形数据(通过IGS) */
    TERRAIN_IGS: 'terrain_igs'
};
export {GoogleLayerType};
Zondy.Enum.Map.GoogleLayerType = Zondy.Enum.GoogleLayerType = GoogleLayerType;

/**
 * ArcGIS地图资源类型
 * @readonly
 * @enum {String}
 */
var ArcGISLayerType = {
    ImageryWorld2D: 'ESRI_Imagery_World_2D',
    StreetMapWorld2D: 'ESRI_StreetMap_World_2D',
    TopoUS2D: 'NGS_Topo_US_2D',
    WorldImagery: 'World_Imagery',
    WorldPhysical: 'World_Physical_Map',
    WorldShadedRelief: 'World_Shaded_Relief',
    WorldStreet: 'World_Street_Map',
    WorldTerrainBase: 'World_Terrain_Base',
    WorldTopo: 'World_Topo_Map',
    NatGeoWorldMap: 'NatGeo_World_Map',
    OceanBasemap: 'Ocean_Basemap',
    USATopoMaps: 'USA_Topo_Maps'
};
export {ArcGISLayerType};
Zondy.Enum.Map.ArcGISLayerType = Zondy.Enum.ArcGISLayerType = ArcGISLayerType;

/**
 * OpenStreet地图资源类型
 * @readonly
 * @enum {String}
 */
var OpenStreetLayerType = {
    LandScape: 'landscape',
    CYCLE: 'cycle',
    CycleTransport: 'transport',
    OSM: 'openstreetmap',
    OSM_HYB: 'hyb',
    OSM_Quest: 'mapquest',
    OSM_Q_SAT: 'OSM_sat'
};
export {OpenStreetLayerType};
Zondy.Enum.Map.OpenStreetLayerType = Zondy.Enum.OpenStreetLayerType = OpenStreetLayerType;



