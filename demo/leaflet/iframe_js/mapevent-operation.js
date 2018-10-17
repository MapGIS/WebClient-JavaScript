//添加天地图矢量图层
var vectorMap = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
    maxZoom: 16,
    minZoom: 0
});
//添加天地图矢量注记
var vectorAnnotion = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
    maxZoom: 16,
    minZoom: 0
});
//添加天地图影像图层
var imageMap = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
    maxZoom: 16,
    minZoom: 0
});
//添加天地图影像注记
var imageAnnotion = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
    maxZoom: 16,
    minZoom: 0
});
//设置图层组
var vector = L.layerGroup([vectorMap, vectorAnnotion]);
var image = L.layerGroup([imageMap, imageAnnotion]);
var baseLayers = {
    "地图": vector,
    "影像": image
}
//初始时加载矢量图层组
map.addLayer(vector);
//添加图层组控件
L.control.layers(baseLayers).addTo(map);

/**注册基图层改变事件，通过layers控件来触发
 *  @param {string} type 事件类型（底图改变）
 *  @param {function} fn 事件触发后的响应函数
 */
map.on('baselayerchange', function (e) {
    //弹框提示
    alert("基图层改变了！");
})
