## 坡向分析

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于地形数据的坡向分析。 坡向是指地表面上一点的切平面的法线在水平面的投影与该点的正北方向的夹角，描述该点高程值改变量的最大变化方向。坡向分析作用是：决定地表面局部地面接收阳光和重新分配太阳辐射量的重要地形因子，直接造成局部地区气候特征差异，影响各项农业生产指标。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` ，初始化地形图层管理类 `CesiumZondy.Layer.TerrainLayer` 并调用 `append()` 方法加载地形数据后，跳转视点，创建高级分析功能管理类 `CesiumZondy.Manager.AdvancedAnalysisManager()` ，调用 `createAspectAnalysis()` 方法进行坡向分析。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
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

- Example:
  ```html
    <div id="GlobeView"></div>
  ```

**Step 3. <font color=red>加载数据</font>**：
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

**Step 4. <font color=red>坡向分析</font>**：
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

### 关键接口

#### 1.【三维视图的主要类】 `Cesium.WebSceneControl`

#### 2.【地形图层管理类】`CesiumZondy.Layer.TerrainLayer`

##### 【method】 `append(url, options)` ：添加地形地图文档

| 参数名  | 类型   | 说明                                                                                            |
| ------- | ------ | ----------------------------------------------------------------------------------------------- |
| url     | String | 事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮) |
| options | Object | 可选参数                                                                                        |

- `options` 主要参数

| 参数名      | 类型         | 默认值   | 说明               |
| ----------- | ------------ | -------- | ------------------ |
| synchronous | Boolean      | true     | (可选)是否异步请求 |
| loaded      | function     | function | (可选)回调函数     |
| 代理        | DefaultProxy | 暂无     | 暂无               |

#### 3.【高级分析功能管理类】`CesiumZondy.Manager.AdvancedAnalysisManager`

##### 【method】 `createAspectAnalysis(color) → {Object}`： 坡向分析，返回坡向分析实例

| 参数名 | 类型          | 说 明                     |
| ------ | ------------- | ------------------------- |
| color  | Array.<Color> | 坡向分层颜色信息，分 6 层 |
