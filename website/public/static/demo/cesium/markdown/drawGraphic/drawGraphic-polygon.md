## 添加多边形

### 示例功能

本示例实现在三维场景中添加多边形。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendPolygon()`方法，实现多边形的添加绘制。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，加载Google地图作为底图显示；

3. 添加多边形：调用`appendPolygon()`方法，设置信息：多边形名称、坐标点数组、区填充颜色、外框线颜色，即可实现多边形的添加绘制。

    ``` javascript
    var polygon;
    //点数组
    var arryp = [110, 40, 108, 30, 114, 35, 115, 36];
    //画多边形区
    polygon = webGlobe.appendPolygon('三维区', arryp, webGlobe.getColor(1, 0, 0, 1), webGlobe.getColor(0, 0, 1, 1));
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`appendPolygon(name, points, fillColor, outlineColor)`：画多边形区

> `appendPolygon`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|name|String|名称|
|points|Array|点数组（顺序是逆时针）[x1,y1,x2,y2,x3,y3]|
|fillColor|Color|区填充色 默认白色半透明 通过webSceneControl.getColor(red, green, blue, alpha)|
|outlineColor|Color|外框线颜色 默认红色半透明|