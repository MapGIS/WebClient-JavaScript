## 产品介绍

&ensp;&ensp;&ensp;MapGIS Client for JavaScript (Cesium) 是基于WebGL的轻量级三维GIS网络客户端开发平台，实现跨终端、跨浏览器、无插件的三维GIS应用开发。该产品提供全面的三维GIS应用开发能力，从地上到地下、从室外到室内、从宏观到微观、从静态到动态，为用户打造全空间一体化的跨平台多端应用体验。

> MapGIS Client for JavaScript (Cesium) SDK包含了三维WebGIS开发所需的开发库、API、示例等，结合<a href="http://www.smaryun.com/dev/service-space/resource?from=1#/node_id463" target="_blank">司马云-开发世界-资源中心</a>的配套开发资源，以及<a href="http://www.smaryun.com/cloudlisten/index.php" target="_blank">云听社区</a>、开源社区<a href="https://github.com/MapGIS/WebClient-JavaScript" target="_blank">GitHub</a> 、<a href="https://gitee.com/osmapgis/WebClient-JavaScript" target="_blank">Gitee</a>，助力开发者高效开发。


## <span id="download">产品下载</span>

&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript为开源产品，可从司马云-云开发世界下载正式发布的产品离线资源包，也可从开源社区（Gitee、GitHub）直接获取产品源码，自行编译、打包使用。还可以通过NPM包方式引入产品开发库：

- MapGIS官方下载地址：<a href="http://smaryun.com/dev/download_detail.html#/download828" targer="_blank">http://smaryun.com/dev/download_detail.html#/download828</a>

- GitHub 托管地址：<a href="https://github.com/MapGIS/WebClient-JavaScript" targer="_blank">https://github.com/MapGIS/WebClient-JavaScript</a>

- Gitee 托管地址：<a href="https://gitee.com/osmapgis/WebClient-JavaScript" targer="_blank">https://gitee.com/osmapgis/WebClient-JavaScript</a>

- MapGIS相关NPM包资源地址：<a href="https://www.npmjs.com/org/mapgis" targer="_blank">https://www.npmjs.com/org/mapgis</a>

  


## 产品特性

### 全空间的数据融合能力

- 提供地上地下、室内室外、空中地表全空间多源数据集成，从宏观到微观展示城市空间全要素。
- 支持各类栅影像、矢量、切片、地形、手工建模数据、地下管线、倾斜摄影模型、BIM、激光点云、三维场数据、地质体数据模型、物感实时数据等全时空数据一体化高效渲染和多样化展示
- 对接开放的M3D，全面、高效支持多类型、多格式的三维数据与功能
- 融合多种标准服务，包括MapGIS、OGC、第三方在线地图服务、通用开源数据服务、异构GIS平台服务等标准地图服务、要素服务
- 融合M3D数据标准、3DTiles、*.kml、*.gltf、Geojson、czml等三维数据服务

### 大体量数据承载及渲染

- 通过建立LOD、多级缓存、数据高效压缩等多种优化措施，支持大数据量地形可视化，以及多层影像数据的叠加显示。
- 通过多级LOD技术，视锥体裁剪、可视范围调度等技术支持海量三维模型数据的快速渲染。
- 支持海量三维数据网络应用数据交换格式（M3D），对海量三维模型数据进行网格划分与分层组织，采用流式传输模式，实现多端一体的高效解析和渲染。

### 强大的空间数据三维分析能力

- 全空间数据操作交互，支持二三维要素与数据的多样化查询、编辑，增强单体化功能
- 全空间多维度量算，支持距离量算、面积量算、高度量算等功能
- 全空间一体化分析，支持地形分析、压平分析、动态剖切、阴影率、模型爆炸、可视域、洪水淹没、填挖方计算、剖面、控高等客户端三维分析功能模型压平、X射线、动态剖切、阴影率分析、模型爆炸分析等三维专业分析，- 可视域分析、透明地表、地形开挖、洪水淹没分析、填挖方计算等地形分析功能
- 新增支持三维仿真模拟功能，包括时空演变、单体建筑物生长、城市生长、积水仿真等
- 新增BIM构件树、分层分户等CIM行业应用功能

### 炫酷的大数据客户端可视化

- 通过开源技术（EchartGL、MapV、d3等），提供蜂窝图、热力图、聚类、密度、时空立方体等多种客户端可视化表达方式。
- 支持大体量的实时数据客户端绘制渲染，广泛应用于车联网、物联网，实现轨迹跟踪、轨迹渲染、实时视频投影等应用场景。
- 增强粒子特效，实现逼真的雨雪雾、火焰、水面、动态草地等动态效果，并支持用户定制复杂的粒子效果与运动轨迹
- 多样化三维特效，支持行人漫游、动态围墙、动态圆、雷达扫描圆等显示特效，以及泛光、景深、扫描线等后处理特效
- 于SVG实现大数据专题图的无损缩放和动态交互



## 环境参数


### 硬件配置

