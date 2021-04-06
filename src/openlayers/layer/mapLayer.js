/// <summary>
/// 矢量地图文档资源_以瓦片方式
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
import {assign} from 'ol/obj.js';
import {appendParams} from 'ol/uri.js';
import TileLayer
    from 'ol/layer/Tile.js';

var MapLayerTileSource = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};

    /**
     * @private
     * @type {Array.<number>}
     * 创建网格(内部调用)
     */
    TileImage.call(this, {
        attributions: options.attributions,
        logo: options.logo,
        opaque: options.opaque,
        state: options.state !== undefined ? options.state : undefined,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        projection: options.projection,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null //"anonymous"为跨域调用,
    });
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
     * @type {Array.<string>}
     * 要显示的矢量图层的URL地址
     */
    this.gdbps = options.gdbps !== undefined ? options.gdbps : null;
    if (this.gdbps == null) {
        alert("当前没有赋值要显示的矢量图层！");
        return;
    }

    /**
     * @public
     * @type {number}
     * 最大分辨率,新瓦片必须指定
     */
    this.maxResolution = options.maxResolution !== undefined ? options.maxResolution : null;


    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : null;

    //地图范围
    var layerExtent = [-180, -90, 180, 90];
    if (tileProjection != null) {
        layerExtent = tileProjection.getExtent();
    }

    //设置图层范围
    this.extent = options.extent !== undefined ? options.extent : layerExtent;

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
    this.resolutions = this.getResolutions();

    this.origin = options.origin !== undefined ? options.origin : ol_extent.getTopLeft(this.extent);
    this.rlt = Math.random();
    this.f = options.f !== undefined ? options.f : "png";


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
    this.networkProtocol = options.networkProtocol !== undefined ? options.networkProtocol : location.protocol.split(":")[0] || "http";

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
    this.tileGrid = new TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;

    //by xie
    /**
     * 设置投影参考系，参考系名
     * @private
     * @type {string}
     * 非必要参数，无须赋值
     */
    this.proj = options.proj;
    /**
     * @protected
     * @type {ol.TileUrlFunctionType}
     * 拼接取图地址方法
     */
    //this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction :this.tileUrlFunctionExtend;

    /**
     * @type {string}
     * @description ShapeFile的服务器shp文件路径
     */
    this.mapstyUri = options.mapstyUri;

    /**
     * @type {Object}
     * @description ShapeFile的服务器样式文件xml路径
     */
    this.mapstyOption = options.mapstyOption;

    //this.url_ = "http://" + this.ip + ":" + this.port + "/igs/rest/mrms/layers";
    if (this.domain === '') {
        this.url_ = this.networkProtocol + "://" + this.ip + ":" + this.port + "/igs/rest/mrms/layers";
    }else {
        this.url_ = this.domain + "/igs/rest/mrms/layers";
    }
};
inherits(MapLayerTileSource, TileImage);

/**
 * 创建分辨率数组
 */
MapLayerTileSource.prototype.getResolutions = function () {
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
MapLayerTileSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }

    //根据行列号，计算当前取图的范围即Bbox
    var cur_resolution = null;
    if (this.maxResolution != null) {
        cur_resolution = this.maxResolution / Math.pow(2, tileCoord[0]);
    }

    //定义参数
    var params = {
        'f': this.f,
        'rlt': this.rlt,
        'guid': this.guid,
        'mapstyUri': '',
        'mapstyOption': {}
    };

    if (this.gdbps != null && this.gdbps != "") {
        assign(params, {'gdbps': this.gdbps.join(',')});
    }
    //设置地图文档显示样式
    if (this.style != null) {
        assign(params, {'style': JSON.stringify(this.style)});
    }
    //设置过滤条件
    if (this.filters != null) {
        assign(params, {'filters': this.filters});
    }

    //设置投影转换过滤条件
    if (this.proj != null) {
        assign(params, {'proj': this.proj});
    }

    //计算一张瓦片的范围 
    //var h = this.tileSize * cur_resolution;
    // var tileR = window.ol.TileRange(tileCoord[1],tileCoord[1],tileCoord[2],tileCoord[2]);
    var tileR = {
        minX: tileCoord[1],
        maxX: tileCoord[1],
        minY: tileCoord[2],
        maxY: tileCoord[2]
    };
    var opt_extent = null;
    var bbox = this.tileGrid.getTileRangeExtent(tileCoord[0], tileR, opt_extent);

    params['w'] = this.tileSize;
    params['h'] = this.tileSize;
    params['bbox'] = bbox.join(',');
    params['mapstyUri'] = this.mapstyUri;
    params['mapstyOption'] = JSON.stringify(this.mapstyOption);
    return appendParams(this.url_, params);
};

