import { CesiumZondy } from '../core/Base';

/**
 * 描述图层类型.
 *
 * @author 基础平台研发中心·冯桂英
 * @enum {Number}
 *
 * @see Layer#type
 */
const LayerType = {
    /**
     * 未知类型.
     *
     * @type {Number}
     * @constant
     */
    UNKNOWN: 0,

    /**
     * 简单要素类矢量层.
     *
     * @type {Number}
     * @constant
     */
    VECTORLAYER: 1,

    /**
     * 简单要素类模型层.
     *
     * @type {Number}
     * @constant
     */
    MODELLAYER: 2,

    /**
     * 地形层.
     *
     * @type {Number}
     * @constant
     */
    TERRAINLAYER: 3,

    /**
     * 瓦片层.
     *
     * @type {Number}
     * @constant
     */
    TILEIMAGELAYER: 8,

    /**
     * m3d模型层.
     *
     * @type {Number}
     * @constant
     */
    M3DLAYER: 10
};

export default Object.freeze(LayerType);

CesiumZondy.LayerType = LayerType;
