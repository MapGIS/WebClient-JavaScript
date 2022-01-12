import { CesiumZondy } from '../core/Base';

import BaseLayer from './BaseLayer';

/**
 * @author 基础平台研发中心·冯桂英
 * @class module:客户端数据服务.TilesLayer
 * @category BaseLayer.TilesLayer
 * @classdesc TilesLayer 瓦片图层管理类
 * @description 瓦片服务管理类,实现瓦片图层相关操作
 * @param optionsParam.viewer 场景视窗
 */
export default class TilesLayer extends BaseLayer {
    constructor(optionsParam) {
        const options = optionsParam;
        super(options);
    }

    /**
     * @private
     * 加载三维地图文档瓦片层
     * @param  {String} url 发布的文档地址
     * @param  {Number} sceneIndex 图层所在场景索引
     * @param  {Number} layerIndex 图层索引
     * @param  {Object} optionsParam 其他附加属性包含以下属性的对象
     * @param  {Rectangle} [optionsParam.tileRange=Rectangle.fromDegrees(-180,-90,180,90)] 默认范围为全球范围
     * @param  {Number} [optionsParam.colNum=2] 瓦片初始级的列数 默认为2
     * @param  {Number} [optionsParam.rowNum=1] 瓦片初始级的行数 默认为1
     * @param  {Number} [optionsParam.maxLevel=19] 瓦片最大显示级数 默认为19
     * @param  {String} [optionsParam.proxy] 转发代理
     * @returns {ImageryLayer} 瓦片对象
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
    append3DDocTileLayer(url, sceneIndex, layerIndex, optionsParam) {
        let proxy;
        if (optionsParam.proxy) {
            proxy = new Cesium.DefaultProxy(optionsParam.proxy);
        }
        const options = Cesium.defaultValue(optionsParam, {});
        const dataUrl = `${url}/GetCovering?sceneIndex=${sceneIndex.toString()}&layerIndex=${layerIndex.toString()}&level={level}&row={row}&col={col}&xDensity=43&yDensity=43`;
        const mapGisDocTile = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.MapGISDocMapProvider({
                url: dataUrl,
                rectangle: options.tileRange,
                colNum: options.colNum,
                rowNum: options.rowNum,
                maximumLevel: options.maxLevel,
                proxy
            })
        );
        return mapGisDocTile;
    }

    /**
     * 加载二维地图文档瓦片服务
     * @function module:客户端数据服务.TilesLayer.prototype.append2DDocTile
     * @param {String} url 发布的文档服务地址
     * @param {Object} optionsParam 其他附加属性包含以下属性的对象
     * @param {Rectangle} [optionsParam.tileRange=Rectangle.fromDegrees(-180,-90,180,90)] 默认范围为全球范围
     * @param {Number} [optionsParam.colNum=2] 瓦片初始级的列数 默认为2
     * @param {Number} [optionsParam.rowNum=1] 瓦片初始级的列数 默认为1
     * @param {Number} [options.minimumLevel=0] 瓦片最小级别
     * @param {Number} [options.maximumLevel=19] 瓦片最大级别
     * @param {String} [optionsParam.proxy] 转发代理
     * @param {Array}  [options.gdbps] gdbps地址数组
     * @param {String} [options.layers] layers参数，用于过滤图层
     *
     * @returns {ImageryLayer} 瓦片对象
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
    append2DDocTile(url, optionsParam) {
        // 中地新版正常二维瓦片
        const options = Cesium.defaultValue(optionsParam, {});

        if (Cesium.defined(options.gdbps) && Cesium.defined(options.layers)) {
            // eslint-disable-next-line no-console
            console.log('不能同时定义 gdbps 和 layers');
        }

        options.url = url;
        const mapGis2DDocTile = this.viewer.imageryLayers.addImageryProvider(new Cesium.MapGIS2DDocMapProvider(options));
        return mapGis2DDocTile;
    }

    /**
     * 添加igs发布的瓦片服务
     * @function module:客户端数据服务.TilesLayer.prototype.appendMapGISTile
     * @param {String} url 瓦片服务地址
     * @param {Object} optionsParam 其他附加属性包含以下属性的对象
     * @param {Rectangle} [optionsParam.tileRange=Rectangle.fromDegrees(-180,-90,180,90)] 默认范围为全球范围
     * @param {Number} [optionsParam.colNum=2] 瓦片初始级的列数 默认为2
     * @param {Number} [optionsParam.rowNum=1] 瓦片初始级的行数 默认为1
     * @param {Number} [optionsParam.tileWidth=2] 瓦片宽度 默认为256
     * @param {Number} [optionsParam.tileHeigh=1] 瓦片高度 默认为256
     * @param {Number} [optionsParam.maxLevel=19] 瓦片最大显示级数 默认为19
     * @param {String} [optionsParam.proxy] 转发代理
     * @returns {ImageryLayer} 瓦片层对象
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
    appendMapGISTile(url, optionsParam) {
        const _url = `${url}/{level}/{row}/{col}`;
        let proxy;
        if (optionsParam.proxy) {
            proxy = new Cesium.DefaultProxy(optionsParam.proxy);
        }
        const options = Cesium.defaultValue(optionsParam, {});
        const mapGisTile = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.MapGISMapProvider({
                url: _url,
                tilingScheme: options.tilingScheme,
                rectangle: options.tileRange,
                colNum: options.colNum,
                rowNum: options.rowNum,
                maximumLevel: options.maxLevel,
                tileWidth: options.tileWidth,
                tileHeight: options.tileHeight,
                proxy,
                mapStyle: options.mapStyle
            })
        );
        return mapGisTile;
    }

    /**
     * @private
     * 添加自定义瓦片服务
     * @param  {String} url 地址
     * @param  {Object} optionsParam 参数
     * @returns {Object} 自定义瓦片服务对象
     */
    appendTileMapServiceImage(url, optionsParam) {
        const para = {
            url,
            maximumLevel: 8
        };
        if (Cesium.defined(optionsParam)) {
            Object.extend(para, optionsParam);
        }
        const imageryProvider = new Cesium.UrlTemplateImageryProvider(para);

        const tileMapService = this.viewer.imageryLayers.addImageryProvider(imageryProvider);
        return tileMapService;
    }
}

CesiumZondy.Layer.TilesLayer = TilesLayer;
