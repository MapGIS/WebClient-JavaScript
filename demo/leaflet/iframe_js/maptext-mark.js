//显示天地图地图
//矢量图层
var layer1 = L.tileLayer('http://t0.tianditu.com/DataServer?T=vec_c&x={x}&y={y}&l={z}', {
    tileSize: 256,
    layer: 'vec',
    minZoom: 1,
    maxZoom: 15,
    noWrap: true
});
//矢量注记图层
var layer2 = L.tileLayer('http://t0.tianditu.com/DataServer?T=cva_c&x={x}&y={y}&l={z}', {
    tileSize: 256,
    layer: 'cva',
    minZoom: 1,
    maxZoom: 15,
    noWrap: true
});
//图层组
var LayerG = L.layerGroup([layer1, layer2]);

LayerG.addTo(map);

var icon = L.icon({
    iconUrl: "../../img/leaflet/label/blueIcon.png",
    iconSize: [50, 50]
});
var Marker = L.marker([45, -90], {
    icon: icon,
    //是否允许鼠标拖动
    draggable: true,
    title: "标注"
}).addTo(map);