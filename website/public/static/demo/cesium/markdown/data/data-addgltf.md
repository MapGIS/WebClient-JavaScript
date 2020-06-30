## 添加GLTF

### 示例功能

本示例实现在三维场景中添加GLTF模型。

> 什么是GLTF？

GLTF（GL Transmission Format），即图形语言交换格式，是一种三维数据的格式标准，由Khronos Group推出。由于三维数据格式众多，所以其致力于成为像音频界的MP3、图像界的JPEG那样的3D领域通用的数据格式。目前多款三维软件支持了GLTF格式数据的读写，如Maya、3dmax、unity等等。采用GLTF可避免不同软件中数据转换操作造成的各方面问题。
<a href="https://www.khronos.org/gltf/" target="_blank">GLTF官方介绍</a>

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendModel()`方法，实现GLTF模型数据的加载。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，并加载Google地图作为底图；

3. 添加模型：调用`appendModel()`方法，并设置模型id、URL路径、模型所在经纬度、模型高度、缩放比参数信息，即可实现GLTF模型的加载。

    ``` javascript
    //定义模型
    var model;
    //添加模型（gltf文件）：appendModel（模型id，模型url路径，模型所在经度，模型所在纬度，高度，缩放比）
    model = webGlobe.appendModel('model', './static/data/model/donghua.gltf', 117.9298, 40.3828, 0, 2000);
    ```

    添加了模型之后，可通过`removeModel()`方法移除；

    ``` javascript
    //移除模型
    if (model) webGlobe.removeModel(model);
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`appendModel(id, url, lon, lat, height, scale)`：添加模型（gltf文件）

|参数名|类 型|说 明|
|-|-|-|
|id|Number|模型id|
|url|String|模型url路径|
|lon|Number|模型所在经度|
|lat|Number|模型坐在纬度|
|height|Number|高度|
|scale|Number|缩放比|

##### （2）`removeModel(model)`：移除模型

|参数名|类 型|说 明|
|-|-|-|
|model|model|模型对象|
