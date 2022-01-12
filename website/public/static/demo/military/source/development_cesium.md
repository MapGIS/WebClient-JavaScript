
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

&ensp;&ensp;&ensp;&ensp;新建一个 HTML 文件，在 <head> 标签中引入 MapGIS Client for JavaScript（Cesium）的开发库：

- Example:

  ```javascript
  <script src="libs/include-cesium-local.js"></script>
  ```

<img src="./static/demo/cesium/source/img/开发库.png" alt="MapGIS Client for JavaScript开发库" style="zoom:80%;" />

#### npm 方式引用

&ensp;&ensp;&ensp;&ensp;使用此方式前请先检查电脑中是否已安装应用程序 <a href="https://nodejs.org/en/">Node.js</a>，若未安装，需要先安装<a href="https://nodejs.org/en/">Node.js</a>环境。

&ensp;&ensp;&ensp;&ensp;由于本公司在开源的 cesium 地图引擎上做了一定修改，所以在引入 cesium 地图引擎时需要通过以下 npm 指令引入。

- Example:

  ```javascript
  npm install @mapgis/cesium
  ```

&ensp;&ensp;&ensp;&ensp;通过 npm 指令引入 MapGIS Client for JavaScript 开发包。


## 开始开发

&ensp;&ensp;&ensp;&ensp;先根据“开发环境”要求安装配置好MapGIS开发环境（含MapGIS云开发授权），然后获取MapGIS Client for JavaScript（Cesium）SDK进行二次开发。

&ensp;&ensp;&ensp;&ensp;下面使用H5原生JS方式，演示如何在网页中加载显示一个M3D缓存模型数据（大雁塔）。

### 数据准备

&ensp;&ensp;&ensp;&ensp;本示例使用MapGIS官方云端（develop.smaryun.com）已经发布的名称为“DaYanTa”的M3D数据服务进行演示。若您需要显示自己的数据，需要在开发前进行数据处理，如创建/附加地理数据库、导入数据、生成M3D缓存数据等，最后通过**MapGIS Server Manager**配置GIS服务环境并发布三维地图服务。

<center>
  <img src="./static/demo/cesium/source/img/MapGIS发布服务.png" alt="MapGIS服务发布" style="zoom:80%;" />
  <br>
  <div class="notes">MapGIS Server Manager发布服务</div>
</center>
<br/>

> 基于MapGIS Server Manager发布地图服务的具体操作，请查看**MapGIS IGServer操作手册**（<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag206/page1/doc770" target="_blank">.NET版</a>，<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag212/page1/doc823" target="_blank">九州版</a>）

### 开发入门：加载M3D模型数据

> 本示例使用的开发集成工具为 Visual Studio Code（简称VSCode），您可以根据开发习惯选择适合自己的开发工具

#### Step 1. 新建Web网站

&ensp;&ensp;&ensp;&ensp;在VSCode或本地磁盘中新建一个文件目录作为Web网站目录，名称为SceneDisplay；

<center>
  <img src="./static/demo/cesium/source/img/01.新建网站目录.png" alt="新建网站目录" style="zoom:80%;" />
  <br>
  <div class="notes">新建网站目录</div>
</center>
<br/>

#### Step 2. 引入JavaScript开发库（离线方式）

&ensp;&ensp;&ensp;&ensp;在新建的Web网站（文件目录）中，拷贝MapGIS Client for JavaScript开发库到网站根目录下，即将SDK包路径MapGIS Client for JavaScript_V10.5.X.X\static\libs的libs拷贝到“SceneDisplay”目录下。此libs包含了全部的开发库（js与css文件），可选择只拷贝cesium的库。

<center>
  <img src="./static/demo/cesium/source/img/02.引用脚本库资源.png" alt="引入脚本库资源" style="zoom:80%;" />
  <br>
  <div class="notes">引入脚本库资源</div>
</center>
<br/>

#### Step 3. 加载显示M3D模型

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

#### Step 4. 运行调试

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
&ensp;&ensp;&ensp;&ensp;需要调试时，可以利用浏览器的开发者工具进行测试，例如IE、Firefox、Chrome等。打开浏览器的开发者工具，在代码行前端设置断点，然后在浏览器中重新运行示例页面，程序将会运行进入到代码断点处，方便查看相关信息。


## 服务发布

&ensp;&ensp;&ensp;&ensp;开发前，基于应用的具体需求，可根据开发中采用的出图方式（地图类型）组织制作二维地图（矢量地图文档或瓦片地图），或者三维地图（三维地图文档，M3D缓存等）。通过GIS服务管理器（MapGIS Server Manager）页面左侧的“地图与数据服务”页面，可以发布和查看所发布的地图服务，可以提供地图数据的预览，查看信息，状态控制，删除等操作。

### 二维地图发布

&ensp;&ensp;&ensp;&ensp;在此以发布地图文档（REST模式）为例，发布单个地图文档的配置操作如下：
在MapGIS Server Manager页面左侧导航栏中的“地图与数据服务”中，单击“发布服务”，在下拉菜单中选择“文档发布（包括WMS/WFS/WMTS）”选项。页面跳转至发布服务配置页面。
 
<center>
  <img src="./static/demo/cesium/source/img/MapGIS发布服务.png" alt="MapGIS服务发布" style="zoom:80%;" />
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

2. 发布地图文档：在服务器磁盘中找到需要发布的mapx地图文档并添加之后，点击“发布”按钮，即可发布二维地图文档为MapGIS Rest地图服务格式;
3. 获取地图服务的基地址与相关信息，用于Web应用开发。

### 三维地图发布（M3D缓存）

&ensp;&ensp;&ensp;&ensp;在此以MapGIS Desktop自带的三维模型数据（景观_建筑模型）为例，说明配置三维模型地图文档操作步骤。

#### 生成M3D缓存

1. 打开MapGIS Desktop，新建一个空场景；

<center>
  <img src="./static/demo/cesium/source/img/dev/001-新建空场景.png" alt="新建空场景" style="zoom:80%;" />
  <br>
  <div class="notes">新建空场景</div>
</center>
<br/>

2. 在新场景中添加示例数据库（Sample）中的景观_建筑模型，即鼠标右击【新场景1】，通过【添加图层】->【添加模型层】进行操作；

<center>
  <img src="./static/demo/cesium/source/img/dev/002-添加模型层.png" alt="添加模型层" style="zoom:70%;" />
  <br>
  <div class="notes">添加模型层</div>
</center>
<br/>

<center>
  <img src="./static/demo/cesium/source/img/dev/003-选择模型数据.png" alt="选择模型数据" style="zoom:70%;" />
  <br>
  <div class="notes">选择模型数据</div>
</center>
<br/>

<center>
  <img src="./static/demo/cesium/source/img/dev/004-显示模型.png" alt="显示模型" style="zoom:70%;" />
  <br>
  <div class="notes">显示模型</div>
</center>
<br/>

3. 将已添加的模型数据生成M3D缓存；

   - (1) 右击【景观_建筑模型】，选择【属性】，在属性页面设置渲染方式为分块渲染，然后点击【应用】，关闭属性页面；
  
<center>
  <img src="./static/demo/cesium/source/img/dev/005-选择模型属性.png" alt="选择模型属性" style="zoom:70%;" />
  <br>
  <div class="notes">选择模型属性</div>
</center>
<br/>

<center>
  <img src="./static/demo/cesium/source/img/dev/006-设置渲染方式.png" alt="设置渲染方式" style="zoom:70%;" />
  <br>
  <div class="notes">设置渲染方式</div>
</center>
<br/>

   - (2) 在新场景节点上，点击【生成缓存】->【生成M3D缓存】；

<center>
  <img src="./static/demo/cesium/source/img/dev/007-生成M3D缓存.png" alt="生成M3D缓存" style="zoom:80%;" />
  <br>
  <div class="notes">生成M3D缓存</div>
</center>
<br/>

   - (3) 配置M3D缓存参数，可设置缓存存储目录、LOD级别等，详细参数说明请查看，此处以默认参数为例；

<center>
  <img src="./static/demo/cesium/source/img/dev/008-配置M3D缓存参数.png" alt="配置M3D缓存参数" style="zoom:70%;" />
  <br>
  <div class="notes">配置M3D缓存参数</div>
</center>
<br/>

   - (4) 设置相关参数后，先点击【预计算】，然后再点击【生成】，即开始生成M3D缓存，成功操作后将生成M3D缓存文件；

4. 生成M3D缓存成功后，关闭【生成缓存】对话框，并移除场景中的景观_建筑模型图层(为提交三维场景渲染效率，移除场景中原模型图层)；

<center>
  <img src="./static/demo/cesium/source/img/dev/009-移除图层.png" alt="移除图层" style="zoom:80%;" />
  <br>
  <div class="notes">移除图层</div>
</center>
<br/>

5. 将生成的M3D缓存添加到三维场景中：右击【新场景1】，选择【添加模型缓存图层】，选择生成的.mcj文件；

<center>
  <img src="./static/demo/cesium/source/img/dev/010-添加模型缓存图层.png" alt="添加模型缓存图层" style="zoom:80%;" />
  <br>
  <div class="notes">添加模型缓存图层</div>
</center>
<br/>

<center>
  <img src="./static/demo/cesium/source/img/dev/011-选择M3D缓存文件.png" alt="选择M3D缓存文件" style="zoom:80%;" />
  <br>
  <div class="notes">选择M3D缓存文件</div>
</center>
<br/>

<center>
  <img src="./static/demo/cesium/source/img/dev/012-M3D缓存显示效果.png" alt="M3D缓存显示效果" style="zoom:70%;" />
  <br>
  <div class="notes">M3D缓存显示效果</div>
</center>
<br/>


6. 在场景中添加了M3D缓存后，将其保存为三维地图文档（.mapx）。

<center>
  <img src="./static/demo/cesium/source/img/dev/013-保存三维地图文档.png" alt="保存三维地图文档" style="zoom:70%;" />
  <br>
  <div class="notes">保存三维地图文档</div>
</center>
<br/>

#### 发布M3D地图文档

1. 登录进入MapGIS Server Manager管理界面，如MapGIS IGServer .NET的访问地址为【http://localhost:9999/】，用户名与密码默认为【admin/sa.mapgis】；

<center>
  <img src="./static/demo/cesium/source/img/dev/014-登录MapGIS Server Manager.png" alt="登录MapGIS Server Manager" style="zoom:80%;" />
  <br>
  <div class="notes">登录MapGIS Server Manager</div>
</center>
<br/>

2.	发布三维地图文档，选择【地图与数据服务】->【发布服务】->【三维服务发布】选择保存的地图文档；

<center>
  <img src="./static/demo/cesium/source/img/dev/015-发布三维地图文档.png" alt="发布三维地图文档" style="zoom:80%;" />
  <br>
  <div class="notes">发布三维地图文档</div>
</center>
<br/>

3.	获取发布之后的三维地图访问基地址，在应用中需要用到。

<center>
  <img src="./static/demo/cesium/source/img/dev/016-获取三维地图访问基地址.png" alt="获取三维地图访问基地址" style="zoom:80%;" />
  <br>
  <div class="notes">获取三维地图访问基地址</div>
</center>
<br/>

<center>
  <img src="./static/demo/cesium/source/img/dev/017-复制基地址.png" alt="复制基地址" style="zoom:80%;" />
  <br>
  <div class="notes">复制基地址</div>
</center>
<br/>



## 第三方地图

&ensp;&ensp;&ensp;&ensp;第三方地图，主要指的就是互联网上涌现的大量地图服务资源，提供免费开放的基础地图服务，一般均为瓦片地图形式，常在应用中作为底图直接调用。网络上主流的公共地图服务包括百度地图、高德地图、天地图、OpenWeather地图等。这些免费的在线地图服务资源，吸引了众多用户，不仅方便了广大开发者使用在线地图开发丰富的地图应用，扩宽互联网地图应用范围，挖掘GIS的潜在价值；同时也让更多人了解电子地图、了解互联网GIS，享受互联网GIS带来的便利和乐趣。

&ensp;&ensp;&ensp;&ensp; 支持第三方公共互联网地图，如百度地图、天地图、高德地图、OpenWeather地图等，通过CesiumZondy.Layer.ThirdPartyLayer类下的方法加载各类地图。

| 地图类型 |  类名/方法名          |     API说明    |
| ------- | -------------- |----------------|
| 天地图 | appendTDTuMap() / appendTDTuMapByWMTS()|  天地图，具体类型包括矢量、影像、地形，坐标系为 EPSG:4326，即 WGS-84 经纬度 ，访问需要token |
| 百度地图 |  appendBaiduMap() | 百度地图，类型包括矢量、影像|
| 高德地图 |  appendGaodeMap() | 高德地图，Web 墨卡托坐标系，EPSG:3857 |
| OpenWeather地图  | appendOpenWeatherMap() | OpenStreetMap地图 ，天气预报云图服务|

### 天地图

<a href="http://develop.smaryun.com/#/demo/cesium/third/third-tianditu" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1011-天地图.png" alt="天地图" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp; 具体实现：创建第三方数据图层类`CesiumZondy.Layer.ThirdPartyLayer`的对象，调用`appendTDTuMap()`方法，需配置 url 或 type（二选一设置即可）、token 参数，可实现矢量、影像、地形数据的加载。

（1） url 地址：可参考提供的 URL 示例

- 天地图经纬度数据：http://t0.tianditu.com/DataServer?T=vec_c&X={x}&Y={y}&L={l}

- 30 米全球地表覆盖数据服务：http://glcdata.tianditu.com/DataServer?T=glc_c&X={x}&Y={y}&L={l}

（2） token：请前往天地图官网申请自己的开发 token，示例自带 token 仅做功能演示；

（3） type 类型：可传入'vec'、'img'、'ter'等，分别代表矢量、影像、地形地图，具体请查看天地图官网。

- Example:
  ```javascript
  //构造第三方图层对象
  var thirdPartyLayer = new CesiumZondy.Layer.ThirdPartyLayer({
    viewer: webGlobe.viewer,
  })
  //加载天地图
  var tdtLayer = thirdPartyLayer.appendTDTuMap({
    //天地图经纬度数据url,注意url与ptype设置其中一个即可
    //url: 'http://t0.tianditu.com/DataServer?T=vec_c&X={x}&Y={y}&L={l}',
    //开发token （请到天地图官网申请自己的开发token，自带token仅做功能验证随时可能失效）
    token: '9c157e9585486c02edf817d2ecbc7752',
    //地图类型，如'vec'矢量 'img'影像 'ter'地形
    ptype: 'vec',
  })
  ```

- Example:
  ```javascript
  //构造第三方图层对象
  var thirdPartyLayer = new CesiumZondy.Layer.ThirdPartyLayer({
    viewer: webGlobe.viewer,
  })
  //通过WMTS服务方式加载天地图：如影像'img'、地形'ter'、 注记'cta'，具体请查看天地图官网:
  var tdtLayer = thirdPartyLayer.appendTDTuMapByWMTS({
    ptype: 'img',
  })
  ```


### 百度地图

<a href="http://develop.smaryun.com/#/demo/cesium/third/third-baidu" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1012-百度地图.png" alt="百度地图" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：创建第三方数据图层类`CesiumZondy.Layer.ThirdPartyLayer`的对象，调用`appendBaiduMap()`方法，配置不同参数可加载不同类型地图，包括：瓦片（ptype:'tile'）、卫星（ptype:'sate'）和交通地图（ptype:'traffic'）。

- Example:
  ```javascript
  //构造第三方图层对象
  var thirdPartyLayer = new CesiumZondy.Layer.ThirdPartyLayer({
    viewer: webGlobe.viewer,
  })
  //添加百度地图
  var baiduLayer = thirdPartyLayer.appendBaiduMap({
    //地图类型：瓦片：'tile'、卫星：'sate'、交通地图：'traffic'
    ptype: 'tile',
  })
  ```


### 高德地图

<a href="http://develop.smaryun.com/#/demo/cesium/third/third-amap" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1013-高德地图.png" alt="高德地图" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：创建第三方数据图层类`CesiumZondy.Layer.ThirdPartyLayer`的对象，调用`appendGaodeMap()`方法加载高德地图，配置不同参数可加载不同类型地图，如矢量：'vec'、影像：'img'、道路：'road'。

- Example:
  ```javascript
  //构造第三方图层对象
  var thirdPartyLayer = new CesiumZondy.Layer.ThirdPartyLayer({
    viewer: webGlobe.viewer,
  })
  //加载高德地图
  var amapLayer = thirdPartyLayer.appendGaodeMap({
    //地图类型：矢量：'vec'、影像：'img'、道路：'road'
    ptype: 'vec',
  })
  ```

### OpenWeather地图 

<a href="http://develop.smaryun.com/#/demo/cesium/third/third-openweather" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1014-OpenWeather地图.png" alt="OpenWeather地图" style="zoom:80%;" />
</a>

- Example:
  ```javascript
  //构造第三方图层对象
  var thirdPartyLayer = new CesiumZondy.Layer.ThirdPartyLayer({
    viewer: webGlobe.viewer,
  })
  //加载OpenWeather地图
  var owLayer = thirdPartyLayer.appendOpenWeatherMap({
    ptype: 'Label',
    appid: 'b1b15e88fa797225412429c150c122a1',
  })
  ```


## M3D图层


> M3D是针对多端应用的轻量级三维数据交换格式，对海量三维数据进行网格划分与分层组织，采用流式传输模式，实现多端一体的高效解析和渲染。具备高效网络传输模式、多级LOD模型支持、WebGL无缝融合等优点。可以将多样类型、多种格式的三维数据通过M3D数据交换格式进行高效解析并渲染，能够支持的数据类型包括：精细模型（景观模型、BIM模型）、实景三维（倾斜摄影、地质体、管线）、点云（激光点云las等）、其他（栅格、地形、矢量、瓦片）等。


&ensp;&ensp;&ensp;&ensp;在三维场景中支持加载M3D缓存数据，对接MapGIS IGServer发布的三维地图服务，数据类型包括景观模型、BIM模型、倾斜摄影、地质体模型等。

&ensp;&ensp;&ensp;&ensp;数据准备：针对M3D缓存数据的加载，需要进行数据的处理与发布，即先通过MapGIS Desktop桌面工具将三维模型数据生成M3D缓存，并组织为地图文档；再在MapGIS Server Manager服务管理器中根据地图文档发布为三维地图服务。