推荐配置
* CUP：酷睿i7、AMD R7
* 内存：16G及以上
* 显存：独立显卡，显存8G及以上

最低配置
* CUP：酷睿i5、AMD R5
* 内存：4G及以上
* 显存：独立显卡，显存2G及以上


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
产品融合了多种GIS服务标准，提供大量的GIS服务功能及纯前端GIS功能。开发时，用户按需选择使用已发布的GIS服务资源，或者构建GIS服务器环境，支持如下MapGIS服务器产品提供的各种服务：

* 传统高性能GIS服务器平台：提供传统GIS相关的地图服务、要素服务、分析服务等。包括<a href="http://smaryun.com/dev/download_detail.html#/download689" targer="_blank">MapGIS IGServer .NET版</a>、 <a href="http://smaryun.com/goods.php?id=3193" targer="_blank">MapGIS IGServer（九州）版</a>等版本本。产品相关安装配置和操作使用手册，请参见<a href="http://www.smaryun.com/dev/service-space/resource?from=1#/node_id75" targer="_blank">司马云-开发世界-资源中心-服务器GIS</a>；
* 大数据GIS分析服务器平台：<a href="http://www.smaryun.com/goods.php?id=2558" targer="_blank">MapGIS IGServer -X</a>，提供矢量、影像、文本等大数据分析服务，产品相关安装配置和操作使用手册，请参见<a href="http://www.smaryun.com/dev/service-space/resource?from=1#/node_id172" targer="_blank">司马云-开发世界-资源中心-云GIS-MapGIS 大数据与云平台-MapGIS IGServer-X</a>；
* 智能GIS分析服务器平台：<a href="http://www.smaryun.com/goods.php?id=2558" targer="_blank">MapGIS IGServer -S</a>，提供智能GIS服务，产品相关安装配置和操作使用手册，请参见<a href="http://www.smaryun.com/dev/service-space/resource?from=1#/node_id187" targer="_blank">司马云-开发世界-资源中心-云GIS-MapGIS 大数据与云平台-MapGIS IGServer-S</a>；



## 开发授权

&ensp;&ensp;&ensp;&ensp;您可以通过访问<a href="http://www.smaryun.com/" targer="_blank">司马云官方网站</a>获得开发者授权。申请免费开发授权请查看<a href="http://smaryun.com/helper.php#/16" targer="_blank">帮助中心</a>。目前，提供免费云开发授权与硬KEY开发授权两种模式，开发者可结合实际应用需求选用。
* 免费云开发授权需联网完成授权验证。 
* 硬KEY开发授权，可离线完成授权验证。


## 开发SDK

### 开发包

&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript（Cesium） SDK，包含三维WebGIS开发所需的开发库、API、示例、文档等资源，可访问<a href="http://develop.smaryun.com/#/index" target="_blank">MapGIS Client for JavaScript产品门户</a>在线体验，或<a a href="#download">下载资源</a>本地部署。

### 开发库


| 开发库 |  说明           |
| ------------ | -------------- |
| webclient-cesium-plugins.min.js / webclient-cesium-plugins.js | WebGL开发库，基于cesium原生库扩展，对接云GIS服务器产品，支持三维场景操作管理、二三维地图可视化（M3D图层、OGC、互联网地图服务、MapGIS地图服务、通用数据等）、图形绘制、三维数据查询、三维空间分析、轨迹模拟、场景漫游，含场景特效、热力图、动态扫描圆等客户端可视化功能，以及对接大数据应用的客户端可视化与空间分析相关功能 |
| include-cesium-local.js | 二次开发引用库，在此引入了for WebGL的核心库webclient-cesium-plugins.min.js，cesium原生库，以及其他第三方库，同时提供了示例访问MapGIS IGServer服务器的配置 |
<br>

>核心库分别提供压缩版（webclient-cesium-plugins.min.js）与开发版（webclient-cesium-plugins.js）两个版本，min版一般在应用开发完成后发布部署阶段使用；二次开发阶段通常使用开发版，方便查阅与调试。

### API参考

- <a href="http://develop.smaryun.com/docs/cesium/index.html" target="_blank">MapGIS Client for JavaScript（Cesium） API</a>
- <a href="http://develop.smaryun.com/docs/other/mapgis-cesium/index.html" target="_blank">MapGIS Cesium内核扩展API</a>

### 开发示例

- 在线体验：<a href="http://develop.smaryun.com/#/gallery/cesium" target="_blank">MapGIS Client for JavaScript （Cesium）示例</a>
- 离线使用：方式一，可在司马云-云开发世界下载<a href="http://www.smaryun.com/dev/download_detail.html#/download828" target="_blank">MapGIS Client for JavaScript开发包</a>，解压后按说明步骤发布即可；方式二，可通过<a href="https://github.com/MapGIS/WebClient-JavaScript" targer="_blank">GitHub</a>、<a href="https://gitee.com/osmapgis/WebClient-JavaScript" targer="_blank">Gitee</a>获取产品源码，按说明文档，自动编译、运行。



## 模块说明

