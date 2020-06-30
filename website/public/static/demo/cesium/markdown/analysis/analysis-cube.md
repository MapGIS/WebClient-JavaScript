## 填挖方计算

### 示例功能

此功能提供用于计算将一定范围内的地形填平到某一高度时，需要挖开或填充的空间体积，可以应用于智慧城市，地质，公安等多个领域的业务功能，实用性强。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，通过Cesium三维球控件 `Cesium.WebSceneControl()` 的 `append()` 方法加载M3D数据后，初始化 `Cesium.DrawElement()` 对象在三维场景中添加交互式绘制区控件用来界定量算区域，初始化 `Cesium.CutFillAnalyzeC()` 对象创建填挖方分析对象。

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

3. <font color=red>创建交互式绘制工具</font>：初始化 `Cesium.DrawElement()` 对象，完成交互式绘制工具的创建；

``` Javascript
//创建交互式绘制工具
var drawElement = new Cesium.DrawElement(webGlobe.viewer);
```

4. <font color=red>激活交互式绘制区工具</font>：调用 `Cesium.DrawElement()` 对象的startDrawingPolygon()方法，激活交互式绘制区工具，完成此步后，可在三维场景中通过鼠标左键点击绘制多边形。

``` Javascript
//激活交互式绘制区工具
drawElement.startDrawingPolygon();
```

5. <font color=red>创建填挖方分析</font>：初始化创建填挖方分析对象 `Cesium.CutFillAnalyzeC()` 对象

``` Javascript
//创建填挖方分析
var cutFill = new Cesium.CutFillAnalyzeC(viewer, {
    callBack: callFillCut
});
```

6. <font color=red>传入必要参数</font>：给填挖方分析对象 `Cesium.CutFillAnalyzeC()` 传入填挖方分析时使用的参数, 并获取 `getMinAndMaxCartesian` 属性

``` Javascript
 cutFill.xPaneNumber = xPaneNum;
 cutFill.yPaneNumber = yPaneNum;
 cutFill.height = Height;
 cutFill._pointsPolygon = positions;
 var minMax = cutFill.getMinAndMaxCartesian();
```

7. <font color=red>执行填挖方分析</font>：调用填挖方分析对象 `Cesium.CutFillAnalyzeC()` 的 `start()` 方法开始填挖方分析

``` Javascript
//执行填挖方分析
cutFill.start(minMax);
```

### 关键接口

#### 1. `Cesium.WebSceneControl(elementId, options)` : 三维视图的主要类

##### (1) `append(url, options, 代理)` 添加地图文档

> `append` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|url|String|事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮)|
|options|Object|可选参数|
|代理|DefaultProxy|暂无|

> `options` 主要参数

|参数名|类型|默认值|说明|
|-|-|-|-|
|autoReset|Boolean|true|(可选)是否自动定位|
|synchronous|Boolean|true|(可选)是否异步请求|
|loaded|function|function|(可选)回调函数|

#### 2.Cesium.DrawElement(webGlobe.viewer):

#### 3.Cesium.CutFillAnalyzeC(viewer,options):
