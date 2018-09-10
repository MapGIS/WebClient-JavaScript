## Using GeoJSON with Leaflet
在这个教程中，你将学会如何使用GeoJSON创建一个矢量图层，并与该图层进行交互。

#### 一、在leaflet上设定地图视角

> 在leaflet上设定地图视角的时候，经纬度位置需要***取反***，但是在Geojson数据中则不需要。
       
**示例**
真实的地理坐标为:[114.28939819335936,30.594183452544694]

```javascript
 var mymap = L.map('mapid').setView([30.594183452544694,114.28939819335936], 10);
```

#### 二、Geojson数据格式：
##### 点

```javascript
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};
```
##### 线

```javascript
var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];
```
##### 面

```javascript
var states = [{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}];
```

#### 三、在leaflet上的顺逆方向
**注:**
在绘制polygon时，若需要在面中挖出一块另一块面，则需要在绘制的时候按照***顺逆方向***进行，即外圈按顺时针绘制，内圈按逆时针绘制。

> 示例代码

```javascript
 var Geo_polygon = [{
        "type": "Feature",
        "properties": {"party": "Republican"},
        "geometry": {
            "type": "Polygon",
            "coordinates": [[[35, 10], [45, 45], [15, 40], [10, 20], [35, 10]],  //此处需用逗号分开
             [[20, 30], [35, 35], [30, 20], [20, 30]]]}}];
```





