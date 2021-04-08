/// <summary>
/// 矢量地图文档资源_以瓦片方式
/// </summary>
import {Zondy} from '../../service/common/Base';
import {newGuid} from '../../service/common/Util';
import ImageSource, {defaultImageLoadFunction} from 'ol/source/Image';
import ImageLayer
    from 'ol/layer/Image';
import Image
    from 'ol/Image'
import * as ol_extent
    from 'ol/extent';
import * as ol_events
    from 'ol/events';
import * as ol_eventType
    from 'ol/events/EventType';
import {inherits} from 'ol/util';
import {assign} from 'ol/obj';
import {appendParams} from 'ol/uri';

var MapDocSource = function (opt_options) {
    var options = opt_options ? opt_options : {};
    ImageSource.call(this, {
        attributions: options.attributions,
        logo: options.logo,
        projection: options.projection,
        resolutions: options.resolutions
    });
    //*******************MapGIS************************

    this.token = options.token;
    this.mode = options.mode !== undefined ? options.mode : 'normal';
    //=======================================================================
    /**
     * @public
     * @type {string}
     * 地图服务请求地址
     */
    this.ip = options.ip !== undefined ? options.ip : "127.0.0.1";

    /**
     * @public
     * @type {string}
     * 地图服务请求端口
     */
    this.port = options.port !== undefined ? options.port : "6163";

    /**
     * @public
     * @type {string}
     * 要显示的地图文档名称（必须赋值）
     */
    this.name = options.name !== undefined ? options.name : null;

    /**
     * @public
     * @type {string}
     * 图像类型：jpg,png,gif
     */
    this.f = options.f !== undefined ? options.f : "png";

    /**
     * @public
     * @type {string}
     * 指示需要显示的地图图层号
     * show,hide,include,exclude 4种形式
     * eg:  'layers=show:1,2,3','layers=include:4,5,7'
     */
    this.layers = options.layers !== undefined ? options.layers : null;

    /**
     * @public
     * @type {string}
     * 用户指定的图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。
     * eg：'1:ID>4,3:ID>1'
     * 中文请使用UTF-8编码后再传入参数
     * javascitpt中请使用encodeURI（）函数编码后再代入filters参数中
     * 注意，在此函数中“：”和“，”是保留字符，用于表示键值对概念和分隔不同图层的条件，请不要将这2个字符用于自定义条件中
     */
    this.filters = options.filters !== undefined ? options.filters : null;

    /**
     * @public
     * @type {Zondy.Object.CDisplayStyle}
     * 显示参数
     */
    this.style = options.style !== undefined ? options.style : null;

    /**
     * @public
     * @type { Zondy.Object.CGetImageBySRSID}
     * 动态投影参数,设置地图文档在服务器端重新投影所需的空间参考系对象
     */
    this.proj = options.proj !== undefined ? options.proj : null;

    /**
     * @private
     * @type {string}
     * 唯一标识，一般无需赋值
     */
    this.guid = options.guid !== undefined ? options.guid : newGuid();

    /**
     * @public
     * @type {string}
     * 随机数用于取图无需取缓存，一般无需赋值
     */
    this.rlt = Math.random();
    //=====================================================================
    /**
     * @private
     * @type {string}
     * 请求方式
     */
    this.crossOrigin_ = options.crossOrigin !== undefined ? options.crossOrigin : null;

    /**
     * @private
     * @type {ol.ImageLoadFunctionType}
     * 非必要参数
     */
    this.imageLoadFunction_ = options.imageLoadFunction !== undefined ? options.imageLoadFunction : defaultImageLoadFunction;

    /**
     * @private
     * @type {ol.Image}
     *非必要参数，无须赋值
     */
    this.image_ = null;

    /**
     * @private
     * @type {ol.Size}
     *非必要参数，无须赋值
     */
    this.imageSize_ = [0, 0];

    /**
     * @private
     * @type {number}
     *非必要参数，无须赋值
     */
    this.renderedRevision_ = 0;

    /**
     * @private
     * @type {number}
     *非必要参数
     */
    this.ratio_ = options.ratio !== undefined ? options.ratio : 1.2;

    /**
     * @public
     * @type {boolean}
     * 高质量显示 true,false
     */
    this.isAntialiasing = options.isAntialiasing !== undefined ? options.isAntialiasing : null;

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

    //=======================================================================

    /**
     * @private
     * @type {string|undefined}
     * 非必要参数，无须赋值
     * 取图地址
     */
    //this.url_ = "http://" + this.ip + ":" + this.port + "/igs/rest/mrms/docs/" + this.name;
    if (this.domain === '') {
        this.url_ = this.networkProtocol + "://" + this.ip + ":" + this.port + "/igs/rest/mrms/docs/" + this.name;
    } else {
        this.url_ = this.domain + "/igs/rest/mrms/docs/" + this.name;
    }

};
inherits(MapDocSource, ImageSource);

