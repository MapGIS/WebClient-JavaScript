## 计算面积

### 示例功能

本示例提供用于计算绘制区面积的功能，可以应用于各个场景，满足用户在使用时进行区域面积等业务需求。

### 示例实现

本示例需要使用include-cesium-local.js开发库实现，通过初始化面积计算工具对象 `Cesium.MeasureAreaTool()` ，实现面积计算功能。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

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

3. <font color=red>创建面积计算工具对象</font>：初始化面积计算工具对象 `Cesium.MeasureAreaTool()` ，完成此步后可在三维场景中加载面积计算工具；

``` Javascript
//初始化面积计算工具对象
var measureAreaTool = new Cesium.MeasureAreaTool(webGlobe.viewer);
```

4. <font color=red>激活面积计算工具</font>：调用面积计算工具对象 `Cesium.MeasureAreaTool()` 的 `startTool()` 方法激活面积计算工具，完成此步后可在三维场景中使用面积计算工具；

``` Javascript
//激活面积计算工具
measureAreaTool.startTool();
```

5. <font color=red>停止面积计算工具</font>：功能使用结束后调用面积计算工具对象 `Cesium.MeasureAreaTool()` 的 `stopTool()` 方法停止面积计算工具，完成此步后可在三维场景中停止使用面积计算工具。

``` Javascript
//停止面积计算工具
measureAreaTool.stopTool();
```

### 关键接口

#### 1. 【面积测量工具主要类】`Cesium.MeasureAreaTool(viewer, options)`

> `Cesium.MeasureAreaTool` 主要参数

|参数名|类型|说明|
|-|-|-|-|
|viewer|Object|viewer对象|
|options|Object|(可选)面积测量工具可选参数设置|

> `options` 主要参数

|参数名|类型|默认值|说明|
|-|-|-|-|
|callBack|Boolean|function(){}|(可选)回调函数|
|exHeight|Number|0|(可选)附加高程偏移 （避免遮挡）|
|disableDepthTestDistance|Number|Number. POSITIVE_INFINITY|(可选)只要小于这个距离深度检测就会失效，就会一直显示在最前面 不会被遮挡|

##### (1)`startTool()` 激活面积计算工具方法

##### (2)`stopTool()` 停止激活面积计算工具方法
