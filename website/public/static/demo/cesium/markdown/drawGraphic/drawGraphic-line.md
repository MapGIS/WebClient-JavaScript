## 绘制立体线

### 示例功能

本示例实现在三维场景中绘制立体线实体。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.EntityController`类提供的`appendLine()`方法，实现立体线的添加绘制。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 绘制立体线实体：首先构造`CesiumZondy.Layer.EntityController`实体绘制控制器对象，调用`appendLine()`方法，设置：线名称、线坐标点数组、线宽、线颜色、是否包含Z轴（true即为带高程的立体模式，false即为贴地球的模式）等信息，即可实现立体线实体的添加绘制。

    ``` javascript
    //构造实体绘制控制器对象
    var entityController = new CesiumZondy.Layer.EntityController({
        viewer: webGlobe.viewer
    });
    //点数组
    var arrayp = [114.3984603010489, 30.506836857208143, 90,
        114.39820581466965, 30.50638419163618, 0,
        114.39817448017338, 30.505889144282214, 50
    ];
    //根据给定点画线（名称、点数组、线的宽度、线颜色、是否包含高程、附加属性）
    var line = entityController.appendLine(
        '不贴地线',
        arrayp,
        2,
        new Cesium.Color(1, 0, 0, 1),
        true,
        {}
    );
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【实体绘制控制器类】CesiumZondy.Layer.EntityController

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
