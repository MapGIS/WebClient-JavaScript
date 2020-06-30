### 贝塞尔曲线 bezierspline

> 针对给定的线生成对应的贝塞尔曲线

---
#### 提交BUG
> 找到bug请提交[issue](https://github.com/MapGIS/WebClient-JavaScript/issues)

---
#### 参数

|参数	|类型	|描述|
|:---|---|:---|
|line|	GeoJSON<`LineString`>	|输入线,用于生成贝塞尔曲线|

> FeatureCollection,Feature指得是GeoJSON格式的要素集合,因此请重点复习`GeoJSON专题`.`GeoJSON.parse`方法在后面的场景中将会反复出现,请熟练掌握其用法

---

---
#### 返回值

> - FeatureCollection<`LineString`> `geojson线要素集合`。

---
#### 示例
``` javascript
var points = [
  [-76.091308, 18.427501],
  [-76.695556, 18.729501],
  [-76.552734, 19.40443],
  [-74.61914, 19.134789],
  [-73.652343, 20.07657],
  [-73.157958, 20.210656],
];
var line = turf.lineString();
var bezierline = turf.bezierSpline(line);

//----------建议使用下面的标准的geojson格式-----------
var GeoLine = {
    "type": "Feature",
    "geometry": {
        "type": "LineString",
        "coordinates": [
          [-76.091308, 18.427501],
          [-76.695556, 18.729501],
          [-76.552734, 19.40443],
          [-74.61914, 19.134789],
          [-73.652343, 20.07657],
          [-73.157958, 20.210656],
        ]
    },
    "properties": {
        "name": "点",
    }
};
```
