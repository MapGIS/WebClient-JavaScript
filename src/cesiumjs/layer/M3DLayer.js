import { CesiumZondy } from '../core/Base';

import BaseLayer from './BaseLayer';
import LayerType from './LayerType';

/**
 * @author 基础平台研发中心·冯桂英
 * @class M3DLayer
 * @category  BaseLayer.M3DLayer
 * @classdesc M3DLayer M3D模型层管理类
 * @description M3D图层管理类,实现M3D模型层相关操作
 * @param option.viewer = viewer 视图
 */
export default class M3DLayer extends BaseLayer {
    constructor(option) {
        super(option);
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
     * @param {Object} options
     * @param {Boolean} [options.autoReset = true] 是否自动定位
     * @param {Boolean} [options.synchronous = true] 是否异步请求
     * @param {Boolean} [options.loaded = function] 回调函数
     * @param {DefaultProxy} [options.proxy = defaultProxy] 代理
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
    appendM3DLayer(
        baseUrl,
        renderIndex,
        layerIndex,
        gdbpUrl,
        visible,
        igserver,
        options
    ) {
        let dataUrl =
            baseUrl +
            '/GetDataStreams?sceneIndex=0&layerIndex=' +
            renderIndex +
            '&Level=0&Row=0&Col=0';
        let showBoundingVolume = Cesium.defaultValue(
            options.debugShowBoundingVolume,
            false
        );
        let maxScreenError = Cesium.defaultValue(
            options.maximumScreenSpaceError,
            16
        );
        let debugShowMemoryUsage = Cesium.defaultValue(
            options.debugShowMemoryUsage,
            false
        );
        let debugShowUrl = Cesium.defaultValue(options.debugShowUrl, false);

        let m3dLayr = new Cesium.MapGISM3DSet({
            url: dataUrl,
            layerRenderIndex: renderIndex,
            layerIndex: layerIndex,
            gdbpUrl: gdbpUrl,
            show: visible,
            igserver: igserver,
            debugShowBoundingVolume: showBoundingVolume,
            maximumScreenSpaceError: maxScreenError,
            debugShowMemoryUsage: debugShowMemoryUsage,
            debugShowUrl: debugShowUrl
        });
        let tileset = this.viewer.scene.primitives.add(m3dLayr);
        let autoReset = Cesium.defaultValue(options.autoReset, true);
        if (autoReset) {
            tileset.readyPromise.then(layer => this.zoomToM3dLayer(layer));
        }
        return tileset;
    }

    /**
     * 添加m3d文档服务
     * @param {String} url 服务地址
     * @param {Object} options
     * @param {Boolean} [options.autoReset = true] 是否自动定位
     * @param {Boolean} [options.synchronous = true] 是否异步请求
     * @param {Boolean} [options.loaded = function] 回调函数
     * @param {DefaultProxy} [options.proxy = defaultProxy] 代理
     * @param {Boolean} [options.showBoundingVolume = false] 是否显示包围盒
     * @param {Number} [options.maximumScreenSpaceError = 16] 用于控制模型显示细节  值较大将会渲染更少的贴图,进而可以提高性能,而较低的值将提高视觉质量
     * @see {@link https://cesium.com/docs/cesiumjs-ref-doc/Cesium3DTileset.html?classFilter=3dtile}
     * @returns 返回m3d图层对象数组,长度为图层对象个数
     * @example
     * function callBackfunction(layer){
     * console.log(layer)
     * }
     * result = m3d.append('http://develop.smaryun.com:6163/igs/rest/g3d/ModelM3D, {
     * autoReset:false,
     * synchronous:true,
     * showBoundingVolume:false,
     * maximumScreenSpaceError:16,
     * loaded:callBackfunction
     * });
     *
     */
    append(url, options) {
        if (!Cesium.defined(url)) {
            return new Cesium.DeveloperError('必须指定url');
        }
        options = Cesium.defaultValue(options , {});
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

        let parseDocInfo = info => {
            if (info !== undefined && info.sceneInfos.length > 0) {
                let layers = info.sceneInfos[0].layers;
                for (let i in layers) {
                    let { layerType } = layers[i];
                    let type = parseInt(layerType);
                    if (type === LayerType.M3DLAYER) {
                        let {
                            layerRenderIndex,
                            layerIndex,
                            gdbpUrl,
                            isVisible
                        } = layers[i];
                        let m3d = this.appendM3DLayer(
                            baseUrl,
                            layerRenderIndex,
                            layerIndex,
                            gdbpUrl,
                            isVisible,
                            true,
                            options
                        );
                        docLayers.push(m3d);
                        m3d.readyPromise.then(_callBack);
                    }
                }
            }
        };

        let _callBack = params => {
            let _params = params;
            if (
                Cesium.defined(options.loaded) &&
                typeof options.loaded === 'function'
            ) {
                options.loaded(_params);
            }
        };

        const getDoc = '/GetDocInfo';
        let requestUrl = `${baseUrl}${getDoc}`;
        if (synchronous) {
            resource = new Cesium.Resource({
                url: requestUrl,
                proxy: proxy
            });
            resource.fetchJson().then(json => parseDocInfo(json));
        } else {
            let request = new Cesium.XMLHttpRequest();
            request.open('GET', requestUrl, false);
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
     * 添加m3d服务图层（mongodb）
     * @param {String} url 服务地址（发布的m3d缓存服务）
     * @param {Object} options
     * @param {Boolean} [options.autoReset = true]
     * @param {Boolean} [options.loaded = function]
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
    appendM3dCacheFromMangoDB(baseUrl, options) {
        options = Cesium.defaultValue(options , {});
        let proxy;
        let autoReset = true;
        if (Cesium.defined(options)) {
            if (Cesium.defined(options.proxy)) {
                proxy = new Cesium.DefaultProxy(options.proxy); //不放在defaultValue中 new 会影响性能
            }
            Cesium.defaultValue(options.proxy, undefined);
            autoReset = Cesium.defaultValue(options.autoReset, true);
        }
        var resource = new Cesium.Resource({
            url: baseUrl + '/GetCacheInfo',
            proxy: proxy
        });
        var layer = [];
        var dataUrlCache = baseUrl + '/GetDataStreams?';
        //处理版本信息判断是否清除缓存
        var m3dLayrCache = new Cesium.MapGISM3DSet({
            url: dataUrlCache,
            igserver: true
        });
        layer = this.viewer.scene.primitives.add(m3dLayrCache);
        resource.fetchJson().then(json=> {
            layer.readyPromise.then(function(layer) {
                if (autoReset) {
                    var boundingSphere = layer.boundingSphere;
                    that.viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5,
                        boundingSphere.radius));
                    that.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
                    if (typeof options.loaded === 'function') {
                        options.loaded(layer);
                    }
                }

            });
        });

        return layer;
    }

    /**
     * 设置模型层按方向移动
     * @param {param} layer m3d图层对象
     * @param {param} direction 移动方向
     * @param {param} distance 移动距离
     * @param {Object} option 预留参数
     * @example
     *  tilelayer = m3d.append('http://develop.smaryun.com:6163/igs/rest/g3d/ModelM3D',{});
     *  let dir = new Cesium.Cartesian3(0.0, 1.0, 1.0); 分别表示xyz方向
     *  m3d.setM3dLayerMovement(tilelayer[0],dir,10.0)
     */
    setM3dLayerMovement(layer, direction, distance, options) {
        if (
            undefined === layer ||
            undefined === direction ||
            undefined === distance
        ) {
            return false;
        }
        if (undefined === layer._root.transform) {
            return false;
        }
        Cesium.Cartesian3.normalize(direction, direction);
        Cesium.Cartesian3.multiplyByScalar(direction, distance, direction);
        let worldPoint = Cesium.Matrix4.multiplyByPoint(
            layer._root.transform,
            direction,
            new Cesium.Cartesian3()
        );
        let matrix = Cesium.Matrix4.setTranslation(
            layer._root.transform,
            worldPoint,
            new Cesium.Matrix4()
        );
        layer._root.transform = matrix;
        this.scene.requestRender();
    }

    /**
     * 设置模型定位点
     * @param {object} layer m3d图层对象
     * @param {float} longtitude 经度
     * @param {float} latitude  纬度
     * @example
     * tilelayer = m3d.append('http://develop.smaryun.com:6163/igs/rest/g3d/ModelM3D',{});
     * m3d.setM3dLayerLocation(tilelayer[0],103.0,30.0);
     */
    setM3dLayerLocation(layer, longtitude, latitude) {
        if (undefined === layer) {
            return false;
        }
        if (undefined === layer._root) {
            return false;
        }
        var hpr = new Cesium.Matrix3();
        var hprObj = new Cesium.HeadingPitchRoll(
            Cesium.Math.PI,
            Cesium.Math.PI,
            Cesium.Math.PI
        );
        hpr = Cesium.Matrix3.fromHeadingPitchRoll(hprObj, hpr);

        var modelMatrix = Cesium.Matrix4.multiplyByTranslation(
            Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(longtitude, latitude, 0)
            ),
            new Cesium.Cartesian3(),
            new Cesium.Matrix4()
        );
        Cesium.Matrix4.multiplyByMatrix3(modelMatrix, hpr, modelMatrix);
        layer._root.transform = modelMatrix;
    }
}

CesiumZondy.Layer.M3DLayer = M3DLayer;
