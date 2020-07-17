## 绘制贴地区

### 示例功能

本示例实现在三维场景中绘制贴地区。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Layer.EntityController`类提供的`appendGroundPolygon()`方法，实现贴地区的添加绘制。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 绘制贴地区：首先构造`CesiumZondy.Layer.EntityController`实体绘制控制器对象，构造外圈坐标数组、内圈坐标数组，以及填充颜色对象，然后调用`appendGroundPolygon()`方法，即可实现贴地区的添加绘制。如果要绘制单圈的不带洞区，内圈坐标数组传空即可。

    ``` javascript
    //构造实体绘制控制器对象
    var entityController = new CesiumZondy.Layer.EntityController({
        viewer: webGlobe.viewer
    });

    //坐标点数组（经纬度）
    var latLon_out = [114.40328987990017, 30.479789358042233,
        114.40255973680176, 30.473707285934392,
        114.40905754990294, 30.473938016458956,
        114.40971219770601, 30.479196348500707,
        114.40328987990017, 30.479789358042233];
    //填充颜色
    var color = new Cesium.ColorGeometryInstanceAttribute(1, 1, 0, 0.5);

    //根据给定点画贴地多边形
    var polygon = webGlobe.appendGroundPolygon(
        //外圈坐标数组（经纬度）
        latLon_out, 
        //内圈坐标数组（经纬度）
        null, 
        //填充颜色
        color
    );
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【实体绘制控制器类】CesiumZondy.Layer.EntityController

##### （1）`appendGroundPolygon(outPnts, Array, color)`：根据给定点画贴地区

> `appendGroundPolygon`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|outPnts|Array|外圈坐标数组（经纬度）：[x1,y1,x2,y2,x3,y3]|
|Array|Array|inerPnts 内圈坐标数组（经纬度）Array<[x1,y1,x2,y2,x3,y3]>|
|color|Color|填充颜色(默认不指定时为蓝色) 通过getColor(red, green, blue, alpha)|