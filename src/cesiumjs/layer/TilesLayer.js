import { CesiumZondy } from '../core/Base';

import BaseLayer from './BaseLayer';
import LayerType from './LayerType';

/**
 * @author 基础平台研发中心·冯桂英
 * @class TilesLayer
 * @category  BaseLayer.TilesLayer
 * @classdesc TilesLayer  瓦片图层管理类
 * @description 瓦片服务管理类,实现瓦片图层相关操作
 * @param options.viewer 场景视窗
 */
export default class TilesLayer extends BaseLayer {
    constructor(option) {
        super(option);
    }

    /**
     * @private
     * 加载三维地图文档瓦片层
     * @param  {String} url  发布的文档地址
     * @param  {Number} sceneIndex 图层所在场景索引
     * @param  {Number} layerIndex 图层索引
     * @param  {Object} options  其他附加属性包含以下属性的对象
     * @param  {Rectangle} options.options.tileRange= Rectangle.fromDegrees(-180,-90,180,90) 默认范围为全球范围
     * @param  {Number}options.colNum=2 瓦片初始级的列数 默认为2
     * @param  {Number}options.rowNum=1 瓦片初始级的列数 默认为1
     * @param  {Number}options.maxLevel=19 瓦片最大显示级数 默认为19
     * @param  {String}options.proxy 转发代理
     * @returns {object} 瓦片对象
     * @example 得到docInfo后使用该接口添加三位场景中得瓦片层
     * 如果裁瓦片的时候是按照经纬度裁剪的瓦片则只设置最大级数即可
     * let otherOptions ={
     *  maxLevel:10
     *  };
     * let otherOptions ={
     *   tileRange:webRoot.Rectangle.fromDegrees(73.4625656504558,9.7218626686719958,139.249771965239,53.5800002118608),
     *   colNum:3,
     *   rowNum:2,
     *   maxLevel:10,
     *   proxy:'/Handler.ashx'//不存在跨域可不设置
     *  };
     * let mapGisTile = webGlobe.append3DDocTile('http://54.222.218.173:6163/igs/rest/g3d/lcmap/',0,0,otherOptions);
     */
    append3DDocTileLayer(url, sceneIndex, layerIndex, options) {
        let proxy;
        if (options.proxy) {
            proxy = new Cesium.DefaultProxy(options.proxy);
        }
        let dataUrl =
            url +
            '/GetCovering?sceneIndex=' +
            sceneIndex.toString() +
            '&layerIndex=' +
            layerIndex.toString() +
            '&level={level}&row={row}&col={col}&xDensity=43&yDensity=43';
        var mapGisDocTile = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.MapGISDocMapProvider({
                url: _url,
                rectangle: options.tileRange,
                colNum: options.colNum,
                rowNum: options.rowNum,
                maximumLevel: options.maxLevel,
                proxy: proxy,
            }),
        );
        return mapGisDocTile;
    }

    /**
     * 加载二维地图文档瓦片服务
     * @param {String}url        发布的文档服务地址
     * @param {Object}options    其他附加属性包含以下属性的对象
     * @param {Rectangle}options.options.tileRange= Rectangle.fromDegrees(-180,-90,180,90) 默认范围为全球范围
     * @param {Number}options.colNum=2 瓦片初始级的列数 默认为2
     * @param {Number}options.rowNum=1 瓦片初始级的列数 默认为1
     * @param {Number}options.maxLevel=19 瓦片最大显示级数 默认为19
     * @param {String}options.proxy 转发代理
     * @returns {object}  瓦片对象
     * @example
     * 如果裁瓦片的时候是按照经纬度裁剪的瓦片则只设置最大级数即可
     * //let otherOptions ={
     * //     maxLevel:10
     * //    };
     * let otherOptions ={
     *       tileRange:webRoot.Rectangle.fromDegrees(73.4625656504558,9.7218626686719958,139.249771965239,53.5800002118608),
     *       colNum:3,
     *       rowNum:2,
     *       maxLevel:10,
     *       proxy:'/Handler.ashx'//不存在跨域可不设置
     *     };
     * let mapGisTile = append2DDocTile('http://localhost:6163/igs/rest/mrms/docs/二维矢量',otherOptions);
     */
    append2DDocTile(url, options) {
        //中地新版正常二维瓦片
        if (!Cesium.defined(options)) {
            options = {};
        }
        options.url = url;
        let mapGis2DDocTile = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.MapGIS2DDocMapProvider(options),
        );
        return mapGis2DDocTile;
    }

    /**
     * 添加igs发布的瓦片服务
     * @param {String}url 瓦片服务地址
     * @param {Object}options 其他附加属性包含以下属性的对象
     * @param {Rectangle}options.options.tileRange= Rectangle.fromDegrees(-180,-90,180,90) 默认范围为全球范围
     * @param {Number}options.colNum=2 瓦片初始级的列数 默认为2
     * @param {Number}options.rowNum=1 瓦片初始级的行数 默认为1
     * @param {Number}options.tileWidth=2 瓦片宽度 默认为256
     * @param {Number}options.tileHeigh=1 瓦片高度 默认为256
     * @param {Number}options.maxLevel=19 瓦片最大显示级数 默认为19
     * @param {String}options.proxy 转发代理
     * @returns 瓦片层对象
     * @example
     * 如果裁瓦片的时候是按照经纬度裁剪的瓦片则只设置最大级数即可
     * //var otherOptions ={
     * //    maxLevel:10
     * //    };
     * let otherOptions ={
     *     tileRange:webRoot.Rectangle.fromDegrees(73.4625656504558,9.7218626686719958,139.249771965239,53.5800002118608),
     *     colNum:3,
     *     rowNum:2,
     *     maxLevel:10,
     *     //如瓦片裁的不是256,则需设置下面两个参数
     *     tileWidth:256,
     *     tileHeigh:256,
     *     proxy:'/Handler.ashx'//不存在跨域可不设置
     *     };
     * let mapGisTile = tileLayer.appendMapGISTile('http://develop.smaryun.com:6163/igs/rest/mrms/tile/WORLDTILE',otherOptions);
     */
    appendMapGISTile(url, options) {
        let _url = url + '/{level}/{row}/{col}';
        let proxy;
        if (options.proxy) {
            proxy = new Cesium.DefaultProxy(options.proxy);
        }
        var mapGisTile = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.MapGISMapProvider({
                url: _url,
                tilingScheme: options.tilingScheme,
                rectangle: options.tileRange,
                colNum: options.colNum,
                rowNum: options.rowNum,
                maximumLevel: options.maxLevel,
                tileWidth: options.tileWidth,
                tileHeight: options.tileHeight,
                proxy: proxy,
                mapStyle: options.mapStyle,
            }),
        );
        return mapGisTile;
    }

    /**
     * @private
     * 添加WMS服务图层
     * @param {String} tileUrl 服务地址
     * @param {String} layerName 图层名
     * @param {Object} options 附加选项
     * @param {String} options.version='1.1.0'  版本 默认1.1.0
     * @param {String} options.proxy=null  代理
     * @returns 瓦片层对象
     * @example
     * tilelayer = tile.appendWMSTile("http://develop.smaryun.com:6163/igs/rest/ogc/doc/WorldJWVector/WMSServer",
     *        //图层名
     *       'WorldJWVector:背景图层,世界政区,中国注记', {
     *        //版本信息
     *        version: '1.1.1',
     *      });
     */
    appendWMSTile(tileUrl, layerName, options) {
        let _proxy;
        if (options.proxy !== '' && Cesium.defined(options.proxy)) {
            _proxy = options.proxy = new Cesium.DefaultProxy(options.proxy);
        }
        let wmsOptions = {
            url: tileUrl,
            layers: layerName, //'cite:1996' Here just give layer name
            parameters: options.parameters,
            proxy: _proxy,
        };
        if (Cesium.defined(options)) {
            Object.extend(wmsOptions, options);
        }
        let wmsLayer = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapServiceImageryProvider(wmsOptions),
        );
        return wmsLayer;
    }

    /**
     * @private
     * 添加WMTS(WebMapTileService) 标准的瓦片
     * @param {String}tileUrl      瓦片服务地址
     * @param {String}layerName     图层名称
     * @param {String}tileMatrixSetID 瓦片数据集格式
     * @param {Number}maximumLevel 最大级数
     * @param {Number}startLevel 初始级别 正常默认为0 有的为1
     * @returns 瓦片层对象
     */
    appendWMTSTile(
        tileUrl,
        layerName,
        tileMatrixSetID,
        maxnumLevel,
        proxy,
        style,
        startLevel,
    ) {
        let _proxy = '';
        let _tilingScheme;
        if (proxy !== '' && Cesium.defined(proxy)) {
            _proxy = new Cesium.DefaultProxy(proxy);
        }
        if (tileMatrixSetID === 'GoogleMapsCompatible_GB') {
            _tilingScheme = new Cesium.WebMercatorTilingScheme({
                numberOfLevelZeroTilesX: 1,
                numberOfLevelZeroTilesY: 1,
                rectangleSouthwestInMeters: new Cesium.Cartesian2(
                    -20037508.342789244,
                    -20037508.342789244,
                ),
                rectangleNortheastInMeters: new Cesium.Cartesian2(
                    20037508.342789244,
                    20037508.342789244,
                ),
            });
        } else {
            _tilingScheme = new Cesium.GeographicTilingScheme({
                rectangle: Cesium.Rectangle.fromDegrees(
                    -180.0,
                    -90.0,
                    180.0,
                    90.0,
                ),
                numberOfLevelZeroTilesX: 2,
                numberOfLevelZeroTilesY: 1,
            });
        }
        let wmtsLayer = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapTileServiceImageryProvider({
                url: tileUrl,
                layer: layerName,
                style: style,
                format: 'image/png',
                tileMatrixSetID: tileMatrixSetID,
                maximumLevel: maxnumLevel,
                credit: new Cesium.Credit('MapGIS'),
                tilingScheme: _tilingScheme,
                proxy: _proxy,
                startLevel: Cesium.defaultValue(startLevel, 0),
            }),
        );
        return wmtsLayer;
    }

    /**
     * 添加WMTS(WebMapTileService) 标准的瓦片(扩展)
     * @param {String}wmtsBaseUrl  wmts服务基地址 ：localhost:6163/igs/rest/ogc/WMTSServer
     * @param {Object} [options] 包含以下属性的对象
     * @param {String} [options.serverName]       服务名
     * @param {String} [options.proxy]            代理服务器地址
     * @returns 返回瓦片图层对象
     * @example
     * var imagelayer;
     * function callBackfunction(layer){
     *    imagelayer = layer;
     * }
     * var wmtsLayer = new webGlobe.appendWMTSTileExt('localhost:6163/igs/rest/ogc/WMTSServer',{
     * serverName:'dd',
     * proxy:'/Handler.ashx',
     * synchronous:true,
     * loaded:callBackfunction,
     * });
     * //异步的方式
     * // appendWMTSTileExt("http://59.252.165.22:8066/ime-cloud/rest/2016qgfdqrjszy/wmts", {
     * //     loaded:function(layer){
     * //         jw = layer;
     * //     }
     * // });
     * //同步方式
     * //arcgis的wmts服务
     * tilelayer = tile.appendWMTSTileExt('http://219.142.81.85/arcgis/rest/services/10wanZH/MapServer/WMTS', {});
     * //jiwei的wmts服务
     * jw = appendWMTSTileExt("http://59.252.165.22:8066/ime-cloud/rest/2016qgfdqrjszy/wmts", {});
     *
     */
    appendWMTSTileExt(wmtsBaseUrl, options) {
        if (!Cesium.defined(options)) {
            options = {};
        }
        let synchronous = Cesium.defaultValue(options.synchronous, true);
        let serverName = Cesium.defaultValue(options.serverName, undefined);
        let layer;
        let queryURL =
            wmtsBaseUrl + '?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities';
        if (Cesium.defined(options.proxy)) {
            queryURL = options.proxy + '?url=' + queryURL;
        }

        let parseXml = (styleXml) => {
            let layerNode = null;
            let TileMatrixSet = null;
            let layerStyle = null;
            let maxLevel = -1;
            let contentNodes;
            let startLevel;
            let capabilityNodes = styleXml.getElementsByTagNameNS(
                '*',
                'Capabilities',
            );
            debugger;
            if (capabilityNodes !== null && capabilityNodes.length > 0) {
                var capabilityNode = capabilityNodes[0];
                if (capabilityNode !== null) {
                    contentNodes = capabilityNode.getElementsByTagNameNS(
                        '*',
                        'Contents',
                    );
                    if (contentNodes !== null && contentNodes.length > 0) {
                        let layerNodes = contentNodes[0].getElementsByTagNameNS(
                            '*',
                            'Layer',
                        );
                        let temLayerNode;
                        if (!Cesium.defined(serverName)) {
                            temLayerNode = layerNodes[0];
                            for (let i in temLayerNode.childNodes) {
                                if (
                                    temLayerNode.childNodes[i].nodeName ===
                                    'ows:Title'
                                ) {
                                    serverName =
                                        temLayerNode.childNodes[i].textContent;
                                    layerNode = temLayerNode;
                                    break;
                                }
                            }
                        } else {
                            for (let i in layerNodes) {
                                temLayerNode = layerNodes[i];
                                for (
                                    var j = 0;
                                    j < temLayerNode.childNodes.length;
                                    j++
                                ) {
                                    if (
                                        temLayerNode.childNodes[i].nodeName ===
                                        'ows:Title'
                                    ) {
                                        if (
                                            serverName ===
                                            temLayerNode.childNodes[j]
                                                .textContent
                                        ) {
                                            layerNode = temLayerNode;
                                        }
                                        break;
                                    }
                                }
                                if (layerNodes !== null) {
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if (layerNode !== null) {
                let layerStyleNodes = layerNode.getElementsByTagNameNS(
                    '*',
                    'Style',
                );
                if (layerStyleNodes !== null && layerStyleNodes.length > 0) {
                    for (let i in layerStyleNodes[0].childNodes) {
                        if (
                            layerStyleNodes[0].childNodes[i].nodeName ===
                            'ows:Identifier'
                        ) {
                            layerStyle =
                                layerStyleNodes[0].childNodes[i].textContent;
                            break;
                        }
                    }
                }

                let tileMatrixsetLinks = layerNode.getElementsByTagNameNS(
                    '*',
                    'TileMatrixSetLink',
                );
                if (
                    tileMatrixsetLinks !== null &&
                    tileMatrixsetLinks.length > 0
                ) {
                    var TileMatrixSetNodes = tileMatrixsetLinks[0].getElementsByTagNameNS(
                        '*',
                        'TileMatrixSet',
                    );
                    if (
                        TileMatrixSetNodes !== null &&
                        TileMatrixSetNodes.length > 0
                    ) {
                        TileMatrixSet = TileMatrixSetNodes[0].textContent;
                    }
                    var TileMatrixSetLimits = tileMatrixsetLinks[0].getElementsByTagNameNS(
                        '*',
                        'TileMatrixSetLimits',
                    );
                    if (
                        TileMatrixSetLimits !== null &&
                        TileMatrixSetLimits.length > 0
                    ) {
                        var TileMatrixLimits = TileMatrixSetLimits[0].getElementsByTagNameNS(
                            '*',
                            'TileMatrixLimits',
                        );
                        if (
                            TileMatrixLimits !== null &&
                            TileMatrixLimits.length > 0
                        ) {
                            maxLevel = TileMatrixLimits.length;
                        }
                    } else if (
                        maxLevel === -1 &&
                        Cesium.defined(contentNodes)
                    ) {
                        var TileMatrix = contentNodes[0].getElementsByTagNameNS(
                            '*',
                            'TileMatrix',
                        );
                        if (TileMatrix !== null && TileMatrix.length > 0) {
                            let maxLevelNode =
                                TileMatrix[TileMatrix.length - 1];
                            let startLevelNode = TileMatrix[0];
                            for (let i in startLevelNode.childNodes) {
                                let name =
                                    startLevelNode.childNodes[i].nodeName;
                                if (
                                    startLevelNode.childNodes[i].nodeName ===
                                    'ows:Identifier'
                                ) {
                                    startLevel =
                                        startLevelNode.childNodes[i]
                                            .textContent;
                                    startLevel = parseInt(startLevel); //eval(startLevel);
                                    break;
                                }
                            }
                            for (let i in maxLevelNode.childNodes) {
                                if (
                                    maxLevelNode.childNodes[i].nodeName ===
                                    'ows:Identifier'
                                ) {
                                    maxLevel =
                                        maxLevelNode.childNodes[i].textContent;
                                    maxLevel = parseInt(maxLevel); // eval(maxLevel);
                                    maxLevel = maxLevel - startLevel;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if (
                TileMatrixSet !== null &&
                maxLevel !== -1 &&
                layerStyle !== null
            ) {
                let tileURL = '';
                if (Cesium.defined(options.proxy)) {
                    tileURL = options.proxy + '?url=';
                }
                tileURL =
                    tileURL +
                    wmtsBaseUrl +
                    '?tileMatrix={TileMatrix}&layer=' +
                    serverName +
                    '&style=' +
                    layerStyle +
                    '&tilecol={TileCol}&tilerow={TileRow}&tilematrixset={TileMatrixSet}&format=image/png&service=WMTS&version=1.0.0&&request=GetTile';
                layer = this.appendWMTSTile(
                    tileURL,
                    serverName,
                    TileMatrixSet,
                    maxLevel,
                    options.proxy,
                    layerStyle,
                    startLevel,
                );
                if (options.loaded) {
                    options.loaded(layer);
                }
            }
        };

        if (synchronous) {
            let resource = new Cesium.Resource({
                url: queryURL,
            });
            resource.fetchXML().then((styleXml) => parseXml(styleXml));
        } else {
            var request = new XMLHttpRequest();
            request.open('GET', queryURL, true);
            request.send(null);
            if (request.status === 200) {
                //所有浏览器统一用这种方式处理(因为高版本的浏览器都支持)
                var parser = new DOMParser();
                var xmlObject = parser.parseFromString(
                    request.responseText,
                    'text/xml',
                );
                if (xmlObject) {
                    parseXml(xmlObject);
                }
            }
        }
        return layer;
    }

    /**
     * 添加谷歌服务地址
     * @param {Object} options 预留扩展参数
     * @param {String} [options.ptype] 类型：矢量‘m@207000000’ 影像‘s@130’ 栅格‘t@130,r@207000000 道路‘h@207000000’
     * @returns 瓦片层对象 可用于操作移除
     * @example
     * let tilelayer = tile.appendGoogleMap({ptype:'m@207000000'});
     */
    appendGoogleMap(options) {
        if (!Cesium.defined(options)) {
            options = {};
        }
        this._isHistoryImage = Cesium.defaultValue(
            options.isHistoryImage,
            false,
        );
        this._imageVersion = Cesium.defaultValue(options.imageVersion, '0');
        let offset = Cesium.defaultValue(options.Offset, false);
        let offsetLabel = '';
        if (offset) {
            offsetLabel = '&gl=cn';
        }
        let _url =
            'http://mt{s}.google.cn/vt/{type}&hl=zh-CN' +
            offsetLabel +
            '&x={x}&y={y}&z={z}&s=Galileo';
        _url = _url.replace('{type}', options.ptype);
        let googleMap = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.GoogleMapProvider({
                url: _url,
            }),
        );
        return googleMap;
    }

    /**
     * 添加google地图服务(扩展)：
     * @param {Object} options {ptype:'s'} s：卫星地图
     * @param {Object} options {ptype:'h'} skeleton map light
     * @param {Object} options {ptype:'m'} 全地图
     * @param {Object} options {ptype:'r'} skeleton map dark
     * @param {Object} options {ptype:'t'} 地形图  也可以进行组合，例如：s,r 或者 t,h
     * @returns 瓦片层对象 可用于操作移除
     * @example
     * let tilelayer = tile.appendGoogleMapExt({ptype:'s'});
     */
    appendGoogleMapExt(options) {
        let googleMap = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.GoogleMapProvider(options),
        );
        return googleMap;
    }

    /**
     * 添加高德地图服务
     * @param {Object} options 参数
     * @param {String} [options.ptype] 地图类型：'vec', 'raod', 'img'
     * @param {Number} [options.maximumLevel = 16] 最大级别
     * @returns 瓦片层对象
     * @example
     * let tilelayer = tile.appendGaodeMap({ptype:'vec'});
     */
    appendGaodeMap(options) {
        if (!Cesium.defined(options)) {
            options = {};
        }
        let maximumLevel = Cesium.defaultValue(options.maximumLevel, 16);
        let type = Cesium.defaultValue(options.type, 'vec');
        let baseUrl =
            'http://{s}.is.autonavi.com/appmaptile?&size=1&scale=1&x={x}&y={y}&z={z}';
        let url = baseUrl;
        let gaodeLayer;
        switch (ptype) {
            case 'img':
                {
                    url =
                        'https://{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}';
                }
                break;
            case 'road':
                {
                    url += '&scl=2&style=8&ltype=11';
                }
                break;
            default:
                {
                    url += '&style=7';
                }
                break;
        }
        let gaodeProvider = new Cesium.UrlTemplateImageryProvider({
            url: url,
            credit: new Cesium.Credit('高德地图服务'),
            subdomains: ['webst01', 'webst02', 'webst03', 'webst04'],
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
            maximumLevel: maximumLevel,
        });
        gaodeLayer = this.viewer.imageryLayers.addImageryProvider(
            gaodeProvider,
        );
        return gaodeLayer;
    }

    /**
     * 添加baidu地图服务:提供ptype='tile'和ptype='sate'、 'traffic'三种百度地图（瓦片和卫星、交通）
     * @param {object} options {ptype:'sate'}
     * @returns 瓦片层对象
     * @example
     * let tilelayer = tile.appendBaiduMap({ptype:'sate'});
     */
    appendBaiduMap(options) {
        let baiduProvider = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.BaiduMapProvider(options),
        );
        return baiduProvider;
    }

    /**
     * 添加OpenWeather服务:免费的天气预报云图
     * @param {object} options {ptype:Clouds} 类型有: Pressure,Temperature,Windspeed,Clouds,Label
     * @returns 瓦片层对象
     * @example
     * let tilelayer = tile.appendOpenWeatherMap({ptype:'Label',appid:'b1b15e88fa797225412429c150c122a1'});
     */
    appendOpenWeatherMap(options) {
        if (!Cesium.defined(options)) {
            return new Cesium.DeveloperError('必须指定url 或type ');
        }
        switch (options.ptype) {
            case 'Pressure':
                {
                    options.url =
                        'https://h.maps.owm.io/map/pressure_new/{level}/{row}/{col}?appid=' +
                        options.appid;
                }
                break;
            case 'Temperature':
                {
                    options.url =
                        'https://h.maps.owm.io/map/temp_new/{level}/{row}/{col}?appid=' +
                        options.appid;
                }
                break;
            case 'Windspeed':
                {
                    options.url =
                        'https://h.maps.owm.io/map/wind_new/{level}/{row}/{col}?appid=' +
                        options.appid;
                }
                break;
            case 'Clouds':
                {
                    options.url =
                        'https://h.maps.owm.io/map/clouds_new/{level}/{row}/{col}?appid=' +
                        options.appid;
                }
                break;
            case 'Label':
                {
                    options.url =
                        'http://c.basemaps.cartocdn.com/light_only_labels/{level}/{row}/{col}.png';
                }
                break;
            default:
                break;
        }
        let openWeatherProvider = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.OpenWeatherMapProvider(options),
        );
        return openWeatherProvider;
    }

    /**
     * 添加天地图(经纬度)
     * @param {object}} options
     * @param {String} options.ptype 地图类型 'vec'矢量 'img'影像 'ter'地形
     * @param {String} options.token 开发token （请到天地图官网申请自己的开发token，自带token仅做功能验证随时可能失效）
     * @returns 瓦片层对象
     * @example
     * let options = {ptype:'vec',token:'tk'}
     * let tilelayer = tile.appendTDTuMap(options);
     */
    appendTDTuMap(options) {
        if (!Cesium.defined(options)) {
            return new Cesium.DeveloperError('必须指定url 或type ');
        }
        if (!Cesium.defined(options.token)) {
            Cesium.deprecationWarning(
                'http://www.tianditu.gov.cn',
                '请到天地图官网自行申请开发token，自带token仅做功能验证随时可能失效',
            );
        }
        const url = 'http://t0.tianditu.com/DataServer?';
        const row = '_c&X={x}&Y={y}&L={l}';
        switch (options.ptype) {
            case 'vec':
                {
                    options.url = `${url}T=vec${row}`;
                }
                break;
            case 'img':
                {
                    options.url = `${url}T=img${row}`;
                }
                break;
            case 'ter':
                {
                    options.url = `${url}T=ter${row}`;
                }
                break;
            case 'cia':
                {
                    options.url = `${url}T=cia${row}`;
                }
                break;
            default:
                break;
        }
        let TDTuProvider = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.TiandituMapProvider(options),
        );
        return TDTuProvider;
    }

    /**
     * 通过wmts服务添加天地图
     * @param {String} options.ptype 地图类型 'img':影像 'ter':地形 'cta':注记
     * @param {String} options.token 天地图的token
     * @returns 瓦片层对象
     * @example
     * let options = {ptype:'img'};
     * let tilelayer = tile.appendTDTuMapByWMTS(options);
     */
    appendTDTuMapByWMTS(options) {
        if (!Cesium.defined(options)) {
            options = {};
        }
        let token = Cesium.defaultValue(
            options.token,
            '9c157e9585486c02edf817d2ecbc7752',
        );
        if (Cesium.defined(options.ptype)) {
            let url =
                'http://{s}.tianditu.com/{lw}/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer={layerType}&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset=w&format=tiles&tk=' +
                token;
            switch (options.ptype) {
                case 'img':
                    url = url.replace('{lw}', 'img_w');
                    url = url.replace('{layerType}', 'img');
                    break;
                case 'cta':
                    url = url.replace('{lw}', 'cta_w');
                    url = url.replace('{layerType}', 'cta');
                    break;
                case 'ter':
                    url = url.replace('{lw}', 'ter_w');
                    url = url.replace('{layerType}', 'ter');
                    break;
                case 'cia':
                    url = url.replace('{lw}', 'cia_w');
                    url = url.replace('{layerType}', 'cia');
                    break;
            }
            let tiandituTerwProvider = new Cesium.WebMapTileServiceImageryProvider(
                {
                    url: url,
                    layer: options.ptype,
                    style: 'default',
                    format: 'tiles',
                    tileMatrixSetID: 'w',
                    credit: new Cesium.Credit('天地图'),
                    subdomains: [
                        't0',
                        't1',
                        't2',
                        't3',
                        't4',
                        't5',
                        't6',
                        't7',
                    ],
                    maximumLevel: 18,
                },
            );
            let tiandituImage = this.viewer.imageryLayers.addImageryProvider(
                tiandituTerwProvider,
            );
            return tiandituImage;
        }
        return null;
    }

    /**
     * 通用删除影像图层
     * @param  {imagelayer} google等图层,其为addImageryProvider返回的值
     * @param  {boolean}    isdestroy,是否销毁图层 在图层需要频繁切换的情况下，isdestroy最好取false
     * @example
     * let tilelayer = tile.appendGoogleMap({ptype:'m@207000000'});
     * tile.removeImageLayer(tilelayer, true);
     */
    removeImageLayer(imagelayer, isdestroy) {
        let imagelayers = this.viewer.imageryLayers;
        if (imagelayers !== null && imagelayers !== undefined) {
            if (imagelayers.contains(imagelayer)) {
                imagelayers.remove(imagelayer, isdestroy);
            }
        }
    }

    /**
     * 清空影像图层,包括地球表面
     * @param  {boolean}    isdestroy,是否销毁图层
     */
    removeAllImageLayers(isdestroy) {
        var imagelayers = this.viewer.imageryLayers;
        if (imagelayers !== null && imagelayers !== undefined) {
            imagelayers.removeAll(isdestroy);
        }
    }

    /**
     * 通用添加影像图层
     * @param  {imagelayer} google等图层
     * @see removeAllImageLayers
     * @return 返回瓦片层
     */
    addImageLayer(imagelayer) {
        let imagelayers = this.viewer.imageryLayers;
        if (imagelayers !== null && imagelayers !== undefined) {
            if (!imagelayers.contains(imagelayer)) {
                return imagelayers.addImageryProvider(imagelayer);
            }
        }
    }

    /**
     * @private
     * 添加自定义瓦片服务
     * @param  {String} url 地址
     * @param  {Object} options 参数
     * @returns {Object}   自定义瓦片服务对象
     * @example 暂无使用示例不对外
     */
    appendTileMapServiceImage(url, options) {
        var para = {
            url: url,
            maximumLevel: 8,
        };
        if (defined(options)) {
            Object.extend(para, options);
        }
        var imageryProvider = new Cesium.UrlTemplateImageryProvider(para);

        var tileMapService = this.viewer.imageryLayers.addImageryProvider(
            imageryProvider,
        );
        return tileMapService;
    }
}

CesiumZondy.Layer.TilesLayer = TilesLayer;
