
## 准备开发

&ensp;&ensp;&ensp;&ensp;进行WebGIS应用开发，一般均采用前端开发库+GIS服务的模式，开发者须完成如下三个步骤：

&ensp;&ensp;&ensp;&ensp;**第一步：<font color=red>安装配置开发环境</font>，包括MapGIS开发环境（含开发授权）、集成开发环境；**

&ensp;&ensp;&ensp;&ensp;根据实际应用需求，选择.NET或九州系列MapGIS开发平台产品安装，通常包括MapGIS Desktop桌面工具、MapGIS IGServer等云GIS产品。

&ensp;&ensp;&ensp;&ensp;例如选用.NET版本，常用环境如下：
- MapGIS开发包：<a href="http://smaryun.com/dev/download_detail.html#/download689" targer="_blank">MapGIS IGServer .NET x64 for Windows开发包</a>
- MapGIS开发授权：<a href="http://www.smaryun.com/dev/dev_auth_detail.php" targer="_blank">云开发授权</a>（基础版/高级版）
- 集成开发环境：Visual Studio Code

&ensp;&ensp;&ensp;&ensp;**第二步：<font color=red>发布GIS服务资源</font>，在MapGIS IGServer的服务管理器中发布所需的地图服务，以及扩展的功能服务等；**

&ensp;&ensp;&ensp;&ensp;基于MapGIS Server Manager发布地图服务的具体操作，请查看**MapGIS IGServer操作手册**（<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag206/page1/doc770" target="_blank">.NET版</a>，<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag212/page1/doc823" target="_blank">九州版</a>）

&ensp;&ensp;&ensp;&ensp;在访问MapGIS IGServer的服务时，需要先确定GIS服务器IP地址与服务端口号；在二次开发时，根据所使用的MapGIS IGServer平台版本以及其服务管理器中IGServer配置情况（ip、port），对二次开发接口中涉及的地图服务访问的ip、port进行相应设置。

- .NET版：IGServer服务管理器访问默认地址（127.0.0.1:9999）、IGServer服务访问默认基地址（127.0.0.1:6163）
- 九州版：IGServer服务管理器访问默认地址（127.0.0.1:8089）、IGServer服务访问默认基地址（127.0.0.1:8089）
  
&ensp;&ensp;&ensp;&ensp;**第三步：<font color=red>获取前端开发库（MapGIS Client for JavaScript开发库）</font>**，通过文件拷贝或npm方式引用开发库，进行WebGIS二维或三维应用开发。

- MapGIS官方下载地址：<a href="http://smaryun.com/dev/download_detail.html#/download828" targer="_blank">http://smaryun.com/dev/download_detail.html#/download828</a>
- GitHub 托管地址：<a href="https://github.com/MapGIS/WebClient-JavaScript" targer="_blank">https://github.com/MapGIS/WebClient-JavaScript</a>
- Gitee 托管地址：<a href="https://gitee.com/osmapgis/WebClient-JavaScript" targer="_blank">https://gitee.com/osmapgis/WebClient-JavaScript</a>

### 引入开发库


#### 文件方式（离线）

&ensp;&ensp;&ensp;&ensp;请下载MapGIS Client for JavaScript开发包，将开发库目录libs下的cdn文件夹与include-xx.js文件放在工程同一目录下，然后在网页中引入对应的include-xx.js文件即可，可以将整个目录[..\static\libs]拷贝到工程中

> 离线版本的核心原理就是根据include=""中的名字，在当前cdn文件夹下寻找对应的js的脚本并按照规定的顺序引入到浏览器中
> “include-*.js 通过include="xxx"的方式自动寻找引入对应的第三方脚本”

&ensp;&ensp;&ensp;&ensp;新建一个 HTML 文件，在 <head> 标签中引入 MapGIS Client for JavaScript（Leaflet）的开发库：

- Example:

  ```javascript
  <script src="libs/include-leaflet-local.js"></script>
  ```

<img src="./static/demo/leaflet/source/img/开发库.png" alt="MapGIS Client for JavaScript开发库" style="zoom:80%;" />

#### npm 方式引用

&ensp;&ensp;&ensp;&ensp;使用此方式前请先检查电脑中是否已安装应用程序 <a href="https://nodejs.org/en/">Node.js</a>，若未安装，需要先安装<a href="https://nodejs.org/en/">Node.js</a>环境。

&ensp;&ensp;&ensp;&ensp;通过 npm 命令引入 OpenLayers 地图引擎，建议使用 1.6 及以上版本。

- Example:

  ```javascript
  npm install leaflet
  ```

&ensp;&ensp;&ensp;&ensp;通过 npm 指令引入 MapGIS Client for JavaScript 开发包。



## 开始开发

&ensp;&ensp;&ensp;&ensp;先根据“开发环境”要求安装配置好MapGIS开发环境（含MapGIS云开发授权），然后获取MapGIS Client for JavaScript（Leaflet）SDK进行二次开发。

&ensp;&ensp;&ensp;&ensp;下面使用H5原生JS方式，演示如何在网页中显示一幅MapGIS矢量地图。

### 数据准备

&ensp;&ensp;&ensp;&ensp;本示例使用MapGIS官方云端（develop.smaryun.com）已经发布的名称为“Hubei4326”（或“SampleDoc”）的地图文档进行演示。若您需要显示自己的地图文档，需要先附加待显示地图数据所在的地理数据库，然后通过**MapGIS Server Manager**配置GIS服务环境并发布地图服务。

<center>
  <img src="./static/demo/leaflet/source/img/MapGIS发布服务.png" alt="MapGIS服务发布" style="zoom:80%;" />
  <br>
  <div class="notes">MapGIS Server Manager发布服务</div>
</center>
<br/>

> 基于MapGIS Server Manager发布地图服务的具体操作，请查看**MapGIS IGServer操作手册**（<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag206/page1/doc770" target="_blank">.NET版</a>，<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag212/page1/doc823" target="_blank">九州版</a>）

### 开发入门：创建一幅地图

> 本示例使用的开发集成工具为 Visual Studio Code（简称VSCode），您可以根据开发习惯选择适合自己的开发工具

#### Step 1. 新建Web网站

&ensp;&ensp;&ensp;&ensp;在VSCode或本地磁盘中新建一个文件目录作为Web网站目录，名称为MapLoading；

<center>
  <img src="./static/demo/leaflet/source/img/01.新建网站目录.png" alt="新建网站目录" style="zoom:80%;" />
  <br>
  <div class="notes">新建网站目录</div>
</center>
<br/>

#### Step 2. 引入JavaScript开发库（离线方式）

&ensp;&ensp;&ensp;&ensp;在新建的Web网站（文件目录）中，拷贝MapGIS Client for JavaScript（OpenLayers5）开发库到网站根目录下，即将SDK包路径MapGIS Client for JavaScript_V10.5.X.X\static\libs的libs拷贝到“MapLoading”目录下。此libs包含了全部的开发库（js与css文件），可选择只拷贝Leaflet的库。

<center>
  <img src="./static/demo/leaflet/source/img/02.引用脚本库资源.png" alt="引入脚本库资源" style="zoom:80%;" />
  <br>
  <div class="notes">引入脚本库资源</div>
</center>
<br/>

#### Step 3. 加载显示地图

(1) 在上述新建的网站中，通过新建文件方式，创建一个名称为“MapDocDisplay”的html网页文件，可通过自定义模板快速创建网页结构内容；

<center>
  <img src="./static/demo/leaflet/source/img/03.新建HTML页面（空）.png" alt="新建HTML页面（空）" style="zoom:80%;" />
  <br>
  <div class="notes">新建HTML页面（空）</div>
</center>
<br/>

<center>
  <img src="./static/demo/leaflet/source/img/03.新建HTML页面（模板）.png" alt="新建HTML页面（模板）" style="zoom:80%;" />
  <br>
  <div class="notes">新建HTML页面（模板）</div>
</center>
<br/>

(2) 设置示例标题，在该页面引入Leaflet开发的必要脚本库include-leaflet-local.js，此脚本库会动态引入核心库webclient-leaflet-plugin.min.js与相关第三方库、样式文件等；

<center>
  <img src="./static/demo/leaflet/source/img/04.引用开发库.png" alt="引用开发库" style="zoom:80%;" />
  <br>
  <div class="notes">引用开发库</div>
</center>
<br/>


(3) 创建一个ID为“mapCon”的div层，并设置其样式，用来作为显示矢量地图文档的地图容器;

<center>
  <img src="./static/demo/leaflet/source/img/05.创建div层并设置样式.png" alt="创建div层并设置样式" style="zoom:80%;" />
  <br>
  <div class="notes">创建div层并设置样式</div>
</center>
<br/>

(4) 通过body的onload事件触发调用矢量地图文档显示的脚本函数init()；

<center>
  <img src="./static/demo/leaflet/source/img/06. body的onload事件.png" alt="body的onload事件" style="zoom:80%;" />
  <br>
  <div class="notes">body的onload事件</div>
</center>
<br/>

(5) 在该页面中嵌入JavaScript代码，实现矢量地图文档显示的脚本函数init()，即初始化L.Map与Zondy.Map.MapDocLayer类，通过图层的addTo方式加载到地图中，并设置地图的参考坐标系，显示中心，显示级别，以及地理范围;

> 注意：通常情况下，功能实现的JavaScript代码可以单独放置到一个JS文件中，便于维护

<center>
  <img src="./static/demo/leaflet/source/img/07.矢量地图文档显示的脚本函数init.png" alt="矢量地图文档显示的脚本函数init" style="zoom:80%;" />
  <br>
  <div class="notes">矢量地图文档显示的脚本函数init()</div>
</center>

- Example:

  ```javascript
        function init() {
             "use strict";
            //地图容器
            var map = L.map('mapCon', {
                //添加缩放控件
                zoomControl: true,
                //投影坐标系
                crs: L.CRS.EPSG4326,
                //中心点
                center: [(29.0125822276524 + 33.2932017737021) / 2, (108.34341 + 116.150939561213) / 2],
                //最大级数
                maxZoom: 10,
                //最小级数
                minZoom: 0,
                //显示级数
                zoom: 6
            });
            //创建地图文档图层
            var mapDocLayer = new Zondy.Map.MapDocLayer("Hubei4326", {
                //GIS服务器的IP地址
                ip: "develop.smaryun.com",
                //端口号
                port: "6163",
                //只显示一个图层,不平铺显示
                noWrap: true
            }).addTo(map);
        }
  ```


#### Step 4. 运行调试

&ensp;&ensp;&ensp;&ensp;VSCode是一个非常流行的Web前端开发IDE，在编写Web网站时一般需要发布后编译运行，也可安装相关插件调试运行。

&ensp;&ensp;&ensp;&ensp;在此，可先将“MapLoading”站点发布，然后通过浏览器查看与调试。例如：在IIS中发布站点后，右键“浏览”选中的“MapDocDisplay.html”文件，即可在浏览器中查看，并进行前端调试。

<center>
  <img src="./static/demo/leaflet/source/img/08.在IIS中浏览网页.png" alt="在IIS中浏览网页" style="zoom:80%;" />
  <br>
  <div class="notes">在IIS中浏览网页</div>
</center>
<br/>
<center>
  <img src="./static/demo/leaflet/source/img/09.矢量地图文档显示效果图.png" alt="矢量地图文档显示效果图" style="zoom:70%;" />
  <br>
  <div class="notes">矢量地图文档显示效果图</div>
</center>
<br/>
&ensp;&ensp;&ensp;&ensp;需要调试时，可以利用浏览器的开发者工具进行测试，例如IE、Firefox、Chrome等。打开浏览器的开发者工具，在代码行前端设置断点，然后在浏览器中重新运行示例页面，程序将会运行进入到代码断点处，方便查看相关信息。


## 服务发布

