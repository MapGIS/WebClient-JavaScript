## M3D数据交互编辑

### 示例功能

本示例实现移动在三维场景中加载的M3D数据，只是修改数据上层显示位置，并不会修改数据本身。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，首先加载M3D数据，然后构造`Cesium.TransformEditor()` 平移编辑器对象，获取其模型视图成员`viewModel`，然后调用模型视图的`setModeTranslation()`设置模型视图平移方法、调用`activate()`激活平移工具，即可激活模型数据，会展示XYZ三条轴线，拖动轴线即可实现模型在对应方向上的平移。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤：

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 加载M3D数据：例如加载M3D地质体数据；

    ``` Javascript
    //构造M3D模型层管理对象（视图）
    var m3dLayer = new CesiumZondy.Layer.M3DLayer({
        viewer: webGlobe.viewer
    });
    //加载M3D地图文档（服务地址，配置参数）
    modelLayers = m3dLayer.append(
        'http://develop.smaryun.com:6163/igs/rest/g3d/钻孔分层点_Sur_000_Ent',
        {
            maximumScreenSpaceError: 1
        }
    );
    ```

4. 创建编辑器：初始化 `Cesium.TransformEditor()` 平移编辑器对象，然后调用模型视图的 `setModeTranslation()` 设置模型视图平移，最后调用模型视图的 `activate()`方法激活平移工具，即可在场景中添加XYZ三条轴线，拖动轴线即可实现模型在对应方向上的平移。

    ``` Javascript
    //创建平移编辑器
    var transformEditor = new Cesium.TransformEditor({
        container: webGlobe.viewer.container,
        scene: webGlobe.viewer.scene,
        transform: modelLayers[0]._root.transform,
        boundingSphere: modelLayers[0].boundingSphere
    });
    //获取模型视图对象
    var viewModel = transformEditor.viewModel;
    //设置模型视图平移
    viewModel.setModeTranslation();
    //激活工具
    viewModel.activate();
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【平移编辑器类】Cesium.TransformEditor(options)（API暂无）
