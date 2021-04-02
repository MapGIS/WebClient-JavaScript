## 加载M3D景观模型

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现在三维场景中加载M3D景观模型，对接MapGIS IGServer发布的三维地图服务。

### M3D——全新的轻量级三维数据交换格式

&ensp;&ensp;&ensp;&ensp;M3D，是MapGIS定义的针对多端应用的轻量级三维数据交换格式，对海量三维数据进行网格划分与分层组织，采用流式传输模式，实现多端一体的高效解析和渲染。具备高效网络传输模式、多级LOD模型支持、WebGL无缝融合等优点。可以将多样类型、多种格式的三维数据通过M3D数据交换格式进行高效解析并渲染，能够支持的数据类型包括：精细模型（景观模型、BIM模型）、实景三维（倾斜摄影、地质体、管线）、点云（激光点云las等）、其他（栅格、地形、矢量、瓦片）等。

### 示例实现

&ensp;&ensp;&ensp;&ensp;数据准备：本示例采用的数据经过两个步骤生成，首先需在MapGIS Desktop桌面平台软件中为景观模型数据生成M3D缓存，并组织为地图文档；然后在MapGIS Server Manager服务管理器中根据地图文档发布为三维地图服务。

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.M3DLayer`类提供的`append()`方法，以此来加载M3D缓存的三维地图服务。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id='GlobeView'`的div作为三维视图的容器，并设置其样式；

**Step 3. <font color=red>构造三维场景控件</font>**：
&ensp;&ensp;&ensp;&ensp;实例化`Cesium.WebSceneControl`对象，完成此步骤后可在三维场景中加载三维球控件；

* Example:
   ``` javascript
      //构造三维视图对象（视图容器div的id，三维视图设置参数）
      var webGlobe = new Cesium.WebSceneControl('GlobeView', {});
   ```

**Step 4. <font color=red>创建并设置鼠标位置显示控件</font>**：
&ensp;&ensp;&ensp;&ensp;要展示鼠标当前位置的经纬度、高程、视角高度信息，首先需要创建`id="coordinate_location"`的label标签作为容器；然后构造`CesiumZondy.Manager.SceneManager`视图功能管理对象，并调用`showPosition()`方法为三维场景控件设置鼠标位置信息显示控件；

* Example:
   ``` javascript
      //构造视图功能管理对象（视图）
      var sceneManager = new CesiumZondy.Manager.SceneManager({
         viewer: webGlobe.viewer
      });
      //设置鼠标位置信息展示控件：经纬度、高程、视角高度（容器id）
      sceneManager.showPosition('coordinate_location');
   ```

**Step 5. <font color=red>加载数据</font>**：
&ensp;&ensp;&ensp;&ensp;构造`CesiumZondy.Layer.M3DLayer`M3D图层管理对象，调用`append()`方法，传入M3D缓存三维地图服务的URL地址即可加载浏览数据，同时可传入相关配置参数；

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

&ensp;&ensp;&ensp;&ensp;加载数据默认会自动跳转定位到数据所在位置，如果需要自定义设置跳转的位置，可在`append()`方法中设置`autoReset: false`参数，取消自动定位，然后调用`SceneManager`视图功能管理对象的`flyToEx()`方法跳转视角。

* Example:
   ``` javascript
      //视点跳转（经度，纬度，视角高度，方位角，俯仰角，翻滚角）
      sceneManager.flyToEx(114.40298522106733, 30.465568703723072, {
         height: 100.85856618500283,
         heading: -45.4940479913348135,
         pitch: -15,
         roll: 0
      });
   ```

### 关键接口

#### 1.【三维场景控件类】`Cesium.WebSceneControl(elementId, options)`

| 参数名    | 类 型             | 说 明             |
| --------- | ----------------- | ----------------- |
| elementId | Element \| String | 放置视图的div的id |
| options   | Object            | （可选）附加属性  |

* `options`属性主要参数

| 参数名           | 类 型   | 默认值 | 说 明                                                        |
| ---------------- | ------- | -------- | ------------------------------------------------------------ |
| viewerMode       | String  | ‘3D’   | （可选）初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图 |
| showInfo         | Boolean | false  | （可选）是否显示默认的属性信息框                             |
| animation        | Boolean | true   | （可选）默认动画控制不显示                                   |
| baseLayerPicker  | Boolean | true   | （可选）是否创建图层控制显示小组件                           |
| fullscreenButton | Boolean | true   | （可选）是否创建全屏控制按钮                                 |
| vrButton         | Boolean | false  | （可选）是否创建VR按钮                                       |

#### 2.【M3D模型层管理类】`CesiumZondy.Layer.M3DLayer`

##### 【method】`append(url, options)`：添加M3D地图文档服务

| 参数名  | 类 型        | 说 明    |
| ------- | ------------ | -------- |
| url     | String       | 文档服务地址 |
| options | Object       | 附加属性 |

* `options`属性主要参数

| 参数名      | 类 型   | 默认值   | 说 明                 |
| ----------- | ------- | -------- | --------------------- |
| autoReset   | Boolean | true     | （可选）是否自动定位 |
| synchronous | Boolean | true     | （可选）是否异步请求 |
| loaded      | Boolean | function | （可选）回调函数     |
|proxy|	DefaultProxy	|defaultProxy	|（可选）代理|
|showBoundingVolume|	Boolean	|false	|（可选）是否显示包围盒|
|maximumScreenSpaceError	|Number	|16|（可选）用于控制模型显示细节，值较大将会渲染更少的贴图，进而可以提高性能，而较低的值将提高视觉质量|

#### 3.【视图功能管理类】`CesiumZondy.Manager.SceneManager`

##### 【method】`showPosition(elementId, options)`：显示经纬度 高程 视角高度

| 参数名    | 类 型             | 说 明           |
| --------- | ----------------- | --------------- |
| elementId | Element \| String | 要显示的div的id |
| options   | Object            | 附加属性        |

* `options`属性主要参数

| 参数名             | 类 型   | 默认值 | 说 明                                    |
| ------------------ | ------- | ------ | ---------------------------------------- |
| showHpr            | Boolean | false  | （可选）                                 |
| showSelectTileInfo | Boolean | false  | （可选）显示当前鼠标所在位置拾取到的级别 |
| showViewLevelInfo  | Boolean | false  | （可选）显示视图级别                     |

##### 【method】`flyToEx(lon, lon, options)`：跳转到

|参数名	|类型	|说明 |
|--|--|--|
|lon|	Number		|经度|
|lon|	Number		|纬度|
|options|	Object	 |（可选）附加属性|

* `options`属性主要参数

|参数名	|类型	| 说明 |
|--|--|--|
|height|	Number|（可选）视角高度|
|duration	|Number|（可选）持续时间|
|heading	|Number	|（可选）方位角|
|pitch|	Number	|（可选）俯仰角|
|roll|	Number	|（可选）翻滚角|
