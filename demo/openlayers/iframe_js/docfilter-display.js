//创建地图容器并添加一些必要控件
map = new ol.Map({
    target: 'mapCon'
});
//创建一个矢量图层
layer = new Zondy.Map.MapDocTileLayer("vectorLayer", "WorldJWVector", {
    ip: "develop.smaryun.com",
    port: "6163",
    isBaseLayer: true,
    //过滤条件
    filters: "1:CNTRY_NAME='China'or CNTRY_NAME='Libya',2:ID=2400"
});
//添加图层
map.addLayer(layer);
//设置显示中心和级别
var View = new ol.View({
    center: [0, 0],
    zoom: 2,
    projection: 'EPSG:4326'
})
map.setView(View);