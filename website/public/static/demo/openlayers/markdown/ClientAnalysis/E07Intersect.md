## 多边形相交

### 示例功能

&ensp;&ensp;&ensp;&ensp;两个多边形求取交集。 如果他们共享边界，则返回边界；如果它们不相交，则返回undefined。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现，核心是应用开发库中的第三方插件`turf`，使用其关键接口`turf.intersect()`进行多边形相交计算。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

#### Turf.js

> turf是JavaScript编写的模块化地理空间引擎，具体使用请查看<a target="_blank" href="http://turfjs.org/">turf官方教程</a>和<a target="_blank" href="https://github.com/Turfjs/turf">下载</a>

#### GeoJSON.js

> 地理数据转换成<a target="_blank" href="http://geojson.org/">GeoJSON</a>格式，<a target="_blank"  href="https://github.com/caseycesari/GeoJSON.js">GeoJSON.js官方地址</a>

### 实现步骤

**Step 1.<font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线【include-openlayers-local.js】脚本引入开发库；

**Step 2. <font color=red>创建布局</font>**：
 &ensp;&ensp;&ensp;&ensp;创建`id="map"`的div作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**：
 &ensp;&ensp;&ensp;&ensp;设置地图的必要参数，如地图div容器、缩放层级、中心点等，包含数据源的创建，地图中添加图层，具体操作参考`互联网地图`目录下的`天地图经纬度`示例；

**Step 4. <font color=red>执行多边形相交操作</font>**：
 &ensp;&ensp;&ensp;&ensp; 准备2个多边形要素数据用作相交运算，`多边形相交`关键步骤**一共分为二步**：

 &ensp;&ensp;（1）准备2个多边形要素数据

* Example:
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
   
 &ensp;&ensp;（2）执行 `多边形相交算法`，返回相交的结果多边形要素数据

* Example: 
  ```javascript
    polyInter = turf.intersect(poly1, poly2);
  ```
   
**Step 5. <font color=red>显示分析结果</font>**：
 &ensp;&ensp;&ensp;&ensp;  更新数据，将得到的相交的结果多边形要素数据添加到地图中。

* Example:
  ```javascript
    map.addLayer(new ol.layer.Vector({
      source: originsource,
      style: function () {
        return new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
          }),
          stroke: new ol.style.Stroke({
            color: 'blue',
            width: 1
          })
        })
      }
    }))
    map.addLayer(new ol.layer.Vector({
      source: intersectsource,
      style: function () {
        return new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 0.1)'
          }),
          stroke: new ol.style.Stroke({
            color: 'red',
            width: 5
          })
        })
      }
    }))
  ```

### 关键接口

#### 1.【客户端空间分析库】`Turf`

##### 【method】`turf.intersect(poly1,poly2)`:多边形相交

 &ensp;&ensp;&ensp;&ensp; 取两个多边形并找到它们的交点。 如果他们共享边界，则返回边界；否则，返回边界。 如果它们不相交，则返回undefined。

| 参数  | 类型                         | 描述                           |
| ---- | ---------------------------- | ----------------------------- |
| poly1 | FeatureCollection(`Polygon`) | 输入数据，用于生成第一个多边形 |
| poly2 | FeatureCollection(`Polygon`) | 输入数据，用于生成第二个多边形 |

* `intersect()`返回值

> - FeatureCollection<`Polygon`>  当共享点或线时，`返回geojson相交区要素集`.
> - null   当没有共享点时，`则返回空值`.

* Example:
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