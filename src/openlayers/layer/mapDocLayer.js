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
Doc.prototype.getStyle = function () {
    return this.options.style !== undefined ? this.options.style : null;
};

/**
 * Source for MapGIS servers
 * 设置地图样式
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
Doc.prototype.setFilters = function (opt_filters) {
    if (opt_filters !== null && opt_filters.toString() !== "") {
        this.filters = opt_filters;
    }
};

export {Doc};
Zondy.Map.Doc = Doc;