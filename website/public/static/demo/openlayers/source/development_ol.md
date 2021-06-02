
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

&ensp;&ensp;&ensp;&ensp;新建一个 HTML 文件，在 <head> 标签中引入 MapGIS Client for JavaScript（OpenLayers）的开发库：

- Example:

  ```javascript
  <script src="libs/include-openLayers-local.js"></script>
  ```

<img src="./static/demo/openlayers/source/img/开发库.png" alt="MapGIS Client for JavaScript开发库" style="zoom:80%;" />

#### npm 方式引用


&ensp;&ensp;&ensp;&ensp;使用此方式前请先检查电脑中是否已安装应用程序 <a href="https://nodejs.org/en/">Node.js</a>，若未安装，需要先安装<a href="https://nodejs.org/en/">Node.js</a>环境。

&ensp;&ensp;&ensp;&ensp;通过 npm 命令引入 OpenLayers 地图引擎，建议使用 5.x 版本。

- Example:

  ```javascript
  npm install ol@5.3.0
  ```

&ensp;&ensp;&ensp;&ensp;通过 npm 指令引入 MapGIS Client for JavaScript 开发包。



## 开始开发

&ensp;&ensp;&ensp;&ensp;先根据“开发环境”要求安装配置好MapGIS开发环境（含MapGIS云开发授权），然后获取MapGIS Client for JavaScript（OpenLayers5）SDK进行二次开发。

&ensp;&ensp;&ensp;&ensp;下面使用H5原生JS方式，演示如何在网页中显示一幅MapGIS矢量地图。

### 数据准备

&ensp;&ensp;&ensp;&ensp;本示例使用MapGIS官方云端（develop.smaryun.com）已经发布的名称为“北京市”（或“SampleDoc”）的地图文档进行演示。若您需要显示自己的地图文档，需要先附加待显示地图数据所在的地理数据库，然后通过**MapGIS Server Manager**配置GIS服务环境并发布地图服务。

<center>
  <img src="./static/demo/openlayers/source/img/MapGIS发布服务.png" alt="MapGIS服务发布" style="zoom:80%;" />
  <br>
  <div class="notes">MapGIS Server Manager发布服务</div>
</center>
<br/>

> 基于MapGIS Server Manager发布地图服务的具体操作，请查看**MapGIS IGServer操作手册**（<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag206/page1/doc770" target="_blank">.NET版</a>，<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag212/page1/doc823" target="_blank">九州版</a>）

### 开发入门：创建一幅地图

> 本示例使用的开发集成工具为 Visual Studio Code（简称VSCode），您可以根据开发习惯选择适合自己的开发工具

#### Step 1. 新建Web网站

&ensp;&ensp;&ensp;&ensp;在VSCode或本地磁盘中新建一个文件目录作为Web网站目录，名称为MapDisplay；

<center>
  <img src="./static/demo/openlayers/source/img/01.新建网站目录.png" alt="新建网站目录" style="zoom:80%;" />
  <br>
  <div class="notes">新建网站目录</div>
</center>
<br/>

#### Step 2. 引入JavaScript开发库（离线方式）

&ensp;&ensp;&ensp;&ensp;在新建的Web网站（文件目录）中，拷贝MapGIS Client for JavaScript（OpenLayers5）开发库到网站根目录下，即将SDK包路径MapGIS Client for JavaScript_V10.5.X.X\static\libs的libs拷贝到“MapDisplay”目录下。此libs包含了全部的开发库（js与css文件），可选择只拷贝OpenLayers5的库。

<center>
  <img src="./static/demo/openlayers/source/img/02.引用脚本库资源.png" alt="引入脚本库资源" style="zoom:80%;" />
  <br>
  <div class="notes">引入脚本库资源</div>
</center>
<br/>

#### Step 3. 加载显示地图

(1) 在上述新建的网站中，通过新建文件方式，创建一个名称为“MapDocDisplay”的html网页文件，可通过自定义模板快速创建网页结构内容；

<center>
  <img src="./static/demo/openlayers/source/img/03.新建HTML页面（空）.png" alt="新建HTML页面（空）" style="zoom:80%;" />
  <br>
  <div class="notes">新建HTML页面（空）</div>
</center>
<br/>

<center>
  <img src="./static/demo/openlayers/source/img/03.新建HTML页面（模板）.png" alt="新建HTML页面（模板）" style="zoom:80%;" />
  <br>
  <div class="notes">新建HTML页面（模板）</div>
</center>
<br/>

(2) 设置示例标题，在该页面引入OpenLayers5开发的必要脚本库include-openlayers-local.js，此脚本库会动态引入核心库webclient-openlayers-plugin.min.js与相关第三方库、样式文件等；

<center>
  <img src="./static/demo/openlayers/source/img/04.引用开发库.png" alt="引用开发库" style="zoom:80%;" />
  <br>
  <div class="notes">引用开发库</div>
</center>
<br/>


(3) 创建一个ID为“mapCon”的div层，并设置其样式，用来作为显示矢量地图文档的地图容器;

<center>
  <img src="./static/demo/openlayers/source/img/05.创建div层并设置样式.png" alt="创建div层并设置样式" style="zoom:80%;" />
  <br>
  <div class="notes">创建div层并设置样式</div>
</center>
<br/>

(4) 通过body的onload事件触发调用矢量地图文档显示的脚本函数init()；

<center>
  <img src="./static/demo/openlayers/source/img/06. body的onload事件.png" alt="body的onload事件" style="zoom:80%;" />
  <br>
  <div class="notes">body的onload事件</div>
</center>
<br/>

(5) 在该页面中嵌入JavaScript代码，实现矢量地图文档显示的脚本函数init()，即初始化ol.Map与Zondy.Map.MapDocTileLayer类，通过设置Map对象的设置初始化地图的中心点、显示级别，再通过Map对象的addLayer方法加载矢量地图文档;

> 注意：通常情况下，功能实现的JavaScript代码可以单独放置到一个JS文件中，便于维护

<center>
  <img src="./static/demo/openlayers/source/img/07.矢量地图文档显示的脚本函数init.png" alt="矢量地图文档显示的脚本函数init" style="zoom:80%;" />
  <br>
  <div class="notes">矢量地图文档显示的脚本函数init()</div>
</center>

- Example:

  ```javascript
        //定义地图文档图层和地图
        var mapDocLayer, map;

        /** 初始化地图显示*/
        function init() {
            //初始化地图容器
            map = new ol.Map({
                target: "mapCon",
                view: new ol.View({
                    center:[116.39, 39.90],
                    zoom: 9,
                    projection: "EPSG:4326"
                })
            });
            //初始化地图文档图层对象
              mapDocLayer = new Zondy.Map.MapDocTileLayer("MapGIS IGS MapDocLayer", "北京市", {
                ip: "develop.smaryun.com",
                port: 6163
            });
            //将地图文档图层加载到地图中
            map.addLayer(mapDocLayer);
        }
  ```


#### Step 4. 运行调试

&ensp;&ensp;&ensp;&ensp;VSCode是一个非常流行的Web前端开发IDE，在编写Web网站时一般需要发布后编译运行，也可安装相关插件调试运行。

&ensp;&ensp;&ensp;&ensp;在此，可先将“MapDisplay”站点发布，然后通过浏览器查看与调试。例如：在IIS中发布站点后，右键“浏览”选中的“MapDocDisplay.html”文件，即可在浏览器中查看，并进行前端调试。

<center>
  <img src="./static/demo/openlayers/source/img/08.在IIS中浏览网页.png" alt="在IIS中浏览网页" style="zoom:80%;" />
  <br>
  <div class="notes">在IIS中浏览网页</div>
</center>
<br/>
<center>
  <img src="./static/demo/openlayers/source/img/09.矢量地图文档显示效果图.png" alt="矢量地图文档显示效果图" style="zoom:80%;" />
  <br>
  <div class="notes">矢量地图文档显示效果图</div>
</center>
<br/>
&ensp;&ensp;&ensp;&ensp;需要调试时，可以利用浏览器的开发者工具进行测试，例如IE、Firefox、Chrome等。打开浏览器的开发者工具，在代码行前端设置断点，然后在浏览器中重新运行示例页面，程序将会运行进入到代码断点处，方便查看相关信息。


## 服务发布

&ensp;&ensp;&ensp;&ensp;开发前，基于应用的具体需求，可根据开发中采用的出图方式（地图类型）组织制作二维地图（矢量地图文档或瓦片地图），或者三维地图（三维地图文档，M3D缓存等）。通过GIS服务管理器（MapGIS Server Manager）页面左侧的“地图与数据服务”页面，可以发布和查看所发布的地图服务，可以提供地图数据的预览，查看信息，状态控制，删除等操作。

### 二维地图发布

&ensp;&ensp;&ensp;&ensp;在此以发布地图文档（REST模式）为例，发布单个地图文档的配置操作如下：
在MapGIS Server Manager页面左侧导航栏中的“地图与数据服务”中，单击“发布服务”，在下拉菜单中选择“文档发布（包括WMS/WFS/WMTS）”选项。页面跳转至发布服务配置页面。
 
<center>
  <img src="./static/demo/openlayers/source/img/MapGIS发布服务.png" alt="MapGIS服务发布" style="zoom:80%;" />
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


## 地图控件

&ensp;&ensp;&ensp;&ensp;常用地图控件，包括导航控件、复位控件、鼠标位置控件、比例尺控件、鹰眼控件等。

| 地图控件 |  类名          |     API说明    |
| ------- | -------------- |----------------|
| 导航控件| ol.control.Zoom | 地图缩放功能，默认位于地图左上角 |
| 复位控件| ol.control.ZoomToExtent | 地图复位功能，默认位于地图左上角 |
| 鼠标位置|  ol.control.MousePosition | 显示鼠标位置，默认位于地图左下角 |
| 比例尺| 	ol.control.ScaleLine  | 地图比例尺，默认位于地图左下角 |
| 鹰眼 | 	ol.control.OverviewMap  | 鹰眼，默认位于地图右下角 |

<a href="http://develop.smaryun.com/#/demo/openlayers/Base/MapControl/E01Navigation" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/100-地图控件.png" alt="地图控件" style="zoom:80%;" />
</a>

<font color=red>导航控件</font>

&ensp;&ensp;&ensp;&ensp;添加导航控件到地图容器中，导航条的主要功能是实现地图按级缩放;

- Example:

   ```javascript
      var zoom = new ol.control.Zoom()
      map.addControl(zoom)
   ```

<font color=red>复位控件</font>

  &ensp;&ensp;&ensp;&ensp;添加复位控件到地图容器中;

- Example:

   ```javascript
      var zoomToExtent = new ol.control.ZoomToExtent({
          extent: [813079.7791264898, 5929220.284081122, 848966.9639063801, 5936863.986909639],
      })
      map.addControl(zoomToExtent)
  ```

<font color=red>鼠标位置控件</font>

  &ensp;&ensp;&ensp;&ensp;鼠标位置控件，即显示当前地图容器中鼠标焦点处的空间坐标点的坐标值。显示当前鼠标焦点的坐标，可以更好地辅助用户操作或分析其他应用功能。
  
  &ensp;&ensp;&ensp;&ensp;添加鼠标位置控件到地图容器中;

- Example:

   ```javascript
      var mousePositionControl = new ol.control.MousePosition({
          //坐标格式
          coordinateFormat: ol.coordinate.createStringXY(4),
          //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
          projection: 'EPSG:4326',
          //坐标信息显示样式类名，默认是'ol-mouse-position'
          className: 'custom-mouse-position',
          //显示鼠标位置信息的目标容器
          target: document.getElementById('mouse-position'),
          //未定义坐标的标记
          undefinedHTML: '&nbsp;',
      })
      map.addControl(mousePositionControl)
   ```

<font color=red>比例尺控件</font>

&ensp;&ensp;&ensp;&ensp;地图比例尺，表示图上距离按一定的比例比实际距离缩小（或放大）的程度。一般表示地图图形的缩小程度，即又称缩尺。

&ensp;&ensp;&ensp;&ensp;添加比例尺控件到地图容器中;

- Example:

  ```javascript
      var scaleLineControl = new ol.control.ScaleLine({
          //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
          units: 'metric',
      })
      map.addControl(scaleLineControl)
   ```

<font color=red>鹰眼控件</font>

&ensp;&ensp;&ensp;&ensp;地图鹰眼，俗称地图的鸟瞰图或缩略图。在电子地图中鹰眼的功能非常强大，通过鹰眼可以知道地图的当前位置；也可以在鹰眼上点击、拖动或移动到想要查看的位置。鹰眼的可视范围比主图的可视范围大，鹰眼中心框的可视范围就是主图的可视范围，主图的地理信息要比鹰眼地图详细。鹰眼地图的可视范围广阔，可以看到当前主图周边概况。

&ensp;&ensp;&ensp;&ensp;添加鹰眼控件到地图容器中(示例中鹰眼控件加载了天地图影像图层)。

- Example:

  ```javascript
  TiandiMap_img = new ol.layer.Tile({
    name: '天地图影像图层',
    visible: true, //图层不可见
    source: new ol.source.XYZ({
      url: 'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + tdk,
      wrapX: false,
    }),
  })
  TiandiMap_imgcia = new ol.layer.Tile({
    name: '天地图影像注记图层',
    visible: true, //图层不可见
    source: new ol.source.XYZ({
      url: 'http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=' + tdk,
      wrapX: false,
    }),
  })
  //实例化鹰眼控件（OverviewMap）,自定义样式的鹰眼控件
  var overviewMapControl = new ol.control.OverviewMap({
    //鹰眼控件样式（see in overviewmap-custom.html to see the custom CSS used）
    className: 'ol-overviewmap ol-custom-overviewmap',
    //鹰眼中加载同坐标系下不同数据源的图层
    layers: [TiandiMap_img, TiandiMap_imgcia],
    //鹰眼控件展开时功能按钮上的标识（网页的JS的字符编码）
    collapseLabel: '\u00BB',
    //鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
    label: '\u00AB',
    //初始为展开显示方式
    collapsed: false,
  })
  map.addControl(overviewMapControl)
  ```


## 地图交互

### 地图操作

&ensp;&ensp;&ensp;&ensp;地图基本操作是Web地图应用的基本功能，也是用户与地图的简单交互，主要包括地图放大、缩小、移动、复位和更新等。在具体的地图操作应用中，其交互操作的方式多样化。例如，地图缩放有单击缩放、在地图上拉框缩放、导航条按钮缩放、通过键盘按键控制地图缩放等。

<a href="http://develop.smaryun.com/#/demo/openlayers/Base/MapOperation/E01MapOperation" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/101-地图操作.png" alt="地图操作" style="zoom:80%;" />
</a>

<font color=red>地图放大</font>

&ensp;&ensp;&ensp;&ensp;通过设置地图视图的 Zoom 级别实现地图视图放大功能;

- Example:

  ```javascript
  //获取地图视图
  var view = map.getView()
  //获得当前缩放级数
  var zoom = view.getZoom()
  //地图放大一级
  view.setZoom(zoom + 1)
  ```

<font color=red>地图缩小</font>

  &ensp;&ensp;&ensp;&ensp;通过设置地图视图的 Zoom 级别实现地图视图缩小功能;

