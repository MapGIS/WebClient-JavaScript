import { CesiumZondy } from '../core/Base';

/**
 * @author 基础平台研发中心·冯桂英
 * @class BaseLayer
 * @category BaseLayer
 * @classdesc BaseLayer
 * @description 图层管理基类,实现图层公共方法
 * @param option.viewer = viewer 视图
 */
export default class BaseLayer {
    constructor(option) {
        this._viewer = Cesium.defaultValue(option.viewer, undefined);
    }

    get viewer() {
        return this._viewer;
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
        debugger;
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
        debugger;
        let imagelayers = this.viewer.imageryLayers;
        if (imagelayers !== null && imagelayers !== undefined) {
            if (imagelayers.contains(gridlayers)) {
                imagelayers.remove(gridlayers, true);
            }
        }
    }
}

CesiumZondy.Layer.BaseLayer = BaseLayer;
