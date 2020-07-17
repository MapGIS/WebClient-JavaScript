import { CesiumZondy } from '../core/Base';

/**
 * @author 基础平台研发中心·冯桂英
 * @class BaseLayer
 * @category BaseLayer
 * @classdesc BaseLayer 数据服务基类
 * @description 图层管理基类,实现图层公共方法
 * @param option.viewer 场景视图
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
        const { boundingSphere } = layer;
        this.viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius));
        this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    }

    /**
     * 移除m3d 图层
     */
    removeM3dLayer(layer) {
        this.viewer.scene.primitives.remove(layer);
    }

    /**
     * 移除添加的文档
     */
    removeDocs(layers) {
        if (!Cesium.defined(layers)) {
            return;
        }
        for (let i = 0; i < layers.length; i += 1) {
            this.viewer.scene.primitives.remove(layers[i]);
        }
    }

    /**
     * 通用添加影像图层
     * @param {Imagelayer} google等图层
     * @returns {Imagelayer} 返回瓦片层
     */
    addImageLayer(imagelayer) {
        const imagelayers = this.viewer.imageryLayers;
        if (imagelayers !== null && imagelayers !== undefined) {
            if (!imagelayers.contains(imagelayer)) {
                return imagelayers.addImageryProvider(imagelayer);
            }
        }
        return undefined;
    }

    /**
     * 添加全球网格信息
     * @returns {ImageryLayer} 网格图层
     */
    addGridInfo() {
        if (undefined === this._tileGridLayer) {
            const tileGridLayer = new Cesium.TileCoordinatesImageryProvider({
                showLonlats: true
            });
            const imagelayers = this.viewer.imageryLayers;
            if (imagelayers !== null && imagelayers !== undefined) {
                if (!imagelayers.contains(tileGridLayer)) {
                    return imagelayers.addImageryProvider(tileGridLayer);
                }
            }
        }
        return undefined;
    }

    /**
     * 移除全球网格信息
     * @param {ImageryLayer} gridlayers 网格图层
     */
    removeGridInfo(gridlayers) {
        const imagelayers = this.viewer.imageryLayers;
        if (imagelayers !== null && imagelayers !== undefined) {
            if (imagelayers.contains(gridlayers)) {
                imagelayers.remove(gridlayers, true);
            }
        }
    }

    /**
     * 通用删除影像图层
     * @param {Imagelayer} google等图层其为addImageryProvider返回的值
     * @param {Boolean} isdestroy 是否销毁图层 在图层需要频繁切换的情况下，isdestroy最好取false
     * @example
     * let tilelayer = tile.appendGoogleMap({ptype:'m@207000000'});
     * tile.removeImageLayer(tilelayer, true);
     */
    removeImageLayer(imagelayer, isdestroy) {
        const imagelayers = this.viewer.imageryLayers;
        if (imagelayers !== null && imagelayers !== undefined) {
            if (imagelayers.contains(imagelayer)) {
                imagelayers.remove(imagelayer, isdestroy);
            }
        }
    }

    /**
     * 清空影像图层,包括地球表面
     * @param {Boolean} isdestroy 是否销毁图层
     */
    removeAllImageLayers(isdestroy) {
        const imagelayers = this.viewer.imageryLayers;
        if (imagelayers !== null && imagelayers !== undefined) {
            imagelayers.removeAll(isdestroy);
        }
    }

    /**
     * 移除实体
     * @param  {Entity} entity 实体对象
     */
    removeEntity(entity) {
        this.viewer.entities.remove(entity);
    }

    /**
     * 移除所有实体
     */
    removeAllEntities() {
        this.viewer.entities.removeAll();
    }

    /**
     * 移除primitive实体
     * @param {Primitive} 移除对象
     */
    removePrimitive(primitive) {
        this.scene.primitives.remove(primitive);
    }

    /**
     * 移除全部实体
     */
    removeAllPrimitives() {
        this.scene.primitives.removeAll();
    }

    /**
     * 移除地形图层
     */
    removeTerrain() {
        const ElliProvider = new Cesium.EllipsoidTerrainProvider();
        this.viewer.terrainProvider = ElliProvider;
    }
}

CesiumZondy.Layer.BaseLayer = BaseLayer;