- Example:

  ```javascript
  //获取地图视图
  var view = map.getView()
  //获得当前缩放级数
  var zoom = view.getZoom()
  //地图缩小一级
  view.setZoom(zoom - 1 >= 1 ? zoom - 1 : 1)
  ```

 <font color=red>地图跳转</font>

  &ensp;&ensp;&ensp;&ensp;通过设置地图视图的中心点位置和 Zoom 级别实现地图视图跳转;

- Example:

  ```javascript
  //获取地图视图
  var view = map.getView()
  var wh = ol.proj.fromLonLat([114, 30])
  //平移地图
  view.setCenter(wh)
  view.setZoom(7)
  ```

<font color=red>地图复位</font>

  &ensp;&ensp;&ensp;&ensp;通过设置地图视图初始的中心点位置、Zoom 级别和旋转角度实现地图视图复位功能；

- Example:

  ```javascript
  var view = map.getView()
  //初始中心点
  view.setCenter(center)
  //初始旋转角度
  view.setRotation(rotation)
  //初始缩放级数
  view.setZoom(zoom)
  ```

### 地图域信息


<a href="http://develop.smaryun.com/#/demo/openlayers/Base/MapOperation/E02MapInfomation" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/102-地图域信息.png" alt="地图域信息" style="zoom:80%;" />
</a>

<font color=red>获取当前视图分辨率</font>

&ensp;&ensp;&ensp;&ensp;通过 ol.view()类的 getResolution()方法实现显示当前分辨率功能；

* Example:

    ```javascript
    //获取最大分辨率
    var view = map.getView()
    var curResolution = view.getResolution()
    ```

 <font color=red>获取当前地图视窗范围</font>

&ensp;&ensp;&ensp;&ensp;通过 ol.map()类的 getSize()方法实现显示当前地图的视窗范围(单位：像素)；

* Example:

    ```javascript
    //获取视窗范围
    var viewSize = map.getSize()
    var viewStr = viewSize[0] + ',' + viewSize[1]
    ```
 <font color=red>获取当前地图范围</font>

&ensp;&ensp;&ensp;&ensp;通过 ol.view()类的 calculateExtent(opt_size)方法实现显示当前地图范围功能；

* Example:

    ```javascript
    //获取地图范围
    var ex = view.calculateExtent(viewSize)
    var mapstr = Number(ex[0]).toFixed(0) + ',' + Number(ex[1]).toFixed(0) + ',' + Number(ex[2]).toFixed(0) + ',' + Number(ex[3]).toFixed(0)
    ```

### 图层控制

&ensp;&ensp;&ensp;&ensp;图层的显示控制，包括图层的显示隐藏、地图图层的过滤显示，以及某一图层的地图要素的过滤显示。地图容器中加载的图层以列表形式显示，并提供显示控制的功能，便于用户查看与操作。

<a href="http://develop.smaryun.com/#/demo/openlayers/Base/MapOperation/E03LayerGroupControl" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/103-图层透明度.png" alt="图层透明度" style="zoom:44%;margin:0 10px;" />
</a>
<a href="http://develop.smaryun.com/#/demo/openlayers/Base/MapOperation/E09LayerLevelControl" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/104-图层顺序调整.png" alt="图层顺序调整" style="zoom:40%;" />
</a>

<font color=red>设置图层透明度</font>

&ensp;&ensp;&ensp;&ensp;创建图层组控制控件，通过 layer 对象的 setOpacity()方法设置图层透明度;

* Example:

    ```javascript
    layer.setOpacity(parseFloat(this.value))
    ```

<font color=red>设置图层是否可见</font>

&ensp;&ensp;&ensp;&ensp;通过 layer 对象的 setVisible()方法设置图层是否可见；

* Example:

    ```javascript
    layer.setVisible(this.checked)
    ```
<font color=red>调整图层的显示顺序</font>

&ensp;&ensp;&ensp;&ensp;通过 layer.setZIndex()方法修改图层 Z-index 属性，实现图层显示顺序的调整；

- Example:

  ```javascript
  layer.setZIndex(parseInt(this.value) || 0)
  ```



### 地图背景

&ensp;&ensp;&ensp;&ensp;地图背景设置，即设置地图容器的背景，可以用一张背景图片重复填充。当地图缩放到范围较大时，地图周围是填充的背景图片，避免出现空白，同时起到美化作用。

 <font color=red>设置地图背景</font>

&ensp;&ensp;&ensp;&ensp;通过地图容器的 Div，设置其背景样式，从而实现设置地图的背景；

- Example:

  ```javascript
  var div = document.getElementById('mapCon')
  //通过style的填充背景图属性设置背景
  div.style.backgroundImage = 'url(./static/assets/logo/mapgis_black.png)'
  ```

### 地图事件

&ensp;&ensp;&ensp;&ensp;在地图上的一切操作均要采用地图事件机制来实现，即通过鼠标的交互，使用地图相关事件触发，调用功能接口函数实现具体GIS功能。

 <font color=red>监听地图视图鼠标点击事件</font>

&ensp;&ensp;&ensp;&ensp;调用`ol.map.on`实现监听地图视图鼠标点击;

- Example:

  ```javascript
      //鼠标绑定点击事件
      map.on(eventType, eventCallback)
  ```

 <font color=red>注销地图视图鼠标点击事件</font>

  &ensp;&ensp;&ensp;&ensp;调用`ol.map.un`实现注销地图视图鼠标点击；

- Example:

  ```javascript
  //取消上一次鼠标绑定的点击事件
  map.un(preEventType, eventCallback)
  ```

### 逻辑坐标

  &ensp;&ensp;&ensp;&ensp;在WebGIS的二次开发中，涉及地图事件应用时，逻辑坐标与窗口坐标的转换也是一个非常关键的步骤，要明白两者的含义。地图发布到Web上，涉及地理空间位置在网页容器中的表示。逻辑坐标指地理坐标，表示真实的地理空间位置；窗口坐标指网页中地图逻辑坐标对应的屏幕坐标，是根据网页中地图容器布局（大小与位置），将地图逻辑坐标转换得到。

 <font color=red>设置鼠标位置的投影信息</font>

  &ensp;&ensp;&ensp;&ensp;通过 MousePosition 对象的 setProjection()方法实现在鼠标位置控件中显示相应投影的坐标信息；

- Example:

  ```javascript
  if (cordinateSys == 'EPSG:4326') {
    mousePositionControl.setProjection(ol.proj.get('EPSG:4326'))
  } else if (cordinateSys == 'EPSG:3857') {
    mousePositionControl.setProjection(ol.proj.get('EPSG:3857'))
  }
  ```


### 地图导出

&ensp;&ensp;&ensp;&ensp;Web端的地图打印（即地图导出）功能，最简单的就是输出当前视窗范围内的地图，即将当前地图导出为一张图片存储到客户端。不同的浏览器提供了各自的截屏功能，可以基于浏览器的截屏功能或插件实现导出地图图片功能。

 <font color=red>导出图片</font>

&ensp;&ensp;&ensp;&ensp;通过监听 map 的 postcompose 事件，获取图形绘制的 canvas 对象，从而实现导出图片的功能；

- Example:

      ```javascript
      map.once('postcompose', function(event) {
          var canvas = event.context.canvas

          canvas.toBlob(function(blob) {
              saveAs(blob, 'map.png')
          })
      })
      map.renderSync()
      ```

<font color=red>导出 PDF</font>

  &ensp;&ensp;&ensp;&ensp;通过监听 map 的 postcompose 事件，获取图形绘制的 canvas 对象，利用第三方库提供的导出 PDF 功能，从而实现导出 PDF 的功能；

- Example:

  ```javascript
  var dims = {
    a0: [1189, 841],
    a1: [841, 594],
    a2: [594, 420],
    a3: [420, 297],
    a4: [297, 210],
    a5: [210, 148],
  }
  var format = document.getElementById('format').value
  var resolution = document.getElementById('resolution').value
  var dim = dims[format]
  var width = Math.round((dim[0] * resolution) / 25.4)
  var height = Math.round((dim[1] * resolution) / 25.4)
  var size = /** @type {ol.Size} */ (map.getSize())
  var extent = map.getView().calculateExtent(size)

  map.once('postcompose', function(event) {
    var canvas = event.context.canvas
    var data = canvas.toDataURL('image/jpeg')
    var pdf = new jsPDF('landscape', undefined, format)
    pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1])
    pdf.save('map.pdf')
  })

  map.setSize([width, height])
  map.getView().fit(extent, map.getSize())
  map.renderSync()
  ```

### 图层探查

&ensp;&ensp;&ensp;&ensp;当多图层叠加显示时，顶层图层会遮盖下层图层。图层探查，就是为了方便查看位于下层的图层数据，辅助功能操作或分析，是一个非常实用的工具。图层探查的原理，就是在客户端裁剪上层图层，将上层图层挖掉一部分，让下层图层数据可见。

<a href="http://develop.smaryun.com/#/demo/openlayers/Base/MapOperation/E08MapLayerProbe" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/109-图层探查.png" alt="图层探查" style="zoom:80%;" />
</a>

Step 1. <font color=red>获取鼠标实时的视图位置(像素值)</font>:

&ensp;&ensp;&ensp;&ensp;通过地图容器的Div,监听浏览器的事件(mousemove),然后通过 `ol.map`类的 `getEventPixel()`方法实时得到鼠标的像素位置；
    
* Example:

    ```javascript
    // 给地图容器mapCon添加监听事件，实时得到鼠标的像素位置
    var mousePosition = null
    document.getElementById('mapCon').addEventListener('mousemove', function(event) {
        mousePosition = map.getEventPixel(event)
        map.render()
    })
    document.getElementById('mapCon').addEventListener('mouseout', function() {
        mousePosition = null
        map.render()
    })
    ```
Step 2. <font color=red>在瓦片图层绘制之前进行裁剪</font>:

&ensp;&ensp;&ensp;&ensp;通过 ol.layer.Tile()类的 on 方法监听precompose事件，在事件的回调中实现图层裁剪；
    
* Example:

    ```javascript
    TiandiMap_vect.on('precompose', function(event) {
        var ctx = event.context
        var pixelRatio = event.frameState.pixelRatio
        ctx.save()
        ctx.beginPath()
        if (mousePosition) {
            //只显示一个围绕着鼠标的圆圈
            ctx.arc(mousePosition[0] * pixelRatio, mousePosition[1] * pixelRatio, radius * pixelRatio, 0, 2 * Math.PI)
            ctx.lineWidth = 5 * pixelRatio
            ctx.strokeStyle = 'rgba(0,0,0,0.5)'
            ctx.stroke()
        }
        ctx.clip()
    })
    ```
Step 3. <font color=red>实现图层探查</font>:

&ensp;&ensp;&ensp;&ensp;图层渲染完成后,恢复画布的背景，实现图层探查的效果。
    
* Example:

    ```javascript
    TiandiMap_vect.on('postcompose', function(event) {
        var ctx = event.context
        ctx.restore()
    })
    ```


## 图形标绘

&ensp;&ensp;&ensp;&ensp;图形绘制是Web端实现相关GIS功能的基础，尤其是基本几何图形的交互绘制，查询、编辑、分析等功能均涉及到客户端的图形绘制。一般通过绘制图形来获取地图的空间范围，为查询等功能提供条件限制、或提供操作要素的空间属性等。

&ensp;&ensp;&ensp;&ensp;图形绘制的基础就是空间坐标，任何图形都由空间坐标组成的。一般有两种方式绘制图形：一种是空间坐标已知，通常根据已有的空间坐标信息直接添加图形，实现图形的绘制功能；另一种则通过鼠标交互获取空间坐标，这也是图形绘制常用的方法，通常通过鼠标在地图上进行交互式操作，以获取所需的空间范围信息，以此空间坐标绘制图形。第二种基于鼠标交互式操作完成的图形绘制，被称为交互式图形绘制。


### 基本几何图形

&ensp;&ensp;&ensp;&ensp;基本几何图形包括点、线、圆、多边形、正方形、矩形等，通过ol.Feature()方法构建要素，通过vectorSource.addFeatures([feature])方法添加到图层中。

| 图形 |  类名          |     API说明    |
| ------- | -------------- |----------------|
| 点　| ol.geom.Point | 点图形，通过ol.style.Style设置样式 |
| 线　| ol.geom.LineString | 线图形，通过ol.style.Style设置样式 |
| 圆　|  ol.geom.Circle | 圆图形，通过ol.style.Style设置样式 |
| 多边形　| ol.geom.Polygon.fromExtent  | 通过范围创建长方形图形，通过ol.style.Style设置样式 |
| 正方形　| ol.geom.Polygon.fromCircle | 通过圆创建正方形图形，通过ol.style.Style设置样式 |
| 矩形　| ol.geom.Polygon | 矩形图形，通过ol.style.Style设置样式 |


<a href="http://develop.smaryun.com/#/demo/openlayers/Base/GraphicEdit/E01GraphicDraw" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/201-绘制固定几何图形.png" alt="绘制固定几何图形" style="zoom:80%;" />
</a>

<font color=red>添加点</font>

&ensp;&ensp;&ensp;&ensp;创建一个点并添加到绘制层数据源中;

- Example:

  ```javascript
  //创建一个点
  var point = new ol.Feature({
    geometry: new ol.geom.Point([11505912.0, 4011415.0]),
  })
  //设置点1的样式信息
  point.setStyle(
    new ol.style.Style({
      //填充色
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      //边线颜色
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2,
      }),
      //形状
      image: new ol.style.Circle({
        radius: 17,
        fill: new ol.style.Fill({
          color: '#ffcc33',
        }),
      }),
    })
  )
  vectorSource.addFeatures([point])
  ```

<font color=red>添加线</font>

&ensp;&ensp;&ensp;&ensp;创建一个线并添加到绘制层数据源中;

- Example:

  ```javascript
  //创建一个线
  var line = new ol.Feature({
    geometry: new ol.geom.LineString([
      [8208725.0, 3835304.0],
      [16055444.0, 4578883.0],
    ]),
  })

  //设置线的样式
  line.setStyle(
    new ol.style.Style({
      //填充色
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      //边线颜色
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 5,
      }),
      //形状
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33',
        }),
      }),
    })
  )
  vectorSource.addFeatures([line])
  ```

<font color=red>添加圆</font>

&ensp;&ensp;&ensp;&ensp;创建一个圆添加到绘制层数据源中;

- Example:

  ```javascript
  //创建一个圆
  var circle = new ol.Feature({
    geometry: new ol.geom.Circle([9871995.0, 4344069.0], 1000000),
  })

  circle.setStyle(
    new ol.style.Style({
      //填充色
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.5)',
      }),
      //边线颜色
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 6,
      }),
      //形状
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33',
        }),
      }),
    })
  )
  vectorSource.addFeatures([circle])
  ```

<font color=red>添加多边形</font>

&ensp;&ensp;&ensp;&ensp;创建一个多边形添加到绘制层数据源中;

- Example:

  ```javascript
  //根据范围获取多边形
  var rectangle = new ol.Feature({
    geometry: new ol.geom.Polygon.fromExtent([8208725.0, 2035304.0, 12841418.0, 4068487.0]),
  })

  rectangle.setStyle(
    new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(33,33,33,0.5)',
      }),
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 4,
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33',
        }),
      }),
    })
  )
  vectorSource.addFeatures([rectangle])
  ```

