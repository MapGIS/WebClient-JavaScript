/**平移地图*/
function mapMove() {
//获取文本框中输入的X坐标和Y坐标
var X = document.getElementById("Xposition").value;
var Y = document.getElementById("Yposition").value;
//判断坐标值是否输入
if (X != "" && Y != "") {
    if (!isNaN(X) && !isNaN(Y)) {
        //字符串转数字
        var pntX = parseInt(X);
        var pntY = parseInt(Y);
    } else {
        alert('请输入数字！');
        return;
    }
} else {
    alert('请输入内容！');
    return;
}
//注意leaflet是用纬经度来表示位置
var coordinate = [pntY, pntX];
//平移视图位置，并设置显示级数
map.setView(coordinate, map.getZoom());
}

/**复位地图*/
function restore() {
  //将地图恢复至初始位置状态
  map.setView([0, 0], 4);
}
