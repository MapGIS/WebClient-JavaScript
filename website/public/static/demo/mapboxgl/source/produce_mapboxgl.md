## 产品介绍

&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript（MapboxGL）是一套基于MapboxGL的云GIS网络客户端开发平台，无缝对接MapGIS云存储、云GIS服务器与云应用产品，能有效集成云端的地图、服务与资源，提供全面的WebGIS开发应用能力，支持高效地图可视化与分析应用功能，增强了大数据、实时流数据的高效可视化表达和分析功能。该套SDK中集成了MapboxGL原生接口和MapGIS扩展接口，覆盖地图显示、数据管理、查询、编辑、统计、专题图、可视化、标绘、分析等全WebGIS功能，极大的丰富了SDK的功能和应用场景，可帮助您快速构建WebGIS应用。

> MapGIS Client for JavaScript (MapboxGL) SDK包含了WebGIS开发所需的开发库、API、示例等，结合<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag10/page1" target="_blank">司马云开发世界资源中心</a>的配套开发资源，以及<a href="http://www.smaryun.com/cloudlisten/index.php" target="_blank">云听社区</a>、开源社区<a href="https://github.com/MapGIS/WebClient-JavaScript" target="_blank">GitHub</a> 、<a href="https://gitee.com/osmapgis/WebClient-JavaScript" target="_blank">Gitee</a>，助力开发者高效开发。

### MapboxGL地图框架

&ensp;&ensp;&ensp;&ensp;MapboxGLJS（mapbox-gl.js ）是Mapbox（即数字地图初创企业，成立于2010年，旨在为企业提供一系列GIS工具）提供的一个开源JavaScript库，使用WebGL渲染交互式矢量瓦片地图和栅格瓦片地图。WebGL渲染意味着高性能，MapboxGL能够渲染大量的地图要素，拥有流畅的交互以及动画效果、可以显示立体地图并且支持移动端，是一款十分优秀的WebGIS开发框架。mapbox-gl.js作为前端渲染矢量瓦片交互地图的工具，支持Mapbox Style样式设置，这是它最为吸引人的特性之一。需要注意的是，mapbox-gl.js是使用WebGL技术独立渲染前端库，浏览器必须支持WebGL渲染。

>详情请参考<a href="https://www.mapbox.com/mapbox-gl-js/api/" target="_blank">Mapbox-GL官网</a>地址


### 主流地图库特点

- Mapbox-GL：基于WebGL独立渲染的开源二维地图库，其推出的矢量瓦片可视化效果和性能都很出众，标准被业内认可；
- Leaflet：一款比较成熟的轻量级开源二维地图库，小而精悍，体验好，实践多、社区活跃、插件非常丰富，Mapbox早期的地图库就是基于Leaflet开发；
- OpenLayers：一套比较老牌和体系比较成熟的开源二维地图库，功能丰富且稳定，业内广泛使用，浏览器兼容好（兼容IE6及以上版本浏览器）；

## <span id="download">产品下载</span>

&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript为开源产品，可从司马云-云开发世界下载正式发布的产品包，也可从开源社区（Gitee、GitHub）直接获取产品源码，自行编译、打包使用。还可以通过NPM包方式引入产品：

- MapGIS官方下载地址：<a href="http://smaryun.com/dev/download_detail.html#/download828" targer="_blank">http://smaryun.com/dev/download_detail.html#/download828</a>
- GitHub 托管地址：<a href="https://github.com/MapGIS/WebClient-JavaScript" targer="_blank">https://github.com/MapGIS/WebClient-JavaScript</a>
- Gitee 托管地址：<a href="https://gitee.com/osmapgis/WebClient-JavaScript" targer="_blank">https://gitee.com/osmapgis/WebClient-JavaScript</a>
- MapGIS相关NPM包资源地址：<a href="https://www.npmjs.com/org/mapgis" targer="_blank">https://www.npmjs.com/org/mapgis</a>


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

&ensp;&ensp;&ensp;您可以通过访问<a href="http://www.smaryun.com/" targer="_blank">司马云官方网站</a>获得开发者授权。申请免费开发授权请查看<a href="http://smaryun.com/helper.php#/16" targer="_blank">帮助中心</a>。目前，提供免费云开发授权与硬KEY开发授权两种模式，开发者可结合实际应用需求选用。
* 免费云开发授权需联网完成授权验证。 
* 硬KEY开发授权，可离线完成授权验证。


## 开发SDK

### 开发包

&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript（MapboxGL） SDK，含WebGIS开发所需的开发库、API、示例、文档等资源，可访问<a href="http://develop.smaryun.com/#/index" target="_blank">MapGIS Client for JavaScript产品门户</a>在线体验，或<a a href="#download">下载资源</a>本地部署。

### 开发库

| 开发库 |  说明           |
| ------ | -------------- |
| webclient-mapboxgl-plugin.min.js / webclient-mapboxgl-plugin.js（可调试版） | MapboxGL开发库，包括基本操作、图形绘制、事件监听等功能，同时支持标准的OGC服务（WMS、WFS、WCS等），提供显示、数据管理、查询、编辑、专题图、统计图、分析等全WebGIS功能，以及大数据分析相关功能，其矢量大数据功能如矢量瓦片比较出众 |
| include-mapboxgl-local.js | 二次开发引用库，在此引入了MapGIS Client for JavaScript（MapboxGL）的核心库webclient-mapboxgl-plugin.min.js， MapboxGL原生库，以及其他第三方库，同时提供了示例访问MapGIS IGServer服务器的配置 |