<font color=red>添加正方形</font>

&ensp;&ensp;&ensp;&ensp;创建一个正方形添加到绘制层数据源中;

- Example:

  ```javascript
  //根据圆获取多边形
  var square = new ol.Feature({
    geometry: new ol.geom.Polygon.fromCircle(new ol.geom.Circle([9871995.0, 4344069.0], 1000000), 4, 150),
  })

  square.setStyle(
    new ol.style.Style({
      //填充色
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.8)',
      }),
      //边线颜色
      stroke: new ol.style.Stroke({
        color: 'red',
        width: 2,
      }),
      //形状
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33',
        }),
      }),
    })
  )
  vectorSource.addFeatures([square])
  ```

<font color=red>添加矩形</font>

&ensp;&ensp;&ensp;&ensp;创建一个矩形并添加到图层数据源中。

- Example:

  ```javascript
  //创建一个多变形
  var polygon = new ol.Feature({
    geometry: new ol.geom.Polygon([
      [
        [9871995.0, 4344069.0],
        [12689769.0, 5107216.0],
        [13002855.0, 3522218.0],
      ],
    ]),
  })
  //设置区样式信息
  polygon.setStyle(
    new ol.style.Style({
      //填充色
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.5)',
      }),
      //边线颜色
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2,
      }),
      //形状
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33',
        }),
      }),
    })
  )
  vectorSource.addFeatures([polygon])
  ```



### 交互绘制几何图形

&ensp;&ensp;&ensp;&ensp;结合鼠标操作的交互式图形绘制过程相对较为复杂。交互式图形绘制的核心则对鼠标事件的监听。当点击鼠标或者移动鼠标时，则触发相应的事件，在对应事件的回调函数里，可获取所需的参数，如坐标信息，对获取的参数再进行相应的处理即可。在实现动态图形绘制时，主要对鼠标移动事件进行监听，当移动鼠标，通过监听鼠标的移动事件，在移动事件的回调函数中获取鼠标当前的位置（空间坐标），然后根据鼠标坐标前后的变化而动态地绘制出一个临时的图形。

&ensp;&ensp;&ensp;&ensp;针对非常重要的客户端图形绘制，OpenLayers框架提供了一套完善的绘图机制，封装了交互式图形绘制的相关控件，用户可以直接调用，非常简便。同时具备灵活的扩展性，可以支持用户根据个性化的需求扩展。

&ensp;&ensp;&ensp;&ensp;鼠标交互绘制图形的原理：先初始化一个矢量绘图层对象并添加到地图容器，然后加载交互绘制矢量图形控件（在实例化时设置绘制类型：点、线、规则多边形、任意多边形，以及几何图形对应的特征参数），最后通过激活绘图图形控件在地图上绘制相应几何图形。绘制几何图形后，还可以通过编辑控件修改已经绘制的几何图形。其中，在绘制几何图形时，可以根据需求设置不同的图形样式，丰富绘图的功能应用。

&ensp;&ensp;&ensp;&ensp;交互绘制几何图形实现：先通过ol.interaction.Draw()方法构建交互式绘制控件，然后使用map.addInteraction()方法把交互式绘制控件添加到地图中。

<a href="http://develop.smaryun.com/#/demo/openlayers/Base/GraphicEdit/E02InterActionGraphicDraw" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/202-交互绘制图形.png" alt="交互绘制图形" style="zoom:80%;" />
</a>

Step 1. <font color=red>创建矢量图层</font>:
&ensp;&ensp;&ensp;&ensp;实例化一个矢量图层 Vector 作为绘制层;

- Example:

  ```javascript
  //实例化一个矢量图层Vector作为绘制层
  vectorSource = new ol.source.Vector({ wrapX: false })

  commonStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2,
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33',
      }),
    }),
  })
  vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: commonStyle,
  })
  //将绘制层添加到地图容器中
  map.addLayer(vectorLayer)
  ```

Step 2. <font color=red>添加交互绘制控件，实现图形绘制</font>:
&ensp;&ensp;&ensp;&ensp;添加交互式绘制控件,正方形需设置 value 为 circle 并且使用 createRegularPolygon 方法，长方形需要重写 geometryFunction 方法的几何信息。

- Example:

  ```javascript
  //绘制类型
  var value = pType
  if (pType != '') {
    var geometryFunction, maxPoints
    if (pType === 'Square') {
      value = 'Circle'
      //正方形图形（圆）
      geometryFunction = ol.interaction.Draw.createRegularPolygon(4)
    } else if (pType === 'Box') {
      value = 'LineString'
      maxPoints = 2
      geometryFunction = function(coordinates, geometry) {
        if (!geometry) {
          //多边形
          geometry = new ol.geom.Polygon(null)
        }
        var start = coordinates[0]
        var end = coordinates[1]
        geometry.setCoordinates([[start, [start[0], end[1]], end, [end[0], start[1]], start]])
        return geometry
      }
    } else if (pType === 'ArrowLine') {
      value = 'LineString'
      geometryFunction = null
    }

    //实例化交互绘制类对象并添加到地图容器中
    drawTool = new ol.interaction.Draw({
      //绘制层数据源
      source: vectorSource,
      /** @type {ol.geom.GeometryType}几何图形类型 */
      type: value,
      //几何信息变更时调用函数
      geometryFunction: geometryFunction,
      //最大点数
      maxPoints: maxPoints,
    })
    map.addInteraction(drawTool)
  }
  ```


### 地图标注

&ensp;&ensp;&ensp;&ensp;地图标注是将空间位置信息点与地图关联，通过图标、窗口等形式把点相关的信息展现到地图上。地图标注也是WebGIS中的比较重要的功能之一，在大众应用中较为常见。基于地图标注，丰富GIS应用，可以为用户提供更多个性化的地图服务，如标注兴趣点等。

&ensp;&ensp;&ensp;&ensp;地图标注的应用比较灵活，提供用户交互式标注功能，以及在程序中预先加载标注等多种方式。用户交互式标注，指在地图上知道大概位置，用户通过鼠标交互添加标注。如果已知要标注点的位置信息与其他属性，就可以直接在程序中处理并添加，在地图上叠加显示标注点。地图标注的表现形式多样，包括简单的图片标注、冒泡信息窗口标注、聚合标注等。

&ensp;&ensp;&ensp;&ensp;标注的实现原理：获取标注点的空间位置（X、Y逻辑坐标），在该位置上叠加显示图标（或包含信息的小图片），必要时以窗口形式显示详细的信息。其中，在获取标注点X、Y值时要注意，通过鼠标在地图上单击获取，得到的是窗口坐标，一般需将窗口坐标转为逻辑坐标后使用。OpenLayers提供了实现标注功能的各类控件与方法，对于文字、图片、图文标注都是通过ol.Feature()方法构建要素，对于 PopUp 标注则是通过ol.Overlay()方法构建 overlay 弹窗实现，聚合标注则通过ol.source.Cluster()方法创建聚合标注数据源。


| 标注类型 |  类名          |     API说明    |
| ------- | -------------- |----------------|
| 文本/图片/图文| ol.Feature() | 添加文本、图片、图文标注到地图 |
| PopUp 标注| ol.Overlay() |  PopUp 标注，构建 overlay 弹窗实现 |
| 聚合标注| ol.source.Cluster() | 创建聚合标注数据源 |

<a href="http://develop.smaryun.com/#/demo/openlayers/Base/MapMark/E01InterActionMapMark" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/301-地图标注.png" alt="地图标注" style="zoom:80%;" />
</a>


#### 图片标注

  &ensp;&ensp;&ensp;&ensp; 构建点几何要素，设置其样式为图片标注，并将该点加入到矢量图层中;

Step 1. 创建图片标注要素

- Example:

  ```javascript
      //新建一个要素 ol.Feature
      var newFeature = new ol.Feature({
          //几何信息
          geometry: new ol.geom.Point(coordinate),
      })
  ```

Step 2. 设置图片标注要素样式

- Example:

  ```javascript
  function createImageStyle(feature) {
    return new ol.style.Style({
      /**{olx.style.IconOptions}类型*/
      image: new ol.style.Icon({
        anchor: [0.5, 60],
        anchorOrigin: 'top-right',
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        offsetOrigin: 'top-right',
        // offset:[0,10],
        //图标缩放比例
        // scale:0.5,
        //透明度
        opacity: 0.75,
        //图标的url
        src: './static/assets/olimages/label/blueIcon.png',
      }),
    })
  }
  //设置要素的样式
  newFeature.setStyle(createImageStyle(newFeature))
  ```

Step 3. 将图片标注添加到图层数据源中

- Example:

  ```javascript
      //将新要素添加到数据源中
      vectorSource.addFeature(newFeature)
  ```


#### 文本标注

  &ensp;&ensp;&ensp;&ensp; 构建点几何要素，设置其样式为文本标注，并将该点加入到矢量图层中;

Step 1.  创建文字标注要素

- Example:

  ```javascript
  //新建一个要素 ol.Feature
  var newFeature = new ol.Feature({
    //几何信息
    geometry: new ol.geom.Point(coordinate),
    //名称属性
    name: '标注点',
  })
  ```

Step 2. 设置文字标注样式

- Example:

  ```javascript
  function createTxtStyle(feature) {
    return new ol.style.Style({
      text: new ol.style.Text({
        //位置
        textAlign: 'center',
        //基准线
        textBaseline: 'middle',
        //文字样式
        font: 'normal 14px 微软雅黑',
        //文本内容
        text: feature.get('name'),
        //文本填充样式（即文字颜色）
        fill: new ol.style.Fill({ color: '#aa3300' }),
        stroke: new ol.style.Stroke({ color: '#ffcc33', width: 2 }),
      }),
    })
  }
  //设置要素的样式
  newFeature.setStyle(createTxtStyle(newFeature))
  ```

Step 3. 将文字标注添加到图层数据源中

- Example:

  ```javascript
    vectorSource.addFeature(newFeature)
  ```


#### 图文标注

&ensp;&ensp;&ensp;&ensp; 构建点几何要素，设置其样式为图文标注，并将该点加入到矢量图层中;

Step 1. 创建图文标注要素

- Example:

  ```javascript
      //新建一个要素 ol.Feature
      var newFeature = new ol.Feature({
          //几何信息
          geometry: new ol.geom.Point(coordinate),
          //名称属性
          name: '标注点',
      })
  ```

Step 2. 设置图文标注样式

- Example:

   ```javascript
      function createImgTxtLabelStyle(feature) {
          return new ol.style.Style({
              image: new ol.style.Icon(
                  /** @type {olx.style.IconOptions} */
                  ({
                      anchor: [0.5, 60],
                      anchorOrigin: 'top-right',
                      anchorXUnits: 'fraction',
                      anchorYUnits: 'pixels',
                      offsetOrigin: 'top-right',
                      // offset:[0,10],
                      //图标缩放比例
                      // scale:0.5,
                      //透明度
                      opacity: 0.75,
                      //图标的url
                      src: './static/assets/olimages/label/blueIcon.png',
                  })
              ),
              text: new ol.style.Text({
                  //位置
                  textAlign: 'center',
                  //基准线
                  textBaseline: 'middle',
                  //文字样式
                  font: 'normal 14px 微软雅黑',
                  //文本内容
                  text: feature.get('name'),
                  //文本填充样式（即文字颜色）
                  fill: new ol.style.Fill({ color: '#aa3300' }),
                  stroke: new ol.style.Stroke({ color: '#ffcc33', width: 2 }),
              }),
          })
      }
      //设置要素的样式
      newFeature.setStyle(createImgTxtLabelStyle(newFeature))
  ```

Step 3.  添加图文标注到图层数据源中

- Example:

   ```javascript
      //将新要素添加到数据源中
      vectorSource.addFeature(newFeature)
   ```

####  PopUP标注

&ensp;&ensp;&ensp;&ensp; 添加 OverLayer，监听地图点击事件，弹出相关要素信息的 PopUP;

Step 1. 获取要转化为 Overlay 的 HTML 元素

- Example:

  ```javascript
  container = document.getElementById('popup')
  content = document.getElementById('popup-content')
  closer = document.getElementById('popup-closer')
  ```

Step 2. 添加关闭按钮的单击事件（隐藏 popup）

- Example:

  ```javascript
  /**
   * 添加关闭按钮的单击事件（隐藏popup）
   * @return {boolean} Don't follow the href.
   */
  closer.onclick = function() {
    //未定义popup位置
    popup.setPosition(undefined)
    //失去焦点
    closer.blur()
    return false
  }
  ```

Step 3. 创建 Overlay

- Example:

  ```javascript
  if (popup == null) {
    popup = new ol.Overlay(
      /** @type {olx.OverlayOptions} */
      ({
        //要转换成overlay的HTML元素
        element: container,
        //当前窗口可见
        autoPan: true,
        //Popup放置的位置
        positioning: 'bottom-center',
        //是否应该停止事件传播到地图窗口
        stopEvent: false,
        autoPanAnimation: {
          //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
          duration: 250,
        },
      })
    )
  }
  map.addOverlay(popup)
  ```

Step 4. 设置 popup 弹窗内容

- Example:

  ```javascript
  //示例标注点北京市的信息对象
  var featuerInfo = {
    geo: [116.28, 39.54],
    att: {
      //标注信息的标题内容
      title: '北京市(中华人民共和国首都)',
      //标注详细信息链接
      titleURL: 'http://www.openlayers.org/',
      //标注内容简介
      text: '北京（Beijing），简称京，中华人民共和国首都、直辖市，中国的政治、文化和国际交往中心……',
      //标注的图片
      imgURL: './static/assets/olimages/label/bj.png',
    },
  }

  /**
   * 动态创建popup的具体内容
   * @param {string} title
   */
  function addFeatrueInfo(info) {
    //新增a元素
    var elementA = document.createElement('a')
    elementA.className = 'markerInfo'
    elementA.href = info.att.titleURL
    //elementA.innerText = info.att.title;
    setInnerText(elementA, info.att.title)
    // 新建的div元素添加a子节点
    content.appendChild(elementA)
    //新增div元素
    var elementDiv = document.createElement('div')
    elementDiv.className = 'markerText'
    //elementDiv.innerText = info.att.text;
    setInnerText(elementDiv, info.att.text)
    // 为content添加div子节点
    content.appendChild(elementDiv)
    //新增img元素
    var elementImg = document.createElement('img')
    elementImg.className = 'markerImg'
    elementImg.src = info.att.imgURL
    // 为content添加img子节点
    content.appendChild(elementImg)
  }
  /**
   * 动态设置元素文本内容（兼容）
   */
  function setInnerText(element, text) {
    if (typeof element.textContent == 'string') {
      element.textContent = text
    } else {
      element.innerText = text
    }
  }
  ```

Step 5. 为 map 添加点击事件监听，渲染弹出 popup

