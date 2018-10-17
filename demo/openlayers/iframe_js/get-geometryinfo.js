//实例化一个矢量图层Vector作为绘制层
var source = new ol.source.Vector({ wrapX: false });
var vector = new ol.layer.Vector({
source: source,
style: new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2
    }),
    image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
            color: '#ffcc33'
        })
    })
})
});
//将绘制层添加到地图容器中
map.addLayer(vector);

//根据绘制类型进行交互绘制图形处理
function addInteraction() {
//绘制类型
var value = typeSelect.value;
if (value !== 'None') {
    if (source == null) {
        source = new ol.source.Vector({ wrapX: false });
        //添加绘制层数据源
        vector.setSource(source);
    }
    var geometryFunction, maxPoints;
    if (value === 'Square') {
        value = 'Circle';
        //正方形图形（圆）
        geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
    } else if (value === 'Box') {
        value = 'LineString';
        maxPoints = 2;
        geometryFunction = function (coordinates, geometry) {
            if (!geometry) {
                //多边形
                geometry = new ol.geom.Polygon(null);
            }
            var start = coordinates[0];
            var end = coordinates[1];
            geometry.setCoordinates([
                [start, [start[0], end[1]], end, [end[0], start[1]], start]
            ]);
            return geometry;
        };
    }
    //实例化交互绘制类对象并添加到地图容器中
    draw = new ol.interaction.Draw({
        //绘制层数据源
        source: source,
        /** @type {ol.geom.GeometryType} */
        //几何图形类型
        type: (value),
        //几何信息变更时调用函数
        geometryFunction: geometryFunction,
        //最大点数
        maxPoints: maxPoints
    });
    draw.on('drawend', function (e) {
        switch (typeSelect.value) {
            case 'Circle':
                var center = e.feature.getGeometry().getCenter();
                var radius = e.feature.getGeometry().getRadius();
                $("#result").text("");
                $("#result").append("圆心坐标：" + center + "</br></br>圆半径为：" + radius);
                break;
            case 'Point':
                var coordinates_Point = e.feature.getGeometry().getCoordinates();
                $("#result").text("");
                $("#result").append(coordinates_Point + "</br>");
                break;
            case 'LineString':
                var coordinates_Line = e.feature.getGeometry().getCoordinates();
                $("#result").text("");
                for (var i = 0; i < coordinates_Line.length; i++) {
                    $("#result").append(coordinates_Line[i] + "</br>");
                }
                break;
            default:
                var coordinates_Polygon = e.feature.getGeometry().getCoordinates();
                $("#result").text("");
                for (var i = 0; i < coordinates_Polygon[0].length; i++) {

                    $("#result").append(coordinates_Polygon[0][i] + "</br>");
                }
        }
    });
    map.addInteraction(draw);
} else {
    source = null;
    //清空绘制图形
    vector.setSource(source);
}
}

/**
* 用户更改绘制类型触发的事件.
* @param {Event} e 更改事件
*/
typeSelect.onchange = function (e) {
//移除绘制图形
map.removeInteraction(draw);
//添加交互绘制功能控件
addInteraction();
};
//添加交互绘制功能控件
addInteraction();