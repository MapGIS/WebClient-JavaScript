## 洪水淹没分析

### 示例功能

此功能用于在三维场景中添加洪水淹没的效果。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，通过Cesium三维球控件 `Cesium.WebSceneControl()` 的 `append()` 加载M3D数据后，添加交互式绘制工具 `Cesium.DrawPolygonTool()` 选择绘制区域, 创建洪水淹没分析对象 `Cesium.FloodAnalysis()` 后，将结果显示到三维球控件上。

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

6. <font color=red>统一高度</font>：将交互式选取的点的高度统一；

``` Javascript
var array = new Array();
for (let i = 0; i < e.points.length; i++) {
    let point = e.points[i];
    let resPoint = new Cesium.Cartesian3;
    let invserTran = new Cesium.Matrix4;
    Cesium.Matrix4.inverse(tileset[0].root.transform, invserTran);
    Cesium.Matrix4.multiplyByPoint(invserTran, point, resPoint);
    array.push(new Cesium.Cartesian3(resPoint.x, resPoint.y, resPoint.z));
}
var hight = null;
for (var arraylength = 0; arraylength < array.length; arraylength++) {
    hight = hight < array[arraylength].z ? array[arraylength].z : hight;
}
var newArray = new Array();
for (var arraylength = 0; arraylength < array.length; arraylength++) {
    array[arraylength].z = hight;
    let point = array[arraylength];
    let resPoint = new Cesium.Cartesian3;
    let invserTran = new Cesium.Matrix4;
    Cesium.Matrix4.multiplyByPoint(tileset[0].root.transform, point, resPoint);
    newArray.push(new Cesium.Cartesian3(resPoint.x, resPoint.y, resPoint.z));
}
```

7. <font color=red>创建洪水淹没分析</font>：初始化洪水淹没分析对象 `Cesium.FloodAnalysis()` , 并传入洪水淹没分析使用的参数

``` Javascript
//初始化洪水淹没分析类
flood = new Cesium.FloodAnalysis(webGlobe.scene);
//设置洪水淹没分析区域点集
flood.dotsList = newArray;
//设置洪水淹没区域最底高度
flood.minHeight = 0;
//设置洪水淹没区域最高高度
flood.maxHeight = 500;
//设置洪水上涨速度
flood.floodSpeed = 50;
//水纹频率 指波浪的个数
flood.frequency = 1000;
//水纹速度
flood.animationSpeed = 0.01;
//水波的高度
flood.amplitude = 10.0
//指定水面颜色 和 透明度
flood.floodColor = new Cesium.Color(0.2, 0.5, 0.4, 0.7);
// 指定光线强度
flood.specularIntensity = 3.0;
```

8. <font color=red>洪水淹没结果显示</font>：将结果显示到三维球控件上

``` Javascript
//添加洪水淹没结果显示
webGlobe.scene.VisualAnalysisManager.add(flood);
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

#### 2. `Cesium.DrawPolygonTool(webGlobe.viewer, getDrawResult)` : 交互式绘制区工具

> `Cesium.DrawPolygonTool` 主要参数

|参数名|类型|说 明|
|-|-|-|
|viewer|View|视图|
|getDrawResult|function|回调函数|

##### (1) `activeTool()` 激活交互式绘制区工具方法

#### 3. `Cesium.FloodAnalysis(scene)` : 洪水淹没分析对象