&ensp;&ensp;&ensp;&ensp;具体实现：构造`CesiumZondy.Layer.M3DLayer`M3D图层管理对象，调用`append()`方法，传入M3D缓存三维地图服务的URL地址即可加载浏览数据，同时可传入相关配置参数。

&ensp;&ensp;&ensp;&ensp;**以加载M3D的景观模型为例**：

<a href="http://develop.smaryun.com/#/demo/cesium/m3d/m3d-landscape" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1021-M3D景观模型.png" alt="M3D图层" style="zoom:80%;" />
</a>

* Example:
   ``` javascript
   //构造M3D模型层管理对象（视图）
   var m3dLayer = new CesiumZondy.Layer.M3DLayer({
      viewer: webGlobe.viewer
   });
   //加载M3D地图文档（服务地址，配置参数）
   var landscapeLayer = m3dLayer.append('http://develop.smaryun.com:6163/igs/rest/g3d/ZondyModels', {
      //是否自动定位到数据位置
      autoReset: false,
      //模型细节显示控制参数：较大值可提高渲染性能，较低值可提高视觉质量
      maximumScreenSpaceError: 8
   });
   ```


## 地图服务

&ensp;&ensp;&ensp;&ensp;全面支持MapGIS地图服务数据加载，包括基于二维矢量数据、瓦片数据发布的二维矢量与瓦片服务；栅格影像、DEM地形数据、倾斜摄影等三维模型数据发布的三维地图服务。

### 矢量服务（二维地图文档）

<a href="http://develop.smaryun.com/#/demo/cesium/mapgis/mapgis-2d-doc" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1031-二维地图文档.png" alt="二维地图文档" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Layer.TilesLayer`瓦片图层管理对象，然后调用`append2DDocTile()`方法，传入地图服务的 URL 地址及相关参数，即可加载 IGServer 二维地图文档数据。

- Example:
  ```javascript
  //构造瓦片图层管理对象（视图）
  var layer = new CesiumZondy.Layer.TilesLayer({
    viewer: webGlobe.viewer,
  })
  //添加MapGIS IGServer发布的二维地图文档服务
  vecDoc = layer.append2DDocTile('http://develop.smaryun.com:6163/igs/rest/mrms/docs/北京市', {})
  ```

### 瓦片服务

<a href="http://develop.smaryun.com/#/demo/cesium/mapgis/mapgis-2d-doc" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1032-二维瓦片.png" alt="二维瓦片" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Layer.TilesLayer`瓦片图层管理对象，然后构造图层加载的参数，如范围、瓦片初始级行列数、最大显示级别等信息，可用来指定瓦片显示的范围、最大级别等；然后调用`appendMapGISTile()`方法传入二维瓦片服务地址及参数，即可加载浏览数据。

- Example:
  ```javascript
  //构造瓦片图层管理对象（视图）
  var tilelayer = new CesiumZondy.Layer.TilesLayer({
    viewer: webGlobe.viewer,
  })
  //参数
  var options = {
    tileRang: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
    //瓦片初始级的列数 默认为2
    colNum: 2,
    //瓦片初始级的行数 默认为1
    rowNum: 1,
    //瓦片最大显示级数 默认为19
    maxLevel: 19,
    //如瓦片裁的不是256,则需设置下面两个参数
    //瓦片宽度
    tileWidth: 256,
    //瓦片高度
    tileHeight: 256,
  }
  //添加MapGIS IGServer发布的二维瓦片服务
  var layer = tilelayer.appendMapGISTile('http://develop.smaryun.com:6163/igs/rest/mrms/tile/北京市', options)
  ```

### 地形服务

<a href="http://develop.smaryun.com/#/demo/cesium/mapgis/mapgis-2d-doc" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1033-三维地形.png" alt="三维地形" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：构造`CesiumZondy.Layer.TerrainLayer`地形图层管理对象，调用`append()`方法，传入三维地图服务的 URL 地址即可加载浏览数据，可传入相关配置参数。

- Example:
  ```javascript
  //构造地形层管理对象（视图）
  var layer = new CesiumZondy.Layer.TerrainLayer({
    viewer: webGlobe.viewer,
  })
  //加载三维地图文档（服务地址，配置参数）
  var terrainlayer = layer.append('http://develop.smaryun.com:6163/igs/rest/g3d/terrain', {})
  ```

## OGC服务

&ensp;&ensp;&ensp;&ensp; OGC（OpenGIS Consortium OpenGIS协会）是一个公益的行业协会，成立于1994年，致力于促进采用新的技术和商业方式来提高地理信息处理的互操作性(Interoperability)。OGC为实现地理信息共享与互操作，定义了一系列Web地理信息服务的抽象接口与实现规范，包括WMS、WFS、WMTS、WCS等.


| 服务类型 |  类名/方法名           |     API说明    |
| ------- | -------------- |----------------|
| WMS | CesiumZondy.Layer.OGCLayer/ appendWMSTile() |加载WMS服务地图，WMS的GetMap接口返回指定范围内的地图图片 |
| WMTS | CesiumZondy.Layer.OGCLayer/ appendWMTSTile() | 加载WMTS服务地图，WMTS的GetTile接口返回的就是单张瓦片|


&ensp;&ensp;&ensp;&ensp; MapGIS IGServer全面支持OGC服务的发布与应用，包括WMS、WFS、WMTS、WCS等服务。其中，常用的WMS、WFS、WMTS中对应的MapGIS格式的数据类型为：
- WMS：MapIGS格式的地图文档、矢量图层；
- WFS：MapIGS格式的地图文档、矢量图层；
- WMTS：MapIGS格式的瓦片图层、实时瓦片图层、分布式瓦片图层。

> 要在客户端调用OGC服务，需要先在IGServer服务管理器中发布OGC服务，具体操作请查看**MapGIS IGServer操作手册**（<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag206/page1/doc770" target="_blank">.NET版</a>，<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag212/page1/doc823" target="_blank">九州版</a>）

### WMS 

&ensp;&ensp;&ensp;&ensp;Web Map Service（网络地图服务），简称 WMS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定。该规范定义了 Web 客户端从网络地图服务器获取地图的接口标准。一个 WMS 可以动态地生成具有地理参考数据的地图，这些地图通常用 GIF、JPEG 或 PNG 等图像格式，或者 SVG、KML、VML 和 WebCGM 等矢量图形格式来表现。使用者通过指定的参数获取相应的地图图片。

&ensp;&ensp;&ensp;&ensp;数据准备：可在 MapGIS IGServer 中发布 WMS 地图服务获取数据地址，也可通过其他方式发布服务或者获取地址，只要是基于 OGC 标准的 WMS 地图服务都能支持。

&ensp;&ensp;&ensp;&ensp;具体实现：构造`CesiumZondy.Layer.OGCLayer`M3D 图层管理对象，调用`appendWMSTile()`方法，并配置服务地址、图层名称、附加信息，即可实现 WMS 地图服务数据的加载，在此传入的是 IGServer 中发布的 WMS 地图服务地址，可做参考。

<a href="http://develop.smaryun.com/#/demo/cesium/ogc/ogc-WMS" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1041-WMS.png" alt="WMS地图" style="zoom:80%;" />
</a>

- Example:
  ```javascript
  //构造OGC图层管理对象（视图）
  var ogcLayer = new CesiumZondy.Layer.OGCLayer({
    viewer: webGlobe.viewer,
  })
  //添加WMS服务地图
  var wmsLayer = ogcLayer.appendWMSTile(
    //地图服务URL地址
    'http://develop.smaryun.com:6163/igs/rest/ogc/doc/北京市/WMSServer',
    //图层名
    '北京市,绿地_1,水域_3,大学,学校,动物园',
    //附加属性
    {}
  )
  ```


### WMTS 

&ensp;&ensp;&ensp;&ensp;Web Map Tile Service（网络地图瓦片服务），简称 WMTS，由开放地理信息联盟（Open GeoSpatial Consortium，OGC）制定，是和 WMS 并列的重要 OGC 规范之一。WMTS 不同于 WMS,它最重要的特征是采用缓存技术能够缓解 WebGIS 服务器端数据处理的压力，提高交互响应速度，大幅改善在线地图应用客户端的用户体验。WMTS 是 OGC 主推的缓存技术规范，是目前各种缓存技术相互兼容的一种方法。

&ensp;&ensp;&ensp;&ensp;数据准备：可在 MapGIS IGServer 中发布 WMTS 地图服务获取数据地址，也可通过其他方式发布服务或者获取地址，只要是基于 OGC 标准的 WMTS 地图服务都能支持。

&ensp;&ensp;&ensp;&ensp;具体实现：调用`CesiumZondy.Layer.OGCLayer`的`appendWMTSTile()`方法，并配置服务地址、图层名称、最大级数等信息，即可实现 WMTS 地图服务数据的加载，在此传入的是 IGServer 中发布的 WMTS 地图服务地址，可做参考。

<a href="http://develop.smaryun.com/#/demo/cesium/ogc/ogc-WMTS" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1042-WMTS.png" alt="WMTS地图" style="zoom:80%;" />
</a>

- Example:
  ```javascript
  //构造OGC图层管理对象（视图）
  var ogcLayer = new CesiumZondy.Layer.OGCLayer({
    viewer: webGlobe.viewer,
  })
  //添加WMTS地图服务
  var wmtsLayer = ogcLayer.appendWMTSTile(
    //瓦片服务地址
    'http://develop.smaryun.com:6163/igs/rest/ogc/WMTSServer',
    //图层名称
    'beijing',
    'EPSG:4326_北京市_028mm_GB',
    //最大级数
    17,
    null,
    'default',
    0
  )
  ```

## 通用数据

&ensp;&ensp;&ensp;&ensp;基于原生Cesium，支持加载各类通用格式数据，如3DTiles、 GLTF、CZML、GeoJSON、KML、KMZ数据，以及各种图片数据等。


|  类名/方法名          |     API说明    |
| -------------- |----------------|
| CesiumZondy.Manager.CommonDataManager / append3DTile() |  3DTiles数据 |
| CesiumZondy.Manager.CommonDataManager / appendModel() | GLTF数据 |
| CesiumZondy.Manager.CommonDataManager / appendCZML() | CZML数据 |
| CesiumZondy.Manager.CommonDataManager / appendGeoJson() | GeoJSON数据 |
| CesiumZondy.Manager.CommonDataManager / appendKml() | KML、KMZ数据 |
| CesiumZondy.Manager.CommonDataManager / appendImageByUrl() | 图片数据 |


### 3DTiles 数据

> 什么是3DTiles？

&ensp;&ensp;&ensp;&ensp;3DTiles 是用于流式传输大规模异构 3D 地理空间数据集的开放规范。为了扩展 Cesium 的地形和图像流，3DTiles 将用于流式传输 3D 内容，包括建筑物，树木，点云和矢量数据。关于 3DTiles 可自行了解其更多内容。

&ensp;&ensp;&ensp;&ensp;具体实现：针对3DTiles数据支持本地数据和网络数据加载，关键接口为`CesiumZondy.Manager.CommonDataManager`类提供的`append3DTile()`方法与`remove3DTile()`方法，实现 3D Tiles 数据的加载与移除功能。加载数据须设置 3DTiles 数据的 URL 参数，通过加载成功回调函数定位跳转到所加载的 3DTiles 数据范围。

<a href="http://develop.smaryun.com/#/demo/cesium/data/data-3Dtiles" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1051-data-3Dtiles.png" alt="3DTiles数据" style="zoom:80%;" />
</a>

- Example:
  ```Javascript
  //构造通用数据管理对象
  var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
    viewer: webGlobe.viewer
  });
  //加载3DTile数据
  var tiles = commonDataManager.append3DTile(
    //3DTile数据路径，支持本地与网络数据
        './static/data/3DTile/BatchedTilesets/tileset.json',
    //成功回调函数
    load
  );
  function load(layer) {
    //加载成功后定位跳转
    webGlobe.viewer.flyTo(layer);
    console.log("这是一个加载成功回调");
  }
  //通过remove3DTile方法移除
  //commonDataManager.remove3DTile(tiles);
  ```

### GLTF 数据

> 什么是 GLTF？

&ensp;&ensp;&ensp;&ensp;GLTF（GL Transmission Format），即图形语言交换格式，是一种三维数据的格式标准，由 Khronos Group 推出。由于三维数据格式众多，所以其致力于成为像音频界的 MP3、图像界的 JPEG 那样的 3D 领域通用的数据格式。目前多款三维软件支持了 GLTF 格式数据的读写，如 Maya、3dmax、unity 等等。采用 GLTF 可避免不同软件中数据转换操作造成的各方面问题。
<a href="https://www.khronos.org/gltf/" target="_blank">GLTF 官方介绍</a>

&ensp;&ensp;&ensp;&ensp;具体实现：关键接口为`CesiumZondy.Manager.CommonDataManager`类提供的`appendModel()`方法，设置模型 id、模型文件 URL 路径、模型所在经纬度、高度、缩放比参数信息，即可实现 GLTF 模型的加载。如果模型自带动画，需要设置`webGlobe.viewer.clock.shouldAnimate`参数为 true 来开启动画。

<a href="http://develop.smaryun.com/#/demo/cesium/data/data-addgltf" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1052-data-addgltf.png" alt=" GLTF数据" style="zoom:80%;" />
</a>

- Example:
  ```javascript
  //构造通用数据管理对象
  var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
    viewer: webGlobe.viewer,
  })
  //开启动画：如果模型自带动画，需开启此参数
  webGlobe.viewer.clock.shouldAnimate = true
  //添加模型（gltf文件）
  var model = commonDataManager.appendModel(
    //模型id
    'model',
    //模型文件URL路径
    './static/data/model/WuRenJi/WuRenJi.gltf',
    //模型经度、纬度、高度
    114.3938,
    30.5045,
    200,
    //缩放比
    200
  )
  ```

  &ensp;&ensp;&ensp;&ensp;**批量加载 GLTF 模型**：支持在三维场景中批量添加多个 GLTF 模型数据。常用于需要一次性添加多个模型的应用场景，多个模型可为相同数据，也可以是不同数据，参数单独设置，简化代码操作步骤。

<a href="http://develop.smaryun.com/#/demo/cesium/data/data-addgltfs" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1053-data-addgltfs.png" alt="批量GLTF数据" style="zoom:80%;" />
</a>

  - Example:
  ```javascript
  //多个模型
  var models = [
    {
      id: 'document',
      name: 'Models',
      version: '1.0',
    },
    {
      //模型的ID
      id: 'aerogenerator1',
      //模型的名字
      name: '风机1',
      //模型要添加的坐标位置
      position: {
        cartographicDegrees: [118.0385, 42.6374, -5],
      },
      //模型文件参数
      model: {
        //模型文件的路径
        gltf: './static/data/model/donghua.gltf',
        //模型的比例
        scale: 50,
        //模型最小显示的像素
        minimumPixelSize: 16,
      },
      //描述
      description: '这是1号风机',
    },
    {
      //模型的ID
      id: 'aerogenerator2',
      //模型的名字
      name: '风机2',
      //模型要添加的坐标位置
      position: {
        cartographicDegrees: [118.0356, 42.6354, -5],
      },
      //模型文件参数
      model: {
        //模型文件的路径
        gltf: './static/data/model/donghua.gltf',
        //模型的比例
        scale: 50,
        //模型最小显示的像素
        minimumPixelSize: 16,
      },
      //描述
      description: '这是2号风机',
    },
  ]
  //开启动画：如果模型自带动画，需开启此参数
  webGlobe.viewer.clock.shouldAnimate = true
  //构造通用数据管理对象
  var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
    viewer: webGlobe.viewer,
  })
  //添加多个模型
  modelSource = commonDataManager.appendModels(models)
  ```

- Example:
  ```javascript
  //跳转到模型处
  webGlobe.viewer.zoomTo(modelSource)
  ```

### CZML 数据

> 什么是 CZML？

&ensp;&ensp;&ensp;&ensp;CZML，是一种用来描述动态场景的 JSON 架构的地理数据可视化语言，可以用来描述点、线、布告板、模型以及其他的图元，不仅提供了丰富的图形及其外观选择，还专注于表现动态地理数据的变化特征，主要用于 Cesium 在浏览器中的展示。
<a href="https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Structure" target="_blank">CZML 介绍参考</a>

&ensp;&ensp;&ensp;&ensp;具体实现：关键接口为`CesiumZondy.Manager.CommonDataManager`类提供的`appendCZML()`方法，传入 CZML 文件的地址即可实现 CZML 数据的加载，并可添加回调函数根据 CZML 文件中某一模型 ID 判断是否添加成功；对应可通过`removeDataSource()`方法移除。

<a href="http://develop.smaryun.com/#/demo/cesium/data/data-czml" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1054-data-czml.png" alt="CZML数据" style="zoom:80%;" />
</a>

- Example:
  ```javascript
  //构造通用数据管理对象
  var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
    viewer: webGlobe.viewer,
  })
  //添加CZML数据
  var datasource = commonDataManager.appendCZML(
    //CZML文件地址
    './static/data/czml/fengji.czml',
    //成功回调
    function(entities) {
      //判断是否添加成功
      var enti = entities.getById('aerogenerator10')
      if (enti == undefined) {
        alert('失败')
      }
    }
  )
  ```


### GeoJSON 数据

> 什么是 GeoJSON？

&ensp;&ensp;&ensp;&ensp;GeoJSON，是一种对各种地理数据结构进行编码的格式，基于 Javascript 对象表示法的地理空间信息数据交换格式。通过键值对的方式表达几何、特征或者特征集合，能够支持点、线、面、多点、多线、多面和几何集合的数据类型。
<a href="https://geojson.org/" target="_blank">GeoJSON 官方介绍</a>

&ensp;&ensp;&ensp;&ensp;具体实现：关键接口为`CesiumZondy.Manager.CommonDataManager`类提供的`appendGeoJson()`方法，传入 GeoJSON 文件地址，实现 GeoJSON 数据的加载；对应可通过`removeDataSource()`方法移除。

&ensp;&ensp;&ensp;&ensp;在此以本地文件为例：

<a href="http://develop.smaryun.com/#/demo/cesium/data/data-geojson" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1055-data-geojson.png" alt="GeoJSON数据" style="zoom:80%;" />
</a>

- Example:
  ```javascript
  //构造通用数据管理对象
  var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
    viewer: webGlobe.viewer,
  })
  //添加GeoJson数据（GeoJson文件地址）
  var datasource = commonDataManager.appendGeoJson('./static/data/geojson/wuhan_bounds.geojson')
  ```

### KML 数据

