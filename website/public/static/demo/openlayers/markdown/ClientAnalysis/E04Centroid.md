## 中心点提取

### 示例功能

&ensp;&ensp;&ensp;&ensp;计算给定GeoJSON的数据中心，支持所有的GeoJSON类型。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现，核心是应用开发库中的第三方插件`turf`，使用其关键接口`turf.centroid()`进行中心点提取。

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

**Step 4. <font color=red>执行中心点提取操作</font>**：
 &ensp;&ensp;&ensp;&ensp; 准备要素数据用作提取中心点， `中心点提取`关键步骤，**一共分为二步**：

 &ensp;&ensp;（1）准备要素数据

* Example:
  ```javascript
    $.getJSON("../../static/data/client-analysis/buffer-hash-4.json",function(data) {
        convertDataToGeoJson(data);
    });
    function convertDataToGeoJson(origindata) {
      var columnarPoints = [];
      var points;
      origindata.aggregations.geohash.buckets.forEach(function(bucket) {
        var coordinates = decodeGeoHash(bucket.key);
        var countNumber = bucket.doc_count;
        var point = {
          pointKey: [coordinates.longitude[2], coordinates.latitude[2]],
          count: bucket.doc_count,
        }; //[0] min [1]max [2] 中心点
        columnarPoints.push(point);
      });
      massPoints = GeoJSON.parse(columnarPoints, {
        Point: "pointKey",
      });
    }
  ```
   
 &ensp;&ensp;（2）执行 `提取中心点算法`，返回中心点要素数据

* Example: 
  ```javascript
    centerPoint = turf.centroid(massPoints);
  ```
   
**Step 5. <font color=red>显示分析结果</font>**：
 &ensp;&ensp;&ensp;&ensp; 更新数据，将得到的中心点要素数据添加到地图中。

* Example: 
  ```javascript
    var source = new ol.source.Vector();
    var originsource = new ol.source.Vector();
    let oljson = new ol.format.GeoJSON();
    let feature = oljson.readFeature(geojson);
    feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    source.addFeature(feature);
    map.addLayer(new ol.layer.Vector({
      source: source,
      style: function () {
        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 15,
            fill: new ol.style.Fill({
              color: 'rgba(255, 0, 0, 0.1)'
            }),
            stroke: new ol.style.Stroke({
              color: 'red',
              width: 1
            })
          })
        })
      }
    }))
    points.features.forEach(function (point) {
      feature = new ol.format.GeoJSON().readFeature(point);
      feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      originsource.addFeature(feature);
    })
    map.addLayer(new ol.layer.Vector({
      source: originsource,
      style: function () {
        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
              color: 'rgba(0, 0, 255, 0.1)'
            }),
            stroke: new ol.style.Stroke({
              color: 'blue',
              width: 1
            })
          })
        })
      }
    }))
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
