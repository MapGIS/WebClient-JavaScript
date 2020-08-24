import { CesiumZondy } from '../core/Base';

import BaseLayer from './BaseLayer';
import LayerType from './LayerType';

/**
 * @author 基础平台研发中心·冯桂英
 * @class module:客户端数据服务.TerrainLayer
 * @category  BaseLayer.TerrainLayer
 * @classdesc TerrainLayer 地形层管理类
 * @description 地形图层管理类,实现地形层相关操作
 * @param optionsParam.viewer 场景视图
 */
export default class TerrainLayer extends BaseLayer {
    constructor(optionsParam) {
        const options = optionsParam;
        super(options);
    }

    /**
     * @private
     * 添加三维场景地形服务图层
     * @param {String} baseUrl 地形文档服务地址
     * @param {Number} sceneIndex 场景索引
     * @param {Number} layerIndex 图层索引
     * @param {DefaultProxy} [options.proxy = defaultProxy] 代理
     * @param {Object} optionsParam 包含以下参数
     * @param {Boolean} [optionsParam.synchronous = true] 是否异步请求
     * @param {Number} [optionsParam.scale = 1] 地形缩放比例
     * @param {Object} [optionsParam.range] 地形范围
     * @returns {Object}  地形图层对象
     * @example
     * appendTerrainLayer(baseUrl, sceneIndex, layerIndex, {
     * scale:1
     * range:terrainRange
     * });
     */
    appendTerrainLayer(baseUrl, sceneIndex, layerIndex, proxy, optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        let _proxy;
        if (Cesium.defined(proxy)) {
            _proxy = new Cesium.DefaultProxy(proxy);
        }
        const dataUrl = `${baseUrl}/GetTerrain?sceneIndex=${sceneIndex}&layerIndex=${layerIndex}&Level={z}&Row={x}&Col={y}&xdensity=65&ydensity=65&webGL=true`;
        const terrainProvider = new Cesium.MapGISTerrainProvider({
            url: dataUrl,
            range: options.range,
            proxy: _proxy,
            scale: options.scale
        });

        this.viewer.terrainProvider = terrainProvider;
        return terrainProvider;
    }

    /**
     * 添加三维场景地形服务
     * @function module:客户端数据服务.TerrainLayer.prototype.append
     * @param {String} url 地形文档服务地址
     * @param {Object} optionsParam 包含以下参数
     * @param {Boolean} [optionsParam.synchronous = true] 是否异步请求
     * @param {DefaultProxy} [optionsParam.proxy = defaultProxy] 代理
     * @returns 地形层对象
     * @example
     * let terrain = new TerrainLayer(viewer:viewer);
     * let terrainProivder = terrain.append('http://develop.smaryun.com:6163/igs/rest/g3d/terrain');
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

        const parseDocInfo = (info) => {
            if (info !== undefined && info.sceneInfos.length > 0) {
                const { layers } = info.sceneInfos[0];
                layers.forEach((layer) => {
                    const { layerType, layerRenderIndex, elevationScale, range } = layer;
                    const type = parseInt(layerType, 10);
                    if (type === LayerType.TERRAINLAYER) {
                        const sceneIndex = 0;
                        const opt = {
                            range,
                            scale: elevationScale
                        };
                        Object.extend(options, opt);
                        const layerRes = this.appendTerrainLayer(baseUrl, sceneIndex, layerRenderIndex, proxy, options);
                        docLayers.push(layerRes);
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

    /**
     * 指定范围添加地形服务
     * @function module:客户端数据服务.TerrainLayer.prototype.appendTerrain
     * @param {String} url 地形服务地址 cesium可以加载的其他地形服务
     * @param {Number} west  西经
     * @param {Number} south 南纬
     * @param {Number} east  东经
     * @param {Number} north 北纬
     * @returns {Object} terrain 地形对象
     * @example
     * let terrain = new TerrainLayer(view);
     * let thirdLayer = new ThirdPartyLayer(view);
     * let third = thirdLayer.appendTDTuMapByWMTS({ ptype: 'img' });
     * terrain.appendTerrain('https://lab.earthsdk.com/terrain/577fd5b0ac1f11e99dbd8fd044883638',120,20,123,30);
     */
    appendTerrain(url, west, south, east, north) {
        const terrainProviderMeshes = new Cesium.CesiumTerrainProvider({
            url,
            tilingScheme: new Cesium.GeographicTilingScheme({
                rectangle: Cesium.Rectangle.fromDegrees(west, south, east, north),
                numberOfLevelZeroTilesX: 2,
                numberOfLevelZeroTilesY: 1
            }),
            requestVertexNormals: true
        });
        this.viewer.terrainProvider = terrainProviderMeshes;
    }
}

CesiumZondy.Layer.TerrainLayer = TerrainLayer;