> 什么是 KML？

&ensp;&ensp;&ensp;&ensp;KML（Keyhole Markup Language，Keyhole 标记语言）是由 Google 旗下的 Keyhole 公司开发和维护的一种基于 XML 的标记语言，可用于描述和保存地理空间信息（如点、线、面、图像、模型等），适合网络环境下的地理信息协作与共享。KML 在 2008 年 4 月被 OGC（开放地理信息系统协会）宣布成为开放地理信息编码标准。KML 是纯粹的 xml 文本格式，两者之间最大的区别就在于 KML 描述的是地理信息数据。
<a href="https://baike.baidu.com/item/KML/7278605?fr=aladdin" target="_blank">KML 百科介绍</a>

&ensp;&ensp;&ensp;&ensp;具体实现：关键接口为`CesiumZondy.Manager.CommonDataManager`类提供的`appendKml()`方法，传入 KML 文件地址，实现 KML 数据的加载；对应可通过`removeDataSource()`方法移除。

&ensp;&ensp;&ensp;&ensp;在此以本地文件为例：

<a href="http://develop.smaryun.com/#/demo/cesium/data/data-kml" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1056-data-kml.png" alt="KML数据" style="zoom:80%;" />
</a>

- Example:
  ```javascript
  //构造通用数据管理对象
  var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
    viewer: webGlobe.viewer,
  })
  //添加KML数据
  datasource = commonDataManager.appendKml('./static/data/kml/bikeRide_wuhan.kml')
  ```


### KMZ 数据

> 什么是 KMZ？

&ensp;&ensp;&ensp;&ensp;KMZ 文件是经过压缩的 KML 文件，将其解压后即可获得最原始的 KML 文件。与 KML 不同的是，由于 KMZ 是压缩包文件，所以其中不仅可以包括 KML 文本文件，还可以包括其他类型的文件，如图片等，所以 KMZ 能够表达的信息可以更加丰富多样。

&ensp;&ensp;&ensp;&ensp;具体实现：实现 KMZ 数据的加载与 KML 数据的方法一样，都采用`CesiumZondy.Manager.CommonDataManager`类提供的`appendKml()`方法；对应可通过`removeDataSource()`方法移除。

&ensp;&ensp;&ensp;&ensp;在此以本地文件为例：

<a href="http://develop.smaryun.com/#/demo/cesium/data/data-kmz" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1057-data-kmz.png" alt="KMZ数据" style="zoom:80%;" />
</a>

- Example:
  ```javascript
  //构造通用数据管理对象
  var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
    viewer: webGlobe.viewer,
  })
  //添加KMZ数据
  var datasource = commonDataManager.appendKml('./static/data/kmz/sample.kmz')
  ```

### 图片数据

&ensp;&ensp;&ensp;&ensp;可在三维场景中叠加显示图片文件数据，支持本地数据和网络数据加载。

&ensp;&ensp;&ensp;&ensp;具体实现：关键接口为`CesiumZondy.Manager.CommonDataManager`类提供的`appendImageByUrl()`方法与`removeImage()`方法，实现图片叠加显示与移除功能。调用`appendImageByUrl()`方法时，需要传入图片的地址（可为本地图片地址，也可以为网络图片的 URL），以及图片显示的坐标范围。

&ensp;&ensp;&ensp;&ensp;**本地图片**：

<a href="http://develop.smaryun.com/#/demo/cesium/data/data-outlineImage" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1058-data-img1.png" alt="本地图片" style="zoom:80%;" />
</a>

- Example:
  ```javascript
  //构造通用数据管理对象
  var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
    viewer: webGlobe.viewer,
  })
  //添加图片
  var image = commonDataManager.appendImageByUrl(
    //本地图片地址
    './static/data/picture/world.jpg',
    //图片显示范围（西经、南纬、东经、北纬）
    -180.0,
    -90,
    180.0,
    90
  )
  ```

&ensp;&ensp;&ensp;&ensp;**在线图片**：

<a href="http://develop.smaryun.com/#/demo/cesium/data/data-onlineImage" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1059-data-img2.png" alt="在线图片" style="zoom:80%;" />
</a>

- Example:
  ```Javascript
  //构造通用数据管理对象
  var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
      viewer: webGlobe.viewer
  });

  //通过地址添加图片，支持本地图片和网络图片
  var imgObj = commonDataManager.appendImageByUrl(
      //图片URL
      'http://5b0988e595225.cdn.sohucs.com/images/20180917/455c51316ec24a97958a254dc66c18f6.jpeg',
      //东经
      114.3473,
      //北纬
      30.5479,
      //西经
      114.4637,
      //南纬
      30.6120
  );
  //定位跳转
  sceneManager.flyToComm(114.4, 30.55, 30000);

  //通过removeImage()删除
  //commonDataManager.removeImage(imgObj,false);
  ```


## 场景操作

&ensp;&ensp;&ensp;&ensp;基于原生Cesium，结合三维GIS应用进一步封装，提供丰富的场景交互操作功能，其中常用功能为常用控件、场景模式设置、场景浏览基本操作、视点跳转、坐标转换等功能。

### 常用控件

&ensp;&ensp;&ensp;&ensp;常用的基础控件，包括鼠标位置、导航控件、比例尺、罗盘等。鼠标位置控件显示当前鼠标所在点的经纬度，高程等位置信息；导航控件提供放大、缩小、复位基础场景导航功能；罗盘控件则为方位指向，通常与导航控件结合使用。

&ensp;&ensp;&ensp;&ensp;具体实现：先初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` ，然后初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用视图功能管理类的 `showPosition()` 方法显示位置信息；再初始化通用功能管理类`CesiumZondy.Manager.CommonFuncManager()` ，调用`createNavigationTool()`方法显示常用导航控件。

<a href="http://develop.smaryun.com/#/demo/cesium/scene/scene-showPosition" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1101-scene-showPosition.png" alt="常用控件" style="zoom:80%;" />
</a>

- Example:

  ```html
  <!--坐标容器-->
  <div id="coordinateDiv" class="coordinateClass">
    <label id="coordinate_location"></label>
    <label id="coordinate_height"></label>
  </div>
  ```

  ```Javascript
  //初始化视图功能管理类
  var sceneManager = new CesiumZondy.Manager.SceneManager({
    viewer: webGlobe.viewer
  });
  //显示鼠标位置控件
  sceneManager.showPosition('coordinateDiv');
  ```


- Example:
  ```Javascript
  //初始化通用功能管理类
  var commFun = new CesiumZondy.Manager.CommonFuncManager({
    viewer: webGlobe.viewer
  });
  //显示导航控件（罗盘、场景导航、比例尺）
  var navigation = commFun.createNavigationTool({
    enableCompass: true,
    enableZoomControls: true,
    enableDistanceLegend: true,
    enableCompassOuterRing: true
  });
  ```

### 场景模式

&ensp;&ensp;&ensp;&ensp;场景视图模式提供三种模式：三维球面模式、三维平面模式、二维地图模式，在实际应用中可根据具体应用场景设置。

&ensp;&ensp;&ensp;&ensp;具体实现：初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` 后初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用视图功能管理类的 `changeSceneMode()` 方法切换地图显示模式。另外，通过修改 Cesium 三维球控件 `Cesium.WebSceneControl()` 的视图对象的 scene 参数来设置地下模式。

&ensp;&ensp;&ensp;&ensp;**<font color=red>常用场景模式</font>**

<a href="http://develop.smaryun.com/#/demo/cesium/scene/scene-sceneMode" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1102-scene-sceneMode.png" alt="场景模式" style="zoom:80%;" />
</a>

- Example:

  ```Javascript
  //初始化视图功能管理类
  var sceneManager = new CesiumZondy.Manager.SceneManager({
    viewer: webGlobe.viewer
  });
  let mode = document.getElementById("modeSelect").value;
  //根据选择切换场景视图模式
  if (mode == '3D') {
    //切换场景模式为三维球面
    sceneManager.changeSceneMode('3D', 1);
  } else if (mode === '3DC') {
    //切换场景模式为三维平面
    sceneManager.changeSceneMode('COLUMBUS_VIEW', 1);
  } else if (mode === '2D') {
    //切换场景模式为二维地图
    sceneManager.changeSceneMode('2D', 1);
  }
  ```

&ensp;&ensp;&ensp;&ensp;**<font color=red>地下场景模式</font>**

&ensp;&ensp;&ensp;&ensp;**地下模式一**：开启地下模式并关闭大气层、设置球面透明度

- Example:
  ```Javascript
  //设置地下模式
  webGlobe.viewer.scene.globe.undergroundMode = true;
  //大气显示关闭
  webGlobe.viewer.scene.skyAtmosphere.show = false;
  //透明度设置
  webGlobe.viewer.scene.globe.transparent = 0.3;
  ```

&ensp;&ensp;&ensp;&ensp;**地下模式二**：开启地下模式、关闭大气层与地面大气效果、设置球面透明度、设置背景色

- Example:
  ```Javascript
  //设置地下模式
  webGlobe.viewer.scene.globe.undergroundMode = true;
  //大气显示关闭
  webGlobe.viewer.scene.skyAtmosphere.show = false;
  //地面大气效果关闭
  webGlobe.viewer.scene.skyAtmosphere.showGroundAtmosphere = false;
  //透明度设置
  webGlobe.viewer.scene.enableTransparent = true;
  //透明度设置
  webGlobe.viewer.scene.globe.transparent = 1;
  //背景颜色设置
  webGlobe.viewer.scene.baseColor = new Cesium.Color(1, 1, 1, 0.0001);
  webGlobe.viewer.scene.globe.imageryLayers.get(0).alpha = 0;
  webGlobe.viewer.scene.globe.imageryLayers.get(1).alpha = 0;
  ```


### 场景操作

&ensp;&ensp;&ensp;&ensp;场景的基本操作功能，包括场景视图缩放、复位、三维球自转、设置天空盒等。

&ensp;&ensp;&ensp;&ensp;具体实现：先初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` , 然后初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用视图功能管理类的如下几个方法分别实现对应的场景操作功能。


|  类名/方法名          |     API说明    |
| -------------- |----------------|
| CesiumZondy.Manager.SceneManager / zoomIn() |  放大 |
| CesiumZondy.Manager.SceneManager / zoomOut() | 缩小|
| CesiumZondy.Manager.SceneManager / goHome() | 复位 |
| CesiumZondy.Manager.SceneManager/ openRotation() | 开启自转|
| CesiumZondy.Manager.SceneManager / closeRotation() | 关闭自转|
| CesiumZondy.Manager.SceneManager / changeSkyBox() | 修改天空盒|

<a href="http://develop.smaryun.com/#/demo/cesium/scene/scene-operation" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1103-scene-operation.png" alt="场景操作" style="zoom:80%;" />
</a>


- Example:
  ```Javascript
  //初始化视图功能管理类
  var sceneManager = new CesiumZondy.Manager.SceneManager({
    viewer: webGlobe.viewer
  });
  ```

&ensp;&ensp;&ensp;&ensp;**<font color=red>zoomin():</font>**

- Example:

  ```Javascript
  sceneManager.zoomin();//放大
  ```

&ensp;&ensp;&ensp;&ensp;**<font color=red>zoomout():</font>**

- Example:

  ```Javascript
  sceneManager.zoomout();//缩小
  ```

&ensp;&ensp;&ensp;&ensp;**<font color=red>goHome():</font>**

- Example:

  ```Javascript
  sceneManager.goHome();//复位
  ```

&ensp;&ensp;&ensp;&ensp;**<font color=red>openRotation()与 closeRotation():</font>**

```Javascript
sceneManager.openRotation();//开启自转
ceneManager.closeRotation();//关闭自转
```

&ensp;&ensp;&ensp;&ensp;**<font color=red>changeSkyBox():</font>**

- Example:
  ```Javascript
  var skybox = new Cesium.SkyBox({
    sources: {
        positiveX: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/front.jpg',
        negativeX: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/back.jpg',
        positiveY: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/left.jpg',
        negativeY: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/right.jpg',
        positiveZ: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/top.jpg',
        negativeZ: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/bottom.jpg'
     }
  });
  sceneManager.changeSkyBox(skybox);
  ```

### 视点跳转

&ensp;&ensp;&ensp;&ensp;场景视点跳转功能，即根据坐标点在三维球上进行定位跳转。此功能为场景视图的基础功能，应用非常广泛，可根据具体应用场景需求调用合适的方法。

&ensp;&ensp;&ensp;&ensp;具体实现：初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` , 初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用视图功能管理类的如下 4 个视点跳转方法进行视点跳转。


|  类名/方法名          |     API说明    |
| -------------- |----------------|
| CesiumZondy.Manager.SceneManager / flyTo() |  视点跳转简单方法，根据经纬度、视角高度、跳转持续时间进行视点跳转 |
| CesiumZondy.Manager.SceneManager / flyToComm() | 视点跳转通用方法，根据经纬度、视角高度，以及原生的可扩展参数进行视点跳转 |
| CesiumZondy.Manager.SceneManager / flyToEx() | 视点跳转扩展方法，根据经纬度，以及可扩展的参数（包括视角高度、持续时间、方位角、俯仰角、翻滚角）进行视点跳转 |
| CesiumZondy.Manager.SceneManager/ flyToFeatureById() | 根据 ID 飞行到特定要素位置，即通过图层的某个要素进行定位跳转|

<a href="http://develop.smaryun.com/#/demo/cesium/scene/scene-fly" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1104-scene-fly.png" alt="视点跳转" style="zoom:80%;" />
</a>

- Example:
  ```Javascript
  //初始化视图功能管理类
  var sceneManager = new CesiumZondy.Manager.SceneManager({
    viewer: webGlobe.viewer
  });
  ```

&ensp;&ensp;&ensp;&ensp;**<font color=red>flyTo()：</font>**

* Example:
  ```Javascript
  //跳转视图(北京)
  sceneManager.flyTo(116.44, 40, 300000, 2);
  ```

&ensp;&ensp;&ensp;&ensp;**<font color=red>flyToComm()：</font>**

* Example:
  ```Javascript
  //跳转视图（武汉）
  sceneManager.flyToComm(114.3, 30.6, 100000);
  ```

&ensp;&ensp;&ensp;&ensp;**<font color=red>flyToEx()：</font>**

* Example:
  ```Javascript
  //视点跳转（中地科技园）
  sceneManager.flyToEx(114.40298522106733, 30.465568703723072, {
    height: 100.85856618500283,
    heading: -45.4940479913348135,
    pitch: -15,
    roll: 0
  });
  ```

&ensp;&ensp;&ensp;&ensp;**<font color=red>flyToFeatureById()：</font>**

* Example:

  ```Javascript
  //加载M3D地图文档（服务地址，配置参数）
  Layer2 = m3dLayer.append('http://develop.smaryun.com:6163/igs/rest/g3d/buildings1', {
    autoReset: false,
    //模型细节显示控制参数：较大值可提高渲染性能，较低值可提高视觉质量
    maximumScreenSpaceError: 0
  });
  //视点跳转-根据 ID 飞行到特定要素位置（上海）
  sceneManager.flyToFeatureById(Layer2, 10 ,{
  height: 950,
  heading: 22,
  pitch: -20,
  roll: 0
  });

  ```


### 坐标转换

&ensp;&ensp;&ensp;&ensp;根据鼠标事件获取的屏幕坐标进行坐标转换与相关计算的功能，包括常用的屏幕坐标转笛卡尔坐标、屏幕坐标转经纬度、根据经纬度计算高度值。

&ensp;&ensp;&ensp;&ensp;具体实现：先初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` , 然后初始化公共方法管理类 `CesiumZondy.Manager.CommonFuncManager()` ，分别调用如下对应的方法实现屏幕坐标转换与相关计算功能。

- `screenPositionToCartesian`：屏幕坐标转为笛卡尔坐标；
- `screenPositionToCartographic`：屏幕坐标转为经纬度坐标；
- `getHeightFromDegrees`：根据经纬度计算高度值。



|  类名/方法名          |     API说明    |
| -------------- |----------------|
| CesiumZondy.Manager.CommonFuncManager / screenPositionToCartesian() |  屏幕坐标转为笛卡尔坐标  |
| CesiumZondy.Manager.CommonFuncManager / screenPositionToCartographic() | 屏幕坐标转为经纬度坐标 |
| CesiumZondy.Manager.CommonFuncManager / getHeightFromDegrees() | 根据经纬度计算高度值 |


- Example:
  ```Javascript
  //初始化公共方法管理类
  var commonFuncManager = new CesiumZondy.Manager.CommonFuncManager({
    viewer: webGlobe.viewer
  });
  //初始化鼠标事件管理类
  var mouseEventManager = new CesiumZondy.Manager.MouseEventManager({
    viewer: webGlobe.viewer
  });
  ```

&ensp;&ensp;&ensp;&ensp;**<font color=red>screenPositionToCartesian()：</font>**

* Example:
  ```Javascript
  //添加鼠标左键单击事件获取屏幕坐标点
  mouseEventManager.registerMouseEvent("LEFT_CLICK", leftToCartesian);
  function leftToCartesian(movement) {
    //将鼠标左键点击的屏幕坐标转为笛卡尔坐标
    var position = commonFuncManager.screenPositionToCartesian(movement.position);
  }
  ```

&ensp;&ensp;&ensp;&ensp;**<font color=red>screenPositionToCartographic()：</font>**

* Example:
  ```Javascript
  //添加鼠标左键单击事件获取屏幕坐标点
  mouseEventManager.registerMouseEvent("LEFT_CLICK", leftToCartographic);
  function leftToCartographic(movement) {
   //将鼠标左键点击的屏幕坐标转为经纬度坐标
   var result = commonFuncManager.screenPositionToCartographic(movement.position);
   let lng=Cesium.Math.toDegrees(result.longitude);//转为经度值
   let lat=Cesium.Math.toDegrees(result.latitude);//转为纬度值
  }
  ```

&ensp;&ensp;&ensp;&ensp;**<font color=red> getHeightFromDegrees()：</font>**

* Example:

  ```Javascript
  //添加鼠标左键单击事件获取屏幕坐标点
  mouseEventManager.registerMouseEvent("LEFT_CLICK", leftToHeightFromDegrees);
  function leftToHeightFromDegrees(movement) {
    //屏幕坐标转笛卡尔坐标
    var cartesian = webGlobe.viewer.getCartesian3Position(movement.position, cartesian);
    var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    var lng = Cesium.Math.toDegrees(cartographic.longitude);
    var lat = Cesium.Math.toDegrees(cartographic.latitude);

    //根据鼠标左键单击点经纬度计算其高度值
    var height = commonFuncManager.getHeightFromDegrees(lng, lat);
  }
  ```


### 场景出图

&ensp;&ensp;&ensp;&ensp;此功能用于将当前场景输出成图片，可导出图片文件或图像对象。


&ensp;&ensp;&ensp;&ensp;具体实现：先初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` 加载数据；然后初始化常用功能管理类 `CesiumZondy.Manager.CommonFuncManager()` ，调用常用功能管理类的 `outputImageFile()` 方法或`outputImageObj()`方法进行场景输出图片。

