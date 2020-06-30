## 添加贴地线

### 示例功能

本示例实现在三维场景中添加贴地线。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendGroundLine()`方法，实现贴地线的添加绘制。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，加载Google地图作为底图显示；

3. 添加贴地线：然后调用`appendGroundLine()`方法，传入定义的坐标数组、颜色对象，即可实现贴地线的添加绘制。

    ``` javascript
    //定义一组坐标位置
    var arrayp = [104.0, 28.0, 106.0, 27.0, 107.0, 28.0, 108.0, 29.0];
    //颜色
    var color = new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 1);
    //绘制贴地线
    line = webGlobe.appendGroundLine(arrayp, color);
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`appendGroundLine(pnts, color)`：绘制贴地线

> `appendGroundLine`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|pnts|Array.\<Number>|X、Y坐标数组：[x1,y1,x2,y2,x3,y3]|
|color|Color|颜色|