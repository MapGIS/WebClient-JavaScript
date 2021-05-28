## 开发流程

&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript 产品遵循 Vue 组件标准化开发流程，组件资源提供了开箱即用的函数和属性，允许外部组件调用和扩展。组件间低耦合，可自由组合和多级封装。且产品源码开源，允许用户按需进行源码级改造。从而大幅度的提高应用开发效率，真正实现应用敏捷式开发。

&ensp;&ensp;&ensp;&ensp;开发流程：

1. 按需配置环境，如安装 node、npm、Webpack 等
2. 创建并初始化项目生成 package.json，按需配置 eslint、路由、编译等项目参数
3. 安装 MapGIS Client for JavaScript 及依赖库
4. 模块化引入组件资源
5. 编码及测试，按需引入自动化测试工具
6. 项目编译打包
7. 按需发布，配置 Webpack、安装依赖、注册 NPM 账号，执行发布命令

<center>
  <img src="./static/demo/component/source/img/Vue组件开发流程.png" alt="Vue组件开发流程" style="zoom:50%;" />
  <br>
  <div class="notes">Vue组件开发流程</div>
</center>
<br/>

## 准备开发

&ensp;&ensp;&ensp;&ensp;进行 WebGIS 应用开发，一般均采用前端开发库+GIS 服务的模式，开发者须完成如下三个步骤：

&ensp;&ensp;&ensp;&ensp;**第一步：<font color=red>安装配置开发环境</font>，包括 MapGIS 开发环境（含开发授权）、集成开发环境；**

&ensp;&ensp;&ensp;&ensp;根据实际应用需求，选择.NET 或九州系列 MapGIS 开发平台产品安装，通常包括 MapGIS Desktop 桌面工具、MapGIS IGServer 等云 GIS 产品。

&ensp;&ensp;&ensp;&ensp;例如选用.NET 版本，常用环境如下：

- MapGIS 开发包：<a href="http://smaryun.com/dev/download_detail.html#/download689" targer="_blank">MapGIS IGServer .NET x64 for Windows 开发包</a>
- MapGIS 开发授权：<a href="http://www.smaryun.com/dev/dev_auth_detail.php" targer="_blank">云开发授权</a>（基础版/高级版）
- 集成开发环境：Visual Studio Code

&ensp;&ensp;&ensp;&ensp;**第二步：<font color=red>发布 GIS 服务资源</font>，在 MapGIS IGServer 的服务管理器中发布所需的地图服务，以及扩展的功能服务等；**

&ensp;&ensp;&ensp;&ensp;基于 MapGIS Server Manager 发布地图服务的具体操作，请查看**MapGIS IGServer 操作手册**（<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag206/page1/doc770" target="_blank">.NET 版</a>，<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag212/page1/doc823" target="_blank">九州版</a>）

&ensp;&ensp;&ensp;&ensp;在访问 MapGIS IGServer 的服务时，需要先确定 GIS 服务器 IP 地址与服务端口号；在二次开发时，根据所使用的 MapGIS IGServer 平台版本以及其服务管理器中 IGServer 配置情况（ip、port），对二次开发接口中涉及的地图服务访问的 ip、port 进行相应设置。

- .NET 版：IGServer 服务管理器访问默认地址（127.0.0.1:9999）、IGServer 服务访问默认基地址（127.0.0.1:6163）
- 九州版：IGServer 服务管理器访问默认地址（127.0.0.1:8089）、IGServer 服务访问默认基地址（127.0.0.1:8089）

&ensp; &ensp; &ensp; &ensp; **第三步：<font color=red>引入 mapboxgl-vue 组件</font>**，通过 npm 方式引用 @mapgis/webclient-vue-mapboxgl，进行应用开发。我们还对 mapboxgl-vue 组件库进行了开源，以下为开源地址。

- GitHub 托管地址：<a href="https://github.com/MapGIS/WebClient-Vue" targer="_blank">https://github.com/MapGIS/WebClient-Vue</a>
- Gitee 托管地址：<a href="https://gitee.com/osmapgis/WebClient-Vue?_from=gitee_search" targer="_blank">https://gitee.com/osmapgis/WebClient-Vue</a>

### 引入开发库

#### npm 方式引入

&ensp;&ensp;&ensp;&ensp;使用此方式前请先检查电脑中是否已安装应用程序 <a href="https://nodejs.org/en/">Node.js</a>，若未安装，需要先安装<a href="https://nodejs.org/en/">Node.js</a>环境。

&ensp;&ensp;&ensp;&ensp;中地版本安装

> 由于 mapbox 本身不支持 EPSG：4326， 本公司内部修改版实现支持 EPSG：4326

&ensp;&ensp;&ensp;&ensp;@mapgis/webclient-vue-mapboxgl 支持一层封装，除了本身需要安装以外，会内置安装 @mapgis/mapbox-gl 的依赖

