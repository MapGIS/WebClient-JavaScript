import {Zondy} from '../../service/common/Base';
import {newGuid} from '../../service/common/Util';
import SourceImage
    from 'ol/source/Image.js';
import * as  ImageLoadFucntion
    from 'ol/source/Image.js';
import * as ol_extent
    from 'ol/extent.js';
import TileGrid
    from 'ol/tilegrid/TileGrid.js';
import {inherits} from 'ol/util.js';
import Image
    from 'ol/Image.js';
import {
    containsExtent,
    getWidth,
    getHeight
} from 'ol/extent.js';
import {assign} from 'ol/obj.js';
import {appendParams} from 'ol/uri.js';
import ImageLayer
    from 'ol/layer/Image.js';
//**********************************************************Zondy.Source.MapLayerSource(start)************************************************//
/// <summary>矢量图层资源构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
var MapLayerSource = function (opt_options) {
    var options = opt_options ? opt_options : {};

    ol.source.Image.call(this, {
        attributions: options.attributions,
        logo: options.logo,
        projection: options.projection,
        resolutions: options.resolutions
    });

    //*******************MapGIS************************

    //======================================================================================
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
     * @type {string}
     * 图像类型：jpg,png,gif
     */
    this.f = options.f !== undefined ? options.f : "png";

    /**
     * @public
     * @type {string}
     * 随机数用于取图无需取缓存，一般无需赋值
     */
    this.rlt = Math.random();

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
     * @type {Array.<Zondy.Object.CDisplayStyle>}
     * 显示参数
     * [Zondy.Object.CDisplayStyle,Zondy.Object.CDisplayStyle]
     */
    this.style = options.style !== undefined ? options.style : null;

    /**
     * @private
     * @type {string}
     * 客户端标识，用以服务器缓存地图，此属性一般内部
     */
    this.guid = options.guid !== undefined ? options.guid : Zondy.Util.newGuid();

    //=========================================================================================

    /**
     * @private
     * @type {string}
     */
    this.crossOrigin_ = options.crossOrigin !== undefined ? options.crossOrigin : null;

    /**
     * @private
     * @type {ol.ImageLoadFunctionType}
     * 非必要参数，无须赋值
     */
    this.imageLoadFunction_ = options.imageLoadFunction !== undefined ? options.imageLoadFunction : ImageLoadFucntion.defaultImageLoadFunction;

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
     * 非必要参数，无须赋值
     */
    this.renderedRevision_ = 0;

    /**
     * @private
     * @type {number}
     * 非必要参数，无须赋值
     */
    this.ratio_ = options.ratio !== undefined ? options.ratio : 1.5;

    //===========================================================================

    /**
     * @private
     * @type {string|undefined}
     * 非必要参数，无须赋值
     */
    this.url_ = "http://" + this.ip + ":" + this.port + "/igs/rest/mrms/layers";
};
inherits(MapLayerSource, SourceImage);

/**
 * @inheritDoc
 * 拼接取图参数
 */
