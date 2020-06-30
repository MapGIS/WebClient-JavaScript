## 开挖深度

### 示例功能

此功能对已加载的M3D数据进行任意距离深度开挖，动态的显示或隐藏一部分数据。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，通过Cesium三维球控件 `Cesium.WebSceneControl()` 的 `append()` 方法加载M3D数据后，创建 `Cesium.ClippingPlane()` 切面对象，调用 `Cesium.WebSceneControl()` 的 `createExcavateAnalysis()` 方法创建开挖分析对象通过设置剖切面距离进行数据开挖分析。

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
//加载数据
var tileset = webGlobe.append('http://develop.smaryun.com:6163/igs/rest/g3d/M3D', {});
```

4. <font color=red>创建切面</font>：初始化切面对象 `Cesium.ClippingPlane()` ; 

``` Javascript
 //开挖面设置,这五个面分别表示前后左右，底面，其中底面用于控制开挖深度
 var clippingPlanes = [
     new Cesium.ClippingPlane(new Cesium.Cartesian3(3, 0.0, 0.0), -1500.0),
     new Cesium.ClippingPlane(new Cesium.Cartesian3(-3, 0.0, 0.0), -1500.0),
     new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 3, 0.0), -1500.0),
     new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, -3, 0.0), -1500.0),
     new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -5), 0.0)
 ]
```

5. <font color=red>创建开挖分析</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `createExcavateAnalysis()` 方法创建开挖分析对象, 并获取剖切切面；

``` Javascript
 // 经纬度用于设置开挖区域的中心点，用于控制挖那一部分的模型数据
 dynaCut = webGlobe.createExcavateAnalysis({
     //模型
     tileSet: tileset[0],
     //开挖面设置
     planes: clippingPlanes,
     //开挖颜色c
     material: new Cesium.Color(0.2, 0.4, 0.3, 0.7),
     edgeWidth: 3,
     //开挖坐标
     longitude: 0.0737,
     latitude: -0.2049,
     height: 0
 });
 // 设置开挖的动态效果
 planetEntity = dynaCut.planes[0];
```

6. <font color=red>设置剖切面距离</font>：通过设置切面回调函数，动态设置剖切面距离完成动态剖切分析。

``` Javascript
planetEntity.plane.plane = new Cesium.CallbackProperty(function(date) {
    for (var i = 0; i < planes.length; i++) {
        if (i === planes.length - 1) {
            var plane = planes[i];
            plane.distance = distance;
            Cesium.Plane.transform(plane, transform, new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0));
        }
    }

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

##### (2) `createExcavateAnalysis(options)` 

> `options` 主要参数

|参数名|类型|说明|
|---|---|---|
|tileSet|模型|如果是数组的话，请选择数组中的某一个|
|planes|clippingPlanes|切割面|
|material|Color或者纹理|材质 或者 Cesium. Color|
|edgeColor|Cesium. Color|边线颜色|
|edgeWidth|数值型|边线宽度|
|unionClippingRegions|裁剪的方向|默认false，内裁剪方式|
|longitude|数值型|切面的经度|
|latitude|数值型|切面的纬度|
|height|数值型|切面默认高度|

#### 2. `Cesium.ClippingPlane(normal, distance)` :裁剪平面类
> `Cesium.ClippingPlane` 主要参数

|参数名|类型|说 明|
|-|-|-|
|normal|Cartesian3|法线|
|distance|Number|最短距离|
