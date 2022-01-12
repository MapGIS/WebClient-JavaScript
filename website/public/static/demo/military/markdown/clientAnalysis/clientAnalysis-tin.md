## 不规则三角网分析 TIN

### 示例功能

&ensp;&ensp;&ensp;&ensp;TIN方法将无重复点的散乱数据点集按某种规则(如Delaunay 规则) 进行三角剖分，使这些散乱点形成连续但不重叠的不规则三角面片网，并以此来描述3D 物体的表面。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，先通过Cesium三维球控件 `Cesium.WebSceneControl()` 加载三维场景控件后，使用 `Turf.js` 空间分析库的关键接口`turf.tin()`进行不规则三角网分析。

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

**Step 3. <font color=red>执行不规则三角网分析</font>**：
 &ensp;&ensp;&ensp;&ensp; `不规则三角网分析`关键步骤，准备不规则的点要素数据用作不规则三角网分析，**一共分为二步**：

 &ensp;&ensp;（1）准备点要素数据

 * Example:
  ```javascript
    $.getJSON('./static/data/client-analysis/point.json', function(data) {
        convertDataToGeoJson(data);
        updateView(geojson);
    });
  ```
   
 &ensp;&ensp;（2）执行 `不规则三角网分析算法`，返回结果三角网多边形要素数据

* Example: 
  ```javascript
    function convertDataToGeoJson(origindata) {
      var points = origindata;
      geojson = turf.tin(points);
    }   
  ```
   
**Step 4. <font color=red>显示分析结果</font>**：
 &ensp;&ensp;&ensp;&ensp; 更新数据，将得到的三角网多边形要素数据添加到地图中。

* Example:
  ```javascript
    function updateView(data) {
      var tindatasource = map.dataSources.add(Cesium.GeoJsonDataSource.load(data, {
        stroke: Cesium.Color.BLACK,
        fill: Cesium.Color.GRAY,
        strokeWidth: 15
      }));
      map.flyTo(tindatasource);
    }
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