MapLayerSource.prototype.getImage = function (extent, resolution, pixelRatio, projection) {
    if (this.url_ == undefined) {
        return null;
    }
    resolution = this.findNearestResolution(resolution);
    var image = this.image_;
    if (image &&
        this.renderedRevision_ == this.getRevision() &&
        image.getResolution() == resolution &&
        image.getPixelRatio() == pixelRatio &&
        containsExtent(image.getExtent(), extent)) {
        return image;
    }
    if (this.guid == null) {
        this.guid = newGuid();
    }
    //定义参数
    var params = {
        'f': this.f,
        'rlt': this.rlt,
        'guid': this.guid
    };

    if (this.gdbps != null && this.gdbps != "") {
        assign(params, {'gdbps': this.gdbps.join(',')});
    }
    //设置地图文档显示样式
    if (this.style != null) {
        assign(params, {'style': $.toJSON(this.style)});
    }
    //设置过滤条件
    if (this.filters != null) {
        assign(params, {'filters': this.filters});
    }

    extent = extent.slice();
    var centerX = (extent[0] + extent[2]) / 2;
    var centerY = (extent[1] + extent[3]) / 2;
    if (this.ratio_ != 1) {
        var halfWidth = this.ratio_ * getWidth(extent) / 2;
        var halfHeight = this.ratio_ * getHeight(extent) / 2;
        extent[0] = centerX - halfWidth;
        extent[1] = centerY - halfHeight;
        extent[2] = centerX + halfWidth;
        extent[3] = centerY + halfHeight;
    }

    var imageResolution = resolution / pixelRatio;

    // Compute an integer width and height.
    var width = Math.ceil(getWidth(extent) / imageResolution);
    var height = Math.ceil(getHeight(extent) / imageResolution);

    // Modify the extent to match the integer width and height.
    extent[0] = centerX - imageResolution * width / 2;
    extent[2] = centerX + imageResolution * width / 2;
    extent[1] = centerY - imageResolution * height / 2;
    extent[3] = centerY + imageResolution * height / 2;

    this.imageSize_[0] = width;
    this.imageSize_[1] = height;
    var url = this.getRequestUrl_(extent, this.imageSize_, pixelRatio,
        projection, params);

    // this.image_ = new Image(extent, resolution, pixelRatio,
    //     this.getAttributions(), url, this.crossOrigin_, this.imageLoadFunction_);

    this.image_ = new Image(extent, resolution, pixelRatio,
        url, this.crossOrigin_, this.imageLoadFunction_);

    this.renderedRevision_ = this.getRevision();

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
MapLayerSource.prototype.getRequestUrl_ =
    function (extent, size, pixelRatio, projection, params) {

        // goog.asserts.assert(goog.isDef(this.url_));
        assign(params, {'w': size[0]});
        assign(params, {'h': size[1]});
        if (this.layers != null) {
            assign(params, {'layers': this.layers});
        }
        var axisOrientation = projection.getAxisOrientation();
        var bbox = extent;
        assign(params, {'bbox': bbox.join(',')});
        return appendParams(this.url_, params);
    };

/**
 * 获取MapGIS 资源请求地址.
 * @return {string|undefined} URL.
 * @api stable
 */
MapLayerSource.prototype.getUrl = function () {
    return this.url_;
};

/**
 * 设置MapGIS 资源请求地址.
 * @param {string|undefined} url URL.
 * @api stable
 */
MapLayerSource.prototype.setUrl = function (url) {
    if (url != this.url_) {
        this.url_ = url;
        this.image_ = null;
        this.changed();
    }
};

export {MapLayerSource};
Zondy.Source.MapLayerSource = MapLayerSource;

//**********************************************************Zondy.Source.MapLayerSource(end)************************************************//


//**********************************************************Zondy.Map.Layer(start)************************************************//

/// <summary>显示矢量图层的功能服务构造函数</summary>
/// <param {string} opt_name 图层名称，无实际意义可为null.</param>
/// <param {Array.<string>} opt_gdbps 要显示的图层地址，数组类型,
/// 如: ["gdbps= gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/海洋陆地","gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/国界"].
/// </param>
/// <param name="opt_options" type="Object">属性键值对</param>
var Layer = function (opt_name, opt_gdbps, opt_options) {
    this.options = opt_options ? opt_options : {};
    ol.layer.Image.call(this, (this.options));

    assign(this.options, {'layerName': opt_name});
    assign(this.options, {'gdbps': opt_gdbps});

    this.style = this.options.style !== undefined ? this.options.style : null;
    this.filters = this.options.filters !== undefined ? this.options.filters : null;

    this.source = this.options.source !== undefined ? this.options.source : null;
    if (this.source == null) {
        this.source = new Zondy.Source.MapLayerSource(this.options);
    }
    this.setSource(this.source);

    assign(this, this.options);
};
inherits(Layer, ImageLayer);

/**
 * Source for MapGIS servers
 * 刷新地图，重新取图，但保留了原有的GUID的标识
 */
Layer.prototype.refresh = function () {
    this.setSource(null);
    var opt_guid = this.source.guid;
    assign(this.options, {'guid': opt_guid});
    if (this.style !== undefined && this.style !== null) {
        assign(this.options, {'style': this.style});
    }
    if (this.filters !== undefined && this.filters !== null) {
        assign(this.options, {'filters': this.filters});
    }
    this.source = new Zondy.Source.MapLayerSource(this.options);
    this.setSource(this.source);
}

/**
 * Source for MapGIS servers
 * 获取地图样式
 */
Layer.prototype.getStyle = function () {
    return this.options.style !== undefined ? this.options.style : null;
}

/**
 * Source for MapGIS servers
 * 设置地图样式
 */
Layer.prototype.setStyle = function (opt_style) {
    if (opt_style !== undefined && opt_style !== null) {
        this.style = opt_style;
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
Layer.prototype.setFilters = function (opt_filters) {
    if (opt_filters != null && opt_filters.toString() != "") {
        this.filters = opt_filters;
    }
};

export {Layer};
Zondy.Map.Layer = Layer;
//**********************************************************Zondy.Map.Layer(end)************************************************//