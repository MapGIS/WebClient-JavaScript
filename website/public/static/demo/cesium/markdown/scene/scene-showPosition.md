## 位置信息

### 示例功能

此功能用于显示当前鼠标所在点的经纬度，高程等位置信息。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `showPosition()` 方法切换地图显示模式。

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

3. <font color=red>创建坐标显示容器</font>：创建一个用于承载显示位置信息的容器

``` html
<!--坐标容器-->
<div id="coordinateDiv" class="coordinateClass">
    <label id="coordinate_location"></label>
    <label id="coordinate_height"></label>
</div>
```

4. <font color=red>位置显示</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `showPosition()` 方法切换地图显示模式；

``` Javascript
//显示鼠标位置控件
webGlobe.showPosition('coordinate_location');
```

### 关键接口

#### 1. `Cesium.WebSceneControl(elementId, options)` : 三维视图的主要类

##### (1) `showPosition(elementId, options)` 切换场景模式

> `showPosition` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|elementId|String|要显示的div的id
|options|Object|附加属性|

> `options` 参数说明

|参数名|类型|默认值|说明|
|-|-|-|-|
|showHpr|Boolean|false|（可选）暂无|
|showSelectTileInfo|Boolean|false|（可选）显示当前鼠标所在位置拾取到的级别|
|showViewLevelInfo|Boolean|false|（可选）显示视图级别|