```sh
# 支持 4326的坐标系的使用方式
npm install --save @mapgis/webclient-vue-mapboxgl
# 或者
yarn add @mapgis/webclient-vue-mapboxgl
```

&ensp;&ensp;&ensp;&ensp;在 main.js 中加入样式文件。

```javascript
import Mapgis2d from '@mapgis/webclient-vue-mapboxgl'
Vue.use(Mapgis2d)
```

## 开始开发

&ensp; &ensp; &ensp; &ensp; 先根据“开发环境”要求安装配置好 MapGIS 开发环境（含 MapGIS 云开发授权），通过 npm 引入 @mapgis/webclient-vue-mapboxgl 进行二次开发。

&ensp; &ensp; &ensp; &ensp; 下面示例采用在 vue 项目中通过模块化开发的方式，演示如何在网页中显示一幅 MapGIS 矢量地图。

### 数据准备

&ensp; &ensp; &ensp; &ensp; 本示例使用 MapGIS 官方云端（develop.smaryun.com）已经发布的名称为“北京市”（或“SampleDoc”）的地图文档进行演示。若您需要显示自己的地图文档，需要先附加待显示地图数据所在的地理数据库，然后通过**MapGIS Server Manager**配置 GIS 服务环境并发布地图服务。

<center>
  <img src="./static/demo/component/source/img/MapGIS发布服务.png" alt="MapGIS服务发布" style="zoom:50%; " />
  <br>
  <div class="notes">MapGIS Server Manager发布服务</div>
</center>
<br/>

> 基于 MapGIS Server Manager 发布地图服务的具体操作，请查看**MapGIS IGServer 操作手册**（<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag206/page1/doc770" target="_blank">. NET 版</a>，<a href="http://www.smaryun.com/dev/resource_center.html#/type27/tag212/page1/doc823" target="_blank">九州版</a>）

### 开发入门：创建一幅地图

> 本示例使用的开发集成工具为 Visual Studio Code（简称 VSCode），您可以根据开发习惯选择适合自己的开发工具

#### Step 1. 新建 vue 项目

&ensp; &ensp; &ensp; &ensp; 自行选择路径新建一个 vue 项目（本指南使用 vue2.x 版本），名称为 mapboxgl-vue-demo ；

<center>
  <img src="./static/demo/component/source/img/新建vue项目.png" alt="新建vue项目" style="zoom:50%; " />
  <br>
  <div class="notes">新建vue项目</div>
</center>
<br/>

#### Step 2. 引入 @mapgis/webclient-vue-mapboxgl

&ensp; &ensp; &ensp; &ensp; 在新建的 vue 项目中通过 npm 指令方式引入 @mapgis/webclient-vue-mapboxgl。

```sh
npm install --save @mapgis/webclient-vue-mapboxgl
```

&ensp; &ensp; &ensp; &ensp;在 main.js 中加入样式文件.

```javascript
import Mapgis2d from '@mapgis/webclient-vue-mapboxgl'
Vue.use(Mapgis2d)
```

#### Step 3. 加载显示地图

(1) 在上述新建的 vue 项目中，打开 src 路径下 App.vue 文件，删除新建项目时默认内容，引入 Mapbox，以及 MapboxMap 和 MapboxIgsDocLayer 两个 vue 组件；

- Example:

```javascript
import Mapbox from '@mapgis/mapbox-gl'
import { MapboxMap, MapboxIgsDocLayer } from '@mapgis/webclient-vue-mapboxgl'
```

(2)在 components 中注册 MapboxMap, MapboxIgsDocLayer 组件。

- Example:

```javascript
components: {
  MapboxMap, MapboxIgsDocLayer
}
```

(3)在 data 定义组件所需属性。

- Example:

  ```javascript
  data () {
    return {
      mapStyle: {
        // 设置版本号，一定要设置
        version: 8,
        // 添加来源
        sources: {},
        // 设置加载并显示来源的图层信息
        layers: []
      }, // 地图样式
      mapZoom: 8, // 地图初始化级数
      outerCenter: [116.39, 40.2], // 地图显示中心
      mapCrs: 'EPSG:4326',

      layerId: 'igsLayer_layerId',
      sourceId: 'igsLayer_sourceId',
      layer: {}, // 图层配置信息
      igsDocIp: 'develop.smaryun.com', // igs服务ip
      igsDocPort: '6163', // igs服务port
      igsDocName: '北京市', // igs地图服务名
    }
  }
  ```

(4)在 created 事件中使用 mapbox-gl.js 的脚本库功能。

- Example:

  ```javascript
  created() {
    // 在组件中使用mapbox-gl.js的脚本库功能
    this.mapbox = Mapbox;
  }
  ```

