### 不规则三角网分析 TIN

> TIN方法将无重复点的散乱数据点集按某种规则(如Delaunay 规则) 进行三角剖分，使这些散乱点形成连续但不重叠的不规则三角面片网，并以此来描述3D 物体的表面。

---
#### 提交BUG
> 找到bug请提交[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)

---
#### 参数

|参数	|类型	|描述|
|:---|---|:---|
|points	|FeatureCollection<Point>|	Geojson点要素集合|
|z	|(String)|	要从哪个属性中提取z值，可选参数:如果没有给，那么就不会有额外的信息添加到派生的三角形中|

> FeatureCollection<`Point`>指得是GeoJSON格式的要素集合,因此请重点复习`GeoJSON专题`.`GeoJSON.parse`方法在后面的场景中将会反复出现,请熟练掌握其用法

---
#### 返回值

> - FeatureCollection <`Polygon`> - TIN输出GeoJSON的要素区集合

---
#### 示例
``` javascript

var points = turf.randomPoint(30, {bbox: [50, 30, 70, 50]});
for (var i = 0; i < points.features.length; i++) {
  points.features[i].properties.z = ~~(Math.random() * 9);
}
var tin = turf.tin(points, 'z');

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
var buffered = turf.tin(FeatureCollection);
```
