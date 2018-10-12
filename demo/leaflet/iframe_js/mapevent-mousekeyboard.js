//加载瓦片图层数据（OSM）
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    noWrap: true
}).addTo(map);

/**地图单击事件
 *  @param {string} type 事件类型（地图单击）
 *  @param {function} fn 事件触发后的响应函数
 */
map.on('click', function (e) {
    //获取点击位置的坐标
    var coordinate = [e.latlng.lat, e.latlng.lng];
    //弹框提示点击位置的坐标
    alert("地图被单击了！点击位置为：" + coordinate);
})

/**键盘按下事件
 *  @param {string} type 事件类型（键盘按下）
 *  @param {function} fn 事件触发后的响应函数
 */
map.on('keypress', function (e) {
    //弹框提示输入的值
    alert("按下了键盘：" + e.originalEvent.code);
})
