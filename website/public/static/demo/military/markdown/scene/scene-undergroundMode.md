## 地下模式

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于开启地下模式。地下模式通常用于加载地下三维场景的需求，如加载地下管线等。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，通过修改 Cesium 三维球控件 `Cesium.WebSceneControl()` 的参数来实现，根据应用场景需求具体设置相应参数。

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

**Step 3. <font color=red>修改参数</font>**:
&ensp;&ensp;&ensp;&ensp;修改 Cesium 三维球控件 `Cesium.WebSceneControl()` 的视图对象的 scene 参数。

-地下模式一：开启地下模式并关闭大气层、设置球面透明度

- Example:
  ```Javascript
    //设置地下模式
    webGlobe.viewer.scene.globe.undergroundMode = true;
    //大气显示关闭
    webGlobe.viewer.scene.skyAtmosphere.show = false;
    //透明度设置
    webGlobe.viewer.scene.globe.transparent = 0.3;
  ```

-地下模式二：开启地下模式、关闭大气层与地面大气效果、设置球面透明度、设置背景色

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
