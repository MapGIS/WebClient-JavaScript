### 中心点提取 Center

> 计算给定GeoJSON的数据中心支持所有的GeoJSON类型

---
#### 提交BUG
> 找到bug请提交[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)

---

#### 参数

|参数	|类型	|描述|
|:---|---|:---|
|geojson	|GeoJSON格式|	输入Geojson,用于计算中心点|
|properties	|Object	|使用geojson中的properties字段|

> FeatureCollection<`Point`>指得是GeoJSON格式的要素集合,因此请重点复习`GeoJSON专题`.`GeoJSON.parse`方法在后面的场景中将会反复出现,请熟练掌握其用法

---
#### 返回值

> - Feature <`Point`> - GeoJSON的中心点

---
#### 示例
``` javascript

var polygon = turf.polygon([[[-81, 41], [-88, 36], [-84, 31], [-80, 33], [-77, 39], [-81, 41]]]);
var centroid = turf.centroid(polygon);


//----------建议使用下面的标准的geojson格式-----------
var FeatureCollection = {
    "type":"FeatureCollection",
    "features":[GeoPoint1, GeoPoint2, ... GeoPoint100]
};
var GeoPoint = {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [114.289398,30.59418]
    },
    "properties": {
        "name": "点",
    }
};
var buffered = turf.centroid(FeatureCollection);
```
