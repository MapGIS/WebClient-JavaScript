## 交互式绘制

### 示例功能

此功能用于在三维球上使用鼠标完成点、线、区等图形的绘制，绘制的图形在临时图层上，绘制结果不会被保存，可应用于各个场景，满足用户在三维球上使用鼠标交互式绘制显示区域，或将此功能和其他功能混合使用，将其他功能变成交互式的功能。

### 示例实现

本示例需要使用include-cesium-local.js开发库实现。
通过几何绘制控制`CesiumZondy.Manager.EntityController`的方法实现点、线、区的添加绘制，结合三维场景鼠标事件即 `Cesium.WebSceneControl()` 对象的 `registerMouseEvent()` 方法实现鼠标交互绘制图形功能。
其中，可通过 `Cesium.DrawPolygonTool()` 在三维场景中添加交互式绘制区控件，实现交互式绘制区功能。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤：

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示，并加载一个三维模型数据；

以下分别对绘制点绘制线绘制区的实现步骤进行介绍

#### 绘制点、绘制线

3. <font color=red>注册鼠标事件</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `registerMouseEvent()` 方法注册鼠标事件, 以下示例中的匿名函数为触发鼠标事件后执行的方法，完成此步后，在三维场景中点击鼠标左键可触发点击事件，点击完成后进入匿名函数；

``` Javascript
//注册事件
webGlobe.registerMouseEvent('LEFT_CLICK', function(e) {})
```

4. <font color=red>坐标转换</font>：鼠标事件执行方法中的形参包含当前鼠标点击的一些信息,可以获取其中的position位置信息用于图形绘制，其中鼠标点击获取到的position位置坐标为屏幕坐标，需要将屏幕坐标转换为经纬度坐标进行图形绘制；

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

5. <font color=red>添加点、线实体</font>：调用几何绘制控制 `CesiumZondy.Manager.EntityController` 的 `appendPoint()` 方法/ `appendLine()` 方法传入相关经纬度坐标信息以及其他的信息添加图形，完成此步后可在三维场景中看到添加的点/线等图形；

``` Javascript
//构造几何绘制控制对象
var entityController = new CesiumZondy.Manager.EntityController({
    viewer: webGlobe.viewer
});
//添加点：经度、纬度、高程、名称、像素大小、颜色、外边线颜色、边线宽度
entityController.appendPoint(lng, lat, height, '点', 10, new Cesium.Color(1, 0, 0, 1), new Cesium.Color(1, 1, 0, 1), 2);
```

``` Javascript
//添加线：名称、点数组、线宽、线颜色、是否贴地形
entityController.appendLine('不贴地线', allPoint, 2, new Cesium.Color(1, 0, 0, 0.8), true, {});

```

6. <font color=red>注销鼠标事件</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `unRegisterMouseEvent()` 方法注销已添加的鼠标事件，完成此步后，点击鼠标不再触发鼠标事件。

``` Javascript
//注销鼠标事件
webGlobe.unRegisterMouseEvent('LEFT_CLICK');
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

##### (2) `unRegisterMouseEvent(eventType)` 注销鼠标事件方法

> `unRegisterMouseEvent` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|eventType|String|事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮)|


##### (3) `appendPoint(lat, lon, height, pName, pPixelSize, pColor, pOutlineColor, pOutlineWidth, description)` 添加点方法

> `appendPoint` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|lat|Number|经度|
|lon|Number|纬度|
|height|Number|高程|
|pName|String|名称|
|pPixelSize|Number|像素大小|
|pColor|Color|(new Cesium.Color(1, 0, 0, 1))颜色|
|pOutlineColor|Color|外边线颜色|
|pOutlineWidth|Number|边线宽度|
|description|String|属性描述信息|

##### （4）`appendLine(name, pointsArray, width, color, isGround, options)`：根据给定点画线

> `appendLine`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|name|String|名称|
|pointsArray|Array|点数组|
|width|Number|线的宽度|
|color|Color|线颜色(默认不指定时为蓝色)|
|isGround|Boolean|设置为是否贴地(可识别带高度的坐标)|
|options|Object|包含的附加属性|



#### 2. `Cesium.DrawPolygonTool(webGlobe.viewer, getDrawResult)` : 交互式绘制区工具

> `Cesium.DrawPolygonTool` 主要参数

|参数名|类型|说 明|
|-|-|-|
|viewer|View|视图|
|getDrawResult|function|回调函数|

##### (1) `activeTool()` 激活交互式绘制区工具方法
