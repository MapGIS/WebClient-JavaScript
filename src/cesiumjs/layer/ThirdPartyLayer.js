import { CesiumZondy } from '../core/Base';

import BaseLayer from './BaseLayer';
/**
 * @author 基础平台研发中心·冯桂英
 * @class module:客户端数据服务.ThirdPartyLayer
 * @category BaseLayer.ThirdPartyLayer
 * @classdesc ThirdPartyLayer 瓦片图层管理类
 * @description 第三方瓦片服务管理类,实现瓦片图层相关操作
 * @param optionsParam.viewer 场景视窗
 */
export default class ThirdPartyLayer extends BaseLayer {
    constructor(optionsParam) {
        const options = optionsParam;
        super(options);
    }

    /**
     * 添加OSM服务地址
     * @function module:客户端数据服务.ThirdPartyLayer.prototype.appendOsmMap
     * @param {Object} optionsParam 预留扩展参数
     * @returns 瓦片层对象 可用于操作移除
     * @example
     * let tilelayer = thirdLayer.appendOsmMap();
     */
    appendOsmMap(optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        this._isHistoryImage = Cesium.defaultValue(options.isHistoryImage, false);
        this._imageVersion = Cesium.defaultValue(options.imageVersion, '0');
        // const offset = Cesium.defaultValue(options.Offset, false);
        // let offsetLabel = '';
        // if (offset) {
        //     offsetLabel = '&gl=cn';
        // }
        const url = `http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
        const osmMap = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.UrlTemplateImageryProvider({
                url,
                credit: new Cesium.Credit('OSM地图服务'),
                subdomains: ['a', 'b', 'c'],
                tilingScheme: new Cesium.WebMercatorTilingScheme()
            })
        );
        return osmMap;
    }

    /**
     * 添加谷歌服务地址
     * @function module:客户端数据服务.ThirdPartyLayer.prototype.appendGoogleMap
     * @param {Object} optionsParam 预留扩展参数
     * @param {String} optionsParam.ptype 类型：矢量'm@207000000' 影像's@130' 栅格't@130,r@207000000' 道路'h@207000000'
     * @returns 瓦片层对象 可用于操作移除
     * @example
     * let tilelayer = thirdLayer.appendGoogleMap({ptype:'m@207000000'});
     */
    appendGoogleMap(optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        this._isHistoryImage = Cesium.defaultValue(options.isHistoryImage, false);
        this._imageVersion = Cesium.defaultValue(options.imageVersion, '0');
        const offset = Cesium.defaultValue(options.Offset, false);
        let offsetLabel = '';
        if (offset) {
            offsetLabel = '&gl=cn';
        }
        let _url = `http://mt{s}.google.cn/vt/lyrs={type}&hl=zh-CN${offsetLabel}&x={x}&y={y}&z={z}&s=Galileo`;
        _url = _url.replace('{type}', options.ptype);
        const googleMap = this.viewer.imageryLayers.addImageryProvider(
            new Cesium.GoogleMapProvider({
                url: _url
            })
        );
        return googleMap;
    }

    /**
     * 添加google地图服务(扩展)：
     * @function module:客户端数据服务.ThirdPartyLayer.prototype.appendGoogleMapExt
     * @param {Object} optionsParam 参数
     * @param {Object} optionsParam.ptype {ptype:'s'} 类型
     * m：路线图
     * t：地形图
     * p：带标签的地形图
     * s：卫星图
     * y：带标签的卫星图
     * h：标签层（路名、地名等）
     * 也可以进行组合，例如：s,r 或者 t,h
     * @returns {ImageryLayer} 瓦片层对象 可用于操作移除
     * @example
     * let tilelayer = thirdLayer.appendGoogleMapExt({ptype:'s'});
     */
    appendGoogleMapExt(optionsParam) {
        const googleMap = this.viewer.imageryLayers.addImageryProvider(new Cesium.GoogleMapProvider(optionsParam));
        return googleMap;
    }