&ensp;&ensp;&ensp;&ensp;在此以发布地图文档（REST模式）为例，发布单个地图文档的配置操作如下：
在MapGIS Server Manager页面左侧导航栏中的“地图与数据服务”中，单击“发布服务”，在下拉菜单中选择“文档发布（包括WMS/WFS/WMTS）”选项。页面跳转至发布服务配置页面。
 
<center>
  <img src="./static/demo/leaflet/source/img/MapGIS发布服务.png" alt="MapGIS服务发布" style="zoom:80%;" />
  <br>
  <div class="notes">MapGIS Server Manager发布服务</div>
</center>
<br/>

&ensp;&ensp;&ensp;&ensp;配置项参数说明：
1. 选取地图文档：点击“地图文档路径”后的“浏览”按钮，在服务器磁盘中选择发布的地图文档（.mapx），选取后自动读取该文档的名称。矢量地图文档分为如下两种类型，即本地数据源、远程数据源（也称网络数据源，即关系数据库存储地理数据的GDBServer）。

- 本地数据源（HDF）：适用于地理数据库文件，存在并且添加到MapGIS IGServer中，对应的gdbServer名称为“MapGISLocal”，gdb用户名和密码为空；
- 本地数据源（HDB）【推荐使用】：适用于地理数据库文件，存在并且添加到MapGIS IGServer中，对应的gdbServer名称为“MapGISLocalPlus”，gdb用户名和密码为空；
- 远程数据源：适用于地图文档所调用要素图层数据，存在于非本地数据库中，如Oracle数据库；

> MapGIS IGServer(九州)支持本地数据源HDB方式，不支持本地数据源HDF方式。

2. 发布地图文档：在服务器磁盘中找到需要发布的mapx地图文档并添加之后，点击“发布”按钮，即可发布二维地图文档为MapGIS Rest地图服务格式；
3. 获取地图服务的基地址与相关信息，用于Web应用开发。
  
<br/>


## 第三方地图

&ensp;&ensp;&ensp;&ensp;第三方地图，主要指的就是互联网上涌现的大量地图服务资源，提供免费开放的基础地图服务，一般均为瓦片地图形式，常在应用中作为底图直接调用。网络上主流的公共地图服务包括OpenStreetMap、Bing地图、百度地图、高德地图、天地图地图等。这些免费的在线地图服务资源，吸引了众多用户，不仅方便了广大开发者使用在线地图开发丰富的地图应用，扩宽互联网地图应用范围，挖掘GIS的潜在价值；同时也让更多人了解电子地图、了解互联网GIS，享受互联网GIS带来的便利和乐趣。

&ensp;&ensp;&ensp;&ensp; 支持第三方公共互联网地图，如百度地图、天地图、Bing地图、OSM地图，以及ArcGIS地图等。

| 地图类型 |  类名          |     API说明    |
| ------- | -------------- |----------------|
| 百度地图 | Zondy.Map.BaiduTileLayer | 百度地图，支持各种风格样式，访问需要Key |
| 天地图 | Zondy.Map.TDTLayer |  天地图，类型包括vec、cva、img、cia ，访问需要token|
| Bing地图 | L.tileLayer.bing | Bing地图，访问需要key|
| OSM地图 | L.tileLayer| OpenStreetMap地图 |
| ArcGIS地图 | Zondy.Map.ArcGISLayer| 基于ArcGIS平台发布的地图服务 |


### 百度地图

<a href="http://develop.smaryun.com/#/demo/leaflet/internet/baidu" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/1001-baidu.png" alt="百度地图" style="zoom:80%;" />
</a>

- Example:

  ```javascript
    //地图投影参考系
    var BaiduCRS = new L.Proj.CRS(
        'EPSG:3395',
        '+proj=merc +lon_0=0 +k=1 +x_0=140 +y_0=-250 +datum=WGS84 +units=m +no_defs', {
            resolutions: function () {
                level = 19;
                var res = [];
                res[0] = Math.pow(2, 18);
                for (var i = 1; i < level; i++) {
                    res[i] = Math.pow(2, (18 - i))
                }
                return res;
            }(),
            origin: [0, 0],
            bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
        }
    );
    //初始化百度地图图层（午夜蓝风格）
    var midnight = new Zondy.Map.BaiduTileLayer({
        styles: 'midnight',
        baidukey: '5ssIAkexwFSGMatjOF95gg3sjet3yxQ1'
    });

    //初始化地图容器
    var map = L.map('map', {
        crs: BaiduCRS,
        layers: [midnight]
    }).setView([29.578285, 106.563777], 5);

  ```


### 天地图

<a href="http://develop.smaryun.com/#/demo/leaflet/internet/tianditu" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/1002-tianditu.png" alt="天地图" style="zoom:80%;" />
</a>

- Example:

  ```javascript
  //初始化地图容器
  var map = L.map('leaf_map', {
    //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
    crs: L.CRS.EPSG4326, //这里换成TDT_WGS84对数据精度要求不高应该也能替代
    //显示中心
    center: [40, 100],
    //最小显示等级
    minZoom: 0,
    //最大显示等级
    maxZoom: 5,
    //当前显示等级
    zoom: 3
    //限制显示地理范围
    //maxBounds: L.latLngBounds(L.latLng(-180, -180), L.latLng(180, 180))
  });
  //初始化图层
  var layer1 = new Zondy.Map.TDTLayer({
    //图层类型
    layerType: 'vec',
    //最小显示等级
    minZoom: 0,
    //最大显示等级
    maxZoom: 15,
    //key
    token: "4c27d6e0e8a90715b23a989d42272fd8",
    //设置地图不连续显示
    noWrap: true
  });
  var layer2 = new Zondy.Map.TDTLayer({
    //图层类型
    layerType: 'cva',
    //最小显示等级
    minZoom: 0,
    //最大显示等级
    maxZoom: 15,
    //key
    token: "4c27d6e0e8a90715b23a989d42272fd8",
    //设置地图不连续显示
    noWrap: true
  });
  //图层组
  var LayerG = L.layerGroup([layer1, layer2]);
  //添加图层组
  LayerG.addTo(map);
  ```



### Bing地图

<a href="http://develop.smaryun.com/#/demo/leaflet/internet/bings" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/1003-bings.png" alt="Bing地图" style="zoom:100%;" />
</a>

- Example:

  ```javascript
  //Bing地图访问key
  var BING_KEY = 'AnYM1Mc95gvJhvI4AqRArTEzXhk4_kd53oAN539aU9ME7rFBbUX7AoSSBX_9oeqr'
  //初始化地图容器
  var map = L.map('leaf_map').setView([51.505, -0.09], 13);
  //初始图层并加载到地图中
  var bingLayer = L.tileLayer.bing(BING_KEY).addTo(map);
  ```


### OSM地图

<a href="http://develop.smaryun.com/#/demo/leaflet/internet/osm" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/1004-osm.png" alt="OSM地图" style="zoom:80%;" />
</a>

- Example:

  ```javascript
  //OSM地图服务地址
  var osmUrl = 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png';
  //初始化图层
  var Layer = L.tileLayer(osmUrl, { minZoom: 5, maxZoom: 18 });
  //初始化地图容器
  var map = L.map('leaf_map', {
    //显示中心
    center: [30.495722001885323, 114.39960479736327],
    //最小显示等级
    minZoom: 0,
    //最大显示等级
    maxZoom: 15,
    //当前显示等级
    zoom: 11,
    //图层
    layers: Layer
  });
  ```


### ArcGIS地图

<a href="http://develop.smaryun.com/#/demo/leaflet/internet/arcgis" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/1005-arcgis.png" alt="ArcGIS地图" style="zoom:100%;" />
</a>

- Example:

  ```javascript
    //初始化图层
    var Layer = new Zondy.Map.ArcGISLayer({
      //图层类型
      layerType: Zondy.Enum.Map.ArcGISLayerType.StreetMapWorld2D,
      //设置地图不连续显示
      noWrap:true
    });
    //初始化地图容器
    var map = L.map('leaf_map', {
      //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
      crs: L.CRS.EPSG4326,
      //显示中心
      center: [27, 113],
      //最小显示等级
      minZoom: 0,
      //最大显示等级
      maxZoom: 15,
      //当前显示等级
      zoom: 6,
      //图层
      layers:Layer,
      //限制显示地理范围
      maxBounds: L.latLngBounds(L.latLng(-180, -180), L.latLng(180, 180))
    });
  ```

## OGC服务

&ensp;&ensp;&ensp;&ensp; OGC（OpenGIS Consortium OpenGIS协会）是一个公益的行业协会，成立于1994年，致力于促进采用新的技术和商业方式来提高地理信息处理的互操作性(Interoperability)。OGC为实现地理信息共享与互操作，定义了一系列Web地理信息服务的抽象接口与实现规范，包括WMS、WFS、WMTS、WCS等.

| 服务类型 |  类名          |     API说明    |
| ------- | -------------- |----------------|
| WMS | L.tileLayer.wms | WMS服务，即地图服务，WMS的GetMap接口返回指定范围内的地图图片 |
| WMTS | Zondy.Map.MapWMTSLayer |  WMTS服务，即瓦片地图服务，WMTS的GetTile接口返回的就是单张瓦片|
| WFS | L.marker | WFS服务，即要素服务，WFS的GetFeature接口返回GML等格式的矢量数据，通过标注形式添加矢量要素|

&ensp;&ensp;&ensp;&ensp; MapGIS IGServer全面支持OGC服务的发布与应用，包括WMS、WFS、WMTS、WCS等服务。其中，常用的WMS、WFS、WMTS中对应的MapGIS格式的数据类型为：
- WMS：MapIGS格式的地图文档、矢量图层；
- WFS：MapIGS格式的地图文档、矢量图层；
- WMTS：MapIGS格式的瓦片图层、实时瓦片图层、分布式瓦片图层。

> 要在客户端调用OGC服务，需要先在IGServer服务管理器中发布OGC服务，具体操作请查看**MapGIS IGServer操作手册**（<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag206/page1/doc770" target="_blank">.NET版</a>，<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag212/page1/doc823" target="_blank">九州版</a>）

### WMS 

&ensp;&ensp;&ensp;&ensp;Web Map Service（网络地图服务），简称 WMS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定。该规范定义了 Web 客户端从网络地图服务器获取地图的接口标准。一个 WMS 可以动态地生成具有地理参考数据的地图，这些地图通常用 GIF、JPEG 或 PNG 等图像格式，或者 SVG、KML、VML 和 WebCGM 等矢量图形格式来表现。使用者通过指定的参数获取相应的地图图片。

<a href="http://develop.smaryun.com/#/demo/leaflet/ogc/wms" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/1011-wms.png" alt="WMS地图" style="zoom:80%;" />
</a>