(5)在 template 模板中添加组件

- Example:

  ```html
  <template>
    <mapgis-web-map
      class="main"
      :mapStyle="mapStyle"
      :zoom="mapZoom"
      :center="outerCenter"
      :crs="mapCrs"
    >
      <mapgis-igs-doc-layer
        :layer="layer"
        :layerId="layerId"
        :sourceId="sourceId"
        :ip="igsDocIp"
        :port="igsDocPort"
        :serverName="igsDocName"
      >
      </mapgis-igs-doc-layer>
    </mapgis-web-map>
  </template>
  ```

(6)设置地图样式

- Example:

  ```css
  .main {
    height: 100vh;
    width: 100%;
  }
  ```

#### Step 4. 运行调试

&ensp; &ensp; &ensp; &ensp; 在 vscode 终端中输入`npm run server`进行调试。

<center>
  <img src="./static/demo/component/source/img/dev/北京市.png" alt="矢量地图文档显示效果图" style="zoom:50%; " />
  <br>
  <div class="notes">矢量地图文档显示效果图</div>
</center>
<br/>

## 服务发布

&ensp; &ensp; &ensp; &ensp; 在此以发布地图文档（REST 模式）为例，发布单个地图文档的配置操作如下：
在 MapGIS Server Manager 页面左侧导航栏中的“地图与数据服务”中，单击“发布服务”，在下拉菜单中选择“文档发布（包括 WMS/WFS/WMTS）”选项。页面跳转至发布服务配置页面。

<center>
  <img src="./static/demo/component/source/img/MapGIS发布服务.png" alt="MapGIS服务发布" style="zoom:50%; " />
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

## 控制组件

### 导航组件 - MapboxNavigationControl

**Step 1. <font color=red>导入 MapboxNavigationControl 组件</font>**:

- Example:

```javascript
import { MapboxNavigationControl } from '@mapgis/webclient-vue-mapboxgl'
```

**Step 2. <font color=red>注册 MapboxNavigationControl 组件</font>**:

- Example:

```javascript
components: {
  MapboxVectorLayer
}
```

**Step 3. <font color=red>在 template 中添加 MapboxNavigationControl 组件</font>**:

```html
<mapgis-navigation position="top-left" />
```

<center>
  <img src="./static/demo/component/source/img/dev/导航控件.png" alt="导航控件" style="zoom:50%; " />
  <br>
  <div class="notes">导航控件</div>
</center>

## UI 组件

### 地图标注 - MapboxMarker

**Step 1. <font color=red>导入 MapboxMarker 组件</font>**:

- Example:

```javascript
import { MapboxMarker } from '@mapgis/webclient-vue-mapboxgl'
```

**Step 2. <font color=red>注册 MapboxMarker 组件</font>**:

- Example:

```javascript
components: {
  MapboxMarker
}
```

**Step 3. <font color=red>在 data 中定义 MapboxGeojsonLayer 组件所需参数</font>**:

- Example:

```javascript
coordinates: [116.39, 40.2]
```

**Step 4. <font color=red>在 template 中添加 MapboxGeojsonLayer 组件</font>**:

```html
<mapgis-marker :coordinates="coordinates" color="blue" />
```

<center>
  <img src="./static/demo/component/source/img/dev/地图标注.png" alt="地图标注" style="zoom:50%; " />
  <br>
  <div class="notes">地图标注</div>
</center>

## 图层组件

### 地图文档 - MapboxIgsDocLayer

**Step 1. <font color=red>导入 MapboxIgsDocLayer 组件</font>**:

- Example:

```javascript
import { MapboxIgsDocLayer } from '@mapgis/webclient-vue-mapboxgl'
```

**Step 2. <font color=red>注册 MapboxIgsDocLayer 组件</font>**:

- Example:

```javascript
components: {
  MapboxIgsDocLayer
}
```

**Step 3. <font color=red>在 data 中定义 MapboxIgsDocLayer 组件所需参数</font>**:

- Example:

```javascript
layer: {},
layerId: 'igsLayer_layerId',
sourceId: 'igsLayer_sourceId',
igsDocIp: 'develop.smaryun.com', // igs服务ip
igsDocPort: '6163', // igs服务port
igsDocName: '北京市' // igs地图服务名
```

**Step 4. <font color=red>在 template 中添加 MapboxGeojsonLayer 组件</font>**:

```html
<mapgis-igs-doc-layer
  :layer="layer"
  :layerId="layerId"
  :sourceId="sourceId"
  :ip="igsDocIp"
  :port="igsDocPort"
  :serverName="igsDocName"
>
</mapgis-igs-doc-layer>
```

<center>
  <img src="./static/demo/component/source/img/dev/地图文档.png" alt="地图文档" style="zoom:50%; " />
  <br>
  <div class="notes">地图文档</div>
</center>