export {MapLayerTileSource};
Zondy.Source.MapLayerTileSource = MapLayerTileSource;


/// <summary>显示矢量图层的功能服务构造函数</summary>
/// <param {string} opt_name 图层名称，无实际意义可为null.</param>
/// <param {Array.<string>} opt_gdbps 要显示的图层地址，数组类型,
/// 如: ["gdbps= gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/海洋陆地","gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/国界"].
/// </param>
/// <param name="opt_options" type="Object">属性键值对</param>
/**
 * @class Zondy.Map.GdbpLayer
 * @classdesc GdbpLayer显示矢量图层
 * @description Zondy.Map.GdbpLayer
 * @param opt_name - {String} 可选项，显示瓦片地图的名称，无实际意义，可为NULL。
 * @param opt_gdbps - {String} 必选项，简单要素类的URL地址信息（包括源要素类存储路径与名称），用户根据语法设置URL地址，或在数据库中图层节点上右击选择“复制URL”获得。多个间用“，”号隔开。如: ["gdbps= gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/海洋陆地","gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/国界"]。
 * @param opt_options - {Object} 必选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2 …}
 * @param {String} [opt_options.ip = ''] 必选项，服务器ip地址，本地为“127.0.0.1”或“localhost”。
 * @param {String} [opt_options.port = '6163'] 必选项，服务器端口号，默认值6163
 * @param {String[]} [opt_options.gdbps = ''] 可选项，简单要素类的URL地址信息（包括源要素类存储路径与名称），用户根据语法设置URL地址，或在数据库中图层节点上右击选择“复制URL”获得。多个间用“，”号隔开。如: ["gdbps= gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/海洋陆地","gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/国界"]。
 * @param {String} [opt_options.f = 'png'] 可选项，图像类型，取值为：jpg|png|gif，默认值png
 * @param {String} [opt_options.filters = ''] 可选项，图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。如：'1:ID>4,3:ID>1”。过滤条件中用到的符号包括“==”、“!=”、“<”、“>”、“<=”、“>=”、“..”、“~”等，当包含中文条件时，请使用UTF-8编码格式，其中“：”和“，”为保留字符，用于表示键值对概念和分隔不同图层的条件，请不要将这2个字符用于自定义条件中，javascitpt中请使用encodeURI（）函数编码后再代入filters参数中。
 * @param {Zondy.Object.CDisplayStyle[]} [opt_options.style = ''] 可选项，矢量图层显示样式参数，与图层序号相对应。
 * @param {Number[]} [opt_options.extent = ''] 可选项，图层数据范围
 * @param {String} [opt_options.guid = ''] 可选项，矢量图层缓存的唯一标识，一般情况下无需赋值。
 * @example
 <script type="text/javascript">
    //定义地图文档图层和地图
    var VecLayer, map;
    //初始化地图显示
    function init() {
        //地图范围
        var extent = [634883.45517486, 3423051.6221381, 643377, 3431937.8];
        //投影坐标系
        var projection = new ol.proj.Projection({ units: ol.proj.Units.METERS, extent: extent });
        //中心点
        var center = ol.extent.getCenter(extent);
        //图层显示名称
        var name = "MapGIS IGS VecLayer";
        //要显示的图层的gdbps地址
        var gdbps = ["gdbp://MapGisLocal/sample/ds/地图综合/sfcls/水系"];
        //创建一个图层
        VecLayer = new Zondy.Map.GdbpLayer(name, gdbps, {
            ip: "develop.smaryun.com",
            port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
            extent:extent,
            mapstyUri: 'mapstyUri',
            mapstyOption: 'mapstyOption'
        });
        //创建一个地图容器
        map = new ol.Map({
            //目标DIV
            target: 'mapCon',
            //添加图层到地图容器中
            layers: [VecLayer],
            view: new ol.View({
                center: center,
                projection: projection,
                zoom: 2
            })
        });
    }
 </script>
 */
