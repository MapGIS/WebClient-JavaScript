## 场景视图模式

### 示例功能

&ensp;&ensp;&ensp;&ensp;场景视图模式提供三种模式：三维球面模式、三维平面模式、二维地图模式，在实际应用中可根据具体应用场景设置。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` 后初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用视图功能管理类的 `changeSceneMode()` 方法切换地图显示模式。

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

**Step 3. <font color=red>模式切换</font>**:
&ensp;&ensp;&ensp;&ensp;<font color=red>模式切换</font>：初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用视图功能管理类的 `changeSceneMode()` 方法切换地图显示模式。

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

##### 【method】 `changeSceneMode(sceneMode, duration)` 切换场景模式

| 参数名    | 类型   | 说明                                          |
| --------- | ------ | --------------------------------------------- |
| sceneMode | String | 场景模式'3D', '2D', 'COLUMBUS_VIEW'(平面三维) |
| duration  | Number | 动画持续时间，<=0 时，保持场景范围不变        |
