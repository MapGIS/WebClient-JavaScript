/**改变矢量图层的z-index*/
function changeVectorLayerIndex() {
//获取矢量图层的number标签
var vecInput = document.getElementById('vecLayer');
//设置图层的ZIndex，上层的ZIndex值比下层的要大
vectorLayer.setZIndex(parseInt(vecInput.value, 10));
}

/**改变影像图层的z-index*/
function changeImageLayerIndex() {
//获取影像图层的number标签
var imgInput = document.getElementById('imgLayer');
//设置图层的ZIndex，上层的ZIndex值比下层的要大
imageLayer.setZIndex(parseInt(imgInput.value, 10));
}
