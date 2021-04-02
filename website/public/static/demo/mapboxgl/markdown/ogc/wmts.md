## WMTS地图服务显示

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在二维视图中加载显示一个WMTS标准的地图服务数据，坐标系为`WGS84`。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-mapboxgl-local.js】开发库实现，通过关键接口`mapboxgl.Map()`加载WGS84坐标系的WMTS标准地图服务数据。

> 开发库使用请参见**首页**-**概述**-**原生JS调用**内容

#### MapGIS IGServer发布WMTS地图服务

##### 发布WMTS流程

1. 打开地图文档：MapGIS 10打开地图文档，检查**数据图层Layer**的`参照系`
   
   <img src="../static/demo/mapboxgl/markdown/ogc/wmts_layer_crs.png" alt="图层参照系检查" style="zoom:40%;" />

2. 瓦片裁剪：

   <img src="../static/demo/mapboxgl/markdown/ogc/wmts_tile.png" alt="瓦片裁剪" style="zoom:40%;" />

3. 裁剪信息：地图文档**瓦片裁剪**信息

   设置**裁剪信息**：根据数据图层参照系选择**裁剪策略**

   <img src="../static/demo/mapboxgl/markdown/ogc/wmts_tile_cutinfo.png" alt="瓦片裁剪-裁剪信息" style="zoom: 50%;" />

   设置**图层信息**：

   <img src="../static/demo/mapboxgl/markdown/ogc/wmts_tile_layerinfo.png" alt="瓦片裁剪-图层信息" style="zoom:50%;" />

   设置**瓦片输出**：设置顽皮

   <img src="../static/demo/mapboxgl/markdown/ogc/wmts_tile_output.png" alt="瓦片裁剪-瓦片输出" style="zoom: 40%;" />

4. 瓦片服务发布：打开MapGIS IGServer，在服务器管理界面**发布瓦片**

   <img src="../static/demo/mapboxgl/markdown/ogc/wmts_tile_publish.png" alt="瓦片发布" style="zoom: 50%;" />

5. WMTS服务发布：

   <img src="../static/demo/mapboxgl/markdown/ogc/wmts_publish.png" alt="igserver" style="zoom:40%;" >

6. 前端脚本关键语法：

   <img src="../static/demo/mapboxgl/markdown/ogc/wmts_tile_capabilities.png" alt="igserver" style="zoom:50%;" />

   WMTS请求服务中的`TileMatrixSet`参数填写方式如下："tilematrixSet=EPSG:4326_行政区划图\_arcgis_GB"


### 实现步骤

**Step 1.<font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例通过本地离线【include-mapboxgl-local.js】脚本引入开发库；

**Step 2. <font color=red>创建布局</font>**：
 &ensp;&ensp;&ensp;&ensp;创建`id="map"`的div作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**：
 &ensp;&ensp;&ensp;&ensp;设置地图的必要参数，如坐标系、地图div容器、样式等，在地图中加载天地图地图服务作为底图显示，具体操作参考`互联网地图`目录下的`天地图经纬度`示例；

**Step 4. <font color=red>注册地图加载事件</font>**：
 &ensp;&ensp;&ensp;&ensp;当天地图底图加载后添加WMTS标准的地图服务数据，示例中的WMTS地图服务是通过MapGIS IGServer发布；

* Example:
   ```javascript
      //注册地图加载事件
      map.on("load", function () {
         map.addLayer({
         id: "wmts-layer",
         type: "raster",
         source: {
            type: "raster",
            tiles: [                
            "http://develop.smaryun.com:6163/igs/rest/ogc/beijing/WMTSServer?" +
                  "service=WMTS" +
                  "&request=GetTile" +
                  "&version=1.0.0" +
                  "&style=default" +
                  "&tilematrixSet=EPSG:4326_北京市_arcgis_GB" +
                  "&format=image/png" +
                  "&layer=beijing" +
                  "&tilematrix={z}" +
                  "&tilerow={y}" +
                  "&tilecol={x}",
            ],
            tileSize: 256,
            mapgisOffset: -1,
         },
         paint: {},
         });
      });
   ```
   
