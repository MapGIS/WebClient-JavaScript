## 加载 OGC-WMTS 地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例对接 OGC 服务，实现在三维场景中加载 WMTS 服务地图。

### WMTS 介绍

&ensp;&ensp;&ensp;&ensp;Web Map Tile Service（网络地图瓦片服务），简称 WMTS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定，是和 WMS 并列的重要 OGC 规范之一。WMTS 不同于 WMS,它最重要的特征是采用缓存技术能够缓解 WebGIS 服务器端数据处理的压力，提高交互响应速度，大幅改善在线地图应用客户端的用户体验。WMTS 是 OGC 主推的缓存技术规范，是目前各种缓存技术相互兼容的一种方法。

### 示例实现

&ensp;&ensp;&ensp;&ensp;数据准备：可在 MapGIS IGServer 中发布 WMTS 地图服务获取数据地址，也可通过其他方式发布服务或者获取地址，只要是基于 OGC 标准的 WMTS 地图服务都能支持。

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.OGCLayer`类提供的`appendWMSTile()`方法，以此来加载 WMTS 地图。

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
&ensp;&ensp;&ensp;&ensp;加载数据：调用`appendWMTSTile()`方法，并配置服务地址、图层名称、最大级数等信息，即可实现 WMTS 地图服务数据的加载，在此传入的是 IGServer 中发布的 WMTS 地图服务地址，可做参考。

- Example:
  ```javascript
    //构造OGC图层管理对象（视图）
    var ogcLayer = new CesiumZondy.Layer.OGCLayer({
      viewer: webGlobe.viewer,
    })
    //添加WMTS地图服务
    var wmtsLayer = ogcLayer.appendWMTSTile(
      //瓦片服务地址
      'http://develop.smaryun.com:6163/igs/rest/ogc/WMTSServer',
      //图层名称
      'beijing',
      'EPSG:4326_北京市_028mm_GB',
      //最大级数
      17,
      null,
      'default',
      0
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

##### 【method】`appendWMTSTile(tileUrl, layerName, tileMatrixSetID, maximumLevel, startLevel)`：添加 WMTS 标准的瓦片服务

| 参数名          | 类 型  | 说 明                          |
| --------------- | ------ | ------------------------------ |
| tileUrl         | String | 瓦片服务地址                   |
| layerName       | String | 图层名称                       |
| tileMatrixSetID | String | 瓦片数据集格式                 |
| maximumLevel    | Number | 最大级数                       |
| startLevel      | Number | 初始级别 正常默认为 0 有的为 1 |

### 要点补充：WMTS 服务操作介绍

&ensp;&ensp;&ensp;&ensp;WMTS 服务支持 RESTful 访问，其接口包括 GetCapabilities、GetTile 和 GetFeatureInfo3 个操作，这些操作允许用户访问切片地图。

&ensp;&ensp;&ensp;&ensp;WMTS 服务属于一种瓦片地图服务，在此可了解下瓦片规则：

![WMTS](./static/demo/mapboxgl/markdown/ogc/wmts.png)

- WMTS 服务操作列表见下表所示

| 操作            | 实现要求 | 描述                                                                                     |
| --------------- | -------- | ---------------------------------------------------------------------------------------- |
| GetCapabilities | 强制实现 | 获取 WMTS 的能力文档（即元数据文档），里面包含服务的所有信息                             |
| GetTile         | 强制实现 | 获取地图瓦片。该操作根据客户端发出的请求参数在服务端进行检索，服务器端返回地图瓦片图像。 |
| GetFeatureInfo  | 选择实现 | 通过在 WMTS 图层上指定一定的条件，返回指定的地图瓦片内容对应的要素信息                   |

- GetTile 操作请求方法实现参数

| 参数名称                | 参数个数        | 参数类型和值                                           |
| ----------------------- | --------------- | ------------------------------------------------------ |
| service                 | 1 个(必选)      | 字符类型，服务类型标识值为“WMTS”                       |
| request                 | 1 个(必选)      | 字符类型，请求的操作值为“GetTile”                      |
| version                 | 1 个(必选)      | 字符类型，值为请求的 WMTS 的版本号                     |
| layer                   | 1 个(必选)      | 字符类型，值为请求的图层名称                           |
| style                   | 1 个(必选)      | 字符类型，值为请求图层的渲染样式                       |
| format                  | 1 个(必选)      | 字符类型，值为瓦片地图的输出格式                       |
| tileMatrixSet           | 1 个(必选)      | 字符类型，瓦片矩阵数据集，其值在服务的元数据文档中指定 |
| tileMatrix              | 1 个(必选)      | 字符类型，瓦片矩阵，其值在服务的元数据文档中指定       |
| tileRow                 | 1 个(必选)      | 整型类型，值为大于 0 的整数，表示瓦片矩阵的行号        |
| tileCol                 | 1 个(必选)      | 整型类型，值为大于 0 的整数，表示瓦片矩阵的列号        |
| Other sample dimensions | 0 或 1 个(可选) | 字符类型，其他允许的参数                               |

也可查看其英文原址介绍：
<a href="https://www.ogc.org/docs/is/" target="_blank">OpenGIS Web Map Tile Service Implementation Standard</a>