/**
 * @inheritDoc
 * 拼接取图参数
 */
MapDocSource.prototype.getImage = function (extent, resolution, pixelRatio, projection) {
    if (this.url_ === undefined) {
        return null;
    }
    resolution = this.findNearestResolution(resolution);
    var image = this.image_;

    if (image &&
        this.renderedRevision_ === this.getRevision() &&
        image.getResolution() === resolution &&
        image.getPixelRatio() === pixelRatio &&
        ol_extent.containsExtent(image.getExtent(), extent)) {
        return image;
    }
    //客户端地图文档操作唯一标识
    if (this.guid === null) {
        this.guid = newGuid();
    }
    //定义参数
    var params = {
        'f': this.f,
        'cache': false,
        'rlt': this.rlt,
        'guid': this.guid
    };
    //设置地图文档显示样式
    if (this.style !== null) {
        assign(params, {'style': $.toJSON(this.style)});
    }
    //设置地图投影
    if (this.proj !== null) {
        assign(params, {'proj': $.toJSON(this.proj)});
    }
    //设置地图文档要显示的图层
    if (this.layers !== null) {
        assign(params, {'layers': this.layers});
    }
    //设置过滤条件
    if (this.filters !== null) {
        assign(params, {'filters': this.filters});
    }
    if (this.mode !== null) {
        assign(params, {'mode': this.mode});
    }
    //设置高质量显示
    if (this.isAntialiasing !== null) {
        assign(params, {'isAntialiasing': this.isAntialiasing});
    }

    extent = extent.slice();
    var centerX = (extent[0] + extent[2]) / 2;
    var centerY = (extent[1] + extent[3]) / 2;
    if (this.ratio_ !== 1) {
        var halfWidth = this.ratio_ * ol_extent.getWidth(extent) / 2;
        var halfHeight = this.ratio_ * ol_extent.getHeight(extent) / 2;
        extent[0] = centerX - halfWidth;
        extent[1] = centerY - halfHeight;
        extent[2] = centerX + halfWidth;
        extent[3] = centerY + halfHeight;
    }

    var imageResolution = resolution / pixelRatio;

    // Compute an integer width and height.
    var width = Math.ceil(ol_extent.getWidth(extent) / imageResolution);
    var height = Math.ceil(ol_extent.getHeight(extent) / imageResolution);

    // Modify the extent to match the integer width and height.
    extent[0] = centerX - imageResolution * width / 2;
    extent[2] = centerX + imageResolution * width / 2;
    extent[1] = centerY - imageResolution * height / 2;
    extent[3] = centerY + imageResolution * height / 2;

    this.imageSize_[0] = width;
    this.imageSize_[1] = height;
    var url = this.getRequestUrl_(extent, this.imageSize_, pixelRatio,
        projection, params);

    this.image_ = new Image(extent, resolution, pixelRatio, url, this.crossOrigin_, this.imageLoadFunction_);

    this.renderedRevision_ = this.getRevision();

    ol_events.listen(this.image_, ol_eventType.default.CHANGE,
        this.handleImageChange, this);
    return this.image_;

};

/**
 * 获取请求地址
 * @param {ol.Extent} extent Extent.
 * @param {ol.Size} size Size.
 * @param {number} pixelRatio Pixel ratio.
 * @param {ol.proj.Projection} projection Projection.
 * @param {Object} params Params.
 * @return {string} Request URL.
 * @private
 */
MapDocSource.prototype.getRequestUrl_ = function (extent, size, pixelRatio, projection, params) {
    assign(params, {'w': size[0]});
    assign(params, {'h': size[1]});
    if (this.layers !== null) {
        assign(params, {'layers': this.layers});
    }
    var axisOrientation = projection.getAxisOrientation();
    assign(params, {'bbox': extent.join(',')});
    if (this.token) {
        assign(params, {'token': this.token});
    }
    return appendParams(this.url_, params);
};

export {MapDocSource};
Zondy.Source.MapDocSource = MapDocSource;
//**********************************************************Zondy.Source.MapDocSource(end)************************************************//