- Example:

  ```javascript
                //初始化地图容器
                var map = L.map('leaf_map', {
                    //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
                    crs: L.CRS.EPSG4326,
                    //显示中心
                    center: [40.20, 116.39],
                    //最小显示等级
                    minZoom: 1,
                    //最大显示等级
                    maxZoom: 15,
                    //当前显示等级
                    zoom: 8,
                    //限制显示地理范围
                    maxBounds: L.latLngBounds(L.latLng(-180, -180), L.latLng(180, 180))
                });

                //wms服务图层
                var Layer = L.tileLayer
                    .wms(`http://develop.smaryun.com:6163/igs/rest/ogc/doc/北京市/WMSServer?`, {
                        //图层名称
                        layers:
                            '北京市,绿地_1,绿地_2,绿地_3,绿地_4,水域_3,水域_2,水域_1,大学,学校,动物园,高尔夫,观光胜地,果园,住宅用地,医院,商业用地,建筑物,铁路_1,铁路_2,铁路_3,主干道,主干道,高速公路_1,高速公路_1_9-10,三级道路_链接,三级道路,二级道路_链接,二级道路,一级道路_链接,一级道路,主干道_链接,主干道,主干道,高速公路_链接,高速公路_2,高速公路_2,三级道路_链接,三级道路,二级道路_链接,二级道路,一级道路_链接,一级道路,地铁,主干道_链接,主干道,主干道,高速公路_链接,高速公路_2,高速公路_2,地铁站POI,山顶,果园poi,汽车站点POI,大学poi,学校poi,中小学POI,幼儿园POI,医院POI,口腔医院POI,派出所POI,检察院POI,银行POI,邮局POI,体育馆POI,纪念碑POI,博物馆POI,名胜古迹点,动物园poi,观光胜地poi,主题公园POI,宾馆POI,百货店POI,便利店POI,书店POI,快餐POI,咖啡馆POI,电影院POI,高尔夫poi,村庄点,市镇点,区县点,首都点',
                        //wms版本号
                        version: '1.1.1'
                    })
                    .addTo(map);
  ```  

### WMTS

&ensp;&ensp;&ensp;&ensp;Web Map Tile Service（网络地图瓦片服务），简称 WMTS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定，是和 WMS 并列的重要 OGC 规范之一。WMTS 不同于 WMS,它最重要的特征是采用缓存技术能够缓解 WebGIS 服务器端数据处理的压力，提高交互响应速度，大幅改善在线地图应用客户端的用户体验。WMTS 是 OGC 主推的缓存技术规范，是目前各种缓存技术相互兼容的一种方法。

<a href="http://develop.smaryun.com/#/demo/leaflet/ogc/wmts" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/1012-wmts.png" alt="WMTS地图" style="zoom:80%;" />
</a>

- Example:

  ```javascript
                //初始化地图容器
                var map = L.map('leaf_map', {
                    //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
                    crs: L.CRS.EPSG4326,
                    //显示中心
                    center: [40.2, 116.39],
                    //最小显示等级
                    minZoom: 1,
                    //最大显示等级
                    maxZoom: 15,
                    //当前显示等级
                    zoom: 8
                });
                //wmts服务图层
                var wmtsLayer = new Zondy.Map.MapWMTSLayer({
                    //IGServer所在ip地址
                    ip: `http://develop.smaryun.com`,
                    //访问IGServer的端口号，.net版为6163，Java版为8089
                    port: 6163,
                    tilematrixSet: 'EPSG:4326_北京市_arcgis_GB',
                    //wmts服务名称
                    layer: 'beijing'
                }).addTo(map);
  ```

### WFS 

<a href="http://develop.smaryun.com/#/demo/leaflet/ogc/wfs" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/1013-wfs.png" alt="WFS地图要素" style="zoom:80%;" />
</a>

- Example:

  ```javascript
            //地图容器
            map = L.map('leaf_map', {
                //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
                crs: L.CRS.EPSG4326,
                //显示中心
                center: [0, 0],
                //最小显示等级
                minZoom: 1,
                //最大显示等级
                maxZoom: 5,
                //当前显示等级
                zoom: 2,
                //限制显示地理范围
                maxBounds: L.latLngBounds(L.latLng(-180, -180), L.latLng(180, 180))
            });

            //WFS服务地址
            var baseurl = `http://develop.smaryun.com:6163/igs/rest/ogc/doc/WorldJWVector/WFSServer?REQUEST=GetFeature&version=1.1.0&service=wfs&typename=WorldJWVector:主要城市&maxfeatures=600`;
            //通过一般处理程序解决跨域
            var url = './static/libs/cdn/zondyclient/ZDproxy.ashx?url=' + baseurl;
            //发送Ajax请求获取数据
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'xml',
                contentType: "application/x-www-form-urlencoded",
                success: function (result) {
                    //解析数据
                    if (result.children[0].children.length > 0) {
                        for (var datalength = 0; datalength < result.children[0].children[0].children.length; datalength++) {
                            var data = result.children[0].children[0].children[datalength].children[0].children[0].children[0].textContent.split(" ");
                            //添加标记
                            L.marker([Number(data[1]), Number(data[0])], {
                                //添加悬浮名称
                                title: result.children[0].children[0].children[datalength].children[11].innerHTML
                            }).addTo(map);
                        }

                    }
                },
                error: function () {
                    alert("请求WFS服务失败");
                }
            });
  ```


## MapGIS地图服务

&ensp;&ensp;&ensp;&ensp;MapGIS按照“地理数据库－数据集－类”这几个层次组织空间数据，以满足不同应用领域对不同专题数据的组织和管理需要。地理数据库是面向实体空间数据模型的全局视图，统一管理矢量数据和栅格数据，能够完整地、一致地表达被描述区域的地理模型。

&ensp;&ensp;&ensp;&ensp;MapGIS地理数据库主要包括两种存储方式，一种是以MapGIS本地HDF、HDB文件形式存储数据，也称本地数据源；另一种，对接第三方各种类型的数据库，如以关系数据库（SQL Server、Oracle、DB2等）形式存储数据，也称网络数据源。**针对本地数据源，推荐使用MapGIS 10.5自定义的HDB地理数据库。**

&ensp;&ensp;&ensp;&ensp;在Web上的数据加载，分为矢量数据、瓦片数据、矢量瓦片等数据类型：

- **矢量数据**，以图层的方式直接加载，或者将图层组织成一个地图文档（*.mapx），以地图文档方式加载矢量地图。地图文档只是地图视图，是相应地理数据库中的索引，其源数据存储在地理数据库。不管是图层还是地图文档，Web上发布都是实时生成地图，地图上的数据操作与数据库中的数据保持同步更新。
- 何为**瓦片**？瓦片即网格中多个类似瓦片的图片集。瓦片数据是将矢量地图文档或影像数据进行预处理，采用高效的缓存机制形成的缓存图片集，可在网页中快速加载，并且效果较好。
- **矢量瓦片**，对矢量电子地图按照一定的标准和技术将其保存为多种比例尺的矢量分块数据，在前端显示电子地图时，可直接调用矢量分块进行绘制。矢量瓦片的样式可以改变和定制，矢量切片可以在客户端渲染，可以按照用户赋予的样式渲染。


| 地图类型 |  类名          |     API说明    |
| ------- | -------------- |----------------|
| 矢量地图文档 | Zondy.Map.MapDocLayer | 加载基于MapGIS矢量地图文档的矢量服务数据 |
| 矢量图层 | Zondy.Map.MapVectorLayer | 加载基于MapGIS矢量图层的矢量服务数据 |
| 瓦片地图 | Zondy.Map.MapTileLayer | 加载基于MapGIS瓦片的瓦片服务数据 |


### 矢量地图文档

&ensp;&ensp;&ensp;&ensp;基于地图文档加载矢量地图：首先实例化地图容器L.map，其中通过crs设置投影坐标系；然后实例化Zondy.Map.MapDocLayer对象构建地图文档图层，并添加到地图容器中。

<a href="http://develop.smaryun.com/#/demo/leaflet/mapgis-igserver/map/epsg4326" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/1021-doclayer.png" alt="矢量地图文档" style="zoom:80%;" />
</a>

- Example
  ```javascript
            //地图容器
            var map = L.map('leaf_map', {
                //添加缩放控件
                zoomControl: true,
                //投影坐标系
                crs: L.CRS.EPSG4326,
                //中心点
                center: [(29.0125822276524 + 33.2932017737021) / 2, (108.34341 + 116.150939561213)
                / 2],
                //最大级数
                maxZoom: 10,
                //最小级数
                minZoom: 0,
                //显示级数
                zoom: 6
            });

            //创建地图文档图层（4326投影参考系）
            var mapDocLayer = new Zondy.Map.MapDocLayer("Hubei4326", {
                //IP地址
                ip: `http://develop.smaryun.com`,
                //访问IGServer的端口号，.net版为6163，Java版为8089
                port: 6163,
                //只显示一个图层,不平铺显示
                noWrap: true
            }).addTo(map);
  ```


### 矢量图层

&ensp;&ensp;&ensp;&ensp;基于矢量图层加载矢量地图：首先实例化地图容器L.map，其中通过crs设置投影坐标系；然后实例化Zondy.Map.MapVectorLayer对象构建矢量图层，并添加到地图容器中。

- Example
  ```javascript
            //地图容器
            map = L.map('leaf_map', {
                //投影坐标系
                crs: L.CRS.EPSG4326,
                //中心点
                center: [(30.7083224461318 + 30.4575715847217) / 2, (114.125678154779 + 114.475830260539)
                / 2],
                //最大级数
                maxZoom: 15,
                //最小级数
                minZoom: 0,
                //显示级数
                zoom: 11
            });
            //创建矢量图层
            vectorLayer = new Zondy.Map.MapVectorLayer(["gdbp://MapGisLocal/武汉市区/sfcls/行政区", "gdbp://MapGisLocal/武汉市区/sfcls/点编辑"], {
                //投影坐标系
                crs: L.CRS.EPSG4326,
                //IP地址
                ip: `http://develop.smaryun.com`,
                //访问IGServer的端口号，.net版为6163，Java版为8089
                port: 6163,
                //只显示一个图层,不平铺显示
                noWrap: true,
                //添加guid，确保图层从IGS中加载，不读取缓存文件
                guid: (new Date()).getTime().toString()
            }).addTo(map);
  ```


### 瓦片

&ensp;&ensp;&ensp;&ensp;加载瓦片地图：首先实例化地图容器L.map，其中通过crs设置投影坐标系；然后实例化Zondy.Map.MapTileLayer对象构建瓦片地图图层，并添加到地图容器中。

&ensp;&ensp;&ensp;&ensp;**瓦片地图（自定义投影）:**

- Example
  ```javascript
      var map;
      //高斯3带投影
      var crs = new L.Proj.CRS('EPSG:2362',
                '+proj=tmerc +a=6378137 +b=6356752.31414036 +lat_0=0 +lon_0=114 +x_0=38500000+y_0=0 +ellps=GRS80 +units=m +no_defs', {
                    resolutions: [
                        35.07833000659791, 17.539165003298955, 8.769582501649477,
                        4.384791250824739, 2.1923956254123693, 1.0961978127061847
                    ],
                    origin: [38570106.6565339, 4107440.9868805557],
                    bounds: L.bounds([
                        [38570106.6565339, 4100174.3296849937],
                        [38576679.186042026, 4107440.9868805557]
                    ])
                }),

        //地图容器
        map = L.map('map', {
            crs: crs,
            center: [37.09, 114.80], //注意这里要使用经纬度坐标
            zoom: 2,
            continuousWorld: true,
            worldCopyJump: false,
        });
        //创建地图图层
        var mapDocLayer = new Zondy.Map.MapTileLayer("高斯坐标", {
            //IP地址
            ip: `http://develop.smaryun.com`,
            //访问IGServer的端口号，.net版为6163，Java版为8089
            port: 6163,
            //只显示一个图层,不平铺显示
            noWrap: true
        }).addTo(map);
  ```

&ensp;&ensp;&ensp;&ensp;**瓦片地图（自定义比例尺）:**
- Example
  ```javascript
        /**获取瓦片服务的瓦片信息*/
        function getTileInfo() {
            var mapInfo = new Zondy.Catalog.TileLayer({
                ip: `http://develop.smaryun.com`,
                port: 6163,
                tileName: "武汉市区自定义比例尺"
            });
            mapInfo.getTileInfo(getSuccess);
        }
        /**成功获取瓦片信息后加载瓦片地图*/
        function getSuccess(res) {
            if (!res.TileInfo2) {
                alert("未查到瓦片信息...", 3000);
                return;
            }
            console.log(res)
            //地图容器参数
            var mapOpt = {};
            mapOpt.zoom = res.TileInfo2.tileInfo.startLevel;
            mapOpt.minZoom = res.TileInfo2.tileInfo.startLevel;
            mapOpt.maxZoom = res.TileInfo2.tileInfo.endLevel;

            //获取瓦片地图范围，裁剪起始点、分辨率
            var b = {};
            b.xMin = res.TileInfo2.fullExtent.xmin;
            b.yMin = res.TileInfo2.fullExtent.ymin;
            b.xMax = res.TileInfo2.fullExtent.xmax;
            b.yMax = res.TileInfo2.fullExtent.ymax;
            var bounds = L.bounds([[b.xMin, b.yMin], [b.xMax, b.yMax]]);
            var origin = [res.TileInfo2.tileInfo.origin.x, res.TileInfo2.tileInfo.origin.y];
            var resolutions = [];
            var lods = res.TileInfo2.tileInfo.lods;
            for (var i = 0; i < lods.length; i++) {
                var resolution = lods[i].resolution;
                resolutions.push(resolution);
            }

            //获取瓦片地图坐标系椭球参数
            var lon = res.TileInfo2.tileInfo.spatialReference.tileSRefInfo.Lon / 10000;
            var lat = res.TileInfo2.tileInfo.spatialReference.tileSRefInfo.Lat / 10000;
            var A = res.TileInfo2.tileInfo.spatialReference.tileSRefInfo.A;
            var B = res.TileInfo2.tileInfo.spatialReference.tileSRefInfo.B;
            var X = res.TileInfo2.tileInfo.spatialReference.tileSRefInfo.FalseE;
            var Y = res.TileInfo2.tileInfo.spatialReference.tileSRefInfo.FalseN;
            var proj4;
            var projName;
            if (lon !== undefined && lon !== null && A && B) {
                proj4 = "+proj=tmerc +lat_0=" + lat + " +lon_0=" + lon + " +k=1 +x_0=" + X +
                    " +y_0=" + Y + " +a=" + A + " +b=" + B + " +units=m +no_defs";
                projName = 'EPSG:1234';
                mapOpt.crs = new L.Proj.CRS(projName, proj4, {
                    resolutions: resolutions,
                    origin: origin,
                    bounds: bounds
                });
            } else {
                if (b.xMin >= -360 && b.xMax <= 360 && b.yMin >= -360 && b.yMax <= 360) {
                    mapOpt.crs = L.CRS.EPSG4326
                } else {
                    mapOpt.crs = L.CRS.EPSG3857
                }
            }

            //设置中心，范围，将瓦片地图范围坐标转成地图可接受的经纬度坐标
            var northEastPoint = L.point(b.xMax, b.yMax);
            var northEastLatlng = mapOpt.crs.unproject(northEastPoint);
            b.yMax = northEastLatlng.lat;
            b.xMax = northEastLatlng.lng;
            var southWestPoint = L.point(b.xMin, b.yMin);
            var southWestLatlng = mapOpt.crs.unproject(southWestPoint);
            b.yMin = southWestLatlng.lat;
            b.xMin = southWestLatlng.lng;
            mapOpt.center = [(b.yMin + b.yMax) / 2, (b.xMin + b.xMax) / 2];
            console.log(mapOpt)
            //实例化地图容器
            map = L.map('leaf_map', mapOpt);
            //实例化瓦片图层
            new Zondy.Map.MapTileLayer("武汉市区自定义比例尺", {
                //IGServer所在ip地址
                ip: `http://develop.smaryun.com`,
                //IGServer请求端口号
                port: 6163,
                //设置地图不连续显示
                noWrap: true
            }).addTo(map);
          }
  ```

## 矢量瓦片

&ensp;&ensp;&ensp;&ensp;矢量瓦片，是对矢量电子地图按照一定的标准和技术将其保存为多种比例尺的矢量分块数据，在前端显示电子地图时，可直接调用矢量分块进行绘制。矢量瓦片的样式可以改变和定制，矢量切片可以在客户端渲染，可以按照用户赋予的样式渲染。使用MapGIS IGServer配置矢量瓦片的显示样式，配置的样式信息保存为xxx.json文件，上传文件到MapGIS IGServer服务器，客户端通过接口即可访问定制样式的矢量瓦片。

&ensp;&ensp;&ensp;&ensp;**矢量瓦片准备**：先通过MapGIS桌面工具裁剪矢量瓦片，然后在MapGIS Server Manager中发布矢量瓦片，最后根据需求对矢量瓦片进行配图并上传配图样式文件。


&ensp;&ensp;&ensp;&ensp; 1.MapGIS桌面工具裁剪矢量瓦片

&ensp;&ensp;&ensp;&ensp;（1）准备矢量地图文档

<img src="./static/demo/leaflet/source/img/dev/vectortile/document.png" alt="矢量地图文档" style="zoom: 40%;" />

&ensp;&ensp;&ensp;&ensp;（2）矢量瓦片裁剪：设置**输入瓦片索引区要素类**，其他选项使用默认值

<img src="./static/demo/leaflet/source/img/dev/vectortile/index.png" alt="矢量瓦片裁剪设置瓦片索引区要素类" style="zoom: 50%;" />

&ensp;&ensp;&ensp;&ensp;（3）矢量瓦片裁剪：选择一个**空文件夹**用来**存放生成的矢量瓦片文件**，**高级**设置中将**最小显示块级别**修改为0，其他选项使用默认值

<img src="./static/demo/leaflet/source/img/dev/vectortile/generate_file.png" alt="矢量瓦片裁剪生成文件设置" style="zoom: 50%;" />

<img src="./static/demo/leaflet/source/img/dev/vectortile/generate_advance.png" alt="矢量瓦片裁剪的高级设置" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;（4）矢量瓦片裁剪：**附加裁剪项设置**使用默认值

<img src="./static/demo/leaflet/source/img/dev/vectortile/other_set.png" alt="矢量瓦片裁剪附加裁剪项设置" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;（5）矢量瓦片裁剪：瓦片裁剪的过程，瓦片裁剪级别越高需要的生成时间越久

<img src="./static/demo/leaflet/source/img/dev/vectortile/generate_process.png" alt="瓦片裁剪过程" style="zoom: 50%;" />

&ensp;&ensp;&ensp;&ensp;（6）矢量瓦片裁剪：裁剪的结果文件展示

<img src="./static/demo/leaflet/source/img/dev/vectortile/result.png" alt="矢量瓦片裁剪结果展示" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp; 2.矢量瓦片的服务发布与样式管理

&ensp;&ensp;&ensp;&ensp;（1）矢量瓦片服务发布：打开MapGIS Server Manager，找到**矢量瓦片发布**选项

<img src="./static/demo/leaflet/source/img/dev/vectortile/server_manager.png" alt="MapGIS Server Manager" style="zoom: 50%;" />

&ensp;&ensp;&ensp;&ensp;（2）矢量瓦片服务发布：选择矢量瓦片发布的格式为**目录格式**，选中矢量瓦片发布的**数据路径**

<img src="./static/demo/leaflet/source/img/dev/vectortile/publish_format.png" alt="矢量瓦片发布格式" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;（3）矢量瓦片服务发布：点击发布的矢量瓦片的左边的**预览**按钮，进入对应的编辑界面

<img src="./static/demo/leaflet/source/img/dev/vectortile/publish_preview.png" alt="矢量瓦片预览" style="zoom:100%;" />

&ensp;&ensp;&ensp;&ensp;（4）矢量瓦片样式管理：按照个性化需求进行样式配色等操作

<img src="./static/demo/leaflet/source/img/dev/vectortile/style_edit.png" alt="矢量瓦片样式编辑" style="zoom: 33%;" />

&ensp;&ensp;&ensp;&ensp;（5）矢量瓦片样式管理：样式配置完毕后， 点击左上方的**保存**按钮保存对应的样式json文件到当前计算机

<img src="./static/demo/leaflet/source/img/dev/vectortile/style_save.png" alt="矢量瓦片样式JSON文件保存" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;（6）矢量瓦片样式管理：将第5步保存的文件**上传**到对应的服务器上, `该按钮在第3步的最右边有个绿色上传箭`

<img src="./static/demo/leaflet/source/img/dev/vectortile/upload.png" alt="矢量瓦片样式文件上传" style="zoom:100%;" />


&ensp;&ensp;&ensp;&ensp;上传完成的提示如下:

<img src="./static/demo/leaflet/source/img/dev/vectortile/upload_success.png" alt="矢量瓦片样式文件上传成功提示" style="zoom: 50%;" />

&ensp;&ensp;&ensp;&ensp;（7）矢量瓦片样式管理：以上步骤完成后得到矢量瓦片样式URL：`http://localhost:6163/igs/rest/mrms/vtiles/styles/hubei-id.json`，在前端代码中通过该URL即可访问矢量瓦片地图服务。




