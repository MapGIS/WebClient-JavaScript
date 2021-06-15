## 准备开发

&ensp; &ensp; &ensp; &ensp; 进行 WebGIS 应用开发，一般均采用前端开发库+GIS 服务的模式，开发者须完成如下三个步骤：

&ensp; &ensp; &ensp; &ensp; **第一步：<font color=red>安装配置开发环境</font>，包括 MapGIS 开发环境（含开发授权）、集成开发环境；**

&ensp; &ensp; &ensp; &ensp; 根据实际应用需求，选择. NET 或九州系列 MapGIS 开发平台产品安装，通常包括 MapGIS Desktop 桌面工具、MapGIS IGServer 等云 GIS 产品。

&ensp; &ensp; &ensp; &ensp; 例如选用. NET 版本，常用环境如下：

- MapGIS 开发包：<a href="http://smaryun.com/dev/download_detail.html#/download689" targer="_blank">MapGIS IGServer . NET x64 for Windows 开发包</a>
- MapGIS 开发授权：<a href="http://www.smaryun.com/dev/dev_auth_detail.php" targer="_blank">云开发授权</a>（基础版/高级版）
- 集成开发环境：Visual Studio Code

&ensp; &ensp; &ensp; &ensp; **第二步：<font color=red>发布 GIS 服务资源</font>，在 MapGIS IGServer 的服务管理器中发布所需的地图服务，以及扩展的功能服务等；**

&ensp; &ensp; &ensp; &ensp; 基于 MapGIS Server Manager 发布地图服务的具体操作，请查看**MapGIS IGServer 操作手册**（<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag206/page1/doc770" target="_blank">. NET 版</a>，<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag212/page1/doc823" target="_blank">九州版</a>）

&ensp; &ensp; &ensp; &ensp; 在访问 MapGIS IGServer 的服务时，需要先确定 GIS 服务器 IP 地址与服务端口号；在二次开发时，根据所使用的 MapGIS IGServer 平台版本以及其服务管理器中 IGServer 配置情况（ip、port），对二次开发接口中涉及的地图服务访问的 ip、port 进行相应设置。

- . NET 版：IGServer 服务管理器访问默认地址（127.0.0.1:9999）、IGServer 服务访问默认基地址（127.0.0.1:6163）
- 九州版：IGServer 服务管理器访问默认地址（127.0.0.1:8089）、IGServer 服务访问默认基地址（127.0.0.1:8089）

&ensp; &ensp; &ensp; &ensp; **第三步：<font color=red>获取前端开发库（MapGIS Client for JavaScript 开发库）</font>**，通过文件拷贝或 npm 方式引用开发库，进行 WebGIS 二维或三维应用开发。

- MapGIS 官方下载地址：<a href="http://smaryun.com/dev/download_detail.html#/download828" targer="_blank">http://smaryun.com/dev/download_detail.html#/download828</a>
- GitHub 托管地址：<a href="https://github.com/MapGIS/WebClient-JavaScript" targer="_blank">https://github.com/MapGIS/WebClient-JavaScript</a>
- Gitee 托管地址：<a href="https://gitee.com/osmapgis/WebClient-JavaScript" targer="_blank">https://gitee.com/osmapgis/WebClient-JavaScript</a>

### 引入开发库

#### 文件方式（离线）

&ensp; &ensp; &ensp; &ensp; 请下载 MapGIS Client for JavaScript 开发包，将开发库目录 libs 下的 cdn 文件夹与 include-xx.js 文件放在工程同一目录下，然后在网页中引入对应的 include-xx.js 文件即可，可以将整个目录[..\static\libs]拷贝到工程中

> 离线版本的核心原理就是根据 include=""中的名字，在当前 cdn 文件夹下寻找对应的 js 的脚本并按照规定的顺序引入到浏览器中
> “include-\*.js 通过 include="xxx"的方式自动寻找引入对应的第三方脚本”

&ensp; &ensp; &ensp; &ensp; 新建一个 HTML 文件，在 <head> 标签中引入 MapGIS Client for JavaScript（MapboxGL）的开发库：

- Example:

```javascript
<script src="libs/include-mapboxgl-local.js"> </script>
```

<img src="./static/demo/mapboxgl/source/img/开发库.png" alt="MapGIS Client for JavaScript开发库" style="zoom:80%; " />

#### npm 方式引用

&ensp;&ensp;&ensp;&ensp;使用此方式前请先检查电脑中是否已安装应用程序 <a href="https://nodejs.org/en/">Node.js</a>，若未安装，需要先安装<a href="https://nodejs.org/en/">Node.js</a>环境。

&ensp;&ensp;&ensp;&ensp;由于本公司在开源的 mapbox-gl 地图引擎上做了一定修改，所以在引入 mapbox-gl 地图引擎时需要通过以下 npm 指令引入。

- Example:

  ```javascript
  npm install @mapgis/mapbox-gl
  ```

&ensp;&ensp;&ensp;&ensp;通过 npm 指令引入 MapGIS Client for JavaScript 开发包。



## 开始开发

&ensp; &ensp; &ensp; &ensp; 先根据“开发环境”要求安装配置好 MapGIS 开发环境（含 MapGIS 云开发授权），然后获取 MapGIS Client for JavaScript（MapboxGL）SDK 进行二次开发。

&ensp; &ensp; &ensp; &ensp; 下面使用 H5 原生 JS 方式，演示如何在网页中显示一幅 MapGIS 矢量地图。

### 数据准备

&ensp; &ensp; &ensp; &ensp; 本示例使用 MapGIS 官方云端（develop.smaryun.com）已经发布的名称为“北京市”（或“SampleDoc”）的地图文档进行演示。若您需要显示自己的地图文档，需要先附加待显示地图数据所在的地理数据库，然后通过**MapGIS Server Manager**配置 GIS 服务环境并发布地图服务。

<center>
  <img src="./static/demo/mapboxgl/source/img/MapGIS发布服务.png" alt="MapGIS服务发布" style="zoom:80%; " />
  <br>
  <div class="notes">MapGIS Server Manager发布服务</div>
</center>
<br/>

> 基于 MapGIS Server Manager 发布地图服务的具体操作，请查看**MapGIS IGServer 操作手册**（<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag206/page1/doc770" target="_blank">. NET 版</a>，<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag212/page1/doc823" target="_blank">九州版</a>）

### 开发入门：创建一幅地图

> 本示例使用的开发集成工具为 Visual Studio Code（简称 VSCode），您可以根据开发习惯选择适合自己的开发工具

#### Step 1. 新建 Web 网站

&ensp; &ensp; &ensp; &ensp; 在 VSCode 或本地磁盘中新建一个文件目录作为 Web 网站目录，名称为 MapDisplay；

<center>
  <img src="./static/demo/mapboxgl/source/img/01.新建网站目录.png" alt="新建网站目录" style="zoom:80%; " />
  <br>
  <div class="notes">新建网站目录</div>
</center>
<br/>

#### Step 2. 引入 JavaScript 开发库（离线方式）

&ensp; &ensp; &ensp; &ensp; 在新建的 Web 网站（文件目录）中，拷贝 MapGIS Client for JavaScript（MapboxGL）开发库到网站根目录下，即将 SDK 包路径 MapGIS Client for JavaScript_V10.5. X. X\static\libs 的 libs 拷贝到“MapDisplay”目录下。此 libs 包含了全部的开发库（js 与 css 文件），可选择只拷贝 MapboxGL 的库。

<center>
  <img src="./static/demo/mapboxgl/source/img/02.引用脚本库资源.png" alt="引入脚本库资源" style="zoom:80%; " />
  <br>
  <div class="notes">引入脚本库资源</div>
</center>
<br/>

#### Step 3. 加载显示地图

(1) 在上述新建的网站中，通过新建文件方式，创建一个名称为“MapDocDisplay”的 html 网页文件，可通过自定义模板快速创建网页结构内容；

<center>
  <img src="./static/demo/mapboxgl/source/img/03.新建HTML页面（空）.png" alt="新建HTML页面（空）" style="zoom:80%; " />
  <br>
  <div class="notes">新建HTML页面（空）</div>
</center>
<br/>

<center>
  <img src="./static/demo/mapboxgl/source/img/03.新建HTML页面（模板）.png" alt="新建HTML页面（模板）" style="zoom:80%; " />
  <br>
  <div class="notes">新建HTML页面（模板）</div>
</center>
<br/>

(2) 设置示例标题，在该页面引入 MapboxGL 开发的必要脚本库 include-mapboxgl-local.js，此脚本库会动态引入核心库 webclient-mapboxgl-plugin.min.js 与相关第三方库、样式文件等；

<center>
  <img src="./static/demo/mapboxgl/source/img/04.引用开发库.png" alt="引用开发库" style="zoom:80%; " />
  <br>
  <div class="notes">引用开发库</div>
</center>
<br/>

(3) 创建一个 ID 为“mapCon”的 div 层，并设置其样式，用来作为显示矢量地图文档的地图容器;

<center>
  <img src="./static/demo/mapboxgl/source/img/05.创建div层并设置样式.png" alt="创建div层并设置样式" style="zoom:80%; " />
  <br>
  <div class="notes">创建div层并设置样式</div>
</center>
<br/>

(4) 通过 body 的 onload 事件触发调用矢量地图文档显示的脚本函数 init()；

<center>
  <img src="./static/demo/mapboxgl/source/img/06. body的onload事件.png" alt="body的onload事件" style="zoom:80%; " />
  <br>
  <div class="notes">body的onload事件</div>
</center>
<br/>

- Example:

```HTML
  <body onload="init()">
      <div id="mapCon" style="width: 100%; height: 100%; position: absolute;">
      </div>
  </body>
```

(5) 在该页面中嵌入 JavaScript 代码，实现矢量地图文档显示的脚本函数 init()，即初始化 mapboxgl. Map 与 mapboxgl. Zondy. Map. MapDocLayer 类，通过设置 Map 对象的设置初始化地图的中心点、显示级别，再通过 docLayer 对象的 addToMap 方法加载矢量地图文档;