<center>
  <img src="./static/demo/cesium/source/img/Cesium API结构.png" alt="Cesium API结构" style="zoom:50%;" />
  <br>
  <div class="notes">基于Cesium扩展的mapgis开发接口</div>
</center>

<br/>

## 版本说明

### <font color=red>V10.6.0.10</font>

1. 功能新增
- 新增瓦片错级机制
- 长度测量，增加避让处理、单位转换等功能，支持样式配置
- 注记图层增加控制可见性、显示文本长度等参数
- 动画漫游新增获取模型的方法、设定点不同速度漫游场景等功能

2. 功能优化
- 提升MapGIS矢量图层能力，提升filter查询、多区绘制、系统库设置等能力，支持设置线矢量图层的高度
- 解决动画漫游设定速度和时间数组中方向向量计算问题
- 优化地形图层、注记图层等图层定位、及显示显示
- 优化测量，包括三角测量、贴地测量等功能
- 优化阴影分析、动画漫游等分析功能
- 优化多个接口，新增多个属性

### <font color=red>V10.5.6.10</font>

1. 功能新增
- 注记图层增加最大显示文本长度参数
- 注记图层增加根据相机远近设置可见性的控制参数
- 增加OGC WFS加载接口
- 新增动态圆波纹后处理特效
- 新增雷达扫描后处理特效
- 模型图层加载新增支持跳转动画

2. 功能优化
- 解决地形剖切结果echart对象无法修改大小
- 修改地形压平后为避免影响默认相机加载地形瓦片


### <font color=red>V10.5.4.10</font>

1. 功能新增
- 新增MapGIS注记服务图层
- 添加服务数据接口新增是否开启缓存参数
- 新增支持webMercator坐标系MapGIS地图文档服务
- 新增地形剖切功能
- 新增支持beijing54椭球类型
- 新增支持基于indexDB实现M3D 2.0数据的前端属性存储和查询功能
- 新增支持M3D数据属性信息前端挂接
- 新增支持M3D数据OID拾取

2. 功能优化
- 优化DrawElement增加销毁对象方法
- 优化使用缓存后，数据稍大交互后无法正确加载数据
- 解决坡度坡向分析时，渲染结果不消失问题
- 优化数据加载性能
- 解决DrawElement对象造成鼠标移动卡顿问题
- 解决样式存在冲突的问题，统一加前缀
- popup的visible参数不支持v-model
- 解决加载mapgis三维地图文档服务时需要支持图层过滤

3. 开发资源丰富
- 新增多个三维示例


### <font color=red>V10.5.2.10</font>

1. 功能新增
- 实现模型压平功能,支持任意凸多边形的压平
- 优化粒子特效：优化雨雪雾粒子效果，提升真实度；新增火焰、喷泉粒子特效、以及烟雾粒子特效
- 提供解压M3D压缩数据流的功能，客户端支持将压缩的流进行高效解压，并渲染

2. 性能优化
- 海量倾斜摄影数据缓存结构优化策略升级，提高网络传输效率以及前端渲染效率
- 加载渲染亿级Las格式点云数据，帧率在15帧以上，交互流畅；
- 加载渲染亿级地质网格剖分结果数据，帧率在15帧以上，交互流畅；
- 加载渲染千万级三角网单个地质体数据，帧率在15帧以上，交互流畅；
- 加载渲染500平方公里以上倾斜模型，帧率在15帧以上，交互流畅；

3. 站点维护
- 示例说明文档美化


### <font color=red>V10.5.0.10</font>

1. 全面整合了Cesium等脚本库，代码模块化，采用最新的JavaScript ES6标准；
2. 提供Cesium开发库、示例、API，支持二三维数据可视化（含M3D、OGC、MapGIS地图服务、第三方地图服务等）、图形绘制、量算、模型漫游、三维查询与分析、场景特效，以及三维场景下的大数据可视化与分析等功能；
3. Cesium示例全面优化，提供配套示例说明文档与API；
4. 新增集成Echarts、MapV可视化库，支持在Web三维模式下实现大数据可视化、大数据分析功能；
5. 新增集成 Turf.js客户端空间分析库，提供Web三维客户端空间计算能力。



## 第三方依赖



-  Cesium：用于显示三维地球和地图的开源JavaScript库，基于WebGL的地图引擎（<a href="https://cesium.com/platform/cesiumjs/" target="_blank">https://cesium.com/platform/cesiumjs/</a>）

- ECharts：基于 JavaScript 的开源可视化图表库（<a href="https://echarts.apache.org/zh/index.html" target="_blank">https://echarts.apache.org/zh/index.html</a>）

- MapV：地理信息可视化开源库（<a href="https://mapv.baidu.com/" target="_blank">https://mapv.baidu.com/</a>）

- Turf：客户端空间分析开源库（<a href="https://turfjs.org/" target="_blank">https://turfjs.org/</a>）

- D3：基于Web标准的JavaScript图形可视化库（<a href="https://d3js.org/" target="_blank">https://d3js.org/</a>）








