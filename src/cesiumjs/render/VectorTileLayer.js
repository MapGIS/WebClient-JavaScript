import { CesiumZondy } from '../core/Base';

import { getLayers, getFonts, getVectorTileSource, getSpritePng } from './vectortile/MapgisVectorTileLayer';
import VectorTileProvider from './vectortile/VectorTileProvider';
import VectorTileStyle from './vectortile/MapgisVectorTileStyle';
import axios from 'axios';

/**
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class module:客户端渲染.VectorTileLayer
 * @classdesc  基于Mapbox的矢量瓦片进行绘制渲染.
 * @description CesiumZondy.zondy.VectorTileLayer, 前端实时绘制矢量瓦片
 * @param viewer - {Object} 传入的cesium的地图viewer
 * @param option - {Object} 属性键值对，地图属性字段。
 * @param {String} [option.ip = localhost] 地图服务ip
 * @param {String} [option.port = 6163] 地图服务port
 * @param {String} [option.layerName] 地图名
 * @param {String} option.style 样式json文件路径或者MVT-JSON对象，当为url时等于styleUrl；当为vectortilejson等于vectortilejson
 * @param {String} [option.styleUrl] 样式json文件路径,有styleUrl就可以直接读取styleUrl里的信息;不然就是加载中地发布的矢量瓦片，使用ip，port和layerName先拼接styleUrl路径再进行查询。
 * @param {String} [option.vectortilejson] 矢量瓦片json对象,直接取json对象，不需要再去请求。
 * @param {Cesium.TilingScheme} [option.tilingScheme] 矢量瓦片瓦片切分规则：经纬度还是墨卡托
 * @param {String} [option.token] 第三方需要的token，比如mapbox
 * @param {String} [option.show=true] 是否可见
 * @example 
 * vectortileLayer = new CesiumZondy.Overlayer.VectorTileLayer(
        webGlobe.viewer,
        {
            style:"http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/styles/街道-墨卡托.json",
            token: "",
            show: true,
        }
    );
 */
export class VectorTileLayer {
    constructor(viewer, options) {
        this.viewer = viewer;
        this.scene = this.viewer.scene;

        this.url = options.styleUrl;
        if (!this.url && options.ip) {
            this.url = 'http://' + options.ip + ':' + options.port + '/igs/rest/mrcs/vtiles/0/' + options.layerName;
        }

        this.options = options;
        this.token = options.token || '';
        this.opacity = options.opacity || 1;
        this.vectortilejson = options.vectortilejson;
        this.threadId = options.threadId || Math.random() * 10000;
        this.show = options.show;
        this.style = options.style;
        this.tilingScheme = options.tilingScheme;
        this.provider = null;

        this.initDevicePixelRatio();
        //this.bindEvent();
        if (this.style) {
            if (this.style.indexOf('http') >= 0) {
                //如果是个网络地址，就通过url请求获取矢量瓦片json对象
                this.requestVectortileJson();
            } else {
                this.requestStyleData();
            }
        } else {
            if (!this.vectortilejson) {
                //如果没有矢量瓦片json对象，就通过url请求获取矢量瓦片json对象
                this.requestVectortileJson();
            } else {
                this.requestStyleData();
            }
        }
    }

    initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    }

    bindEvent() {
        var viewer = this.viewer;
        //下面几个是cesium专属事件,clickEvent和mousemoveEvent是mapv内部自带的方法不放出来
        this.innerMoveStart = this.moveStartEvent.bind(this);
        this.innerMoveEnd = this.moveEndEvent.bind(this);

        this.innnerZoomStart = this.zoomStartEvent.bind(this);
        this.innnerZoomEnd = this.zoomEndEvent.bind(this);
    }

    /**
     * 通过url获取矢量瓦片json对象
     */
    requestVectortileJson() {
        if (!this.vectortilejson) {
            axios.get(this.url).then(
                function (res) {
                    this.vectortilejson = res.data;
                    this.requestStyleData(this.vectortilejson);
                }.bind(this)
            );
        }
    }

    /**
     * 通过矢量瓦片json对象，获取样式参数
     * @function module:客户端渲染.VectorTileLayer.prototype.requestStyleData
     * @param {Object} vectortilejson 矢量瓦片对象 Mapbox-Style-Spec样式对象
     * @see https://docs.mapbox.com/mapbox-gl-js/style-spec/
     */
    requestStyleData(vectortilejson) {
        var layers = getLayers(vectortilejson);
        var sources = getVectorTileSource(vectortilejson);
        var spritepng = getSpritePng(vectortilejson);
        axios.get(vectortilejson.sprite + '.json').then(
            function (result) {
                let spritedata = result.data;
                this.styleData = {
                    vectortilejson: vectortilejson,
                    layers: layers,
                    spritedata: spritedata,
                    spritepng: spritepng,
                    fonts: getFonts,
                    sources: sources
                };
                this.addLayer(this.styleData);
            }.bind(this)
        );
    }

    /**
     * 首先构造矢量瓦片样式，再添加图层
     * @function module:客户端渲染.VectorTileLayer.prototype.addLayer
     * @param {Object} styleData 矢量瓦片样式参数 Mapbox-Style-Spec样式对象
     * @see https://docs.mapbox.com/mapbox-gl-js/style-spec/
     */
    addLayer(styleData) {
        var vectortileStyle = VectorTileStyle(
            styleData.vectortilejson,
            Object.keys(styleData.vectortilejson.sources),
            null,
            styleData.spritedata,
            styleData.spritepng,
            styleData.fonts
        );

        if (styleData.sources.length > 0) {
            var source = styleData.sources[0];
            let vectortile = VectorTileProvider(Cesium, {
                key: this.token,
                url: source.tiles[0],
                style: vectortileStyle,
                opacity: this.opacity,
                threadId: this.threadId,
                show: this.show,
                tilingScheme: this.tilingScheme
            });
            this.provider = this.viewer.imageryLayers.addImageryProvider(vectortile);
            this.provider.show = this.show;
        }
    }

    /**
     * 通过修改图层样式，更新图层
     * @function module:客户端渲染.VectorTileLayer.prototype.updateLayer
     * @param {Array} layersStyle 所有图层的样式参数 Array<Mapbox-Style-Spec-Layers>
     */
    updateLayer(layersStyle) {
        if (!this.styleData || !this.styleData.vectortilejson || !this.styleData.vectortilejson.layers) {
            return;
        }
        this.remove();
        this.styleData.vectortilejson.layers = layersStyle;
        var layers = [];
        for (var i = 0; i < layersStyle.length; i++) {
            layers.push(layersStyle[i].id);
        }
        this.styleData.layers = layers;
        this.addLayer(this.styleData);
    }

    /**
     * 获取所有图层的样式
     * @function module:客户端渲染.VectorTileLayer.prototype.getLayersStyle
     * @returns {*} 获取满足MVT样式的图层信息
     */
    getLayersStyle() {
        if (!this.styleData || !this.styleData.vectortilejson || !this.styleData.vectortilejson.layers) {
            return;
        }
        return this.styleData.vectortilejson.layers;
    }

    unbindEvent() {}

    moveStartEvent() {}

    moveEndEvent() {}

    zoomStartEvent() {}

    zoomEndEvent() {}

    /**
     * 销毁图层-实际调用remove，为了接口保持一致
     * @function module:客户端渲染.VectorTileLayer.prototype.destroy
     */
    destroy() {
        this.remove();
    }

    /**
     * 设置图层的可见性
     * @param visible
     */
    setVisible(visible) {
        if (this.provider) {
            this.provider.show = visible;
        }
    }

    /**
     * 移除图层
     * @function module:客户端渲染.VectorTileLayer.prototype.remove
     */
    remove() {
        let self = this;
        window.setTimeout(() => {
            if (self.provider) {
                self.viewer.imageryLayers.remove(self.provider, true);
                self.provider.show = false;
            }
        }, 1000);
    }
}

CesiumZondy.Overlayer.VectorTileLayer = VectorTileLayer;