> 注意：通常情况下，功能实现的 JavaScript 代码可以单独放置到一个 JS 文件中，便于维护

<center>
  <img src="./static/demo/mapboxgl/source/img/07.矢量地图文档显示的脚本函数init.png" alt="矢量地图文档显示的脚本函数init" style="zoom:80%; " />
  <br>
  <div class="notes">矢量地图文档显示的脚本函数init()</div>
</center>

- Example:
  ```javascript
  /** 初始化地图显示*/
  function init() {
    'use strict'
    //地图容器
    var map = new mapboxgl.Map({
      container: 'mapCon',
      crs: 'EPSG:4326',
      minZoom: 3,
      zoom: 9,
      center: [116.39, 39.9],
    })
    var navigationControl = new mapboxgl.NavigationControl()
    map.addControl(navigationControl, 'top-left')
    var { protocol, ip, port } = window.webclient
    var docLayer = new mapboxgl.Zondy.Map.MapDocLayer('北京市', {
      layerID: 'mapgis-doc-beijing',
      //IP地址
      ip: 'develop.smaryun.com',
      //端口号
      port: 6163,
      //只显示一个图层,不平铺显示
      noWrap: true,
      serverType: 'doc',
      tileSize: 512,
    })
    docLayer.addToMap(map)
  }
  ```

#### Step 4. 运行调试

&ensp; &ensp; &ensp; &ensp; VSCode 是一个非常流行的 Web 前端开发 IDE，在编写 Web 网站时一般需要发布后编译运行，也可安装相关插件调试运行。

&ensp; &ensp; &ensp; &ensp; 在此，可先将“MapDisplay”站点发布，然后通过浏览器查看与调试。例如：在 IIS 中发布站点后，右键“浏览”选中的“MapDocDisplay.html”文件，即可在浏览器中查看，并进行前端调试。

<center>
  <img src="./static/demo/mapboxgl/source/img/08.在IIS中浏览网页.png" alt="在IIS中浏览网页" style="zoom:80%; " />
  <br>
  <div class="notes">在IIS中浏览网页</div>
</center>
<br/>
<center>
  <img src="./static/demo/mapboxgl/source/img/09.矢量地图文档显示效果图.png" alt="矢量地图文档显示效果图" style="zoom:70%; " />
  <br>
  <div class="notes">矢量地图文档显示效果图</div>
</center>
<br/>
&ensp; &ensp; &ensp; &ensp; 需要调试时，可以利用浏览器的开发者工具进行测试，例如IE、Firefox、Chrome等。打开浏览器的开发者工具，在代码行前端设置断点，然后在浏览器中重新运行示例页面，程序将会运行进入到代码断点处，方便查看相关信息。

## 服务发布

&ensp; &ensp; &ensp; &ensp; 在此以发布地图文档（REST 模式）为例，发布单个地图文档的配置操作如下：
在 MapGIS Server Manager 页面左侧导航栏中的“地图与数据服务”中，单击“发布服务”，在下拉菜单中选择“文档发布（包括 WMS/WFS/WMTS）”选项。页面跳转至发布服务配置页面。

<center>
  <img src="./static/demo/mapboxgl/source/img/MapGIS发布服务.png" alt="MapGIS服务发布" style="zoom:80%; " />
  <br>
  <div class="notes">MapGIS Server Manager发布服务</div>
</center>
<br/>

&ensp; &ensp; &ensp; &ensp; 配置项参数说明：

1. 选取地图文档：点击“地图文档路径”后的“浏览”按钮，在服务器磁盘中选择发布的地图文档（.mapx），选取后自动读取该文档的名称。矢量地图文档分为如下两种类型，即本地数据源、远程数据源（也称网络数据源，即关系数据库存储地理数据的 GDBServer）。

- 本地数据源（HDF）：适用于地理数据库文件，存在并且添加到 MapGIS IGServer 中，对应的 gdbServer 名称为“MapGISLocal”，gdb 用户名和密码为空；
- 本地数据源（HDB）【推荐使用】：适用于地理数据库文件，存在并且添加到 MapGIS IGServer 中，对应的 gdbServer 名称为“MapGISLocalPlus”，gdb 用户名和密码为空；
- 远程数据源：适用于地图文档所调用要素图层数据，存在于非本地数据库中，如 Oracle 数据库；

> MapGIS IGServer(九州)支持本地数据源 HDB 方式，不支持本地数据源 HDF 方式。

2. 发布地图文档：在服务器磁盘中找到需要发布的 mapx 地图文档并添加之后，点击“发布”按钮，即可发布二维地图文档为 MapGIS Rest 地图服务格式；
3. 获取地图服务的基地址与相关信息，用于 Web 应用开发。

## 地图控件

&ensp;&ensp;&ensp;&ensp;以下列举了几种地图控件。

<font color=red>卷帘组件</font>

&ensp;&ensp;&ensp;&ensp;可以使用卷帘工具通过显示地图下的图层来交互对比相同区域内的两个地图。当您在两个地图间拖拽并移动垂直栏时，会在地图的一侧显示所选卷帘图层并在另一侧隐藏。

- Example:

  ```javascript
  var before = new mapboxgl.Map({
    crs: 'EPSG:4326', //经纬度一定要设置crs参数
    maxBounds: [
      [-180, -90],
      [180, 90],
    ],
    zoom: 3,
    container: 'before',
    style: {
      version: 8,
      sources: {
        'tianditu-4326-vector': {
          //来源类型为栅格瓦片
          type: 'raster',
          tiles: [
            //来源请求地址，请求天地图提供的全球矢量地图WMTS服务
            'http://t' +
              Math.round(Math.random() * 7) +
              '.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles' +
              '&TILECOL=' +
              '{x}' +
              '&TILEROW=' +
              '{y}' +
              '&TILEMATRIX=' +
              '{z}' +
              '&tk=' +
              tiandituKey,
          ],
          //栅格瓦片的分辨率
          tileSize: 256,
        },
      },
      layers: [
        {
          id: 'tianditu-4326-vector',
          type: 'raster',
          source: 'tianditu-4326-vector',
          minzoom: 0,
          maxzoom: 22,
        },
      ],
    },
    center: [116.35, 30.92],
  })
  var after = new mapboxgl.Map({
    crs: 'EPSG:4326', //经纬度一定要设置crs参数
    maxBounds: [
      [-180, -90],
      [180, 90],
    ],
    zoom: 3,
    container: 'after',
    style: {
      version: 8,
      sources: {
        'tianditu-4326-image': {
          //来源类型为栅格瓦片
          type: 'raster',
          tiles: [
            //来源请求地址，请求天地图提供的全球矢量地图WMTS服务
            'http://t' +
              Math.round(Math.random() * 7) +
              '.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0' +
              '&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles' +
              '&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}' +
              '&tk=' +
              tiandituKey,
          ],
          //栅格瓦片的分辨率
          tileSize: 256,
        },
      },
      layers: [
        {
          id: 'tianditu-4326-image',
          type: 'raster',
          source: 'tianditu-4326-image',
          minzoom: 0,
          maxzoom: 22,
        },
      ],
    },
    center: [116.35, 30.92],
  })

  var wrapperSelector = '#wrapper'
  var options = {
    mousemove: true,
    orientation: 'horizontal',
  }

  window.compare = new mapboxgl.Compare(
    before,
    after,
    wrapperSelector
    // options
  )
  ```

<font color=red>FPS 组件</font>

&ensp;&ensp;&ensp;&ensp;每秒帧数测量器。用来显示地图移动时的帧数。

- Example:
  ```javascript
  let fps =
    new mapboxgl.FpsControl(/* { graphHeight: 40, background: '#1890ff', color: '#ffffff' } */)
  map.addControl(fps)
  ```

## 互联网地图

&ensp;&ensp;&ensp;&ensp;主要指的就是互联网上涌现的大量地图服务资源，提供免费开放的基础地图服务，一般均为瓦片地图形式，常在应用中作为底图直接调用。网络上主流的公共地图服务包括 OpenStreetMap、Bing 地图、百度地图、高德地图、天地图地图等。这些免费的在线地图服务资源，吸引了众多用户，不仅方便了广大开发者使用在线地图开发丰富的地图应用，扩宽互联网地图应用范围，挖掘 GIS 的潜在价值；同时也让更多人了解电子地图、了解互联网 GIS，享受互联网 GIS 带来的便利和乐趣。

&ensp;&ensp;&ensp;&ensp; 支持第三方公共互联网地图，如天地图、OSM 地图，以及 ArcGIS 地图等。

### 天地图

- Example：

  ```javascript
  //实例化要加载的source来源对象（全球矢量图）
  var vecsrc = {
    //来源类型为栅格瓦片
    type: 'raster',
    tiles: [
      //来源请求地址，请求天地图提供的全球矢量地图WMTS服务
      'http://t' +
        Math.round(Math.random() * 7) +
        '.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles' +
        '&TILECOL=' +
        '{x}' +
        '&TILEROW=' +
        '{y}' +
        '&TILEMATRIX=' +
        '{z}' +
        '&tk=' +
        tiandituKey,
    ],
    //栅格瓦片的分辨率
    tileSize: 256,
  }
  ```

<a href="http://develop.smaryun.com/#/demo/mapboxgl/internet/tianditu4326" target="\_blank">
<img src="./static/demo/mapboxgl/source/img/dev/tianditu4326.png" alt="天地图经纬度"/>
</a>

### OSM 地图

- Example:
  ```javascript
  //实例化要加载的source来源对象
  var osm = {
    //来源类型为栅格瓦片
    type: 'raster',
    tiles: [
      //来源请求地址
      'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ],
    //栅格瓦片的分辨率
    tileSize: 256,
  }
  ```

<a href="http://develop.smaryun.com:8899/#/demo/mapboxgl/internet/osm">
<img src="./static/demo/mapboxgl/source/img/dev/osm.png"/></a>

### ArcGIS 地图