    /**
     * 添加高德地图服务
     * @function module:客户端数据服务.ThirdPartyLayer.prototype.appendGaodeMap
     * @param {Object} optionsParam 参数
     * @param {String} optionsParam.ptype 地图类型：'vec', 'road', 'img'
     * @param {Number} [optionsParam.maximumLevel = 16] 最大级别
     * @returns 瓦片层对象
     * @example
     * let tilelayer = thirdLayer.appendGaodeMap({ptype:'vec'});
     */
    appendGaodeMap(optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const maximumLevel = Cesium.defaultValue(options.maximumLevel, 16);
        const baseUrl = 'http://{s}.is.autonavi.com/appmaptile?&size=1&scale=1&x={x}&y={y}&z={z}';
        let url = baseUrl;
        switch (options.ptype) {
            case 'img':
                url = 'https://{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}';
                break;
            case 'road':
                url += '&scl=2&style=8&ltype=11';
                break;
            default:
                url += '&style=7';
                break;
        }
        const gaodeProvider = new Cesium.UrlTemplateImageryProvider({
            url,
            credit: new Cesium.Credit('高德地图服务'),
            subdomains: ['webst01', 'webst02', 'webst03', 'webst04'],
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
            maximumLevel
        });
        const gaodeLayer = this.viewer.imageryLayers.addImageryProvider(gaodeProvider);
        return gaodeLayer;
    }

    /**
     * 添加baidu地图服务:提供ptype='tile'和ptype='sate'、 'traffic'三种百度地图（瓦片和卫星、交通）
     * @function module:客户端数据服务.ThirdPartyLayer.prototype.appendBaiduMap
     * @param {Object} optionsParam 包含以下参数
     * @param {String} optionsParam.ptype 类型 ptype='tile'和 ptype='sate'以及'traffic'
     * @returns 瓦片层对象
     * @example
     * let tilelayer = thirdLayer.appendBaiduMap({ptype:'sate'});
     */
    appendBaiduMap(optionsParam) {
        const baiduProvider = this.viewer.imageryLayers.addImageryProvider(new Cesium.BaiduMapProvider(optionsParam));
        return baiduProvider;
    }

    /**
     * 添加OpenWeather服务:免费的天气预报云图
     * @function module:客户端数据服务.ThirdPartyLayer.prototype.appendOpenWeatherMap
     * @param {Object} optionsParam 参数
     * @param {Type} optionsParam.ptype 类型有: Pressure,Temperature,Windspeed,Clouds,Label
     * @param {String} optionsParam.appid 授权码
     * @returns {ImageryLayer} 瓦片层对象
     * @example
     * let tilelayer = thirdLayer.appendOpenWeatherMap({ptype:'Label',appid:'b1b15e88fa797225412429c150c122a1'});
     */
    appendOpenWeatherMap(optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        if (!Cesium.defined(options)) {
            return new Cesium.DeveloperError('必须指定url 或type ');
        }
        switch (options.ptype) {
            case 'Pressure':
                options.url = `https://h.maps.owm.io/map/pressure_new/{level}/{row}/{col}?appid=${options.appid}`;
                break;
            case 'Temperature':
                options.url = `https://h.maps.owm.io/map/temp_new/{level}/{row}/{col}?appid=${options.appid}`;
                break;
            case 'Windspeed':
                options.url = `https://h.maps.owm.io/map/wind_new/{level}/{row}/{col}?appid=${options.appid}`;
                break;
            case 'Clouds':
                options.url = `https://h.maps.owm.io/map/clouds_new/{level}/{row}/{col}?appid=${options.appid}`;
                break;
            case 'Label':
                options.url = 'http://c.basemaps.cartocdn.com/light_only_labels/{level}/{row}/{col}.png';
                break;
            default:
                break;
        }
        const openWeatherProvider = this.viewer.imageryLayers.addImageryProvider(new Cesium.OpenWeatherMapProvider(options));
        return openWeatherProvider;
    }

