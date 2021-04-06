## 设置当前视图范围

&ensp;&ensp;&ensp;&ensp;本示例实现根据鼠标事件获取的屏幕坐标进行坐标转换与相关计算的功能，包括常用的屏幕坐标转笛卡尔坐标、屏幕坐标转经纬度、根据经纬度计算高度值。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现。先初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` , 然后初始化场景视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用 setView()方法实现设置当前视图范围功能。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维 WebGL 的功能；

**Step 2. <font color=red>创建三维地图容器并加载三维球控件</font>**:
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

**Step 3. <font color=red>实现设置当前视图范围功能</font>**:
&ensp;&ensp;&ensp;&ensp;初始化场景视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用 setView()方法实现设置当前视图范围功能。

- Example:
  ```Javascript
    //初始化视图功能管理类
    var sceneManager = new CesiumZondy.Manager.SceneManager({
      viewer: webGlobe.viewer
    });
    //设置当前视图范围
    sceneManager.setView(114.40298522106733, 30.465568703723072, 100.85856618500283, -45.4940479913348135, -15, 0);
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

##### 【method】 `setView(lon, lat, height, curHeading, curPitch, curRoll)` 设置当前视图范围

| 参数名     | 类型   | 说明                       |
| ---------- | ------ | -------------------------- |
| lon        | Number | 经度                       |
| lat        | Number | 纬度                       |
| height     | Number | 高度                       |
| curHeading | Number | 绕垂直于地心的轴旋转的度数 |
| curPitch   | Number | 绕纬度线旋转度数           |
| curRoll    | Number | 绕经度线旋转度数           |
