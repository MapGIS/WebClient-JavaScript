## 产品介绍

&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript（Openlayers）是一套基于OpenLayers的云GIS网络客户端开发平台，无缝对接MapGIS云存储、云GIS服务器与云应用产品，能有效集成云端的地图、服务与资源，提供全面的WebGIS开发应用能力，支持高效地图可视化与分析应用功能，增强了大数据、实时流数据的高效可视化表达和分析功能。该套SDK中集成了Openlayers5原生接口和MapGIS扩展的功能接口，覆盖地图显示、数据管理、查询、编辑、统计、分析、专题图、可视化、标绘等全WebGIS功能，极大的丰富了SDK的功能和应用场景，可帮助您快速构建WebGIS应用。

> MapGIS Client for JavaScript (Openlayers) SDK包含了WebGIS开发所需的开发库、API、示例等，结合<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag10/page1" target="_blank">司马云开发世界资源中心</a>的配套开发资源，以及<a href="http://www.smaryun.com/cloudlisten/index.php" target="_blank">云听社区</a>、开源社区<a href="https://github.com/MapGIS/WebClient-JavaScript" target="_blank">GitHub</a> 、<a href="https://gitee.com/osmapgis/WebClient-JavaScript" target="_blank">Gitee</a>，助力开发者高效开发。

### OpenLayers

&ensp;&ensp;&ensp;&ensp;OpenLayers是由MetaCarta（美国地理搜索技术创业公司）公司开发的用于GIS客户端的开源JavaScript包，采用纯面向对象的JavaScript方式开发，全面支持跨浏览器。为了能够在客户端更好地展现和操作地图。OpenLayers将抽象事物具体化为类，其核心类是Map、WebGLMap、Layer、Source、View，几乎所有的动作都围绕这几个核心类展开，以实现地图加载和相关操作；把整个地图看作一个容器（Map、WebGLMap），核心为地图图层（Layer）、对应图层的数据源（Source）与矢量图层样式（Style）、地图表现相关的地图视图（View），除此之外容器中还有一些特别的层和控件，地图交互操作控件，以及有绑定在Map和Layer上的一系列待请求的事件。底层是OpenLayers的数据源，即Image、GML、KML、Json、OGC服务资源等，均为source与format命名空间下的子类，这些数据经过Renderer渲染，显示在地图容器中的图层Layer上。其中，地图容器（Map、WebGLMap）与图层（Layer）的渲染，提供canvas、webgl二种渲染类型，分别由MapRenderer与LayerRenderer实现。

>详情请参考<a href="https://openlayers.org/" target="_blank">OpenLayers官网</a>地址

### 主流地图库特点

- MapboxGL：基于WebGL独立渲染的开源二维地图库，其推出的矢量瓦片可视化效果和性能都很出众，标准被业内认可；
- Leaflet：一款比较成熟的轻量级开源二维地图库，小而精悍，体验好，实践多、社区活跃、插件非常丰富，Mapbox早期的地图库就是基于Leaflet开发；
- OpenLayers：一套比较老牌和体系比较成熟的开源二维地图库，功能丰富且稳定，业内广泛使用，浏览器兼容好（兼容IE6及以上版本浏览器）；


## <span id="download">产品下载</span>

&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript为开源产品，可从司马云-云开发世界下载正式发布的产品包，也可从开源社区（Gitee、GitHub）直接获取产品源码，自行编译、打包使用：

- MapGIS官方下载地址：<a href="http://smaryun.com/dev/download_detail.html#/download828" targer="_blank">http://smaryun.com/dev/download_detail.html#/download828</a>
- GitHub 托管地址：<a href="https://github.com/MapGIS/WebClient-JavaScript" targer="_blank">https://github.com/MapGIS/WebClient-JavaScript</a>
- Gitee 托管地址：<a href="https://gitee.com/osmapgis/WebClient-JavaScript" targer="_blank">https://gitee.com/osmapgis/WebClient-JavaScript</a>


## 环境参数


### 硬件配置

推荐配置
* CUP：酷睿i7、AMD R7
* 内存：16G及以上
* 显存：独立显卡，显存8G及以上

最低配置
* CUP：酷睿i5、AMD R5
* 内存：4G及以上
* 显存：独立显卡/集成显卡，显存2G及以上


### 开发环境
* 前后台混合型项目IDE推荐：Microsoft Visual Studio（2015及以上）、MyEclipse（2019及以上）等
* 纯前端项目IDE推荐：Visual Studio Code、WebStorm等

### 浏览器兼容
* IE 11+
* Chrome 45+
* Firefox 5+
* Opera 10+
* Safari 4+