    /**
     * 添加天地图(经纬度)
     * @function module:客户端数据服务.ThirdPartyLayer.prototype.appendTDTuMap
     * @param {Object} optionsParam 包含以下参数
     * @param {String} optionsParam.ptype 地图类型 'vec'矢量 'img'影像 'ter'地形
     * @param {String} optionsParam.token 开发token （请到天地图官网申请自己的开发token，自带token仅做功能验证随时可能失效）
     * @returns {ImageryLayer} 瓦片层对象
     * @example
     * let options = {ptype:'vec',token:'tk'}
     * let tilelayer = thirdLayer.appendTDTuMap(options);
     */
    appendTDTuMap(optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        if (!Cesium.defined(options)) {
            return new Cesium.DeveloperError('必须指定url 或type ');
        }
        if (!Cesium.defined(options.token)) {
            Cesium.deprecationWarning('http://www.tianditu.gov.cn', '请到天地图官网自行申请开发token，自带token仅做功能验证随时可能失效');
        }
        const url = 'http://t0.tianditu.gov.cn/DataServer?';
        const row = '_c&X={x}&Y={y}&L={l}';
        switch (options.ptype) {
            case 'vec':
                options.url = `${url}T=vec${row}`;
                break;
            case 'img':
                options.url = `${url}T=img${row}`;
                break;
            case 'ter':
                options.url = `${url}T=ter${row}`;
                break;
            case 'cia':
                options.url = `${url}T=cia${row}`;
                break;
            case 'cva':
                options.url = `${url}T=cva${row}`;
                break;
            case 'eia':
                options.url = `${url}T=eia${row}`;
                break;
            case 'eva':
                options.url = `${url}T=eva${row}`;
                break;
            case 'ibo':
                options.url = `${url}T=ibo${row}`;
                break;
            case 'cta':
                options.url = `${url}T=cta${row}`;
                break;
            default:
                break;
        }
        const TDTuProvider = this.viewer.imageryLayers.addImageryProvider(new Cesium.TiandituMapProvider(options));
        return TDTuProvider;
    }

    /**
     * 通过wmts服务添加天地图
     * @function module:客户端数据服务.ThirdPartyLayer.prototype.appendTDTuMapByWMTS
     * @param {Object} optionsParam 包含以下参数
     * @param {String} optionsParam.ptype 地图类型 'img':影像 'ter':地形 'cta':注记
     * @param {String} optionsParam.token 天地图的token
     * @returns {ImageryLayer} 瓦片层对象
     * @example
     * let options = {ptype:'img'};
     * let tilelayer = thirdLayer.appendTDTuMapByWMTS(options);
     */
    appendTDTuMapByWMTS(optionsParam) {
        const options = Cesium.defaultValue(optionsParam, {});
        const token = Cesium.defaultValue(options.token, '9c157e9585486c02edf817d2ecbc7752');
        if (Cesium.defined(options.ptype)) {
            let url = `http://{s}.tianditu.gov.cn/{lw}/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer={layerType}&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset=w&format=tiles&tk=${token}`;
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
                case 'vec':
                    url = url.replace('{lw}', 'vec_w');
                    url = url.replace('{layerType}', 'vec');
                    break;
                case 'cva':
                    url = url.replace('{lw}', 'cva_w');
                    url = url.replace('{layerType}', 'cva');
                    break;
                case 'eia':
                    url = url.replace('{lw}', 'eia_w');
                    url = url.replace('{layerType}', 'eia');
                    break;
                case 'eva':
                    url = url.replace('{lw}', 'eva_w');
                    url = url.replace('{layerType}', 'eva');
                    break;
                case 'ibo':
                    url = url.replace('{lw}', 'ibo_w');
                    url = url.replace('{layerType}', 'ibo');
                    break;
                default:
                    break;
            }
            const tiandituTerwProvider = new Cesium.WebMapTileServiceImageryProvider({
                url,
                layer: options.ptype,
                style: 'default',
                format: 'tiles',
                tileMatrixSetID: 'w',
                credit: new Cesium.Credit('天地图'),
                subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
                maximumLevel: 18
            });
            const tiandituImage = this.viewer.imageryLayers.addImageryProvider(tiandituTerwProvider);
            return tiandituImage;
        }
        return null;
    }
}

CesiumZondy.Layer.ThirdPartyLayer = ThirdPartyLayer;
