## 常用控件

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能示例显示常用的基础控件，包括鼠标位置、导航控件、比例尺、罗盘等。鼠标位置控件显示当前鼠标所在点的经纬度，高程等位置信息；导航控件提供放大、缩小、复位基础场景导航功能；罗盘控件则为方位指向，通常与导航控件结合使用。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现。先初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` ，然后初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用视图功能管理类的 `showPosition()` 方法显示位置信息；再初始化通用功能管理类`CesiumZondy.Manager.CommonFuncManager()` ，调用`createNavigationTool()`方法显示常用导航控件。

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

**Step 3. <font color=red>创建坐标显示容器，显示鼠标位置</font>**:
&ensp;&ensp;&ensp;&ensp;创建一个用于承载显示位置信息的容器，然后初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用视图功能管理类的 `showPosition()` 方法显示位置信息；

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

**Step 4. <font color=red>显示常用导航控件</font>**:
&ensp;&ensp;&ensp;&ensp;初始化通用功能管理类`CesiumZondy.Manager.CommonFuncManager()` ，调用 `createNavigationTool()` 方法显示常用导航控件，通过设置缩放、比例尺、罗盘的可见属性进行控制。

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

##### 【method】 `showPosition(elementId, options)` 显示鼠标坐标位置

| 参数名    | 类型   | 说明     |
| --------- | ------ | -------- |
| elementId | String | 附加属性 |
| options   | Object | 附加属性 |

- `options` 参数说明

| 参数名             | 类型    | 默认值 | 说明                                     |
| ------------------ | ------- | ------ | ---------------------------------------- |
| showHpr            | Boolean | false  | （可选）暂无                             |
| showSelectTileInfo | Boolean | false  | （可选）显示当前鼠标所在位置拾取到的级别 |
| showViewLevelInfo  | Boolean | false  | （可选）显示视图级别                     |

#### 3. 【通用功能管理类】 `CesiumZondy.Manager.CommonFuncManager`

##### 【method】 `createNavigationTool(options)` 显示导航控件

| 参数名  | 类型   | 说明     |
| ------- | ------ | -------- |
| options | Object | 附加属性 |

- `options` 参数说明

| 参数名                 | 类型    | 默认值 | 说明                                                 |
| ---------------------- | ------- | ------ | ---------------------------------------------------- |
| enableCompass          | Boolean | true   | （可选）用于启用或禁用罗盘控件                       |
| enableZoomControls     | Boolean | false  | （可选）用于启用或禁用缩放导航控件，提供缩放复位功能 |
| enableDistanceLegend   | Boolean | false  | （可选）用于启用或禁用比例尺控件，即距离图例         |
| enableCompassOuterRing | Boolean | false  | （可选）用于启用或禁用指南针外环                     |
