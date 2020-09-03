## 添加图标

### 示例功能

本示例实现在三维场景中添加图片标注。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.LabelLayer`类提供的`appendBillboard()`方法，实现图片标注的添加。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 添加文本标注：首先构造`CesiumZondy.Manager.LabelLayer`注记图层管理对象，调用`appendBillboard()`方法可实现图片标注的添加，需要设置基本必要信息，如：图片标注的经纬度、高程、名称、图标文件路径、图片宽度、高度等信息。

    ``` javascript
    //构造注记图层管理对象
    var labelLayer = new CesiumZondy.Manager.LabelLayer({
        viewer: webGlobe.viewer
    });

    //添加图片标注（经度、纬度、高程、名称、图片地址、图标宽度、图标高度）
    var icon = labelLayer.appendBillboard(
        114.39920, 30.50620, 0,
        '图标',
        "./static/data/picture/icon.png",
        50, 50
    );
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【注记图层管理类】CesiumZondy.Manager.LabelLayer

##### （1）`appendBillboard(lat, lon, height, name, bImageUrl, bWidth, bHeight, optionsParam) → {Entity}`：添加图片标签，返回添加的公告板对象（Entity）

> `appendBillboard`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|lat	|Number	|	经度|
|lon|	Number	|	纬度|
|height	|Number	|	高度|
|name	|String	|	名称|
|bImageUrl	|String	|	图片地址|
|bWidth	|Number	|	图片宽度|
|bHeight	|Number	|	图片高度|
|optionsParam	|Object	|	扩展参数|

> `optionsParam`属性主要参数

|参数名|类 型|说 明|
|-|-|-|-|
|description|String|（可选）描述信息|
