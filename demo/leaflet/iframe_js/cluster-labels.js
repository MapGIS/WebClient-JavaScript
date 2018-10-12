/**将聚合的标注连线*/
function getRandomLatLng(map) {
//获取地图范围
var bounds = map.getBounds(),
//获取左下角坐标
southWest = bounds.getSouthWest(),
//获取右下角坐标
northEast = bounds.getNorthEast(),
//获取地图范围的长
lngSpan = northEast.lng - southWest.lng,
//获取地图范围的宽
latSpan = northEast.lat - southWest.lat;
return L.latLng(
//返回任意地图范围内的x坐标
southWest.lat + latSpan * Math.random(),
//返回任意地图范围内的y坐标
southWest.lng + lngSpan * Math.random());
}
var polygon;
/**鼠标移动到聚合标注上，将点绘制成多边形
*  @param {json对象} a 鼠标移动事件参数
*/
markers.on('clustermouseover', function (a) {
    if (polygon) {
        //移除绘制的多边形
        map.removeLayer(polygon);
    }
    //获取点集
    polygon = L.polygon(a.layer.getConvexHull());
    //添加多边形
    map.addLayer(polygon);
});

/**鼠标移出取消绘制多边形
*  @param {json对象} a 鼠标移动事件参数
*/
markers.on('clustermouseout', function (a) {
    if (polygon) {
        //移除多边形
        map.removeLayer(polygon);
        polygon = null;
    }
});