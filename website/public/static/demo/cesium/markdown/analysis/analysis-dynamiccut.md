## 动态剖切

### 示例功能

此功能对已加载的M3D数据进行任意距离的剖切，动态的显示或隐藏一部分数据。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，通过Cesium三维球控件 `Cesium.WebSceneControl()` 的 `append()` 方法加载M3D数据后，创建 `Cesium.ClippingPlane()` 切面对象，调用 `Cesium.WebSceneControl()` 的 `createDynamicCutting()` 方法创建切面对象通过设置剖切面距离进行数据剖切分析。

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

3. <font color=red>加载数据</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `append()` 方法传入M3D数据服务地址，即可加载浏览数据；

``` Javascript
var tileset = webGlobe.append('http://develop.smaryun.com:6163/igs/rest/g3d/ModelM3D', {});
```

4. <font color=red>跳转定位</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `flyToEx()` 方法跳转到数据显示的范围；

``` Javascript
//跳转定位
webGlobe.flyToEx(0.0007, -0.002, {
    height: 200,
    heading: 0,
    pitch: -30
});
```

5. <font color=red>创建切面</font>：初始化切面对象 `Cesium.ClippingPlane()` ; 

``` Javascript
//进行剖切分析的面，从上往下切，Cesium.Cartesian3中第一个参数是左右，第二个参数是前后，第三个参数是上下
var plane = new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -1.0), -500.0)
```

6. <font color=red>获取剖切切面</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `createDynamicCutting()` 方法创建剖切对象, 并获取剖切切面；

``` Javascript
 //创建剖切对象
 dynaCut = webGlobe.createDynamicCutting(tileset, [plane], {
     color: new Cesium.Color(0.0, 1.0, 1.0, 0.3)
 });
 //获取剖切切面
 planetEntity = dynaCut.planes[0];
```

7. <font color=red>设置剖切面距离</font>：通过设置切面回调函数，动态设置剖切面距离完成动态剖切分析。

``` Javascript
//设置切面回调函数
planetEntity.plane.plane = new Cesium.CallbackProperty(function(date) {
    //设置剖切面距离
    plane.distance = distance;
    return Cesium.Plane.transform(plane, tileset[0].modelMatrix, new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0));
}, false);
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

##### (2) `createDynamicCutting(tileSet, planes, interaction)` 

> `createDynamicCutting` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|tileSet|Object	||
|planes|Object||
|interaction|Boolean|交互|

#### 2. `Cesium.ClippingPlane(normal, distance)` :裁剪平面类
> `Cesium.ClippingPlane` 主要参数

|参数名|类型|说 明|
|-|-|-|
|normal|Cartesian3|法线|
|distance|Number|最短距离|
