## 多边形相交

### 示例功能

两个多边形求取交集。 如果他们共享边界，则返回边界；如果它们不相交，则返回undefined。

### 示例实现

本示例需要使用include-mapboxgl-local.js开发库实现，核心是应用开发库中的第三方插件`turf`，使用其关键接口`turf.intersect()`进行多边形相交计算。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

#### turf

> turf是JavaScript编写的模块化地理空间引擎，具体使用请查看<a target="_blank" href="http://turfjs.org/">turf官方教程</a>和<a target="_blank" href="https://github.com/Turfjs/turf">下载</a>

GeoJSON.js

> 地理数据转换成<a target="_blank" href="http://geojson.org/">GeoJSON</a>格式，<a target="_blank"  href="https://github.com/caseycesari/GeoJSON.js">GeoJSON.js官方地址</a>

### 实现步骤

1. 引用开发库，本示例通过本地离线include-mapboxgl-local.js脚本引入开发库；

2. 创建`id="map"`的div作为地图容器，并设置其样式；

3. 创建地图对象，设置地图的必要参数，如地图div容器、缩放层级、中心点等，包含数据源的创建，地图中添加图层，具体操作参考`互联网地图`目录下的`天地图经纬度`示例；

4. `多边形相交`关键步骤，准备2个多边形要素数据用作相交运算，**一共分为二步**：

   （1）准备2个多边形要素数据

   ```javascript
   poly1 = turf.polygon([
     [
       [-122.801742, 45.48565],
       [-122.801742, 45.60491],
       [-122.584762, 45.60491],
       [-122.584762, 45.48565],
       [-122.801742, 45.48565],
     ],
   ]);
   poly2 = turf.polygon([
     [
       [-122.520217, 45.535693],
       [-122.64038, 45.553967],
       [-122.720031, 45.526554],
       [-122.669906, 45.507309],
       [-122.723464, 45.446643],
       [-122.532577, 45.408574],
       [-122.487258, 45.477466],
       [-122.520217, 45.535693],
     ],
   ]);
   ```
   
   （2）执行 `多边形相交算法`，返回相交的结果多边形要素数据
   
   ```javascript
   polyInter = turf.intersect(poly1, poly2);
   ```
   
5. 更新数据，将得到的相交的结果多边形要素数据添加到地图中

   ```javascript
   map.addLayer({
     id: "polyInter",
     type: "fill",
     source: {
       type: "geojson",
       data: polyInter,
     },
     paint: {
       "fill-color": "#FF0000",
       "fill-opacity": 0.8,
       "fill-outline-color": "#FFF",
     },
   });
   ```

### 关键接口

#### 1.【多边形相交】intersect

使用：turf.intersect(poly1,poly2)

取两个多边形并找到它们的交点。 如果他们共享边界，则返回边界；否则，返回边界。 如果它们不相交，则返回undefined。

> `intersect`主要参数

| 参数  | 类型                         | 描述                           |
| ---- | ---------------------------- | ----------------------------- |
| poly1 | FeatureCollection(`Polygon`) | 输入数据，用于生成第一个多边形 |
| poly2 | FeatureCollection(`Polygon`) | 输入数据，用于生成第二个多边形 |

##### 返回值

> - FeatureCollection<`Polygon`>  当共享点或线时，`返回geojson相交区要素集`.
> - null   当没有共享点时，`则返回空值`.

##### 示例

```javascript
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