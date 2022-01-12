## 加载二维瓦片地图

### 示例功能

本示例实现在三维场景中加载在线二维瓦片地图，对接MapGIS IGServer发布的二维瓦片地图服务。

### 示例实现

数据准备：需提前在MapGIS Server Manager服务管理器中发布二维瓦片地图服务。

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendMapGISTile()`方法，以此来加载IGServer二维瓦片地图服务数据。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建布局：创建`id='GlobeView'`的div作为三维视图的容器，并设置其样式；

3. 构造三维场景控件：实例化WebSceneControl对象；

    ``` javascript
    //构造三维视图类（视图容器div的id，三维视图设置参数）
    var webGlobe = new Cesium.WebSceneControl('GlobeView', {
        terrainExaggeration: 1,
    });
    ```

4. 加载数据：首先需构造图层加载的参数，如范围、瓦片初始级行列数、最大显示级别等信息，可用来指定瓦片显示的范围、最大级别等；然后调用`appendMapGISTile()`方法传入二维瓦片服务地址及参数，即可加载浏览数据；

    ``` javascript
    //定义图层类
    var tilelayer = undefined;
    //添加二维瓦片附加属性
    var options = {
        tileRang: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
        //瓦片初始级的列数 默认为2
        colNum: 2,
        //瓦片初始级的行数 默认为1
        rowNum: 1,
        //瓦片最大显示级数 默认为19
        maxLevel: 5,
        // proxy: '/ZDproxy.ashx',//如不存在跨域可不设置
        //如瓦片裁的不是256,则需设置下面两个参数
        tileWidth: 256,
        tileHeight: 256
    };
    //添加MapGIS IGServer发布的瓦片
    tilelayer = webGlobe.appendMapGISTile('http://develop.smaryun.com:6163/igs/rest/mrms/tile/WORLDTILE',options);
    ```

    叠加后，可以通过`removeImageryLayer`方法移除瓦片图层；此方法也可用于避免重复叠加，将此前叠加的瓦片图层进行移除；
    
    ``` javascript
    //移除瓦片图层
    webGlobe.removeImageryLayer(tilelayer);
    ```

5. 鼠标位置显示控件：创建`id="coordinate_location"`的div作为容器，用于显示鼠标当前位置的经纬度、高程、视角高度信息；然后调用`showPosition()`方法为三维场景控件设置鼠标位置显示控件。

    ``` javascript
    //显示鼠标位置控件
    webGlobe.showPosition('coordinate_location');
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`new WebSceneControl(elementId, options)`：三维场景控件构造函数

> `WebSceneControl`构造函数主要参数

|参数名|类 型|说 明|
|-|-|-|
|elementId|Element \| String|放置视图的div的id|
|options|Object|（可选）附加属性|

> `options`属性主要参数

|参数名|类 型|默认值|说 明|
|-|-|-|-|
|viewerMode|String|‘3D’|（可选）初始视图模式默认为三维球视图 '2D'表示二维视图 'COLUMBUS_VIEW' 表示三维平面视图|
|showInfo|Boolean|false|（可选）是否显示默认的属性信息框|
|animation|Boolean|true|（可选）默认动画控制不显示|
|baseLayerPicker|Boolean|true|（可选）是否创建图层控制显示小组件|
|fullscreenButton|Boolean|true|（可选）是否创建全屏控制按钮|
|vrButton|Boolean|false|（可选）是否创建VR按钮|

##### （2）`appendMapGISTile(url, options)`：添加MapGIS发布的瓦片服务

> `appendMapGISTile`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|url|String|瓦片服务地址|
|options|Object|附加属性|

> `options`属性主要参数

|参数名|类 型|默认值|说 明|
|-|-|-|-|
|options.tileRange=|Rectangle|无|Rectangle.fromDegrees(-180,-90,180,90) 默认范围为全球范围|
|colNum|Number|2|瓦片初始级的列数 默认为2|
|rowNum|Number|1|瓦片初始级的列数 默认为1|
|maxLevel|Number|19|瓦片最大显示级数 默认为19|
|proxy|String|无|转发代理，不存在跨域可不设置|

##### （3）`removeImageryLayer(imageryLayer)`：移除瓦片图层

> `removeImageryLayer`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|imageryLayer|imageryLayer|图层对象|

##### （4）`showPosition(elementId, options)`：显示经纬度 高程 视角高度

> `showPosition`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|elementId|Element \| String|要显示的div的id|
|options|Object|附加属性|

> `options`属性主要参数

|参数名|类 型|默认值|说 明|
|-|-|-|-|
|showHpr|Boolean|false|（可选） |
|showSelectTileInfo|Boolean|false|（可选）显示当前鼠标所在位置拾取到的级别|
|showViewLevelInfo|Boolean|false|（可选）显示视图级别|
