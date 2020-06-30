## 可视分析

### 示例功能

此功能用于检测当前三维场景中某个点朝一个方向看的时候可以看到的区域。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，通过Cesium三维球控件 `Cesium.WebSceneControl()` 的 `append()` 加载M3D数据后，通过Cesium三维球控件 `Cesium.WebSceneControl()` 对象的 `registerMouseEvent()` 方法在三维场景里面自定义注册鼠标事件完成可视域分析点的拾取，通过可视域分析对象 `Cesium.ViewshedAnalysis()` 实现可视域分析。

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

3. <font color=red>加载数据</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `append()` 方法传入M3D数据服务地址，即可加载浏览数据；

``` Javascript
//加载数据
var tileset = webGlobe.append('http://develop.smaryun.com:6163/igs/rest/g3d/M3D', {});
```

4. <font color=red>创建可视域分析</font>：初始化可视域分析对象 `Cesium.ViewshedAnalysis()` ; 

``` Javascript
//可视域分析
viewshed3d = new Cesium.ViewshedAnalysis(viewer.scene);
```

5. <font color=red>注册鼠标事件</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `registerMouseEvent()` 方法注册鼠标事件, 以下事例中的匿名函数为触发鼠标事件后执行的方法，完成此步后，在三维场景中点击鼠标左键可触发点击事件，点击完成后进入匿名函数；

``` Javascript
//注册事件
webGlobe.registerMouseEvent('LEFT_CLICK', function(e) {});
webGlobe.registerMouseEvent('RIGHT_CLICK', function(e) {});
webGlobe.registerMouseEvent('MOUSE_MOVE', function(e) {});
```

6. <font color=red>设置可视域分析参数</font>：给可视域分析对象设置进行可视域分析使用的必要参数；

``` Javascript
//设置观察点坐标
viewshed3d.viewPosition = cartesian;
//设置可视域结果点
viewshed3d.targetPosition = cartesian;
```

7. <font color=red>添加可视域分析</font>：将可视域分析对象 `Cesium.ViewshedAnalysis()` 添加到Cesium三维球控件中; 

``` Javascript
//添加可视域分析结果显示
viewer.scene.VisualAnalysisManager.add(viewshed3d);
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

##### (2) `registerMouseEvent(eventType, callbackFun, handler)` 注册鼠标事件方法

> `registerMouseEvent` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|eventType|String|事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮)|
|callbackFun|function|回调函数|
|handler|Object|回调函数|

##### (3) `unRegisterMouseEvent(eventType)` 注销鼠标事件方法

> `unRegisterMouseEvent` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|eventType|String|事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮)|

#### 2. `Cesium.ViewshedAnalysis()` : 可视域分析主要类

