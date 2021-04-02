## 泰森多边形

### 示例功能

&ensp;&ensp;&ensp;&ensp;针对给定的点生成泰森多边形，请注意一定要传入bbox参数，`如果没有绘制对应的多边形，那么肯定是bbox的范围没有包含住所有的点集`，*这点非常重要*。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现，核心是应用开发库中的第三方插件`turf`，使用其关键接口`turf.voronoi()`进行泰森多边形分析。

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

**Step 4. <font color=red>执行泰森多边形分析</font>**：
 &ensp;&ensp;&ensp;&ensp;  准备点要素数据用作泰森多边形分析， `泰森多边形分析`关键步骤如下：

 &ensp;&ensp;（1）准备点要素数据

* Example:
  ```javascript
    $.getJSON("../../static/data/client-analysis/point.json", function(data) {
      convertDataToGeoJson(data);
    });
  ```
   
 &ensp;&ensp;（2）执行 `泰森多边形分析算法`，返回结果三角网多边形要素数据
   
* Example:
  ```javascript
    function convertDataToGeoJson(origindata) {
      geojson = turf.voronoi(origindata, {
        bbox: [113.67, 30.1, 115.2, 31.21],
      });
    }
  ```
   
**Step 5. <font color=red>显示分析结果</font>**：
 &ensp;&ensp;&ensp;&ensp;更新数据，将得到的三角网多边形要素数据添加到地图中。

* Example:
  ```javascript
    var source = new ol.source.Vector();
      var format = new ol.format.GeoJSON();
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