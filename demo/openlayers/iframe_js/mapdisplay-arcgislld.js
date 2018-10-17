//地图初始化函数
function init() {
//地图范围
var extent = [-180, -90, 180, 90];
//中心点
var center = [0, 0];
//瓦片大小
var tileSize = 256;
//最大级数
var maxZoom = 16;
//初始化图层对象
var layer1 = new Zondy.Map.ArcGISLayer({
layerType: Zondy.Enum.Map.ArcGISLayerType.ImageryWorld2D
});
var layer2 = new Zondy.Map.ArcGISLayer({
layerType: Zondy.Enum.Map.ArcGISLayerType.StreetMapWorld2D
});
var layer3 = new Zondy.Map.ArcGISLayer({
layerType: Zondy.Enum.Map.ArcGISLayerType.TopoUS2D
});
LayerArr = [layer1, layer2, layer3];
map = new ol.Map({
//添加图层
layers: [layer1],
//目标DIV
target: 'mapCon',
view: new ol.View({
    center: center,
    //投影坐标系
    projection: new ol.proj.Projection({
        units: ol.proj.Units.DEGREES,
        extent: extent
    }),
    maxZoom: maxZoom,
    minZoom: 0,
    zoom: 3
})
});

}

//图层切换函数
function changeLayer() {
var Layers = map.getLayers().getArray();
for (var i = 0; i < Layers.length; i++) {
//移除图层
map.removeLayer(Layers[i]);
}
var index = $("#LayerSelect").val() - 1;
//添加图层
map.addLayer(LayerArr[index]);
}