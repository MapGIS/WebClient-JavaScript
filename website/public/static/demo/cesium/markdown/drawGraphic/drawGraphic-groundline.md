## 绘制贴地球线

### 示例功能

本示例实现在三维场景中绘制贴地球模式的线实体。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendGroundLine()`方法，实现贴地球线的添加绘制。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 绘制贴地球线：首先构造`CesiumZondy.Layer.EntityController`实体绘制控制器对象，然后调用`appendGroundLine()`方法，传入定义的坐标数组、颜色对象，即可实现贴地线的添加绘制。

    ``` javascript
    //构造实体绘制控制器对象
    var entityController = new CesiumZondy.Layer.EntityController({
        viewer: webGlobe.viewer
    });

    //定义一组坐标点
    var arrayp = [
        114.29326686402278, 30.54691048615991,
        114.28238521698825, 30.552850641911828,
        114.27353580837766, 30.536521489533488,
        114.29257062566866, 30.525800315003725
    ];
    //颜色
    var color = new Cesium.ColorGeometryInstanceAttribute(1, 0, 0, 0.5);

    //绘制贴地线（点序列、线颜色）
    var line = entityController.appendGroundLine(arrayp, color);
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【实体绘制控制器类】CesiumZondy.Layer.EntityController

##### （1）`appendGroundLine(pnts, color)`：绘制贴地线

> `appendGroundLine`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|pnts|Array.\<Number>|X、Y坐标数组：[x1,y1,x2,y2,x3,y3]|
|color|Color|颜色|