- Example:
  ```javascript
  //实例化要加载的source来源对象（世界道路）
  var streetsrc = {
    //来源类型为栅格瓦片
    type: 'raster',
    tiles: [
      //来源请求地址，请求ArcGIS提供的世界道路瓦片地图服务
      'http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/' +
        '{z}' +
        '/' +
        '{y}' +
        '/' +
        '{x}' +
        '.jpg',
    ],
    //栅格瓦片的分辨率
    tileSize: 256,
  }
  ```

<a href="http://develop.smaryun.com:8899/#/demo/mapboxgl/internet/arcgis">
<img src="./static/demo/mapboxgl/source/img/dev/arcgis.png"/></a>

## OGC 服务

&ensp;&ensp;&ensp;&ensp; OGC（OpenGIS Consortium OpenGIS 协会）是一个公益的行业协会，成立于 1994 年，致力于促进采用新的技术和商业方式来提高地理信息处理的互操作性(Interoperability)。OGC 为实现地理信息共享与互操作，定义了一系列 Web 地理信息服务的抽象接口与实现规范，包括 WMS、WFS、WMTS、WCS 等.

&ensp;&ensp;&ensp;&ensp; MapGIS IGServer 全面支持 OGC 服务的发布与应用，包括 WMS、WFS、WMTS、WCS 等服务。其中，常用的 WMS、WFS、WMTS 中对应的 MapGIS 格式的数据类型为：

- WMS：MapIGS 格式的地图文档、矢量图层；
- WFS：MapIGS 格式的地图文档、矢量图层；
- WMTS：MapIGS 格式的瓦片图层、实时瓦片图层、分布式瓦片图层。

> 要在客户端调用 OGC 服务，需要先在 IGServer 服务管理器中发布 OGC 服务，具体操作请查看**MapGIS IGServer 操作手册**（<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag206/page1/doc770" target="_blank">.NET 版</a>，<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag212/page1/doc823" target="_blank">九州版</a>）

### WMS

- Example:
  ```javascript
  map.on('load', function () {
    map.addLayer({
      id: 'wms-layer',
      type: 'raster',
      source: {
        type: 'raster',
        tiles: [
          `${protocol}://${ip}:${port}/igs/rest/ogc/doc/北京市/WMSServer?` +
            'service=WMS' +
            '&request=GetMap' +
            '&layers=' +
            '北京市,绿地_1,绿地_2,绿地_3,绿地_4,水域_3,水域_2,水域_1,大学,学校,动物园,高尔夫,观光胜地,果园,住宅用地,医院,商业用地,建筑物,铁路_1,铁路_2,铁路_3,主干道,主干道,高速公路_1,高速公路_1_9-10,三级道路_链接,三级道路,二级道路_链接,二级道路,一级道路_链接,一级道路,主干道_链接,主干道,主干道,高速公路_链接,高速公路_2,高速公路_2,三级道路_链接,三级道路,二级道路_链接,二级道路,一级道路_链接,一级道路,地铁,主干道_链接,主干道,主干道,高速公路_链接,高速公路_2,高速公路_2,地铁站POI,山顶,果园poi,汽车站点POI,大学poi,学校poi,中小学POI,幼儿园POI,医院POI,口腔医院POI,派出所POI,检察院POI,银行POI,邮局POI,体育馆POI,纪念碑POI,博物馆POI,名胜古迹点,动物园poi,观光胜地poi,主题公园POI,宾馆POI,百货店POI,便利店POI,书店POI,快餐POI,咖啡馆POI,电影院POI,高尔夫poi,村庄点,市镇点,区县点,首都点' +
            '&styles=' +
            '&format=image/jpeg' +
            '&transparent=false' +
            '&version=1.1.1' +
            '&height=512' +
            '&width=512' +
            '&srs=EPSG:4326' +
            '&bbox={bbox}',
        ],
        tileSize: 512,
      },
      paint: {},
    })
  })
  ```

<a href="http://develop.smaryun.com:8899/#/demo/mapboxgl/ogc/wms">
<img src="./static/demo/mapboxgl/source/img/dev/WMS.png"></a>

### WMTS

- Example:
  ```javascript
  map.on('load', function () {
    map.addLayer({
      id: 'wmts-layer',
      type: 'raster',
      source: {
        type: 'raster',
        tiles: [
          `http://${ip}:${port}/igs/rest/ogc/beijing/WMTSServer?` +
            'service=WMTS' +
            '&request=GetTile' +
            '&version=1.0.0' +
            '&style=default' +
            '&tilematrixSet=EPSG:4326_北京市_arcgis_GB' +
            '&format=image/png' +
            '&layer=beijing' +
            '&tilematrix={z}' +
            '&tilerow={y}' +
            '&tilecol={x}',
        ],
        tileSize: 256,
        mapgisOffset: -1,
      },
      paint: {},
    })
  })
  ```

<a href="http://develop.smaryun.com:8899/#/demo/mapboxgl/ogc/wmts">
<img src="./static/demo/mapboxgl/source/img/dev/WMTS.png"/></a>

### WFS

- Example:

  ```javascript
  map.on('load', function () {
    var baseurl = `${protocol}://${ip}:${port}/igs/rest/ogc/doc/北京市/WFSServer?REQUEST=GetFeature&version=1.1.0&service=wfs&typename=北京市:北京市&maxFeatures=10`
    $.ajax({
      url: baseurl,
      type: 'get',
      dataType: 'xml',
      contentType: 'application/x-www-form-urlencoded',
      success: loadGeoJson,
      error: function (xml) {
        alert('请求失败')
      },
    })
  })

  function loadGeoJson(xml) {
    if (!!xml) {
      var beijing = xml.children[0].children[0].children[0].children
      var html = '<table>'
      for (var i = 1; i < 7; i++) {
        const element = beijing[i]
        html +=
          '<tr><td><b>' +
          beijing[i].localName +
          '</b></td><td>' +
          beijing[i].textContent +
          '</td></tr>'
      }
      html += '</table>'
      popup.setLngLat([116.39, 39.9]).setHTML(html).addTo(map)
    } else {
      alert('没有查询到数据')
    }
  }
  ```

<a href="http://develop.smaryun.com:8899/#/demo/mapboxgl/ogc/wfs">
<img src="./static/demo/mapboxgl/source/img/dev/WFS.png"/></a>

## 地图服务

&ensp;&ensp;&ensp;&ensp;MapGIS 按照“地理数据库－数据集－类”这几个层次组织空间数据，以满足不同应用领域对不同专题数据的组织和管理需要。地理数据库是面向实体空间数据模型的全局视图，统一管理矢量数据和栅格数据，能够完整地、一致地表达被描述区域的地理模型。

&ensp;&ensp;&ensp;&ensp;MapGIS 地理数据库主要包括两种存储方式，一种是以 MapGIS 本地 HDF、HDB 文件形式存储数据，也称本地数据源；另一种，对接第三方各种类型的数据库，如以关系数据库（SQL Server、Oracle、DB2 等）形式存储数据，也称网络数据源。**针对本地数据源，推荐使用 MapGIS 10.5 自定义的 HDB 地理数据库。**

&ensp;&ensp;&ensp;&ensp;在 Web 上的数据加载，分为矢量数据、瓦片数据、矢量瓦片等数据类型：

- **矢量数据**，以图层的方式直接加载，或者将图层组织成一个地图文档（\*.mapx），以地图文档方式加载矢量地图。地图文档只是地图视图，是相应地理数据库中的索引，其源数据存储在地理数据库。不管是图层还是地图文档，Web 上发布都是实时生成地图，地图上的数据操作与数据库中的数据保持同步更新。
- 何为**瓦片**？瓦片即网格中多个类似瓦片的图片集。瓦片数据是将矢量地图文档或影像数据进行预处理，采用高效的缓存机制形成的缓存图片集，可在网页中快速加载，并且效果较好。
- **矢量瓦片**，对矢量电子地图按照一定的标准和技术将其保存为多种比例尺的矢量分块数据，在前端显示电子地图时，可直接调用矢量分块进行绘制。矢量瓦片的样式可以改变和定制，矢量切片可以在客户端渲染，可以按照用户赋予的样式渲染。


| 地图类型 |  类名          |     API说明    |
| ------- | -------------- |----------------|
| 矢量地图文档 | mapboxgl.Zondy.Map.MapDocLayer | 加载基于MapGIS矢量地图文档的矢量服务数据 |
| 矢量图层 | mapboxgl.Zondy.Map.MapVectorLayer | 加载基于MapGIS矢量图层的矢量服务数据 |



### 矢量地图文档

- Example:

  ```javascript
  var docLayer = new mapboxgl.Zondy.Map.MapDocLayer('北京市', {
    layerID: 'mapgis-doc-beijing',
    //IP地址
    ip: `develop.smaryun.com`,
    //端口号
    port: 6163,
    //只显示一个图层,不平铺显示
    noWrap: true,
    serverType: 'doc',
    tileSize: 512,
  })
  docLayer.addToMap(map)
  ```

### 错级瓦片

- Example:

  ```javascript
  map.on('load', () => {
    map.addLayer({
      id: 'wmts-layer',
      type: 'raster',
      source: {
        type: 'raster',
        tiles: [
          `http://develop.smaryun.com:6163/igs/rest/mrms/tile/EPSG_4326_WORLD_TILE/{z}/{y}/{x}`,
        ],
        tileSize: 256,
        mapgisOffset: -1,
      },
    })
  })
  ```

## 矢量瓦片

&ensp;&ensp;&ensp;&ensp;矢量瓦片，是对矢量电子地图按照一定的标准和技术将其保存为多种比例尺的矢量分块数据，在前端显示电子地图时，可直接调用矢量分块进行绘制。矢量瓦片的样式可以改变和定制，矢量切片可以在客户端渲染，可以按照用户赋予的样式渲染。使用MapGIS IGServer配置矢量瓦片的显示样式，配置的样式信息保存为xxx.json文件，上传文件到MapGIS IGServer服务器，客户端通过接口即可访问定制样式的矢量瓦片。

&ensp;&ensp;&ensp;&ensp;**矢量瓦片准备**：先通过MapGIS桌面工具裁剪矢量瓦片，然后在MapGIS Server Manager中发布矢量瓦片，最后根据需求对矢量瓦片进行配图并上传配图样式文件。


&ensp;&ensp;&ensp;&ensp; 1.MapGIS桌面工具裁剪矢量瓦片

&ensp;&ensp;&ensp;&ensp;（1）准备矢量地图文档

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/document.png" alt="矢量地图文档" style="zoom: 40%;" />

&ensp;&ensp;&ensp;&ensp;（2）矢量瓦片裁剪：设置**输入瓦片索引区要素类**，其他选项使用默认值

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/index.png" alt="矢量瓦片裁剪设置瓦片索引区要素类" style="zoom: 50%;" />

&ensp;&ensp;&ensp;&ensp;（3）矢量瓦片裁剪：选择一个**空文件夹**用来**存放生成的矢量瓦片文件**，**高级**设置中将**最小显示块级别**修改为0，其他选项使用默认值

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/generate_file.png" alt="矢量瓦片裁剪生成文件设置" style="zoom: 50%;" />

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/generate_advance.png" alt="矢量瓦片裁剪的高级设置" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;（4）矢量瓦片裁剪：**附加裁剪项设置**使用默认值

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/other_set.png" alt="矢量瓦片裁剪附加裁剪项设置" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;（5）矢量瓦片裁剪：瓦片裁剪的过程，瓦片裁剪级别越高需要的生成时间越久

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/generate_process.png" alt="瓦片裁剪过程" style="zoom: 50%;" />

&ensp;&ensp;&ensp;&ensp;（6）矢量瓦片裁剪：裁剪的结果文件展示

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/result.png" alt="矢量瓦片裁剪结果展示" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp; 2.矢量瓦片的服务发布与样式管理

&ensp;&ensp;&ensp;&ensp;（1）矢量瓦片服务发布：打开MapGIS Server Manager，找到**矢量瓦片发布**选项

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/server_manager.png" alt="MapGIS Server Manager" style="zoom: 50%;" />

&ensp;&ensp;&ensp;&ensp;（2）矢量瓦片服务发布：选择矢量瓦片发布的格式为**目录格式**，选中矢量瓦片发布的**数据路径**

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/publish_format.png" alt="矢量瓦片发布格式" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;（3）矢量瓦片服务发布：点击发布的矢量瓦片的左边的**预览**按钮，进入对应的编辑界面

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/publish_preview.png" alt="矢量瓦片预览" style="zoom:100%;" />

&ensp;&ensp;&ensp;&ensp;（4）矢量瓦片样式管理：按照个性化需求进行样式配色等操作

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/style_edit.png" alt="矢量瓦片样式编辑" style="zoom: 33%;" />

&ensp;&ensp;&ensp;&ensp;（5）矢量瓦片样式管理：样式配置完毕后， 点击左上方的**保存**按钮保存对应的样式json文件到当前计算机

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/style_save.png" alt="矢量瓦片样式JSON文件保存" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;（6）矢量瓦片样式管理：将第5步保存的文件**上传**到对应的服务器上, `该按钮在第3步的最右边有个绿色上传箭`

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/upload.png" alt="矢量瓦片样式文件上传" style="zoom:100%;" />


&ensp;&ensp;&ensp;&ensp;上传完成的提示如下:

<img src="./static/demo/mapboxgl/source/img/dev/vectortile/upload_success.png" alt="矢量瓦片样式文件上传成功提示" style="zoom: 50%;" />

&ensp;&ensp;&ensp;&ensp;（7）矢量瓦片样式管理：以上步骤完成后得到矢量瓦片样式URL：`http://localhost:6163/igs/rest/mrms/vtiles/styles/hubei-id.json`，在前端代码中通过该URL即可访问矢量瓦片地图服务。


