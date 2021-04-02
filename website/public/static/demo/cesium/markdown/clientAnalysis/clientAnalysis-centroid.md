## 中心点提取

### 示例功能

&ensp;&ensp;&ensp;&ensp;计算给定GeoJSON的数据中心，支持所有的GeoJSON类型。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，先通过Cesium三维球控件 `Cesium.WebSceneControl()` 加载三维场景控件后，使用 `Turf.js` 空间分析库的关键接口`turf.centroid()`进行中心点提取。

#### Turf.js

> turf是JavaScript编写的模块化地理空间引擎，具体使用请查看<a target="_blank" href="http://turfjs.org/">turf官方教程</a>和<a target="_blank" href="https://github.com/Turfjs/turf">下载</a>

#### GeoJSON.js

> 地理数据转换成<a target="_blank" href="http://geojson.org/">GeoJSON</a>格式，<a target="_blank"  href="https://github.com/caseycesari/GeoJSON.js">GeoJSON.js官方地址</a>

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

**Step 2. <font color=red>创建三维地图容器并加载三维球控件</font>**：
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

* Example:
  ``` Javascript
    //构造三维视图类（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {
      terrainExaggeration: 1,
    });
  ```

* Example:
  ``` html
    <div id='GlobeView'></div>
  ```

**Step 3. <font color=red>执行中心点提取操作</font>**：
 &ensp;&ensp;&ensp;&ensp; 准备要素数据用作提取中心点， `中心点提取`关键步骤，**一共分为二步**：

 &ensp;&ensp;（1）准备要素数据

* Example:
  ```javascript
    $.getJSON('./static/data/client-analysis/buffer-hash-4.json', function(data) {
      convertDataToGeoJson(data);
    });

    function convertDataToGeoJson(origindata) {
      var columnarPoints = [];
      var points;
      origindata.aggregations.geohash.buckets.forEach(function(bucket) {
        var coordinates = decodeGeoHash(bucket.key);
        var countNumber = bucket.doc_count;
        var point = {
          pointKey: [
            coordinates.longitude[2], coordinates.latitude[2]
          ],
          count: bucket.doc_count
        }; //[0] min [1]max [2] 中心点
        columnarPoints.push(point);
      });
      points = GeoJSON.parse(columnarPoints, {
        'Point': 'pointKey'
      });
    }
  ```
   
 &ensp;&ensp;（2）执行 `提取中心点算法`，返回中心点要素数据

* Example: 
  ```javascript
    geojson = turf.centroid(points);
  ```
   
**Step 4. <font color=red>显示分析结果</font>**：
 &ensp;&ensp;&ensp;&ensp; 更新数据，将得到的中心点要素数据添加到地图中。

* Example: 
  ```javascript
    updateView(geojson);
    function updateView(data) {
      var centerdatasource = map.dataSources.add(Cesium.GeoJsonDataSource.load(data, {
        markerColor: Cesium.Color.RED,
        markerSize: 50
      }));
    }
  ```

### 关键接口

#### 1.【客户端空间分析库】`Turf`

##### 【method】`turf.centroid(geojson,properties)`：提取中心点

 &ensp;&ensp;&ensp;&ensp;选取一个或多个要素，并使用所有顶点的平均值计算质心。

| 参数       | 类型        | 描述                          |
| --------- | ----------- | ---------------------------- |
| geojson    | GeoJSON格式 | 输入Geojson,用于计算中心点    |
| properties | Object      | 使用geojson中的properties字段 |

* `centroid()`返回值

> Feature <`Point`> - GeoJSON的中心点

* Example: 
  ```javascript
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

