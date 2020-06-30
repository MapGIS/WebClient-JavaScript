## 添加带洞多边形

### 示例功能

本示例实现在三维场景中添加带洞多边形。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendHolePolygon()`方法，实现带洞多边形的添加绘制。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，加载Google地图作为底图显示；

3. 添加带洞多边形：调用`appendHolePolygon()`方法，设置信息：多边形名称、坐标点数组、区填充颜色，即可实现带洞多边形的添加绘制。

    ``` javascript
    //外圈坐标
    var latLon_out = [95.1550, 30.8902, 95.1668, 30.8800, 95.1836, 30.8902, 95.1696, 30.91];
    //内圈坐标
    var lanLon_in = [[95.1617, 30.8902, 95.1668, 30.8882, 95.1766, 30.8939, 95.1696, 30.8996]];
    //添加带洞多边形（二维）
    holepolygon = webGlobe.appendHolePolygon("带洞区", latLon_out, lanLon_in);
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`appendHolePolygon(name, latLons_out, latLons_in, options)`：添加带洞多边形（二维）

> `appendHolePolygon`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|name|String|名称|
|latLons_out|Array|外圈坐标 ：[x1,y1,x2,y2,x3,y3]|
|latLons_in|Array|内圈Array<[x1,y1,x2,y2,x3,y3]>|
|options|object|参数对象|