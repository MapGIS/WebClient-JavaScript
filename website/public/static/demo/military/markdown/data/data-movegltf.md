## 交互式移动模型数据

### 示例功能

&ensp;&ensp;&ensp;&ensp;此功能用于移动在三维场景中加载的模型数据，模型数据是临时移动，不会修改数据本身。

### 示例实现：

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-cesium-local.js】开发库实现，通过 Cesium 三维球控件 `Cesium.WebSceneControl()`的`appendModel()`加载模型数据后，通过创建 `Cesium.TransformEditor()` 平移编辑器对象，获取 `Cesium.TransformEditor` 平移编辑器对象的 `viewModel` 模型视图成员，调用模型视图的 `setModeTranslation()` 设置模型视图平移方法，调用模型视图的 `activate()` 激活平移工具，完成此功能。

> 开发库使用请参见*首页-概述-原生 JS 调用*内容。

### 实现步骤：

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维 WebGL 的功能；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建 `id='GlobeView'` 的 div 作为三维视图的容器，并设置其样式，初始化 Cesium 三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

**Step 3. <font color=red>加载数据</font>**:
&ensp;&ensp;&ensp;&ensp;调用 Cesium 三维球控件 `Cesium.WebSceneControl()` 的 `appendModel()` 方法传入模型数据地址，即可加载浏览数据；

- Example:
  ```Javascript
    //构造通用数据管理对象
    var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
      viewer: webGlobe.viewer
    });
    //添加模型（gltf文件）
    var model = commonDataManager.appendModel(
      //模型id
      'model',
      //模型url路径
      './static/data/model/donghua.gltf',
      //模型经度、纬度、高度
      118.0385, 42.6374, -5,
      //缩放比
      50
    );
  ```

**Step 4. <font color=red>创建平移编辑器</font>**:
&ensp;&ensp;&ensp;&ensp;初始化 `Cesium.TransformEditor()`平移编辑器对象；

- Example:
  ```Javascript
    //创建平移编辑器
    var transformEditor = new Cesium.TransformEditor({
      container: webGlobe.viewer.container,
      scene: webGlobe.viewer.scene,
      transform: model.modelMatrix,
      boundingSphere: model.boundingSphere
    });
  ```

**Step 5. <font color=red>设置模型视图平移</font>**:
&ensp;&ensp;&ensp;&ensp;调用模型视图的 `setModeTranslation()` 设置模型视图平移;

- Example:
  ```Javascript
    //获取模型视图对象
    var viewModel = transformEditor.viewModel;
    //设置模型视图平移
    viewModel.setModeTranslation();
  ```

**Step 6. <font color=red>激活平移工具</font>**:
&ensp;&ensp;&ensp;&ensp;调用模型视图的 `activate()` 激活平移工具;

- Example:
  ```Javascript
    //激活平移工具
    viewModel.activate();
  ```

### 关键接口

#### 1. `Cesium.WebSceneControl(elementId, options)` : 三维视图的主要类

##### 【method】`appendModel(id, url, lon, lat, height, scale) → {Object}`：添加模型（gltf 文件）

| 参数名  | 类 型  | 说 明         |
| ------- | ------ | ------------- |
| id      | Number | 模型 id       |
| url     | String | 模型 url 路径 |
| lon     | Number | 模型所在经度  |
| lat     | Number | 模型坐在纬度  |
| height  | Number | 高度          |
| scale   | Number | 缩放比        |
| options | Object | 附加参数      |

> `options`属性主要参数

| 参数名           | 类 型          | 说 明                                  |
| ---------------- | -------------- | -------------------------------------- |
| color            | Color          | 颜色                                   |
| colorBlendMode   | ColorBlendMode | 颜色混合模式 Cesium.ColorBlendMode.MIX |
| colorBlendAmount | Number         | 颜色混合程度                           |

#### 2. `Cesium.TransformEditor(options)` : 平移编辑器类（API 暂无）
