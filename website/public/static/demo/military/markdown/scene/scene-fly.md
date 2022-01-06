## 视点跳转

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现场景视点跳转功能，根据坐标点在三维球上进行定位跳转。此功能为场景视图的基础功能，应用非常广泛，可根据具体应用场景需求调用合适的方法。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` , 初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用视图功能管理类的如下 4 个视点跳转方法进行视点跳转。

- `flyTo`：视点跳转简单方法，根据经纬度、视角高度、跳转持续时间进行视点跳转；
- `flyToComm`：视点跳转通用方法，根据经纬度、视角高度，以及原生的可扩展参数进行视点跳转；
- `flyToEx`：视点跳转扩展方法，根据经纬度，以及可扩展的参数（包括视角高度、持续时间、方位角、俯仰角、翻滚角）进行视点跳转；
- `flyToFeatureById`：根据 ID 飞行到特定要素位置，即通过图层的某个要素进行定位跳转。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**:
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维 WebGL 的功能；

**Step 2. <font color=red>创建三维地图容器并加载三维球控件</font>**：
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的 div 作为三维视图的容器，并设置其样式，初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

- Example:

  ```Javascript
    //构造三维视图类（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {
      terrainExaggeration: 1,
    });
  ```

  ```html
    <div id="GlobeView"></div>
  ```

**Step 3. <font color=red>视点跳转</font>**:
&ensp;&ensp;&ensp;&ensp;初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，根据具体场景需求选择调用视图功能管理类的几个视点跳转方法（ `flyTo、flyToComm、flyToEx、flyToFeatureById`）进行视点跳转。

- Example:
  ```Javascript
    //初始化视图功能管理类
    var sceneManager = new CesiumZondy.Manager.SceneManager({
      viewer: webGlobe.viewer
    });
  ```

* flyTo()

* Example:
  ```Javascript
    //跳转视图(北京)
    sceneManager.flyTo(116.44, 40, 300000, 2);
  ```

- flyToComm()

* Example:
  ```Javascript
    //跳转视图（武汉）
    sceneManager.flyToComm(114.3, 30.6, 100000);
  ```

- flyToEx()

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

- flyToFeatureById()

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

### 关键接口

#### 1.【三维场景控件类】`Cesium.WebSceneControl(elementId, options)`

| 参数名    | 类 型             | 说 明                |
| --------- | ----------------- | -------------------- |
| elementId | Element \| String | 放置视图的 div 的 id |
| options   | Object            | （可选）附加属性     |

- `options`属性主要参数

| 参数名           | 类 型   | 默认值 | 说 明                                                                                  |
| ---------------- | ------- | ------ | -------------------------------------------------------------------------------------- |
| viewerMode       | String  | ‘3D’   | （可选）初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图 |
| showInfo         | Boolean | false  | （可选）是否显示默认的属性信息框                                                       |
| animation        | Boolean | true   | （可选）默认动画控制不显示                                                             |
| baseLayerPicker  | Boolean | true   | （可选）是否创建图层控制显示小组件                                                     |
| fullscreenButton | Boolean | true   | （可选）是否创建全屏控制按钮                                                           |
| vrButton         | Boolean | false  | （可选）是否创建 VR 按钮                                                               |

#### 2. 【视图功能管理类】 `CesiumZondy.Manager.SceneManager`

##### 【method】`flyTo(lon, lon, heightParam, duration)` 跳转

| 参数名      | 类型   | 说明         |
| ----------- | ------ | ------------ |
| lon         | Number | 经度         |
| lon         | Number | 纬度         |
| heightParam | Number | 视角高度     |
| duration    | Number | 跳转持续时间 |

##### 【method】 `flyToComm(lon, lat, heightParam, options opt)` 通用跳转接口

| 参数名      | 类型   | 说明                       |
| ----------- | ------ | -------------------------- |
| lon         | Number | 经度                       |
| lon         | Number | 纬度                       |
| heightParam | Number | 视角高度                   |
| options     | Object | （可选）扩展属性，兼容原生 |

##### 【method】 `flyToEx(lon, lon, options opt)` 跳转到

| 参数名  | 类型   | 说明                       |
| ------- | ------ | -------------------------- |
| lon     | Number | 经度                       |
| lon     | Number | 纬度                       |
| options | Object | （可选）扩展属性，兼容原生 |

- `options` 属性参数

| 参数名   | 类型   | 说明             |
| -------- | ------ | ---------------- |
| height   | Number | （可选）视角高度 |
| duration | Number | （可选）持续时间 |
| heading  | Number | （可选）方位角   |
| pitch    | Number | （可选）俯仰角   |
| roll     | Number | （可选）翻滚角   |

##### 【method】 `flyToFeatureById(layerList, id, optionsParamopt)` 根据 ID 飞行到特定要素位置

| 参数名    | 类型          | 说明             |
| --------- | ------------- | ---------------- |
| layerList | Array.<layer> | 图层列表         |
| id        | Array.<id>    | ID 列表          |
| options   | Object        | （可选）扩展属性 |
