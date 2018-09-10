### 缓冲区分析 buffer
> 给定一个缓冲半径进行缓冲区分析. 单位支持 `miles 米`,`kilometers 千米`,`degrees 度`.

---
#### 提交BUG
> 找到bug请提交[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)

---
#### 参数

|参数	|类型	|描述|
|:---|---|:---|
|geojson	|任何Geojson格式|输入数据,标准的geojson格式即可|
|radius	|number	|缓冲距离(`允许负数`)|
|options	|Object| 其他参数,请看下面的单位参数|

> FeatureCollection,Feature指得是GeoJSON格式的要素集合,因此请重点复习`GeoJSON专题`.`GeoJSON.parse`方法在后面的场景中将会反复出现,请熟练掌握其用法

---
#### 单位

|名称	|类型	|默认值|	描述|
|:---|:---|:---|
|units	|string	|"kilometers"	|any of the options supported by turf units|
|steps|	number	|64|	number of steps|

---
#### 返回值

> - FeatureCollection `geojson要素集合`
> - Feature `<(Polygon|MultiPolygon)>`  区或者多区
> - undefined  `失败`返回 undefined

---
#### 示例
``` javascript
var point = turf.point([-90.548630, 14.616599]);
var buffered = turf.buffer(point, 500, {units: 'miles'});
//----------建议使用下面的标准的geojson格式-----------
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
var buffered = turf.buffer(GeoPoint, 500, {units: 'miles'});
```