- Example:

   ```javascript
      map.on('click', onAppendPopupCallback)
      function onAppendPopupCallback(evt) {
          //判断当前单击处是否有要素，捕获到要素时弹出popup
          var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
              return feature
          })
          if (feature) {
              //清空popup的内容容器
              content.innerHTML = ''
              //在popup中加载当前要素的具体信息
              addFeatrueInfo(featuerInfo)
              popup.setPosition(feature.getGeometry().getCoordinates())
          }
      }
  ```

####  聚合标注

&ensp;&ensp;&ensp;&ensp; 通过构建矢量图层，关联聚合数据源，实现聚合标注效果。

Step 1.  创建要素数组

- Example:

  ```javascript
  //此示例创建10000个要素
  var count = 10000
  var features = new Array(count)
  for (var i = 0; i < count; ++i) {
    var coordinates = [Math.random() * 360 - 180, Math.random() * 180 - 90]
    features[i] = new ol.Feature(new ol.geom.Point(coordinates))
  }
  vectorSource.addFeatures(features)
  ```

Step 2. 创建聚合标注数据源

- Example:

  ```javascript
      //聚合标注数据源
      var clusterSource = new ol.source.Cluster({
          distance: 30,
          source: vectorSource,
          wrapX: false,
      })
  ```

Step 3. 加载聚合标注数据图层

- Example:

  ```javascript
  //加载聚合标注的矢量图层
  var styleCache = {}
  var clusters = new ol.layer.Vector({
    source: clusterSource,
    style: function(feature, resolution) {
      var size = feature.get('features').length
      var style = styleCache[size]
      if (!style) {
        style = [
          new ol.style.Style({
            image: new ol.style.Circle({
              radius: 10,
              stroke: new ol.style.Stroke({
                color: '#fff',
              }),
              fill: new ol.style.Fill({
                color: '#3399CC',
              }),
            }),
            text: new ol.style.Text({
              text: size.toString(),
              fill: new ol.style.Fill({
                color: '#fff',
              }),
            }),
          }),
        ]
        styleCache[size] = style
      }
      return style
    },
  })
  map.addLayer(clusters)
  ```


## 第三方地图

&ensp;&ensp;&ensp;&ensp;第三方地图，主要指的就是互联网上涌现的大量地图服务资源，提供免费开放的基础地图服务，一般均为瓦片地图形式，常在应用中作为底图直接调用。网络上主流的公共地图服务包括OpenStreetMap、Bing地图、百度地图、高德地图、天地图地图等。这些免费的在线地图服务资源，吸引了众多用户，不仅方便了广大开发者使用在线地图开发丰富的地图应用，扩宽互联网地图应用范围，挖掘GIS的潜在价值；同时也让更多人了解电子地图、了解互联网GIS，享受互联网GIS带来的便利和乐趣。

&ensp;&ensp;&ensp;&ensp; 支持第三方公共互联网地图，如百度地图、天地图、Bing地图、OSM地图，以及ArcGIS地图等。

| 地图类型 |  类名          |     API说明    |
| ------- | -------------- |----------------|
| 百度地图 | Zondy.Map.BaiDuLayer | 百度地图，类型包括矢量、影像 |
| 天地图 | Zondy.Map.TianDiTu |  天地图，类型包括矢量、影像 ，访问需要token|
| Bing地图 | ol.source.BingMap | Bing地图，访问需要key|
| OSM地图 | ol.source.OSM | OpenStreetMap地图 |

### 百度地图

- Example:

  ```javascript
  //初始化百度地图图层
  var baiduMapLayer = new Zondy.Map.BaiDuLayer()
  //初始化地图容器
  var map = new ol.Map({
    layers: [baiduMapLayer],
    target: 'mapCon',
    view: new ol.View({
      center: center,
      maxZoom: maxZoom,
      minZoom: 3,
      zoom: 4,
    }),
  })
  ```

<a href="http://develop.smaryun.com/#/demo/openlayers/ThirdMap/E01Baidu" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/401-百度地图.png" alt="百度地图" style="zoom:80%;" />
</a>


### 天地图

- Example:

  ```javascript
  tiandituLayer = new Zondy.Map.TianDiTu({
    //图层类型
    layerType: 'vec',
    //最小显示等级
    minZoom: 0,
    //最大显示等级
    maxZoom: 15,
    //key
    token: '4c27d6e0e8a90715b23a989d42272fd8',
    //设置地图不连续显示
    noWrap: true,
  })
   map.addLayer(tiandituLayer)
  ```

<a href="http://develop.smaryun.com/#/demo/openlayers/ThirdMap/E02Tianditu" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/402-天地图.png" alt="天地图" style="zoom:80%;" />
</a>

### Bing地图

- Example:

  ```javascript
  //实例化Map对象加载地图
  var key = 'Q57tupj2UBsQNQdju4xL~xBceblfTd6icjljunbuaCw~AhwA-whmGMsfIpVhslZyknWhFYq-GvWJZqBnqV8Zq1uRlI5YM_qr7_hxvdgnU7nH'
  var roads = new ol.layer.Tile({
    source: new ol.source.BingMaps({
      key: key,
      imagerySet: 'Road',
    }),
  })

  var map = new ol.Map({
    layers: [roads],
    target: 'mapCon',
    view: new ol.View({
      center: ol.proj.fromLonLat([104, 30]),
      zoom: 4,
    }),
  })
  ```

<a href="http://develop.smaryun.com/#/demo/openlayers/ThirdMap/E04Bings" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/403-Bing地图.png" alt="Bing地图" style="zoom:80%;" />
</a>

### OSM地图

- Example:

  ```javascript
  //实例化Map对象加载地图
  var map = new ol.Map({
    //地图容器div的ID
    target: 'map',
    //地图容器中加载的图层
    layers: [
      //加载瓦片图层数据（OSM）
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    //地图视图设置
    view: new ol.View({
      //地图初始中心点
      center: [11550000, 3860000],
      //地图初始显示级别
      zoom: 4,
      //最小级别
      minZoom: 3,
      //最大级别
      maxZoom: 12,
    }),
  })
  ```

<a href="http://develop.smaryun.com/#/demo/openlayers/ThirdMap/E05OSM" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/404-OSM地图.png" alt="OSM地图" style="zoom:80%;" />
</a>


### ArcGIS地图

- Example:

  ```javascript
            //地图范围
            var extent = [-180, -90, 180, 90];
            //中心点
            var center = [104, 30];
            //瓦片大小
            var tileSize = 256;
            //最大级数
            var maxZoom = 16;
            //初始化图层对象
            var layer1 = new Zondy.Map.ArcGISLayer({
                layerType: Zondy.Enum.Map.ArcGISLayerType.StreetMapWorld2D
            });

            map = new ol.Map({
                //添加图层
                layers: [layer1],
                //目标DIV
                target: 'mapCon',
                view: new ol.View({
                    center: center,
                    //投影坐标系
                    projection: new ol.proj.Projection({
                        units: ol.proj.Units.DEGREES,
                        extent: extent
                    }),
                    maxZoom: maxZoom,
                    minZoom: 0,
                    zoom: 3
                })
            });
  ```

## OGC服务

&ensp;&ensp;&ensp;&ensp; OGC（OpenGIS Consortium OpenGIS协会）是一个公益的行业协会，成立于1994年，致力于促进采用新的技术和商业方式来提高地理信息处理的互操作性(Interoperability)。OGC为实现地理信息共享与互操作，定义了一系列Web地理信息服务的抽象接口与实现规范，包括WMS、WFS、WMTS、WCS等.

| 服务类型 |  类名          |     API说明    |
| ------- | -------------- |----------------|
| WMS | ol.source.ImageWMS | WMS服务，即地图服务，WMS的GetMap接口返回指定范围内的地图图片 |
| WMTS | ol.source.WMTS |  WMTS服务，即瓦片地图服务，WMTS的GetTile接口返回的就是单张瓦片|
| WFS | ol.source.Vector/ol.layer.Vector | WFS服务，即要素服务，WFS的GetFeature接口返回GML等格式的矢量数据|

&ensp;&ensp;&ensp;&ensp; MapGIS IGServer全面支持OGC服务的发布与应用，包括WMS、WFS、WMTS、WCS等服务。其中，常用的WMS、WFS、WMTS中对应的MapGIS格式的数据类型为：
- WMS：MapIGS格式的地图文档、矢量图层；
- WFS：MapIGS格式的地图文档、矢量图层；
- WMTS：MapIGS格式的瓦片图层、实时瓦片图层、分布式瓦片图层。

> 要在客户端调用OGC服务，需要先在IGServer服务管理器中发布OGC服务，具体操作请查看**MapGIS IGServer操作手册**（<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag206/page1/doc770" target="_blank">.NET版</a>，<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag212/page1/doc823" target="_blank">九州版</a>）

### WMS 

&ensp;&ensp;&ensp;&ensp;Web Map Service（网络地图服务），简称 WMS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定。该规范定义了 Web 客户端从网络地图服务器获取地图的接口标准。一个 WMS 可以动态地生成具有地理参考数据的地图，这些地图通常用 GIF、JPEG 或 PNG 等图像格式，或者 SVG、KML、VML 和 WebCGM 等矢量图形格式来表现。使用者通过指定的参数获取相应的地图图片。