### GIS环境
​		产品融合了多种GIS服务标准，提供大量的GIS服务组件。开发时，用户可直接使用第三方已发布的GIS服务资源，也可以自行构建GIS服务器环境，支持如下MapGIS服务器产品：

* 传统高性能GIS服务器平台：提供传统GIS相关的地图服务、要素服务、分析服务等。包括<a href="http://smaryun.com/dev/download_detail.html#/download689" targer="_blank">MapGIS IGServer .NET版</a>、 <a href="http://smaryun.com/goods.php?id=3193" targer="_blank">MapGIS IGServer（九州）版</a>等版本本。产品相关安装配置和操作使用手册，请参见<a href="http://www.smaryun.com/dev/service-space/resource?from=1#/node_id75" targer="_blank">司马云-开发世界-资源中心-服务器GIS</a>；
* 大数据GIS分析服务器平台：<a href="http://www.smaryun.com/goods.php?id=2558" targer="_blank">MapGIS IGServer -X</a>，提供矢量、影像、文本等大数据分析服务，产品相关安装配置和操作使用手册，请参见<a href="http://www.smaryun.com/dev/service-space/resource?from=1#/node_id172" targer="_blank">司马云-开发世界-资源中心-云GIS-MapGIS 大数据与云平台-MapGIS IGServer-X</a>；
* 智能GIS分析服务器平台：<a href="http://www.smaryun.com/goods.php?id=2558" targer="_blank">MapGIS IGServer -S</a>，提供智能GIS服务，产品相关安装配置和操作使用手册，请参见<a href="http://www.smaryun.com/dev/service-space/resource?from=1#/node_id187" targer="_blank">司马云-开发世界-资源中心-云GIS-MapGIS 大数据与云平台-MapGIS IGServer-S</a>；


## 开发授权

​		您可以通过访问<a href="http://www.smaryun.com/" targer="_blank">司马云官方网站</a>获得开发者授权。申请免费开发授权请查看<a href="http://smaryun.com/helper.php#/16" targer="_blank">帮助中心</a>。目前，提供免费云开发授权与硬KEY开发授权两种模式，开发者可结合实际应用需求选用。
* 免费云开发授权需联网完成授权验证。 
* 硬KEY开发授权，可离线完成授权验证。


## 开发SDK

### 开发包

&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript（OpenLayers5） SDK，含WebGIS开发所需的开发库、API、示例、文档等资源，可访问<a href="http://develop.smaryun.com/#/index" target="_blank">MapGIS Client for JavaScript产品门户</a>在线体验，或<a a href="#download">下载资源</a>本地部署。

### 开发库

| 开发库 |  说明           |
| ------ | -------------- |
| webclient-openlayers-plugin.min.js / webclient-openlayers-plugin.js（可调试版） | OpenLayers5开发库，包括地图可视化、基本操作、图形绘制、事件监听等功能，支持标准的OGC服务（WMS、WFS、WCS等），提供地图显示、数据管理、查询、编辑、专题图、统计图、预案标绘、分析等全WebGIS功能，以及大数据分析相关功能 |
| include-openlayers-local.js |二次开发引用库，在此引入了MapGIS Client for JavaScript（OpenLayers5）核心库webclient-openlayers-plugin.min.js，OL5原生库，以及其他第三方库，同时提供了示例访问MapGIS IGServer服务器的配置 |

>核心库分别提供压缩版（webclient-openlayers-plugin.min.js）与开发版（webclient-openlayers-plugin.js）两个版本，min版一般在应用开发完成后发布部署阶段使用；二次开发阶段通常使用开发版，方便查阅与调试。

### 开发API

&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript为用户提供离在线API（应用程序编程接口），开发者可以通过API查找学习MapGIS提供的实现功能的方法。

- <a href="http://develop.smaryun.com/docs/openlayers/index.html" target="_blank">MapGIS Client for JavaScript（OpenLayers5） API</a>
-  <a href="https://openlayers.org/en/latest/apidoc/" target="_blank">OpenLayers5 原生API</a>

### 开发示例

&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript（Openlayers5）为用户提供了功能全面的接口示例与配套文档，支持离在线访问，源码与效果可共同展现，同时提供即时编辑与运行功能，可以帮助您进行高效开发。

- 在线使用：<a href="http://develop.smaryun.com/#/gallery/openlayers" target="_blank">MapGIS Client for JavaScript （Openlayers5）示例</a>
- 离线使用：方式一，可在云开发世界下载<a href="http://www.smaryun.com/dev/download_detail.html#/download828" target="_blank">MapGIS Client for JavaScript开发包</a>，解压后按说明步骤发布即可；方式二，可通过<a href="https://github.com/MapGIS/WebClient-JavaScript" targer="_blank">GitHub</a>、<a href="https://gitee.com/osmapgis/WebClient-JavaScript" targer="_blank">Gitee</a>获取产品源码，按说明文档编译运行。

