import { CesiumZondy } from '../core/Base';

import LayerType from './LayerType';
import M3DLayer from './M3DLayer';
import TerrainLayer from './TerrainLayer';
import TilesLayer from './TilesLayer';
import BaseLayer from './BaseLayer';

/**
 * @author 三维基础平台研发中心·冯桂英
 * @class module:客户端数据服务.LayerManager
 * @category LayerManager
 * @classdesc LayerManager 图层管理类
 * @description 图层管理类,处理场景相关操作
 * @param options.viewer 场景视图
 */
export default class LayerManager extends BaseLayer {
    constructor(optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        super(options);
    }

    /**
     * 添加三维场景文档服务
     * @function module:客户端数据服务.LayerManager.prototype.append
     * @param {String} url 文档地址
     * @param {Object} optionsParam 参数
     * @param {Boolean} [optionsParam.autoReset = true] 是否自动定位
     * @param {Boolean} [optionsParam.synchronous = true] 是否异步请求
     * @param {Function} [optionsParam.loaded = function] 回调函数
     * @param {DefaultProxy} [optionsParam.proxy = defaultProxy] 代理
     * @example
     * let layerManager = new Cesium.Layer.LayerManager({viewer:viewer});
     * function callBackfunction(layer){
     * console.log(layer)
     * }
     * layerManager.append('http://192.168.90.102:6163/igs/rest/g3d/1218示例', {
     * autoReset:false,
     * synchronous:true,
     * loaded:callBackfunction
     * });
     * //添加地形
     * let terrainProivder = layerManager.append('http://develop.smaryun.com:6163/igs/rest/g3d/terrain');
     */
    append(url, optionsParam) {
        if (!Cesium.defined(url)) {
            return new Cesium.DeveloperError('必须指定url');
        }
        const options = Cesium.defaultValue(optionsParam, {});
        let synchronous = true;
        const baseUrl = url;
        let resource;
        let proxy;
        const docLayers = [];

        if (Cesium.defined(options)) {
            if (Cesium.defined(options.proxy)) {
                // 不放在defaultValue中 new 会影响性能
                proxy = new Cesium.DefaultProxy(options.proxy);
            }
            Cesium.defaultValue(options.proxy, undefined);
            synchronous = Cesium.defaultValue(options.synchronous, true);
        }

        const _callBack = (params) => {
            const _params = params;
            if (Cesium.defined(options.loaded) && typeof options.loaded === 'function') {
                options.loaded(_params);
            }
        };

        let tileset = null;
        const parseDocInfo = (info) => {
            if (info !== undefined && info.sceneInfos.length > 0) {
                const { layers } = info.sceneInfos[0];
                layers.forEach((layer) => {
                    const { layerRenderIndex, layerIndex, gdbpUrl, layerType, isVisible } = layer;
                    const type = parseInt(layerType, 10);
                    switch (type) {
                        case LayerType.TERRAINLAYER: {
                            const terrainLayer = new TerrainLayer({
                                viewer: this.viewer
                            });
                            const opt = {
                                range: layer.range,
                                scale: layer.terrainLayer.elevationScale
                            };
                            Object.extend(options, opt);
                            const layerRes = terrainLayer.appendTerrainLayer(baseUrl, 0, layerRenderIndex, proxy, options);
                            docLayers.push(layerRes);
                            break;
                        }
                        case LayerType.TILEIMAGELAYER: {
                            const tileLayer = new TilesLayer({
                                viewer: this.viewer
                            });
                            const doc = tileLayer.append3DDocTileLayer(baseUrl, 0, layerRenderIndex, proxy);
                            docLayers.push(doc);
                            break;
                        }
                        case LayerType.MODELLAYER:
                        case LayerType.M3DLAYER: {
                            const m3d = new M3DLayer({ viewer: this.viewer });
                            tileset = m3d.appendM3DLayer(baseUrl, layerRenderIndex, layerIndex, gdbpUrl, isVisible, true, options);
                            docLayers.push(tileset);
                            tileset.readyPromise.then(_callBack);
                            break;
                        }
                        default:
                            break;
                    }
                });
            }
        };

        if (synchronous) {
            resource = new Cesium.Resource({
                url: `${baseUrl}/GetDocInfo`,
                proxy
            });
            resource.fetchJson().then((json) => parseDocInfo(json));
        } else {
            const request = new Cesium.XMLHttpRequest();
            request.open('GET', `${baseUrl}/GetDocInfo`, false);
            request.send(null);
            if (request.status === 200) {
                const info = Cesium.JSON.parse(request.responseText);
                if (info) {
                    parseDocInfo(info);
                }
            }
        }
        return docLayers;
    }
}

CesiumZondy.Layer.LayerManager = LayerManager;
