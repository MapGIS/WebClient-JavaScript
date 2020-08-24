import { CesiumZondy } from '../core/Base';

import BaseLayer from './BaseLayer';
import LayerType from './LayerType';

/**
 * @author 基础平台研发中心·冯桂英
 * @class module:客户端数据服务.M3DLayer
 * @category  BaseLayer.M3DLayer
 * @classdesc M3DLayer M3D模型层管理类
 * @description M3D图层管理类,实现M3D模型层相关操作
 * @param optionsParam.viewer  场景视图
 */
export default class M3DLayer extends BaseLayer {
    constructor(optionsParam) {
        const options = optionsParam;
        super(options);
    }

    /**
     * @private
     * 添加三维场景m3d服务图层
     * @param {String} baseUrl 文档地址
     * @param {Number} renderIndex 图层渲染索引
     * @param {Number} layerIndex 图层索引
     * @param {String} gdbpUrl m3d文件索引地址
     * @param {Boolean} visible 是否可见
     * @param {Boolean} igserver 是否是igs服务
     * @param {Object} optionsParam
     * @param {Boolean} [optionsParam.autoReset = true] 是否自动定位
     * @param {Boolean} [optionsParam.synchronous = true] 是否异步请求
     * @param {Function} [optionsParam.loaded = function] 回调函数
     * @param {DefaultProxy} [optionsParam.proxy = defaultProxy] 代理
     * @returns m3d层对象
     * @example
     * function callBackfunction(layer){
     * console.log(layer)
     * }
     * appendM3DLayer(baseUrl, renderIndex, layerIndex, gdbpUrl, visible, igserver, {
     * autoReset:false,
     * debugShowBoundingVolume:false,
     * maximumScreenSpaceError:16
     * });
     */
    appendM3DLayer(baseUrl, renderIndex, layerIndex, gdbpUrl, visible, igserver, optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const dataUrl = `${baseUrl}/GetDataStreams?sceneIndex=0&layerIndex=${renderIndex}&Level=0&Row=0&Col=0`;
        const showBoundingVolume = Cesium.defaultValue(options.debugShowBoundingVolume, false);
        const maxScreenError = Cesium.defaultValue(options.maximumScreenSpaceError, 16);
        const debugShowMemoryUsage = Cesium.defaultValue(options.debugShowMemoryUsage, false);
        const debugShowUrl = Cesium.defaultValue(options.debugShowUrl, false);

        const m3dLayr = new Cesium.MapGISM3DSet({
            url: dataUrl,
            layerRenderIndex: renderIndex,
            layerIndex,
            gdbpUrl,
            show: visible,
            igserver,
            debugShowBoundingVolume: showBoundingVolume,
            maximumScreenSpaceError: maxScreenError,
            debugShowMemoryUsage,
            debugShowUrl
        });
        const tileset = this.viewer.scene.primitives.add(m3dLayr);
        const autoReset = Cesium.defaultValue(options.autoReset, true);
        if (autoReset) {
            tileset.readyPromise.then((layer) => this.zoomToM3dLayer(layer));
        }
        return tileset;
    }

