/**
* 创建点要素样式函数
* @param {ol.Feature} feature 点要素
*/
var createPointStyleFunction = function () {
    var radius = document.getElementById('points-size').value;
    var fillColor = document.getElementById('points-fill-color').value;
    var strokeColor = document.getElementById('points-stroke-color').value;
    var strokeWidth = document.getElementById('points-stroke-width').value;

    return function (feature, resolution) {
        var style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: radius,
                fill: new ol.style.Fill({ color: fillColor }),
                stroke: new ol.style.Stroke({ color: strokeColor, width: strokeWidth })
            }),
            text: createTextStyle(feature, myDom.points)
        });
        return [style];
    };
};
/**
* 创建线要素样式函数
* @param {ol.Feature} feature 线要素
*/
var createLineStyleFunction = function () {
    var strokeColor = document.getElementById('lines-stroke-color').value;
    var strokeWidth = document.getElementById('lines-stroke-width').value;
    return function (feature, resolution) {
        var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: strokeColor,
                width: strokeWidth
            }),
            text: createTextStyle(feature, myDom.lines)
        });
        return [style];
    };
};
/**
* 创建区要素样式函数
* @param {ol.Feature} feature 区要素
*/
var createPolygonStyleFunction = function () {
    var fillColor = document.getElementById('polygons-fill-color').value;
    var strokeColor = document.getElementById('polygons-stroke-color').value;
    var strokeWidth = document.getElementById('polygons-stroke-width').value;

    return function (feature, resolution) {
        var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: strokeColor,
                width: strokeWidth
            }),
            fill: new ol.style.Fill({
                color: fillColor
            }),
            text: createTextStyle(feature, myDom.polygons)
        });
        return [style];
};
};