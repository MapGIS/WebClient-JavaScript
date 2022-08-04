## 准备开发

### 数据准备
​		产品支持接入多种GIS服务标准。用户可使用已发布的GIS服务资源，或自行构建GIS服务器环境。本示例默认使用已发布的MapGIS云端GIS服务资源。

> 若需使用自己发布的GIS服务，请先构建GIS环境并发布服务，请前往司马云-开发世界-技术资源-基础平台产品资源，查看<a href="http://www.smaryun.com/dev/service-space/resource?from=1#/node_id75" targer="_blank">MapGIS 云GIS服务器产品</a>相关帮助文档，在此不再详述。
> 涉及相关的三维模型制作、M3D模型缓存生成等三维数据处理内容，请前往司马云-开发世界-技术资源-基础平台产品资源，查看<a href="http://www.smaryun.com/dev/service-space/resource?from=1#/node_id16" targer="_blank">桌面GIS产品</a>相关帮助文档，在此不再详述。

### 创建项目
 		本示例以 Visual Studio Code（简称 VSCode）为例，介绍染色体HTML5方式开发WebGIS三维应用全流程。
 		自行选择目录并创建SceneDisplay文件夹，作为 WebGIS 网站根目录，通过VSCode打开此目录:

<center>
 <img src="./static/demo/cesium/source/img/01.新建网站目录.png" alt="新建网站目录" style="zoom:80%;" />
  <br>
  <div class="notes">新建网站目录</div>
</center>

<br/>

### 获取开发库

#### 离线文件引入

&ensp; &ensp; &ensp; &ensp; 请登录司马云-云开发世界-产品开发包下载<a href="http://www.smaryun.com/dev/download_detail.html#/download828"> MapGIS Client for JavaScript 开发包</a>，或登录产品<a href="https://github.com/MapGIS/WebClient-JavaScript" targer="_blank">github</a>、<a href="https://gitee.com/osmapgis/WebClient-JavaScript" targer="_blank">gitee</a>开源仓库下载源码后自行编译、打包，生成本地SDK资源。本示例以下载的离线SDK资源包方式引入，解压后的离线SDK资源包如下图：

<center>
<img src="./static/demo/cesium/source/img/开发库.png" alt="MapGIS Client for JavaScript开发库" style="zoom:80%;" />
</center>

将开发库目录 libs 文件夹拷贝到项目中，如目录[..\static\libs]目录中，在新建的项目主入口文件中添加引入信息，如在项目主入口HTML页面的 <head> 标签中引入 MapGIS Client for JavaScript（MapboxGL）的开发库：

- Example:

```javascript
<script src="libs/include-cesium-local.js"></script>
```

> 离线版本的核心原理就是根据 include=""中的名字，在当前 cdn 文件夹下寻找对应的 js 的脚本并按照规定的顺序引入到浏览器中
> “include-\*.js 通过 include="xxx"的方式自动寻找引入对应的第三方脚本”


#### npm安装引入

&ensp;&ensp;&ensp;&ensp;使用此方式前请先检查电脑中是否已安装应用程序 <a href="https://nodejs.org/en/">Node.js</a>，若未安装，需要先安装<a href="https://nodejs.org/en/">Node.js</a>环境。 

&ensp;&ensp;&ensp;&ensp;在VSCode“终端”中输入如下命令安装资源包。

- Example:

  ```javascript
  npm install @mapgis/cesium
  ```

&ensp;&ensp;&ensp;&ensp;通过 npm 指令安装 MapGIS Client for JavaScript 开发包，在新建的项目主入口文件中添加引入信息。


## 加载M3D模型数据

本示例使用MapGIS官方云端（develop.smaryun.com）已经发布的名称为“DaYanTa”的M3D数据服务为例，介绍加载M3D模型数据全过程。

> 本示例使用的开发集成工具为 Visual Studio Code（简称VSCode），您可以根据开发习惯选择适合自己的开发工具

(1) 在上述新建的网站中，通过新建文件方式，创建一个名称为“SceneM3DDisplay”的html网页文件，可通过自定义模板快速创建网页结构内容；

<center>
  <img src="./static/demo/cesium/source/img/03.新建HTML页面（空）.png" alt="新建HTML页面（空）" style="zoom:80%;" />
  <br>
  <div class="notes">新建HTML页面（空）</div>
</center>
<br/>

<center>
  <img src="./static/demo/cesium/source/img/03.新建HTML页面（模板）.png" alt="新建HTML页面（模板）" style="zoom:80%;" />
  <br>
  <div class="notes">新建HTML页面（模板）</div>
</center>
<br/>

(2) 设置示例标题，在该页面引入for WebGL开发的必要脚本库include-cesium-local.js，此脚本库会动态引入核心库webclient-cesium-plugin.min.js等与相关第三方库、样式文件等

<center>
  <img src="./static/demo/cesium/source/img/04.引用开发库.png" alt="引用开发库" style="zoom:80%;" />
  <br>
  <div class="notes">引用开发库</div>
</center>
<br/>


(3) 创建一个ID为“GlobeView”的div层，并设置其样式，用来作为显示矢量地图文档的地图容器;

<center>
  <img src="./static/demo/cesium/source/img/05.创建div层并设置样式.png" alt="创建div层并设置样式" style="zoom:80%;" />
  <br>
  <div class="notes">创建div层并设置样式</div>
</center>
<br/>

(4) 通过body的onload事件触发调用M3D模型缓存数据显示的脚本函数init()；

<center>
  <img src="./static/demo/cesium/source/img/06. body的onload事件.png" alt="body的onload事件" style="zoom:80%;" />
  <br>
  <div class="notes">body的onload事件</div>
