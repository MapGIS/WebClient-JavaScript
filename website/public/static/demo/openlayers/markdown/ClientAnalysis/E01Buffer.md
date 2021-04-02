## 缓冲区分析

### 示例功能

&ensp;&ensp;&ensp;&ensp;给定一个缓冲半径进行缓冲区分析，单位支持 `miles 米`，`kilometers 千米`，`degrees 度`。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现，核心是应用开发库中的第三方插件`turf`，使用其关键接口`turf.buffer()`进行缓冲区分析。

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

**Step 4. <font color=red>执行缓冲区分析</font>**：
 &ensp;&ensp;&ensp;&ensp; 准备`点`、`线`、`面`要素数据，根据`缓冲区分析算法`得到缓冲区分析结果，实现关键步骤如下：

 &ensp;&ensp;（1）准备`点`、`线`、`面`要素数据

* Example:
  ```javascript
    var geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [114.24270629882811, 30.622550184776674],
          },
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [114.34810638427734, 30.634958017061198],
              [114.2856216430664, 30.554869984737515],
              [114.246826171875, 30.4954261715298],
            ],
          },
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [114.33815002441406, 30.502230042106245],
                [114.34398651123045, 30.485071542395932],
                [114.3728256225586, 30.472348632640834],
                [114.38278198242188, 30.49010107130931],
                [114.35256958007811, 30.50518809826035],
                [114.33815002441406, 30.502230042106245],
              ],
            ],
          },
        },
      ],
    };
  ```

 &ensp;&ensp;（2）执行 `缓冲区分析算法`，返回缓冲结果要素数据

* Example:
  ```javascript
    geojson = turf.buffer(geojson, 1.5, {
      units: "miles",
    });
  ```

**Step 5. <font color=red>显示缓冲区分析结果</font>**：
 &ensp;&ensp;&ensp;&ensp; 更新数据，将得到的缓冲结果要素数据添加到地图中。

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

##### 【method】`turf.buffer(coordinates,properties,options)`:缓冲分析方法

&ensp;&ensp;&ensp;&ensp;计算给定半径的输入要素的缓冲区。 支持的单位是英里，公里和度。

|参数	|类型	|描述|
|---|---|---|
|geojson	|任何Geojson格式|输入数据,标准的geojson格式即可|
|radius	|number	|缓冲距离(`允许负数`)|
|options	|Object| 其他参数,请看下面的单位参数|

* `options`参数属性说明

|名称	|类型	|默认值|	描述|
|---|---|---|---|
|units	|string	|"kilometers"	|turf支持的任何单位选项|
|steps|	number	|64| 步数 |

* `buffer()`返回值

> - FeatureCollection `geojson要素集合`
> - Feature `<(Polygon|MultiPolygon)>`  区或者多区
> - undefined  `失败`返回 undefined


* Example:
  ```javascript
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
