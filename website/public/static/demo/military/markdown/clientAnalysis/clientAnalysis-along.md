## 线插值操作 Along

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例用于线插值，线插值操作是通过 `计算起点-终点长度` , 然后再根据长度等分计算需要插值的点, 最后再把这些点插入到原始数据中.

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，过 Cesium 三维球控件 `Cesium.WebSceneControl()` 加载三维场景控件后根据已有的线计算插值点形成新的线数据，添加线显示完成此功能。

#### Turf.js

> turf 是 JavaScript 编写的模块化地理空间引擎，具体使用请查看<a target="_blank" href="http://turfjs.org/">turf 官方教程</a>和<a target="_blank" href="https://github.com/Turfjs/turf">下载</a>

#### GeoJSON.js

> 地理数据转换成<a target="_blank" href="http://geojson.org/">GeoJSON</a>格式，<a target="_blank"  href="https://github.com/caseycesari/GeoJSON.js">GeoJSON.js 官方地址</a>

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维 WebGL 的功能；

**Step 2. <font color=red>创建三维地图容器并加载三维球控件</font>**：
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的 div 作为三维视图的容器，并设置其样式，初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

- Example:

  ```Javascript
    //构造三维视图类（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {
      terrainExaggeration: 1,
    });
  ```

- Example:
  ```html
    <div id="GlobeView"></div>
  ```

**Step 3. <font color=red>计算线长度</font>**：
&ensp;&ensp;&ensp;&ensp;通过 `turf` 对象的 `distance()` 方法计算线长度；

- Example:
  ```Javascript
    //计算距离
    var lineDistance = turf.distance(origin, destination, {
      units: 'kilometers'
    });
  ```

**Step 4. <font color=red>等分线长度</font>**：
&ensp;&ensp;&ensp;&ensp;将线长度平均分；

- Example:
  ```Javascript
    //将均分线插值
    for (var i = 0; i < lineDistance; i += clip) {
      //计算对应第i个插值点的位置
      var segment = turf.along(route.features[0], i, {
        units: 'kilometers'
      });
      //将插值点加入到原始数据中
      arc.push(segment.geometry.coordinates);
    }
  ```

**Step 5. <font color=red>显示结果</font>**：
&ensp;&ensp;&ensp;&ensp;将插完值的线显示出来。

- Example:
  ```Javascript
    //更新视图函数
    function updateView() {
      //添加路线显示
      var routedatasource = map.dataSources.add(Cesium.GeoJsonDataSource.load(route, {
        //线颜色
        stroke: Cesium.Color.GRAY,
        //填充色
        fill: Cesium.Color.GRAY,
        //线宽
        strokeWidth: 5
      }));
      //添加简单线显示
      var simpledatasource = map.dataSources.add(Cesium.GeoJsonDataSource.load(simpleLine, {
        //线颜色
        stroke: Cesium.Color.RED,
        //填充色
        fill: Cesium.Color.RED,
        //线宽
        strokeWidth: 5
      }));
      //跳转至路线
      map.flyTo(routedatasource);
    }
  ```

### 关键接口

#### 1.【客户端空间分析库】`Turf`

##### 【method】`turf.distance(from,to,options)`：量算距离

&ensp;&ensp;&ensp;&ensp;计算两点之间的距离，以度、弧度、英里或公里为单位。

| 参数    | 类型                                                                                  | 说明                         |
| ------- | ------------------------------------------------------------------------------------- | ---------------------------- |
| from    | <a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.1.1">Coord</a> | 起点                         |
| to      | <a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.1.1">Coord</a> | 终点                         |
| options | Object                                                                                | 其他参数，请看下面的单位参数 |

- `options`参数属性说明

| 名称  | 类型   | 描述         |
| ----- | ------ | ------------ |
| units | string | "kilometers" | 可以是 `degrees` 度, `radians` 弧度, `miles` 英里, or `kilometers` 千米 |

- `distance()`返回值

> number - 两点之间的距离

- Example:

  ```javascript
    var from = turf.point([-75.343, 39.984])
    var to = turf.point([-75.534, 39.123])
    var options = { units: 'miles' }
    var distance = turf.distance(from, to, options)
  ```

##### 【method】`turf.along(line,distance,options)`：线插值

&ensp;&ensp;&ensp;&ensp;线插值，接收一个线要素，并沿线返回指定距离处的点。

| 参数     | 类型                                                                                                                                                                              | 描述                         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| line     | <a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.2">Feature</a><<a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.1.4">LineString</a>> | 原始线段，至少要有 2 个点    |
| distance | number                                                                                                                                                                            | 距离起点的插入距离           |
| options  | Object                                                                                                                                                                            | 其他参数，请看下面的单位参数 |

- `options`参数属性说明

| 名称  | 类型   | 默认值       | 描述                                                               |
| ----- | ------ | ------------ | ------------------------------------------------------------------ |
| units | string | "kilometers" | 可以是`degrees`度, `radians`弧度, `miles`英里, or `kilometers`千米 |

> Feature <LineString>指得是 GeoJSON 格式的要素集合，因此请重点复习`GeoJSON专题`，`GeoJSON.parse`方法在后面的场景中将会反复出现，请熟练掌握其用法

- `along()`返回值

> <a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.2">Feature</a><<a target="_blank" href="https://tools.ietf.org/html/rfc7946#section-3.1.2">Point </a>> - Point 距离起点长度为 distance 的点

- Example:

  ```javascript
    var line = turf.lineString([
      [-83, 30],
      [-84, 36],
      [-78, 41],
    ])
    var options = { units: 'miles' }
    var along = turf.along(line, 200, options)
  ```
