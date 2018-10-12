//矢量+注记
var layer = L.tileLayer('http://t0.tianditu.com/DataServer?T=ter_c&x={x}&y={y}&l={z}', { tileSize: 256, layer: 'ter', noWrap: true });
//矢量图层
var layer1 = L.tileLayer('http://t0.tianditu.com/DataServer?T=vec_c&x={x}&y={y}&l={z}', { tileSize: 256, layer: 'vec', minZoom: 1, maxZoom: 15, noWrap: true });
//矢量注记图层
var layer2 = L.tileLayer('http://t0.tianditu.com/DataServer?T=cva_c&x={x}&y={y}&l={z}', { tileSize: 256, layer: 'cva', minZoom: 1, maxZoom: 15, noWrap: true });
//影像图层
var layer3 = L.tileLayer('http://t0.tianditu.com/DataServer?T=img_c&x={x}&y={y}&l={z}', { tileSize: 256, layer: 'img', minZoom: 1, maxZoom: 15, noWrap: true });
//影像注记
var layer4 = L.tileLayer('http://t0.tianditu.com/DataServer?T=cia_c&x={x}&y={y}&l={z}', { tileSize: 256, layer: 'cia', minZoom: 1, maxZoom: 15, noWrap: true });
//图层组
var LayerG = L.layerGroup([layer1, layer2]);
//添加图层组
LayerG.addTo(map);
var vec = {
   "矢量+注记": LayerG,
}
var img = {
   "矢量图层": layer,
   "影像图层": layer3,
   "影像注记": layer4
}
//图层控制显示控件
L.control.layers(vec, img).addTo(map);