&ensp;&ensp;&ensp;&ensp;**矢量瓦片加载**:基于MapboxGL框架，直接通过`mapboxgl.Map`在地图容器中加载显示矢量瓦片。例如，加载样式URL为`http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/styles/街道-墨卡托.json`的矢量瓦片。

- Example
  
  ```javascript
     //初始化地图容器加载矢量瓦片
     var map = new mapboxgl.Map({
      container: 'map', // 绑定div
      style: `http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/styles/街道-墨卡托.json`,
      center: [106.563777, 29.578285],
      zoom: 3
    });
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');           
  ```


## 要素查询

&ensp;&ensp;&ensp;&ensp;查询是WebGIS中最常用的核心功能之一，广泛应用于各类项目中。通过对空间和属性要素的查询，提取需要的信息，与地图联动进行展示，满足应用的需求。

&ensp;&ensp;&ensp;&ensp;查询定位在应用中很常见，根据不同的应用需求，可以选择不同的查询方式、实现方式以及表现方式。查询方式：基于GIS的特性，查询主要包括几何查询、属性条件查询以及两者结合的复合查询，以及OID查询。

- 几何查询有点击、画线、画圆、拉框、多边形五种操作方式，以操作的空间范围作为限定条件进行查询；
- 属性条件查询以要素属性限定条件进行查询；
- 复合查询则是两者的结合，空间范围组合属性条件，统一查询满足要求的空间要素；
- OID查询：根据地图要素的唯一标识OID进行查询；

| 类型 |  类名/方法名         |     API说明    |
| ------- | -------------- |----------------|
| 文档要素查询 | Zondy.Service.QueryDocFeature / query() | 基于地图文档的矢量要素查询，支持几何、属性、OID查询 |
| 图层要素查询 | Zondy.Service.QueryLayerFeature / query() | 基于矢量图层的矢量要素查询，支持几何、属性、OID查询 |


### FID 查询

**Step 1. <font color=red>设置查询包含的信息结构</font>**:

- Example:
  ```javascript
  //初始化查询结构对象，设置查询结构包含几何信息
  var queryStruct = new Zondy.Service.QueryFeatureStruct({
    IncludeGeometry: true, //是否包含几何图形信息
    IncludeAttribute: true, //是否包含属性信息
    IncludeWebGraphic: false, //是否包含图形显示参数
  })
  ```

**Step 2. <font color=red>设置查询参数</font>**：

- Example:
  ```javascript
  //实例化查询参数对象
  var queryParam = new Zondy.Service.QueryByLayerParameter(
    'gdbp://MapGisLocal/ClientTheme/ds/epsg4326/sfcls/湖北省市级区划2',
    {
      objectIds: '4,5',
      pageIndex: 0,
      recordNumber: 50,
      struct: queryStruct,
    }
  )
  ```

**Step 3. <font color=red>创建矢量图层查询服务对象，执行查询操作
</font>**：

- Example:
  ```javascript
  //实例化地图文档查询服务对象
  var queryService = new Zondy.Service.QueryLayerFeature(queryParam, {
    //IP地址
    ip: 'develop.smaryun.com',
    //端口号
    port: '6163',
  })
  //执行查询操作，querySuccess为成功回调，queryError为失败回调
  queryService.query(querySuccess, queryError)
  ```

**Step 4. <font color=red>查询结果展示</font>**：

- Example:
  ```javascript
  var feature = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [finaldots],
    },
  }
  features.push(feature)
  //用geojson创建一个多边形
  var geometryPolygon = {
    type: 'FeatureCollection',
    features: features,
  }
  var source = {
    type: 'geojson',
    data: geometryPolygon,
  }
  map.addLayer({
    //此id可随意设置，但是要唯一
    id: 'highlayer',
    //指定类型为fill（填充区域）
    type: 'fill',
    //设置数据来源
    source: source,
    //设置绘制参数
    paint: {
      //设置填充颜色
      'fill-color': '#7FFF00',
      //设置透明度
      'fill-opacity': 0.5,
      'fill-outline-color': '#FFA500',
    },
  })
  ```

### 几何查询

**Step 1. <font color=red>设置查询包含的信息结构</font>**:

- Example:
  ```javascript
  //创建查询结构对象
  var queryStruct = new Zondy.Service.QueryFeatureStruct()
  //是否包含几何图形信息
  queryStruct.IncludeGeometry = true
  //是否包含属性信息
  queryStruct.IncludeAttribute = true
  //是否包含图形显示参数
  queryStruct.IncludeWebGraphic = false
  ```

**Step 2. <font color=red>设置查询规则</font>**:

- Example:
  ```javascript
  //制定查询规则
  var rule = new Zondy.Service.QueryFeatureRule({
    //是否将要素的可见性计算在内
    EnableDisplayCondition: false,
    //是否完全包含
    MustInside: false,
    //是否仅比较要素的外包矩形
    CompareRectOnly: false,
    //是否相交
    Intersect: true,
  })
  ```

**Step 3. <font color=red>设置查询参数</font>**:

- Example:
  ```javascript
  //创建一个用于查询的矩形
  var leftBottom = lonLat2Mercator(112, 30)
  var rightTop = lonLat2Mercator(113, 32)
  var geomObj = new Zondy.Object.Rectangle(
    leftBottom.x,
    leftBottom.y,
    rightTop.x,
    rightTop.y
  )
  //实例化查询参数对象
  var queryParam = new Zondy.Service.QueryParameter({
    //几何对象
    geometry: geomObj,
    //结果格式
    resultFormat: 'json',
    //查询结构
    struct: queryStruct,
    //查询规则
    rule: rule,
  })
  //设置查询分页号
  queryParam.pageIndex = 0
  //设置查询要素数目
  queryParam.recordNumber = 20
  ```

**Step 4. <font color=red>创建地图文档查询服务对象，执行查询操作</font>**:

- Example:
  ```javascript
  //实例化地图文档查询服务对象
  var queryService = new Zondy.Service.QueryDocFeature(
    queryParam,
    '中国地图3857',
    0,
    {
      //IP地址
      ip: 'develop.smaryun.com',
      //端口号
      port: '6163',
    }
  )
  //执行查询操作，querySuccess为成功回调，queryError为失败回调
  queryService.query(querySuccess, queryError)
  ```