- Example:

  ```javascript
      //实例化WMS图层对象（ol.layer.Image，ol.source.ImageWMS）
      wmsLayer = new ol.layer.Image({
        source: new ol.source.ImageWMS({
          //WMS服务基地址
          url: `http://develop.smaryun.com:6163/igs/rest/ogc/doc/WorldJWVector/WMSServer`,
          //图层等参数
          params: {
            LAYERS: '世界政区',
            TILED: true,
          },
          //服务类型
          serverType: 'geoserver',
        }),
      })
      //添加WMS地图图层
      map.addLayer(wmsLayer)
  ```

<a href="http://develop.smaryun.com/#/demo/openlayers/OGC/E01WMS_MapGISM" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/405-WMS地图服务.png" alt="WMS地图服务" style="zoom:80%;" />
</a>

### WMTS 

&ensp;&ensp;&ensp;&ensp;Web Map Tile Service（网络地图瓦片服务），简称 WMTS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定，是和 WMS 并列的重要 OGC 规范之一。WMTS 不同于 WMS,它最重要的特征是采用缓存技术能够缓解 WebGIS 服务器端数据处理的压力，提高交互响应速度，大幅改善在线地图应用客户端的用户体验。WMTS 是 OGC 主推的缓存技术规范，是目前各种缓存技术相互兼容的一种方法。

- Example:

  ```javascript
            /*======创建WMTS图层对象并加载到地图中======*/
            var projection = ol.proj.get('EPSG:4326');
            //var projectionExtent = projection.getExtent();
            var projectionExtent = [114.125602229914, 30.4539323507469, 114.500788705197, 30.8291188260302];
            var size = ol.extent.getWidth(projectionExtent) / 256;
            var resolutions = new Array(14);
            var matrixIds = new Array(14);
            for (var z = 0; z < 14; ++z) {
                //为这个WMTS图层生存分辨率和matrixIds数组
                resolutions[z] = size / Math.pow(2, z);
                matrixIds[z] = z;
            }
            //WMTS服务访问基地址
            baseUrlTile = `http://develop.smaryun.com:6163/igs/rest/ogc/WMTSServer`;
            //初始化WMTS图层对象
            wmtsLayer = new ol.layer.Tile({
                opacity: 1,
                source: new ol.source.WMTS({
                    //WMTS服务基地址
                    url: baseUrlTile,
                    //WMTS服务图层
                    layer: "WhMapTileWMTS",
                    //瓦片模型呈现标识，设置为投影坐标系
                    matrixSet: 'EPSG:4326',
                    //样式
                    style: 'default',
                    //瓦片图片格式
                    format: 'image/png',
                    tileGrid: new ol.tilegrid.WMTS({
                        //原点（左上角）
                        origin: ol.extent.getTopLeft(projectionExtent),
                        //分辨率数组
                        resolutions: resolutions,
                        //矩阵标识列表，与地图级数保持一致
                        matrixIds: matrixIds
                    }),
                    //数据的投影坐标系
                    projection: projection,
                    wrapX: true
                })
            });
            map.addLayer(wmtsLayer);
  ```

<a href="http://develop.smaryun.com/#/demo/openlayers/OGC/E03WMTS_MapGIS" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/406-WMTS地图服务.png" alt="WMTS地图服务" style="zoom:80%;" />
</a>


## 地图服务

&ensp;&ensp;&ensp;&ensp;MapGIS按照“地理数据库－数据集－类”这几个层次组织空间数据，以满足不同应用领域对不同专题数据的组织和管理需要。地理数据库是面向实体空间数据模型的全局视图，统一管理矢量数据和栅格数据，能够完整地、一致地表达被描述区域的地理模型。

&ensp;&ensp;&ensp;&ensp;MapGIS地理数据库主要包括两种存储方式，一种是以MapGIS本地HDF、HDB文件形式存储数据，也称本地数据源；另一种，对接第三方各种类型的数据库，如以关系数据库（SQL Server、Oracle、DB2等）形式存储数据，也称网络数据源。**针对本地数据源，推荐使用MapGIS 10.5自定义的HDB地理数据库。**

&ensp;&ensp;&ensp;&ensp;在Web上的数据加载，分为矢量数据、瓦片数据、矢量瓦片等数据类型：

- **矢量数据**，以图层的方式直接加载，或者将图层组织成一个地图文档（*.mapx），以地图文档方式加载矢量地图。地图文档只是地图视图，是相应地理数据库中的索引，其源数据存储在地理数据库。不管是图层还是地图文档，Web上发布都是实时生成地图，地图上的数据操作与数据库中的数据保持同步更新。
- 何为**瓦片**？瓦片即网格中多个类似瓦片的图片集。瓦片数据是将矢量地图文档或影像数据进行预处理，采用高效的缓存机制形成的缓存图片集，可在网页中快速加载，并且效果较好。
- **矢量瓦片**，对矢量电子地图按照一定的标准和技术将其保存为多种比例尺的矢量分块数据，在前端显示电子地图时，可直接调用矢量分块进行绘制。矢量瓦片的样式可以改变和定制，矢量切片可以在客户端渲染，可以按照用户赋予的样式渲染。使用MapGIS IGServer配置矢量瓦片的显示样式，配置的样式信息保存为xxx.json文件，上传文件到MapGIS IGServer服务器，客户端通过接口即可访问定制样式的矢量瓦片。


| 地图类型 |  类名          |     API说明    |
| ------- | -------------- |----------------|
| 矢量地图文档 | Zondy.Map.Doc | 加载基于MapGIS矢量地图文档的矢量服务数据 |
| 矢量图层 | Zondy.Map.GdbpLayer | 加载基于MapGIS矢量图层的矢量服务数据 |
| 瓦片地图 | Zondy.Map.TileLayer | 加载基于MapGIS瓦片的瓦片服务数据 |


### 矢量地图文档

&ensp;&ensp;&ensp;&ensp;基于地图文档加载矢量地图：首先实例化ol.proj.Projection对象定义参考系，通过ol.extent对象的getCenter()方法获取图层中心点，然后实例化Zondy.Map.Doc对象构建地图文档图层。

- Example
  ```javascript
  //定义参考系
  var projection = new ol.proj.Projection({ units: ol.proj.Units.METERS, extent: extent })
  //中心点
  var center = ol.extent.getCenter(extent)
  //地图文档服务的显示名称
  var name = 'MapGIS IGS MapDocLayer'
  //地图文档名称
  var docname = 'SampleDoc'

  //构建地图文档图层
  var mapDocLayer = new Zondy.Map.Doc(name, docname, {
    ip: `http://develop.smaryun.com/`,
    port: 6163, //访问IGServer的端口号，.net版为6163，Java版为8089
    extent: extent,
  })
  //初始化地图容器
  var map = new ol.Map({
    //目标DIV
    target: 'mapCon',
    //将图层添加到地图容器
    layers: [mapDocLayer],
    view: new ol.View({
      projection: projection,
      center: center,
      //最大显示级数
      maxZoom: 5,
      //最小显示级数
      minZoom: 1,
      //当前显示级数
      zoom: 3,
    }),
  })
  ```


### 矢量图层

&ensp;&ensp;&ensp;&ensp;基于矢量图层加载矢量地图：首先实例化ol.proj.Projection对象定义参考系，通过ol.extent对象的getCenter()方法获取图层中心点，然后实例化Zondy.Map.GdbpLayer对象构建矢量地图图层。

- Example
  ```javascript
  //定义参考系
  var projection = new ol.proj.Projection({ units: ol.proj.Units.METERS, extent: extent })
  //中心点
  var center = ol.extent.getCenter(extent)
  //图层显示名称
  var name = 'MapGIS IGS VecLayer'
  //要显示的图层的gdbps地址
  var gdbps = ['gdbp://MapGisLocal/sample/ds/地图综合/sfcls/水系']
  //创建一个矢量图层
  var VecLayer = new Zondy.Map.GdbpLayer(name, gdbps, {
    ip: `http://develop.smaryun.com/`,
    port: 6163, //访问IGServer的端口号，.net版为6163，Java版为8089
    extent: extent,
  })
  //初始化地图容器
  var map = new ol.Map({
    //目标DIV
    target: 'mapCon',
    //将图层添加到地图容器
    layers: [VecLayer],
    view: new ol.View({
      projection: projection,
      center: center,
      //最大显示级数
      maxZoom: 5,
      //最小显示级数
      minZoom: 1,
      //当前显示级数
      zoom: 3,
    }),
  })
  ```

### 瓦片

&ensp;&ensp;&ensp;&ensp;加载瓦片地图：首先实例化ol.proj.Projection对象定义参考系，通过ol.extent对象的getCenter()方法获取图层中心点，然后实例化Zondy.Map.TileLayer对象构建瓦片地图图层。

&ensp;&ensp;&ensp;&ensp;**瓦片地图:**

- Example
  ```javascript
  //定义参考系
  var projection = new ol.proj.Projection({ units: ol.proj.Units.METERS, extent: extent })
  //中心点
  var center = ol.extent.getCenter(extent)
  //瓦片的显示名称
  var name = 'MapGIS IGS TileLayer'
  //瓦片地图的名称
  var TileName = 'SAMPLETILE'
  //构建瓦片地图图层
  var TileLayer = new Zondy.Map.TileLayer(name, TileName, {
    ip: `http://develop.smaryun.com/`,
    port: 6163, //访问IGServer的端口号，.net版为6163，Java版为8089
  })

  var map = new ol.Map({
    //目标DIV
    target: 'mapCon',
    //将图层添加到地图容器
    layers: [TileLayer],
    view: new ol.View({
      projection: projection,
      center: center,
      //最大显示级数
      maxZoom: 5,
      //最小显示级数
      minZoom: 1,
      //当前显示级数
      zoom: 3,
    }),
  })
  ```

&ensp;&ensp;&ensp;&ensp;**自定义比例尺瓦片地图:**

- Example
  ```javascript
        //瓦片投影，包含单位，坐标范围
        var projectionExtent = [114.12567815477894, 30.457571584721734, 114.47583026053915, 30.708389893334449]
        var projection = new ol.proj.Projection({
          units: ol.proj.Units.DEGREES,
          extent: projectionExtent,
        })
        //最大分辨率，新瓦片必须设置，旧瓦片无需设置
        var maxResolution = 0.0009655719622925324
        var center = [(114.12567815477894 + 114.47583026053915) / 2, (30.457571584721734 + 30.708389893334449) / 2]
        //初始化地图容器
        var map = new ol.Map({
          target: 'mapCon',
          view: new ol.View({
            projection: projection,
            extent: projectionExtent,
            center: center,
            maxZoom: 7,
            minZoom: 0,
            zoom: 1,
          }),
        })

        //显示瓦片图
        var tileLayer = new Zondy.Map.TileLayer('MapGIS IGS TileLayer', '武汉市区自定义比例尺', {
          ip: `http://develop.smaryun.com/`,
          port: 6163,//访问IGServer的端口号，.net版为6163，Java版为8089
          projection: projection,
          maxResolution: maxResolution,
          tileSize: 256,
          //瓦片裁剪方式
          tileOriginType: 'leftTop',
        })

        //将瓦片地图图层加载到地图中
        map.addLayer(tileLayer)
  ```


## 查询

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

&ensp;&ensp;&ensp;&ensp;**以属性查询为例：**

<!-->
<a href="http://develop.smaryun.com/#/demo/openlayers/IGServer/DocFeatureQuery/E01QueryDocByAttribute" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/501-QueryDocByAttribute.png" alt="文档要素属性查询" style="zoom:80%;" />
</a>
<!-->

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
&ensp;&ensp;&ensp;&ensp;实例化查询参数对象`Zondy.Service.QueryParameter`，设置查询要素数目`recordNumber`、查询条件`where`;

* Example

    ```javascript
        //实例化查询参数对象
        var queryParam = new Zondy.Service.QueryParameter({
            resultFormat: "json",
            struct: queryStruct
        });
        //设置查询分页号
        queryParam.pageIndex = 0;
        //设置查询要素数目
        queryParam.recordNumber =20;
        //设置属性条件
        queryParam.where = document.getElementById("Conditions").value;
    ```

**Step 3. <font color=red>初始化矢量图层查询服务对象</font>**：

&ensp;&ensp;&ensp;&ensp;实例化矢量图层查询服务对象`Zondy.Service.QueryDocFeature`，并调用`QueryDocFeature`对象的`query`方法，执行查询；

* Example

    ```javascript
        //实例化地图文档查询服务对象
        var queryService = new Zondy.Service.QueryDocFeature(queryParam, "WorldJWVector", 1, {
            ip: "develop.smaryun.com",
            port: "6163"    //访问IGServer的端口号，.net版为6163，Java版为8089
        });
        //执行查询操作，querySuccess为查询回调函数
        queryService.query(querySuccess, queryError);
    ```

**Step 4. <font color=red>将MapGIS要素JSON反序列化为ol.Feature类型</font>**：

&ensp;&ensp;&ensp;&ensp;在查询结果回调函数中初始化`Zondy.Format.PolygonJSON`类，调用该类的`read`方法，获取查询结果中的`features`，调用 `drawSource`对象的`addFeatures`方法将要素添加到矢量图层数据源，初始化用于高亮显示结果的图层类`ol.Layer.Vector`，通过`Map`对象的`addLayers `方法加载结果图层。

* Example

    ```javascript
    //初始化Zondy.Format.PolygonJSON类
    var format = new Zondy.Format.PolygonJSON()
    //将MapGIS要素JSON反序列化为ol.Feature类型数组
    var features = format.read(result)

    //实例化一个矢量图层drawLayerr用于高亮显示结果
    var drawSource = new ol.source.Vector({
        wrapX: false,
    })
    drawSource.addFeatures(features)
    drawLayer = new ol.layer.Vector({
        source: drawSource,
        style: new ol.style.Style({
            //填充色
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.5)',
            }),
            //边线样式
            stroke: new ol.style.Stroke({
                color: 'rgba(255,204, 51, 1)',
                width: 1,
            }),
        }),
    })

    map.addLayer(drawLayer)
    map.setView(
        new ol.View({
            center: [110, 30],
            zoom: 4,
            projection: 'EPSG:4326',
        })
    )
    ```


### 图层要素查询

&ensp;&ensp;&ensp;&ensp;通过Zondy.Service.QueryLayerFeature实例化服务，通过query方法进行查询。

&ensp;&ensp;&ensp;&ensp;**以几何查询为例：**

<!-->
<a href="http://develop.smaryun.com/#/demo/openlayers/IGServer/LayerFeatureQuery/E03QueryLayerByGeom" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/502-QueryLayerByGeom.png" alt="图层要素几何查询" style="zoom:80%;" />
</a>
<!-->

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

**Step 2.1 <font color=red>创建用于查询的固定几何图形</font>**：
&ensp;&ensp;&ensp;&ensp;创建一个用于查询的点形状；

* Example

    ```javascript
    //创建一个用于查询的点形状
    var pointObj = new Zondy.Object.Point2D(114, 30)
    //设置查询点的搜索半径
    pointObj.nearDis = 0.001
    //将点添加到地图进行显示（非必需，仅仅为了在地图上高亮显示图形）
    var point = new ol.Feature({
        geometry: new ol.geom.Point([114, 30]),
    })
    //设置点的样式信息
    point.setStyle(
        new ol.style.Style({
            //形状
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: 'blue',
                }),
            }),
        })
    )
    ```

**Step 2.2 <font color=red>创建用于查询的固定几何图形</font>**：
&ensp;&ensp;&ensp;&ensp;创建一个用于查询的线形状；

* Example

    ```javascript
    //创建一个用于查询的线形状
    var pointObj = new Array()
    pointObj[0] = new Zondy.Object.Point2D(114.27922, 30.57249)
    pointObj[1] = new Zondy.Object.Point2D(109.98, 40.65)
    pointObj[2] = new Zondy.Object.Point2D(106.91235, 47.92859)
    var polyLine = new Zondy.Object.PolyLine(pointObj)
    //将线几何添加到地图进行显示（非必需，仅仅为了在地图上高亮显示图形）
    var points = []
    for (var i = 0; i < polyLine.pointArr.length; i++) {
        var ring = polyLine.pointArr
        var point = [ring[i].x, ring[i].y]
        points.push(point)
    }
    //创建一条线
    var line = new ol.Feature({
        geometry: new ol.geom.LineString(points),
    })
    //设置线的样式
    line.setStyle(
        new ol.style.Style({
            //边线样式
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 2,
            }),
        })
    )
    ```

**Step 2.3 <font color=red>创建用于查询的固定几何图形</font>**：
&ensp;&ensp;&ensp;&ensp;创建一个用于查询的多边形；

* Example

    ```javascript
    //创建一个用于查询的多边形
    var pointObj = new Array()
    pointObj[0] = new Zondy.Object.Point2D(103.5995, 36.1134)
    pointObj[1] = new Zondy.Object.Point2D(117.18523, 39.1284)
    pointObj[2] = new Zondy.Object.Point2D(115.8894, 28.6712)
    pointObj[3] = new Zondy.Object.Point2D(102.7021, 25.051)
    pointObj[4] = new Zondy.Object.Point2D(103.5995, 36.1134)
    var Polygon = new Zondy.Object.Polygon(pointObj)
    //将多边形几何添加到地图进行显示（非必需，仅仅为了在地图上高亮显示图形）
    var points = []
    for (var i = 0; i < Polygon.pointArr.length; i++) {
        var ring = Polygon.pointArr
        var point = [ring[i].x, ring[i].y]
        points.push(point)
    }
    //创建一个多边形
    var PolygonOL = new ol.Feature({
        geometry: new ol.geom.Polygon([points]),
    })
    //设置区样式信息
    PolygonOL.setStyle(
        new ol.style.Style({
            //填充色
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.2)',
            }),
            //边线样式
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 2,
            }),
        })
    )
    ```

**Step 2.4 <font color=red>创建用于查询的固定几何图形</font>**：
&ensp;&ensp;&ensp;&ensp;创建一个用于查询的正方形；

* Example

    ```javascript
    //根据圆获取多边形
    var Circle = new ol.geom.Circle([116.4375, 41.53125], 10)
    var polygonOL = new ol.geom.Polygon.fromCircle(Circle, 4, 150)
    var Square = new ol.Feature({
        geometry: polygonOL,
    })

    Square.setStyle(
        new ol.style.Style({
            //填充色
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.8)',
            }),
            //边线颜色
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2,
            }),
            //形状
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33',
                }),
            }),
        })
    )
    var pntsArr = polygonOL.getCoordinates()[0]
    var pointObj = new Array()
    for (var i = 0; i < pntsArr.length; i++) {
        pointObj.push(new Zondy.Object.Point2D(pntsArr[i][0], pntsArr[i][1]))
    }
    var Polygon = new Zondy.Object.Polygon(pointObj)
    GeomQuery(Square, Polygon)
    ```

**Step 2.5 <font color=red>创建用于查询的固定几何图形</font>**：
&ensp;&ensp;&ensp;&ensp;创建一个用于查询的圆；

* Example

    ```javascript
    //创建一个用于查询的圆
    var pointObj = new Zondy.Object.Point2D(116.4375, 41.53125)
    var circleObj = new Zondy.Object.Circle(pointObj, 5)
    //将圆几何添加到地图进行显示（非必需，仅仅为了在地图上高亮显示图形）
    var Circle = new ol.Feature({
        geometry: new ol.geom.Circle([116.4375, 41.53125], 5),
    })
    //设置圆的样式信息
    Circle.setStyle(
        new ol.style.Style({
            //填充色
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.2)',
            }),
            //边线样式
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 2,
            }),
        })
    )
    GeomQuery(Circle, circleObj)
    ```
**Step 3. <font color=red>初始化查询参数对象</font>**：
&ensp;&ensp;&ensp;&ensp;实例化查询参数对象`Zondy.Service.QueryByLayerParameter`，设置查询要素数目`recordNumber`、设置查询结构包含几何信息；

* Example

    ```javascript
     //实例化查询参数对象
    var queryParam = new Zondy.Service.QueryByLayerParameter('gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区', {
        geometry: geomZD,
        resultFormat: 'json',
        struct: queryStruct,
    })
    //设置查询分页号
    queryParam.pageIndex = 0
    //设置查询要素数目
    queryParam.recordNumber = 20
    ```

**Step 4. <font color=red>初始化矢量图层查询服务对象</font>**：

&ensp;&ensp;&ensp;&ensp;实例化矢量图层查询服务对象`Zondy.Service.QueryLayerFeature`，并调用`QueryLayerFeature`对象的`query`方法，执行查询；

* Example

    ```javascript
    //实例化地图文档查询服务对象
    var queryService = new Zondy.Service.QueryLayerFeature(queryParam, {
        ip: 'develop.smaryun.com',
        port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
    })
    //执行查询操作，querySuccess为查询回调函数
    queryService.query(querySuccess, queryError)
    ```

**Step 5. <font color=red>将MapGIS要素JSON反序列化为ol.Feature类型</font>**：

&ensp;&ensp;&ensp;&ensp;在查询结果回调函数中初始化`Zondy.Format.PolygonJSON`类，调用该类的`read`方法，获取查询结果中的`features`，调用 `drawSource`对象的`addFeatures`方法将要素添加到矢量图层数据源，初始化用于高亮显示结果的图层类`ol.Layer.Vector`，通过`Map`对象的`addLayers `方法加载结果图层。

* Example

    ```javascript
    //初始化Zondy.Format.PolygonJSON类
    var format = new Zondy.Format.PolygonJSON()
    //将MapGIS要素JSON反序列化为ol.Feature类型数组
    var features = format.read(result)

    //实例化一个矢量图层drawLayerr用于高亮显示结果
    var drawSource = new ol.source.Vector({
        wrapX: false,
    })
    drawSource.addFeatures(features)
    drawLayer = new ol.layer.Vector({
        source: drawSource,
        style: new ol.style.Style({
            //填充色
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 0.5)',
            }),
            //边线样式
            stroke: new ol.style.Stroke({
                color: 'rgba(255,204, 51, 1)',
                width: 1,
            }),
        }),
    })

    map.addLayer(drawLayer)
    map.setView(
        new ol.View({
            center: [110, 30],
            zoom: 4,
            projection: 'EPSG:4326',
        })
    )
    ```


## 编辑

&ensp;&ensp;&ensp;&ensp;WebGIS中的要素编辑功能，打破了传统单机编辑的局限，用户不必每次都登录服务器进行数据的变更维护，可以通过网络更加方便、快捷地完成数据维护，可以说弥补了单机数据管理维护方案的局限。Web矢量要素编辑功能，包括矢量要素添加、更新、删除三种功能操作，可对要素的几何信息和属性信息进行编辑。


| 类型 |  类名/方法名         |     API说明    |
| ------- | -------------- |----------------|
| 文档要素编辑 | Zondy.Service.EditDocFeature / add()、update()、deletes() | 基于地图文档的矢量要素编辑，支持添加、更新、删除操作 |
| 图层要素编辑 | Zondy.Service.EditLayerFeature / add()、update()、deletes() | 基于矢量图层的矢量要素编辑，支持添加、更新、删除操作 |



### 文档要素编辑

&ensp;&ensp;&ensp;&ensp;通过Zondy.Service.EditDocFeature实例化服务，通过add方法添加要素，通过deletes方法删除要素，调用update方法更新要素

&ensp;&ensp;&ensp;&ensp;**以点要素编辑为例：**

<a href="http://develop.smaryun.com/#/demo/openlayers/IGServer/DocFeatureEdit/E01InterActionDocPointEdit" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/601-InterActionDocPointEdit.png" alt="文档点要素编辑" style="zoom:80%;" />
</a>

<br/>
<br/>

**Step 1. <font color=red>加载地图文档</font>**：
&ensp;&ensp;&ensp;&ensp;加载MapGIS地图文档；

* Example

```javascript
//加载地图文档图层
MapDocLayer = new Zondy.Map.MapDocTileLayer('MapGIS IGS VectorMapdocLayer', 'FeatureEditForPoint', {
    ip: 'develop.smaryun.com',
    port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089,
    isBaseLayer: true,
})
map.addLayer(MapDocLayer);
```

**Step 2. <font color=red>添加点要素</font>**：
&ensp;&ensp;&ensp;&ensp;给地图添加点击事件，获取鼠标点击点坐标,设置点要素信息,调用服务添加点要素；

* Example:

```javascript
map.addEventListener('click', function(e){
    //创建一个点形状，描述点形状的几何信息
    var gpoint = new Zondy.Object.GPoint(e.coordinate[0], e.coordinate[1])
    //设置当前点要素的几何信息
    var fGeom = new Zondy.Object.FeatureGeometry({ PntGeom: [gpoint] })
    //随机输出1~8之间的整数,作为新添加的要素的颜色号
    var pntColor = Math.floor(Math.random() * 8 + 1)
    //描述点要素的符号参数信息
    var pointInfo = new Zondy.Object.CPointInfo({
        //子图角度，取值范围为0~360。
        Angle: 0,
        //子图颜色（请参考MapGIS颜色库中颜色编号）
        Color: pntColor,
        //子图高度
        SymHeight: 12,
        //子图ID（请参考MapGIS符号库中线符号编号）
        SymID: 114,
        //子图宽度
        SymWidth: 12,
    })
    //设置当前点要素的图形参数信息
    var webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
        InfoType: 1,
        PntInfo: pointInfo,
    })
    //设置添加点要素的属性信息
    var attValue = ['中国', '中国', 1.0]
    //创建一个要素
    var feature = new Zondy.Object.Feature({
        fGeom: fGeom,
        GraphicInfo: webGraphicInfo,
        AttValue: attValue,
    })
    //设置要素为点要素
    feature.setFType(1)
    //创建一个要素数据集
    var featureSet = new Zondy.Object.FeatureSet()
    featureSet.clear()
    //设置属性结构，根据图层属性进行设置
    var cAttStruct = new Zondy.Object.CAttStruct({
        FldName: ['Cname', 'CNTRY_NAME', 'POPULATION'],
        FldNumber: 3,
        FldType: ['string', 'string', 'double'],
    })
    featureSet.AttStruct = cAttStruct
    //添加要素到要素数据集
    featureSet.addFeature(feature);
    //创建一个编辑服务类
    var editService = new Zondy.Service.EditDocFeature('FeatureEditForPoint', 0, {
        ip: 'develop.smaryun.com',
        port: '6163',
    })
    //执行添加点要素功能
    editService.add(featureSet, function(data){
        if (data) {
            alert('添加点要素成功！')
            //刷新图层
            MapDocLayer.refresh()
        } else {
            alert('添加点要素失败！')
        }
    })
})
```

**Step 3. <font color=red>删除点要素</font>**：
&ensp;&ensp;&ensp;&ensp;给地图添加点击事件，对点击点周围进行查询，选中要素。在查询成功回调函数中获取要素FID，进行删除操作;

* Example

```javascript
    //选择点所在的地图文档
    var deleteService = new Zondy.Service.EditDocFeature('FeatureEditForPoint', 0, {
        ip: 'develop.smaryun.com',
        port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
    })
    deleteService.deletes(featureIds, function(rlt){
        if (rlt) {
            alert('删除点要素成功！')
            //刷新图层
            MapDocLayer.refresh()
        } else {
            alert('删除点要素失败！')
        }
    })
