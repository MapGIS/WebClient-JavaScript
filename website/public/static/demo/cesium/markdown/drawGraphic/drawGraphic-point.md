## 绘制点

### 示例功能

本示例实现在三维场景中绘制点实体。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.EntityController`类提供的`appendPoint()`或`appendPointComm()`方法，实现点实体的添加绘制。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 绘制点实体：首先构造`CesiumZondy.Manager.EntityController`几何绘制控制对象，然后调用`appendPoint()`方法，设置点实体所在经纬度、高程，以及名称、像素大小、颜色、边线颜色、边线宽度信息，即可添加绘制点实体；

    ``` javascript
    //构造几何绘制控制对象
    var entityController = new CesiumZondy.Manager.EntityController({
        viewer: webGlobe.viewer
    });
    //添加点实体：经度、纬度、高程、名称、大小（像素单位）、颜色、外边线颜色、边线宽度
    var point = entityController.appendPoint(
        114.30252625376454, 30.544631482624357, 20,
        '黄鹤楼',
        12,
        new Cesium.Color(255 / 255, 255 / 255, 0 / 255, 1),
        new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1),
        2
    );

    //方法二：添加点通用方法，对接Cesium原生，可设置更多属性
    point4 = entityController.appendPointComm(
        //经度、纬度、高程
        114.28478689925817, 30.555691346035022, 0,
        //名称、描述
        '晴川阁', "晴川阁景点",
        //附加属性：像素大小、颜色、外边线颜色、边线宽度
        {
            pixelSize: 12,
            color: new Cesium.Color(255 / 255, 255 / 255, 0 / 255, 1),
            outlineColor: new Cesium.Color(255 / 255, 0 / 255, 0 / 255, 1),
            outlineWidth: 2
        }
    );
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【几何绘制控制类】CesiumZondy.Manager.EntityController

##### （1）`appendPoint(lat, lon, height, name, pixelSize, color, outlineColor, outlineWidth, description) → {Entity}`：添加点

> `appendPoint`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|lat|Number|经度|
|lon|Number|纬度|
|height|Number|高程|
|name|String|名称|
|pixelSize|Number|像素大小|
|color|Color|颜色(new Cesium.Color(1,0,0,1))|
|outlineColor|Color|外边线颜色|
|outlineWidth|Number|边线宽度|
|description|String|属性描述信息|

##### （2）`appendPointComm(lat, lon, height, name, description, options) → {Entity}`：添加点通用方法

> `appendPointComm`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|lat|	Number	|经度|
|lon	|Number	|纬度|
|height|	Number	|高程|
|name|	String	|名称|
|description	|String	|属性描述信息|
|options|	Object	|entity参数信息对象|