import MVT from 'ol/format/MVT';
import ReplayGroup from 'ol/render/canvas/ReplayGroup'
import webGlReplayGroup from 'ol/render/webgl/ReplayGroup'
import { renderFeature, getTolerance } from 'ol/renderer/vector'

import { TileQueue } from './MapgisVectorTileQueue';
//import ExecutorGroup from 'ol/render/canvas/ExecutorGroup';

// Styles for the mapbox-streets-v6 vector tile data set. Loosely based on
// http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6.json

const MapGisCesiumResolution = [78271.51696402048, 39135.75848201024,
  19567.87924100512, 9783.93962050256, 4891.96981025128, 2445.98490512564,
  1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525,
  76.43702828517625, 38.21851414258813, 19.109257071294063, 9.554628535647032,
  4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395,
  0.29858214173896974, 0.14929107086948487, 0.07464553543474244];

export default function VectorTileProvider(Cesium, options) {
  function MVTProvider(options) {
    options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);
    self = this;
    this.show = Cesium.defined(options.show) ? options.show : true;
    this._tilingScheme = Cesium.defined(options.tilingScheme) ? options.tilingScheme : new Cesium.WebMercatorTilingScheme({ ellipsoid: options.ellipsoid });
    this._tileWidth = Cesium.defaultValue(options.tileWidth, 512);
    this._tileHeight = Cesium.defaultValue(options.tileHeight, 512);
    this._readyPromise = Cesium.when.resolve(true);
    this._mvtParser = new MVT();

    this.options = options;
    //this._mvtParser = new this._ol.format.MVT();

    this._styleFun = options.style ? options.style : createMapboxStreetsV6Style();
    this._key = Cesium.defaultValue(options.key, "");
    this._url = Cesium.defaultValue(options.url, "https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token={k}");
    
    // var sw = this._tilingScheme._rectangleSouthwestInMeters;
    // var ne = this._tilingScheme._rectangleNortheastInMeters;
    // var mapExtent = [sw.x, sw.y, ne.x, ne.y];
    this._resolutions = MapGisCesiumResolution;
    //this._resolutions = ol.tilegrid.resolutionsFromExtent(mapExtent, 22, this._tileWidth);

    this._pixelRatio = 1;
    this._transform = [0.125, 0, 0, 0.125, 0, 0];
    this._replays = ["Default", "Image", "Polygon", "LineString", "Text"];

    this._tileQueue = new Cesium.TileReplacementQueue();
    this._tileSends = new TileQueue();
    this._cacheSize = 1024;
  }

  Cesium.defineProperties(MVTProvider.prototype, {
    proxy: {
      get: function () {
        return undefined;
      }
    },

    tileWidth: {
      get: function () {
        return this._tileWidth;
      }
    },

    tileHeight: {
      get: function () {
        return this._tileHeight;
      }
    },

    maximumLevel: {
      get: function () {
        return undefined;
      }
    },

    minimumLevel: {
      get: function () {
        return undefined;
      }
    },

    tilingScheme: {
      get: function () {
        return this._tilingScheme;
      }
    },

    rectangle: {
      get: function () {
        return this._tilingScheme.rectangle;
      }
    },

    tileDiscardPolicy: {
      get: function () {
        return undefined;
      }
    },

    errorEvent: {
      get: function () {
        return this._errorEvent;
      }
    },

    ready: {
      get: function () {
        return true;
      }
    },

    readyPromise: {
      get: function () {
        return this._readyPromise;
      }
    },

    credit: {
      get: function () {
        return undefined;
      }
    },

    hasAlphaChannel: {
      get: function () {
        return true;
      }
    }
  });

  MVTProvider.prototype.getTileCredits = function (x, y, level) {
    return undefined;
  };

  function findTileInQueue(x, y, level, tileQueue) {
    var item = tileQueue.head;
    while (item != undefined && !(item.xMvt == x && item.yMvt == y && item.zMvt == level)) {
      item = item.replacementNext;
    }
    return item;
  };

  function remove(tileReplacementQueue, item) {
    var previous = item.replacementPrevious;
    var next = item.replacementNext;

    if (item === tileReplacementQueue._lastBeforeStartOfFrame) {
      tileReplacementQueue._lastBeforeStartOfFrame = next;
    }

    if (item === tileReplacementQueue.head) {
      tileReplacementQueue.head = next;
    } else {
      previous.replacementNext = next;
    }

    if (item === tileReplacementQueue.tail) {
      tileReplacementQueue.tail = previous;
    } else {
      next.replacementPrevious = previous;
    }

    item.replacementPrevious = undefined;
    item.replacementNext = undefined;

    --tileReplacementQueue.count;
  }

  function trimTiles(tileQueue, maximumTiles) {
    var tileToTrim = tileQueue.tail;
    while (tileQueue.count > maximumTiles &&
      Cesium.defined(tileToTrim)) {
      var previous = tileToTrim.replacementPrevious;

      remove(tileQueue, tileToTrim);
      //delete tileToTrim; 严格模式下不能删除
      tileToTrim = null;

      tileToTrim = previous;
    }
  };

  MVTProvider.prototype.requestImage = function (x, y, level, request) {
    if (this._tilingScheme._rectangleSouthwestInMeters == undefined) {
      level = level + 1;
    }
    
    let self = this;
    var isSend = this._tileSends.has({ x: x, y: y, z: level, id: this.options.threadId });
    this._tileSends.push({ x: x, y: y, z: level, id: this.options.threadId });
    var cacheTile;

    if (isSend) {
      cacheTile = findTileInQueue(x, y, level, this._tileQueue);
      if (cacheTile != undefined) {
        return cacheTile;
      }
    } else {
      var url = this._url;
      url = url.replace('{x}', x).replace('{y}', y).replace('{z}', level).replace('{k}', this._key);
      //console.log("not find in cache");

      var tilerequest = function (x, y, z) {
        var resource = Cesium.Resource.createIfNeeded(url);
        if (z < 12) {
          /* var canvas = document.createElement('canvas');
          return canvas; */
        }
        return resource.fetchArrayBuffer().then(function (arrayBuffer) {
          var canvas = document.createElement('canvas');
          canvas.width = 512;
          canvas.height = 512;

          canvas.xMvt = x;
          canvas.yMvt = y;
          canvas.zMvt = z;
          self._tileQueue.markTileRendered(canvas);

          var vectorContext = canvas.getContext('2d');

          var features = self._mvtParser.readFeatures(arrayBuffer);

          var styleFun = self._styleFun;

          var extent = [0, 0, 4096, 4096];

          var _replayGroup = new ReplayGroup(0, extent, 8, true, 512);//100->512 流畅了很多
          //var _webglReplayGroup = new webGlReplayGroup(0, extent, 16);

          for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            var styles = styleFun(features[i], self._resolutions[level]);
            for (var j = 0; j < styles.length; j++) {
              renderFeature(_replayGroup, feature, styles[j], 16);
            }
          }
          _replayGroup.finish();
          _replayGroup.replay(vectorContext, self._transform, 0, {}, self._replays);
          //_replayGroup.replay(vectorContext, self._transform, 0, {}, self._pixelRatio, self._replays, true);

          if (self._tileQueue.count > self._cacheSize) {
            trimTiles(self._tileQueue, self._cacheSize / 2);
          }

          //delete _replayGroup; 严格模式下不能删除
          _replayGroup = null;

          return canvas;
        }).otherwise(function (error) {
          return null;
        });
      }(x, y, level);
    }
  };

  MVTProvider.prototype.pickFeatures = function (x, y, level, longitude, latitude) {
    return undefined;
  };

  return new MVTProvider(options);
}
