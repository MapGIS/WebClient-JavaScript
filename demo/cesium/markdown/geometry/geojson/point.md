### GeoJSON
------
> GeoJSON是一种对各种地理数据结构进行编码的格式。GeoJSON对象可以表示几何、特征或者特征集合。GeoJSON支持下面几何类型：`点`、`线`、`面`、`多点`、`多线`、`多面`和`几何集合`。GeoJSON里的特征包含一个`几何对象`和`其他属性`，特征集合表示一系列特征。

#### GeoJSON-Point
> 对类型"Point"来说，“coordinates"成员必须是一个单独的位置数组（即`一维数组`）。

标准数据格式：
```javascript
var Point = {
    "type": "Feature",
    "geometry": {
        "type": "Point", 
        "coordinates": [102.0, 0.5]},
    "properties": {
        "prop0": "value0"
    }
}
```

***注：*** 在leaflet中设置的坐标与真实的经纬度坐标位置需要调换,如：
```javascript
//真实的经纬度坐标
var GeoPoint = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [114.30656433105469,30.52323029223123]
        },
        "properties": {}
    };
//leaflet中引用该坐标时需要将经纬度位置调换
 var latlng = L.latLng(30.52323029223123,114.30656433105469);      
```





