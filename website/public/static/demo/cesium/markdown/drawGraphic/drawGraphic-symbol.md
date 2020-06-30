## 添加标注

### 示例功能

本示例实现在三维场景中添加文本标注。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`WebSceneControl`类提供的`appendLabel()`方法，实现文本标注的添加。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库；

2. 创建三维视图容器，构造三维场景控件，构造并设置鼠标位置显示控件，加载Google地图作为底图显示；

3. 添加文本标注：调用`appendLabel()`方法可实现文本标注的添加，需要设置基本必要信息，如：文本标注的经纬度、高程、文本内容；还可设置样式信息，如：字体、颜色、样式、标签位置等信息。移除时可调用`removeEntity()`方法实现。

    ``` javascript
    //添加文字标注
    webGlobe.appendLabel(114.2, 31, 0, '这是一个标注', {
        //字体
        font: '14pt 楷体',
        //文本填充颜色
        fillColor: Cesium.Color.RED,
        //样式
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        //标签位置
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        //像素位移
        pixelOffset: new Cesium.Cartesian2(0, -9)
    });
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

##### （1）`appendLabel(lat, lon, height, lText, options)`：添加文字标签

> `appendLabel`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|lat|Number|经度|
|lon|Number|纬度|
|height|Number|高程|
|lText|String|标签内容|
|options|Object|附加属性|

> `options`属性主要参数

|参数名|类 型|默认值|说 明|
|-|-|-|-|
|font|String|'14pt monospace'|（可选）字体|
|fillColor|Color|Cesium.Color.WHITE|（可选）字体的填充色|
|outlineColor|Color|Cesium.Color.WHITE|（可选）字体的填充色|
|style|LabelStyle|Cesium.LabelStyle.FILL_AND_OUTLINE|（可选）样式|
|outlineWidth|Number|1|（可选）外边线宽度|
|heightReference|Number|Cesium.HeightReference.NONE|（可选）外边线宽度|
|verticalOrigin|VerticalOrigin|Cesium.VerticalOrigin.CENTER|（可选）标签位置 Cesium.VerticalOrigin.Cesium.VerticalOrigin.LEFT Cesium.VerticalOrigin.RIGHT|
|horizontalOrigin|HorizontalOrigin|Cesium.HorizontalOrigin.CENTER|（可选）标签位置 Cesium.HorizontalOrigin.Cesium.HorizontalOrigin.LEFT Cesium.HorizontalOrigin.RIGHT|
|description|String||（可选）属性描述|