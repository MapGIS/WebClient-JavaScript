/**
 * @author 基础平台-王魁帅
 * @description 针对不同比例尺来计算对应的瓦片错级
 */
export class TileScale {
    /**
     * key：瓦片尺寸  “256,512,1024”
     * val: 层级与分辨关系数组
     */
    levelScales = {};

    // 赤道周长（单位：m）
    static get ZERO_SCALE() {
        return 295829355.45 * 2;
    }

    /**
     * 通过瓦片大小获取层级与分辨关系的数组
     * @param {*} tileSize 瓦片尺寸，三维用的瓦片尺寸为512的levelResolution数组
     * @returns 层级与分辨关系的数组
     */
    getLevelScale(tileSize) {
        if (!this.levelScales[tileSize]) {
            const arr = [];
            for (let level = 0; level <= 24; level++) {
                const zero = TileScale.ZERO_SCALE;
                const resolutionOnTheEquator = zero / 2 ** level;
                arr.push({
                    level,
                    resolution: resolutionOnTheEquator
                });
            }
            this.levelScales[tileSize] = arr;
        }
        return this.levelScales[tileSize];
    }

    /**
     * 获取cesium层级与分辨率关系的数组
     * @returns 层级与分辨率关系的数组
     */
    getLevelScaleCesium() {
        return this.getLevelScale(512);
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
    getZoomOffsetByScale({ resolution, levelResolutions, levelValue }) {
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
            levelResolutions = this.getLevelScale(tileSize);
        } else {
            levelResolutions = this.getLevelScaleCesium();
        }
        let zoomOffset = this.getZoomOffsetByScale({
            resolution: lodBegin.resolution,
            levelResolutions: levelResolutions,
            levelValue: lodBegin.level
        });

        return zoomOffset;
    }
}
export default TileScale;