**Step 5. <font color=red>浏览地图</font>**：
 &ensp;&ensp;&ensp;&ensp; 上面的步骤完成后在浏览器中可以查看到地图。


### 关键接口

#### 1.【MapBox样式规范】source

&ensp;&ensp;&ensp;&ensp;数据源表明地图应显示哪些数据。 使用“type”属性指定数据源的类型，该属性必须是`vector`,`raster`,`raster-dem`,`geojson`,`image`,`video`之一。 添加数据源不足以使数据显示在地图上，因为数据源不包含颜色或宽度等样式细节。 图层通过指定数据源及设置相关的样式进行可视化表达。 这样就可以用不同的方式对同一数据源进行样式设置，例如在高速公路图层中区分不同类型的道路。

&ensp;&ensp;&ensp;&ensp;示例中使用raster类型数据源，即瓦片栅格数据源，它是由JSON对象构成。

* `raster`类型的source属性说明

| 属性名      | 类型   | 默认值                          | 说明                                                         |
| ----------- | ------ | ------------------------------- | ------------------------------------------------------------ |
| url         | string | 无                              | TileJSON资源的URL。支持的协议是http：，https，mapbox：//  <mapid> |
| tiles       | array  | 无                              | 一个或多个瓦片数据源URL的数组，如TileJSON规范中所示。        |
| bounds      | array  | [-180,-85.051129,180,85.051129] | 一个数组，按以下顺序包含源边界框的西南角和东北角的经度和纬度：[sw.lng，sw.lat，ne.lng，ne.lat]。当此属性包含在数据源中时，Mapbox  GL不会请求给定边界之外的任何切片 |
| minzoom     | number | 0                               | 可用于切片的最小缩放级别，如TileJSON规范中所示               |
| maxzoom     | number | 22                              | 可用于切片的最大缩放级别，如TileJSON规范中所示。当以更高的缩放级别显示地图时，将使用maxzoom中的切片数据 |
| tileSize    | number | 512                             | 显示此图层的平铺的最小视觉大小，单位像素。仅可配置栅格图层   |
| scheme      | enum   | "xyz"                           | 影响拼贴坐标的y方向，选项："xyz",  "tms"。假设全局 - 墨卡托（又称球形墨卡托）轮廓 |
| attribution | string | 无                              | 包含向用户显示地图时要显示的属性                             |

#### 2.【地图类】`mapboxgl.Map(options)`

&ensp;&ensp;&ensp;&ensp;Map对象代表页面上的地图。 它开放了使您能够以编程方式更改地图的方法和属性，并在用户与地图互动时触发事件。

&ensp;&ensp;&ensp;&ensp;您可以通过指定容器和其他选项来创建地图， 然后使用`mapboxgl.Map(options)`初始化页面上的地图并返回Map对象。

| 参数名  | 类型   | 说明             |
| ------- | ------ | ---------------- |
| options | Object | 地图JSON对象参数 |

* `options`属性参数说明