**Step 5. <font color=red>结果展示</font>**:

- Example:
  ```javascript
  var feature = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [finaldots],
    },
  }
  features.push(feature)
  //用geojson创建一个多边形
  var geometryPolygon = {
    type: 'FeatureCollection',
    features: features,
  }
  var source = {
    type: 'geojson',
    data: geometryPolygon,
  }
  map.addLayer(
    {
      //此id可随意设置，但是要唯一
      id: 'highlayer',
      //指定类型为fill（填充区域）
      type: 'fill',
      //设置数据来源
      source: source,
      //设置绘制参数
      paint: {
        //设置填充颜色
        'fill-color': 'rgba(127,255,0, 0.5)',
        'fill-outline-color': '#FFA500',
      },
    },
    'poly'
  )
  ```

## 要素编辑

&ensp;&ensp;&ensp;&ensp;WebGIS中的要素编辑功能，打破了传统单机编辑的局限，用户不必每次都登录服务器进行数据的变更维护，可以通过网络更加方便、快捷地完成数据维护，可以说弥补了单机数据管理维护方案的局限。Web矢量要素编辑功能，包括矢量要素添加、更新、删除三种功能操作，可对要素的几何信息和属性信息进行编辑。


| 类型 |  类名/方法名         |     API说明    |
| ------- | -------------- |----------------|
| 文档要素编辑 | Zondy.Service.EditDocFeature / add()、update()、deletes() | 基于地图文档的矢量要素编辑，支持添加、更新、删除操作 |
| 图层要素编辑 | Zondy.Service.EditLayerFeature / add()、update()、deletes() | 基于矢量图层的矢量要素编辑，支持添加、更新、删除操作 |


&ensp;&ensp;&ensp;&ensp;**以图层要素编辑为例**：


**Step 1. <font color=red>创建要素数据集</font>**:

- Example:
  ```javascript
  //创建一个点形状，描述点形状的几何信息
  var gpoint = new Zondy.Object.GPoint(114.3, 30.59)
  //设置当前点要素的几何信息
  var fGeom = new Zondy.Object.FeatureGeometry({ PntGeom: [gpoint] })
  //描述点要素的符号参数信息
  var pointInfo = new Zondy.Object.CPointInfo({
    Angle: 0,
    Color: color,
    Space: 0,
    SymHeight: 10,
    SymID: 98,
    SymWidth: 10,
  })
  //设置当前点要素的图形参数信息
  var webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
    InfoType: 1,
    PntInfo: pointInfo,
  })
  //设置添加点要素的属性信息
  var attValue = ['1', '市政协', '', '', '江岸区', '0', '0']
  //创建一个要素
  var feature = new Zondy.Object.Feature({
    fGeom: fGeom,
    GraphicInfo: webGraphicInfo,
    AttValue: attValue,
  })
  //设置要素为点要素
  feature.setFType(1)
  //设置更新要素的FID
  if (fid !== undefined && fid !== null) {
    feature.setFID(fid)
  }
  //创建一个要素数据集
  var featureSet = new Zondy.Object.FeatureSet()
  featureSet.clear()
  //设置属性结构
  var cAttStruct = new Zondy.Object.CAttStruct({
    FldNumber: 7,
    FldName: ['ID', '名称', '地址', '图片', '城区', 'LayerID', 'mpLayer'],
    FldType: ['long', 'string', 'string', 'string', 'string', 'long', 'long'],
    FldAlias: [null, null, null, null, null, null, null],
  })
  featureSet.AttStruct = cAttStruct
  //添加要素到要素数据集
  featureSet.addFeature(feature)
  ```

**Step 2. <font color=red>创建矢量图层要素编辑对象</font>**:

&ensp;&ensp;&ensp;&ensp;执行添加、更新、删除操作，分别对应 add()、update()、deletes()方法；

- Example:
  ```javascript
  //创建一个编辑服务类
  var editService = new Zondy.Service.EditLayerFeature(
    'gdbp://MapGisLocal/ClientTheme/ds/epsg4326/sfcls/点编辑',
    { ip: 'develop.smaryun.com', port: '6163' }
  )
  //执行添加点要素功能,OnSuccess为回调函数
  editService.add(featureSet, addSuccess)
  editService.update(featureSet, UpdateSuccess)
  editService.deletes(featureIds, deleteSuccess)
  ```
  > 矢量图层要素更新与删除操作必须有 FID，所以进行这 2 个操作前，先查询要素是否存在。关于矢量图层要素查询请参考 FID 查询、几何要素查询。



## 量算

### 长度

**Step 1. <font color=red>创建绘制空间对象</font>**:

&ensp; &ensp; &ensp; &ensp;创建绘制控件对象，并使用该对象在地图中绘制折线；

- Example:

  ```javascript
  draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      line_string: true,
      polygon: false,
      trash: false,
    },
  })
  map.addControl(draw, 'top-left') //绘制工具
  ```

**Step 2. <font color=red>注册几何完成事件</font>**:

&ensp; &ensp; &ensp; &ensp;注册几何创建完成事件，绘制几何结束的回调函数中组织 MapGIS 二维几何点数组；

- Example:
  ```javascript
  map.on('draw.create', function (e) {
    var lonlats = e.features[e.features.length - 1].geometry.coordinates
    var dots = []
    for (var i = 0; i < lonlats.length; i++) {
      dots.push(new Zondy.Object.Point2D(lonlats[i][0], lonlats[i][1]))
    }
    markerlatLng = lonlats[lonlats.length - 1]
    CalPolyLineLength(dots)
  })
  ```

**Step 3. <font color=red>创建折线长度测量功能服务对象</font>**:

&ensp; &ensp; &ensp; &ensp;创建折线长度测量功能服务及相关参数对象，执行测量功能；

- Example:
  ```javascript
  //初始化长度测量服务
  var calLength = new Zondy.Service.CalPolyLineLength(dots, {
    //IP地址
    ip: 'develop.smaryun.com',
    //端口号
    port: '6163',
  })
  //建议普通用户采用此类直接获取MapGIS GDB已经提供的空间参考系
  var gdbInfo = new Zondy.Object.CGDBInfo({
    //数据库名称
    GDBName: 'OpenLayerVecterMap',
    //数据源名称
    ServerName: 'MapGISLocal',
    //除MapGISLocal数据源，其它的都设置
    Password: '',
    //除MapGISLocal数据源，其它的都设置
    User: '',
  })
  //用于进行SRSID投影的参数类
  var projBySRSID = new Zondy.Service.CProjectBySRSID(601, gdbInfo)
  //执行长度测量服务，measureCallBack为测量回调函数
  calLength.execute(projBySRSID, measureCallBack)
  ```

### 面积

**Step 1. <font color=red>创建绘制空间对象</font>**:

&ensp; &ensp; &ensp; &ensp;创建绘制控件对象，并使用该对象在地图中绘制折线；

- Example:

  ```javascript
  draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      line_string: false,
      polygon: true,
      trash: false,
    },
  })
  map.addControl(draw, 'top-left') //绘制工具
  ```

**Step 2. <font color=red>注册几何创建完成事件</font>**:

&ensp; &ensp; &ensp; &ensp;注册几何创建完成事件，绘制几何结束的回调函数中组织 MapGIS 二维几何点数组；

- Example:
  ```javascript
  map.on('draw.create', function (e) {
    var lonlats = e.features[e.features.length - 1].geometry.coordinates[0]
    var dots = []
    for (var i = 0; i < lonlats.length; i++) {
      dots.push(new Zondy.Object.Point2D(lonlats[i][0], lonlats[i][1]))
    }
    markerlatLng = getCenterOfGravityPoint(lonlats)
    CalArea(dots)
  })
  ```

**Step 3. <font color=red>创建面积测量功能服务对象</font>**:

&ensp; &ensp; &ensp; &ensp;创建面积测量功能服务及相关参数对象，执行测量功能；

- Example:
  ```javascript
  //初始化面积测量服务
  var calArea = new Zondy.Service.CalArea(dots, {
    //IP地址
    ip: 'develop.smaryun.com',
    //端口号
    port: '6163',
  })
  //建议普通用户采用此类直接获取MapGIS GDB已经提供的空间参考系
  var gdbInfo = new Zondy.Object.CGDBInfo({
    //数据库名称
    GDBName: 'OpenLayerVecterMap',
    //数据源名称
    ServerName: 'MapGISLocal',
    //除MapGISLocal数据源，其它的都设置
    Password: '',
    //除MapGISLocal数据源，其它的都设置
    User: '',
  })
  //用于进行SRSID投影的参数类
  var projBySRSID = new Zondy.Service.CProjectBySRSID(601, gdbInfo)
  //执行面积测量服务，measureCallBack为测量回调函数
  calArea.execute(projBySRSID, measureCallBack)
  ```

## 专题图

&ensp;&ensp;&ensp;&ensp;专题图不再是某些行业的专属应用，早已将以地理空间信息为基础的专题分析方式的优势容纳了进去，利用地理要素属性数据、地理要素几何数据、符号参数等数据充分展示具有空间分布特征的专题信息，效果直观，能更好的辅助决策。随着 GIS 及相关技术的发展，专题图分析与出图已经成为 GIS 软件的重要功能，而且专题图类型丰富，比如，统计专题图、密度专题图、等级专题图、四色专题图、分段专题图等等。

| 专题图类型     | 专题图说明                                           | 专题图用途                               |
| -------------- | ---------------------------------------------------- | ---------------------------------------- |
| 统计专题图     | 提供多种统计类型，如直方图、折线图、饼图等           | 分析统计多个数值变量，即地理要素属性字段 |
| 点密度专题图   | 用点的密集程度来表示与范围或区域面积相关联数据值     | 适用于表示具有数量特征散分布的专题       |
| 分段专题图     | 根据每个要素属性值所在的分段范围赋予相应对的显示风格 | 分析统计多个数值变量                     |
| 等级符号专题图 | 使用符号的大小来反映专题变量的每条记录               | 强调数据中的级别差异                     |
| 统一配置专题图 | 采用单一符号信息配置图层中所有图元                   | 强调数据的分布特征                       |
| 四色专题图     | 用四种不同的颜色填充地图的整个区域                   | 强调数据的地理位置差异                   |
| 随机专题图     | 采用随机的不同颜色填充地图的整个区域                 | 针对区要素，强调数据的地理位置差异       |

