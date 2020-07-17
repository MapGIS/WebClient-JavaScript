## 加载OGC-WMTS地图

### 示例功能

本示例对接OGC服务，实现在三维场景中加载WMTS服务地图。

### WMTS介绍

Web Map Tile Service（网络地图瓦片服务），简称WMTS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定，是和WMS并列的重要OGC规范之一。WMTS不同于WMS,它最重要的特征是采用缓存技术能够缓解WebGIS服务器端数据处理的压力，提高交互响应速度，大幅改善在线地图应用客户端的用户体验。WMTS是OGC主推的缓存技术规范，是目前各种缓存技术相互兼容的一种方法。

### 示例实现

数据准备：可在MapGIS IGServer中发布WMTS地图服务获取数据地址，也可通过其他方式发布服务或者获取地址，只要是基于OGC标准的WMTS地图服务都能支持。

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.OGCLayer`类提供的`appendWMSTile()`方法，以此来加载WMTS地图。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建布局：创建`id='GlobeView'`的div作为三维视图的容器，并设置其样式；

3. 构造三维场景控件：实例化`Cesium.WebSceneControl`对象，完成此步骤后可在三维场景中加载三维球控件；

   ``` javascript
   //构造三维视图对象（视图容器div的id，三维视图设置参数）
   var webGlobe = new Cesium.WebSceneControl('GlobeView', {});
   ```

4. 加载数据：调用`appendWMTSTile()`方法，并配置服务地址、图层名称、最大级数等信息，即可实现WMTS地图服务数据的加载，在此传入的是IGServer中发布的WMTS地图服务地址，可做参考。

    ``` javascript
    //构造OGC图层管理对象（视图）
    var ogcLayer = new CesiumZondy.Layer.OGCLayer({
        viewer: webGlobe.viewer
    });
    //添加WMTS地图服务
    var wmtsLayer = ogcLayer.appendWMTSTile(
        //瓦片服务地址
        "http://develop.smaryun.com:6163/igs/rest/ogc/WMTSServer",
        //图层名称
        "beijing", 
        'EPSG:4326_北京市_028mm_GB',
        //最大级数
        17,
        null,
        'default',
        0);
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

#### 2.【OGC标准瓦片服务管理类】CesiumZondy.Layer.OGCLayer

##### （1）`appendWMTSTile(tileUrl, layerName, tileMatrixSetID, maximumLevel, startLevel)`：添加WMTS标准的瓦片服务

> `appendWMTSTile`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|tileUrl|String|瓦片服务地址|
|layerName|String|图层名称|
|tileMatrixSetID|String|瓦片数据集格式|
|maximumLevel|Number|最大级数|
|startLevel|Number|初始级别 正常默认为0 有的为1|

### 要点补充：WMTS服务操作介绍

WMTS服务支持RESTful访问，其接口包括GetCapabilities、GetTile和GetFeatureInfo3个操作，这些操作允许用户访问切片地图。

WMTS服务属于一种瓦片地图服务，在此可了解下瓦片规则：

![WMTS](./static/demo/mapboxgl/markdown/ogc/wmts.png)

> WMTS服务操作列表见下表所示

|操作|实现要求|描述|
|-|-|-|
| GetCapabilities | 强制实现 | 获取WMTS的能力文档（即元数据文档），里面包含服务的所有信息 |
| GetTile         | 强制实现 | 获取地图瓦片。该操作根据客户端发出的请求参数在服务端进行检索，服务器端返回地图瓦片图像。 |
| GetFeatureInfo  | 选择实现 | 通过在WMTS图层上指定一定的条件，返回指定的地图瓦片内容对应的要素信息 |

> GetTile操作请求方法实现参数

| 参数名称                 | 参数个数     | 参数类型和值                                           |
| ----------------------- | ------------ | -|
| service                 | 1个(必选)    | 字符类型，服务类型标识值为“WMTS”                       |
| request                 | 1个(必选)    | 字符类型，请求的操作值为“GetTile”                      |
| version                 | 1个(必选)    | 字符类型，值为请求的WMTS的版本号                       |
| layer                   | 1个(必选)    | 字符类型，值为请求的图层名称                           |
| style                   | 1个(必选)    | 字符类型，值为请求图层的渲染样式                       |
| format                  | 1个(必选)    | 字符类型，值为瓦片地图的输出格式                       |
| tileMatrixSet           | 1个(必选)    | 字符类型，瓦片矩阵数据集，其值在服务的元数据文档中指定 |
| tileMatrix              | 1个(必选)    | 字符类型，瓦片矩阵，其值在服务的元数据文档中指定       |
| tileRow                 | 1个(必选)    | 整型类型，值为大于0的整数，表示瓦片矩阵的行号          |
| tileCol                 | 1个(必选)    | 整型类型，值为大于0的整数，表示瓦片矩阵的列号          |
| Other sample dimensions | 0或1个(可选) | 字符类型，其他允许的参数                               |

也可查看其英文原址介绍：
<a href="https://www.ogc.org/docs/is/" target="_blank">OpenGIS Web Map Tile Service Implementation Standard</a>
