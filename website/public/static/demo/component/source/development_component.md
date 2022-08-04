## 开发流程
&ensp;&ensp;&ensp;&ensp;MapGIS Client for JavaScript  Vue组件产品遵循 Vue 组件标准化开发流程，组件资源提供了开箱即用的函数和属性，允许外部组件调用和扩展。组件间低耦合，可自由组合和多级封装。且产品源码开源，允许用户按需进行源码级改造。从而大幅度的提高应用开发效率，真正实现应用敏捷式开发。

&ensp;&ensp;&ensp;&ensp;开发流程：

1. 按需配置环境，如安装 node、npm、Webpack 等
2. 创建并初始化项目生成 package.json，按需配置 eslint、路由、编译等项目参数
3. 安装 MapGIS Client for JavaScript  Vue及依赖库
4. 模块化引入组件资源
5. 编码及测试，按需引入自动化测试工具
6. 项目编译打包
7. 按需发布，配置 Webpack、安装依赖、注册 NPM 账号，执行发布命令

<center>
  <img src="././static/demo/component/source/img/Vue组件开发流程.png" alt="Vue组件开发流程" style="zoom:50%;" />
  <br>
  <div class="notes">Vue组件开发流程</div>
</center>
<br/>


## 准备

### 数据准备
​		产品支持接入多种GIS服务标准。用户可使用已发布的GIS服务资源，或自行构建GIS服务器环境。本示例直接使用MapGIS云端GIS服务资源，以“北京市”MapGIS矢量地图服务作为加载的地图服务资源。

> 若需使用自己发布的MapGIS矢量地图服务，请先构建GIS环境并发布GIS服务，请前往<a href="http://www.smaryun.com/dev/service-space/resource?from=1#/node_id75" targer="_blank">MapGIS产品资源中心</a>，查看MapGIS 云GIS服务器产品相关帮助文档，在此不再详述。

### 创建Vue项目
​		本示例使用的以 Visual Studio Code（简称 VSCode）为例，介绍开发Vue前端项目过程。自行选择目录并创建一个 vue 项目（本指南使用 vue2.x 版本，可使用Vue脚手架创建），名称为 mapboxgl-vue-demo 。
 在创建项目前，请确保本机Node环境已安装。

**Step 1. <font color=red>安装全局vue-cli</font>**:
按住win+r，在“运行”框架中输入“cmd”命令，以管理员身份运行命令提示框，输入如下命令安装Vue脚手架：

 ```sh
npm install vue-cli -g
 ```
**Step 2. <font color=red>创建项目 mapboxgl-vue-demo</font>**:
在命令提示框中，通过cd 命令进入要创建项目的目录并下执行如下指令,项目创建成功后，将存放到该目录中：

```sh
vue init webpack mapboxgl-vue-demo
```
**Step 3. <font color=red>打开项目 mapboxgl-vue-demo</font>**:
项目创建成功后，使用VSCode打开项目：
<center>
  <img src="./static/demo/component/source/img/新建vue项目.png" alt="新建vue项目" style="zoom:50%; " />
  <br>
  <div class="notes">新建vue项目</div>
</center>
<br/>

### 安装 @mapgis/webclient-vue-mapboxgl

&ensp; &ensp; &ensp; &ensp; 在新建的 vue 项目中通过 npm 方式安装 @mapgis/webclient-vue-mapboxgl包。

```sh
npm install --save @mapgis/webclient-vue-mapboxgl
```
### 引入 @mapgis/webclient-vue-mapboxgl资源

&ensp; &ensp; &ensp; &ensp;在 main.js 中引入资源：

```javascript
import Mapgis2d from '@mapgis/webclient-vue-mapboxgl'
Vue.use(Mapgis2d)
```

## 创建一幅MapGIS矢量地图

下面示例将基于vue 项目演示如何在网页中显示一幅 MapGIS 矢量地图。

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

(7)运行调试

&ensp; &ensp; &ensp; &ensp; 在 vscode 终端中输入`npm run server`编译并运行项目。在浏览器中输入项目地址查看成果：

<center>
  <img src="./static/demo/component/source/img/dev/北京市.png" alt="矢量地图文档显示效果图" style="zoom:50%; " />
  <br>
  <div class="notes">矢量地图文档显示效果图</div>
</center>
<br/>



## 添加导航组件


&ensp; &ensp; &ensp; &ensp; 在新建的Vue项目中，继续添加导航组件（MapboxNavigationControl）。打开 src 路径下 App.vue 文件追加如下代码：

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

**Step 3. <font color=red>在 template 中添加 MapboxNavigationControl 组件模板</font>**:

```html
<mapgis-navigation position="top-left" />
```

**Step 4. <font color=red>保存并编译项目，刷新网页，查看效果：</font>**:

<center>
  <img src="./static/demo/component/source/img/dev/导航控件.png" alt="导航控件" style="zoom:50%; " />
  <br>
  <div class="notes">导航控件</div>
</center>

## 添加标注组件 

&ensp; &ensp; &ensp; &ensp; 在新建的Vue项目中，继续添加地图标注组件（MapboxMarker）。打开 src 路径下 App.vue 文件追加如下代码：

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

**Step 4. <font color=red>在 template 中添加 MapboxGeojsonLayer 组件模板</font>**:

```html
<mapgis-marker :coordinates="coordinates" color="blue" />
```

**Step 5. <font color=red>保存并编译项目，刷新网页，查看效果：</font>**:

<center>
  <img src="./static/demo/component/source/img/dev/地图标注.png" alt="地图标注" style="zoom:50%; " />
  <br>
  <div class="notes">地图标注</div>
</center>