/// <summary>显示矢量地图文档的功能服务构造函数</summary>
/// <param {string} opt_name 图层名称，无实际意义可为null.</param>
/// <param {string} opt_docName 要显示的地图文档名称.</param>
/// <param name="opt_options" type="Object">属性键值对</param>
/**
 * @class Zondy.Map.Doc
 * @classdesc Doc显示矢量地图文档，与MapDocTileLayer的区别是Doc方法只会返回一张图片，而MapDocTileLayer会将地图裁成多张返回
 * @description Zondy.Map.Doc
 * @param opt_name - {String} 可选项，显示瓦片地图的名称，无实际意义，可为NULL。
 * @param opt_docName - {String} 必选项，动态裁图的矢量地图文档的名称(IGServer上发布的实际名称)
 * @param opt_options - {Object} 必选项，设置其他属性键值对对象。对象中的属性来自本类的属性。例如：{key1：value1, key2：value2 …}
 * @param {String} [opt_options.ip = ''] 必选项，服务器ip地址，本地为“127.0.0.1”或“localhost”。
 * @param {String} [opt_options.port = '6163'] 必选项，服务器端口号，默认值6163
 * @param {String} [opt_options.token = ''] 可选项，服务访问控制，如果在 MapGIS Server Manager 服务管理中开启token，须设置此项，其key值可在设置处获取。
 * @param {String} [opt_options.f = 'png'] 可选项，图像类型，取值为：jpg|png|gif，默认值png
 * @param {String} [opt_options.layers = ''] 可选项，控制矢量地图文档中图层的显示，显示状态有四种形式：show：表示只显示指定图层;hide：表示隐藏不需要显示的图层;include：表示显示除默认图层（地图文档内图层状态为可见的图层）外，另追加指定图层;exclude:表示从默认图层列表里删除指定图层后进行显示;语法为：“layers=显示状态：图层序号，图层序号...”,如“layers=show:1,2,3”。当不设置此项时，表示显示全部图层。
 * @param {String} [opt_options.filters = 'false'] 可选项，图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。如：'1:ID>4,3:ID>1”。过滤条件中用到的符号包括“==”、“!=”、“<”、“>”、“<=”、“>=”、“..”、“~”等，当包含中文条件时，请使用UTF-8编码格式，其中“：”和“，”为保留字符，用于表示键值对概念和分隔不同图层的条件，请不要将这2个字符用于自定义条件中，javascitpt中请使用encodeURI（）函数编码后再代入filters参数中。
 * @param {Zondy.Object.CDisplayStyle} [opt_options.style = ''] 可选项，地图文档显示样式参数
 * @param {Zondy.Object.CGetImageBySRSID} [opt_options.proj = ''] 可选项，动态投影参数,设置地图文档在服务器端重新投影所需的空间参考系对象。
 * @param {String} [opt_options.guid = ''] 可选项，地图文档缓存的唯一标识，一般无需赋值。
 * @example
    //定义地图文档图层和地图
    var mapDocLayer, map;
    // 初始化地图显示
    function init() {
        //初始化地图容器
        map = new ol.Map({
            target: "mapCon",
            view: new ol.View({
                center: [(108.34341 + 116.150939561213) / 2, (29.0125822276524 + 33.2932017737021) / 2],
                zoom: 6,
                projection: "EPSG:4326"
            })
        });
        var { protocol, ip, port } = window.webclient;
        //初始化地图文档图层对象
        mapDocLayer = new Zondy.Map.Doc("MapGIS IGS MapDocLayer", "Hubei4326", {
            ip: `${ip}`,
            port: `${port}`
        });
        //将地图文档图层加载到地图中
        map.addLayer(mapDocLayer);
    }
 */
var Doc = function (opt_name, opt_docName, opt_options) {
    this.options = opt_options ? opt_options : {};

    assign(this.options, {'layerName': opt_name});
    assign(this.options, {'name': opt_docName});
    ImageLayer.call(this, (this.options));

    this.style = this.options.style !== undefined ? this.options.style : null;
    this.filters = this.options.filters !== undefined ? this.options.filters : null;
    this.layers = this.options.layers !== undefined ? this.options.layers : null;
    this.isAntialiasing = this.options.isAntialiasing !== undefined ? this.options.isAntialiasing : null;

    this.source = this.options.source !== undefined ? this.options.source : null;
    if (this.source === null) {
        this.source = new Zondy.Source.MapDocSource(this.options);
    }
    this.setSource(this.source);

    assign(this, this.options);
};
inherits(Doc, ImageLayer);

