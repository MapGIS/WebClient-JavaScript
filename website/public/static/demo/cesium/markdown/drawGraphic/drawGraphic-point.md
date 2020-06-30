## 添加点

### 示例功能

本示例实现在三维场景中添加点实体。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendPoint()`方法，实现点实体的添加绘制。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，加载Google地图作为底图显示；

3. 添加点实体：调用`appendPoint()`方法，设置点实体所在经纬度、高程，以及名称、像素大小、颜色、外边线颜色、边线宽度信息，即可添加绘制点实体；

    ``` javascript
    var point;
    //添加点数据：经度、纬度、高程、名称、像素大小、颜色、外边线颜色、边线宽度
    point = webGlobe.appendPoint(115.2, 31, 200, '点', 10, webGlobe.getColor(1, 0, 0, 1), webGlobe.getColor(1, 1, 0, 1), 2);
    ```

    添加点数据后，如若需要移除实体，可调用`removeEntity()`方法实现。

    ``` javascript
    if (point) webGlobe.removeEntity(point);
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`appendPoint(lat, lon, height, pName, pPixelSize, pColor, pOutlineColor, pOutlineWidth, description)`：添加点

> `appendPoint`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|lat|Number|经度|
|lon|Number|纬度|
|height|Number|高程|
|pName|String|名称|
|pPixelSize|Number|像素大小|
|pColor|Color|(webGlobe.getColor(1,0,0,1))颜色|
|pOutlineColor|Color|外边线颜色|
|pOutlineWidth|Number|边线宽度|
|description|string|属性描述信息|

##### （2）`removeEntity(entity)`：移除实体

> `removeEntity`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|entity|entity|实体对象|