|  类名/方法名          |     API说明    |
| -------------- |----------------|
| CesiumZondy.Manager.SceneManager / outputImageFile() |  将屏幕截图输出为图片文件 |
| CesiumZondy.Manager.SceneManager / outputImageObj() | 将屏幕截图输出为图像对象，可保存为不同类型图片，应用场景比较丰富 |

&ensp;&ensp;&ensp;&ensp;**<font color=red>使用 outputImageFile()：</font>**

* Example:
  ```Javascript
  var commonFuncManager = new CesiumZondy.Manager.CommonFuncManager({
    viewer: webGlobe.viewer
  });
  //当前屏幕图片输出为一个图片文件
  commonFuncManager.outputImageFile("图片.png");
  ```

&ensp;&ensp;&ensp;&ensp;**<font color=red>使用 outputImageObj()：</font>**

* Example:
  ```Javascript
  var comm = new CesiumZondy.Manager.CommonFuncManager({
     viewer: webGlobe.viewer
  });
  //当前屏幕输出为一个图片对象
  var res = comm.outputImageObj();
  //下载打印此图片对象为png
  res.downloadPng("image.png");
  //可输出如下其他格式，可结合其他应用场景使用：
  //res.toImg();
  //res.toBase64();
  //res.downloadPng(name);
  //res.toCanvas();
  //res.toJpeg();
  //res.toPng();
  ```

>outputImageObj()返回的是一个图像对象，可直接输出为图片，也可以结合其他应用场景使用，如将图像输出到 Canvas 显示等。


## 绘制

&ensp;&ensp;&ensp;&ensp;图形绘制是Web端实现相关GIS功能的基础，尤其是基本几何图形的交互绘制，查询、编辑、分析等功能均涉及到客户端的图形绘制。一般通过绘制图形来获取地图的空间范围，为查询等功能提供条件限制、或提供操作要素的空间属性等。

&ensp;&ensp;&ensp;&ensp;图形绘制的基础就是空间坐标，任何图形都由空间坐标组成的。一般有两种方式绘制图形：一种是空间坐标已知，通常根据已有的空间坐标信息直接添加图形，实现图形的绘制功能；另一种则通过鼠标交互获取空间坐标，这也是图形绘制常用的方法，通常通过鼠标在地图上进行交互式操作，以获取所需的空间范围信息，以此空间坐标绘制图形。第二种基于鼠标交互式操作完成的图形绘制，被称为交互式图形绘制。

|  类名/方法名          |     API说明    |
| -------------- |----------------|
| CesiumZondy.Manager.EntityController / appendPoint()、appendPointComm() |  绘制点实体 |
| CesiumZondy.Manager.EntityController / appendLine() | 绘制立体线、绘制贴地形线 |
| CesiumZondy.Manager.EntityController / appendGroundLine() | 绘制贴地球线 |
| CesiumZondy.Manager.EntityController / appendGraphics() | 绘制立体区、绘制贴地形区 |
| CesiumZondy.Manager.EntityController / appendPolygon() | 绘制拉伸区 |
| CesiumZondy.Manager.EntityController / appendGroundPolygon() | 绘制贴地球区 |
| CesiumZondy.Manager.EntityController / appendHolePolygon() | 绘制带洞区 |


### 绘制图形


#### 绘制点实体

<a href="http://develop.smaryun.com/#/demo/cesium/drawGraphic/drawGraphic-point" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1201-drawGraphic-point.png" alt="绘制点" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Manager.EntityController`几何绘制控制对象，然后调用`appendPoint()`方法，设置点实体所在经纬度、高程，以及名称、像素大小、颜色、边线颜色、边线宽度信息，即可添加绘制点实体。

- Example:

  ```javascript
  //构造几何绘制控制对象
  var entityController = new CesiumZondy.Manager.EntityController({
    viewer: webGlobe.viewer,
  })
  //添加点实体：经度、纬度、高程、名称、大小（像素单位）、颜色、外边线颜色、边线宽度
  var point = entityController.appendPoint(114.30252625376454, 30.544631482624357, 20, '黄鹤楼', 12, new Cesium.Color(255 / 255, 255 / 255, 0 / 255, 1), new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1), 2)

  //方法二：添加点通用方法，对接Cesium原生，可设置更多属性
  point4 = entityController.appendPointComm(
    //经度、纬度、高程
    114.28478689925817,
    30.555691346035022,
    0,
    //名称、描述
    '晴川阁',
    '晴川阁景点',
    //附加属性：像素大小、颜色、外边线颜色、边线宽度
    {
      pixelSize: 12,
      color: new Cesium.Color(255 / 255, 255 / 255, 0 / 255, 1),
      outlineColor: new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1),
      outlineWidth: 2,
    }
  )
  ```

#### 绘制立体线/贴地形线

<a href="http://develop.smaryun.com/#/demo/cesium/drawGraphic/drawGraphic-line" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1202-drawGraphic-line.png" alt="绘制立体线" style="zoom:45%;" />
</a>

<a href="http://develop.smaryun.com/#/demo/cesium/drawGraphic/drawGraphic-terrainline" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1202-drawGraphic-terrainline.png" alt="绘制贴地形线" style="zoom:45%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Manager.EntityController`几何绘制控制对象，调用`appendLine()`方法，设置：线名称、线坐标点数组、线宽、线颜色、是否识别带高度的坐标（如果为 true 即代表立体线）、是否贴地形等信息，即可实现立体线实体的添加绘制。

- Example:
  ```javascript
  //构造几何绘制控制对象
  var entityController = new CesiumZondy.Manager.EntityController({
    viewer: webGlobe.viewer,
  })
  //点数组
  var pointArr = [114.3984603010489, 30.506836857208143, 90, 114.39820581466965, 30.50638419163618, 0, 114.39817448017338, 30.505889144282214, 50]
  //绘制立体线实体
  var line = entityController.appendLine(
    //名称
    '立体线',
    //点数组
    pointArr,
    //线宽
    2,
    //线颜色
    new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1),
    //是否识别带高度的坐标（如果为true即代表立体线）
    true,
    //是否贴地形
    false,
    //附加属性
    {}
  )
  ```


#### 绘制立体区/贴地形区

<a href="http://develop.smaryun.com/#/demo/cesium/drawGraphic/drawGraphic-polygon" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1203-drawGraphic-polygon.png" alt="绘制立体区" style="zoom:45%;" />
</a>

<a href="http://develop.smaryun.com/#/demo/cesium/drawGraphic/drawGraphic-terrainpolygon" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1203-drawGraphic-terrainpolygon.png" alt="绘制贴地形区" style="zoom:45%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：构造`CesiumZondy.Manager.EntityController`几何绘制控制对象，根据坐标点、是否指定各点高度、颜色等信息构造区对象，然后调用`appendGraphics()`方法即可实现立体区或贴地形区的绘制。注意贴地形区的分类类型需设置为`Cesium.ClassificationType.TERRAIN`。

- Example:

  ```javascript
  //构造几何绘制控制对象
  var entityController = new CesiumZondy.Manager.EntityController({
    viewer: webGlobe.viewer,
  })

  //构造区对象
  var polygon = {
    name: '立体区',
    polygon: {
      //坐标点
      hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([114.3992, 30.5062, 100, 114.39921899282697, 30.507118866456594, 0, 114.39817867190918, 30.505787946817524, 0, 114.40013927896888, 30.505694066567706, 0]),
      //是否指定各点高度
      perPositionHeight: true,
      //颜色
      material: new Cesium.Color(33 / 255, 150 / 255, 243 / 255, 0.5),
      //轮廓线是否显示
      outline: true,
      //轮廓线颜色
      outlineColor: Cesium.Color.BLACK,
    },
  }
  //绘制图形通用方法：对接Cesium原生特性
  var stericPolygon = entityController.appendGraphics(polygon)
  ```

- Example:
  ```javascript
  //构造几何绘制控制对象
  var entityController = new CesiumZondy.Manager.EntityController({
    viewer: webGlobe.viewer,
  })
  //三维坐标点数组
  let points = [121.12838249665901, 23.828496638766055, 2816.2788, 121.150053294749, 23.82435802607214, 2584.9714, 121.14258923767652, 23.8125039217518, 2197.3468, 121.11461042047392, 23.809568499354498, 2405.1721]
  //构造区对象
  let polygon = {
    //区
    polygon: {
      //坐标
      hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(points),
      //颜色
      material: Cesium.Color.BLUE.withAlpha(0.5),
      //分类类型：地形类型
      classificationType: Cesium.ClassificationType.TERRAIN,
    },
  }
  //绘制图形通用方法：对接Cesium原生特性
  terrainPolygon = entityController.appendGraphics(polygon)
  ```

#### 绘制贴地球线

<a href="http://develop.smaryun.com/#/demo/cesium/drawGraphic/drawGraphic-groundline" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1204-drawGraphic-groundline.png" alt="绘制贴地球线" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Manager.EntityController`几何绘制控制对象，然后调用`appendGroundLine()`方法，传入定义的坐标数组、颜色、线宽，即可实现贴地线的添加绘制。

- Example:

  ```javascript
  //构造几何绘制控制对象
  var entityController = new CesiumZondy.Manager.EntityController({
    viewer: webGlobe.viewer,
  })

  //定义一组坐标位置
  var pointArr = [114.29326686402278, 30.54691048615991, 114.28238521698825, 30.552850641911828, 114.27353580837766, 30.536521489533488, 114.29257062566866, 30.525800315003725]
  //颜色
  var color = new Cesium.ColorGeometryInstanceAttribute(1, 0, 0, 0.5)

  //绘制贴地线（坐标点数组，线颜色，线宽）
  var groundLine = entityController.appendGroundLine(pointArr, color, 40)
  ```

#### 绘制贴地球区

<a href="http://develop.smaryun.com/#/demo/cesium/drawGraphic/drawGraphic-groundpolygon" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1205-drawGraphic-groundpolygon.png" alt="绘制贴地球区" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Manager.EntityController`几何绘制控制对象、构造外圈坐标数组、内圈坐标数组、填充颜色对象等信息，然后调用`appendGroundPolygon()`方法，即可实现贴地区的添加绘制。如果要绘制单圈的不带洞区，内圈坐标数组传空即可。

- Example:
  ```javascript
  //构造几何绘制控制对象
  var entityController = new CesiumZondy.Manager.EntityController({
    viewer: webGlobe.viewer,
  })
  //坐标点数组（经纬度）
  var point_out = [70, 0, 150, 0, 150, 60, 70, 60, 70, 0]
  //根据给定点画贴地多边形
  var groundPolygon = webGlobe.appendGroundPolygon(
    //外圈坐标数组（经纬度）
    point_out,
    //内圈坐标数组（经纬度）
    null,
    //填充颜色
    new Cesium.ColorGeometryInstanceAttribute(255 / 255, 255 / 255, 0 / 255, 0.5),
    //附加属性
    {}
  )
  ```

#### 绘制带洞区

<a href="http://develop.smaryun.com/#/demo/cesium/drawGraphic/drawGraphic-hole" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1206-drawGraphic-hole.png" alt="绘制带洞区" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Manager.EntityController`几何绘制控制对象，构造外圈、内圈坐标点数组，然后调用`appendHolePolygon()`方法，设置信息：区名称、内圈与外圈坐标点数组、区填充色，即可实现带洞区的添加绘制。每一圈坐标点序列，都必须首尾点一致形成闭合区，并且可以添加多圈内圈坐标。

- Example：
  ```javascript
  //构造几何绘制控制对象
  var entityController = new CesiumZondy.Manager.EntityController({
    viewer: webGlobe.viewer,
  })
  //外圈坐标点
  var point_out = [114.40328987990017, 30.479789358042233, 114.40255973680176, 30.473707285934392, 114.40905754990294, 30.473938016458956, 114.40971219770601, 30.479196348500707, 114.40328987990017, 30.479789358042233]
  //内圈坐标点（可添加多圈内圈坐标点）
  var point_in = [
    [114.40788399535329, 30.47712432587247, 114.4077781482791, 30.47586494219165, 114.40919532034856, 30.47700722872353, 114.40788399535329, 30.47712432587247],
    [114.40582893901652, 30.478599513299535, 114.40570115301699, 30.47795978731544, 114.40655655628692, 30.478318639933967, 114.40582893901652, 30.478599513299535],
  ]
  //添加带洞多边形
  var holePolygon = entityController.appendHolePolygon(
    //名称
    '带洞区',
    //外圈坐标
    point_out,
    //内圈坐标
    point_in,
    {
      //颜色
      material: new Cesium.Color(0 / 255, 0 / 255, 255 / 255, 0.5),
      //多边形相对于地球表面的高度
      extrudedHeight: 100,
    }
  )
  ```


### 交互绘制

&ensp;&ensp;&ensp;&ensp;在三维球上使用鼠标完成点、线、区等图形的绘制，绘制的图形在临时图层上，绘制结果不会被保存，可应用于各个场景，满足用户在三维球上使用鼠标交互式绘制显示区域，或将此功能和其他功能混合使用，将其他功能变成交互式的功能。

&ensp;&ensp;&ensp;&ensp;具体实现：通过几何绘制控制`CesiumZondy.Manager.EntityController`的方法实现点、线、区的添加绘制，结合三维场景鼠标事件即 `Cesium.WebSceneControl()` 对象的 `registerMouseEvent()` 方法实现鼠标交互绘制图形功能。其中，可通过 `Cesium.DrawPolygonTool()` 在三维场景中添加交互式绘制区控件，实现交互式绘制区功能。

<a href="http://develop.smaryun.com/#/demo/cesium/drawGraphic/drawGraphic-interaction" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1207-drawGraphic-interaction.png" alt="交互绘制" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;以绘制点、线实体为例，关键步骤如下：


**Step 1. <font color=red>注册鼠标事件</font>**：
&ensp;&ensp;&ensp;&ensp;调用 Cesium 三维球控件 `Cesium.WebSceneControl()` 的 `registerMouseEvent()` 方法注册鼠标事件, 以下示例中的匿名函数为触发鼠标事件后执行的方法，完成此步后，在三维场景中点击鼠标左键可触发点击事件，点击完成后进入匿名函数；

- Example：
  ```Javascript
  //注册事件
  webGlobe.registerMouseEvent('LEFT_CLICK', function(e) {})
  ```

**Step 2. <font color=red>坐标转换</font>**:
&ensp;&ensp;&ensp;&ensp;鼠标事件执行方法中的形参包含当前鼠标点击的一些信息,可以获取其中的 position 位置信息用于图形绘制，其中鼠标点击获取到的 position 位置坐标为屏幕坐标，需要将屏幕坐标转换为经纬度坐标进行图形绘制；

- Example:
  ```Javascript
  //屏幕坐标转世界坐标
  var cartesian = webGlobe.viewer.getCartesian3Position(movement.position, cartesian);
  //世界坐标转地理坐标（弧度）
  var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
  //地理坐标（弧度）转经纬度坐标：纬度、经度、高程
  var lng = Cesium.Math.toDegrees(cartographic.longitude);
  var lat = Cesium.Math.toDegrees(cartographic.latitude);
  var height = cartographic.height;
  ```

**Step 3. <font color=red>添加点、线实体</font>**:
&ensp;&ensp;&ensp;&ensp;调用几何绘制控制 `CesiumZondy.Manager.EntityController` 的 `appendPoint()` 方法/ `appendLine()` 方法传入相关经纬度坐标信息以及其他的信息添加图形，完成此步后可在三维场景中看到添加的点/线等图形；

- Example:

  ```Javascript
  //构造几何绘制控制对象
  var entityController = new CesiumZondy.Manager.EntityController({
    viewer: webGlobe.viewer
  });
  //添加点：经度、纬度、高程、名称、像素大小、颜色、外边线颜色、边线宽度
  entityController.appendPoint(lng, lat, height, '点', 10, new Cesium.Color(1, 0, 0, 1), new Cesium.Color(1, 1, 0, 1), 2);
  ```

  ```Javascript
  //添加线：名称、点数组、线宽、线颜色、是否贴地形
  entityController.appendLine('不贴地线', allPoint, 2, new Cesium.Color(1, 0, 0, 0.8), true, {});

  ```

**Step 4. <font color=red>注销鼠标事件</font>**:
&ensp;&ensp;&ensp;&ensp;调用 Cesium 三维球控件 `Cesium.WebSceneControl()` 的 `unRegisterMouseEvent()` 方法注销已添加的鼠标事件，完成此步后，点击鼠标不再触发鼠标事件。

- Example:
  ```Javascript
  //注销鼠标事件
  webGlobe.unRegisterMouseEvent('LEFT_CLICK');
  ```


## 标注

&ensp;&ensp;&ensp;&ensp;地图标注是将空间位置信息点与地图关联，通过图标、窗口等形式把点相关的信息展现到地图上。地图标注也是WebGIS中的比较重要的功能之一，在大众应用中较为常见。基于地图标注，丰富GIS应用，可以为用户提供更多个性化的地图服务，如标注兴趣点等。

&ensp;&ensp;&ensp;&ensp;地图标注的应用比较灵活，提供用户交互式标注功能，以及在程序中预先加载标注等多种方式。用户交互式标注，指在地图上知道大概位置，用户通过鼠标交互添加标注。如果已知要标注点的位置信息与其他属性，就可以直接在程序中处理并添加，在地图上叠加显示标注点。地图标注的表现形式多样，包括简单的图片标注、冒泡信息窗口标注、聚合标注等。


|  类名/方法名          |     API说明    |
| -------------- |----------------|
| CesiumZondy.Manager.LabelLayer / appendBillboard() | 添加图片标注到地图 |
| CesiumZondy.Manager.LabelLayer / appendLabel() | 添加文本标注到地图 |
| CesiumZondy.Manager.LabelLayer / appendLabelIcon()、appendLabelIconComm() | 添加图片+文本标注到地图 |
| CesiumZondy.Manager.PopupController / appendPopup() |  PopUp 标注，弹窗实现 |



