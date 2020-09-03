## 场景基本操作

### 示例功能

本示例实现场景的基本操作功能，包括场景视图缩放、复位、三维球自转、设置天空盒等。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现。
先初始化Cesium三维球控件 `Cesium.WebSceneControl()` , 然后初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用视图功能管理类的如下几个方法分别实现对应的场景操作功能。

- `zoomIn`：放大；
- `zoomOut`：缩小；
- `goHome`：复位；
- `openRotation`：开启自转；
- `closeRotation`：关闭自转；
- `changeSkyBox`：修改天空盒。

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

3. <font color=red>实现场景操作功能</font>：初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，根据具体场景操作需求选择调用视图功能管理类的对应方法实现；

``` Javascript
//初始化视图功能管理类
var sceneManager = new CesiumZondy.Manager.SceneManager({
    viewer: webGlobe.viewer
});
```
- zoomin()
``` Javascript
sceneManager.zoomin();//放大
```
- zoomout()
``` Javascript
 sceneManager.zoomout();//缩小
```
- goHome()
``` Javascript
 sceneManager.goHome();//复位
```
- openRotation()与closeRotation()
``` Javascript
sceneManager.openRotation();//开启自转
ceneManager.closeRotation();//关闭自转
```
- changeSkyBox()
``` Javascript
 var skybox = new Cesium.SkyBox({
    sources: {
        positiveX: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/front.jpg',
        negativeX: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/back.jpg',
        positiveY: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/left.jpg',
        negativeY: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/right.jpg',
        positiveZ: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/top.jpg',
        negativeZ: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/bottom.jpg'
     }
});
 sceneManager.changeSkyBox(skybox);
```

### 关键接口

#### 1. 【三维视图的主要类】 `Cesium.WebSceneControl`

#### 2. 【视图功能管理类】 `CesiumZondy.Manager.SceneManager`

##### (1) `zoomIn()` 放大
##### (2) `zoomOut()` 缩小
##### (3) `goHome()` 复位
##### (4) `openRotation()` 开启自转
##### (5) `closeRotation()` 关闭自转
##### (6) `changeSkyBox(skybox)` 修改天空盒

> `changeSkyBox` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|skybox|SkyBox,即Cesium.SkyBox对象|天空盒对象|