</center>
<br/>

(5) 在该页面中嵌入JavaScript代码，实现加载M3D缓存模型的脚本函数init()，即初始化三维场景视图Cesium.WebSceneControl类，然后构造M3D模型层管理对象CesiumZondy.Layer.M3DLayer类对象，再通过此图层对象的append()方法加载三维地图文档，并自动跳转到数据位置；

> 注意：通常情况下，功能实现的JavaScript代码可以单独放置到一个JS文件中，便于维护

<center>
  <img src="./static/demo/cesium/source/img/07.加载M3D缓存模型的脚本函数.png" alt="加载M3D缓存模型的脚本函数init" style="zoom:80%;" />
  <br>
  <div class="notes">加载M3D缓存模型的脚本函数init()</div>
</center>

- Example:

  ```javascript
        //在JS脚本开发中使用严格模式，及时捕获一些可能导致编程错误的ECMAScript行为
        'use strict';
        //定义三维场景控件对象
        var webGlobe;
        //定义M3D图层对象
        var obliqueLayerArr;
        //加载三维场景
        function init() {
            //构造三维视图对象（视图容器div的id，三维视图设置参数） 
            webGlobe = new Cesium.WebSceneControl('GlobeView', {});

            //构造M3D模型层管理对象（视图）
            var m3dLayer = new CesiumZondy.Layer.M3DLayer({
                viewer: webGlobe.viewer
            });
            //加载M3D地图文档（服务地址，配置参数）
            obliqueLayerArr = m3dLayer.append(
                `http://develop.smaryun.com:6163/igs/rest/g3d/DaYanTa`, 
                {
                    autoReset: true //允许自动定位
                }
            );
        }
  ```

&ensp;&ensp;&ensp;&ensp;实现M3D模型缓存的加载显示过程如下：

&ensp;&ensp;&ensp;&ensp;（1）首先需要创建三维场景视图对象。三维场景控件构造函数如下：

&ensp;&ensp;&ensp;&ensp;**WebSceneControl(elementId, options)**

&ensp;&ensp;&ensp;&ensp;*参数说明：*

-	elementId：（ string类型）可选项，三维视图容器div的id。
-	options：（Object类型）可选项，MapGIS三维场景初始化相关参数，以键值对的形式设置，主要参数如下：

| 参数名 |	类 型 |	默认值 |	说 明 |
| ------ | ------|------|------|
|viewerMode	|String	|‘3D’	|（可选）初始视图模式默认为三维球视图 '2D’表示二维视图 ‘COLUMBUS_VIEW’ 表示三维平面视图|
|showInfo	|Boolean|	false	|（可选）是否显示默认的属性信息框
|animation|	Boolean| true|	（可选）默认动画控制不显示|
|baseLayerPicker|	Boolean|	true|	（可选）是否创建图层控制显示小组件|
|fullscreenButton	|Boolean	|true	|（可选）是否创建全屏控制按钮|
|vrButton	|Boolean|	false	|（可选）是否创建VR按钮|

&ensp;&ensp;&ensp;&ensp;（2）然后构造M3D模型层管理类CesiumZondy.Layer.M3DLayer对象，通过其append()方法加载显示M3D模型缓存数据。

&ensp;&ensp;&ensp;&ensp;**append(url, options)**

&ensp;&ensp;&ensp;&ensp;*参数说明：*
- url：（string类型）必选项，M3D地图文档服务的地址。
- options：（object类型）可选项，附加的其他属性，以键值对的形式设置，主要属性参数如下：
  
| 参数名 |	类 型 |	默认值 |	说 明 |
| ------ | ------|------|------|
|autoReset	|Boolean	|true	|（可选）是否自动定位|
|synchronous|	Boolean |true	|（可选）是否异步请求|
|loaded|	Boolean|	function|	（可选）回调函数|
|proxy	|DefaultProxy	|defaultProxy	|（可选）代理|
|showBoundingVolume|	Boolean	|false|	（可选）是否显示包围盒|
|maximumScreenSpaceError|	Number|	16|	（可选）用于控制模型显示细节，值较大将会渲染更少的贴图，进而可以提高性能，而较低的值将提高视觉质量|


> 相关接口的详细说明请查看MapGIS 3DClient for WebGL、MapGIS扩展cesium库、原生cesium库的API说明

（6）运行调试

&ensp;&ensp;&ensp;&ensp;VSCode是一个非常流行的Web前端开发IDE，在编写Web网站时一般需要发布后编译运行，也可安装相关插件调试运行。

&ensp;&ensp;&ensp;&ensp;在此，可先将“SceneDisplay”站点发布，然后通过浏览器查看与调试。例如：在IIS中发布站点后，右键“浏览”选中的“SceneM3DDisplay.html”文件，即可在浏览器中查看，并进行前端调试。

<center>
  <img src="./static/demo/cesium/source/img/08.在IIS中浏览网页.png" alt="在IIS中浏览网页" style="zoom:80%;" />
  <br>
  <div class="notes">在IIS中浏览网页</div>
</center>
<br/>
<center>
  <img src="./static/demo/cesium/source/img/09.M3D缓存模型显示效果图.png" alt="M3D缓存模型显示效果图" style="zoom:80%;" />
  <br>
  <div class="notes">M3D缓存模型显示效果图</div>
</center>
<br/>
&ensp;&ensp;&ensp;&ensp;需要调试时，可以利用浏览器的开发者工具进行测试，例如IE 11+、Chrome 45+等，推荐使用Chrome浏览器。打开浏览器的开发者工具，在代码行前端设置断点，然后在浏览器中重新运行示例页面，程序将会运行进入到代码断点处，方便查看相关信息。