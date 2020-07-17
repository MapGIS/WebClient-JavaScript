## 添加二维地图文档服务

### 示例功能

本示例实现在三维场景中加载在线二维地图数据，对接MapGIS IGServer发布的二维地图文档服务。

### 示例实现

数据准备：需提前在MapGIS Server Manager服务管理器中发布二维地图文档服务。

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.TilesLayer`类提供的`append2DDocTile()`方法，以此来加载IGServer二维地图文档服务数据。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建布局：创建`id='GlobeView'`的div作为三维视图的容器，并设置其样式；

3. 构造三维场景控件：实例化`Cesium.WebSceneControl`对象，完成此步骤后可在三维场景中加载三维球控件；

   ``` javascript
   //构造三维视图对象（视图容器div的id，三维视图设置参数）
   var webGlobe = new Cesium.WebSceneControl('GlobeView', {});
   ```

4. 加载数据：首先构造`CesiumZondy.Layer.TilesLayer`瓦片图层管理对象，然后调用`append2DDocTile()`方法，传入地图服务的URL地址及相关参数，即可加载IGServer二维地图文档数据。

    ``` javascript
    //构造瓦片图层管理对象（视图）
    var layer = new CesiumZondy.Layer.TilesLayer({
        viewer: webGlobe.viewer
    });
    //添加MapGIS IGServer发布的二维地图文档服务
    vecDoc = layer.append2DDocTile(
        'http://develop.smaryun.com:6163/igs/rest/mrms/docs/北京市',
        {}
    );
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

#### 2.【瓦片图层管理类】CesiumZondy.Layer.TilesLayer

##### （1）`append2DDocTile(url, options)`：加载二维地图文档瓦片

> `append2DDocTile`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|url|String|发布的文档地址|
|options|Object|附加属性|

> `options`属性主要参数

|参数名|类 型|默认值|说 明|
|-|-|-|-|
|options.tileRange=|Rectangle|无|Rectangle.fromDegrees(-180,-90,180,90) 默认范围为全球范围|
|colNum|Number|2|瓦片初始级的列数|
|rowNum|Number|1|瓦片初始级的行数|
|maxLevel|Number|19|瓦片最大显示级数|
|proxy|String|无|转发代理，不存在跨域可不设置|
