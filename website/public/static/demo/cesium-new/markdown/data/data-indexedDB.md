## M3d 本地缓存

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于在三维场景中加载 M3D 模型时，开启本地缓存，提高除首次以外的加载速度。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-new-local.js】开发库实现，初始化三维视图类 `Cesium.Viewer` 对象，调用三维视图类的`viewer.scene.layers.appendSceneLayer(url, options)`方法和`viewer.scene.layers.appendM3DLayer(url, options)`方法时，将 options 中的 `useIDB` 参数设置为 true 则可以开启 M3D 的本地缓存功能。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-new--local.js】开发库, 完成此步后方可正常使用所有三维 WebGL 的功能；

**Step 2. <font color=red>创建三维地图容器并加载三维球控件</font>**：
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的 div 作为三维视图的容器，并设置其样式，初始化 Cesium 三维球控件 `Cesium.Viewer()` ，完成此步后可在三维场景中加载三维球控件；

-   Example:

    ```Javascript
      //构造三维视图类（视图容器div的id，三维视图设置参数）
      var viewer = new Cesium.Viewer('GlobeView', {
          infoBox: false,
          selectionIndicator: false,
          shouldAnimate: true
      });
    ```

-   Example:
    ```html
    <div id="GlobeView"></div>
    ```

**Step 3. <font color=red>显示常用控件，并实现跳转定位</font>**：
&ensp;&ensp;&ensp;&ensp;调用`showPosition()`、`createNavigationTool()`方法显示常用控件；

-   Example:
    ```Javascript
     //显示鼠标位置控件
     viewer.showPosition('coordinate_location');
    ```

**Step 4. <font color=red>加载 M3D 模型数据</font>**：
&ensp;&ensp;&ensp;&ensp;调用`viewer.scene.layers.appendSceneLayer(url, options)`方法加载模型数据，设置`useIDB: true`开启本地缓存；

-   Example:
    ```Javascript
      //默认加载g3d数据
      url = 'http://develop.smaryun.com:6163/igs/rest/g3d/ZondyModels';
      viewer.scene.layers.appendSceneLayer(url, {
          duration: 1,
          maximumScreenSpaceError: 0,
          useIDB: true
      });
    ```

**Step 5. <font color=red>移除所有图层</font>**：
&ensp;&ensp;&ensp;&ensp;通过`removeAllM3DLayers()`方法和`removeAllSceneLayers()`方法可以用于移除所有三维模型。

-   Example:

    ```Javascript
      // 移除所有图层
      function removeAllLayers() {
          viewer.scene.layers.removeAllM3DLayers(true);
          viewer.scene.layers.removeAllSceneLayers(true);
      }
    ```

### 关键接口

#### 1.【三维视图的主要类】 `Cesium.Viewer`

##### 【method】 `viewer.scene.layers.appendSceneLayer(url，options)`： 添加三维场景图层。

##### 【method】 `viewer.scene.layers.appendM3DLayer(url，options)`： 添加 M3D 图层。

##### 【method】 `viewer.scene.layers.removeAllM3DLayers()` ：移除添加的 M3D 图层。

##### 【method】 `viewer.scene.layers.removeAllSceneLayers()` ：移除添加的三维场景图层。

| 参数名 | 类型   | 说明             |
| ------ | ------ | ---------------- |
| url    | String | 三维模型数据地址 |

-   `options` 缓存相关参数

| 参数名        | 类型    | 说 明                                              | 默认值 |
| ------------- | ------- | -------------------------------------------------- | ------ |
| useIDB        | Boolean | （可选）是否在 M3D 加载时开启 IndexedDB 本地缓存。 | false  |
| maxCacheLevel | Number  | （可选）前端缓存的最大级别                         | 3      |
