import Cesium from "../../../node_modules/cesium/Source/Cesium";
import { CesiumZondy } from "../core/Base";

var defaultCreditZondy = new Cesium.Credit("MapGISMap");

/**
 * @class 
 * @param {*} options 
 */
export function WmtsTileProvider(options) {
  function MapGISMapImageProvider(options) {
    options = Cesium.defaultValue(options, {});

    this.options = options;
    this._imageVersion = Cesium.defaultValue(options.imageVersion, "0");
    //var url = Cesium.defaultValue(options.url, "http://localhost:6163/igs/rest/mrms/tile/QUANQIU_180_ZC/{level}/{row}/{col}");
    this._resource = new Cesium.Resource.createIfNeeded(options.url); //Resource.createIfNeeded(url);

    this._mapStyle = options.mapStyle;
    this._colNum = Cesium.defaultValue(options.colNum, 2);
    this._rowNum = Cesium.defaultValue(options.rowNum, 1);
    this._proxy = options.proxy;
    this._imageInfoUrl = null;
    this._tilingScheme = Cesium.defaultValue(
      options.tilingScheme,
      new Cesium.GeographicTilingScheme({
        rectangle: Cesium.defaultValue(
          options.rectangle,
          new Cesium.Rectangle.fromDegrees(-180, -90, 180, 90)
        ),
        ellipsoid: Cesium.Ellipsoid.WGS84,
        numberOfLevelZeroTilesX: this._colNum,
        numberOfLevelZeroTilesY: this._rowNum,
      })
    );

    this._rectangle = Cesium.defaultValue(
      options.rectangle,
      this._tilingScheme.rectangle
    );
    this._tileDiscardPolicy = options.tileDiscardPolicy;
    this._tileWidth = Cesium.defaultValue(options.tileWidth, 256);
    this._tileHeight = Cesium.defaultValue(options.tileWidth, 256);
    this._enablePickFeatures = Cesium.defaultValue(
      options.enablePickFeatures,
      false
    );
    this._minimumLevel = Cesium.defaultValue(options.minimumLevel, 0);
    this._maximumLevel = Cesium.defaultValue(options.maximumLevel, 20);

    // this.url = options.url;
    this.layer = options.layer;
    this.style = options.style;
    this.format = options.format;
    this.tilematrixset = options.tilematrixset;
    this.version = options.version || '1.0.0'

    //韩彦生  --这里检查最小级别的瓦片数（限制不能大于4，否则后面的级别下载渲染的数据量太大容易死机）
    var swTile = this._tilingScheme.positionToTileXY(
      new Cesium.Rectangle.southwest(this._rectangle),
      this._minimumLevel
    );
    var neTile = this._tilingScheme.positionToTileXY(
      new Cesium.Rectangle.northeast(this._rectangle),
      this._minimumLevel
    );
    var tileCount =
      (Math.abs(neTile.x - swTile.x) + 1) * (Math.abs(neTile.y - swTile.y) + 1);
    if (tileCount > 4) {
      //throw new Cesium.DeveloperError('最小级别瓦片数量要小于4');
    }

    this._errorEvent = new Cesium.Event();
    this._ready = true;
    this._credit = Cesium.defaultValue(options.credit, defaultCreditZondy);
  }
  //注意MapGIS的xy和谷歌天地图以及其他瓦片的xy是相反的 x-y，y-x
  function buildImageResource(imageryProvider, x, y, level, request) {
    var imageUrl = imageryProvider._resource.url;

    let version = imageryProvider.version || '1.0.0';
    let layer = imageryProvider.layer;
    let style = imageryProvider.style;
    let format = imageryProvider.format || 'image/png';
    let tilematrixset = imageryProvider.tilematrixset;
    let tileMatrixSetID = imageryProvider.tileMatrixSetID;

    imageUrl = imageUrl + `?service=WMTS&version=${version}&request=GetTile` 
      + `&layer=${layer}&style=${style}`
      + `&tilematrixset=${tilematrixset}&format=${format}`
      + `&tilematrix=${level}&tilerow=${y}&tilecol=${x}`

  
    return imageryProvider._resource.getDerivedResource({
      url: imageUrl,
      request: request,
      proxy: imageryProvider._proxy, //添加代理处理
      // templateValues: {
      //    subdomain: subdomains[subdomainIndex],
      //     culture: imageryProvider._culture
      // }
    });
  }

  Cesium.defineProperties(MapGISMapImageProvider.prototype, {
    url: {
      get: function () {
        return this._url;
      },
    },
    /**
     * 获取代理.
     * @memberof MapGISMapImageProvider.prototype
     * @type {Proxy}
     * @readonly
     */
    proxy: {
      get: function () {
        return this._proxy;
      },
    },

    tileWidth: {
      get: function () {
        //>>includeStart('debug', pragmas.debug);
        if (!this._ready) {
          throw new Cesium.DeveloperError("图层未创建.");
        }
        //>>includeEnd('debug');

        return this._tileWidth;
      },
    },

    tileHeight: {
      get: function () {
        //>>includeStart('debug', pragmas.debug);
        if (!this._ready) {
          throw new Cesium.DeveloperError("图层未创建");
        }
        //>>includeEnd('debug');

        return this._tileHeight;
      },
    },

    maximumLevel: {
      get: function () {
        //>>includeStart('debug', pragmas.debug);
        if (!this._ready) {
          throw new Cesium.DeveloperError("图层未创建");
        }
        //>>includeEnd('debug');

        return this._maximumLevel;
      },
    },

    minimumLevel: {
      get: function () {
        //>>includeStart('debug', pragmas.debug);
        if (!this._ready) {
          throw new Cesium.DeveloperError("minimumLevel 图层未创建");
        }
        //>>includeEnd('debug');

        return this._minimumLevel;
      },
    },

    tilingScheme: {
      get: function () {
        //>>includeStart('debug', pragmas.debug);
        if (!this._ready) {
          throw new Cesium.DeveloperError("tilingScheme 图层未创建");
        }
        //>>includeEnd('debug');

        return this._tilingScheme;
      },
    },

    rectangle: {
      get: function () {
        //>>includeStart('debug', pragmas.debug);
        if (!this._ready) {
          throw new Cesium.DeveloperError("rectangle图层未创建");
        }
        //>>includeEnd('debug');

        return this._rectangle;
      },
    },

    tileDiscardPolicy: {
      get: function () {
        //>>includeStart('debug', pragmas.debug);
        if (!this._ready) {
          throw new Cesium.DeveloperError("tileDiscardPolicy 图层未创建.");
        }
        //>>includeEnd('debug');

        return this._tileDiscardPolicy;
      },
    },

    errorEvent: {
      get: function () {
        return this._errorEvent;
      },
    },

    ready: {
      get: function () {
        return this._ready;
      },
    },

    credit: {
      get: function () {
        return this._credit;
      },
    },

    hasAlphaChannel: {
      get: function () {
        return true;
      },
    },
  });

  MapGISMapImageProvider.prototype.getTileCredits = function (x, y, level) {
    if (!this._ready) {
      throw new Cesium.DeveloperError("当前图层还未创建");
    }
    //暂时不需要
    //var rectangleScratch = new Rectangle();
    //var rectangle = this._tilingScheme.tileXYToRectangle(x, y, level, rectangleScratch);
    var result = null;

    return result;
  };

  MapGISMapImageProvider.prototype.requestImage = function (
    x,
    y,
    level,
    request
  ) {
    //>>includeStart('debug', pragmas.debug);
    if (this.options.offset != 0) {
      level += this.options.offset;
    }
    if (!this._ready) {
      throw new Cesium.DeveloperError("requestImage ---图层未创建.");
    }
    //>>includeEnd('debug');
    return Cesium.ImageryProvider.loadImage(
      this,
      buildImageResource(this, x, y, level, request)
    );
  };

  MapGISMapImageProvider.prototype.pickFeatures = function (
    x,
    y,
    level,
    longitude,
    latitude
  ) {
    if (!this._ready) {
      throw new Cesium.DeveloperError("当前图层还未创建");
    }

    if (!this._enablePickFeatures) {
      return undefined;
    }

    var url = this._imageInfoUrl.replace("{s}", (x + y) % 4);
    url = url.replace("{row}", y);
    url = url.replace("{col}", x);
    url = url.replace("{level}", level);
    if (this._isHistoryImage) {
      url = url.replace("{version}", this._imageVersion);
    }
    var query = {
      f: "json",
    };

    var resource = this._resource.getDerivedResource({
      url: url,
      queryParameters: query,
    });
    //约定返回为json后续
    return resource.fetchJson().then(function (json) {
      var result = [];

      var features = json.results;
      if (!features) {
        return result;
      }

      for (var i = 0; i < features.length; ++i) {
        var feature = features[i];

        var featureInfo = new Cesium.ImageryLayerFeatureInfo();
        featureInfo.data = feature;
        featureInfo.name = feature.value;
        featureInfo.properties = feature.attributes;
        featureInfo.configureDescriptionFromProperties(feature.attributes);
        // 韩彦生 这里可以后续添加针对不同坐标系的坐标转换
        result.push(featureInfo);
      }
      return result;
    });
  };

  return new MapGISMapImageProvider(options);
}

CesiumZondy.Provider.MapGISMapImageProvider = WmtsTileProvider;
CesiumZondy.Provider.WmtsTileProvider = WmtsTileProvider;