| 参数名                       | 类型                                                         | 默认值                               | 说明                                                         |
| ---------------------------- | ------------------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------ |
| crs         | string | "EPSG:3857"                     | 常用的坐标系有WGS84（EPSG:4326）与Web墨卡托（EPSG:3857）     |
| container                    | HTMLElement \|  string                                       | 无                                   | Mapbox GL  JS将在其中呈现地图的HTML元素，或元素的字符串ID。指定的元素必须没有子元素 |
| minZoom                      | number                                                       | 0                                    | 地图的最小缩放级别（0-24）                                   |
| maxZoom                      | number                                                       | 22                                   | 地图的最大缩放级别（0-24）                                   |
| style                        | Object  \| <br/>string                                       | "mapbox:<br/>//styles/<br/>mapbox/<br/>streets-v10" | <a href="https://www.mapbox.com/mapbox-gl-js/style-spec/" target="_blank">地图的Mapbox样式。这必须是符合Mapbox样式规范中描述的模式的JSON对象，或者是此类JSON的URL。</a> |
| hash                         | boolean                                                      | false                                | 如果为true，则地图的位置（缩放，中心纬度，中心经度，方位和旋转）将与页面URL的哈希片段同步，例如：http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60 |
| interactive                  | boolean                                                      | true                                 | 如果为false，则不会将鼠标，触摸或键盘侦听器附加到地图，因此它不会响应交互 |
| bearingSnap                  | number                                                       | 7                                    | 以度为单位的阈值，用于确定地图的方位何时会向北突然移动。例如，使用bearingSnap为7，如果用户在7度以内旋转地图，地图将自动捕捉到精确的北方 |
| pitchWith<br/>Rotate         | boolean                                                      | true                                 | 如果为false，则将禁用具有“拖动到旋转”交互的地图的俯仰（倾斜）控制 |
| clickTolerance               | number                                                       | 3                                    | 用户可以在单击期间移动鼠标指针的最大像素数，以使其被视为有效点击（与鼠标拖动相反） |
| attribution<br/>Control      | boolean                                                      | true                                 | <a href="https://www.mapbox.com/mapbox-gl-js/api/#attributioncontrol" target="_blank">如果为true，则会将属性控件添加到地图中</a> |
| custom<br/>Attribution       | string  \| Array                                             | true                                 | <a href="https://www.mapbox.com/mapbox-gl-js/api/#attributioncontrol" target="_blank">要在属性控件中显示的字符串。仅在options.attributionControl为true时适用</a> |
| pitchWith<br/>Rotate         | boolean                                                      | 无                                   | 如果为false，则将禁用具有“拖动到旋转”交互的地图的俯仰（倾斜）控制 |
| logoPosition                 | string                                                       | 'bottom-left'                        | 表示Mapbox字标在地图上的位置的字符串。有效选项包括top-left  , top-right , bottom-left , bottom-right |
| failIfMajor<br/>Performance<br/>Caveat | boolean                                                      | false                                | 如果为true，那么如果Mapbox  GL JS的性能将比预期的差得多（即将使用软件渲染器），则地图创建将失败 |
| preserve<br/>DrawingBuffer   | boolean                                                      | false                                | 如果为true，则可以使用map.getCanvas().toDataURL()将地图的画布导出为PNG。默认情况下，这是错误的性能优化 |
| refresh<br/>ExpiredTiles     | boolean                                                      | true                                 | 如果为false，具有cacheControl  / expires头部的HTTP过期后，地图将不再请求瓦片 |
| maxBounds                    | <a href="https://www.mapbox.com/mapbox-gl-js/api/#lnglatboundslike" target="_blank">LngLat<br/>BoundsLike</a> | 无                                   | 如果设置，则地图将被约束到给定边界                           |
| scrollZoom                   | boolean                                                      | true                                 | <a href="https://www.mapbox.com/mapbox-gl-js/api/#scrollzoomhandler" target="_blank">如果为true，则启用“滚动缩放”交互。   Object值作为选项传递给ScrollZoomHandler</a> |
| boxZoom                      | boolean                                                      | true                                 | <a href="https://www.mapbox.com/mapbox-gl-js/api/#boxzoomhandler" target="_blank">如果为true，则启用“box   zoom”交互（请参阅BoxZoomHandler）</a> |
| dragRotate                   | boolean                                                      | true                                 | <a href="https://www.mapbox.com/mapbox-gl-js/api/#dragrotatehandler" target="_blank">如果为true，则启用“拖动到旋转”交互（请参阅DragRotateHandler）</a> |
| dragPan                      | boolean                                                      | true                                 | <a href="https://www.mapbox.com/mapbox-gl-js/api/#dragpanhandler" target="_blank">如果为true，则启用“拖动到平移”交互（请参阅DragPanHandler）</a> |
| keyboard                     | boolean                                                      | true                                 | <a href="https://www.mapbox.com/mapbox-gl-js/api/#keyboardhandler" target="_blank">如果为true，则启用键盘快捷键（请参阅KeyboardHandler）</a> |
| double<br/>ClickZoom         | boolean                                                      | true                                 | <a href="https://www.mapbox.com/mapbox-gl-js/api/#doubleclickzoomhandler" target="_blank">如果为true，则启用“双击缩放”交互（请参阅DoubleClickZoomHandler）</a> |
| touch<br/>ZoomRotate         | boolean                                                      | true                                 | <a href="https://www.mapbox.com/mapbox-gl-js/api/#touchzoomrotatehandler" target="_blank">如果为true，则启用“手指旋转和缩放”交互。   Object值作为选项传递给TouchZoomRotateHandler</a> |
| trackResize                  | boolean                                                      | true                                 | 如果为true，则在浏览器窗口调整大小时，地图将自动调整大小     |
| center                       | <a href="https://www.mapbox.com/mapbox-gl-js/api/#lnglatlike" target="_blank">LngLatLike</a> | [0,0]                                | 地图的初始地理中心点                                         |
| zoom                         | number                                                       | 0                                    | 地图的初始缩放级别                                           |
| bearing                      | number                                                       | 0                                    | 地图的初始方位（旋转），以度为单位从北方逆时针测量           |
| pitch                        | number                                                       | 0                                    | 地图的初始俯仰（倾斜），以度数远离屏幕平面（0-60）测量       |
| bounds                       | <a href="https://www.mapbox.com/mapbox-gl-js/api/#lnglatboundslike" target="_blank">LngLat<br/>BoundsLike</a> | 无                                   | 地图的初始边界。如果指定了bounds，它将覆盖center和zoom构造函数选项 |
| render<br/>WorldCopies       | boolean                                                      | true                                 | 如果为true，则在缩小时将渲染多个世界副本                     |
| max<br/>TileCacheSize        | number                                                       | null                                 | 给定数据源的切片缓存中存储的最大切片数。如果省略，将根据当前视口动态调整缓存大小 |
| localIdeograph<br/>FontFamily | string                                                       | null                                 | <a href="https://www.mapbox.com/mapbox-gl-js/example/local-ideographs/" target="_blank">如果指定，则定义CSS字体系列，以便在“CJK   Unified Ideographs”和“Hangul   Syllables”范围内本地覆盖字形的生成。在这些范围内，除了font-weight关键字（light / regular / medium /   bold）之外，将忽略地图样式中的字体设置。此选项的目的是避免带宽密集型字形服务器请求。 （请参阅使用本地生成的表意文字）</a> |
| transform<br/>Request        | function                                                     | null                                 | Map之前的回调运行请求外部URL。回调可用于修改URL，设置标头或为跨源请求设置凭证属性。预计返回具有url属性的对象以及可选的标头和凭证属性 |
| collect<br/>ResourceTiming   | boolean                                                      | false                                | 如果为true，将收集GeoJSON和Vector  Tile Web  worker发出的请求的资源计时API信息（此信息通常无法从主Javascript线程获取）。信息将在相关data事件的resourceTiming属性中返回 |
| fadeDuration                 | number                                                       | 300                                  | 控制标签冲突的淡入/淡出动画的持续时间（以毫秒为单位）。此设置会影响所有符号图层。此设置不会影响运行时样式转换或栅格瓦片交叉渐变的持续时间 |
| crossSource<br/>Collisions   | boolean                                                      | true                                 | 如果为true，则在碰撞检测期间来自多个源的符号可能彼此冲突。如果为false，则对每个源中的符号单独运行冲突检测 |