&ensp;&ensp;&ensp;&ensp;**矢量瓦片加载**:基于Leaflet框架，直接通过`L.mapboxGL().addTo(map)`将矢量瓦片加载到地图容器中显示。例如，加载样式URL为`http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/styles/街道-墨卡托.json`的矢量瓦片。

- Example

  ```javascript
            //初始化地图容器
            map = L.map('leaf_map', {
                //地图渲染在canvas上
                preferCanvas: true,
                //不添加属性说明控件
                attributionControl: false,
                //添加缩放控件
                zoomControl: true,
                //投影坐标系
                crs: L.CRS.EPSG3857,
                //最大级数
                maxZoom: 15,
                //最小级数
                minZoom: 0
            }).setView([(29.0125822276524 + 33.2932017737021) / 2, (108.34341 + 116.150939561213) /
                2
            ], 1);
            var { protocol, ip, port } = window.webclient;
            var token = 'pk.eyJ1IjoicGFybmRlZWRsaXQiLCJhIjoiY2o1MjBtYTRuMDhpaTMzbXhpdjd3YzhjdCJ9.sCoubaHF9-nhGTA-sgz0sA'
            //加载矢量瓦片
            var gl = L.mapboxGL({
                accessToken: token,
                style: `http://develop.smaryun.com:6163/igs/rest/mrms/vtiles/styles/街道-墨卡托.json`
            }).addTo(map);
  ```



## 地图查询

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


### 文档要素查询

&ensp;&ensp;&ensp;&ensp;通过Zondy.Service.QueryDocFeature实例化服务，通过query方法进行查询。

&ensp;&ensp;&ensp;&ensp;**以几何查询为例：**

<a href="http://develop.smaryun.com/#/demo/leaflet/mapgis-igserver/feature/feature-search" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/2001-feature-search.png" alt="矢量地图文档要素查询" style="zoom:80%;" />
</a>

<br/>
<br/>

**Step 1. <font color=red>初始化查询结构对象</font>**：
&ensp;&ensp;&ensp;&ensp;初始化查询结构对象`Zondy.Service.QueryFeatureStruct`，设置查询结构包含几何信息；

* Example

    ```javascript
    //初始化查询结构对象，设置查询结构包含几何信息
    var queryStruct = new Zondy.Service.QueryFeatureStruct()
    //是否包含几何图形信息
    queryStruct.IncludeGeometry = true
    //是否包含属性信息
    queryStruct.IncludeAttribute = true
    //是否包含图形显示参数
    queryStruct.IncludeWebGraphic = false
    ```

**Step 2. <font color=red>初始化查询参数对象</font>**：
&ensp;&ensp;&ensp;&ensp;实例化查询参数对象`Zondy.Service.QueryParameter`，设置用于查询的几何对象`geometry`、查询结构`struct`、查询规则`rule`、查询要素数目`recordNumber`等参数;

* Example

    ```javascript
            //创建一个用于查询的矩形
            var geomObj = new Zondy.Object.Rectangle(112, 30, 113, 31);
            //制定查询规则
            var rule = new Zondy.Service.QueryFeatureRule({
                //是否将要素的可见性计算在内
                EnableDisplayCondition: false,
                //是否完全包含
                MustInside: false,
                //是否仅比较要素的外包矩形
                CompareRectOnly: false,
                //是否相交
                Intersect: true
            });
            //实例化查询参数对象
            var queryParam = new Zondy.Service.QueryParameter({
                //几何对象
                geometry: geomObj,
                //结果格式
                resultFormat: "json",
                //查询结构
                struct: queryStruct,
                //查询规则
                rule: rule
            });
            //设置查询分页号
            queryParam.pageIndex = 0;
            //设置查询要素数目
            queryParam.recordNumber = 20;  
    ```

**Step 3. <font color=red>初始化矢量图层查询服务对象</font>**：

&ensp;&ensp;&ensp;&ensp;实例化矢量图层查询服务对象`Zondy.Service.QueryDocFeature`，并调用`QueryDocFeature`对象的`query`方法，执行查询；

* Example

    ```javascript
            //实例化地图文档查询服务对象
            var queryService = new Zondy.Service.QueryDocFeature(queryParam, "Hubei4326", 1, {
                //IP地址
                ip: "http://develop.smaryun.com",
                //端口号，.net版为6163，Java版为8089
                port: "6163"
            });
            //执行查询操作，querySuccess为成功回调，queryError为失败回调
            queryService.query(querySuccess, queryError);
    ```

**Step 4. <font color=red>在查询成功回调中解析显示查询结果要素</font>**：

&ensp;&ensp;&ensp;&ensp;在查询结果回调函数中解析查询结果result，根据结果要素的需求进行显示，如高亮显示、标注显示，以及要素对应的属性信息显示等。在此查询的是多个区要素，获取这些区要素的几何信息，通过`L.featureGroup`、`L.polygon`类绘制高亮显示。

* Example

    ```javascript
        //绘制的查询要素
        var resFeatures = L.featureGroup();
        /** 查询成功回调函数
         *  @param {json对象} result 获取结果对象
         */
        function querySuccess(result) {
            //获取查询到的结果数组,ploygonArr的个数即为查询到的结果数
            var ploygonArr = result.SFEleArray;
            for (var i = 0; i < ploygonArr.length; i++) {
                //获取要素几何数组
                var Rings = ploygonArr[i].fGeom.RegGeom[0].Rings;
                //针对复合要素，要循环获取每一个几何
                for (var j = 0; j < Rings.length; j++) {
                    //取出构成多边形的数组
                    var dots = Rings[j].Arcs[0].Dots;
                    //查询结果点集
                    var finaldots = [];
                    for (var k = 0; k < dots.length; k++) {
                        //注意，leaflet是用纬经度来表示位置
                        finaldots.push([dots[k].y, dots[k].x]);
                    }
                    //绘制多边形
                    resFeatures.addLayer(L.polygon(finaldots, {color: 'red', weight: 1}));
                    //清空结果点集，以绘制下一个图形对象
                    finaldots = null;
                    finaldots = [];
                }
            }
            //停止进度条
            stopPressBar();
        }

    ```


## 地图编辑

&ensp;&ensp;&ensp;&ensp;WebGIS中的要素编辑功能，打破了传统单机编辑的局限，用户不必每次都登录服务器进行数据的变更维护，可以通过网络更加方便、快捷地完成数据维护，可以说弥补了单机数据管理维护方案的局限。Web矢量要素编辑功能，包括矢量要素添加、更新、删除三种功能操作，可对要素的几何信息和属性信息进行编辑。


| 类型 |  类名/方法名         |     API说明    |
| ------- | -------------- |----------------|
| 文档要素编辑 | Zondy.Service.EditDocFeature / add()、update()、deletes() | 基于地图文档的矢量要素编辑，支持添加、更新、删除操作 |
| 图层要素编辑 | Zondy.Service.EditLayerFeature / add()、update()、deletes() | 基于矢量图层的矢量要素编辑，支持添加、更新、删除操作 |



### 图层要素编辑

&ensp;&ensp;&ensp;&ensp;通过Zondy.Service.EditLayerFeature实例化服务，通过add方法添加要素，通过deletes方法删除要素，通过update方法更新要素。

&ensp;&ensp;&ensp;&ensp;**以点要素编辑为例：**

<a href="http://develop.smaryun.com/#/demo/leaflet/mapgis-igserver/feature/feature-edit" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/3001-feature-edit.png" alt="矢量地图文档要素编辑" style="zoom:80%;" />
</a>

<br/>
<br/>

**Step 1. <font color=red>创建一个点要素</font>**：
&ensp;&ensp;&ensp;&ensp;主要通过`Zondy.Object.Feature`创建要素，通过`Zondy.Object.FeatureSet`创建要素集；

* Example

```javascript
        /** 创建一个新要素*/
        function newFeature(color, fid) {//fid只有在更新要素的时候才会生效
            //创建一个点形状，描述点形状的几何信息
            var gpoint = new Zondy.Object.GPoint(114.30, 30.59);
            //设置当前点要素的几何信息
            var fGeom = new Zondy.Object.FeatureGeometry({PntGeom: [gpoint]});
            //描述点要素的符号参数信息
            var pointInfo = new Zondy.Object.CPointInfo({
                Angle: 0, Color: color, Space: 0, SymHeight: 10, SymID: 98, SymWidth: 10
            });
            //设置当前点要素的图形参数信息
            var webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
                InfoType: 1, PntInfo: pointInfo
            });
            //设置添加点要素的属性信息
            var attValue = ["1", "市政协", "", "", "江岸区", "0", "0"];
            //创建一个要素
            var feature = new Zondy.Object.Feature({
                fGeom: fGeom, GraphicInfo: webGraphicInfo, AttValue: attValue
            });
            //设置要素为点要素
            feature.setFType(1);
            //设置更新要素的FID
            if (fid !== undefined && fid !== null) {
                feature.setFID(fid);
            }
            //创建一个要素数据集
            var featureSet = new Zondy.Object.FeatureSet();
            featureSet.clear();
            //设置属性结构
            var cAttStruct = new Zondy.Object.CAttStruct({
                FldNumber: 7,
                FldName: ["ID", "名称", "地址", "图片", "城区", "LayerID", "mpLayer"],
                FldType: ["long", "string", "string", "string", "string", "long", "long"],
                FldAlias: [null, null, null, null, null, null, null]
            });
            featureSet.AttStruct = cAttStruct;
            //添加要素到要素数据集
            featureSet.addFeature(feature);
            return featureSet
        }
