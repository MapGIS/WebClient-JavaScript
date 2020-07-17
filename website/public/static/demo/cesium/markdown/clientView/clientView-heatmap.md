## 热力图

### 示例功能

此功能用于在当前三维场景中添加热力图显示效果。初始化Cesium三维球控件 `Cesium.WebSceneControl()` , 创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createHeatMap()` 方法添加热力图。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，

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

3.<font color=red>添加热力图</font>创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createHeatMap()` 方法添加热力图。

``` Javascript
var analysisManager = new CesiumZondy.Manager.AnalysisManager({
    viewer: webGlobe.viewer
})
//创建热力图（范围、最大值、最小值）
var instance = analysisManager.createHeatMap(bounds, valueMin, valueMax, data, options);
```

### 关键接口

#### 1. `Cesium.WebSceneControl(elementId, options)` : 三维视图的主要类

#### 2.【分析功能管理类】 `CesiumZondy.Manager.AnalysisManager`

##### (1) `createHeatMap(bounds, minValue, maxValue, data, options)` 创建热力图

> `createHeatMap` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|bounds|object|：WGS84 bounding box {north, east, south, west}|
|maxValue|Number|最大值|
|minValue|Number|最小值|
|data|Array.<Array>|Array<[{'x':, 'y':, 'value':}]>|
