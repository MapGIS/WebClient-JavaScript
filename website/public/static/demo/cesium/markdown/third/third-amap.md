## 加载高德地图

### 示例功能

本示例对接高德地图服务，实现在三维场景中加载高德地图，坐标系为EPSG:3857，即Web墨卡托坐标系，网络为公网地址。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendGaodeMap()`方法，以此来加载高德地图。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

> 特别说明：使用高德地图请注意`藏南`与`南海九段线`问题，建议使用天地图。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建布局：创建`id='GlobeView'`的div作为三维视图的容器，并设置其样式；

3. 构造三维场景控件：实例化`Cesium.WebSceneControl`对象，完成此步骤后可在三维场景中加载三维球控件；

   ``` javascript
   //构造三维视图对象（视图容器div的id，三维视图设置参数）
   var webGlobe = new Cesium.WebSceneControl('GlobeView', {});
   ```

4. 加载数据：调用`appendGaodeMap()`方法加载高德地图，配置不同参数可加载不同类型地图，如矢量：'vec'、影像：'img'、道路：'raod'。

    ``` javascript
    //添加高德地图
    webGlobe.appendGaodeMap({type:'vec'});
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`new WebSceneControl(elementId, options)`：三维场景控件构造函数

> `WebSceneControl`构造函数主要参数

|参数名|类 型|说 明|
|-|-|-|
|elementId|Element \| String|放置视图的div的id|
|options|Object|（可选）附加属性|

> `options`属性主要参数

|参数名|类 型|默认值|说 明|
|-|-|-|-|
|viewerMode|String|‘3D’|（可选）初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图|
|showInfo|Boolean|false|（可选）是否显示默认的属性信息框|
|animation|Boolean|true|（可选）默认动画控制不显示|
|baseLayerPicker|Boolean|true|（可选）是否创建图层控制显示小组件|
|fullscreenButton|Boolean|true|（可选）是否创建全屏控制按钮|
|vrButton|Boolean|false|（可选）是否创建VR按钮|

##### （2）`appendGaodeMap(options)`：添加高德地图服务

> `appendGaodeMap`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|options|Object|附加属性|

> `options`属性主要参数

|参数名|类 型|默认值|说 明|
|-|-|-|-|
|type|String|'vec'|（可选）矢量：'vec'、影像：'img'、道路：'raod'|
|maximumLevel|Number|16|（可选）|
