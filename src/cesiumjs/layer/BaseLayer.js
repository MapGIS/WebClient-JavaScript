import { CesiumZondy } from '../core/Base';

/**
 * @author 基础平台研发中心·冯桂英
 * @class BaseLayer
 * @category BaseLayer
 * @classdesc BaseLayer
 * @description 图层管理基类,实现图层公共方法
 * @param option.viewer = viewer 场景视图
 */
export default class BaseLayer {
    constructor(option) {
        this._viewer = Cesium.defaultValue(option.viewer, undefined);
    }

    /**
     *  当前椭球
     * @memberof BaseLayer.protype
     * @type {Ellipsoid}
     * @readonly
     *
     */
    get ellipsoid() {
        return this._viewer.scene.globe.ellipsoid;
    }

    /**
     * 视图
     * @memberof BaseLayer.prototype
     * @type {Viewer}
     * @readonly
     */
    get viewer() {
        return this._viewer;
    }

    /**
     * 场景 
     * @memberof BaseLayer.prototype
     * @type {Scene}
     * @readonly
     */
    get scene() {
        return this._viewer.scene;
    }

    /**
     * 定位到M3D图层对象
     * @param {Object} layer 图层对象
     */
    zoomToM3dLayer(layer) {
        let boundingSphere = layer.boundingSphere;
        this.viewer.camera.viewBoundingSphere(
            boundingSphere,
            new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius)
        );
        this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    }

    /***
     * 移除m3d 图层
     */
    removeM3dLayer(layer) {
        this.viewer.scene.primitives.remove(layer);
    }

    /**
     * 移除添加的所有m3d文档，layers为图层数组
     */
    removeDocs(layers) {
        if (!Cesium.defined(layers)) {
            return;
        }
        for (var i in layers) {
            this.viewer.scene.primitives.remove(layers[i]);
        }
        return;
    }

    /**
     * 添加全球网格信息
     * @returns 网格图层
     */
    addGridInfo() {
        if (undefined === this._tileGridLayer) {
            let tileGridLayer = new Cesium.TileCoordinatesImageryProvider({
                showLonlats: true
            });
            let imagelayers = this.viewer.imageryLayers;
            if (imagelayers !== null && imagelayers !== undefined) {
                if (!imagelayers.contains(tileGridLayer)) {
                    return imagelayers.addImageryProvider(tileGridLayer);
                }
            }
        }
    }

    /**
     * 移除全球网格信息
     * @param {Object} gridlayers 网格图层
     */
    removeGridInfo(gridlayers) {
        let imagelayers = this.viewer.imageryLayers;
        if (imagelayers !== null && imagelayers !== undefined) {
            if (imagelayers.contains(gridlayers)) {
                imagelayers.remove(gridlayers, true);
            }
        }
    }

    /**
     * 通用删除影像图层
     * @param  {imagelayer} google等图层,其为addImageryProvider返回的值
     * @param  {boolean}    isdestroy,是否销毁图层 在图层需要频繁切换的情况下，isdestroy最好取false
     * @example
     * let tilelayer = tile.appendGoogleMap({ptype:'m@207000000'});
     * tile.removeImageLayer(tilelayer, true);
     */
    removeImageLayer(imagelayer, isdestroy) {
        let imagelayers = this.viewer.imageryLayers;
        if (imagelayers !== null && imagelayers !== undefined) {
            if (imagelayers.contains(imagelayer)) {
                imagelayers.remove(imagelayer, isdestroy);
            }
        }
    }

    /**
     * 清空影像图层,包括地球表面
     * @param  {boolean}    isdestroy,是否销毁图层
     */
    removeAllImageLayers(isdestroy) {
        var imagelayers = this.viewer.imageryLayers;
        if (imagelayers !== null && imagelayers !== undefined) {
            imagelayers.removeAll(isdestroy);
        }
    }
}

CesiumZondy.Layer.BaseLayer = BaseLayer;
