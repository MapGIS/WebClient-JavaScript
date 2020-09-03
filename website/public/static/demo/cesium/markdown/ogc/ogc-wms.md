## 加载OGC-WMS地图

### 示例功能

本示例对接OGC服务，实现在三维场景中加载WMS服务地图。

### WMS介绍

Web Map Service（网络地图服务），简称WMS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定。该规范定义了Web客户端从网络地图服务器获取地图的接口标准。一个WMS可以动态地生成具有地理参考数据的地图，这些地图通常用GIF、JPEG或PNG等图像格式，或者SVG、KML、VML和WebCGM等矢量图形格式来表现。使用者通过指定的参数获取相应的地图图片。

### 示例实现

数据准备：可在MapGIS IGServer中发布WMS地图服务获取数据地址，也可通过其他方式发布服务或者获取地址，只要是基于OGC标准的WMS地图服务都能支持。

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.OGCLayer`类提供的`appendWMSTile()`方法，以此来加载WMS地图。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建布局：创建`id='GlobeView'`的div作为三维视图的容器，并设置其样式；

3. 构造三维场景控件：实例化`Cesium.WebSceneControl`对象，完成此步骤后可在三维场景中加载三维球控件；

   ``` javascript
   //构造三维视图对象（视图容器div的id，三维视图设置参数）
   var webGlobe = new Cesium.WebSceneControl('GlobeView', {});
   ```

4. 加载数据：构造`CesiumZondy.Layer.OGCLayer`M3D图层管理对象，调用`appendWMSTile()`方法，并配置服务地址、图层名称、附加信息，即可实现WMS地图服务数据的加载，在此传入的是IGServer中发布的WMS地图服务地址，可做参考。

    ``` javascript
    //构造OGC图层管理对象（视图）
    var ogcLayer = new CesiumZondy.Layer.OGCLayer({
        viewer: webGlobe.viewer
    });
    //添加WMS服务地图
    var wmsLayer = ogcLayer.appendWMSTile(
        //地图服务URL地址
        "http://develop.smaryun.com:6163/igs/rest/ogc/doc/北京市/WMSServer",
        //图层名
        "北京市,绿地_1,水域_3,大学,学校,动物园",
        //附加属性
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

#### 2.【OGC标准瓦片服务管理类】CesiumZondy.Layer.OGCLayer

##### （1）`appendWMSTile(tileUrl, layerName, options)`：添加WMS服务图层

> `appendWMSTile`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|tileUrl|String|服务地址|
|layerName|String|图层名|
|options|object|附加属性|

> `options`属性主要参数

|参数名|类 型|默认值|说 明|
|-|-|-|-|
|version|String|'1.1.0'|版本 默认1.1.0|
|proxy|String|无|代理|

### 要点补充：WMS服务操作介绍

Web 地图服务（WMS）能够根据用户的请求返回相应的地图（包括 PNG，GIF，JPEG 等栅格形式或者是 SVG 和 WEB CGM 等矢量形式）。WMS 支持网络协议 HTTP，所支持的操作是由 URL 定义的。

WMS实现规范由三个基础性操作协议（GetCapabilities、GetMap和GetFeatureInfo）组成，这些协议共同构成了利用WMS创建和叠加显示不同来源的远程异构地图服务的基础。其中，GetCapabilities可用户获取服务的元数据信息；GetMap是数据的表现，可获取地图内容进而用以展示；GetFeatureInfo可用来获取屏幕坐标某处的相关信息，也可同时返回多个图层中的要素信息。还有一些其它操作如 DescribeLayer，GetLegendGraphic，GetStyles可获取其他信息。

> WMS服务操作列表见下表所示

|操作|实现要求|描述|
|-| - | - |
| GetCapabilities | 强制实现 | 获取服务级元数据。获取WMS的能力文档（即元数据文档），里面包含服务的所有信息|
| GetMap | 强制实现 | 获取地图图片。该操作根据客户端发出的请求参数在服务端进行检索，服务器端返回一个地图图像，其地理空间参数和大小参数是已经明确定义的，返回的地图图像可以是GIF、JPEG、PNG或SVG格式。 |
| GetFeatureInfo | 选择实现 | 获取显示在地图上的某些特殊要素的信息。该操作根据用户所请求的X、Y坐标或感兴趣的图层，返回地图上某些特殊要素的信息，信息以HTML，GML或ASCII的格式表示。 |

> GetMap操作请求方法实现参数

| 参数名称    | 参数个数     | 参数类型和值                                                 |
| ----------- | ------------ | ------------------------------------------------------------ |
| service     | 1个(必选)    | 字符类型，服务类型标识值为“WMS”                              |
| request     | 1个(必选)    | 字符类型，值为“GetMap”                                       |
| version     | 1个(必选)    | 字符类型，值为请求的WMS的版本号                              |
| layers      | 1个(必选)    | 字符类型，值为一个或多个地图图层列表，多个图层之间用”,”隔开  |
| styles      | 1个(必选)    | 字符类型，值为请求图层的地图渲染样式                         |
| CRS         | 1个(必选)    | 字符类型，值为坐标参照系统                                   |
| BBOX        | 1个(必选)    | Wkt格式，值为某个CRS下的地图边界范围的坐标序列               |
| width       | 1个(必选)    | 整型类型，值为地图图片的像素宽度                             |
| height      | 1个(必选)    | 整型类型，值为地图图片的像素高度                             |
| format      | 1个(必选)    | 字符类型，值为地图的输出格式                                 |
| transparent | 0或1个(可选) | 字符类型，值为true或者false，用来表示地图图层是否透明(默认情况下是不透明的) |
| bgcolor     | 0或1个(可选) | 值为十六进制的RGB值，表示地图的背景颜色                      |
| exceptions  | 0或1个(可选) | 值为WMS的异常信息报告的格式(默认情况下是XML格式)             |
| time        | 0或1个(可选) | 时间类型，值为时间值，表示需要在图层中有时间信息             |
| elevation   | 0或1个(可选) | 数字类型，值为高程值，表示需要在图层中有高程信息             |

也可查看其英文原址介绍：
<a href="https://www.ogc.org/docs/is/" target="_blank">OpenGIS Web Map Service (WMS) Implementation Specification</a>
