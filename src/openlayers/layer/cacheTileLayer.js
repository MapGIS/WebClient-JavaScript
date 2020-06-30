
import {Zondy} from '../../service/common/Base';
import {newGuid} from '../../service/common/Util';
import TileImage from 'ol/source/TileImage.js';
import * as ol_extent from 'ol/extent.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import {inherits} from 'ol/util.js';
import {assign} from 'ol/obj.js';
import TileLayer from 'ol/layer/Tile.js';

/// <summary>动态裁图的矢量地图文档资源构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
var CacheTileLayerSource = function (opt_options) {
    var options = opt_options ? opt_options : {};
    TileImage.call(this, {
        attributions: options.attributions,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ?
        /** @type {ol.source.State} */(options.state) : undefined,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用,
    });
    this.token = options.token;
    /**
    * @public
    * @type {string}
    * 地图服务请求地址（可通过初始对象的options赋值）
    */
    this.ip = options.ip !== undefined ? options.ip : "127.0.0.1";

    /**
    * @public
    * @type {string}
    * 地图服务请求端口（可通过初始对象的options赋值）
    */
    this.port = options.port !== undefined ? options.port : "6163";

    /**
    * @public
    * @type {string}
    * 地图名称,必须赋值
    */
    this.name = options.name !== undefined ? options.name : null;

    /**
    * @public
    * @type {number}
    * 最大分辨率,新瓦片必须指定
    */
    this.maxResolution = options.maxResolution !== undefined ? options.maxResolution : null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : null;

    //地图范围
    var tileExtent = [-180, -90, 180, 90];
    if (tileProjection != null) {
        tileExtent = tileProjection.getExtent();
    }

    //设置地图范围
    this.extent = options.extent !== undefined ? options.extent : tileExtent;

    /**
    * @public
    * @type {number}
    * 动态裁图瓦片地图总级数
    */
    this.maxZoom = options.maxZoom !== undefined ? options.maxZoom : 16;

    /**
    * @public
    * @type {number}
    * 地图图片大小
    */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;

    //分辨率数组，根据传入的分辨率或范围计算得到
    this.resolutions = options.resolutions !== undefined ? options.resolutions : this.getResolutions();


    /**
    * @public
    * @type {Array.<number>}
    * 地图的原点，可由外部指定,动态裁图默认左上角
    */
    this.origin = options.origin !== undefined ? options.origin : ol_extent.getTopLeft(this.extent);

    /**
    * @public
    * @type {string}
    * 请求使用的网格协议，默认http协议
    */
    this.networkProtocol = options.networkProtocol !== undefined ? options.networkProtocol : location.protocol.split(":")[0]||"http";

    /**
     * @public
     * @type {string}
     * 请求使用的域名，基地址
     */
    this.domain = options && options.domain ? options.domain : '';

    /**
    * @private
    * @type {string}
    * 客户端标识，用以服务器缓存地图，一般情况下无需赋值
    */
    this.guid = options.guid !== undefined ? options.guid : newGuid();

    /**
    * @private
    * true表示动态裁图的方式显示出图
    */
    this.cache = true;

    /**
    * @private
    * @type {Array.<number>}
    * 创建网格(内部调用)
    */
    this.tileGrid = new TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    /**
    * @protected
    * @type {ol.TileUrlFunctionType}
    * 拼接取图地址方法
    */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;
};
inherits(CacheTileLayerSource, TileImage);

/**
* 创建分辨率数组
*/
CacheTileLayerSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol_extent.getWidth(this.extent);
        var height = ol_extent.getHeight(this.extent);
        this.maxResolution = (width >= height ? width : height) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (var z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
* 拼接url取图地址
* @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
* @param {string} pixelRatio 像素比率
* @param {ol.proj.Projection} projection 投影
*/
CacheTileLayerSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    this.cache = true;
    //var urlTemplate = 'http://' + this.ip + ':' + this.port + '/igs/rest/mrms/docs/' + this.name + '?f=' + this.f + '&cache=' + this.cache + '&guid=' + this.guid + '&level={z}&col={x}&row={y}&w=' + this.tileSize + '&h=' + this.tileSize;
    var urlTemplate;
    if (this.domain === '') {
        urlTemplate = this.networkProtocol + '://' + this.ip + ':' + this.port + '/igs/rest/mrms/docs/' + this.name + '?f=' + this.f + '&cache=' + this.cache + '&guid=' + this.guid + '&level={z}&col={x}&row={y}&w=' + this.tileSize + '&h=' + this.tileSize;
    }else {
        urlTemplate = this.domain + '/igs/rest/mrms/docs/' + this.name + '?f=' + this.f + '&cache=' + this.cache + '&guid=' + this.guid + '&level={z}&col={x}&row={y}&w=' + this.tileSize + '&h=' + this.tileSize;
    }
    if(this.token){
        urlTemplate += '&token=' + this.token
    }
    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = -(tileCoord[2] + 1);
    if (x >= Math.pow(2, z) || y >= Math.pow(2, z)) {
        return;
    }
    return urlTemplate.replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
};

export { CacheTileLayerSource };
Zondy.Source.CacheTileLayerSource = CacheTileLayerSource;


/// <summary>显示动态裁图的矢量地图文档的功能服务构造函数</summary>
/// <param {string} opt_name 图层名称，无实际意义可为null.</param>
/// <param {string} opt_docName 要显示的地图文档名称.</param>
/// <param name="opt_options" type="Object">属性键值对</param>
var CacheTileLayer = function (opt_name, opt_docName, opt_options) {
    var options = opt_options ? opt_options : {};
    assign(options, { 'layerName': opt_name });
    assign(options, { 'name': opt_docName });
    options.source = !!options.source ? options.source : new CacheTileLayerSource(options);

    var options_clone = assign({}, options);
    options_clone.maxResolution = Infinity;

    TileLayer.call(this, (options_clone));
    assign(this, options);
};
inherits(CacheTileLayer, TileLayer);

export { CacheTileLayer };
Zondy.Map.CacheTileLayer = CacheTileLayer;


