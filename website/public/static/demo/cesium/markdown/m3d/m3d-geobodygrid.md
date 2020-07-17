## 加载M3D地质体网格

### 示例功能

本示例实现在三维场景中加载M3D地质体网格数据，对接MapGIS IGServer发布的三维地图服务。

### M3D——全新的轻量级三维数据交换格式

M3D，是MapGIS定义的针对多端应用的轻量级三维数据交换格式，对海量三维数据进行网格划分与分层组织，采用流式传输模式，实现多端一体的高效解析和渲染。具备高效网络传输模式、多级LOD模型支持、WebGL无缝融合等优点。可以将多样类型、多种格式的三维数据通过M3D数据交换格式进行高效解析并渲染，能够支持的数据类型包括：精细模型（景观模型、BIM模型）、实景三维（倾斜摄影、地质体、管线）、点云（激光点云las等）、其他（栅格、地形、矢量、瓦片）等。

### 示例实现

数据准备：本示例采用的数据经过两个步骤生成，首先需在MapGIS Desktop桌面平台软件中为地质体网格数据生成M3D缓存，并组织为地图文档；然后在MapGIS Server Manager服务管理器中根据地图文档发布为三维地图服务。

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.M3DLayer`类提供的`append()`方法，以此来加载M3D缓存的三维地图服务。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建布局：创建`id='GlobeView'`的div作为三维视图的容器，并设置其样式；

3. 构造三维场景控件：实例化`Cesium.WebSceneControl`对象，完成此步骤后可在三维场景中加载三维球控件；

   ``` javascript
   //构造三维视图对象（视图容器div的id，三维视图设置参数）
   var webGlobe = new Cesium.WebSceneControl('GlobeView', {});
   ```

4. 加载数据：构造`CesiumZondy.Layer.M3DLayer`M3D图层管理对象，调用`append()`方法，传入M3D缓存三维地图服务的URL地址即可加载浏览数据，同时可传入相关配置参数。

   ``` javascript
   //构造M3D模型层管理对象（视图）
   var m3dLayer = new CesiumZondy.Layer.M3DLayer({
      viewer: webGlobe.viewer
   });
   //加载M3D地图文档（服务地址，配置参数）
   var obliqueLayer = m3dLayer.append('http://develop.smaryun.com:6163/igs/rest/g3d/地质体网格2', {});
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

#### 2.【M3D模型层管理类】CesiumZondy.Layer.M3DLayer

##### （1）`append(url, options)`：添加M3D地图文档服务

> `append`方法主要参数

| 参数名  | 类 型        | 说 明    |
| ------- | ------------ | -------- |
| url     | String       | 文档服务地址 |
| options | Object       | 附加属性 |

> `options`属性主要参数

| 参数名      | 类 型   | 默认值   | 说 明                 |
| ----------- | ------- | -------- | --------------------- |
| autoReset   | Boolean | true     | （可选）是否自动定位 |
| synchronous | Boolean | true     | （可选）是否异步请求 |
| loaded      | Boolean | function | （可选）回调函数     |
|proxy|	DefaultProxy	|defaultProxy	|（可选）代理|
|showBoundingVolume|	Boolean	|false	|（可选）是否显示包围盒|
|maximumScreenSpaceError	|Number	|16|（可选）用于控制模型显示细节，值较大将会渲染更少的贴图，进而可以提高性能，而较低的值将提高视觉质量|