```

**Step 4. <font color=red>更新点要素</font>**：
&ensp;&ensp;&ensp;&ensp;给地图添加点击事件，对点击点周围进行查询，选中要素.在查询成功回调函数中获取要素 FID，进行更新操作；

* Example

```javascript
//设置添加点要素的图形参数信息
    var pointInfo = new Zondy.Object.CPointInfo({
        //子图角度，取值范围为0~360。
        Angle: document.getElementById('pointAngle').value,
        //子图颜色（请参考MapGIS颜色库中颜色编号）
        Color: document.getElementById('pointColor').value,
        //子图高度
        SymHeight: document.getElementById('pointSymHeight').value,
        //子图ID（请参考MapGIS符号库中线符号编号）
        SymID: document.getElementById('pointSymID').value,
        //子图宽度
        SymWidth: document.getElementById('pointSymWidth').value,
    })
    var graphicInfo = new Zondy.Object.WebGraphicsInfo({
        InfoType: 1,
        PntInfo: pointInfo,
    })
    resultPoint.SFEleArray[0].GraphicInfo = graphicInfo
    //设置添加点要素的属性信息
    resultPoint.SFEleArray[0].AttValue[1] = document.getElementById('Cname').value
    resultPoint.SFEleArray[0].AttValue[2] = document.getElementById('CNTRY_NAME').value
    resultPoint.SFEleArray[0].AttValue[3] = document.getElementById('POPULATION').value
    //创建一个编辑服务类
    var editService = new Zondy.Service.EditDocFeature('FeatureEditForPoint', '0', {
        ip: 'develop.smaryun.com',
        port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
    })
    editService.update(resultPoint, function(data){
        if (data.succeed) {
            alert('修改点要素成功！')
            //刷新图层
            MapDocLayer.refresh()
        } else {
            alert('修改点要素失败！')
        }
    })
```

### 图层要素编辑

&ensp;&ensp;&ensp;&ensp;通过Zondy.Service.EditLayerFeature实例化服务，通过add方法添加要素，通过deletes方法删除要素，通过update方法更新要素。

&ensp;&ensp;&ensp;&ensp;**以区要素编辑为例：**

<a href="http://develop.smaryun.com/#/demo/openlayers/IGServer/LayerFeatureEdit/E03InterActionRegEdit" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/602-InterActionRegEdit.png" alt="图层区要素编辑" style="zoom:80%;" />
</a>

<br/>
<br/>

**Step 1. <font color=red>加载矢量图层</font>**：
&ensp;&ensp;&ensp;&ensp;加载MapGIS矢量图层；
* Example

```javascript
//初始化矢量图层
vectorLayer = new Zondy.Map.GdbpLayer("MapGIS IGS VectorLayer", ["gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/myreglayer"], {
    ip: "develop.smaryun.com",
    port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
    isBaseLayer: true
});
map.addLayer(vectorLayer);
```

**Step 2. <font color=red>添加区要素</font>**：
&ensp;&ensp;&ensp;&ensp;添加交互式绘制控件，通过控件绘制区，获取鼠标绘制区坐标,设置区要素信息,调用服务添加区要素；

* Example:

```javascript
    //实例化一个矢量图层Vector作为绘制层
    var vector = new ol.layer.Vector()
    var source = new ol.source.Vector({ wrapX: false })
    //添加绘制层数据源
    vector.setSource(source)
    //实例化交互绘制类对象并添加到地图容器中
    drawTool = new ol.interaction.Draw({
        //绘制层数据源
        source: source,
        //几何图形类型
        type: 'Polygon',
    })
    drawTool.on('drawend', function(evt){
        var geomObj = new Zondy.Object.Polygon()
        //把openlayers图形几何结构转化为
        geomObj.setByOL(evt.feature.values_.geometry)
        //获取所有顶点坐标
        for (i = 0; i < geomObj.pointArr.length; i++) {
            x[i] = geomObj.pointArr[i].x
            y[i] = geomObj.pointArr[i].y
        }
        //构成区要素的点
        var pointObj = new Array()
        for (var j = 0; j < x.length; j++) {
            pointObj[j] = new Zondy.Object.Point2D(x[j], y[j])
        }

        //设置区要素的几何信息
        var gArc = new Zondy.Object.Arc(pointObj)
        //构成区要素折线
        var gAnyLine = new Zondy.Object.AnyLine([gArc])
        //构成区要素
        var gRegion = new Zondy.Object.GRegion([gAnyLine])
        //构成区要素的几何信息
        var fGeom = new Zondy.Object.FeatureGeometry({ RegGeom: [gRegion] })

        //设置区要素的图形参数信息
        var cRegionInfo = new Zondy.Object.CRegionInfo({
            //结束填充颜色，在渐变模式下设置才有意义。（请参考MapGIS颜色库中颜色编号）
            EndColor: 1,
            //填充颜色，在渐变模式下设置才有意义。（请参考MapGIS颜色库中颜色编号）
            FillColor: 6,
            //填充模式。取值范围：0（常规模式）、1（线性渐变模式）、2（矩形渐变模式）、3（圆形渐变模式）。
            FillMode: 0,
            //填充图案笔宽
            OutPenWidth: 1,
            //填充图案角度，取值范围为0~360。
            PatAngle: 1,
            //填充图案颜色（请参考MapGIS颜色库中颜色编号）
            PatColor: 1,
            //填充图案高度
            PatHeight: 1,
            //填充图案ID（请参考MapGIS符号库中线符号编号）
            PatID: 27,
            //填充图案宽度
            PatWidth: 1,
        })
        //要素图形参数信息
        var graphicInfo = new Zondy.Object.WebGraphicsInfo({
            InfoType: 3,
            RegInfo: cRegionInfo,
        })
        //设置区要素的属性信息
        var attValue = [0, 12345, 12345, 'esstLake', 'esstLake', 'esstLake']
        //创建一个新的区要素
        var newFeature = new Zondy.Object.Feature({
            AttValue: attValue,
            fGeom: fGeom,
            GraphicInfo: graphicInfo,
        })
        newFeature.setFType(3)
        //创建一个要素数据集
        var featureSet = new Zondy.Object.FeatureSet()
        var fldNumber = 6
        var fldType = ['long', 'double', 'double', 'string', 'string', 'string']
        var fldName = ['ID', '面积', '周长', 'CNTRY_NAME', 'FIRST_FIRS', 'name']
        var cAttValue = new Zondy.Object.CAttStruct({
            FldNumber: fldNumber,
            FldType: fldType,
            FldName: fldName,
        })
        featureSet.AttStruct = cAttValue
        featureSet.addFeature(newFeature)
        //创建一个要素编辑服务对象
        var editLayerFeature = new Zondy.Service.EditLayerFeature('gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/myreglayer', {
            ip: 'develop.smaryun.com',
            port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
        })
        editLayerFeature.add(featureSet, function(rlt){
            if (rlt) {
                alert('添加区要素成功！')
                //刷新图层
                vectorLayer.refresh()
            } else {
                alert('添加区要素失败！')
            }
        })
    })
    //添加绘制控件
    map.addInteraction(drawTool)
```
**Step 3. <font color=red>删除区要素</font>**：
&ensp;&ensp;&ensp;&ensp;给地图添加点击事件，对点击点周围进行查询，选中区要素，在查询成功回调函数中获取要素 FID，进行区要素删除操作;

* Example:

```javascript
    var deleteService = new Zondy.Service.EditLayerFeature('gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/myreglayer', {
            ip: 'develop.smaryun.com',
            port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
    })
    deleteService.deletes(featureIds, function(rlt){
        if (rlt) {
            alert('删除区要素成功！')
            //刷新图层
            vectorLayer.refresh()
        } else {
            alert('删除区要素失败！')
        }
    })
```


**Step 4. <font color=red>更新线要素</font>**：
&ensp;&ensp;&ensp;&ensp;给地图添加点击事件，对点击点周围进行查询，选中线要素.在查询成功回调函数中获取要素 FID，进行线要素更新操作；

* Example:
```javascript
//设置区要素的图形参数信息
        var cRegionInfo = new Zondy.Object.CRegionInfo({
            //结束填充颜色，在渐变模式下设置才有意义。（请参考MapGIS颜色库中颜色编号）
            EndColor: document.getElementById('EndColor').value,
            //填充颜色，在渐变模式下设置才有意义。（请参考MapGIS颜色库中颜色编号）
            FillColor: document.getElementById('FillColor').value,
            //填充模式。取值范围：0（常规模式）、1（线性渐变模式）、2（矩形渐变模式）、3（圆形渐变模式）。
            FillMode: document.getElementById('FillMode').value,
            //填充图案笔宽
            OutPenWidth: document.getElementById('OutPenWidth').value,
            //填充图案角度，取值范围为0~360。
            PatAngle: document.getElementById('PatAngle').value,
            //填充图案颜色（请参考MapGIS颜色库中颜色编号）
            PatColor: document.getElementById('PatColor').value,
            //填充图案高度
            PatHeight: document.getElementById('PatHeight').value,
            //填充图案ID（请参考MapGIS符号库中线符号编号）
            PatID: document.getElementById('PatID').value,
            //填充图案宽度
            PatWidth: document.getElementById('PatWidth').value,
        })
        //要素图形参数信息
        var graphicInfo = new Zondy.Object.WebGraphicsInfo({
            InfoType: 3,
            RegInfo: cRegionInfo,
        })
        //设置区要素图形信息
        resultReg.SFEleArray[0].graphicInfo = graphicInfo
        //设置区素属性信息(创建线图层时属性信息数组会自动添加三个个属性信息，设置从第四个开始)
        resultReg.SFEleArray[0].AttValue[3] = document.getElementById('ID').value
        resultReg.SFEleArray[0].AttValue[4] = document.getElementById('area').value
        resultReg.SFEleArray[0].AttValue[5] = document.getElementById('perimeter').value
        resultReg.SFEleArray[0].AttValue[6] = document.getElementById('CNTRY_NAME').value
        resultReg.SFEleArray[0].AttValue[7] = document.getElementById('FIRST_FIRS').value
        resultReg.SFEleArray[0].AttValue[8] = document.getElementById('name').value
        //创建一个要素编辑服务对象
        var editLayerFeature = new Zondy.Service.EditLayerFeature('gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/myreglayer', {
            ip: 'develop.smaryun.com',
            port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
        })
        editLayerFeature.update(resultReg, function(data){
            if (data.succeed) {
                alert('修改区要素成功！')
                //刷新图层
                vectorLayer.refresh()
            } else {
                alert('修改区要素失败！')
            }
        })
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

