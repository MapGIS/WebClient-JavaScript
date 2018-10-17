var styleFunction = function (feature, resolution) {
        //根据要素类型设置几何要素的样式
        return styles[feature.getGeometry().getType()];
    };

//实例化Map对象加载地图
var map = new ol.Map({
//地图容器div的ID
target: 'mapCon',
//地图容器中加载的图层
layers: [
    //加载瓦片图层数据
    new ol.layer.Tile({
        //加载OpenStreetMap在线瓦片服务数据
        source: new ol.source.OSM()
    })
],
//地图视图设置
view: new ol.View({
    //设置地图投影坐标系
    projection: projection,
    //地图初始中心点
    center: [0, 0],
    //地图初始显示级别
    zoom: 2
})
});

/**
* 将矢量几何要素显示到地图中
* @param {String} type 数据类型
* @param {String} data 数据的url地址
*/
function loadVectData() {
if (vectorLayer != null || vectorLayer == "undefined") {
    //移除已有矢量图层
    map.removeLayer(vectorLayer);
}
//实例化矢量数据源，用KML格式的类解析
var vectorSource = new ol.source.Vector({
    url: '../../data/third/2012-02-10.kml',
    format: new ol.format.KML({
        extractStyles: false
    })
});
vectorLayer = new ol.layer.Vector({
    //矢量数据源
    source: vectorSource,
    //样式设置
    style: styleFunction
});
//将矢量图层加载到地图中
map.addLayer(vectorLayer);
//获取地图视图
var view = map.getView();
//平移地图

view.setCenter([876970.8463461736, 5859807.853963373]);
//地图缩放
view.setZoom(10);