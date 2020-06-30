## 爆炸分析

### 示例功能

此功能用于将M3D数据爆炸分析，将数据朝指定炸开。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，通过Cesium三维球控件 `Cesium.WebSceneControl()` 的 `append()` 加载M3D数据后，调用Cesium三维球控件 `Cesium.WebSceneControl()`的`createExplosion()`方法爆炸模型。

### 实现步骤：

1. <font color=red></font>引用开发库：本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

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

3. <font color=red>加载数据</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `append()` 方法传入M3D数据服务地址，即可加载浏览数据；

``` Javascript
//加载数据
var tileset = webGlobe.append('http://develop.smaryun.com:6163/igs/rest/g3d/M3D', {});
```

4. <font color=red>爆炸模型</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()`的`createExplosion()`方法爆炸模型

``` Javascript
//爆炸模型
var option = {
    // 返回的图层子节点
    children: tileset[0].root.children,
    // 爆炸中心
    center: tileset[0].boundingSphere.center,
    // 整体爆炸，(1.0, 0.0, 0.0)沿X轴方向。(0.0,1.0,0.0)沿Y轴方向，(0.0, 0.0, 1.0)沿Z轴方向
    direction: new Cesium.Cartesian3(1.0, 0.0, 0.0),
    // 爆炸距离
    distance: 50
};
webGlobe.createExplosion(option);
```

### 关键接口
#### 1. `Cesium.WebSceneControl(elementId, options)` : 三维视图的主要类

##### (1) `append(url, options, 代理)` 添加地图文档

> `append` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|url|String|事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮)|
|options|Object|可选参数|
|代理|DefaultProxy|暂无|

> `options` 主要参数

|参数名|类型|默认值|说明|
|-|-|-|-|
|autoReset|Boolean|true|(可选)是否自动定位|
|synchronous|Boolean|true|(可选)是否异步请求|
|loaded|function|function|(可选)回调函数|

##### (2) `createExplosion(options)` 

> `options` 主要参数

|参数名|类型|说明|
|---|---|---|
|暂无|暂无|暂无|
