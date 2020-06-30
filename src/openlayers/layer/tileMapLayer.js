
/// <summary>
/// mapgis瓦片地图
/// </summary>
import {Zondy} from '../../service/common/Base';
import {newGuid} from '../../service/common/Util';
import TileImage from 'ol/source/TileImage.js';
import * as ol_extent from 'ol/extent.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import {inherits} from 'ol/util.js';
import {assign} from 'ol/obj.js';
import TileLayer  from 'ol/layer/Tile.js';
import {CacheTileLayerSource} from './cacheTileLayer';

/// <summary>瓦片地图资源构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
var TileLayerSource = function (opt_options) {
    var options = opt_options ? opt_options : {};

    TileImage.call(this, {
        attributions: options.attributions,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? (options.state) : undefined,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX !== undefined ? options.wrapX : false,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null //"anonymous"为跨域调用,
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

    //瓦片范围
    var tileExtent = [-180, -90, 180, 90];
    if (tileProjection != null) {
        tileExtent = tileProjection.getExtent();
    }

    //设置地图范围
    this.extent = options.extent !== undefined ? options.extent : tileExtent;

    /**
    * @public
    * @type {number}
    * 瓦片地图总级数
    */
    this.maxZoom = options.maxZoom !== undefined ? options.maxZoom : 16;

    /**
    * @public
    * @type {string}
    * 瓦片裁剪方式，是左上还是左下的方式，即是新瓦片裁剪的方式还是旧瓦片
    * 一般无需设置此参数，直接由原点和中心点进行判断，只有在某些特殊的裁剪的瓦片中需要用到
    * 例如若裁剪瓦片时以左下角为原点，方式却是新瓦片的方式则需要设置此参数为newTile
    * 参数：eg：若需要强制以新瓦片的方式进行显示，则赋值为oldTile即可
    */
    //this.tileVersion = options.tileOriginType !== undefined ? options.tileOriginType : "newTile";
    this.tileOriginType = options.tileOriginType !== undefined ? options.tileOriginType : "leftTop";

    /**
    * @public
    * @type {number}
    * 地图图片大小
    */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;

    //分辨率数组，根据传入的分辨率或范围计算或者直接传入分辨率数组
    this.resolutions = options.resolutions !== undefined ? options.resolutions : this.getResolutions();

    /**
    * @public
    * @type {Array.<number>}
    * 地图的原点，可由外部指定,默认左上角
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
    this.tileUrlFunction = options.tileUrlFunction!=undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;
};
inherits(TileLayerSource, TileImage);

/**
* 创建分辨率数组
*/
TileLayerSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol_extent.getWidth(this.extent);
        var height = ol_extent.getHeight(this.extent);
        this.maxResolution = (width >= height ? height : width) / (this.tileSize);
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
TileLayerSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    //var urlTemplate = 'http://' + this.ip + ':' + this.port + '/igs/rest/mrms/tile/' + this.name + '/{z}/{y}/{x}?size=' + this.tileSize;
    var urlTemplate;
    if (this.domain === '') {
        urlTemplate = this.networkProtocol + '://' + this.ip + ':' + this.port + '/igs/rest/mrms/tile/' + this.name + '/{z}/{y}/{x}?size=' + this.tileSize;
    }else {
        urlTemplate = this.domain + '/igs/rest/mrms/tile/' + this.name + '/{z}/{y}/{x}?size=' + this.tileSize;
    }
    if(this.token){
        urlTemplate += '&token=' + this.token
    }
    var latCenter = (this.extent[3] - this.extent[1]) / 2 + this.extent[1];
    if ((this.tileOriginType.toLowerCase() == "lefttop") || (this.origin[1] >= latCenter)) {
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = -(tileCoord[2] + 1);

    } else {  //按照左下角为原点进行计算
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = tileCoord[2];

        if (x >= Math.pow(2, z) || y >= Math.pow(2, z)) {
            return;
        }
    }

    return urlTemplate.replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
};

export { TileLayerSource };
Zondy.Source.TileLayerSource = TileLayerSource;


/// <summary>显示瓦片地图的功能服务构造函数</summary>
/// <param {string} opt_name 图层名称，无实际意义可为null.</param>
/// <param {string} opt_hdfName 要显示的瓦片地图名称.</param>
/// <param name="opt_options" type="Object">属性键值对</param>
var TileLayer_mapgis = function (opt_name, opt_hdfName, opt_options) {
    var options = opt_options ? opt_options : {};
    assign(options, { 'layerName': opt_name });
    assign(options, { 'name': opt_hdfName });
    var options_clone = assign({}, options);
    options_clone.maxResolution = Infinity;

    TileLayer.call(this, (options_clone));
    this.isAutoConfig = options.isAutoConfig !== undefined && options.isAutoConfig != null ? options.isAutoConfig : true;
    this.cache = options.cache !== undefined ? options.cache : false;

    this.source = options.source !== undefined ? options.source : null;
    if (this.source == null) {
        //自动配置情况下，通过目录服务获取相关信息后创建source,需把this当做参数传给地图服务
        if (this.isAutoConfig) {
            var infoOptions = {
                domain:options.domain,
                networkProtocol:options.networkProtocol,
                ip: options.ip,
                port: options.port,
                mapName: opt_hdfName,
                layerObj: this,
                paraObj: options
            };
            if(options.token){
                assign(infoOptions, { token: options.token });
            }
            var mService = new Zondy.Service.GetMapInfoService(infoOptions);
            mService.GetMapInfo(function (data) {
                var opt = assign({}, this.paraObj);
                opt.name = data.name;
                opt.extent = [data.xMin, data.yMin, data.xMax, data.yMax];
                opt.tileOriginType = data.originType;
                opt.resolutions = data.resolutions;
                opt.tileSize = data.tileWidth;
                opt.origin = [data.originX, data.originY];
                opt.maxZoom = data.endLevel;

                if (data.type.toLowerCase() == "dtile") {
                    this.layerObj.cache = true;
                }
                if ((data.xMax - data.xMin <= 1e-6) && (data.yMax - data.yMin <= 1e-6)) {
                    alert("获取数据范围失败！");
                    return;
                }
                if (!this.layerObj.cache) {
                    this.layerObj.source = new TileLayerSource(opt);
                }
                else {
                    // this.layerObj.source =  new Zondy.Source.TileLayerSource(opt);
                    this.layerObj.source = new CacheTileLayerSource(opt);
                }
                this.layerObj.setSource(this.layerObj.source);
            }, function () { alert("请求失败！"); }, null);
        }
        else {

            if (!this.cache) {
                this.source = new TileLayerSource(options);
            }
            else {
                this.source = new CacheTileLayerSource(options);
            }
            this.setSource(this.source);
        }
    }
    assign(this, options);
};
inherits(TileLayer_mapgis, TileLayer);

export {TileLayer_mapgis};
Zondy.Map.TileLayer = TileLayer_mapgis;
