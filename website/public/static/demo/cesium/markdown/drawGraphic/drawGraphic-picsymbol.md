## 添加图文标注

### 示例功能

本示例实现在三维场景中添加图文标注。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.LabelLayer`类提供的`appendLabelIconComm()`方法，实现图文标注的添加。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 添加图文标注：首先构造`CesiumZondy.Manager.LabelLayer`注记图层管理对象，构造位置、图片、文本对象，这三部分内容是图文标注必备的三种信息，构造后作为参数调用`appendLabelIconComm()`方法，即可实现图文标注的添加；

    ``` javascript
    //位置（x、y、z）
    var position = Cesium.Cartesian3.fromDegrees(114.36517991431259, 30.56206615740468, 10);
    //图片对象
    var billboardGraphics = new Cesium.BillboardGraphics({
        image: "./static/data/picture/icon.png",
        width: 64,
        height: 64,
        //随远近缩放
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e5, 3.0, 1.5e7, 0.5),
        //随远近隐藏
        translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0),
    });
    //文本对象
    var labelGraphics = new Cesium.LabelGraphics({
        //文本
        text: "湖北省博物馆",
        //文字大小、字体
        font: "20pt 宋体",
        //文字颜色
        fillColor: Cesium.Color.BLACK,
        //文本垂直位置
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        //文本水平位置
        horizontalOrigin: Cesium.HorizontalOrigin.BOTTOM,
        //随远近缩放
        pixelOffset: new Cesium.Cartesian2(0.0, -64 / 4), //x,y方向偏移 相对于屏幕
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5),
        //随远近隐藏
        translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0)
    });

    //构造注记图层管理对象
    var labelLayer = new CesiumZondy.Manager.LabelLayer({
        viewer: webGlobe.viewer
    });
    //添加图标注记（文字内容、描述、位置、图片对象、文本对象）
    var labelIcon = labelLayer.appendLabelIconComm(
        "湖北省博物馆",
        "坐落于湖北省武汉市武昌区东湖风景区",
        position,
        billboardGraphics,
        labelGraphics
    );
    ```

    其中，位置对象需使用Cesium.Cartesian3类来构造，图片对象需由Cesium.BillboardGraphics构造，文本对象需由Cesium.LabelGraphics构造，这三个类都属于Cesium原生提供的类，具体用法可参考API文档。

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【注记图层管理类】CesiumZondy.Manager.LabelLayer

##### （1）`appendLabelIconComm(name, description, position, billboardGraphics, labelGraphics)`：添加图标注记

> `appendLabelIconComm`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|name|String|注记文字内容|
|description|String|描述|
|position|Cartesian3|位置|
|billboardGraphics|BillboardGraphics|图片对象|
|labelGraphics|LabelGraphics|文本对象|

#### 2.【三维笛卡尔点】Cartesian3

##### （1）`new Cartesian3(x, y, z)`：构造函数

> `Cartesian3`构造函数主要参数

|参数名|类 型|默认值|说 明|
|-|-|-|-|
|x|Number|0.0|（可选）X 坐标|
|y|Number|0.0|（可选）Y 坐标|
|z|Number|0.0|（可选）Z 坐标|