### 图片标注

<a href="http://develop.smaryun.com/#/demo/cesium/drawGraphic/drawGraphic-icon" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1208-drawGraphic-icon.png" alt="图片标注" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Manager.LabelLayer`注记图层管理对象，调用`appendBillboard()`方法可实现图片标注的添加，需要设置基本必要信息，如：图片标注的经纬度、高程、名称、图标文件路径、图片宽度、高度等信息。

- Example:

  ```javascript
  //构造注记图层管理对象
  var labelLayer = new CesiumZondy.Manager.LabelLayer({
    viewer: webGlobe.viewer,
  })

  //添加图片标注（经度、纬度、高程、名称、图片地址、图标宽度、图标高度）
  var icon = labelLayer.appendBillboard(114.3992, 30.5062, 0, '图标', './static/data/picture/icon.png', 50, 50)
  ```

### 文本标注

<a href="http://develop.smaryun.com/#/demo/cesium/drawGraphic/drawGraphic-label" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1209-drawGraphic-label.png" alt="文本标注" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Manager.LabelLayer`注记图层管理对象，调用`appendLabel()`方法可实现文本标注的添加，需要设置基本必要信息，如：文本标注的经纬度、高程、文本内容；还可设置各项样式信息：字体、颜色、样式、标签位置等。

- Example:

  ```javascript
  //构造注记图层管理对象
  var labelLayer = new CesiumZondy.Manager.LabelLayer({
    viewer: webGlobe.viewer,
  })

  //添加文字标注
  label = labelLayer.appendLabel(
    //经度、纬度、高程
    114.3992,
    30.5062,
    0,
    //文本内容
    '光谷广场',
    {
      //文字大小、字体样式
      font: '20pt 楷体',
      //文本颜色
      fillColor: Cesium.Color.YELLOW,
      //文本样式，FILL：只填充；OUTLINE：只显示轮廓；FILL_AND_OUTLINE：填充颜色并显示轮廓
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      //边线颜色
      outlineColor: Cesium.Color.RED,
      //边线宽度
      outlineWidth: 2,
      //文本垂直方向与坐标点的相对位置：LEFT、CENTER、RIGHT
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      //文本水平方向与坐标点的相对位置：LEFT、CENTER、RIGHT
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    }
  )
  ```


### 图文标注

<a href="http://develop.smaryun.com/#/demo/cesium/drawGraphic/drawGraphic-labelicon" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1210-drawGraphic-labelicon.png" alt="图文标注" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：关键接口为`CesiumZondy.Manager.LabelLayer`类提供的`appendLabelIconComm()`方法、`appendLabelIcon()`方法，实现图文标注的添加。在实际应用场景中可根据具体应用需求选择调用不同的方法。

（1）调用`appendLabelIcon()`方法，设置各项基本信息，可实现图文标注的添加；

- Example:
  ```javascript
  //构造注记图层管理对象
  var labelLayer = new CesiumZondy.Manager.LabelLayer({
    viewer: webGlobe.viewer,
  })
  //方法一
  var labelIcon = labelLayer.appendLabelIcon(
    //文本内容
    '湖北省老年大学',
    //经度、纬度、高度
    114.3639,
    30.5603,
    0,
    //文字大小、字体
    '16pt 宋体',
    //文字颜色
    new Cesium.Color(0 / 255, 0 / 255, 0 / 255, 0.8),
    //图片地址
    './static/data/picture/icon.png',
    //图片宽度、高度
    50,
    50,
    //最远显示距离：相机到注记的距离大于该值 注记不显示
    10000000,
    //最近显示距离：相机到注记的距离小于该值 注记不显示
    1,
    //图片位置：'center','top','bottom'
    'center'
  )
  ```

（2）调用`appendLabelIconComm()`方法，传入构造的位置、图片、文本对象等参数信息，同样也可实现图文标注的添加，此方法对接 Cesium 原生属性，可实现更加丰富的效果；

- Example:
  ```javascript
  //位置（x、y、z）
  var position = Cesium.Cartesian3.fromDegrees(114.36517991431259, 30.56206615740468, 10)
  //图片对象
  var billboardGraphics = new Cesium.BillboardGraphics({
    //图片地址
    image: './static/data/picture/icon.png',
    //图片宽度
    width: 64,
    //图片高度
    height: 64,
    //随远近缩放
    pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e5, 3.0, 1.5e7, 0.5),
    //随远近隐藏
    translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0),
  })
  //文本对象
  var labelGraphics = new Cesium.LabelGraphics({
    //文本
    text: '湖北省博物馆',
    //文字大小、字体
    font: '20pt 宋体',
    //文字颜色
    fillColor: Cesium.Color.BLACK,
    //文本垂直位置
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    //文本水平位置
    horizontalOrigin: Cesium.HorizontalOrigin.BOTTOM,
    //偏移量
    pixelOffset: new Cesium.Cartesian2(0.0, -64 / 4), //x,y方向偏移 相对于屏幕
    //随远近缩放
    pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
    //随远近隐藏
    translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0),
  })
  //添加图标注记（文字内容、描述、位置、图片对象、文本对象）
  labelIcon1 = labelLayer.appendLabelIconComm('湖北省博物馆', '坐落于湖北省武汉市武昌区东湖风景区', position, billboardGraphics, labelGraphics)
  ```

&ensp;&ensp;&ensp;&ensp;其中，位置对象需使用 Cesium.Cartesian3 类来构造，图片对象需由 Cesium.BillboardGraphics 构造，文本对象需由 Cesium.LabelGraphics 构造，这三个类都属于 Cesium 原生提供的类，具体用法可参考其 API 文档。


### Popup标注

<a href="http://develop.smaryun.com/#/demo/cesium/drawGraphic/drawGraphic-popup" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1211-drawGraphic-popup.png" alt="气泡标注" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：关键接口为`CesiumZondy.Manager.PopupController`类提供的`appendPopup()`方法，实现气泡弹窗的添加；可分别通过`removePopup()、clearPopups()、refreshPopups()`方法移除、更新 Popup 标注。


- Example:

  ```javascript
  //构造气泡弹窗控制对象
  var popupController = new CesiumZondy.Manager.PopupController({
    viewer: webGlobe.viewer,
  })

  //添加PopUP
  var popup = popupController.appendPopup(
    //容器div的id
    'popup',
    //文本
    '<center>黄鹤楼</center>位于湖北省武汉市长江南岸的武昌蛇山之巅',
    //坐标位置
    Cesium.Cartesian3.fromDegrees(114.30252372618706, 30.544641875459394),
    //偏移量
    [0, 0],
    //弹窗的关闭按钮点击回调函数
    function() {
      popupController.removePopup(popup, 'popup', {})
    }
  )
  //刷新
  popupController.refreshPopups()
  ```
  

## 查询

&ensp;&ensp;&ensp;&ensp;查询是WebGIS中最常用的核心功能之一，广泛应用于各类项目中。通过对空间和属性要素的查询，提取需要的信息，与地图联动进行展示，满足应用的需求。

&ensp;&ensp;&ensp;&ensp;查询定位在应用中很常见，根据不同的应用需求，可以选择不同的查询方式、实现方式以及表现方式。查询方式：基于GIS的特性，查询主要包括几何查询、属性条件查询以及两者结合的复合查询，以及OID查询。

- 几何查询有点击、画线、画圆、拉框、多边形五种操作方式，以操作的空间范围作为限定条件进行查询；
- 属性条件查询以要素属性限定条件进行查询；
- 复合查询则是两者的结合，空间范围组合属性条件，统一查询满足要求的空间要素；
- - OID查询：根据地图要素的唯一标识OID进行查询；

|  类名/方法名          |     API说明    |
| -------------- |----------------|
| CesiumZondy.Query.MapDocQuery / beginQuery() | 二维地图文档查询，支持几何、属性、OID查询 |
| CesiumZondy.Query.G3DDocQuery / queryG3DFeature() | 三维模型数据查询，支持几何、属性、OID查询 |
| CesiumZondy.Manager.AnalysisManager / startCustomDisplay() | M3D单体查询，模型高亮 |
|  /   | M3D交互编辑 |


### 二维地图文档查询

&ensp;&ensp;&ensp;&ensp;基于二维地图文档的要素查询，提供几何、属性、OID查询方式，以及复合查询，即查询三维场景中加载的二维地图文档的要素信息，包括要素的几何信息与属性信息。

&ensp;&ensp;&ensp;&ensp;具体实现：先初始化查询参数`CesiumZondy.Query.MapDocQuery`类对象，设置查询属性条件等参数后，调用`beginQuery()`方法进行查询，然后在回调中获取处理查询到的要素信息，解析所需的几何信息与属性信息进行展示。

<a href="http://develop.smaryun.com/#/demo/cesium/query/query-2dByAtt" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1301-query-2dByAtt.png" alt="二维地图文档要素查询" style="zoom:80%;" />
</a>


&ensp;&ensp;&ensp;&ensp;以<font color=red>属性查询</font>为例：

- Example：

  ```javascript
  var queryParam = new CesiumZondy.Query.MapDocQuery()
  //查询图层的URL路径
  //queryParam.gdbp = encodeURI("gdbp://MapGisLocal/北京市/ds/行政区/sfcls/北京市");
  queryParam.docName = '北京市'
  queryParam.mapIndex = 0
  queryParam.layerID = 0
  queryParam.structs = '{"IncludeAttribute":true,"IncludeGeometry":true,"IncludeWebGraphic":false}'
  //设置要素的属性条件
  queryParam.where = "省名='北京'"
  //服务器的ip
  queryParam.ip = ip
  queryParam.port = port
  queryParam.beginQuery(
    function(result) {
      //查询结果处理
    },
    function quryError(err) {
      alert(err)
    }
  )
  ```

  ```javascript
  if (result != null) {
    data = result
    //解析显示要素的属性信息
    document.getElementById('code').value = result.SFEleArray[0].AttValue[2]
    document.getElementById('name').value = result.SFEleArray[0].AttValue[3]
    document.getElementById('spell').value = result.SFEleArray[0].AttValue[4]
    document.getElementById('population').value = result.SFEleArray[0].AttValue[40]
    //解析要素的几何信息
    var GeompointArray = new Array()
    for (var pointlength = 0; pointlength < result.SFEleArray[0].fGeom.RegGeom[0].Rings[0].Arcs[0].Dots.length; pointlength++) {
      var PntCartesian3 = Cesium.Cartesian3.fromDegrees(result.SFEleArray[0].fGeom.RegGeom[0].Rings[0].Arcs[0].Dots[pointlength].x, result.SFEleArray[0].fGeom.RegGeom[0].Rings[0].Arcs[0].Dots[pointlength].y, 10)
      GeompointArray.push(PntCartesian3)
    }
    GeompointArray.push(GeompointArray[0])
    //构造几何绘制控制对象
    var entityController = new CesiumZondy.Manager.EntityController({
      viewer: webGlobe.viewer,
    })
    //构造区对象
    var polygon = {
      name: '立体区',
      polygon: {
        //坐标点
        hierarchy: GeompointArray,
        //是否指定各点高度
        perPositionHeight: true,
        //颜色
        material: new Cesium.Color(33 / 255, 150 / 255, 243 / 255, 0.5),
        //轮廓线是否显示
        outline: true,
        //轮廓线颜色
        outlineColor: Cesium.Color.BLACK,
      },
    }
    //绘制图形通用方法：对接Cesium原生特性
    var stericPolygon = entityController.appendGraphics(polygon)
  }
  ```

### 三维模型数据查询

&ensp;&ensp;&ensp;&ensp;基于三维模型数据的要素查询，提供几何、属性、OID查询方式，以及复合查询，即查询三维场景中加载的三维模型数据的要素信息，包括三维模型数据的属性、几何等要素信息。

&ensp;&ensp;&ensp;&ensp;具体实现：先构造`CesiumZondy.Query.G3DDocQuery`三维地图文档查询对象，配置相关参数后调用 `queryG3DFeature`方法执行查询，然后在回调中获取处理查询到的要素信息，并在三维场景中展示。

<a href="http://develop.smaryun.com/#/demo/cesium/query/query-geomquery" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1302-query-geomquery.png" alt="三维模型数据查询" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;以<font color=red>几何查询</font>为例：

- Example:
  ```javascript
  var queryParam = new CesiumZondy.Query.G3DDocQuery()
  //查询图层的URL路径
  queryParam.gdbp = encodeURI('gdbp://MapGisLocal/示例数据/ds/三维示例/sfcls/景观_模型')
  //设置查询结果结构
  queryParam.structs = '{"IncludeAttribute":true,"IncludeGeometry":true,"IncludeWebGraphic":false}'
  //几何查询
  //设置查询方式
  queryParam.geometryType = 'Point3D'
  //设置查询的点坐标
  queryParam.geometry = 92.37674872254775 + ',' + 163.57024299752067 + ',' + 21
  //服务器的ip
  queryParam.serverIp = ip
  queryParam.serverPort = port
  queryParam.queryG3DFeature(
    function(result) {},
    function(err) {}
  )
  ```

### M3D单体查询

&ensp;&ensp;&ensp;&ensp;M3D单体查询，针对的是M3D数据，实现在三维场景中展示 M3D 模型数据并实现单体查询功能。

<a href="http://develop.smaryun.com/#/demo/cesium/query/query-m3dquery" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1303-query-m3dquery.png" alt="M3D单体查询" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：结合鼠标点击事件，在点击事件回调函数中先通过`Cesium.WebSceneControl.Scene`类的`pick()`方法来选取要素，然后调用`CesiumZondy.Manager.AnalysisManager`类的`startCustomDisplay()`方法来实现模型高亮。

- Example:
  ```javascript
  //构造鼠标事件管理对象
  var mouseEventManager = new CesiumZondy.Manager.MouseEventManager({
    viewer: webGlobe.viewer,
  })
  //注册鼠标左键单击事件
  mouseEventManager.registerMouseEvent('LEFT_CLICK', highlightPicking)
  ```

- Example:

  ```javascript
  /*鼠标左键单击事件回调：模型高亮*/
  function highlightPicking(movement) {
    //根据鼠标点击位置选择对象
    var pickedFeature = webGlobe.scene.pick(movement.position)

    //获取要素的瓦片集
    var currentLayer = [pickedFeature.tileset]
    //获取名称属性
    var title = pickedFeature.getProperty('name')
    //采用_分割
    var values = title.split('_')
    //获取数组中第三个数值，即为要素的ID
    var vlueNumber = parseInt(values[2])
    //构建数组
    var idList = [vlueNumber]
    //构建参数：设置颜色
    var options = {
      //高亮颜色
      color: new Cesium.Color(255 / 255, 255 / 255, 0 / 255, 1),
      //高亮模式：REPLACE为替换
      colorBlendMode: Cesium.Cesium3DTileColorBlendMode.REPLACE,
    }

    //构造分析功能管理对象
    var analysisManager = new CesiumZondy.Manager.AnalysisManager({
      viewer: webGlobe.viewer,
    })
    //开始闪烁查找到的模型
    analysisManager.startCustomDisplay(currentLayer, idList, options)
  }
  ```


## 分析

&ensp;&ensp;&ensp;&ensp;具备全空间一体化分析能力，提供模型压平、动态剖切等专业分析功能；提供可视域分析、地形开挖、洪水淹没分析、填挖方计算等地形分析功能。

|  类名/方法名          |     API说明    |
| -------------- |----------------|
| Cesium.VisiblityAnalysis()  |  通视分析  |
| CesiumZondy.Manager.AnalysisManager / createDynamicCutting() |  动态剖切、开挖分析、卷帘分析 |
| CesiumZondy.Manager.AdvancedAnalysisManager / createFlood() | 洪水淹没分析 |
| CesiumZondy.Manager.AdvancedAnalysisManager / createViewshedAnalysis() | 可视域分析 |
| CesiumZondy.Manager.AdvancedAnalysisManager / createSkyLine() | 天际线分析 |
| CesiumZondy.Manager.AdvancedAnalysisManager / createSceneProjector() |  视频投放  |
| CesiumZondy.Manager.AdvancedAnalysisManager / createModelFlatten() |  模型压平  |
| CesiumZondy.Manager.AdvancedAnalysisManager / createAspectAnalysis() |  坡向分析  |
| CesiumZondy.Manager.AdvancedAnalysisManager / createSlopeAnalysis() |  坡度分析  |
| CesiumZondy.Manager.AdvancedAnalysisManager / createCutFill()、startCutFill() |  填挖方计算  |
| CesiumZondy.Manager.AdvancedAnalysisManager / createAnimation() |  动画漫游  |


### 通视分析

&ensp;&ensp;&ensp;&ensp;通视分析，用于检测当前三维场景中两点之间是否可以没有阻碍的看到。

<a href="http://develop.smaryun.com/#/demo/cesium/analysis/analysis-visibility" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1401-analysis-visibility.png" alt="通视分析" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：通过 Cesium 三维球控件 `Cesium.WebSceneControl()` 对象的 `registerMouseEvent()` 方法在三维场景里面自定义注册鼠标事件完成通视分析两个点的拾取，通过两点通视分析对象 `Cesium.VisiblityAnalysis()`实现两点通视分析。

**Step 1. <font color=red>创建通视分析</font>**：
&ensp;&ensp;&ensp;&ensp;初始化两点通视分析对象 `Cesium.VisiblityAnalysis()` ;

- Example:
  ```Javascript
  //初始化通视分析类
  visiblity = new Cesium.VisiblityAnalysis();
  ```

**Step 2. <font color=red>添加通视分析</font>**：
&ensp;&ensp;&ensp;&ensp;将两点通视分析对象 `Cesium.VisiblityAnalysis()` 添加到 Cesium 三维球控件中;

- Example:
  ```Javascript
  //添加通视分析显示
  viewer.scene.VisualAnalysisManager.add(visiblity);
  ```

**Step 3. <font color=red>注册鼠标事件</font>**：
&ensp;&ensp;&ensp;&ensp;调用 Cesium 三维球控件 `Cesium.WebSceneControl()` 的 `registerMouseEvent()` 方法注册鼠标事件, 以下事例中的匿名函数为触发鼠标事件后执行的方法，完成此步后，在三维场景中点击鼠标左键可触发点击事件，点击完成后进入匿名函数；

