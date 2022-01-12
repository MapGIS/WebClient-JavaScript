## 场景基本操作

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现场景的基本操作功能，包括场景视图缩放、复位、三维球自转、设置天空盒等。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现。先初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` , 然后初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，调用视图功能管理类的如下几个方法分别实现对应的场景操作功能。

- `zoomIn`：放大；
- `zoomOut`：缩小；
- `goHome`：复位；
- `openRotation`：开启自转；
- `closeRotation`：关闭自转；
- `changeSkyBox`：修改天空盒。

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

**Step 3. <font color=red>实现场景操作功能</font>**:
&ensp;&ensp;&ensp;&ensp;初始化视图功能管理类 `CesiumZondy.Manager.SceneManager()` ，根据具体场景操作需求选择调用视图功能管理类的对应方法实现。

- Example:
  ```Javascript
    //初始化视图功能管理类
    var sceneManager = new CesiumZondy.Manager.SceneManager({
      viewer: webGlobe.viewer
    });
  ```

* zoomin()

- Example:

  ```Javascript
    sceneManager.zoomin();//放大
  ```

- zoomout()

- Example:

  ```Javascript
    sceneManager.zoomout();//缩小
  ```

- goHome()

- Example:

  ```Javascript
    sceneManager.goHome();//复位
  ```

- openRotation()与 closeRotation()

```Javascript
  sceneManager.openRotation();//开启自转
  ceneManager.closeRotation();//关闭自转
```

- changeSkyBox()

- Example:
  ```Javascript
    var skybox = new Cesium.SkyBox({
      sources: {
          positiveX: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/front.jpg',
          negativeX: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/back.jpg',
          positiveY: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/left.jpg',
          negativeY: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/right.jpg',
          positiveZ: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/top.jpg',
          negativeZ: './static/libs/cdn/Cesium/Assets/Textures/SkyBox2/bottom.jpg'
      }
    });
    sceneManager.changeSkyBox(skybox);
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

##### 【method】 `zoomIn()` 放大

##### 【method】 `zoomOut()` 缩小

##### 【method】 `goHome()` 复位

##### 【method】 `openRotation()` 开启自转

##### 【method】 `closeRotation()` 关闭自转

##### 【method】 `changeSkyBox(skybox)` 修改天空盒

| 参数名 | 类型                         | 说明       |
| ------ | ---------------------------- | ---------- |
| skybox | SkyBox,即 Cesium.SkyBox 对象 | 天空盒对象 |