/**
 * Source for MapGIS servers
 * 刷新地图，重新取图，但保留了原有的GUID的标识
 */
/**
 * @function Zondy.Map.Doc.refresh
 * @description 刷新地图，重新取图，但保留了原有的guid的标识。
 * @example
 * mapDocLayer.refresh()
 */
Doc.prototype.refresh = function () {
    this.setSource(null);

    var opt_guid = this.source.guid;
    assign(this.options, {'guid': opt_guid});
    if (this.style !== undefined && this.style !== null) {
        assign(this.options, {'style': this.style});
    }
    if (this.filters !== undefined && this.filters !== null) {
        assign(this.options, {'filters': this.filters});
    }
    if (this.layers !== undefined && this.layers !== null) {
        assign(this.options, {'layers': this.layers});
    }
    if (this.isAntialiasing !== undefined && this.isAntialiasing !== null) {
        assign(this.options, {'isAntialiasing': this.isAntialiasing});
    }
    this.source = new Zondy.Source.MapDocSource(this.options);
    this.setSource(this.source);
};

/**
 * Source for MapGIS servers
 * 获取地图样式
 * 样式类型 Zondy.Object.CDisplayStyle
 */

/**
 * @function Zondy.Map.Doc.getStyle
 * @description 获取地图文档显示样式参数信息。
 * @return {Zondy.Object.CDisplayStyle[]} 描述地图文档显示样式的参数信息.
 * @example
 * mapDocLayer.getStyle()
 */
Doc.prototype.getStyle = function () {
    return this.options.style !== undefined ? this.options.style : null;
};

/**
 * Source for MapGIS servers
 * 设置地图样式
 */
/**
 * @function Zondy.Map.Doc.setStyle(opt_style)
 * @description 设置地图文档显示样式参数信息。
 * @param opt_style - {Zondy.Object.CDisplayStyle[]} 地图文档显示样式参数。
 * @example
 * mapDocLayer.setStyle(opt_style)
 */
Doc.prototype.setStyle = function (opt_style) {
    if (opt_style !== undefined && opt_style !== null) {
        this.style = opt_style;
    }
};

/**
 * Source for MapGIS servers
 * 设置地图文档图层显示，隐藏，追加和删除等情况
 * opt_layers 指定需要被取图的图层序列号，以“，”分隔,如1,2,3
 * opt_type 状态类型,赋值类型为Zondy.Enum.Map.LayerStatusType
 */
/**
 * @function Zondy.Map.Doc.setLayerStatus(opt_layers, opt_type)
 * @description 设置地图文档显示样式参数信息。
 * @param opt_layers - {String} 指定需要被取图的图层序列号，以“，”分隔,如“1,2,3”
 * @param opt_type - {Zondy.Enum.Map.LayerStatusType} 图层状态类型，show：只显示show参数指定了图层序号的图层，
 * hide：显示除hide参数指定图层外所有的图层，include：除显示默认图层（地图文档内图层状态为可见的图层）外，另追加这些被指定的图层显示，追加的这些图层必须为地图中包含的图层
 * exclude：从默认图层列表里删除exclude参数指定的图层后，进行显示
 * @example
 * //第0个图层隐藏
 * mapDocLayer.setLayerStatus(0,'hide')
 */
Doc.prototype.setLayerStatus = function (opt_layers, opt_type) {
    if (opt_layers !== null && opt_type !== null) {
        var layersStatus = opt_type + ":" + opt_layers;
        this.layers = layersStatus;
        this.refresh();
    }
};

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
 * @function Zondy.Map.mapDocLayer.setFilters(opt_filters)
 * @description 设置地图文档图层过滤条件。
 * @param opt_filters - {String} 过滤条件。如：'1:ID>4,3:ID>1”。
 过滤条件中用到的符号包括“==”、“!=”、“<”、“>”、“<=”、“>=”、“..”、“~”等，当包含中文条件时，请使用UTF-8编码格式，其中“：”和“，”为保留字符，用于表示键值对概念和分隔不同图层的条件，请不要将这2个字符用于自定义条件中，javascitpt中请使用encodeURI（）函数编码后再代入filters参数中。
 * @example
 //显示第0个图层，所有id大于1的数据
 * var opt_style = '0:id>1';
 * mapDocLayer.setFilters(opt_filters)
 * mapDocLayer.refresh()
 */
Doc.prototype.setFilters = function (opt_filters) {
    if (opt_filters !== null && opt_filters.toString() !== "") {
        this.filters = opt_filters;
    }
};

export {Doc};
Zondy.Map.Doc = Doc;