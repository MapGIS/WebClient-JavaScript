import { CesiumZondy } from '../core/Base';
import LayerManager from '../layer/LayerManager';

/**
 * @author 三维基础平台研发中心·冯桂英
 * @class module:客户端公共方法.CesiumFuncManager
 * @category CesiumFuncManager
 * @classdesc 实体绘制控制器类
 * @description 该类实现了实体数据的绘制与删除功能
 * @param option.viewer 视图
 */
export default class CesiumFuncManager extends LayerManager {
    constructor(optionsParam) {
        const options = optionsParam;
        super(options);
    }

    /**
     * 通过地址添加图片，包括本地图片和网络图片
     * @function module:客户端公共方法.CesiumFuncManager.prototype.appendImageByUrl
     * @param {String} url 图片地址
     * @param {Number} west 西经
     * @param {Number} south 南纬
     * @param {Number} east 东经
     * @param {Number} north 北纬
     * @param {Object} options 扩展参数
     * @example
     * let cesiumFun = new CesiumFuncManager({viewer:viewer});
     * let singleImage = cesiumFun.appendImageByUrl('.../../../../../../../../static/libs/Cesium/MapGIS/image/2.5D2.png',110,20,114,30);
     */
    appendImageByUrl(url, west, south, east, north, options) {
        const providerOpts = {
            url,
            rectangle: Cesium.Rectangle.fromDegrees(west, south, east, north)
        };
        if (Cesium.defined(options)) {
            Object.extend(providerOpts, options);
        }
        const singleImage = this.viewer.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider(providerOpts));
        return singleImage;
    }

    /**
     *移除添加的图片
     * @function module:客户端公共方法.CesiumFuncManager.prototype.removeImage
     * @param {Object} imageryLayer 添加的图片对象
     * @param {Boolean} isDestroy  是否销毁图片对象
     */
    removeImage(imageryLayer, isDestroy = true) {
        if (this.viewer.imageryLayers.contains(imageryLayer)) {
            this.viewer.imageryLayers.remove(imageryLayer, isDestroy);
        }
    }

    /**
     * 通过路径添加3DTile数据
     * @function module:客户端公共方法.CesiumFuncManager.prototype.append3DTile
     * @param {String} url 路径
     * @param {Function} onsuccess 成功回调
     * @param {Object} options 扩展参数
     * @see {@link https://cesium.com/docs/cesiumjs-ref-doc/Cesium3DTileset.html?classFilter=Cesium3DTileset }
     * @returns {Object} kml数据对象
     * @example
     * function load(layer) {
                viewer.flyTo(layer);
                console.log("这是一个加载成功回调");
            }
        tiles = cesiumFun.append3DTile('../../../../../../static/data/BatchedTilesets/tileset.json', load);
     */
    append3DTile(url, onsuccess, options) {
        if (url === null) {
            return null;
        }
        const para = {
            url
        };
        if (Cesium.defined(options)) {
            Object.extend(para, options);
        }
        const tileset = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset(para));
        if (Object.prototype.toString.call(onsuccess) === '[object Function]') {
            tileset.readyPromise.then(() => {
                onsuccess(tileset);
            });
        }
        return tileset;
    }

    /**
     *移除3dTile对象
     * @function module:客户端公共方法.CesiumFuncManager.prototype.remove3DTile
     * @param {Object} tileset 3dTile对象
     */
    remove3DTile(tileset) {
        this.viewer.scene.primitives.remove(tileset);
    }

    /**
     * 添加模型（gltf文件）
     * @function module:客户端公共方法.CesiumFuncManager.prototype.appendModel
     * @param {Number} id 模型id
     * @param {String} url 模型url路径
     * @param {Number} lon 模型所在经度
     * @param {Number} lat 模型坐在纬度
     * @param {Number} height 高度
     * @param {Number} scale 缩放比
     * @param {Option} 参数
     * @param {Color} 颜色 
     * @param {ColorBlendMode} [options.colorBlendMode] 颜色混合模式 Cesium.ColorBlendMode.MIX
     * @param {Number} [options.colorBlendAmount] 颜色混合程度
     * @returns {Object} model 移除通过 removeModel()
     * @example
     *   let modelUrl = '../../../../../../static/data/CesiumAir/Cesium_Air.gltf';
            cesiumFun.appendModels('1', modelUrl, 114, 28, 200, 100000, {
                color: Cesium.Color.RED,
                colorBlendMode: Cesium.ColorBlendMode.MIX,//  MIX是混合 Cesium.ColorBlendMode.HIGHLIGHT, HIGHLIGHT是高亮
                colorBlendAmount: 0.4 //这个是程度
            });
     */
    appendModel(id, url, lon, lat, height = 1000.0, scale = 1.0, options) {
        const position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
        const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(position, new Cesium.HeadingPitchRoll());
        const modelObj = {
            id,
            url,
            modelMatrix,
            scale
        };
        if (Cesium.defined(options)) {
            Object.extend(modelObj, options);
        }
        const modelSingle = this.viewer.scene.primitives.add(Cesium.Model.fromGltf(modelObj));
        modelSingle.readyPromise.then(() => {
            modelSingle.activeAnimations.addAll({
                speedup: 0.5,
                loop: Cesium.ModelAnimationLoop.REPEAT
            });
        });

        return modelSingle;
    }

    /**
     * 批量添加模型
     * @function module:客户端公共方法.CesiumFuncManager.prototype.appendModels
     * @param {String} modelsString 模型组织
     * @param {Function} successCall 成功后的回调
     * @returns {Object} 模型层对象
     */
    appendModels(modelsString, successCall) {
        const models = new Cesium.CzmlDataSource();
        const datasourcePromise = this.viewer.dataSources.add(models.load(modelsString));
        datasourcePromise.then((datasource) => {
            if (successCall !== null && typeof successCall === 'function') {
                successCall(datasource.entities);
            }
        });
        return models;
    }

    /**
     * 通过文件批量添加模型
     * @function module:客户端公共方法.CesiumFuncManager.prototype.appendModels
     * @param  {String} filePath 模型组织文件
     * @param {Function} successCall 成功后的回调
     * @returns {Object} 模型层对象
     */
    appendModelsByFile(filePath, successCall) {
        const models = new Cesium.CzmlDataSource();
        const datasourcePromise = this.viewer.dataSources.add(models.load(filePath));
        datasourcePromise.then((datasource) => {
            if (successCall !== null && typeof successCall === 'function') {
                successCall(datasource.entities);
            }
        });
        return models;
    }

    /**
     * 加载Kml、kmz数据
     * @function module:客户端公共方法.CesiumFuncManager.prototype.appendKml
     * @param {String} url 路径
     * @param {String} options 参数
     * @see {@link https://cesium.com/docs/cesiumjs-ref-doc/KmlDataSource.html?classFilter=KmlDataSource }
     * @returns {KmlDataSource} kml数据对象
     */
    appendKml(url, options, successCall) {
        const opt = {
            camera: this.viewer.scene.camera,
            canvas: this.viewer.scene.canvas
        };
        if (Cesium.defined(options)) {
            Object.extend(opt, options);
        }
        const kmlData = new Cesium.KmlDataSource(opt);

        const datasourcePromise = this.viewer.dataSources.add(kmlData.load(url, opt));
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
     * @function module:客户端公共方法.CesiumFuncManager.prototype.appendCZML
     * @param {String} url 文件地址
     * @param {Function} successCall 成功后的回调
     * @returns {CzmlDataSource} czml 对象
     * @example
     *  var czml = cesiumFun.addCZML('SampleData/model.czml');
     */
    appendCZML(url, successCall) {
        const dataSource = new Cesium.CzmlDataSource();
        const datasourcePromise = this.viewer.dataSources.add(dataSource.load(url));
        datasourcePromise.then((datasource) => {
            if (successCall !== null && typeof successCall === 'function') {
                successCall(datasource.entities);
            }
        });
        return dataSource;
    }

    /**
     * 添加GeoJson文件
     * @function module:客户端公共方法.CesiumFuncManager.prototype.appendGeoJson
     * @param {String} url 文件地址
     * @returns {GeoJsonDataSource} 数据对象
     * @example
     *  let geoJson = cesiumFun.appendGeoJson('SampleData/china.topojson');
     */
    appendGeoJson(url, successCall, options) {
        const dataSource = new Cesium.GeoJsonDataSource();
        const dataOptions = {
            stroke: Cesium.Color.HOTPINK,
            fill: Cesium.Color.PINK.withAlpha(0.5),
            strokeWidth: 3
        };
        if (Cesium.defined(options)) {
            Object.extend(dataOptions, options);
        }
        const datasourcePromise = this.viewer.dataSources.add(dataSource.load(url, dataOptions));
        datasourcePromise.then((datasource) => {
            if (successCall !== null && typeof successCall === 'function') {
                successCall(datasource.entities);
            }
        });
        return dataSource;
    }

    /**
     * 移除模型
     * @function module:客户端公共方法.CesiumFuncManager.prototype.removeModel
     * @param {Model} model 模型对象
     */
    removeModel(model) {
        this.viewer.entities.remove(model);
        this.viewer.scene.primitives.remove(model);
    }

    /**
     * 移除通过appendModelsByFile()和appendModels()添加的模型
     * @function module:客户端公共方法.CesiumFuncManager.prototype.removeModels
     * @param  {DataSource} models 模型组织
     */
    removeModels(models) {
        this.viewer.dataSources.remove(models);
    }

    /**
     * 移除数据对象
     * @function module:客户端公共方法.CesiumFuncManager.prototype.removeDataSource
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
     * @function module:客户端公共方法.CesiumFuncManager.prototype.removeAllDataSource
     * @param {Boolean} isDestroy 是否销毁
     */
    removeAllDataSource(isDestroy = false) {
        this.viewer.dataSources.removeAll(isDestroy);
    }
}

CesiumZondy.Layer.CesiumFuncManager = CesiumFuncManager;
