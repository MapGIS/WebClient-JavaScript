## 贝塞尔曲线 bezierspline

### 示例功能

本示例用于针对给定的线生成对应的贝塞尔曲线

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，过Cesium三维球控件 `Cesium.WebSceneControl()` 加载三维场景控件后使用 `Turf.js` 空间分析库的 `bezierSpline()` 方法对指定线进行贝塞尔曲线分析。

### 实现步骤：

1. <font color=red>引用开发库</font>：本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

2. <font color=red>创建三维地图容器并加载三维球控件</font>：创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

``` Javascript
//构造三维视图类（视图容器div的id，三维视图设置参数）
var webGlobe = new Cesium.WebSceneControl('GlobeView', {
    terrainExaggeration: 1,
});
```

``` html
<div id='GlobeView'></div>
```

3.  <font color=red>执行贝塞尔曲线分析</font>：创建一条线， `Turf.js` 空间分析库的 `bezierSpline()` 方法对该线进行贝塞尔曲线分析；

``` Javascript
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

 4. <font color=red>显示分析结果</font>：将线和经过贝塞尔曲线分析得到的线显示出来；

``` Javascript
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

2. `turf.lineString(line)`方法
|参数	|类型	|描述|
|:---|---|:---|
|line|	GeoJSON< `LineString` >	|输入线, 用于生成贝塞尔曲线|
