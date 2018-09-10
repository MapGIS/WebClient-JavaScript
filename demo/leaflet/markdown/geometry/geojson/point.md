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

#### 点样式说明
> 在leaflet中对`点线面`样式的修改，引入函数的参数是不一样的，点的函数参数是`geoJsonPoint`，线和面的函数参数是`geoJsonFeature`,点的示例如下：

```javascript
L.geoJSON(data, {       //data为点数据
    pointToLayer: function(geoJsonPoint, latlng) {
                      return L.marker(latlng,{`options`});  //添加标记
                    //return L.circleMarker(latlng,{`options`});     //添加圆形标记
                  }
}).addTo(map);
```
##### `常用的marker options`
|   Option   |   Type   |   Default   |   Description   |
|:-----------|:--------:|:-----------:|:----------------|
|    icon    |   Icon   |      *      | 用于渲染标记的图标实例。有关如何自定义标记图标的详细信息，请参阅[Icon](http://leafletjs.com/reference-1.3.0.html#icon)文档。如果未指定，则使用L.Icon.Default(默认值)。|
| draggable  |Boolean|   false   | （`circleMarker`不支持拖动）实现标记是否可以通过鼠标/触摸拖动。|
| opacity  |   Number|  1.0  |   标记的透明度  |
|riseOnHover| Boolean| false|  如果设置为true，则将鼠标悬停在其他位置时，标记将显示在其他位置。|

> marker options的详细信息请参阅官方文档[Marker](http://leafletjs.com/reference-1.3.0.html#marker)。

##### `常用的circleMarker options`
|   Option   |   Type   |   Default   |   Description   |
|:-----------|:--------:|:-----------:|:----------------|
|    radius  |   Number  |      10    | （唯一自身选项）圆圈标记的半径（以像素为单位）|
| color  |String|  '#3388ff'  | 描边颜色|
|fillColor| String|  *  |填色。默认为color选项的值|
| stroke | Boolean |  true  |是否沿着路径描边，若将其设置为false可禁用多边形或圆形上的边框。 |
|weight| Number|  3 | 描边宽度（以像素为单位） |
|opacity|Number |1.0 |  描边透明度 |
|interactive| Boolean| true|如果设置为false，图层将不会发出鼠标事件，并将作为底层地图的一部分。|

> circleMarker options的详细信息请参阅官方文档[circleMarker](http://leafletjs.com/reference-1.3.0.html#circlemarker)。

##### 提交BUG
> 找到bug请提交，我们会及时解决[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)。






