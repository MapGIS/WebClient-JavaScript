## 添加GeoJSON

### 示例功能

本示例实现在三维场景中添加GeoJSON数据。

> 什么是GeoJSON？

GeoJSON，是一种对各种地理数据结构进行编码的格式，基于Javascript对象表示法的地理空间信息数据交换格式。通过键值对的方式表达几何、特征或者特征集合，能够支持点、线、面、多点、多线、多面和几何集合的数据类型。
<a href="https://geojson.org/" target="_blank">GeoJSON官方介绍</a>

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendGeoJson()`方法，实现GeoJSON数据的加载。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，并加载Google地图作为底图；

3. 添加GeoJSON：调用`appendGeoJson()`方法，传入GeoJSON文件地址，即可实现数据的加载，在此以本地文件为例；

    ``` javascript
    //添加GeoJSON
    webGlobe.appendGeoJson('./static/data/geojson/countries.geojson');
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`appendGeoJson(url)`：添加GeoJson文件

|参数名|类 型|说 明|
|-|-|-|
|url|String|文件地址|