##### 【method】`addLayer(layer, beforeId)`：地图添加图层方法

&ensp;&ensp;&ensp;&ensp;在地图样式中添加一个Mapbox样式图层。

| 参数名   | 类型                                                         | 说明                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| layer    | Object\|<a href="https://docs.mapbox.com/mapbox-gl-js/api/properties/#customlayerinterface" target="_blank">CustomLayerInterface</a> | 要添加的图层，它符合Mapbox样式规范的图层定义，或者不常见的是[<a href="https://docs.mapbox.com/mapbox-gl-js/api/properties/#customlayerinterface" target="_blank">CustomLayerInterface</a>](https://docs.mapbox.com/mapbox-gl-js/api/properties/#customlayerinterface) |
| beforeId | string                                                       | 在已有的图层（beforeId）前面添加新的图层。 如果未指定此参数，则该图层将附加到layers数组的末尾。 |

* `layer`属性参数说明

| 参数名              | 类型           | 说明                                                         |
| ------------------- | -------------- | ------------------------------------------------------------ |
| layer. id           | string         | 唯一标识符                                                   |
| layer.type          | string         | 图层的类型                                                   |
| layer.source        | string\|Object | 图层数据源，除custom以外，所有layer.type选项都需要此选项     |
| layer.sourceLayer   | string         | （可选）指定layer.source中用于此样式层的数据源层的名称。 这仅适用于矢量切片数据源，并且当layer.source是vector类型时是必需的。 |
| layer.filter        | array          | （可选）一个表达式，用于指定源要素的条件                     |
| layer.paint         | Object         | （可选）图层的绘制属性                                       |
| layer.layout        | Object         | （可选）图层的布局属性                                       |
| layer.maxzoom       | number         | （可选）图层的最大缩放级别。 在等于或大于maxzoom的缩放级别时，该层将被隐藏。 该值可以是0到24（含）之间的任何数字。 如果未提供maxzoom，则该图层将在所有可用瓦片的缩放级别上可见。 |
| layer.minzoom       | number         | （可选）图层的最小缩放级别。 如果缩放级别小于最小缩放级别，则该图层将被隐藏。 该值可以是0到24（含）之间的任何数字。 如果未提供最小缩放，则该图层将在所有可用瓦片的缩放级别上可见 |
| layer.metadata      | Object         | （可选）任意属性可用于跟踪图层，但不影响渲染                 |
| layer.renderingMode | string         | 这仅适用于具有custom类型的图层。 有关更多信息，请参见<a href="https://docs.mapbox.com/mapbox-gl-js/api/properties/#customlayerinterface" target="_blank">CustomLayerInterface</a> ||


### WMTS

#### 1. WMTS服务简介

&ensp;&ensp;&ensp;&ensp;Web Map Tile Service（网络地图瓦片服务），简称WMTS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定，是和WMS并列的重要OGC规范之一。WMTS不同于WMS,它最重要的特征是采用缓存技术能够缓解WebGIS服务器端数据处理的压力，提高交互响应速度，大幅改善在线地图应用客户端的用户体验。WMTS是OGC主推的缓存技术规范，是目前各种缓存技术相互兼容的一种方法。

#### 2. 服务操作列表

&ensp;&ensp;&ensp;&ensp;WMTS服务支持RESTful访问，其接口包括GetCapabilities、GetTile和GetFeatureInfo3个操作，这些操作允许用户访问切片地图。

| 操作            | 实现要求 | 描述                                                         |
| --------------- | -------- | ------------------------------------------------------------ |
| GetCapabilities | 强制实现 | 获取WMTS的能力文档（即元数据文档），里面包含服务的所有信息   |
| GetTile         | 强制实现 | 获取地图瓦片。该操作根据客户端发出的请求参数在服务端进行检索，服务器端返回地图瓦片图像。 |
| GetFeatureInfo  | 选择实现 | 通过在WMTS图层上指定一定的条件，返回指定的地图瓦片内容对应的要素信息 |

#### 3. 服务操作的参数列表

* `GetTile`操作请求方法实现参数说明

| 参数名称                | 参数个数     | 参数类型和值                                           |
| ----------------------- | ------------ | ------------------------------------------------------ |
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

* Example:
  ```javascript
  http://develop.smaryun.com:6163/igs/rest/ogc/OGC_4326_CHINA_WMTS/WMTSServer?service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=EPSG:4326_OGC_4326_CHINA_arcgis_GB&format=image/png&layer=OGC_4326_CHINA_WMTS&tilematrix=2&tilerow=1&tilecol=7
  ```

