## 交互式绘制

### 示例功能

此功能用于在三维球上使用鼠标完成点、线、区等图形的绘制，绘制的图形在临时图层上，绘制结果不会被保存，可应用于各个场景，满足用户在三维球上使用鼠标交互式绘制显示区域，或将此功能和其他功能混合使用，将其他功能变成交互式的功能。

### 示例实现

本示例需要使用include-cesium-local.js开发库实现，通过Cesium三维球控件 `Cesium.WebSceneControl()` 对象的 `registerMouseEvent()` 方法在三维场景里面自定义注册鼠标事件完成绘制点、绘制线功能，使用 `Cesium.DrawPolygonTool()` 对象在三维场景中添加交互式绘制区控件。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

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

以下分别对绘制点绘制线绘制区的实现步骤进行介绍

#### 绘制点、绘制线

3. <font color=red>注册鼠标事件</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `registerMouseEvent()` 方法注册鼠标事件, 以下事例中的匿名函数为触发鼠标事件后执行的方法，完成此步后，在三维场景中点击鼠标左键可触发点击事件，点击完成后进入匿名函数；

``` Javascript
//注册事件
webGlobe.registerMouseEvent('LEFT_CLICK', function(e) {})
```

4. <font color=red>坐标转换</font>：鼠标事件执行方法中的形参包含当前鼠标点击的一些信息,可以获取其中的position位置信息用于图形绘制，鼠标点击获取到的position位置坐标为屏幕坐标，需要将屏幕坐标转换为世界坐标，再将世界坐标转换成地理坐标（弧度）,将地理坐标（弧度）转换为经纬度坐标，最终使用经纬度坐标进行图形绘制；

``` Javascript
//屏幕坐标转世界坐标
var cartesian = webGlobe.viewer.getCartesian3Position(movement.position, cartesian);
//世界坐标转地理坐标（弧度）
var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
//地理坐标（弧度）转经纬度坐标：纬度、经度、高程
var lng = Cesium.Math.toDegrees(cartographic.longitude);
var lat = Cesium.Math.toDegrees(cartographic.latitude);
var height = cartographic.height;
```

5. <font color=red>添加点</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `appendPoint()` 方法传入相关经纬度坐标信息以及其他的信息进行添加点，完成此步后可在三维场景中看到添加的点显示出来；

``` Javascript
//添加点
webGlobe.appendPoint(lng, lat, height, '点', 10, webGlobe.getColor(1, 0, 0, 1), webGlobe.getColor(1, 1, 0, 1), 2);
```

6. <font color=red>注销鼠标事件</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `unRegisterMouseEvent()` 方法注销已添加的鼠标事件，完成此步后，点击鼠标不再触发鼠标事件。

``` Javascript
//注销鼠标事件
webGlobe.unRegisterMouseEvent('LEFT_CLICK');
```

#### 绘制区

3. <font color=red>创建交互式绘制区工具</font>：初始化 `Cesium.DrawPolygonTool()` 对象，完成交互式绘制区工具的创建；

``` Javascript
//创建交互式绘制区工具
var tool = new Cesium.DrawPolygonTool(webGlobe.viewer, getDrawResult);
```

4. <font color=red>激活交互式绘制区工具</font>：调用 `Cesium.DrawPolygonTool()` 对象的activeTool()方法，激活交互式绘制区工具，完成此步后，可在三维场景中通过鼠标左键点击绘制多边形。

``` Javascript
//激活交互式绘制区工具
tool.activeTool();
```

### 关键接口

#### 1. `Cesium.WebSceneControl(elementId, options)` : 三维视图的主要类

##### (1) `registerMouseEvent(eventType, callbackFun, handler)` 注册鼠标事件方法

> `registerMouseEvent` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|eventType|String|事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮)|
|callbackFun|function|回调函数|
|handler|Object|回调函数|

##### (2) `appendPoint(lat, lon, height, pName, pPixelSize, pColor, pOutlineColor, pOutlineWidth, description)` 添加点方法

> `appendPoint` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|lat|Number|经度|
|lon|Number|纬度|
|height|Number|高程|
|pName|String|名称|
|pPixelSize|Number|像素大小|
|pColor|Color|(webGlobe.getColor(1, 0, 0, 1))颜色|
|pOutlineColor|Color|外边线颜色|
|pOutlineWidth|Number|边线宽度|
|description|String|属性描述信息|

##### (3) `unRegisterMouseEvent(eventType)` 注销鼠标事件方法

> `unRegisterMouseEvent` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|eventType|String|事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮)|

#### 2. `Cesium.DrawPolygonTool(webGlobe.viewer, getDrawResult)` : 交互式绘制区工具

> `Cesium.DrawPolygonTool` 主要参数

|参数名|类型|说 明|
|-|-|-|
|viewer|View|视图|
|getDrawResult|function|回调函数|

##### (1) `activeTool()` 激活交互式绘制区工具方法
