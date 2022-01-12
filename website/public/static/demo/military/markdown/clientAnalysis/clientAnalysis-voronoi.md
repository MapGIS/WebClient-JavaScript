## 泰森多边形

### 示例功能

&ensp;&ensp;&ensp;&ensp;针对给定的点生成泰森多边形，请注意一定要传入bbox参数，`如果没有绘制对应的多边形，那么肯定是bbox的范围没有包含住所有的点集`，*这点非常重要*。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，先通过Cesium三维球控件 `Cesium.WebSceneControl()` 加载三维场景控件后，使用 `Turf.js` 空间分析库的关键接口`turf.voronoi()`进行泰森多边形分析。

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

**Step 3. <font color=red>执行泰森多边形分析</font>**：
 &ensp;&ensp;&ensp;&ensp;  准备点要素数据用作泰森多边形分析， `泰森多边形分析`关键步骤如下：

 &ensp;&ensp;（1）准备点要素数据

* Example:
  ```javascript
    $.getJSON('./static/data/client-analysis/point.json', function (data) {
      convertDataToGeoJson(data);
    });
  ```
   
 &ensp;&ensp;（2）执行 `泰森多边形分析算法`，返回结果三角网多边形要素数据
   
* Example:
  ```javascript
    function convertDataToGeoJson(origindata) {
      var points = origindata;
      geojson = turf.voronoi(points, {
        bbox: [113.67, 30.00, 115.20, 31.41]
      });
    }   
  ```
   
**Step 4. <font color=red>显示分析结果</font>**：
 &ensp;&ensp;&ensp;&ensp;更新数据，将得到的三角网多边形要素数据添加到地图中。

* Example:
  ```javascript
    var voronoidatasource = map.dataSources.add(Cesium.GeoJsonDataSource.load(data, {
      stroke: Cesium.Color.BLACK,
      fill: Cesium.Color.GRAY,
      strokeWidth: 15
    }));
  ```

### 关键接口

#### 1.【客户端空间分析库】`Turf`

##### 【method】`turf.voronoi(points,options)`:泰森多边形分析

&ensp;&ensp;&ensp;&ensp;根据点的要素数据集和边界框返回泰森多边形的要素数据集。

| 参数    | 类型                       | 描述                        |
| ------ | -------------------------- | -------------------------- |
| points  | FeatureCollection<`Point`> | 输入数据,用于生成泰森多边形 |
| options | Object对象                 | 其他参数,请看下面的参数     |

* options参数属性说明

| 名称 | 类型      | 默认值             | 描述     |
| --- | -------- | ----------------- | -------- |
| bbox | Array数组 | [-180,-85,180,-85] | `裁剪框` |

`注意`：*bbox特别重要一定要包含所有的点,要不然无法生成泰森多边形,换言之,这个矩形的范围要够大*

* `voronoi()`返回值

> FeatureCollection<`Polygon`> `geojson区要素集合`,每一个输入点都一定有一个输出区与之一一对应。

* Example:
  ```javascript
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

