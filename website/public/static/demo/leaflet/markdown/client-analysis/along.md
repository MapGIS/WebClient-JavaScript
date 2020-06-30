### 线插值操作 Along
> 线插值操作是通过 `计算起点-终点长度`,然后再根据长度等分计算需要插值的点,最后再把这些点插入到原始数据中.

---
#### 提交BUG
> 找到bug请提交[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)

---
**一共分为三步**

1.计算 `长度`

2.等分 `长度`

3.计算各个`分段点`  **Along仅仅只是计算单个插值点**

4.`插入`原始数据


---
#### 参数

|参数	|类型	|描述|
|:---|---|:---|
|line	|Feature <LineString>|原始线段,至少要有2个点|
|distance	|number	|距离起点的插入距离|
|options	|Object| 其他参数,请看下面的单位参数|

> Feature <LineString>指得是GeoJSON格式的要素集合,因此请重点复习`GeoJSON专题`.`GeoJSON.parse`方法在后面的场景中将会反复出现,请熟练掌握其用法

---
#### 单位

|名称	|类型	|默认值|	描述|
|:---|:---|:---|
|units	|string|	"kilometers"	|可以是`degrees`度, `radians`弧度, `miles`英里, or `kilometers`千米|

---
#### 返回值

> - Feature <Point> - Point 距离起点长度为distance的点

---
#### 示例
``` javascript
var line = turf.lineString([[-83, 30], [-84, 36], [-78, 41]]);
var options = {units: 'miles'};

var along = turf.along(line, 200, options);

//----------建议使用下面的标准的geojson格式-----------
var lineDistance = turf.distance(origin, destination, {
        units: 'kilometers'
      });
var arc = [];
var count = 100; //插入100个点
var clip = lineDistance / count;//用于下面的循环

for (var i = 0; i < lineDistance; i+=clip) {
  //计算对应第i个插值点的位置
  var segment = turf.along(route.features[0], i, {
    units: 'kilometers'
  });
  //将插值点加入到原始数据中
  arc.push(segment.geometry.coordinates);
}
arc.push(destination);//补上终点
```
