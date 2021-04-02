## 多边形相交

### 示例功能

&ensp;&ensp;&ensp;&ensp;两个多边形求取交集。 如果他们共享边界，则返回边界；如果它们不相交，则返回 undefined。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，先通过 Cesium 三维球控件 `Cesium.WebSceneControl()` 加载三维场景控件后，使用 `Turf.js` 空间分析库的关键接口`turf.intersect()`进行多边形相交计算。

#### Turf.js

> turf 是 JavaScript 编写的模块化地理空间引擎，具体使用请查看<a target="_blank" href="http://turfjs.org/">turf 官方教程</a>和<a target="_blank" href="https://github.com/Turfjs/turf">下载</a>

#### GeoJSON.js

> 地理数据转换成<a target="_blank" href="http://geojson.org/">GeoJSON</a>格式，<a target="_blank"  href="https://github.com/caseycesari/GeoJSON.js">GeoJSON.js 官方地址</a>

### 实现步骤

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

**Step 3. <font color=red>执行多边形相交操作</font>**：
&ensp;&ensp;&ensp;&ensp; 准备 2 个多边形要素数据用作相交运算，`多边形相交`关键步骤**一共分为二步**：

&ensp;&ensp;（1）准备 2 个多边形要素数据

- Example:

  ```javascript
    poly1 = turf.polygon([
      [
        [-122.801742, 45.48565],
        [-122.801742, 45.60491],
        [-122.584762, 45.60491],
        [-122.584762, 45.48565],
        [-122.801742, 45.48565],
      ],
    ])
    poly2 = turf.polygon([
      [
        [-122.520217, 45.535693],
        [-122.64038, 45.553967],
        [-122.720031, 45.526554],
        [-122.669906, 45.507309],
        [-122.723464, 45.446643],
        [-122.532577, 45.408574],
        [-122.487258, 45.477466],
        [-122.520217, 45.535693],
      ],
    ])
  ```

&ensp;&ensp;（2）执行 `多边形相交算法`，返回相交的结果多边形要素数据

- Example:
  ```javascript
    geojson = turf.intersect(poly1, poly2)
  ```

**Step 4. <font color=red>显示分析结果</font>**：
&ensp;&ensp;&ensp;&ensp; 更新数据，将得到的相交的结果多边形要素数据添加到地图中。

- Example:
  ```javascript
    var simpledatasource = map.dataSources.add(
      Cesium.GeoJsonDataSource.load(geojson, {
        stroke: Cesium.Color.RED,
        fill: Cesium.Color.RED,
        strokeWidth: 5,
      })
    )
  ```

### 关键接口

#### 1.【客户端空间分析库】`Turf`

##### 【method】`turf.intersect(poly1,poly2)`:多边形相交

&ensp;&ensp;&ensp;&ensp; 取两个多边形并找到它们的交点。 如果他们共享边界，则返回边界；否则，返回边界。 如果它们不相交，则返回 undefined。

| 参数  | 类型                         | 描述                           |
| ----- | ---------------------------- | ------------------------------ |
| poly1 | FeatureCollection(`Polygon`) | 输入数据，用于生成第一个多边形 |
| poly2 | FeatureCollection(`Polygon`) | 输入数据，用于生成第二个多边形 |

- `intersect()`返回值

> - FeatureCollection<`Polygon`> 当共享点或线时，`返回geojson相交区要素集`.
> - null 当没有共享点时，`则返回空值`.

- Example:
  ```javascript
  var poly1 = turf.polygon([
    [
      [-122.801742, 45.48565],
      [-122.801742, 45.60491],
      [-122.584762, 45.60491],
      [-122.584762, 45.48565],
      [-122.801742, 45.48565],
    ],
  ])
  var poly2 = turf.polygon([
    [
      [-122.520217, 45.535693],
      [-122.64038, 45.553967],
      [-122.720031, 45.526554],
      [-122.669906, 45.507309],
      [-122.723464, 45.446643],
      [-122.532577, 45.408574],
      [-122.487258, 45.477466],
      [-122.520217, 45.535693],
    ],
  ])
  var intersection = turf.intersect(poly1, poly2)
  //----------建议使用下面的标准的geojson格式-----------
  var FeatureCollection = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [114.289398, 30.59418],
    },
    properties: {
      name: '面',
    },
  }
  var intersection = turf.intersect(FeatureCollection)
  ```

> 两个多边形求取交集。 如果他们共享边界，则返回边界; 如果它们不相交，则返回 undefined。

---

#### 提交 BUG

> 找到 bug 请提交[issue](https://github.com/ParnDeedlit/WebClient-Leaflet/issues)

---

#### 参数

| 参数  | 类型                         | 描述                           |
| :---- | ---------------------------- | :----------------------------- |
| poly1 | FeatureCollection(`Polygon`) | 输入数据，用于生成第一个多边形 |
| poly2 | FeatureCollection(`Polygon`) | 输入数据，用于生成第二个多边形 |

---

#### 返回值

> - FeatureCollection<`Polygon`> 当共享点或线时，`返回geojson相交区要素集`.
> - null 当没有共享点时，`则返回空值`.

---

#### 示例

```javascript
var poly1 = turf.polygon([
  [
    [-122.801742, 45.48565],
    [-122.801742, 45.60491],
    [-122.584762, 45.60491],
    [-122.584762, 45.48565],
    [-122.801742, 45.48565],
  ],
])
var poly2 = turf.polygon([
  [
    [-122.520217, 45.535693],
    [-122.64038, 45.553967],
    [-122.720031, 45.526554],
    [-122.669906, 45.507309],
    [-122.723464, 45.446643],
    [-122.532577, 45.408574],
    [-122.487258, 45.477466],
    [-122.520217, 45.535693],
  ],
])
var intersection = turf.intersect(poly1, poly2)
//----------建议使用下面的标准的geojson格式-----------
var FeatureCollection = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [114.289398, 30.59418],
  },
  properties: {
    name: '面',
  },
}
var intersection = turf.intersect(FeatureCollection)
```
