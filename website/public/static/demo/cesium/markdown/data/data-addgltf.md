## 添加GLTF

### 示例功能

本示例实现在三维场景中添加GLTF模型。

> 什么是GLTF？

GLTF（GL Transmission Format），即图形语言交换格式，是一种三维数据的格式标准，由Khronos Group推出。由于三维数据格式众多，所以其致力于成为像音频界的MP3、图像界的JPEG那样的3D领域通用的数据格式。目前多款三维软件支持了GLTF格式数据的读写，如Maya、3dmax、unity等等。采用GLTF可避免不同软件中数据转换操作造成的各方面问题。
<a href="https://www.khronos.org/gltf/" target="_blank">GLTF官方介绍</a>

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.LayerManager`类提供的`appendModel()`方法，实现GLTF模型数据的加载。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 添加模型：首先构造`CesiumZondy.Manager.LayerManager`图层管理对象，然后调用`appendModel()`方法，并设置模型id、URL路径、模型所在经纬度、模型高度、缩放比参数信息，即可实现GLTF模型的加载。

    ``` javascript
    //创建图层管理对象
    var layerManager = new CesiumZondy.Manager.LayerManager({
        viewer: webGlobe.viewer
    });

    //添加模型（gltf文件）
    var model = layerManager.appendModel(
        //模型id
        'model',
        //模型url路径
        './static/data/model/donghua.gltf',
        //模型所在经度
        117.9298,
        //模型所在纬度
        40.3828,
        //高度
        0,
        //缩放比
        2000
    );
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【图层管理类】CesiumZondy.Manager.LayerManager

##### （1）`appendModel(id, url, lon, lat, height, scale)`：添加模型（gltf文件）

|参数名|类 型|说 明|
|-|-|-|
|id|Number|模型id|
|url|String|模型url路径|
|lon|Number|模型所在经度|
|lat|Number|模型坐在纬度|
|height|Number|高度|
|scale|Number|缩放比|