    /**
     * 添加m3d文档服务
     * @function module:客户端数据服务.M3DLayer.prototype.append
     * @param {String} url 服务地址
     * @param {Object} optionsParam 包含以下参数
     * @param {Boolean} [optionsParam.autoReset = true] 是否自动定位
     * @param {Boolean} [optionsParam.synchronous = true] 是否异步请求
     * @param {Function} [optionsParam.loaded = function] 回调函数
     * @param {DefaultProxy} [optionsParam.proxy = defaultProxy] 代理
     * @param {Boolean} [optionsParam.showBoundingVolume = false] 是否显示包围盒
     * @param {Number} [optionsParam.maximumScreenSpaceError = 16] 用于控制模型显示细节  值较大将会渲染更少的贴图,进而可以提高性能,而较低的值将提高视觉质量
     * @see {@link https://cesium.com/docs/cesiumjs-ref-doc/Cesium3DTileset.html}
     * @returns {Array<MapGISM3DSet>} 返回m3d图层对象数组,长度为图层对象个数
     * @example
     * function callBackfunction(layer){
     * console.log(layer)
     * }
     * let result = m3d.append('http://develop.smaryun.com:6163/igs/rest/g3d/ModelM3D, {
     * autoReset:false,
     * synchronous:true,
     * showBoundingVolume:false,
     * maximumScreenSpaceError:16,
     * loaded:callBackfunction
     * });
     *
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

        const parseDocInfo = (info) => {
            if (info !== undefined && info.sceneInfos.length > 0) {
                const { layers } = info.sceneInfos[0];
                layers.forEach((layer) => {
                    const type = parseInt(layer.layerType, 10);
                    if (type === LayerType.M3DLAYER) {
                        const { layerRenderIndex, layerIndex, gdbpUrl, isVisible } = layer;
                        const m3d = this.appendM3DLayer(baseUrl, layerRenderIndex, layerIndex, gdbpUrl, isVisible, true, options);
                        docLayers.push(m3d);
                        m3d.readyPromise.then(_callBack);
                    }
                });
            }
        };

        const getDoc = '/GetDocInfo';
        const requestUrl = `${baseUrl}${getDoc}`;
        if (synchronous) {
            resource = new Cesium.Resource({
                url: requestUrl,
                proxy
            });
            resource.fetchJson().then((json) => parseDocInfo(json));
        } else {
            const request = new Cesium.XMLHttpRequest();
            request.open('GET', requestUrl, false);
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
     * 添加m3d服务图层（mongodb）
     * @function module:客户端数据服务.M3DLayer.prototype.appendM3dCacheFromMangoDB
     * @param {String} url 服务地址（发布的m3d缓存服务）
     * @param {Object} optionsParam 包含以下参数
     * @param {Boolean} [optionsParam.autoReset = true] 是否自动复位
     * @param {Function} [optionsParam.loaded = function] 回调函数
     * @param {DefaultProxy} 代理
     * @example
     * let view = { viewer: window.globe.viewer };
       let m3d = new M3DLayer(view);
       function callBackfunction(layer){
       }
       m3d.appendM3dLayer('http://localhost:6163/igs/rest/g3d/cache/jg', {
       autoReset:false
       loaded:callBackfunction
       });
     */
    appendM3dCacheFromMangoDB(baseUrl, optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        let proxy;
        let autoReset = true;
        if (Cesium.defined(options)) {
            if (Cesium.defined(options.proxy)) {
                proxy = new Cesium.DefaultProxy(options.proxy);
            }
            Cesium.defaultValue(options.proxy, undefined);
            autoReset = Cesium.defaultValue(options.autoReset, true);
        }
        const resource = new Cesium.Resource({
            url: `${baseUrl}/GetCacheInfo`,
            proxy
        });
        const layer = [];

        resource.fetchJson().then((json) => {
            if (Cesium.defined(json)) {
                const dataUrlCache = `${baseUrl}/GetDataStreams?`;
                const m3dLayrCache = new Cesium.MapGISM3DSet({
                    url: dataUrlCache,
                    igserver: true
                });
                const cacheLayer = this.viewer.scene.primitives.add(m3dLayrCache);
                layer.push(cacheLayer);
                layer.readyPromise.then((tileSet) => {
                    if (autoReset) {
                        const { boundingSphere } = tileSet;
                        this.viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius));
                        this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
                        if (typeof options.loaded === 'function') {
                            options.loaded(tileSet);
                        }
                    }
                });
            }
        });

        return layer;
    }

    /**
     * 设置模型层按方向移动
     * @function module:客户端数据服务.M3DLayer.prototype.setM3dLayerMovement
     * @param {MapGISM3DSet} layer m3d图层对象
     * @param {Cartesian3} direction 移动方向
     * @param {Number} distance 移动距离
     * @example
     *  let tilelayer = m3d.append('http://develop.smaryun.com:6163/igs/rest/g3d/ModelM3D',{});
     *  let dir = new Cesium.Cartesian3(0.0, 1.0, 1.0); 分别表示xyz方向
     *  m3d.setM3dLayerMovement(tilelayer[0],dir,10.0)
     */
    setM3dLayerMovement(tileSet, direction, distance) {
        if (undefined === tileSet || undefined === direction || undefined === distance) {
            return false;
        }
        if (undefined === tileSet._root) {
            return false;
        }
        Cesium.Cartesian3.normalize(direction, direction);
        Cesium.Cartesian3.multiplyByScalar(direction, distance, direction);
        const worldPoint = Cesium.Matrix4.multiplyByPoint(tileSet._root.transform, direction, new Cesium.Cartesian3());
        const matrix = Cesium.Matrix4.setTranslation(tileSet._root.transform, worldPoint, new Cesium.Matrix4());
        const { _root } = tileSet;
        _root.transform = matrix;
        this.scene.requestRender();
        return true;
    }

    /**
     * 设置模型定位点
     * @function module:客户端数据服务.M3DLayer.prototype.setM3dLayerLocation
     * @param {Object} layer m3d图层对象
     * @param {Number} longtitude 经度
     * @param {Number} latitude  纬度
     * @example
     * tilelayer = m3d.append('http://develop.smaryun.com:6163/igs/rest/g3d/ModelM3D',{});
     * m3d.setM3dLayerLocation(tilelayer[0],103.0,30.0);
     */
    setM3dLayerLocation(tileSet, longtitude, latitude) {
        if (undefined === tileSet) {
            return false;
        }
        if (undefined === tileSet._root) {
            return false;
        }
        let hpr = new Cesium.Matrix3();
        const hprObj = new Cesium.HeadingPitchRoll(Cesium.Math.PI, Cesium.Math.PI, Cesium.Math.PI);
        hpr = Cesium.Matrix3.fromHeadingPitchRoll(hprObj, hpr);
        const modelMatrix = Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(longtitude, latitude, 0)), new Cesium.Cartesian3(), new Cesium.Matrix4());
        Cesium.Matrix4.multiplyByMatrix3(modelMatrix, hpr, modelMatrix);
        const { _root } = tileSet;
        _root.transform = modelMatrix;
        this.scene.requestRender();
        return true;
    }
}

CesiumZondy.Layer.M3DLayer = M3DLayer;
