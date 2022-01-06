## 添加图片

### 示例功能

本示例实现在三维场景中添加图片。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.LayerManager`类提供的`appendImageByUrl()`方法，实现图片的添加。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 添加图片：首先构造`CesiumZondy.Manager.LayerManager`图层管理对象，然后调用`appendImageByUrl()`方法，需要传入图片的地址（可为本地图片地址，也可以为网络图片的URL），以及图片显示的坐标范围；

    ``` javascript
    //构造注记图层管理对象
    var layerManager = new CesiumZondy.Manager.LayerManager({
        viewer: webGlobe.viewer
    });

    //添加图片
    var image = layerManager.appendImageByUrl(
        //本地图片地址
        './static/data/picture/world.jpg',
        //图片显示范围（西经、南纬、东经、北纬）
        -180.0, -90, 180.0, 90
    );
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【图层管理类】CesiumZondy.Manager.LayerManager

##### （1）`appendImageByUrl(url, west, south, east, north)`：通过地址添加图片，包括本地图片和网络图片

> `appendImageByUrl`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|url|String|图片地址|
|west|float|西经|
|south|float|南纬|
|east|float|东经|
|north|float|北纬|
|options|Object|扩展参数|
