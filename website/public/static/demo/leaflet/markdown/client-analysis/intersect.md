### 求多边形的相交部分

> 两个多边形求取交集。 如果他们共享边界，则返回边界; 如果它们不相交，则返回undefined。

---
#### 提交BUG
> 找到bug请提交[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)

---

#### 参数
|参数  |类型   |描述|
|:---|---|:---|
|poly1  |FeatureCollection(`Polygon`)  |输入数据，用于生成第一个多边形|
|poly2  |FeatureCollection(`Polygon`)  |输入数据，用于生成第二个多边形|

---
#### 返回值

> - FeatureCollection<`Polygon`>  当共享点或线时，`返回geojson相交区要素集`.
> - null   当没有共享点时，`则返回空值`.

---
#### 示例
``` javascript
var poly1 = turf.polygon([[
  [-122.801742, 45.48565],
  [-122.801742, 45.60491],
  [-122.584762, 45.60491],
  [-122.584762, 45.48565],
  [-122.801742, 45.48565]
]]);
var poly2 = turf.polygon([[
  [-122.520217, 45.535693],
  [-122.64038, 45.553967],
  [-122.720031, 45.526554],
  [-122.669906, 45.507309],
  [-122.723464, 45.446643],
  [-122.532577, 45.408574],
  [-122.487258, 45.477466],
  [-122.520217, 45.535693]
]]);
var intersection = turf.intersect(poly1, poly2);
//----------建议使用下面的标准的geojson格式-----------
var FeatureCollection={
    "type":"Feature",
     "geometry":{
         "type":"Polygon" ,
         "coordinates":[114.289398,30.59418]
     },
        "properties": {
        "name": "面",
    }
};
var intersection=turf.intersect(FeatureCollection);
```