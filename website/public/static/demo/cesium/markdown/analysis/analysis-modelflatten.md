## 模型压平

### 示例功能

此功能用于将加载完成的M3D数据进行压平处理。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ， 初始化M3D模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法加载M3D数据后，添加交互式绘制工具 `Cesium.DrawPolygonTool()` 选择绘制区域, 初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createModelFlatten()` 方法，创建模型压平分析，将结果显示到三维球控件上。

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

4. <font color=red>创建交互式绘制区工具</font>：初始化 `Cesium.DrawPolygonTool()` 对象，完成交互式绘制区工具的创建；

``` Javascript
//创建交互式绘制区工具
var drawPolygon = new Cesium.DrawPolygonTool(webGlobe.viewer, getDrawResult);
```

5. <font color=red>激活交互式绘制区工具</font>：调用 `Cesium.DrawPolygonTool()` 对象的activeTool()方法，激活交互式绘制区工具，完成此步后，可在三维场景中通过鼠标左键点击绘制多边形。

``` Javascript
//激活交互式绘制区工具
drawPolygon.activeTool();
```

6. <font color=red>顶点处理</font>：将交互式选取的点处理；

``` Javascript
/*对绘制区域的顶点循环处理一下，以便用于模型压平参数的赋值*/
var array = [];
for (let i = 0; i < positionsArray.length; i++) {
    let point = positionsArray[i];
    let resPoint = new Cesium.Cartesian3;
    let invserTran = new Cesium.Matrix4;
    Cesium.Matrix4.inverse(tileset[0]._root.transform, invserTran);
    Cesium.Matrix4.multiplyByPoint(invserTran, point, resPoint);
    resPoint.y = -resPoint.y;
    array.push(new Cesium.Cartesian2(resPoint.x, resPoint.y));
}
array.push(array[0]);
```

7. <font color=red>创建模型压平分析</font>： 初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createModelFlatten()` 方法，创建模型压平分析

``` Javascript
//初始化高级分析功能管理类
var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
    viewer: webGlobe.viewer
});
advancedAnalysisManager.createModelFlatten(landscapeLayer[0], {
    //是否进行压平。值为true时执行压平
    isFlatten: true,
    //将高度压到0
    height: 0,
    //压平多边形的顶点序列长度
    arrayLength: positionsArray.length,
    //顶点序列。顶点序列需要闭合，也就是说，例如一个矩形是四个顶点ABCD，那序列就应该是【ABCDA】
    array: array
});
```

8. <font color=red>结果显示</font>：将结果显示到三维球控件上

``` Javascript
//场景渲染（渲染最新的压平效果）
webGlobe.viewer.scene.requestRender();
```

### 关键接口

#### 1.【三维视图的主要类】 `Cesium.WebSceneControl`

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

#### 3. 【交互式绘制区工具类】 `Cesium.DrawPolygonTool`

> `Cesium.DrawPolygonTool` 主要参数

|参数名|类型|说 明|
|-|-|-|
|viewer|View|视图|
|getDrawResult|function|回调函数|

##### (1) `activeTool()` 激活交互式绘制区工具方法

#### 4.【高级分析功能管理类】CesiumZondy. Manager. AdvancedAnalysisManager

##### (1) `createModelFlatten(tileset, options)` 创建模型压平分析实例


|参数名|类型|说 明|
|-|-|-|
|tileset|object|图层信息|
|options|object|参数设置|

> `options` 主要参数

|参数名|类型|说 明|
|-|-|-|
|isFlatten|Boolean|是否执行模型压平|
|height|Number|压平到指定高度|
|arrayLength|Number|压平区域顶点数组长度|
|array|Array|压平区域顶点数组|