## 加载 OGC-WMS 地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例对接 OGC 服务，实现在三维场景中加载 WMS 服务地图。

### WMS 介绍

&ensp;&ensp;&ensp;&ensp;Web Map Service（网络地图服务），简称 WMS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定。该规范定义了 Web 客户端从网络地图服务器获取地图的接口标准。一个 WMS 可以动态地生成具有地理参考数据的地图，这些地图通常用 GIF、JPEG 或 PNG 等图像格式，或者 SVG、KML、VML 和 WebCGM 等矢量图形格式来表现。使用者通过指定的参数获取相应的地图图片。

### 示例实现

&ensp;&ensp;&ensp;&ensp;数据准备：可在 MapGIS IGServer 中发布 WMS 地图服务获取数据地址，也可通过其他方式发布服务或者获取地址，只要是基于 OGC 标准的 WMS 地图服务都能支持。

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.OGCLayer`类提供的`appendWMSTile()`方法，以此来加载 WMS 地图。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id='GlobeView'`的 div 作为三维视图的容器，并设置其样式；

**Step 3. <font color=red>构造三维场景控件</font>**：
&ensp;&ensp;&ensp;&ensp;实例化`Cesium.WebSceneControl`对象，完成此步骤后可在三维场景中加载三维球控件；

- Example:
  ```javascript
    //构造三维视图对象（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {})
  ```

**Step 4. <font color=red>加载数据</font>**:
&ensp;&ensp;&ensp;&ensp;构造`CesiumZondy.Layer.OGCLayer`M3D 图层管理对象，调用`appendWMSTile()`方法，并配置服务地址、图层名称、附加信息，即可实现 WMS 地图服务数据的加载，在此传入的是 IGServer 中发布的 WMS 地图服务地址，可做参考。

- Example:
  ```javascript
    //构造OGC图层管理对象（视图）
    var ogcLayer = new CesiumZondy.Layer.OGCLayer({
      viewer: webGlobe.viewer,
    })
    //添加WMS服务地图
    var wmsLayer = ogcLayer.appendWMSTile(
      //地图服务URL地址
      'http://develop.smaryun.com:6163/igs/rest/ogc/doc/北京市/WMSServer',
      //图层名
      '北京市,绿地_1,水域_3,大学,学校,动物园',
      //附加属性
      {}
    )
  ```

### 关键接口

#### 1.【三维场景控件类】`Cesium.WebSceneControl(elementId, options)`

| 参数名    | 类 型             | 说 明                |
| --------- | ----------------- | -------------------- |
| elementId | Element \| String | 放置视图的 div 的 id |
| options   | Object            | （可选）附加属性     |

- `options`属性主要参数

| 参数名           | 类 型   | 默认值 | 说 明                                                                                  |
| ---------------- | ------- | ------ | -------------------------------------------------------------------------------------- |
| viewerMode       | String  | ‘3D’   | （可选）初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图 |
| showInfo         | Boolean | false  | （可选）是否显示默认的属性信息框                                                       |
| animation        | Boolean | true   | （可选）默认动画控制不显示                                                             |
| baseLayerPicker  | Boolean | true   | （可选）是否创建图层控制显示小组件                                                     |
| fullscreenButton | Boolean | true   | （可选）是否创建全屏控制按钮                                                           |
| vrButton         | Boolean | false  | （可选）是否创建 VR 按钮                                                               |

#### 2.【OGC 标准瓦片服务管理类】`CesiumZondy.Layer.OGCLayer`

##### 【method】`appendWMSTile(tileUrl, layerName, options)`：添加 WMS 服务图层

| 参数名    | 类 型  | 说 明    |
| --------- | ------ | -------- |
| tileUrl   | String | 服务地址 |
| layerName | String | 图层名   |
| options   | object | 附加属性 |

- `options`属性主要参数

| 参数名  | 类 型  | 默认值  | 说 明           |
| ------- | ------ | ------- | --------------- |
| version | String | '1.1.0' | 版本 默认 1.1.0 |
| proxy   | String | 无      | 代理            |