- Example:
  ```Javascript
  //注册事件
  webGlobe.registerMouseEvent('LEFT_CLICK', function(e) {});
  webGlobe.registerMouseEvent('RIGHT_CLICK', function(e) {});
  webGlobe.registerMouseEvent('MOUSE_MOVE',  function(e) {});
  ```

**Step 4. <font color=red>设置两点通视分析参数</font>**：
&ensp;&ensp;&ensp;&ensp;给两点通视分析对象设置进行两点通视分析使用的必要参数。

- Example:
  ```Javascript
   //设置通视分析观察点
   visiblity.viewPosition = cartesian;
   //设置通视分析结果点
   visiblity.targetPosition = cartesian;
  ```

### 动态剖切

&ensp;&ensp;&ensp;&ensp;此功能对已加载的M3D数据进行任意距离的剖切，动态的显示或隐藏一部分数据。

<a href="http://develop.smaryun.com/#/demo/cesium/analysis/analysis-dynamiccut" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1402-analysis-dynamiccut.png" alt="动态剖切" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createDynamicCutting()` 方法创建剖切对象实例，通过设置剖切面距离进行数据剖切分析。

**Step 1. <font color=red>创建切面</font>**：
&ensp;&ensp;&ensp;&ensp;初始化切面对象 `Cesium.ClippingPlane()` ; 

* Example:
  ``` Javascript
  //进行剖切分析的面，从上往下切，Cesium.Cartesian3中第一个参数是左右，第二个参数是前后，第三个参数是上下
  var plane = new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -1.0), -500.0)
  ```

**Step 2. <font color=red>获取剖切切面</font>**：
&ensp;&ensp;&ensp;&ensp;创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createDynamicCutting()` 方法创建剖切对象实例, 并获取剖切切面；

* Example:
  ``` Javascript
   //初始化分析功能管理类
   var analysisManager = new CesiumZondy.Manager.AnalysisManager({
       viewer: webGlobe.viewer
   });
   //创建剖切对象实例
   dynaCut = analysisManager.createDynamicCutting(landscapeLayer, [plane], {
       color: new Cesium.Color(0.0, 1.0, 1.0, 0.3)
   });
  ```

**Step 3. <font color=red>设置剖切面距离</font>**：
&ensp;&ensp;&ensp;&ensp;通过设置切面回调函数，动态设置剖切面距离完成动态剖切分析。

* Example:
  ``` Javascript
  //设置切面回调函数
  dynaCut.planes[0].plane.plane = new Cesium.CallbackProperty(function(date) {
      //设置剖切面距离
      plane.distance = distance;
      return Cesium.Plane.transform(plane, landscapeLayer[0].modelMatrix, new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0));
  }, false);
  ```


### 开挖分析

&ensp;&ensp;&ensp;&ensp;开挖分析，指对已加载的M3D数据进行任意距离深度开挖，动态的显示或隐藏一部分数据。

<a href="http://develop.smaryun.com/#/demo/cesium/analysis/analysis-excavate" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1403-analysis-excavate.png" alt="开挖分析" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现： 先初始化M3D模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法加载M3D数据后，再创建 `Cesium.ClippingPlane()` 切面对象，创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createDynamicCutting()` 方法创建开挖分析对象通过设置剖切面距离进行数据开挖分析。

**Step 1. <font color=red>加载数据</font>**：
&ensp;&ensp;&ensp;&ensp;初始化M3D模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法传入M3D数据服务地址，即可加载浏览数据；

* Example:
  ``` Javascript
  //构造M3D模型层管理对象
  var m3dLayer = new CesiumZondy.Layer.M3DLayer({
      viewer: webGlobe.viewer
  });
  var drilllayer = m3dLayer.append(
      "http://develop.smaryun.com:6163/igs/rest/g3d/钻孔_2_钻孔模型s", {
          autoReset: false,
      }
  );
  //加载M3D地图文档（服务地址，配置参数）
  landscapeLayer = m3dLayer.append('http://develop.smaryun.com:6163/igs/rest/g3d/钻孔分层点_Sur_000_Ent', {});
  ```

**Step 2. <font color=red>创建切面</font>**：
&ensp;&ensp;&ensp;&ensp;初始化切面对象 `Cesium.ClippingPlane()` ; 

* Example:
  ``` Javascript
   //开挖面设置,这五个面分别表示前后左右，底面，其中底面用于控制开挖深度
   var clippingPlanes = [
       new Cesium.ClippingPlane(new Cesium.Cartesian3(3, 0.0, 0.0), -1500.0),
       new Cesium.ClippingPlane(new Cesium.Cartesian3(-3, 0.0, 0.0), -1500.0),
       new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 3, 0.0), -1500.0),
       new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, -3, 0.0), -1500.0),
       new Cesium.ClippingPlane(new Cesium.Cartesian3(0.0, 0.0, -5), 0.0)
   ]
  ```

**Step 3. <font color=red>创建开挖分析</font>**：
&ensp;&ensp;&ensp;&ensp;化M3D模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法加载M3D数据后，创建 `Cesium.ClippingPlane()` 切面对象，创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createDynamicCutting()` 方法创建开挖分析对象, 并获取剖切切面；

* Example:
  ``` Javascript
    //初始化分析功能管理类
    var analysisManager = new CesiumZondy.Manager.AnalysisManager({
        viewer: webGlobe.viewer
    });
    //创建开挖分析实例
    dynaCut = analysisManager.createExcavateAnalysis({
        //图层信息
        tileSet: landscapeLayer[0],
        //开挖面的形状
        planes: planes,
        //裁剪面材质
        material: new Cesium.Color(0.2, 0.4, 0.3, 0.7),
        //边界线颜色
        edgeColor: new Cesium.Color(0.2, 0.4, 0.3, 0.7),
        //边界线宽度
        edgeWidth: 3,
        //裁减法线方向，默认值为 false
        unionClippingRegions: false,
        //开挖坐标
        longitude: 113.0402,
        latitude: 30.0264,
        height: 0
    });
  ```

**Step 4. <font color=red>设置剖切面距离</font>**：
&ensp;&ensp;&ensp;&ensp;通过设置切面回调函数，动态设置剖切面距离完成动态剖切分析。

* Example:
  ``` Javascript
  dynaCut.planes[0].plane.plane = new Cesium.CallbackProperty(function(date) {
      console.log(planes);
      for (var i = 0; i < planes.length; i++) {
          if (i === planes.length - 1) {
              var plane = planes[i];
              plane.distance = distance;
              Cesium.Plane.transform(plane, landscapeLayer[0].modelMatrix, new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0));
          }
      }
  }, false);
  ```

### 卷帘分析

&ensp;&ensp;&ensp;&ensp;卷帘分析目前通过剖切功能实现，即对已加载的两个M3D数据进行任意距离的剖切，动态的显示或隐藏一部分数据，一个显示的同时不显示另一个数据，打到卷帘效果。

<a href="http://develop.smaryun.com/#/demo/cesium/analysis/analysis-rollershutters" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1404-analysis-rollershutters.png" alt="卷帘分析" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createDynamicCutting()` 方法创建两个M3D数据的切面对象通过设置剖切面距离进行数据剖切分析，实现卷帘效果。

**Step 1. <font color=red>创建切面对象</font>**：
&ensp;&ensp;&ensp;&ensp;创建切面对象 `Cesium.ClippingPlane()` ; 

* Example:
  ``` Javascript
   //进行剖切分析的面，向右切
   var plane = new Cesium.ClippingPlane(new Cesium.Cartesian3(1, 0, 0), -200.0)
   //进行剖切分析的面，向左切
   var plane1 = new Cesium.ClippingPlane(new Cesium.Cartesian3(-1, 0, 0), -200.0)
  ```

**Step 2. <font color=red>创建剖切对象</font>**：
&ensp;&ensp;&ensp;&ensp;创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createDynamicCutting()` 方法创建剖切对象实例, 并获取剖切切面；

* Example:
  ``` Javascript
   //初始化分析功能管理类
   var analysisManager = new CesiumZondy.Manager.AnalysisManager({
       viewer: webGlobe.viewer
   });
   //创建剖切对象实例
   dynaCut = analysisManager.createDynamicCutting(landscapeLayer, [plane], {
       color: new Cesium.Color(0.0, 1.0, 1.0, 0.3)
   });
  ```

**Step 3. <font color=red>通过切面回调完成动态剖切分析</font>**：
&ensp;&ensp;&ensp;&ensp;通过设置切面回调函数，动态设置剖切面距离完成动态剖切分析。

* Example:
  ``` Javascript
  //设置切面回调函数
  planetEntity.plane.plane = new Cesium.CallbackProperty(function(date) {
      //设置剖切面距离
      plane.distance = distance;
      return Cesium.Plane.transform(plane, tileset[0].modelMatrix, new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0));
  }, false);
  //设置切面回调函数
  planetEntity1.plane.plane = new Cesium.CallbackProperty(function(date) {
      //设置剖切面距离
      plane1.distance = distance1;
      return Cesium.Plane.transform(plane1, tileset[0].modelMatrix, new Cesium.ClippingPlane(Cesium.Cartesian3.UNIT_X, 0.0));
  }, false);
  ```


### 洪水淹没分析

&ensp;&ensp;&ensp;&ensp;洪水淹没分析，即在三维场景下动态模拟洪水淹没分析的场景，根据设定的高程与范围分析洪水淹没区域，可应用在抗洪抢险、水库管理等领域，辅助决策。支持三维模型、地形等数据应用场景。

<a href="http://develop.smaryun.com/#/demo/cesium/analysis/analysis-floor" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1405-analysis-floor.png" alt="洪水淹没分析" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createFlood()` 方法创建洪水淹没分析示例，将结果显示到三维球控件上。

**Step 1. <font color=red>创建洪水淹没分析</font>**：
&ensp;&ensp;&ensp;&ensp;初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createFlood()` 方法创建洪水淹没分析示例；

* Example:
  ``` Javascript
  //初始化高级分析功能管理类
  var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
      viewer: viewer
  });
  //初始化洪水淹没分析类
  flood = advancedAnalysisManager.createFlood();
  //设置洪水淹没分析区域点集
  flood.dotsList = newArray;
  //设置洪水淹没区域最底高度
  flood.minHeight = Number(document.getElementById('minHeight').value <= 0 ? 0 : document.getElementById('minHeight').value);
  //设置洪水淹没区域最高高度
  flood.maxHeight = Number(document.getElementById('maxHeight').value <= 0 ? 30 : document.getElementById('maxHeight').value);
  //设置洪水上涨速度
  flood.floodSpeed = Number(document.getElementById('floodSpeed').value <= 0 ? 1 : document.getElementById('floodSpeed').value);
  //水纹频率 指波浪的个数
  flood.frequency = Number(document.getElementById('frequency').value <= 0 ? 1000 : document.getElementById('frequency').value);
  //水纹速度
  flood.animationSpeed = Number(document.getElementById('animationSpeed').value <= 0 ? 0.01 : document.getElementById('animationSpeed').value);
  //水波的高度
  flood.amplitude = Number(document.getElementById('amplitude').value <= 0 ? 10 : document.getElementById('amplitude').value);
  //指定水面颜色 和 透明度
  flood.floodColor = new Cesium.Color(0.2, 0.5, 0.4, 0.7);
  // 指定光线强度
  flood.specularIntensity = 3.0;
  ```

**Step 2. <font color=red>洪水淹没结果显示</font>**：
&ensp;&ensp;&ensp;&ensp;将结果显示到三维球控件上。

* Example:
  ``` Javascript
  //添加洪水淹没结果显示
  webGlobe.scene.VisualAnalysisManager.add(flood);
  ```


### 可视域分析

&ensp;&ensp;&ensp;&ensp;可视域分析，用于检测当前三维场景中某个点朝一个方向看的时候可以看到的区域。

<a href="http://develop.smaryun.com/#/demo/cesium/analysis/analysis-visiblerange" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1406-analysis-visiblerange.png" alt="可视域分析" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：先通过 Cesium 三维球控件 `Cesium.WebSceneControl()` 对象的 `registerMouseEvent()` 方法在三维场景里面自定义注册鼠标事件完成可视域分析点的拾取；然后初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createViewshedAnalysis()` 方法实现可视域分析。

**Step 1. <font color=red>加载数据</font>**：
&ensp;&ensp;&ensp;&ensp;初始化 M3D 模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法传入 M3D 数据服务地址，即可加载浏览数据；

- Example:
  ```Javascript
  //构造M3D模型层管理对象
  var m3dLayer = new CesiumZondy.Layer.M3DLayer({
      viewer: webGlobe.viewer
  });
  //加载M3D地图文档（服务地址，配置参数）
  landscapeLayer = m3dLayer.append('http://develop.smaryun.com:6163/igs/rest/g3d/ZondyModels', {});
  ```

**Step 2. <font color=red>创建可视域分析</font>**：
&ensp;&ensp;&ensp;&ensp;初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createViewshedAnalysis()` 方法实现可视域分析;

- Example:
  ```Javascript
  //初始化高级分析功能管理类
  var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
      viewer: viewer
  });
  //创建可视化分析对象
  viewshed3d = advancedAnalysisManager.createViewshedAnalysis();
  ```

**Step 3. <font color=red>注册鼠标事件</font>**：
&ensp;&ensp;&ensp;&ensp;调用 Cesium 三维球控件 `Cesium.WebSceneControl()` 的 `registerMouseEvent()` 方法注册鼠标事件, 以下事例中的匿名函数为触发鼠标事件后执行的方法，完成此步后，在三维场景中点击鼠标左键可触发点击事件，点击完成后进入匿名函数；

- Example:
  ```Javascript
  //注册事件
  webGlobe.registerMouseEvent('LEFT_CLICK', function(e) {});
  webGlobe.registerMouseEvent('RIGHT_CLICK', function(e) {});
  webGlobe.registerMouseEvent('MOUSE_MOVE', function(e) {});
  ```

**Step 4. <font color=red>设置可视域分析参数</font>**：
&ensp;&ensp;&ensp;&ensp;给可视域分析对象设置进行可视域分析使用的必要参数；

- Example:
  ```Javascript
  //设置观察点坐标
  viewshed3d.viewPosition = cartesian;
  //设置可视域结果点
  viewshed3d.targetPosition = cartesian;
  ```

**Step 5. <font color=red>添加可视域分析</font>**：
&ensp;&ensp;&ensp;&ensp;将可视域分析对象 `Cesium.ViewshedAnalysis()` 添加到 Cesium 三维球控件中。

- Example:
  ```Javascript
  //添加可视域分析结果显示
  viewer.scene.VisualAnalysisManager.add(viewshed3d);
  ```


### 天际线分析

&ensp;&ensp;&ensp;&ensp;天际线分析，用于检测当前视角的天际线，并绘制在三维场景中。

<a href="http://develop.smaryun.com/#/demo/cesium/analysis/analysis-skyline" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1407-analysis-skyline.png" alt="天际线分析" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：先初始化 M3D 模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法加载 M3D 数据后，再初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createSkyLine()` 方法创建天际线分析。


**Step 1. <font color=red>加载数据</font>**：
&ensp;&ensp;&ensp;&ensp;初始化 M3D 模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法传入 M3D 数据服务地址，即可加载浏览数据；

- Example:
  ```Javascript
  //构造M3D模型层管理对象
  var m3dLayer = new CesiumZondy.Layer.M3DLayer({
      viewer: webGlobe.viewer
  });
  //加载M3D地图文档（服务地址，配置参数）
  landscapeLayer = m3dLayer.append('http://develop.smaryun.com:6163/igs/rest/g3d/ZondyModels', {});
  ```

**Step 2. <font color=red>创建天际线分析</font>**：
&ensp;&ensp;&ensp;&ensp;初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createSkyLine()` 方法创建天际线分析。

- Example:
  ```Javascript
  //初始化高级分析功能管理类
  var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
      viewer: webGlobe.viewer
  });
  //创建天际线实例
  skyLineAn = advancedAnalysisManager.createSkyLine()
  ```


### 视频投放

&ensp;&ensp;&ensp;&ensp;视频投放，即在三维场景中加载色块、图片、视屏等功能。

&ensp;&ensp;&ensp;&ensp;具体实现：主要初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createSceneProjector` 方法创建场景投放示例，实现场景投影分析。

**Step 1. <font color=red>创建场景投影对象</font>**：
&ensp;&ensp;&ensp;&ensp;初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createSceneProjector()` 方法创建场景投放示例; 

* Example:
  ``` Javascript
  //初始化高级分析功能管理类
  var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
      viewer: viewer
  });
  //初始化场景投影对象
  scenePro = advancedAnalysisManager.createSceneProjector(2);
  ```

**Step 2. <font color=red>注册鼠标事件</font>**：
&ensp;&ensp;&ensp;&ensp;调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `registerMouseEvent()` 方法注册鼠标事件, 以下事例中的匿名函数为触发鼠标事件后执行的方法，完成此步后，在三维场景中点击鼠标左键可触发点击事件，点击完成后进入匿名函数；

* Example:
  ``` Javascript
  //注册事件
  webGlobe.registerMouseEvent('LEFT_CLICK', function(e) {});
  webGlobe.registerMouseEvent('RIGHT_CLICK', function(e) {});
  ```

**Step 3. <font color=red>设置场景投影参数</font>**：
&ensp;&ensp;&ensp;&ensp;给场景投影对象设置进行场景投影使用的必要参数。

* Example:
  ``` Javascript
  //设置投影观察点
  scenePro.viewPosition = cartesian;
  //数据url路径
  scenePro.textureSource = './static/data/picture/world.jpg';
  //设置场景投影结果点
  scenePro.targetPosition = cartesian;
  ```


### 模型压平

&ensp;&ensp;&ensp;&ensp;模型压平，即将加载完成的M3D数据进行压平处理。一般可通过交互式方式实现模型压平功能。

<a href="http://develop.smaryun.com/#/demo/cesium/analysis/analysis-modelflatten" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1408-analysis-modelflatten.png" alt="模型压平" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：添加交互式绘制工具 `Cesium.DrawPolygonTool()` 选择绘制区域, 初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createModelFlatten()` 方法，创建模型压平分析，将结果显示到三维球控件上。

**Step 1. <font color=red>创建交互式绘制区工具</font>**：
&ensp;&ensp;&ensp;&ensp;初始化 `Cesium.DrawPolygonTool()` 对象，完成交互式绘制区工具的创建；

* Example:
  ``` Javascript
  //创建交互式绘制区工具
  var drawPolygon = new Cesium.DrawPolygonTool(webGlobe.viewer, getDrawResult);
  ```