## 模块说明

MapGIS Client for JavaScript（OpenLayers5）对接云GIS产品，提供地图显示、数据管理、查询、编辑、专题图、统计图、预案标绘、分析等全WebGIS功能，以及大数据与智能GIS功能。

### API 功能体系（导图）

<center>
  <img src="./static/demo/openlayers/source/img/webclient-openlayers-plugin.png" alt="openlayers API结构" style="zoom:50%;" />
  <br>
  <div class="notes">基于openlayers扩展的mapgis开发接口</div>
</center>
<br/>

### API 结构说明

&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript（OpenLayers5）的**核心库**为**webclient-openlayers-plugin.min.js**，此开发库实质上是在Web客户端层对调用MapGIS IGServer等云GIS服务器提供的服务的接口封装，通过简便的功能控件、接口便能直接获取使用云GIS服务器提供的数据与功能服务资源。

&ensp;&ensp;&ensp;&ensp;OpenLayers具有强大的互联网地图展现能力，并支持跨各种主流浏览器。此开发库充分借鉴了OpenLayers纯面向对象的开发思想，对接MapGIS IGServer等云GIS服务器产品，在OpenLayers5框架的基础上进行扩展，构造了调用MapGIS IGServer数据服务和功能服务的相关类，将前端OpenLayers5与云GIS服务器融合，富端强云的结合将会给开发和应用带来更大的便捷、更好客户端体验。

<center>
  <img src="./static/demo/openlayers/source/img/OL5 API结构.png" alt="OL5 API结构" style="zoom:80%;" />
  <br>
  <div class="notes">基于OpenLayers5扩展的mapgis开发接口</div>
</center>
<br/>

- Map命名空间：调用地图数据资源的类，如矢量地图文档服务、瓦片地图服务等；
- Service命名空间：调用GIS功能资源服务的类，如查询、编辑、分析等功能服务；
- Object命名空间：结构类，或者MapGIS对象类，主要协助地图数据资源类和GIS功能资源类完成资源调用功能。

> 调用云GIS服务器资源的类都以简单明了代表实际意义的英文名称来命名，方便用户获取资源调用接口。具体请查看配套的OpenLayers5 API，在API文档中每个类说明的最前面的文字内容写明了该类的继承类（父类）和子类，供广大用户学习和参考。


## 版本说明

### <font color=red>V10.6.0.10</font>

- 维护更新，修复若干Bug

### <font color=red>V10.5.6.10</font>

- 维护更新，修复若干Bug

### <font color=red>V10.5.4.10</font>

- 维护更新，修复若干Bug

### <font color=red>V10.5.2.10</font>

1. 功能新增
- OpenLayers示例全面优化，提供配套示例说明文档与API；
- 丰富了对接MapGIS IGServer服务的功能示例，包括图层要素、文档类别的查询、编辑、分析功能等。

2. 性能优化-无

3. 站点维护
- 示例说明文档美化

### <font color=red>V10.5.0.10</font>

1. 全面整合了OpenLayers与zondyclient等脚本库，代码模块化，采用最新的JavaScript ES6标准；
2. 提供OpenLayers开发库、示例、API，支持基于OpenLayers5的二维数据可视化（含OGC、MapGIS地图服务、第三方地图服务等）、量算、查询编辑、空间分析、专题图，以及大数据可视化与分析等功能；
3. 新增集成 Turf.js客户端空间分析库，提供客户端空间计算能力，支持实现在客户端层的空间分析、拓扑分析、空间关系计算等功能。



##第三方依赖


-  OpenLayers：专为WebGIS 客户端开发提供的JavaScript 类库包，目前主流地图可视化引擎之一（<a href="https://openlayers.org/" target="_blank">https://openlayers.org/</a>）

- ECharts：基于 JavaScript 的开源可视化图表库（<a href="https://echarts.apache.org/zh/index.html" target="_blank">https://echarts.apache.org/zh/index.html</a>）

- MapV：地理信息可视化开源库（<a href="https://mapv.baidu.com/" target="_blank">https://mapv.baidu.com/</a>）

- Turf：客户端空间分析开源库（<a href="https://turfjs.org/" target="_blank">https://turfjs.org/</a>）

- D3：基于Web标准的JavaScript图形可视化库（<a href="https://d3js.org/" target="_blank">https://d3js.org/</a>）







