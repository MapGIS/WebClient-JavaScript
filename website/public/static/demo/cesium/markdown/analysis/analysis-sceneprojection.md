## 场景投放

### 示例功能

此功能用于在三维场景中加载色块、图片、视屏等功能。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，初始化M3D模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法加载M3D数据后，通过Cesium三维球控件 `Cesium.WebSceneControl()` 对象的 `registerMouseEvent()` 方法在三维场景里面自定义注册鼠标事件完成场景投放点的拾取，初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createSceneProjector` 方法创建场景投放示例，实现场景投影分析。

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

3. <font color=red>加载数据</font>：初始化M3D模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法传入M3D数据服务地址，即可加载浏览数据；

``` Javascript
//构造M3D模型层管理对象
var m3dLayer = new CesiumZondy.Layer.M3DLayer({
    viewer: webGlobe.viewer
});
//加载M3D地图文档（服务地址，配置参数）
landscapeLayer = m3dLayer.append('http://develop.smaryun.com:6163/igs/rest/g3d/ZondyModels', {});
```

4.  <font color=red>创建场景投影对象</font>：初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createSceneProjector` 方法创建场景投放示例; 

``` Javascript
//初始化高级分析功能管理类
var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
    viewer: viewer
});
//初始化场景投影对象
scenePro = advancedAnalysisManager.createSceneProjector(2);
```

5. <font color=red>注册鼠标事件</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `registerMouseEvent()` 方法注册鼠标事件, 以下事例中的匿名函数为触发鼠标事件后执行的方法，完成此步后，在三维场景中点击鼠标左键可触发点击事件，点击完成后进入匿名函数；

``` Javascript
//注册事件
webGlobe.registerMouseEvent('LEFT_CLICK', function(e) {});
webGlobe.registerMouseEvent('RIGHT_CLICK', function(e) {});
```

6. <font color=red>设置场景投影参数</font>：给场景投影对象设置进行场景投影使用的必要参数；

``` Javascript
//设置投影观察点
scenePro.viewPosition = cartesian;
//数据url路径
scenePro.textureSource = './static/data/picture/world.jpg';
//设置场景投影结果点
scenePro.targetPosition = cartesian;
```

### 关键接口

#### 1.【三维视图的主要类】 `Cesium.WebSceneControl`

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

#### 2.【M3D模型层管理类】 `CesiumZondy.Layer.M3DLayer`

##### (1) `append(url, options)` 添加M3D地图文档

> `append` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|url|String|事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮)|
|options|Object|可选参数|

> `options` 主要参数

|参数名|类型|默认值|说明|
|-|-|-|-|
|autoReset|Boolean|true|(可选)是否自动定位|
|synchronous|Boolean|true|(可选)是否异步请求|
|loaded|function|function|(可选)回调函数|
|proxy|DefaultProxy|defaultProxy|代理|
|showBoundingVolume|Boolean|false|是否显示包围盒|
|maximumScreenSpaceError|Number|16|用于控制模型显示细节|

#### 3.【高级分析功能管理类】CesiumZondy. Manager. AdvancedAnalysisManager

##### (1) `createSceneProjector(type) ` 创建场景投放实例

> `createSceneProjector` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|type|Number|场景投放的类型|
