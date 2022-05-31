import * as turf from "@turf/turf";

/**
 * @description 获取几何中心点
 * @param positions - {Array} 必选项，点数组
 * @return {Object} center 中心点
 */
function getCenter(positions) {
    let points = [];
    for (let i = 0; i < positions.length; i++) {
        points.push(turf.point([positions[i].x, positions[i].y]));
    }

    return turf.center(turf.featureCollection(points));
}

/**
 * @description 获取几何中心点
 * @param positions - {Array} 必选项，点数组
 * @return {Object} center 中心点
 */
function getCenterByCartesian(positions) {
    let points = [];
    for (let i = 0; i < positions.length; i++) {
        let cart = Cesium.Cartographic.fromCartesian(positions[i]);
        points.push(turf.point([Cesium.Math.toDegrees(cart.longitude), Cesium.Math.toDegrees(cart.latitude)]));
    }

    return turf.center(turf.featureCollection(points));
}

export {getCenter, getCenterByCartesian}