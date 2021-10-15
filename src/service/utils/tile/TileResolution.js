/**
 * @author 基础平台-龚瑞强
 * @description 针对不同分辨率来计算对应的瓦片错级
 */
export class TileResolution {
    constructor() {
        /**
         * key：瓦片尺寸  “256,512,1024”
         * val: 层级与分辨关系数组
         */
        this.levelResolutionToTileSizes = {};
    }

    // 赤道周长（单位：m）
    static get EQUATOR_PERIMTER() {
        return 6378137;
    }

    /**
     * 通过瓦片大小获取层级与分辨关系的数组
     * @param {*} tileSize 瓦片尺寸，三维用的瓦片尺寸为512的levelResolution数组
     * @returns 层级与分辨关系的数组
     */
    getLevelResolutionByTileSize(tileSize) {
        if (!this.levelResolutionToTileSizes[tileSize]) {
            const arr = [];
            for (let level = 0; level <= 24; level++) {
                const r = TileResolution.EQUATOR_PERIMTER; // 赤道半径
                const resolutionOnTheEquator = 360 / (tileSize * 2 ** level);
                arr.push({
                    level,
                    resolution: resolutionOnTheEquator
                });
            }
            this.levelResolutionToTileSizes[tileSize] = arr;
        }
        return this.levelResolutionToTileSizes[tileSize];
    }

    /**
     * 获取cesium层级与分辨率关系的数组
     * @returns 层级与分辨率关系的数组
     */
    getLevelResolutionCesium() {
        return this.getLevelResolutionByTileSize(512);
    }

    /**
     * 通过分辨率获取其在地图里面对应的层级
     * @param {number} resolution 当前层级分辨率
     * @param {Array<Record<string,number>>} levelResolutions 地图的层级与最大分辨率的对应关系
     * @returns 当前分辨对应地图里面的层级
     */
    getNearLevel(resolution, levelResolutions) {
        const levelResolutionsTemp = JSON.parse(JSON.stringify(levelResolutions));
        const nearlevel = levelResolutionsTemp.sort(function (a, b) {
            return Math.abs(a.resolution - resolution) - Math.abs(b.resolution - resolution);
        })[0].level;
        return nearlevel;
    }

    /**
     * 通过分辨率来计算偏移量
     * @param {number} resolution 当前层级分辨率
     * @param {Array<Record<string,number>>} levelResolutions 当前层级与分辨率关系数组
     * @param {number} levelValue 初始层级
     * @returns 偏移量
     */
    getZoomOffsetByResolution({ resolution, levelResolutions, levelValue }) {
        // 获取当前分辨率对应cesium里面的层级，计算偏移量
        const level = this.getNearLevel(resolution, levelResolutions);
        const zoomOffset = levelValue - level;

        return zoomOffset;
    }

    /**
     * 通过瓦片信息来计算偏移量
     * @param {number} tileInfo 瓦片信息
     * @param {boolean} isCesium 如果是三维图层，则不需要通过size去计算层级与瓦片的数组
     * @returns 偏移量
     */
    getZoomOffsetByTileInfo(tileInfo, isCesium = false, tileSize = 256) {
        let levelResolutions = [];
        const lodBegin = tileInfo.lods[0];
        if (!isCesium) {
            tileSize = tileSize || 256;
            if (tileInfo.size && tileInfo.size.length > 0) {
                tileSize = tileInfo.size[0];
            }
            levelResolutions = this.getLevelResolutionByTileSize(tileSize);
        } else {
            levelResolutions = this.getLevelResolutionCesium();
        }
        let zoomOffset = this.getZoomOffsetByResolution({
            resolution: lodBegin.resolution,
            levelResolutions: levelResolutions,
            levelValue: lodBegin.level
        });

        return zoomOffset;
    }
}
export default TileResolution;
