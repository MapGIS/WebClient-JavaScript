## 贝塞尔曲线 bezierspline

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例用于针对给定的线生成对应的贝塞尔曲线。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，过 Cesium 三维球控件 `Cesium.WebSceneControl()` 加载三维场景控件后使用 `Turf.js` 空间分析库的 `bezierSpline()` 方法对指定线进行贝塞尔曲线分析。

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

**Step 3. <font color=red>执行贝塞尔曲线分析</font>**：
&ensp;&ensp;&ensp;&ensp;创建一条线， `Turf.js` 空间分析库的 `bezierSpline()` 方法对该线进行贝塞尔曲线分析；

- Example:
  ```Javascript
    line = turf.lineString([
      [-76.091308, 18.427501],
      [-76.695556, 18.729501],
      [-76.552734, 19.40443],
      [-74.61914, 19.134789],
      [-73.652343, 20.07657],
      [-73.157958, 20.210656]
    ]);
    geojson = turf.bezierSpline(line);
  ```

**Step 4. <font color=red>显示分析结果</font>**：
&ensp;&ensp;&ensp;&ensp;将线和经过贝塞尔曲线分析得到的线显示出来。

- Example:
  ```Javascript
    //添加线显示
    var routedatasource = map.dataSources.add(Cesium.GeoJsonDataSource.load(line, {
      //线颜色
      stroke: Cesium.Color.GRAY,
      //填充色
      fill: Cesium.Color.GRAY,
      //线宽
      strokeWidth: 5
    }));
    //添加贝兹曲线显示
    var simpledatasource = map.dataSources.add(Cesium.GeoJsonDataSource.load(geojson, {
      //线颜色
      stroke: Cesium.Color.RED,
      //填充色
      fill: Cesium.Color.RED,
      //线宽
      strokeWidth: 5
    }));
    //跳转至显示线的区域
    map.flyTo(routedatasource);
  ```

#### 参数

#### 1.【客户端空间分析库】`Turf`

##### 【method】`turf.bezierSpline(line)`:根据输入线生成贝塞尔曲线

| 参数 | 类型                    | 描述                       |
| :--- | ----------------------- | :------------------------- |
| line | GeoJSON< `LineString` > | 输入线, 用于生成贝塞尔曲线 |
