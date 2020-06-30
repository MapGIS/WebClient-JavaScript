## 添加KMZ

### 示例功能

本示例实现在三维场景中添加KMZ数据。

> 什么是KMZ？

KMZ文件是经过压缩的KML文件，将其解压后即可获得最原始的KML文件。与KML不同的是，由于KMZ是压缩包文件，所以其中不仅可以包括KML文本文件，还可以包括其他类型的文件，如图片等，所以KMZ能够表达的信息可以更加丰富多样。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，与KML数据的加载方法一样，都采用`WebSceneControl`类提供的`appendKml()`方法实现KMZ数据的加载。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，并加载Google地图作为底图；

3. 添加模型：调用`appendKml()`方法，传入KMZ文件地址，即可实现数据的加载，在此以本地文件为例；

    ``` javascript
    //添加KMZ数据
    webGlobe.appendKml("./static/data/kmz/下茅槽风能图谱.kmz");
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`appendKml(url, options)`：加载Kml、kmz数据

|参数名|类 型|说 明|
|-|-|-|
|url|String|文件地址|
|options|String||
