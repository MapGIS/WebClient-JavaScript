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

/**
 * @description 二三维联动时，向扩展图层里面添加标绘图元
 * @param {Object} linkTool 二三维联动工具
 * @param {Object} plot 要添加的图元
 */
function addExtendLayersPlot(linkTool, plot) {
    if(!linkTool) return;
    const {_extendLayers, _isLinked} = linkTool;
    if (_isLinked) {
        for (let i = 0; i < _extendLayers.length; i++) {
            if (_extendLayers[i].addPrimitiveBy2DPlotObj) {
                _extendLayers[i].addPrimitiveBy2DPlotObj(plot);
            } else if (_extendLayers[i].addPlotObjectBy3DPlotObj) {
                _extendLayers[i].addPlotObjectBy3DPlotObj(plot);
            }
        }
    }
}

/**
 * @description 二三维联动时，向扩展图层里面删除标绘图元
 * @param {Object} linkTool 二三维联动工具
 * @param {Object} plot 要删除的图元
 */
function removeExtendLayersPlot(linkTool, plot) {
    if(!linkTool) return;
    const {_extendLayers, _isLinked} = linkTool;
    if (_isLinked) {
        for (let i = 0; i < _extendLayers.length; i++) {
            if (_extendLayers[i].addPrimitiveBy2DPlotObj) {
                _extendLayers[i].remove(plot);
            } else if (_extendLayers[i].addPlotObjectBy3DPlotObj) {
                _extendLayers[i].removePlot(plot);
            }
        }
    }
}

export {getCenter, getCenterByCartesian, addExtendLayersPlot, removeExtendLayersPlot}