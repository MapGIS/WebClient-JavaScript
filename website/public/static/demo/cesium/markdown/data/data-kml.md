## 添加KML

### 示例功能

本示例实现在三维场景中添加KML数据。

> 什么是KML？

KML（Keyhole Markup Language，Keyhole标记语言）是由Google旗下的Keyhole公司开发和维护的一种基于XML的标记语言，可用于描述和保存地理空间信息（如点、线、面、图像、模型等），适合网络环境下的地理信息协作与共享。KML在2008年4月被OGC（开放地理信息系统协会）宣布成为开放地理信息编码标准。KML是纯粹的xml文本格式，两者之间最大的区别就在于KML描述的是地理信息数据。
<a href="https://baike.baidu.com/item/KML/7278605?fr=aladdin" target="_blank">KML百科介绍</a>

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.LayerManager`类提供的`appendKml()`方法，实现KML数据的加载。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 添加模型：首先构造`CesiumZondy.Manager.LayerManager`图层管理对象，然后调用`appendKml()`方法，传入KML文件地址，即可实现数据的加载，在此以本地文件为例；

    ``` javascript
    //创建图层管理对象
    var layerManager = new CesiumZondy.Manager.LayerManager({
        viewer: webGlobe.viewer
    });
    //添加KML数据
    var datasource = layerManager.appendKml("./static/data/kml/bikeRide_wuhan.kml");
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【图层管理类】CesiumZondy.Manager.LayerManager

##### （1）`appendKml(url, options)`：加载kml、kmz数据

|参数名|类 型|说 明|
|-|-|-|
|url|String|文件地址|
|options|String||
