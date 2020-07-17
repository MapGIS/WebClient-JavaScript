import { CesiumZondy } from '../core/Base';

import BaseLayer from './BaseLayer';

/**
 * @author 基础平台研发中心·冯桂英
 * @class module:客户端数据服务.OGCLayer
 * @category  BaseLayer.OGCLayer
 * @classdesc OGCLayer 瓦片图层管理类
 * @description OGC标准瓦片服务管理类,实现瓦片图层相关操作
 * @param optionsParam.viewer 场景视窗
 */
export default class OGCLayer extends BaseLayer {
    constructor(optionsParam) {
        const options = optionsParam;
        super(options);
    }

    /**
     * 添加WMS服务图层
     * @function module:客户端数据服务.OGCLayer.prototype.appendWMSTile
     * @param {String} tileUrl 服务地址
     * @param {String} layerName 图层名
     * @param {Object} optionsParam 附加选项
     * @param {String} optionsParam.version='1.1.0'  版本 默认1.1.0
     * @param {String} optionsParam.proxy=null  代理
     * @returns {ImageryLayer} 瓦片层对象
     * @example
     * let ogcLayer = new OGCLayer({viewer:viewer});  
     * let layer = ogcLayer.appendWMSTile("http://develop.smaryun.com:6163/igs/rest/ogc/doc/北京市/WMSServer",
                //图层名
                '北京市:北京市,绿地_1,绿地_2,绿地_3,水域_1,水域_2,水域_3,住宅用地,医院,商业用地,铁路_1,铁路_2,铁路_3', {
                //版本信息
                version: '1.1.1',
                });
     */
    appendWMSTile(tileUrl, layerName, optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        let _proxy;
        if (options.proxy !== '' && Cesium.defined(options.proxy)) {
            _proxy = new Cesium.DefaultProxy(options.proxy);
        }
        const wmsOptions = {
            url: tileUrl,
            layers: layerName, // 'cite:1996' Here just give layer name
            parameters: options,
            proxy: _proxy
        };
        if (Cesium.defined(options)) {
            Object.extend(wmsOptions, options);
        }
        const wmsLayer = this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider(wmsOptions));
        return wmsLayer;
    }

    /**
     * 添加WMTS(WebMapTileService) 标准的瓦片
     * @function module:客户端数据服务.OGCLayer.prototype.appendWMTSTile
     * @param {String} tileUrl 瓦片服务地址
     * @param {String} layerName 图层名称
     * @param {String} tileMatrixSetID 瓦片数据集格式
     * @param {Number} maximumLevel 最大级数
     * @param {Number} startLevel 初始级别 正常默认为0 有的为1
     * @returns {ImageryLayer} 瓦片层对象
     * @example
     * let ogcLayer = new OGCLayer({viewer:viewer});       
     * let layer = ogcLayer.appendWMTSTile(
                //瓦片服务地址
                "http://develop.smaryun.com:6163/igs/rest/ogc/WMTSServer",
                //图层名称
                "beijing", 'EPSG:4326_北京市_028mm_GB',
                //最大级数
                17,
                null, 'default', 0);
     */
    appendWMTSTile(tileUrl, layerName, tileMatrixSetID, maxnumLevel, proxy, style, startLevel) {
        let _proxy = '';
        let _tilingScheme;
        if (proxy !== '' && Cesium.defined(proxy)) {
            _proxy = new Cesium.DefaultProxy(proxy);
        }
        if (tileMatrixSetID === 'GoogleMapsCompatible_GB') {
            _tilingScheme = new Cesium.WebMercatorTilingScheme({
                numberOfLevelZeroTilesX: 1,
                numberOfLevelZeroTilesY: 1,
                rectangleSouthwestInMeters: new Cesium.Cartesian2(-20037508.342789244, -20037508.342789244),
                rectangleNortheastInMeters: new Cesium.Cartesian2(20037508.342789244, 20037508.342789244)
            });
        } else {
            _tilingScheme = new Cesium.GeographicTilingScheme({
                rectangle: Cesium.Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0),
                numberOfLevelZeroTilesX: 2,
                numberOfLevelZeroTilesY: 1
            });
        }
        const wmtsLayer = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapTileServiceImageryProvider({
                url: tileUrl,
                layer: layerName,
                style,
                format: 'image/png',
                tileMatrixSetID,
                maximumLevel: maxnumLevel,
                credit: new Cesium.Credit('MapGIS'),
                tilingScheme: _tilingScheme,
                proxy: _proxy,
                startLevel: Cesium.defaultValue(startLevel, 0)
            })
        );
        return wmtsLayer;
    }

    /**
     * 添加WMTS(WebMapTileService) 标准的瓦片(扩展)
     * @function module:客户端数据服务.OGCLayer.prototype.appendWMTSTileExt
     * @param {String} wmtsBaseUrl  wmts服务基地址 ：localhost:6163/igs/rest/ogc/WMTSServer
     * @param {Object} [optionsParam] 包含以下属性的对象
     * @param {String} [optionsParam.serverName] 服务名
     * @param {String} [optionsParam.proxy] 代理服务器地址
     * @returns {ImageryLayer} 返回瓦片图层对象
     * @example
     * let ogcLayer = new OGCLayer({viewer:viewer});
     * let wmtsLayer = new ogcLayer.appendWMTSTileExt('localhost:6163/igs/rest/ogc/WMTSServer',{
     * serverName:'dd',
     * proxy:'/Handler.ashx',
     * synchronous:true,
     * loaded:callBackfunction,
     * });
     * //异步的方式
     * // ogcLayer.appendWMTSTileExt("http://59.252.165.22:8066/ime-cloud/rest/2016qgfdqrjszy/wmts", {
     * //     loaded:function(layer){
     * //         jw = layer;
     * //     }
     * // });
     * //同步方式
     * //arcgis的wmts服务
     * wmtsLayer = ogcLayer.appendWMTSTileExt('http://219.142.81.85/arcgis/rest/services/10wanZH/MapServer/WMTS', {});
     * //jiwei的wmts服务
     * wmtsLayer = ogcLayer.appendWMTSTileExt("http://59.252.165.22:8066/ime-cloud/rest/2016qgfdqrjszy/wmts", {});
     *
     */
    appendWMTSTileExt(wmtsBaseUrl, optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const synchronous = Cesium.defaultValue(options.synchronous, true);
        let serverName = Cesium.defaultValue(options.serverName, undefined);
        let layer;
        let queryURL = `${wmtsBaseUrl}?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities`;
        if (Cesium.defined(options.proxy)) {
            queryURL = `${options.proxy}?url=${queryURL}`;
        }

        const parseXml = (styleXml) => {
            let layerNode = null;
            let TileMatrixSet = null;
            let layerStyle = null;
            let maxLevel = -1;
            let contentNodes;
            let startLevel;
            const capabilityNodes = styleXml.getElementsByTagNameNS('*', 'Capabilities');
            if (capabilityNodes !== null && capabilityNodes.length > 0) {
                const capabilityNode = capabilityNodes[0];
                if (capabilityNode !== null) {
                    contentNodes = capabilityNode.getElementsByTagNameNS('*', 'Contents');
                    if (contentNodes !== null && contentNodes.length > 0) {
                        const layerNodes = contentNodes[0].getElementsByTagNameNS('*', 'Layer');
                        if (!Cesium.defined(serverName)) {
                            const temLayerNode = layerNodes[0];
                            for (let index = 0; index < temLayerNode.childNodes.length; index += 1) {
                                if (temLayerNode.childNodes[index].nodeName === 'ows:Title') {
                                    serverName = temLayerNode.childNodes[index].textContent;
                                    layerNode = temLayerNode;
                                    break;
                                }
                            }
                        } else {
                            for (let i = 0; i < layerNodes.length; i += 1) {
                                const temLayerNode = layerNodes[i];
                                for (let j = 0; j < temLayerNode.childNodes.length; j += 1) {
                                    if (temLayerNode.childNodes[j].nodeName === 'ows:Title') {
                                        if (serverName === temLayerNode.childNodes[j].textContent) {
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
                const layerStyleNodes = layerNode.getElementsByTagNameNS('*', 'Style');
                if (layerStyleNodes !== null && layerStyleNodes.length > 0) {
                    const { childNodes } = layerStyleNodes[0];
                    for (let index = 0; index < childNodes.length; index += 1) {
                        if (childNodes[index].nodeName === 'ows:Identifier') {
                            layerStyle = childNodes[index].textContent;
                            break;
                        }
                    }
                }

                const tileMatrixsetLinks = layerNode.getElementsByTagNameNS('*', 'TileMatrixSetLink');
                if (tileMatrixsetLinks !== null && tileMatrixsetLinks.length > 0) {
                    const TileMatrixSetNodes = tileMatrixsetLinks[0].getElementsByTagNameNS('*', 'TileMatrixSet');
                    if (TileMatrixSetNodes !== null && TileMatrixSetNodes.length > 0) {
                        TileMatrixSet = TileMatrixSetNodes[0].textContent;
                    }
                    const TileMatrixSetLimits = tileMatrixsetLinks[0].getElementsByTagNameNS('*', 'TileMatrixSetLimits');
                    if (TileMatrixSetLimits !== null && TileMatrixSetLimits.length > 0) {
                        const TileMatrixLimits = TileMatrixSetLimits[0].getElementsByTagNameNS('*', 'TileMatrixLimits');
                        if (TileMatrixLimits !== null && TileMatrixLimits.length > 0) {
                            maxLevel = TileMatrixLimits.length;
                        }
                    } else if (maxLevel === -1 && Cesium.defined(contentNodes)) {
                        const TileMatrix = contentNodes[0].getElementsByTagNameNS('*', 'TileMatrix');
                        if (TileMatrix !== null && TileMatrix.length > 0) {
                            const maxLevelNode = TileMatrix[TileMatrix.length - 1];
                            const startLevelNode = TileMatrix[0];
                            for (let index = 0; index < startLevelNode.childNodes.length; index += 1) {
                                const childNode = startLevelNode.childNodes[index];
                                const name = childNode.nodeName;
                                if (name === 'ows:Identifier') {
                                    startLevel = childNode.textContent;
                                    startLevel = parseInt(startLevel, 10);
                                    break;
                                }
                            }
                            for (let i = 0; i < maxLevelNode.childNodes.length; i += 1) {
                                const childNode = maxLevelNode.childNodes[i];
                                const name = childNode.nodeName;
                                if (name === 'ows:Identifier') {
                                    maxLevel = childNode.textContent;
                                    maxLevel = parseInt(maxLevel, 10);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if (TileMatrixSet !== null && maxLevel !== -1 && layerStyle !== null) {
                let tileURL = '';
                if (Cesium.defined(options.proxy)) {
                    tileURL = `${options.proxy}?url=`;
                }
                tileURL = `${tileURL + wmtsBaseUrl}?tileMatrix={TileMatrix}&layer=${serverName}&style=${layerStyle}&tilecol={TileCol}&tilerow={TileRow}&tilematrixset={TileMatrixSet}&format=image/png&service=WMTS&version=1.0.0&&request=GetTile`;
                layer = this.appendWMTSTile(tileURL, serverName, TileMatrixSet, maxLevel, options.proxy, layerStyle, startLevel);
                if (options.loaded) {
                    options.loaded(layer);
                }
            }
        };

        if (synchronous) {
            const resource = new Cesium.Resource({
                url: queryURL
            });
            resource.fetchXML().then((styleXml) => parseXml(styleXml));
        } else {
            const request = new XMLHttpRequest();
            request.open('GET', queryURL, true);
            request.send(null);
            if (request.status === 200) {
                // 所有浏览器统一用这种方式处理(因为高版本的浏览器都支持)
                const parser = new DOMParser();
                const xmlObject = parser.parseFromString(request.responseText, 'text/xml');
                if (xmlObject) {
                    parseXml(xmlObject);
                }
            }
        }
        return layer;
    }
}

CesiumZondy.Layer.OGCLayer = OGCLayer;
