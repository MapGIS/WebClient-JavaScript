## 三角测量

### 示例功能

本示例提供两点之间<a href="https://baike.baidu.com/item/三角测量/3333949?fr=aladdin" target="_blank">三角测量</a>功能，可测量两点之间高差、水平距离、直线距离等信息，可以应用于各个场景，满足用户在使用时对于两点之间距离的直观数据获取。

### 功能实现

本示例需要使用include-cesium-local.js开发库实现，通过初始化三角测量工具对象 `Cesium.TriangulationTool()` ，实现三角测量功能。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. <font color=red>引用开发库</font>：本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能;

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

3. <font color=red>创建三角测量工具</font>：初始化三角测量工具对象 `Cesium.TriangulationTool()` ，完成此步后可在三维场景中加载三角测量工具;

``` Javascript
//创建三角测量工具
var triangulationTool = new Cesium.TriangulationTool(webGlobe.viewer);
```

4. <font color=red>激活三角测量工具</font>：调用三角测量工具对象 `Cesium.TriangulationTool()` 的 `startTool()` 方法激活三角测量工具，完成此步后可在三维场景中使用三角测量工具;

``` Javascript
//激活三角测量工具
triangulationTool.startTool();
```

5. <font color=red>停止三角测量工具</font>：功能使用结束后调用三角测量工具对象 `Cesium.TriangulationTool()` 的 `stopTool()` 方法停止三角测量工具，完成此步后可在三维场景中停止使用三角测量工具。

``` Javascript
//停止三角测量工具
triangulationTool.stopTool();
```

### 关键接口

#### 1. 【三角测量工具主要类】`Cesium.TriangulationTool(viewer, options)`

> `Cesium.TriangulationTool` 主要参数
 
|参数名|类型|说明|
|-|-|-|
|viewer|Object|viewer对象|
|options|Object|三角测量工具可选参数设置|

> `options` 主要参数

|参数名|类型|默认值|说明|
|-|-|-|-|
|callBack|Boolean|function(){}|回调函数|
|disableDepthTestDistance|Number|Number. POSITIVE_INFINITY|只要小于这个距离深度检测就会失效，就会一直显示在最前面 不会被遮挡|

##### (1) `startTool()` 激活三角测量工具方法

##### (2) `stopTool()` 停止激活三角测量工具方法
