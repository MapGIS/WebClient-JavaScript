import { CesiumZondy } from '../core/Base';

import LayerType from '../layer/LayerType';
import M3DLayer from '../layer/M3DLayer';
import TerrainLayer from '../layer/TerrainLayer';
import TilesLayer from '../layer/TilesLayer';

/**
 * @author 三维基础平台研发中心·冯桂英
 * @class LayerManager
 * @category  LayerManager
 * @classdesc LayerManager图层管理类
 * @description 图层管理类,处理场景相关操作
 * @param options.viewer 场景视图
 */
export default class LayerManager {
    constructor(option) {
        this.viewer = Cesium.defaultValue(option.viewer, undefined);
    }

    /**
     * 添加三维场景文档服务
     * @param {String} url 文档地址
     * @param {Object} options
     * @param {Boolean} [options.autoReset = true] 是否自动定位
     * @param {Boolean} [options.synchronous = true] 是否异步请求
     * @param {Boolean} [options.loaded = function] 回调函数
     * @param {DefaultProxy} [options.proxy = defaultProxy] 代理
     * @example
     * let layerManager = new LayerManager(view);
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

        let tileset = null;
        let parseDocInfo = (info) => {
            if (info !== undefined && info.sceneInfos.length > 0) {
                let layers = info.sceneInfos[0].layers;
                for (let i in layers) {
                    let {
                        layerRenderIndex,
                        layerIndex,
                        gdbpUrl,
                        layerType,
                        isVisible,
                    } = layers[i];
                    let type = parseInt(layerType);
                    switch (type) {
                        case LayerType.UNKNOWN:
                            {
                                console.log('未识别图层');
                            }
                            break;
                        case LayerType.TERRAINLAYER:
                            {
                                let sceneIndex = 0;
                                let terrainLayer = new TerrainLayer({
                                    viewer: this.viewer,
                                });
                                let opt = {
                                    range:layers[i].range,
                                    scale:layers[i].terrainLayer.elevationScale
                                };
                                Object.extend(options, opt);
                                layerRes = terrainLayer.appendTerrainLayer(
                                    baseUrl,
                                    sceneIndex,
                                    layerRenderIndex,
                                    proxy,
                                    options,
                                );
                                docLayers.push(layerRes);
                            }
                            break;
                        case LayerType.TILEIMAGELAYER:
                            {
                                let tileLayer = new TilesLayer({
                                    viewer: this.viewer,
                                });
                                let layerRes = tileLayer.append3DDocTileLayer(
                                    baseUrl,
                                    sceneIndex,
                                    layerRenderIndex,
                                    proxy,
                                );
                                docLayers.push(layerRes);
                            }
                            break;
                        case LayerType.MODELLAYER:
                        case LayerType.M3DLAYER:
                            {
                                let m3d = new M3DLayer({ viewer: this.viewer });
                                tileset = m3d.appendM3DLayer(
                                    baseUrl,
                                    layerRenderIndex,
                                    layerIndex,
                                    gdbpUrl,
                                    isVisible,
                                    true,
                                    options,
                                );
                                docLayers.push(tileset);
                                tileset.readyPromise.then(_callBack);
                            }
                            break;
                        default:
                            break;
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
     * 通过地址添加图片，包括本地图片和网络图片
     * @param {String} url 图片地址
     * @param {Number} west  西经
     * @param {Number} south 南纬
     * @param {Number} east  东经
     * @param {Number} north 北纬
     * @param {Object} options 扩展参数
     */
    appendImageByUrl(url, west, south, east, north, options) {
        let providerOpts = {
            url: url,
            rectangle: Cesium.Rectangle.fromDegrees(west, south, east, north),
        };
        if (Cesium.defined(options)) {
            Object.extend(providerOpts, options);
        }
        let singleImage = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.SingleTileImageryProvider(providerOpts),
        );
        return singleImage;
    }

    /**
     *
     * @param {Object} imageryLayer 添加的图片对象
     * @param Boolean isDestroy  是否销毁图片对象
     */
    removeImage(imageryLayer, isDestroy = true) {
        if (this.viewer.imageryLayers.contains(imageryLayer)) {
            this.viewer.imageryLayers.remove(imageryLayer, isDestroy);
        }
    }

    /**
     * 通过路径添加3DTile数据
     * @param {String} url 路径
     * @param {Function} onsuccess 成功回调
     * @param {Object} options 扩展参数
     * @returns kml数据对象
     */
    append3DTile(url, onsuccess, options) {
        if (url === null) {
            return null;
        }
        let para = {
            url: url,
        };
        if (Cesium.defined(options)) {
            Object.extend(para, options);
        }
        let tileset = this.viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset(para),
        );
        if (Object.prototype.toString.call(onsuccess) === '[object Function]') {
            tileset.readyPromise.then(() => {
                onsuccess(tileset);
            });
        }
        return tileset;
    }
    /**
     *
     * @param {Object} tileset 3dTile对象
     */
    remove3DTile(tileset) {
        this.viewer.scene.primitives.remove(tileset);
    }

    /**
     * 添加模型（gltf文件）
     * @param {Number} id     模型id
     * @param {String} url    模型url路径
     * @param {Number} lon    模型所在经度
     * @param {Number} lat    模型坐在纬度
     * @param {Number} height 高度
     * @param {Number} scale  缩放比
     * @returns {object} model 移除通过 removeModel()
     */
    appendModel(id, url, lon, lat, height = 1000.0, scale = 1.0, options) {
        let position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
        let modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
            position,
            new Cesium.HeadingPitchRoll(),
        );
        let modelObj = {
            id: id,
            url: url,
            modelMatrix: modelMatrix,
            scale: scale,
        };
        if (Cesium.defined(options)) {
            Object.extend(modelObj, options);
        }
        let modelSingle = this.viewer.scene.primitives.add(
            Cesium.Model.fromGltf(modelObj),
        );
        modelSingle.readyPromise.then(() => {
            modelSingle.activeAnimations.addAll({
                speedup: 0.5,
                loop: Cesium.ModelAnimationLoop.REPEAT,
            });
        });

        return modelSingle;
    }

    /**
     * 批量添加模型
     * @param  {String} modelsString 模型组织
     * @param {function} successCall 成功后的回调
     * @returns 模型层对象
     */
    appendModels(modelsString, successCall) {
        let models = new Cesium.CzmlDataSource();
        let datasourcePromise = this.viewer.dataSources.add(
            models.load(modelsString),
        );
        datasourcePromise.then((datasource) => {
            if (successCall !== null && typeof successCall === 'function') {
                successCall(datasource.entities);
            }
        });
        return models;
    }

    /**
     * 通过文件批量添加模型
     * @param  {String} filePath 模型组织文件
     * @param {function} successCall 成功后的回调
     * @returns 模型层对象
     */
    appendModelsByFile(filePath, successCall) {
        let models = new Cesium.CzmlDataSource();
        let datasourcePromise = this.viewer.dataSources.add(
            models.load(filePath),
        );
        datasourcePromise.then((datasource) => {
            if (successCall !== null && typeof successCall === 'function') {
                successCall(datasource.entities);
            }
        });
        return models;
    }
    /**
     * 加载Kml、kmz数据
     * @param {String} url
     * @param {String} options
     * @returns kml数据对象
     */
    appendKml(url, options, successCall) {
        var opt = {
            camera: this.viewer.scene.camera,
            canvas: this.viewer.scene.canvas,
        };
        if (Cesium.defined(options)) {
            Object.extend(opt, options);
        }
        let kmlData = new Cesium.KmlDataSource(opt);

        let datasourcePromise = this.viewer.dataSources.add(
            kmlData.load(url, opt),
        );
        datasourcePromise.then((datasource) => {
            if (successCall !== null && typeof successCall === 'function') {
                successCall(datasource.entities);
            }
            this.viewer.clock.multiplier = 1;
            this.viewer.clock.shouldAnimate = true;
        });
        return kmlData;
    }

    /**
     * 添加czml文件
     * @param {String} url 文件地址
     * @param {function} successCall     成功后的回调
     * @example
     *  var czml = webGlobe.addCZML('SampleData/model.czml');
     */
    appendCZML(url, successCall) {
        let dataSource = new Cesium.CzmlDataSource();
        let datasourcePromise = this.viewer.dataSources.add(
            dataSource.load(url),
        );
        datasourcePromise.then((datasource) => {
            if (successCall !== null && typeof successCall === 'function') {
                successCall(datasource.entities);
            }
        });
        return dataSource;
    }

    /**
     * 添加GeoJson文件
     * @param {String} url 文件地址
     * @example
     *  var gjson = webGlobe.appendGeoJson('SampleData/china.topojson');
     */
    appendGeoJson(url, successCall, options) {
        let dataSource = new Cesium.GeoJsonDataSource();
        let dataOptions = {
            stroke: Cesium.Color.HOTPINK,
            fill: Cesium.Color.PINK.withAlpha(0.5),
            strokeWidth: 3,
        };
        if (Cesium.defined(options)) {
            Object.extend(dataOptions, options);
        }
        let datasourcePromise = this.viewer.dataSources.add(
            dataSource.load(url, dataOptions),
        );
        datasourcePromise.then((datasource) => {
            if (successCall !== null && typeof successCall === 'function') {
                successCall(datasource.entities);
            }
        });
        return dataSource;
    }

    /**
     * 移除模型
     * @param {model} model 模型对象
     */
    removeModel(model) {
        this.viewer.entities.remove(model);
        this.viewer.scene.primitives.remove(model);
    }

    /**
     * 移除通过appendModelsByFile()和appendModels()添加的模型
     * @param  {DataSource} models 模型组织
     * @see  appendModelsByFile,appendModels
     */
    removeModels(models) {
        this.viewer.dataSources.remove(models);
    }

    /**
     *
     * @param {DataSource} datasource 模型组织
     * @param {Boolean} isDestroy 是否销毁
     */
    removeDataSource(datasource, isDestroy = false) {
        if (Cesium.defined(datasource)) {
            if (this.viewer.dataSources.contains(datasource)) {
                this.viewer.dataSources.remove(datasource, isDestroy);
            }
        }
    }

    /**
     * 删除所有数据源：与以上几个接口配合使用
     * @param {Bool} isDestroy 是否销毁
     *
     */
    removeAllDataSource(isDestroy = false) {
        this.viewer.dataSources.removeAll(isDestroy);
    }
}

CesiumZondy.Manager.LayerManager = LayerManager;