&ensp;&ensp;&ensp;&ensp;**以分段专题图为例：**

**Step 1. <font color=red>创建专题图结构信息对象</font>**:

&ensp; &ensp; &ensp; &ensp;创建专题图结构信息对象，并将该对象存放数组中，执行专题图功能时使用，如添加专题图、更新专题图。重点内容：使用 Zondy.Object.Theme.CRangeTheme()实现分段专题图；

- Example:
  ```javascript
  //专题图信息数组
  var themesInfoArr = []
  //初始化Zondy.Object.Theme.ThemesInfo，用于设置需添加的专题相关信息
  themesInfoArr[0] = new Zondy.Object.Theme.ThemesInfo()
  //初始化指定图层的专题图信息对象，之后再给该数组赋值
  themesInfoArr[0].LayerName = '湖北省市级区划2'
  themesInfoArr[0].ThemeArr = []
  //实例化CMultiClassTheme类
  themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CRangeTheme()
  themesInfoArr[0].ThemeArr[0].Name = '分段专题图'
  //指定为分段专题图
  themesInfoArr[0].ThemeArr[0].IsBaseTheme = false
  themesInfoArr[0].ThemeArr[0].Visible = true
  themesInfoArr[0].ThemeArr[0].GeoInfoType = 'Reg'
  //未分段值的图形信息设置
  themesInfoArr[0].ThemeArr[0].DefaultInfo = new Zondy.Object.Theme.CThemeInfo()
  themesInfoArr[0].ThemeArr[0].DefaultInfo.Caption = '未分类'
  themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo =
    new Zondy.Object.Theme.CRegInfo()
  themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.Ovprnt = true
  themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.Angle = 0
  themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.EndClr = 0
  themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FillClr = 17
  themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FillMode = 0
  themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FullPatFlg = true
  themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatClr = 45
  themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatHeight = 5
  themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatWidth = 5
  themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatID = 0
  themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.OutPenW = 1
  //分段取值设置
  themesInfoArr[0].ThemeArr[0].Expression = 'GDP2016'
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr = []
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0] =
    new Zondy.Object.Theme.CRangeThemeInfo()
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].StartValue = '0'
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].EndValue = '100'
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].RegInfo =
    new Zondy.Object.Theme.CRegInfo()
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].RegInfo.FillClr = 110
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1] =
    new Zondy.Object.Theme.CRangeThemeInfo()
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].StartValue = '100'
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].EndValue = '150'
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].RegInfo =
    new Zondy.Object.Theme.CRegInfo()
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].RegInfo.FillClr = 26
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[2] =
    new Zondy.Object.Theme.CRangeThemeInfo()
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[2].StartValue = '150'
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[2].EndValue = '200'
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[2].RegInfo =
    new Zondy.Object.Theme.CRegInfo()
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[2].RegInfo.FillClr = 22
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[3] =
    new Zondy.Object.Theme.CRangeThemeInfo()
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[3].StartValue = '200'
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[3].EndValue = '400'
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[3].RegInfo =
    new Zondy.Object.Theme.CRegInfo()
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[3].RegInfo.FillClr = 16
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[4] =
    new Zondy.Object.Theme.CRangeThemeInfo()
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[4].StartValue = '400'
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[4].EndValue = '6000'
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[4].RegInfo =
    new Zondy.Object.Theme.CRegInfo()
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[4].RegInfo.FillClr = 11
  ```

**Step 2. <font color=red>创建专题图服务对象</font>**:

&ensp; &ensp; &ensp; &ensp;创建专题图服务对象，并使用该对象执行添加、更新、删除操作；

- Example:

  ```javascript
  //初始化专题图服务类
  ThemeOper = new Zondy.Service.ThemeOper(guid)
  //设置ip地址
  ThemeOper.ip = 'develop.smaryun.com'
  //设置端口号
  ThemeOper.port = '6163'
  ```

  &ensp; &ensp; &ensp; &ensp;使用专题图服务对象添加专题图，添加专题图前生成专题图结构信息对象的数组；

- Example:

  ```javascript
  themesInfoArr = getDefaultThemesInfo()
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].RegInfo.FillClr = 110
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].RegInfo.FillClr = 26
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[2].RegInfo.FillClr = 22
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[3].RegInfo.FillClr = 16
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[4].RegInfo.FillClr = 11
  //添加专题图（不是在原文档上添加，会重新生成一个专题图缓存文档）
  ThemeOper.addThemesInfo('Hubei3857', '1/0', themesInfoArr, onUniqueTheme)
  ```

&ensp; &ensp; &ensp; &ensp;使用专题图服务对象更新专题图，更新专题图前生成专题图结构信息对象的数组；

 - Example:

  ```javascript
  themesInfoArr = getDefaultThemesInfo()
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].RegInfo.FillClr = 11
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].RegInfo.FillClr = 16
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[2].RegInfo.FillClr = 22
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[3].RegInfo.FillClr = 26
  themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[4].RegInfo.FillClr = 110
  //更新专题图,onUniqueTheme为回调函数
  ThemeOper.updateThemesInfo('Hubei3857', '1/0', themesInfoArr, onUniqueTheme)
  ```

&ensp; &ensp; &ensp; &ensp;使用专题图服务对象删除专题图；
  
- Example:

    ```javascript
  //删除专题图,onUniqueTheme为回调函数
  ThemeOper.removeThemesInfo('Hubei3857', '1/0', onUniqueTheme)
    ```

**Step 3. <font color=red>结果展示</font>**:

&ensp; &ensp; &ensp; &ensp;专题图结果展示，在专题图执行成功的回调函数中刷新地图文档即可查看专题图结果。

- Example:

  ```javascript
  //刷新图层，实时显示专题图
  mapDocLayer.refreshMap(guid
  ```

## 空间分析

&ensp;&ensp;&ensp;&ensp;GIS 与一般电子地图最重要的区别之一，就是提供强大的查询统计、空间分析功能，而这些特性让其在各个领域的应用中发挥着重要作用，为生产生活提供了更多的便利与服务。
&ensp;&ensp;&ensp;&ensp;空间分析，是基于地理对象的位置和形态等空间数据进行分析的技术，其目的在于提取和传输空间信息。空间分析是地理信息系统的主要特征。空间分析能力（特别是对空间隐含信息的提取和传输能力）是地理信息系统区别与一般信息系统的主要方面，也是评价一个地理信息系统成功与否的一个主要指标。随着地理信息技术的发展，空间分析的具体功能逐渐地增加，广泛应用于军事、经济、环境、资源等领域，使地理信息系统拥有不可取代的意义。

&ensp;&ensp;&ensp;&ensp;最常用的空间分析功能，包括拓扑分析、裁剪分析、叠加分析、路径分析、缓冲区分析。

### 缓冲区分析

&ensp;&ensp;&ensp;&ensp;缓冲区分析，指在点、线、区实体周围一定半径范围内建立多边形，并形成新图层的功能。如果缓冲目标是多个，则缓冲分析的结果是各个目标的缓冲区合并，碰撞到一起的多边形将被合并为一个区图元。

&ensp;&ensp;&ensp;&ensp;提供要素缓冲区分析和图层缓冲区分析接口。要素缓冲区分析，对指定要素进行缓冲区分析，并生成结果图层。图层缓冲区分析，基本原理与要素缓冲区分析相同，不同的是，前者指定要素，而后者以图层为单位进行缓冲区分析。

&ensp;&ensp;&ensp;&ensp;**以要素缓冲区分析为例**：实现针对几何要素的多圈的缓冲分析。

**Step 1. <font color=red>准备要素</font>**:

&ensp; &ensp; &ensp; &ensp;准备要素，包含几何图形信息、属性结构、属性信息；

- 创建几何图形信息对象:

  - Example:

  ```javascript
  //初始化Zondy.Object.FeatureGeometry对象
  var regGeo = new Zondy.Object.FeatureGeometry()
  //设置区要素的空间几何信息
  var gReg = new Zondy.Object.GRegion([
    new Zondy.Object.AnyLine([
      new Zondy.Object.Arc([
        new Zondy.Object.Point2D(
          lonLat2Mercator(112.59, 30.67).x,
          lonLat2Mercator(112.59, 30.67).y
        ),
        new Zondy.Object.Point2D(
          lonLat2Mercator(112.8, 30.83).x,
          lonLat2Mercator(112.8, 30.83).y
        ),
        new Zondy.Object.Point2D(
          lonLat2Mercator(112.86, 30.7).x,
          lonLat2Mercator(112.86, 30.7).y
        ),
        new Zondy.Object.Point2D(
          lonLat2Mercator(113.28, 30.9).x,
          lonLat2Mercator(113.28, 30.9).y
        ),
        new Zondy.Object.Point2D(
          lonLat2Mercator(113.45, 30.63).x,
          lonLat2Mercator(113.45, 30.63).y
        ),
        new Zondy.Object.Point2D(
          lonLat2Mercator(113.45, 30.38).x,
          lonLat2Mercator(113.45, 30.38).y
        ),
        new Zondy.Object.Point2D(
          lonLat2Mercator(112.9, 30.56).x,
          lonLat2Mercator(112.9, 30.56).y
        ),
        new Zondy.Object.Point2D(
          lonLat2Mercator(112.86, 30.5).x,
          lonLat2Mercator(112.86, 30.5).y
        ),
        new Zondy.Object.Point2D(
          lonLat2Mercator(112.59, 30.67).x,
          lonLat2Mercator(112.59, 30.67).y
        ),
      ]),
    ]),
  ])
  //设置区要素几何信息
  regGeo.setRegGeom([gReg])
  ```