```

**Step 2. <font color=red>添加点要素</font>**：
&ensp;&ensp;&ensp;&ensp;调用图层编辑服务'Zondy.Service.EditLayerFeature'的add()添加点要素；

* Example:

```javascript
        /** 添加点要素*/
        function addFeature() {
            //显示进度条
            startPressBar();
            //实例化一个新的点要素
            var featureSet = newFeature(3, null)
            //创建一个编辑服务类
            var editService = new Zondy.Service.EditLayerFeature("gdbp://MapGisLocal/武汉市区/sfcls/点编辑",
                {ip: `http://develop.smaryun.com`, port: 6163 });
            //执行添加点要素功能,OnSuccess为回调函数
            editService.add(featureSet, addSuccess);
        }
        /** 添加点要素回调函数
         *  @param {json对象} rlt 获取结果对象
         */
        function addSuccess(rlt) {
            //停止进度条
            stopPressBar();
            var result = rlt;
            if (result) {
                alert("添加点要素成功！");
                //刷新图层
                vectorLayer.redraw();
            } else {
                alert("添加点要素失败！");
            }
        }
```

**Step 3. <font color=red>删除点要素</font>**：
&ensp;&ensp;&ensp;&ensp;通过查询获取到要删除要素的FID后进行要素删除，即在查询成功回调函数中获取要素FID，进行删除操作;

* Example

```javascript
        /** 删除新添加的要素*/
        async function deleteFeature() {
            //删除添加的要素前，先查询出添加要素的FID
            await querySuccess();
            //显示进度条
            startPressBar();
            //执行删除要素操作
            var deleteService = new Zondy.Service.EditLayerFeature("gdbp://MapGisLocal/武汉市区/sfcls/点编辑", {
                ip: 'develop.smaryun.com',
                port: 6163
            });
            //删除所选要素，featureIds为要素id，DeleteSuccess为回调函数
            deleteService.deletes(featureIds, deleteSuccess);
        }

        /** 删除点要素回调函数
         *  @param {json对象} rlt 获取结果对象
         */
        function deleteSuccess(rlt) {
            //停止进度条
            stopPressBar();
            var result = rlt;
            if (result) {
                alert("删除点要素成功！");
                //刷新图层
                vectorLayer.redraw();
            } else {
                alert("删除点要素失败！");
            }
        }    
```

**Step 4. <font color=red>更新点要素</font>**：
&ensp;&ensp;&ensp;&ensp;通过查询获取到要更新要素的FID后更新要素，即在查询成功回调函数中获取要素 FID，设置要更新项，再进行更新操作；

* Example

```javascript
        /** 更新新添加的要素*/
        async function updateFeature() {
            //更新添加的要素前，先查询出添加要素的FID
            await querySuccess();
            var fid
            if (featureIds.indexOf(',') > -1) {
                var ids = featureIds.split(',')
                fid = ids[ids.length - 1]
            } else {
                fid = featureIds
            }
            //显示进度条
            startPressBar();
            var featureSet = newFeature(12, fid)
            //创建一个编辑服务类
            var editService = new Zondy.Service.EditLayerFeature("gdbp://MapGisLocal/武汉市区/sfcls/点编辑", {
                ip: `http://develop.smaryun.com`,
                port: 6163
            });
            //更新所选要素，UpdateSuccess为回调函数
            editService.update(featureSet, UpdateSuccess);
        }

        /** 修改点要素回调函数
         *  @param {json对象} rlt 获取结果对象
         */
        function UpdateSuccess(rlt) {
            //停止进度条
            stopPressBar();
            var result = rlt;
            if (result) {
                alert("修改点要素成功！");
                //刷新图层
                vectorLayer.redraw();
            } else {
                alert("修改点要素失败！");
            }
        }
