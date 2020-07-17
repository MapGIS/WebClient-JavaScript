## 绘制立体区

### 示例功能

本示例实现在三维场景中绘制立体区。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.EntityController`类提供的`appendPolygon()`方法，实现立体区的添加绘制。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 绘制立体区：首先构造`CesiumZondy.Layer.EntityController`实体绘制控制器对象，构造坐标点数组，调用`appendPolygon()`方法，设置信息：区名称、坐标点数组、区填充颜色、外框线颜色，即可实现立体区的添加绘制。

    ``` javascript
    //构造实体绘制控制器对象
    var entityController = new CesiumZondy.Layer.EntityController({
        viewer: webGlobe.viewer
    });

    //点数组
    var arryp = [114.40328987990017, 30.479789358042233,
        114.40255973680176, 30.473707285934392,
        114.40905754990294, 30.473938016458956,
        114.40971219770601, 30.479196348500707,
        114.40328987990017, 30.479789358042233];

    //画立体区
    var polygon = entityController.appendPolygon(
        '三维区',
        arryp,
        webGlobe.getColor(1, 1, 0, 0.5),
        webGlobe.getColor(1, 0, 0, 1)
    );
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【实体绘制控制器类】CesiumZondy.Layer.EntityController

##### （1）`appendPolygon(name, points, fillColor, outlineColor)`：画多边形区

> `appendPolygon`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|name|String|名称|
|points|Array|点数组（顺序是逆时针）[x1,y1,x2,y2,x3,y3]|
|fillColor|Color|区填充色 默认白色半透明 通过webSceneControl.getColor(red, green, blue, alpha)|
|outlineColor|Color|外框线颜色 默认红色半透明|