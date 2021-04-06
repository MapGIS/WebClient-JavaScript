## 不规则三角网分析

### 示例功能

&ensp;&ensp;&ensp;&ensp;TIN方法将无重复点的散乱数据点集按某种规则(如Delaunay 规则) 进行三角剖分，使这些散乱点形成连续但不重叠的不规则三角面片网，并以此来描述3D 物体的表面。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现，核心是应用开发库中的第三方插件`turf`，使用其关键接口`turf.tin()`进行不规则三角网分析。

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

**Step 4. <font color=red>执行不规则三角网分析</font>**：
 &ensp;&ensp;&ensp;&ensp; `不规则三角网分析`关键步骤，准备不规则的点要素数据用作不规则三角网分析，**一共分为二步**：

&ensp;&ensp;（1）准备点要素数据

 * Example:
  ```javascript
    $.getJSON("../../static/data/client-analysis/point.json", function(data) {
      convertDataToGeoJson(data);
    });
  ```
   
&ensp;&ensp;（2）执行 `不规则三角网分析算法`，返回结果三角网多边形要素数据

* Example: 
  ```javascript
    function convertDataToGeoJson(origindata) {
      geojson = turf.tin(origindata);
    }
  ```
   
**Step 5. <font color=red>显示分析结果</font>**：
&ensp;&ensp;&ensp;&ensp; 更新数据，将得到的三角网多边形要素数据添加到地图中。

* Example:
  ```javascript
    var source = new ol.source.Vector();
    geojson = turf.buffer(origindata, 1.5, {
      units: 'miles'
    });
    let features = geojson.features;
    for (var i = 0; i < features.length; i++) {
      let oljson = new ol.format.GeoJSON();
      let feature = oljson.readFeature(features[i]);
      feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      source.addFeature(feature);
    }
    map.addLayer(new ol.layer.Vector({
      source: source,
      style: styleFunction
    }))
  ```

### 关键接口

#### 1.【客户端空间分析库】`Turf`

##### 【method】`turf.tin(points,z)`:不规则三角网分析

 &ensp;&ensp;&ensp;&ensp; 取得一组点，然后创建不规则三角测量网络（简称TIN），以多边形集合的形式返回。 这些通常用于开发高程等高线图或阶梯式热可视化。

| 参数   | 类型                     | 描述                                                         |
| ----- | ------------------------ | ----------------------------------------------------------- |
| points | FeatureCollection<Point> | Geojson点要素集合                                            |
| z      | (String)                 | 要从哪个属性中提取z值，可选参数:如果没有给，那么就不会有额外的信息添加到派生的三角形中 |

* `tin()`返回值

> FeatureCollection <`Polygon`> - TIN输出GeoJSON的要素区集合

* Example:
  ```javascript
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
