## 添加贴地多边形

### 示例功能

本示例实现在三维场景中添加贴地多边形。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendPolygon()`方法，实现贴地多边形的添加绘制。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，加载Google地图作为底图显示；

3. 添加贴地多边形：构造外圈坐标数组、内圈坐标数组，以及填充颜色对象，然后调用`appendPolygon()`方法，即可实现贴地多边形的添加绘制。

    ``` javascript
    //外圈坐标数组（经纬度）
    var latLon_out = [95.1550, 30.8902, 95.1668, 30.8800, 95.1836, 30.8902, 95.1696, 30.91];
    //nerPnts 内圈坐标数组（经纬度）
    var lanLon_in = [[95.1617, 30.8902, 95.1668, 30.8882, 95.1766, 30.8939, 95.1696, 30.8996]];
    //填充颜色
    var color = new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5);
    //根据给定点画贴地多边形
    polygon = webGlobe.appendGroundPolygon(latLon_out, lanLon_in, color);
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`appendGroundPolygon(outPnts, Array, color)`：根据给定点画贴地多边形

> `appendGroundPolygon`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|outPnts|Array|外圈坐标数组（经纬度）：[x1,y1,x2,y2,x3,y3]|
|Array|Array|inerPnts 内圈坐标数组（经纬度）Array<[x1,y1,x2,y2,x3,y3]>|
|color|Color|填充颜色(默认不指定时为蓝色) 通过getColor(red, green, blue, alpha)|