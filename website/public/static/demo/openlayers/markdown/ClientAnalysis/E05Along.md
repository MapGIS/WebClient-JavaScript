## 线插值操作

### 示例功能

&ensp;&ensp;&ensp;&ensp;线插值操作是通过 `计算起点-终点长度`，然后再根据长度等分计算需要插值的点，最后再把这些点插入到原始数据中。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现，核心是应用开发库中的第三方插件`turf`，使用其关键接口`turf.along()`单个计算插值点，将所有单个插值点整合为一条线实现插值操作。

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

**Step 4. <font color=red>执行线插值操作</font>**：
 &ensp;&ensp;&ensp;&ensp; 线插值操作主要内容是将一条固定线段进行等分，等分后的线段计算插值点，使用获得的插值点生成一条新的线。 `线插值操作`关键步骤**一共分为三步**：


 &ensp;&ensp;（1）计算 `长度`

* Example:
  ```javascript
    var origin = [89.341, 40.92];
    var destination = [133.989, 20.92];
    var lineDistance = turf.distance(origin, destination, {
      units: "kilometers",
    });
  ```

 &ensp;&ensp;（2）等分 `长度`

* Example:
  ```javascript
    var count = 100; //插入100个点
    var clip = lineDistance / count; //用于下面的循环
  ```

 &ensp;&ensp;（3）计算各个`分段点`  **along仅仅只是计算单个插值点**

* Example:
  ```javascript
    var arc = [];
    for (var i = 0; i < lineDistance; i += clip) {
      //计算对应第i个插值点的位置
      var segment = turf.along(originLine.features[0], i, {
        units: "kilometers",
      });
      //将插值点加入到原始数据中
      arc.push(segment.geometry.coordinates);
    }
    arc.push(destination); //补上终点
  ```

**Step 5. <font color=red>显示分析结果</font>**：
 &ensp;&ensp;&ensp;&ensp;  更新数据，将得到的插值线更新到地图中。

* Example:
  ```javascript
    var source = new ol.source.Vector();
    var originsource = new ol.source.Vector();
    let oljson = new ol.format.GeoJSON();
    route.features.forEach(function (line) {
      let feature = oljson.readFeature(line);
      feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      source.addFeature(feature);
    });
    simpleLine.features.forEach(function (line) {
      let feature = oljson.readFeature(line);
      feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      originsource.addFeature(feature);
    });      
    map.addLayer(new ol.layer.Vector({
      source: source,
      style: function () {
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'red',
            width: 15
          })
        })
      }
    }))
    map.addLayer(new ol.layer.Vector({
      source: originsource,
      style: function () {
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'blue',
            width: 5
          })
        })
      }
    }))
  ```

### 关键接口

#### 1.【客户端空间分析库】`Turf`

##### 【method】`turf.distance(from,to,options)`：量算距离

&ensp;&ensp;&ensp;&ensp;计算两点之间的距离，以度、弧度、英里或公里为单位。

| 参数    | 类型                                                         | 说明                         |
| ------ | ----------------------------------------------------------- | --------------------------- |
| from    | <a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.1.1">Coord</a> | 起点                         |
| to      | <a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.1.1">Coord</a> | 终点                         |
| options | Object                                                       | 其他参数，请看下面的单位参数 |

* `options`参数属性说明

|名称	|类型	|默认值|	描述|
|---|---|---|
|units	|string|	"kilometers"	|可以是`degrees`度, `radians`弧度, `miles`英里, or `kilometers`千米|

* `distance()`返回值

> number - 两点之间的距离

* Example:
  ```javascript
  var from = turf.point([-75.343, 39.984]);
  var to = turf.point([-75.534, 39.123]);
  var options = {units: 'miles'};

  var distance = turf.distance(from, to, options);
  ```

##### 【method】`turf.along(line,distance,options)`：线插值

&ensp;&ensp;&ensp;&ensp;线插值，接收一个线要素，并沿线返回指定距离处的点。

|参数	|类型	|描述|
|---|---|---|
|line	|<a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.2">Feature</a><<a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.1.4">LineString</a>>|原始线段，至少要有2个点|
|distance	|number	|距离起点的插入距离|
|options	|Object| 其他参数，请看下面的单位参数|

* `options`参数属性说明

|名称	|类型	|默认值|	描述|
|---|---|---|
|units	|string|	"kilometers"	|可以是`degrees`度, `radians`弧度, `miles`英里, or `kilometers`千米|

> Feature <LineString>指得是GeoJSON格式的要素集合，因此请重点复习`GeoJSON专题`，`GeoJSON.parse`方法在后面的场景中将会反复出现，请熟练掌握其用法

* `along()`返回值

>   <a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.2">Feature</a><<a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.1.2">Point </a>> - Point 距离起点长度为distance的点

* Example:
  ```javascript
  var line = turf.lineString([[-83, 30], [-84, 36], [-78, 41]]);
  var options = {units: 'miles'};

  var along = turf.along(line, 200, options);
  ```