## 添加线实体

### 示例功能

本示例实现在三维场景中添加线实体。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendLine()`方法，实现线实体的添加绘制。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，加载Google地图作为底图显示；

3. 添加线实体：调用`appendLine()`方法，设置信息：线名称、线坐标点数组、线宽、线颜色、是否包含Z轴（true即为不贴地模式）等，即可实现线实体的添加绘制。

    ``` javascript
    //点数组
    var arrayp = [104.0, 28.0, 1000,
        106.0, 27.0, 10000,
        107.0, 28.0, 2000,
        108.0, 29.0, 30000
    ];
    //根据给定点画线
    line = webGlobe.appendLine('不贴地线', arrayp, 2, new Cesium.Color(1, 0, 0, 0.8), true, {});
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`appendLine(name, pointsArray, width, color, isGround, options)`：根据给定点画线

> `appendLine`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|name|String|名称|
|pointsArray|Array|点数组|
|width|Number|线的宽度|
|color|Color|线颜色(默认不指定时为蓝色) 通过getColor(red, green, blue, alpha)|
|isGround|Boolean|设置为是否贴地(可识别带高度的坐标)|
|options|Object|包含的附加属性|