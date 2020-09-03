## 3DTiles数据加载

### 示例功能

此功能用于在当前场景中加载3DTiles数据，支持本地数据和网络数据加载。

### 3DTiles
3D Tiles是用于流式传输大规模异构3D地理空间数据集的开放规范。为了扩展Cesium的地形和图像流，3D Tiles将用于流式传输3D内容，包括建筑物，树木，点云和矢量数据。关于3D Tiles可自行了解其更多内容。

### 示例实现：

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.CommonDataManager`类提供的`append3DTile()`方法与`remove3DTile()`方法，实现3D Tiles数据的加载与移除功能。

>开发库使用请参见首页-概述-原生JS调用内容。

### 实现步骤：

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 加载3DTiles数据：首先构造`CesiumZondy.Manager.CommonDataManager`通用数据管理对象，然后调用`append3DTile()`方法加载，须设置3DTiles数据的URL参数，通过加载成功回调函数定位跳转到所加载的3DTiles数据范围。相对加载功能，移除则调用`remove3DTile()`方法实现。

    ``` Javascript
    //构造通用数据管理对象
    var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
        viewer: webGlobe.viewer
    });

    //加载3DTile数据
    var tiles = commonDataManager.append3DTile(
        //3DTile数据路径，支持本地与网络数据
            './static/data/3DTile/BatchedTilesets/tileset.json',
        //成功回调函数
        load
    );
    function load(layer) {
        //加载成功后定位跳转
        webGlobe.viewer.flyTo(layer);
        console.log("这是一个加载成功回调");
    }

    //通过remove3DTile方法移除
    //commonDataManager.remove3DTile(tiles);
    ```

### 关键接口

#### 1.【三维场景控件】 `CesiumZondy.WebSceneControl` 

#### 2.【通用数据管理类】 CesiumZondy.Manager.CommonDataManager

##### (1) `append3DTile(url, onsuccess, options) → {Object}` 通过路径添加3DTile数据，返回kml数据对象（Object）
> `append3DTile` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|url|String|3DTile数据路径，本地数据路径设置如“./static/data/3DTile/BatchedTilesets/tileset.json”，网络数据路径设置如“http://{域名或IP}/xxx.json”|
|onsuccess|function|加载成功回调函数|
|options|Object|扩展参数|

##### (2) `remove3DTile(tileset)` 移除3DTiles数据对象
> `remove3DTile` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|tileset|Object|3DTiles数据对象，即append3DTile方法返回的数据对象|
