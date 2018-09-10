### 缓冲区分析 buffe

> 针对给定的点生成泰森多边形,请注意一定要传入bbox参数,`如果没有绘制对应的多边形,那么肯定是bbox的范围没有包含住所有的点集`,*这点非常重要*

---
#### 提交BUG
> 找到bug请提交[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)

---
#### 参数

|参数	|类型	|描述|
|:---|---|:---|
|points|	FeatureCollection<`Point`>	|输入数据,用于生成泰森多边形|
|options|	Object对象	|其他参数,请看下面的参数|

> FeatureCollection,Feature指得是GeoJSON格式的要素集合,因此请重点复习`GeoJSON专题`.`GeoJSON.parse`方法在后面的场景中将会反复出现,请熟练掌握其用法

---
#### 单位

|名称	|类型	|默认值|	描述|
|:---|:---|:---|
|bbox|	Array数组|	[-180,-85,180,-85]|	`裁剪框`|

**bbox特别重要一定要包含所有的点,要不然无法生成泰森多边形,换言之,这个矩形的范围要够大**

---
#### 返回值

> - FeatureCollection<`Polygon`> `geojson区要素集合`,每一个输入点都一定有一个输出区与之一一对应.

---
#### 示例
``` javascript
var options = {
  bbox: [-70, 40, -60, 60]
};
var points = turf.randomPoint(100, options);
var voronoiPolygons = turf.voronoi(points, options);

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
var options = {
  bbox: [-180,-85,180,-85]
};
var voronois = turf.voronoi(FeatureCollection, options);
```