```

## 专题图

&ensp;&ensp;&ensp;&ensp;专题图不再是某些行业的专属应用，早已将以地理空间信息为基础的专题分析方式的优势容纳了进去，利用地理要素属性数据、地理要素几何数据、符号参数等数据充分展示具有空间分布特征的专题信息，效果直观，能更好的辅助决策。随着GIS及相关技术的发展，专题图分析与出图已经成为GIS软件的重要功能，而且专题图类型丰富，比如，统计专题图、密度专题图、等级专题图、四色专题图、分段专题图等等。

| 专题图类型 |  专题图说明          |     专题图用途    |
| ------- | -------------- |----------------|
| 统计专题图 | 提供多种统计类型，如直方图、折线图、饼图等 | 分析统计多个数值变量，即地理要素属性字段 |
| 点密度专题图 | 用点的密集程度来表示与范围或区域面积相关联数据值 |  适用于表示具有数量特征散分布的专题 |
| 分段专题图 | 根据每个要素属性值所在的分段范围赋予相应对的显示风格 |分析统计多个数值变量|
| 等级符号专题图 | 	使用符号的大小来反映专题变量的每条记录 |强调数据中的级别差异|
| 统一配置专题图 | 	采用单一符号信息配置图层中所有图元 |强调数据的分布特征|
| 四色专题图 | 	用四种不同的颜色填充地图的整个区域 |强调数据的地理位置差异|
| 随机专题图 | 	采用随机的不同颜色填充地图的整个区域 |	针对区要素，强调数据的地理位置差异|


## 服务器端专题图

&ensp;&ensp;&ensp;&ensp;基于MapGIS IGServer的专题图服务，实现服务器端专题图功能。主要接口为专题图服务类`Zondy.Service.ThemeOper`的`addThemesInfo`、`updateThemesInfo`、`removeThemesInfo`的方法，实现服务端专题图的添加、更新、删除。其中，通过`Zondy.Object.Theme.ThemesInfo`设置专题图信息数组对象，由下面不同类型专题图的对象类实例化对应类型的专题图，如单值专题图、分段专题图、随机专题图、统一配置专题图、四色专题图、点密度专题图、统计专题图等。


|  类名/方法名         |     API说明    |
| -------------- |----------------|
| Zondy.Object.Theme.CUniqueTheme | 单值专题图 |
| Zondy.Object.Theme.CRangeTheme | 分段专题图 |
| Zondy.Object.Theme.CRandomTheme | 随机专题图 |
| Zondy.Object.Theme.CSimpleTheme | 统一配置专题图 |
| Zondy.Object.Theme.CFourColorTheme | 四色专题图 |
| Zondy.Object.Theme.CDotDensityTheme | 点密度专题图 |
| Zondy.Object.Theme.CChartTheme| 统计专题图，包括状态图、饼状图、点状图、环状图等 |


&ensp;&ensp;&ensp;&ensp;**以分段专题图为例：**


<a href="http://develop.smaryun.com/#/demo/leaflet/mapgis-igserver/theme/range-theme" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/4001-range-theme.png" alt="分段专题图" style="zoom:80%;" />
</a>


**Step 1. <font color=red>添加地图文档图层</font>**:
  &ensp;&ensp;&ensp;&ensp;创建地图文档图层对象,设置其服务的名称、服务器的 IP 和 Port,以及文档的 GUID,在把该图层加载到地图容器中显示 (说明：该 GUID 用于该地图文档服务在客户端生成缓存的文件夹名称，这样在指定 GUID 以后，该文档服务生成的缓存就只有一份，且保存在该文件夹下)；

- Example:

  ```javascript
            //随机生成一个guid
            guid = Math.floor(Math.random() * 10000000).toString();
            //初始化地图容器
            map = L.map('leaf_map', {
                //地图渲染在canvas上
                preferCanvas: true,
                //不添加属性说明控件
                attributionControl: false,
                //添加缩放控件
                zoomControl: true,
                //投影坐标系
                crs: L.CRS.EPSG4326,
                //中心点
                center: [(29.0125822276524 + 33.2932017737021) / 2, (108.34341 + 116.150939561213)
                / 2],
                //最大级数
                maxZoom: 10,
                //最小级数
                minZoom: 0,
                //显示级数
                zoom: 6
            });
            //创建地图文档图层
            mapDocLayer = new Zondy.Map.MapDocLayer("Hubei4326", {
                //IP地址
                ip: `http://develop.smaryun.com`,
                //端口号
                port: 6163,
                //只显示一个图层,不平铺显示
                noWrap: true,
                //文档guid
                guid: guid
            }).addTo(map);
  ```

**Step 2. <font color=red>构建专题图服务类对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建专题图服务对象，指定服务的 IP 和 Port,同时指定缓存的 GUID；

- Example:

  ```javascript
  //初始化专题图服务类
  ThemeOper = new Zondy.Service.ThemeOper(guid);
  //设置ip地址
  ThemeOper.ip =  `http://develop.smaryun.com`;
  //设置端口号
  ThemeOper.port = `6163`;
  ```

**Step 3. <font color=red>创建图层专题图信息数组</font>**:
&ensp;&ensp;&ensp;&ensp;专题图是针对整个地图而言的，每个图层都可设置对应一个专题图信息对象，因此地图的专题图信息是一个数组，其中的每一个索引项通过图层名称(`LayerName`)的指定来对应匹配到地图的某一图层上；

- Example:

  ```javascript
  //专题图信息数组
  var themesInfoArr = [];
  //初始化Zondy.Object.Theme.ThemesInfo，用于设置需添加的专题相关信息
  themesInfoArr[0] = new Zondy.Object.Theme.ThemesInfo();
  //初始化指定图层的专题图信息对象，之后再给该数组赋值
  themesInfoArr[0].LayerName = "湖北省市级区划2";
  ```

**Step 4. <font color=red>实例化图层的分段专题图对象</font>**:
&ensp;&ensp;&ensp;&ensp;每个图层可维护多个不同类型的专题图，比如单值、分段等，本示例以图层的分段专题图为例，实例化一个分段专题图对象`CRangeTheme`，同时初始化该分段专题图信息的一些相关属性：`Visible`(是否可见)、`GeoInfoType`(几何图形信息的类型)、`Expression`(对应参与分段的属性字段名称)等；

- Example:

  ```javascript
    themesInfoArr[0].ThemeArr = [];
    //实例化CMultiClassTheme类
    themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CRangeTheme();
    themesInfoArr[0].ThemeArr[0].Name = "分段专题图";
    //指定为分段专题图
    themesInfoArr[0].ThemeArr[0].IsBaseTheme = false;
    themesInfoArr[0].ThemeArr[0].Visible = true;
    themesInfoArr[0].ThemeArr[0].GeoInfoType = "Reg";
    themesInfoArr[0].ThemeArr[0].Expression = "GDP2016";
  ```

**Step 5. <font color=red>设置分段专题图的未参与分类的分段信息</font>**:
&ensp;&ensp;&ensp;&ensp;对于上述图层"湖北省市级区划 2"，该图层属性字段"GDP2016"的属性值而言，未参与分类的字段值统一归为一类以相同的样式进行渲染显示其要素，根据`GeoInfoType`的值来设置默认的几何图形信息；

- Example:

  ```javascript
  //未分段值的图形信息设置
  themesInfoArr[0].ThemeArr[0].DefaultInfo = new Zondy.Object.Theme.CThemeInfo()
  themesInfoArr[0].ThemeArr[0].DefaultInfo.Caption = '未分类'
  themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo = new Zondy.Object.Theme.CRegInfo()
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
  ```

**Step 6. <font color=red>设置分段专题图每个参与分类的分段信息</font>**:
&ensp;&ensp;&ensp;&ensp;对于分段专题图而言,分段信息`Zondy.Object.Theme.CRangeThemeInfo`是根据图层指定的属性字段的取值范围来确定的，每一个分段信息主要包含:对应的属性字段的值域`StartValue`、`EndValue`以及根据分段专题图指定的`GeoInfoType`相应的几何图形信息(如`RegInfo`),这样图层里一个属性值域所对应的要素就以一种样式进行渲染；

- Example:

  ```javascript
      //分段取值设置
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr = [];
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0] = new Zondy.Object.Theme.CRangeThemeInfo();
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].StartValue = "0";
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].EndValue = "100";
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].RegInfo = new Zondy.Object.Theme.CRegInfo();
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].RegInfo.FillClr = 110;
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1] = new Zondy.Object.Theme.CRangeThemeInfo();
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].StartValue = "100";
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].EndValue = "150";
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].RegInfo = new Zondy.Object.Theme.CRegInfo();
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].RegInfo.FillClr = 26;
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[2] = new Zondy.Object.Theme.CRangeThemeInfo();
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[2].StartValue = "150";
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[2].EndValue = "200";
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[2].RegInfo = new Zondy.Object.Theme.CRegInfo();
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[2].RegInfo.FillClr = 22;
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[3] = new Zondy.Object.Theme.CRangeThemeInfo();
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[3].StartValue = "200";
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[3].EndValue = "400";
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[3].RegInfo = new Zondy.Object.Theme.CRegInfo();
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[3].RegInfo.FillClr = 16;
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[4] = new Zondy.Object.Theme.CRangeThemeInfo();
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[4].StartValue = "400";
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[4].EndValue = "6000";
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[4].RegInfo = new Zondy.Object.Theme.CRegInfo();
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[4].RegInfo.FillClr = 11;
  ```

**Step 7. <font color=red>根据上述的专题图信息实现专题图的添加、更新、删除</font>**:
&ensp;&ensp;&ensp;&ensp;根据专题图的信息数组 themesInfoArr，调用专题图服务类对象 ThemeOper 提供的`addThemesInfo`、`updateThemesInfo`、`removeThemesInfo`的方法实现服务端专题图的添加、更新、删除，同时通过服务成功的回调函数，实现客户端的更新显示专题图的效果；

- Example:

  ```javascript
    //添加专题图（不是在原文档上添加，会重新生成一个专题图缓存文档）
    ThemeOper.addThemesInfo("Hubei4326", "1", themesInfoArr, onUniqueTheme);
    //更新专题图,onUniqueTheme为回调函数
    ThemeOper.updateThemesInfo("Hubei4326", "1/0", themesInfoArr, onUniqueTheme);
    //删除专题图,onUniqueTheme为回调函数
    ThemeOper.removeThemesInfo("Hubei4326", "1/0", onUniqueTheme);
  ```

**Step 8. <font color=red>更新前端的专题图显示效果</font>**:
&ensp;&ensp;&ensp;&ensp;在 Step1 中指定了专题图服务类对象的 guid，该 guid 对应的是地图文档缓存的 guid(指定文档的 guid 是为了防止每次请求都从服务端取图而造成的客户端显示效率低下)，由于专题图的添加、删除、更新是对地图文档进行了修改，因此需要对指定 guid 的缓存重新生成。

- Example:

  ```javascript
        /** 调用专题图服务成功回调
         *  @param {json对象} flg 获取结果对象
         */
        function onUniqueTheme(flg) {
            //停止进度条
            stopPressBar();
            if (flg) {
                //刷新图层前要进行此设置。加载之前的缓存文档,保证专题图能正常显示
                mapDocLayer.options.keepCache = false;
                //刷新图层，实时显示专题图
                mapDocLayer.redraw();
                //设置为读取缓存，以加快显示效率
                mapDocLayer.options.keepCache = true;
            } else {
                return false;
            }
        }
  ```


## 客户端专题图

&ensp;&ensp;&ensp;&ensp;结合MapGIS IGServer的要素查询服务获得图层要素几何与属性信息，在前端提供专题图功能接口，实现客户端专题图功能。支持各种常用专题图，如单值专题图、分段专题图、随机专题图、统一专题图、等级符号专题图、统计专题图等。

|  类名/方法名         |     API说明    |
| -------------- |----------------|
| Zondy.Map.uniqueThemeLayer | 单值专题图 |
| Zondy.Map.rangeThemeLayer | 分段专题图 |
| Zondy.Map.randomThemeLayer | 随机专题图 |
| Zondy.Map.simpleThemeLayer | 统一专题图 |
| Zondy.Map.rankSymbolThemeLayer | 等级符号专题图 |
| Zondy.Map.graphThemeLayer | 统计专题图，包括状态图、饼状图、点状图、环状图等 |



&ensp;&ensp;&ensp;&ensp;**以分段专题图为例：**


<a href="http://develop.smaryun.com/#/demo/leaflet/client-view/clienttheme/range" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/6001-clienttheme-range.png" alt="客户端分段专题图" style="zoom:80%;" />
</a>


**Step 1. <font color=red>添加地图文档图层</font>**:
  &ensp;&ensp;&ensp;&ensp;创建地图文档图层对象,设置其服务的名称、服务器的 IP 和 Port,在把该图层加载到地图容器中显示；

- Example:

  ```javascript
            //地图容器
            map = L.map('leaf_map', {
                //地图渲染在canvas上
                preferCanvas: true,
                //不添加属性说明控件
                attributionControl: false,
                //添加缩放控件
                zoomControl: true,
                //投影坐标系
                crs: L.CRS.EPSG4326,
                //最大级数
                maxZoom: 15,
                //最小级数
                minZoom: 4
            }).setView([(29.0125822276524 + 33.2932017737021) / 2, (108.34341 + 116.150939561213)
                / 2], 6);

            //创建地图文档图层
            mapDocLayer = new Zondy.Map.MapDocLayer("Hubei4326", {
                //IP地址
                ip: `http://develop.smaryun.com`,
                //端口号
                port: 6163,
                //只显示一个图层,不平铺显示
                noWrap: true
            }).addTo(map);
  ```

**Step 2. <font color=red>构建客户端专题图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建客户端专题图对象并设置各项参数，如通过`Zondy.Map.rangeThemeLayer`构建分段专题图对象，然后分别设置分段专题图对象的样式style、highlightStyle，设置参与分段的属性字段名称themeField、分段风格数组styleGroups等；

- Example:

  ```javascript
        /** 添加专题图*/
        function createThemeBtn() {
            startPressBar();
            themeLayer = Zondy.Map.rangeThemeLayer("ThemeLayer", {
                // 开启 hover 高亮效果
                isHoverAble: true,
                opacity: 0.8,
                alwaysMapCRS: true
            }).addTo(map);
            //专题图样式
            themeLayer.style = new Zondy.Map.ThemeStyle({
                shadowBlur: 16,
                shadowColor: "#000000",
                fillColor: "#FFFFFF"
            });

            //专题图hover高亮样式
            themeLayer.highlightStyle = new Zondy.Map.ThemeStyle({
                stroke: true,
                strokeWidth: 4,
                strokeColor: 'blue',
                fillColor: "#00EEEE",
                fillOpacity: 0.8
            });

            // 用于专题图的属性字段名称
            themeLayer.themeField = "GDP2016";
            // 风格数组，设定值对应的样式
            themeLayer.styleGroups = [{
                start: 0,
                end: 100,
                style: {
                    color: '#0000FF'
                }
            }, {
                start: 100,
                end: 150,
                style: {
                    color: '#238E23'
                }
            }, {
                start: 150,
                end: 200,
                style: {
                    color: '#8E236B'
                }
            }, {
                start: 200,
                end: 400,
                style: {
                    color: '#00FF7F'
                }
            }, {
                start: 400,
                end: 1323,
                style: {
                    color: '#2F4F2F'
                }
            }];

            themeLayer.on('mousemove', highLightLayer);
            addThemeFeatures(querySuccess);
        }
  ```


**Step 3. <font color=red>添加客户端专题图数据</font>**:
&ensp;&ensp;&ensp;&ensp;通过查询获取专题图图层的要素数据，然后调用分段专题图对象`Zondy.Map.rangeThemeLayer.addFeatures()`方法添加对应的专题图数据，同时可添加专题图的图例视图等。

- Example:

  ```javascript
       /** 添加专题图要素*/
        function addThemeFeatures(onsuccess) {
            var queryStruct = new Zondy.Service.QueryFeatureStruct();
            //是否包含几何图形信息
            queryStruct.IncludeGeometry = true;
            //是否包含属性信息
            queryStruct.IncludeAttribute = true;
            //是否包含图形显示参数
            queryStruct.IncludeWebGraphic = false;
            //实例化查询参数对象
            var queryParam = new Zondy.Service.QueryParameter({
                resultFormat: "json",
                struct: queryStruct,
                where: '1>0'
            });
            //设置查询分页号
            queryParam.pageIndex = 0;
            //设置查询要素数目
            queryParam.recordNumber = 10000;
            //实例化地图文档查询服务对象
            var queryService = new Zondy.Service.QueryDocFeature(queryParam, docName, 1, {
                ip:`http://develop.smaryun.com` ,
                port: 6163,
                requestType: 'POST'
            });

            //执行查询操作，querySuccess为查询回调函数
            queryService.query(onsuccess, null);
        }

        /** 要素查询成功回调函数*/
        function querySuccess(data) {
            if (data != null) {
                //客户端专题图：添加数据
                themeLayer.addFeatures(data);
                //初始化图例视图
                initLegendView_Range();
                //初始化属性记录视图
                initInfoView_Range();
            }
            stopPressBar();
        }
  ```



## 空间分析


&ensp;&ensp;&ensp;&ensp;GIS与一般电子地图最重要的区别之一，就是提供强大的查询统计、空间分析功能，而这些特性让其在各个领域的应用中发挥着重要作用，为生产生活提供了更多的便利与服务。
&ensp;&ensp;&ensp;&ensp;空间分析，是基于地理对象的位置和形态等空间数据进行分析的技术，其目的在于提取和传输空间信息。空间分析是地理信息系统的主要特征。空间分析能力（特别是对空间隐含信息的提取和传输能力）是地理信息系统区别与一般信息系统的主要方面，也是评价一个地理信息系统成功与否的一个主要指标。随着地理信息技术的发展，空间分析的具体功能逐渐地增加，广泛应用于军事、经济、环境、资源等领域，使地理信息系统拥有不可取代的意义。

&ensp;&ensp;&ensp;&ensp;最常用的空间分析功能，包括拓扑分析、裁剪分析、叠加分析、缓冲区分析。

|  类名/方法名         |     API说明    |
| -------------- |----------------|
| Zondy.Service.FeatureBuffBySingleRing / execute() | 基于要素的单圈缓冲区分析 |
| Zondy.Service.FeatureBuffByMultiplyRing / execute() | 基于要素的多圈缓冲区分析 |
| Zondy.Service.ClassBufferBySingleRing / execute() | 基于简单要素类的单圈缓冲区分析 |
| Zondy.Service.ClassBufferByMultiplyRing / execute() | 基于简单要素类的多圈缓冲区分析 |
| Zondy.Service.ClipByLayer / execute() | 图层裁剪分析 |
| Zondy.Service.ClipByCircle、new Zondy.Service.ClipByPolygon / execute() | 几何图形裁剪分析 |
| Zondy.Service.OverlayByLayer / execute() | 图层叠加分析 |
| Zondy.Service.OverlayByPolygon / execute() | 多边形叠加分析 |

### 缓冲区分析

&ensp;&ensp;&ensp;&ensp;缓冲区分析，指在点、线、区实体周围一定半径范围内建立多边形，并形成新图层的功能。如果缓冲目标是多个，则缓冲分析的结果是各个目标的缓冲区合并，碰撞到一起的多边形将被合并为一个区图元。

&ensp;&ensp;&ensp;&ensp;提供要素缓冲区分析和图层缓冲区分析接口。要素缓冲区分析，对指定要素进行缓冲区分析，并生成结果图层。图层缓冲区分析，基本原理与要素缓冲区分析相同，不同的是，前者指定要素，而后者以图层为单位进行缓冲区分析。

&ensp;&ensp;&ensp;&ensp;**以要素缓冲区分析为例**：实现针对几何要素的多圈的缓冲分析。


<a href="http://develop.smaryun.com/#/demo/leaflet/mapgis-igserver/analysis/buffer-analysis" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/5001-buffer-analysis.png" alt="要素缓冲区分析" style="zoom:80%;" />
</a>


**Step 1. <font color=red>执行要素多圈缓冲分析</font>**:
&ensp;&ensp;&ensp;&ensp;创建要素多圈缓冲服务对象，设置相应的源几何要素包括几何信息、属性结构和属性记录、结果数据的URL及缓冲半径，并执行缓冲分析；
    
* Example:

    ```javascript
            //初始化Zondy.Object.FeatureGeometry对象
            var regGeo = new Zondy.Object.FeatureGeometry();
            //设置区要素的空间几何信息
            var gReg = new Zondy.Object.GRegion([
                new Zondy.Object.AnyLine([new Zondy.Object.Arc([
                    new Zondy.Object.Point2D(0.46, 30.1),
                    new Zondy.Object.Point2D(11.48, 6.22),
                    new Zondy.Object.Point2D(36.73, 7.6),
                    new Zondy.Object.Point2D(58.77, 25.51),
                    new Zondy.Object.Point2D(41.33, 49.39)
                ])])
            ]);
            //设置区要素几何信息的方法
            regGeo.setRegGeom([gReg]);
            //实例化CAttStruct类
            var regAttStr = new Zondy.Object.CAttStruct({
                FldName: ["ID", "面积", "周长", "LayerID"],
                FldNumber: 4,
                FldType: ["FldLong", "FldDouble", "FldDouble", "FldLong"]
            });
            var values = [1, 0.00058032464704422, 0.132101984752282, 8];
            //创建属性信息对象
            var valuesRow = new Zondy.Object.CAttDataRow(values, 3286);
            //实例化FeatureBuffByMultiplyRing类，设置要素缓冲分析必要参数，输出分析结果到缓冲分析结果图层
            var featureBufByMR = new Zondy.Service.FeatureBuffByMultiplyRing({
                ip: `http://develop.smaryun.com`,
                port: 6163,
                //设置多圈缓冲分析的缓冲半径字符串
                radiusStr: "5,10,20"
            });
            featureBufByMR.sfGeometryXML = JSON.stringify([regGeo]);
            featureBufByMR.attStrctXML = JSON.stringify(regAttStr);
            featureBufByMR.attRowsXML = JSON.stringify([valuesRow]);
            featureBufByMR.traceRadius = 0.0001;
            var resultname = "multiBuffAnalysisResultLayer" + getCurentTime();
            featureBufByMR.resultName = resultBaseUrl + resultname;
            //调用Zondy.Service.AnalysisBase基类的execute方法执行要素缓冲分析，AnalysisSuccess为回调函数
            featureBufByMR.execute(AnalysisSuccess, "post", false, "json", AnalysisError);
    ```

**Step 2. <font color=red>添加分析结果到地图中</font>**:
&ensp;&ensp;&ensp;&ensp;利用分析服务执行成功的回调函数中返回的结果数据名称，通过`Zondy.Map.MapVectorLayer`构建MapGIS的矢量服务图层对象，添加到地图容器中进行显示；
    
* Example:

    ```javascript
        /**分析成功回调函数，处理显示结果信息
         *@param(json对象)data获取结果对象
         */
        function AnalysisSuccess(data) {
            //停止进度条
            stopPressBar();
            if (!data.succeed) {
                alert("要素多圈缓冲分析失败，请检查参数！");
            } else {
                if (data.results.length !== 0 && data.results !== null) {
                    var resultLayerUrl = data.results[0].Value;
                    //将结果图层添加到地图视图中显示
                    resultLayer = new Zondy.Map.MapVectorLayer(encodeURIComponent(resultLayerUrl), {
                        //IGServer所在ip地址
                        ip: `http://develop.smaryun.com`,
                        //IGServer请求端口号
                        port: 6163,
                        //设置图层能否重复显示。true代表显示唯一，false代表显示重复。
                        noWrap: true,
                        //缓存名称
                        guid: (new Date()).getTime().toString()
                    }).addTo(map);
                }
            }
        }
    ```


### 裁剪分析

&ensp;&ensp;&ensp;&ensp;裁剪分析，是指对已知图层所包含的内容和地理范围按照一定规则进行分割。当被裁剪图层所包含的要素处于裁剪范围的边界时，裁剪分析功能需要对要素的几何信息、属性信息按照一定的规则做取舍。当裁剪范围包含在被裁剪图层范围内时，需要对裁剪范围内外的要素做取舍。

&ensp;&ensp;&ensp;&ensp;提供几何要素裁剪和区图层裁剪分析功能服务接口ClipByCircle、ClipByPolygon、ClipByLayer。要素裁剪分析，以自定义要素的几何范围作为裁剪范围，调用接口ClipByCircle、ClipByPolygon，设置裁剪规则，并执行裁剪分析，便可得到裁剪分析结果。分析结果可以图层的形式展示到客户端。图层裁剪分析，以指定图层的范围作为裁剪范围，从而实现裁剪分析。二者本质相同。

&ensp;&ensp;&ensp;&ensp;**圆裁剪分析为例**：实现针对几何要素的圆裁剪分析(以几何要素作为裁剪框)。


<a href="http://develop.smaryun.com/#/demo/leaflet/mapgis-igserver/analysis/clip-analysis" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/5002-clip-analysis.png" alt="圆裁剪分析" style="zoom:80%;" />
</a>



**Step 1. <font color=red>实现圆裁剪分析</font>**:
&ensp;&ensp;&ensp;&ensp;通过`Zondy.Service.ClipByCircle`创建圆几何要素裁剪服务对象，设置圆几何对象的圆心与半径、被裁剪数据图层的 URL、结果数据的 URL，并执行裁剪分析；

- Example:

  ```javascript
          var resultname = resultBaseUrl + "clipByCircleAnalysisResultLayer" + getCurentTime();
          //实例化Zondy.Service.ClipByCircle类
          var clipParam = new Zondy.Service.ClipByCircle({
                //IGServer所在ip地址
                ip: `develop.smaryun.com`,
                //IGServer请求端口号
                port: 6163,
                //设置圆心坐标
                center: "88.62, 47.09",
                //设置圆半径长度
                radius: 50,
                //设置被裁剪图层URL
                srcInfo: "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区",
                //设置结果URL
                desInfo: resultname
            });
            //调用基类的execute方法，执行圆裁剪分析。AnalysisSuccess为结果回调函数
            clipParam.execute(AnalysisSuccess, "post", false, "json", AnalysisError);
  ```

**Step 2. <font color=red>添加分析结果到地图中</font>**:
&ensp;&ensp;&ensp;&ensp;利用分析服务执行成功的回调函数中返回的结果数据名称，构建 MapGIS 的服务图层对象，添加到地图容器中进行显示。

- Example:

  ```javascript
        /** 分析成功后的回调*/
        function AnalysisSuccess(data) {
            //停止进度条
            stopPressBar();
            if (!data.succeed || data.results === null) {
                alert("圆裁剪分析失败，请检查参数！");
            } else {
                if (data.results.length !== 0) {
                    //结果图层的地址
                    var resultLayerUrl = data.results[0].Value;
                    //将结果图层添加到地图视图中显示
                    resultLayer = new Zondy.Map.MapVectorLayer(encodeURIComponent(resultBaseUrl + resultLayerUrl), {
                        //IGServer所在ip地址
                        ip: `develop.smaryun.com`,
                        //IGServer请求端口号
                        port: 6163,
                        //设置图层能否重复显示。true代表显示唯一，false代表显示重复。
                        noWrap: true,
                        //缓存名称
                        guid: (new Date()).getTime().toString()
                    }).addTo(map);
                }
            }
        }
  ```


### 叠加分析

&ensp;&ensp;&ensp;&ensp;叠加分析，是将两个图层（至少有一个区图层）按照运算法则进行叠加运算，分析得出所需结果。包括空间数据相交、相减、求并、对称差、判别差等多种叠加分析类型。不同要素类型的图层之间所能进行的叠加方式不是完全相同的，这个可以参考MapGIS帮助手册或相关的资料来判断分析的类型。

&ensp;&ensp;&ensp;&ensp;提供要素叠加分析接口OverlayByLayer和图层叠加分析类OverlayByPolygon。要素叠加分析，是指将自定义要素与指定图层中的要素进行叠加分析，叠加结果生成图层。图层叠加分析，是指两个图层中的要素进行叠加分析，基本原理与要素叠加分析相同，分析结果同样生成图层。

&ensp;&ensp;&ensp;&ensp;**以图层叠加分析为例**：实现图层叠加分析，即以某一个简单要素类矢量图层为叠加对象，另一个简单要素类图层为被叠加对象，执行叠加分析的几何运算。

<a href="http://develop.smaryun.com/#/demo/leaflet/mapgis-igserver/analysis/overlayer-analysis" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/5003-overlayer-analysis.png" alt="图层叠加分析" style="zoom:80%;" />
</a>


**Step 1. <font color=red>执行图层叠加分析</font>**:
&ensp;&ensp;&ensp;&ensp;创建图层叠加分析服务对象，设置某一简单要素类矢量图层做为叠加对象、另一个简单要素类图层为被叠加的数据、结果数据的URL以及叠加分析的类型(本示例以相交运算为例)，并执行裁剪分析；
    
* Example:

    ```javascript
        /** 执行图层叠加分析*/
        function OverlayByLayerAnalysis() {
            clearA();
            //显示进度条
            startPressBar();
            //结果图层的名称
            var resultname = resultBaseUrl + "overLayByLayerAnalysisResultLayer" + getCurentTime();
            //实例化OverlayByLayer类
            var overlayParam = new Zondy.Service.OverlayByLayer({
                //IGServer所在ip地址
                ip: `${ip}`,
                //IGServer请求端口号
                port: `${port}`,
                //设置被叠加图层URL
                srcInfo1: "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流",
                //设置叠加图层URL
                srcInfo2: "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区",
                //设置结果URL
                desInfo: resultname,
                //设置结果图层的图形参数信息
                infoOptType: 2,
                //求交
                overType: 1,
                //允许重算面积
                isReCalculate: true,
                //容差半径
                radius: 0.05
            });
            //调用基类的execute方法，执行叠加分析， onSuccess为结果回调函数
            overlayParam.execute(AnalysisSuccess, "post", false, "json", AnalysisError);
        }
    ```

**Step 2. <font color=red>添加分析结果到地图中</font>**:
&ensp;&ensp;&ensp;&ensp;利用分析服务执行成功的回调函数中返回的结果数据名称，构建MapGIS的服务图层对象，添加到地图容器中进行显示；
    
* Example:

    ```javascript
        /** 分析成功后的回调*/
        function AnalysisSuccess(data) {
            //停止进度条
            stopPressBar();
            if (!data.succeed) {
                alert("图层叠加分析，请检查参数！");
            } else {
                if (data.results.length !== 0) {
                    var resultLayerUrl = data.results[0].Value;
                    //将结果图层添加到地图视图中显示
                    resultLayer = new Zondy.Map.MapVectorLayer(encodeURIComponent(resultBaseUrl + resultLayerUrl), {
                        //IGServer所在ip地址
                        ip: "develop.smaryun.com",
                        //IGServer请求端口号，.net版为6163，Java版为8089
                        port: "6163",
                        //设置图层能否重复显示。true代表显示唯一，false代表显示重复。
                        noWrap: true,
                        //缓存名称
                        guid: (new Date()).getTime().toString()
                    }).addTo(map);
                }
            }
        }
    ```



## 客户端可视化-Echarts

&ensp;&ensp;&ensp;&ensp;基于Leaflet地图框架，接入百度ECharts，支持在二维地图中加载ECharts散点图、热力图、路径图、渐近线、自定义网格专题图等。

> 百度 ECharts：ECharts完整、详细使用方法可参考<a href="http://echarts.baidu.com/api.html#echarts" target="_blank">官方教程API</a>，开发库下载可参考<a href="http://echarts.baidu.com/download.html" target="_blank">官方下载</a>

> 对接Echarts特别说明：MapGIS Client for JavaScript在Leaflet中对接了百度Echarts图表插件，若插件本身存在问题，请优先参考Echarts官网解决方案

&ensp;&ensp;&ensp;&ensp;**以散点图-中国微博签到图为例：实现在三维场景中加载ECharts散点图，基于微博官方的签到数据实现“微博签到点亮中国”地图可视化。**通过关键接口`L.zondy.EchartsLayer`类来实现ECharts图层的加载。


<a href="http://develop.smaryun.com/#/demo/leaflet/client-view/echarts/echartsweibo" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/7002-echartsweibo.png" alt="Echarts散点图-中国微博签到图" style="zoom:80%;" />
</a>


&ensp;&ensp;&ensp;&ensp;具体实现：从json文件中读取数据，并按照格式要求进行处理；然后构建配置项，并创建各种需要的组件，如标题、图例、提示框等，其中最关键的是“series-系列”组件；构造完成后，即可调用`L.zondy.EchartsLayer(map, option).addTo(map)`方法，将ECharts图层添加到地图中。

* Example:

  ```javascript
        function updateView() {
            var grade = [
                "强",
                "中",
                "弱"
            ]
            var layer;
            //读取数据
            $.get('../../static/data/echarts/weibo.json', function (weiboData) {
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

                option = {
                    coordinateSystem: 'leaflet',
                    title: {
                        text: "中国微博签到图",
                        subtext: 'From ThinkGIS',
                        sublink: 'http://www.thinkgis.cn/public/sina',
                        left: 'center',
                        top: 'top',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {},
                    legend: {
                        left: 'left',
                        top: 'bottom',
                        data: [grade[0], grade[1], grade[2]],
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    series: [{
                        name: grade[2],
                        type: 'scatter',
                        coordinateSystem: 'leaflet',
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
                        coordinateSystem: 'leaflet',
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
                        coordinateSystem: 'leaflet',
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
                layer = L.zondy.EchartsLayer(map, option).addTo(map);
            });
        }
  ```

## 客户端可视化-MapV

&ensp;&ensp;&ensp;&ensp;基于Leaflet地图框架，接入MapV，支持在二维地图中加载MapV热力图、等。

> 对接Mapv特别说明：MapGIS Client for JavaScript在Leaflet中对接了MapV插件，若插件本身存在问题，请优先参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>寻找解决方案

&ensp;&ensp;&ensp;&ensp;**以MapV热力图为例**：实现在三维场景中加载MapV热力图，热力图采用特殊高亮的形式显示访客热衷的页面区域和访客所在的地理区域。通过关键接口 `L.zondy.MapvLayer`类来实现MapV图层的加载。

<a href="http://develop.smaryun.com/#/demo/leaflet/client-view/mapv/mapvheater" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/7003-mapvheater.png" alt="MapV热力图" style="zoom:80%;" />
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
&ensp;&ensp;&ensp;&ensp;根据前面的步骤，将 `map` 、 `dataSet` 、 `options` 三个参数传入 `L.zondy.MapvLayer` 中创建对象，创建完成数据在地图加载展示。

* Example:

  ``` javascript
     var mapvLayer = new L.zondy.MapvLayer(map, dataSet, options).addTo(map);
  ```



## 客户端空间分析

&ensp;&ensp;&ensp;&ensp;基于Leaflet地图框架，在二维地图中接入第三方开源空间分析库Turf.js，支持客户端实现缓冲区分析、泰森多边形、TIN三角网、中心点、插值、光滑曲线、求交判断等功能。


> Turf.js： turf是JavaScript编写的模块化地理空间引擎，具体使用请查看<a target="_blank" href="http://turfjs.org/">turf官方教程</a>和<a target="_blank" href="https://github.com/Turfjs/turf">下载</a>

> GeoJSON.js： 地理数据转换成<a target="_blank" href="http://geojson.org/">GeoJSON</a>格式，<a target="_blank"  href="https://github.com/caseycesari/GeoJSON.js">GeoJSON.js官方地址</a>


&ensp;&ensp;&ensp;&ensp;**以缓冲区分析为例**，给定一个缓冲半径进行缓冲区分析，单位支持 `miles 米`，`kilometers 千米`，`degrees 度`。


<a href="http://develop.smaryun.com/#/demo/leaflet/client-analysis/buffer" target="_blank">
 <img src="./static/demo/leaflet/source/img/dev/8001-buffer.png" alt="客户端缓冲区分析" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：先通过 `L.tileLayer`加载二维地图，然后使用 `Turf.js` 空间分析库的 `turf.buffer()` 方法进行缓冲区分析。即准备`点`、`线`、`面`要素数据，根据`缓冲区分析算法`得到缓冲区分析结果。

**Step 1. <font color=red>准备数据</font>**：
&ensp;&ensp;&ensp;&ensp;准备`点`、`线`、`面`要素数据

* Example:

   ```javascript
    var origindata = {
      "type": "FeatureCollection",
      "features": [{
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [114.24270629882811,30.622550184776674]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [114.34810638427734,30.634958017061198],
              [114.2856216430664,30.554869984737515],
              [114.246826171875,30.4954261715298]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [114.33815002441406,30.502230042106245],
                [114.34398651123045,30.485071542395932],
                [114.3728256225586,30.472348632640834],
                [114.38278198242188,30.49010107130931],
                [114.35256958007811,30.50518809826035],
                [114.33815002441406,30.502230042106245]
              ]
            ]
          }
        }
      ]
    };
   ```

**Step 2. <font color=red>执行缓冲区分析</font>**：
&ensp;&ensp;&ensp;&ensp;执行 `缓冲区分析算法`，返回缓冲结果要素数据，将得到的缓冲结果要素数据添加到地图中。

* Example:

   ```javascript
    function loadData() {
      L.geoJson(origindata).addTo(map);
      //执行缓冲区分析
      geojson = turf.buffer(origindata, 1.5, {
        units: 'miles'
      });
      //显示缓冲区分析结果
      L.geoJson(geojson).addTo(map);
    }
   ```



