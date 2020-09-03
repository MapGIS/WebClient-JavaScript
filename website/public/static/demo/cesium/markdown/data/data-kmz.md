## KMZ数据加载

### 示例功能

本示例实现在三维场景中添加KMZ数据。

> 什么是KMZ？

KMZ文件是经过压缩的KML文件，将其解压后即可获得最原始的KML文件。与KML不同的是，由于KMZ是压缩包文件，所以其中不仅可以包括KML文本文件，还可以包括其他类型的文件，如图片等，所以KMZ能够表达的信息可以更加丰富多样。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，实现KMZ数据的加载与KML数据的方法一样，都采用`CesiumZondy.Manager.CommonDataManager`类提供的`appendKml()`方法；对应可通过`removeDataSource()`方法移除。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，并加载Google地图作为底图；

3. 添加KMZ数据：调用`appendKml()`方法，传入KMZ文件地址，即可实现数据的加载，在此以本地文件为例；

    ``` javascript
    //构造通用数据管理对象
    var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
        viewer: webGlobe.viewer
    });
    //添加KMZ数据
    var datasource = commonDataManager.appendKml("./static/data/kmz/sample.kmz");
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【通用数据管理类】CesiumZondy.Manager.CommonDataManager

##### （1）`appendKml(url, options) → {KmlDataSource}`：加载KML、KMZ数据，返回KML数据对象（KmlDataSource）

|参数名|类 型|说 明|
|-|-|-|
|url|String|数据文件地址，本地数据路径设置如“./static/data/kmz/sample.kmz”，网络数据路径设置如“http://{域名或IP}/xxx.kmz”|
|options|Object|可选扩展参数|

##### (2) `removeDataSource(datasource, isDestroy)` 移除数据对象
> `removeDataSource` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|datasource|DataSource|数据对象|
|isDestroy|Boolean|是否销毁|

##### (3) `removeAllDataSource(isDestroy)` 移除所有数据对象
> `removeAllDataSource` 方法主要参数

|参数名|类型|说明|
|-|-|-|
|isDestroy|Boolean|是否销毁|