&ensp;&ensp;&ensp;&ensp;**以分段专题图（单字段）为例：**


<a href="http://develop.smaryun.com/#/demo/openlayers/IGServer/ThemeService/E03ParagraphThemeBySinglefield" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/701-ParagraphThemeBySinglefield.png" alt="分段专题图（单字段）" style="zoom:80%;" />
</a>


**Step 1. <font color=red>添加地图文档图层</font>**:
  &ensp;&ensp;&ensp;&ensp;创建地图文档瓦片图层对象,设置其服务的名称、服务器的 IP 和 Port,以及文档的 GUID,在把该图层加载到地图容器中显示 (说明：该 GUID 用于该地图文档服务在客户端生成缓存的文件夹名称，这样在指定 GUID 以后，该文档服务生成的缓存就只有一份，且保存在该文件夹下)；

- Example:

  ```javascript
  //初始化地图文档图层对象
  guid = Math.floor(Math.random() * 10000000).toString()
  mapDocLayer = new Zondy.Map.MapDocTileLayer('MapGIS IGS MapDocLayer', 'Hubei4326', {
    ip: `develop.smaryun.com`,
    port: `6163`,
    //文档guid
    guid: guid,
  })
  //将地图文档图层加载到地图中
  map.addLayer(mapDocLayer)
  ```

**Step 2. <font color=red>构建专题图服务类对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建专题图服务对象，指定服务的 IP 和 Port,同时指定缓存的 GUID；

- Example:

  ```javascript
  //初始化专题图服务类
  ThemeOper = new Zondy.Service.ThemeOper(null, guid)
  //设置ip地址
  ThemeOper.ip = `develop.smaryun.com`
  //设置端口号
  ThemeOper.port = `6163`
  ```

**Step 3. <font color=red>创建图层专题图信息数组</font>**:
&ensp;&ensp;&ensp;&ensp;专题图是针对整个地图而言的，每个图层都可设置对应一个专题图信息对象，因此地图的专题图信息是一个数组，其中的每一个索引项通过图层名称(`LayerName`)的指定来对应匹配到地图的某一图层上；

- Example:

  ```javascript
  //专题图信息数组
  var themesInfoArr = []
  //初始化Zondy.Object.Theme.ThemesInfo，用于设置需添加的专题相关信息
  themesInfoArr[0] = new Zondy.Object.Theme.ThemesInfo()
  //设置图层名层
  themesInfoArr[0].LayerName = '湖北省市级区划2'
  ```

**Step 4. <font color=red>实例化图层的分段专题图对象</font>**:
&ensp;&ensp;&ensp;&ensp;每个图层可维护多个不同类型的专题图，比如单值、分段等，本示例以图层的分段专题图为例，实例化一个分段专题图对象`CRangeTheme`，同时初始化该分段专题图信息的一些相关属性：`Visible`(是否可见)、`Expression`(对应参与分段的属性字段名称)、`GeoInfoType`(几何图形信息的类型)；

