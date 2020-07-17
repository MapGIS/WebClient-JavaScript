## 加载地形数据

### 示例功能

本示例实现在三维场景中加载地形数据，对接MapGIS IGServer发布的三维地图服务。

### 示例实现

数据准备：本示例采用的数据经过两个步骤生成，首先需在MapGIS Desktop桌面平台软件中将地形数据（例如TIF数据）并组织为地图文档；然后在MapGIS Server Manager服务管理器中根据地图文档发布为三维地图服务。

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.TerrainLayer`类提供的`append()`方法，以此来加载地形数据的三维地图服务。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建布局：创建`id='GlobeView'`的div作为三维视图的容器，并设置其样式；

3. 构造三维场景控件：实例化`Cesium.WebSceneControl`对象，完成此步骤后可在三维场景中加载三维球控件；

   ``` javascript
   //构造三维视图对象（视图容器div的id，三维视图设置参数）
   var webGlobe = new Cesium.WebSceneControl('GlobeView', {});
   ```

4. 加载数据：构造`CesiumZondy.Layer.TerrainLayer`地形图层管理对象，调用`append()`方法，传入三维地图服务的URL地址即可加载浏览数据，可传入相关配置参数。

   ``` javascript
   //构造地形层管理对象（视图）
   var layer = new CesiumZondy.Layer.TerrainLayer({
      viewer: webGlobe.viewer
   });
   //加载三维地图文档（服务地址，配置参数）
   var terrainlayer = layer.append('http://develop.smaryun.com:6163/igs/rest/g3d/terrain', {});
   ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`new WebSceneControl(elementId, options)`：三维场景控件构造函数

> `WebSceneControl`构造函数主要参数

| 参数名    | 类 型             | 说 明             |
| --------- | ----------------- | ----------------- |
| elementId | Element \| String | 放置视图的div的id |
| options   | Object            | （可选）附加属性  |

> `options`属性主要参数

| 参数名           | 类 型   | 默认值 | 说 明                                                        |
| ---------------- | ------- | ------ | ------------------------------------------------------------ |
| viewerMode       | String  | ‘3D’   | （可选）初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图 |
| showInfo         | Boolean | false  | （可选）是否显示默认的属性信息框                             |
| animation        | Boolean | true   | （可选）默认动画控制不显示                                   |
| baseLayerPicker  | Boolean | true   | （可选）是否创建图层控制显示小组件                           |
| fullscreenButton | Boolean | true   | （可选）是否创建全屏控制按钮                                 |
| vrButton         | Boolean | false  | （可选）是否创建VR按钮                                       |

#### 2.【地形图层管理类】CesiumZondy.Layer.TerrainLayer

##### （1）`append(url, options)`：添加三维场景地形服务

> `append`方法主要参数

| 参数名  | 类 型        | 说 明    |
| ------- | ------------ | -------- |
| url     | String       | 地形文档服务地址 |
| options | Object       | 附加属性 |

> `options`属性主要参数

| 参数名      | 类 型   | 默认值   | 说 明                 |
| ----------- | ------- | -------- | --------------------- |
|synchronous|	Boolean|	true|	（可选）是否异步请求|
|loaded|	function	 |function|	（可选）回调函数|
|proxy|	DefaultProxy|	defaultProxy|	（可选）代理|
