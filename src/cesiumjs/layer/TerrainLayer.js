import { CesiumZondy } from '../core/Base';

import BaseLayer from './BaseLayer';
import LayerType from './LayerType';

/**
 * @author 基础平台研发中心·冯桂英
 * @class TerrainLayer
 * @category  BaseLayer.TerrainLayer
 * @classdesc TerrainLayer 地形层管理类
 * @description 地形图层管理类,实现地形层相关操作
 * @param option.viewer = viewer 视图
 */
export default class TerrainLayer extends BaseLayer {
    constructor(option) {
        super(option);
    }

    /**
     * @private
     * 添加三维场景地形服务图层
     * @param {String} baseUrl 地形文档服务地址
     * @param {Number} sceneIndex 场景索引
     * @param {Number} layerIndex 图层索引
     * @param {DefaultProxy} [options.proxy = defaultProxy] 代理
     * @param {Object} options
     * @param {Boolean} [options.synchronous = true] 是否异步请求
     * @param {Number} [options.scale = 1] 地形缩放比例
     * @param {Object} [options.range] 地形范围
     * @returns {object}  地形图层对象
     * @example
     * appendTerrainLayer(baseUrl, sceneIndex, layerIndex, {
     * scale:1
     * range:terrainRange
     * });
     */
    appendTerrainLayer(baseUrl, sceneIndex, layerIndex, proxy, options) {
        let _proxy;
        if (Cesium.defined(proxy)) {
            _proxy = new Cesium.DefaultProxy(proxy);
        }
        let dataUrl =
            baseUrl +
            '/GetTerrain?sceneIndex=' +
            sceneIndex +
            '&layerIndex=' +
            layerIndex +
            '&Level={z}&Row={x}&Col={y}&xdensity=65&ydensity=65&webGL=true';
        let terrainProvider = new Cesium.MapGISTerrainProvider({
            url: dataUrl,
            range: options.range,
            proxy: _proxy,
            scale: options.scale,
        });

        this.viewer.terrainProvider = terrainProvider;
        return terrainProvider;
    }

    /**
     * 添加三维场景地形服务
     * @param {String} url 地形文档服务地址
     * @param {Object} options
     * @param {Boolean} [options.synchronous = true] 是否异步请求
     * @param {Function} [options.loaded = function] 回调函数
     * @param {DefaultProxy} [options.proxy = defaultProxy] 代理
     * @returns 地形层对象
     * @example
     * function callBackfunction(layer){
     * console.log(layer)
     * }
     * terrain = new TerrainLayer(view);
     * terrain.append('http://develop.smaryun.com:6163/igs/rest/g3d/terrain',{
     * loaded:callBackfunction
     * });
     */
    append(url, options) {
        if (!Cesium.defined(url)) {
            return new Cesium.DeveloperError('必须指定url');
        }
        let synchronous = true;
        let baseUrl = url;
        let resource;
        let proxy;
        let docLayers = [];

        if (Cesium.defined(options)) {
            if (Cesium.defined(options.proxy)) {
                //不放在defaultValue中 new 会影响性能
                proxy = new Cesium.DefaultProxy(options.proxy);
            }
            Cesium.defaultValue(options.proxy, undefined);
            synchronous = Cesium.defaultValue(options.synchronous, true);
        }

        let parseDocInfo = (info) => {
            if (info !== undefined && info.sceneInfos.length > 0) {
                let layers = info.sceneInfos[0].layers;
                for (let i in layers) {
                    let { layerType, layerRenderIndex } = layers[i];
                    let type = parseInt(layerType);
                    if (type === LayerType.TERRAINLAYER) {
                        let sceneIndex = 0;
                        debugger;
                        let layerRes = this.appendTerrainLayer(
                            baseUrl,
                            sceneIndex,
                            layerRenderIndex,
                            proxy,
                            options,
                        );
                        docLayers.push(layerRes);
                    }
                }
            }
        };

        let _callBack = (params) => {
            let _params = params;
            if (
                Cesium.defined(options.loaded) &&
                typeof options.loaded === 'function'
            ) {
                options.loaded(_params);
            }
        };

        if (synchronous) {
            resource = new Cesium.Resource({
                url: baseUrl + '/GetDocInfo',
                proxy: proxy,
            });
            resource.fetchJson().then((json) => parseDocInfo(json));
        } else {
            let request = new Cesium.XMLHttpRequest();
            request.open('GET', baseUrl + '/GetDocInfo', false);
            request.send(null);
            if (request.status === 200) {
                let info = Cesium.JSON.parse(request.responseText);
                if (info) {
                    parseDocInfo(info);
                }
            }
        }
        return docLayers;
    }

    /**
     * 移除地形图层
     */
    removeTerrain() {
        let EProvider = new Cesium.EllipsoidTerrainProvider();
        this.viewer.terrainProvider = EProvider;
    }
}

CesiumZondy.Layer.TerrainLayer = TerrainLayer;