- Example:

  ```javascript
  themesInfoArr[0].ThemeArr = []
  //实例化CRangeTheme类
  themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CRangeTheme()
  themesInfoArr[0].ThemeArr[0].Name = '分段专题图'
  //指定为分段专题图
  themesInfoArr[0].ThemeArr[0].IsBaseTheme = false
  themesInfoArr[0].ThemeArr[0].Visible = true
  themesInfoArr[0].ThemeArr[0].GeoInfoType = 'Reg'
  themesInfoArr[0].ThemeArr[0].Expression = 'GDP2016'
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
&ensp;&ensp;&ensp;&ensp;对于分段专题图而言,分段信息`Zondy.Object.Theme.CRangeThemeInfo`是根据图层指定的属性字段的取值范围来确定的，每一个分段信息主要包含:对应的属性字段的值域`StartValue`、`EndValue`以及根据分段专题图指定的`GeoInfoType`而相应的几何图形信息(如`RegInfo`),这样图层里一个属性值域所对应的要素就以一种样式进行渲染；

- Example:

      ```javascript
      //分段取值设置
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr = []
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0] = new Zondy.Object.Theme.CRangeThemeInfo()
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].StartValue = '4.25'
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].EndValue = '267.82'
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].RegInfo = new Zondy.Object.Theme.CRegInfo()
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[0].RegInfo.FillClr = 16
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1] = new Zondy.Object.Theme.CRangeThemeInfo()
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].StartValue = '267.82'
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].EndValue = '531.39'
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].RegInfo = new Zondy.Object.Theme.CRegInfo()
      themesInfoArr[0].ThemeArr[0].RangeThemeInfoArr[1].RegInfo.FillClr = 19
      ```

  **Step 7. <font color=red>根据上述的专题图信息实现专题图的添加、更新、删除</font>**:
  &ensp;&ensp;&ensp;&ensp;根据专题图的信息数组 themesInfoArr，调用专题图服务类对象 ThemeOper 提供的`addThemesInfo`、`updateThemesInfo`、`removeThemesInfo`的方法实现服务端专题图的添加、更新、删除，同时通过服务成功的回调函数，实现客户端的更新显示专题图的效果；

- Example:

  ```javascript
  //添加专题图
  ThemeOper.addThemesInfo('Hubei4326', '1/0', themesInfoArr, onUniqueTheme)
  //更新专题图
  ThemeOper.updateThemesInfo('Hubei4326', '1/0', themesInfoArr, onUniqueTheme)
  //删除专题图
  ThemeOper.removeThemesInfo('Hubei4326', '1/0', onUniqueTheme)
  ```

**Step 8. <font color=red>更新前端的专题图显示效果</font>**:
&ensp;&ensp;&ensp;&ensp;在 Step 1 中指定了专题图服务类对象的 guid，该 guid 对应的是地图文档缓存的 guid(指定文档的 guid 是为了防止每次请求都从服务端取图而造成的客户端显示效率低下)，由于专题图的添加、删除、更新是对地图文档进行了修改，因此需要对指定 guid 的缓存重新生成。

- Example:

  ```javascript
  function onUniqueTheme(flg) {
    if (flg) {
      //刷新图层前要进行此设置。加载之前的缓存文档,保证专题图能正常显示
      mapDocLayer.options.keepCache = false
      //刷新图层，实时显示专题图
      mapDocLayer.refresh()
      //设置为读取缓存，以加快显示效率
      mapDocLayer.options.keepCache = true
    }
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

&ensp;&ensp;&ensp;&ensp;**以要素缓冲区分析为例**：实现针对几何要素的单圈或多圈的缓冲分析。


<a href="http://develop.smaryun.com/#/demo/openlayers/IGServer/AnalysisService/E02BuffAnalysisByFeature" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/801-BuffAnalysisByFeature.png" alt="要素缓冲区分析" style="zoom:80%;" />
</a>


**Step 1. <font color=red>添加源几何多边形</font>**:
&ensp;&ensp;&ensp;&ensp;创建矢量图层，和矢量数据源，添加多边形要素，作为源数据在地图上显示；
   
* Example:

    ```javascript
    var vectorSource = new ol.source.Vector();
    //创建一个多变形
    var polygon = new ol.Feature({
        geometry: new ol.geom.Polygon([[[0.46, 30.1], [11.48, 6.22], [36.73, 7.6],[58.77, 25.51],[41.33, 49.39]]])
    });
    //设置区样式信息
    polygon.setStyle(new ol.style.Style({
        //填充色
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.5)'
        }),
        //边线颜色
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        })
    }));
    vectorSource.addFeatures([polygon]);

        //创建一个图层
    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        zIndex:1
    });
    //将绘制层添加到地图容器中
    map.addLayer(vectorLayer);
    ```
**Step 2. <font color=red>构建MapGIS自定义的多边形要素对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建与上一步相同坐标的MapGIS自定义的`Zondy.Object.FeatureGeometry()`几何要素对象，同时构建该要素的属性结构及属性记录信息；
   
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
                new Zondy.Object.Point2D(41.33, 49.39),
                new Zondy.Object.Point2D(0.46, 30.1)
            ])
        ])
    ]);
    regGeo.setRegGeom([gReg]);
    //设置属性结构
    var regAttStr = new Zondy.Object.CAttStruct({
        FldName: ["ID", "面积", "周长", "LayerID"],
        FldNumber: 4,
        FldType: ["FldLong", "FldDouble", "FldDouble", "FldLong"]
    });
    //实例化CAttDataRow类
    var values = [0, 62.566714, 50.803211, 0];
    var valuesRow = new Zondy.Object.CAttDataRow(values, 1);
    ```


**Step 3. <font color=red>实现要素单圈缓冲分析</font>**:
&ensp;&ensp;&ensp;&ensp;创建要素单圈缓冲服务对象，设置相应的源几何要素、结果数据的URL及缓冲半径，并执行缓冲分析；
    
* Example:

    ```javascript
    //实例化FeatureBuffBySingleRing类，设置要素缓冲分析必要参数，输出分析结果到缓冲分析结果图层
    var featureBufBySR = new Zondy.Service.FeatureBuffBySingleRing({
        ip: "develop.smaryun.com",
        port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
        //设置要素缓冲分析左半径
        leftRad: 2,
        //设置要素缓冲分析右半径    
        rightRad: 2     
    });
    /*设置缓冲分析参数*/
    //设置几何信息
    featureBufBySR.sfGeometryXML = JSON.stringify([regGeo]); 
    //设置属性结构
    featureBufBySR.attStrctXML = JSON.stringify(regAttStr);
    //设置属性值
    featureBufBySR.attRowsXML = JSON.stringify([valuesRow]);
    //设置追踪半径
    featureBufBySR.traceRadius = 0.0001;
    //设置缓冲结果的名称以及存放地址
    var resultname = "singleBuffResultLayer" + getCurentTime();
    featureBufBySR.resultName = resultBaseUrl + resultname;
    //调用Zondy.Service.AnalysisBase基类的execute方法执行要素缓冲分析，AnalysisSuccess为回调函数。
    featureBufBySR.execute(AnalysisSuccess,"post",()=>{});
    ```

**Step 4. <font color=red>实现要素多圈缓冲分析</font>**:
&ensp;&ensp;&ensp;&ensp;创建要素多圈缓冲服务对象，设置相应的源几何要素包括几何信息、属性结构和属性记录、结果数据的URL及缓冲半径，并执行缓冲分析；
    
* Example:

    ```javascript
    //实例化FeatureBuffByMultiplyRing类，设置要素缓冲分析必要参数，输出分析结果到缓冲分析结果图层
    var featureBufByMR = new Zondy.Service.FeatureBuffByMultiplyRing({
        ip: "develop.smaryun.com",
        port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
        //设置多圈缓冲分析的缓冲半径字符串
        radiusStr: "2,4,6"		
    });
    featureBufByMR.sfGeometryXML = JSON.stringify([regGeo]);
    featureBufByMR.attStrctXML = JSON.stringify(regAttStr);
    featureBufByMR.attRowsXML = JSON.stringify([valuesRow]);
    featureBufByMR.traceRadius = 0.0001;

    var resultname = "multiBuffResultLayer" + getCurentTime();
    featureBufByMR.resultName = resultBaseUrl + resultname;
    //调用Zondy.Service.AnalysisBase基类的execute方法执行要素缓冲分析，AnalysisSuccess为回调函数。
    featureBufByMR.execute(AnalysisSuccess,"post",()=>{});
    ```

**Step 5. <font color=red>添加分析结果到地图中</font>**:
&ensp;&ensp;&ensp;&ensp;利用Step3和Step4的分析服务执行成功的回调函数中返回的结果数据名称，构建MapGIS的服务图层对象，添加到地图容器中进行显示；
    
* Example:

    ```javascript
    //分析成功后的回调
    function AnalysisSuccess(data) {
        if (!data.results) {
            alert("缓冲失败，请检查参数！");
        }
        else {
            if (data.results.length != 0) {
                var resultLayerUrl = data.results[0].Value || data.results[0].value;
                //将结果图层添加到地图视图中显示
                var resultLayer = new Zondy.Map.GdbpLayer("MapGIS IGS BuffAnalyResultLayer", [resultLayerUrl], {
                    ip: "develop.smaryun.com",
                    port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
                    isBaseLayer: false
                });
                map.addLayer(resultLayer);
                resultLayerArr.push(resultLayer);
            }
        }
    }
    ```


### 裁剪分析

&ensp;&ensp;&ensp;&ensp;裁剪分析，是指对已知图层所包含的内容和地理范围按照一定规则进行分割。当被裁剪图层所包含的要素处于裁剪范围的边界时，裁剪分析功能需要对要素的几何信息、属性信息按照一定的规则做取舍。当裁剪范围包含在被裁剪图层范围内时，需要对裁剪范围内外的要素做取舍。

&ensp;&ensp;&ensp;&ensp;提供几何要素裁剪和区图层裁剪分析功能服务接口ClipByCircle、ClipByPolygon、ClipByLayer。要素裁剪分析，以自定义要素的几何范围作为裁剪范围，调用接口ClipByCircle、ClipByPolygon，设置裁剪规则，并执行裁剪分析，便可得到裁剪分析结果。分析结果可以图层的形式展示到客户端。图层裁剪分析，以指定图层的范围作为裁剪范围，从而实现裁剪分析。二者本质相同。

&ensp;&ensp;&ensp;&ensp;**以图层裁剪分析为例**：实现针对简单要素类的图层裁剪分析(以图层中的要素作为裁剪框)。


<a href="http://develop.smaryun.com/#/demo/openlayers/IGServer/AnalysisService/E05PolygonOverLayAnalysis" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/802-LayerClipAnalysis.png" alt="图层裁剪分析" style="zoom:80%;" />
</a>



**Step 1. <font color=red>实现图层裁剪分析</font>**:
&ensp;&ensp;&ensp;&ensp;创建图层裁剪服务对象，设置被裁剪和裁剪框数据的 URL、结果数据的 URL，并执行裁剪分析；

- Example:

  ```javascript
  function clipByLayer() {
    var resultname = resultBaseUrl + 'clipByLayerAnalysisResultLayer' + getCurentTime()
    //实例化ClipByLayer类
    var clipParam = new Zondy.Service.ClipByLayer({
      ip: 'develop.smaryun.com',
      port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089,
      //源简单要素类的URL
      srcInfo1: 'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流',
      //裁剪框简单要素类的URL
      srcInfo2: 'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区',
      //设置结果URL
      desInfo: resultname,
    })
    //调用基类的execute方法，执行图层裁剪分析。AnalysisSuccess为结果回调函数
    clipParam.execute(AnalysisSuccess, 'post', () => {})
  }
  ```

**Step 2. <font color=red>添加分析结果到地图中</font>**:
&ensp;&ensp;&ensp;&ensp;利用 Step1 分析服务执行成功的回调函数中返回的结果数据名称，构建 MapGIS 的服务图层对象，添加到地图容器中进行显示。

- Example:

  ```javascript
  //分析成功后的回调
  function AnalysisSuccess(data) {
    if (!data.results) {
      alert('裁剪失败，请检查参数！')
    } else {
      if (data.results.length != 0) {
        var resultLayerUrl = data.results[0].Value || data.results[0].value
        //将结果图层添加到地图视图中显示
        var resultLayer = new Zondy.Map.GdbpLayer('MapGIS IGS BuffAnalyResultLayer', [resultBaseUrl + resultLayerUrl], {
          ip: 'develop.smaryun.com',
          port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089,
          isBaseLayer: false,
        })
        map.addLayer(resultLayer)
        resultLayerArr.push(resultLayer)
      }
    }
  }
  ```




### 叠加分析

&ensp;&ensp;&ensp;&ensp;叠加分析，是将两个图层（至少有一个区图层）按照运算法则进行叠加运算，分析得出所需结果。包括空间数据相交、相减、求并、对称差、判别差等多种叠加分析类型。不同要素类型的图层之间所能进行的叠加方式不是完全相同的，这个可以参考MapGIS帮助手册或相关的资料来判断分析的类型。

&ensp;&ensp;&ensp;&ensp;提供要素叠加分析接口OverlayByLayer和图层叠加分析类OverlayByPolygon。要素叠加分析，是指将自定义要素与指定图层中的要素进行叠加分析，叠加结果生成图层。图层叠加分析，是指两个图层中的要素进行叠加分析，基本原理与要素叠加分析相同，分析结果同样生成图层。

&ensp;&ensp;&ensp;&ensp;**以多边形叠加分析为例**：实现针对简单要素类的多边形叠加分析，即以几何多边形为叠加对象，简单要素类图层为被叠加对象，执行叠加分析的几何运算。

<a href="http://develop.smaryun.com/#/demo/openlayers/IGServer/AnalysisService/E05PolygonOverLayAnalysis" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/803-PolygonOverLayAnalysis.png" alt="多边形叠加分析" style="zoom:80%;" />
</a>


**Step 1. <font color=red>添加源几何(以该几何为叠加对象)</font>**:
&ensp;&ensp;&ensp;&ensp;创建矢量图层，和矢量数据源，添加几何多边形要素，作为源数据在地图上显示；
   
* Example:

    ```javascript
    var vectorSource = new ol.source.Vector();
    //创建一个多变形
    var polygon = new ol.Feature({
        geometry: new ol.geom.Polygon([[[0.46, 30.1], [11.48, 6.22], [36.73, 7.6],[58.77, 25.51],[41.33, 49.39]]])
    });
    //设置区样式信息
    polygon.setStyle(new ol.style.Style({
        //填充色
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0)'
        }),
        //边线颜色
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 1
        })
    }));
    vectorSource.addFeatures([polygon]);

        //创建一个图层
    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        zIndex:0
    });
    //将绘制层添加到地图容器中
    map.addLayer(vectorLayer);
    ```
**Step 2. <font color=red>构建MapGIS自定义的几何区对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建与上一步相同坐标的MapGIS自定义的`Zondy.Object.GRegion()`几何区对象，作为叠加对象；
   
* Example:

    ```javascript      
    //设置多边形的空间几何信息
    var gReg = new Zondy.Object.GRegion([
        new Zondy.Object.AnyLine([new Zondy.Object.Arc([
                new Zondy.Object.Point2D(0.46, 30.1),
                new Zondy.Object.Point2D(11.48, 6.22),
                new Zondy.Object.Point2D(36.73, 7.6),
                new Zondy.Object.Point2D(58.77, 25.51),
                new Zondy.Object.Point2D(41.33, 49.39),
                new Zondy.Object.Point2D(0.46, 30.1)
            ])
        ])
    ]);
    ```

**Step 3. <font color=red>实现多边形叠加分析</font>**:
&ensp;&ensp;&ensp;&ensp;创建多边形叠加分析服务对象，设置多边形做为叠加对象、简单要素类图层为被叠加的数据、结果数据的URL以及叠加分析的类型(本示例以相交运算为例)，并执行裁剪分析；
    
* Example:

    ```javascript
    //执行多边形叠加分析
    var overlayParam = new Zondy.Service.OverlayByPolygon({
        ip: "develop.smaryun.com",
        port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
        //设置被叠加图层URL 
        srcInfo1: "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区",
        //设置结果URL  		
        desInfo: resultname,
        //设置多边形坐标序列化对象 	
        strGRegionXML: JSON.stringify(gReg),
        //多边形字符串输入格式	 
        inFormat: "json",
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
    overlayParam.execute(AnalysisSuccess,"post",false,"json",()=>{});
    ```

**Step 4. <font color=red>添加分析结果到地图中</font>**:
&ensp;&ensp;&ensp;&ensp;利用Step3的分析服务执行成功的回调函数中返回的结果数据名称，构建MapGIS的服务图层对象，添加到地图容器中进行显示；
    
* Example:

    ```javascript
    //分析成功后的回调
    function AnalysisSuccess(data) {
        if (!data.results) {
            alert("叠加失败，请检查参数！");
        }
        else {
            if (data.results.length != 0) {
                var resultLayerUrl = data.results[0].Value || data.results[0].value;
                //将结果图层添加到地图视图中显示
                var resultLayer = new Zondy.Map.GdbpLayer("MapGIS IGS BuffAnalyResultLayer", [resultBaseUrl+resultLayerUrl], {
                    ip: "develop.smaryun.com",
                    port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
                    isBaseLayer: false
                });
                map.addLayer(resultLayer);
                resultLayerArr.push(resultLayer);
            }
        }
    }
    ```



## 网络分析（路径分析）

&ensp;&ensp;&ensp;&ensp;网络分析（路径分析），指基于具有方向性的网络类，考虑时间、花费、速度、坡度等因素，从而得到最佳路径的功能。路径分析功能通常要显示一个网络图层作为地理环境背景，并基于网络图层做路径分析。

&ensp;&ensp;&ensp;&ensp;提供路径分析功能服务接口NetAnalysis。支持用户和系统两种分析模式，和普通公路优先、高速公路优先、最少花费、最短路径、最短时间等多种分析类型。基于网络类数据设置感兴趣起始点、障碍点，以及其它必要信息，调用路径分析功能服务接口，可将获取到的最佳路径信息绘制到客户端以做展示。


<a href="http://develop.smaryun.com/#/demo/openlayers/IGServer/NetService/E01NetAnalysist" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/804-NetAnalysist.png" alt="路径分析" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;实现方法：首先实例化Zondy.Map.GdbpLayer对象构建道路图层；实例化ol.Feature对象在地图上标注起始点；实例化Zondy.Service.NetAnalysis构建路径分析服务，调用execute()方法进行路径分析，在成功回调函数中对结果进行处理，绘制路径在地图中。

**Step 1. <font color=red>添加道路交通网图层</font>**:
&ensp;&ensp;&ensp;&ensp;通过图层范围设定参考系以及图层中心点，创建地图对象，通过实例化`Zondy.Map.GdbpLayer`对象构建道路图层；

- Example:

  ```javascript
  var extent = [114.42204, 38, 114.57798, 38.092545]
  var projection = new ol.proj.Projection({ units: ol.proj.Units.DEGREES, extent: extent, code: 'EPSG:4326' })
  //初始化地图容器
  map = new ol.Map({
    target: 'mapCon',
    view: new ol.View({
      center: [114.5, 38.0359],
      zoom: 2,
      projection: projection,
    }),
  })

  //初始化矢量图层对象
  var vectorGDBLayer = new Zondy.Map.GdbpLayer('MapGIS IGS VectorLayer', ['gdbp://MapGisLocal/sample/ds/网络分析/ncls/道路交通网'], {
    //矢量图层地图服务器ip
    ip: 'develop.smaryun.com',
    //矢量图层地图服务端口
    port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
  })
  //将矢量图层加载到地图中
  map.addLayer(vectorGDBLayer)
  ```

**Step 2. <font color=red>添加起始点</font>**:
&ensp;&ensp;&ensp;&ensp;通过实例化`ol.Feature`对象构建路径起始点，并添加在地图中；

- Example：
  ```javascript
  startMarker = new ol.Feature({
    type: 'icon',
    geometry: new ol.geom.Point([114.44, 38.06]),
  })
  endMarker = new ol.Feature({
    type: 'icon',
    geometry: new ol.geom.Point([114.56, 38.03]),
  })
  var vector = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [startMarker, endMarker],
    }),
  })
  map.addLayer(vector)
  ```

**Step 3. <font color=red>进行路径分析</font>**:
&ensp;&ensp;&ensp;&ensp;通过实例化`Zondy.Service.NetAnalysis`对象构建路径分析服务，然后调用该服务`execute（）`方法开始路径分析；

- Example:
  ```javascript
  var netAnalyParam = new Zondy.Service.NetAnalysis({
    //矢量图层地图服务器ip
    ip: 'develop.smaryun.com',
    //矢量图层地图服务端口
    port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089,
    //设置网络类URL
    netClsUrl: 'gdbp://MapGisLocal/sample/ds/网络分析/ncls/道路交通网',
    //指定感兴趣路径点坐标序列
    flagPosStr: '114.44,38.06,114.56,38.03',
    //分析类型：用户自定义
    analyTp: 'UserMode',
    //设置网络类某些属性字段为权值字段
    weight: ',Weight1,Weight1',
    //网络类型：1/2:节点网标/线网标
    elementType: 2,
    //设置网标搜索半径
    nearDis: 0.01,
    //设置障碍点的坐标序列
    barrierPosStr: '',
    outFormat: 'JSON',
  })
  netAnalyParam.execute(AnalysisSuccess, 'POST', null, null, () => {})
  ```

**Step 4. <font color=red>路径分析结果处理</font>**:
&ensp;&ensp;&ensp;&ensp;遍历成功回调结果，获取点数组，在地图中绘制成线。

- Example：

  ```javascript
  //轨迹坐标点
  var dot
  //轨迹坐标数组
  var pathArr = new Array()
  if (data.results[0].Value == null) {
    return
  }
  //返回的分析结果数据
  var result = data.results[0].Value
  var resultObj = $.parseJSON(result)
  if (resultObj == null || resultObj.Paths == null) {
    return
  }
  //解析轨迹边坐标序列
  var pathObj = resultObj.Paths[0]
  var edgeNum = pathObj.Edges.length
  //添加经过纠偏的起点
  if (resultObj.inputDots == null) {
    return
  }
  if (resultObj.inputDots[0].pDot == null || resultObj.inputDots[1] == null || resultObj.inputDots[1].pDot == null) {
    return
  }
  //路径分析的真实起点，即经过纠偏之后，线上网标或者点上网标点
  dot = [resultObj.inputDots[0].pDot.x, resultObj.inputDots[0].pDot.y]
  //结果描述信息
  if (dot[0] == 114.49 && dot[1] == 38.05) {
    //添加起点到缓存数组
    pathArr.push(dot)
  } else {
    pathArr.push(dot)
  }
  //没有路径线信息时，用户直接步行到达指定地点
  if (edgeNum == 0) {
    //纠偏起点与纠偏终点的距离
    if (resultObj.inputDots[1].pDot.x != resultObj.inputDots[0].pDot.x || resultObj.inputDots[1].pDot.y != resultObj.inputDots[0].pDot.y) {
      dot = [resultObj.inputDots[1].pDot.x, resultObj.inputDots[1].pDot.y]
      pathArr.push(dot)
    }
    //纠偏终点与输入终点的距离
    if (resultObj.inputDots[1].pDot.x != 114.5 || resultObj.inputDots[1].pDot.y != 38.05) {
      dot = [114.5, 38.05]
      pathArr.push(dot)
    }
  } else if (edgeNum == 1) {
    //将路径线信息存储进缓存数组
    if (dot[0] != pathObj.Edges[0].Dots[0].x || dot[1] != pathObj.Edges[0].Dots[0].y) {
      dot = [pathObj.Edges[0].Dots[0].x, pathObj.Edges[0].Dots[0].y]
      pathArr.push(dot)
    }
    var dotLen = pathObj.Edges[0].Dots.length
    for (var m = 1; m < dotLen; m++) {
      dot = [pathObj.Edges[0].Dots[m].x, pathObj.Edges[0].Dots[m].y]
      pathArr.push(dot)
    } //for(j)
  } //else if (edgeNum == 1)
  else {
    //(edgeNum > 1)
    for (var i = 0; i < edgeNum - 1; i++) {
      var dotCount = pathObj.Edges[i].Dots.length
      for (var k = 0; k < dotCount; k++) {
        if (k == 0 && i == 0) {
          if (dot[0] != pathObj.Edges[0].Dots[0].x || dot[1] != pathObj.Edges[0].Dots[0].y) {
            dot = [pathObj.Edges[0].Dots[0].x, pathObj.Edges[0].Dots[0].y]
            pathArr.push(dot)
          }
        }
        dot = [pathObj.Edges[i].Dots[k].x, pathObj.Edges[i].Dots[k].y]
        pathArr.push(dot)
      } //for(j)
    } //for(i<edgeNum-1)
    //添加最后一条路径信息
    var dotCoun = pathObj.Edges[edgeNum - 1].Dots.length
    for (var n = 0; n < dotCoun; n++) {
      dot = [pathObj.Edges[edgeNum - 1].Dots[n].x, pathObj.Edges[edgeNum - 1].Dots[n].y]
      pathArr.push(dot)
    } //for(j)
  } //else(edgeNum>1)

  //添加经过纠偏的终点
  if (resultObj.inputDots[1].pDot.x != dot.x || resultObj.inputDots[1].pDot.y != dot.y) {
    dot = [resultObj.inputDots[1].pDot.x, resultObj.inputDots[1].pDot.y]
    pathArr.push(dot)
  }
  drawPath(pathArr)
  //绘制线
  function drawPath(pathArr) {
    var route = new ol.geom.LineString(pathArr)
    //获取直线的坐标
    var routeCoords = route.getCoordinates()

    var routeFeature = new ol.Feature({
      type: 'route',
      geometry: route,
    })

    vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [routeFeature],
      }),
      style: function(feature) {
        return styles[feature.get('type')]
      },
    })
    map.addLayer(vectorLayer)
  }
  ```