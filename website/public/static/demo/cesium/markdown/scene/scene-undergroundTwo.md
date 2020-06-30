## 地下模式二

### 示例功能

此功能用于开启地下模式。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，通过修改Cesium三维球控件 `Cesium.WebSceneControl()` 的参数来实现。

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

3.  <font color=red>修改参数</font>：修改Cesium三维球控件 `Cesium.WebSceneControl()` 的视图对象的scene参数

``` Javascript
webGlobe.viewer.scene.skyAtmosphere.show = false;
webGlobe.viewer.scene.skyAtmosphere.showGroundAtmosphere = false;
webGlobe.viewer.scene.enableTransparent = true;
webGlobe.viewer.scene.baseColor = new Cesium.Color(1, 1, 1, 0.0001);
webGlobe.viewer.scene.globe.imageryLayers.get(0).alpha = 0;
webGlobe.viewer.scene.globe.imageryLayers.get(1).alpha = 0;
```

### 关键接口

#### 1. `Cesium.WebSceneControl(elementId, options)` : 三维视图的主要类
