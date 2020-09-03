## 设置当前视图范围

本示例实现根据鼠标事件获取的屏幕坐标进行坐标转换与相关计算的功能，包括常用的屏幕坐标转笛卡尔坐标、屏幕坐标转经纬度、根据经纬度计算高度值。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现。
先初始化Cesium三维球控件 `Cesium.WebSceneControl()` , 然后初始化场景视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用setView()方法实现设置当前视图范围功能。


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

3. <font color=red>实现设置当前视图范围功能</font>：初始化场景视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用setView()方法实现设置当前视图范围功能。

``` Javascript
//初始化视图功能管理类
 var sceneManager = new CesiumZondy.Manager.SceneManager({
    viewer: webGlobe.viewer
});
//设置当前视图范围
sceneManager.setView(114.40298522106733, 30.465568703723072, 100.85856618500283, -45.4940479913348135, -15, 0);
```


### 关键接口

#### 1. 【三维视图的主要类】 `Cesium.WebSceneControl`

#### 2. 【视图功能管理类】 `CesiumZondy.Manager.SceneManager`


##### (1) `setView(lon, lat, height, curHeading, curPitch, curRoll)` 设置当前视图范围

> `setView` 方法主要参数

|参数名|类型|说明|
|-|-|-|-|
|lon|Number|经度|
|lat|Number|纬度|
|height|Number|高度|
|curHeading|Number|绕垂直于地心的轴旋转的度数|
|curPitch|Number|绕纬度线旋转度数|
|curRoll|Number|绕经度线旋转度数|



