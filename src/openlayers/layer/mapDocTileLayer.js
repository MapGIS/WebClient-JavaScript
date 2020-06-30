
/// <summary>
/// 矢量地图文档资源_以瓦片方式
/// </summary>
import {Zondy} from '../../service/common/Base';
import {newGuid} from '../../service/common/Util';
import TileImage from 'ol/source/TileImage.js';
import * as ol_extent from 'ol/extent.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import {inherits} from 'ol/util.js';
import {assign} from 'ol/obj.js';
import {appendParams} from 'ol/uri.js';
import TileLayer from 'ol/layer/Tile.js';
import {createProjection, METERS_PER_UNIT} from 'ol/proj.js';
var MapDocTileSource = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};

    /**
    * @private
    * @type {Array.<number>}
    * 创建网格(内部调用)
    */
    TileImage.call(this, {
        attributions: options.attributions,
        extent: this.extent,
        tileExtent: this.tileExtent,
        ip: this.ip,
        port: this.port,
        logo: options.logo,
        opaque: options.opaque,
        tileGrid:this.zondyTileGrid,
        projection: tileProjection,//options.projection,
        state: options.state !== undefined ? options.state : undefined,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
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


     //投影参考
    var projection = options.projection !== undefined ? options.projection : "EPSG:4326";

    //根据投影获取地图范围
    //var tileProjection = options.projection !== undefined ? options.projection : null;
    var tileProjection = createProjection(options.projection, "EPSG:4326");

    //地图范围
    var tileExtent = [-180, -90, 180, 90];
    if (tileProjection != null && options.projection) {
        tileExtent = tileProjection.getExtent();
    }else if(options.extent){
        if (options.extent[0] < 200 && options.extent[2] < 200 && options.extent[1] < 120 && options.extent[3]< 120) {
            options.projection = "EPSG:4326";
            tileExtent=createProjection(options.projection, "EPSG:4326").getExtent();
        } else {
            options.projection = "EPSG:3857";
            tileExtent=createProjection(options.projection, "EPSG:3857").getExtent();
        }
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
    * 动态裁图瓦片地图最小级数
    */
    this.minZoom = options.minZoom !== undefined ? options.minZoom : 0;

    /**
    * @public
    * @type {number}
    * 地图图片大小
    */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;

    //分辨率数组，根据传入的分辨率或范围计算得到
    this.resolutions = this.getResolutions();
    /**
    * @public
    * @type {Array.<number>}
    * 地图的原点，可由外部指定,动态裁图默认左上角
    */

    // this.origin = options.origin !== undefined ? options.origin : ol_extent.getCorner(this.extent, ol_extent.Corner.TOP_LEFT);

    this.origin = options.origin !== undefined ? options.origin : ol_extent.getTopLeft(this.extent);
    this.rlt = Math.random();

    this.f = options.f !== undefined ? options.f : "png";

    /**
    * @public
    * @type {string}
    * 指示需要显示的地图图层号
    * show,hide,include,exclude 4种形式
    * eg:  'layers=show:1,2,3','layers=include:4,5,7'
    */
    this.layers = options.layers != undefined ? options.layers : null;

    /**
    * @public
    * @type {string}
    * 用户指定的图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。
    * eg：'1:ID>4,3:ID>1'
    * 中文请使用UTF-8编码后再传入参数
    * javascitpt中请使用encodeURI（）函数编码后再代入filters参数中
    * 注意，在此函数中“：”和“，”是保留字符，用于表示键值对概念和分隔不同图层的条件，请不要将这2个字符用于自定义条件中
    */
    this.filters = options.filters != undefined ? options.filters : null;

    /**
    * @public
    * @type {Zondy.Object.CDisplayStyle}
    * 显示参数
    */
    this.style = options.style != undefined ? options.style : null;

    /**
    * @public
    * @type { Zondy.Object.CSRefInfoBySRSID}
    * 动态投影参数,设置地图文档在服务器端重新投影所需的空间参考系对象
    */
    this.proj = options.proj != undefined ? options.proj : null;


    /**
    * @private
    * @type {string}
    * 客户端标识，用以服务器缓存地图，一般情况下无需赋值
    */
    this.guid = options.guid !== undefined ? options.guid : newGuid();

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
    * true表示动态裁图的方式显示出图
    */
    this.cache = false;
    // this.tileGrid =  options.tileGrid !== undefined ? options.tileGrid :new TileGrid({
    //     origin: options.origin || this.origin, //数组类型，如[0,0],
    //     resolutions: options.resolutions || this.resolutions, //分辨率
    //     tileSize: options.tileSize || this.tileSize //瓦片图片大小
    // });
    this.tileGrid = options.tileGrid !== undefined ? options.tileGrid :
        ol.tilegrid.createXYZ({
            extent: tileExtent,// _ol_tilegrid.extentFromProjection(tileProjection),
            maxZoom: this.maxZoom,
            minZoom: this.minZoom,
            tileSize: this.tileSize
        });

    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;
    /**
    * @protected
    * @type {ol.TileUrlFunctionType}
    * 拼接取图地址方法
    */
    //this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction :this.tileUrlFunctionExtend;

    //this.url_ = "http://" + this.ip + ":" + this.port + "/igs/rest/mrms/docs/" + this.name;
    if (this.domain === '') {
        this.url_ = this.networkProtocol + "://" + this.ip + ":" + this.port + "/igs/rest/mrms/docs/" + this.name;
    }else {
        this.url_ = this.domain + "/igs/rest/mrms/docs/" + this.name;
    }
};
inherits(MapDocTileSource, TileImage);

/**
* 创建分辨率数组
*/
MapDocTileSource.prototype.getResolutions = function()
{
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
MapDocTileSource.prototype.tileUrlFunctionExtend = function(tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    // if (this.tileGrid != null) {
    //     var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
    //     if (!tileRange.contains(tileCoord)) {
    //         return;
    //     }
    // }
    var tileGrid = this.tileGrid;
    if (!tileGrid) {
        tileGrid = this.getTileGridForProjection(projection);
    }

    if (tileGrid.getResolutions().length <= tileCoord[0]) {
        return undefined;
    }

    if (tileGrid != null) {
        var tileRange = tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    //根据行列号，计算当前取图的范围即Bbox
    var cur_resolution = null;
    if(this.maxResolution!=null)
    {
       cur_resolution = this.maxResolution/ Math.pow(2, tileCoord[0]);
    }

        //定义参数
    var params = {
        'f': this.f,
        'cache': false,
        'rlt': this.rlt,
        'guid': this.guid
    };
    //设置地图文档显示样式
    if (this.style != null) {
        params['style'] = JSON.stringify(this.style);
    }
    //设置地图投影
    if (this.proj != null) {
        params['proj'] = JSON.stringify(this.proj);
    }
    //设置地图文档要显示的图层
    if (this.layers != null) {
        params['layers'] = this.layers;
    }
    //设置过滤条件
    if (this.filters != null) {
        params['filters'] = this.filters;
    }

    if (this.token) {
        params['token'] = this.token;
    }


    //计算一张瓦片的范围
    //var h = this.tileSize * cur_resolution;
   // var tileR = window.ol.TileRange(tileCoord[1],tileCoord[1],tileCoord[2],tileCoord[2]);
    var tileR = {minX:tileCoord[1],maxX:tileCoord[1],minY:tileCoord[2],maxY:tileCoord[2]};
    var opt_extent = null;
    //var bbox =  this.tileGrid.getTileRangeExtent(tileCoord[0],tileR,opt_extent);
    var bbox =  tileGrid.getTileRangeExtent(tileCoord[0],tileR,opt_extent);

    params['w'] = this.tileSize;
    params['h'] = this.tileSize;
    params['bbox'] = bbox.join(',');
    return appendParams(this.url_,params);
};

export { MapDocTileSource };
Zondy.Source.MapDocTileSource = MapDocTileSource;


/// <summary>
/// 显示动态裁图的矢量地图文档的功能服务
/// </summary>

/// <summary>显示动态裁图的矢量地图文档的功能服务构造函数</summary>
/// <param {string} opt_name 图层名称，无实际意义可为null.</param>
/// <param {string} opt_docName 要显示的地图文档名称.</param>
/// <param name="opt_options" type="Object">属性键值对</param>
var MapDocTileLayer = function(opt_name, opt_docName, opt_options)
{
        var options = opt_options !== undefined ? opt_options : {};
        options.layerName = opt_name;
        options.name = opt_docName;
        options.source = !!options.source ? options.source : new MapDocTileSource(options);
        var options_clone = assign({}, options);
        options_clone.maxResolution = Infinity;

        TileLayer.call(this, (options_clone));
        this.options = {};

        assign(this.options, options);
        assign(this, options);
}
inherits(MapDocTileLayer, TileLayer);

/**
* Source for MapGIS servers
* 刷新地图，重新取图，但保留了原有的GUID的标识
*/
MapDocTileLayer.prototype.refresh = function () {
    this.setSource(null);

    var opt_guid = this.options.source.guid;
    assign(this.options, { 'guid': opt_guid });
    this.options.source = new MapDocTileSource(this.options);
    this.setSource(this.options.source);
}
/**
* Source for MapGIS servers
* 获取地图样式
* 样式类型 Zondy.Object.CDisplayStyle
*/
MapDocTileLayer.prototype.getStyle = function () {
    return this.options.style !== undefined ? this.options.style : null;
}

/**
* Source for MapGIS servers
* 设置地图样式
*/
MapDocTileLayer.prototype.setStyle = function (opt_style) {
    if (opt_style !== undefined && opt_style !== null) {
        //this.style = opt_style;
        assign(this.options, { 'style': opt_style });
    }
}

/**
* Source for MapGIS servers
* 设置地图文档图层显示，隐藏，追加和删除等情况
* opt_layers 指定需要被取图的图层序列号，以“，”分隔,如1,2,3
* opt_type 状态类型,赋值类型为Zondy.Enum.Map.LayerStatusType
*/
MapDocTileLayer.prototype.setLayerStatus = function (opt_layers, opt_type) {
    if (opt_layers != null && opt_type != null) {
        var layersStatus = opt_type + ":" + opt_layers;
       // this.layers = layersStatus;
        assign(this.options, { 'layers': layersStatus});
        this.refresh();
    }
}

/**
* Source for MapGIS servers
* 设置地图文档图层显示，隐藏，追加和删除等情况
* opt_filters 用户指定的图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。
* 以“，”分隔,
* 如：1:ID>4,3:ID>1
* 如：1:面积>920
* 如：1:name='中华人民共和国'
* 如：FIRST_FIRS='Asia'
*/
MapDocTileLayer.prototype.setFilters = function (opt_filters) {
    if (opt_filters != null && opt_filters.toString() != "") {
       // this.filters = opt_filters;
        assign(this.options, { 'filters': opt_filters});
    }
};

export { MapDocTileLayer };
Zondy.Map.MapDocTileLayer = MapDocTileLayer;