- 创建属性字段对象

  - Example:

  ```javascript
  //实例化CAttStruct类
  var regAttStr = new Zondy.Object.CAttStruct({
    // 属性字段名称
    FldName: ['ID', '面积', '周长', 'LayerID'],
    // 属性字段个数
    FldNumber: 4,
    // 属性字段类型
    FldType: ['FldLong', 'FldDouble', 'FldDouble', 'FldLong'],
  })
  ```

- 创建属性信息对象
  - Example:
  ```javascript
  var values = [1, 0.00058032464704422, 0.132101984752282, 8]
  //创建属性信息对象
  var valuesRow = new Zondy.Object.CAttDataRow(values, 3286)
  ```

**Step 2. <font color=red>创建要素多圈缓冲区分析服务对象</font>**:

&ensp; &ensp; &ensp; &ensp;创建要素多圈缓冲区分析服务对象，并使用该对象执行缓冲区分析操作；

- Example:
  ```javascript
  //实例化FeatureBuffByMultiplyRing类，设置要素缓冲分析必要参数，输出分析结果到缓冲分析结果图层
  var featureBufByMR = new Zondy.Service.FeatureBuffByMultiplyRing({
    //IGServer所在ip地址
    ip: 'develop.smaryun.com',
    //IGServer请求端口号
    port: '6163',
    //设置多圈缓冲分析的缓冲半径字符串
    radiusStr: '1000,20000,30000',
  })
  /*设置缓冲分析参数*/
  //设置几何信息
  featureBufByMR.sfGeometryXML = JSON.stringify([regGeo])
  //设置属性结构
  featureBufByMR.attStrctXML = JSON.stringify(regAttStr)
  //设置属性值
  featureBufByMR.attRowsXML = JSON.stringify([valuesRow])
  //设置追踪半径
  featureBufByMR.traceRadius = 0.0001
  //设置缓冲结果的名称以及存放地址
  var resultname = 'multiBuffAnalysisResultLayer' + getCurentTime()
  featureBufByMR.resultName = resultBaseUrl + resultname
  //调用Zondy.Service.AnalysisBase基类的execute方法执行要素缓冲分析，AnalysisSuccess为回调函数。
  featureBufByMR.execute(AnalysisSuccess, 'post', false, 'json', AnalysisError)
  ```

**Step 3. <font color=red>结果展示</font>**:

&ensp; &ensp; &ensp; &ensp;   缓冲区分析结果展示，在缓冲区分析执行成功的回调函数加载缓冲结果矢量图层。

- Example:
  ```javascript
  //结果图层的URL
  var resultLayerUrl = data.results[0].Value
  //将结果图层添加到地图视图中显示
  var resultLayer = new mapboxgl.Zondy.Map.MapVectorLayer(
    encodeURIComponent(resultLayerUrl),
    {
      //IGServer所在ip地址
      ip: 'develop.smaryun.com',
      //IGServer请求端口号
      port: '6163',
      //图层guid
      guid: new Date().getTime().toString(),
    }
  )
  resultLayer.addToMap(map)
  ```

### 叠加分析

&ensp;&ensp;&ensp;&ensp;叠加分析是基于两个或两个以上的图层来进行空间逻辑的交、并、差运算，并对叠加范围内的属性进行分析评定，将叠加后的空间要素裁剪组织到一个新的图层中，包括图层叠加、多边形叠加两种方式，其中叠加分析的原理与方法类似，只是调用接口不同。

&ensp;&ensp;&ensp;&ensp;通过关键接口 Zondy.Service.OverlayByLayer()实现 MapGIS 矢量图层之间的图层叠加分析功能，类似的叠加分析服务如多边形叠加分析的关键接口 Zondy.Service.OverlayByPolygon()。

&ensp;&ensp;&ensp;&ensp;**以图层叠加分析为例**：实现针对简单要素类的图层叠加分析，即以一简单要素类图层为叠加对象，另一简单要素类图层为被叠加对象，执行叠加分析的几何运算。

**Step 1. <font color=red>创建图层叠加分析服务对象</font>**:

&ensp; &ensp; &ensp; &ensp;创建图层叠加分析服务对象，并使用该对象执行叠加分析操作；

- Example:
  ```javascript
  //结果图层的名称
  var resultname =
    resultBaseUrl + 'overLayByLayerAnalysisResultLayer' + getCurentTime()
  //实例化OverlayByLayer类
  var overlayParam = new Zondy.Service.OverlayByLayer({
    //IGServer所在ip地址
    ip: 'develop.smaryun.com',
    //IGServer请求端口号
    port: '6163',
    //设置被叠加图层URL
    srcInfo1:
      'gdbp://MapGisLocal/ClientTheme/ds/epsg3857/sfcls/湖北省行政区1_1',
    //设置叠加图层URL
    srcInfo2: 'gdbp://MapGisLocal/ClientTheme/ds/epsg3857/sfcls/湖北省湖泊1_1',
    //设置结果URL
    desInfo: resultname,
    //设置结果图层的图形参数信息
    infoOptType: 2,
    //求交
    overType: 1,
    //允许重算面积
    isReCalculate: true,
    //容差半径
    radius: 0.05,
  })
  //调用基类的execute方法，执行叠加分析， onSuccess为结果回调函数
  overlayParam.execute(AnalysisSuccess, 'post', false, 'json', AnalysisError)
  ```

**Step 2. <font color=red>结果展示</font>**:

&ensp; &ensp; &ensp; &ensp;叠加分析结果展示，在叠加分析执行成功的回调函数加载叠加结果矢量图层。

- Example:
  ```javascript
  //结果图层的名称
  var resultLayerUrl = data.results[0].Value
  //将结果图层添加到地图视图中显示
  var resultLayer = new mapboxgl.Zondy.Map.MapVectorLayer(
    encodeURIComponent(resultBaseUrl + resultLayerUrl),
    {
      //IGServer所在ip地址
      ip: 'develop.smaryun.com',
      //IGServer请求端口号
      port: '6163',
      //图层guid
      guid: new Date().getTime().toString(),
    }
  )
  resultLayer.addToMap(map)
  ```

### 裁剪分析

&ensp;&ensp;&ensp;&ensp;裁剪分析，是指对已知图层所包含的内容和地理范围按照一定规则进行分割。当被裁剪图层所包含的要素处于裁剪范围的边界时，裁剪分析功能需要对要素的几何信息、属性信息按照一定的规则做取舍。当裁剪范围包含在被裁剪图层范围内时，需要对裁剪范围内外的要素做取舍。

&ensp;&ensp;&ensp;&ensp;提供几何要素裁剪和区图层裁剪分析功能服务接口 ClipByCircle、ClipByPolygon、ClipByLayer。要素裁剪分析，以自定义要素的几何范围作为裁剪范围，调用接口 ClipByCircle、ClipByPolygon，设置裁剪规则，并执行裁剪分析，便可得到裁剪分析结果。分析结果可以图层的形式展示到客户端。图层裁剪分析，以指定图层的范围作为裁剪范围，从而实现裁剪分析。二者本质相同。

&ensp;&ensp;&ensp;&ensp;**以要素裁剪分析为例**：实现针对简单要素类的图层圆要素裁剪分析。

**Step 1. <font color=red>创建圆裁减分析服务对象</font>**:

&ensp; &ensp; &ensp; &ensp;创建圆裁剪分析服务对象，并使用该对象执行裁剪分析操作；

- Example:
  ```javascript
  // 设置结果图层的URL
  var resultname =
    resultBaseUrl + 'clipByCircleAnalysisResultLayer' + getCurentTime()
  //实例化Zondy.Service.ClipByCircle类
  var clipParam = new Zondy.Service.ClipByCircle({
    //IGServer所在ip地址
    ip: 'develop.smaryun.com',
    //IGServer请求端口号
    port: '6163',
    //设置圆心坐标
    center: lonLat2Mercator(112.69, 31).x + ',' + lonLat2Mercator(112.69, 31).y,
    //设置圆半径长度
    radius: 100000,
    //设置被裁剪图层URL
    srcInfo: 'gdbp://MapGisLocal/ClientTheme/ds/epsg3857/sfcls/湖北省市级区划1',
    //设置结果图层的UR
    desInfo: resultname,
  })
  //调用基类的execute方法，执行圆裁剪分析。AnalysisSuccess为结果回调函数
  clipParam.execute(AnalysisSuccess, 'post', false, 'json', AnalysisError)
  ```

**Step 2. <font color=red>结果展示</font>**:

&ensp; &ensp; &ensp; &ensp;裁剪分析结果展示，在裁剪分析执行成功的回调函数加载裁剪结果矢量图层。

- Example:
  ```javascript
  //结果图层的名称
  var resultLayerUrl = data.results[0].Value
  //将结果图层添加到地图视图中显示
  var resultLayer = new mapboxgl.Zondy.Map.MapVectorLayer(
    encodeURIComponent(resultBaseUrl + resultLayerUrl),
    {
      //IGServer所在ip地址
      ip: 'develop.smaryun.com',
      //IGServer请求端口号
      port: '6163',
      //图层guid
      guid: new Date().getTime().toString(),
    }
  )
  resultLayer.addToMap(map)
  ```





## 客户端可视化-Echarts

&ensp;&ensp;&ensp;&ensp;基于MapboxGL地图框架，接入百度ECharts，支持在二维地图中加载ECharts散点图、热力图、路径图、渐近线、自定义网格专题图等。

> 百度 ECharts：ECharts完整、详细使用方法可参考<a href="http://echarts.baidu.com/api.html#echarts" target="_blank">官方教程API</a>，开发库下载可参考<a href="http://echarts.baidu.com/download.html" target="_blank">官方下载</a>

> 对接Echarts特别说明：MapGIS Client for JavaScript在MapboxGL中对接了百度Echarts图表插件，若插件本身存在问题，请优先参考Echarts官网解决方案

&ensp;&ensp;&ensp;&ensp;**以散点图-中国微博签到图为例：实现在三维场景中加载ECharts散点图，基于微博官方的签到数据实现“微博签到点亮中国”地图可视化。**通过关键接口`mapboxgl.zondy.EchartsLayer`类来实现ECharts图层的加载。


