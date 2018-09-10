## Non-geographical maps
这个教程主要是使用L.CRS.Simple，告诉你在没有经纬度的概念下如何构建地图。

#### CRS.Simple
Leaflet地图只有一个坐标系，在创建地图的时候可以改变它。我们在游戏地图中将使用CRS.Simple，它代表一个方形网格：

```javascript
var map = L.map('map', {
    crs: L.CRS.Simple
});
```
使用`L.ImageOverlay`增加游戏星系图，并设置它的大致的边界：
```javascript
var bounds = [[0,0], [1000,1000]];
var image = L.imageOverlay('uqm_map_full.png', bounds).addTo(map);
map.fitBounds(bounds); //显示整个地图
```

#### 内部预定义的CRS

|   CRS   |   Description   |
|:-------:|:----------------|
|L.CRS.EPSG3395|一些商业地图供应商很少使用。使用椭圆形墨卡托投影。|
|L.CRS.EPSG3857|球形墨卡托投影。用于在线地图的最常见的CRS，几乎当前所有的免费和商业地图供应商都使用。 是地图crs option 中的默认值。|
|L.CRS.EPSG4326|WGS84坐标系。使用简单的等角投影。符合EPSG：4326标准的坐标系。 如果您正在使用TileLayer此CRS，请确保在缩放级别为零时覆盖整个地球的两个256x256像素图块， 并且图块坐标原点为（-180，+ 90）或（-180，-90），TileLayers的的the tms option 设置。|
|L.CRS.Earth|作为其他全球性的CRS的基础，使其覆盖地球。 只能用作其他CRS的基础，不能直接使用，因为它没有code，projection或transformation。distance()返回数值（米）。|
|L.CRS.Simple|一个简单的CRS，将经度和纬度映射到x和y直接。 可用于平面地图（如游戏地图）。请注意，y 轴应该是反转的（从底部到顶部）。distance()返回简单的欧几里德距离。|