>核心库分别提供压缩版（webclient-mapboxgl-plugin.min.js）与开发版（webclient-mapboxgl-plugin.js）两个版本，min版一般在应用开发完成后发布部署阶段使用；二次开发阶段通常使用开发版，方便查阅与调试。


### API参考

- <a href="http://develop.smaryun.com/docs/mapboxgl/index.html" target="_blank">MapGIS Client for JavaScript（MapboxGL） API</a>
- <a href="https://www.mapbox.com/mapbox-gl-js/api/" target="_blank">MapboxGL API</a>

### 开发示例

&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript（MapboxGL）为用户提供了功能全面的接口示例与配套文档，支持离在线访问，源码与效果可共同展现，同时提供即时编辑与运行功能，可以帮助您进行高效开发。

- 在线使用：<a href="http://develop.smaryun.com/#/gallery/mapboxgl" target="_blank">MapGIS Client for JavaScript （MapboxGL）示例</a>
- 离线使用：方式一，可在云开发世界下载<a href="http://www.smaryun.com/dev/download_detail.html#/download828" target="_blank">MapGIS Client for JavaScript开发包</a>，解压后按说明步骤发布即可；方式二，可通过<a href="https://github.com/MapGIS/WebClient-JavaScript" targer="_blank">GitHub</a>、<a href="https://gitee.com/osmapgis/WebClient-JavaScript" targer="_blank">Gitee</a>获取产品源码，按说明文档编译运行。

## 模块说明
&ensp;&ensp;&ensp;&ensp;MapboxGL是一个使用WebGL技术独立渲染地图前端库，底层采用WebGL实现，性能和体验显著的提升，主要作为前端渲染矢量瓦片交互地图的工具。此核心库基于MapboxGL框架，对接MapGIS云GIS服务器产品，在MapboxGL框架的基础上进行扩展，封装了云GIS服务器提供的各类数据服务和功能服务资源，将前端MapboxGL与云GIS服务器融合，富端强云的结合将会给开发和应用带来更大的便捷、更好客户端体验，其矢量大数据能力突出、性能出色。

<center>
  <img src="./static/demo/mapboxgl/source/img/webclient-mapbox-plugin.png" alt="MapBoxGL API结构" style="zoom:50%;" />
  <br>
  <div class="notes">基于MapBoxGL扩展的mapgis开发接口</div>
</center>
<br/>


## 版本说明

### <font color=red>V10.6.0.10</font>

- 维护更新，修复若干Bug

### <font color=red>V10.5.6.10</font>

- 维护更新，修复若干Bug

### <font color=red>V10.5.4.10</font>

- 维护更新，修复若干Bug

### <font color=red>V10.5.2.10</font>

1. 功能新增
- 新增直接支持ArcGIS地图服务与OGC服务；
- 新增PostGIS支持，可实现基于PostGIS的数据查询统计、实时矢量瓦片等功能；
- 新增支持ElasticSearch的分布式大数据搜索与分析能力，可实现热力分析、聚类分析等功能。

2. 性能优化-无

3. 站点维护
- 示例说明文档美化


### <font color=red>V10.5.0.10</font>

1. 全面整合了MapboxGL等脚本库，代码模块化，采用最新的JavaScript ES6标准；
2. 提供MapboxGL开发库、示例、API，支持基于MapboxGL的二维数据可视化（含OGC、MapGIS地图服务、第三方地图服务等）、量算、查询编辑、空间分析、专题图，以及大数据可视化与分析等功能；
3. 新增集成Echarts、Echarts GI、MapV可视化库，支持在Web三维模式下实现大数据可视化、大数据分析功能；
4. 新增集成 Turf.js客户端空间分析库，提供客户端空间计算能力，支持实现在客户端层的空间分析、拓扑分析、空间关系计算等功能；
5. MapboxGL示例全面优化，提供配套示例说明文档与API。



## 第三方依赖

- MapboxGL：使用WebGL技术独立渲染的开源JavaScript库，作为前端渲染矢量瓦片交互地图的工具（<a href="https://docs.mapbox.com/mapbox-gl-js/api/" target="_blank">https://docs.mapbox.com/mapbox-gl-js/api/</a>）

- ElasticSearch：分布式搜索与分析引擎（<a href="https://www.elastic.co/cn/" target="_blank">https://www.elastic.co/cn/</a>）

- PostGIS：是PostgreSQL的一个扩展，遵循OpenGIS的规范，提供空间信息服务功能-空间对象、空间索引、空间操作函数和空间操作符（<a href="http://postgis.net/" target="_blank">http://postgis.net/</a>）

- ECharts：基于 JavaScript 的开源可视化图表库（<a href="https://echarts.apache.org/zh/index.html" target="_blank">https://echarts.apache.org/zh/index.html</a>）

- MapV：地理信息可视化开源库（<a href="https://mapv.baidu.com/" target="_blank">https://mapv.baidu.com/</a>）

- Turf：客户端空间分析开源库（<a href="https://turfjs.org/" target="_blank">https://turfjs.org/</a>）

- D3：基于Web标准的JavaScript图形可视化库（<a href="https://d3js.org/" target="_blank">https://d3js.org/</a>）








