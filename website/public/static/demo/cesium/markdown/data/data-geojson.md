## GeoJSON数据加载

### 示例功能

本示例实现在三维场景中添加GeoJSON数据。

> 什么是GeoJSON？

GeoJSON，是一种对各种地理数据结构进行编码的格式，基于Javascript对象表示法的地理空间信息数据交换格式。通过键值对的方式表达几何、特征或者特征集合，能够支持点、线、面、多点、多线、多面和几何集合的数据类型。
<a href="https://geojson.org/" target="_blank">GeoJSON官方介绍</a>

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.CommonDataManager`类提供的`appendGeoJson()`方法，实现GeoJSON数据的加载；对应可通过`removeDataSource()`方法移除。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，并加载Google地图作为底图；

3. 添加GeoJSON：调用`appendGeoJson()`方法，传入GeoJSON文件地址，即可实现数据的加载，在此以本地文件为例；

    ``` javascript
    //构造通用数据管理对象
    var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
        viewer: webGlobe.viewer
    });
    //添加GeoJson数据（GeoJson文件地址）
    var datasource = commonDataManager.appendGeoJson('./static/data/geojson/wuhan_bounds.geojson');
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【通用数据管理类】CesiumZondy.Manager.CommonDataManager

##### （1）`appendGeoJson(url) → {GeoJsonDataSource}`：添加GeoJson文件，返回数据对象（GeoJsonDataSource）

|参数名|类 型|说 明|
|-|-|-|
|url|String|GeoJSON数据文件地址，本地数据路径设置如“./static/data/geojson/wuhan_bounds.geojson”，网络数据路径设置如“http://{域名或IP}/xxx.geojson”|

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