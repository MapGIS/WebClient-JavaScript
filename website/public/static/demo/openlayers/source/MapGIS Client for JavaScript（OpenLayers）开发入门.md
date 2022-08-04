
## 准备开发

### 数据准备
​		产品支持接入多种GIS服务标准。用户可使用已发布的GIS服务资源，或自行构建GIS服务器环境。本示例默认使用已发布的MapGIS云端GIS服务资源。

> 若需使用自己发布的GIS服务，请先构建GIS环境并发布服务，请前往<a href="http://www.smaryun.com/dev/service-space/resource?from=1#/node_id75" targer="_blank">司马云-开发世界-技术资源-基础平台产品资源</a>，查看MapGIS 云GIS服务器产品相关帮助文档，在此不再详述。

### 创建项目
 		本示例使用的以 Visual Studio Code（简称 VSCode）为例，介绍基于HTML5传统开发方式开发WebGIS应用过程。
 		自行指定目录并创建MapDisplay文件夹，作为 WebGIS 网站目录，通过VSCode打开此项目:

<center>
  <img src="./static/demo/openlayers/source/img/01.新建网站目录.png" alt="新建网站目录" style="zoom:80%;" />
  <br>
  <div class="notes">新建网站目录</div>
</center>
<br/>

### 获取开发库

#### 下载离线文件

&ensp; &ensp; &ensp; &ensp; 请登录司马云-云开发世界-产品开发包下载<a href="http://www.smaryun.com/dev/download_detail.html#/download828"> MapGIS Client for JavaScript 开发包</a>，或登录产品<a href="https://github.com/MapGIS/WebClient-JavaScript" targer="_blank">github</a>、<a href="https://gitee.com/osmapgis/WebClient-JavaScript" targer="_blank">gitee</a>开源仓库下载源码，自行编译、打包。解压后的离线资源包如下图：

<center>
<img src="./static/demo/openlayers/source/img/开发库.png" alt="MapGIS Client for JavaScript开发库" style="zoom:80%; " />
</center>

​			将开发库目录 libs 文件夹拷贝到项目中，如目录[..\static\libs]目录中，在新建的项目主入口文件中添加引入信息，如在项目主入口HTML页面的 <head> 标签中引入 MapGIS Client for JavaScript（MapboxGL）的开发库：

- Example:

```javascript
<script src="libs/include-openLayers-local.js"> </script>
```

> 离线版本的核心原理就是根据 include=""中的名字，在当前 cdn 文件夹下寻找对应的 js 的脚本并按照规定的顺序引入到浏览器中
> “include-\*.js 通过 include="xxx"的方式自动寻找引入对应的第三方脚本”



## 创建一幅地图

​		本示例以MapGIS官方云端（develop.smaryun.com）已经发布的名称为“北京市”（或“SampleDoc”）的MapGIS地图文档服务为例，介绍创建一幅地图全过程。

​		（1）在上述新建的网站中，通过新建文件方式，创建一个名称为“MapDocDisplay”的html网页文件，可通过自定义模板快速创建网页结构内容；

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

​		（2）设置示例标题，在该页面引入OpenLayers5开发的必要脚本库include-openlayers-local.js，此脚本库会动态引入核心库webclient-openlayers-plugin.min.js与相关第三方库、样式文件等；

<center>
  <img src="./static/demo/openlayers/source/img/04.引用开发库.png" alt="引用开发库" style="zoom:80%;" />
  <br>
  <div class="notes">引用开发库</div>
</center>
<br/>


​		（3） 创建一个ID为“mapCon”的div层，并设置其样式，用来作为显示矢量地图文档的地图容器;

<center>
  <img src="./static/demo/openlayers/source/img/05.创建div层并设置样式.png" alt="创建div层并设置样式" style="zoom:80%;" />
  <br>
  <div class="notes">创建div层并设置样式</div>
</center>
<br/>

​		（4）通过body的onload事件触发调用矢量地图文档显示的脚本函数init()；

<center>
  <img src="./static/demo/openlayers/source/img/06. body的onload事件.png" alt="body的onload事件" style="zoom:80%;" />
  <br>
  <div class="notes">body的onload事件</div>
</center>
<br/>

​		（5）在该页面中嵌入JavaScript代码，实现矢量地图文档显示的脚本函数init()，即初始化ol.Map与Zondy.Map.MapDocTileLayer类，通过设置Map对象的设置初始化地图的中心点、显示级别，再通过Map对象的addLayer方法加载矢量地图文档;

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


（6）运行调试

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



## 地图控件

&ensp;&ensp;&ensp;&ensp;常用地图控件，包括导航控件、复位控件、鼠标位置控件、比例尺控件、鹰眼控件等。

| 地图控件 |  类名          |     API说明    |
| ------- | -------------- |----------------|
| 导航控件| ol.control.Zoom | 地图缩放功能，默认位于地图左上角 |
| 复位控件| ol.control.ZoomToExtent | 地图复位功能，默认位于地图左上角 |
| 鼠标位置|  ol.control.MousePosition | 显示鼠标位置，默认位于地图左下角 |
| 比例尺| 	ol.control.ScaleLine  | 地图比例尺，默认位于地图左下角 |
| 鹰眼 | 	ol.control.OverviewMap  | 鹰眼，默认位于地图右下角 |
<center>
<a href="http://develop.smaryun.com/#/demo/openlayers/Base/MapControl/E01Navigation" target="_blank">
 <img src="./static/demo/openlayers/source/img/dev/100-地图控件.png" alt="地图控件" style="zoom:80%;" />
</a>
</center>

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
