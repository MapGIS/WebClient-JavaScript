## 准备开发

### 数据准备
&ensp; &ensp; &ensp; &ensp; 产品支持接入多种GIS服务标准。用户可选择已发布的GIS服务资源，或自行构建GIS服务器环境，使用自己发布的GIS服务。本示例默认使用MapGIS云端GIS服务资源。

> 若需使用自己发布的GIS服务，请先构建GIS环境并发布服务，请前往<a href="http://www.smaryun.com/dev/service-space/resource?from=1#/node_id75" targer="_blank">司马云-开发世界-技术资源-基础平台产品资源</a>，查看MapGIS 云GIS服务器产品相关帮助文档，在此不再详述。

### 创建项目
 本示例使用的以 Visual Studio Code（简称 VSCode）为例，介绍基于HTML5传统开发方式开发WebGIS应用过程。
 在指定的目录中新建MapDisplay文件夹，作为 WebGIS 网站目录，通过VSCode打开此项目:

<center>
  <img src="./static/demo/mapboxgl/source/img/01.新建网站目录.png" alt="新建网站目录" style="zoom:80%; " />
  <br>
  <div class="notes">新建网站目录</div>
</center>
<br/>

### 获取开发库

#### 下载离线文件

&ensp; &ensp; &ensp; &ensp; 请登录司马云-云开发世界-产品开发包下载<a href="http://www.smaryun.com/dev/download_detail.html#/download828"> MapGIS Client for JavaScript 开发包</a>，或登录产品<a href="https://github.com/MapGIS/WebClient-JavaScript" targer="_blank">github</a>、<a href="https://gitee.com/osmapgis/WebClient-JavaScript" targer="_blank">gitee</a>开源仓库下载源码，自行编译、打包。解压后的离线资源包如下图：

<center>
<img src="./static/demo/mapboxgl/source/img/开发库.png" alt="MapGIS Client for JavaScript开发库" style="zoom:80%; " />
</center>

将开发库目录 libs 文件夹拷贝到项目中，如目录[..\static\libs]目录中，在新建的项目主入口文件中添加引入信息，如在项目主入口HTML页面的 <head> 标签中引入 MapGIS Client for JavaScript（MapboxGL）的开发库：

- Example:

```javascript
<script src="libs/include-mapboxgl-local.js"> </script>
```

> 离线版本的核心原理就是根据 include=""中的名字，在当前 cdn 文件夹下寻找对应的 js 的脚本并按照规定的顺序引入到浏览器中
> “include-\*.js 通过 include="xxx"的方式自动寻找引入对应的第三方脚本”


#### npm安装

&ensp;&ensp;&ensp;&ensp;使用此方式前请先检查电脑中是否已安装应用程序 <a href="https://nodejs.org/en/">Node.js</a>，若未安装，需要先安装<a href="https://nodejs.org/en/">Node.js</a>环境。

&ensp;&ensp;&ensp;&ensp;在VSCode“终端”中输入如下命令安装资源包。

- Example:

  ```javascript
  npm install @mapgis/mapbox-gl
  ```

&ensp;&ensp;&ensp;&ensp;通过 npm 指令安装 MapGIS Client for JavaScript 开发包，在新建的项目主入口文件中添加引入信息。




## 创建一幅地图

本示例以MapGIS官方云端（develop.smaryun.com）已经发布的名称为“北京市”（或“SampleDoc”）的MapGIS地图文档服务为例，介绍创建一幅地图全过程。

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

(6) 运行调试

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


