## 动态航线

### 示例功能

此功能用于动态显示两点之间的动态飞行轨迹效果。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，初始化 `Cesium.Plague()` 动态航班轨迹对象后通过该对象的 `setVisible()` 方法添加动态航班轨迹显示。

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

3. <font color=red>加载数据</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `appendGoogleMap()` 方法加载谷歌地图数据；

``` Javascript
//加载谷歌地图数据
webGlobe.appendGoogleMap('m@207000000');
```

4. <font color=red>跳转定位</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `flyTo()` 方法定位到指定点；

``` Javascript
//跳转定位
 webGlobe.flyTo(114.06, 22.54, 20000, 2);
```

5. <font color=red>创建动态航班轨迹</font>：设置动态航班轨迹必要参数，创建动态航班轨迹对象`Cesium.Plague()`；

``` Javascript
//动画效果需开启计时
webGlobe.viewer.clock.shouldAnimate = true; //开启计时
//流动纹理线
var material = null;
//绘制动态航班轨迹
var options = {
    //是否绘制动态航班线
    isAdd: false,
    //航班起始城市经纬度
    center: {
        lon: 114.302312702,
        lat: 30.598026044
    },
    //航班终点城市数组，经纬度
    cities: [
        {"lon": 115.028495718,"lat": 30.200814617},
        {"lon": 110.795000473,"lat": 32.638540762},
        {"lon": 111.267729446,"lat": 30.698151246},
        {"lon": 112.126643144,"lat": 32.058588576},
        {"lon": 114.885884938,"lat": 30.395401912},
        {"lon": 112.190419415,"lat": 31.043949588},
        {"lon": 113.903569642,"lat": 30.932054050},
        {"lon": 112.226648859,"lat": 30.367904255},
        {"lon": 114.861716770,"lat": 30.468634833},
        {"lon": 114.317846048,"lat": 29.848946148},
        { "lon": 113.371985426,"lat": 31.704988330},
        {"lon": 109.468884533,"lat": 30.289012191},
        {"lon": 113.414585069,"lat": 30.368350431},
        {"lon": 112.892742589,"lat": 30.409306203},
        {"lon": 113.160853710,"lat": 30.667483468},
        {"lon": 110.670643354,"lat": 31.748540780}
    ]
};
plague = new Cesium.Plague(webGlobe.viewer, options);
```
6. <font color=red>添加动态航班轨迹</font>：调用动态航班轨迹对象`Cesium.Plague()`的`setVisible()`方法添加动态航班轨迹显示

``` Javascript
//添加动态航班轨迹
plague.setVisible('add');
```

### 关键接口

#### 1. `Cesium.WebSceneControl(elementId, options)` : 三维视图的主要类

##### (1) `appendGoogleMap(type)` 添加地图文档

> `appendGoogleMap` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|type|String|地图类型 矢量‘m@207000000’ 影像‘s@130’ 栅格‘t@130,r@207000000 道路‘h@207000000’|

##### (2) `flyTo(lon, lat, height, duration)` 跳转到
> `flyTo` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|lon|Number|经度|
|lat|Number|纬度|
|height|Number|视角高度|
|duration|Number|跳转持续时间|

#### 2.`Cesium.Plague(viewer, options)`动态航班轨迹对象类
> `Cesium.Plague` 主要参数

|参数名|类型|说 明|
|-|-|-|
|viewer|String|放置视图的div的id|
|options|Object|(可选)三维场景中可选参数设置|

> `options` 主要参数

|参数名|类型|默认值|说明|
|-|-|-|-|
|暂无|暂无|暂无|暂无|

##### (1) `setVisible(type)` 添加态航班轨迹显示

|参数名|类型|说明|
|-|-|-|
|暂无|暂无|暂无|