var GdbpLayer = function (opt_name, opt_gdbps, opt_options) {
    var options = opt_options ? opt_options : {};
    assign(options, {'layerName': opt_name});
    assign(options, {'gdbps': opt_gdbps});

    assign(options, {'source': !!options.source ? options.source : new MapLayerTileSource(options)});
    TileLayer.call(this, options);

    this.options = {};
    assign(this.options, options);
    assign(this, options);
}
inherits(GdbpLayer, TileLayer);

/**
 * Source for MapGIS servers
 * 刷新地图，重新取图，但保留了原有的GUID的标识
 */
/**
 * @function Zondy.Map.GdbpLayer.refresh
 * @description 刷新地图，重新取图，但保留了原有的guid的标识。
 * @example
 * VecLayer.refresh()
 */
GdbpLayer.prototype.refresh = function () {
    this.setSource(null);
    var opt_guid = this.options.source.guid;
    assign(this.options, {'guid': opt_guid});
    if (this.style !== undefined && this.style !== null) {
        assign(this.options, {'style': this.style});
    }
    if (this.filters !== undefined && this.filters !== null) {
        assign(this.options, {'filters': this.filters});
    }
    this.options.source = new MapLayerTileSource(this.options);
    this.setSource(this.options.source);
}

/**
 * Source for MapGIS servers
 * 获取地图样式
 */
/**
 * @function Zondy.Map.GdbpLayer.getStyle
 * @description 获取地图文档显示样式参数信息。
 * @return {Zondy.Object.CDisplayStyle[]} 描述地图文档显示样式的参数信息.
 * @example
 * VecLayer.getStyle()
 */
GdbpLayer.prototype.getStyle = function () {
    return this.options.style !== undefined ? this.options.style : null;
}

/**
 * Source for MapGIS servers
 * 设置地图样式
 */
/**
 * @function Zondy.Map.GdbpLayer.setStyle(opt_style)
 * @description 设置地图文档显示样式参数信息。
 * @param opt_style - {Zondy.Object.CDisplayStyle[]} 地图文档显示样式参数。
 * @example
 * VecLayer.setStyle(opt_style)
 */
GdbpLayer.prototype.setStyle = function (opt_style) {
    if (opt_style !== undefined && opt_style !== null) {
        this.style = opt_style;
        assign(this.options, {'style': opt_style});
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
/**
 * @function Zondy.Map.GdbpLayer.setFilters(opt_filters)
 * @description 设置地图文档图层过滤条件。
 * @param opt_filters - {String} 过滤条件。如：'1:ID>4,3:ID>1”。
 过滤条件中用到的符号包括“==”、“!=”、“<”、“>”、“<=”、“>=”、“..”、“~”等，当包含中文条件时，请使用UTF-8编码格式，其中“：”和“，”为保留字符，用于表示键值对概念和分隔不同图层的条件，请不要将这2个字符用于自定义条件中，javascitpt中请使用encodeURI（）函数编码后再代入filters参数中。
 * @example
 //显示第0个图层，所有id大于1的数据
 * var opt_style = '0:id>1';
 * VecLayer.setFilters(opt_filters)
 * VecLayer.refresh()
 */
GdbpLayer.prototype.setFilters = function (opt_filters) {
    if (opt_filters != null && opt_filters.toString() != "") {
        this.filters = opt_filters;
        assign(this.options, {'filters': opt_filters});
    }
};
export {GdbpLayer};
Zondy.Map.GdbpLayer = GdbpLayer;

