## 卷帘分析

### 示例功能

此功能对已加载的两个M3D数据进行任意距离的剖切，动态的显示或隐藏一部分数据，一个显示的同时不显示另一个数据，打到卷帘效果。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，初始化M3D模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法加载M3D数据后，创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createDynamicCutting()` 方法创建两个M3D数据的切面对象通过设置剖切面距离进行数据剖切分析。

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
/构造M3D模型层管理对象
var m3dLayer = new CesiumZondy.Layer.M3DLayer({
    viewer: webGlobe.viewer
});
var drilllayer = m3dLayer.append(
    "http://develop.smaryun.com:6163/igs/rest/g3d/钻孔_2_钻孔模型s", {
        autoReset: false,
    }
);
//加载M3D地图文档（服务地址，配置参数）
landscapeLayer = m3dLayer.append('http://develop.smaryun.com:6163/igs/rest/g3d/钻孔分层点_Sur_000_Ent', {});
```

4. <font color=red></font>调用视图功能管理类 CesiumZondy. Manager. SceneManager() ` 的 ` flyToEx()` 方法跳转到数据显示的范围；

``` Javascript
 //初始化视图功能管理类
 var sceneManager = new CesiumZondy.Manager.SceneManager({
     viewer: webGlobe.viewer
 });
 //视点跳转
 sceneManager.flyToEx(112.94845170512113, 30.004246325952618, {
     height: 2600,
     heading: 67,
     pitch: -30,
     roll: 0
 });
```

5. <font color=red></font>创建切面对象 `Cesium.ClippingPlane()` ; 

``` Javascript
 //进行剖切分析的面，向右切
 var plane = new Cesium.ClippingPlane(new Cesium.Cartesian3(1, 0, 0), -200.0)
 //进行剖切分析的面，向左切
 var plane1 = new Cesium.ClippingPlane(new Cesium.Cartesian3(-1, 0, 0), -200.0)
```

6. <font color=red></font>创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createDynamicCutting()` 方法创建剖切对象实例, 并获取剖切切面；

``` Javascript
 //初始化分析功能管理类
 var analysisManager = new CesiumZondy.Manager.AnalysisManager({
     viewer: webGlobe.viewer
 });
 //创建剖切对象实例
 dynaCut = analysisManager.createDynamicCutting(landscapeLayer, [plane], {
     color: new Cesium.Color(0.0, 1.0, 1.0, 0.3)
 });
```

7. <font color=red></font>通过设置切面回调函数，动态设置剖切面距离完成动态剖切分析。

``` Javascript
//设置切面回调函数
planetEntity.plane.plane = new Cesium.CallbackProperty(function(date) {
    //设置剖切面距离
    plane.distance = distance;
    return Cesium.Plane.transform(plane, tileset[0].modelMatrix, new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0));
}, false);
//设置切面回调函数
planetEntity1.plane.plane = new Cesium.CallbackProperty(function(date) {
    //设置剖切面距离
    plane1.distance = distance1;
    return Cesium.Plane.transform(plane1, tileset[0].modelMatrix, new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0));
}, false);
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

#### 3. 【裁剪平面类】 `Cesium.ClippingPlane`

> `Cesium.ClippingPlane` 主要参数

|参数名|类型|说 明|
|-|-|-|
|normal|Cartesian3|法线|
|distance|Number|最短距离|

#### 4.【分析功能管理类】 `CesiumZondy.Manager.AnalysisManager`

##### (1) `createDynamicCutting(tileSets, planes, options)` 创建动态剖切实例

> `createDynamicCutting` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|tileSets|Object|图层集|
|planes|Object|平面集|
|options|Object|暂无|

