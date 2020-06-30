## 动态圆

### 示例功能

此功能用于在当前场景中绘制动态的圆显示效果，可应用于任意场景中。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，初始化 `Cesium.CircleScanEffect()` 动态圆对象后通过Cesium三维球控件 `Cesium.WebSceneControl()` 的`addSceneEffect()`方法添加动态圆显示。

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

3. <font color=red>加载数据</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `appendGoogleMap()` 方法加载副歌地图数据；

``` Javascript
webGlobe.appendGoogleMap('m@207000000');
```

4. <font color=red>跳转定位</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `flyTo()` 方法定位到指定点；

``` Javascript
 webGlobe.flyTo(114.06, 22.54, 20000, 2);
```

5. <font color=red>创建动态圆</font>:初始化动态圆对象 `Cesium.CircleScanEffect()` ； 

``` Javascript
//创建动态圆
 var scanEffect = new Cesium.CircleScanEffect(webGlobe.viewer, {
     center: Cesium.Cartesian3.fromDegrees(114.06, 22.54, 20),
     maxRadius: 15000,
     scanColor: new Cesium.Color(1, 0, 0, 1),
     duration: 8000
 });
```

6. <font color=red>添加动态圆</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的`addSceneEffect()`方法添加动态圆显示；

``` Javascript
//添加动态圆
webGlobe.addSceneEffect(scanEffect);
```

### 关键接口

#### 1. `Cesium.WebSceneControl(elementId, options)` : 三维视图的主要类

##### (1) `appendGoogleMap(type)` 添加地图文档

> `appendGoogleMap` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|type|String|地图类型 矢量‘m@207000000’ 影像‘s@130’ 栅格‘t@130,r@207000000 道路‘h@207000000’|

##### (2) `flyTo(lon, lat, height, duration)` 跳转到
> `flyTo` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|lon|Number|经度|
|lat|Number|纬度|
|height|Number|视角高度|
|duration|Number|跳转持续时间|


##### (3) `addSceneEffect()` 添加场景特效
> `addSceneEffect` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|url|String|事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮)|

#### 2. Cesium.CircleScanEffect():