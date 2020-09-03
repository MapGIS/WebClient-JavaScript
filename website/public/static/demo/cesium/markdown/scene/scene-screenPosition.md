## 屏幕坐标转换计算

本示例实现根据鼠标事件获取的屏幕坐标进行坐标转换与相关计算的功能，包括常用的屏幕坐标转笛卡尔坐标、屏幕坐标转经纬度、根据经纬度计算高度值。

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现。
先初始化Cesium三维球控件 `Cesium.WebSceneControl()` , 然后初始化公共方法管理类 `CesiumZondy.Manager.CommonFuncManager()` ，分别调用如下对应的方法实现屏幕坐标转换与相关计算功能。

- `screenPositionToCartesian`：屏幕坐标转为笛卡尔坐标；
- `screenPositionToCartographic`：屏幕坐标转为经纬度坐标；
- `getHeightFromDegrees`：根据经纬度计算高度值。


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

3. <font color=red>实现屏幕坐标转换与相关计算功能</font>：初始化公共方法管理类 `CesiumZondy.Manager.CommonFuncManager()` ，分别调用如下对应的方法实现屏幕坐标转笛卡尔坐标、屏幕坐标转经纬度、根据经纬度计算高度值的功能；

``` Javascript
//初始化公共方法管理类
 var commonFuncManager = new CesiumZondy.Manager.CommonFuncManager({
    viewer: webGlobe.viewer
});
//初始化鼠标事件管理类
var mouseEventManager = new CesiumZondy.Manager.MouseEventManager({
    viewer: webGlobe.viewer
});
```

- screenPositionToCartesian()
``` Javascript
//添加鼠标左键单击事件获取屏幕坐标点
mouseEventManager.registerMouseEvent("LEFT_CLICK", leftToCartesian);
function leftToCartesian(movement) {
    //将鼠标左键点击的屏幕坐标转为笛卡尔坐标
    var position = commonFuncManager.screenPositionToCartesian(movement.position);        
}
```
- screenPositionToCartographic()
``` Javascript
//添加鼠标左键单击事件获取屏幕坐标点
mouseEventManager.registerMouseEvent("LEFT_CLICK", leftToCartographic);
function leftToCartographic(movement) {
   //将鼠标左键点击的屏幕坐标转为经纬度坐标
   var result = commonFuncManager.screenPositionToCartographic(movement.position);
   let lng=Cesium.Math.toDegrees(result.longitude);//转为经度值
   let lat=Cesium.Math.toDegrees(result.latitude);//转为纬度值
}
```

- getHeightFromDegrees()
``` Javascript
//添加鼠标左键单击事件获取屏幕坐标点
 mouseEventManager.registerMouseEvent("LEFT_CLICK", leftToHeightFromDegrees);
function leftToHeightFromDegrees(movement) {
    //屏幕坐标转笛卡尔坐标
    var cartesian = webGlobe.viewer.getCartesian3Position(movement.position, cartesian);
    var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    var lng = Cesium.Math.toDegrees(cartographic.longitude);
    var lat = Cesium.Math.toDegrees(cartographic.latitude);

    //根据鼠标左键单击点经纬度计算其高度值
    var height = commonFuncManager.getHeightFromDegrees(lng, lat);
}
```

### 关键接口

#### 1. 【三维视图的主要类】 `Cesium.WebSceneControl`

#### 2. 【公共方法管理类】 `CesiumZondy.Manager.CommonFuncManager`


##### (1) `screenPositionToCartesian(position) → {Position}` 屏幕坐标转为笛卡尔坐标，返回三维笛卡尔坐标点对象（Position）

> `screenPositionToCartesian` 方法主要参数

|参数名|类型|说明|
|-|-|-|-|
|position|Position|屏幕坐标点|


##### (2) `screenPositionToCartographic(position) → {Position}` 屏幕坐标转为经纬度坐标，返回三维经纬度坐标点(单位弧度)对象（Position）

> `screenPositionToCartographic` 方法主要参数

|参数名|类型|说明|
|-|-|-|-|
|position|Position|屏幕坐标点|


##### (3) `getHeightFromDegrees(longitude, latitude) → {Number}` 根据经纬度计算高度值，返回计算的高度值（Number）

|参数名|类型|说明|
|-|-|-|-|
|longitude|Number|经度值|
|latitude|Number|纬度值|


 