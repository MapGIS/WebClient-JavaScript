## 交互式移动M3D数据

### 示例功能

此功能用于移动在三维场景中加载的M3D数据，M3D数据是临时移动，不会修改数据本身

### 示例实现：

本示例需要使用include-cesium-local.js开发库实现，通过Cesium三维球控件 `Cesium.WebSceneControl()` 的 `append()` 加载M3D数据后，通过创建 `Cesium.TransformEditor()` 平移编辑器对象，获取 `Cesium.TransformEditor` 平移编辑器对象的 `viewModel` 模型视图成员，调用模型视图的 `setModeTranslation()` 设置模型视图平移方法，调用模型视图的 `activate()` 激活平移工具，完成此功能。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤：

1. <font color=red>引用开发库</font>：本示例引用local本地【include-cesium-local.js】开发库, 完成此步后方可正常使用所有三维WebGL的功能；

2. <font color=red>创建三维地图容器并加载三维球控件</font>：创建 `id='GlobeView'` 的div作为三维视图的容器，并设置其样式，初始化Cesium三维球控件 `Cesium.WebSceneControl()` ，完成此步后可在三维场景中加载三维球控件；

``` Javascript
    //构造三维视图类（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {
        terrainExaggeration: 1,
    });
```

``` html
<div id='GlobeView'></div>
```

3. <font color=red>加载数据</font>：调用Cesium三维球控件 `Cesium.WebSceneControl()` 的 `append()` 方法传入M3D数据服务地址，即可加载浏览数据；

``` Javascript
//加载M3D数据
var tileset = webGlobe.append('http://develop.smaryun.com:6163/igs/rest/g3d/M3D', {});
```

4. <font color=red>创建编辑器</font>：初始化 `Cesium.TransformEditor()` 平移编辑器对象；

``` Javascript
//创建平移编辑器
var transformEditor = new Cesium.TransformEditor({
    container: webGlobe.viewer.container,
    scene: webGlobe.viewer.scene,
    transform: tileset[0]._root.transform,
    boundingSphere: tileset[0].boundingSphere
});
```

5. <font color=red>设置模型视图平移</font>：调用模型视图的 `setModeTranslation()` 设置模型视图平移; 

``` Javascript
//获取viewModel对象
viewModel = transformEditor.viewModel;
//设置模型视图平移
viewModel.setModeTranslation();
```

6. <font color=red>激活平移工具</font>：调用模型视图的 `activate()` 激活平移工具; 

``` Javascript
//激活平移工具
viewModel.activate();
```

### 关键接口

#### 1. `Cesium.WebSceneControl(elementId, options)` : 三维视图的主要类

##### (1) `append(url, options, 代理)` 添加地图文档

> `append` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|url|String|事件类型 LEFT_CLICK RIGHT_CLICK MOUSE_MOVE LEFT_DOUBLE_CLICK RIGHT_DOUBLE_CLICK WHEEL(鼠标滚轮)|
|options|Object|可选参数|
|代理|DefaultProxy|暂无|

> `options` 主要参数

|参数名|类型|默认值|说明|
|-|-|-|-|
|autoReset|Boolean|true|(可选)是否自动定位|
|synchronous|Boolean|true|(可选)是否异步请求|
|loaded|function|function|(可选)回调函数|

#### 2. `Cesium.TransformEditor(options)` : 平移编辑器类（API暂无）
