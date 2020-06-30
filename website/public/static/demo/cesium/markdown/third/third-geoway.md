## 加载吉威地图

### 示例功能

本示例实现在三维场景中加载吉威地图。此示例中对接的地图服务坐标系为EPSG:3857，即Web墨卡托，其网络为为国内镜像网络地址。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendWMTSTileExt()`方法，以此来加载吉威地图。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

> 特别说明：使用吉威地图请注意`藏南`与`南海九段线`问题，建议使用天地图。

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

4. 加载数据：在此示例中对接的是WMTS类型的吉威地图，所以可调用WMTS类型地图的通用方法`appendWMTSTileExt()`来加载，需传入地图服务的URL地址，以及相应的参数，设置`from`为`'jiwei'`即代表是吉威地图；

    ``` javascript
    //添加吉威地图
    webGlobe.appendWMTSTileExt("http://59.252.165.22:8066/ime-cloud/rest/2016qgfdqrjszy/wmts", {
        from: 'jiwei'
    });
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

##### （2）`appendWMTSTileExt(wmtsBaseUrl, options)`：添加WMTS(WebMapTileService) 标准的瓦片(扩展)

> `appendWMTSTileExt`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|wmtsBaseUrl|String|wmts服务基地址 ：localhost:6163/igs/rest/ogc/WMTSServer|
|options|Object|（可选）附加属性|

> `options`属性主要参数

|参数名|类 型|默认值|说 明|
|-|-|-|-|
|serverName|String|无|（可选）服务名|
|proxy|String|无|（可选）代理服务器地址|
|from|String|'jiwei'|（可选）哪家公司的服务|

##### （3）`showPosition(elementId, options)`：显示经纬度 高程 视角高度

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
