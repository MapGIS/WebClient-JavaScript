## 场景视图模式

### 示例功能

场景视图模式提供三种模式：三维球面模式、三维平面模式、二维地图模式，在实际应用中可根据具体应用场景设置。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，初始化Cesium三维球控件 `Cesium.WebSceneControl()` 后初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用视图功能管理类的 `changeSceneMode()` 方法切换地图显示模式。

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

3. <font color=red>模式切换</font>：初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用视图功能管理类的 `changeSceneMode()` 方法切换地图显示模式；

``` Javascript
//初始化视图功能管理类
var sceneManager = new CesiumZondy.Manager.SceneManager({
    viewer: webGlobe.viewer
});
let mode = document.getElementById("modeSelect").value;
//根据选择切换场景视图模式
if (mode == '3D') {
    //切换场景模式为三维球面
    sceneManager.changeSceneMode('3D', 1);

} else if (mode === '3DC') {
    //切换场景模式为三维平面
    sceneManager.changeSceneMode('COLUMBUS_VIEW', 1);

} else if (mode === '2D') {
    //切换场景模式为二维地图
    sceneManager.changeSceneMode('2D', 1);
} 

```

### 关键接口

#### 1. 【三维视图的主要类】 `Cesium.WebSceneControl`

#### 2. 【视图功能管理类】 `CesiumZondy.Manager.SceneManager`

##### (1) `changeSceneMode(sceneMode, duration)` 切换场景模式

> `changeSceneMode` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|sceneMode|String|场景模式'3D', '2D', 'COLUMBUS_VIEW'(平面三维)|
|duration|Number|动画持续时间，<=0时，保持场景范围不变|