### 要点补充：WMS 服务操作介绍

&ensp;&ensp;&ensp;&ensp;Web 地图服务（WMS）能够根据用户的请求返回相应的地图（包括 PNG，GIF，JPEG 等栅格形式或者是 SVG 和 WEB CGM 等矢量形式）。WMS 支持网络协议 HTTP，所支持的操作是由 URL 定义的。

&ensp;&ensp;&ensp;&ensp;WMS 实现规范由三个基础性操作协议（GetCapabilities、GetMap 和 GetFeatureInfo）组成，这些协议共同构成了利用 WMS 创建和叠加显示不同来源的远程异构地图服务的基础。其中，GetCapabilities 可用户获取服务的元数据信息；GetMap 是数据的表现，可获取地图内容进而用以展示；GetFeatureInfo 可用来获取屏幕坐标某处的相关信息，也可同时返回多个图层中的要素信息。还有一些其它操作如 DescribeLayer，GetLegendGraphic，GetStyles 可获取其他信息。

- WMS 服务操作列表见下表所示

| 操作            | 实现要求 | 描述                                                                                                                                                                                |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GetCapabilities | 强制实现 | 获取服务级元数据。获取 WMS 的能力文档（即元数据文档），里面包含服务的所有信息                                                                                                       |
| GetMap          | 强制实现 | 获取地图图片。该操作根据客户端发出的请求参数在服务端进行检索，服务器端返回一个地图图像，其地理空间参数和大小参数是已经明确定义的，返回的地图图像可以是 GIF、JPEG、PNG 或 SVG 格式。 |
| GetFeatureInfo  | 选择实现 | 获取显示在地图上的某些特殊要素的信息。该操作根据用户所请求的 X、Y 坐标或感兴趣的图层，返回地图上某些特殊要素的信息，信息以 HTML，GML 或 ASCII 的格式表示。                          |

- GetMap 操作请求方法实现参数

| 参数名称    | 参数个数        | 参数类型和值                                                                   |
| ----------- | --------------- | ------------------------------------------------------------------------------ |
| service     | 1 个(必选)      | 字符类型，服务类型标识值为“WMS”                                                |
| request     | 1 个(必选)      | 字符类型，值为“GetMap”                                                         |
| version     | 1 个(必选)      | 字符类型，值为请求的 WMS 的版本号                                              |
| layers      | 1 个(必选)      | 字符类型，值为一个或多个地图图层列表，多个图层之间用”,”隔开                    |
| styles      | 1 个(必选)      | 字符类型，值为请求图层的地图渲染样式                                           |
| CRS         | 1 个(必选)      | 字符类型，值为坐标参照系统                                                     |
| BBOX        | 1 个(必选)      | Wkt 格式，值为某个 CRS 下的地图边界范围的坐标序列                              |
| width       | 1 个(必选)      | 整型类型，值为地图图片的像素宽度                                               |
| height      | 1 个(必选)      | 整型类型，值为地图图片的像素高度                                               |
| format      | 1 个(必选)      | 字符类型，值为地图的输出格式                                                   |
| transparent | 0 或 1 个(可选) | 字符类型，值为 true 或者 false，用来表示地图图层是否透明(默认情况下是不透明的) |
| bgcolor     | 0 或 1 个(可选) | 值为十六进制的 RGB 值，表示地图的背景颜色                                      |
| exceptions  | 0 或 1 个(可选) | 值为 WMS 的异常信息报告的格式(默认情况下是 XML 格式)                           |
| time        | 0 或 1 个(可选) | 时间类型，值为时间值，表示需要在图层中有时间信息                               |
| elevation   | 0 或 1 个(可选) | 数字类型，值为高程值，表示需要在图层中有高程信息                               |

也可查看其英文原址介绍：
<a href="https://www.ogc.org/docs/is/" target="_blank">OpenGIS Web Map Service (WMS) Implementation Specification</a>