<a href="http://develop.smaryun.com/#/demo/mapboxgl/client-view/echarts/echartsweibo" target="_blank">
 <img src="./static/demo/mapboxgl/source/img/dev/7002-echartsweibo.png" alt="Echarts散点图-中国微博签到图" style="zoom:80%;" />
</a>


&ensp;&ensp;&ensp;&ensp;具体实现：通过 mapboxgl 扩展的 EchartsLayer 图层实现，其中的参数 option 与echarts方法setOption中一致。即先从json文件中读取数据，并按照格式要求进行处理；然后构建配置项，并创建各种需要的组件，如标题、图例、提示框等，其中最关键的是“series-系列”组件；构造完成后，即可调用`mapboxgl.zondy.EchartsLayer(map, option).addTo(map)`方法，将ECharts图层添加到地图中。


* Example:
  
  ```javascript
    function updateView() {
      var grade = [
        "强",
        "中",
        "弱"
      ]
      var layer;
      $.get('../../static/data/echarts/weibo.geojson', function (weiboData) {
        weiboData = weiboData.map(function (serieData, idx) {
          var px = serieData[0] / 1000;
          var py = serieData[1] / 1000;
          var res = [
            [px, py]
          ];

          for (var i = 2; i < serieData.length; i += 2) {
            var dx = serieData[i] / 1000;
            var dy = serieData[i + 1] / 1000;
            var x = px + dx;
            var y = py + dy;
            res.push([x.toFixed(2), y.toFixed(2), 1]);

            px = x;
            py = y;
          }
          return res;
        });
        // option的关键参数
        option = {
          mapboxgl: {
             // 关键地方1-是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'；设置成 true 为都开启
            roam: true
          },
          coordinateSystem: 'mapboxgl',
          title: {
            text: "中国微博签到图",
            subtext: 'From MapGIS',
            sublink: 'http://www.smaryun.com',
            left: 'center',
            top: 'top',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {},
          legend: {
            left: 'right',
            top: 'top',
            data: [grade[0], grade[1], grade[2]],
            textStyle: {
              color: '#ccc'
            }
          },
          series: [{
            name: grade[2],
            type: 'scatter',
            //关键地方2-坐标系
            coordinateSystem: 'mapboxgl',
            symbolSize: 1,
            large: true,
            itemStyle: {
              normal: {
                shadowBlur: 2,
                shadowColor: 'rgba(37, 140, 249, 0.8)',
                color: 'rgba(37, 140, 249, 0.8)'
              }
            },
            data: weiboData[0]
          }, {
            name: grade[1],
            type: 'scatter',
            coordinateSystem: 'mapboxgl',
            symbolSize: 1,
            large: true,
            itemStyle: {
              normal: {
                shadowBlur: 2,
                shadowColor: 'rgba(14, 241, 242, 0.8)',
                color: 'rgba(14, 241, 242, 0.8)'
              }
            },
            data: weiboData[1]
          }, {
            name: grade[0],
            type: 'scatter',
            coordinateSystem: 'mapboxgl',
            symbolSize: 1,
            large: true,
            itemStyle: {
              normal: {
                shadowBlur: 2,
                shadowColor: 'rgba(255, 255, 255, 0.8)',
                color: 'rgba(255, 255, 255, 0.8)'
              }
            },
            data: weiboData[2]
          }]
        };
        //将Echarts图层添加到地图中
        layer = new mapboxgl.zondy.EchartsLayer(map, option).addTo(map);
      });
    }
  ```

## 客户端可视化-MapV

&ensp;&ensp;&ensp;&ensp;基于MapboxGL地图框架，接入MapV，支持在二维地图中加载MapV热力图、等。

> 对接Mapv特别说明：MapGIS Client for JavaScript在MapboxGL中对接了MapV插件，若插件本身存在问题，请优先参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>寻找解决方案

&ensp;&ensp;&ensp;&ensp;**以MapV热力图为例**：实现在三维场景中加载MapV热力图，热力图采用特殊高亮的形式显示访客热衷的页面区域和访客所在的地理区域。通过关键接口 `mapboxgl.zondy.MapvLayer`类来实现MapV图层的加载，该接口对接Mapv的`mapv.baiduMapLayer`原生接口进行数据的渲染显示。

<a href="http://develop.smaryun.com/#/demo/mapboxgl/client-view/mapv/mapvheater" target="_blank">
 <img src="./static/demo/mapboxgl/source/img/dev/7003-mapvheater.png" alt="MapV热力图" style="zoom:80%;" />
</a>

**Step 1. <font color=red>创建 `DataSet` 对象</font>**：
&ensp;&ensp;&ensp;&ensp;首先构造DataSet对象需要的数据，然后使用数据创建DataSet对象。<a target="_blank" href="https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md">DataSet</a>对象使用Mapv框架的原生API创建，更多详细信息参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>；

* Example:

  ``` javascript
  var randomCount = 1000;
  var data = [];
  var citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州",
    "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"
  ];
  // 构造数据
  while (randomCount--) {
    var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
    data.push({
      geometry: {
        type: 'Point',
        coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
      },
      count: 30 * Math.random(),
      time: 100 * Math.random()
    });
  }
  var dataSet = new mapv.DataSet(data);
  ```

**Step 2. <font color=red>构造 `options` 参数</font>**：
&ensp;&ensp;&ensp;&ensp;<a target="_blank" href="https://github.com/huiyan-fe/mapv/blob/master/src/map/baidu-map/Layer.md">options</a>参数参考Mapv框架的原生API创建，更多详细信息参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>； 

* Example:

  ``` javascript
  var options = {
    context: '2d',
    size: 13,
    gradient: {
      0.25: "rgb(0,0,255)",
      0.55: "rgb(0,255,0)",
      0.85: "yellow",
      1.0: "rgb(255,0,0)"
    },
    max: 60,
    animation: {
      type: 'time',
      stepsRange: {
        start: 0,
        end: 100
      },
      trails: 10,
      duration: 4,
    },
    draw: 'heatmap'
  }
  ```

**Step 3. <font color=red>数据展示</font>**：
&ensp;&ensp;&ensp;&ensp;根据前面的步骤，将 `map` 、 `dataSet` 、 `options` 三个参数传入 `mapboxgl.zondy.MapvLayer` 中创建对象，创建完成数据在地图加载展示。

* Example:

  ``` javascript
     var mapvLayer = new mapboxgl.zondy.MapvLayer(map, dataSet, options);
  ```



## 客户端空间分析

&ensp;&ensp;&ensp;&ensp;基于MapboxGL地图框架，在二维地图中接入第三方开源空间分析库Turf.js，支持客户端实现缓冲区分析、泰森多边形、TIN三角网、中心点、插值、光滑曲线、求交判断等功能。


> Turf.js： turf是JavaScript编写的模块化地理空间引擎，具体使用请查看<a target="_blank" href="http://turfjs.org/">turf官方教程</a>和<a target="_blank" href="https://github.com/Turfjs/turf">下载</a>

> GeoJSON.js： 地理数据转换成<a target="_blank" href="http://geojson.org/">GeoJSON</a>格式，<a target="_blank"  href="https://github.com/caseycesari/GeoJSON.js">GeoJSON.js官方地址</a>


&ensp;&ensp;&ensp;&ensp;**以缓冲区分析为例**，给定一个缓冲半径进行缓冲区分析，单位支持 `miles 米`，`kilometers 千米`，`degrees 度`。


<a href="http://develop.smaryun.com/#/demo/mapboxgl/client-analysis/buffer" target="_blank">
 <img src="./static/demo/mapboxgl/source/img/dev/8001-buffer.png" alt="客户端缓冲区分析" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：先通过 `L.tileLayer`加载二维地图，然后使用 `Turf.js` 空间分析库的 `turf.buffer()` 方法进行缓冲区分析。即准备`点`、`线`、`面`要素数据，根据`缓冲区分析算法`得到缓冲区分析结果。

**Step 1. <font color=red>准备数据</font>**：
&ensp;&ensp;&ensp;&ensp;准备`点`、`线`、`面`要素数据

* Example:

   ```javascript
      var geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [114.24270629882811, 30.622550184776674],
            },
          },
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [114.34810638427734, 30.634958017061198],
                [114.2856216430664, 30.554869984737515],
                [114.246826171875, 30.4954261715298],
              ],
            },
          },
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [114.33815002441406, 30.502230042106245],
                  [114.34398651123045, 30.485071542395932],
                  [114.3728256225586, 30.472348632640834],
                  [114.38278198242188, 30.49010107130931],
                  [114.35256958007811, 30.50518809826035],
                  [114.33815002441406, 30.502230042106245],
                ],
              ],
            },
          },
        ],
      };
   ```

**Step 2. <font color=red>执行缓冲区分析</font>**：
&ensp;&ensp;&ensp;&ensp;执行 `缓冲区分析算法`，返回缓冲结果要素数据，将得到的缓冲结果要素数据添加到地图中。

* Example:

   ```javascript
      function initMap() {
        //请特别重视这个图层名字geojsonBuffer
        map.addSource("geojsonBuffer", {
          type: "geojson",
          data: geojson, //一开始的数据是空的,后面请求到了再更新
        });

        map.addLayer({
          id: "buffer-polygon",
          type: "fill",
          source: "geojsonBuffer",
          layout: {},
          paint: {
            "fill-color": "#000000",
            "fill-opacity": 0.7,
            "fill-outline-color": "#FFF",
            "fill-antialias": true, //抗锯齿，true表示针对边界缝隙进行填充
          },
        });
      }

      function loadData() {
        convertDataToGeoJson();
        updateView();
      }
      //执行缓冲区分析
      function convertDataToGeoJson() {
        geojson = turf.buffer(geojson, 1.5, {
          units: "miles",
        });
      }
      //更新显示分析结果
      function updateView() {
        //注意geojsonBuffer是之前添加的source的名字
        map.getSource("geojsonBuffer").setData(geojson);
      }  
   ```