**Step 2. <font color=red>激活交互式绘制区工具</font>**：
&ensp;&ensp;&ensp;&ensp;调用 `Cesium.DrawPolygonTool()` 对象的activeTool()方法，激活交互式绘制区工具，完成此步后，可在三维场景中通过鼠标左键点击绘制多边形。

* Example:
  ``` Javascript
  //激活交互式绘制区工具
  drawPolygon.activeTool();
  ```

**Step 3. <font color=red>顶点处理</font>**：
&ensp;&ensp;&ensp;&ensp;将交互式选取的点处理；

* Example:
  ``` Javascript
  /*对绘制区域的顶点循环处理一下，以便用于模型压平参数的赋值*/
  var array = [];
  for (let i = 0; i < positionsArray.length; i++) {
      let point = positionsArray[i];
      let resPoint = new Cesium.Cartesian3;
      let invserTran = new Cesium.Matrix4;
      Cesium.Matrix4.inverse(tileset[0]._root.transform, invserTran);
      Cesium.Matrix4.multiplyByPoint(invserTran, point, resPoint);
      resPoint.y = -resPoint.y;
      array.push(new Cesium.Cartesian2(resPoint.x, resPoint.y));
  }
  array.push(array[0]);
  ```

**Step 4. <font color=red>创建模型压平分析</font>**：
&ensp;&ensp;&ensp;&ensp;初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createModelFlatten()` 方法，创建模型压平分析

* Example:
  ``` Javascript
  //初始化高级分析功能管理类
  var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
      viewer: webGlobe.viewer
  });
  advancedAnalysisManager.createModelFlatten(landscapeLayer[0], {
      //是否进行压平。值为true时执行压平
      isFlatten: true,
      //将高度压到0
      height: 0,
      //压平多边形的顶点序列长度
      arrayLength: positionsArray.length,
      //顶点序列。顶点序列需要闭合，也就是说，例如一个矩形是四个顶点ABCD，那序列就应该是【ABCDA】
      array: array
  });
  ```

**Step 5. <font color=red>结果显示</font>**：
&ensp;&ensp;&ensp;&ensp;将结果显示到三维球控件上。

* Example:
  ``` Javascript
  //场景渲染（渲染最新的压平效果）
  webGlobe.viewer.scene.requestRender();
  ```


### 坡向分析

&ensp;&ensp;&ensp;&ensp;此功能用于地形数据的坡向分析。 坡向是指地表面上一点的切平面的法线在水平面的投影与该点的正北方向的夹角，描述该点高程值改变量的最大变化方向。坡向分析作用是：决定地表面局部地面接收阳光和重新分配太阳辐射量的重要地形因子，直接造成局部地区气候特征差异，影响各项农业生产指标。

<a href="http://develop.smaryun.com/#/demo/cesium/analysis/analysis-aspectAnalysis" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1409-analysis-aspectAnalysis.png" alt="坡向分析" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：初始化地形图层管理类 `CesiumZondy.Layer.TerrainLayer` 并调用 `append()` 方法加载地形数据后，跳转视点，创建高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` ，调用 `createAspectAnalysis()` 方法进行坡向分析。

**Step 1. <font color=red>加载数据</font>**：
&ensp;&ensp;&ensp;&ensp;初始化地形图层管理类 `CesiumZondy.Layer.TerrainLayer` 并调用 `append()` 方法传入三维地形数据地图服务地址，即可加载浏览数据；

- Example:
  ```Javascript
  //构造地形图层管理类
  var terrain = new CesiumZondy.Layer.TerrainLayer({
      viewer: webGlobe.viewer
  });
  //加载三维地形地图文档（服务地址，配置参数）
  var { protocol, ip, port } = window.webclient;
  var terrainlayer = terrain.append(`http://develop.smaryun.com:6163/igs/rest/g3d/terrain`, {});
  //初始化视图功能管理类
  var sceneManager = new CesiumZondy.Manager.SceneManager({
      viewer: webGlobe.viewer
  });
  ```

**Step 2. <font color=red>坡向分析</font>**：
&ensp;&ensp;&ensp;&ensp;创建高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` ，调用 `createAspectAnalysis()` 方法进行坡向分析。

- Example:
  ```Javascript
    //初始化高级分析功能管理类
    var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
        viewer: webGlobe.viewer
    });
    webGlobe.viewer.scene.globe.depthTestAgainstTerrain = true;
    //进行坡向分析
    var aspectAna = advancedAnalysisManager.createAspectAnalysis([
        Cesium.Color.ALICEBLUE,
        Cesium.Color.ANTIQUEWHITE,
        Cesium.Color.AQUA,
        Cesium.Color.AQUAMARINE,
        Cesium.Color.AZURE,
        Cesium.Color.BEIGE
    ]);
  ```


### 坡度分析

&ensp;&ensp;&ensp;&ensp;此功能用于地形数据的坡度分析。 坡度是指过地表一点的切平面与水平面的夹角，描述地表面在该点的倾斜程度。坡度分析的作用是：影响地表物质流动与能量转换的规模与强度，制约生产力空间布局。

<a href="http://develop.smaryun.com/#/demo/cesium/analysis/analysis-slopeAnalysis" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1410-analysis-slopeAnalysis.png" alt="坡度分析" style="zoom:80%;" />
</a>


&ensp;&ensp;&ensp;&ensp;具体实现：初始化地形图层管理类 `CesiumZondy.Layer.TerrainLayer` 并调用 `append()` 方法加载地形数据后，跳转视点，创建高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` ，调用 `createSlopeAnalysis()` 方法进行坡度分析。

**Step 1. <font color=red>加载数据</font>**：
&ensp;&ensp;&ensp;&ensp;初始化地形图层管理类 `CesiumZondy.Layer.TerrainLayer` 并调用 `append()` 方法传入三维地形数据地图服务地址，即可加载浏览数据；

- Example:
  ```Javascript
  //构造地形图层管理类
  var terrain = new CesiumZondy.Layer.TerrainLayer({
      viewer: webGlobe.viewer
  });
  //加载三维地形地图文档（服务地址，配置参数）
  var { protocol, ip, port } = window.webclient;
  var terrainlayer = terrain.append(`http://develop.smaryun.com:6163/igs/rest/g3d/terrain`, {});
  //初始化视图功能管理类
  var sceneManager = new CesiumZondy.Manager.SceneManager({
      viewer: webGlobe.viewer
  });
  ```

**Step 2. <font color=red>坡度分析</font>**：
&ensp;&ensp;&ensp;&ensp;创建高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` ，调用 `createSlopeAnalysis()` 方法进行坡度分析。

- Example:
  ```Javascript
    //初始化高级分析功能管理类
    var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
        viewer: webGlobe.viewer
    });
    webGlobe.viewer.scene.globe.depthTestAgainstTerrain = true;
    //进行坡度分析
    var slopeAna = advancedAnalysisManager.createSlopeAnalysis([
        Cesium.Color.ALICEBLUE,
        Cesium.Color.ANTIQUEWHITE,
        Cesium.Color.AQUA,
        Cesium.Color.AQUAMARINE,
        Cesium.Color.AZURE,
        Cesium.Color.BEIGE
    ]);
  ```


### 填挖方计算

&ensp;&ensp;&ensp;&ensp;此功能提供用于计算将一定范围内的地形填平到某一高度时，需要挖开或填充的空间体积，可以应用于智慧城市，地质，公安等多个领域的业务功能，实用性强。

<a href="http://develop.smaryun.com/#/demo/cesium/analysis/analysis-cube" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1411-analysis-cube.png" alt="填挖方计算" style="zoom:80%;" />
</a>


&ensp;&ensp;&ensp;&ensp;具体实现：初始化 `Cesium.DrawElement()` 对象在三维场景中添加交互式绘制区控件用来界定量算区域，初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` 对象，调用高级分析功能管理类的 `createCutFill()` 方法创建填挖方分析对象, 调用高级分析功能管理类的 `startCutFill()` 方法执行填挖方分析。

**Step 1. <font color=red>创建交互式绘制工具</font>**：
&ensp;&ensp;&ensp;&ensp;初始化 `Cesium.DrawElement()` 对象，完成交互式绘制工具的创建；

* Example:
  ``` Javascript
  //创建交互式绘制工具
  var drawElement = new Cesium.DrawElement(webGlobe.viewer);
  ```

**Step 2. <font color=red>激活交互式绘制区工具</font>**：
&ensp;&ensp;&ensp;&ensp;调用 `Cesium.DrawElement()` 对象的startDrawingPolygon()方法，激活交互式绘制区工具，完成此步后，可在三维场景中通过鼠标左键点击绘制多边形；

* Example:
  ``` Javascript
  //激活交互式绘制区工具
  drawElement.startDrawingPolygon();
  ```

**Step 3. <font color=red>创建填挖方分析</font>**：
&ensp;&ensp;&ensp;&ensp;初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager（）` 对象，调用高级分析功能管理类的 `createCutFill()` 方法创建填挖方分析对象；

* Example:
   ``` Javascript
   //初始化高级分析功能管理类
   var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
       viewer: viewer
   });
   //创建填挖方实例
   cutFill = advancedAnalysisManager.createCutFill(0.0, {
       //设置x方向采样点个数
       xPaneNum: document.getElementById("x").value <= 0 ? 16 : document.getElementById("x").value,
       //设置y方向采样点个数参数
       yPaneNum: document.getElementById("y").value <= 0 ? 16 : document.getElementById("y").value,
       //设置填挖规整高度
       Height: document.getElementById("z").value <= 0 ? 16 : document.getElementById("z").value,
       //返回结果的回调函数
       callback: function(result) {
           document.getElementById("height").value = result.minHeight.toFixed(2) + '~' + result.maxHeight.toFixed(2);
           document.getElementById("surfaceArea").value = result.surfaceArea;
           document.getElementById("cutVolume").value = result.cutVolume;
           document.getElementById("fillVolume").value = result.fillVolume;
       }
   });
   ```

**Step 4. <font color=red>执行填挖方分析</font>**：
&ensp;&ensp;&ensp;&ensp;调用高级分析功能管理类的 `startCutFill()` 方法执行填挖方分析。

* Example:
  ``` Javascript
  //开始执行填挖方分析
  advancedAnalysisManager.startCutFill(cutFill, positions);
  ```


### 动画漫游

&ensp;&ensp;&ensp;&ensp;此功能用于在三维场景中实现动画漫游功能，即让模型沿着路径漫游，默认为第一人称漫游，可修改动画漫游方式。本示例实现让飞机模型按既定的路径漫游。在实际应用中，可结合具体应用场景开发，如绘制路径进行动画漫游等功能需求等。

<a href="http://develop.smaryun.com/#/demo/cesium/analysis/analysis-animation" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1412-analysis-animation.png" alt="动画漫游" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：初始化高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager` 对象，调用高级分析功能管理类的 `createAnimation()` 方法创建动画漫游对象实例实现动画漫游功能。

**Step 1. <font color=red>创建动画漫游对象</font>**：
&ensp;&ensp;&ensp;&ensp;初始化高级分析功能管理类对象`CesiumZondy.Manager.AdvancedAnalysisManager`，调用`createAnimation()`方法创建动画漫游对象； 

* Example:
  ``` Javascript
      //初始化高级分析功能管理类
      var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
           viewer: webGlobe.viewer
      });
      //创建动画漫游对象
      animation = advancedAnalysisManager.createAnimation({
          exHeight: 9,
          isLoop: false,
          //漫游模型url
          modelUrl: './static/data/model/WuRenJi.glb',
          //完成动画漫游回调函数
          complete: function () {
              alert('完毕');
          }
      });
  ```

**Step 2. <font color=red>实现动画漫游控制</font>**：
&ensp;&ensp;&ensp;&ensp;通过动画漫游对象的属性和方法实现动画漫游控制，即通过属性设置漫游路径、漫游方式、速度、俯仰角、方位角等参数，分别通过调用方法`start()`、`stop()`开始和结束漫游。

* Example:
  ``` Javascript
      //漫游路径
      positions = Cesium.Cartesian3.fromDegreesArray([
                  117.213063, 31.812956, 117.213162, 31.812389, 117.212929, 31.812056, 117.213275, 31.811582,
                  117.21348, 31.811513, 117.214141, 31.811682, 117.21497, 31.811691, 117.216318, 31.811454,
                  117.216962, 31.812037, 117.217893, 31.812298, 117.218607, 31.811488, 117.219466, 31.810935,
                  117.224439, 31.810929, 117.225266, 31.811119, 117.225308, 31.81131, 117.224819, 31.811724,
                  117.225189, 31.811928, 117.225676, 31.811624, 117.225843, 31.811943, 117.22625, 31.812183,
                  117.226292, 31.81281, 117.225888, 31.813287, 117.226093, 31.814059, 117.22564, 31.814582,
                  117.225953, 31.814731, 117.225611, 31.814954, 117.22576, 31.815233, 117.224073, 31.816329,
                  117.223694, 31.81627, 117.222769, 31.817007, 117.222259, 31.816871, 117.221922, 31.816707,
                  117.221653, 31.816788, 117.22151, 31.817002, 117.221039, 31.816891, 117.220395, 31.816352,
                  117.220166, 31.815734, 117.219804, 31.815607, 117.219461, 31.815122, 117.21878, 31.814846,
                  117.218297, 31.815275, 117.217975, 31.815172, 117.217142, 31.815229, 117.216753, 31.815124,
                  117.216652, 31.814308, 117.215726, 31.814049, 117.214769, 31.813517, 117.214111, 31.813717,
                  117.213552, 31.814099, 117.213024, 31.813954, 117.212897, 31.813892, 117.213224, 31.813681,
                  117.212788, 31.813147, 117.212928, 31.813018, 117.213063, 31.812956
      ]);
      //设置路径
      animation.positions = positions;
      //漫游方式：1-跟随、2-锁定第一视角、3-上帝视角
      animation.animationType = 2;
      //漫游速度
      animation.speed = 1;
  ```

* Example:
  ``` Javascript
      function start() {
          //开始漫游
          animation.start();
      }
      function pause() {
          //暂停漫游
          animation.pause = true;
      }
      function stop() {
          //停止漫游
          animation.stop();
      }
  ```


## 场景特效

&ensp;&ensp;&ensp;&ensp;支持常用粒子特效，如雨、雪、雾、火焰、烟雾等，模拟自然天气或动态场景。

|  类名/方法名          |     API说明    |
| -------------- |----------------|
| CesiumZondy.Manager.AdvancedAnalysisManager / createRain() | 降雨粒子特效 |
| CesiumZondy.Manager.AdvancedAnalysisManager / createSnow() | 降雪粒子特效  |
| CesiumZondy.Manager.AdvancedAnalysisManager / createFog() | 雾粒子特效 |
| CesiumZondy.Manager.AdvancedAnalysisManager / createFire() | 火焰粒子特效  |
| CesiumZondy.Manager.AdvancedAnalysisManager / createStableParticle() | 自定义粒子特效  |

### 降雨特效

<a href="http://develop.smaryun.com/#/demo/cesium/clientView/clientView-rain" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1501-clientView-rain.png" alt="降雨特效" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Manager.AdvancedAnalysisManager`高级分析功能类对象，然后调用`createRain()`方法添加降雨粒子特效，可通过可选参数实现降雨效果的调整。

* Example:
  ``` Javascript
  //初始化高级分析功能管理类
  var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({ viewer: webGlobe.viewer });
  //添加下雨特效
  advancedAnalysisManager.createRain({
      //色调调整
      hueShift: 0.7
  });

  ```

### 降雪特效

<a href="http://develop.smaryun.com/#/demo/cesium/clientView/clientView-snow" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1502-clientView-snow.png" alt="降雪特效" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Manager.AdvancedAnalysisManager`高级分析功能类对象，然后调用`createSnow()`方法添加降雪粒子特效，可通过可选参数实现降雪效果的调整。

* Example:
  ``` Javascript
  //初始化高级分析功能管理类
  var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({ viewer: webGlobe.viewer });
  //添加下雪特效
  advancedAnalysisManager.createSnow({
      //色调
      hueShift: 0.7
  });
  ```

### 雾特效

<a href="http://develop.smaryun.com/#/demo/cesium/clientView/clientView-fog" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1503-clientView-fog.png" alt="雾特效" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Manager.AdvancedAnalysisManager`高级分析功能类对象，然后调用`createFog()`方法添加雾粒子特效，可通过可选参数实现雾效的调整。

* Example:
  ``` Javascript
  //初始化高级分析功能管理类
  var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({ viewer: webGlobe.viewer });
  //添加雾效
  advancedAnalysisManager.createFog({
      //雾特效透明度
      alpha:0.5
  });

  ```

### 火焰特效

