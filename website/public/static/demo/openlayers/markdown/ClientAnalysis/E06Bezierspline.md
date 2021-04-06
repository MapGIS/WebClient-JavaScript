## 贝塞尔曲线

### 示例功能

&ensp;&ensp;&ensp;&ensp;针对给定的线生成对应的贝塞尔曲线。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现，核心是应用开发库中的第三方插件`turf`，使用其关键接口`turf.bezierSpline()`计算贝塞尔曲线。

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

**Step 4. <font color=red>执行贝塞尔曲线分析</font>**：
 &ensp;&ensp;&ensp;&ensp; 准备一条`折线`，根据`Bezier样条线算法`获取到一条曲线，`贝塞尔曲线`关键步骤**一共分为二步**：

 &ensp;&ensp;（1）准备一条 `折线`

* Example:
  ```javascript
    originline = turf.lineString([
      [-76.091308, 18.427501],
      [-76.695556, 18.729501],
      [-76.552734, 19.40443],
      [-74.61914, 19.134789],
      [-73.652343, 20.07657],
      [-73.157958, 20.210656],
    ]);
  ```

  &ensp;&ensp;（2）执行 `Bezier样条线算法`返回一条曲线

* Example:
  ```javascript
    bezierline = turf.bezierSpline(originline);
  ```

**Step 5. <font color=red>显示分析结果</font>**：
 &ensp;&ensp;&ensp;&ensp; 更新数据，将得到的贝塞尔曲线更新到地图中。

* Example:
  ```javascript
    var vectorLayer = new ol.layer.Vector({
              source: new ol.source.Vector({
                  features: [oriFeature, desFeature]
              }),
              style: function (feature) {
                  return styles[feature.get('type')];
              }
          });
    map.addLayer(vectorLayer);
  ```

### 关键接口

#### 1.【客户端空间分析库】`Turf`

##### 【method】`turf.lineString(coordinates,properties,options)`:点坐标生成线

 &ensp;&ensp;&ensp;&ensp;使用一组点坐标数组创建一条折线。

| 参数        | 类型   | Description        |
| ---------- | ----- | ----------------- |
| coordinates | Array  | 一组点坐标数组     |
| properties  | Object | 使用键值对添加属性 |
| options     | Object | 可选参数           |

* `options`参数属性说明

| 属性 | 类型               | 描述               |
| --- | ----------------- | ----------------- |
| bbox | (Array )           | 边界框数组         |
| id   | ((string\|number)) | 与功能关联的标识符 |

* `lineString()`返回值

> <a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.2">Feature</a><<a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.1.4">LineString</a>> - 线要素

* Example:
  ```javascript
  var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
  var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
  ```

##### 【method】`turf.bezierSpline(line,options)`:贝塞尔曲线算法

 &ensp;&ensp;&ensp;&ensp;接收一条线并通过应用Bezier样条线算法返回一条曲线。

|参数	|类型	|描述|
|---|---|---|
|line	|<a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.2">Feature</a><<a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.1.4">LineString</a>>|输入一条折线|
|options	|Object| 其他参数，请看下面的单位参数|

* `options`参数属性说明

|名称	|类型	|默认值|	描述|
|---|---|---|----|
| resolution | number | 10000  | 两点之间的时间（以毫秒为单位）。 |
| sharpness  | number | 0.85   | 样条间路径的弯曲程度的度量       |

> Feature <LineString>指得是GeoJSON格式的要素集合，因此请重点复习`GeoJSON专题`，`GeoJSON.parse`方法在后面的场景中将会反复出现，请熟练掌握其用法

* `bezierSpline()`返回值

>   <a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.2">Feature</a><<a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.1.4">LineString</a>> - 曲线

* Example:
  ```javascript
  var line = turf.lineString([
    [-76.091308, 18.427501],
    [-76.695556, 18.729501],
    [-76.552734, 19.40443],
    [-74.61914, 19.134789],
    [-73.652343, 20.07657],
    [-73.157958, 20.210656]
  ]);

  var curved = turf.bezierSpline(line);
  ```
