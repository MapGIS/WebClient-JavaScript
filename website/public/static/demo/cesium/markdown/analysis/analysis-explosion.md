## 爆炸分析

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于将M3D数据爆炸分析，将数据朝指定炸开。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，初始化M3D模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法加载M3D数据后，创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createExplosion()` 方法爆炸模型。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

**Step 2. <font color=red>创建三维地图容器并加载三维球控件</font>**：
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

* Example:
  ``` Javascript
    //构造三维视图类（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {
      terrainExaggeration: 1,
    });
  ```

* Example:
  ``` html
    <div id='GlobeView'></div>
  ```

**Step 3. <font color=red>加载数据</font>**：
&ensp;&ensp;&ensp;&ensp;初始化M3D模型层管理类 `CesiumZondy.Layer.M3DLayer` 并调用 `append()` 方法传入M3D数据服务地址，即可加载浏览数据；

* Example:
  ``` Javascript
    //构造M3D模型层管理对象
    var m3dLayer = new CesiumZondy.Layer.M3DLayer({
      viewer: webGlobe.viewer
    });
    //加载M3D地图文档（服务地址，配置参数）
    landscapeLayer = m3dLayer.append('http://develop.smaryun.com:6163/igs/rest/g3d/ZondyModels', {});
  ```

**Step 4. <font color=red>爆炸模型</font>**：
&ensp;&ensp;&ensp;&ensp;创建分析功能管理类 `CesiumZondy.Manager.AnalysisManager()` ，调用 `createExplosion()` 方法爆炸模型。

* Example:
  ``` Javascript
    //初始化分析功能管理类
    var analysisManager = new CesiumZondy.Manager.AnalysisManager({
      viewer: webGlobe.viewer
    });
    analysisManager.createExplosion(option);
  ```

### 关键接口

#### 1.【三维视图的主要类】 `Cesium.WebSceneControl`

#### 2.【M3D模型层管理类】 `CesiumZondy.Layer.M3DLayer`

##### 【method】 `append(url, options)` ：添加M3D地图文档

|参数名|类型|说明|
|-|-|-|
|url|String|事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮)|
|options|Object|可选参数|

* `options` 主要参数

|参数名|类型|默认值|说明|
|-|-|-|-|
|autoReset|Boolean|true|(可选)是否自动定位|
|synchronous|Boolean|true|(可选)是否异步请求|
|loaded|function|function|(可选)回调函数|
|proxy|DefaultProxy|defaultProxy|代理|
|showBoundingVolume|Boolean|false|是否显示包围盒|
|maximumScreenSpaceError|Number|16|用于控制模型显示细节|

#### 3.【分析功能管理类】 `CesiumZondy.Manager.AnalysisManager`

##### 【method】 `createExplosion(options)` ：创建模型爆炸动画实例

* `options` 主要参数

|参数名|类型|说明|
|---|---|---|
|children|Array<child>|当前图层子节点|
|center|Cartesian3|爆炸中心|
|direction|Cartesian3|图层整体爆炸方向|
|distance|Number|沿当前方向移动距离|