## 场景出图

### 示例功能

此功能用于将当前场景输出成图片。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，初始化Cesium三维球控件 `Cesium.WebSceneControl()` 后初始化常用功能管理类 `CesiumZondy.Manager.CommonFuncManager()` ，调用常用功能管理类的 `outputImageFile()` 方法进行场景输出图片。

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

3. <font color=red>场景出图</font>：初始化常用功能管理类 `CesiumZondy.Manager.CommonFuncManager()` ，调用常用功能管理类的 `outputImageFile()` 方法进行场景输出图片；

``` Javascript
var commonFuncManager = new CesiumZondy.Manager.CommonFuncManager({
    viewer: webGlobe.viewer
});
//当前屏幕图片输出
commonFuncManager.outputImageFile("图片.png");
```

### 关键接口

#### 1. 【三维视图的主要类】 `Cesium.WebSceneControl`

#### 2. 【常用功能管理类】`CesiumZondy.Manager.CommonFuncManager`

##### (1) `outputImageFile(fileName)` 场景输出图片

> `outputImageFile` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|fileName|String|输出图片名称|