<a href="http://develop.smaryun.com/#/demo/cesium/clientView/clientView-fire" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1504-clientView-fire.png" alt="火焰特效" style="zoom:100%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Manager.AdvancedAnalysisManager`高级分析功能类对象，然后调用`createFire()`方法添加火焰粒子特效，可通过可选参数实现火焰特效的调整。

- Example:

  ```javascript
  //初始化高级分析功能管理类
  var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({ viewer: webGlobe.viewer })
  //位置点
  let position = [114.40103, 30.4679, 12]
  //火焰图片url
  let imageUrl = './static/data/effect/fire.png'
  //添加火焰粒子特效
  fireObj = advancedAnalysisManager.createFire(imageUrl, position)
  ```

- Example:
  ```Javascript
      if (name === 'emissionRate') {
              //排放率
              fireObj.emissionRate = parseFloat(newValue);
      }
      if (name === 'particleSize') {
          var particleSize = parseFloat(newValue);
          //图像尺寸
          fireObj.imageSize = new Cesium.Cartesian2(particleSize, particleSize);
      }
      if (name === 'particleLife') {
          //粒子生命
          fireObj.particleLife = parseFloat(newValue);
      }
      if (name === 'speed') {
          //速度
          fireObj.speed = parseFloat(newValue);
      }
      if (name === 'startScale') {
          //起始规模
          fireObj.startScale = parseFloat(newValue);
      }
      if (name === 'endScale') {
          //终止规模
          fireObj.endScale = parseFloat(newValue);
      }
  ```

### 自定义粒子特效（烟雾）


&ensp;&ensp;&ensp;&ensp;烟雾粒子特效，与火焰粒子特效相同，可以模拟火灾等各类火焰烟雾、水汽烟雾相关的场景。可通过自定义粒子特效接口实现烟雾粒子特效。

<a href="http://develop.smaryun.com/#/demo/cesium/clientView/clientView-smoke" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1505-clientView-smoke.png" alt="烟雾特效" style="zoom:100%;" />
</a>


&ensp;&ensp;&ensp;&ensp;具体实现：首先构造`CesiumZondy.Manager.AdvancedAnalysisManager`高级分析功能类对象，然后调用`createStableParticle()`方法分别添加火焰与烟雾粒子特效，可通过可选参数实现烟雾特效的调整。

* Example:
    ``` Javascript
        //初始化高级分析功能管理类
        var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
            viewer: webGlobe.viewer
        });
        //粒子发射位置点
        let position = [114.40103, 30.4679, 12];
        //火焰与烟雾图片url
        let imageUrl1 = './static/data/effect/fire1.png';
        let imageUrl2 = './static/data/effect/smoke1.png';
        //添加烟雾粒子特效
        fireObj = advancedAnalysisManager.createStableParticle(imageUrl1, position, {
            emissionRate: 3,
            startScale: 1,
            endScale: 3
        });
        //添加烟雾粒子特效
        smokeObj = advancedAnalysisManager.createStableParticle(imageUrl2, position, {
            emissionRate: 35,
            startScale: 5,
            endScale: 8
        });
    ```

* Example:
    ``` Javascript
    if (name === 'emissionRate') {
        //排放率
        smokeObj.emissionRate = parseFloat(newValue);
    }
    if (name === 'particleSize') {
        var particleSize = parseFloat(newValue);
        //图像尺寸
        smokeObj.imageSize = new Cesium.Cartesian2(particleSize, particleSize);

    }
    if (name === 'particleLife') {
        smokeObj.particleLife = parseFloat(newValue);
    }
    if (name === 'speed') {
        smokeObj.speed = parseFloat(newValue);
    }

    if (name === 'startScale') {
        //起始规模
        smokeObj.startScale = parseFloat(newValue);
    }
    if (name === 'endScale') {
        //终止规模
        smokeObj.endScale = parseFloat(newValue);
    }
    ```


## 轨迹模拟


### 模型漫游

&ensp;&ensp;&ensp;&ensp;模型漫游，此功能用于在三维场景中添加模型动态运动显示效果。

<a href="http://develop.smaryun.com/#/demo/cesium/track/track-flow" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1601-track-flow.png" alt="模型漫游" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `cruiseModel()` 方法创建模型漫游，通过 `startCruiseModel()` 方法开始模型漫游，通过 `stopCruiseModel()` 方法暂停模型漫游, 通过 `clearCruiseModel()` 方法清除模型漫游。

**Step 1. <font color=red>创建模型漫游</font>**:
&ensp;&ensp;&ensp;&ensp;创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `cruiseModel()` 方法创建模型漫游；

- Example:
  ```Javascript
  //初始化分析功能管理类
  var analysisManager = new CesiumZondy.Manager.AnalysisManager({
    viewer: webGlobe.viewer
  });
  //模型漫游
  var modelEntity = analysisManager.cruiseModel(
    //模型URL地址
    './static/data/model/GroundVehicle.glb',
    //漫游点集
    positionArr,
    //是否显示漫游路径
    true,
    //漫游时钟频率
    10
  );
  ```

**Step 2. <font color=red>开始模型漫游</font>**:
&ensp;&ensp;&ensp;&ensp;创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `startCruiseModel()` 方法开始模型漫游。

- Example:
  ```Javascript
  /*开始漫游*/
  analysisManager.startCruiseModel();
  ```


### 动态航线

&ensp;&ensp;&ensp;&ensp;动态航线，此功能用于动态显示两点之间的动态飞行轨迹效果。

<a href="http://develop.smaryun.com/#/demo/cesium/track/track-dynamicflight" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1602-track-dynamicflight.png" alt="动态航线" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：初始化 `CesiumZondy.Manager.AdvancedAnalysisManager()`高级分析功能管理对象，然后调用 `createDynamicPolyline()` 方法创建动态航线。

- Example:

  ```Javascript
  //开启动画
  webGlobe.viewer.clock.shouldAnimate = true;
  //构造高级分析功能管理对象
  var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({
      viewer: webGlobe.viewer
  });
  //创建动态航线
  var dynamicLine = advancedAnalysisManager.createDynamicPolyline(
      //航线起始城市经纬度
      {
          lon: 114.302312702,
          lat: 30.598026044
      },
      //航线终点城市数组，经纬度
      [
          { "lon": 115.028495718, "lat": 30.200814617 },
          { "lon": 110.795000473, "lat": 32.638540762 },
          { "lon": 111.267729446, "lat": 30.698151246 },
          { "lon": 112.126643144, "lat": 32.058588576 },
          { "lon": 114.885884938, "lat": 30.395401912 },
          { "lon": 112.190419415, "lat": 31.043949588 },
          { "lon": 113.903569642, "lat": 30.932054050 },
          { "lon": 112.226648859, "lat": 30.367904255 },
          { "lon": 114.861716770, "lat": 30.468634833 },
          { "lon": 114.317846048, "lat": 29.848946148 },
          { "lon": 113.371985426, "lat": 31.704988330 },
          { "lon": 109.468884533, "lat": 30.289012191 },
          { "lon": 113.414585069, "lat": 30.368350431 },
          { "lon": 112.892742589, "lat": 30.409306203 },
          { "lon": 113.160853710, "lat": 30.667483468 },
          { "lon": 110.670643354, "lat": 31.748540780 }
      ],
      {
          //是否已经添加动态航线
          isAdd: false,
          //航线颜色：默认红色
          color: new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1)
      }
  );
  ```



## 客户端可视化


### 热力图

&ensp;&ensp;&ensp;&ensp;热力图，此功能用于在当前三维场景中添加热力图显示效果。

<a href="http://develop.smaryun.com/#/demo/cesium/clientView/clientView-heatmap" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1701-clientView-heatmap.png" alt="热力图" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用关键接口 `createHeatMap()` 添加热力图。

* Example:
  ``` Javascript
  var analysisManager = new CesiumZondy.Manager.AnalysisManager({
      viewer: webGlobe.viewer
  })
  //创建热力图（范围、最大值、最小值）
  var instance = analysisManager.createHeatMap(bounds, valueMin, valueMax, data, options);
  ```

### 动态圆

&ensp;&ensp;&ensp;&ensp;动态圆，此功能用于在当前场景中绘制动态的圆显示效果，可应用于任意场景中。

<a href="http://develop.smaryun.com/#/demo/cesium/clientView/clientView-dynamiccircle" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1702-clientView-dynamiccircle.png" alt="动态圆" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：先初始化 `Cesium.CircleScanEffect()` 动态圆对象，然后通过分析功能管理类`CesiumZondy.Manager.AnalysisManager` 的`addSceneEffect()`方法添加动态圆显示；`removeSceneEffect()`方法移除动态圆显示。

**Step 1. <font color=red>创建动态圆</font>**：
&ensp;&ensp;&ensp;&ensp;初始化动态圆对象 `Cesium.CircleScanEffect()`，注意使用动态圆功能`必须开启深度检测` ； 

* Example:
  ``` Javascript
  //开启地形深度检测（必须）
  webGlobe.viewer.scene.globe.depthTestAgainstTerrain = true;
  //初始化动态圆对象
  var scanEffect = new Cesium.CircleScanEffect(webGlobe.viewer, {
      center: Cesium.Cartesian3.fromDegrees(114.06, 22.54, 20),
      maxRadius: 5000,
      scanColor: new Cesium.Color(1, 0, 0, 1),
      duration: 8000
  });
  ```

**Step 2. <font color=red>添加/移除动态圆</font>**：
&ensp;&ensp;&ensp;&ensp;调用Cesium三维球分析功能管理类`CesiumZondy.Manager.AnalysisManager` 的`addSceneEffect()`方法添加动态圆显示，相应可调用`removeSceneEffect()`方法移除。

* Example:
  ``` Javascript
  //初始化分析功能管理类
  var analysisManager = new CesiumZondy.Manager.AnalysisManager({
      viewer: webGlobe.viewer
  });
  //添加添加场景特效-动态圆
  analysisManager.addSceneEffect(scanEffect);

  //通过removeSceneEffect()移除场景特效
  //analysisManager.removeSceneEffect(scanEffect);
  ```

### 雷达扫描圆

&ensp;&ensp;&ensp;&ensp;雷达扫描圆，此功能用于在当前场景中添加雷达扫描圆显示效果，可应用于任意场景中。

<a href="http://develop.smaryun.com/#/demo/cesium/clientView/clientView-radarscanning" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1703-clientView-radarscanning.png" alt="雷达扫描圆" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：初始化高级分析管理类 `CesiumZondy.Manager.AdvancedAnalysisManager` 的`createRadarScan()`方法创建雷达扫描圆对象，然后分别通过分析功能管理类`CesiumZondy.Manager.AnalysisManager` 的`addSceneEffect()`方法与`removeSceneEffect()`方法来添加与移除雷达扫描圆显示功能。

**Step 1. <font color=red>创建雷达扫描圆</font>**：
&ensp;&ensp;&ensp;&ensp;初始化高级分析功能管理类对象 `CesiumZondy.Manager.AdvancedAnalysisManager` ，调用`createRadarScan()`方法创建雷达扫描圆对象，注意`必须开启深度检测` ； 

* Example:
  ``` Javascript
    //开启深度检测（必须）
    webGlobe.viewer.scene.globe.depthTestAgainstTerrain = true;
    //初始化高级分析功能管理类
    var advancedAnalysisManager = new CesiumZondy.Manager.AdvancedAnalysisManager({ viewer: webGlobe.viewer });
    //创建一个雷达扫描圆对象
    var radarScanEffect = advancedAnalysisManager.createRadarScan(
        //雷达中心点
        Cesium.Cartesian3.fromDegrees(120.9558, 23.4481, 3657),
        //扫描半径
        5000,
        //扫描区域颜色
        new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1),
        //周期时间,单位毫秒
        8000
    );

  ```

**Step 2. <font color=red>添加/移除雷达扫描圆显示</font>**：
&ensp;&ensp;&ensp;&ensp;调用分析功能管理类`CesiumZondy.Manager.AnalysisManager` 的`addSceneEffect()`方法添加雷达扫描圆显示，相应可调用`removeSceneEffect()`方法移除。

* Example:
  ``` Javascript
  //初始化分析功能管理类
  var analysisManager = new CesiumZondy.Manager.AnalysisManager({
      viewer: webGlobe.viewer
  });
  //添加场景特效-雷达扫描圆
  analysisManager.addSceneEffect(radarScanEffect);
  //移除场景特效-雷达扫描圆
  //analysisManager.removeSceneEffect(radarScanEffect);
  ```


## 客户端可视化-Echarts

&ensp;&ensp;&ensp;&ensp;在三维场景中接入百度ECharts，支持三维场景中加载ECharts散点图、热力图、路径图、渐近线、自定义网格专题图等。

> 百度 ECharts：ECharts完整、详细使用方法可参考<a href="http://echarts.baidu.com/api.html#echarts" target="_blank">官方教程API</a>，开发库下载可参考<a href="http://echarts.baidu.com/download.html" target="_blank">官方下载</a>

> 对接Echarts特别说明：MapGIS Client for JavaScript在Cesium中对接了百度Echarts图表插件，若插件本身存在问题，请优先参考Echarts官网解决方案

&ensp;&ensp;&ensp;&ensp;**以散点图-空气质量为例：实现在三维场景中加载ECharts散点图，基于全国主要城市空气质量数据实现散点图的可视化。**通过关键接口`CesiumZondy.Overlayer.EchartsLayer()`来实现ECharts图层的加载。


<a href="http://develop.smaryun.com/#/demo/cesium/clientView_Echarts/echarts-air" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1801-echarts-air.png" alt="Echarts散点图-空气质量" style="zoom:80%;" />
</a>


**Step 1. <font color=red>数据准备</font>**：
&ensp;&ensp;&ensp;&ensp;准备全国主要城市的数据，包括名称、坐标点、空气质量，并按照格式要求进行处理；

* Example:
  ```javascript
  function initData() {
      data = [
          {name: '海门',value: 9},
          {name: '鄂尔多斯',value: 12},
          {name: '招远',value: 12},
          {name: '舟山',value: 12},
          ···
      ];
      geoCoordMap = {
          '海门': [121.15, 31.89],
          '鄂尔多斯': [109.781327, 39.608266],
          '招远': [120.38, 37.35],
          '舟山': [122.207216, 29.985295],
          ···
      };
  }

  function convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
              res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
              });
          }
      }
      return res;
  };
  ```

**Step 2. <font color=red>配置参数项</font>**：
&ensp;&ensp;&ensp;&ensp;创建各种需要的组件，如标题、图例、提示框等，其中最关键的是“series-系列”组件，构造完成后，即可调用`CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map)`方法，将ECharts图层添加到三维场景中。

* Example:
  ```javascript
  function initEcharts() {
      option = {
          title: {
              text: '全国主要城市空气质量 - 百度地图提供数据',
              textStyle: {
                  color: '#eee'
              },
              subtext: 'data from PM25.in',
              sublink: 'http://www.pm25.in',
              left: 'center'
          },
          legend: {
              orient: 'vertical',
              y: 'top',
              x: 'left',
              data: ['pm2.5'],
              textStyle: {
                  color: '#fff'
              }
          },
          tooltip: {
              trigger: 'item'
          },
          cesium: {
              roam: true
          },
          series: [{
                  name: 'pm2.5',
                  type: 'scatter',
                  coordinateSystem: 'cesium',
                  data: convertData(data),
                  symbolSize: function (val) {
                      return val[2] / 10;
                  },
                  showEffectOn: 'render',
                  rippleEffect: {
                      brushType: 'stroke'
                  },
                  hoverAnimation: true,
                  label: {
                      normal: {
                          formatter: '{b}',
                          position: 'right',
                          show: false
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: '#ddb926'
                      }
                  },
                  zlevel: 1
              },
              {
                  name: 'Top 5',
                  type: 'effectScatter',
                  coordinateSystem: 'cesium',
                  data: convertData(data.sort(function (a, b) {
                      return b.value - a.value;
                  }).slice(0, 6)),
                  symbolSize: function (val) {
                      return val[2] / 10;
                  },
                  showEffectOn: 'render',
                  rippleEffect: {
                      brushType: 'stroke'
                  },
                  hoverAnimation: true,
                  label: {
                      normal: {
                          formatter: '{b}',
                          position: 'right',
                          show: true
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: '#f4e925',
                          shadowBlur: 10,
                          shadowColor: '#333'
                      }
                  },
                  zlevel: 1
              }
          ]
      }
      layer = new CesiumZondy.Overlayer.EchartsLayer(map, option).addTo(map);
  }
  ```

## 客户端可视化-MapV

&ensp;&ensp;&ensp;&ensp;在三维场景中接入MapV，支持三维场景中加载MapV热力图、等。

> 对接Mapv特别说明：MapGIS Client for JavaScript在Cesium中对接了MapV插件，若插件本身存在问题，请优先参考<a target="_blank" href="https://mapv.baidu.com/">Mapv官方教程</a>寻找解决方案

&ensp;&ensp;&ensp;&ensp;**以MapV热力图为例**：实现在三维场景中加载MapV热力图，热力图采用特殊高亮的形式显示访客热衷的页面区域和访客所在的地理区域。通过关键接口 `CesiumZondy.Overlayer.MapvLayer()` 来实现MapV图层的加载。

<a href="http://develop.smaryun.com/#/demo/cesium/clientView_MapV/mapv-heater" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/1901-mapv-heater.png" alt="MapV热力图" style="zoom:80%;" />
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
&ensp;&ensp;&ensp;&ensp;根据前面的步骤，将 `map` 、 `dataSet` 、 `options` 三个参数传入 `CesiumZondy.Overlayer.MapvLayer` 中创建对象，创建完成数据在三维场景中加载展示。

* Example:
  ``` javascript
      var mapvLayer = new CesiumZondy.Overlayer.MapvLayer(map, dataSet, options);
  ```



## 客户端空间分析

&ensp;&ensp;&ensp;&ensp;在三维场景中接入第三方开源空间分析库Turf.js，支持客户端实现缓冲区分析、泰森多边形、TIN三角网、中心点、插值、光滑曲线、求交判断等功能。


> Turf.js： turf是JavaScript编写的模块化地理空间引擎，具体使用请查看<a target="_blank" href="http://turfjs.org/">turf官方教程</a>和<a target="_blank" href="https://github.com/Turfjs/turf">下载</a>

> GeoJSON.js： 地理数据转换成<a target="_blank" href="http://geojson.org/">GeoJSON</a>格式，<a target="_blank"  href="https://github.com/caseycesari/GeoJSON.js">GeoJSON.js官方地址</a>


&ensp;&ensp;&ensp;&ensp;**以缓冲区分析为例**，给定一个缓冲半径进行缓冲区分析，单位支持 `miles 米`，`kilometers 千米`，`degrees 度`。


<a href="http://develop.smaryun.com/#/demo/cesium/clientAnalysis/clientAnalysis-buffer" target="_blank">
 <img src="./static/demo/cesium/source/img/dev/2001-clientAnalysis-buffer.png" alt="客户端缓冲区分析" style="zoom:80%;" />
</a>

&ensp;&ensp;&ensp;&ensp;具体实现：先通过Cesium三维球控件 `Cesium.WebSceneControl()` 加载三维场景控件后，使用 `Turf.js` 空间分析库的 `turf.buffer()` 方法进行缓冲区分析。


**Step 1. <font color=red>执行缓冲区分析</font>**：
 &ensp;&ensp;&ensp;&ensp; 准备`点`、`线`、`面`要素数据，根据`缓冲区分析算法`得到缓冲区分析结果，实现关键步骤如下：

 &ensp;&ensp;（1）准备`点`、`线`、`面`要素数据

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

 &ensp;&ensp;（2）执行 `缓冲区分析算法`，返回缓冲结果要素数据

* Example:
   ```javascript
    geojson = turf.buffer(origindata, 1.5, {
      units: 'miles'
    });
   ```

**Step 2. <font color=red>显示缓冲区分析结果</font>**：
 &ensp;&ensp;&ensp;&ensp; 更新数据，将得到的缓冲结果要素数据添加到地图中。

* Example:
   ```javascript
      map.dataSources.add(Cesium.GeoJsonDataSource.load(geojson, {
        stroke: Cesium.Color.BLACK,
        fill: Cesium.Color.GRAY,
        strokeWidth: 15
      }));
   ```